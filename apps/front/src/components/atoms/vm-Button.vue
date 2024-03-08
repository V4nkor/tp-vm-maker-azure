<script lang="ts" setup>
    import { buttonType } from '../../utils/ifaces/buttonTypes.enum'

    export interface Props {
        label?: string
        name?: string
        disabled?: boolean
        btnStyle?: buttonType
    }

    const props = withDefaults(defineProps<Props>(), {
        label: "",
        name: "",
        disabled: false,
        btnStyle: "primary",
    })


</script>

<template>
    <button
        :id="props.name"
        class="button"
        :class="{ 
            'warning': props.btnStyle === 'warning',
            'danger': props.btnStyle === 'danger',
            'success': props.btnStyle === 'success',
            'info': props.btnStyle === 'info',
        }"
        type="button"
        :name="props.name"
        :disabled="props.disabled"
        :aria-label="props.label"
    >
        {{ props.label }}
    </button>
</template>

<style lang="scss" scoped>
    .button {
        background-color: var(--primary);
        color: white;
        border-radius: 12px;
        padding: 8px 12px;
        box-shadow: var(--elevation-2);
        transition: all 0.1s ease-in-out;

        &:hover { background-color: var(--primary-dark); transform: scale(1.05); }
        &:focus-visible { outline: solid 2px var(--primary-dark); }
        &:focus-visible:hover { outline: solid 2px var(--primary);}
        &:disabled { background-color: var(--grey-lighter); color: var(--grey); }
        &:active:not(:disabled) { transform: scale(0.95); }
        &.danger { background-color: var(--danger); }
        &.danger:hover { background-color: var(--danger-dark); }
        &.warning { background-color: var(--warning); }
        &.warning:hover { background-color: var(--warning-dark); }
        &.success { background-color: var(--success); }
        &.success:hover { background-color: var(--success-dark); }
        &.info { background-color: var(--info); }
        &.info:hover { background-color: var(--info-dark); }
    }
</style>
