<template>
    <div class="user-deposit">

        充值数额：
        <el-input-number :min="100" class="input" v-model="value" :step="100"></el-input-number>
        <el-button class="btn" type="success" size="large" @click="deposit">确认充值</el-button>
    </div>
</template>

<script>
export default {
    props: ['user', 'token'],
    data() {
        return {
            value: 100
        }
    },
    methods: {
        deposit() {
            let param = new URLSearchParams();
            param.append('amount', this.value)
            let header = { Authentication: this.token }
            this.axios.post(`/users/${this.user.id}/deposit`, param, { headers: header }).then(response => {
                this.$message({
                    message: '恭喜您，充值成功',
                    type: 'success'
                });
            }).catch(error => {
                this.$message.error('充值失败');
            })
        }
    }
}
</script>

<style scoped>
.user-deposit {
    margin-top: 100px;
    margin-left: 500px;
    width: 300px;
    text-align: center;
}

.btn {
    margin-top: 20px;
}

.input {
    margin-top: 20px;
}
</style>
