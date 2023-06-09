import { getCookie, setCookie, hasCookie, deleteCookie } from "cookies-next";
import * as jose from "jose";
import Userfront from "@userfront/react";


// Need to ensure we are in NodeJS runtime (not Edge runtime) to access the ctx.res response object
//   so we can modify cookies.
// TODO: this all might be better expressed as a Next middleware (https://nextjs.org/docs/advanced-features/middleware)
//   which has some nice built-in cookie handling. (That's what I intend to provide in a userfront-nextjs package!)
export const config = {
  runtime: "nodejs"
}

// Set up the JSON Web Key Set (JWKS) - fetch our public key from Userfront as needed.
// TODO: this would usually be cached and revalidated periodically or as needed; need to research how to do that with Next serverless or edge functions
// TODO: we need to know whether we're in test or live mode, and don't have enough information to determine that here
//    (we would need to send a /mode request with origin = ctx.resolvedUrl - see https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter)
// TODO: use this in the backend portion as well
const JWKS = jose.createRemoteJWKSet(new URL(`https://api.userfront.com/v0/tenants/${process.env.NEXT_PUBLIC_USERFRONT_ACCOUNT_ID}/jwks?test=false`));
const refreshUrl = new URL(`https://api.userfront.com/v0/tenants/${process.env.NEXT_PUBLIC_USERFRONT_ACCOUNT_ID}/refresh`);

// JWT libraries like jose have a pattern of throwing when a JWT does not verify.
// Convert such a call into one that returns null if the function throws, so we can
// avoid using try/catch as control flow in our handler.
const maybe = fn => async (...args) => {
  try {
    return await fn(...args);
  } catch (e) {
    return null;
  }
}

/* If we wanted the error message we could do something like
  const either = fn => async (...args) => {
    try {
      const value = await fn(...args);
      return {
        value
      };
    } catch (error) {
      return {
        error
      };
    }
  }

  const result = await either(jose.jwtVerify)(accessToken, JWKS);
  if (result.value) { ... }
  else { console.log(result.error) }
*/

/**
 * Read access token from cookies if present, refresh access token if necessary and possible,
 * update cookies to change or remove tokens, and return identity props
 *
 * @param {object} ctx NextJS API context
 * @returns {object}
 * @property {Boolean} isLoggedIn
 * @property {string} userId
 * @property {object} authorization - Userfront authorization record
 */
export async function refreshIdentityAndCookies(ctx) {
  try {

    const mode = Userfront.mode.value || "test";
    const isTestMode = mode === "test";

    // Set up the JSON Web Key Set (JWKS) - fetch our public key from Userfront as needed.
    // TODO: this would usually be cached and revalidated periodically or as needed; need to research how to do that with Next serverless or edge functions
    // TODO: we need to know whether we're in test or live mode, and don't have enough information to determine that here
    //    (we would need to send a /mode request with origin = ctx.resolvedUrl - see https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter)
    // TODO: use this in the backend portion as well
    const JWKS = jose.createRemoteJWKSet(new URL(`https://api.userfront.com/v0/tenants/${publicRuntimeConfig.accountId}/jwks?test=${isTestMode}`));

    const isLoggedIn = hasCookie(Userfront.tokens.accessTokenName, ctx);
    if (!isLoggedIn) {
      console.log("** Not logged in. **")
      return {
        props: {
          isLoggedIn: false,
          userId: "",
          authorization: "",
        },
      };
    }

    const accessToken = getCookie(Userfront.tokens.accessTokenName, ctx);
    const verifiedAccessToken = await maybe(jose.jwtVerify)(accessToken, JWKS);
    if (verifiedAccessToken) {
      console.log("** Logged in. **")
      return {
        props: {
          isLoggedIn: true,
          userId: verifiedAccessToken.payload.userId,
          authorization: verifiedAccessToken.payload.authorization,
        },
      };
    }

    // Try to refresh the access token if there is a verified refresh token
    const refreshToken = getCookie(Userfront.tokens.refreshTokenName, ctx);

    // Note: in general we don't need to verify refresh tokens before using them with /refresh,
    // but since we already have the JWKS we may as well do so, to save ourselves a request if it's
    // expired or not properly signed.
    const verifiedRefreshToken = await maybe(jose.jwtVerify)(refreshToken, JWKS);

    // TODO: I haven't actually tested this yet
    if (verifiedRefreshToken) {
      console.log("** Refreshing... **")
      const refreshResponse = await fetch(refreshUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${refreshToken}`,
          "Origin": new URL(ctx.resolvedUrl)?.origin
        }
      });
      if (refreshResponse.status === 200) {
        console.log("** Refreshed... **")
        const data = await refreshResponse.json();
        setCookie(Userfront.tokens.accessTokenName, data.tokens.access.value, ctx);
        setCookie(Userfront.tokens.idTokenName, data.tokens.id.value, ctx);
        const decodedNewAccessToken = jose.decodeJwt(data.tokens.access.value);
        console.log("** Refreshed and logged in with new token. **")
        return {
          props: {
            isLoggedIn: true,
            userId: decodedNewAccessToken.userId,
            authorization: decodedNewAccessToken.authorization
          }
        }
      }
    }

    console.log("** No valid token and refresh failed. Clearing tokens. **")

    // No valid access token and refresh was unsuccessful
    deleteCookie(Userfront.tokens.accessTokenName, ctx);
    deleteCookie(Userfront.tokens.idTokenName, ctx);
    deleteCookie(Userfront.tokens.refreshTokenName, ctx);
    return {
      props: {
        isLoggedIn: false,
        userId: "",
        authorization: "",
      },
    };
  } catch (error) {
    // Unexpected error; log it and continue
    console.log("** Unexpected error: **")
    console.error(error);
  }
  console.log("** Error when verifying tokens. Clearing tokens. **")
  // Fallback: clear tokens
  deleteCookie(Userfront.tokens.accessTokenName, ctx);
  deleteCookie(Userfront.tokens.idTokenName, ctx);
  deleteCookie(Userfront.tokens.refreshTokenName, ctx);
  return {
    props: {
      isLoggedIn: false,
      userId: "",
      authorization: "",
    },
  };
}
