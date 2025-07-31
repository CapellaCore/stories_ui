export interface Story {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  images: StoryImage[];
  readingTime: number; // в минутах
  ageGroup: '3-5' | '6-8' | '9-12';
  slug: string; // для URL
  createdAt: string;
  updatedAt: string;
}

export interface StoryImage {
  id: string;
  src: string;
  alt: string;
  position: number; // позиция в тексте
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  storagePath?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string; // для URL
  description: string;
  color: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
} 