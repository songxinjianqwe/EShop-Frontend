<template>
    <div class="login">
        <el-form :model="loginForm" ref="loginForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" size="tiny"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" size="tiny"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captchaValue">
                <el-input v-model="loginForm.captchaValue" auto-complete="off" size="tiny"></el-input>
            </el-form-item>
            <el-form-item class="item">
                <el-button @click="fetchCaptcha">换一张</el-button>
                <img :src="'data:image/jpeg;base64,'+image"></img>
            </el-form-item>
            <el-form-item class="item">
                <el-button type="primary" @click="submitForm">登录</el-button>
                <el-button @click="resetForm">重置</el-button>
                <el-button @click="forgetPassword">忘记密码</el-button>
            </el-form-item>
            <p v-for="error in errors" :key="error">{{error.field}}:{{error.message}}</p>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                captchaValue: '',
                captchaCode: '',
                userMode: 'USERNAME'
            },
            image: '',
            errors: []
        }
    },
    methods: {
        fetchCaptcha() {
            let that = this
            this.axios.get("/captchas").then(function(response) {
                console.log(response.data)
                that.image = response.data.image
                that.loginForm.captchaCode = response.data.captchaCode
            }).catch(function(error) {
                throw error
            })
        },
        submitForm() {
            this.errorText = ''
            console.log(this.loginForm)
            let that = this
            this.axios.post("/tokens", this.loginForm).then(function(response) {
                console.log("登录成功")
                console.log(response.data)
                //清空表单
                that.resetForm()
                //发出成功提示
                const h = that.$createElement;
                that.$notify({
                    title: '登录成功',
                    message: h('i', { style: 'color: teal' }, '欢迎您，' + response.data.username)
                });
                localStorage.setItem('loginResult', JSON.stringify(response.data))
                //跳转回主页
                that.$router.push('/')
                //刷新当前页面
                window.location.reload()
            }).catch(function(error) {
                that.fetchCaptcha()
                console.log(error)
                if ("response" in error) {
                    that.errors = error.response.data.fieldErrors
                }
            })
        },
        resetForm() {
            this.$refs['loginForm'].resetFields()
        },
        forgetPassword() {
            this.resetForm()
            this.$router.push('/forget_password')
        }
    },
    created() {
        // 调用methods里的方法必须用this.
        this.fetchCaptcha()
    }
}
</script>

<style scoped>
.item {
    text-align: center
}

.login {
    width: 30%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
