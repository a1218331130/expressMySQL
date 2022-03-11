<template>
  <div class="left-col">
    <div class="overlay" style="background: url(/static/index/images/biubiubiu.gif) no-repeat"></div>
    <div class="intrude-less">
      <header id="header" class="inner">
        <a href="/" class="profilepic"><img src="/static/index/images/head.jpg" class="js-avatar" /></a>
        <hgroup>
          <h1 class="header-author"><a href="/">前端-程卫拓</a></h1>
        </hgroup>
        <nav class="header-menu">
          <ul>
            <li v-for="(item, index) in headerList" :key="index" @click="handleToModule(item)">
              <a>
                {{ item.name }}
                <!-- {{ item.descp }} -->
              </a>
            </li>
            <!-- <li><a href="/" target="_blank">主页</a></li>
            <li><a href="https://zhousiwei.gitee.io/ibooks/" target="_blank">技术笔记</a></li>
            <li><a href="https://zhousiwei.gitee.io/cv/" target="_blank">个人简历</a></li>
            <li><a href="/anires/index.html" target="_blank">动态简历</a></li>
            <li><a href="/tags/Java/" target="_blank">Java</a></li>
            <li><a href="/tags/Linux/" target="_blank">Linux</a></li> -->
          </ul>
        </nav>
        <nav class="header-smart-menu">
          <a q-on="click: openSlider(e, 'innerArchive')" href="javascript:void(0)">所有文章</a> <a q-on="click: openSlider(e, 'friends')" href="javascript:void(0)">友链</a>
          <a q-on="click: openSlider(e, 'aboutme')" href="javascript:void(0)">关于我</a>
        </nav>
        <!-- <nav class="header-nav">
          <div class="social">
            <a class="github" target="_blank" href="https://github.com/JoeyBling" title="github"><i class="icon-github"></i></a
            ><a class="gitee" target="_blank" href="https://gitee.com/zhousiwei" title="gitee"><i class="icon-gitee"></i></a
            ><a class="jianshu" target="_blank" href="https://www.jianshu.com/u/02cbf31a043a" title="jianshu"><i class="icon-jianshu"></i></a
            ><a class="csdn" target="_blank" href="https://blog.csdn.net/qq_30930805" title="csdn"><i class="icon-csdn"></i></a
            ><a class="zhihu" target="_blank" href="https://zhihu.com/people/joeybling" title="zhihu"><i class="icon-zhihu"></i></a
            ><a class="qq" target="_blank" href="/img/2434387555.jpg" title="qq"><i class="icon-qq"></i></a
            ><a class="weixin" target="_blank" href="/img/weixin_.png" title="weixin"><i class="icon-weixin"></i></a
            ><a class="weibo" target="_blank" href="http://weibo.com/jayinfo" title="weibo"><i class="icon-weibo"></i></a>
          </div>
        </nav> -->
      </header>
    </div>
  </div>
  <!-- <header class="page">
    <div class="header-inner">
      <nav>
        <ul id="main-menu">
          <li v-for="(item, index) in headerList" :key="index" class="menu-394" :class="index === 0 ? 'first' : ''" @click="handleToModule(item)">
            <a :style="{ background: item.bg }" name="product">
              <strong>{{ item.name }}</strong>
              {{ item.descp }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header> -->
</template>

<script>
import { getHeaderData } from '@index/api/header'
export default {
  components: {},
  props: {},
  data() {
    return {
      headerList: []
    }
  },
  mounted() {
    this.getHeaderDataList()
  },
  beforeDestroy() {},
  methods: {
    getHeaderDataList() {
      getHeaderData({ name: '' }).then((res) => {
        this.headerList = res || []
      })
    },
    handleToModule(item) {
      if (item.descp === 'form design') {
        window.open('/#/formSign', '_blank')
        // this.$router.push({ path: '/formSign' })
        return
      }
      if (item.name !== '后台管理' && item.name !== '组件库') {
        this.$router.push({ path: '/select/list', query: { id: item.id } })
      } else {
        window.open(item.url, '_blank')
        //  window.open('./wfmng', '_self')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.left-col #header .header-menu li {
  cursor: default;
}
li,
ul {
  margin: 0;
  padding: 0;
}
.left-col #header .header-menu li a {
  font-size: 14px;
  min-width: 300px;
}
.left-col #header .header-menu {
  font-weight: 300;
  line-height: 31px;
  float: none;
  min-height: 150px;
  margin-left: -12px;
  -webkit-box-pack: center;
  -webkit-box-align: center;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
.left-col #header .header-smart-menu {
  font-size: 12px;
  margin-bottom: 20px;
}
.left-col #header .header-smart-menu a:after {
  content: ' / ';
}
.left-col #header .header-smart-menu a:last-child:after {
  content: '';
}
#header .header-nav {
  width: 100%;
  position: absolute;
  transition: -webkit-transform 0.3s ease-in;
  transition: transform 0.3s ease-in;
  transition: transform 0.3s ease-in, -webkit-transform 0.3s ease-in;
}
#header .header-nav .social {
  margin-top: 10px;
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
#header .header-nav .social a.github {
  background: #afb6ca;
  border: 1px solid #afb6ca;
}
#header .header-nav .social a {
  border-radius: 50%;
  display: -moz-inline-stack;
  display: inline-block;
  vertical-align: middle;
  zoom: 1;
  margin: 0 8px 15px;
  transition: 0.3s;
  text-align: center;
  color: #fff;
  opacity: 0.7;
  width: 28px;
  height: 28px;
  line-height: 26px;
}
.left-col #header .header-author {
  text-align: center;
  margin: 20px 0;
  font-family: Roboto, serif;
  font-size: 30px;
  transition: 0.3s;
}
.left-col .overlay {
  width: 300px;
  height: 180px;
  position: absolute;
  background: #4d4d4d;
  top: 0;
}
.left-col .intrude-less {
  width: 76%;
  text-align: center;
  margin: 112px auto 0;
}
.left-col #header {
  width: 100%;
  height: 300px;
  position: relative;
  border-bottom: 1px solid color-border;
}
.left-col #header .profilepic {
  border: 5px solid #fff;
  border-radius: 300px;
  width: 128px;
  height: 128px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background: #88acdb;
  -webkit-transition: all 0.2s ease-in;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  text-align: center;
}
.left-col #header .profilepic img {
  border-radius: 300px;
  opacity: 1;
  -webkit-transition: all 0.2s ease-in;
}
img {
  border: 0;
  vertical-align: middle;
  max-width: 100%;
}
.left-col #header a {
  color: #696969;
}
.left-col #header a:hover {
  cursor: pointer;
  color: #fb6c28;
}
</style>
