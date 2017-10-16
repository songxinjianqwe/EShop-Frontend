<template>
    <div class="user-page">
        <div class="left-wapper">
            <div class="avatar-mode">
                <img :src="user.avatar"></img>
            </div>
            <p class="username">{{user.username}}</p>
            <div class="left-navmenu">
                <el-col :span="30">
                    <!-- menu->router -->
                    <!-- 默认激活的是当前页面对应的menu-item -->
                    <el-menu :default-active="$route.path" theme="dark" :router="true">
                        <el-menu-item :index="'/users/'+$route.params.id+'/info'">个人信息</el-menu-item>
                        <el-menu-item :index="'/users/'+$route.params.id+'/orders'">历史订单</el-menu-item>
                        <el-submenu :index="'/users/'+$route.params.id+'/mails'">
                            <template slot="title">站内信</template>
                            <el-menu-item :index="'/users/'+$route.params.id+'/mails/receive'">收件箱</el-menu-item>
                            <el-menu-item :index="'/users/'+$route.params.id+'/mails/send'">已发送</el-menu-item>
                            <el-menu-item :index="'/users/'+$route.params.id+'/mails/post'">写邮件</el-menu-item>
                        </el-submenu>
                        <el-submenu :index="'/users/'+$route.params.id+'/pay'">
                            <template slot="title">支付</template>
                            <el-menu-item :index="'/users/'+$route.params.id+'/pay/password'">密码</el-menu-item>
                            <el-menu-item :index="'/users/'+$route.params.id+'/pay/deposit'">充值</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </div>
        </div>
        <div class="right-wapper">
            <keep-alive>
                <router-view :user="user" :copiedUser="copiedUser" :token="loginResult.token" @user-update="onUserUpdated"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            loginResult: {}
        }
    },
    methods: {
        fetchUser() {
            this.loginResult = JSON.parse(localStorage.getItem('loginResult'))
            let header = { 'Authentication': this.loginResult.token }
            let params = { 'mode': 'id' }
            this.axios.get(`/users/query/${this.$route.params.id}`, { params: params, headers: header }).then((response) => {
                this.user = response.data
                console.log(this.user)
            }).catch((error) => {
                throw error
            })
        },
        onUserUpdated(newUser) {
            console.log('父页面接收到用户更新的事件')
            this.user = newUser
        }
    },
    computed: {
        copiedUser() {
            return Object.assign({}, this.user)
        }
    },
    created() {
        this.fetchUser()
    }
}
</script>

<style scoped>
/* 当超过height时会出现滚动条 */

.user-page {
    height: 500px;
    overflow: auto;
    width: 100%;
}

.avatar-mode {
    position: relative;
    width: 150px;
    height: 150px;
    box-sizing: border-box;
    border: 4px solid #d9dde1;
    border-radius: 75px;
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
}

img {
    width: 140px;
    height: 140px;
}

.left-wapper {
    float: left;
    width: 200px;
    text-align: center;
}



.left-wapper .right-wapper .avator-wapper {
    padding: 32px 0 24px;
}

.username {
    font-size: 18px;
}
</style>

