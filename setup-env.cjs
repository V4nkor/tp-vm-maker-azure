#!/usr/bin/env node
console.log("\x1b[32m This script will help you setup the .env file required for the Azure SDK to work properly.\n\x1b[0m");
console.log("\x1b[33m You can also manually create the .env file in the apps/back directory using the .env.template :\n\x1b[0m");
console.log("-----------------------------------\n");

const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
readline.question(`\x1b[34m Please, enter your Azure Subscription ID : \x1b[0m`, AZURE_SUBSCRIPTION_ID => {
    readline.question(`\x1b[34m Please, enter your Azure Client ID : \x1b[0m`, AZURE_CLIENT_ID => {
        readline.question(`\x1b[34m Please, enter your Azure Tenant ID : \x1b[0m`, AZURE_TENANT_ID => {
            readline.question(`\x1b[34m Please, enter your Azure Client Secret : \x1b[0m`, AZURE_CLIENT_SECRET => {
                const fs = require('fs');
                const envConfigFile = `AZURE_SUBSCRIPTION_ID='${AZURE_SUBSCRIPTION_ID}'\n` +
                `AZURE_CLIENT_ID='${AZURE_CLIENT_ID}'\n` +
                `AZURE_TENANT_ID='${AZURE_TENANT_ID}'\n` +
                `AZURE_CLIENT_SECRET='${AZURE_CLIENT_SECRET}'`
                fs.writeFile('./apps/back/.env', envConfigFile, (err) => {
                    if (err) throw err;
                    console.log('.env file has been created successfully !');
                    readline.close();
                })
            })
        })
    })
})