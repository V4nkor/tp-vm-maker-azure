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
        version: "12",
        size: "2GB (fake data)",
        ram: "0.5GB (fake data)",
    }, 
    {
        id: "2",
        name: "Ubuntu",
        type: "ubuntu",
        version: "18.04-LTS",
        size: "10GB (fake data)",
        ram: "4GB (fake data)",
    },
    {
        id: "3",
        name: "Windows",
        type: "windows",
        version: "10",
        size: "10GB (fake data)",
        ram: "8GB (fake data)",
    }
]   