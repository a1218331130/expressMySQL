var commonStyle = {
  commonBg: '',
  commonColor: '',
  commonSize: '',
  commonCenter: '',
  commonVer: '',
  commonWeight: '',
  commonBorderType: '',
  commonBorderWidth: ''
}
var lineOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
var barOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '直接访问',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
}
var pieOptions = {
  title: {
    text: '某站点用户访问来源',
    subtext: '纯属虚构',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
var scatterOption = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      type: 'scatter'
    }
  ]
}

var tableColumn = []
var tableData = [
  {
    name: 'sdfgsdfgssdf',
    districtName: '湛江市/廉江市'
  },
  {
    name: '0708-test-1',
    districtName: '湛江市'
  }
]
export const containers = [
  {
    type: 'grid',
    category: 'container',
    icon: 'grid',
    cols: [],
    options: {
      name: '',
      hidden: false,
      gutter: 12,
      colHeight: null, //栅格列统一高度属性，用于解决栅格列设置响应式布局浮动后被挂住的问题！！
      customClass: '' //自定义css类名
    }
  },

  {
    type: 'table',
    category: 'container',
    icon: 'table',
    rows: [],
    options: {
      name: '',
      // hidden: false,
      othersTable: '',
      cellStyle: '{}',
      ...commonStyle,
      oddBg: '',
      evenBg: '',
      customClass: '' //自定义css类名
    }
  },
  {
    type: 'gdDialog',
    category: 'container',
    commonType: 'containerPreview',
    icon: 'table',
    rows: [],
    options: {
      name: '',
      dialogConfig: {
        title: '弹框',
        width: '800px',
        height: '500px',
        showModal: true,
        zIndex: 2002,
        titleColor: '#fff',
        themeColor: 'rgb(30, 129, 241)',
        isFooter: true,
        btnFooterList: [
          { name: '主按钮', functionalStr: '', type: 'primary', functional: [{ label: '关闭弹框', value: 'closeDialog' }], method: '', config: {} },
          { name: '次按钮', functionalStr: '', type: 'primary', functional: [{ label: '关闭弹框', value: 'closeDialog' }], method: '', config: {} }
        ]
      },
      customClass: '',
      gdDialog: ''
    }
  },
  {
    type: 'gdTable',
    category: 'container',
    commonType: 'containerPreview',
    icon: 'table',
    tableType: '',
    searchId: '',
    rows: [],
    widgetList: [],
    options: {
      name: '',
      tableColumn: tableColumn,
      tableData: JSON.stringify(tableData),
      tableSearchData: [],
      otherConfig: {},
      tableConfig: {
        url: '',
        method: 'post',
        config2: '0',
        config3: '',
        config4: '',
        config5: '',
        config6: '',
        config7: '',
        config8: '',
        config9: '',
        config10: '',
        config11: '',
        config12: '',
        config13: '',
        config14: '',
        config15: '',
        config16: '',
        config17: '',
        config18: '',
        config19: '',
        config20: '',
        configMethod: 'function resetData(data) {return data}'
      },
      tableHtml: '',
      tableCss: '',
      tableJs: '',
      gdTable: ''
    }
  },
  {
    type: 'gdEchart',
    category: 'container',
    commonType: 'containerPreview',
    icon: 'table',
    echartType: 'line',
    echartName: '折线图',
    searchId: '',
    rows: [],
    options: {
      name: '',
      echartHeight: '200px',
      echartOption: JSON.stringify(lineOption),
      gdEchart: ''
    }
  },
  {
    type: 'gdEchart',
    commonType: 'containerPreview',
    category: 'container',
    icon: 'table',
    echartType: 'bar',
    echartName: '柱状图',
    searchId: '',
    rows: [],
    options: {
      name: '',
      echartHeight: '200px',
      echartOption: JSON.stringify(barOption),
      gdEchart: ''
    }
  },
  {
    type: 'gdEchart',
    commonType: 'containerPreview',
    category: 'container',
    icon: 'table',
    echartType: 'pie',
    echartName: '饼图',
    searchId: '',
    rows: [],
    options: {
      name: '',
      echartHeight: '200px',
      echartOption: JSON.stringify(pieOptions),
      gdEchart: ''
    }
  },
  {
    type: 'gdEchart',
    category: 'container',
    commonType: 'containerPreview',
    icon: 'table',
    echartType: 'scatter',
    echartName: '散点图',
    searchId: '',
    rows: [],
    options: {
      name: '',
      echartHeight: '200px',
      echartOption: JSON.stringify(scatterOption),
      gdEchart: ''
    }
  },
  {
    type: 'tab',
    category: 'container',
    icon: 'tab',
    displayType: 'border-card',
    tabs: [],
    options: {
      name: '',
      hidden: false,
      customClass: '' //自定义css类名
    }
  },

  /*
  {
    type: 'section',
    category: 'container',
    icon: 'section',
    widgetList: [],
    options: {
      name: '',
      hidden: false,
      customClass: '',  //自定义css类名
    }
  },
  */

  {
    type: 'grid-col',
    category: 'container',
    icon: 'grid-col',
    internal: true,
    widgetList: [],
    options: {
      name: '',
      hidden: false,
      span: 12,
      offset: 0,
      push: 0,
      pull: 0,
      responsive: false, //是否开启响应式布局
      md: 12,
      sm: 12,
      xs: 12,
      customClass: '' //自定义css类名
    }
  },

  {
    type: 'table-cell',
    category: 'container',
    icon: 'table-cell',
    internal: true,
    widgetList: [],
    merged: false,
    options: {
      name: '',
      cellWidth: '',
      cellHeight: '',
      colspan: 1,
      rowspan: 1,
      cellStyle: '{}',
      ...commonStyle,
      customClass: '' //自定义css类名
    }
  },

  {
    type: 'tab-pane',
    category: 'container',
    icon: 'tab-pane',
    internal: true,
    widgetList: [],
    options: {
      name: '',
      label: '',
      hidden: false,
      active: false,
      disabled: false,
      customClass: '' //自定义css类名
    }
  }

  /*
  {
    type: 'data-table',
    category: 'container',
    icon: 'data-table',
    options: {
      name: '',
      label: '',
      hidden: false,
      columns: {},
      checkboxColumn: {
        width: 45,
      },
      operationColumn: {
        buttons: [
          {label: 'Edit', name: '', type: '', plain: false, round: true, circle: false, disabled: false, hidden: false},
          {label: 'View', name: '', type: '', plain: false, round: true, circle: false, disabled: false, hidden: false},
          {label: 'Delete', name: '', type: '', plain: false, round: true, circle: false, disabled: false, hidden: false},
          {label: 'More...', name: '', type: '', plain: false, round: true, circle: false, disabled: false, hidden: false},
        ]
      },
      size: 'medium',
      height: '100%',
      maxHeight: '1200px',
      stripe: false,
      border: false,
      fit: true,
      highlightCurrentRow: false,
      emptyText: 'no data',
      showHeader: true,
      showCheckBox: true,
      showPager: false,
      pagerPosition: 'center',
      pagerSmall: false,
      pagerBackground: false,
      pagerCount: 7,
    }
  }
  */
]
export const containersEchart = containers.filter((res) => res.type === 'gdEchart')
export const basicFields = [
  {
    type: 'input',
    icon: 'text-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      type: 'text',
      // defaultValue: '',
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: true,
      readonly: false,
      disabled: false,
      hidden: false,
      clearable: true,
      showPassword: false,
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      minLength: null,
      maxLength: null,
      showWordLimit: false,
      prefixIcon: '',
      suffixIcon: '',
      appendButton: false,
      appendButtonDisabled: false,
      buttonIcon: 'el-icon-search',
      //-------------------
      onCreated: '',
      onMounted: '',
      onInput: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'textarea',
    icon: 'textarea-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      rows: 3,
      defaultValue: '',
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      minLength: null,
      maxLength: null,
      showWordLimit: false,
      //-------------------
      onCreated: '',
      onMounted: '',
      onInput: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'number',
    icon: 'number-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: 0,
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      min: -100000000000,
      max: 100000000000,
      precision: 0,
      step: 1,
      controlsPosition: 'right',
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'radio',
    icon: 'radio-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      columnWidth: '200px',
      size: '',
      displayStyle: 'inline',
      buttonStyle: false,
      border: false,
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      optionItems: [
        { label: 'radio 1', value: 1 },
        { label: 'radio 2', value: 2 },
        { label: 'radio 3', value: 3 }
      ],
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'checkbox',
    icon: 'checkbox-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: [],
      columnWidth: '200px',
      size: '',
      displayStyle: 'inline',
      buttonStyle: false,
      border: false,
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      optionItems: [
        { label: 'check 1', value: 1 },
        { label: 'check 2', value: 2 },
        { label: 'check 3', value: 3 }
      ],
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'select',
    icon: 'select-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: '',
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      clearable: true,
      filterable: false,
      allowCreate: false,
      remote: false,
      automaticDropdown: false, //自动下拉
      multiple: false,
      multipleLimit: 0,
      optionItems: [
        { label: 'select 1', value: 1 },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      selectConfig: {
        methodType: '',
        url: '',
        searchParams: [],
        otherObj: {
          backMethod: ''
        }
      },
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onRemoteQuery: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'time',
    icon: 'time-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      clearable: true,
      editable: false,
      format: 'HH:mm:ss', //时间格式
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'time-range',
    icon: 'time-range-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      startPlaceholder: '',
      endPlaceholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      clearable: true,
      editable: false,
      format: 'HH:mm:ss', //时间格式
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'date',
    icon: 'date-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      type: 'date',
      defaultValue: null,
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      clearable: true,
      editable: false,
      format: 'yyyy-MM-dd', //日期显示格式
      valueFormat: 'yyyy-MM-dd', //日期对象格式
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'date-range',
    icon: 'date-range-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      type: 'daterange',
      defaultValue: null,
      startPlaceholder: '',
      endPlaceholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      clearable: true,
      editable: false,
      format: 'yyyy-MM-dd', //日期显示格式
      valueFormat: 'yyyy-MM-dd', //日期对象格式
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'switch',
    icon: 'switch-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      columnWidth: '200px',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      switchWidth: 40,
      activeText: '',
      inactiveText: '',
      activeColor: null,
      inactiveColor: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'rate',
    icon: 'rate-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      columnWidth: '200px',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      max: 5,
      lowThreshold: 2,
      highThreshold: 4,
      allowHalf: false,
      showText: false,
      showScore: false,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'color',
    icon: 'color-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'slider',
    icon: 'slider-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      columnWidth: '200px',
      showStops: true,
      size: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      min: 0,
      max: 100,
      step: 10,
      range: false,
      //vertical: false,
      height: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'static-text',
    icon: 'static-text',
    formItemFlag: false,
    options: {
      name: '',
      columnWidth: '200px',
      hidden: false,
      textContent: 'static text',
      //-------------------
      customClass: '', //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: ''
    }
  },

  {
    type: 'html-text',
    icon: 'html-text',
    formItemFlag: false,
    options: {
      name: '',
      columnWidth: '200px',
      hidden: false,
      htmlContent: '<b>html text</b>',
      //-------------------
      customClass: '', //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: ''
    }
  },

  {
    type: 'button',
    icon: 'button',
    formItemFlag: false,
    options: {
      name: '',
      label: '',
      columnWidth: '200px',
      size: '',
      disabled: false,
      hidden: false,
      type: '',
      plain: false,
      round: false,
      circle: false,
      icon: null,
      //-------------------
      customClass: '', //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: '',
      onClick: '',
      onCustomize: ''
    }
  },

  {
    type: 'divider',
    icon: 'divider',
    formItemFlag: false,
    options: {
      name: '',
      label: '',
      columnWidth: '200px',
      direction: 'horizontal',
      contentPosition: 'center',
      hidden: false,
      //-------------------
      customClass: '', //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: ''
    }
  }

  //
]

export const advancedFields = [
  {
    type: 'picture-upload',
    icon: 'picture-upload-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      uploadURL: '',
      uploadTip: '',
      withCredentials: false,
      multipleSelect: false,
      showFileList: true,
      limit: 3,
      fileMaxSize: 5, //MB
      fileTypes: ['jpeg', 'png'],
      //headers: [],
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onBeforeUpload: '',
      onUploadSuccess: '',
      onUploadError: '',
      onValidate: ''
      //onFileChange: '',
    }
  },

  {
    type: 'file-upload',
    icon: 'file-upload-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      uploadURL: '',
      uploadTip: '',
      withCredentials: false,
      multipleSelect: false,
      showFileList: true,
      limit: 3,
      fileMaxSize: 5, //MB
      fileTypes: ['doc', 'docx', 'xls', 'xlsx'],
      //headers: [],
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onBeforeUpload: '',
      onUploadSuccess: '',
      onUploadError: '',
      onValidate: ''
      //onFileChange: '',
    }
  },

  {
    type: 'rich-editor',
    icon: 'rich-editor-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      placeholder: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      minLength: null,
      maxLength: null,
      showWordLimit: false,
      //-------------------
      onCreated: '',
      onMounted: '',
      onValidate: ''
    }
  },

  {
    type: 'cascader',
    icon: 'cascader-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      defaultValue: '',
      placeholder: '',
      size: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      clearable: true,
      filterable: false,
      optionItems: [
        { label: 'select 1', value: 1, children: [{ label: 'child 1', value: 11 }] },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  }
]

export const customFields = [
  /*
  {
    type: 'custom',
    icon: 'custom-component',
  },

  {
    type: 'slot',
    icon: 'slot-component',
  },
  */
]

export function addContainerWidgetSchema(containerSchema) {
  containers.push(containerSchema)
}

export function addBasicFieldSchema(fieldSchema) {
  basicFields.push(fieldSchema)
}

export function addAdvancedFieldSchema(fieldSchema) {
  advancedFields.push(fieldSchema)
}

export function addCustomWidgetSchema(widgetSchema) {
  customFields.push(widgetSchema)
}
