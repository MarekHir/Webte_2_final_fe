# Webte 2 final project - frontend with Vue 3

Frontend part of final project written in vue 3 with vite.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## Build for production

### Configure some values before build

In src/config/general.js you can configure api url if its not on root path as api or if its on different origin. Also if your app is not on root configure vite.config.js before build 
```js
    base: '/final/'
```

### Build

```sh
npm run build
```