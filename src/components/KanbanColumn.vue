<script lang="ts">
import { defineComponent } from 'vue'
import type { Columns } from "../types"

export default defineComponent({
    props: {
        col: {
            type: Object as () => Columns
        }
    }
})
</script>

<template>
    <div class="columnWrapper">
        <span>{{col?.name}}</span>
    </div>
</template>

<style>
    .columnWrapper {
        background-color: #8a737a;
        border-radius: 12px;
        width: 300px;
        height: 800px;
    }
</style>