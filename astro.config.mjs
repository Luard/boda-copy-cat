// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'http://elbodorrio2025.com',
    i18n: {
        locales: ['es', 'ca'],
        defaultLocale: 'ca',
        routing: {
            prefixDefaultLocale: false,
            redirectToDefaultLocale: true,
        },
    },
});
