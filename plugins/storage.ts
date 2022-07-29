import { Artifacts } from '~~/types/artifact';

export class Storage {
  private readonly storageKey = 'artifacts';

  getArtifacts(): Artifacts {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data) as Artifacts;
    }
    return null;
  }

  updateArtifacts(artifacts: Artifacts) {
    localStorage.setItem(this.storageKey, JSON.stringify(artifacts));
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      storage: new Storage(),
    },
  };
});
