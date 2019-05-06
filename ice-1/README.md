# ice-1

> My smashing Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## 项目安装babel
package.json 的启动命令后加 --exec babel-node
根目录创建.babelrc文件，写入 {"presets":["es2015"]}
全局安装 npm install -g babel-cli
安装 npm i babel-preset-es2015

## mod
"dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server",

> `node_modules/element-ui/lib/element-ui.common.js`
   scrollContainer: [String, HTMLElement], ->  scrollContainer:[]