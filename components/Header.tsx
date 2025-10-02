
import React from 'react';
import { VideoCameraIcon } from './icons';

export const Header: React.FC = () => (
    <header className="text-center">
        <div className="flex items-center justify-center gap-4">
            <VideoCameraIcon className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                HAPPY AI
            </h1>
        </div>
        <p className="mt-3 text-lg text-slate-400">
            Text & Photo to AI Video Generator
        </p>
    </header>
);
