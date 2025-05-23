import type { UserConfig } from 'next-i18next';

const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    localeDetection: false,
  },
};

export default i18nConfig;
