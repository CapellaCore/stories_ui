const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugStories() {
  console.log('🔍 Debugging stories in database...\n');

  // Get all stories with their tags
  const { data: allStories, error: storiesError } = await supabase
    .from('stories')
    .select(`
      id,
      slug,
      title,
      story_tags (
        tags (
          slug,
          name
        )
      )
    `)
    .order('slug');

  if (storiesError) {
    console.error('Error fetching stories:', storiesError);
    return;
  }

  console.log(`📚 Total stories in database: ${allStories.length}\n`);

  // Group by category
  const categories = {};
  allStories.forEach(story => {
    const tagSlug = story.story_tags?.[0]?.tags?.slug;
    if (tagSlug) {
      if (!categories[tagSlug]) {
        categories[tagSlug] = [];
      }
      categories[tagSlug].push({
        slug: story.slug,
        title: story.title
      });
    }
  });

  // Display by category
  Object.keys(categories).forEach(category => {
    console.log(`📁 ${category.toUpperCase()} (${categories[category].length} stories):`);
    categories[category].forEach(story => {
      console.log(`  - ${story.slug} (${story.title})`);
    });
    console.log('');
  });

  // Check translations
  console.log('🌐 Checking translations...\n');

  const { data: translations, error: transError } = await supabase
    .from('story_translation')
    .select(`
      story_id,
      language,
      title,
      stories (
        slug
      )
    `)
    .order('language, stories.slug');

  if (transError) {
    console.error('Error fetching translations:', transError);
    return;
  }

  // Group translations by language
  const translationsByLang = {};
  translations.forEach(trans => {
    if (!translationsByLang[trans.language]) {
      translationsByLang[trans.language] = [];
    }
    translationsByLang[trans.language].push({
      slug: trans.stories.slug,
      title: trans.title
    });
  });

  Object.keys(translationsByLang).forEach(lang => {
    console.log(`🗣️  ${lang.toUpperCase()} translations (${translationsByLang[lang].length} stories):`);
    translationsByLang[lang].forEach(story => {
      console.log(`  - ${story.slug} (${story.title})`);
    });
    console.log('');
  });

  // Check which stories are missing translations
  console.log('❌ Stories missing translations:');
  const allStorySlugs = allStories.map(s => s.slug);
  const translatedSlugs = translations.map(t => t.stories.slug);
  const missingTranslations = allStorySlugs.filter(slug => !translatedSlugs.includes(slug));
  
  if (missingTranslations.length === 0) {
    console.log('  ✅ All stories have translations!');
  } else {
    missingTranslations.forEach(slug => {
      const story = allStories.find(s => s.slug === slug);
      const category = story?.story_tags?.[0]?.tags?.slug || 'unknown';
      console.log(`  - ${slug} (${story?.title}) [${category}]`);
    });
  }
}

debugStories().catch(console.error);
