from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
import uvicorn
from contextlib import asynccontextmanager
from core.config import settings
import asyncio
from api import router as api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    
    yield
    
app = FastAPI(
    default_response_class=ORJSONResponse,
    docs_url=None, 
    redoc_url=None,      
    openapi_url=None,
    lifespan=lifespan
)

app.include_router(
    api_router,
)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.run.host,
        port=settings.run.port,
        reload=True
    )