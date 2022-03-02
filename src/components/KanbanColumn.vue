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
        <div>{{col?.name}}</div>
    </div>
</template>

<style>
    .columnWrapper {
        width: 400px;
        height: 800px;
        background-color: var(--background-color-prop);
        margin: 0px 10px;
        border-radius: 12px;
    }

</style>