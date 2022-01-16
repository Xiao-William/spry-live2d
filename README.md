# spry-live2d

[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/ages-18.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/validated-html5.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

# 一. 概述：

一个开箱即用，轻快的，高度定制的 web live2d 看板娘，使你的个人网站不再单调。

在 web 应用程序中加入 live2d 看板娘，支持 cdn 与 api 两种加载模型的方式，开箱即用，真正实现 0 开发基础使用本 sdk。

# 二. 依赖：

_本项目已集成 Font Awesome 图标库，你无需对此额外再依赖_

# 三. 基本使用：

1.  原生项目中使用：

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

2.  在 vue-cli 以及 react-cli 项目中使用：

    > 如果你使用 vue 或 react 并且使用它们的 cli 脚手架根据构建项目，那么可以将：
    >
    > ```html
    > <script src="https://spry-live2d.tj520.top/src/index.js"></script>
    > ```
    >
    > 添加至项目目录下`public/index.html` 的*head*中，重新编译项目后你将获得看板娘。
    > 其他框架的 web 项目同样适用该方法。

3.  基本功能：
    > - 看板娘默认展示至左下角
    > - 菜单工具:
         1. 切换模型
         2. 切换皮肤
         3. 关于
         4. 关闭live2d(关闭后可通过侧边栏打开)
    > - 其他功能：
        1. 空闲时小贴士。
        2. 事件小贴士

# 四. 进阶使用：

如果你不满足于使用默认配置，还希望加入一些自己的东西，那么你可以使用`live2dSetConfig()`方法来定制看板娘。

1. 示例：

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>

       <script src="https://spry-live2d.tj520.top/src/index.js"></script>
     </head>
     <body>
       <script>
         live2dSetConfig({
           right: 0, // 将看板娘设置在右边距离右边窗口边缘为0px
           size: 300 // pc端展示的大小
         })
       </script>
     </body>
   </html>
   ```

   你可以在`body`中加入`script`标签，并在其中调用`live2dSetConfig`方法，该方法接收一个对象作为参数，并在对象中自定义以下属性：  
   基本样式配置：

   ```js
   live2dSetConfig({
     right: 0, // 将看板娘设置在右边距离右边窗口边缘为0px 默认为：left： 0
     model: [1, 1], // 第一次访问页面时展示的模型id，该属性为数组类型，索引0位置为模型id，索引1位置为皮肤id 默认为[0,0]
     size: 300, // pc端展示的大小 默认为:300
     mobileSize: 140, // 移动端下展示的大小 默认为: 160
     showMenu: true, // 是否展示菜单 默认为:true
     modelCdnPath: null, // 如果你使用过live2d的其他项目，并且有自建的模型cdn，则可以在此设置cdn地址 默认为：null
     // modelApiPath:   // api地址，如果你想自建api并使用自己的服务器，则设置该属性为自己的api地址 默认为：spry-live2d-api.tj520.top
     tipsStyle: {
       // 提示框样式
       mobile: {
         // 移动端提示框样式，目前仅可设置 高度、宽度、以及向上或向下偏移的距离
         top: 0, // 默认为：0 负数往下偏移，正数往上偏移
         height: 80, // 默认为：80
         width: 200 //默认为：200
       },
       pc: {
         // pc端样式
         top: 0, // 默认为： 0
         height: 100, //默认：100
         width: 240 // 默认240
       }
     }
   })
   ```
