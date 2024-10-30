// next-i18next.config.js
export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'cn'],
};
export const localePath = typeof window === 'undefined'
    ? require('path').resolve('./public/locales')
    : '/public/locales';