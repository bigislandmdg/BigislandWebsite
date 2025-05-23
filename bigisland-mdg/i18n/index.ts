import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getOptions } from './settings';

void i18n.use(initReactI18next).init(getOptions());

export default i18n;
