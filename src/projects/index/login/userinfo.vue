<template>
  <div class="user-info-wrap">
    <el-form ref="formPass" :rules="passRules" :model="formPass" label-width="100px">
      <!-- <span>设置密码强度：</span> -->
      <el-form-item label="原密码:" prop="oldPassword">
        <el-input v-model="formPass.oldPassword" size="small" show-password />
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input :placeholder="passTip" v-model="formPass.newPassword" size="small" show-password />
      </el-form-item>
      <el-form-item label="确认密码:" prop="newPassword1">
        <el-input :placeholder="passTip" v-model="formPass.newPassword1" size="small" show-password />
      </el-form-item>
      <!-- <el-form-item label="设置密码级别:">
        <span class="password">{{ remark }}</span>
      </el-form-item> -->
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmitPass">提交</el-button>
        <el-button @click="resetPass(formPass)">清空</el-button>
        <el-button v-if="backBtn" @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { setStore, getStore, clearStore } from '@modularize/util/common/store'
import { removeToken, removeRefreshToken } from '@modularize/util/common/auth'
import md5 from 'js-md5'
import { mapGetters } from 'vuex'
export default {
  data() {
    const validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        console.log(value.match(this.reg[this.passWordLevel]))
        if (value.match(this.reg[this.passWordLevel]) === null) {
          callback(new Error(this.err[this.passWordLevel]))
        }
        callback()
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formPass.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formPass: {
        oldPassword: '',
        newPassword: '',
        newPassword1: ''
      },
      passRules: {
        oldPassword: [{ required: true, message: '请输入原密码', trigger: 'change' }],
        newPassword: [{ required: true, validator: validateNewPass, trigger: 'blur' }],
        newPassword1: [{ required: true, validator: validateConfirmPass, trigger: 'blur' }]
      },
      passWordLevel: 0,
      reg: [/^[A-Za-z0-9]{1,6}$/, /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{6,}$/, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[a-zA-Z\d\W]{8,}$/],
      err: ['请输入1-6位的数字或者字母', '请输入6位及以上的数字和字母组合', '请输入8位及以上的数字和大小写字母、特殊字符组合'],
      remark: '',
      passTip: ''
    }
  },
  computed: {
    ...mapGetters(['platformObj', 'userInfo']),
    // dict() {
    //   return getStore({ name: 'dictionary' })
    // }
    backBtn() {
      return this.$route.query.backBtn
    }
  },
  created() {
    this.passWordLevel = Number(this.platformObj.passwordlevel.paramValue)
    this.passTip = this.err[this.passWordLevel]
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1)
      // window.localStorage.clear()
      // window.sessionStorage.clear()
      // removeToken()
      // removeRefreshToken()
      // window.location.href = window.origin + (process.env.PRO_NAME ? '/' + process.env.PRO_NAME : '') + '/#/login'
    },
    handleClick() {
      this.$refs.formPass.clearValidate()
      this.$refs.formInfo.clearValidate()
    },
    resetPass() {
      this.$refs.formPass.resetFields()
    },
    onSubmitPass() {
      this.$refs['formPass'].validate((valid) => {})
    }
  }
}
</script>

<style lang="scss" scope>
.user-info-wrap {
  width: 800px;
  padding: 30px;
  box-sizing: border-box;
  margin: 0 auto;
  border: 1px solid #dcdfe6;
  margin-top: -35px;
  .el-form {
    .el-form-item {
      margin-bottom: 15px;
    }
    .btn {
      text-align: center;
    }
  }
  .password {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}
</style>
