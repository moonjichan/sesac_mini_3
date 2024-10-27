from contextlib import asynccontextmanager
from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, SQLModel, select
from connection import conn, get_session


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 애플리케이션 시작될 때 실행할 코드
    conn()
    yield
    # 애플리케이션 종료될 때 실행할 코드 (필요 시 추가)
    
app = FastAPI(lifespan=lifespan)


#CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"], #프론트에서 오는 모든 요청을 허용 = "*" 사용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 데이터 모델 정의
class Users(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(default="")
    age: int = Field(default=0)
    gender: str = Field(default="")
    phone: str = Field(default="")


@app.get("/")
async def read_root():
    return {"message": "정보 받아랏!"}

@app.post("/users")
async def register_user(data: Users, session = Depends(get_session)) -> dict:
    statement = select(Users).where(Users.name == data.name)
    user = session.exec(statement).first()
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="동일한 사용자가 존재합니다.")
    
    
    
    new_user = Users(
        name = data.name,
        age = data.age,
        gender = data.gender,
        phone = data.phone
    )
    session.add(new_user)
    session.commit()
    return {"message": "정상적으로 등록되었습니다."}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port="8000")

