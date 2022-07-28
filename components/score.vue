<template>
    <div class="score" :class="{
        god: props.score >= props.borders.god,
        amazing: props.score >= props.borders.amazing,
        good: props.score >= props.borders.good,
    }">
        <span>{{ props.score }}</span>
    </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ score: number, borders: { good: number; amazing: number; god: number; } }>(), {
    score: 0,
    borders: () => ({
        good: 30,
        amazing: 40,
        god: 50,
    }),
});

</script>
<style lang="scss" scoped>
.score {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #666666;
    opacity: 0.6;
    box-shadow: 2px 1px 5px white;
    border-radius: 20px;
    margin: 2px 5px;
    padding: 0 5px;
    min-width: 1.5em;
    line-height: 2em;
    text-align: center;

    &.good {
        background-color: #00cc00;
    }

    &.amazing {
        background-color: #6666ff;
    }

    &.god {
        background-color: #ff6666;
    }
}
</style>