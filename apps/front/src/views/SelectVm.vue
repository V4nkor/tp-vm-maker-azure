<script lang="ts" setup>
import { onMounted, ref } from "vue";
import vmCard from "../components/molecules/vm-Card.vue";
import { useLoginStore } from "../stores";
import { useRouter } from "vue-router";
import { VmModel, VmModels } from "../utils/ifaces/virtualMachine";
import users from '../data/users.json';

const router = useRouter();
const loginStore = useLoginStore();
if (!loginStore.loggedIn) router.push("/login");

const authorizedVm = ref([0]);
const authorisedVmModels = ref(<VmModel[]>[]);

function getAuthorisedVms(currentUser: string) {
  // Get the list of authorized VMs for the current user
  const user = users.find((user) => user.username === currentUser);
  if (user) {
    authorizedVm.value = user.authorisedVms;
  }
  //console.log("Authorised VMs : " + authorizedVm.value);
}

// Get the list of authorised VMs models from the store from the authorised VMs
function getAuthorisedVmsModels() {
  let models:VmModel[] = [];
  authorizedVm.value.forEach((vm) => {
    const model = VmModels.find((model) => model.id === vm.toString());
    if (model) {
      models.push(model);
    }
  });
  authorisedVmModels.value = models;
  //console.log("Authorised VM Models : " + authorisedVmModels.value);
}

onMounted(() => {
  getAuthorisedVms(loginStore.user);
  getAuthorisedVmsModels();
});

</script>

<template>
  <div class="vms-container">
    <div class="all-vms" v-if="authorisedVmModels[0]">
      <vmCard v-for="model in authorisedVmModels" :type="model.type"></vmCard>
    </div>
    <div v-else>
      <p>No VMs available</p>
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
