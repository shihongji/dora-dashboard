// i18n.js
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18n as nextI18NextConfig } from './next-i18next.config';

import enCommon from './public/locales/en/common.json';
import cnCommon from './public/locales/cn/common.json';

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { common: enCommon },
        cn: { common: cnCommon },
      },
      lng: nextI18NextConfig.defaultLocale,
      fallbackLng: nextI18NextConfig.defaultLocale,
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;