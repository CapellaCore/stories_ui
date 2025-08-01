import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../contexts/TranslationContext';
import { useStories } from '../hooks/useStories';
import ImageUpload from '../components/ImageUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/Breadcrumbs';

const AdminPage: React.FC = () => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { stories, loading } = useStories();
  const { t } = useTranslation();

  const selectedStory = stories.find(story => story.id === selectedStoryId);

  const handleImageUploaded = (imageData: any) => {
    setUploadedImages(prev => [...prev, imageData]);
    setError('');
    setSuccess(`✅ Image "${imageData.fileName}" uploaded successfully!`);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
    setSuccess('');
    
    // Clear error message after 5 seconds
    setTimeout(() => setError(''), 5000);
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      // Import the storage service dynamically to avoid circular dependencies
      const { storageService } = await import('../services/storage');
      const result = await storageService.deleteImage(imageId);
      
      if (result.success) {
        setUploadedImages(prev => prev.filter(img => img.id !== imageId));
        setSuccess('✅ Image deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(`Failed to delete image: ${result.error}`);
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      setError('Error deleting image');
      setTimeout(() => setError(''), 5000);
    }
  };

  if (loading) {
    return (
      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          <LoadingSpinner message={t('common.loading')} size="large" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Image Management - {t('home.title')}</title>
        <meta name="description" content="Admin interface for managing story images" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          {/* Breadcrumbs */}
          <div className="px-4 py-3">
            <Breadcrumbs 
              items={[
                { name: t('common.home'), path: '/' },
                { name: 'Admin', path: '/admin', isCurrent: true }
              ]}
            />
          </div>

          <div className="px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Admin - Image Management</h1>
            
            {/* Story Selection */}
            <div className="mb-4 md:mb-6">
              <label htmlFor="story-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select a story to manage images:
              </label>
              <select
                id="story-select"
                value={selectedStoryId}
                onChange={(e) => {
                  setSelectedStoryId(e.target.value);
                  setUploadedImages([]);
                  setError('');
                  setSuccess('');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose a story...</option>
                {stories.map(story => (
                  <option key={story.id} value={story.id}>
                    {story.title} ({story.images.length} images)
                  </option>
                ))}
              </select>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-600">{success}</p>
              </div>
            )}

            {/* Story Info */}
            {selectedStory && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                  {selectedStory.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
                  <div>
                    <strong>Current Images:</strong> {selectedStory.images.length}
                  </div>
                  <div>
                    <strong>Reading Time:</strong> {selectedStory.readingTime} min
                  </div>
                  <div>
                    <strong>Age Group:</strong> {selectedStory.ageGroup}
                  </div>
                </div>
                <p className="text-blue-600 mt-2">{selectedStory.description}</p>
              </div>
            )}

            {/* Upload Section */}
            {selectedStoryId ? (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Upload New Images</h2>
                <ImageUpload
                  storyId={selectedStoryId}
                  onImageUploaded={handleImageUploaded}
                  onError={handleUploadError}
                  className="mb-4"
                />
                
                <div className="text-sm text-gray-600">
                  <p>• Supported formats: PNG, JPG, GIF (up to 5MB)</p>
                  <p>• Images will be organized in the story's folder</p>
                  <p>• Drag and drop or click to upload</p>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-gray-600">Please select a story first to manage its images.</p>
              </div>
            )}

            {/* Recently Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Recently Uploaded Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <div className="text-sm space-y-1">
                        <p><strong>File:</strong> {image.fileName}</p>
                        <p><strong>Size:</strong> {(image.fileSize / 1024).toFixed(1)} KB</p>
                        <p><strong>Type:</strong> {image.mimeType}</p>
                        <p><strong>Position:</strong> {image.position}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="mt-2 w-full px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Existing Images */}
            {selectedStory && selectedStory.images.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Existing Images ({selectedStory.images.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedStory.images.map((image) => (
                    <div key={image.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <div className="text-sm space-y-1">
                        <p><strong>Alt Text:</strong> {image.alt}</p>
                        <p><strong>Position:</strong> {image.position}</p>
                        {image.fileName && <p><strong>File:</strong> {image.fileName}</p>}
                        {image.fileSize && <p><strong>Size:</strong> {(image.fileSize / 1024).toFixed(1)} KB</p>}
                      </div>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="mt-2 w-full px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">How to Use:</h3>
              <ol className="list-decimal list-inside space-y-2 text-yellow-700">
                <li>Select a story from the dropdown above</li>
                <li>Upload new images using the upload area</li>
                <li>View and manage existing images</li>
                <li>Delete images if needed (use with caution)</li>
                <li>Images are automatically organized by story</li>
              </ol>
              <div className="mt-4 p-3 bg-yellow-100 rounded">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> This is an admin interface. Changes are permanent and will affect the live website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage; 