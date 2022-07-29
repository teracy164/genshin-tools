import { ArtifactPiece } from '~~/constants/artifacts';

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
export interface Artifacts {
  characterId: string;
  [ArtifactPiece.FLOWER]: Artifact;
  [ArtifactPiece.PLUME]: Artifact;
  [ArtifactPiece.EON]: Artifact;
  [ArtifactPiece.GOBLET]: Artifact;
  [ArtifactPiece.CIRCLET]: Artifact;
}
