# TrekSyr
A tourism system based in Syria ( just an assignment ), with 3 types of accounts: Admin, Guide and User.

## Project Specifics

### Contents

1. [System Prerequisites](#system-prerequisites)
2. [Required Services](#required-services)
3. [Running the App](#running-the-app)


## System Prerequisites
You need to have the followeing technologies installed on your system:

1. Node and npm
2. Flutter
3. ReactJs
4. MySQL database server

## Required Services

1. Firebase
2. OpenCage
3. Stripe
4. Gmail account with some presets

## Running the App

### Backend Side
To run the backend you will need to run this command:
- `npm i`
The last script is only needed when you don't have all the libraries and packages installed.

- `npm start`

The last script runs the following commands:

- `npx sequelize-cli db:migrate:undo:all && npx sequelize db:migrate && npx sequelize-cli db:seed:all && npx nodemon index.js `

Which creates the database (or resets it if not exists) and inserts seed into the database then runs the app usnig `nodemon`.

### Frontend Side

#### Mobile

First run the following command:
- `flutter pub get`

Then:

- `flutter run`
and choose an android device or emulator to run the app.

#### Web

Both Admin and Web folders run in the same way, first run the following command:

- `npm i`

Then:

- `npm start`

Which will run the following command: `react-scripts start`

### NOW YOU'RE ALL SET UP!

