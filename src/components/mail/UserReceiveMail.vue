<template>
    <div class="user-mail">
        <div class="receive-box">
            <h2 class="h2-left">收件箱</h2>
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                <el-tab-pane v-for="pane in panes" :label="pane.label" :name="pane.name" :key="pane.name">
                    <el-table :data="mails.list" stripe style="width: 98%" highlight-current-row @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="50">
                        </el-table-column>
                        <el-table-column prop="sender.username" label="发送者" width="100">
                        </el-table-column>
                        <el-table-column prop="text.mailText" label="内容" width="450" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="text.sendTime" label="收信时间" width="200">
                        </el-table-column>
                        <el-table-column label="操作" width="120" inline-template>
                            <el-button @click="showDetail(row)">查看内容</el-button>
                        </el-table-column>
                        <el-table-column label="操作" width="80" inline-template>
                            <el-button @click="reply(row)">回信</el-button>
                        </el-table-column>
                    </el-table>
                    <div class="table-bottom">
                        <el-button @click="setMailsRead">设为已读</el-button>
                        <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="pages" @current-change="handlePageChanged" :current-page.sync="pageNum">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-dialog title="站内信内容" :visible.sync="contentDialogVisible" size="small">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="currentContent" readonly="true">
                </el-input>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user', 'token'],
    data() {
        return {
            activeName: 'NOT_VIEWED',
            panes: [
                {
                    label: '未读消息',
                    name: 'NOT_VIEWED'
                },
                {
                    label: '已读消息',
                    name: 'VIEWED'
                }, {
                    label: '全部消息',
                    name: 'ALL'
                },
            ],
            mails: {},
            pages: 1,
            pageNum: 1,
            pageSize: 5,
            currentContent: '',
            contentDialogVisible: false,
            selectedMails: []
        }
    },
    methods: {
        fetchMails() {
            console.log('获取站内信信息')
            let params = {
                target: 'receiver',
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                mail_status: this.activeName
            }
            let header = {
                Authentication: this.token
            }
            this.axios.get(`/mails/by_target/${this.$route.params.id}`, { params: params, headers: header }).then((response) => {
                console.log(response.data)
                this.mails = response.data
                this.pages = this.mails.pages
            }).catch((error) => {
                throw error
            })
        },
        handleClick(tab, event) {
            console.log('事件点击了', tab.name);
            this.fetchMails()
        },
        handlePageChanged(newPageNum) {
            this.pageNum = newPageNum
            this.fetchMails()
        },
        showDetail(row) {
            this.currentContent = row.text.mailText
            this.contentDialogVisible = true
        },
        reply(row) {
            this.$router.push({ path: `/users/${this.user.id}/mails/post`, query: { 'id': row.receiver.id, 'username': row.receiver.username } })
        },
        handleSelectionChange(val) {
            this.selectedMails = val
            console.log('表单选择项发生变化')
            console.log(this.selectedMails)
        },
        setMailsRead() {
            if (this.selectedMails.length <= 0) {
                this.$message.error('未选中任何站内信')
                return
            }
            let ids = []
            this.selectedMails.forEach(mail => {
                ids.push(mail.id)
            })
            let params = {
                ids: ids,
                mailStatus: 'VIEWED'
            }
            let header = {
                Authentication: this.token
            }
            this.axios.put('/mails/status', params, { headers: header }).then(response => {
                console.log('设为已读成功')
                this.$message({
                    showClose: true,
                    message: '设为已读成功',
                    type: 'success'
                })
                this.fetchMails()
            }).catch((error) => {
                throw error
            })
        }
    },
    watch: {
        '$route'(to, from) {
            let paths = to.path.split('/')
            if (paths.length >= 4) {
                if (paths[4] === 'receive') {
                    this.fetchMails()
                }
            }
        }
    },
    created() {
        console.log('UserReceiverMail Created Triggered...')
        this.fetchMails()
    }
}
</script>

<style scoped>
.user-mail {
    margin-left: 220px;
    text-align: left;
    overflow: hidden;
    height: 500px;
}

.h2-left {
    text-align: left;
}

.table-bottom {
    text-align: center;
    margin-top: 20px;
}
</style>
