from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import auth, modules, lessons, quizzes, challenges, progress, admin

app = FastAPI(title="DevOps Quest API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(modules.router, prefix="/modules", tags=["modules"])
app.include_router(lessons.router, prefix="/lessons", tags=["lessons"])
app.include_router(quizzes.router, prefix="/quiz", tags=["quiz"])
app.include_router(challenges.router, prefix="/challenge", tags=["challenge"])
app.include_router(progress.router, prefix="/progress", tags=["progress"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])


@app.get("/")
def healthcheck():
    return {"status": "ok", "app": "DevOps Quest API"}
