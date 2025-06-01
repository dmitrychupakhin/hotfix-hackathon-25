from fastapi import APIRouter
import asyncio

router = APIRouter()

@router.post("/plan")
async def predict_cats():
    await asyncio.sleep(2)
    return [
        {
            "name": "Анализ требований и проектирование",
            "start_date": "2025-03-06",
            "end_date": "2025-03-10",
            "progress": 0
        },
        {
            "name": "Разработка бэкенда",
            "start_date": "2025-03-07",
            "end_date": "2025-03-17",
            "progress": 0
        },
        {
            "name": "Разработка фронтенда",
            "start_date": "2025-03-13",
            "end_date": "2025-03-23",
            "progress": 0
        },
        {
            "name": "Интеграция фронтенда и бэкенда",
            "start_date": "2025-03-20",
            "end_date": "2025-03-25",
            "progress": 0
        },
        {
            "name": "Тестирование и отладка",
            "start_date": "2025-03-24",
            "end_date": "2025-04-02",
            "progress": 0
        },
        {
            "name": "Развёртывание и подготовка к запуску",
            "start_date": "2025-03-30",
            "end_date": "2025-04-05",
            "progress": 0
        }
    ]