
import React from 'react';
import { ExclamationTriangleIcon } from './icons';

interface ErrorDisplayProps {
    message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
    <div className="my-8 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-start gap-4">
        <ExclamationTriangleIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
        <div>
            <h3 className="font-bold text-red-300">An Error Occurred</h3>
            <p className="text-red-400 text-sm mt-1">{message}</p>
        </div>
    </div>
);
