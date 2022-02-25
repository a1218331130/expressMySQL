<template>
  <div class="list_container">
    <div class="list">
      <div class="list_left">
        <img :src="getImage(detailObj.imageUrl)" alt="" />
      </div>
      <div class="list_right">
        <div class="list_title">{{ detailObj.title }}</div>
        <div class="list_tag">{{ detailObj.author }} 发表于 {{ detailObj.time }}</div>
        <div class="list_content">
          <div v-html="detailObj.detailText"></div>
        </div>
        <div class="list_footer">
          <span style="background: #f55a5a">产品</span>
          <span style="display: inline-block; margin-right: 3px; background: #409eff" v-for="(item, index) in getTagList(detailObj.tagList)" :key="index">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@projects/manager/api/list'
export default {
  components: {},
  props: {},
  data() {
    return {
      detailObj: {}
    }
  },
  computed: {
    getTagList() {
      return (list) => {
        return list === undefined ? '' : JSON.parse(list)
      }
    },
    getImage() {
      return (imageUrl) => {
        return imageUrl === undefined ? '' : require(`../../assets/${imageUrl}.jpeg`)
      }
    }
  },
  mounted() {
    this.getTableList()
  },
  watch: {
    $route(val) {}
  },
  beforeDestroy() {},
  methods: {
    getTableList() {
      getList({ parentId: this.$route.query?.id }).then((res) => {
        this.detailObj = res[0]
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
