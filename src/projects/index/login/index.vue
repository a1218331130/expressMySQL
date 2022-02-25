<template>
  <div class="login-wrap">
    <el-carousel class="login-bg" height="100%">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <img :src="item.dictKey" />
      </el-carousel-item>
    </el-carousel>
    <div class="content-box">
      <div class="title-content">
        <div class="loginTitle">
          <img v-if="loginObj.ifLogo" :src="loginObj.logo" alt="" />
          <div class="loginTitleRight">
            <div class="loginTitleText">
              {{ loginObj.chName }}
            </div>
            <div class="loginTitleEng">
              {{ loginObj.enName }}
            </div>
          </div>
        </div>
        <div class="desc" v-if="ifSysMsg">
          {{ loginObjParent.sysMessage || loginObj.sysMessage }}
        </div>
      </div>
      <div class="user-box">
        <div class="title">用户登录</div>
        <userLogin :if-handle-login="loginObjParent.ifHandleLogin" :ifParCheckCode="loginObjParent.ifParCheckCode" />
      </div>
    </div>
    <isModifyPassword refs="isModifyPassword"></isModifyPassword>
  </div>
</template>
<script>
import userLogin from './userLogin'
import { mapGetters } from 'vuex'
export default {
  components: {
    userLogin,
    isModifyPassword: () => import('./isModifyPassword.vue')
  },
  computed: {
    ...mapGetters(['platformObj']),
    //图片
    imgList() {
      if (this.platformObj.imgList) {
        if (this.loginObjParent.imgList.length != 0) {
          return this.loginObjParent.imgList
        }
        return this.platformObj.imgList
      } else {
        if (this.loginObjParent.imgList.length != 0) {
          return this.loginObjParent.imgList
        }
      }
    },
    // 判断是否显示系统简介
    ifSysMsg() {
      // 这样写是为了登录页配置的时候实现预览效果
      if (this.platformObj.ifSysMsg) {
        if (this.loginObjParent.ifSysMsg != undefined) {
          return this.loginObjParent.ifSysMsg
        }
        return this.platformObj.ifSysMsg
      } else {
        if (this.loginObjParent.ifSysMsg != undefined) {
          return this.loginObjParent.ifSysMsg
        }
      }
    },
    // 拿到缓存数据赋值
    loginObj() {
      return {
        // 是否显示logo
        ifLogo: this.platformObj.ifLogo,
        // logo
        logo: this.platformObj.logo,
        // 背景图片
        imgList: this.platformObj.imgList,
        // 是否显示简介
        ifSysMsg: this.platformObj.ifSysMsg,
        // 中文名
        chName: this.platformObj.chName,
        // 英文名
        enName: this.platformObj.enName,
        // 系统简介
        sysMessage: this.platformObj.sysMessage
      }
    }
  },
  props: {
    loginObjParent: {
      type: Object,
      default: () => {
        return {
          // 背景图
          imgList: [],
          // 参数 控制是否可以点击登录按钮 默认是可以登录
          ifHandleLogin: false,
          // 登录页描述
          sysMessage: '',
          //控制 是否需要验证码 登录
          ifParCheckCode: ''
        }
      }
    }
  },
  data() {
    return {
      socialForm: {
        source: '',
        code: '',
        state: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
@import './css/login_font.scss';
.login-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  .login-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content-box {
    position: absolute;
    display: flex;
    top: 15%;
    left: calc(50% - 650px);
    z-index: 2;
    .title-content {
      .loginTitle {
        img {
          height: 93px;
          margin-right: 10px;
          position: relative;
          top: -31px;
        }
        .loginTitleBorder {
          display: inline-block;
          width: 8px;
          height: 139px;
          background: #ffffff;
          box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.3);
        }
        .loginTitleRight {
          display: inline-block;
          position: relative;
          top: -35px;
          left: 10px;
          .loginTitleText {
            display: inline-block;
            height: 72px;
            font-size: 46px;
            font-family: hkxzy;
            color: #ffffff;
            line-height: 72px;
            letter-spacing: 6px;
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
          }
          .loginTitleEng {
            display: block;
            height: 41px;
            font-size: 24px;
            font-family: HelveticaNeue;
            color: #ffffff;
            line-height: 41px;
            letter-spacing: -0.5px;
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.32);
          }
        }
      }

      .desc {
        width: 747px;
        text-indent: 2em;
        padding-left: 5px;
        background: linear-gradient(90deg, rgba(0, 19, 40, 0.4) 0%, rgba(0, 19, 40, 0.3) 100%);
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 32px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        padding: 15px;
        position: relative;
        top: 50px;
      }
    }
    .user-box {
      padding: 29px 32px 26px 32px;
      position: relative;
      left: 11%;
      top: 160px;
      width: 360px;
      // height: 380px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 4px;
      box-sizing: border-box;
      .title {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #2a303c;
        margin-bottom: 23px;
      }
      .login-submit {
        width: 100%;
        height: 48px;
        background: #0172fc;
        box-shadow: 0px 8px 16px 0px rgba(1, 114, 252, 0.2);
        border-radius: 4px;
      }
    }
  }
}
</style>
