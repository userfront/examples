# Userfront example: Nextjs + Rails

An example implemntation of Nextjs + FastAPI.

_Note: The included Dockerfiles are not ready for production. See the appropriate framework's documentation for production best practices._

# Running locally

## Prerequisites

1. Have a [Userfront](https://userfront.com/) account
1. Have docker installed
1. Copy `.env.example` into a file called `.env.local`
1. Have `mkcert` (https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation)
1. install a localhost CA and generate a localhost cert
   > npm run gen-cert
1. Have the following set as environment variables in `.env.local`:
    1. USERFRONT_JWT_PUBLIC_KEY (Can be found at https://userfront.com/dashboard/jwt?tab=generate )
    1. NEXT_PUBLIC_USERFRONT_WORKSPACE_ID (Can be found at https://userfront.com/dashboard )

## Running

1. bring up the frontend (Nextjs), backend (Rails), and db (Postgres) containers
    > docker compose up
2. visit [https://localhost:3000](https://localhost:3000)
