# README

## I - Setup the project using git

**First install git :**

```bash
apt-get install git
```

**Then clone the repository using git :**

```bash
cd /path-to-project-folder/
git clone **********
```

## II - Install and configure NPM

### 1) Installing NVM

**Make sure you have curl or wget installed :**

```bash
sudo apt-get install wget curl -y
```

**Then, you'll need to install NVM using curl**

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

### 2) Installing NPM using NVM

Using the `.nvmrc` file and NVM, the correct version of Node for this project will be installed, eg : `v20.10.0`

Make sure you are in the same folder as the `.nvmrc` file !

```bash
nvm use
```

## Launch the project

**Install PNPM using npm :**

```bash
npm install -g pnpm
```

**Install all dependencies recursively :**

```bash
pnpm -r install
```

This will install the dependencies for both the Frontend and the Backend
