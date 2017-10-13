<template>
    <div class="product">
        ProductInfo Page {{$route.params.id}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: {},
            otherProducts: []
        }
    },
    methods: {
        fetchProduct() {
            let that = this
            this.axios.get("/products/" + this.$route.params.id).then(function(response) {
                console.log('产品数据加载完毕')
                that.product = response.data
                console.log(that.product)
                that.axios.get("/products/by_category/" + that.product.category.id + "/simple").then(function(response) {
                    console.log('其他产品数据加载完毕')
                    that.otherProducts = response.data
                    console.log(that.otherProducts)
                }).catch(function(error) {
                    throw error
                })
            }).catch(function(error) {
                throw error
            })
        }

    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            console.log('跳转至', to.path)
            vm.fetchProduct()
        })
    }
}
</script>

<style scoped>
.product {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
</style>

