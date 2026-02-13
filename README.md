# Multi-tenant Store with Customizer

This project is a monorepo powered by [Turborepo](https://turbo.build/repo), featuring a Medusa v2 backend and a Next.js storefront.

## Project Structure

- `apps/store`: Medusa v2 Backend (pnpm)
- `apps/store-storefront`: Next.js Storefront (yarn)
- `packages/*`: Shared configurations and utilities

## Prerequisites

- **Node.js**: v20 or higher
- **pnpm**: v9 or higher (for root and backend)
- **Yarn**: v4 or higher (for storefront)
- **Docker**: For running Postgres and Redis

## Getting Started

### 1. Root Installation

From the root directory, install the workspaces dependencies:

```bash
pnpm install
```

### 2. Backend Setup (`apps/store`)

The backend requires a PostgreSQL database and a Redis instance.

#### A. Run Docker Containers

If you don't have them running, you can start them using Docker. 

> **Note**: This project is configured to use port **5433** for Postgres to avoid common local port conflicts on port 5432.

```bash
# Start Postgres on port 5433
docker run -d --name postgres-db -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres-db -p 5433:5432 postgres:latest

# Start Redis on port 6379
docker run -d --name redis-server -p 6379:6379 redis:latest
```

#### B. Configure Environment Variables

Navigate to `apps/store` and ensure your `.env` file is set up correctly:

```env
REDIS_URL=redis://127.0.0.1:6379
DATABASE_URL=postgres://postgres:postgres123@127.0.0.1:5433/postgres-db
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
```

#### C. Run Migrations & Seed Data

```bash
cd apps/store
pnpm exec medusa db:migrate
pnpm seed
```

#### D. Start the Backend

```bash
pnpm dev
```
The backend will be available at `http://localhost:9000`.

---

### 3. Storefront Setup (`apps/store-storefront`)

#### A. Installation

The storefront uses Yarn Berry.

```bash
cd apps/store-storefront
yarn install
```

#### B. Start the Storefront

```bash
yarn dev
```
The storefront will be available at `http://localhost:8000`.

## Development Commands

- `pnpm dev`: Runs both backend and storefront in development mode (via Turbo).
- `pnpm build`: Builds all applications.
- `pnpm lint`: Lints all applications.

## Troubleshooting

### PostgreSQL Connection Timeouts
If you encounter `KnexTimeoutError` during seeding or startup:
- Ensure the Docker container is running (`docker ps`).
- Verify the port in `DATABASE_URL` matches the mapped port (e.g., `5433`).
- Use `127.0.0.1` instead of `localhost` in `.env` to avoid IPv6 resolution issues on Windows.

### Redis Warning
If you see "redisUrl not found", ensure `REDIS_URL` is defined in your `.env` and that `medusa-config.ts` is passing it to `projectConfig.redisUrl`.

### Storefront Yarn Issues
If `yarn dev` fails with "Cannot find module ... .yarn/releases/yarn-...", try running `corepack enable` and `yarn set version stable` to reset the yarn binary.
