<template>
<div>
    <div class="table-func">
        <!-- <el-button type="warn" size="mini" round @click="upload">
            <i class="el-icon-upload"></i>
            <font>上传</font>
        </el-button> -->
        <!-- <el-button type="success" size="mini" round @click="addLine">
            <i class="icon-add"></i>
            <font>新建行</font>
        </el-button> -->
        
        <el-button type="error" size="mini" round>
            <i class="el-icon-delete"></i>
            <font>删除行</font>
        </el-button>
    </div>
    <el-table :data="doc" row-key="ID" border stripe highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'pmRecordList', order: 'descending'}">
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
    <form method="post" id="file" action="" enctype="multipart/form-data">
        <div class="a-upload">
            文件上传
            <input id="excelFile" type="file" name="uploadFile"/>
            <br/><br/>
        </div>
        <input type="button" value="上传" @click="upload"/>
    </form>
</div>
</template>

<script>
import Config from '../../config.js'
export default {
    name: 'nav_tabs',
      data(){
        return {
            basic_url: Config.dev_url,
            doc: [],
            fileList: []
        }
    },
    methods: {
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
            var url = 'http://192.168.1.140:8060/file/uploadfile?userid=66&username=user&deptid=101&deptfullname=workorder&recordid=1&appname=workorder&appid=99';
            this.$axios.post(url, formData, config
            ).then((res)=>{
                console.log(res)
            })
        },
        getData(){
            var url = 'http://192.168.1.140:8060/file/fileList?page=0&size=10';
            this.$axios.post(url,{
                'appname': 'workorder',
                'recordid': 1
            }).then((res) => {
                this.doc = res.data.fileList;
            }).catch((err) => {
                this.$message({
                    message: '网络错误，请重试',
                    type: 'error'
                });
            });
        }
    },
    mounted(){
        this.getData();
    }
}
</script>

<style scoped>  
.a-upload{
    padding: 4px 10px;
    width: 85px;
    height: 34px;
    line-height: 28px;
    position: relative;
    cursor: pointer;
    color: #fff;
    background-color: #286090;
    border-color: #204d74;
    border-radius: 4px;
    overflow: hidden;
    display: block;
}
.a-upload input{
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}
.a-upload:hover{
    color: #FFFFFF;
    background: #337ab7;
    border-color: #204d74;
    text-decoration: none;
}
</style>