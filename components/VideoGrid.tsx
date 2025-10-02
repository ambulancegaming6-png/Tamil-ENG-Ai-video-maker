
import React from 'react';
import { VideoPlayer } from './VideoPlayer';

interface VideoGridProps {
    videos: string[];
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => (
    <div className="my-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Your Creations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((videoUrl, index) => (
                <VideoPlayer key={index} src={videoUrl} />
            ))}
        </div>
    </div>
);
