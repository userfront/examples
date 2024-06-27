# Userfront Node Example

This is a [Node](https://nodejs.org/en) project using [`@userfront/node`](https://www.npmjs.com/package/@userfront/node) for auth.

## Requirements

- Node.js v18 or later

## Getting Started

Install packages:

```shell
npm install
```

### Production

Add your `USERFRONT_TENANT_ID` and `USERFRONT_API_KEY` as environment secrets.

Run the script:

```shell
npm run start
```

### Development

Add your tenant id and api key to your `.env`:

```shell
USERFRONT_TENANT_ID="..."
USERFRONT_API_KEY="..." # Admin key
```

Run the script with live reloading (watch mode):

```shell
npm run dev
```

## Troubleshooting

Need some help? We're always here and happy to help. Please do not hesitate to [contact support](https://userfront.com/contact).
