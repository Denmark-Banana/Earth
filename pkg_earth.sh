#!/bin/sh
echo "Packaging Test"
USER="root"
SERVER_IP="192.168.7.198"
SENDING_FILE="/Users/kimdaehyun/git/earth/dist.tar"
SAVE_DIR="/home/tapp/manual"


#Packaging Earth Project
npm run build
cp ./.env ./dist
cp ./swagger.yaml ./dist
cp -r ./root ./dist
cp ./README.md ./dist

wait
tar -cvf dist.tar ./dist

#Send File to Server
wait
scp -o StrictHostKeyChecking=no $SENDING_FILE $USER@$SERVER_IP:$SAVE_DIR

# PW=""
# expect <<EOF
#  spawn scp -o StrictHostKeyChecking=no $SENDING_FILE $USER@$SERVER_IP:$SAVE_DIR
#  expect "password:"
#  send "$PW\r"
#  expect eof
# EOF 


