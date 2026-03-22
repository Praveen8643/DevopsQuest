# DevOps Quest Starter

A starter monorepo for a web-first DevOps learning game fun.

## Stack
- Frontend: Next.js 14 + TypeScript + Tailwind CSS
- Backend: FastAPI + SQLAlchemy + PostgreSQL
- Auth: JWT starter
- CI/CD: GitHub Actions
- Containers: Docker + docker-compose

## Project structure
- `frontend/` - learner/admin web app
- `backend/` - API server
- `.github/workflows/` - CI pipelines

## MVP included
- Auth endpoints scaffold
- Modules, lessons, quizzes, challenges API scaffold
- Dashboard, roadmap, module, lesson, quiz, challenge pages scaffold
- Shared Docker setup
- Environment examples

## How to use
1. Create a new GitHub repo.
2. Upload these files or unzip and push them.
3. Fill in `.env` values.
4. Start locally with Docker Compose.
5. Deploy frontend to Vercel and backend to Render/Railway later.

## Local run
```bash
docker compose up --build
```

Frontend: http://localhost:3000  
Backend: http://localhost:8000  
API docs: http://localhost:8000/docs

## Notes
This is a clean starter so you can build feature-by-feature without getting overwhelmed.
