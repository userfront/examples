# userfront-vue-2-example

This template should help get you started developing with Vue 2 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install

```
Configure Userfront in `src/App.vue` with your workspace ID. Add your live domain to use live mode, or no domain to use test mode. Your workspace ID can be found under your workspace name in your [dashboard](https://userfront.com/dashboard).

#### Live mode
```js
Userfront.init("abcd1234", { domain: "your-domain.com" });
```
#### Test mode
```js
Userfront.init("abcd1234");
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
