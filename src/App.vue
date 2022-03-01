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
      newColumn: '' as String,
      columns: [] as Columns[]
    }
  },
  methods: {
    addColumn() {
      this.columns.push({
        name: this.newColumn,
        id: id++
      })
    }
  },
  })
</script>

<template>
  <input v-model="newColumn" @keyup.enter="addColumn">
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