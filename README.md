# README

## Table of contents

- [Introduction](#introduction)
- [I - Setup the project using git](#i---setup-the-project-using-git)
- [II - Install and configure NPM](#ii---install-and-configure-npm)
  - [1) Installing NVM](#1-installing-nvm)
  - [2) Installing Node using NVM](#2-installing-npm-using-nvm)
- [III - Launch the project](#iii---launch-the-project)
  - [1) Install PNPM using npm](#1-install-pnpm-using-npm)
  - [2) Install all dependencies recursively](#2-install-all-dependencies-recursively)
  - [3) Prepare the .env file :](#3-prepare-the-env-file)
  - [4) Launch both the frontend and the backend in dev mode :](#4-launch-both-the-frontend-and-the-backend-in-dev-mode)
  - [5) Build all apps and serve them :](#5-build-all-apps-and-serve-them)
    - [a) Option 1 ( frontend and backend | preffered option ) :](#a-option-1--frontend-and-backend--preffered-option)
    - [b) Option 2 ( frontend, backend and host | ***!warning experimental and might not work!*** )  :](#b-option-2--frontend-backend-and-host--warning-experimental-and-might-not-work)
  - [6) You should be set up to go](#6-you-should-be-set-up-to-go)

## Introduction

This project is a simple web application that allows you to create a virtual machine on Azure using the Azure SDK for NodeJS.

It was created as part of a school project for the course "Cloud" at Sup de Vinci.
To learn more head over to `.docs/README.md` to read the full description of the project.

It is composed of a frontend a backend and a host, the frontend is a simple web page that allows you to input the necessary information to create a virtual machine, and the backend is a simple websocket that will handle the creation of the virtual machine on Azure. The host is experimental and a work in progress.

This project is hosted on github : [Github repo](https://github.com/V4nkor/tp-vm-maker-azure)

**Other information :**

The project is using the following ports by default in serve and start mode:

* Frontend : `3000`
* Backend : `8000`
* Host : `3035`

***The dev port for the frontend may vary in dev mode***

It is heavily reliant on the Azure SDK for NodeJS, and the Azure services, so you will need to have an Azure account and a subscription to use this project.
Also the installation process was only accounted for Ubuntu or Debian with apt-get, so it might not work on other OS.

## I - Setup the project using git

**First install git :**

```bash
apt-get install git -y
```

**Then clone the repository using git :**

```bash
cd /path-to-project-folder/
git clone https://github.com/V4nkor/tp-vm-maker-azure.git
```

## II - Install and configure NPM

### 1) Installing NVM

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

## III - Launch the project

### 1) Install PNPM using npm

```bash
npm install -g pnpm
```

### 2) Install all dependencies recursively

```bash
pnpm -r install
```

This will install the dependencies for both the Frontend and the Backend

### 3) Prepare the .env file

* You can either make it manually by using the `.env.template` file and create the `.env` file with your credentials in `./apps/front/`

* Or you can use the implemented CLI script using pnpm : 

```bash
pnpm run env
```

You will be prompted the following elements in your terminal : 

* `AZURE_SUBSCRIPTION_ID`

* `AZURE_CLIENT_ID`

* `AZURE_TENANT_ID`

* `AZURE_CLIENT_SECRET`

You can set them up and retrieve them by following this tutorial : [Entra App documentation MS Learn](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal#get-application-id-and-authentication-key)

### 4) Launch both the frontend and the backend in dev mode

```bash
pnpm run dev
```

This will launch the frontend on `http://localhost:8082/front/`



### 5) Build all apps and serve them

#### a) Option 1 ( frontend and backend | preffered option )
  
```bash
pnpm run build:serve
pnpm run serve
```

This will build the frontend and the backend, then serve them using the ports `3000` for the frontend and `8000` for the backend.

#### b) Option 2 ( frontend, backend and host | ***!warning experimental and might not work!*** )

```bash
pnpm run build
pnpm run start
```
This will build the frontend, backend and host, then serve them using the port `3035` for the host. 

### 6) You should be set up to go

- Just head over to your browser and use the following URL to access the frontend if you used ***serve*** : `http://localhost:3000`
- Or use the following URL to access the host if you used ***start*** : `http://localhost:3035`

If it's does not work, search for the output of the `pnpm run serve` or `pnpm run start` command.
