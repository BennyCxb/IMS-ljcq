<template>
  <div class="login-wrap">
    <div class="back-index" title="返回首页">
      <a href="http://www.tzsgyc.com/">
        <img src="../../assets/logo-2.png" alt="">
      </a>
    </div>
    <div class="ms-title">“老旧工业区块改造”信息管理系统</div>
    <div class="ms-subtitle">Old City Reconstruction Information Management System</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('Login/GetUserInfo', {
            UserName: self.ruleForm.username,
            UserPwd: self.ruleForm.password,
            FProject: 2
          })
            .then(function (response) {
              let data = response.data
              // console.log(data)
              if (data.code === 1) {
                self.$cookies.set('TZOldManage', data.object, {expires: 12})
                localStorage.setItem('ms_username', self.ruleForm.username)
                self.$router.push('/home')
              } else {
                self.$alert(data.message, '温馨提示', {
                  confirmButtonText: '确定'
                })
                return false
              }
            })
            .catch(function (error) {
              // console.log(error)
              self.$alert(error.message, '温馨提示', {
                confirmButtonText: '确定'
              })
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .back-index {
    padding: 20px;
  }

  .back-index a {
    color: #fff;
    font-size: 20px;
  }

  .back-index a > img {
    height: 100px;
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -260px;
    text-align: center;
    font-size: 34px;
    color: #fff;

  }

  .ms-subtitle {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -210px;
    text-align: center;
    font-size: 18px;
    color: #fff;

  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
