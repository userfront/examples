# React Native example

This example shows how to set up a custom signup form with React Native and Userfront.

## Setup

If you haven't already, install Expo globally:

```sh
npm install -g expo-cli
```

Then install packages and run the application:

```sh
npm install
npm start
```

## Your account

Add your account details in `App.js`

```js
Userfront.init("demo1234", { domain: "example.com" });
```

After the above steps, your signup form should register users for your account.