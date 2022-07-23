import { GenshinDictionary } from "~~/plugins/genshin-dictionary";

declare module "#app" {
  interface NuxtApp {
    $dictionary: GenshinDictionary;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dictionary: GenshinDictionary;
  }
}

export {};
