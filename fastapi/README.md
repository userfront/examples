# Userfront example: Nextjs + FastAPI

An example implemntation of Nextjs + FastAPI.

_Note: The included Dockerfiles are not ready for production. See the appropriate framework's documentation for production best practices._

# Running locally

## Prerequisites

1. Have a [Userfront](https://userfront.com/) account
1. Have docker installed
1. Have the following set as environment variables:
    1. USERFRONT_PUBLIC_KEY (Can be found at https://userfront.com/dashboard/jwt )
        > export USERFRONT_PUBLIC_KEY="-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----"
    1. USERFRONT_ACCOUNT_ID (Can be found at https://userfront.com/dashboard/accounts )
        > export USERFRONT_ACCOUNT_ID=...

## Running

1. bring up the frontend (Nextjs) and backend (FastAPI) containers
    > docker compose up
2. visit [http://localhost:3000](http://localhost:3000)
