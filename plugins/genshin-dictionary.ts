import { GenshinOpenData } from '~~/types/genshin-data';

/**
 * 参考：https://genshin-dictionary.com/opendata/
 */
export class GenshinDictionary {
  private readonly DATA_URL = 'https://dataset.genshin-dictionary.com/words.json';
  private _characters: GenshinOpenData.GenshinRecord[] = [];
  private _artifacts: GenshinOpenData.GenshinRecord[] = [];

  get characters() {
    return this._characters;
  }
  get artifacts() {
    return this._artifacts;
  }

  async loadData() {
    const response = await useFetch(this.DATA_URL);

    const data = response.data.value as GenshinOpenData.GenshinRecord[];

    this._characters = data.filter((d) => d.tags?.includes('character-main'));

    /** 聖遺物に含めないデータ */
    const excludesArtifacts = [
      'artifact',
      'flower-of-life',
      'plume-of-death',
      'sands-of-eon',
      'goblet-of-eonothem',
      'circlet-of-logos',
    ];
    this._artifacts = data.filter((d) => !excludesArtifacts.includes(d.id) && d.tags?.includes('artifact'));
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dictionary: new GenshinDictionary(),
    },
  };
});
