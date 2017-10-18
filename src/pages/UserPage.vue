<template>
    <div class="user-page">
        <div class="left-wapper">
            <el-popover ref="uploadAvatar" placement="bottom" width="100" trigger="hover">
                <el-button type="primary" @click="avatarUploadDialogVisible = true">更换头像
                    <i class="el-icon-upload el-icon--right"></i>
                </el-button>
            </el-popover>
            <div class="avatar-mode">
                <img :src="user.avatar" v-popover:uploadAvatar></img>
            </div>
            <p class="username">{{user.username}}</p>
            <div class="left-navmenu">
                <el-col :span="30">
                    <!-- menu->router -->
                    <!-- 默认激活的是当前页面对应的menu-item -->
                    <el-menu :default-active="$route.path" theme="dark" :router="true">
                        <el-menu-item :index="'/users/'+$route.params.id+'/info'">个人信息</el-menu-item>
                        <el-menu-item :index="'/users/'+$route.params.id+'/orders'">历史订单</el-menu-item>
                        <el-submenu :index="'/users/'+$route.params.id+'/mails'">
                            <template slot="title">站内信</template>
                            <el-menu-item :index="'/users/'+$route.params.id+'/mails/receive'">收件箱</el-menu-item>
                            <el-menu-item :index="'/users/'+$route.params.id+'/mails/send'">已发送</el-menu-item>
                            <el-menu-item :index="'/users/'+$route.params.id+'/mails/post'">写邮件</el-menu-item>
                        </el-submenu>
                        <el-submenu :index="'/users/'+$route.params.id+'/pay'">
                            <template slot="title">支付</template>
                            <el-menu-item :index="'/users/'+$route.params.id+'/pay/password'">密码</el-menu-item>
                            <el-menu-item :index="'/users/'+$route.params.id+'/pay/deposit'">充值</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </div>
        </div>
        <div class="right-wapper">
            <keep-alive>
                <router-view :user="user" :copiedUser="copiedUser" :token="loginResult.token" @user-update="onUserUpdated"></router-view>
            </keep-alive>
        </div>


        <!-- 上传头像dialog -->
        <el-dialog class="avatar-dialog" title="上传头像" :visible.sync="avatarUploadDialogVisible" size="small">
            <!-- http-request就当做一个选择图片后的钩子函数就好，真正上传是要等确认时才进行的 -->
            <!-- action属性无任何作用，但不可不设置，会报错 -->
            <el-upload action="" class="avatar-uploader" :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="showPreview">
                <!-- 预览 -->
                <img v-if="image.dataUrl" :src="image.dataUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-progress class="progress-bar" :text-inside="true" :stroke-width="18" :percentage="image.progress"></el-progress>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelUploadAvatar">取 消</el-button>
                <el-button :disabled="image.dataUrl === ''" type="primary" @click="uploadAvatar">上 传</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            loginResult: {},
            avatarUploadDialogVisible: false,
            cos: null,
            appid: 1252651195,
            bucket: 'eshop',
            cosBasePath: 'user/avatar/',
            image: {
                name: '',
                dataUrl: '',
                progress: 0
            }
        }
    },
    methods: {
        fetchUser() {
            this.loginResult = JSON.parse(localStorage.getItem('loginResult'))
            let header = { 'Authentication': this.loginResult.token }
            let params = { 'mode': 'id' }
            this.axios.get(`/users/query/${this.$route.params.id}`, { params: params, headers: header }).then((response) => {
                this.user = response.data
                console.log(this.user)
            }).catch((error) => {
                throw error
            })
        },
        onUserUpdated(newUser) {
            console.log('父页面接收到用户更新的事件')
            this.user = newUser
        },
        //检查文件类型与大小是否合适
        beforeAvatarUpload(file) {
            console.log('beforeAvatarUpload', file)
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 <= 5;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                return false
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                return false
            }
            return isJPG && isLt2M;
        },
        //显示本地文件的预览图
        showPreview(upload) {
            let reader = new FileReader()
            reader.readAsDataURL(upload.file)
            reader.onload = (e) => { // reader onload start  
                this.image.dataUrl = e.target.result
                this.image.name = upload.file.name
            } // reader onload end 
        },
        //初始化cos：腾讯云存储库
        initCos(path) {
            console.log('初始化cos')
            this.cos = new CosCloud({
                appid: this.appid,// APPID 必填参数
                bucket: this.bucket,//bucketName 必填参数
                region: 'sh',//地域信息 必填参数 华南地区填gz 华东填sh 华北填tj,
                getAppSign: (callback) => {
                    console.log('getAppSign')
                    // let token = 'zYp+/K1JZy1o1wggZbbE6o1b5V5hPTEyNTI2NTExOTUmYj1lc2hvcCZrPUFLSURoTU5IMGJkTVRPTEJVZmhYRW9DWGg4UWJhTzFYbTF5byZlPTAmdD0xNTA4MzE4NzEyJnI9MjMyMDEzOCZmPS8xMjUyNjUxMTk1L2VzaG9wL3VzZXIvYXZhdGFy'
                    console.log('尝试获取服务器token')
                    let params = {
                        bucket: this.bucket,
                        cosPath: path
                    }
                    let header = { Authentication: this.loginResult.token }
                    this.axios.get('/tokens/cos', { params: params, headers: header }).then(response => {
                        console.log('cos获取服务器token 成功', response.data)
                        callback(response.data)
                    }).catch(error => {
                        throw error
                    })
                }
            });
        },
        //上传图片
        uploadAvatar() {
            let path = this.cosBasePath + this.image.name
            let binary = this.base64ToBinary(this.image.dataUrl)
            if (this.cos === null) {
                this.initCos(path)
            }
            this.cos.uploadFile(this.uploadSuccessCallBack, this.uploadErrorCallBack, this.uploadProgressCallBack, this.bucket, path, binary, 0);
        },
        //取消上传
        cancelUploadAvatar() {
            this.clearVars()
            this.avatarUploadDialogVisible = false
        },
        //上传成功后回调
        uploadSuccessCallBack(result) {
            console.log('上传成功')
            this.$message({
                message: '头像上传成功',
                type: 'success'
            });
            this.avatarUploadDialogVisible = false
            this.user.avatar = result.data.source_url
            let header = { Authentication: this.loginResult.token }
            this.axios.put("/users", this.user, { headers: header }).then((response) => {
                console.log('更新完毕')
            }).catch((error) => {
                console.log('更新失败')
            })
            this.clearVars()
        },
        //上传失败后回调
        uploadErrorCallBack(result) {
            console.log('上传失败')
            console.log('result:', result)
            this.$message.error('头像上传失败');
            this.clearVars()
        },
        //上传时回调
        uploadProgressCallBack(curr) {
            console.log('上传中...')
            console.log('当前进度', curr)
            this.image.progress = Math.round(curr * 100)
        },
        //清除上一次上传的图片数据，避免下次上传时会显示上次图片的预览图
        clearVars() {
            this.image.dataUrl = ''
            this.image.name = ''
            this.image.progress = 0
        }
    },
    computed: {
        copiedUser() {
            return Object.assign({}, this.user)
        }
    },
    created() {
        this.fetchUser()
    }
}
</script>

<style scoped>
/* 当超过height时会出现滚动条 */

.user-page {
    height: 500px;
    overflow: auto;
    width: 100%;
}

.avatar-mode {
    position: relative;
    width: 150px;
    height: 150px;
    box-sizing: border-box;
    border: 4px solid #d9dde1;
    border-radius: 75px;
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
}

img {
    width: 140px;
    height: 140px;
}

.left-wapper {
    float: left;
    width: 200px;
    text-align: center;
}

.left-wapper .right-wapper .avator-wapper {
    padding: 32px 0 24px;
}

.username {
    font-size: 18px;
}

.avatar-dialog {
    text-align: center;
    margin-left: 280px;
    width: 800px;
}



/* 上传头像*/

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    text-align: center;
}

.avatar {
    width: 140px;
    height: 140px;
    display: block;
}

.progress-bar {
    margin-top: 20px;
}
</style>

