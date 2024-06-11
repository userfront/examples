# Userfront example: Nextjs + Rails

An example implemntation of Nextjs + FastAPI.

_Note: The included Dockerfiles are not ready for production. See the appropriate framework's documentation for production best practices._

# Running locally

## Prerequisites

1. Have a [Userfront](https://userfront.com/) account
1. Have docker installed
1. Copy .env.example into a file called .env.local
1. Have the following set as environment variables in .env.local:
    1. USERFRONT_JWT_PUBLIC_KEY (Can be found at https://userfront.com/dashboard/jwt?tab=generate )
    1. NEXT_PUBLIC_USERFRONT_WORKSPACE_ID (Can be found at https://userfront.com/dashboard )

## Running

1. bring up the frontend (Nextjs) and backend (FastAPI) containers
    > docker compose up
2. visit [http://localhost:3000](http://localhost:3000)

### Issue accessing localhost with Chrome
Chrome does not allow access to http urls and will automatically redirect to https. Firefox and Safari will allow access over http. To override Chrome's default policy for local host follow these instructions:
1. Open Chrome and type chrome://net-internals/#hsts in the address bar.
2. In the "Query HSTS/PKP domain" section, enter localhost in the "Domain" field and click "Query".
3. You should see an entry for localhost with many varaibles set such as `static_upgrade_mode: FORCE_HTTPS`
4. Enter `localhost` under the Delete domain security policies and click Delete.
5. Refresh your page, making sure you are usring [http](http://localhost:3000)
Close and reopen Chrome, and try accessing your local development environment over HTTP.