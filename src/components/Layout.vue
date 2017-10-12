<template>
  <div>
    <!-- Header -->
    <div class="app-header">
      <div class="app-header-inner">
        <router-link to="/">
          <img src="../assets/logo.png"></img>
        </router-link>
        <!-- nav是navigation导航栏的简写 -->
        <div class="header-nav">
          <ul class="nav-list">
            <!-- 如果登录，那么这里会显示：用户名|退出|关于 -->
            <!-- 如果未登录，那么这里会显示：登录|注册|关于 -->
            <li v-if="isLogin"> {{ loginResult.username }}</li>
            <li v-if="isLogin" class="nav-pile">|</li>
            <li v-if="isLogin" @click="logout">退出</li>
            <li v-if="!isLogin" @click="loginDialogVisible = true">登录</li>
            <li class="nav-pile">|</li>
            <router-link v-if="!isLogin" to="/register/form">
              <li>注册</li>
            </router-link>
            <li v-if="!isLogin" class="nav-pile">|</li>
            <!-- 在@click中可以直接写表达式 -->
            <li @click="aboutDialogVisible = true">关于</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="app-content">
      <!-- 缓存 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <!-- Footer -->
    <div class="app-footer">
      <p> 2017 ESHOP </p>
    </div>

    <!-- Login Dialog -->
    <el-dialog title="登录" :visible.sync="loginDialogVisible">
      <login-form @login-success="onLoginSuccess" @forget-password="onForgetPassword"></login-form>
    </el-dialog>

    <!-- About Dialog -->
    <el-dialog title="关于" :visible.sync="aboutDialogVisible" size="small">
      <p>EShop</p><br><br>
      <p>Based On Vue.js,Vue-router,Axios,Element-ui</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="aboutDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// 公共组件都放在/components里面
// 而页面都放在/pages里面，每个Vue文件代表一个页面
// 主界面布局：Layout.vue
// 它是一个根节点，并放了根CSS，<style>不能加scoped，因为是全局共享的。

//使用一个子组件:
//Step1: import
//Step2: export default中的components加入
//Step3: 在<template>中使用组件的标签

import LoginForm from '@/components/LoginForm'

export default {
  data() {
    return {
      isLogin: false,
      loginResult: null,
      loginDialogVisible: false,
      logoutDialogVisible: false,
      aboutDialogVisible: false
    }
  },
  methods: {
    /**当登录成功时回调 */
    onLoginSuccess(loginResult) {
      console.log("输出loginResult")
      console.log(loginResult)
      localStorage.setItem('loginResult', JSON.stringify(loginResult))
      this.loginResult = loginResult
      this.isLogin = true
      this.loginDialogVisible = false
    },
    /**当退出登录时，会提示信息，并删除本地的localStorage，本地的内存数据，以及服务器的token */
    logout() {
      let that = this
      const h = this.$createElement;
      this.$notify({
        title: '退出成功',
        message: h('i', { style: 'color: teal' }, '再见，' + this.loginResult.username)
      });

      localStorage.clear('loginResult')

      console.log("删除服务器的token")
      let header = { 'Authentication': this.loginResult.token }
      this.axios.delete("/tokens", { headers: header }).then(function(response) {
        console.log(response.data)
        that.isLogin = false
        that.loginResult = null
      }).catch(function(error) {
        throw error
      })
    },
    onForgetPassword() {
      this.loginDialogVisible = false
      this.$router.push('/forget_password')
    }
  },
  //当刷新时，检查localStorage，如果有用户数据，说明仍在登录状态
  created() {
    console.log(localStorage.getItem('loginResult'))
    if (localStorage.getItem('loginResult') !== null) {
      this.isLogin = true
      this.loginResult = JSON.parse(localStorage.getItem('loginResult'))
    }
  },
  components: {
    LoginForm
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  background: #f0f2f5;
  font-size: 14px;
  color: #444;
  min-height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}


/* header */

.app-header {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}

.app-header-inner {
  width: 1200px;
  margin: 0 auto;
}

.app-header-inner img {
  width: 50px;
  margin-top: 20px;
}

.header-nav {
  float: right;
}

.header-nav ul {
  overflow: hidden;
}

.header-nav li {
  cursor: pointer;
  float: left;
}

.nav-pile {
  padding: 0 10px;
}




/* content */

.app-content {
  padding-bottom: 100px;
}




/* footer */

.app-footer {
  text-align: center;
  height: 100px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: -100px;
  position:absolute;
  bottom:0;
}

ol, ul {
  list-style: none;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
