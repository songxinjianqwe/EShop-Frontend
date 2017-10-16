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
            let id = this.$route.params.activationId
            let code = this.$route.params.activationCode
            let params = new URLSearchParams();
            params.append('activationCode', code)
            this.axios.post("/users/" + id + "/activation", params).then((response) => {
                this.username = response.data.username
                const h = this.$createElement;
                this.$notify({
                    title: '注册成功',
                    message: h('i', { style: 'color: teal' }, '欢迎您加入我们')
                })
                this.$emit('register-success')
            }).catch((error) => {
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
