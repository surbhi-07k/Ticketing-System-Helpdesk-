# Helpdesk Ticketing System

A backend Helpdesk / Ticketing System built using:

* Node.js
* Express.js
* MongoDB
* Mongoose

## Project Status

### Phase 1 Completed

* Project setup
* Express server setup
* MongoDB connection
* Environment configuration
* GitHub repository setup

### Phase 2 Completed

* User Schema created
* User Model exported
* User roles added

  * customer
  * agent
  * admin
* Account status field added (isActive)
* Automatic timestamps enabled

## Current Folder Structure

helpdesk/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   └── models/
│       └── User.js
│
├── .env
├── .gitignore
├── README.md
├── package.json
└── server.js

## Technologies Used

* Express
* Mongoose
* dotenv

## How To Run

Install dependencies:

npm install

Start development server:

npm run dev

## Database

MongoDB Compass (Local)

Connection URL:

mongodb://127.0.0.1:27017/helpdesk
