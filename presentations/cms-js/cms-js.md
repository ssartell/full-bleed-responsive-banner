---

marp: true
theme: uncover
style: |
  section {
    text-align: left;
    font-size: 35px;
  }
  ul {
      margin-left: 0;
  }
  li {
      line-height: 1.8em;
  }
  h5 {
    color: grey;
    position: absolute;
    top: 60px;
    font-size: .75em;
  }
  h2 {
    padding-top: 20px;
    line-height: 1em;
  }
paginate: true
header: 'CMS ❤ JavaScript'

---
<!-- _class: invert -->
<!-- _header: "" -->
# CMS 💘 JavaScript
Integrating front-end & back-end better

---

## Purpose
Look at good patterns for integrating JavaScript + frameworks into traditional CMS ASP.NET solutions.

---

## Benefits of a good integration
- Easy to run
- Fast dev cycle
- Easy debugging
- Module bundling & code splitting
- Modern JS features (ES 20xx)
- Simple to pass data from CMS to JS
- Smooth source control & deployments

---
<!-- _class: invert -->
<!-- _header: "" -->
# Working with webpack

---

## What is webpack?

<!-- Gulp vs webpack?? -->

Webpack is a **static module bundler** for modern JavaScript applications. It can compile/transpile and package up JS, CSS, and other front-end assets.

```js
// header.js
import MainNavigation from 'components/mainNavigation';

export default Header ({ page }) {
  return <header>
    <MainNavigation {...page.header} />
  </header>
}
```

---

## Webpack features
- Module bundling (with npm/yarn)
- Source maps
- Code splitting
- Watch mode for development
- Versioning for cache busting
- Modern JS features (using Babel)

---

## Webpack config

```js
// webpack.dev.js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};
```

`> webpack --config webpack.dev.js`

---

## Environment configurations
- `webpack-merge` can merge configs (common / dev / prod)
- webpack `mode` for development / production

---

## npm scripts as shortcuts

```json
// package.json
{
  "scripts": {
    // episerver
    "build-dev": "webpack --config webpack.dev.js",
    "develop": "webpack --config webpack.dev.js -w",
    "build-prod": "webpack --config webpack.prod.js",

    // sitecore
    "build-dev": "webpack --config webpack.dev.js && gulp deploy-whatever"
  }
}
```

- run environment specific configurations
- combine tasks from webpack and gulp
  
`> npm run build-dev`

---

### npm task runner
[VS extension](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner) allows running scripts from Visual Studio
  
![npm task runner](https://seansartell.com/images/webpack-dev-breakfast-npm-scripts.png)

<!-- VS code run tasks? -->

---

## Local deployment after build

- **Episerver**: Run website out of IIS Express so you can build and run from source folder
- **Sitecore**: Build in place with webpack, deploy to IIS folder with gulp watch. Don't rely on a VS publish!

---

## How are we doing?
✅ Easy to run (npm scripts + VS extension)

✅ Fast dev cycle (with watch)

✅ Easy debugging (with source maps)

✅ Module bundling & code splitting

✅ Modern JS features (use babel w/ webpack)

⏳ Simple to pass data from CMS to JS

⏳ Smooth source control & deployments

---
<!-- _class: invert -->
<!-- _header: "" -->
# Integrating with ASP.NET

---

<!-- why react? similar to why webpack? -->

## ReactJS&#46;NET
- Allows for server-side rendering (SSR)
- SSR is better for SEO
- Maintained by React team

---

## Boostrapping client-side components from cshtml
- **Angular**: Leverage Angular Elements which use [web components](https://reactjs.org/docs/web-components.html)
- **React**: Wrap `ReactDom.render(...)` calls in [web components](https://reactjs.org/docs/web-components.html) with custom code

---

## Pass data from CMS to JavaScript
- ReactJS.NET
- Attributes w/ Angular Elements or React + web components
- Webpack externals imports modules from global namespace at runtime
- Web API + fetch API

---

## HTML injection
- HtmlWebpackPlugin works with cshtml
- Use `hash: true` for revision hash in query string
- Use `minify: false` to avoid minification

---

## Souce control & publishing
- **Don't** source control compiled files
- **Do** include files you want to publish in your csproj

---

## DevOps build pipeline
- Run your bundler in your build pipeline
- Use `npm ci` instead of `npm install`

`> npm ci`
`> npm run build-prod`

---

## How did we do?
✅ Easy to run (nop scripts + VS extension)

✅ Fast dev cycle (with watch)

✅ Easy debugging (with source maps)

✅ Module bundling & code splitting

✅ Modern JS features (use babel w/ webpack)

✅ Simple to pass data from CMS to JS (props or externals)

✅ Smooth source control & deployments

---
<!-- _class: invert -->
<!-- _header: "" -->
# Thank you!