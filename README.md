# PixShare

This is a clone of Instagram built with HTML, CSS, JavaScript, ReactJS, and Firebase. The application allows users to create accounts, login, comment, and upload images.

## Table of Contents

- [Instagram Clone](#instagram-clone)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Cloning the Repository](#cloning-the-repository)
    - [Setup](#setup)
    - [Firebase Setup](#firebase-setup)
  - [Usage](#usage)

## Features

- User authentication: Create an account or log into an existing account.
- Image uploading: Upload your favorite images.
- Commenting: Interact with others by commenting on images.
- Real-time updates: See updates in real-time, thanks to Firebase's Firestore.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- ReactJS
- Firebase (Authentication, Firestore, Storage)

## Installation

### Prerequisites

- Node.js
- npm

### Cloning the Repository

1. Open your terminal.
2. Clone this repo to your local machine using `https://github.com/your-username/instagram-clone.git`
   > Replace `your-username` with your actual GitHub username.

### Setup

Ensure you're in the right directory:

```bash
cd instagram-clone
```

Install all the project's dependencies:
```bash
npm install
```

### Firebase Setup
You need to create a new Firebase project and get your configuration details.

Create a .env file in the root of your project directory:
```bash
touch .env
```
Open the .env file and add the following:
```bash
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```
> Replace `your_firebase_*` with your actual Firebase configuration details.

## Usage
To start the local server, run:

```bash
npm start
```
Open your web browser and visit http://localhost:3000
