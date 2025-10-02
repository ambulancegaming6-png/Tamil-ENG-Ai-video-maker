
import React from 'react';

interface LoadingIndicatorProps {
    message: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => (
    <div className="text-center p-8 bg-slate-800/50 rounded-lg my-8">
        <div className="flex justify-center items-center">
             <div className="w-12 h-12 border-4 border-t-purple-500 border-slate-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-300 animate-pulse">{message}</p>
        <p className="text-xs text-slate-500 mt-2">Video generation can take a few minutes. Please be patient.</p>
    </div>
);
