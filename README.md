# websocket-chatApp

This project is created to fulfill Binar Javascript Challenge 7.

# Project Support

## Introduction

ChatApp is an open source platform that enable users send message to other user in real-time.

## Project Support Features

- Users can signup and login to their accounts
- Verified user can access `/api/v1/chats` endpoint to start send message

## Installation Guide

- Clone this repository [here](https://github.com/agiladis/basic-banking-system.git).
- The `main` branch is the most stable branch at any given time, ensure you're working from it.
- Run `npm install` to install all dependencies
- You can either work with cloud database or use your locally installed `PostgreSQL`. Do configure to your choice in the application entry file.
- Create an .env file in your project root folder and add your variables. See [.env.example](https://github.com/agiladis/websocket-chatApp/blob/main/.env.example) for assistance.

## Railway Project

This project is available on Railway, use this base URl on your postman :

[LINK](https://websocket-chatapp-production-26f7.up.railway.app/)

**OR**

[![USE](https://railway.app/button.svg)](https://websocket-chatapp-production-26f7.up.railway.app/)

## Usage

- Run `npm start` to start the application.
- Connect to the API using Postman on port according to your configuration.

## Column Data Type

| Column              | Data Type          | Value         | Description                     |
| ------------------- | ------------------ | ------------- | ------------------------------- |
| name                | String             | Required      | user name                       |
| email               | String             | Required      | user email (unique)             |
| password            | String             | Required      | user password                   |
| phoneNumber         | String             | Required      | user phone number (unique)      |
| dob                 | DateTime           | Required      | date of birth                   |
| profilePhoto        | String             | Default null  | profile photo url               |
| isVerified          | Boolean            | Default false | acccount status                 |
| role                | Enum (ADMIN, USER) | Default USER  | account role                    |
| receiverPhoneNumber | String             | -             | phone number to receive message |
| message             | String             | -             | a message                       |

## API Endpoints

| HTTP Verbs | Endpoints                               | Payload                                 | Action                                                          |
| ---------- | --------------------------------------- | --------------------------------------- | --------------------------------------------------------------- |
| POST       | /api/v1/auth/register                   | name, email, password, phoneNumber, dob | To sign up a new user account                                   |
| POST       | /api/v1/auth/login                      | email, password                         | To login an existing user account (do email verification first) |
| POST       | /api/v1/auth/forgot-password            | email                                   | To request reset password                                       |
| POST       | /api/v1/auth/reset-password/:resetToken | email, password                         | To reset old password                                           |
| POST       | /api/v1/chats                           | receiverPhoneNumber, message            | To start send message to other user                             |

## Socket.IO Endpoints

| Events                | Endpoints | Action                                 |
| --------------------- | --------- | -------------------------------------- |
| receiver phone number | /         | To listen message from `/api/v1/chats` |

## Technologies Used

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [PostgreSQL](https://www.postgresql.org/) This is a open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
- [Prisma](https://www.prisma.io/) Is a modern database toolkit that simplifies and accelerates database workflows. It provides a type-safe and auto-generated query builder that allows developers to interact with databases using programming languages like TypeScript, JavaScript, and others..

## Authors

- [Agil Adi Saputro - GitHub](https://github.com/agiladis/)
- [Agil Adi Saputro - LinkedIn](https://www.linkedin.com/in/agiladisaputro/)
- ![alt text](https://avatars0.githubusercontent.com/u/29962968?s=400&u=7753a408ed02e51f88a13a5d11014484bc4d80ee&v=4)

## License

This project is available for use under the MIT License.
