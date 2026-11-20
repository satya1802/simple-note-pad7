# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `76d274a` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
simple note pad is a generated two-app repository from the Quorq AI SDLC platform: a Vite + React 19 single-page frontend that renders an approved, reviewed set of screens against seeded sample data, and a FastAPI 0.115 backend that is currently a bare scaffold exposing only a health check (no architecture had been approved for it yet). The backend uses SQLAlchemy 2.0 with a SQLite database by default (swappable via DATABASE_URL to Postgres/other), and the frontend talks to it through a small typed fetch wrapper that is not yet wired into any screen.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for the Vite/React/TypeScript frontend, React 19 + Vite 6)
- npm
- Python 3.12
- pip
- Docker and Docker Compose (for the optional PostgreSQL 16 container defined in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd frontend && npm install
3. cd backend && pip install -r requirements.txt
4. (optional) copy .env.example to .env and adjust values such as DATABASE_URL, ALLOWED_ORIGINS, VITE_API_BASE_URL as needed
5. (optional) from the repo root, run docker-compose up -d to start a local PostgreSQL 16 instance if you want to point DATABASE_URL at Postgres instead of the default SQLite file
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev server | `cd frontend && npm run dev` | Starts the Vite dev server for the React SPA (default origin http://localhost:5173, allowed by the backend's CORS config). |
| backend dev server | `cd backend && uvicorn app.main:app --reload` | Starts the FastAPI app with auto-reload; creates SQLite tables on startup via the lifespan handler and serves GET /health. |
| frontend build | `cd frontend && npm run build` | Bundles the app with Vite (does not typecheck). |
| frontend preview | `cd frontend && npm run preview` | Serves the production build locally. |
| db (compose) | `docker-compose up -d` | Starts a PostgreSQL 16 container (db service) with a persistent volume, for use when DATABASE_URL is pointed at Postgres. |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend` | React 19 + Vite SPA with the approved, reviewed screens (currently running on seeded sample data); Tailwind CSS v4, React Router, ESLint/Prettier, Vitest and Playwright configs. |
| `frontend/src` | App source: entry point (main.tsx), global styles (index.css), and src/lib shared utilities (api.ts fetch client, ui.tsx/icons.tsx component vocabulary, navigate.ts). |
| `frontend/e2e` | Playwright end-to-end specs and support helpers, run against either a locally booted frontend+backend or a deployed URL via E2E_BASE_URL. |
| `backend` | FastAPI service scaffold: app package, SQLAlchemy models/schemas, routers directory (currently empty of routes besides /health), tests, Dockerfile. |
| `backend/app` | Application code: main.py (entrypoint, CORS, lifespan table creation, /health), database.py (engine/session), models.py (SQLAlchemy Base, no tables yet), schemas.py (Pydantic models incl. StubResponse), routers/ (empty scaffold for future endpoint routers). |
| `backend/tests` | Pytest suite: unit/ and integration/ folders, with integration/test_health.py covering the health endpoint; conftest.py provides fixtures. |
| `.devcontainer` | VS Code devcontainer configuration for a consistent local development environment. |
| `.quorq` | Platform metadata (handoff.json) used by the Quorq AI SDLC platform; not application code. |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one router per architecture component that owns endpoints, one route per spec'd endpoint; unimplemented routes return a typed StubResponse rather than erroring, keeping the service startable and its OpenAPI spec complete.
- Backend: SQLAlchemy models all inherit from the single Base in database.py; main.py imports app.models before calling Base.metadata.create_all so tables register.
- Backend: DB access is request-scoped via the get_db generator dependency, opening a session per request and always closing it.
- Backend: configuration (DATABASE_URL, ALLOWED_ORIGINS) is read from environment variables with safe local defaults (SQLite, localhost CORS origins), so no external service is required to run locally.
- Frontend: component and icon vocabulary centralized in src/lib/ui.tsx and src/lib/icons.tsx; all screens are built against these shared primitives.
- Frontend: all backend calls go through the single apiFetch helper in src/lib/api.ts, which attaches a bearer token (session token if present, else a shared API secret) and resolves against API_BASE_URL.
- Frontend: Vitest component tests live beside the components they test under src/; Playwright acceptance tests live separately under e2e/.
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend tests | `cd backend && pytest` | Runs the pytest suite (unit/ and integration/), including the health-check integration test. |
| backend lint | `cd backend && ruff check .` | Lints the backend Python code with Ruff. |
| backend format | `cd backend && ruff format .` | Formats the backend Python code with Ruff. |
| frontend unit tests | `cd frontend && npm test` | Runs Vitest component tests (jsdom environment) with coverage reporting. |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint over the frontend; this is the gate the platform runs during development. |
| frontend typecheck | `cd frontend && npm run typecheck` | Runs tsc --noEmit; not run by npm run build, but recommended before the project is actively maintained. |
| frontend e2e | `cd frontend && npm run test:e2e:install && npm run test:e2e` | Installs the Chromium browser then runs Playwright acceptance tests; without E2E_BASE_URL it boots the backend (from backend/.venv) and a built/served frontend locally. |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend calls to the backend fail with a CORS error in the browser console. | Ensure the backend's ALLOWED_ORIGINS env var includes the frontend's origin, or run the frontend on the default dev origin (http://localhost:5173 / 127.0.0.1:5173) which is allowed out of the box. |
| `pytest` run from backend/ fails with `ModuleNotFoundError: No module named 'app'`. | Run pytest from the backend/ directory as documented; pytest.ini sets pythonpath = . so app/ resolves correctly from there. |
| `npm run test:e2e` fails to start the backend webServer. | Playwright's local run expects a backend/.venv with packages installed (`.venv/bin/python -m uvicorn ...`); create that virtualenv and install backend/requirements.txt into it, or set E2E_BASE_URL to point at an already-running/deployed app instead. |
| Backend data disappears between restarts or you want persistent storage. | The default DATABASE_URL is a local sqlite:///./app.db file; set DATABASE_URL to a PostgreSQL connection string (e.g. pointing at the docker-compose db service) to use Postgres instead. |
<!-- sdlc:auto:end troubleshooting -->
