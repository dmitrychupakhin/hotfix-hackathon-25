from fastapi import APIRouter
from fastapi import Request
from services.generation.createPlan import createPlan
import asyncio

router = APIRouter()

@router.post("/plan")
async def predict_cats(request: Request):
    data = await request.json()
    plan = await createPlan(data)
    return plan