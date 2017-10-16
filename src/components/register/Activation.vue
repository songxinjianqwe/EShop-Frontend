<template>
    <div class="activation">
        <el-button @click="send" type="primary" :disabled="sendMsgDisabled" class="activation">
            <span v-if="sendMsgDisabled && time < 60">{{time+'秒后重新发送'}}</span>
            <span v-else>发送激活邮件</span>
        </el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: 60,
            sendMsgDisabled: true
        }
    },
    methods: {
        checkIdIsValid() {
            console.log('checking...')
            let id = this.$route.params.id
            if (!isNaN(id)) {
                this.sendMsgDisabled = false
            }
        },
        send() {
            this.sendMsgDisabled = true

            //页面间传参
            this.axios.post("/users/" + this.$route.params.id + "/mail_validation").then((response) => {
                console.log(response.data)
            }).catch((error) => {
                throw error
            })
            let interval = window.setInterval(() => {
                if ((this.time--) <= 0) {
                    this.time = 60;
                    this.sendMsgDisabled = false;
                    window.clearInterval(interval);
                }
            }, 1000);
        }
    },
    created() {
        this.checkIdIsValid()
    }
}
</script>

<style scoped>
.activation {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
</style>
