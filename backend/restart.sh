#!/usr/bin/env bash

export NODE_VERSION="6.10.3"

export PATH="/home/deployer/.nvm/versions/node/v6.10.3/bin:$PATH"

export NVM_DIR="/home/deployer/.nvm"
export NVM_BIN="/home/deployer/.nvm/versions/node/v6.10.3/bin"

echo "--> Installing libraries..."
npm install --production
cp /home/deployer/apps/envs/solar-back.env .env
 
echo "--> Exporting Foreman files..."
rm -rf foreman
mkdir foreman
PORT=5002 nf export web=1 -o foreman -a solar-back
sudo cp foreman/* /etc/init
 
echo "--> Restarting..."
sudo stop solar-back
sudo start solar-back