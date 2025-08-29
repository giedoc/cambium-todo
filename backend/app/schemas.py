from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class TaskBase(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    completed: bool = False

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    completed: Optional[bool] = None

class TaskOut(TaskBase):
    id: int
    model_config = ConfigDict(from_attributes=True)  # ORM'den model_validate için
