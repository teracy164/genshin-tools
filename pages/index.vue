<template>
    <!-- <p>このサイトは以下サイトのデータを使用しています。</p>
    <a target="_blank" href="https://genshin-dictionary.com/opendata/">https://genshin-dictionary.com/opendata/</a> -->

    <div ref="elMain" class="main">
        <div class="title-area">
            <select class="character clear" @change="selectCharacter($event)">
                <option>(キャラを選択)</option>
                <option v-for="c of $dictionary.characters" :value="c.id">{{ c[$language.selected] }}</option>
            </select>
            <Score :score="totalScore" :borders="{ good: 140, amazing: 170, god: 200 }" />
        </div>
        <div style="position: fixed; bottom: 0; max-width: 100%">
            <div style="display: flex; justify-content: end;">
                <a class="material-icons expand" @click="param.collapse = !param.collapse">
                    {{ param.collapse ? 'expand_less' : 'expand_more' }}
                </a>
            </div>
            <div :class="{ collapse: param.collapse }" style="display: flex; flex-wrap: nowrap; overflow-x: auto;">
                <template v-for="piece of Object.keys(artifacts)">
                    <ArtifactDetail :artifact="artifacts[piece]" @change:subop="update" />
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Artifact, ArtifactPiece } from '~~/types/artifact';

const { $dictionary, $language } = useNuxtApp();

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
const param = reactive({ img: '', collapse: false });
const elMain = ref<HTMLDivElement>(null);

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

const selectCharacter = (event: Event) => {
    const characterId = (event.target as HTMLSelectElement).value;
    const target = $dictionary.characters.find(c => c.id === characterId);
    if (target) {
        const name = target.zhCN.split('·')[0];
        param.img = `https://bbs.hoyolab.com/hoyowiki/picture/character/${name}/avatar.png`;
        elMain.value.style.backgroundImage = `url('${param.img}')`;
    } else {
        param.img = '';
        elMain.value.style.backgroundImage = '';
    }
    console.log(target, param.img)
}

// 初期表示時の計算
calcTotalScore();
</script>
<style scoped lang="scss">
.main {
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
}

.title-area {
    display: flex;
    align-items: center;
}

.character {
    font-size: 1.3em;
}

.expand {
    cursor: pointer;
}

.expand:hover {
    background-color: #ffeeee;
    border-radius: 3px;
}
</style>
