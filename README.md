# DevPulse 🚀

A modular backend API for tracking software issues and feature requests inside development teams.
Built with Node.js, TypeScript, Express.js, PostgreSQL, JWT Authentication, and Raw SQL.

---

## 🌐 Live URL

🚀 [DevPulse Live API](https://devpulse-b7-a2.vercel.app/?utm_source=chatgpt.com)

---

# 📌 Project Overview

DevPulse is an internal tech issue & feature tracking system where contributors can report bugs or feature requests and maintainers can manage the workflow of issues.

This project was developed following:

- Modular backend architecture
- Raw SQL queries using PostgreSQL
- JWT-based authentication & authorization
- Centralized error handling
- Role-based access control

---

# ✨ Features

## 🔐 Authentication & Authorization

- User Registration
- User Login
- Password hashing using bcrypt
- JWT token generation & verification
- Role-based authorization middleware

---

## 🐞 Issue Management

- Create Issues
- Get All Issues
- Get Single Issue
- Update Issues
- Delete Issues

---

## 👥 Role-Based Permissions

### Contributor

- Register & Login
- Create Issues
- View Issues
- Update own issue only if status is `open`

### Maintainer

- Full contributor access
- Update any issue
- Change issue status
- Delete any issue

---

## ⚡ Backend Architecture

- Modular folder structure
- Reusable utility functions
- Centralized error handling
- Clean service-controller-route pattern
- PostgreSQL connection pooling
- Raw SQL queries only

---

# 🛠️ Tech Stack

| Technology    | Usage                 |
| ------------- | --------------------- |
| TypeScript    | Backend language      |
| Node.js       | Runtime environment   |
| Express.js    | Web framework         |
| PostgreSQL    | Relational database   |
| pg            | PostgreSQL driver     |
| bcryptjs      | Password hashing      |
| jsonwebtoken  | JWT authentication    |
| cors          | Cross-origin requests |
| cookie-parser | Cookie handling       |
| tsup          | TypeScript bundler    |
| Vercel        | Deployment            |

---

# 📁 Project Structure

```txt
src
├── app.ts
├── config
├── db
├── errors
├── interfaces
├── middlewares
├── modules
│   ├── auth
│   └── issues
├── types
├── utility
└── server.ts
```

---

# 🗄️ Database Schema Summary

## users Table

| Field      | Type                |
| ---------- | ------------------- |
| id         | SERIAL PRIMARY KEY  |
| name       | VARCHAR(100)        |
| email      | VARCHAR(255) UNIQUE |
| password   | VARCHAR(255)        |
| role       | VARCHAR(20)         |
| created_at | TIMESTAMP           |
| updated_at | TIMESTAMP           |

---

## issues Table

| Field       | Type               |
| ----------- | ------------------ |
| id          | SERIAL PRIMARY KEY |
| title       | VARCHAR(150)       |
| description | TEXT               |
| type        | VARCHAR(20)        |
| status      | VARCHAR(20)        |
| reporter_id | INT                |
| created_at  | TIMESTAMP          |
| updated_at  | TIMESTAMP          |

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
```

---

# 🚀 Setup & Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/gitbugd20p/PH-L2B7-Assignment-02
```

---

## 2️⃣ Move Into Project

```bash
cd PH-L2B7-Assignment-02
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Configure Environment Variables

Create a `.env` file and add your credentials.

---

## 5️⃣ Run Development Server

```bash
npm run dev
```

---

## 6️⃣ Build Project

```bash
npm run build
```

---

# 🌐 API Endpoints

## 🔐 Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register user |
| POST   | `/api/auth/login`  | Login user    |

---

## 🐞 Issues

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | `/api/issues`     | Create issue     |
| GET    | `/api/issues`     | Get all issues   |
| GET    | `/api/issues/:id` | Get single issue |
| PATCH  | `/api/issues/:id` | Update issue     |
| DELETE | `/api/issues/:id` | Delete issue     |

---

# 🔒 Authorization Rules

| Route        | Access                          |
| ------------ | ------------------------------- |
| Create Issue | Authenticated Users             |
| Update Issue | Maintainer OR Owner Contributor |
| Delete Issue | Maintainer Only                 |

---

# 📦 Deployment

- Backend deployed on Vercel
- PostgreSQL database connected remotely
- Environment variables configured securely

---

# 📚 Important Technical Concepts Used

- JWT Authentication
- Role-Based Access Control (RBAC)
- Express Middleware
- PostgreSQL Connection Pooling
- Raw SQL Queries
- Centralized Error Handling
- Modular Backend Architecture

---

# 👨‍💻 Author

Developed by **Md. Sabur**

---

# 📄 License

This project is developed for educational purposes as part of Programming Hero Assignment B7A2.
