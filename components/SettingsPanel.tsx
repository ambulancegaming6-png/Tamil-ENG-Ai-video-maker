
import React from 'react';
import type { Settings } from '../types';
import { CogIcon } from './icons';

interface SettingsPanelProps {
    settings: Settings;
    onSettingsChange: (newSettings: Settings) => void;
    disabled: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange, disabled }) => {
    return (
        <details className="bg-slate-800/50 border border-slate-700 rounded-lg open:shadow-lg open:shadow-purple-900/10 transition-shadow">
            <summary className="p-4 flex items-center gap-3 cursor-pointer text-slate-300 font-medium hover:text-white">
                <CogIcon className="w-5 h-5" />
                Mod Settings
            </summary>
            <div className="p-4 border-t border-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <label htmlFor="num-videos" className="text-sm font-medium text-slate-300">
                        Number of Videos
                    </label>
                    <div className="flex items-center gap-4">
                         <input
                            type="range"
                            id="num-videos"
                            min="1"
                            max="4"
                            value={settings.numberOfVideos}
                            onChange={(e) => onSettingsChange({ ...settings, numberOfVideos: parseInt(e.target.value, 10) })}
                            disabled={disabled}
                            className="w-48 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <span className="font-bold text-lg text-white w-4 text-center">{settings.numberOfVideos}</span>
                    </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">More videos will take longer to generate.</p>
            </div>
        </details>
    );
};
