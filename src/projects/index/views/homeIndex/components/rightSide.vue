<template>
  <div class="left-col">
    <section class="joe_aside__item author">
      <img src="/static/index/images/user.jpg" class="image" />
      <div class="user">
        <div class="avatar_wrapper round">
          <img class="avatar ls-is-cached lazyloaded" src="https://www.ishells.cn/upload/2021/12/fitness-2021-12-06-357732151e1e45f1bf2d5b0fa0429382.png" alt="博主头像" />
        </div>
        <a class="link" href="https://www.ishells.cn" target="_blank" rel="noopener noreferrer nofollow"> 莫沫达 </a>
        <img class="motto_day_words" height="14" src="https://v2.jinrishici.com/one.svg?font-size=146&amp;spacing=2&amp;color=grey" />
      </div>
      <div class="count">
        <div class="item" title="累计标签数 29">
          <span class="num">12</span>
          <span>标签数</span>
        </div>
        <div class="item" title="累计文章数 156">
          <span class="num">{{ count }}</span>
          <span>文章数</span>
        </div>
        <div class="item" title="累计评论数 0">
          <span class="num">0</span>
          <span>评论量</span>
        </div>
      </div>
    </section>
    <section class="joe_aside__item newest">
      <div class="joe_aside__item-title">
        <span class="text">最新文章</span>
      </div>
      <div class="joe_aside__item-contain">
        <ul class="list">
          <li class="item" v-for="(item, index) in blogList" :key="index" @click="toDetail(item)">
            <a class="link" :title="item.title">{{ item.title }}</a>
            <!-- <i class="joe-font joe-icon-link"></i> -->
          </li>
        </ul>
      </div>
    </section>
    <section class="joe_aside__item newest" style="max-height: 200px">
      <div class="joe_aside__item-title">
        <span class="text">音乐播放器</span>
      </div>
      <div class="joe_aside__item-contain" style="padding-top: 0">
        <Music></Music>
      </div>
    </section>
    <section class="joe_aside__item newest" style="max-height: 450px">
      <div class="joe_aside__item-title">
        <span class="text">节假日</span>
      </div>
      <div class="joe_aside__item-contain" style="padding-top: 0">
        <YinliFestival></YinliFestival>
      </div>
    </section>
    <section class="joe_aside__item newest" style="max-height: 340px">
      <div class="joe_aside__item-title">
        <span class="text">标签云</span>
      </div>
      <div class="joe_aside__item-contain" style="padding-top: 0">
        <TagCloud></TagCloud>
      </div>
    </section>
  </div>
</template>

<script>
import YinliFestival from './yinli_festival.vue'
import TagCloud from './tag.vue'
import Music from './music/music.vue'
import { listCount, getNewlist } from '@projects/manager/api/list'
export default {
  components: { YinliFestival, TagCloud, Music },
  props: {},
  data() {
    return {
      count: 0,
      blogList: []
    }
  },
  mounted() {
    listCount().then((res) => {
      this.count = res[0]['count(*)']
    })
    getNewlist().then((res) => {
      this.blogList = res
    })
  },
  beforeDestroy() {},
  methods: {
    toDetail(item) {
      this.$router.push({ path: '/select/detail', query: { id: item.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
.joe_aside__item {
  background: white;
}
.joe_aside__item-contain {
  position: relative;
  padding: 15px;
}
.joe_aside__item.newest .list {
  padding-top: 1px;
  padding-left: 0;
}
.joe_aside__item.newest .list .item {
  margin-bottom: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  line-height: 20px;
  cursor: pointer;
}
.joe_aside__item.newest .list .item .link {
  position: relative;
  color: #606266;
  max-width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;
}
.joe_aside__item.newest .list .item .joe-font {
  font-size: 18px;
  color: #606266;
}
.joe_aside__item.newest .list .item .link:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #fb6c28;
  -webkit-transition: all 0.35s;
  transition: all 0.35s;
}
.joe_aside__item.newest .list .item .link:hover::after {
  width: 100%;
}
.joe_aside__item.newest .list .item .link:hover {
  color: #fb6c28;
}
.joe_aside__item.newest .list .item {
  margin-bottom: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  line-height: 20px;
}
.joe_aside__item-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  color: #333;
  border-bottom: 1px solid #ebeef5;
}
.joe_aside__item.author .count {
  width: 100%;
  padding-bottom: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.joe_aside__item.author .count .item {
  position: relative;
  min-width: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #606266;
  font-size: 12px;
}
.joe_aside__item.author .count .item .num {
  max-width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  font-size: 22px;
  color: var(--title);
  margin-bottom: 3px;
}
.joe_aside__item.author .count .item:not(:last-child):after {
  position: absolute;
  top: 12px;
  right: 0;
  content: '';
  width: 1px;
  height: 30px;
  background: #ebeef5;
}
.joe_aside__item {
  position: relative;
  width: 280px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px -5px #dedede;
  overflow: hidden;
}
.joe_aside__item.author {
  background: white;
  padding: 45px 15px 15px;
  height: 250px;
  margin-top: 30px;
}

.joe_aside__item.author .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  -o-object-fit: cover;
  object-fit: cover;
  z-index: 1;
  border-radius: 8px 8px 0 0;
}
.joe_aside__item.author::before {
  content: '';
  position: absolute;
  top: 90px;
  left: 0;
  width: 100%;
  height: 30px;
  z-index: 2;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), to(#fff));
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
}
.joe_aside__item.author .user {
  position: relative;
  z-index: 4;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-bottom: 15px;
}
.joe_aside__item.author .user .avatar_wrapper {
  position: relative;
  width: 75px;
  height: 75px;
  margin-bottom: 12px;
}
.joe_aside__item.author .user .avatar_wrapper.round .avatar {
  border-radius: 6px;
}
.joe_aside__item.author .user .avatar {
  display: block;
  width: 75px;
  height: 75px;
  overflow: hidden;
  padding: 5px;
  -o-object-fit: cover;
  object-fit: cover;
  background: #ebeef5;
  -webkit-transition: -webkit-transform 0.75s;
  transition: -webkit-transform 0.75s;
  transition: transform 0.75s;
  transition: transform 0.75s, -webkit-transform 0.75s;
  border-radius: 50%;
}

.joe_container img {
  max-width: 100%;
}
img {
  border: 0;
  vertical-align: middle;
}
.joe_aside__item.author .user .link {
  color: #fb6c28;
  margin-bottom: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}
</style>
