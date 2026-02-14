# Byepo

A RESTful API built with Express.js for managing organizations, users, and feature flags with role-based access control.

## Features

- **Authentication**: JWT-based authentication with signup and login functionality
- **Role-Based Access Control**: Super Admin and Organization Admin roles
- **Organization Management**: Create and list organizations
- **Feature Flags**: Create, update, delete, list, and check feature flags
- **Security**: Helmet for HTTP headers, rate limiting, input validation
- **MySQL Database**: Persistent data storage with connection pooling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: Helmet, express-rate-limit
- **Logging**: Morgan

## Project Structure

```
byepo/
├── src/
│   ├── config/
│   │   └── mysqlConfig.js          # MySQL database configuration
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── errorController.js      # Global error handling
│   │   ├── featureFlagController.js # Feature flag operations
│   │   ├── healthController.js     # Health check endpoint
│   │   └── organizationController.js # Organization operations
│   ├── dbOperations/
│   │   ├── featureFlagStatements.js # Feature flag SQL queries
│   │   ├── organizationStatements.js # Organization SQL queries
│   │   └── userStatements.js       # User SQL queries
│   ├── middlewares/
│   │   ├── authMiddleware.js       # JWT authentication middleware
│   │   ├── roleMiddleware.js       # Role authorization middleware
│   │   └── validateMiddleware.js   # Request validation middleware
│   ├── routes/
│   │   ├── authRoute.js            # Authentication routes
│   │   ├── featureFlagRoute.js     # Feature flag routes
│   │   ├── healthRoute.js          # Health check routes
│   │   └── orginizationRoute.js    # Organization routes
│   ├── utils/
│   │   ├── asyncHandler.js         # Async error handler utility
│   │   ├── CustomError.js          # Custom error class
│   │   └── jwt.js                  # JWT utilities
│   └── validations/
│       ├── authValidation.js       # Authentication validation schemas
│       ├── featureFlagValidation.js # Feature flag validation schemas
│       └── organizationValidation.js # Organization validation schemas
├── app.js                           # Express app configuration
├── server.js                        # Server entry point
├── package.json                     # Project dependencies
└── .env                             # Environment variables (not tracked)
```

## API Endpoints

### Health Check

| Method | Endpoint  | Description                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Check server health status |

### Authentication

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| POST   | `/auth/signup`            | Register a new user  |
| POST   | `/auth/login`             | Login as user        |
| POST   | `/auth/super-admin/login` | Login as super admin |

### Organizations

| Method | Endpoint         | Description               | Access      |
| ------ | ---------------- | ------------------------- | ----------- |
| POST   | `/organizations` | Create a new organization | SUPER_ADMIN |
| GET    | `/organizations` | List all organizations    | SUPER_ADMIN |

### Feature Flags

| Method | Endpoint                    | Description                        | Access    |
| ------ | --------------------------- | ---------------------------------- | --------- |
| POST   | `/feature-flags/create`     | Create a feature flag              | ORG_ADMIN |
| PUT    | `/feature-flags/update`     | Update a feature flag              | ORG_ADMIN |
| PUT    | `/feature-flags/delete/:id` | Delete a feature flag              | ORG_ADMIN |
| GET    | `/feature-flags/list`       | List all feature flags             | ORG_ADMIN |
| POST   | `/feature-flags/check`      | Check if a feature flag is enabled | ORG_ADMIN |

## Environment Variables

Create a `.env` file in the root directory with the following variables:

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
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=1800000

# Super Admin Configuration
SUPER_ADMIN_EMAIL=superadmin@email.com
SUPER_ADMIN_PASSWORD=Admin@123

# Role Configuration
SUPER_ADMIN_ROLE=SUPER_ADMIN
ORG_ADMIN_ROLE=ORG_ADMIN
END_USER_ROLE=END_USER
```

## Database Setup

The database schema contains three tables: organizations, users, and feature_flags.

### Database Schema

#### Organizations Table

| Column     | Type         | Description                |
| ---------- | ------------ | -------------------------- |
| id         | int (PK)     | Auto-increment primary key |
| name       | varchar(255) | Organization name (unique) |
| created_at | timestamp    | Creation timestamp         |
| status     | varchar(1)   | Organization status        |

#### Users Table

| Column          | Type         | Description                              |
| --------------- | ------------ | ---------------------------------------- |
| id              | int (PK)     | Auto-increment primary key               |
| email           | varchar(255) | User email (unique)                      |
| password        | varchar(255) | Hashed password                          |
| role            | varchar(20)  | User role (super_admin, org_admin, etc.) |
| organization_id | int (FK)     | References organizations.id              |
| created_at      | timestamp    | Creation timestamp                       |
| status          | varchar(1)   | User status                              |

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
| status          | varchar(1)   | Flag status                       |

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd byepo
```

2. Install dependencies:

```bash
npm install
```

3. Set up the MySQL database:

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

4. Configure environment variables in `.env` file

5. Start the server:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## Error Handling

The API uses a global error handler that returns structured error responses:

```json
{
  "status": "error",
  "message": "Error message description"
}
```

## Validation

All inputs are validated using Joi schemas. Invalid requests return:

```json
{
  "status": "fail",
  "message": "Validation error message"
}
```
