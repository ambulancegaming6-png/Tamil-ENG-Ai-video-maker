
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon, XCircleIcon } from './icons';

interface ImageUploaderProps {
    onImageChange: (file: File | null) => void;
    disabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, disabled }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onImageChange(file);
        } else {
            setImagePreview(null);
            onImageChange(null);
        }
    }, [onImageChange]);

    const handleRemoveImage = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setImagePreview(null);
        onImageChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [onImageChange]);

    const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (disabled) return;
        const file = event.dataTransfer.files?.[0];
         if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onImageChange(file);
        }
    }, [onImageChange, disabled]);

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-300">
                Inspiration Image (Optional)
            </label>
            <label
                htmlFor="image-upload"
                className={`relative flex justify-center items-center w-full h-48 border-2 border-dashed border-slate-600 rounded-lg group transition-colors duration-200 ${!disabled && 'cursor-pointer hover:border-purple-500'} ${disabled && 'opacity-50 cursor-not-allowed'}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                    disabled={disabled}
                    ref={fileInputRef}
                />
                {imagePreview ? (
                    <>
                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                        <button
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1 bg-slate-900/50 rounded-full text-slate-200 hover:bg-slate-800/70 hover:text-white transition-colors"
                            aria-label="Remove image"
                            disabled={disabled}
                        >
                            <XCircleIcon className="w-6 h-6" />
                        </button>
                    </>
                ) : (
                    <div className="text-center text-slate-500 group-hover:text-purple-400 transition-colors">
                        <UploadIcon className="w-10 h-10 mx-auto" />
                        <p>Click to upload or drag & drop</p>
                        <p className="text-xs">PNG, JPG, WEBP</p>
                    </div>
                )}
            </label>
        </div>
    );
};
