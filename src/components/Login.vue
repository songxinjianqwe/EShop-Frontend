<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <!-- 当Enter键按下时，会调用onKeyDown方法 -->
        <!-- <input type="text" v-on:keydown.enter="onKeyDown" placeholder="Input"></input> -->
        <!-- <el-button @click="sayHello">ElementUI Button</el-button><br> -->
        <el-form :model="loginForm" ref="loginForm" label-width="100px" class="loginForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captchaValue">
                <el-input v-model="loginForm.captchaValue" auto-complete="off"></el-input>
            </el-form-item>
            <el-button @click="fetchCaptcha">换一张</el-button>
            <img :src="'data:image/jpeg;base64,'+image"></img><br>
            <el-form-item>
                <el-button type="primary" @click="submitForm">登录</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
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
            msg: 'Hello World',
            image: '',
            token: ''
        }
    },
    methods: {
        fetchCaptcha() {
            var that = this
            this.axios.get("/captchas").then(function(response) {
                console.log(response.data)
                that.image = response.data.image
                that.loginForm.captchaCode = response.data.captchaCode
            }).catch(function(error) {
                throw error
            })
        },
        submitForm() {
            console.log(this.loginForm)
            var that = this
            this.axios.post("/tokens", this.loginForm).then(function(response) {
                that.token = response.data
                console.log(that.token)
            }).catch(function(error) {
                throw error
            })
        },
        resetForm() {
            this.$refs['loginForm'].resetFields()
        }
    },
    mounted() {
        // 调用methods里的方法必须用this.
        this.fetchCaptcha()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
