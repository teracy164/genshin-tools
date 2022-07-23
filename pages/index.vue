<template>
    <div>
        <h1>総合スコア</h1>
        XXX.XX
    </div>

    <div>
        <h1>聖遺物</h1>
        <div style="display: flex">
            <div>
                <div class="artifact-type">
                    <h3>花</h3>
                    <span class="score">xx.xx</span>
                </div>
                <PickArtifacts></PickArtifacts>
                <div class="sub-options">
                    <a v-for="op of subOptions" class="sub-option" :class="{ selected: isSelected(op) }"
                        @click="toggleSubOption(op)">{{ op
                        }}</a>
                </div>
            </div>
            <div>
                <div class="artifact-type">
                    <h3>羽</h3>
                    <span class="score">xx.xx</span>
                </div>
                <PickArtifacts></PickArtifacts>
                <div class="sub-options">
                    <a v-for="op of subOptions" class="sub-option" :class="{ selected: isSelected(op) }"
                        @click="toggleSubOption(op)">{{ op
                        }}</a>
                </div>
            </div>
            <div>
                <div class="artifact-type">
                    <h3>時計</h3>
                    <span class="score">xx.xx</span>
                </div>
                <PickArtifacts></PickArtifacts>
                <div class="sub-options">
                    <a v-for="op of subOptions" class="sub-option" :class="{ selected: isSelected(op) }"
                        @click="toggleSubOption(op)">{{ op
                        }}</a>
                </div>
            </div>
            <div>
                <div class="artifact-type">
                    <h3>杯</h3>
                    <span class="score">xx.xx</span>
                </div>
                <PickArtifacts></PickArtifacts>
                <div class="sub-options">
                    <a v-for="op of subOptions" class="sub-option" :class="{ selected: isSelected(op) }"
                        @click="toggleSubOption(op)">{{ op
                        }}</a>
                </div>
            </div>
            <div>
                <div class="artifact-type">
                    <h3>冠</h3>
                    <span class="score">xx.xx</span>
                </div>
                <PickArtifacts></PickArtifacts>
                <div class="sub-options">
                    <a v-for="op of subOptions" class="sub-option" :class="{ selected: isSelected(op) }"
                        @click="toggleSubOption(op)">{{ op
                        }}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import PickArtifacts from '~~/components/pick-artifacts.vue';
const subOptions = ['会心率', '会心ダメージ', '元素チャージ効率', '元素熟知', '攻撃力%', '攻撃力', '防御力', '防御%'];
const selectedSubOptions = [];

const isSelected = (op: string) => {
    console.log(op, selectedSubOptions.includes(op))
    return selectedSubOptions.includes(op)
}
const toggleSubOption = (selected: string) => {
    const index = selectedSubOptions.findIndex(op => op === selected);
    console.log('click', index, selectedSubOptions)
    if (index < 0) {
        selectedSubOptions.push(selected);
    } else {
        selectedSubOptions.splice(index, 1);
    }
}
</script>
<style lang="scss">
.artifact-type {
    display: flex;

    h3 {
        margin: 0;
    }

    .score {
        border: 1px solid #c0c0c0;
        border-radius: 20px;
        margin: 0 10px;
        padding: 0 5px;

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

    .sub-option {
        margin: 2px 3px;
        padding: 0 5px;
        border: 1px solid lightgray;
        border-radius: 20px;
        font-size: 0.8em;
        cursor: pointer;

        &.selected {
            border: 1px solid #ffaaaa;
            background-color: #ffcccc;
        }
    }
}

.sub-option:hover {
    background-color: #eeeeee;
}
</style>