<template>
    <select>
        <option v-for="artifact of Object.values(artifacts)">{{ artifact.name }}</option>
    </select>
</template>
<script setup lang="ts">
import { ArtifactDetails } from '~~/constants/artifacts';

/** TODO */
const lang = 'ja';
const artifacts = ArtifactDetails[lang];


</script>