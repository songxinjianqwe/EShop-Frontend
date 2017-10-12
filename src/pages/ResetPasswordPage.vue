<template>
    <div class="validation">
        <el-input v-if="username === '' && newPassword === ''" v-model="newPassoword" placeholder="请输入新密码"></el-input>
        <p v-if="username === ''">{{'修改密码成功,'+ username}}</p>
        <p v-else>修改密码失败</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            newPassword:''
        }
    },
    methods: {
        validate() {
            let that = this
            let id = this.$route.params.verificationId
            let code = this.$route.params.verificationCode
            let params = new URLSearchParams();
            params.append('verificationCode', code)
            params.append('password', this.newPassword)

            this.axios.put("/users/" + id + "/password", params).then(function(response) {
                that.username = response.data.username
                const h = that.$createElement;
                that.$notify({
                    title: '修改密码成功',
                    message: h('i', { style: 'color: teal' }, '下次不要在忘记密码了呦')
                })
            }).catch(function(error) {
                console.log(error)
                throw error
            })
        }
    },
    created() {
        this.validate()
    }
}
</script>

<style scoped>
.validation {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
</style>
