<template>
<div>
    <div class="table-func">
        <form method="post" id="file" action="" enctype="multipart/form-data" style="float: left;">
            <el-button type="warn" size="mini" round class="a-upload" :disabled="docParm.model=='new'?true:false">
                <i class="el-icon-upload"></i>
                <font>上传</font>
                <input id="excelFile" type="file" name="uploadFile" @change="upload" v-if="docParm.model=='edit'"/>
            </el-button>
        </form>
        <el-button type="error" size="mini" @click="download" round :disabled="docParm.model=='new'?true:false" style="margin-left: 10px;">
            <i class="el-icon-download"></i>
            <font>下载</font>
        </el-button>
        <el-button type="error" size="mini" @click="delFile" round :disabled="docParm.model=='new'?true:false">
            <i class="el-icon-delete"></i>
            <font>删除行</font>
        </el-button>
    </div>
    <el-table :data="doc" row-key="ID" border stripe highlight-current-row style="width: 100%;"  @selection-change="handleSelFile">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" sortable label="序号" width="50">
        </el-table-column>
        <el-table-column prop="filerealname" label="文档名称" sortable>
        </el-table-column>
        <el-table-column prop="filestatus" label="文档状态" sortable>
        </el-table-column>
        <el-table-column prop="filesize" label="文档大小" sortable >
        </el-table-column>
    </el-table>
    <el-pagination class="pageLeft"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="page.totalCount">
    </el-pagination>
</div>
</template>

<script>
import Config from '../../config.js'
export default {
    name: 'nav_tabs',
      data(){
        return {
            basic_url: Config.dev_url,
            file_url: Config.file_url,
            doc: [],
            fileList: [],
            selFiles: [],
            //分页显示
            page: {
                currentPage: 1,
                pageSize: 10,
                totalCount: 0
            },
        }
    },
    props: ['docParm'],
    methods: {
        sizeChange(val) {
            this.page.pageSize = val;
            this.getData();
        },
        currentChange(val) {
            this.page.currentPage = val;
            this.getData();
        },
        handleSelFile(val){
            this.selFiles = val;
        },
        upload(e){
            var formData = new FormData();
            formData.append('files', document.getElementById('excelFile').files[0]);
            var config = {
                //添加请求头
                headers: { "Content-Type": "multipart/form-data" },
                //添加上传进度监听事件
                onUploadProgress: e => {
                    var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
                    this.progress = completeProgress;
                }
            };
            var url = this.file_url + '/file/uploadfile?userid=' + this.docParm.userid 
                    + '&username=' + this.docParm.username
                    + '&deptid=' + this.docParm.deptid
                    + '&deptfullname=' + this.docParm.deptfullname
                    + '&recordid=' + this.docParm.recordid
                    + '&appname=' + this.docParm.appname
                    + '&appid=' + this.docParm.appid;
            this.$axios.post(url, formData, config
            ).then((res)=>{
                if(res.data.code == 0){
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
                this.getData();
            })
        },
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
        download(){
            var selFilesLen = this.selFiles.length;
            if(selFilesLen == 0){
                this.$message({
                    message: '请选择文件',
                    type: 'warning'
                });
            }else if(selFilesLen > 1){
                this.$message({
                    message: '不可同时下载多个文件',
                    type: 'warning'
                });
            }else{
                var url = this.selFiles[0].filepath;
                window.open(url); 
            }
        },
        delFile(){
            var selFilesLen = this.selFiles.length;
            if(selFilesLen == 0){
                this.$message({
                    message: '请选择数据项',
                    type: 'warning'
                });
            }else if(selFilesLen > 1){
                this.$message({
                    message: '不可同时删除多条数据',
                    type: 'warning'
                });
            }else{
                var url = this.file_url + '/file/deleteFile/' + this.selFiles[0].fileid;
                this.$axios.delete(url,{}).then((res) => {
                    if(res.data.code == 1){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                    this.getData();
                }).catch((err) => {
                    this.$message({
                        message: '网络错误，请重试',
                        type: 'error'
                    });
                });
            }
        }
    },
}
</script>

<style scoped>  
.a-upload input{
    position: absolute;
    font-size: 100px;
    right: 100px;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}
.upload-btn{
    color: #fff;
    background-color: #286090;
    border-radius: 4px;
    padding: 4px 10px;
    width: 85px;
    height: 34px;
    line-height: 28px;
    border: none;
}
.pageLeft{
    float: right;
    margin-top: 30px;
    margin-bottom: 10px;
}
</style>