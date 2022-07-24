<script setup lang="ts">
const error = useError()
</script>

<template>
    <div style="height: 100%;display: flex;justify-content: center;align-items: center;">
        <div>
            <p>{{ error.statusCode }}</p>
            <p>{{ error.message }}</p>
        </div>
    </div>
</template>