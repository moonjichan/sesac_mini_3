# 1. 기본 이미지 선택
FROM python:3.11-slim

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사
COPY requirements.txt .

# 4. 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 5. 애플리케이션 소스 코드 복사
COPY . .

# 6. 환경 변수 설정
ENV PYTHONUNBUFFERED=1

# 7. 데이터베이스 초기화
RUN python -c "from connection import reset_db; reset_db()"

# 8. FastAPI 서버 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]