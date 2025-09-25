from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, date


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class HerbSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    herb_name: str
    harvest_date: str
    quantity: float
    location: str
    farm: str
    pesticides_used: Optional[str] = ""
    submission_type: str  # 'online' or 'offline'
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class HerbSubmissionCreate(BaseModel):
    herb_name: str
    harvest_date: str
    quantity: float
    location: str
    farm: str
    pesticides_used: Optional[str] = ""
    submission_type: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Herb submission endpoints
@api_router.post("/herbs", response_model=HerbSubmission)
async def create_herb_submission(herb_data: HerbSubmissionCreate):
    try:
        # Create herb submission object
        herb_dict = herb_data.dict()
        herb_obj = HerbSubmission(**herb_dict)
        
        # Insert into database
        result = await db.herb_submissions.insert_one(herb_obj.dict())
        
        if result.inserted_id:
            return herb_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create herb submission")
    except Exception as e:
        logger.error(f"Error creating herb submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/herbs", response_model=List[HerbSubmission])
async def get_herb_submissions():
    try:
        herb_submissions = await db.herb_submissions.find().to_list(1000)
        return [HerbSubmission(**submission) for submission in herb_submissions]
    except Exception as e:
        logger.error(f"Error fetching herb submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/herbs/{herb_id}", response_model=HerbSubmission)
async def get_herb_submission(herb_id: str):
    try:
        herb_submission = await db.herb_submissions.find_one({"id": herb_id})
        if not herb_submission:
            raise HTTPException(status_code=404, detail="Herb submission not found")
        return HerbSubmission(**herb_submission)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching herb submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
