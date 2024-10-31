# TrekSyr

**TrekSyr** is a Syrian tourism platform designed to streamline trip booking, payment processing, and user management, with a focus on providing a smooth experience for travelers and service providers.

## Project Specifics

**Contents:**

1. [Features](#features)
2. [System Prerequisites](#system-prerequisites)
3. [Required Services](#required-services)
4. [Running the App](#running-the-app)
5. [Technologies Used](#technologies-used)
   
#

## Features

### 1. User Authentication and Management
- Secure login and registration using JWT.
- Role-based access for Admin, Guide, and User accounts.
- Password hashing for enhanced security.

### 2. Trip Management
- **Users:** View detailed trip information, including time and pricing.
- **Admins:** Add, update, or delete trips.
- Real-time trip availability updates.

### 3. Booking System
- Validates and prevents overlapping bookings for users.
- Allows users to book trips seamlessly.

### 4. Payment Processing
- Secure payments using Stripe.
- Users can make payments and receive confirmation in-app.
- Handles refund policies dynamically.

### 5. Refund System
- Calculates refund eligibility (full, partial, or no refund) based on the trip's closing date.
- Processes refunds through Stripe for eligible trips.

### 6. Notifications
- Real-time notifications for bookings and payments.
- Provides status updates for booking and refund processes.

### 7. Admin Panel
- Trip management, booking oversight, and payment monitoring.
- Secure and separate access for administrative tasks.

#

## System Prerequisites

Ensure the following technologies are installed:

1. Node.js and npm
2. Flutter
3. React.js
4. MySQL database server

#

## Required Services

1. Firebase (for notifications and authentication)
2. OpenCage (for geolocation)
3. Stripe (for payment processing)
4. Gmail account (for email notifications)

#

## Running the App

### Backend Side

1. Navigate to the `backend` folder and install dependencies:
   ```bash
   npm i
    ```
2. Start the backend server:
    ```
    npm start
    ```
3. This command runs the following:
    ```
    npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npx nodemon index.js
    ```
    _Resets and seeds the database, then starts the server using_ `nodemon`.

### Frontend Side

#### Mobile (Flutter App)

1. Navigate to the Flutter project folder.
2. Install dependencies:
    ```
    flutter pub get
    ```
3. Run the app:
    ```
    flutter run
    ```
Select an Android device or emulator to launch the app.

#### Web (Admin and User Web Panels)

1. Navigate to the respective `Admin` or `Web` folders. _Web folder is for the guide web application._
2. Install dependencies:
    ```
    npm i
    ```
3. Start the web app:
    ```
    npm start
    ```
    This command runs the React development server:
    ```
    react-scripts start
    ```

**Now you're all set!**

## Technologies Used

   - **Frontend:** Flutter (Mobile) and React.js (Web)
   - **Backend:** Node.js, Express.js
   - **Database:** MySQL with Sequelize ORM
   - **Payment Integration:** Stripe
   - **Geolocation:** OpenCage API
   - **Notifications:** Firebase
   - **Authentication:** JWT
