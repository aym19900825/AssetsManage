<template>
<div>
    <el-tabs v-model="activeName">
        <el-tab-pane label="单据报表" name="first">
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick1">
                <el-tab-pane v-for="item in reportsList" :key='item.id' :label='item.code'>
                    <iframe src=""  width="100%" height="600px" frameborder="0" scrolling="no" >
				   	</iframe>    
                </el-tab-pane>
                
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="统计报表" name="second">
            <el-tabs :tab-position="tabPosition">
                <el-tab-pane label="统计报表1">
                    <iframe src="http://www.w3school.com.cn" height="600px" width="99%" frameborder="0" name="report_iframe"></iframe>
                </el-tab-pane>
                <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import Config from '../../../config.js';
  export default {
    props:["reportData"],//第一种方式
    data() {
      return {
        basic_url: Config.dev_url,
        reportsList:[],
        activeName: 'first',
        tabPosition: 'left',
        appname:'',
      };
    },
    methods: {
      handleClick1(tab,event) {
        console.log(tab.label);
        console.log(event);
        console.log(1234);
        var file;
        for(var i=0;i<this.reportsList.length;i++){
                if(this.reportsList[i].id==tab.label){
                    file=this.reportsList[i].name;
                }
        }
        console.log(file);
      },
        requestData() {
            console.log(this.reportData);
            this.appname=this.reportData.app;
            var url = this.basic_url + '/api-apps/app/inspectPro/report';
            this.$axios.get(url, {}).then((res) => {
                this.reportsList = res.data.datas;
                // this.fileurl = res.data.data[0].fileurl;
                console.log(res.data.datas);
                // for(let i=0;i<res.data.datas.length;i++){
                //     res.data.datas[i].id
                // }
                this.innerVisible = true;
            }).catch((wrong) => {
            })
            
        },
    },
    mounted(){
            this.requestData();
    }
  };
</script>