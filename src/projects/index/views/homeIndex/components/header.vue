<template>
  <header class="page">
    <div class="header-inner">
      <nav>
        <ul id="main-menu">
          <li v-for="(item, index) in headerList" :key="index" class="menu-394" :class="index === 0 ? 'first' : ''" @click="handleToModule(item)">
            <a :style="{ background: item.bg }" name="product">
              <strong>{{ item.name }}</strong>
              {{ item.descp }}
            </a>
          </li>
          <!-- <li class="menu-395">
            <a href="/design" name="design" class="design"><strong>设计</strong>design</a>
          </li>
          <li class="menu-396 last">
            <a href="/front-end" name="front end" class="front-end"><strong>前端</strong>front end</a>
          </li> -->
        </ul>
      </nav>
    </div>
  </header>
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
      if (item.name !== '后台管理') {
        this.$router.push({ path: '/select/list', query: { id: item.id } })
      } else {
        window.open(item.url, '_self')
        //  window.open('./wfmng', '_self')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  cursor: pointer;
  text-decoration: none;
}
header.page {
  width: 100%;
  height: 89px;
  border-bottom: 1px solid #e6e6e6;
  background: #efefef;
  margin-bottom: 55px;
}
header.page .header-inner {
  position: relative;
  width: 1100px;
  height: 89px;
  margin: 0 auto;
}
h1 {
  margin-top: 0;
  font-size: 100%;
}
h1:after {
  clear: both;
  display: block;
  height: 0;
  content: '\20';
}
header.page #site-slogan {
  width: 710px;
  padding: 66px 0 0 390px;
  font-weight: normal;
  color: #111;
}
header.page #site-name {
  position: absolute;
  left: 0;
  top: 0;
  width: 79px;
  height: 80px;
  padding: 10px 0 0 11px;
  font-size: 14px;
  font-weight: normal;
  color: #fff;
  background: #333;
  z-index: 10;
}
header.page #site-name strong {
  display: block;
  margin: 0 0 1px -2px;
  font-size: 45px;
  font-weight: normal;
}
header.page nav {
  position: absolute;
  top: 0;
}
ul {
  margin: 0;
  padding: 0;
}
header.page nav li {
  float: left;
  margin-right: 3px;
}
header.page nav .product {
  background: #f55a5a;
}
header.page nav .design {
  background: #39bbd2;
}
header.page nav .front-end {
  background: #8cbf3d;
}
li {
  list-style: none;
}
header.page nav a {
  float: left;
  width: 78px;
  height: 50px;
  padding: 40px 0 0 12px;
  font-size: 14px;
  color: #fff;
  background: #333;
}
header.page nav a strong {
  display: block;
  margin-bottom: 8px;
  font-weight: normal;
}
</style>
