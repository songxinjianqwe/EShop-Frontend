<template>
    <div class="forgetPassword">
        <el-input placeholder="请输入" v-model="key" class="key_input">
            <el-select v-model="mode" slot="prepend" placeholder="请选择" class="select">
                <el-option v-for="item in modes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-input>
        <el-button @click="send" type="primary" :disabled="sendMsgDisabled">
            <span v-if="sendMsgDisabled && time < 60">{{time+'秒后重新发送'}}</span>
            <span v-else>发送验证邮件</span>
        </el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: 60,
            sendMsgDisabled: false,
            key: '',
            mode: '',
            modes: [
                { label: '按用户名', value: 'username' },
                { label: '按电子邮箱', value: 'email' },
                { label: '按手机号码', value: 'phone' }]
        }
    },
    methods: {
        isButtonCanPress() {
            if (this.mode !== '' && this.key !== '') {
                return true
            }
            return false
        },
        send() {
            if (!this.isButtonCanPress()) {
                this.$alert('请先输入信息', '信息不完整', {
                    confirmButtonText: '确定'
                })
                return
            }
            let that = this;
            that.sendMsgDisabled = true
            let params = new URLSearchParams();
            params.append('mode', this.mode)
            //发送验证请求，如果没有抛出异常，那么说明发送成功
            this.axios.post("/users/" + this.key + "/password/reset_validation", params).then(function(response) {
                console.log("发送成功")
            }).catch(function(error) {
                throw error
            })
            let interval = window.setInterval(function() {
                if ((that.time--) <= 0) {
                    that.time = 60;
                    that.sendMsgDisabled = false;
                    window.clearInterval(interval);
                }
            }, 1000);
        }
    }
}
</script>

<style scoped>
.forgetPassword {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 150px;
}

.key_input {
    margin-top: 20px;
    width: 300px;
}

.select {
    width: 120px;
}
</style>
