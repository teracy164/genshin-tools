<template>
    <div ref="elArtifact" class="artifact">
        <div class="artifact-type">
            <div class="wrapper">
                <h3 class="text-stroke">{{ getPieceName(artifact.piece) }}</h3>
                <Score :score="artifact.score" />
            </div>
            <PickArtifacts :artifact="artifact" @change="changeArtifact" />
        </div>
        <div class="sub-options">
            <div class="sub-option" :class="{ selected: op.selected }" v-for="op of artifact.sub">
                <div class="wrapper">
                    <label class="text-stroke">
                        <input :id="`check-${artifact.piece}-${op.name}`" type="checkbox" v-model="op.selected" />
                        <label :for="`check-${artifact.piece}-${op.name}`">{{ op.name }}</label>
                    </label>
                    <input type="number" :value="op.score" :disabled="!op.selected" min="0"
                        @input="changeSubOption($event, op)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Artifact, ArtifactSubOption } from '~~/types/artifact';
import { GenshinOpenData } from '~~/types/genshin-data';
import { artifactPieces, ArtifactPiece } from '~~/constants/artifacts';

const { $language, $dictionary } = useNuxtApp();

const param = reactive({ img: '' });
const elArtifact = ref<HTMLDivElement>(null);
const emit = defineEmits(['change:subop']);
const props = defineProps({ artifact: Object });
const artifact = props.artifact as Artifact;

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
    artifactPieces[piece][$language.selected] || ''
};

const changeArtifact = (src: GenshinOpenData.GenshinRecord) => {
    artifact.typeId = src.id;
    setArtifactImg(src);

    emit('change:subop');
}

const setArtifactImg = (src: GenshinOpenData.GenshinRecord) => {
    if (src) {
        param.img = `https://bbs.hoyolab.com/hoyowiki/picture/reliquary/${src.en}/${artifactPieces[artifact.piece].id}_icon.png`
        elArtifact.value.style.backgroundImage = `url('${param.img}')`;
    } else {
        param.img = '';
        elArtifact.value.style.backgroundImage = '';
    }
}

onMounted(() => {
    if (artifact) {
        const target = $dictionary.artifacts.find(a => a.id === artifact.typeId);
        setArtifactImg(target);
    }
})
</script>
<style lang="scss">
.collapse {
    .artifact {
        .sub-option {
            display: none;

            &.selected {
                display: block;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.artifact {
    margin: 2px;
    border: 1px solid #ffaaaa;
    border-radius: 10px;
    background-color: rgba(255, 200, 200, 0.2);
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

        .sub-option {
            width: 100%;

            .wrapper {
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

}
</style>