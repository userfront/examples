# React Native example

This example shows how to set up a custom signup form with React Native and Userfront.

## Setup

Install packages and run the application:

```sh
npm install
npm start
```

## Your account

Configure Userfront in `App.js` with your workspace ID. Add your live domain to use live mode, or no domain to use test mode. Your workspace ID can be found under your workspace name in your [dashboard](https://userfront.com/dashboard).

#### Live mode
```js
Userfront.init("abcd1234", { domain: "your-domain.com" });
```
#### Test mode
```js
Userfront.init("abcd1234");
```

After the above steps, your signup form should register users for your account.