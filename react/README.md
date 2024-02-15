# React example

In this example, we will add authentication and access control to a React application with [Userfront](https://userfront.com).

See this [walkthrough](https://userfront.com/docs/examples/react) to see how we constructed this app from scratch.

## Setup
1. In `src/App.js` replace `demo1234` with your workspace ID found on your [dashboard](https://userfront.com/dashboard) under the name of your workspace. To use this in live mode add your live domains as well.
```js
Userfront.init("abcd1234", { domain: "your-domain.com" });
```
2. Run `npm start`

## React authentication

At a high level, React’s responsibility in authentication is to:

1. Send an initial request to Userfront to get the access token. This is what the signup and login forms do.

2. Send the access token to your server with each subsequent request.

## App layout and functionality

We have a very simple app with routing:

| Route        | Description                              |
| :----------- | :--------------------------------------- |
| `/`          | Home page                                |
| `/login`     | Login page                               |
| `/reset`     | Password reset page                      |
| `/dashboard` | User dashboard, for logged in users only |

This is a fully functional app. Users can log in, sign up, reset their password, and view their dashboard. When a user is logged in, they can view the dashboard. If the user is not logged in, they will be redirected to the login page.

## React authentication with an API -> Next steps

We saw above that the frontend has an access token available as `Userfront.tokens.accessToken` when the user is logged in. This is a JWT access token that you can also use on your backend to protect your API endpoints.

There are many libraries to read and verify JWTs across various languages. Here are a few popular libraries for handling JWTs:

|                                                       |                                           |                                              |                                           |
| ----------------------------------------------------- | ----------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| [Node.js](https://github.com/auth0/node-jsonwebtoken) | [.NET](https://github.com/jwt-dotnet/jwt) | [Python](https://github.com/jpadilla/pyjwt/) | [Java](https://github.com/auth0/java-jwt) |

Your React application can send the JWT access token as a `Bearer` token inside the `Authorization` header. For example:

```js
// Example of calling an endpoint with a JWT

async function getInfo() {
  const res = await window.fetch("/your-endpoint", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Userfront.tokens.accessToken}`,
    },
  });

  console.log(res);
}

getInfo();
```

To handle a request like this, your backend should read the JWT access token from the `Authorization` header and verify that it is valid using the JWT public key found in your Userfront dashboard.

Here is an example of Node.js middleware to read and verify the JWT access token:

```js
// Node.js example (Express.js)

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Read the JWT access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // Return 401 if no token

  // Verify the token using the Userfront public key
  jwt.verify(token, process.env.USERFRONT_PUBLIC_KEY, (err, auth) => {
    if (err) return res.sendStatus(403); // Return 403 if there is an error verifying
    req.auth = auth;
    next();
  });
}
```

Using this approach, any invalid or missing tokens are rejected by your server. You can also reference the contents of the token later in the route handlers using the `req.auth` object:

```js
console.log(req.auth);

// =>
{
  mode: 'test',
  tenantId: 'demo1234',
  userId: 1,
  userUuid: 'ab53dbdc-bb1a-4d4d-9edf-683a6ca3f609',
  isConfirmed: false,
  authorization: {
    demo1234: {
      roles: ["admin"],
    },
  },
  sessionId: '35d0bf4a-912c-4429-9886-cd65a4844a4f',
  iat: 1614114057,
  exp: 1616706057
}
```

With this information, you can perform further checks as desired, or use the `userId` or `userUuid` to look up user information to return.

For example, if you wanted to limit a route to admin users, you could check against the `authorization` object from the verified access token:

```js
// Node.js example (Express.js)

app.get("/users", (req, res) => {
  const authorization = req.auth.authorization["demo1234"] || {};

  if (authorization.roles.includes("admin")) {
    // Allow access
  } else {
    // Deny access
  }
});
```