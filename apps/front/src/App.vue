<script setup lang="ts">
  import { RouterView} from 'vue-router'
  import vmNavbar from './components/organisms/vm-Navbar.vue'
</script>

<template>
  <div class="vm-maker-layout-grid">
    <vmNavbar />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.vm-maker-layout-grid {
    display: grid;
    grid-template-rows: fit-content(8ch) auto;
    min-height: 100vh;
  }
</style>
