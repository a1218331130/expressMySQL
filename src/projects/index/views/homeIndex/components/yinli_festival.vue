<template>
  <div class="left-col">
    <div class="item" v-for="(item, index) in dataTime" :key="index">
      <div v-if="countTime(item.time) > 0" class="title">
        距离
        <span class="text">{{ item.name }}</span>
        还有
        <span class="text">{{ countTime(item.time) }}</span>
        天
      </div>
      <!-- <div v-else class="title">
        <span class="text">{{ item.name }}已过</span>
      </div> -->
      <div class="progress" v-if="countTime(item.time) > 0">
        <div class="progress-bar">
          <div :class="`progress-bar-inner progress-bar-inner-${index}`" :style="{ width: getPer(countTime(item.time)) }"></div>
        </div>
        <div class="progress-percentage">{{ getPer(countTime(item.time)) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dataTime from './date'

export default {
  components: {},
  props: {},
  data() {
    return {
      dataTime: dataTime
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getPer(day) {
      if (day > 0) {
        const per = Math.ceil((1 - day / 366) * 100)
        return per + '%'
      } else {
        return '100%'
      }
    },
    countTime(time) {
      var newDate = new Date()
      var year = newDate.getFullYear()
      var month = newDate.getMonth() + 1
      var strDate = newDate.getDate()
      let date1 = new Date(year, month, strDate)
      let date2 = new Date(time[0], time[1], time[2])
      var date = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
      return date
    }
  }
}
</script>
<style lang="scss" scoped>
.item .progress {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.item .progress-bar {
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  background: #ebeef5;
  width: 0;
  min-width: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-right: 5px;
}
.item .progress-bar-inner-0,
.progress-bar-inner-4 {
  background: #bde6ff;
  background-image: linear-gradient(135deg, #50bfff 25%, transparent 25%, transparent 50%, #50bfff 50%, #50bfff 75%, transparent 75%, transparent 100%);
  background-size: 30px 30px;
}
.item .progress-bar-inner-1,
.progress-bar-inner-5 {
  background: #ffd980;
  background-image: linear-gradient(135deg, #f7ba2a 25%, transparent 25%, transparent 50%, #f7ba2a 50%, #f7ba2a 75%, transparent 75%, transparent 100%);
  background-size: 30px 30px;
}
.item .progress-bar-inner-2,
.progress-bar-inner-6 {
  background: #ffa9a9;
  background-image: linear-gradient(135deg, #ff4949 25%, transparent 25%, transparent 50%, #ff4949 50%, #ff4949 75%, transparent 75%, transparent 100%);
  background-size: 30px 30px;
}
.item .progress-bar-inner-3 {
  background: #67c23a;
  background-image: linear-gradient(135deg, #4f9e28 25%, transparent 25%, transparent 50%, #4f9e28 50%, #4f9e28 75%, transparent 75%, transparent 100%);
  background-size: 30px 30px;
}
.item .progress-percentage {
  color: #909399;
  font-size: 12px;
}
.item .progress-bar-inner {
  width: 0;
  height: 100%;
  border-radius: 5px;
  -webkit-transition: width 0.35s;
  transition: width 0.35s;
  -webkit-animation: progress 750ms linear infinite;
  animation: progress 750ms linear infinite;
}
.item .title .text {
  color: #fb6c28;
  font-weight: 500;
  font-size: 14px;
  margin: 0 5px;
}
.item .title {
  font-size: 12px;
  color: #909399;
  margin-bottom: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.item {
  margin-bottom: 15px;
}
</style>
