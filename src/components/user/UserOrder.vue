<template>
    <div class="user-order">
        <h2>订单查询</h2>
        <div class="query-form">
            <el-form ref="query" :model="query" label-width="100px">
                <el-form-item label="按学院" class="form-item">
                    <el-select v-model="query.categoryId">
                        <el-option key="undefined" label="不限" :value="undefined">
                        </el-option>
                        <el-option v-for="item in categoris" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="按订单状态" class="form-item">
                    <el-select v-model="query.status">
                        <el-option key="undefined" label="不限" :value="undefined">
                        </el-option>
                        <el-option v-for="item in allStatus" :key="item.value" :label="item.name" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="按下单时间" class="form-item">
                    <el-date-picker v-model="dates" type="datetimerange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>

                <el-form-item class="form-item">
                    <el-button type="primary" @click="fetchOrders">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="order-table">
            <el-table :data="orders.list" stripe style="width: 95%">
                <el-table-column prop="id" label="订单号" width="100">
                </el-table-column>
                <el-table-column prop="product.name" label="产品" width="180">
                    <template scope="props">
                        <router-link :to="'/products' + props.row.product.id">
                        {{props.row.product.name}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="quantity" label="数量" width="100">
                </el-table-column>
                <el-table-column prop="placeTime" label="下单时间" width="200">
                </el-table-column>
                <el-table-column prop="totalPrice" label="总价" width="100">
                </el-table-column>
                <el-table-column prop="orderStatus" label="订单状态" width="100">
                </el-table-column>
                <el-table-column label="操作" width="80" inline-template>
                    <!-- 参数名必须为row -->
                    <el-button :disabled="row.orderStatus !== 'UNPAID'" @click="pay(row)">支付</el-button>
                </el-table-column>
                <el-table-column label="操作" width="80" inline-template>
                    <el-button :disabled="row.orderStatus !== 'UNPAID'" @click="cancel(row)">取消</el-button>
                </el-table-column>
            </el-table>
            <el-pagination style="text-align:center" layout="prev, pager, next" :page-count="pages" @current-change="handleCurrentChange" :current-page.sync="query.pageNum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user', 'token'],
    data() {
        return {
            orders: {},
            pages: 1,
            query: {
                userId: 0,
                pageNum: 1,
                categoryId: undefined,
                status: undefined,
                begin: undefined,
                end: undefined
            },
            categoris: [],
            allStatus: [
                { name: '未付款', value: 'UNPAID' },
                { name: '已付款', value: 'PAID' },
                { name: '超时', value: 'TIME_OUT' },
                { name: '已取消', value: 'CANCELED' },
            ],
            dates: [],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    methods: {
        fetchOrders() {
            let header = { Authentication: this.token }
            console.log(this.dates)
            if (this.dates.length !== 0) {
                this.query.begin = this.formatDate(this.dates[0], this.DEFAULT_DATE_TIME_FORMAT)
                this.query.end = this.formatDate(this.dates[1], this.DEFAULT_DATE_TIME_FORMAT)
            }
            this.query.userId = this.user.id
            console.log('查询条件')
            console.log(this.query)
            this.axios.post("/orders/condition", this.query, { headers: header }).then((response) => {
                console.log(response.data)
                this.orders = response.data
                this.pages = response.data.pages
            }).catch((error) => {
                throw error
            })
        },
        handleCurrentChange(newPageNum) {
            this.query.pageNum = newPageNum
            this.fetchOrders()
        },
        fetchCategories() {
            this.axios.get("/products/categories").then((response) => {
                this.categoris = response.data
            }).catch((error) => {
                throw error
            })
        },
        //跳转至支付页面
        pay(row) {
            console.log('点击了', row, '行')
            this.$router.push({ path: `/pay`, query: { 'orderId': row.id } })
        },
        //取消订单
        cancel(row) {
            console.log('点击了', row, '行')
            this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let header = { 'Authentication': this.token }
                this.axios.put(`/orders/cancel/${row.id}`, null, { headers: header }).then((response) => {
                    console.log(response.data)
                    console.log('取消成功')
                    this.$message({
                        type: 'success',
                        message: '取消成功!'
                    });
                    //重新加载所有订单信息
                    this.fetchOrders()
                }).catch((error) => {
                    this.$message.error('取消失败!');
                    throw error
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已放弃取消订单'
                });
            });

        }
    },
    created() {
        this.fetchCategories()
        this.fetchOrders()
    }
}
</script>

<style scoped>
.user-order {
    margin-left: 250px;
}

.query-form {
    margin-left: 300px;
    width: 300px;
}

.form-item {
    height: 50px;
}

.order-table {
    text-align: left;
}
</style>
