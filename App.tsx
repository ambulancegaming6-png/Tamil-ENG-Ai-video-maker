
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageUploader } from './components/ImageUploader';
import { SettingsPanel } from './components/SettingsPanel';
import { LoadingIndicator } from './components/LoadingIndicator';
import { VideoGrid } from './components/VideoGrid';
import { GenerateButton } from './components/GenerateButton';
import { ErrorDisplay } from './components/ErrorDisplay';
import type { Settings } from './types';
import { fileToBase64 } from './utils/fileUtils';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const loadingMessages = [
    "Warming up the AI artists...",
    "Gathering digital paint...",
    "Composing your visual symphony...",
    "Rendering pixels into motion...",
    "Adding a touch of magic...",
    "Almost there, polishing the frames...",
    "The AI is deep in thought, creating for you...",
    "Finalizing the masterpiece..."
];

export default function App() {
    const [prompt, setPrompt] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [settings, setSettings] = useState<Settings>({ numberOfVideos: 1 });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [generatedVideos, setGeneratedVideos] = useState<string[]>([]);

    const handleImageChange = useCallback((file: File | null) => {
        setImage(file);
    }, []);

    const handleGenerate = async () => {
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setGeneratedVideos([]);
        setLoadingMessage(loadingMessages[0]);

        try {
            const imageDetails = image 
                ? { imageBytes: await fileToBase64(image), mimeType: image.type } 
                : undefined;

            let operation = await ai.models.generateVideos({
                model: 'veo-2.0-generate-001',
                prompt,
                ...(imageDetails && { image: imageDetails }),
                config: {
                    numberOfVideos: settings.numberOfVideos,
                },
            });

            let messageIndex = 0;
            const messageInterval = setInterval(() => {
                messageIndex = (messageIndex + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[messageIndex]);
            }, 4000);

            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await ai.operations.getVideosOperation({ operation });
            }

            clearInterval(messageInterval);

            const videos = operation.response?.generatedVideos ?? [];
            if (videos.length > 0) {
                const videoUrls = videos
                    .map(v => v.video?.uri)
                    .filter((uri): uri is string => !!uri)
                    .map(uri => `${uri}&key=${process.env.API_KEY}`);
                setGeneratedVideos(videoUrls);
            } else {
                const generationError = operation.error?.message || "Video generation completed, but no videos were returned. Please try a different prompt.";
                setError(generationError);
            }

        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "An unknown error occurred during video generation.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <Header />

                <main className="mt-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PromptInput value={prompt} onChange={setPrompt} disabled={isLoading} />
                        <ImageUploader onImageChange={handleImageChange} disabled={isLoading} />
                    </div>

                    <SettingsPanel settings={settings} onSettingsChange={setSettings} disabled={isLoading} />
                    
                    <div className="text-center">
                        <GenerateButton onClick={handleGenerate} isLoading={isLoading} isDisabled={!prompt.trim()} />
                    </div>

                    {isLoading && <LoadingIndicator message={loadingMessage} />}
                    {error && <ErrorDisplay message={error} />}
                    
                    {!isLoading && generatedVideos.length > 0 && (
                       <VideoGrid videos={generatedVideos} />
                    )}
                </main>

                 <footer className="text-center mt-16 text-slate-500 text-sm">
                    <p>Powered by Gemini AI. Create, Inspire, Innovate.</p>
                </footer>
            </div>
        </div>
    );
}
