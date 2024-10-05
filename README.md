## Description
Static content server for safetrending.com, powered by express.js.

In the current implementation, it is crucial to limit API endpoint access to the local network only, thereby preventing any external network requests. Nginx can be used as one possible method to enforce this restriction.


## Server Launch Guide

  

### Step 1: Clone the repository

  

### Step 2: Install dependencies

  

Navigate to the project directory and run the following command to install all necessary dependencies:

  

```bash

npm  install

```

  

### Step 3: Configure the environment

  

Create a '.env' file in the root directory of the project using the following template:

  

```bash

# .env file

SERVER_IP=127.0.0.1

SERVER_PORT=5000

TELEGRAM_BOT_TOKEN=''  # Enter your Telegram bot token here

ERROR_ALERT_CHANNEL_ID=''  # Telegram channel ID for error notifications

CORS_ORIGIN_URL=http://localhost:3000  # URL for CORS origin

```

  

### Step 4: Run server

  

Run the following command to start the server:

  

```bash

npm  start

```

  

Upon successful startup, the console will display a message indicating that the server is running. This message will reflect the IP address and port specified in your .env file. For example:

  

```bash

Server  is  running  at  127.0.0.1:5000

```