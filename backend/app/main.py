from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .db import get_db
from . import schemas, crud

app = FastAPI(title="Cambium TODO API", version="1.0.0")

@app.get("/health")
def health() -> dict:
    return {"ok": True}

@app.get("/tasks", response_model=List[schemas.TaskOut])
def list_all(db: Session = Depends(get_db)) -> List[schemas.TaskOut]:
    return [schemas.TaskOut.model_validate(t) for t in crud.list_tasks(db)]

@app.post("/tasks", response_model=schemas.TaskOut, status_code=status.HTTP_201_CREATED)
def create(data: schemas.TaskCreate, db: Session = Depends(get_db)) -> schemas.TaskOut:
    t = crud.create_task(db, data)
    return schemas.TaskOut.model_validate(t)

@app.get("/tasks/{task_id}", response_model=schemas.TaskOut)
def get(task_id: int, db: Session = Depends(get_db)) -> schemas.TaskOut:
    t = crud.get_task(db, task_id)
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    return schemas.TaskOut.model_validate(t)

@app.patch("/tasks/{task_id}", response_model=schemas.TaskOut)
def update(task_id: int, data: schemas.TaskUpdate, db: Session = Depends(get_db)) -> schemas.TaskOut:
    t = crud.get_task(db, task_id)
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    t = crud.update_task(db, t, data)
    return schemas.TaskOut.model_validate(t)

@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(task_id: int, db: Session = Depends(get_db)) -> None:
    t = crud.get_task(db, task_id)
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    crud.delete_task(db, t)
    return None
