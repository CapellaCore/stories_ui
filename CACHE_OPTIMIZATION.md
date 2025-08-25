# Оптимизация кэширования данных

## Проблема

Изображения в проекте постоянно перезагружаются из-за неправильно настроенных заголовков кэширования.

## Решения

### 1. Supabase Storage кэширование

**Было:** `cacheControl: '3600'` (1 час)
**Стало:** `cacheControl: 'public, max-age=31536000, immutable'` (1 год)

```typescript
// В src/services/storage.ts
const { error: uploadError } = await supabase.storage
  .from('story-images')
  .upload(storagePath, file, {
    cacheControl: 'public, max-age=31536000, immutable',
    upsert: false
  });
```

### 2. Статические файлы кэширование

Создан файл `public/_headers` с настройками кэширования:

```text
# Cache static assets for 1 year
*.js
  Cache-Control: public, max-age=31536000, immutable

*.css
  Cache-Control: public, max-age=31536000, immutable

*.png, *.jpg, *.jpeg, *.gif, *.svg, *.webp
  Cache-Control: public, max-age=31536000, immutable
```

### 3. Оптимизация изображений

Добавлены атрибуты для лучшего кэширования:

```tsx
<img
  src={src}
  alt={alt}
  loading="lazy"
  decoding="async"
  // ... другие атрибуты
/>
```

### 4. Новый компонент OptimizedImage

Создан компонент `OptimizedImage` с улучшенным кэшированием и предзагрузкой.

## Заголовки кэширования

### Для изображений (1 год)
```
Cache-Control: public, max-age=31536000, immutable
```

### Для статических ресурсов (1 год)
```
Cache-Control: public, max-age=31536000, immutable
```

### Для HTML файлов (1 час)
```
Cache-Control: public, max-age=3600
```

### Для конфигурационных файлов (1 день)
```
Cache-Control: public, max-age=86400
```

## Проверка кэширования

### 1. Проверка заголовков Supabase Storage
```bash
curl -I "https://your-project.supabase.co/storage/v1/object/public/story-images/path/to/image.jpg"
```

### 2. Проверка заголовков статических файлов
```bash
curl -I http://localhost:3000/static/js/main.js
```

### 3. Проверка в браузере
1. Откройте DevTools (F12)
2. Перейдите на вкладку Network
3. Обновите страницу
4. Проверьте заголовки ответов для изображений

## Ожидаемые результаты

После внедрения этих изменений:

1. **Изображения будут кэшироваться на 1 год**
2. **Статические файлы будут кэшироваться на 1 год**
3. **Уменьшится количество сетевых запросов**
4. **Улучшится производительность загрузки страниц**
5. **Снизится нагрузка на сервер**

## Дополнительные оптимизации

### 1. Service Worker (для будущего)
Можно добавить Service Worker для кэширования в браузере.

### 2. CDN
Supabase Storage уже использует CDN, но можно настроить дополнительные CDN.

### 3. Сжатие изображений
Добавить автоматическое сжатие изображений перед загрузкой.

## Мониторинг

Для мониторинга эффективности кэширования:

1. **Lighthouse** - проверка производительности
2. **WebPageTest** - анализ загрузки ресурсов
3. **Browser DevTools** - мониторинг сетевых запросов

## Примечания

- `immutable` флаг означает, что файл никогда не изменится
- `max-age=31536000` = 365 дней в секундах
- Для development режима кэширование может работать по-другому
- В production режиме настройки кэширования будут более эффективны
