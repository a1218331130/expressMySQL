<template>
  <el-form ref="loginForm" :rules="loginRules" :model="loginForm" class="login-form" status-icon label-width="0">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名" @keyup.enter.native="handleLogin" @input="userChange">
        <svg-icon slot="prefix" icon-class="iconzhanghao" style="padding: 4px"></svg-icon>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="handleLogin" @input="passChange">
        <svg-icon slot="prefix" icon-class="iconmima" style="padding: 4px"></svg-icon>
      </el-input>
    </el-form-item>
    <el-row v-if="ifCheckCode">
      <el-col :span="12">
        <el-form-item prop="code">
          <el-input type="test" v-model="loginForm.code" placeholder="单击图片刷新" style="width: 100%"> </el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item style="margin-bottom: 0">
          <img style="width: 100%; height: 38px" class="pointer" :src="loginForm.image" @click="refreshCode" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-checkbox v-model="checked" @change="remeberUser">记住用户</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="ifHandleLogin" type="primary" size="small" class="login-submit" @click.native.prevent="handleLogin">登录 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getCaptcha } from '@/projects/index/api/login/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Userlogin',

  props: {
    ifHandleLogin: {
      type: Boolean,
      default: false
    },
    ifParCheckCode: {
      type: [String, Boolean],
      default: ''
    }
  },
  computed: {
    ...mapGetters(['platformObj', 'userInfo']),
    // 判断是否显示logo
    ifCheckCode() {
      // 这样写是为了登录页配置的时候实现预览效果
      if (this.platformObj.ifCheckCode) {
        if (this.ifParCheckCode !== '') {
          return this.ifParCheckCode
        }
        return this.platformObj.ifCheckCode
      } else {
        if (this.ifParCheckCode !== '') {
          return this.ifParCheckCode
        }
      }
    }
  },
  data() {
    const sidentify = (rule, value, callback) => {
      let newVal = value.toLowerCase()
      let identifyStr = this.identifyCode.toLowerCase()
      if (newVal === '') {
        callback(new Error('请输入验证码'))
      } else if (newVal !== identifyStr) {
        callback(new Error('验证码不正确'))
      } else {
        callback()
      }
    }
    return {
      checked: false,
      userIcon: false,
      passIcon: false,
      loginForm: {
        // 用户名
        username: '',
        // 密码
        password: '',
        // 判断是否需要校验码登录
        type: false,
        // 验证码的值
        code: '',
        // 验证码的索引
        key: '',
        // 预加载白色背景
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      },
      //缓存校验码  做前端校验
      identifyCode: '',
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [{ validator: sidentify, required: true, trigger: 'blur' }]
      },
      passwordType: 'password',
      passwordExpireTime: ''
    }
  },
  created() {
    this.loginForm.type = this.platformObj.ifCheckCode
    this.refreshCode()
    if (window.localStorage.gdLogin) {
      this.loginForm.password = JSON.parse(window.localStorage.gdLogin).pas
      this.loginForm.username = JSON.parse(window.localStorage.gdLogin).name
      this.checked = true
    } else {
      this.checked = false
    }
  },
  methods: {
    //重置验证码
    refreshCode() {
      getCaptcha().then((res) => {
        const data = res.data
        this.loginForm.key = data.key
        this.loginForm.image = data.image
        this.identifyCode = data.verCode
      })
    },
    remeberUser() {
      if (this.checked) {
        // 传入账号名，密码，和保存天数3个参数
        localStorage.setItem(
          'gdLogin',
          JSON.stringify({
            pas: this.loginForm.password,
            name: this.loginForm.username
          })
        )
      } else {
        localStorage.removeItem('gdLogin')
      }
    },
    // 记住密码
    // 设置cookie
    setCookie(name, value, day) {
      if (day !== 0) {
        // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        let curDate = new Date()
        let curTamp = curDate.getTime()
        let curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1
        let passedTamp = curTamp - curWeeHours
        let leftTamp = 24 * 60 * 60 * 1000 - passedTamp
        let leftTime = new Date()
        leftTime.setTime(leftTamp + curTamp)
        document.cookie = name + '=' + escape(value) + ';expires=' + leftTime.toGMTString()
      } else {
        document.cookie = name + '=' + escape(value)
      }
    },
    getUserInfo() {
      return new Promise((resolve) => {
        // getUserInfo(this.userInfo.user_id).then((res) => {
        //   this.$store.commit('SET_USER_INFO', { ...this.userInfo, ...res.data.data })
        //   this.passwordExpireTime = res.data.data.passwordExpireTime
        //   resolve()
        // })
      })
    },
    push(title, edit = 1) {
      if (edit) {
        this.$notify({
          title: '提示',
          message: title,
          type: 'warning',
          duration: 10000
        })
        window.location.href = window.origin + (process.env.PRO_NAME ? '/' + process.env.PRO_NAME : '') + '/#/info'
      } else {
        window.location.href = window.origin + (process.env.PRO_NAME ? '/' + process.env.PRO_NAME : '') + '/#/page-change'
      }
    },
    // 登录
    handleLogin() {
      if (this.platformObj.ifCheckCode) {
        if (this.loginForm.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
          this.$message.error('请填写正确验证码')
          this.refreshCode()
          return
        }
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '登录中,请稍后。。。',
            spinner: 'el-icon-loading'
          })
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(async (res) => {
              loading.close()
              this.remeberUser()
              await this.getUserInfo()
              // 定义limitDay天前提醒快到期，默认7天
              const limitDay = Number(this.platformObj.limitDay?.paramValue || 7)
              let intervalDay = new Date(this.passwordExpireTime).getTime() / 1000 - parseInt(new Date().getTime() / 1000)
              // 相差天数
              intervalDay = parseInt(intervalDay / 60 / 60 / 24)
              // 密码是否到期
              if (limitDay > intervalDay) {
                // 过期提醒是否强制修改密码
                if (this.platformObj.hasPasswordExpForceModify.paramValue === 'true') {
                  this.push('密码快要过期，请修改密码')
                } else {
                  const vm = this.$parent.$children.find((item) => item.$attrs.refs === 'isModifyPassword')
                  vm.handleOpen()
                }
              } else {
                this.push('', 0)
                // this.$router.push({ path: '/select' })
              }
            })
            .catch((err) => {
              loading.close()
              const status = err?.data?.code
              // 是否是第一次登陆以及是否强制修改密码
              if (status === 1010 && this.platformObj.hasForceModifyPassword.paramValue === 'true') {
                this.push(err.msg || '首次登陆，请先修改密码')
              }
              if (this.platformObj.ifCheckCode) {
                this.refreshCode()
              }
            })
        }
      })
    },
    userChange(value) {
      if (value !== '') {
        this.userIcon = true
      } else {
        this.userIcon = false
      }
    },
    passChange(value) {
      if (value !== '') {
        this.passIcon = true
      } else {
        this.passIcon = false
      }
    }
  }
}
</script>
