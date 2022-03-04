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
            <div class="colHeaderLine">
                <div>{{col?.name}}</div>
                <button id="deleteColumnBtn" @click="$emit('removeColumn',col?.id)">X</button>
            </div>
            <div class="colHeaderLine">
                <input v-model="newTaskName" placeholder="Name new Task"
                @keyup.enter="$emit('addNewTask', newTaskName, col?.id); newTaskName=''" />
                <button @click="$emit('addNewTask',newTaskName, col?.id); newTaskName=''" >
                Add Task
                </button>
            </div>
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
        flex-wrap: wrap;
        width: 100%;
        height: 100px;
        border-bottom: solid black 1px;
    }
    .colHeaderLine {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    .taskWrapper {
        width: 100%;
        height: 100%;
    }
    .taskCard {
        width: 90%;
        height: auto;
        background-color: whitesmoke;
        margin: 10px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        overflow-wrap: break-word;
        word-break: break-all;
        border-radius: 10px;
        border: 1px solid black;
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