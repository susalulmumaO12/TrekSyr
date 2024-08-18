
# Integration API Documentation

## Contents

1. [First Time Run Presets](#first-time-run-presets)
    - [Create Database User (only once in a lifetime)](#create-database-user-only-once-in-a-lifetime)
    - [Create the Database](#create-the-database)
2. [Running the App](#running-the-app)
    - [First Run](#first-run)
    - [Not First Run](#not-first-run)
3. [Postman](#postman)
    - [Importing the Collection](#importing-the-collection)
    - [Changing Environment Variables](#changing-environment-variables)
4. [Seeds](#seeds)
    - [Users](#users)
    - [Licences](#licences)
    - [Cities](#cities)
    - [Categories](#categories)
5. [APIs](#apis)
    - [Mutual APIs](#mutual-apis)
    - [Admin APIs](#admin-apis)
    - [User APIs](#user-apis)
    - [Guide APIs](#guide-apis)

---

## First Time Run Presets

### Create Database User (only once in a lifetime)

1. Run XAMPP as administrator.
2. Start both Apache and MySQL services.
3. Open PhpMyAdmin by clicking on the “Admin” button in the Apache row.
4. Open the trek database in PhpMyAdmin.
5. Go to “Privileges” or “User Accounts” in the upper menu.
6. Click on “Add New User” at the bottom of the page.
7. Fill in the fields with the following information:
   - **User name**: `trekDB`
   - **Host name**: `localhost`
   - **Password**: `SsSsSs1111`
   - **Re-type**: `SsSsSs1111`
8. Check the Global Privileges and set them as shown in the screenshot.
9. Leave the rest as is and click GO (at the bottom of the page).

### Create the Database

Run the following commands in order:

```bash
npm i
npx sequelize db:create
```

## Running the App

### First Run

- Open the backend folder in Visual Studio Code OR open CMD in that folder.
- Run this command:

```bash
npm i 
```

- Next, run this command:

```bash
npm start
```

- On the console, you’ll see the URL you’ll be using in the next operations. You can press `Ctrl + click` to copy the URL.

### Not First Run

- Same as the first run but instead of `npm start`, run:

```bash
nodemon index.js
```

## Postman

### Importing the Collection

Follow this link to import the collection. You should see the following:

![Postman Collection](image.png)

### Changing Environment Variables

1. On the left side menu, click **Environments**.
2. Click **env variables**.
3. Change the `current value` to the URL you got from the terminal.

## Seeds

### Users

| user_id | first_name | last_name | email            | phone_number | password  | role_id | isVerified | isValidated |
|---------|------------|-----------|------------------|--------------|-----------|---------|------------|-------------|
| 1       | admin      | Jacob     | admin@gmail.com   | +9630001111  | admin1234 | 1       | 1          | 1           |
| 2       | guide      | Henry     | guide@gmail.com   | +9630002222  | guide1234 | 2       | 1          | 0           |
| 3       | user       | Donald    | user@gmail.com    | +9630003333  | user1234  | 3       | 1          | 1           |
| 4       | guide      | Samantha  | guide1@gmail.com  | +9630004444  | guide1234 | 2       | 1          | 0           |

### Licences

| licence_id | user_id | image_path                                                      |
|------------|---------|-----------------------------------------------------------------|
| 1          | 2       | `..\..\..\public\licences\licenceImage-1720200913019-374916348.jpg` |
| 2          | 4       | `..\..\..\public\licences\licenceImage-1720175581792-783877763.png`  |

### Cities

| city_id | name          |
|---------|---------------|
| 1       | Damascus      |
| 2       | Aleppo        |
| 3       | Homs          |
| ...     | ...           |

### Categories

| category_id | name        |
|-------------|-------------|
| 1           | Mountains   |
| 2           | Beach       |
| 3           | Forest      |
| ...         | ...         |

## APIs

### Mutual APIs

#### Signup (USER)

- **URL**: `{{base_url}}/api/users/registerUser`
- **Method**: POST
- **Request Body**:

```json
{
    "first_name": "fname",
    "last_name": "lname",
    "email": "something@example.com",
    "phone_number": "+9639000000000",
    "password": "p4s$w0rd"
}
```

- **Response**:

```json
{
    "message": "User created successfully! Check your inbox to verify your email."
}
```

**Status Codes**:

- **201**: User created successfully, and verification code is sent via email.
- **400**: Bad Request if any field is wrong, or if the email/phone number is already registered.
- **500**: Internal Server Error.

...

### Admin APIs

#### Accept Guide

- **URL**: `{{base_url}}/api/admin/acceptGuide`
- **Method**: POST
- **Request Headers**: Bearer Token: `<valid token>`
- **Request Body**:

```json
{
    "user_id": 1
}
```

- **Response**:

```json
{
    "message": "Guide validated successfully!"
}
```

**Status Codes**:

- **200**: Guide validated successfully.
- **400**: User is not a guide.
- **401**: Unauthorized.
- **404**: User not found.
- **500**: Internal Server Error.

...

### User APIs

#### Get all Guides

- **URL**: `{{base_url}}/api/user/getAllGuides/byName`
- **Method**: GET
- **Request Headers**: Bearer Token: `<valid token>`
- **Request Parameters**: `byName`: `<“1” or “0”>`
- **Response**:

```json
[
    {
        "id": 2,
        "first_name": "guide",
        "last_name": "Henry",
        "image": "<base64 string>",
        "average_rating": "3.6667"
    },
    ...
]
```

...

### Guide APIs

#### Add Trip

- **URL**: `{{base_url}}/api/guide/addTrip`
- **Method**: POST
- **Request Headers**: Bearer Token: `<valid token>`
- **Request Body**:

```json
{
    "guide_id": 2,
    "name": "Trip to the mountains",
    "price": 100,
    "info": "A fun trip to the mountains",
    "starting_time": "2024-07-20T08:00:00Z",
    "ending_time": "2024-07-20T20:00:00Z",
    "gathering_place": "Main Square",
    "capacity": 20,
    "closing_date": "2024-07-18T23:59:59Z",
    "places": [
        { "place_name": "Haretna Restaurant", "time": "2024-07-20T10:00:00Z" },
        { "place_name": "Homs Lake", "time": "2024-07-20T12:00:00Z" }
    ]
}
```

- **Response**:

```json
{
    "message": "Trip added successfully!"
}
```

**Status Codes**:

- **201**: Trip added successfully.
- **400**: Bad Request for invalid input or dates.
- **401**: Unauthorized.
- **404**: Not Found.
- **500**: Internal Server Error.