# Userfront example: Passwordless + Vanilla HTML/JS/CSS


An example implementation of bare bones vanilla HTML/JS/CSS passwordless (aka email link) auth app. FastAPI is also used to server as a backend and server the frontend over HTTPS.

_Note1: This example does not use toolkit. Instead corejs is used directly. Using corejs directly allows for more flexibility but is also more complicated._

Note2: This is a proof of concept application - production applications should not need to worry about "test mode".

_Note3: The included Dockerfiles are not ready for production. See the appropriate framework's documentation for production best practices._

# Running locally

## Prerequisites

1. Have a [Userfront](https://userfront.com/) account
1. Have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
1. Copy `.env.example` into a file called `.env.local`
   > cp .env.example .env.local
1. Have [mkcert](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation) installed
1. install a localhost CA and generate a localhost cert
   > (cd certificates; mkcert -install && mkcert localhost)
1. Have the following set as environment variables in `.env.local` (make sure you are in "test mode"):
    1. USERFRONT_JWT_PUBLIC_KEY (Can be found at https://userfront.com/dashboard/jwt?tab=public )
    1. Update `demo1234` to be your WorkspaceId in `init.js`. (Can be found at https://userfront.com/dashboard/workspaces )

## Running

1. bring up the server (FastAPI) container
    > docker compose up
2. visit [https//localhost:8080](https://localhost:8080)
