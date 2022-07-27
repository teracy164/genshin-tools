<template>
  <div v-if="isLoading">
    loading...
  </div>
  <div v-else style="height: 100%">

    <header>
      <h1>Genshin Tools</h1>
      <div class="right-menu">
        <!-- <select :value="$language.selected" @change="changeLanguage($event)">
          <option value="en">English</option>
          <option value="ja">日本語</option>
          <option value="zhCN">簡体中文</option>
        </select> -->
      </div>
    </header>
    <main style="height: 100%">
      <NuxtPage />
    </main>
  </div>
</template>
<script setup lang="ts">
// import { LANGUAGE } from './plugins/language';

// TODO 現状、データ不要なためコメントアウトしておく
let isLoading = true;

const { $dictionary, $language } = useNuxtApp();
await $dictionary.loadData();

isLoading = false;

// const changeLanguage = (event: Event) => {
//   const value = (event.target as HTMLInputElement).value as LANGUAGE;
//   $language.changeLanguage(value);
// }
</script>
<style lang="scss">
header {
  background-color: #fff0f0;
  box-shadow: 1px 0px 5px 0px lightgray;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
  }
}

main {
  padding: 10px;
}
</style>