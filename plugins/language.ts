export enum LANGUAGE {
  EN = "en",
  JP = "ja",
  CH_ZH = "zhCN",
}

export const LanguageInfo = {
  [LANGUAGE.EN]: { [LANGUAGE.JP]: "英語" },
};

export class Language {
  private lang: LANGUAGE = LANGUAGE.JP;

  get selected() {
    return this.lang;
  }

  changeLanguage(lang: LANGUAGE) {
    this.lang = lang;
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      language: new Language(),
    },
  };
});
