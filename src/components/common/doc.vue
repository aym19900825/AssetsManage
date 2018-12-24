<template>
<div>
    <div class="table-func">
        <el-button type="warn" size="mini" round @click="upload">
            <i class="el-icon-upload"></i>
            <font>上传</font>
        </el-button>
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
</div>
</template>

<script>
import Config from '../../config.js'
export default {
    name: 'nav_tabs',
      data(){
        return {
            basic_url: Config.dev_url,
            doc: []
        }
    },
    methods: {
        addLine(){
            this.doc.push({

            });
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

</style>