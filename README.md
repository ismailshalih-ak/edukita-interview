# Edukita Interview Project

This project is a full-stack application built with TypeScript, Express.js (backend), React (frontend), and Vite.

## Prerequisites

*   Node.js and npm or yarn installed
*   (Optional) Docker and Docker Compose for containerization

## Development

### Backend

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Set up environment variables:**

    *   Create a `.env` file in the `backend` directory.
    *   Add the following variables (and adjust the values as needed):

        ```
        PORT=8000
        FRONTEND_URL=http://localhost:5173  # Or the address of your frontend
        NODE_ENV=development
        ```

4.  **Run the backend in development mode:**

    ```bash
    npm run dev  # or yarn dev
    ```

    This will start the backend server and automatically restart it when you make changes to the code.

### Frontend

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Set up environment variables:**

    *   Create a `.env` file in the `frontend` directory.
    *   Add the following variable (and adjust the value as needed):

        ```
        VITE_BACKEND_URL=http://localhost:8000  # The address of your backend
        ```

4.  **Run the frontend in development mode:**

    ```bash
    npm run dev  # or yarn dev
    ```

    This will start the Vite development server, and open the application in your browser (usually at `http://localhost:5173`).

## Production

### Backend

1.  **Build the backend:**

    ```bash
    cd backend
    npm run build  # or yarn build
    ```

    This will compile the TypeScript code and create a `dist` directory.

2.  **Run the backend in production mode:**

    ```bash
    npm run build
    npm start  # or yarn start
    ```

    This assumes you have a `start` script in your `backend/package.json` that runs the compiled JavaScript (e.g., `node dist/index.js`).

### Frontend

1.  **Build the frontend:**

    ```bash
    cd frontend
    npm run build  # or yarn build
    ```

    This will create a production-ready build in the `dist` directory.

2.  **Serve the frontend:**

    *   You can serve the frontend's `dist` directory using a static file server (e.g., `serve` or a web server like Nginx or Apache).
    *   Example using `serve`:

        ```bash
        npm install -g serve
        serve -s dist
        ```

        This will serve the frontend from the `dist` directory, typically on port 5000.

## Docker (Optional)

Run With Docker (NOT WORKING YET):

1.  **Build and run with Docker Compose (make sure you have Docker installed and running):**

    ```bash
    docker-compose up --build
    ```

    This will build and run both the backend and frontend containers.

## Project Structure

*   `backend/`: Contains the backend code (Express.js, TypeScript).
    *   `src/`: Source code for the backend.
    *   `dist/`: Compiled output of the backend (after `npm run build`).
    *   `.env`: Environment variables for the backend.
    *   `package.json`: Backend dependencies and scripts.
    *   `tsconfig.json`: TypeScript configuration for the backend.
*   `frontend/`: Contains the frontend code (React, TypeScript, Vite).
    *   `src/`: Source code for the frontend.
    *   `dist/`: Built output of the frontend (after `npm run build`).
    *   `.env`: Environment variables for the frontend.
    *   `package.json`: Frontend dependencies and scripts.
    *   `tsconfig.json`: TypeScript configuration for the frontend.
*   `README.md`: This file, providing instructions and project information.

## Technologies Used

*   TypeScript
*   Express.js
*   React
*   Vite
*   Tailwind CSS
*   Node.js
*   npm or yarn
*   (Optional) Docker

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues.
