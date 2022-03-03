<script lang="ts">
import { defineComponent } from 'vue'
import Draggable from "vuedraggable"
import type { Columns } from "../types"

export default defineComponent({
    components: {
        Draggable,
    },
    data() {
        return {
            taskList: this.col?.taskList,
        }
    },
    props: {
        col: {
            type: Object as () => Columns
        }
    },
    computed: {
        cssProps(): Object {
            return {
                "--background-color-prop": this.col?.color
            } 
        },
    },
})
</script>

<template>
    <div class="columnWrapper" :style="cssProps">
        <div class="columnHeader handle">
            <div>{{col?.name}}</div>
            <button @click="$emit('removeColumn',col?.id)">X</button>
        </div>
        <Draggable item-key="`taskList${col.id}`" v-model="taskList" group="tasks">
            <template #item="{element}">
                <div>{{element}}</div>
            </template>
        </Draggable>
    </div>
</template>

<style>
    .columnHeader {
        display: flex;
        width: 100%;
        height: 100px;
    }
    .taskCard {
        width: 90%;
        height: 100px;
        background-color: navajowhite;
        margin: 5px auto;
    }
    .columnWrapper {
        display: flex;
        flex-wrap: wrap;
        min-width: 300px;
        max-width: 400px;
        height: 800px;
        background-color: var(--background-color-prop);
        margin: 0px 10px;
        border-radius: 12px;
    }

</style>