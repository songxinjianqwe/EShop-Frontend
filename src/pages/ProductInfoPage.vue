<template>
    <div class="product">
        <div class="left-products">
            <div class="product-board">
                <img :src="product.imageUrl"></img>
                <ul>
                    <!-- 如果当前的url与某一个link的to值相同，那么该link的class被设置为active -->
                    <router-link v-for="item in otherProducts" :key="item.id" :to="{path: `/products/${item.id}`}" tag="li" active-class="active">
                        {{item.name}}
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="right-purchase">
            <order-place-form :selectedProduct="product"></order-place-form>
        </div>
    </div>
</template>

<script>
import OrderPlaceForm from '@/components/OrderPlaceForm'

export default {
    data() {
        return {
            product: {},
            otherProducts: []
        }
    },
    methods: {
        fetchProduct() {
            this.axios.get("/products/" + this.$route.params.id).then((response) => {
                console.log('产品数据加载完毕')
                this.product = response.data
                console.log(this.product)
                if (this.otherProducts.length === 0) {
                    this.fetchOtherProducts(this)
                }
            }).catch((error) => {
                throw error
            })
        },
        fetchOtherProducts() {
            this.axios.get("/products/by_category/" + this.product.category.id + "/simple").then((response) => {
                console.log('其他产品数据加载完毕')
                this.otherProducts = response.data
                console.log(this.otherProducts)
            }).catch((error) => {
                throw error
            })
        }
    },
    components: {
        OrderPlaceForm
    },
    //第一次访问时被调用
    created() {
        console.log('created called')
        this.fetchProduct()
    },
    //在/products/:id <=> 其他页面 之间跳转时被调用
    beforeRouteEnter(to, from, next) {
        next(vm => {
            console.log('beforeRouteEnter:跳转至', to.path)
            vm.fetchProduct()
        })
    },
    //在/products/1 <=> /products/2 之间跳转时被调用
    beforeRouteUpdate(to, from, next) {
        console.log('beforeRouteUpdate:跳转至', to.path)
        next()
        //必须调用next才能完成跳转，而且要先于访问this
        this.fetchProduct()
    }
}
</script>

<style scoped>
.product {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
}

.left-products {
    float: left;
    width: 240px;
    text-align: center;
}

.right-purchase {
    float: left;
    width: 300px;
    text-align: center;
    margin-left: 300px;
}

img {
    width: 240px;
    height: 135px;
}

.product-board {
    background: #fff;
}

.product-board li {
    text-align: left;
    padding: 10px 15px;
    cursor: pointer;
}

.product-board li.active,
.product-board li:hover {
    background: #4fc08d;
    color: #fff;
}

.product-board li a {
    display: block;
}
</style>

