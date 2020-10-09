[![Actions Status](https://github.com/Kuzmrom7/bot-generator/workflows/CI/badge.svg)](https://github.com/Kuzmrom7/bot-generator/actions)

# Bot generator

## Description

- for manage and build your chat bot
- now available only telegram bot

## Setup

1. Copy .env.example and rename to .env
2. Write your env

```
  JWT_SECRET=YOUR_JWT_SECRET
  MONGODB_URI=YOUR_MONGO_URI
```

## How to run (dev):

- ## Client

  ```
  cd ./client
  yarn
  yarn serve
  ```

- ## Server

  ```
  cd ./server

  yarn
  yarn start
  ```

- ## Also you can run all app using docker-compose

  ```
    docker-compose up --build
  ```
