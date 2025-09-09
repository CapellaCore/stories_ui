// next-i18next.config.js
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl', 'ru'],
    localeDetection: false, // Disable automatic locale detection
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: path.resolve('./public/locales'),
};
