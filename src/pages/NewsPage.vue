<template>
    <div class="news">
        <el-table :data="news.list" stripe style="width: 89%">
            <el-table-column prop="title" label="标题" width="200">
            </el-table-column>
            <el-table-column prop="body" label="内容" width="400" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="time" label="发布时间" width="200">
            </el-table-column>
            <el-table-column label="操作" width="150" inline-template>
                <el-button @click="detail(row)">查看详情</el-button>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align:center" layout="prev, pager, next" :page-count="pages" @current-change="handleCurrentChange" :current-page.sync="pageNum">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: [],
            pages: 1,
            pageNum: 1,
            pageSize: 5
        }
    },
    methods: {
        fetchNews() {
            let param = { pageNum: this.pageNum, pageSize: this.pageSize }
            this.axios.get('/news', { params: param }).then(response => {
                this.news = response.data
                this.pages = this.news.pages
            }).catch(error => {
                throw error
            })
        },
        handleCurrentChange(newPageNum) {
            this.pageNum = newPageNum
            this.fetchNews()
        },
        detail(row) {
            this.$router.push(`/news/${row.id}`)
        }
    },
    created() {
        this.fetchNews()
    }
}
</script>

<style scoped>
.news {
    text-align: left;
    margin-left: 200px;
}
</style>

