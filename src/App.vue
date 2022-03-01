<script lang="ts">
import { defineComponent } from "vue";
import KanbanColumn from "./components/KanbanColumn.vue"
import type {Columns} from "./types"

let id = 0

export default defineComponent({
  components: {
    KanbanColumn
  },
  data() {
    return {
      newColumnName: '' as String,
      newColumnColor: '#DEDEDE' as String,
      columns: [] as Columns[]
    }
  },
  methods: {
    addColumn() {
      this.columns.push({
        name: this.newColumnName,
        color: this.newColumnColor,
        id: id++
      })
    }
  },
  })
</script>

<template>
  <input v-model="newColumnName" @keyup.enter="addColumn" placeholder="Name new Column">
  <label for="colorPicker">Choose background color</label>
  <input v-model="newColumnColor" type="color" id="colorPicker">
  <button @click="addColumn">Add Column</button>
  <div class="boardWrapper">
    <KanbanColumn v-for="col in columns" :key="col.id" :col="col"/>
  </div>
</template>

<style>
  .boardWrapper {
    display: flex;
  }
</style>