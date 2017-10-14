<template>
    <div class="product">
        <h1>{{category.name}}学院</h1>
        <h2>{{category.description}}</h2>
        <!-- 每行固定显示4个 -->
        <!-- 显示2行 -->
        <el-row v-for="sub in 2" :key="sub">
            <el-col :span="3" v-for="(item, index) in products.slice((sub - 1) * 4 ,sub * 4)" :key="item.id" :offset="index > 0 ? 4 : 0">
                <el-card :body-style="{ padding: '0px' }">
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
            </el-col>
        </el-row>
        <el-pagination layout="prev, pager, next" :page-count="pages" @current-change="handleCurrentChange" :current-page.sync="pageNum">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: {},
            products: [],
            pageNum: 1,
            pageSize: 8,
            pages: 1,
        }
    },
    methods: {
        fetchCategoryInfo() {
            let that = this
            this.axios.get("/products/categories/" + this.$route.params.id).then(function(response) {
                that.category = response.data
                console.log('产品类别数据加载完毕')
                console.log(that.category)
            }).catch(function(error) {
                throw error
            })
        },
        fetchProducts() {
            let that = this
            let param = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            this.axios.get("/products/by_category/" + this.$route.params.id, { params: param }).then(function(response) {
                console.log('当前页产品数据加载完毕')
                that.products = response.data.list
                that.pages = response.data.pages
                console.log(that.products)
            }).catch(function(error) {
                throw error
            })
        },
        handleCurrentChange(newPageNum) {
            this.pageNum = newPageNum
            this.fetchProducts()
        }
    },
    //当第一次访问时会先调用created，再调用beforeRouteEnter
    //如果没有定义created，那么只会调用beforeRouteEnter
    //当从其他页面跳转到当前页面时，会调用beforeRouteEnter，但不会调用created，因为只是处于inactive状态，并未被销毁
    //总之，定义一个beforeRouteEnter就足够了
    //好处时即使从其他页面跳转而来，也会被调用
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            console.log('beforeRouteEnter:跳转至',to.path)
            vm.fetchCategoryInfo()
            vm.fetchProducts()
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

