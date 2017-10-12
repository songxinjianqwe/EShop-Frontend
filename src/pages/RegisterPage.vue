<template>
    <div>
        <el-steps class="registerSteps" :space="100" :active="step" finish-status="success">
            <el-step title="填写注册表单"></el-step>
            <el-step title="发送激活邮件"></el-step>
            <el-step title="验证"></el-step>
        </el-steps>
        <!-- 嵌套路由 -->
        <!-- 渲染出来的router-view向父页面传值可以使用自定义事件 -->
        <router-view @register-success="onRegisterSuccess"></router-view>
    </div>
</template>

<script>
//this.$router.push
//this.$route.params
export default {
    data() {
        return {
            step: 0,
            mapping: {
                'form': 0,
                'activate': 1,
                'validate': 2
            }
        }
    },
    methods: {
        changeStep() {
            console.log(this.$route.path)
            console.log(this.$route.path.split('/')[2])
            let paths = this.$route.path.split('/')
            if (paths.length >= 2) {
                this.step = this.mapping[paths[2]]
            }
        },
        onRegisterSuccess() {
            console.log('父页面接收到register-success事件')
            this.step = 3
        }
    },
    watch: {
        '$route': 'changeStep'
    }
}
</script>

<style scoped>
.registerSteps {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
</style>
