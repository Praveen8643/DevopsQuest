from fastapi import APIRouter

router = APIRouter()

CORRECT_ORDER = ["Code", "Build Image", "Push to Registry", "Deploy to Kubernetes"]


@router.get("/{challenge_id}")
def get_challenge(challenge_id: int):
    return {
        "id": challenge_id,
        "title": "CI/CD Flow",
        "instructions": "Arrange the steps in the correct deployment order.",
        "items": ["Push to Registry", "Code", "Deploy to Kubernetes", "Build Image"],
    }


@router.post("/submit")
def submit_challenge(payload: dict):
    submitted = payload.get("items", [])
    return {"correct": submitted == CORRECT_ORDER, "expected": CORRECT_ORDER}
