# Internationalization (i18n) System

This project uses a centralized translation system to manage all text content in multiple languages.

## Structure

- `pl.json` - Polish translations (default language)
- `en.json` - English translations
- `TranslationContext.tsx` - React context for managing translations
- `LanguageSwitcher.tsx` - Component for switching between languages

## Usage

### Using translations in components

```tsx
import { useTranslation } from '../contexts/TranslationContext';

const MyComponent: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.welcomeTitle')}</h1>
      <p>{t('home.welcomeDescription')}</p>
    </div>
  );
};
```

### Translation keys

Translation keys use dot notation to access nested objects:

```json
{
  "home": {
    "welcomeTitle": "Welcome to the world of stories!",
    "welcomeDescription": "Engaging stories for children..."
  }
}
```

Access with: `t('home.welcomeTitle')`

### Adding new translations

1. Add the translation key to both `pl.json` and `en.json`
2. Use the translation in your component with `t('key.path')`

### Language switching

The `LanguageSwitcher` component allows users to switch between Polish (PL) and English (EN). The selected language is stored in localStorage and persists across sessions.

## Translation Categories

- `common` - Common UI elements (loading, error, navigation)
- `header` - Header navigation and branding
- `home` - Homepage content
- `about` - About page content
- `contact` - Contact page content
- `footer` - Footer content
- `terms` - Terms of use page
- `privacy` - Privacy policy page
- `story` - Story page content
- `tag` - Tag/category page content

## Best Practices

1. Use descriptive key names that reflect the content
2. Group related translations under logical categories
3. Keep translations concise and clear
4. Test both languages when adding new content
5. Use consistent terminology across translations 