from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_and_toggle_task():
    # create
    r = client.post("/tasks", json={"title": "write tests"})
    assert r.status_code == 201
    tid = r.json()["id"]

    # toggle complete
    r2 = client.patch(f"/tasks/{tid}", json={"completed": True})
    assert r2.status_code == 200
    assert r2.json()["completed"] is True

def test_get_404():
    r = client.get("/tasks/99999999")
    assert r.status_code == 404
