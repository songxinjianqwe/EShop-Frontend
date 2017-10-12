<template>
    <div class="validation">
        <p v-if="username !== ''">{{'欢迎您,'+ username}}</p>
        <p v-else>验证失败</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: ''
        }
    },
    methods: {
        validate() {
            let that = this
            let id = this.$route.params.activationId
            let code = this.$route.params.activationCode
            let params = new URLSearchParams();
            params.append('activationCode', code)
            this.axios.post("/users/" + id + "/activation", params).then(function(response) {
                that.username = response.data.username
                const h = that.$createElement;
                that.$notify({
                    title: '注册成功',
                    message: h('i', { style: 'color: teal' }, '欢迎您加入我们')
                })
                that.$emit('register-success')
            }).catch(function(error) {
                console.log(error)
                throw error
            })

        }
    },
    created() {
        this.validate()
    }
}
</script>

<style scoped>
.validation {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
</style>
