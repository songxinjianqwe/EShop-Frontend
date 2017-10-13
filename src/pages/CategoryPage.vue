<template>
    <div class="category">
        <h1>学院们</h1>
        <el-row v-for="sub in row" :key="sub">
            <!-- 每行固定显示4个 -->
            <!-- 显示 共个数/4行 -->
            <el-col :span="3" v-for="(item, index) in categories.slice((sub - 1) * 4 ,sub * 4)" :key="item.id" :offset="index > 0 ? 4 : 0">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="item.imageUrl" class="image">
                    <div style="padding: 14px;">
                        <span>{{item.name}}学院</span>
                        <div class="bottom clearfix">
                            <router-link :to="'/categories/' + item.id">
                                <el-button type="text" class="button">了解详情</el-button>
                            </router-link>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
            row: 1
        }
    },
    methods: {
        fetchCategories() {
            var that = this
            this.axios.get("/products/categories").then(function(response) {
                that.categories = response.data
                that.row = that.categories.length % 4 === 0 ? that.categories.length / 4 : that.categories.length / 4 + 1
                console.log(that.categories)
            })
        }
    },
    created() {
        this.fetchCategories()
    }
}
</script>

<style scoped>
.category {
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

