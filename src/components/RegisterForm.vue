<template>
    <div>
        <el-form :model="registerForm" ref="registerForm" label-width="100px">
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
            var that = this
            console.log("表单数据为", this.registerForm)
            console.log("日期为", this.registerForm.birthday)
            this.axios.post("/users", this.registerForm).then(function(response) {
                console.log("注册成功")
                //清空表单
                that.resetForm()
                //发出成功提示
                const h = that.$createElement;
                that.$notify({
                    title: '注册成功',
                    message: h('i', { style: 'color: teal' }, '欢迎您加入我们，' + that.registerForm.username)
                });
                // 子组件向父组件传递消息
                that.$emit('register-success')
            }).catch(function(error) {
                if ("response" in error) {
                    that.errors = error.response.data.fieldErrors
                }
            })
        },
        datePick(val) {
            console.log('日期变更')
            this.registerForm.birthday = val
            console.log('新日期',this.registerForm.birthday)
        },
        resetForm() {
            this.$refs['registerForm'].resetFields()
        }
    }
}
</script>

<style scoped>

</style>
