from fastapi import APIRouter

router = APIRouter()

MODULES = [
    {"id": 1, "title": "Git Basics", "description": "Commits, branches, and merge flow.", "difficulty": "Beginner"},
    {"id": 2, "title": "GitHub & GitLab", "description": "Repos, pull requests, merge requests, and CI basics.", "difficulty": "Beginner"},
    {"id": 3, "title": "Docker", "description": "Images, containers, and Dockerfiles.", "difficulty": "Beginner"},
    {"id": 4, "title": "Kubernetes", "description": "Pods, deployments, and services.", "difficulty": "Intermediate"},
]


@router.get("")
def list_modules():
    return MODULES


@router.get("/{module_id}")
def get_module(module_id: int):
    for module in MODULES:
        if module["id"] == module_id:
            return module
    return {"message": "Module not found"}
