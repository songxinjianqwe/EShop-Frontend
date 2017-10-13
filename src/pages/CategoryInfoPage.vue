<template>
    <div class="product">
        <h1>课程</h1>
        <el-card v-for="item in products.list" :key="item.id" :body-style="{ padding: '0px',width: '200px', height:'150px' }">
            <img :src="item.imageUrl" class="image">
            <div style="padding: 14px;">
                <span>{{item.name}}</span>
                <div class="bottom clearfix">
                    <router-link :to="'/products/' + item.id">
                        <el-button type="text" class="button">了解详情</el-button>
                    </router-link>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: {},
            pageNum: 1,
            pageSize: 8
        }
    },
    methods: {
        fetchProducts() {
            var that = this
            let param = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            this.axios.get("/products/by_category/" + this.$route.params.id, { params: param }).then(function(response) {
                that.products = response.data
                console.log(that.products)
            })
        }
    },
    created() {
        this.fetchProducts()
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



/* 以下均为el组件的css */

.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>

