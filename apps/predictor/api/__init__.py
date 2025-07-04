from fastapi import APIRouter
from core.config import settings
from .predictor import router as predictor_router

router = APIRouter(
    prefix=settings.api.prefix,
)

router.include_router(
    predictor_router,
    prefix=settings.api.users
)