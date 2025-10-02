
import React from 'react';

interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, disabled }) => (
    <div className="flex flex-col space-y-2">
        <label htmlFor="prompt" className="text-sm font-medium text-slate-300">
            Your Video Idea
        </label>
        <textarea
            id="prompt"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="e.g., A cinematic shot of a racoon riding a skateboard in Tokyo at night..."
            className="w-full h-48 p-4 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
        />
    </div>
);
