<script lang="ts" setup>
import { ref, onMounted } from "vue";
//import { vmType } from '../utils/ifaces/vmTypes.enum'
import vmImage from "../components/atoms/vm-Image.vue";
import vmButton from "../components/atoms/vm-Button.vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "../stores";
import { VmModels } from "../utils/ifaces/virtualMachine";
import io from "socket.io-client";

// Get current domain name without port using current route URL
const backendUrl = `${window.location.protocol || 'http' }//${window.location.hostname}:8000`; // replace with your server URL
const socket = io(backendUrl); // replace with your server URL
const router = useRouter();
const loginStore = useLoginStore();

if (!loginStore.loggedIn) router.push("/login");

const routeIdParam = router.currentRoute.value.params.id.slice(1);
const typeTitle = ref("");
const typeVersion = ref("");
const typeImg = ref("");
const typeSize = ref("");
const typeRam = ref("");
const vmToCreateId = ref("");

const isValid = ref(false);
const isCreating = ref(false);
const isCreated = ref(false);

const currentStep = ref("ressourceGroup");
const ressourceGroup = ref(false);
const storageAccount = ref(false);
const vnet = ref(false);
const subnet = ref(false);
const publicIp = ref(false);
const nic = ref(false);
const nicInfo = ref(false);
const vmCreated = ref(false);

const iswindows = ref(false);
const rdpFileString = ref("");

const vmIp = ref("");
const vmUsername = ref("");
const vmPassword = ref("");

// All the socket.io events after the connection is established
socket.on("connect", () => {
  console.log("Connected to the backend");

  socket.on("disconnect", () => {
    console.log("Disconnected from the backend");
  });

  socket.on("error", (error: any) => {
    console.log("Error from the backend");
    console.log(error);
  });

  socket.on("resourceGroupCreated", (data: any) => {
    console.log("Ressource Group created");
    console.log(data);
    ressourceGroup.value = true;
    currentStep.value = "storageAccount";
  });

  socket.on("storageAccountCreated", (data: any) => {
    console.log("Storage Account created");
    console.log(data);
    storageAccount.value = true;
    currentStep.value = "vnet";
  });

  socket.on("vnetCreated", (data: any) => {
    console.log("Vnet created");
    console.log(data);
    vnet.value = true;
    currentStep.value = "subnet";
  });

  socket.on("subnetCreated", (data: any) => {
    console.log("Subnet created");
    console.log(data);
    subnet.value = true;
    currentStep.value = "publicIp";
  });

  socket.on("publicIpCreated", (data: any) => {
    console.log("Public IP created");
    console.log(data);
    publicIp.value = true;
    currentStep.value = "nic";
  });

  socket.on("nicCreated", (data: any) => {
    console.log("NIC created");
    console.log(data);
    nic.value = true;
    currentStep.value = "nicInfo";
  });

  socket.on("nicInfoCreated", (data: any) => {
    console.log("NIC Info created");
    console.log(data);
    nicInfo.value = true;
    currentStep.value = "vmCreated";
  });

	socket.on("rdpFile", (data: any) => {
		console.log("RDP file created");
		console.log(data);
		iswindows.value = true;
		rdpFileString.value = data;
	});

  socket.on("vmCreated", (data: any) => {
    console.log("VM created");
    console.log(data);
    isCreating.value = false;
    isCreated.value = true;

    // Get the VM IP and SSH credentials from the data sent from the backend
    // and display them to the user
		vmIp.value = data.publicIp;
		vmUsername.value = data.auth.username;
		vmPassword.value = data.auth.password;
  });
});

onMounted(() => {
  console.log("mounted create vm");
  // remove the first character of the routeIdParam (:) to get the type of VM
  //console.log(routeIdParam);

  // Find the VM type and set the values accordingly by searching in the VmModels array
  for (const element of VmModels) {
    if (element.type === routeIdParam) {
      typeTitle.value =
        element.type.charAt(0).toUpperCase() + element.type.slice(1);
      typeImg.value = element.type + ".png";
      typeVersion.value = element.version;
      typeSize.value = element.size;
      typeRam.value = element.ram;
      vmToCreateId.value = element.type;
      isValid.value = true;
      break;
    }
  }
});

function handleCreateVm(id: string) {
  console.log("creating vm with id : " + id);

  // Set the isCreating to true to show the user that the VM is being created
  isCreating.value = true;

  // Emit the event to the backend to create the VM
  socket.emit("startCreatingVm", {
    vmType: id,
    userId: loginStore.user.id,
  });
}
</script>

<template>
  <div class="create-container">
    <div v-if="isCreated" class="create-modal">
			<h1 class="create-title">VM Created</h1>
			<span>Your VM has been created successfully</span>
			<span>IP : {{ vmIp }}</span>
			<span>Username : {{ vmUsername }}</span>
			<span>Password : {{ vmPassword }}</span>
			<span>It will be deleted in 10 minutes</span>
			<vmButton
				label="Download RDP File"
				name="rdp-button"
				btnStyle="success"
				v-if="iswindows"
				:src="rdpFileString"
			></vmButton>
		</div>
    <div v-else-if="isCreating" class="create-modal">
      <h1 class="create-title">Creating VM</h1>
      <span>Current status :</span>
      <ul>
        <li
          class="status"
          :class="{
            done: ressourceGroup,
            active: currentStep === 'ressourceGroup',
          }"
        >
          Creating Ressource Group...
        </li>
        <li
          class="status"
          :class="{
            done: storageAccount,
            active: currentStep === 'storageAccount',
          }"
        >
          Creating Storage Account...
        </li>
        <li
          class="status"
          :class="{ done: vnet, active: currentStep === 'vnet' }"
        >
          Creating Vnet...
        </li>
        <li
          class="status"
          :class="{ done: subnet, active: currentStep === 'subnet' }"
        >
          Creating Subnet...
        </li>
        <li
          class="status"
          :class="{ done: publicIp, active: currentStep === 'publicIp' }"
        >
          Creating Public IP...
        </li>
        <li
          class="status"
          :class="{ done: nic, active: currentStep === 'nic' }"
        >
          Creating NIC...
        </li>
        <li
          class="status"
          :class="{ done: nicInfo, active: currentStep === 'nicInfo' }"
        >
          Getting NIC Info...
        </li>
        <li
          class="status"
          :class="{ done: vmCreated, active: currentStep === 'vmCreated' }"
        >
          Creating VM...
        </li>
      </ul>
    </div>
    <div v-else-if="isValid" class="create-modal">
      <vmImage
        :src="'/'+typeImg"
        :alt="typeTitle + ' Virtual Machine Logo'"
        :width="100"
        :height="100"
      ></vmImage>
      <p>{{ typeTitle }} Virtual Machine :</p>
      <ul>
        <li>OS : {{ typeTitle }}</li>
        <li>Version : {{ typeVersion }}</li>
        <li>Size : {{ typeSize }}</li>
      </ul>
      <span
        >Your SSH credentials will be given when the machine has finished it's
        deployment</span
      >
      <span class="warning-span"
        >Beware ! This machine will self destruct after 10 minutes</span
      >
      <vmButton
        label="Confirm Creation"
        name="create-button"
        btnStyle="success"
        @click="handleCreateVm(vmToCreateId)"
      ></vmButton>
    </div>
    <div v-else class="create-modal">
      <h1 class="warning-title">Invalid VM Type</h1>
      <span>Return to VM selection</span>
      <vmButton
        label="Return"
        name="return-button"
        btnStyle="danger"
        @click="router.push('/vms')"
      ></vmButton>
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

.create-title {
	font-size: 24px;
	font-weight: 700;
}

.warning-span {
  color: red;
}
.warning-title {
  color: red;
  font-size: 24px;
  font-weight: 700;
}

.done {
  color: green;
}
.active {
  color: blue;
}
</style>
