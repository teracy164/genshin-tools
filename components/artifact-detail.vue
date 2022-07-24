<template>
    <div class="artifact">
        <div class="artifact-type">
            <h3>{{ getPieceName(artifact.piece) }}</h3>
            <span class="score"
                :class="{ good: artifact.score >= 30, amazing: artifact.score >= 40, god: artifact.score >= 50 }">
                {{ artifact.score }}
            </span>
        </div>
        <!-- <PickArtifacts :value="artifact.id" @chage="artifact.id = $event" /> -->
        <div class="sub-options">
            <div class="sub-option" :class="{ selected: op.selected }" v-for="op of artifact.sub">
                <label>
                    <input :id="`check-${artifact.piece}-${op.name}`" type="checkbox" v-model="op.selected" />
                    <label :for="`check-${artifact.piece}-${op.name}`">{{ op.name }}</label>
                </label>
                <input type="number" :value="op.score" :disabled="!op.selected" @input="changeSubOption($event, op)" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Artifact, ArtifactPiece, ArtifactSubOption } from '~~/types/artifact';

const { $language } = useNuxtApp();

const props = defineProps({
    artifact: Object
})
const artifact = props.artifact as Artifact;

const classes = useState('classes')
const emit = defineEmits(['change:subop']);

const changeSubOption = (event: Event, op: ArtifactSubOption) => {
    const el = event.target as HTMLInputElement
    let value = Number(el.value);
    if (isNaN(value)) value = 0;
    if (value < 0) value = Math.abs(value);
    op.score = Math.floor(value * 10) / 10;
    if (Number(el.value) !== op.score) {
        el.value = `${value}`;
        console.log('fix value')
    }

    const targets = { cr: 2, cd: 1, ar: 1 }
    artifact.score = artifact.sub.reduce((total, op) => total + (op.score || 0) * (targets[op.id] || 0), 0);

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
    return names[piece][$language.selected];
};
</script>
<style lang="scss" scoped>
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
        border-bottom: 1px solid #dddddd;
        margin-bottom: 10px;
        padding-bottom: 5px;

        h3 {
            margin: 0;
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

            input[type=number] {
                width: 3em;
            }

            &.selected {
                background-color: #ffcccc;
            }
        }
    }

}
</style>