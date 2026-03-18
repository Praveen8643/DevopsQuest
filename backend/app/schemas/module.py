from pydantic import BaseModel


class ModuleOut(BaseModel):
    id: int
    title: str
    description: str
    difficulty: str
