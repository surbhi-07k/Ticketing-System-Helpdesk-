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

### Phase 3 Completed

* Authentication module started
* Register API created
* User registration working
* Duplicate email validation added
* Password hashing using bcryptjs
* User data stored in MongoDB
* Postman testing completed

### Phase 4 Completed

* Login API created
* JWT token generation implemented
* Password verification using bcrypt.compare()
* Login validation added
* Token expiry set to 7 days
* Postman testing completed

### Phase 5 Completed

* JWT authentication middleware created
* Protected routes implemented
* Token verification using jwt.verify()
* Logged-in user retrieval endpoint (/auth/me)
* req.user functionality implemented
* Unauthorized access protection added
* Postman testing completed

## Auth Endpoints

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

## Module 1 - Authentication (Completed)

### Features

- User Registration
- User Login
- Password Hashing using bcryptjs
- JWT Token Generation
- JWT Verification Middleware
- Protected Routes
- Get Logged-in User Endpoint

### API Endpoints

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

## Phase 6 Completed

### Ticket Model

- Ticket schema created
- Ticket status workflow added
- Ticket priority levels added
- Ticket categories added
- Customer relationship added
- Agent assignment support added

