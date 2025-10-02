
import React from 'react';
import { SparklesIcon } from './icons';

interface GenerateButtonProps {
    onClick: () => void;
    isLoading: boolean;
    isDisabled: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, isDisabled }) => {
    const disabled = isLoading || isDisabled;
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                inline-flex items-center justify-center gap-3 px-8 py-4 
                font-bold text-lg text-white rounded-full
                bg-gradient-to-r from-purple-600 to-pink-600 
                hover:from-purple-700 hover:to-pink-700
                focus:outline-none focus:ring-4 focus:ring-purple-300/50
                transition-all duration-300 ease-in-out transform hover:scale-105
                disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
            `}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                </>
            ) : (
                <>
                    <SparklesIcon className="w-6 h-6" />
                    Generate
                </>
            )}
        </button>
    );
};
