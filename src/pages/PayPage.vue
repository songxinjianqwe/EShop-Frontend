<template>
    <div class="pay">
        <el-input type="password" v-model="paymentPassword" placeholder="请输入支付密码"></el-input>
        <el-button class="btn" type="success" size="larget" @click="pay">确认支付</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            paymentPassword: ''
        }
    },
    methods: {
        pay() {
            if (this.paymentPassword === '') {
                this.$alert('请输入支付密码', '支付密码', {
                    confirmButtonText: '确定'
                });
                return
            }
            let orderId = this.$route.query.orderId
            let loginResult = JSON.parse(localStorage.getItem('loginResult'))
            let header = { 'Authentication': loginResult.token }
            let params = new URLSearchParams();
            params.append('payment_password', this.paymentPassword);
            this.axios.post(`/pay/${orderId}`, params, { headers: header }).then((response) => {
                console.log('支付成功')
                this.$message('支付成功，将跳转至用户订单页面')
                this.$router.push(`/users/${loginResult.id}/orders`)
            }).catch((error) => {
                console.log('支付失败')
                this.$message('支付失败，将跳转至主页')
                this.$router.push('/')
            })
        }
    },
    created() {
        //!字符串 会产生一个boolean值
        if (!("orderId" in this.$route.query)) {
            //地址有误，跳转回主页
            this.$message('地址有误，将跳转至主页')
            console.log('地址有误')
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.pay {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 200px;
}

.btn {
    margin-top: 20px;
}
</style>

