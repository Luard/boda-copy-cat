// @ts-check
import { defineConfig } from 'astro/config';
import { defaultLang } from './src/i18n/defaultLang';

// https://astro.build/config
export default defineConfig({
    site: 'https://elbodorrio2025.cat',
    i18n: {
        locales: ['es', 'ca'],
        defaultLocale: defaultLang,
        routing: {
            prefixDefaultLocale: false,
            redirectToDefaultLocale: true,
        },
    },
});
