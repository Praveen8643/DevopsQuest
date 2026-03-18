from pydantic import BaseModel


class QuizSubmitRequest(BaseModel):
    quiz_id: int
    answers: list[str]
