import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleHeader from '../src/components/SimpleHeader';
import SimpleFooter from '../src/components/SimpleFooter';
import StoryCard from '../src/components/StoryCard';
import type { HomePageProps } from '../src/types/interfaces';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps, GetStaticPropsContext } from 'next';

const HomePage: React.FC<HomePageProps> = ({ featuredStories, categories }) => {
  // Helper function to get stories by tag
  const getStoriesByTag = (tagSlug: string) => {
    return featuredStories.filter(story =>
      story.tags.some(tag => tag.toLowerCase() === tagSlug)
    );
  };

  // Get stories for each category
  const animalStories = getStoriesByTag('animals');
  const classicStories = getStoriesByTag('classic');
  const originalStories = getStoriesByTag('originals');

    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>Time to Sleep - Bedtime Stories for Your Children</title>
                <meta
                    name="title"
                    content="Time to Sleep - Bedtime Stories for Your Children"
                />
                <meta
                    name="description"
                    content="Time to Sleep - Bedtime Stories for Your Children. Discover magical stories with beautiful illustrations perfect for family reading and helping children fall asleep peacefully."
                />
                <meta
                    name="keywords"
                    content="bedtime stories, children's stories, stories for children, stories with pictures, time to sleep, family reading"
                />
                <link rel="canonical" href="https://timetosleep.org/" />
                <meta
                    property="og:title"
                    content="Time to Sleep - Bedtime Stories for Your Children"
                />
                <meta
                    property="og:description"
                    content="Time to Sleep - Bedtime Stories for Your Children. Discover magical stories with beautiful illustrations perfect for family reading and helping children fall asleep peacefully."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://timetosleep.org/" />
                <meta
                    property="og:image"
                    content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg"
                />

                {/* Twitter Card */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:title"
                    content="Time to Sleep - Bedtime Stories for Your Children"
                />
                <meta
                    property="twitter:description"
                    content="Time to Sleep - Bedtime Stories for Your Children. Discover magical stories with beautiful illustrations perfect for family reading and helping children fall asleep peacefully."
                />
                <meta
                    property="twitter:image"
                    content="https://timetosleep.org/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg"
                />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        name: 'Time to Sleep - Bedtime Stories for Your Children',
                        description:
                            'Time to Sleep - Bedtime Stories for Your Children. Discover magical stories with beautiful illustrations perfect for family reading and helping children fall asleep peacefully.',
                        url: 'https://timetosleep.org/',
                        potentialAction: {
                            '@type': 'SearchAction',
                            target: `https://timetosleep.org/search?q={search_term_string}`,
                            'query-input': 'required name=search_term_string',
                        },
                    })}
                </script>

                {/* Breadcrumbs Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Main',
                                item: 'https://timetosleep.org',
                            },
                        ],
                    })}
                </script>
            </Head>

            <div className="min-h-screen flex flex-col">
                <SimpleHeader />

                <main className="flex-1">
                    <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-4 md:py-5">
                        <div className="w-full max-w-[960px] flex flex-col flex-1">
                            {/* Welcome Section */}
                            <div className="flex flex-wrap justify-between gap-3 p-4">
                                <div className="flex w-full md:min-w-72 flex-col gap-3">
                                    <p className="text-[#101619] tracking-light text-xl md:text-2xl lg:text-[32px] font-bold leading-tight">
                                        {t('home.welcomeTitle')}
                                    </p>
                                    <p className="text-[#577c8e] text-sm font-normal leading-normal">
                                        {t('home.welcomeDescription')}
                                    </p>
                                </div>
                            </div>

                            {/* Animals Category Section */}
                            {animalStories.length > 0 && (
                                <section className="mb-10">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4">
                                        <div>
                                            <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight">
                                                <Link
                                                    href="/stories/animals"
                                                    className="hover:underline"
                                                >
                                                    {t('categories.animals')}
                                                </Link>
                                            </h2>
                                            <p className="text-[#577c8e] text-sm md:text-base">
                                                {t('categories.animals_desc')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex overflow-x-auto gap-3 p-4">
                                            {animalStories.slice(0, 12).map(story => (
                                                <div key={story.id} className="flex-shrink-0 w-64">
                                                    <StoryCard story={story} tagSlug="animals" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Classic Category Section */}
                            {classicStories.length > 0 && (
                                <section className="mb-10">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4">
                                        <div>
                                            <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight">
                                                <Link
                                                    href="/stories/classic"
                                                    className="hover:underline"
                                                >
                                                    {t('categories.classic')}
                                                </Link>
                                            </h2>
                                            <p className="text-[#577c8e] text-sm md:text-base">
                                                {t('categories.classic_desc')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex overflow-x-auto gap-3 p-4">
                                            {classicStories.slice(0, 12).map(story => (
                                                <div key={story.id} className="flex-shrink-0 w-64">
                                                    <StoryCard story={story} tagSlug="classic" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Originals Category Section */}
                            {originalStories.length > 0 && (
                                <section className="mb-10">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4">
                                        <div>
                                            <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight">
                                                <Link
                                                    href="/stories/originals"
                                                    className="hover:underline"
                                                >
                                                    {t('categories.originals')}
                                                </Link>
                                            </h2>
                                            <p className="text-[#577c8e] text-sm md:text-base">
                                                {t('categories.originals_desc')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex overflow-x-auto gap-3 p-4">
                                            {originalStories.slice(0, 12).map(story => (
                                                <div key={story.id} className="flex-shrink-0 w-64">
                                                    <StoryCard story={story} tagSlug="originals" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* All Stories Section */}
                            <h2 className="text-[#101619] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                                <Link href="/stories" className="hover:underline">
                                    {t('categories.all_stories')}
                                </Link>
                            </h2>
                            <div className="mt-4">
                                <div className="flex overflow-x-auto gap-3 p-4">
                                    {featuredStories.slice(0, 25).map(story => (
                                        <div key={story.id} className="flex-shrink-0 w-64">
                                            <StoryCard
                                                story={story}
                                                tagSlug={story.tags[0]?.toLowerCase() || 'stories'}
                                            />
                                        </div>
                                    ))}
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

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
    try {
        // Import the API functions
        const { storiesApi } = await import('../src/services/supabase');
        const { tagsApi } = await import('../src/services/supabase');

        // Fetch data
        const allStories = await storiesApi.getAllByLanguage(locale ?? 'en');
        const categories = await tagsApi.getAllActualTags(locale ?? 'en');

        return {
            props: {
                featuredStories: allStories.slice(0, 25), // Latest 25 stories
                categories,
                ...(await serverSideTranslations(locale ?? 'en', ['common'])),
            },
            revalidate: 1, // Rebuild every 60 seconds
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                featuredStories: [],
                categories: [],
                ...(await serverSideTranslations(locale ?? 'en', ['common'])),
            },
            revalidate: 1,
        };
    }
};

export default HomePage;