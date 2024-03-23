# Full explanation

## Table of contents

- [I - Description](#i---description)
- [II - Structure](#ii---structure)
- [III - Technologies](#iii---technologies)
- [IV - Prerequisites](#iv---prerequisites)
- [V - Installation](#v---installation)
  - [1) Install NVM](#1-install-nvm)
  - [2) Installing Node using NVM](#2-installing-npm-using-nvm)
  - [3) Install PNPM using npm](#3-install-pnpm-using-npm)
  - [4) Install all dependencies recursively](#4-install-all-dependencies-recursively)
  - [5) Prepare the .env file](#5-prepare-the-env-file)
- [VI - Launch the project](#vi---launch-the-project)
  - [1) Option 1 ( frontend and backend | preffered option )](#1-option-1--frontend-and-backend--preffered-option)
  - [2) Option 2 ( frontend, backend and host | ***experimental!*** )](#2-option-2--frontend-backend-and-host--warning-experimental-and-might-not-work)
- [VII - Additional information (bonus)](#vii---additional-information-bonus)

## I - Description

This project is a school assignment where we had to create a web app that would make us able to create azure virtual machines.

It was created as part of a school project for the course "Cloud" at Sup de Vinci.
We were allowed to code the project any way we wanted and we were given a lot of freedom in the choice of the technologies we wanted to use.

Also we were given an example in python about how to create virtual machines in azure using the azure sdk : [Official Github repo example](https://github.com/Azure-Samples/virtual-machines-python-manage)

To have the exact requirements and tasks, you can read the `project-assignment.pdf` file in this folder.

This project is hosted on github : [Github repo](https://github.com/V4nkor/tp-vm-maker-azure)

## II - Structure

### 1) Introduction

The project is divided in three parts, the frontend, the backend and the host. They are located in the `apps` directory.
It uses pnpm as a package manager and to reccursively manage the apps dependencies, build and run scripts.

The project is using the following ports by default :

* Frontend : `3000`
* Backend : `8000`
* Host : `3035`

### 2) Frontend

The frontend is a VueJS app that uses vite to build and run the app.

It is located in the `./apps/front/` directory.

### 3) Backend

The backend is an Express app that uses Socket.io to communicate with the frontend and create virtual machines using the azure SDK.

It is located in the `./apps/back/` directory.

### 4) Host

The host is an Express app that serves the frontend and the backend.

It is located in the `./apps/host/` directory.

## III - Technologies

**The project is using the following technologies :**

* NodeJS
* Express
* VueJS
* Socket.io
* Azure SDK for NodeJS

**The project is also using the following tools :**

* NVM
* PNPM
* Git

**The project is also using the following external services :**

* Azure

**The project is also using the following languages :**

* JavaScript
* TypeScript
* HTML
* SCSS

## IV - Prerequisites

- [Node.js](https://nodejs.org/en/)

- [nvm](https://github.com/nvm-sh/nvm)

- [pnpm](https://pnpm.io/)

- [Azure account](https://azure.microsoft.com/en-us/free/)

- [Set up Azure application](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal#get-application-id-and-authentication-key)

- Azure credentials :
  * `AZURE_SUBSCRIPTION_ID`
  * `AZURE_CLIENT_ID`
  * `AZURE_TENANT_ID`
  * `AZURE_CLIENT_SECRET`

## V - Installation

### 1) Install NVM

**Make sure you have curl or wget installed :**

```bash
sudo apt-get install wget curl -y
```

**Then, you'll need to install NVM using curl :**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

**Or using wget :**

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Nvm will make sure you are using the correct version of nodeJS for this project

**After that, make sure to update your profile :**

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

**Then, make sure your nvm was installed correctly :**

```bash
nvm -v
```

### 2) Installing Node using NVM

Using the `.nvmrc` file and NVM, the correct version of Node for this project will be installed, eg : `v20.10.0`

Make sure you are in the same folder as the `.nvmrc` file !

```bash
nvm install
nvm use
```

### 3) Install PNPM using npm

```bash
npm install -g pnpm
```

### 4) Install all dependencies recursively

```bash
pnpm -r install
```

This will install the dependencies for both the Frontend, the Backend and the host

### 5) Prepare the .env file

* You can either make it manually by using the `.env.template` file and create the `.env` file with your credentials in `./apps/front/`

* Or you can use the implemented CLI script using pnpm : 

```bash
pnpm run env
```

## VI - Launch the project

### 1) Option 1 ( frontend and backend | preffered option )
  
```bash
pnpm run build:serve
pnpm run serve
```

This will build the frontend and the backend, then serve them using the ports `3000` for the frontend and `8000` for the backend.

### 2) Option 2 ( frontend, backend and host | ***!warning experimental and might not work!*** )

```bash
pnpm run build
pnpm run start
```

This will build the frontend, backend and host, then serve them using the port `3035` for the host.
You can access the frontend at `http://localhost:3035/front` and the backend at `http://localhost:3035/back/`

## VII - Additional information (bonus)

The --parallel option is used to serve all apps in the workspace and the --recursive is used to update all dependencies.
I experimented with pm2 to try it out, but I didn't go further with it (monitoring software for typescript apps).
It uses the ecosystem.config.js file to configure the pm2 instance.