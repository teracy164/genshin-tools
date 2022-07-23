export enum Artifact {
  /** 翠緑の影 */
  Viridescent_Venerer = 1,
  /** 辰砂往生録 */
  Vermillion_Hereafter,
}

/** 聖遺物 */
export const ArtifactDetails = {
  ja: {
    [Artifact.Viridescent_Venerer]: {
      name: "翠緑の影",
      main: "HP",
      description: "",
    },
    [Artifact.Vermillion_Hereafter]: {
      name: "辰砂往生録",
      main: "HP",
      description: "",
    },
  },
  ch: {
    [Artifact.Viridescent_Venerer]: {
      name: "翠绿之影",
      main: "HP",
      description: "",
    },
    [Artifact.Vermillion_Hereafter]: {
      name: "辰砂往生录",
      main: "HP",
      description: "",
    },
  },
  en: {
    [Artifact.Viridescent_Venerer]: {
      name: "Viridescent Venerer",
      main: "HP",
      description: "",
    },
    [Artifact.Vermillion_Hereafter]: {
      name: "Vermillion Hereafter",
      main: "HP",
      description: "",
    },
  },
};
