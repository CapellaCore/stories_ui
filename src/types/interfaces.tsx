import {ReactNode} from "react";
import {Translations} from "./Translations";

export interface Story {
    id: string;
    title: string;
    content: string;
    description: string;
    slug: string;
    readingTime: number;
    ageGroup: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    images: Array<{
        id: string;
        src: string;
        alt: string;
        position: number;
    }>;
}

export interface LoadMoreButtonProps {
    onLoadMore: () => void;
    hasMore: boolean;
    loading: boolean;
    totalItems: number;
    currentItems: number;
}

export interface StoryImage {
    id: string;
    src: string;
    alt: string;
    position: number;
}

export interface StoryContentProps {
    content: string;
    images: StoryImage[];
}

export interface StoriesByTagPageProps {
    tagSlug: string;
    tag: Tag | null;
    allStories: Story[];
    locale?: string;
}

export interface StoriesPageProps {
    categories: Tag[];
    allStories: Story[];
    locale?: string;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
}

export interface HomePageProps {
    featuredStories: Story[];
    categories: Tag[];
    locale?: string;
}

export interface Locale {
    code: string; // e.g. "en", "pl"
    name: string; // e.g. "English", "Polish"
}

export interface StoryPageProps {
    tagSlug: string;
    storySlug: string;
    story: Story | null;
    tag: Tag | null;
    locale?: string;
}

export interface TranslationContextType {
    t: (key: string) => string;
    language: string;
    setLanguage: (lang: string) => void;
    translations: Translations;
}

export interface TagStory {
    id: string;
    name: string;
    slug: string; // для URL
    description: string;
    color: string;
    story_tags: StoryTag[];
}

export interface StoryTag {
    story_id: string;
    tag_id: string;
}

export interface TranslationProviderProps {
    children: ReactNode;
}

export interface LanguageSelectorProps {
    className?: string;
}

export interface SearchPageProps {
    initialStories: Story[];
    query: string | null;
}

