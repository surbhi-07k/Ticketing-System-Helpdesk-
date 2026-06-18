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

## Phase 7 - Create Ticket API

### Objective
Allow authenticated customers to create support tickets.

### Endpoint

POST /api/tickets

### Authentication

Bearer Token Required

### Request Body

```json
{
  "title": "Unable to login",
  "description": "Login page showing error",
  "category": "technical",
  "priority": "high"
}
```

### Features

- Protected Route
- JWT Authentication
- Ticket saved in MongoDB
- Customer ID attached automatically from token
- Default status is open

### Response

```json
{
  "message": "Ticket created successfully",
  "ticket": {}
}
```

## Phase 8 - Get My Tickets API

### Objective

Allow customers to view all tickets they created.

### Endpoint

GET /api/tickets/my

### Authentication

Bearer Token Required

### Features

- View only own tickets
- JWT protected route
- Latest tickets shown first
- Returns ticket count

### Example Response

```json
{
  "count": 2,
  "tickets": [
    {
      "_id": "...",
      "title": "Unable to login",
      "status": "open"
    }
  ]
}
```

## Phase 9 - Get Single Ticket API

### Objective

Allow users to view details of a specific ticket.

### Endpoint

GET /api/tickets/:id

### Authentication

Bearer Token Required

### Features

- Find ticket by ID
- Ownership validation
- Protected route
- Returns 404 if ticket not found
- Returns 403 if ticket belongs to another user

### Example

GET /api/tickets/68501f7d4f5a2c1234567890

## Phase 10 - Update Ticket Status API

### Objective

Allow Admins and Agents to update ticket status.

### Endpoint

PATCH /api/tickets/:id/status

### Authentication

Bearer Token Required

### Authorization

Allowed Roles:
- admin
- agent

### Allowed Statuses

- open
- in-progress
- resolved
- closed

### Features

- Role-based authorization
- Status validation
- Ticket existence validation
- Protected route

### Example Request

```json
{
  "status": "resolved"
}
```

## Phase 11 - Get All Tickets API

### Objective

Allow Admins and Agents to view all tickets.

### Endpoint

GET /api/tickets

### Authentication

Bearer Token Required

### Authorization

Allowed Roles:
- admin
- agent

### Features

- View all tickets
- Latest tickets first
- Role-based access control
- Returns ticket count

### Example Response

```json
{
  "count": 5,
  "tickets": []
}
```

## Phase 12 - Assign Ticket To Agent API

### Objective

Allow Admins to assign tickets to Agents.

### Endpoint

PATCH /api/tickets/:id/assign

### Authentication

Bearer Token Required

### Authorization

Allowed Roles:
- admin

### Request Body

```json
{
  "agentId": "AGENT_ID"
}
```

### Features

- Assign ticket to agent
- Agent validation
- Role validation
- Ticket existence validation
- Protected route

## Phase 13 - Get Assigned Tickets API

### Objective

Allow agents to view tickets assigned to them.

### Endpoint

GET /api/tickets/assigned

### Authentication

Bearer Token Required

### Authorization

Allowed Roles:
- agent

### Features

- View assigned tickets only
- Latest tickets first
- Role-based access control
- Returns ticket count

## Phase 14 - Delete Ticket API

### Endpoint

DELETE /api/tickets/:id

### Authentication

Bearer Token Required

### Authorization

Allowed Roles:
- admin

### Features

- Delete ticket by ID
- Ticket existence validation
- Role-based access control
- Protected route

## Phase 15 - Ticket Filtering API

### Endpoint

GET /api/tickets

### Authentication

Bearer Token Required

### Authorization

Allowed Roles:
- admin
- agent

### Supported Filters

- status
- priority
- assignedTo

### Examples

GET /api/tickets?status=open

GET /api/tickets?priority=high

GET /api/tickets?assignedTo=AGENT_ID

GET /api/tickets?status=open&priority=urgent

## Phase 16 - Status Transition Validation

### Objective

Allow only valid ticket workflow transitions.

### Workflow

open
↓
in-progress
↓
resolved
↓
closed

### Allowed Transitions

- open → in-progress
- in-progress → resolved
- resolved → closed

### Blocked Transitions

- open → resolved
- open → closed
- resolved → open
- closed → open

## Phase 17 - Comment Model

### Purpose

Store conversations between customers and support agents.

### Fields

- ticket
- user
- message

### Relationships

Comment → Ticket

Comment → User

### Features

- Stores ticket discussions
- Tracks comment author
- Tracks creation time

## Phase 18 - Add Comment API

### Endpoint

POST /api/tickets/:id/comments

### Authentication

Bearer Token Required

### Features

- Add public comments
- Add internal notes
- Validate ticket exists
- Store comment author

### Restrictions

Customers cannot create internal notes

## Phase 19 - Get Ticket Comments API

### Endpoint

GET /api/tickets/:id/comments

### Authentication

Bearer Token Required

### Visibility Rules

Customer:
- Public comments only

Agent/Admin:
- Public comments
- Internal notes

### Features

- Ticket validation
- Role-based comment visibility
- Comments sorted oldest to newest


## Phase 20 - Populate User Details in Comments

### Purpose

Return comment author details instead of only User ID.

### Changes

Added Mongoose populate() in GET comments API.

### Code Used

populate("user", "name email role")

### Benefits

- Returns user name
- Returns user email
- Returns user role
- Better frontend integration
- No extra API call needed

### Example Response

Before:

{
  "user": "6a31148485e8de013d4e1ab9"
}

After:

{
  "user": {
    "_id": "6a31148485e8de013d4e1ab9",
    "name": "customer 123",
    "email": "customer123@gmail.com",
    "role": "customer"
  }
}

## Phase 21 - Module 3 Final Testing

### Tests Performed

- Customer can add public comments
- Customer cannot add internal notes
- Agent can add internal notes
- Customer sees only public comments
- Agent sees all comments
- Admin sees all comments
- Invalid ticket validation works
- User population works

### Module 3 Status

Completed Successfully

## Phase 22 - Attachment Model

### Purpose

Store uploaded files attached to tickets.

### Fields

- ticket
- uploadedBy
- originalName
- fileName
- filePath
- mimeType
- fileSize

### Relationships

Attachment → Ticket

Attachment → User

## Phase 23 - Multer Configuration

### Purpose

Handle file uploads.

### Package

multer

### Features

- Store files in uploads folder
- Generate unique file names
- Access uploaded file information

### Upload Location

uploads/

## Phase 24 - Upload Attachment API

### Endpoint

POST /tickets/:id/attachments

### Purpose

Upload files to tickets.

### Features

- Ticket validation
- File validation
- Save file on server
- Save metadata in MongoDB

### Stored Information

- originalName
- fileName
- filePath
- mimeType
- fileSize
- uploadedBy

## Phase 25 - Get Attachments API

## Endpoint

GET /tickets/:id/attachments

### Purpose

Fetch all files attached to a ticket.

### Features

- Ticket validation
- User population
- Sorted by latest upload
- Returns file metadata

## Phase 26 - Serve Uploaded Files

### Purpose

Allow uploaded files to be viewed and downloaded.

### Configuration

app.use("/uploads", express.static("uploads"))

### Example URL

http://localhost:3000/uploads/file-name.png

### Features

- View images
- Download PDFs
- Download documents
- Browser accessible URLs

## Phase 28 - Get All Users API

### Endpoint

GET /admin/users

### Access

Admin Only

### Features

- List all users
- Excludes password field
- Sorted by newest users

## Phase 29 - Update User API

### Endpoint

PATCH /admin/users/:id

### Access

Admin Only

### Features

- Change user role
- Activate account
- Deactivate account

### Fields

- role
- isActive

## Phase 30 - Delete User API

### Endpoint

DELETE /admin/users/:id

### Access

Admin Only

### Features

- Delete user account
- User existence validation
- Restricted to admins

## Phase 31 - Analytics Overview API

### Endpoint

GET /admin/analytics/overview

### Access

Admin Only

### Returns

- Total tickets
- Open tickets
- Resolved today
- Average resolution time (hours)

## Phase 32 - Analytics By Status API

### Endpoint

GET /admin/analytics/by-status

### Access

Admin Only

### Purpose

Returns ticket counts grouped by status.

### Status Types

- open
- in-progress
- resolved
- closed

## Phase 33 - Analytics By Agent API

### Endpoint

GET /admin/analytics/by-agent

### Access

Admin Only

### Purpose

Returns number of tickets assigned to each agent.

### Features

- Aggregation pipeline
- Agent details lookup
- Ticket count per agent