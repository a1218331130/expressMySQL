<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList">
    <div :key="widget.id" class="table-container-gd" :class="[selected ? 'selected' : '', customClass]" @click.stop="selectWidget(widget)">
      <table
        class="table-layout"
        :style="{
          width: widget.options.cellWidth + '!important' || '',
          height: widget.options.cellHeight + '!important' || '',
          ...tdStyle(widget.options)
        }"
      >
        <tbody>
          <tr v-for="(row, rowIdx) in widget.rows" :key="row.id">
            <template v-for="(colWidget, colIdx) in row.cols">
              <table-cell-widget
                v-if="!colWidget.merged"
                :odd-even-bg="colIdx % 2 === 0 ? widget.options.oddBg : widget.options.evenBg"
                :widget="colWidget"
                :widget-table="widget.options"
                :designer="designer"
                :key="colWidget.id"
                :parent-list="widget.cols"
                :row-index="rowIdx"
                :row-length="widget.rows.length"
                :col-index="colIdx"
                :col-length="row.cols.length"
                :col-array="row.cols"
                :row-array="widget.rows"
                :parent-widget="widget"
              ></table-cell-widget>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </container-wrapper>
</template>

<script>
import i18n from '../../../../utils/i18n'
import containerMixin from './containerMixin'
import ContainerWrapper from './container-wrapper'
import TableCellWidget from './table-cell-widget'

export default {
  name: 'table-widget',
  componentName: 'ContainerWidget',
  mixins: [i18n, containerMixin],
  components: {
    ContainerWrapper,
    TableCellWidget
  },
  props: {
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object
  },
  computed: {
    selected() {
      return this.widget.id === this.designer.selectedId
    },

    customClass() {
      return this.widget.options.customClass || ''
    }
  },
  watch: {
    //
  },
  mounted() {
    //
  },
  methods: {
    tdStyle(option) {
      let strArr = option.cellStyle.replace(/\n/g, '').replace('{', '').replace('}', '').replace(/\r\n/g, '').replace(/\s/g, '').split(';')
      let newObj = {}
      strArr.forEach((element) => {
        if (element !== '') {
          const label = this.setNewStyle(element)[0]
          const val = this.setNewStyle(element)[1]
          newObj[label] = val
        }
      })
      return newObj
    },
    setNewStyle(arr) {
      const newArr = arr.split(':')
      return newArr
    }
  }
}
</script>

<style lang="scss" scoped>
$--color-primary: #409eff;
.table-container-gd {
  padding: 5px;
  // border: 1px dashed #336699;
  box-sizing: border-box;

  table.table-layout {
    width: 100%;
    text-align: center;
    //border: 1px solid #c8ebfb;
    border-collapse: collapse;
    table-layout: fixed;

    td {
      height: 36px;
      border: 1px solid #e5e5e5;
      padding: 3px;
      display: table-cell;
    }

    .form-widget-list {
      border: 1px dashed #336699;
      min-height: 36px;
    }
  }
}

.table-container.selected {
  outline: 2px solid $--color-primary !important;
}
</style>
