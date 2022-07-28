<template>
    <select @change="selectedArtifact($event)">
        <option></option>
        <option v-for="artifact of $dictionary.artifacts" :value="artifact.id">{{ artifact[$language.selected] }}
        </option>
    </select>
</template>
<script setup lang="ts">
const { $dictionary, $language } = useNuxtApp();
const prop = defineProps({ artifact: {} });

const emit = defineEmits(['input:artifact', 'change']);
const selectedArtifact = (event) => {
    const id = (event.target as HTMLSelectElement).value;
    const target = $dictionary.artifacts.find(a => a.id === id);
    console.log(target)
    emit('input:artifact', target);
    emit('change', target);
};
// const param = reactive({ selected: '' });
</script>
<style scoped lang="scss">
select {
    background-color: rgba(255, 255, 255, 0.4);
}
</style>