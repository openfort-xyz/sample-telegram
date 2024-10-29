# Telegram Mini-app Sample

This repository contains a sample application that integrates with the Telegram platform using React for the frontend and Node.js for the backend. The project demonstrates how to set up a Telegram mini app with routing, state management, and backend API integration.

## Project Structure

- **Frontend**: Built with React, utilizing the Telegram SDK for UI components and state management.
- **Backend**: Developed with Node.js and Express, providing API endpoints for the application.

## Prerequisites

- Node.js (version 20.18 or later)
- Yarn package manager

## Setup Instructions

### Backend

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Build the project**:
   ```bash
   yarn build
   ```

4. **Start the server**:
   - For development:
     ```bash
     yarn dev
     ```
   - For production:
     ```bash
     yarn start:prod
     ```

5. **Docker Setup** (optional):
   - Build the Docker image:
     ```bash
     docker build -t sample-telegram-backend .
     ```
   - Run the Docker container:
     ```bash
     docker run -p 3005:3005 sample-telegram-backend
     ```

### Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Start the application**:
   ```bash
   yarn start
   ```

4. **Docker Setup** (optional):
   - Build the Docker image:
     ```bash
     docker build -t sample-telegram-frontend .
     ```
   - Run the Docker container:
     ```bash
     docker run -p 3000:3000 sample-telegram-frontend
     ```

## Usage

- Access the frontend application at `http://localhost:3000`.
- The backend API is available at `http://localhost:3005`.

## Key Features

- **Routing**: Managed using React Router, with a simple structure defined in `routes.tsx`.
- **State Management**: Utilizes Telegram SDK hooks for managing app state and launch parameters.
- **Dark Mode**: Automatically adjusts the UI based on Telegram's dark mode settings.
- **Platform Adaptation**: Adjusts UI components based on the user's platform (iOS, macOS, etc.).

## Dependencies

### Backend

- `express`: Web framework for Node.js.
- `@openfort/openfort-node`: OpenFort SDK for backend integration.
- `dotenv`: Loads environment variables from a `.env` file.

### Frontend

- `react`: JavaScript library for building user interfaces.
- `@telegram-apps/sdk-react`: SDK for integrating with Telegram mini apps.
