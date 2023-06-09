# Userfront AWS API Gateway example

This example shows how to use Userfront for access control with an AWS API Gateway.

If you don't have one already, [create an API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-create-api.html).

## Steps

1. Create a Lambda function to use as an Authorizer
2. Add the Authorizer to your API Gateway
3. Test that your Authorizer is working

---

### 1. Create a Lambda function to use as an Authorizer

In your [AWS Lambda dashboard](https://console.aws.amazon.com/lambda/home#/functions), create a Lambda function called `userfront-authorizer` (see [steps](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html#gettingstarted-zip-function)).

Next, use your terminal to clone this repo to a local directory on your computer:

```
git clone https://github.com/userfront/example-aws-api-gateway.git
cd example-aws-api-gateway
npm install
```

Replace the `jwtPublicKey` in `/index.js` with your own JWT public key:

```
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----
```

#### Upload your code to your AWS Lambda function

Generate a zip file to upload to AWS:

```
zip -r function.zip .
```

Upload the zip file through the AWS Lambda dashboard, or use the following terminal command:

```
aws lambda update-function-code --function-name userfront-authorizer --zip-file fileb://function.zip
```

You should be able to see that your code was uploaded when you visit the Lambda function in the AWS dashboard.

If you have problems uploading your code, see the AWS instructions [here](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html).

### 2. Add the Authorizer to your API Gateway

In your [AWS API Gateway dashboard](https://console.aws.amazon.com/apigateway/main/apis), select your API Gateway.

In the side menu select `Authorizers` > `Create new authorizer`.

Create a Lambda authorizer:

- Name: `Userfront`
- Type: `Lambda`
- Lambda Function: `userfront-authorizer`
- Lambda Event Payload: `Token`
- Token Source: `Authorization`
- Authorization Caching: `unchecked`

![AWS API Gateway Authorizer](https://res.cloudinary.com/component/image/upload/v1638550448/guide/examples/aws-api-gateway-authorizer.png)

Select `Create` to create the authorizer.

Now visit `Resources` in the sidebar and select a resource and method, then click `Method Request`.

In the dialog shown, select `Userfront` as the Authorization method. (You may need to reload the page for it to show)

![AWS API Gateway Resource](https://res.cloudinary.com/component/image/upload/v1638503733/guide/examples/aws-api-gateway-resource.png)

Now select `Actions` > `Deploy API` from the dropdown.

### 3. Test that your Authorizer is working

Now you should be able to test your endpoint with a request that has a valid JWT access token.

#### Obtain a JWT access token

You can obtain a JWT access token one of the following ways:

- Logging into your own application and copying the cookie named `access.<tenantId>`
- Make a [login API request](https://userfront.com/docs/api-client.html#log-in-with-password) with a tool like Postman. For live mode, you must also include a live `origin` header as described [here](https://userfront.com/guide/test-mode.html#activate-live-mode).

#### Call your endpoint

Try calling your endpoint with a JWT access token in the `Authorization` header:

```
GET https://<your-aws-api-gateway-url>/userfront-example

{
  headers: {
    Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6I..."
  }
}
```

Your endpoint should now allow requests with a valid JWT access token, and reject requests without a valid JWT access token.

#### Troubleshooting

If your setup is not working, you may want to check the following

##### Userfront

- Verify that your JWT access token and JWT public key are both in the same mode (live or test)

##### AWS

- Verify that the latest AWS API Gateway settings are deployed
- Verify that the latest code is deployed to your Lambda function
- Verify that your Authorizer settings have `Authorization Caching` unchecked
