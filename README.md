# Cambium TODO

Tiny full-stack CRUD app: **FastAPI + Postgres** backend, **React (Vite) + Lovable UI** frontend.  
**Time spent:** ~2 hours.

## Quick Start

### 1) Database (Docker)
docker compose up -d db

### 2) Backend
cd backend
cp .env.example .env
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# Health check:
# curl http://localhost:8000/health  ->  {"ok": true}

### 3) Frontend (uses Vite proxy to avoid CORS)
cd frontend
cp .env.example .env   # ensure: VITE_API_URL=/api
npm install
npm run dev            # opens http://localhost:8080

## Tests
cd backend
source .venv/bin/activate
python -m pytest -q

## Assumptions / Trade-offs / TODO
- Assumptions: single user; minimal schema (`title`, `completed`).
- Trade-offs: no auth; minimal validation; one table; timeboxed.
- TODO (if more time): Alembic migrations, `created_at` + ordering, stricter validation (trim/empty), E2E tests, simple auth.

## Approach & Tools
- Approach: DB → FastAPI CRUD → Lovable UI (React/Vite) → Vite proxy → tests.
- Tools: FastAPI, SQLAlchemy, Pydantic, Postgres (Docker), React + Vite (Lovable UI), pytest.
