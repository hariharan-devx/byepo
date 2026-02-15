# ByePo - Feature Flag Management System

A full-stack feature flag management system with role-based access control (RBAC). The system supports three user roles: Super Admin, Organization Admin, and End User.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Response Format](#api-response-format)
- [Error Handling](#error-handling)

---

## Project Overview

ByePo is a feature flag management system that allows organizations to create, manage, and control feature flags for their applications. The system provides:

- **JWT-based Authentication**: Secure login and session management
- **Role-Based Access Control**: Three-tier role system (Super Admin, Organization Admin, End User)
- **Organization Management**: Create and manage multiple organizations
- **Feature Flags**: Full CRUD operations for feature toggles
- **CORS Support**: Cross-origin requests enabled for frontend integration

---

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: Helmet, express-rate-limit, bcrypt
- **Logging**: Morgan
- **Additional**: Cookie Parser, CORS

### Frontend

- **Technology**: HTML, CSS, JavaScript
- **API Communication**: Fetch API

---

## Project Structure

```
byepo/
├── client/                          # Frontend Application
│   ├── helper/
│   │   └── apiCall.js              # API utility functions
│   ├── super-admin/                # Super Admin Dashboard
│   │   ├── index.html              # Dashboard page
│   │   ├── login.html              # Login page
│   │   └── signup.html             # Signup page
│   ├── org-admin/                  # Organization Admin Dashboard
│   │   ├── index.html              # Dashboard page
│   │   ├── login.html              # Login page
│   │   └── signup.html             # Signup page
│   └── end-user/                   # End User Interface
│       ├── index.html              # Dashboard page
│       ├── login.html              # Login page
│       └── signup.html             # Signup page
│
├── server/                          # Backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── mysqlConfig.js      # MySQL database configuration
│   │   ├── controllers/
│   │   │   ├── authController.js       # Authentication logic
│   │   │   ├── errorController.js      # Global error handling
│   │   │   ├── featureFlagController.js # Feature flag operations
│   │   │   ├── healthController.js     # Health check endpoint
│   │   │   └── organizationController.js # Organization operations
│   │   ├── dbOperations/
│   │   │   ├── featureFlagStatements.js # Feature flag SQL queries
│   │   │   ├── organizationStatements.js # Organization SQL queries
│   │   │   └── userStatements.js       # User SQL queries
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js       # JWT authentication middleware
│   │   │   ├── roleMiddleware.js       # Role authorization middleware
│   │   │   └── validateMiddleware.js   # Request validation middleware
│   │   ├── routes/
│   │   │   ├── authRoute.js            # Authentication routes
│   │   │   ├── featureFlagRoute.js     # Feature flag routes
│   │   │   ├── healthRoute.js          # Health check routes
│   │   │   └── orginizationRoute.js    # Organization routes
│   │   ├── utils/
│   │   │   ├── asyncHandler.js         # Async error handler utility
│   │   │   ├── CustomError.js          # Custom error class
│   │   │   └── jwt.js                  # JWT utilities
│   │   └── validations/
│   │       ├── authValidation.js       # Authentication validation schemas
│   │       ├── featureFlagValidation.js # Feature flag validation schemas
│   │       └── organizationValidation.js # Organization validation schemas
│   ├── app.js                           # Express app configuration
│   ├── server.js                        # Server entry point
│   └── package.json                     # Project dependencies
│
├── .gitignore
└── README.md
```

---

## User Roles

| Role            | Description                | Permissions                                  |
| --------------- | -------------------------- | -------------------------------------------- |
| **SUPER_ADMIN** | System Administrator       | Create organizations, view all organizations |
| **ORG_ADMIN**   | Organization Administrator | Manage feature flags for their organization  |
| **END_USER**    | End User                   | Check feature flag status                    |

---

## API Endpoints

### Health Check

| Method | Endpoint | Description                | Access |
| ------ | -------- | -------------------------- | ------ |
| GET    | `/`      | Check server health status | Public |

### Authentication

| Method | Endpoint                  | Description                       | Access        |
| ------ | ------------------------- | --------------------------------- | ------------- |
| POST   | `/auth/super-admin/login` | Login as Super Admin              | Public        |
| POST   | `/auth/org-admin-signup`  | Register a new Organization Admin | Public        |
| POST   | `/auth/end-user-signup`   | Register a new End User           | Public        |
| POST   | `/auth/login`             | Login as Org Admin or End User    | Public        |
| POST   | `/auth/logout`            | Logout and clear session          | Authenticated |

### Organizations

| Method | Endpoint         | Description               | Access      |
| ------ | ---------------- | ------------------------- | ----------- |
| POST   | `/organizations` | Create a new organization | SUPER_ADMIN |
| GET    | `/organizations` | List all organizations    | SUPER_ADMIN |

### Feature Flags

| Method | Endpoint                    | Description                             | Access    |
| ------ | --------------------------- | --------------------------------------- | --------- |
| POST   | `/feature-flags/create`     | Create a new feature flag               | ORG_ADMIN |
| PUT    | `/feature-flags/update`     | Update a feature flag                   | ORG_ADMIN |
| PUT    | `/feature-flags/delete/:id` | Delete a feature flag                   | ORG_ADMIN |
| GET    | `/feature-flags/list`       | List all feature flags for organization | ORG_ADMIN |
| POST   | `/feature-flags/check`      | Check if a feature flag is enabled      | END_USER  |

---

## Installation

### Prerequisites

- Node.js
- MySQL

### Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory (see Environment Variables section)

4. Set up the MySQL database (see Database Setup section)

5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

The frontend is built with plain HTML/CSS/JS and can be served using any static file server. You can use:

- Live Server (VS Code extension)
- Python's http.server
- Any static file server of your choice

Example with Python:

```bash
# From client directory
cd client
```

Then access the application at `http://127.0.0.1:5500` using vs code live server.

---

## Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
# Environment Configuration
NODE_ENV=dev

# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=byepo

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES=1800000

# Super Admin Configuration
SUPER_ADMIN_EMAIL=superadmin@email.com
SUPER_ADMIN_PASSWORD=Admin@123

# Role Configuration
SUPER_ADMIN_ROLE=SUPER_ADMIN
ORG_ADMIN_ROLE=ORG_ADMIN
END_USER_ROLE=END_USER
```

---

## Database Setup

Run the following SQL queries in your MySQL client:

```sql
-- Create database
CREATE DATABASE byepo;
USE byepo;

-- Organizations table
CREATE TABLE `organizations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `organizations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- Users table
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_org` (`organization_id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_organization` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`);

-- Feature Flags table
CREATE TABLE `feature_flags` (
  `id` int(11) NOT NULL,
  `feature_key` varchar(100) NOT NULL,
  `is_enabled` tinyint(1) DEFAULT 0,
  `organization_id` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `feature_flags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_feature_org` (`organization_id`);

ALTER TABLE `feature_flags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `feature_flags`
  ADD CONSTRAINT `fk_feature_org` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`);
```

### Database Schema

#### Organizations Table

| Column     | Type         | Description                |
| ---------- | ------------ | -------------------------- |
| id         | int (PK)     | Auto-increment primary key |
| name       | varchar(255) | Organization name (unique) |
| created_at | timestamp    | Creation timestamp         |
| status     | varchar(1)   | Organization status (Y/N)  |

#### Users Table

| Column          | Type         | Description                 |
| --------------- | ------------ | --------------------------- |
| id              | int (PK)     | Auto-increment primary key  |
| email           | varchar(255) | User email (unique)         |
| password        | varchar(255) | Hashed password             |
| role            | varchar(20)  | User role                   |
| organization_id | int (FK)     | References organizations.id |
| created_at      | timestamp    | Creation timestamp          |
| status          | varchar(1)   | User status (Y/N)           |

#### Feature Flags Table

| Column          | Type         | Description                       |
| --------------- | ------------ | --------------------------------- |
| id              | int (PK)     | Auto-increment primary key        |
| feature_key     | varchar(100) | Unique identifier for the feature |
| is_enabled      | tinyint(1)   | Boolean flag (0 or 1)             |
| organization_id | int (FK)     | References organizations.id       |
| created_by      | int          | User ID who created the flag      |
| created_at      | timestamp    | Creation timestamp                |
| updated_by      | int          | User ID who last updated the flag |
| updated_at      | timestamp    | Last update timestamp             |
| deleted_by      | int          | User ID who deleted the flag      |
| deleted_at      | timestamp    | Deletion timestamp                |
| status          | varchar(1)   | Flag status (Y/N)                 |

---

## Running the Application

### Start Backend Server

```bash
cd server
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

### Start Frontend

```bash
cd client
```

Access the application at `http://127.0.0.1:5500` using vs code live server.

---

## API Response Format

### Authentication Response

Login and super-admin login return user data in the response:

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": 1,
      "role": "ORG_ADMIN",
      "organization_id": 1
    }
  }
}
```

### Success Response

```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Error message description"
}
```

### Validation Error Response

```json
{
  "status": "fail",
  "message": "Validation error message"
}
```

---

## Frontend Authentication Flow

The client uses role-based redirection after login:

1. **End User Login** (`client/end-user/login.html`)
   - POST to `/auth/login`
   - Validates response contains `END_USER` role
   - Redirects to `index.html` on success

2. **Organization Admin Login** (`client/org-admin/login.html`)
   - POST to `/auth/login`
   - Validates response contains `ORG_ADMIN` role
   - Redirects to `index.html` on success

3. **Super Admin Login** (`client/super-admin/login.html`)
   - POST to `/auth/super-admin/login`
   - Redirects to `index.html` on success

### Signup Pages

| Page                           | Endpoint                 | Description        |
| ------------------------------ | ------------------------ | ------------------ |
| `client/end-user/signup.html`  | `/auth/end-user-signup`  | Register END_USER  |
| `client/org-admin/signup.html` | `/auth/org-admin-signup` | Register ORG_ADMIN |

> **Note**: Super Admin credentials are configured via environment variables and don't have a signup page.

---

## Error Handling

The API uses a global error handler that returns structured error responses with appropriate HTTP status codes:

- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid credentials)
- **403**: Forbidden (invalid roles)
- **404**: Not Found (resource not found)
- **500**: Internal Server Error

All errors return a JSON response with `status` and `message` fields.

---
