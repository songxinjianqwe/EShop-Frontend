<template>
    <div>
        <el-table :data="[order]" style="width: 100%">
            <el-table-column prop="product.name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="product.type" label="类型" width="180">
            </el-table-column>
            <el-table-column prop="quantity" label="数量">
            </el-table-column>
            <el-table-column prop="totalPrice" label="总价">
            </el-table-column>
        </el-table>
        <br>
        <el-button size="large" type="success" @click="placeOrder">确认下单</el-button>
    </div>
</template>

<script>
export default {
    props: ['order'],
    data() {
        return {
        }
    },
    methods: {
        placeOrder() {
            console.log('订单详情')
            console.log(this.order)
            let token = JSON.parse(localStorage.getItem('loginResult')).token
            let header = { 'Authentication': token }
            this.axios.post("/orders", this.order, { headers: header }).then((response) => {
                console.log('下单成功')
                this.$message('下单成功')
                let orderId = response.data.id
                this.$router.push({ path: `/pay`, query: { 'orderId': orderId } })
            }).catch((error)=>{
                throw error
            })
        }
    }
}
</script>

<style scoped>

</style>
