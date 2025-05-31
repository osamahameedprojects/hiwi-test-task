# Feedback Application

A full-stack feedback system with React frontend and FastAPI backend, using MongoDB for data storage.

## Features
- Submit feedback with name, email, and message
- View all feedback entries sorted by most recent
- Responsive design with Bootstrap
- Toast notifications for user feedback
- Input validation on both frontend and backend

## Technologies
- Frontend: React, Bootstrap
- Backend: FastAPI, PyMongo
- Database: MongoDB Atlas

## Project Structure
hiwi-test-task/
├── backend/                FastAPI server
│   ├── main.py             API implementation
│   ├── requirements.txt    Python dependencies
│   └── .env                MongoDB configuration
├── frontend/               React application
│   ├── src/
│   │   ├── components/     React components
│   │   ├── services/       API service functions
│   │   ├── App.js          Main component
│   │   └── index.js        Entry point
│   └── package.json        Frontend dependencies
└── README.md               This documentation

## Setup Instructions

### Prerequisites
- Node.js v18+ (for frontend)
- Python 3.10+ (for backend)
- MongoDB Atlas account

### Backend Setup
1. Navigate to backend directory:
    ```bash
   cd backend
2. Install dependencies:
    pip install -r requirements.txt
3. Run the server:
    uvicorn main:app --reload --port 8000

The backend will be available at http://localhost:8000


### Frontend Setup
1. Navigate to frontend directory:
    cd frontend
2. Install dependencies:
    npm install
3. Start the development server:
    npm start

The frontend will be available at http://localhost:3000


## API Endpoints

POST /api/feedback - Submit new feedback
    Body: {name: string, email: string, message: string}

GET /api/feedback - Get all feedback entries sorted by date (newest first)




