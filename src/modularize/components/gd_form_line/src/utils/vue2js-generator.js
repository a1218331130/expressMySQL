import { isNotNull, traverseContainWidgets, traverseFieldWidgets } from './util'
import { translate } from './i18n'
import FormValidators, { getRegExp } from './validators'
import { setTableListMethod } from './gd_table'
import { setDialogMethod } from './gd_dialog'
function setGdTableData(fieldWidget) {
  const tableColumn = fieldWidget.options.tableColumn[0]?.arr.map((res) => {
    return setResObj(res)
  })
  const tableData = JSON.parse(fieldWidget.options.tableData)
  return {
    tableColumn,
    tableData
  }
}
function setResObj(res) {
  let newObj = {}
  for (let i in res) {
    if (!i.includes('compJavascript') && !i.includes('compCss') && !i.includes('compView') && !i.includes('useValue') && !i.includes('dragConfig')) {
      newObj[i] = res[i]
    }
  }
  return newObj
}
export function buildDefaultValueListFn(formConfig, widgetList, resultList, gdTableDefaultValue = []) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    const fd = fop.defaultValue
    if (isNotNull(fd)) {
      resultList.push(`${fop.name}: ${JSON.stringify(fd)},`)
    } else {
      resultList.push(`${fop.name}: null,`)
    }
    if (fieldWidget.type === 'gdTable') {
      const data = setGdTableData(fieldWidget)
      gdTableDefaultValue.push(`tableColumn${fop.name}: ${JSON.stringify(data.tableColumn)},`)
      gdTableDefaultValue.push(`tableData${fop.name}: ${JSON.stringify(data.tableData)},`)
    }
  }
}

export function buildRulesListFn(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    let fieldRules = []
    if (!!fop.required) {
      fieldRules.push(`{
        required: true,
        message: '${translate('render.hint.fieldRequired')}',
      }`)
    }

    if (!!fop.validation) {
      let vldName = fop.validation
      if (!!FormValidators[vldName]) {
        fieldRules.push(`{
          pattern: ${eval(getRegExp(vldName))},
          trigger: ['blur', 'change'],
          message: '${fop.validationHint}'
        }`)
      } else {
        fieldRules.push(`{
          pattern: '${eval(vldName)}',
          trigger: ['blur', 'change'],
          message: '${fop.validationHint}'
        }`)
      }
    }

    //TODO: ?????????????????????

    fieldRules.length > 0 && resultList.push(`${fop.name}: [${fieldRules.join(',')}],`)
  }
}

export function buildFieldOptionsFn(formConfig, widgetList, resultList, gdTableMethodList) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    const ft = fieldWidget.type
    if (ft === 'radio' || ft === 'checkbox' || ft === 'cascader') {
      resultList.push(`${fop.name}Options: ${JSON.stringify(fop.optionItems)},`)
    }
    if (ft === 'select') {
      resultList.push(`${fop.name}Options: ${fop.selectConfig.otherObj.isLine ? '[]' : JSON.stringify(fop.optionItems)},`)
    }
    if (ft === 'gdTable') {
      setTableListMethod(fop, ft, gdTableMethodList, resultList)
    }
    if (ft === 'gdDialog') {
      setDialogMethod(fop, ft, resultList)
    }
  }
}
function setMethod(options, selectConfig) {
  const { methodType, searchParams, url } = selectConfig
  let params = {}
  if (searchParams.length > 0) {
    searchParams.forEach((res) => {
      params[res.label] = res.value
    })
  }
  // debugger
  let { backData, backMethod, isLine } = selectConfig.otherObj
  const methodName = `${methodType === 'get' ? 'params' : 'data'} `
  const dataVal = methodType === 'get' ? JSON.stringify(params) : `this.qsMethod.stringify(${JSON.stringify(params)})`
  let backMethodArr = []
  if (backMethod !== '') {
    backMethod = backMethod.replace('function ', '')
    backMethodArr = backMethod.split('(')
  }
  const strData = backMethod === '' ? `this.${options.name}Options = resData.${backData}` : `this.${options.name}Options = this.${backMethodArr[0]}(resData.${backData})`
  return [
    {
      methodName: `${options.name}Method`,
      methodFun: `async ${options.name}Method(){
        const resData = await this.requestMethod({
          url: '${url}',
          method: '${methodType}',
          ${methodName}: ${dataVal}
        })
        ${strData}
     }`,
      backMethod: backMethod === '' ? '' : `${backMethod}`
    }
  ]
}
export function getWidgetData(res) {
  // debugger
  const list = ['onChange', 'onFocus', 'onBlur', 'onInput']
  let widget = []
  let setMethodData = []
  for (let i in res.options) {
    if (list.includes(i)) {
      if (res.options[i] !== '') {
        widget.push(`${i}${res.options.name}(){ ${res.options[i]}}`)
      }
    }
  }

  const eventData = storageEvent(res.options) || []
  return [...widget, ...eventData, ...setMethodData]
}
export function buildUploadDataFn(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    const ft = fieldWidget.type
    if (ft === 'picture-upload' || ft === 'file-upload') {
      resultList.push(`${fop.name}FileList: [],`)
      resultList.push(`${fop.name}UploadHeaders: {},`)
      resultList.push(`${fop.name}UploadData: {},`)
    }
  }
}
export function buildComponentsMethod(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    const backData = getWidgetData(fieldWidget)
    // debugger
    backData.forEach((res) => {
      resultList.push(res)
    })
  }
}
export function buildComponentsMethodForSearch(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    // ???????????????
    let setMethodData = []
    if (fieldWidget.options.selectConfig && fieldWidget.options.selectConfig.otherObj.isLine) {
      setMethodData = setMethod(fieldWidget.options, fieldWidget.options.selectConfig)
    }
    // debugger
    setMethodData.forEach((res) => {
      resultList.push(res)
    })
  }
}
export function buildActiveTabs(formConfig, widgetList) {
  let resultList = []
  const handlerFn = function (cw) {
    const cop = cw.options
    const ct = cw.type
    if (ct === 'tab') {
      cw.tabs.length > 0 && resultList.push(`'${cop.name}ActiveTab': '${cw.tabs[0].options.name}',`)
    }
  }
  traverseContainWidgets(widgetList, handlerFn)

  return resultList
}
export const genVueData = function (formConfig, widgetList, isGetObj) {
  let defaultValueList = []
  let gdTableDefaultValue = []
  traverseFieldWidgets(widgetList, (widget) => {
    buildDefaultValueListFn(formConfig, widgetList, defaultValueList, gdTableDefaultValue)(widget)
  })
  return defaultValueList
}
export const genVue2JS = function (formConfig, widgetList, isGetObj) {
  let defaultValueList = []
  let gdTableDefaultValue = []
  let rulesList = []
  let fieldOptions = []
  let uploadData = []
  let componetsList = []
  let searchComponentList = []
  let gdTableMethodList = []
  traverseFieldWidgets(widgetList, (widget) => {
    buildDefaultValueListFn(formConfig, widgetList, defaultValueList, gdTableDefaultValue)(widget)
    buildRulesListFn(formConfig, widgetList, rulesList)(widget)
    buildFieldOptionsFn(formConfig, widgetList, fieldOptions, gdTableMethodList)(widget)
    buildUploadDataFn(formConfig, widgetList, uploadData)(widget)
    buildComponentsMethod(formConfig, widgetList, componetsList)(widget)
    buildComponentsMethodForSearch(formConfig, widgetList, searchComponentList)(widget)
  })
  // debugger
  const activeTabs = buildActiveTabs(formConfig, widgetList)
  const methodList = setConponentsMethod(formConfig, componetsList, searchComponentList, gdTableMethodList)

  const v2JSTemplate = `${isGetObj ? '' : 'export default'} {
    data() {
      return {
        ${formConfig.modelName}: {
          ${defaultValueList.join('\n')}
        },
        
        ${formConfig.rulesName}: {
          ${rulesList.join('\n')}
        },
        ${gdTableDefaultValue.join('\n')}
        ${activeTabs.join('\n')}
        
        ${fieldOptions.join('\n')}
        
        ${uploadData.join('\n')}
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
      ${methodList.formListMounted}
    },
    methods: {
      
      submitForm() {
        this.$refs['vForm'].validate(valid => {
          if (!valid) return
          
          //TODO: ????????????
        })
      },
      resetForm() {
        this.$refs['vForm'].resetFields()
      },
      isAddItem(item) {
        const val = 'props' + item.prop + 'useValue'
        return item[val] === '1'
      },
      ${methodList.formList}
    }
  }`

  return v2JSTemplate
}

// ????????????????????????
function storageEvent(options) {
  if (options.onCustomize && options.onCustomize !== '') {
    const eventObj = JSON.parse(options.onCustomize)
    // ??????????????????
    if (eventObj.action === '') {
      return []
    }
    // ?????????????????????
    if (eventObj.action1 === 'justReset') {
      return [
        `${eventObj.action}${options.name}(){ 
        for(let i in this.formData) {
          this.$set(this.formData, i, '')
        }
       }`
      ]
    }
    // ???????????????
    if (eventObj.action1 === 'searchData') {
      return [
        `async ${eventObj.action}${options.name}(){
          this.${eventObj.action9}Method(1)
       }`
      ]
      // return [
      //   `async ${eventObj.action}${options.name}(){
      //     const resData = await this.requestMethod({
      //       url: '${eventObj.action5}',
      //       method: '${eventObj.action4}',
      //       ${methodType}: ${dataVal}
      //     })
      //     this.tableData${eventObj.action9} = resData.${eventObj.action6}
      //  }`
      // ]
    }
  } else {
    return []
  }
}

function setConponentsMethod(formConfig, widgetList, searchComponentList, gdTableMethodList) {
  let formList = []
  let formListMounted = []
  for (let i in formConfig) {
    if (i.includes('onForm')) {
      if (formConfig[i] !== '') {
        formList.push(`${i}(){ ${formConfig[i]}}`)
        formListMounted.push(`this.${i}()`)
      }
    }
  }

  // ??????????????????????????????
  setOtherMethod(formConfig, widgetList, formListMounted, formList, [...searchComponentList, ...gdTableMethodList])
  return {
    formList: [...formList, ...widgetList].join(','),
    formListMounted: formListMounted.join(';')
  }
}

function setOtherMethod(formConfig, widgetList, formListMounted, formList, searchComponentList) {
  if (searchComponentList.length > 0) {
    searchComponentList.forEach((res) => {
      formList.push(res.methodFun)
      if (!res.noMounted) {
        formListMounted.push(`this.${res.methodName}()`)
      }
      if (res.backMethod !== '') {
        formList.push(res.backMethod)
      }
      if (res.pageMethod && res.pageMethod !== '') {
        formList.push(res.pageMethod)
      }
    })
  }

  debugger
  // formListMounted.push(`this.${i}()`)
}
