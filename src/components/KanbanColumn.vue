<script lang="ts">
import { defineComponent } from 'vue'
import type { Columns } from "../types"

export default defineComponent({
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
        }
    },
})
</script>

<template>
    <div class="columnWrapper" :style="cssProps">
        <span>{{col?.name}}</span>
    </div>
</template>

<style>
    .columnWrapper {
        background-color: var(--background-color-prop);
        border-radius: 12px;
        width: 300px;
        height: 800px;
    }
</style>