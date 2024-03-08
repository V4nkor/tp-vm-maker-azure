export enum buttonTypes {
    primary = 'primary',
    danger= 'danger',
    warning = 'warning',
    success = 'success',
    info = 'info'
}

export type buttonType = keyof typeof buttonTypes