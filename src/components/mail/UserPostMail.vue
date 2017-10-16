<template>
    <div class="user-mail">
        <div class="post-mail">
            <h2>发送站内信</h2>
            <el-form class="mail-form" :model="mailForm" ref="mailForm" label-width="100px">
                <el-form-item class="form-item" label="收信人" prop="receivers">
                    <el-select v-model="mailForm.receivers" multiple filterable remote placeholder="请输入收信人" :remote-method="queryByUsername" :loading="loading">
                        <el-option v-if="'id' in $route.query && 'username' in $route.query" :key="$route.query.id" :label="$route.query.username" :value="$route.query.id">
                        </el-option>
                        <el-option v-for="item in searchedUsers" :key="item.id" :label="item.username" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-item" label="内容" prop="text">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="mailForm.text">
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item" label="发送模式" prop="sendMode">
                    <el-select v-model="mailForm.sendMode" placeholder="请选择">
                        <el-option v-for="item in allModes" :key="item.name" :label="item.name" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-item">
                    <el-button type="primary" @click="submitForm">发送</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
            <p v-for="error in errors" :key="error">{{error.field}}:{{error.message}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user', 'token'],
    data() {
        return {
            mailForm: {
                receivers: [],
                text: '',
                sendMode: ''
            },
            allModes: [
                {
                    name: '单发',
                    value: 'SINGLE'
                },
                {
                    name: '群发',
                    value: 'BATCH'
                },
                {
                    name: '广播',
                    value: 'BROADCAST'
                }
            ],
            errors: [],
            searchedUsers: [],
            loading: false
        }
    },
    methods: {
        resetForm() {
            this.$refs['mailForm'].resetFields()
        },
        isAdmin() {
            this.user.roles.forEach(role => {
                if (role.roleName === 'ROLE_ADMIN') {
                    return true
                }
            })
            return false
        },
        submitForm() {
            let header = { Authentication: this.token }
            console.log('表单内容', this.mailForm)
            if (!this.isAdmin() && this.mailForm.sendMode === 'BROADCAST') {
                this.$message.error('用户不可广播站内信')
                return
            }
            this.axios.post('/mails', this.mailForm, { headers: header }).then(response => {
                this.$message({
                    message: '发送成功',
                    type: 'success'
                })
                this.resetFields()
            }).catch(error => {
                console.log(error)
                if ("response" in error) {
                    this.errors = error.response.data.fieldErrors
                }
                this.$message.error('发送失败')
                this.resetFields()

            })
        },
        fetchUsersByUsername(username) {
            let header = { Authentication: this.token }
            this.axios.get(`/users/query/fuzzy/${username}`, { headers: header }).then(response => {
                console.log(response.data)
                this.searchedUsers = response.data
            }).catch((error) => {
                return []
            })
        },
        queryByUsername(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.fetchUsersByUsername(query)
                }, 200);
            } else {
                this.searchedUsers = [];
            }
        }
    }
}
</script>

<style scoped>
.user-mail {
    margin-left: 400px;
    text-align: left;
    overflow: hidden;
    height: 500px;
}

.post-mail {
    width: 600px;
}

.h2-left {
    text-align: left;
}

.form-item {
    height: 50px;
}
</style>
