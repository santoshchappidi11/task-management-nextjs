# Task Management Application

A task management application built with [Next.js] for the frontend and [Express.js] for the backend.
This application allows users to login, register, create, update, delete and manage tasks through a user-friendly interface.

## Description

This project includes:
- **Frontend**: A Next.js-based interface for interacting with the task management system.
- **Backend**: An Express.js server that handles API requests and manages task data.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js] (which includes npm)
- [Git]

## Cloning the Repository================================================================>

1. **Clone the Repository**

   Open a terminal or command prompt and run the following command to clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-management-nextjs.git


## Navigate to the Project Directory========================================================>

2. Change into the project directory:

   cd task-management-nextjs

## Setting Up the Frontend:===============================================================>

   cd task-management(Fontend folder name which is under task-management-nextjs)
   
3.Install Dependencies

  Install the required dependencies for the task-management(Frontend folder):

  npm install

4. Configure API Base URL
   To use the local backend:

     const api = axios.create({
      baseURL: "http://localhost:8000", #un-comment this line in frontend
  });
   

5. Start the Frontend Server

  npm run dev


## Setting Up the Backend================================================================>

6. Navigate to the Backend Directory

   cd ../backend

7. Install Dependencies

  Install the required dependencies for the backend(folder):

  npm install

8. Create Environment Variables

  Create a .env file in the backend directory and add your environment variables. Example:
  PORT=5000
  DB_CONNECTION_STRING=your-database-connection-string

9. Start the Backend Server

    npm start

The backend should be running at http://localhost:8000.

Running the Application
With both servers running, you can now use the application. The frontend at http://localhost:3000 will interact with the backend API at http://localhost:8000 to manage tasks.

