#!/bin/sh
USER="root"
SERVER_IP="192.168.7.198"
PW="root.123"

echo "Connect SSH ${SERVER_IP} to ${USER}"
ssh $USER@$SERVER_IP
 
