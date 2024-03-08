import { vmType } from "./vmTypes.enum";

export interface VirtualMachine {
    id: string;
    name: string;
    type: string;
    status: string;
    ip: string;
    user: string;
    ssh: string;
}

export interface VmModel {
    id: string;
    name: string;
    type: vmType;
    version: string;
    size: string;
    ram: string;
}

export const VmModels:VmModel[] = [
    {
        id: "1",
        name: "Debian",
        type: "debian",
        version: "10",
        size: "2GB",
        ram: "0.5GB",
    }, 
    {
        id: "2",
        name: "Ubuntu",
        type: "ubuntu",
        version: "20.04",
        size: "10GB",
        ram: "4GB",
    },
    {
        id: "3",
        name: "Windows",
        type: "windows",
        version: "10",
        size: "10GB",
        ram: "8GB",
    }
]   