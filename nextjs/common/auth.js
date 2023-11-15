import cookies from "next-cookies";
import jwt from "jsonwebtoken";
import Userfront from "@userfront/toolkit/react";

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----`;

export async function getPropsFromAccessToken(ctx, { verify } = {}) {
  try {
    const { [Userfront.tokens.accessTokenName]: accessToken } = cookies(ctx);
    const isLoggedIn = !!accessToken;
    if (verify) {
      const verifiedToken = jwt.verify(accessToken, publicKey);

      return {
        props: {
          isLoggedIn: true,
          userId: verifiedToken.userId,
          authorization: verifiedToken.authorization,
        },
      };
    }
    return {
      props: { isLoggedIn },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
