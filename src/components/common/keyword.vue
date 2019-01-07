<template>
<div>
    <el-dialog title="关键字" :visible.sync="param.visible">
        <p class="selTab">已选择：</p>
        <p class="chooseTab">请选择（点击对应的关键字即可选中）</p>
        <div v-for="item in cateList" class="keyCat">
            <p class="catTit">关键字类别</p>
            <el-tag type="success">关键字001</el-tag>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetDir">取 消</el-button>
            <el-button type="primary" @click="addDir">确 定</el-button>
        </div>
        <el-pagination 
            background 
            class="pull-right pt10" 
            @size-change="sizeChange" 
            @current-change="currentChange" 
            :current-page="page.currentPage" 
            :page-sizes="[10, 20, 30, 40]" 
            :page-size="page.pageSize" 
            layout="total, sizes, prev, pager, next" 
            :total="page.totalCount"
        >
		</el-pagination>
    </el-dialog>  
</div>
</template>

<script>
import Config from '../../config.js'
export default {
    name: 'keyword',
    data(){
        return {
            basic_url: Config.dev_url,
            file_url: Config.file_url,
            page: {
                currentPage: 1,
                pageSize: 10,
                totalCount: 0
            },
            cateList: []
        }
    },
    props: ['param'],
    methods: {
        resetDir(){},
        addDir(){},
        sizeChange(){},
        currentChange(){},
        getData(){
            if(this.docParm.model == 'new'){
                return false;
            }
            var pageNum = this.page.currentPage - 1;
            var url = this.file_url + '/file/fileList?page=' + pageNum + '&size=' + this.page.pageSize;
            this.$axios.post(url,{
                'appname': this.docParm.appname,
                'recordid': this.docParm.recordid,
            }).then((res) => {
                this.doc = res.data.fileList;
            }).catch((err) => {
                this.$message({
                    message: '网络错误，请重试',
                    type: 'error'
                });
            });
        },
        requestData(){
            var data = {
                page: this.page.currentPage,
                limit: this.page.pageSize,
            };
            var url = this.basic_url + '/api-apps/app/tbCategory2';
            this.$axios.get(url, {
                params: data
            }).then((res) => {
                this.page.totalCount = res.data.count;
                this.cateList = res.data.data;
            }).catch((wrong) => {});
        }
    },
    mounted(){
        this.requestData();
    }
}
</script>

<style scoped>  
.keyCat{
    padding-top: 10px;
    padding-bottom: 30px;
}
.catTit{
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    margin-bottom: 10px;
}
.selTab, .chooseTab{
    font-size: 18px;
}
.chooseTab{
    text-align: center;
}
</style>