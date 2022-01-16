# spry-live2d

[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/ages-18.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/validated-html5.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

# 一. 概述

一个开箱即用，轻快的，高度定制的 web live2d 看板娘，使你的个人网站不再单调。

在 web 应用程序中加入 live2d 看板娘，支持 cdn 与 api 两种加载模型的方式，开箱即用，真正实现 0 开发基础使用本 sdk。

# 二. 基本使用

1. 原生项目中使用：

   > 在项目入口文件（index.html）中的 head 标签内使用 script 标签通过 cdn 引入即可：
   >
   > ```html
   > <script src="https://spry-live2d.tj520.top/src/index.js"></script>
   > ```
   >
   > 完整代码示例：
   >
   > ```html
   > <!DOCTYPE html>
   > <html lang="en">
   >   <head>
   >     <meta charset="UTF-8" />
   >     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
   >     <meta
   >       name="viewport"
   >       content="width=device-width, initial-scale=1.0"
   >     />
   >     <title>Document</title>
   >
   >     <script src="https://spry-live2d.tj520.top/src/index.js"></script>
   >   </head>
   >   <body></body>
   > </html>
   > ```
   >
   > 之后打开该页面，你将使用默认配置并得到第一个 live2d 看板娘，如图：
   >
   > ![live2d.png](https://spry-live2d.tj520.top/screenshot/Snipaste01.png)

2. 在 vue-cli 以及 react-cli 项目中使用：

   > 如果你使用 vue 或 react 并且使用它们的 cli 脚手架根据构建项目，那么可以将：
   >
   > ```html
   > <script src="https://spry-live2d.tj520.top/src/index.js"></script>
   > ```
   >
   > 添加至项目目录下`public/index.html` 的*head*中，重新编译项目后你将获得看板娘。

3. 默认配置：
   > - 看板娘默认展示至左下角
   > - 菜单工具
