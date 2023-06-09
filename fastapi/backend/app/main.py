import os

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from jose import JWTError, jwt

USERFRONT_API_KEY = os.getenv("USERFRONT_PUBLIC_KEY")
ALGORITHM = "RS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://backend",
    "http://backend:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TokenData(BaseModel):
    mode: str
    tenantId: str
    userId: int
    userUuid: str
    isConfirmed: bool
    authorization: dict
    iss: str
    sessionId: str
    iat: int
    exp: int


@app.get("/")
async def root():
    return {"message": "root endpoint"}


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, USERFRONT_API_KEY, algorithms=[ALGORITHM])
        user = TokenData(**payload)
    except JWTError:
        raise credentials_exception

    if user is None:
        raise credentials_exception

    return user


@app.get("/api/data")
async def api_data(data: TokenData = Depends(get_current_user)):
    return {"token_data": data}
