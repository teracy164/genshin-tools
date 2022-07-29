/** 聖遺物部位 */
export enum ArtifactPiece {
  /** 花 */
  FLOWER = 'flowe',
  /** 羽 */
  PLUME = 'plume',
  /** 時計 */
  EON = 'eon',
  /** 杯 */
  GOBLET = 'goblet',
  /** 冠 */
  CIRCLET = 'circlet',
}

/**
 * サブOP情報
 */
export const subOptions = [
  { id: 'cr', ja: '会心率', en: 'CRIT Rate' },
  { id: 'cd', ja: '会心ダメ', en: 'CIT DMG' },
  { id: 'em', ja: '元素熟知', en: 'Elemental Mastery', zhCH: '元素精通' },
  { id: 'er', ja: '元素チャ効率', en: 'Energy Recharge' },
  { id: 'hp', ja: 'HP', en: 'HP' },
  { id: 'hpr', ja: 'HP%', en: 'HP%' },
  { id: 'atk', ja: '攻撃力', en: 'ATK' },
  { id: 'ar', ja: '攻撃力%', en: 'ATK%' },
  { id: 'def', ja: '防御力', en: 'DEF' },
  { id: 'dr', ja: '防御力%', en: 'DEF%' },
];

/**
 * 聖遺物部位
 */
export const artifactPieces = {
  [ArtifactPiece.FLOWER]: { id: 'flower_of_life', ja: '花', en: 'Flower' },
  [ArtifactPiece.PLUME]: { id: 'plume_of_death', ja: '羽', en: 'Plume' },
  [ArtifactPiece.EON]: { id: 'sands_of_eon', ja: '時計', en: 'Eon' },
  [ArtifactPiece.GOBLET]: { id: 'goblet_of_eonothem', ja: '杯', en: 'Goblet' },
  [ArtifactPiece.CIRCLET]: { id: 'circlet_of_logos', ja: '冠', en: 'Circlet' },
};
