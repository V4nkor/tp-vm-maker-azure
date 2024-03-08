<script lang="ts" setup>
    import vmCard from '../components/molecules/vm-Card.vue';
    import { useLoginStore } from '../stores';
    import { useRouter } from 'vue-router';
    import { VmModels } from '../utils/ifaces/virtualMachine';

    const router = useRouter();
    const loginStore = useLoginStore();
    if (!loginStore.loggedIn) router.push('/login');

</script>

<template>
    <div class="vms-container">
        <div class="all-vms">
            <vmCard v-for="model in VmModels" :type="model.type"></vmCard>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    .vms-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 8px;
        text-wrap: wrap;
    }

    .all-vms {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 24px;
    }
</style>
