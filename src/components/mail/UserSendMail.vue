<template>
    <div class="user-mail">
        <div class="send-box">
            <h2>已发送</h2>
            <el-table :data="mails.list" stripe style="width: 100%" highlight-current-row>
                <el-table-column prop="receiver.username" label="接收者" width="100">
                </el-table-column>
                <el-table-column prop="text.mailText" label="内容" width="600" show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="text.sendTime" label="发信时间" width="200">
                </el-table-column>
                <el-table-column label="操作" width="120" inline-template>
                    <el-button @click="showDetail(row)">查看内容</el-button>
                </el-table-column>
            </el-table>
            <el-pagination style="text-align:center" layout="prev, pager, next" :page-count="pages" @current-change="handlePageChanged" :current-page.sync="pageNum">
            </el-pagination>
        </div>
        <el-dialog title="站内信内容" :visible.sync="contentDialogVisible" size="small">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="currentContent" readonly="true">
            </el-input>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['user', 'token'],
    data() {
        return {
            mails: {},
            pages: 1,
            pageNum: 1,
            pageSize: 5,
            currentContent: '',
            contentDialogVisible: false
        }
    },
    methods: {
        fetchMails() {
            console.log('获取站内信信息')
            let params = {
                target: 'sender',
                pageNum: this.pageNum,
                pageSize: this.pageSize,
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
        }
    },
    watch: {
        '$route'(to, from) {
            let paths = to.path.split('/')
            if (paths.length >= 4) {
                if (paths[4] === 'send') {
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
</style>
