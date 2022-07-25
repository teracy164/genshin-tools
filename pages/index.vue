<template>
    <!-- <p>このサイトは以下サイトのデータを使用しています。</p>
    <a target="_blank" href="https://genshin-dictionary.com/opendata/">https://genshin-dictionary.com/opendata/</a> -->

    <div>
        <div class="title-area">
            <h2>聖遺物スコア計算ツール</h2>
            <span class="score"
                :class="{ good: totalScore >= 140, amazing: totalScore >= 170, god: totalScore >= 200 }">
                {{ totalScore }}
            </span>
        </div>
        <div>
            <p style="font-size: 0.9; margin: 0">算出: 会心率 x 2 + 会心ダメージ + 攻撃力%</p>
            <div style="font-size: 0.8em;display: flex; flex-wrap: wrap;">
                <span class="score">30 &gt; 弱</span>
                <span class="score good">30 &lt;= 良</span>
                <span class="score amazing">40 &lt;= 強</span>
                <span class="score god">50 &lt;= 神</span>
            </div>
        </div>
        <div style="display: flex; flex-wrap: wrap;">
            <template v-for="piece of Object.keys(artifacts)">
                <ArtifactDetail :artifact="artifacts[piece]" @change:subop="update" />
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Artifact, ArtifactPiece } from '~~/types/artifact';

const { $language } = useNuxtApp();

const storageKeyData = 'genshin-storage-data';
const subOptions = [
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

const getInitData = (): { [key: string]: Artifact } => {
    const pieces: ArtifactPiece[] = ['flower', 'plume', 'eon', 'goblet', 'circlet'];
    return pieces.reduce((artifacts, piece) => {
        artifacts[piece] = {
            piece,
            level: 0,
            score: 0,
            typeId: '',
            sub: subOptions.map(op => ({ id: op.id, name: op[$language.selected], score: null, selected: false, }))
        } as Artifact;
        return artifacts;
    }, {});
}

const totalScore = useState('totalScore', () => 0);
const artifacts = useState<{ [key: string]: Artifact }>('artifacts', () => {
    // 前回値が存在する場合は復元
    const tmp = localStorage.getItem(storageKeyData);
    if (tmp) {
        return JSON.parse(tmp);
    } else {
        return getInitData();
    }
});

const update = () => {
    localStorage.setItem(storageKeyData, JSON.stringify(artifacts.value));

    // 再計算
    calcTotalScore();
}

const calcTotalScore = () => {
    const score = Object.values(artifacts.value).reduce((total, artifact) => total + artifact.score, 0);
    totalScore.value = Math.floor(score * 10) / 10;
}

// 初期表示時の計算
calcTotalScore();
</script>
<style scoped lang="scss">
.title-area {
    display: flex;
    align-items: center;
}
</style>
