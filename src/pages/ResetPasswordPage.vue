<template>
    <div class="validation">
        <el-input class="input" type="password" v-model="newPassword" placeholder="请输入新密码"></el-input>
        <el-button type="primary" @click="validate">确认修改</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            newPassword: ''
        }
    },
    methods: {
        validate() {
            if (this.newPassword === '') {
                this.$alert('请输入新密码', '新密码为空', {
                    confirmButtonText: '确定'
                });
                return
            }
            let that = this
            let id = this.$route.params.validationId
            let code = this.$route.params.validationCode
            let params = { validationCode: code, password: this.newPassword }
            this.axios.put("/users/" + id + "/password", params).then(function(response) {
                that.username = response.data.username
                const h = that.$createElement;
                that.$notify({
                    title: '修改密码成功',
                    message: h('i', { style: 'color: teal' }, '下次不要在忘记密码了呦')
                })
            }).catch(function(error) {
                const h = that.$createElement;
                that.$notify({
                    title: '修改密码失败',
                    message: h('i', { style: 'color: teal' }, '请重新进行验证')
                })
                console.log(error)
                throw error
            })
        }
    }
}
</script>

<style scoped>
.validation {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 150px;
}

.input {
    margin-left: auto;
    margin-right: auto;
    width: 200px;
}
</style>
