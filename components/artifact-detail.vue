<template>
    <div class="artifact">
        <div class="artifact-type">
            <h3>{{ getPieceName(artifact.piece) }}</h3>
            <span class="score">{{ artifact.score }}</span>
        </div>
        <!-- <PickArtifacts :value="artifact.id" @chage="artifact.id = $event" /> -->
        <div class="sub-options">
            <div class="sub-option" :class="{ selected: op.selected }" v-for="op of artifact.sub">
                <label>
                    <input :id="`check-${artifact.piece}-${op.name}`" type="checkbox" v-model="op.selected" />
                    <label :for="`check-${artifact.piece}-${op.name}`">{{ op.name }}</label>
                </label>
                <input type="number" v-model="op.score" :disabled="!op.selected" @input="changeSubOption(artifact)" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Artifact, ArtifactPiece } from '~~/types/artifact';

const { $language } = useNuxtApp();

const props = defineProps({
    artifact: Object
})
const artifact = props.artifact as Artifact;

const emit = defineEmits(['change:subop']);

const changeSubOption = (artifact: Artifact) => {
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

        .score {


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

            input[type=number] {
                width: 5em;
            }

            &.selected {
                background-color: #ffcccc;
            }
        }
    }

}
</style>