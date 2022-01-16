function SpryLive2dModel() {
  this.modelInfo = ''
  this.modelId = 0
  this.texturesId = 0
  // 渲染入口函数
  this.renderModel = function () {
    InitLive2d.spryLive2dConfig.useModelCdn
      ? this.initModelByCdn()
      : this.initModelByApi()

    this.loadLive2dModel('init')
  }

  // 根据api数据初始化
  this.initModelByApi = function () {
    const { modelList } = InitLive2d.spryLive2dConfig

    let modelId = parseInt(localStorage.getItem('modelId')) || 0
    let texturesId = parseInt(localStorage.getItem('texturesId')) || 0

    if (InitLive2d.spryLive2dConfig.isNew) {
      modelId = InitLive2d.spryLive2dConfig.model[0]
      texturesId = InitLive2d.spryLive2dConfig.model[1]
    }
    if (modelId > InitLive2d.spryLive2dConfig.modelCount - 1) {
      modelId = 0
      texturesId = 0
    }
    if (texturesId > modelList.models[modelId].length - 1) {
      texturesId = 0
    }

    localStorage.setItem('modelId', modelId)
    localStorage.setItem('texturesId', texturesId)
    this.modelId = modelId
    this.texturesId = texturesId
  }

  // 根据cdn加载初始化
  this.initModelByCdn = function () {
    const { modelList, model, isNew } = InitLive2d.spryLive2dConfig
    let modelId = parseInt(localStorage.getItem('modelId')) || 0
    let texturesId = parseInt(localStorage.getItem('texturesId')) || 0
    if (isNew) {
      this.modelInfo = this.selectionModel(modelList, model[0], model[1])
    } else {
      this.modelInfo = this.selectionModel(modelList, modelId, texturesId)
    }
  }

  // 根据模型和皮肤id，选择模型，并将id信息存储
  this.selectionModel = function (modelList, modelId, texturesId) {
    if (modelList.models[modelId] === undefined) {
      modelId = 0
      texturesId = 0
    }

    const modelInfo = modelList.models[modelId]

    localStorage.setItem('modelId', modelId)

    InitLive2d.spryLive2dConfig.model = [modelId, texturesId]

    if (Array.isArray(modelInfo)) {
      if (texturesId > modelInfo.length - 1) {
        texturesId = 0
      }
      localStorage.setItem('texturesId', texturesId)
      return modelInfo[texturesId]
    } else {
      localStorage.removeItem('texturesId')
      return modelInfo
    }
  }

  // 选择下一个模型
  this.selectionNextModel = function () {
    const modelId = parseInt(localStorage.getItem('modelId'))
    const { modelList, useModelCdn } = InitLive2d.spryLive2dConfig

    if (modelList.models.length === 1) {
      // 没有其他模型
      RenderLive2dDom.emitMessageTips(InitLive2d.MESSAGE_TYPE.NOT_MODEL)
      return
    }

    let newModelId
    let newTexturesId
    if (modelId + 1 > modelList.models.length - 1) {
      newModelId = 0
    } else {
      newModelId = modelId + 1
    }

    localStorage.setItem('modelId', newModelId)

    const modelInfo = this.randomSelectModelTextures(
      modelList.models[newModelId]
    )

    if (useModelCdn) {
      if (Array.isArray(modelInfo)) {
        this.modelInfo = modelInfo[0]
        newTexturesId = modelInfo[1]
        localStorage.setItem('texturesId', newTexturesId)
      } else {
        this.modelInfo = modelInfo
        newTexturesId = 0
        localStorage.removeItem('texturesId')
      }

      InitLive2d.spryLive2dConfig.model = [newModelId, newTexturesId]
    } else {
      localStorage.setItem('texturesId', 0)
    }

    this.loadLive2dModel('nextModel')
    RenderLive2dDom.emitMessageTips(InitLive2d.MESSAGE_TYPE.NEW_MODEL)
  }

  // 选择下一个皮肤
  this.selectionNextTextures = function () {
    const { models, useModelCdn } = InitLive2d.spryLive2dConfig.modelList

    const modelId = parseInt(localStorage.getItem('modelId'))
    const texturesId = parseInt(localStorage.getItem('texturesId'))

    let newTexturesId

    if (!Array.isArray(models[modelId]) || models[modelId].length <= 1) {
      RenderLive2dDom.emitMessageTips(InitLive2d.MESSAGE_TYPE.NOT_TEXTURES)
      return
    }

    newTexturesId = texturesId + 1
    if (newTexturesId > models[modelId].length - 1) newTexturesId = 0
    this.modelInfo = models[modelId][newTexturesId]

    localStorage.setItem('texturesId', newTexturesId)
    this.loadLive2dModel('nextTextures')
    RenderLive2dDom.emitMessageTips(InitLive2d.MESSAGE_TYPE.NEW_TEXTURES)
  }

  // 开始渲染live2d模型
  this.loadLive2dModel = async function (loadType) {
    const { modelCdnPath, modelApiPath, useModelCdn } =
      InitLive2d.spryLive2dConfig
    if (useModelCdn) {
      loadlive2d('live2d', `${modelCdnPath}model/${this.modelInfo}/index.json`)
    } else {
      let loadPath = null
      switch (loadType) {
        case 'init':
          loadPath = `${modelApiPath}model/get/?model_id=${this.modelId}&textures_id=${this.texturesId}`
          break
        case 'nextModel':
          loadPath = `${modelApiPath}model/next/?model_id=${this.modelId}`
          break
        case 'nextTextures':
          loadPath = `${modelApiPath}textures/next/?model_id=${this.modelId}&textures_id=${this.texturesId}`
          break
      }
      this.modelId = parseInt(localStorage.getItem('modelId'))
      this.texturesId = parseInt(localStorage.getItem('texturesId'))
      loadlive2d('live2d', loadPath)
    }
  }

  // 随机选择皮肤
  this.randomSelectModelTextures = function (modelInfos) {
    let texturesId
    if (Array.isArray(modelInfos)) {
      texturesId = Math.floor(Math.random() * modelInfos.length)
      return [modelInfos[texturesId], texturesId]
    } else {
      return modelInfos
    }
  }
}

const RenderLive2dModel = new SpryLive2dModel()
