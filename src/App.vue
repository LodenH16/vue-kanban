<script lang="ts">
import { defineComponent } from "vue";
import Draggable from "vuedraggable"
import KanbanColumn from "./components/KanbanColumn.vue"
import type {Columns} from "./types"


let taskId = 0

export default defineComponent({
  components: {
    KanbanColumn,
    Draggable
  },
  data() {
    return {
      newColumnName: '' as String,
      newColumnColor: '#DEDEDE' as String,
      columns: [] as Columns[],
      drag: false as boolean,
      columnId: 0 as number,
      taskId: 0 as number
    }
  },
  methods: {
    addColumn() {
      this.columns.push({
        name: this.newColumnName,
        color: this.newColumnColor,
        id: this.columnId++,
        taskList: []
      })
      this.newColumnName = ""
      this.newColumnColor = "#DEDEDE"
    },
    removeColumn(id: number) {
      this.columns = this.columns.filter(col => col.id !==  id)
    },
    addNewTask(taskName: String, columnId: Number) {
      this.columns.find(obj => obj.id === columnId)?.taskList.push({
        name: taskName,
        id: this.taskId++,
        })
    },
    removeTask(columnId: Number, taskId: Number) {
      let columnTaskList = this.columns.find(col => col.id === columnId)!.taskList
      this.columns.find(col => col.id === columnId)!.taskList = columnTaskList.filter(task => task.id !== taskId)
    }
  },
  watch: {
    columns: {
      handler(newValue, oldValue) {
        window.localStorage.setItem("storedColumns", JSON.stringify(newValue))
      },
      deep: true
    },
    columnId(value) {
      window.localStorage.setItem("storedColumnId", JSON.stringify(value))
    },
    taskId(value) {
      window.localStorage.setItem("storedTaskId", JSON.stringify(value))
    }
  },
  beforeMount () {
    const columnsFromLocalStorage = JSON.parse(localStorage.getItem("storedColumns") || "[]")
    if (Array.isArray(columnsFromLocalStorage)) {
      this.columns = columnsFromLocalStorage
    }
    this.columnId = JSON.parse(localStorage.getItem("storedColumnId") || "0")
    this.taskId = JSON.parse(localStorage.getItem("storedTaskId") || "0")
  },
  })
</script>

<template >
  <div class="headerWrapper">
    <input v-model="newColumnName" @keyup.enter="addColumn" placeholder="Name new Column">
    <label for="colorPicker">Choose background color</label>
    <input v-model="newColumnColor" type="color" id="colorPicker">
    <button @click="addColumn">Add Column</button>
  </div>
  <Draggable
    :list="columns"
    itemKey="(elem) => elem.id"
    class="boardWrapper"
    handle=".handle"
    group="columns"
    >
    <template #item="element">
      <KanbanColumn
        :col="element.element"
        @removeColumn="removeColumn"
        @addNewTask="addNewTask"
        @removeTask="removeTask"/>
    </template>
  </Draggable> 
</template>

<style>
  .headerWrapper {
    width: 100%;
  }
  .boardWrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>