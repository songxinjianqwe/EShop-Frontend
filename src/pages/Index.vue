<template>
    <div>
        <div class="index-wrap">
            <!-- 左侧 -->
            <div class="index-left">
                <!-- 左侧产品Block -->
                <div class="index-left-block">
                    <h2>全部产品</h2>
                    <el-tree :data="products" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
                </div>

                <!-- 左侧新闻Block -->
                <div class="index-left-block lastest-news">
                    <h2>最新消息</h2>
                    <li v-for="item in news" :key="item.id">
                        <a :href="'/news/'+item.id" class="new-item">{{ item.title }}</a>
                    </li>
                </div>
            </div>

            <!-- 右侧 -->
            <div class="index-right">
                <!-- 右侧走马灯 -->
                <div class="index-right-carousel">
                    <el-carousel height="506px">
                        <el-carousel-item v-for="item in ads" :key="item.product.id">
                            <router-link :to="'/products/'+item.product.id">
                                <img :src="item.src">
                            </router-link>
                        </el-carousel-item>
                    </el-carousel>
                </div>

                <!-- 右侧公告板 -->
                <div class="index-board-list">
                    <div class="index-board-item">

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
            imageMappings: {
                "algo.jpg": require("../assets/carousel/algo.jpg"),
                "android.jpg": require("../assets/carousel/android.jpg"),
                "react-native.jpg": require("../assets/carousel/react-native.jpg"),
                "react.jpg": require("../assets/carousel/react.jpg"),
            },
            products: [],
            defaultProps: {
                children: 'products',
                label: 'name'
            },
            news: [],
            ads: [],
            boardList: [
                {
                    title: '开放产品',
                    description: '开放产品是一款开放产品',
                    id: 'car',
                    toKey: 'analysis',
                    saleout: false
                },
                {
                    title: '品牌营销',
                    description: '品牌营销帮助你的产品更好地找到定位',
                    id: 'earth',
                    toKey: 'count',
                    saleout: false
                },
                {
                    title: '使命必达',
                    description: '使命必达快速迭代永远保持最前端的速度',
                    id: 'loud',
                    toKey: 'forecast',
                    saleout: true
                },
                {
                    title: '勇攀高峰',
                    description: '帮你勇闯高峰，到达事业的顶峰',
                    id: 'hill',
                    toKey: 'publish',
                    saleout: false
                }
            ]
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
        var that = this

        //init products
        this.axios.get("/products/categories").then(function(response) {
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

        //init ads
        this.axios.get("/ads").then(function(response) {
            console.log("读取ads")
            console.log(response.data)
            response.data.forEach(function(item) {
                console.log(that.imageMappings[item.imageSrc])
                that.ads.push({ "product": item.product, "src": that.imageMappings[item.imageSrc] })
            })
            console.log("初始化ads完毕")
            console.log(that.ads)
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

.index-board-car .index-board-item-inner {
    background: url(../assets/images/1.png) no-repeat;
}

.index-board-loud .index-board-item-inner {
    background: url(../assets/images/2.png) no-repeat;
}

.index-board-earth .index-board-item-inner {
    background: url(../assets/images/3.png) no-repeat;
}

.index-board-hill .index-board-item-inner {
    background: url(../assets/images/4.png) no-repeat;
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
    min-height: 512px;
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
    height: 506px;
    overflow: hidden;
}

.index-right-carousel img {
    width: 900px;
    height: 506px;
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
</style>