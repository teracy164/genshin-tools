<template>
    <!-- <p>このサイトは以下サイトのデータを使用しています。</p>
    <a target="_blank" href="https://genshin-dictionary.com/opendata/">https://genshin-dictionary.com/opendata/</a> -->

    <div>
        <div class="title-area">
            <h2>聖遺物 - Artifacts</h2>
            <span class="score"
                :class="{ good: totalScore >= 150, amazing: totalScore >= 190, god: totalScore >= 225 }">
                {{ totalScore }}
            </span>
        </div>
        <div style="display:flex; align-items: center; flex-wrap: wrap;">
            <p style="margin: 0">算出方法: 会心率 x 2 + 会心ダメージ + 攻撃力%</p>
            <span class="score good">強い</span>
            <span class="score amazing">超強い</span>
            <span class="score god">神</span>
        </div>
        <div style="display: flex; flex-wrap: wrap;">
            <template v-for="piece of Object.keys(artifacts)">
                <ArtifactDetail :artifact="artifacts[piece]" @change:subop="calcTotalScore" />
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Artifact } from '~~/types/artifact';

const { $language } = useNuxtApp();

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
const totalScore = useState('totalScore', () => 0);
const artifacts = useState<{ [key: string]: Artifact }>('artifacts', () => {
    const data: { [key: string]: Artifact } = {
        flower: { piece: 'flower', typeId: '', level: 0, score: 0, sub: [] },
        plume: { piece: 'plume', typeId: '', level: 0, score: 0, sub: [] },
        eon: { piece: 'eon', typeId: '', level: 0, score: 0, sub: [] },
        goblet: { piece: 'goblet', typeId: '', level: 0, score: 0, sub: [] },
        circlet: { piece: 'circlet', typeId: '', level: 0, score: 0, sub: [] },
    };

    Object.values(data).forEach(artifact => {
        subOptions.forEach(op => artifact.sub.push({ id: op.id, name: op[$language.selected], score: null, selected: false }))
    });
    return data;
});


const calcTotalScore = () => totalScore.value = Object.values(artifacts.value).reduce((total, artifact) => total + artifact.score, 0);
</script>
<style scoped lang="scss">
.title-area {
    display: flex;
    align-items: center;
}
</style>
