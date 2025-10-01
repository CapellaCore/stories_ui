import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SimpleHeader from '../src/components/SimpleHeader';
import SimpleFooter from '../src/components/SimpleFooter';
import ImageUpload from '../src/components/ImageUpload';
import { seoOptimizedService } from '../src/services/seo-optimized';

interface Story {
  id: string;
  title: string;
  description: string;
  readingTime: number;
  ageGroup: string;
  images: Array<{
    id: string;
    src: string;
    alt: string;
    position: number;
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    storagePath?: string;
  }>;
}

interface AdminPageProps {
  stories: Story[];
  locale: string;
}

const AdminPage: React.FC<AdminPageProps> = ({ stories, locale }) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { t } = useTranslation('common');

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
    if (!confirm(t('upload.deleteConfirm') || 'Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const { storageService } = await import('../src/services/storage');
      const result = await storageService.deleteImage(imageId);
      
      if (result.success) {
        setUploadedImages(prev => prev.filter(img => img.id !== imageId));
        setSuccess(t('upload.deleteSuccess') || '✅ Image deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
        
        // Refresh page to update story data
        window.location.reload();
      } else {
        setError(`${t('upload.deleteFailed')}: ${result.error}`);
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      setError(t('upload.deleteFailed') || 'Error deleting image');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <>
      <Head>
        <title>Admin - Image Management - {t('home.title')}</title>
        <meta name="description" content="Admin interface for managing story images" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <SimpleHeader />

        <main className="flex-1">
          <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
            <div className="w-full max-w-[960px] flex flex-col flex-1">
              {/* Breadcrumbs */}
              <div className="px-4 py-3">
                <nav className="flex items-center space-x-2 text-sm text-[#577c8e]">
                  <Link href="/" className="hover:text-[#101619] transition-colors">
                    {t('common.home')}
                  </Link>
                  <span>/</span>
                  <span className="text-[#101619]">Admin</span>
                </nav>
              </div>

              <div className="px-4">
                <h1 className="text-3xl font-bold mb-6 text-[#101619]">Admin - Image Management</h1>
                
                {/* Story Selection */}
                <div className="mb-6">
                  <label htmlFor="story-select" className="block text-sm font-medium text-[#101619] mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-[#101619]"
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
                    <h2 className="text-xl font-semibold mb-4 text-[#101619]">Upload New Images</h2>
                    <ImageUpload
                      storyId={selectedStoryId}
                      onImageUploaded={handleImageUploaded}
                      onError={handleUploadError}
                      className="mb-4"
                    />
                    
                    <div className="text-sm text-[#577c8e]">
                      <p>• Supported formats: PNG, JPG, GIF (up to 5MB)</p>
                      <p>• Images will be organized in the story&apos;s folder</p>
                      <p>• Drag and drop or click to upload</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-[#577c8e]">Please select a story first to manage its images.</p>
                  </div>
                )}

                {/* Recently Uploaded Images */}
                {uploadedImages.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-[#101619]">Recently Uploaded Images</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover rounded-md mb-2"
                          />
                          <div className="text-sm space-y-1 text-[#577c8e]">
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
                    <h2 className="text-xl font-semibold mb-4 text-[#101619]">Existing Images ({selectedStory.images.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedStory.images.map((image) => (
                        <div key={image.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover rounded-md mb-2"
                          />
                          <div className="text-sm space-y-1 text-[#577c8e]">
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
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
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
        </main>

        <SimpleFooter />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<AdminPageProps> = async ({ locale }) => {
  try {
    const language = locale || 'en';
    
    // Get all stories for the admin interface
    const { stories } = await seoOptimizedService.getStoriesForHomePage(language);

    return {
      props: {
        stories,
        locale: language,
        ...(await serverSideTranslations(language, ['common'])),
      },
    };
  } catch (error) {
    console.error('Error fetching stories for admin:', error);
    return {
      props: {
        stories: [],
        locale: locale || 'en',
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      },
    };
  }
};

export default AdminPage;

