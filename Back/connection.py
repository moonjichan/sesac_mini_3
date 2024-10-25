from typing import Optional
from pydantic_settings import BaseSettings
from sqlmodel import SQLModel, Session, create_engine

class Settings(BaseSettings):
    DATABASE_URL: Optional[str] = None
    
    class Config:
        env_file = ".env"
        
        
settings = Settings()
engine_url = create_engine(settings.DATABASE_URL, echo=True)


# 이 코드를 추가하여 기존 테이블을 삭제하고 새로 생성
def conn():
    SQLModel.metadata.create_all(engine_url)# 새로 생성
    
    
def get_session():
    with Session(engine_url) as session:
        yield session
        