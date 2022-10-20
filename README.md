## Node.js Authentication System

A **authentication** and **session** management system built with PassportJS and Express-Session
The implementation consists of **two** strategies:

1. Local Strategy: which uses email & password to authenticate a user
2. Google Strategy: which uses google OAuth2 to authenticate a user

### How to run it locally

1. You need to clone this repo
   `git clone <url>`

2. Navigate to the project root dir and install the dependencies
   `cd <dir> & npm install`

3. Create an .env file in the project root, use the .example.env as a reference

4. Spin up the database using the docker-compose command
   `docker-compose up -d`

5. Start the app
   `npm run dev`

[@Abdulkbk](https://github.com/Abdulkbk) ❤️❤️❤️
