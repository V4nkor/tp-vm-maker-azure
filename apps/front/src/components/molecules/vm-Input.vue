<script lang="ts" setup>
    import { ref, withDefaults, defineProps } from 'vue'

    export interface Props {
        label?: string
        name?: string
        type?: string
        placeholder?: string
        error?: string
        required?: boolean
        disabled?: boolean
        modelValue?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        label: "",
        name: "",
        type: "text",
        placeholder: "",
        error: "",
        required: false,
        disabled: false,
        modelValue: ""
    })

    const emit = defineEmits(['update:modelValue'])
    const updateValue = (e: Event) => { emit('update:modelValue', (e.target as HTMLInputElement).value) }
    const errorState = ref(false)
    function setErrorState(bool : boolean){ errorState.value = bool }
    defineExpose({ setErrorState })

</script>

<template>
    <div class="vm-input-container">
        <label class="vm-input-label" v-if="props.label" :for="props.name">{{ props.label }}</label>
        <input
            class="vm-input-self"
            :type="props.type"
            :id="props.name"
            :name="props.name"
            :placeholder="props.placeholder"
            :required="props.required"
            :disabled="props.disabled"
            :class="{ error: errorState }"
            :value="props.modelValue"
            @input="updateValue"
        >
        <p v-if="errorState" class="error">{{ error }}</p>
    </div>
</template>

<style lang="scss" scoped>
    .vm-input-container { display: flex; flex-direction: column; gap: 4px; }
    .vm-input-label { font-size: 16px; font-weight: 700; color: var(--grey); }
    .vm-input-self {
        padding: 8px 12px;
        border-radius: 12px;
        outline: solid 2px var(--grey-lighter);

        &:focus-visible { outline: solid 2px var(--primary); }
        &:disabled { background-color: var(--grey-lighter); color: var(--grey); }
        &.error { outline: solid 2px var(--danger-light); }
        &.error:focus-visible { outline: solid 3px var(--danger-dark); }
    }
</style>
