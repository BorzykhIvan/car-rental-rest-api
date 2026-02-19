# Car Rental REST API

Node.js/Express REST API for a car rental system, built with an N-tier structure (routes -> controllers -> services -> repositories -> PostgreSQL).

## Tech Stack
- Node.js
- Express
- PostgreSQL (`pg`)
- Swagger (`swagger-jsdoc`, `swagger-ui-express`)
- Jest + Supertest

## Project Structure
- `app.js` - app setup, route mounting, server start
- `db.js` - PostgreSQL connection/pool
- `routes/` - API routes + Swagger annotations
- `controllers/` - request/response handling
- `services/` - business logic
- `repositories/` - SQL queries
- `db/schema.sql` - database schema
- `tests/` - API/service/repository tests

## API Base Paths
- Base API: `/api/v1`
- Swagger UI: `/api-docs`

Main resources:
- `/cars`
- `/users`
- `/rentals`
- `/brands`
- `/car-features`

## Requirements
- Node.js 18+ (recommended)
- PostgreSQL 14+ (or Railway Postgres / Docker Postgres)

## Environment Variables
Create `.env` based on `.env.example`.

Supported variables:
- `PORT` (default: `3000`)
- `NODE_ENV` (`development` or `production`)
- `API_BASE_URL` (used by Swagger server URL)
- `DATABASE_URL` (recommended in production/cloud)
- `DB_SSL` (`true`/`false`, optional)
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (local fallback when `DATABASE_URL` is missing)

## Run Locally
1. Install dependencies:
```bash
npm install
```

2. Start PostgreSQL (local or Docker) and create schema:
```bash
psql -h localhost -U postgres -d postgres -f db/schema.sql
```

3. Start API:
```bash
npm start
```

4. Open:
- `http://localhost:3000/`
- `http://localhost:3000/api-docs`

## Docker Postgres (Optional)
Run local PostgreSQL with Docker Compose:
```bash
docker compose up -d
```

`docker-compose.yml` mounts `db/schema.sql` and initializes the database automatically on first startup.

## Tests
```bash
npm test
```

## Railway Deployment (Backend + Postgres)
1. Create a Railway project.
2. Add two services:
- your API service (from this GitHub repo)
- PostgreSQL service
3. In API service variables, set:
- `NODE_ENV=production`
- `API_BASE_URL=https://<your-service>.up.railway.app`
- `DATABASE_URL` as a **Reference** to Postgres `DATABASE_URL`
- `DB_SSL=false` when using `postgres.railway.internal` (private network)
4. Deploy/redeploy API service.

## Import Schema to Railway Postgres
If you import from local machine via `psql`, apply schema to the same DB used by `DATABASE_URL` (usually `railway`).

Example using Dockerized `psql`:
```powershell
$env:PGPASSWORD="<POSTGRES_PASSWORD>"
Get-Content .\db\schema.sql | Where-Object { $_ -notmatch '^(CREATE DATABASE|\\c\s+)' } | docker run --rm -i -e PGPASSWORD="$env:PGPASSWORD" postgres:16 psql -h <HOST> -U postgres -p <PORT> -d railway -v ON_ERROR_STOP=1
```

## Troubleshooting
- `password authentication failed for user "postgres"`:
  `DATABASE_URL` credentials are incorrect or outdated; re-add it as a Railway Reference.
- `500` on endpoints after deployment:
  verify schema/tables exist in the same DB name used in `DATABASE_URL`.
- Swagger calling wrong URLs:
  set correct `API_BASE_URL` and redeploy.

## License
ISC
