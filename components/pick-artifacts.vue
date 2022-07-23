<template>
    <select>
        <option v-for="artifact of artifacts">{{ artifact[lang] }}</option>
    </select>
</template>
<script setup lang="ts">
const { $dictionary, $language } = useNuxtApp();
const artifacts = $dictionary.artifacts
const lang = $language.selected;
</script>