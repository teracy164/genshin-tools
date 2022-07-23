<template>
    <p>このサイトは以下サイトのデータを使用しています。</p>
    <a target="_blank" href="https://genshin-dictionary.com/opendata/">https://genshin-dictionary.com/opendata/</a>
    <div>
        <h1>Total Score</h1>
        {{ totalScore }}
    </div>

    <div>
        <h1>聖遺物 - Artifacts</h1>
        <div style="display: flex; flex-wrap: wrap;">
            <div class="artifact">
                <div class="artifact-type">
                    <h3>花</h3>
                    <span class="score">{{ artifacts.flower.score }}</span>
                </div>
                <PickArtifacts :value="artifacts.flower.id" @chage="artifacts.flower.id = $event" />
                <div class="sub-options">
                    <div class="sub-option" :class="{ selected: op.selected }" v-for="op of artifacts.flower.sub">
                        <label @click="op.selected = !op.selected">
                            <a>{{ op.name }}</a>
                        </label>
                        <input v-model="op.score" :disabled="!op.selected" @input="changeSubOption(artifacts.flower)" />
                    </div>
                </div>
            </div>
            <div class="artifact">
                <div class="artifact-type">
                    <h3>羽</h3>
                    <span class="score">{{ artifacts.plume.score }}</span>
                </div>
                <PickArtifacts :value="artifacts.plume.id" @chage="artifacts.plume.id = $event" />
                <div class="sub-options">
                    <div class="sub-option" v-for="op of artifacts.plume.sub">
                        <label>
                            <a @click="op.selected = !op.selected">{{ op.name }}</a>
                        </label>
                        <input v-model="op.score" :disabled="!op.selected" @input="changeSubOption(artifacts.plume)" />
                    </div>
                </div>
            </div>
            <div class="artifact">
                <div class="artifact-type">
                    <h3>時計</h3>
                    <span class="score">{{ artifacts.eon.score }}</span>
                </div>
                <PickArtifacts :value="artifacts.eon.id" @chage="artifacts.eon.id = $event" />
                <div class="sub-options">
                    <div class="sub-option" v-for="op of artifacts.eon.sub">
                        <label>
                            <a @click="op.selected = !op.selected">{{ op.name }}</a>
                        </label>
                        <input v-model="op.score" :disabled="!op.selected" @input="changeSubOption(artifacts.eon)" />
                    </div>
                </div>
            </div>
            <div class="artifact">
                <div class="artifact-type">
                    <h3>杯</h3>
                    <span class="score">{{ artifacts.goblet.score }}</span>
                </div>
                <PickArtifacts :value="artifacts.goblet.id" @chage="artifacts.goblet.id = $event" />
                <div class="sub-options">
                    <div class="sub-option" v-for="op of artifacts.goblet.sub">
                        <label>
                            <a @click="op.selected = !op.selected">{{ op.name }}</a>
                        </label>
                        <input v-model="op.score" :disabled="!op.selected" @input="changeSubOption(artifacts.goblet)" />
                    </div>
                </div>
            </div>
            <div class="artifact">
                <div class="artifact-type">
                    <h3>冠</h3>
                    <span class="score">{{ artifacts.circlet.score }}</span>
                </div>
                <PickArtifacts :value="artifacts.circlet.id" @chage="artifacts.circlet.id = $event" />
                <div class="sub-options">
                    <div class="sub-option" v-for="op of artifacts.circlet.sub">
                        <label>
                            <a @click="op.selected = !op.selected">{{ op.name }}</a>
                        </label>
                        <input v-model="op.score" :disabled="!op.selected"
                            @input="changeSubOption(artifacts.circlet)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import PickArtifacts from '~~/components/pick-artifacts.vue';

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
type SubOption = { id: string; name: string; score: number; selected: boolean; }
type Artifact = { id: string; level: number; score: number; sub: SubOption[] };
const totalScore = useState('totalScore', () => 0);
const artifacts = useState<{ [key: string]: Artifact }>('artifacts', () => {
    const data = {
        flower: { id: '', level: 0, score: 0, sub: [] },
        plume: { id: '', level: 0, score: 0, sub: [] },
        eon: { id: '', level: 0, score: 0, sub: [] },
        goblet: { id: '', level: 0, score: 0, sub: [] },
        circlet: { id: '', level: 0, score: 0, sub: [] },
    }

    Object.values(data).forEach(artifact => {
        subOptions.forEach(op => artifact.sub.push({ id: op.id, name: op[$language.selected], score: null, selected: false }))
    })
    return data
});

const changeSubOption = (artifact: Artifact) => {
    const targets = { cr: 2, cd: 1, ar: 1 }
    artifact.score = artifact.sub.reduce((total, op) => total + (op.score || 0) * (targets[op.id] || 0), 0);

    totalScore.value = Object.values(artifacts.value).reduce((total, artifact) => total + artifact.score, 0);
};
</script>
<style lang="scss">
.artifact {
    margin: 5px;
    border: 1px solid #ffaaaa;
    border-radius: 10px;
    background-color: #ffeeee;
    padding: 10px;
    max-width: 15em;

    .artifact-type {
        display: flex;
        justify-content: space-between;

        h3 {
            margin: 0;
        }

        .score {
            background-color: #ffcccc;
            box-shadow: 1px 1px 3px lightgray;
            border-radius: 20px;
            margin: 0 10px;
            padding: 0 5px;
            min-width: 1.5em;
            line-height: 2em;
            text-align: center;

            &.good {
                background-color: #ccccff;
            }

            &.super {
                background-color: #ccccff;
            }

            &.god {
                background-color: #ffcccc;
            }
        }
    }

    .sub-options {
        display: flex;
        flex-wrap: wrap;
        padding: 0 5px;

        .sub-option {
            width: 100%;
            display: flex;
            margin-bottom: 3px;

            label {
                flex-basis: 100%;
                cursor: pointer;
            }

            label:hover {
                background-color: #eeeeee;
            }

            input {
                width: 5em;
            }

            &.selected {
                background-color: #ffcccc;
            }
        }
    }

}
</style>