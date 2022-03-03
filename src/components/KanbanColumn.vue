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
            newTaskName: ''
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
            <input v-model="newTaskName"
            @keyup.enter="$emit('addNewTask', newTaskName, col?.id); newTaskName=''" />
            <button @click="$emit('addNewTask',newTaskName, col?.id); newTaskName=''" >
            Add Task
            </button>
        </div>
        <Draggable
            item-key="`taskList${col.id}`"
            :list="taskList"
            group="tasks"
            class="taskWrapper">
            <template #item="{element}">
                <div class="taskCard">{{element.name}}</div>
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
    .taskWrapper {
        width: 100%;
        height: 100%;
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