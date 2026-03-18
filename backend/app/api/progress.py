from fastapi import APIRouter

router = APIRouter()


@router.get("")
def get_progress():
    return {"xp": 420, "level": 3, "completed_modules": 3, "streak_days": 4}


@router.get("/module/{module_id}")
def get_module_progress(module_id: int):
    return {"module_id": module_id, "progress_percent": 50, "status": "in_progress"}
