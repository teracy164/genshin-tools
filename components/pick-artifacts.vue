<template>
    <select :value="artifact.typeId" @change="selectedArtifact($event)">
        <option></option>
        <option v-for="artifact of $dictionary.artifacts" :value="artifact.id">{{ artifact[$language.selected] }}
        </option>
    </select>
</template>
<script setup lang="ts">
import { Artifact } from '~~/types/artifact';

const { $dictionary, $language } = useNuxtApp();
const props = defineProps({ artifact: Object });
const artifact = props.artifact as Artifact;

const emit = defineEmits(['input:artifact', 'change']);
const selectedArtifact = (event) => {
    const typeId = (event.target as HTMLSelectElement).value;
    const target = $dictionary.artifacts.find(a => a.id === typeId);
    emit('input:artifact', target);
    emit('change', target);
};

</script>
<style scoped lang="scss">
select {
    background-color: rgba(255, 255, 255, 0.4);
}
</style>