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

2. 基本样式配置：

```js
live2dSetConfig({
  right: 0, // 将看板娘设置在右边距离右边窗口边缘为0px 默认为：left： 0
  model: [1, 1], // 第一次访问页面时展示的模型id，该属性为数组类型，索引0位置为模型id，索引1位置为皮肤id 默认为[0,0]
  size: 300, // pc端展示的大小 默认为:300
  mobileSize: 140, // 移动端下展示的大小 默认为: 160
  showMenu: true, // 是否展示菜单 默认为:true
  modelCdnPath: null, // 如果你使用过live2d的其他项目，并且有自建的模型cdn，则可以在此设置cdn地址 默认为：null
  modelApiPath: 'https://spry-live2d-api.tj520.top', // api地址，如果你想自建api并使用自己的服务器，则设置该属性为自己的api地址 默认为：https://spry-live2d-api.tj520.top
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
  },
  publicPath: 'https://spry-live2d.tj520.top' // 静态资源自建cdn地址，默认为：https://spry-live2d.tj520.top
})
```

3. 如果你想使用自建的 live2d 模型 cdn，则可配置 `modelCdnPath` 属性，这将优先使用你的模型 cdn 地址。如果没有该需求，则无需配置此项。该项目默认使用的是配套的 api 接口地址来请求模型资源。

4. 如果你喜欢折腾，并且想完全使用自己的服务器来搭建该项目，则需要先将该仓库中的前端项目 clone 下来，并部署在自己的服务器当中。你无需查看我的源码并对静态资源地址进行修改，而只需要在该配置对象中添加`publicPath`属性，并将该属性的值设置为你已经搭建好的前端静态资源 cdn 地址，`live2dSetConfig` 方法将会自动帮你设置为指定的 cdn 地址。
   完成以上步骤后当然还需要搭建该项目配套的 api 接口，请参考：[spry-live2d-api](https://github.com/mihu915/spry-live2d-api)，该项目，并完成后端接口的搭建操作。

5. 如果你对 live2d 模型的提示信息有什么不满，则可配置以下属性来修改模型的提示信息：

```js
      live2dSetConfig({
        ... more
        basicTips: {
          // 基本提示的配置：目前只支持配置 空闲时、点击模型、鼠标移入模型的提示信息
          idleTips: {
            // 空闲时提示
            cover: false, // 是否覆盖默认提示信息，若为false，将合并至默认的提示信息列表中, 若为true，则直接覆盖默认信息列表
            text: [] // 提示信息，类型为 纯字符串 的 数组 (string[])
            //  默认为：
            //   [
            //   '好久不见，日子过得好快呢……',
            //   '大坏蛋！你都多久没理人家了呀，嘤嘤嘤～',
            //   '嗨～快来逗我玩吧！',
            //   '拿小拳拳锤你胸口！',
            //   '今天学习了吗？',
            //   '整理一下学习思路吧~',
            //   '最近在玩什么游戏呢？',
            //   '失去人性，失去很多；失去兽性，失去一切。  ——《三体》刘慈欣',
            //   '最近在看什么书呢？',
            //   'react18的新特性，你了解了吗？',
            //   'vue3发布正式版很久了，你还不会用吗？',
            //   '头顶凉飕飕的？',
            //   '了解真相，才能获得真正的自由~'
            // ]
          },
          clickModel: {
            // 点击模型时提示
            cover: false,
            text: []
            // 默认为：
            //  [
            //   "干嘛呢你，快把手拿开～～",
            //   "鼠…鼠标放错地方了！",
            //   "你要干嘛呀？",
            //   "喵喵喵？",
            //   "怕怕(ノ≧∇≦)ノ",
            //   "非礼呀！救命！",
            //   "这样的话，只能使用武力了！",
            //   "我要生气了哦~",
            //   "不要动手动脚的！",
            //   "真…真的是不知羞耻！",
            //   "Hentai！"
            // ]
          },
          mouseoverModel: {
            // 鼠标移入模型时的提示
            cover: false,
            text: []
            // 默认：
            //  [
            //   "是…是不小心碰到了吧…",
            //   "萝莉控是什么呀？",
            //   "你看到我的小熊了吗？",
            //   "再摸的话我可要报警了！⌇●﹏●⌇",
            //   "110 吗，这里有个变态一直在摸我(ó﹏ò｡)",
            //   "不要摸我了，我会告诉老婆来打你的！",
            //   "干嘛动我呀！小心我咬你！",
            //   "别...不要摸了..."
            // ]
          }
        },

        // 点击元素的提示，selector属性为元素选择器，该属性支持你编写css选择器，例如：
        clickTips: [
          // 该属性为对象数组
          {
            selector: 'a',
            text: ['点击了a标签~']
          },
          {
            selector: 'input.username',
            text: ['点击了class为username的input输入框']
          },
          {
            selector: '#logo img',
            text: ['点击了id为logo元素下的img标签']
          }
        ],

        // 鼠标移入事件的提示，配置方法同上
        mouseoverTips: [
          {
            selector: 'h2',
            text: ['鼠标移入了h2']
          }
        ]
      })
```

# 五. 分离配置信息：

经过以上冗长的配置，我们发现这将占用`body`内大量的空间，如果你和我一样有代码洁癖，则可在项目中新建`live2d.config.js`文件，（原生项目在根目录创建即可，vue 或 react 等其他 cli 项目，则在`public`文件夹中新建该文件）并在 head 头部引入该文件，注意引入顺序（spry-live2d 须在最上）：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <script src="https://spry-live2d.tj520.top/src/index.js"></script>
    <script src="./live2d.config.js"></script>
  </head>
  <body>
    <script></script>
  </body>
</html>
```

接下来你就可以在 live2d.config.js 文件中按照以下格式来设置模型了，当然如果你不想的话，也可以不必如此，直接在 body 中调用该方法也没有任何问题，但是最好将`live2dSetConfig`方法置于`body`内最上方，也就是在你的业务逻辑之前调用此方法。

```js
// 基本提示信息的配置
const basicTips = {
  idleTips: {
    cover: false,
    text: []
  },
  clickModel: {
    cover: false,
    text: []
  },
  mouseoverModel: {
    cover: false,
    text: []
  }
}

// 点击事件提示的配置
const clickTips = [
  {
    selector: 'a',
    text: ['点击了a标签~']
  },
  {
    selector: 'input.username',
    text: ['点击了class为username的input输入框']
  },
  {
    selector: '#logo img',
    text: ['点击了id为logo元素下的img标签']
  }
]

// 鼠标移入事件提示的配置
const mouseoverTips = [
  {
    selector: 'h2',
    text: ['鼠标移入了h2']
  }
]

// 调用set方法
live2dSetConfig({
  right: 0,
  model: [1, 1],
  size: 300,
  mobileSize: 140,
  showMenu: true,
  tipsStyle: {
    // 提示框样式
    mobile: {
      // 移动端提示框样式，目前仅可设置 高度、宽度、以及向上的相对距离
      top: 0, // 默认为：0
      height: 80, // 默认为：80
      width: 200 //默认为：200
    },
    pc: {
      // pc端样式
      top: 0, // 默认为： 0
      height: 100, //默认：100
      width: 240 // 默认240
    }
  },

  basicTips,

  clickTips,

  mouseoverTips
})
```

# 六. 模型 id 对应关系：

model 属性决定了页面首次访问时展示的对应模型和皮肤：
该属性为数组类型：`[0,0]`表示第 0 号模型的第 0 号皮肤：

模型 id 编号请参考下方：

注意：本项目所使用的，用作展示的所有 Live2D 模型、图片、动作数据等版权均属于其原作者所有，本项目所提供的模型相关资源仅供参考和学习使用，未经作者许可不得使用于任何商业用途。

- 0：该模型暂时没有其他皮肤，model 属性可配置为`[0,0]`即选择该模型的第 0 号皮肤

  ![live2d.png](https://spry-live2d.tj520.top/screenshot/Snipaste01.png)

- 1: 该模型暂时有 4 个皮肤，可设置： `[1,0]`，`[1,1]`, `[1,2]` `[1,3]`，以下模型将不再一一举例，参考该条设置即可。

  ![live2d.png](https://spry-live2d.tj520.top/screenshot/Snipaste02.png)

- 2: 暂时没有皮肤：`[2,0]`

  ![live2d.png](https://spry-live2d.tj520.top/screenshot/Snipaste03.png)

- 3: 暂时没有皮肤：`[3,0]`

  ![live2d.png](https://spry-live2d.tj520.top/screenshot/Snipaste04.png)

- 4: 暂时没有皮肤：`[4,0]`

![live2d.png](https://spry-live2d.tj520.top/screenshot/Snipaste05.png)

- 5: 目前有 3 个皮肤：`[5,0]`，`[5,1]`，`[5,2]`

![live2d.png](https://spry-live2d.tj520.top/screenshot/Snipaste06.png)

- 6: 目前有 3 个皮肤：`[6,0]`，`[6,1]`，`[6,2]`

![live2d.png](https://spry-live2d.tj520.top/screenshot/Snipaste07.png)


# 七. 后端API：

本项目后端API使用的是nodejs的koa框架开发，若想自行搭建，请参考： [spry-live2d-api](https://github.com/mihu915/spry-live2d-api) ，该项目目前还不算完善，目前只支持向下切换模型和皮肤，后续会更新更多内容。

# 八. 版权声明：
*本项目所使用的，用作展示的所有 Live2D 模型、图片、动作数据等版权均属于其原作者所有，本项目所提供的模型相关资源仅供参考和学习使用，未经作者许可不得使用于任何商业用途。*

Live2D 官方网站：   
https://www.live2d.com/en/   
https://live2d.github.io

# 九. 更新日志：
### 版本号：v0.0.1
 1. 模型可切换
 2. 皮肤可切换
 3. 可定义live2d大小和位置
 4. 可定义tips基本样式
 5. 可自定义提示信息，可选覆盖

#  许可证 License
Released under the GNU General Public License v3   
http://www.gnu.org/licenses/gpl-3.0.html