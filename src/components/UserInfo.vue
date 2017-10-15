<template>
    <div class="user-info">
        <el-form ref="copiedUser" :model="copiedUser" label-width="80px">
            <el-form-item label="用户名" prop="copiedUsername">
                {{copiedUser.username}}
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="copiedUser.nickname"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realName">
                <el-input v-model="copiedUser.realName"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
                <el-input v-model="copiedUser.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <!-- 默认值设置为copiedUser的 -->
                <el-radio-group v-model="copiedUser.sex">
                    <el-radio label="M">男</el-radio>
                    <el-radio label="F">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="copiedUser.email"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
                <el-date-picker v-model="copiedUser.birthday" type="date" placeholder="选择出生日期" @change="datePick">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirmUpdate">确认修改</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <p v-for="error in errors" :key="error">{{error.field}}:{{error.message}}</p>
    </div>
</template>

<script>
export default {
    props: ['user', 'copiedUser', 'token'],
    data() {
        return {
            errors: []
        }
    },
    methods: {
        confirmUpdate() {
            this.$confirm('此操作将修改用户信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.onModify()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消修改'
                });
            });
        },
        onModify() {
            console.log("待更新的表单数据")
            //调用全局函数
            console.log(this.copiedUser)
            let header = { 'Authentication': this.token }
            this.axios.put("/users", this.copiedUser, { headers: header }).then((response) => {
                console.log('更新完毕')
                this.$message({
                    type: 'success',
                    message: '更新成功!'
                });
                this.$emit('user-update', this.copiedUser)
            }).catch((error) => {
                console.log('更新失败')
                console.log(error)
                if ("response" in error) {
                    this.errors = error.response.data.fieldErrors
                }
            })
        },
        datePick(val) {
            console.log('日期变更')
            this.copiedUser.birthday = val
            console.log('新日期', this.copiedUser.birthday)
        }
    }
}
</script>

<style scoped>
.user-info {
    float: left;
    width: 300px;
    margin-left: 300px;
    text-align: center;
}
</style>
