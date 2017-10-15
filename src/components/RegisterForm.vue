<template>
    <div class="register">
        <el-form :model="registerForm" ref="registerForm" label-width="100px">
            <!-- prop:表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username" size="tiny"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" auto-complete="off" size="tiny"></el-input>
            </el-form-item>

            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="registerForm.nickname" size="tiny"></el-input>
            </el-form-item>

            <el-form-item label="真实姓名" prop="realName">
                <el-input v-model="registerForm.realName" size="tiny"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="registerForm.sex">
                    <el-radio label="M">男</el-radio>
                    <el-radio label="F">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerForm.email" size="tiny"></el-input>
            </el-form-item>

            <el-form-item label="联系方式" prop="phone">
                <el-input v-model="registerForm.phone" size="tiny"></el-input>
            </el-form-item>

            <el-form-item label="出生日期" prop="birthday">
                <el-date-picker v-model="registerForm.birthday" type="date" placeholder="选择出生日期" @change="datePick">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm">注册</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
            <p v-for="error in errors" :key="error">{{error.field}}:{{error.message}}</p>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            registerForm: {
                username: '',
                password: '',
                nickname: '',
                realName: '',
                sex: '',
                email: '',
                phone: '',
                birthday: ''
            },
            errors: []
        }
    },
    methods: {
        submitForm() {
            console.log("表单数据为", this.registerForm)
            console.log("日期为", this.registerForm.birthday)
            this.axios.post("/users", this.registerForm).then((response) => {
                console.log("注册成功,用户Id为", response.data.id)
                //清空表单
                this.resetForm()
                let id = response.data.id
                //注意,${id}会被替换为值
                //路由传值有两种方式：一种是path中插值，比如下面这行
                //注意不是字符串，使用`框起来的
                //另一种是带request param
                //this.$router.push({path:"",query:{key:value}})
                this.$router.push({ path: `/register/activate/${id}` })
            }).catch((error) => {
                console.log(error)
                if ("response" in error) {
                    this.errors = error.response.data.fieldErrors
                }
            })
        },
        datePick(val) {
            console.log('日期变更')
            this.registerForm.birthday = val
            console.log('新日期', this.registerForm.birthday)
        },
        resetForm() {
            this.$refs['registerForm'].resetFields()
        }
    }
}
</script>

<style scoped>
.register {
    width: 30%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
