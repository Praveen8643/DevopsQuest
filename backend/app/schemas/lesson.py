from pydantic import BaseModel


class LessonCompleteRequest(BaseModel):
    lesson_id: int
    user_id: int
