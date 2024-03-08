<script lang="ts" setup>
import { ref, withDefaults, defineProps, onMounted } from 'vue'
import { vmType } from '../utils/ifaces/vmTypes.enum'
import vmImage from '../components/atoms/vm-Image.vue'
import vmButton from '../components/atoms/vm-Button.vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '../stores'
import { VmModels } from '../utils/ifaces/virtualMachine'

const router = useRouter();
const loginStore = useLoginStore();

if (!loginStore.loggedIn) router.push('/login');

const routeIdParam = router.currentRoute.value.params.id.slice(1);
const typeTitle = ref("");
const typeVersion = ref("");
const typeImg = ref("");
const typeSize = ref("");
const typeRam = ref("");

const vmToCreateId = ref("");

const isValid = ref(false);

onMounted(() => {
    console.log('mounted create vm');
    // remove the first character of the routeIdParam (:) to get the type of VM
    console.log(routeIdParam);

    // Find the VM type and set the values accordingly by searching in the VmModels array
    for (let i = 0; i < VmModels.length; i++) {
        if (VmModels[i].type === routeIdParam) {
            typeTitle.value = VmModels[i].type.charAt(0).toUpperCase() + VmModels[i].type.slice(1);
            typeImg.value = '/src/assets/vms/' + VmModels[i].type +  '.png';
            typeVersion.value = VmModels[i].version;
            typeSize.value = VmModels[i].size;
            typeRam.value = VmModels[i].ram;
            vmToCreateId.value = VmModels[i].type;
            isValid.value = true;
            break;
        }
    }

    
})

function handleCreateVm(id: string) {
    console.log('creating vm with id : ' + id);
    // call to the backend using axios to create the VM


    // Show the user the ssh credentials


}

</script>

<template>
    <div class="create-container">
        <div v-if="isValid" class="create-modal">
            <vmImage :src="typeImg" :alt="typeTitle+ ' Virtual Machine Logo'" :width="100" :height="100"></vmImage>
            <p>{{ typeTitle }} Virtual Machine :</p>
            <ul>
                <li>OS : {{ typeTitle }}</li>
                <li>Version : {{ typeVersion }}</li>
                <li>Size : {{ typeSize }}</li>
            </ul>
            <span>Your SSH credentials will be given when the machine has finished it's deployment</span>
            <span class="warning-span">Beware ! This machine will self destruct after 10 minutes of use</span>
            <vmButton label="Confirm Creation" name="create-button" btnStyle="success" @click="handleCreateVm(vmToCreateId)"></vmButton>
        </div>
        <div v-else class="create-modal">
            <h1 class="warning-title">Invalid VM Type</h1>
            <span>Return to VM selection</span>
            <vmButton label="Return" name="return-button" btnStyle="danger" @click="router.push('/vms')"></vmButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .create-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 8px;
    }

    .create-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
        border-radius: 12px;
        box-shadow: var(--elevation-1);
        background-color: var(--light);
    }

    .warning-span { color: red; }
    .warning-title { color: red; font-size: 24px; font-weight: 700; }
</style>