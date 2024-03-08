<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores';

const router = useRouter();
const loginStore = useLoginStore()

function handleLogout() {
    loginStore.logout()
    router.push('/');
}

handleLogout()

</script>

<template>
    <span class="logout-span">You are being disconnected, please wait</span>
</template>

<style lang="scss" scoped>
    .logout-span { font-size: 64px; font-weight: 700; }
</style>
