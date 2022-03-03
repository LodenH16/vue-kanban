<script lang="ts">
import { defineComponent } from 'vue'
import Draggable from "vuedraggable"
import type { Columns, Task } from "../types"

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
        updatedTaskList() {
            return this.col!.taskList
        }
    },
})
</script>

<template>
    <div class="columnWrapper" :style="cssProps">
        <div class="columnHeader handle">
            <div>{{col?.name}}</div>
            <button @click="$emit('removeColumn',col?.id)">X</button>
            <input v-model="newTaskName" placeholder="Name new"
            @keyup.enter="$emit('addNewTask', newTaskName, col?.id); newTaskName=''" />
            <button @click="$emit('addNewTask',newTaskName, col?.id); newTaskName=''" >
            Add Task
            </button>
        </div>
        <Draggable
            itemKey="id"
            :list="updatedTaskList"
            group="tasks"
            class="taskWrapper">
            <template #item="{element}">
                <div class="taskCard" :key="`task${element.id}`">
                    <div>{{element.name}}</div>
                    <button @click="$emit('removeTask', col?.id, element.id)">X</button>
                </div>
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