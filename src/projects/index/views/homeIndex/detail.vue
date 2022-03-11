<template>
  <div class="list_container" v-loading="loading">
    <header class="article-header">
      <h1 class="article-title" itemprop="name">{{ detailObj.title }}</h1>
      <span style="display: inline" class="archive-article-date"> 阅读数： <span>93899</span>次</span>
      <time class="archive-article-date" style="margin-left: 10px; margin-right: 10px">时间： {{ detailObj.time }}</time>
      <span style="display: inline" class="archive-article-date">
        作者： <span>{{ detailObj.author }}</span>
      </span>
    </header>
    <div class="article-entry">
      <div v-html="detailObj.detailText" v-highlight></div>
      <!-- <div>
        <ul class="post-copyright">
          <li><strong>本文作者：</strong> 前端-程卫拓</li>
          <li>
            <strong>本文链接：</strong>
            <a href="https://zhousiwei.gitee.io/2019/07/23/Hexo博客配置RSS插件/" title="Hexo博客配置RSS插件" target="_blank"
              >https://zhousiwei.gitee.io/2019/07/23/Hexo博客配置RSS插件/</a
            >
          </li>
          <li><strong>版权声明：</strong> 本博客所有文章除特别声明外，转载请注明出处！</li>
        </ul>
      </div> -->
    </div>

    <!-- <div class="list">
      <div class="list_left">
        <img :src="getImage(detailObj.descstr)" alt="" />
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
    </div> -->
  </div>
</template>

<script>
import { getList } from '@projects/manager/api/list'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
export default {
  components: {},
  props: {},
  data() {
    return {
      detailObj: {},
      loading: false
    }
  },
  computed: {
    getTagList() {
      return (list) => {
        return list === undefined ? '' : JSON.parse(list)
      }
    },
    getImage() {
      return (descstr) => {
        return descstr === undefined ? '' : require(`../../assets/${descstr}.jpeg`)
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
      this.loading = true
      getList({ parentId: this.$route.query?.id }).then((res) => {
        this.detailObj = res[0]
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0 !important;
}

.list_container .article-entry blockquote {
  padding: 15px 20px;
  margin-top: 10px;
  border-left: 5px solid #657b83;
  background: #f6f6f6;
  margin-left: 0;
  width: 100%;
}
.list_container pre {
  word-wrap: normal;
  word-break: break-all;
  white-space: pre;
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  margin-top: 0;
  margin-bottom: 20px;
  border-radius: 4px;
  z-index: 0;
  padding: 1em;
  line-height: 1.5;
  color: #ccc;
  background: #2d2d2d;
  font-size: 15px;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
}
</style>
<style lang="scss" scoped>
.list_container {
  margin: 30px;
  background: white;
  .article-header {
    border-left: 5px solid #4d4d4d;
    padding: 30px 0 15px 7.6923%;
  }
}

.article-entry ul li:before {
  content: '';
  width: 6px;
  height: 6px;
  border: 1px solid #999;
  border-radius: 10px;
  background: #aaa;
  display: inline-block;
  margin-right: 10px;
  float: left;
  margin-top: 10px;
}
.article-entry strong {
  font-weight: 700;
  color: #1a1a1a;
}
.article-entry {
  line-height: 1.8em;
  padding-right: 7.6923%;
  padding-left: 7.6923%;
  padding-bottom: 20px;
  li {
    color: #1a1a1a;
  }
}
</style>
