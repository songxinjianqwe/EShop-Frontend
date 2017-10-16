<template>
    <div class="news">
        <el-table :data="[news]" stripe style="width: 79%">
            <el-table-column type="expand">
                <template scope="props">
                    {{props.row.body}}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="200">
            </el-table-column>
            <el-table-column prop="body" label="内容" width="400" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="time" label="发布时间" width="200">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: {}
        }
    },
    methods: {
        fetchNews() {
            this.axios.get(`/news/${this.$route.params.id}`).then(response => {
                this.news = response.data
                console.log(this.news)
            })
        }
    },
    created() {
        this.fetchNews()
    },
    //在/products/:id <=> 其他页面 之间跳转时被调用
    beforeRouteEnter(to, from, next) {
        next(vm => {
            console.log('beforeRouteEnter:跳转至', to.path)
            vm.fetchNews()
        })
    },
}
</script>

<style scoped>
.news {
    text-align: left;
    margin-left: 200px;
}
</style>

