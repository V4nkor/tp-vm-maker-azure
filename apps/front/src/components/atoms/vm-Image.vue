<script lang="ts" setup>
import { ref } from 'vue';

    export interface Props {
        src?: string
        alt?: string
        width?: number
        height?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        src: "",
        alt: "",
        width: 200,
        height: 200
    })

    const imageElement = ref()

    function imageLoadError(): void {
        imageElement.value.src = 'no-image.svg'
    }
</script>

<template>
    <img ref="imageElement" :src="props.src" :alt="props.alt" :width="props.width" :height="props.height" @error="imageLoadError">
</template>

<style lang="scss" scoped>
    
</style>
