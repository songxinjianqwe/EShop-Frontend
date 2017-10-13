<template>
    <div>
        <div class="index-wrap">
            <!-- 左侧 -->
            <div class="index-left">
                <!-- 左侧产品Block -->
                <div class="index-left-block">
                    <router-link to='/categories'>
                        <h2 class="click-h2">全部产品</h2>
                    </router-link>
                    <el-tree :data="products" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
                </div>

                <!-- 左侧新闻Block -->
                <div class="index-left-block lastest-news">
                    <router-link to='/news'>
                        <h2 class="click-h2">最新消息</h2>
                    </router-link>
                    <li v-for="item in news" :key="item.id">
                        <a :href="'/news/'+item.id" class="new-item">{{ item.title }}</a>
                    </li>
                </div>
            </div>

            <!-- 右侧 -->
            <div class="index-right">
                <!-- 右侧走马灯 -->
                <div class="index-right-carousel">
                    <el-carousel height="490px">
                        <el-carousel-item v-for="item in promotedProducts" :key="item.id">
                            <router-link :to="'/products/'+item.id">
                                <img :src="item.imageUrl">
                            </router-link>
                        </el-carousel-item>
                    </el-carousel>
                </div>

                <!-- 右侧公告板 -->
                <div class="index-board-list">
                    <div class="index-board-item" v-for="(item,index) in board" :class="[{'line-last' : index % 2 !== 0}]" :key="item.id">
                        <!-- 每块板 -->
                        <!-- 动态加载背景图片 -->
                        <div class="index-board-item-inner" :style="{background: 'url(' + item.imageUrl+' ) no-repeat'}">
                            <h2>{{ item.name }}</h2>
                            <p>{{ item.description }}</p>
                            <div class="index-board-button">
                                <!-- 跳转到产品类别页 -->
                                <router-link class="button" :to="'/categories/'+item.id">了解详情</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            products: [],
            defaultProps: {
                children: 'products',
                label: 'name'
            },
            news: [],
            promotedProducts: [],
            board: []
        }
    },
    methods: {
        handleNodeClick(node) {
            console.log(node);
            //如果是产品结点
            if ("type" in node) {
                //页面跳转到对应的产品页面
                this.$router.push("/products/" + node.id)
            }
        }
    },
    created() {
        let that = this

        //init products
        let param = {
            containsProducts: true
        }
        this.axios.get("/products/categories", { params: param }).then(function(response) {
            console.log("读取products")
            console.log(response.data)
            response.data.forEach(function(item) {
                that.products.push({ "name": item.name, "products": item.products })
            })
            console.log("初始化products完毕")
            console.log(that.products)
        }).catch(function(error) {
            throw error
        })

        //init news
        this.axios.get("/news/latest").then(function(response) {
            console.log("读取news")
            console.log(response.data)
            that.news = response.data
        }).catch(function(error) {
            throw error
        })

        //init promotedProducts
        this.axios.get("/products/on_promotion").then(function(response) {
            console.log("promotedProducts")
            that.promotedProducts = response.data
            console.log("初始化promotedProducts完毕")
            console.log(that.promotedProducts)
        }).catch(function(error) {
            throw error
        })

        //init board
        this.axios.get("/products/categories/on_board").then(function(response) {
            console.log("读取board")
            console.log(response.data)
            that.board = response.data
        }).catch(function(error) {
            throw error
        })
    }
}
</script>
<style scoped>
.index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}

.index-left {
    float: left;
    width: 300px;
    text-align: left;
}

.index-right {
    float: left;
    width: 900px;
}




/* LeftBlock */

.index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
}

.index-left-block .hr {
    margin-bottom: 20px;
}

.index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
}

.index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
}

.index-left-block ul {
    padding: 10px 15px;
}

.index-left-block li {
    padding: 5px;
}

.click-h2:hover {
    background: rgb(128, 255, 128)
}

















/* board */

.index-board-list {
    overflow: hidden;
}

.index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
}

.index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
}


.index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
}

.line-last {
    margin-right: 0;
}

.index-board-button {
    margin-top: 20px;
}

.lastest-news {
    min-height: 553px;
}

.hot-tag {
    background: red;
    color: #fff;
}

.new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


















/* 走马灯 */

.index-right-carousel {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 900px;
    height: 490px;
    overflow: hidden;
}

.index-right-carousel img {
    width: 900px;
    height: 490px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.button {
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
}

.button:hover {
    background: #4fc08d;
}
</style>