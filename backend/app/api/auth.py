from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserLogin, TokenResponse
from app.core.security import create_access_token, hash_password, verify_password

router = APIRouter()
_fake_users: dict[str, dict] = {}


@router.post("/signup", response_model=TokenResponse)
def signup(payload: UserCreate):
    if payload.email in _fake_users:
        raise HTTPException(status_code=400, detail="Email already registered")
    _fake_users[payload.email] = {
        "name": payload.name,
        "email": payload.email,
        "password_hash": hash_password(payload.password),
    }
    token = create_access_token(payload.email)
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin):
    user = _fake_users.get(payload.email)
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(payload.email)
    return TokenResponse(access_token=token)


@router.get("/me")
def me():
    return {"message": "Replace this with real authenticated user lookup"}
