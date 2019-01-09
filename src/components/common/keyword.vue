<template>
<div>
    <el-dialog title="关键字" :visible.sync="param.visible" :before-close="reset">
        <p class="selTab">已选择：
            <el-tag class="tag" 
                type="success" 
                v-for="item in selkeys" 
                style="margin-right: 10px;margin-bottom: 20px;"  
                @close="closeTag(item)"
                closable>{{item.keywordname}}
            </el-tag>
        </p>
        <div class="keyCat">
            <p class="catTit">关键字类别</p>
            <el-tag class="tag" type="success" @click.native="getKeys(item)" v-for="item in cateList" style="margin-right: 10px; min-width: 80px;">{{item.categoryname}}</el-tag>
        </div>
        <div class="keyCat">
            <p class="catTit">关键字</p>
            <el-tag class="tag" type="success"  @click.native="setSel(item)" v-for="item in keywords" style="margin-right: 10px; min-width: 80px;">{{item.keywordname}}</el-tag>
        </div>
        <p class="tips">请选择关键字类别，然后点击选择的关键字</p>
        <div slot="footer" class="dialog-footer">
            <el-button @click="reset">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </div>
        <!-- <el-pagination 
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
		</el-pagination> -->
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
            cateList: [],
            keywords: [],
            selkeys: [],
            delKeys: []
        }
    },
    props: ['param'],
    methods: {
        reset(){
            this.selkeys = [];
            this.keywords = [];
            this.delKeys = [];
            this.param.visible = false;
        },
        save(){
            var url = this.file_url + '/file/fileKeyword';
            var catList = [];
            var selkeys = this.selkeys;
            for(var i=0; i<selkeys.length; i++){
                if(selkeys[i].filekeywordid == ''){
                    catList.push({
                        filekeywordid: selkeys[i].filekeywordid,
                        keywordid: selkeys[i].id,
                        categoryid: selkeys[i].categoryid
                    });
                }else{
                    catList.push({
                        filekeywordid: selkeys[i].filekeywordid,
                        keywordid: selkeys[i].keywordid,
                        categoryid: selkeys[i].categoryid
                    });
                }
                
            }
            var postData = {
                fileid: this.param.fileid,
                categoryKeywordList: catList,
                deleteFilekeywordidList: this.delKeys
            };
            this.$axios.post(url,postData).then((res) => {
                if(res.data.code==1){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
                this.reset();
            }).catch((err) => {
                this.$message({
                    message: '网络错误，请重试',
                    type: 'error'
                });
            });
        },
        closeTag(item){
            if(item.filekeywordid != ''){
                this.delKeys.push(item.filekeywordid);
            }
            this.selkeys.splice(this.selkeys.indexOf(item), 1);
        },
        setSel(item){
            var arr = this.selkeys.filter(function (val) {
                if(val.keywordid == item.id){
                    return val;
                }
            });
            if(arr.length == 0){
                item.filekeywordid = '';
                item.keywordid = item.id;
                this.selkeys.push(item);
            }
        },
        getKeys(item){
            var url = this.basic_url + '/api-apps/app/tbCategory2/' + item.id;
            this.$axios.get(url,{
            }).then((res) => {
                this.keywords = res.data.tb_keyword2List;
            }).catch((err) => {
                this.$message({
                    message: '网络错误，请重试',
                    type: 'error'
                });
            });
        },
        getKeyCats(){
            var data = {
                page: this.page.currentPage,
                limit: this.page.pageSize,
            };
            var url = this.basic_url + '/api-apps/app/tbCategory2';
            this.$axios.get(url, {
                params: data
            }).then((res) => {
                // this.page.totalCount = res.data.count;
                this.cateList = res.data.data;
            }).catch((wrong) => {});
        },
        requestData(){
            var url = this.file_url + '/file/fileKeywordList';
            this.$axios.post(url, {
                'fileid': this.param.fileid
            }).then((res) => {
                this.selkeys = res.data;
            }).catch((wrong) => {});
        }
    },
    mounted(){
        this.getKeyCats();
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
.tag{
    cursor: pointer;
}
.tips{
    color: #ccc;
    font-size: 12px;
}
</style>