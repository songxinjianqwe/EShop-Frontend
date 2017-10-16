<template>
    <div>
        <p>
            <h1>{{selectedProduct.name}} </h1>
            <el-tag type="primary">{{selectedProduct.type}}</el-tag>
        </p>
        <p>{{selectedProduct.description}}</p>
        <el-form :model="orderForm" ref="orderForm" label-width="100px">
            <el-form-item label="购买数量" prop="quantity">
                <el-input-number v-model="orderForm.quantity" :min="min" @change="handleChange"></el-input-number>
            </el-form-item>
            <el-form-item label="总价" prop="totalPrice">
                <div v-if="orderForm.quantity === 1">
                    {{selectedProduct.price}}
                </div>
                <div v-else>
                    {{orderForm.totalPrice}}
                </div>
            </el-form-item>
            <el-form-item>
                <el-button size="large" type="success" @click="submitForm">购买</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="请确认订单信息" :visible.sync="orderConfirmDialogVisible">
            <order-confirm-form :order="orderForm"></order-confirm-form>
        </el-dialog>
    </div>
</template>

<script>
import OrderConfirmForm from '@/components/order/OrderConfirmForm'

export default {
    props: ['selectedProduct'],
    data() {
        return {
            min: 1,
            orderForm: {
                product: {},
                user: {},
                quantity: 1,
                totalPrice: 0
            },
            orderConfirmDialogVisible: false
        }
    },
    methods: {
        handleChange(value) {
            this.orderForm.totalPrice = this.selectedProduct.price * value
        },
        submitForm() {
            let loginResult = localStorage.getItem('loginResult')
            //未登录跳转至登录页面
            if(loginResult === null){
                this.$router.push('/login')
                return 
            }
            this.orderForm.product = this.selectedProduct
            this.orderForm.user.id = JSON.parse(loginResult).id
            if(this.orderForm.quantity === 1){
                this.orderForm.totalPrice = this.selectedProduct.price
            }
            console.log('准备提交的表单数据')
            console.log(this.orderForm)
            this.orderConfirmDialogVisible = true
        }
    },
    components: {
        OrderConfirmForm
    }
}
</script>

<style scoped>

</style>
 
