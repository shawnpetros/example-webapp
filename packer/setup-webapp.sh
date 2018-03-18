#!/bin/bash -x
echo "Setting up WEBAPP"
sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo apt-get install -y make
sudo npm i -g n
sudo n latest
git clone https://github.com/shawnpetros/example-webapp.git /home/ubuntu/example-webapp
