import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    cdnURL: process.env.BASE_RUL,
  },
  css: ['@/assets/css/styles.scss'],
});
