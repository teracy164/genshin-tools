<template>
    <div ref="elArtifact" class="artifact">
        <div class="artifact-type">
            <div class="wrapper">
                <h3>{{ getPieceName(artifact.piece) }}</h3>
                <span class="score"
                    :class="{ good: artifact.score >= 30, amazing: artifact.score >= 40, god: artifact.score >= 50 }">
                    {{ artifact.score }}
                </span>
            </div>
            <PickArtifacts :artifact="artifact" @change="changeArtifact" />
        </div>
        <div class="sub-options">
            <div class="sub-option" :class="{ selected: op.selected }" v-for="op of artifact.sub">
                <label>
                    <input :id="`check-${artifact.piece}-${op.name}`" type="checkbox" v-model="op.selected" />
                    <label :for="`check-${artifact.piece}-${op.name}`">{{ op.name }}</label>
                </label>
                <input type="number" :value="op.score" :disabled="!op.selected" min="0"
                    @input="changeSubOption($event, op)" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Artifact, ArtifactPiece, ArtifactSubOption } from '~~/types/artifact';
import { GenshinOpenData } from '~~/types/genshin-data';

const { $language } = useNuxtApp();

const props = defineProps({ artifact: Object });
const artifact = props.artifact as Artifact;
const param = reactive({ img: '' });
const elArtifact = ref<HTMLDivElement>(null);

const emit = defineEmits(['change:subop']);

const changeSubOption = (event: Event, op: ArtifactSubOption) => {
    const el = event.target as HTMLInputElement

    let value = Number(el.value);
    if (isNaN(value)) value = 0;
    if (value < 0) value = Math.abs(value);

    const floor = (num: number) => Math.floor(num * 10) / 10

    op.score = floor(value);

    if (Number(el.value) !== op.score) {
        el.value = `${value}`;
    }

    const targets = { cr: 2, cd: 1, ar: 1 }
    const score = artifact.sub.reduce((total, op) => total + (op.score || 0) * (targets[op.id] || 0), 0);
    /** 誤差が発生するため小数点1桁で切り捨て */
    artifact.score = floor(score);

    emit('change:subop');
};

const getPieceName = (piece: ArtifactPiece) => {
    const names = {
        'flower': { ja: '花', en: 'Flower' },
        'plume': { ja: '羽', en: 'Plume' },
        'eon': { ja: '時計', en: 'Eon' },
        'goblet': { ja: '杯', en: 'Goblet' },
        'circlet': { ja: '冠', en: 'Circlet' },
    };
    console.log(piece)
    return names[piece][$language.selected];
};

const changeArtifact = (src: GenshinOpenData.GenshinRecord) => {
    const pieces = {
        'flower': 'flower_of_life',
        'plume': 'plume_of_death',
        'eon': 'sands_of_eon',
        'goblet': 'goblet_of_eonothem',
        'circlet': 'circlet_of_logos',
    };
    param.img = `https://bbs.hoyolab.com/hoyowiki/picture/reliquary/${src.en}/${pieces[artifact.piece]}_icon.png`
    elArtifact.value.style.backgroundImage = `url('${param.img}')`;
}
</script>
<style lang="scss" scoped>
.artifact {
    margin: 2px;
    border: 1px solid #ffaaaa;
    border-radius: 10px;
    background-color: rgba(255, 200, 200, 0.6);
    padding: 5px;
    max-width: 12em;
    font-size: 0.9em;
    background-size: cover;

    .artifact-type {
        border-bottom: 1px solid #dddddd;
        margin-bottom: 10px;
        padding-bottom: 5px;


        .wrapper {
            display: flex;
            justify-content: space-between;

            h3 {
                margin: 5px 0;
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
                white-space: nowrap;
            }

            label:hover {
                background-color: rgba(255, 200, 200, 0.6);
            }

            input[type=number] {
                width: 3em;
            }

            &.selected {
                background-color: rgba(255, 200, 200, 0.6);
            }
        }
    }

}
</style>