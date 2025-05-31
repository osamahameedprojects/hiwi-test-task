from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
import os
import re

app = FastAPI()

load_dotenv()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGODB_URL = os.getenv("MONGODB_URL")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

# MongoDB connection
client = MongoClient(MONGODB_URL)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# Create collection and index if needed
if COLLECTION_NAME not in db.list_collection_names():
    db.create_collection(COLLECTION_NAME)
collection.create_index("timestamp")

# Email validation regex
EMAIL_REGEX = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b"

# Pydantic models
class FeedbackCreate(BaseModel):
    name: str
    email: str
    message: str

    def validate_email(self):
        if not re.fullmatch(EMAIL_REGEX, self.email):
            raise ValueError("Invalid email format")
        return self

class FeedbackResponse(FeedbackCreate):
    id: str
    timestamp: datetime

# API endpoints
@app.post("/api/feedback", response_model=dict, status_code=201)
def create_feedback(feedback: FeedbackCreate):
    """Create new feedback entry"""
    try:
        # Validate email format
        feedback.validate_email()
    except ValueError as e:
        raise HTTPException(400, str(e))
    
    feedback_data = feedback.dict()
    feedback_data["timestamp"] = datetime.utcnow()
    
    try:
        result = collection.insert_one(feedback_data)
        return {"id": str(result.inserted_id), "message": "Feedback created"}
    except Exception as e:
        raise HTTPException(500, f"Database error: {str(e)}")

@app.get("/api/feedback", response_model=list[FeedbackResponse])
def get_feedback():
    """Get all feedback sorted by newest first"""
    try:
        feedback_list = []
        for document in collection.find().sort("timestamp", -1):
            document["id"] = str(document["_id"])
            feedback_list.append(FeedbackResponse(**document))
        return feedback_list
    except Exception as e:
        raise HTTPException(500, f"Database error: {str(e)}")