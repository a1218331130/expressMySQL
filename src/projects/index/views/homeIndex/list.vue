<template>
  <div class="content">
    <article class="article" v-for="(item, index) in blogList" :key="index">
      <div class="article-inner">
        <header class="article-header">
          <h1 class="article-title">{{ item.title }}</h1>
        </header>
        <div class="article-entry">
          <div class="archive-article-date">
            <span style="padding-right: 8px"><i class="el-icon-user"></i> {{ item.author }}</span>
            <span><i class="el-icon-date"></i> {{ item.time }}</span>
          </div>
          <ul>
            <li>博主博客地址</li>
            <li>博主使用的是hexo-theme-yilia-plus主题</li>
          </ul>
          <blockquote>
            <p>
              Gitment 是一位作者实现的一款基于 GitHub Issues 的评论系统。支持在前端直接引入，不需要任何后端代码。可以在页面进行登录、查看、评论、点赞等操作，同时有完整的
              和代码高亮支持。尤为适合各种基于 GitHub Pages 的静态博客或项目页面。
            </p>
          </blockquote>
        </div>
        <div class="article-info article-info-index">
          <div class="article-tag tagcloud">
            <ul class="article-tag-list">
              <li class="article-tag-list-item"><a href="javascript:void(0)" class="js-tag article-tag-list-link color5">Hexo</a></li>
            </ul>
          </div>
          <p class="article-more-link"><a class="article-more-a">展开全文</a></p>
          <div class="clearfix"></div>
        </div>
      </div>
    </article>
  </div>
  <!-- <div class="list_container">
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
  </div> -->
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
.article-entry h2,
.article-entry h3,
.article-entry h4,
.article-entry h5,
.article-entry h6 {
  margin-top: 20px;
  font-weight: 700;
  color: #574c4c;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
}
dd,
dl,
li,
ol,
ul {
  margin: 0;
  padding: 0;
}
.article-inner h4,
.article-inner h5,
.article-inner h6 {
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.3125;
  margin-top: 3.5em;
  margin-bottom: 1.75em;
}
blockquote,
figure,
form,
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}
li {
  list-style: none;
  color: #08c;
}
.article-category,
.article-category .article-tag-list,
.article-tag,
.article-tag .article-tag-list {
  float: left;
}
.article-category .icon,
.article-pop-out .icon-tuding,
.article-tag .icon {
  margin-right: 10px;
  margin-top: 6px;
  float: left;
  color: #999;
}
.article-tag-list .article-tag-list-item {
  float: left;
}
.tagcloud a.color5 {
  background: #7b5d5f;
}
.tagcloud a {
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
  font-size: 10px;
  color: #fff;
  height: 18px;
  line-height: 18px;
  float: left;
  padding: 0 5px 0 10px;
  position: relative;
  border-radius: 0 5px 5px 0;
  margin: 5px 9px 5px 8px;
  font-family: Menlo, Monaco, Andale Mono, lucida console, Courier New, monospace;
}
.tagcloud a.color5:before {
  border-right-color: #7b5d5f;
}

.tagcloud a:before {
  width: 0;
  height: 0;
  top: 0;
  left: -18px;
  border: 9px solid transparent;
}
.tagcloud a:after,
.tagcloud a:before {
  content: ' ';
  position: absolute;
}
.tagcloud a:after {
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 4px;
  // box-shadow: 0 0 0 1px rgb(0 0 0 / 30%);
  top: 7px;
  left: 2px;
}
.article-inner p {
  margin: 0 0 1.75em;
}

.article-more-link {
  margin-top: 0;
  text-align: left;
  float: right;
}
.article-more-link a {
  background: #4d4d4d;
  color: #fff;
  font-size: 12px;
  padding: 5px 8px;
  line-height: 16px;
  border-radius: 2px;
  transition: background 0.3s;
}
.tagcloud a:after,
.tagcloud a:before {
  content: ' ';
  position: absolute;
}
.article-entry blockquote {
  padding: 15px 20px;
  margin-top: 10px;
  border-left: 5px solid #657b83;
  background: #f6f6f6;
}
.article-info-index.article-info {
  padding-top: 20px;
  margin: 30px 7.6923% 0;
  min-height: 72px;
  border-top: 1px solid #ddd;
}
.article-entry ol,
.article-entry ul {
  font-size: 14px;
  margin: 10px 0;
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
.article-entry {
  line-height: 1.8em;
  padding-right: 7.6923%;
  padding-left: 7.6923%;
}
a {
  background: 0 0;
  text-decoration: none;
}
.archive-article-date {
  color: #999;
  text-align: center;
}
.article-inner {
  border-color: #d1d1d1;
}
.article-header {
  border-left: 5px solid #4d4d4d;
  padding: 30px 0 15px 7.6923%;
}
.article-inner h1:first-child {
  margin-bottom: 10px;
  display: inline;
  margin-top: 0;
}
.article-inner h1.article-title,
.article-title {
  color: #696969;
  margin-left: 0;
  font-weight: 300;
  line-height: 35px;
  margin-bottom: 20px;
  font-size: 26px;
  transition: color 0.3s;
}
.article {
  margin: 30px;
  border: 1px solid #ddd;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  background: #fff;
  transition: all 0.2s ease-in;
}
</style>
