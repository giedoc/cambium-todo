Cambium TODO
============

A tiny full-stack CRUD app: FastAPI + Postgres backend and React (Vite) + Lovable UI frontend.
Timeboxed to ~2 hours.

Project Structure
-----------------
/backend                  FastAPI, SQLAlchemy, Pydantic
/frontend                 React + Vite (Lovable-exported UI), Vite dev proxy
docker-compose.yml        Postgres container

------------------------------------------------------------
How to Run — Database & Backend
------------------------------------------------------------
1) Start Postgres (Docker):
   docker compose up -d db

2) Backend:
   cd backend
   cp .env.example .env        # adjust if needed
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

Health check:
   curl http://localhost:8000/health
   -> {"ok": true}

Backend .env.example (sample)
-----------------------------
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5433/cambium
API_HOST=0.0.0.0
API_PORT=8000
# Only needed if you call the API directly from a different origin (no proxy):
CORS_ORIGINS=http://localhost:8080,http://localhost:5173

Note: If your Postgres host port differs, update DATABASE_URL accordingly.

------------------------------------------------------------
How to Run — Frontend & API Base URL
------------------------------------------------------------
Recommended (no CORS headaches): use Vite dev proxy

   cd frontend
   cp .env.example .env       # VITE_API_URL=/api
   npm install
   npm run dev                # http://localhost:8080

Frontend .env.example
---------------------
VITE_API_URL=/api
# In dev, calls go to /api/... and Vite proxies them to http://localhost:8000/...

If you prefer a direct URL instead of the proxy:
- Set VITE_API_URL=http://localhost:8000
- Ensure backend CORS_ORIGINS includes the frontend origin (e.g., http://localhost:8080)

------------------------------------------------------------
Testing
------------------------------------------------------------
cd backend
source .venv/bin/activate
python -m pytest -q

Includes: health test + tasks API tests (happy path + 404).

------------------------------------------------------------
Assumptions, Trade-offs, TODOs
------------------------------------------------------------
Assumptions:
- Single-user to-do list.
- Minimal schema: title (string), completed (bool).

Trade-offs:
- No authentication (timeboxed).
- Minimal validation (basic Pydantic constraints).
- One table, simple API.

TODO (if more time):
- Proper DB migrations (Alembic) + seed data.
- created_at field and ordering by it.
- Stricter validation (trim, prevent empty titles).
- E2E tests (Playwright/Cypress) and CI.
- Optional auth/JWT.

------------------------------------------------------------
Time Spent
------------------------------------------------------------
<replace with your actual time, keep under 2h>

------------------------------------------------------------
Quick Outline — Process & Tools
------------------------------------------------------------
Plan:
1) Bring up Postgres with Docker
2) Scaffold FastAPI CRUD (/tasks) + SQLAlchemy model
3) Use Lovable UI (React/Vite) and wire to the API
4) Use Vite dev proxy (/api → :8000) to avoid CORS frictions
5) Add a couple of tests and a concise README

Tools:
- Backend: FastAPI, SQLAlchemy, Pydantic, Uvicorn
- DB: Postgres (Docker)
- Frontend: React + Vite, Lovable (UI export)
- Tests: pytest, fastapi.testclient

------------------------------------------------------------
Details of Process — Lovable & AI usage (nice-to-have)
------------------------------------------------------------
- Generated a React + Vite + Tailwind UI prototype in Lovable.
- Kept Lovable’s layout/styles (container/card/spacing) and replaced internal state with my own API-backed components (TodoForm, TodoList) that call /tasks.
- For local dev, used Vite dev proxy to sidestep CORS entirely.
- Used an AI assistant to accelerate:
  - FastAPI scaffolding and Python 3.9 typing fixes (Optional[...] instead of str | None)
  - Vite proxy setup and CORS reasoning
  - Quick unit/API test examples

------------------------------------------------------------
Type Hints & Lightweight Schema (nice-to-have)
------------------------------------------------------------
- Pydantic v2 models with field constraints and from_attributes=True:
  - TaskCreate, TaskUpdate, TaskOut
- Function type hints in crud.py and explicit List[...] / Optional[...] return types.
- FastAPI routes declare response models.

------------------------------------------------------------
Migrations with Alembic (optional, nice-to-have)
------------------------------------------------------------
# Install & init
cd backend
source .venv/bin/activate
pip install alembic
alembic init alembic

# Configure backend/alembic/env.py to read DATABASE_URL and expose metadata:
# (add near the top)
import os, sys
from dotenv import load_dotenv
load_dotenv()
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from alembic import context
from app.db import Base
from app import models  # ensure models are imported so tables are known

config = context.config
db_url = os.getenv("DATABASE_URL")
if db_url:
    config.set_main_option("sqlalchemy.url", db_url)
target_metadata = Base.metadata

# Generate & apply migration
alembic revision --autogenerate -m "create tasks"
alembic upgrade head

# Remove any ad-hoc Base.metadata.create_all(...) from the app once migrations are used.

------------------------------------------------------------
API Surface (summary)
------------------------------------------------------------
GET    /health                -> {"ok": true}
GET    /tasks                 -> list tasks
POST   /tasks                 -> create task
GET    /tasks/{id}            -> fetch one
PATCH  /tasks/{id}            -> update title/completed
DELETE /tasks/{id}            -> 204 no content
