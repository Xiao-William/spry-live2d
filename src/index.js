function InitSpryLive2dConfig() {
  this.spryLive2dConfig = {
    left: 0,
    size: 300,
    model: [0, 0],
    mobileSize: 160, //<=768
    showLive2d: true,
    showMenu: true,
    modelCdnPath: null,
    modelApiPath: 'http://localhost:8181/',
    tipsStyle: {
      mobile: {
        top: 0,
        height: 80,
        width: 200
      },
      pc: {
        top: 0,
        height: 100,
        width: 240
      }
    },

    basicTips: {
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
    },

    clickTips: [],
    mouseoverTips: []
  }

  // 样式的配置
  this.spryLive2dStyleConfig = {}

  // 消息类型
  this.MESSAGE_TYPE = {
    WELCOME: 'WELCOME',
    IDLE: 'IDLE',
    BACK: 'BACK',
    COPY: 'COPY',
    CLICK: 'CLICK',
    MOUSEOVER: 'MOUSEOVER',
    NEW_MODEL: 'NEW_MODEL',
    NOT_MODEL: 'NOT_MODEL',
    NOT_TEXTURES: 'NOT_TEXTURES',
    NEW_TEXTURES: 'NEW_TEXTURES',
    PC_DEVICE: 'PC_DEVICE',
    MOBILE_DEVICE: 'MOBILE_DEVICE'
  }

  // 消息数据
  this.messageTipConfig = {
    pcDeviceTips: {
      message: ['屏幕大小变成电脑了，刷新页面改变我的大小吧！⌇●﹏●⌇'],
      timeout: 6000,
      priority: 4
    },
    mobileDeviceTips: {
      message: ['屏幕大小变成手机了，刷新页面改变我的大小吧！⌇●﹏●⌇'],
      timeout: 6000,
      priority: 4
    },
    notTexturesTips: {
      message: ['衣柜里好像没有新衣服！！', '变装失败...原因：没有新衣服...'],
      timeout: 4000,
      priority: 4
    },
    notModelTips: {
      message: [
        '唉？其他人好像掉线了...',
        '貌似没有其他人了...',
        '作者跑路了？'
      ],
      timeout: 4000,
      priority: 4
    },

    newTexturesTips: {
      message: [
        '新衣服好看吗？',
        '越来越喜欢新衣服了~',
        '穿成这样...真的合适吗？'
      ],
      timeout: 4000,
      priority: 4
    },

    mouseoverTips: {
      message: [],
      timeout: 3000,
      priority: 3
    },

    newModelTips: {
      message: [],
      timeout: 4000,
      priority: 4
    },

    welcomeTips: {
      message: [],
      timeout: 6000,
      priority: 4
    },

    idleTips: {
      message: [
        '好久不见，日子过得好快呢……',
        '大坏蛋！你都多久没理人家了呀，嘤嘤嘤～',
        '嗨～快来逗我玩吧！',
        '拿小拳拳锤你胸口！',
        '今天学习了吗？',
        '整理一下学习思路吧~',
        '最近在玩什么游戏呢？',
        '失去人性，失去很多；失去兽性，失去一切。  ——《三体》刘慈欣',
        '最近在看什么书呢？',
        'react18的新特性，你了解了吗？',
        'vue3发布正式版很久了，你还不会用吗？',
        '头顶凉飕飕的？',
        '了解真相，才能获得真正的自由~'
      ],
      timeout: 6000,
      priority: 2
    },

    goBackTips: {
      message: ['欢迎回来~', '终于回来了~'],
      timeout: 4000,
      priority: 3
    },

    clickTips: {
      message: [],
      timeout: 6000,
      priority: 3
    },

    copyTips: {
      message: ['你都复制了些什么呀，转载要记得加上出处哦！'],
      timeout: 6000,
      priority: 3
    }
  }

  // 初始化入口函数
  this.initConfig = async function () {
    // 生成样式配置
    this.generateStyleConfig()

    // 处理额外的以及有问题的配置参数
    this.handleLive2dConfig()

    // 加载json配置文件
    await this.loaderJsonConfig()
  }

  // 根据用户配置生成动态样式配置
  this.generateStyleConfig = function () {
    const { size, mobileSize, showLive2d, left, right, tipsStyle, showMenu } =
      this.spryLive2dConfig
    const live2dSize = window.innerWidth <= 768 ? mobileSize : size
    const deviceType = window.innerWidth <= 768 ? 'mobile' : 'pc'
    const finalTipsStyle =
      window.innerWidth <= 768 ? tipsStyle.mobile : tipsStyle.pc
    const tipsMargin = `${-50 - finalTipsStyle.top}px 20px`
    const tipsWidth = `${finalTipsStyle.width}px`
    const tipsHeight = `${finalTipsStyle.height}px`
    const toolsShow = showMenu

    let live2dLeft
    let live2dRight
    let toolLeft
    let toolRight
    let live2dPosition
    if (right !== undefined) {
      live2dRight = right
      toolLeft = 0
      live2dPosition = 'right'
    } else {
      live2dLeft = left
      toolRight = 0
      live2dPosition = 'left'
    }

    this.spryLive2dStyleConfig = {
      canvasSize: live2dSize * 2, // canvas画布的大小
      panelBottom: -(live2dSize + finalTipsStyle.height), // 面板初始时的bottom属性
      live2dSize, // live2d的大小
      showLive2d,
      live2dLeft,
      live2dRight,
      deviceType,
      tipsMargin,
      tipsWidth,
      tipsHeight,
      toolsShow,
      toolLeft,
      toolRight,
      live2dPosition
    }
  }

  // 清除优先级的sessionStorage
  this.clearSessionStorage = function () {
    sessionStorage.removeItem('live2d_message_priority')
  }

  // 设置配置并合并配置
  this.setConfig = function setConfig(config) {
    if (typeof config !== 'object') {
      throw new Error('方法live2dSetConfig,只接收一个object类型作为参数')
    }

    this.spryLive2dConfig = Object.assign(this.spryLive2dConfig, config)
  }

  // 拿到最后配置后开始调整一些参数
  this.handleLive2dConfig = function () {
    const {
      model,
      basicTips,
      clickTips,
      mouseoverTips,
      modelApiPath,
      modelCdnPath
    } = this.spryLive2dConfig

    this.spryLive2dConfig.useModelCdn = !!modelCdnPath

    this.spryLive2dConfig.isNew = false

    // 处理自定义提示的参数
    if (!Array.isArray(clickTips)) {
      this.spryLive2dConfig.clickTips = []
      console.warn(`[spry-live2d]:clickTips必须为Array类型`)
    }
    if (!Array.isArray(mouseoverTips)) {
      this.spryLive2dConfig.mouseoverTips = []
      console.warn(`[spry-live2d]:mouseoverTips必须为Array类型`)
    }

    if (
      typeof basicTips !== 'object' ||
      Array.isArray(basicTips) ||
      !Object.keys(basicTips).length
    ) {
      this.spryLive2dConfig.basicTips = {
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
      console.warn(`[spry-live2d]:basicTips必须为object类型，且属性不可为空`)
    }

    Object.keys(basicTips).forEach(key => {
      if (typeof basicTips[key] !== 'object' || Array.isArray(basicTips[key])) {
        this.spryLive2dConfig.basicTips[key] = {
          cover: false,
          text: []
        }
        console.warn(`[spry-live2d]:basicTips的${key}属性必须为object类型`)
      }

      if (!basicTips[key].text || !Array.isArray(basicTips[key].text)) {
        this.spryLive2dConfig.basicTips[key] = {
          cover: false,
          text: []
        }
        console.warn('[spry-live2d]:basicTips的text属性必须为纯字符串的数组')
      }
    })

    // 处理model属性
    if (!localStorage.getItem('modelId')) {
      this.spryLive2dConfig.isNew = true
    }

    if (!Array.isArray(model) && typeof model !== 'number') {
      this.spryLive2dConfig.model = [0, 0]
    }

    if (Array.isArray(model)) {
      if (model.length > 2) {
        this.spryLive2dConfig.model = model.splice(0, 2)
      } else if (model.length < 1) {
        this.spryLive2dConfig.model = [0, 0]
      } else if (model.length === 1) {
        this.spryLive2dConfig.model.push(0)
      }
      if (typeof model[0] !== 'number' || typeof model[1] !== 'number') {
        this.spryLive2dConfig.model = [0, 0]
      }
    }
    if (typeof model === 'number') {
      this.spryLive2dConfig.model = [model, 0]
    }

    // 处理cdn路径和api路径
    if(this.spryLive2dConfig.useModelCdn){
      if (!modelCdnPath.endsWith('/')) {
        this.spryLive2dConfig.modelCdnPath += '/'
      }
    }
 
    if (!modelApiPath.endsWith('/')) {
      this.spryLive2dConfig.modelApiPath += '/'
    }
  }

  // 加载其他相关的json配置文件，并初始化提示语
  this.loaderJsonConfig = async function () {
    const { modelCdnPath, modelApiPath, basicTips, useModelCdn } =
      this.spryLive2dConfig
    const { clickModel, mouseoverModel, idleTips } = basicTips

    // 判断根据cdn存储数据还是api存储
    if (useModelCdn) {
      const modelListResult = await fetch(`${modelCdnPath}model-list.json`)
      this.spryLive2dConfig.modelList = await modelListResult.json()
      this.messageTipConfig.newModelTips.message =
        this.spryLive2dConfig.modelList.messages
      this.spryLive2dConfig.modelCount =
        this.spryLive2dConfig.modelList.models.length
    } else {
      await (await fetch(`${modelApiPath}model/list`)).json().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.spryLive2dConfig.modelCount = res.data.modelCount
          this.messageTipConfig.newModelTips.message =
            res.data.modelList.messages
          this.spryLive2dConfig.modelList = res.data.modelList
        }
      })
    }

    const tipsData = await (await fetch('./live2d-tips.json')).json()

    // 定义欢迎提示
    this.messageTipConfig.welcomeTips.message = this.handleWelcomeMessage()

    // 合并鼠标点击时间的提示
    this.messageTipConfig.clickTips.message = [
      ...tipsData.click,
      ...this.spryLive2dConfig.clickTips
    ]
    // 合并鼠标移入事件的提示
    this.messageTipConfig.mouseoverTips.message = [
      ...tipsData.mouseover,
      ...this.spryLive2dConfig.mouseoverTips
    ]

    if (idleTips) {
      this.messageTipConfig.idleTips.message = idleTips.cover
        ? idleTips.text
        : [...this.messageTipConfig.idleTips.message, ...idleTips.text]
    }

    // 处理模型点击的提示
    if (clickModel) {
      handleLive2dTipMessage(
        this.messageTipConfig.clickTips.message,
        '#live2d',
        clickModel
      )
    }

    // 处理鼠标移入模型的提示
    if (mouseoverModel) {
      handleLive2dTipMessage(
        this.messageTipConfig.mouseoverTips.message,
        '#live2d',
        mouseoverModel
      )
    }

    function handleLive2dTipMessage(messages, selector, userTips) {
      messages.forEach(item => {
        if (item.selector === selector) {
          if (userTips.cover) {
            item.text = userTips.text
          } else {
            item.text = [...item.text, ...userTips.text]
          }
          return
        }
      })
    }
  }

  // 定义异步加载资源的方法
  this.loadExternalResource = function (url, type) {
    return new Promise((resolve, reject) => {
      let tag
      if (type === 'css') {
        tag = document.createElement('link')
        tag.rel = 'stylesheet'
        tag.href = url
      } else if (type === 'js') {
        tag = document.createElement('script')
        tag.src = url
      }
      if (tag) {
        tag.onload = () => resolve(url)
        tag.onerror = () => reject(url)
        document.head.appendChild(tag)
      }
    })
  }

  // 判断提示欢迎消息
  this.handleWelcomeMessage = function () {
    let message
    if (location.pathname === '/') {
      // 如果是主页
      const now = new Date().getHours()
      if (now > 5 && now <= 7)
        message = '早上好！一日之计在于晨，美好的一天就要开始了。'
      else if (now > 7 && now <= 11)
        message = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！'
      else if (now > 11 && now <= 13)
        message = '中午了，工作了一个上午，现在是午餐时间！'
      else if (now > 13 && now <= 17)
        message = '午后很容易犯困呢，今天的运动目标完成了吗？'
      else if (now > 17 && now <= 19)
        message = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～'
      else if (now > 19 && now <= 21) message = '晚上好，今天过得怎么样？'
      else if (now > 21 && now <= 23)
        message = ['已经这么晚了呀，早点休息吧，晚安～', '深夜时要爱护眼睛呀！']
      else message = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？'
    } else if (document.referrer !== '') {
      const referrer = new URL(document.referrer),
        domain = referrer.hostname.split('.')[1]
      if (location.hostname === referrer.hostname)
        message = `欢迎阅读<span>「${document.title.split(' - ')[0]}」</span>`
      else if (domain === 'baidu')
        message = `Hello！来自 百度搜索 的朋友<br>你是搜索 <span>${
          referrer.search.split('&wd=')[1].split('&')[0]
        }</span> 找到的我吗？`
      else if (domain === 'so')
        message = `Hello！来自 360搜索 的朋友<br>你是搜索 <span>${
          referrer.search.split('&q=')[1].split('&')[0]
        }</span> 找到的我吗？`
      else if (domain === 'google')
        message = `Hello！来自 谷歌搜索 的朋友<br>欢迎阅读<span>「${
          document.title.split(' - ')[0]
        }」</span>`
      else message = `Hello！来自 <span>${referrer.hostname}</span> 的朋友`
    } else {
      message = `欢迎阅读<span>「${document.title.split(' - ')[0]}」</span>`
    }
    return message
  }
}

// 创建初始化实例
const InitLive2d = new InitSpryLive2dConfig()

// 程序入口： 加载所有静态资源的依赖，加载完成后开始渲染
Promise.all([
  InitLive2d.loadExternalResource('../library/live2d.min.js', 'js'),
  InitLive2d.loadExternalResource('../src/loader-dom.js', 'js'),
  InitLive2d.loadExternalResource('../src/loader-model.js', 'js'),
  InitLive2d.loadExternalResource('../src/live2d.css', 'css'),
  InitLive2d.loadExternalResource(
    '../library/font-awesome/css/font-awesome.css',
    'css'
  )
]).then(async () => {
  console.log(window)
  // 清理session
  InitLive2d.clearSessionStorage()

  // 初始化配置
  await InitLive2d.initConfig()

  // 渲染dom元素
  RenderLive2dDom.renderDom()

  // 渲染live2d模型
  RenderLive2dModel.renderModel()

  console.log(InitLive2d)
})

// 将设置配置的方法暴露给全局
function live2dSetConfig(config = {}) {
  InitLive2d.setConfig(config)
}
