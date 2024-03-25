import express from "express";
import dotenv from "dotenv";

import util from "util";
import cors from "cors";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

import {
  ClientSecretCredential,
  DefaultAzureCredential,
} from "@azure/identity";
import { ComputeManagementClient } from "@azure/arm-compute";
import { ResourceManagementClient } from "@azure/arm-resources";
import { StorageManagementClient } from "@azure/arm-storage";
import { NetworkManagementClient } from "@azure/arm-network";

// Load the environment variables
const config = dotenv.config();

// Create an express app
const app = express();
// Enable CORS
app.use(cors());
// Create an HTTP server
const server = createServer(app);
// Create a new instance of socket.io by passing the server object
const io = new Server(server, {
  cors: {
    origin: "*", // the frontend url and port
    methods: ["GET", "POST"],
  },
  connectionStateRecovery: {},
});

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));
// Simple express homepage
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Socket.io connection
io.on("connection", async (socket) => {
  console.log("Connected to the client");

  socket.on("disconnect", () => {
    console.log("Disconnected from the client");
  });

  socket.on("startCreatingVm", async (data) => {
    console.log("startCreatingVm", data);
    // Start creating the ressource group
    console.log("Creating resources");
    console.log("Data : ", data);
    createResources(data.vmType);
  });
});

server.listen(8000, () => {
  console.log("server running at http://localhost:8000");
});

// Store function output to be used elsewhere
let randomIds = {};
let subnetInfo = null;
let publicIPInfo = null;
let vmImageInfo = null;
let nicInfo = null;

// CHANGE THIS - used as prefix for naming resources
const yourAlias = "mmorgat";

// CHANGE THIS - used to add tags to resources
const projectName = "azure-samples-create-vm";

// Resource configs
const location = "eastus";
const accType = "Standard_LRS";

let publisher = ""
let offer = ""
let sku = ""
let vmImageVersionNumber = ""

const vmImageConfigs = {
  "debian": {
    publisher: "debian",
    offer: "debian-12",
    sku: "12",
    version: "latest",
  },
  "ubuntu": {
    publisher: "Canonical",
    offer: "UbuntuServer",
    sku: "18.04-LTS",
    version: "latest",
  },
  "windows": {
    publisher: "microsoftwindowsdesktop",
    offer: "windows-10",
    sku: "win10-22h2-pro",
    version: "latest",
  }
};

function setVMImageConfigs(image) {
  publisher = vmImageConfigs[image].publisher
  offer = vmImageConfigs[image].offer
  sku = vmImageConfigs[image].sku
  vmImageVersionNumber = vmImageConfigs[image].version
}

// Credentials for VMS
const adminUsername = "mmorgat";
const adminPassword = "Pa$$w0rd92";

// Azure authentication in environment variables for DefaultAzureCredential
const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const secret = process.env.AZURE_CLIENT_SECRET;
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

let credentials = null;

if (process.env.production) {
  // production
  credentials = new DefaultAzureCredential();
} else {
  // development
  credentials = new ClientSecretCredential(tenantId, clientId, secret);
  console.log("development");
}

// Azure services
const resourceClient = new ResourceManagementClient(
  credentials,
  subscriptionId
);
const computeClient = new ComputeManagementClient(credentials, subscriptionId);
const storageClient = new StorageManagementClient(credentials, subscriptionId);
const networkClient = new NetworkManagementClient(credentials, subscriptionId);

// Create resources then manage them (on/off)
async function createResources(image) {
  try {
    // get the VM image
    setVMImageConfigs(image);

    const result = await createResourceGroup();

    // Emit that the resource group has been created
    io.emit("resourceGroupCreated", result);

    const accountInfo = await createStorageAccount();

    //Emit that the storage account has been created
    io.emit("storageAccountCreated", accountInfo);

    const vnetInfo = await createVnet();

    //Emit that the vnet has been created
    io.emit("vnetCreated", vnetInfo);

    const subnetInfo = await getSubnetInfo();

    //Emit that the subnet has been created
    io.emit("subnetCreated", subnetInfo);

    const publicIPInfo = await createPublicIP();

    //Emit that the public IP has been created
    io.emit("publicIpCreated", publicIPInfo);

    const nicInfo = await createNIC(subnetInfo, publicIPInfo);

    //Emit that the NIC has been created
    io.emit("nicCreated", nicInfo);

    const vmImageInfo = await findVMImage();

    // Emit that the vmImage has been found
    //io.emit("vmImageFound", vmImageInfo);

    const nicResult = await getNICInfo();

    // Emit that the nicInfo has been created
    io.emit("nicInfoCreated", nicResult);

    const vmInfo = await createVirtualMachine(nicInfo.id, vmImageInfo[0].name);

    //If machine is windows based, get RDP
    //If machine is linux based, get SSH

    const vmPublicIp = await getPublicIP(vmInfo);

    if (image === "windows") {
      const rdpFile = await getRdpFileFromAzure(vmInfo, vmPublicIp);
      console.log("RDP file: ", rdpFile);

      // Emit the RDP file to the client
      io.emit("rdpFile", rdpFile);
    }

    console.log(
      "Your ",
      offer,
      "VM has been created. You can connect to it using the following information:"
    );

    console.log("Public IP Address: " + vmPublicIp.ipAddress);
    console.log("Authentification: " + adminUsername + " / " + adminPassword);
    console.log("It will be automatically turned off in 3 minutes.");

    let vmInfoFinal = {
      publicIp: vmPublicIp.ipAddress,
      auth: {
        username: adminUsername,
        password: adminPassword,
      },
    };

    // Emit the public IP to the client and the authentification info via socket.io
    io.emit("vmCreated", vmInfoFinal);

    // Turn off resources after 10 minutes
    setTimeout(() => {
      console.log("Turning off resources");
      deleteResourceGroup();
    }, 600000);

    return;
  } catch (err) {
    console.log(err);
  }
}

async function createResourceGroup() {
  console.log("\n1.Creating resource group: " + resourceGroupName);
  const groupParameters = {
    location: location,
    tags: { project: projectName },
  };
  const resCreate = await resourceClient.resourceGroups.createOrUpdate(
    resourceGroupName,
    groupParameters
  );
  console.log(resCreate);
  return resCreate;
}

async function createStorageAccount() {
  console.log("\n2.Creating storage account: " + storageAccountName);
  const createParameters = {
    location: location,
    sku: {
      name: accType,
    },
    kind: "Storage",
    tags: {
      project: projectName,
    },
  };
  return await storageClient.storageAccounts.beginCreateAndWait(
    resourceGroupName,
    storageAccountName,
    createParameters
  );
}

async function createVnet() {
  console.log("\n3.Creating vnet: " + vnetName);
  const vnetParameters = {
    location: location,
    addressSpace: {
      addressPrefixes: ["10.0.0.0/16"],
    },
    dhcpOptions: {
      dnsServers: ["10.1.1.1", "10.1.2.4"],
    },
    subnets: [{ name: subnetName, addressPrefix: "10.0.0.0/24" }],
  };
  return await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    vnetName,
    vnetParameters
  );
}

async function getSubnetInfo() {
  console.log("\nGetting subnet info for: " + subnetName);
  const getResult = await networkClient.subnets.get(
    resourceGroupName,
    vnetName,
    subnetName
  );
  return getResult;
}

async function createPublicIP() {
  console.log("\n4.Creating public IP: " + publicIPName);
  const publicIPParameters = {
    location: location,
    publicIPAllocationMethod: "Dynamic",
    dnsSettings: {
      domainNameLabel: domainNameLabel,
    },
  };
  return await networkClient.publicIPAddresses.beginCreateOrUpdateAndWait(
    resourceGroupName,
    publicIPName,
    publicIPParameters
  );
}

async function createNIC(subnetInfo, publicIPInfo) {
  console.log("\n5.Creating Network Interface: " + networkInterfaceName);
  const nicParameters = {
    location: location,
    ipConfigurations: [
      {
        name: ipConfigName,
        privateIPAllocationMethod: "Dynamic",
        subnet: subnetInfo,
        publicIPAddress: publicIPInfo,
      },
    ],
  };
  return await networkClient.networkInterfaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkInterfaceName,
    nicParameters
  );
}

async function findVMImage() {
  console.log(
    util.format(
      "\nFinding a VM Image for location %s from " +
        "publisher %s with offer %s and sku %s",
      location,
      publisher,
      offer,
      sku
    )
  );
  const listResult = new Array();
  /* for await (const item of computeClient.virtualMachineImages.list(
    location,
    publisher,
    offer,
    sku
  )) {
    listResult.push(item);
  } */

  listResult.push(
    await computeClient.virtualMachineImages.list(
      location,
      publisher,
      offer,
      sku
    )
  );

  return listResult;
}

async function getNICInfo() {
  return await networkClient.networkInterfaces.get(
    resourceGroupName,
    networkInterfaceName
  );
}

async function createVirtualMachine(nicId) {
  const vmParameters = {
    location: location,
    osProfile: {
      computerName: vmName,
      adminUsername: adminUsername,
      adminPassword: adminPassword,
    },
    hardwareProfile: {
      vmSize: "Standard_B1ls",
    },
    storageProfile: {
      imageReference: {
        publisher: publisher,
        offer: offer,
        sku: sku,
        version: vmImageVersionNumber,
      },
      osDisk: {
        name: osDiskName,
        caching: "None",
        createOption: "fromImage",
        vhd: {
          uri:
            "https://" +
            storageAccountName +
            ".blob.core.windows.net/nodejscontainer/osnodejslinux.vhd",
        },
      },
    },
    networkProfile: {
      networkInterfaces: [
        {
          id: nicId,
          primary: true,
        },
      ],
    },
  };
  console.log("6.Creating Virtual Machine: " + vmName);
  console.log(
    " VM create parameters: " + util.inspect(vmParameters, { depth: null })
  );
  const resCreate =
    await computeClient.virtualMachines.beginCreateOrUpdateAndWait(
      resourceGroupName,
      vmName,
      vmParameters
    );
  console.log("VM created !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  return await computeClient.virtualMachines.get(resourceGroupName, vmName);
}

async function deleteResourceGroup() {
  console.log("\n8.Deleting resource group: " + resourceGroupName);
  const result = await resourceClient.resourceGroups.beginDeleteAndWait(
    resourceGroupName
  );
  console.log(JSON.stringify(result));
}

async function getPublicIP(vmInfo) {
  console.log("\n7.Getting public IP for: " + vmInfo);
  const ipInfo = await networkClient.publicIPAddresses.get(
    resourceGroupName,
    publicIPName
  );
  return ipInfo;
}

async function getRdpFileFromAzure(vmInfo, publicIP) {
  console.log("Getting RDP file for: " + vmInfo);
  const rdpFile = await computeClient.virtualMachines.beginGetRemoteDesktopFile(
    resourceGroupName,
    vmName,
    {
      protocol: "RDP",
      remoteDesktopRelativeUrl: "/",
    }
  );
  console.log(rdpFile);
  return rdpFile;
}

const _generateRandomId = (prefix, existIds) => {
  var newNumber;
  while (true) {
    newNumber = prefix + Math.floor(Math.random() * 10000);
    if (!existIds || !(newNumber in existIds)) {
      break;
    }
  }
  return newNumber;
};

//Random number generator for service names and settings
const resourceGroupName = _generateRandomId(`${yourAlias}-testrg`, randomIds);
const vmName = _generateRandomId(`${yourAlias}vm`, randomIds);
const storageAccountName = _generateRandomId(`${yourAlias}ac`, randomIds);
const vnetName = _generateRandomId(`${yourAlias}vnet`, randomIds);
const subnetName = _generateRandomId(`${yourAlias}subnet`, randomIds);
const publicIPName = _generateRandomId(`${yourAlias}pip`, randomIds);
const networkInterfaceName = _generateRandomId(`${yourAlias}nic`, randomIds);
const ipConfigName = _generateRandomId(`${yourAlias}crpip`, randomIds);
const domainNameLabel = _generateRandomId(`${yourAlias}domainname`, randomIds);
const osDiskName = _generateRandomId(`${yourAlias}osdisk`, randomIds);