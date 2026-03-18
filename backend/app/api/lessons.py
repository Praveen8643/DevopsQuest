from fastapi import APIRouter
from app.schemas.lesson import LessonCompleteRequest

router = APIRouter()


@router.get("/{lesson_id}")
def get_lesson(lesson_id: int):
    return {
        "id": lesson_id,
        "title": "What is Git?",
        "content": "Git is a distributed version control system used to track file changes and support collaboration.",
    }


@router.post("/complete")
def complete_lesson(payload: LessonCompleteRequest):
    return {"message": "Lesson marked complete", "lesson_id": payload.lesson_id, "user_id": payload.user_id}
