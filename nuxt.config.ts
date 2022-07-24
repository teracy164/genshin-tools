import { defineNuxtConfig } from 'nuxt';
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Genshin Tools',
      meta: [
        { name: 'description', content: '原神の聖遺物スコア計算ツールです。簡単な入力で聖遺物の強さが判定できます。' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/assets/favicon.ico' }],
    },
  },
  css: ['@/assets/css/styles.scss'],
});
