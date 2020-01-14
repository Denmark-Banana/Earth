#!/bin/sh
USER="root"
SERVER_IP="192.168.7.198"

echo "Connect SSH ${SERVER_IP} to ${USER}"
ssh $USER@$SERVER_IP
 
