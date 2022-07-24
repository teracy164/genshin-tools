import { defineNuxtConfig } from 'nuxt';
console.log('BASE URL', process.env.BASE_URL);
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: { cdnURL: process.env.BASE_URL },
  css: ['@/assets/css/styles.scss'],
});
