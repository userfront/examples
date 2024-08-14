# Userfront example: Nextjs + FastAPI

An example implementation of Nextjs + FastAPI.

_Note: The included Dockerfiles are not ready for production. See the appropriate framework's documentation for production best practices._

# Running locally

## Prerequisites

1. Have a [Userfront](https://userfront.com/) account
1. Have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
1. Copy `.env.example` into a file called `.env.local`
   > cp .env.example .env.local
1. Have [mkcert](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation) installed
1. install a localhost CA and generate a localhost cert
   > npm run gen-cert
1. Have the following set as environment variables in `.env.local` (make sure you are in "test mode"):
    1. USERFRONT_JWT_PUBLIC_KEY (Can be found at https://userfront.com/dashboard/jwt?tab=public )
    1. NEXT_PUBLIC_USERFRONT_WORKSPACE_ID (Can be found at https://userfront.com/dashboard/workspaces )

## Running

1. bring up the frontend (Nextjs) and backend (FastAPI) containers
    > docker compose up
2. visit [https//localhost:3000](https://localhost:3000)
