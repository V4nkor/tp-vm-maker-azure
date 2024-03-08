<script lang="ts" setup>
    import vmButton from '../components/atoms/vm-Button.vue';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useLoginStore } from '../stores';
    import vmImage from '../components/atoms/vm-Image.vue';

    const router = useRouter();
    const loginStore = useLoginStore();

    onMounted(() => {

    });
</script>

<template>
    <div class="home-container">
        <h1 class="welcome-title">Welcome to VM Maker</h1>
        <vmImage src="/src/assets/logo.svg" alt="Vm-Maker Logo" :width="200" :height="200"></vmImage>
        <p>VM Maker is a tool to create virtual machines using the azure cloud SDK</p>
        <div v-if="!loginStore.loggedIn" class="welcome-description">
            <p>Please Login to use this web-app :</p>
            <vmButton label="Login" name="login-button" @click="router.push('/login')"></vmButton> 
        </div>
        <div v-else class="welcome-description">
            <p>You are logged in ! Go to virtual machines :</p>
            <vmButton label="Virtual Machines" name="vms-button" @click="router.push('/vms')"></vmButton>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    .welcome-title { font-size: 64px; font-weight: 700; }

    .home-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 8px;
    }

    .welcome-description {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

</style>
