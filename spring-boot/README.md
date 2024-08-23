# Userfront example: Nextjs + Spring Boot

An example implementation of Nextjs + Spring Boot.

_Note: The included Dockerfiles are not ready for production. See the appropriate framework's documentation for production best practices._

# Running locally

## Prerequisites

1. Have a [Userfront](https://userfront.com/dashboard) account
1. Have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
1. Have [mkcert](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation) installed

## Setup

1. install a localhost CA and generate a localhost cert
   > npm run gen-cert
1. Copy `.env.example` into a file called `.env.local`
   > cp .env.example .env.local
1. Set the following environment variables in `.env.local` (make sure you are in "test mode"):
    1. USERFRONT_JWT_PUBLIC_KEY (Can be found at https://userfront.com/dashboard/jwt?tab=public )
    1. NEXT_PUBLIC_USERFRONT_WORKSPACE_ID (Can be found at https://userfront.com/dashboard )

## Running

1. bring up the frontend (Nextjs) and backend (Spring Boot) containers
    > docker compose up
2. visit [https://localhost:3000](https://localhost:3000)
