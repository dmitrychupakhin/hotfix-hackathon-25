from pydantic import BaseModel, PostgresDsn
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

class RunConfig(BaseModel):
    host: str = "0.0.0.0"
    port: int = 8001

class ApiPrefix(BaseModel):
    prefix: str = "/api"
    users: str = "/predictor"
    
class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env.template", ".env"),
        case_sensitive=False,
        env_nested_delimiter="__",
        env_prefix="APP_CONFIG__"
    )
    run: RunConfig = RunConfig()
    api: ApiPrefix = ApiPrefix()

settings = Settings()
