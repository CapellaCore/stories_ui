import React, { useState, useRef } from 'react';
import { storageService, UploadImageParams } from '../services/storage';
import { useTranslation } from '../contexts/TranslationContext';
import LoadingSpinner from './LoadingSpinner';

interface ImageUploadProps {
  storyId: string;
  onImageUploaded: (imageData: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  storyId,
  onImageUploaded,
  onError,
  className = ''
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      onError?.(t('upload.invalidFileType') || 'Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      onError?.(t('upload.fileTooLarge') || 'File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const uploadParams: UploadImageParams = {
        file,
        storyId,
        alt: file.name.replace(/\.[^/.]+$/, ''), // Remove extension for alt text
        position: 0 // Default position, can be updated later
      };

      const result = await storageService.uploadImage(uploadParams);

      if (result.success && result.imageData) {
        onImageUploaded(result.imageData);
      } else {
        onError?.(result.error || t('upload.uploadFailed') || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      onError?.(t('upload.uploadFailed') || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={isUploading}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center">
            <LoadingSpinner size="medium" />
            <p className="mt-2 text-sm text-gray-600">
              {t('upload.uploading') || 'Uploading...'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              {t('upload.clickToUpload') || 'Click to upload image'}
            </p>
            <p className="text-xs text-gray-500">
              {t('upload.dragAndDrop') || 'or drag and drop'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {t('upload.supportedFormats') || 'PNG, JPG, GIF up to 5MB'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload; 