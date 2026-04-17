#!/bin/bash

# Start SSH service
service ssh start

# Start ADB server
adb start-server

# Keep container running
tail -f /dev/null
