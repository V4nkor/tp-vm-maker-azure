<script lang="ts" setup>
import { ref, withDefaults, defineProps, onMounted } from "vue";
import { useRouter } from "vue-router";
import { vmType } from "../../utils/ifaces/vmTypes.enum";
import vmImage from "../atoms/vm-Image.vue";
import vmButton from "../atoms/vm-Button.vue";

export interface Props {
  type?: vmType;
}

const props = withDefaults(defineProps<Props>(), { type: "debian" });
const typeTitle = ref("");
const typeImg = ref("");
const route = useRouter();

function handleCreateVm(type: vmType) {
  route.push("/vms/create-vm:" + type);
}

onMounted(() => {
  typeTitle.value = props.type.charAt(0).toUpperCase() + props.type.slice(1);
  typeImg.value = props.type + ".png";
});
</script>

<template>
  <div class="vm-card-container">
    <h1 class="vm-card-title">{{ typeTitle }}</h1>
    <vmImage
      :src="typeImg"
      :alt="typeTitle + ' Virtual Machine Logo'"
      :width="60"
      :height="60"
    ></vmImage>
    <p>Create a {{ typeTitle }} Virtual Machine</p>
    <vmButton
      label="Create"
      name="create-button"
      @click="handleCreateVm(props.type)"
    ></vmButton>
  </div>
</template>

<style lang="scss" scoped>
.vm-card-container {
  display: flex;
  height: fit-content;
  width: fit-content;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: var(--elevation-1);
  padding: 8px;
  border-radius: 12px;
  transition: all 0.3s ease;
  background-color: var(--light);

  &:hover {
    transform: scale(1.02);
    box-shadow: var(--elevation-3);
  }
}

.vm-card-title {
  font-size: 24px;
  font-weight: 700;
}
</style>
