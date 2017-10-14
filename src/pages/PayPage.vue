<template>
    <div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            status: ''
        }
    },
    methods: {
        pay() {
            let orderId = this.$route.query.orderId
            if(orderId === undefined){
                this.status = '支付失败'
                return 
            }
            let token = JSON.parse(localStorage.getItem('loginResult')).token
            let header = { 'Authentication': token }
            let that = this
            this.axios.post(`/pay/${orderId}`,{headers: header}).then(function(response){
                console.log('支付成功')
            }).catch(function(error){
                console.log('支付失败')
            })
        }
    },
    created() {
        this.pay()
    }
}
</script>

<style scoped>

</style>

