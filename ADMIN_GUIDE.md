# Admin Interface Guide

## Восстановление функциональности

Админ-интерфейс для управления изображениями был успешно восстановлен и адаптирован под Next.js.

### Что было сделано:

1. ✅ **Восстановлен ImageUpload компонент** (`src/components/ImageUpload.tsx`)
   - Адаптирован для Next.js с использованием `next-i18next`
   - Drag & Drop функциональность
   - Валидация файлов (тип и размер)
   - Визуальная обратная связь при загрузке

2. ✅ **Создана админ-страница** (`pages/admin.tsx`)
   - Использует Server-Side Rendering (SSR) через `getServerSideProps`
   - Интегрирована с существующим дизайном сайта
   - Полная поддержка многоязычности (en, pl, ru)

3. ✅ **Добавлены переводы**
   - Английский: уже существовал
   - Русский: уже существовал
   - Польский: добавлен

## Доступ к админ-панели

После запуска проекта, админ-панель будет доступна по адресу:

- **Development**: `http://localhost:3000/admin`
- **Production**: `https://timetosleep.org/admin`

Для всех языков:
- 🇬🇧 English: `/admin`
- 🇵🇱 Polski: `/pl/admin`
- 🇷🇺 Русский: `/ru/admin`

## Использование

### 1. Выбор истории
- Откройте `/admin`
- Выберите историю из выпадающего списка
- Вы увидите информацию об истории и текущих изображениях

### 2. Загрузка изображений
- **Метод 1**: Перетащите изображение в область загрузки
- **Метод 2**: Кликните на область загрузки и выберите файл

**Требования к файлам:**
- Форматы: PNG, JPG, GIF
- Максимальный размер: 5MB
- Автоматическая организация в папки по историям

### 3. Управление изображениями
- Просмотр загруженных изображений
- Удаление изображений (с подтверждением)
- Информация о размере и типе файла

## Технические детали

### Архитектура
```
pages/admin.tsx              # Админ-страница (Next.js)
├── getServerSideProps       # Загрузка данных на сервере
└── src/components/
    └── ImageUpload.tsx      # Компонент загрузки
        └── src/services/
            └── storage.ts   # API для работы с Supabase Storage
```

### Хранение
- **Bucket**: `story-images`
- **Структура**: `stories/{story-id}/{unique-filename}`
- **База данных**: Таблица `story_images`

### Безопасность
⚠️ **Важно**: Страница не имеет встроенной аутентификации. Рекомендуется:
- Добавить аутентификацию через Supabase Auth
- Настроить RLS политики в Supabase
- Ограничить доступ на уровне Vercel или через middleware

## Интеграция с Supabase

Убедитесь, что в `.env.local` указаны:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Bucket `story-images` должен быть:
- ✅ Public (для чтения)
- ✅ Настроены RLS политики для загрузки

## Запуск

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## Отличия от предыдущей версии

### Старая версия (React Router)
- `src/pages/AdminPage.tsx`
- React Router для навигации
- React Helmet для SEO
- Create React App

### Новая версия (Next.js)
- `pages/admin.tsx`
- Next.js routing (файловый роутинг)
- Next.js Head для SEO
- Server-Side Rendering
- Better SEO и производительность

## Дополнительная информация

Подробнее о хранилище изображений:
- [SUPABASE_STORAGE_SETUP.md](SUPABASE_STORAGE_SETUP.md)

---

**Дата восстановления**: 1 октября 2025  
**Версия**: Next.js (после миграции с CRA)

