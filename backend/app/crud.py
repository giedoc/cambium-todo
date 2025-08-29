from typing import Optional
from sqlalchemy.orm import Session
from . import models, schemas

def create_task(db: Session, data: schemas.TaskCreate) -> models.Task:
    task = models.Task(title=data.title, completed=data.completed)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def list_tasks(db: Session) -> list[models.Task]:
    return db.query(models.Task).order_by(models.Task.id.desc()).all()

def get_task(db: Session, task_id: int) -> Optional[models.Task]:
    return db.get(models.Task, task_id)

def update_task(db: Session, task: models.Task, data: schemas.TaskUpdate) -> models.Task:
    if data.title is not None:
        task.title = data.title
    if data.completed is not None:
        task.completed = data.completed
    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task: models.Task) -> None:
    db.delete(task)
    db.commit()
