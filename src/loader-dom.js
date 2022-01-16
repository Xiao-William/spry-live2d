function RenderSpryLive2dDom() {
  this.spryLive2dElement = {}
  this.userIsActive = false
  this.userActiveTimer = null
  this.messageTimer = null

  // 改变窗口大小
  this.handleResize = function () {
    let newDeviceType = window.innerWidth <= 768 ? 'mobile' : 'pc'
    if (newDeviceType !== InitLive2d.spryLive2dStyleConfig.deviceType) {
      if (newDeviceType === 'mobile') {
        this.emitMessageTips(InitLive2d.MESSAGE_TYPE.MOBILE_DEVICE)
      } else {
        this.emitMessageTips(InitLive2d.MESSAGE_TYPE.PC_DEVICE)
      }
      InitLive2d.spryLive2dStyleConfig.deviceType = newDeviceType
    }
  }

  this.handleMousemove = function () {
    this.userIsActive = true
  }

  this.handleKeydown = function () {
    this.userIsActive = true
  }

  // 鼠标点击
  this.handleClickOfTips = function (e) {
    this.emitMessageTips(InitLive2d.MESSAGE_TYPE.CLICK, e.target)
  }

  // 鼠标移入
  this.handleMouseoverOfTips = function (e) {
    this.emitMessageTips(InitLive2d.MESSAGE_TYPE.MOUSEOVER, e.target)
  }

  // 复制
  this.handleCopy = function () {
    this.emitMessageTips(InitLive2d.MESSAGE_TYPE.COPY)
  }

  // 返回页面
  this.handleVisibilitychange = function () {
    this.emitMessageTips(InitLive2d.MESSAGE_TYPE.BACK)
  }

  // 选择其他模型
  this.handleReloadingOtherModel = function () {
    RenderLive2dModel.selectionNextModel()
  }

  // 选择其他皮肤
  this.handleReloadingOtherTextures = function () {
    RenderLive2dModel.selectionNextTextures()
  }

  // 点击关闭按钮
  this.handleClickTimes = function () {
    setTimeout(() => {
      this.switchLive2dShowOrHidden(false)
    }, 300)
  }

  // 点击侧边栏
  this.handleClickToggle = function () {
    this.switchLive2dShowOrHidden(true)
  }

  this.handleClickAbout = function () {
    console.log('123123')
    window.open('https://github.com/mihu915/spry-live2d')
  }

  // 注册事件
  this.registerAllEvent = function () {
    const {
      live2d_toggle_el,
      times_el,
      user_circle_el,
      street_view_el,
      info_circle_el
    } = this.spryLive2dElement
    // 开启监听window窗口变化
    window.addEventListener('mouseover', e => this.handleMouseoverOfTips(e))
    window.addEventListener('click', e => this.handleClickOfTips(e))
    window.addEventListener('resize', e => this.handleResize(e))
    window.addEventListener('mousemove', e => this.handleMousemove(e))
    window.addEventListener('keydown', e => this.handleKeydown(e))
    window.addEventListener('copy', e => this.handleCopy(e))
    window.addEventListener('visibilitychange', e =>
      this.handleVisibilitychange(e)
    )
    times_el.addEventListener('click', e => this.handleClickTimes(e))
    live2d_toggle_el.addEventListener('click', e => this.handleClickToggle(e))
    user_circle_el.addEventListener('click', e =>
      this.handleReloadingOtherModel(e)
    )
    street_view_el.addEventListener('click', e =>
      this.handleReloadingOtherTextures(e)
    )
    info_circle_el.addEventListener('click', e => this.handleClickAbout())
  }

  // 开启定时器
  this.startTimer = function () {
    setInterval(() => {
      if (this.userIsActive) {
        this.userIsActive = false
        clearInterval(this.userActiveTimer)
        this.userActiveTimer = null
      } else if (!this.userActiveTimer) {
        this.userActiveTimer = setInterval(() => {
          this.emitMessageTips(InitLive2d.MESSAGE_TYPE.IDLE)
        }, 20000)
      }
    }, 1000)
  }

  // 显示或隐藏live2d面板
  this.switchLive2dShowOrHidden = function (status) {
    const { live2d_toggle_el, live2d_panel_el } = this.spryLive2dElement
    const { panelBottom } = InitLive2d.spryLive2dStyleConfig

    if (status) {
      live2d_toggle_el.classList.remove('live2d-toggle-active')

      setTimeout(() => {
        live2d_panel_el.style.bottom = 0
      }, 0)
      InitLive2d.spryLive2dStyleConfig.showLive2d = true
      this.emitMessageTips(InitLive2d.MESSAGE_TYPE.WELCOME)
    } else {
      live2d_toggle_el.classList.add('live2d-toggle-active')
      setTimeout(() => {
        live2d_panel_el.style.bottom = panelBottom + 'px'
      }, 0)
      InitLive2d.spryLive2dStyleConfig.showLive2d = false
    }
  }

  // 随机选择数组元素的方法
  this.randomSelection = function (obj) {
    if (!obj) return
    return Array.isArray(obj)
      ? obj[Math.floor(Math.random() * obj.length)]
      : obj
  }

  // 开始渲染
  this.renderDom = function () {
    // 创建父元素
    this.createParentEl()

    // 创建侧边栏
    this.createToggle()

    // 创建live2d面板
    this.createLive2dPanel()

    // 加载样式
    this.loadLive2dPanelStyle()

    // 注册事件
    this.registerAllEvent()

    // 开启定时器
    this.startTimer()
  }

  // 创建父元素
  this.createParentEl = function () {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div id="spry-live2d"></div>`
    )

    this.spryLive2dElement.spry_live2d_el =
      document.getElementById('spry-live2d')
  }

  // 创建侧边栏
  this.createToggle = function () {
    this.spryLive2dElement.spry_live2d_el.insertAdjacentHTML(
      'beforeend',
      `
      <div id="live2d-toggle">
        <span>看板娘</span>
      </div>
      `
    )

    this.spryLive2dElement.live2d_toggle_el =
      document.getElementById('live2d-toggle')
  }

  // 创建live2d面板
  this.createLive2dPanel = function () {
    this.spryLive2dElement.spry_live2d_el.insertAdjacentHTML(
      'beforeend',
      `<div id="live2d-panel" >

			  <div id="live2d-tips"></div>

			  <canvas id="live2d" width="200" height="200"></canvas>

			  <div id="live2d-tool" >
				  <span class="live2d-btn-icon fa fa-lg fa-user-circle"></span>
          <span class="live2d-btn-icon fa fa-lg fa-street-view"></span>
          <span class="live2d-btn-icon fa fa-lg fa-info-circle"></span>
          <span class="live2d-btn-icon fa fa-lg fa-times"></span>
			  </div>
		  </div>`
    )

    this.spryLive2dElement.live2d_panel_el =
      document.getElementById('live2d-panel')
    this.spryLive2dElement.live2d_tips_el =
      document.getElementById('live2d-tips')
    this.spryLive2dElement.live2d_tool_el =
      document.getElementById('live2d-tool')
    this.spryLive2dElement.live2d_el = document.getElementById('live2d')

    this.spryLive2dElement.user_circle_el = document.querySelector(
      '#live2d-tool .fa-user-circle'
    )
    this.spryLive2dElement.street_view_el = document.querySelector(
      '#live2d-tool .fa-street-view'
    )
    this.spryLive2dElement.info_circle_el = document.querySelector(
      '#live2d-tool .fa-info-circle'
    )
    this.spryLive2dElement.times_el = document.querySelector(
      '#live2d-tool .fa-times'
    )
  }

  // 加载样式
  this.loadLive2dPanelStyle = function () {
    const {
      live2d_el,
      live2d_panel_el,
      spry_live2d_el,
      live2d_tips_el,
      live2d_tool_el,
      live2d_toggle_el
    } = this.spryLive2dElement
    const {
      live2dSize,
      canvasSize,
      panelBottom,
      showLive2d,
      live2dLeft,
      live2dRight,
      tipsMargin,
      tipsWidth,
      tipsHeight,
      toolsShow,
      toolLeft,
      toolRight,
      live2dPosition
    } = InitLive2d.spryLive2dStyleConfig

    // 判断位置，并根据位置设置样式
    switch (live2dPosition) {
      case 'left':
        live2d_toggle_el.classList.add('live2d-toggle-left')
        break

      case 'right':
        live2d_toggle_el.classList.add('live2d-toggle-right')
        break
    }

    live2d_el.style.width = live2d_el.style.height = `${live2dSize}px`

    live2d_el.width = live2d_el.height = canvasSize

    // 面板样式
    live2d_panel_el.style.bottom = `${panelBottom}px`
    live2d_panel_el.style.left = live2dLeft + 'px'
    live2d_panel_el.style.right = live2dRight + 'px'

    // tips样式
    live2d_tips_el.style.margin = tipsMargin
    live2d_tips_el.style.left = live2dLeft + 'px'
    live2d_tips_el.style.right = live2dRight + 'px'
    live2d_tips_el.style.width = tipsWidth
    live2d_tips_el.style.height = tipsHeight

    // 菜单样式
    live2d_tool_el.style.left = toolLeft + 'px'
    live2d_tool_el.style.right = toolRight + 'px'

    if (!toolsShow) live2d_tool_el.style.display = 'none'

    this.switchLive2dShowOrHidden(showLive2d)
  }

  // 显示消息
  this.showMessage = function (message, timeout, priority) {
    const live2d_message_priority = sessionStorage.getItem(
      'live2d_message_priority'
    )
    if (
      !message ||
      (live2d_message_priority && live2d_message_priority > priority)
    ) {
      return
    }

    if (this.messageTimer) {
      clearTimeout(this.messageTimer)
      this.messageTimer = null
    }

    const { live2d_tips_el } = this.spryLive2dElement
    sessionStorage.setItem('live2d_message_priority', priority)

    live2d_tips_el.innerHTML = message
    live2d_tips_el.classList.add('live2d-tips-active')
    this.messageTimer = setTimeout(() => {
      sessionStorage.removeItem('live2d_message_priority')
      live2d_tips_el.classList.remove('live2d-tips-active')
    }, timeout)
  }

  // 提交消息方法
  this.emitMessageTips = function (type, eventTarget) {
    const {
      WELCOME,
      IDLE,
      BACK,
      COPY,
      CLICK,
      MOUSEOVER,
      NEW_MODEL,
      NOT_TEXTURES,
      NEW_TEXTURES,
      NOT_MODEL,
      PC_DEVICE,
      MOBILE_DEVICE
    } = InitLive2d.MESSAGE_TYPE

    const {
      idleTips,
      welcomeTips,
      goBackTips,
      copyTips,
      clickTips,
      mouseoverTips,
      newModelTips,
      notModelTips,
      notTexturesTips,
      newTexturesTips,
      pcDeviceTips,
      mobileDeviceTips
    } = InitLive2d.messageTipConfig
    let message
    let messageInfo
    switch (type) {
      case WELCOME:
        messageInfo = welcomeTips
        break
      case IDLE:
        messageInfo = idleTips
        break
      case BACK:
        messageInfo = goBackTips
        break
      case COPY:
        messageInfo = copyTips
        break
      case CLICK:
        messageInfo = handleEventMessage(clickTips, eventTarget)
        break
      case MOUSEOVER:
        messageInfo = handleEventMessage(mouseoverTips, eventTarget)
        break
      case NOT_MODEL:
        messageInfo = notModelTips
        break
      case NEW_MODEL:
        const index = parseInt(localStorage.getItem('modelId'))
        messageInfo = { ...newModelTips, message: newModelTips.message[index] }
        break
      case NOT_TEXTURES:
        messageInfo = notTexturesTips
        break
      case NEW_TEXTURES:
        messageInfo = newTexturesTips
        break
      case PC_DEVICE:
        messageInfo = pcDeviceTips
        break
      case MOBILE_DEVICE:
        messageInfo = mobileDeviceTips
        break
    }

    function handleEventMessage(tipsInfo, target) {
      const result = tipsInfo.message.filter(item => {
        return target.matches(item.selector)
      })
      return result.length
        ? {
            ...tipsInfo,
            message: result[0].text,
            priority: result[0].priority
              ? result[0].priority
              : tipsInfo.priority
          }
        : null
    }

    if (!messageInfo) return

    message = this.randomSelection(messageInfo.message)

    this.showMessage(message, messageInfo.timeout, messageInfo.priority)
  }
}

const RenderLive2dDom = new RenderSpryLive2dDom()
