<template>
  <div class="list_container">
    <div v-for="(item, index) in blogList" :key="index" class="list">
      <div class="list_left">
        <img :src="require(`../../assets/${item.imageUrl}.jpeg`)" alt="" />
      </div>
      <div class="list_right">
        <div class="list_title" @click="toDetail(item)">{{ item.title }}</div>
        <div class="list_tag">{{ item.author }} 发表于 {{ item.time }}</div>
        <div class="list_content">
          <div style="margin-bottom: 15px" v-for="(item, index) in getContentList(item.contentList)" :key="index">
            {{ item.name }}
          </div>
        </div>
        <div class="list_footer">
          <span style="cursor: pointer" @click="toDetail(item)">阅读全文</span>
          <span style="background: #f55a5a">产品</span>
          <span style="display: inline-block; margin-right: 3px; background: #409eff" v-for="(item, index) in getTagList(item.tagList)" :key="index">{{ item.name }}</span>
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
      blogList: []
    }
  },
  computed: {
    getTagList() {
      return (list) => {
        return JSON.parse(list)
      }
    },
    getContentList() {
      return (list) => {
        return JSON.parse(list)
      }
    }
  },
  mounted() {
    this.getTableList()
  },
  watch: {
    $route(val) {
      this.getTableList()
    }
  },
  beforeDestroy() {},
  methods: {
    toDetail(item) {
      this.$router.push({ path: '/select/detail', query: { id: item.id } })
    },
    getTableList() {
      getList({ parentId: this.$route.query?.id || '1' }).then((res) => {
        this.blogList = res
      })
    }
  }
}
</script>
<style lang="scss">
.list {
  padding-bottom: 60px;
  display: flex;
  .list_left {
    width: 106px;
    img {
      width: 60px;
      border-radius: 12px;
      margin-left: 18px;
    }
  }
  .list_right {
    flex: 1;
    .list_title {
      font-size: 24px;
      font-weight: normal;
      letter-spacing: 0.01em;
      color: #333;
      margin-bottom: 12px;
      cursor: pointer;
    }
    .list_tag {
      margin-bottom: 20px;
      color: #9f9f9f;
      font-size: 12px;
    }
    .list_content {
      color: #333;
      font-size: 14px;
      line-height: 1.8;
      margin-bottom: 15px;
    }
    .list_footer {
      height: 30px;
      font-size: 14px;
      span {
        padding: 5px 15px;
        color: #fff;
        background: #333;
      }
    }
  }
}
</style>
