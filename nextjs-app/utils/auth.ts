import jwt from "jsonwebtoken";
import Userfront from "@userfront/react";
import { cookies as headerCookies } from "next/headers";
import { redirect } from "next/navigation";

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----`;

/**
 * Validate a JSON Web Token (JWT) and return the payload.
 * If no token is provided, read from the Next.js header's cookies.
 */
export async function verifyToken(token?: string, { verify = true } = {}) {
  let accessToken = token;

  if (!token) {
    const cookies = headerCookies();
    const tokenCookie = cookies.get(Userfront.tokens.accessTokenName);
    accessToken = tokenCookie?.value;
  }

  let isLoggedIn = !!accessToken;

  if (accessToken && verify) {
    const verifiedToken = jwt.verify(accessToken, publicKey);

    if (verifiedToken instanceof Object) {
      return {
        isLoggedIn: true,
        userId: String(verifiedToken?.userId),
        authorization: String(verifiedToken?.authorization),
      };
    }
  }

  return {
    isLoggedIn,
    userId: "",
    authorization: "",
  };
}

/**
 * Redirect to a given path if the user is logged in.
 * @returns void
 */
export async function requireGuest(pathname?: string) {
  const { isLoggedIn } = await verifyToken();

  if (isLoggedIn) {
    redirect(pathname || "/dashboard");
  }

  return;
}

/**
 * Redirect to a given path if the user is not logged in.
 * @returns void
 */
export async function requireAuth(pathname?: string) {
  const { isLoggedIn } = await verifyToken();

  if (!isLoggedIn) {
    redirect(pathname || "/login");
  }

  return;
}
