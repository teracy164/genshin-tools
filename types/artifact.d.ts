export type ArtifactPiece = 'flower' | 'plume' | 'eon' | 'goblet' | 'circlet';
export interface ArtifactSubOption {
  id: string;
  name: string;
  score: number;
  selected: boolean;
}
export interface Artifact {
  /** 部位 */
  piece: ArtifactPiece;
  /** 聖遺物種別 */
  typeId: string;
  /** 聖遺物レベル */
  level: number;
  /** 聖遺物スコア */
  score: number;
  /** サブOP */
  sub: ArtifactSubOption[];
}
