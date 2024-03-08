export enum vmTypes {
    debian = 'debian',
    ubuntu= 'ubuntu',
    windows = 'windows'
}

export type vmType = keyof typeof vmTypes