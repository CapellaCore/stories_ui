import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../../../../src/components/SimpleHeader';
import SimpleFooter from '../../../../src/components/SimpleFooter';
import StoryCard from '../../../../src/components/StoryCard';
import Pagination from '../../../../src/components/Pagination';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { seoOptimizedService } from '../../../../src/services/seo-optimized';
import { PaginationService } from '../../../../src/services/pagination';
import { generateTagHreflangLinks, generateTagCanonicalUrl } from '../../../../src/utils/hreflang';
import { ISR_REVALIDATE_SECONDS, STORIES_PER_PAGE, SUPPORTED_LOCALES, localeStaticPath } from '../../../../src/constants';
import { StoriesByTagPageProps } from '../../../../src/types/interfaces';

const TagStoriesPaged: React.FC<StoriesByTagPageProps> = ({
  tag,
  stories,
  pagination,
  paginationUrls,
  locale,
}) => {
  const { t } = useTranslation('common');
  const currentLocale = locale || 'en';
  const hreflangLinks = generateTagHreflangLinks(tag?.slug || '', currentLocale);
  const canonicalUrl = generateTagCanonicalUrl(tag?.slug || '', currentLocale);

  if (!tag) {
    return (
      <div className="min-h-screen flex flex-col">
        <SimpleHeader />
        <main className="flex-1">
          <div className="text-center text-red-600 p-4">Category not found</div>
        </main>
        <SimpleFooter />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${tag.name} - Page ${pagination.page}`}</title>
        <meta name="description" content={tag.description || `Stories in category ${tag.name}`} />
        <link rel="canonical" href={canonicalUrl} />
        {hreflangLinks.map(link => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <SimpleHeader />
        <main className="flex-1">
          <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
            <div className="w-full max-w-[960px] flex flex-col flex-1">
              <div className="px-4 py-3">
                <nav className="flex items-center space-x-2 text-sm text-[#577c8e]">
                  <Link href="/" className="hover:text-[#101619] transition-colors">
                    {t("common.home")}
                  </Link>
                  <span>/</span>
                  <Link href="/stories" className="hover:text-[#101619] transition-colors">
                    {t("header.stories")}
                  </Link>
                  <span>/</span>
                  <Link href={`/stories/${tag.slug}`} className="hover:text-[#101619] transition-colors">
                    {tag.name}
                  </Link>
                  <span>/</span>
                  <span className="text-[#101619]">{pagination.page}</span>
                </nav>
              </div>

              <div className="px-4 py-3">
                <h1 className="text-[#101619] text-xl md:text-2xl lg:text-[32px] font-bold leading-tight tracking-[-0.015em]">
                  {tag.name}
                </h1>
                <p className="text-[#577c8e] text-sm md:text-base font-normal leading-normal mt-2">
                  {t('stories.page')} {pagination.page} {t('stories.of')} {pagination.totalPages}
                </p>
              </div>

              <div className="px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {stories.map(story => (
                    <StoryCard key={story.id} story={story} tagSlug={tag.slug} />
                  ))}
                </div>
                <Pagination
                  urls={paginationUrls}
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  basePath={`/stories/${tag.slug}`}
                  locale={currentLocale}
                />
              </div>
            </div>
          </div>
        </main>
        <SimpleFooter />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = [];

  for (const language of SUPPORTED_LOCALES) {
    try {
      const tags = await seoOptimizedService.getTagsForStaticPaths(language);
      for (const tag of tags) {
        const result = await seoOptimizedService.getStoriesByTagPaginated(tag.slug, {
          page: 1,
          limit: STORIES_PER_PAGE,
          language,
        });

        for (let page = 2; page <= result.pagination.totalPages; page++) {
          paths.push(localeStaticPath(language, { tagSlug: tag.slug, page: page.toString() }));
        }
      }
    } catch (error) {
      console.error(`Error generating tag pagination paths for ${language}:`, error);
    }
  }

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<StoriesByTagPageProps> = async ({ params, locale }) => {
  const language = locale || 'en';
  const tagSlug = params?.tagSlug as string;
  const page = PaginationService.parsePageFromUrl(params?.page);

  if (!tagSlug || page < 2) {
    return { notFound: true };
  }

  const tag = await seoOptimizedService.getTagForStaticProps(tagSlug, language);
  if (!tag) {
    return { notFound: true };
  }

  const result = await seoOptimizedService.getStoriesByTagPaginated(tagSlug, {
    page,
    limit: STORIES_PER_PAGE,
    language,
  });

  if (page > result.pagination.totalPages) {
    return { notFound: true };
  }

  const paginationUrls = PaginationService.generatePaginationUrls(
    `/stories/${tagSlug}`,
    page,
    result.pagination.totalPages,
    language
  );

  return {
    props: {
      tagSlug,
      tag,
      stories: result.data,
      pagination: result.pagination,
      paginationUrls,
      locale: language,
      ...(await serverSideTranslations(language, ['common'])),
    },
    revalidate: ISR_REVALIDATE_SECONDS,
  };
};

export default TagStoriesPaged;
