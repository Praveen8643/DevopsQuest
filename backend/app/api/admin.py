from fastapi import APIRouter

router = APIRouter()


@router.post("/module")
def create_module(payload: dict):
    return {"message": "Module created", "data": payload}


@router.post("/lesson")
def create_lesson(payload: dict):
    return {"message": "Lesson created", "data": payload}


@router.post("/quiz")
def create_quiz(payload: dict):
    return {"message": "Quiz created", "data": payload}


@router.post("/challenge")
def create_challenge(payload: dict):
    return {"message": "Challenge created", "data": payload}
