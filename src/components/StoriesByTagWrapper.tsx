import React, {useEffect, useState} from "react";
import {useTranslation} from "../contexts/TranslationContext";
import {storiesApi} from "../services/supabase";
import LoadingSpinner from "./LoadingSpinner";
import StoriesByTagPage from "../pages/StoriesByTagPage";
import {Story} from "../types";

interface StoriesByTagWrapperProps {
    tagSlug: string;
    showAll: boolean;
    maxVisible: number;
    homePage: boolean;
    language: string;
}

const StoriesByTagWrapper: React.FC<StoriesByTagWrapperProps> = ({ tagSlug, showAll, maxVisible, homePage, language }) => {
    const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const fetchedStories = await storiesApi.getByTagSlug(tagSlug, language);
                setStories(fetchedStories);
            } catch (error) {
                console.error(`Error fetching stories for tag ${tagSlug}:`, error);
                setStories([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStories();
    }, [tagSlug, language]);

    if (isLoading) {
        return <LoadingSpinner message={t('home.loadingStories')} size="small" />;
    }

    if (stories.length === 0) {
        return null; // Don't render if no stories
    }

    return (
        <StoriesByTagPage
            tagSlug={tagSlug}
            showAll={showAll}
            maxVisible={maxVisible}
            homePage={homePage}
        />
    );
};

export default StoriesByTagWrapper;