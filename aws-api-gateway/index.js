const jwt = require("jsonwebtoken");

const jwtPublicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----`;

/**
 * This handler reads the event.authorizationToken provided by AWS,
 * removes "Bearer " from the front if present, and uses the JWT
 * public key to verify the token.
 *
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 * @returns
 */
exports.handler = (event, context, callback) => {
  // AWS maps the Authorization header to event.authorizationToken
  if (!event.authorizationToken) {
    return callback("Unauthorized");
  }

  // Remove "Bearer" from the AWS "authorizer" token if it is present
  const accessToken = event.authorizationToken.replace(/^Bearer /, "");

  // Verify the JWT access token
  jwt.verify(
    accessToken,
    jwtPublicKey,
    { algorithms: ["RS256"] },
    (error, decoded) => {
      if (error) {
        callback("Unauthorized");
      } else {
        callback(null, generatePolicy(event.methodArn));
      }
    }
  );
};

// Helper function to generate an AWS IAM policy
function generatePolicy(resource) {
  return {
    principalId: "user",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: resource,
        },
      ],
    },
  };
}
