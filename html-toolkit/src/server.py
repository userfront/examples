import os

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
import requests


from pydantic import BaseModel
from jose import JWTError, jwt

USERFRONT_PUBLIC_KEY = os.getenv("USERFRONT_JWT_PUBLIC_KEY")
USERFRONT_API_KEY = os.getenv("USERFRONT_API_KEY")
USERFRONT_WORKSPACE_ID = os.getenv("USERFRONT_WORKSPACE_ID")
ALGORITHM = "RS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()

origins = [
    "https://localhost",
    "https://localhost:3000",
    "https://backend",
    "https://backend:3000",
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

# vanila html frontend
@app.get("/")
async def root():
    return FileResponse('index.html')

@app.get("/login")
async def login():
    return FileResponse('login.html')

@app.get("/signup")
async def signup():
    return FileResponse('signup.html')

@app.get("/dashboard")
async def dashboard():
    return FileResponse('dashboard.html')


# serve static js & css from static directory
app.mount("/static", StaticFiles(directory="static"), name="static")


# python backend
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, USERFRONT_PUBLIC_KEY, algorithms=[ALGORITHM])
        user = TokenData(**payload)
    except JWTError:
        raise credentials_exception

    if user is None:
        raise credentials_exception

    return user


@app.get("/api/data")
async def api_data(decoded_token: TokenData = Depends(get_current_user)):
    user_id = decoded_token.userId
    workspace_id = decoded_token.tenantId
    url = f"https://api.userfront.com/v0/tenants/{workspace_id}/users/{user_id}"

    headers = {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {USERFRONT_API_KEY}"
    }

    response = requests.get(url, headers=headers)
    return {
        "token_data": decoded_token,
        "api_data": response.json()
    }
