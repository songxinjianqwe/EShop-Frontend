<template>
    <div class="user-password">
        <el-input class="input" type="password" v-model="oldPaymentPassword" placeholder="请输入原支付密码,未设置可不填"></el-input>
        <el-input class="input" type="password" v-model="newPaymentPassword" placeholder="请输入现支付密码"></el-input>
        <el-button class="btn" type="success" size="large" @click="setPaymentPassword">确认设置</el-button>
        <p v-for="error in errors" :key="error">{{error.field}}:{{error.message}}</p>
    </div>
</template>

<script>
export default {
    props: ['user', 'token'],
    data() {
        return {
            oldPaymentPassword: '',
            newPaymentPassword: '',
            errors: []
        }
    },
    methods: {
        setPaymentPassword() {
            if (this.paymentPassword === '') {
                this.$message.error('支付密码不可为空');
                return
            }
            let params = {
                oldPaymentPassword: this.oldPaymentPassword,
                newPaymentPassword: this.newPaymentPassword
            }
            let header = { Authentication: this.token }
            this.axios.post(`/users/${this.user.id}/payment_password`, params, { headers: header }).then(response => {
                this.$message({
                    message: '恭喜您，支付密码设置成功',
                    type: 'success'
                });
                this.oldPaymentPassword = ''
                this.newPaymentPassword = ''
            }).catch(error => {
                throw error
                if ("response" in error) {
                    this.errors = error.response.data.fieldErrors
                }
                this.$message.error('支付密码设置失败');
                this.oldPaymentPassword = ''
                this.newPaymentPassword = ''
            })
        }
    }
}
</script>

<style scoped>
.user-password {
    margin-top: 100px;
    margin-left: 500px;
    width: 300px;
    text-align: center;
}

.btn {
    margin-top: 20px;
}

.input {
    margin-top: 20px;
}
</style>
