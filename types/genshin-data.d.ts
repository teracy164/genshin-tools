/**
 * データ型については以下参照
 * https://genshin-dictionary.com/opendata/
 */
export declare namespace GenshinOpenData {
  type Tag =
    | 'mondstadt'
    | 'dragonspine'
    | 'liyue'
    | 'inazuma'
    | 'sumeru'
    | 'snezhnaya'
    | 'character-main'
    | 'character-sub'
    | 'how-to-call'
    | 'title'
    | 'enemy'
    | 'enemy-boss'
    | 'location'
    | 'domain'
    | 'event'
    | 'object'
    | 'organization'
    | 'quest-archon'
    | 'quest-world'
    | 'quest-random'
    | 'quest-story'
    | 'quest-daily'
    | 'item'
    | 'specialty'
    | 'levelup-material'
    | 'talent-material'
    | 'food'
    | 'artifact'
    | 'artifact-piece'
    | 'dialogue'
    | 'element'
    | 'sereniteapot'
    | 'weapon'
    | 'sword'
    | 'claymore'
    | 'polearm'
    | 'bow'
    | 'catalyst';
  interface GenshinRecord {
    id: string;
    en: string;
    zhCN: string;
    ja: string;
    pronunciationJa: string;
    tags: Tag[];
  }
}
