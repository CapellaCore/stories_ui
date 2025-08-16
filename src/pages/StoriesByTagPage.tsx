import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { useStoriesByTag } from '../hooks/useStories';
import { useTag } from '../hooks/useTags';
import LoadingSpinner from '../components/LoadingSpinner';
import StoriesList from '../components/StoriesList';
import {Link} from "react-router-dom";

interface StoriesByTagSectionProps {
  tagSlug: string;
  showAll?: boolean;
  maxVisible?: number;
  homePage?: boolean;
}

const StoriesByTagSection: React.FC<StoriesByTagSectionProps> = ({
  tagSlug,
  showAll = false,
  maxVisible = 3,
  homePage = false
}) => {
  const { t } = useTranslation();
  const { tag, loading: tagLoading, error: tagError } = useTag(tagSlug);
  const { stories, loading: storiesLoading, error: storiesError } = useStoriesByTag(tagSlug);

  if (tagLoading || storiesLoading) {
    return <LoadingSpinner message={t('storiesByTag.loading')} size="large" />;
  }

  if (tagError || storiesError || !tag) {
    return (
        <div className="text-center text-red-600 p-4">
          {tagError || storiesError || t('storiesByTag.tagNotFound')}
        </div>
    );
  }

  return homePage ? (
      <section className="mb-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4">
              <div>
                  <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight">
                      <Link to={`/stories/${tag.slug}`} className="hover:underline">
                          {tag.name}
                      </Link>
                  </h2>
                  <p className="text-[#577c8e] text-sm md:text-base">{tag.description}</p>
              </div>
          </div>
          <StoriesList
              stories={stories}
              tagSlug={tag.slug}
              showAll={showAll}
              maxVisible={maxVisible}
              className="mt-4"
          />
      </section>
  ) : (
      <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
          <div className="w-full max-w-[960px] flex flex-col flex-1">
              <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  {t('home.allStories')}
              </h2>
              <StoriesList
                  stories={stories}
                  tagSlug={tag.slug}
                  showAll={showAll}
                  maxVisible={maxVisible}
                  className="mt-4"
              />
          </div>
      </div>
  );
};

export default StoriesByTagSection;