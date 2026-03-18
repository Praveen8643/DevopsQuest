from fastapi import APIRouter
from app.schemas.quiz import QuizSubmitRequest

router = APIRouter()


@router.get("/{quiz_id}")
def get_quiz(quiz_id: int):
    return {
        "id": quiz_id,
        "title": "Git Basics Quiz",
        "questions": [
            {
                "id": 1,
                "question": "Which command creates a branch?",
                "options": ["git branch", "git merge", "git init"],
            }
        ],
    }


@router.post("/submit")
def submit_quiz(payload: QuizSubmitRequest):
    score = 100 if payload.answers and payload.answers[0] == "git branch" else 0
    return {"quiz_id": payload.quiz_id, "score": score, "passed": score >= 70}
