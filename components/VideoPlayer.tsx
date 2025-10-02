
import React from 'react';
import { DownloadIcon } from './icons';

interface VideoPlayerProps {
    src: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
            <video
                controls
                src={src}
                className="w-full aspect-video bg-black"
            />
            <div className="p-4">
                 <a
                    href={src}
                    download={`happy-ai-video-${Date.now()}.mp4`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500"
                >
                    <DownloadIcon className="w-5 h-5" />
                    Download Video
                </a>
            </div>
        </div>
    );
};
