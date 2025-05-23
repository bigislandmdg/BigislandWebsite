// i18n/settings.ts
export const languages = ['en', 'fr'] as const;
export const defaultLang = 'en';

export const fallbackLng = defaultLang;

export const getOptions = (lng = fallbackLng) => ({
  // namespaces à charger
  supportedLngs: languages,
  fallbackLng,
  lng,
  defaultNS: 'common',
});
