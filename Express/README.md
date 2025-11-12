# Todo App - Full Stack Application

A full-stack todo application built with Express.js backend and React frontend.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Beautiful, modern UI with animations
- ✅ Responsive design
- ✅ Real-time updates
- ✅ MongoDB database storage

## Project Structure

```
Express/
├── config/          # Database configuration
├── controllers/     # Business logic for todos and users
├── models/          # Database models
├── routes/          # API routes
├── server.js        # Express server
├── todoapp/         # React frontend
│   └── src/
│       ├── App.jsx
│       ├── TodoApp.jsx
│       └── TodoApp.css
└── package.json
```

## Setup Instructions

### 1. Backend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure MongoDB:**
   - Copy `.env.example` to `.env`
   - Update the `URI` in `.env` with your MongoDB connection string
   ```bash
   cp .env.example .env
   ```
   
   Example `.env`:
   ```
   PORT=5000
   URI=mongodb://localhost:27017/todoapp
   # Or use MongoDB Atlas:
   # URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   The server will run on `http://localhost:5000`

### 2. Frontend Setup

1. **Navigate to the todoapp directory:**
   ```bash
   cd todoapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## API Endpoints

### User Endpoints
- `POST /api/v1/create/users` - Create a user
- `GET /api/v1/get/users` - Get all users
- `GET /api/v1/get/user/:id` - Get user by ID
- `PUT /api/v1/update/user/:id` - Update user
- `DELETE /api/v1/delete/user/:id` - Delete user

### Todo Endpoints
- `POST /api/v1/create/todos` - Create a todo
- `GET /api/v1/get/todos` - Get all todos
- `GET /api/v1/get/todo/:id` - Get todo by ID
- `PUT /api/v1/update/todo/:id` - Update todo
- `DELETE /api/v1/delete/todo/:id` - Delete todo

## Usage

1. Start the backend server (from the root directory)
2. Start the frontend server (from the `todoapp` directory)
3. Open your browser to the frontend URL (usually `http://localhost:5173`)
4. Add, edit, complete, and delete todos!

## Technologies Used

- **Backend:** Express.js, Mongoose, MongoDB, CORS
- **Frontend:** React, Vite
- **Styling:** CSS3 with modern gradients and animations

## Notes

- Make sure MongoDB is running before starting the backend
- The backend must be running for the frontend to work properly
- Both servers need to be running simultaneously



