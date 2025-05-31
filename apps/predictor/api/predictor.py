from fastapi import APIRouter
import asyncio

router = APIRouter(tags=["Predictor Service"])

@router.post("/cats")
async def predict_cats():
    await asyncio.sleep(5)
    return {"predict_category": "Мобильные приложения", "predict_team": 4}
