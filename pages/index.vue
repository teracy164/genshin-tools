<template>
    <div ref="elMain" class="main">
        <div class="title-area">
            <select class="character clear" :value="artifacts.characterId" @change="selectCharacter($event)">
                <option>(キャラを選択)</option>
                <option v-for="c of $dictionary.characters" :value="c.id">{{ c[$language.selected] }}</option>
            </select>
            <Score :score="totalScore" :borders="{ good: 140, amazing: 170, god: 200 }" />
        </div>
        <div style="position: fixed; left: 0; bottom: 0; max-width: 100vw">
            <div style="display: flex; justify-content: start;">
                <a class="material-icons expand" @click="param.collapse = !param.collapse">
                    {{ param.collapse ? 'expand_less' : 'expand_more' }}
                </a>
            </div>
            <div :class="{ collapse: param.collapse }" style="display: flex; flex-wrap: nowrap; overflow-x: auto;">
                <template v-for="piece of pieces">
                    <ArtifactDetail :artifact="artifacts[piece]" @change:subop="update" />
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Artifact, Artifacts } from '~~/types/artifact';
import { subOptions, ArtifactPiece } from '~~/constants/artifacts';

const { $dictionary, $language, $storage } = useNuxtApp();
const param = reactive({ img: '', collapse: false });
const elMain = ref<HTMLDivElement>(null);

const pieces: ArtifactPiece[] = [
    ArtifactPiece.FLOWER,
    ArtifactPiece.PLUME,
    ArtifactPiece.EON,
    ArtifactPiece.GOBLET,
    ArtifactPiece.CIRCLET,
];
const getInitData = (): Artifacts => {
    return pieces.reduce((artifacts, piece) => {
        artifacts[piece] = {
            piece,
            level: 0,
            score: 0,
            typeId: '',
            sub: subOptions.map(op => ({ id: op.id, name: op[$language.selected], score: null, selected: false, }))
        } as Artifact;
        return artifacts;
    }, { characterId: '' } as Artifacts);
}

const update = () => {
    $storage.updateArtifacts(artifacts.value)
    // 再計算
    calcTotalScore();
}

const calcTotalScore = () => {
    const score = pieces.reduce((total, piece) => total + artifacts.value[piece].score, 0);
    totalScore.value = Math.floor(score * 10) / 10;

}

const selectCharacter = (event: Event) => {
    const characterId = (event.target as HTMLSelectElement).value;
    setCharacter(characterId);
}

const setCharacter = (characterId: string) => {
    const target = $dictionary.characters.find(c => c.id === characterId);
    artifacts.value.characterId = characterId;
    if (target) {
        const name = target.zhCN.split('·')[0];
        param.img = `https://bbs.hoyolab.com/hoyowiki/picture/character/${name}/avatar.png`;
        elMain.value.style.backgroundImage = `url('${param.img}')`;
    } else {
        param.img = '';
        elMain.value.style.backgroundImage = '';
    }
    $storage.updateArtifacts(artifacts.value)
}

const totalScore = useState('totalScore', () => 0);
const artifacts = useState<Artifacts>('artifacts', () => $storage.getArtifacts() || getInitData());

onMounted(() => {
    if (artifacts) {
        setCharacter(artifacts.value.characterId)
        // 初期表示時の計算
        calcTotalScore();
    }
})
</script>
<script lang="ts">

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
    max-width: 100%;
}

.character {
    font-size: 1.2em;
    max-width: calc(100vw - 4.5em);
}

.expand {
    cursor: pointer;
}

.expand:hover {
    background-color: #ffeeee;
    border-radius: 3px;
}
</style>
