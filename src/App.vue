<script lang="ts">
import { defineComponent } from "vue";
import Draggable from "vuedraggable"
import KanbanColumn from "./components/KanbanColumn.vue"
import type {Columns} from "./types"


let columnId = 0
let dropZoneId = 1

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
    }
  },
  methods: {
    addColumn() {
      this.columns.push({
        name: this.newColumnName,
        color: this.newColumnColor,
        id: columnId++,
        taskList: []
      })
      this.newColumnName = ""
      this.newColumnColor = "#DEDEDE"
    },
    removeColumn(id: number) {
      this.columns = this.columns.filter(col => col.id !==  id)
    },
    addNewTask(taskName: String, columnId: Number) {
      this.columns.find(obj => obj.id === columnId)?.taskList.push({name: taskName})
    }
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
    item-key="id"
    class="boardWrapper"
    handle=".handle"
    group="columns"
    >
    <template #item="element">
      <KanbanColumn :col="element.element" @removeColumn="removeColumn" @addNewTask="addNewTask"/>
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