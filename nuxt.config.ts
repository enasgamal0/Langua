export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    'nuxt-swiper',
  ],
  i18n: {
    defaultLocale: 'ar',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'ar',
        name: 'Arabic',
        file: 'ar.json',
        dir: 'rtl',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        dir: 'ltr',
      },
    ],
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  plugins: [{ src: '~/plugins/aos.client.js', mode: 'client' }],
});