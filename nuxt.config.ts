import { defineNuxtConfig } from 'nuxt';
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    cdnURL: process.env.BASE_URL,
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: (process.env.BASE_URL || '') + '/assets/favicon.ico' }],
    },
  },
  css: ['@/assets/css/styles.scss'],
});
