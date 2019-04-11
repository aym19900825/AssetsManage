<template>
  <div id="app">
    <el-table :data="list" 
      ref="table" 
      @sort-change='tableSortChange'
      border
      stripe
      :height="fullHeight"
      style="width: 100%;"
      highlight-current-row
      @current-change="singleTable"
      @selection-change="selChange"
      element-loading-text="加载中…"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.9)">
      <el-table-column type="selection" fixed width="55" align="center">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50">
        <template slot-scope="scope">
          <span> {{(page.currentPage-1)*page.pageSize+scope.$index+1}} </span>
        </template>
      </el-table-column>
      <slot :list='list'></slot>
    </el-table>
    <div class="pt10 text-right">
      <el-pagination
          @size-change="sizeChange"
          background
          @current-change="currentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="page.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import config from '../../../config.js'
export default {
  props: ['appName','searchList'],
  data(){
    return{
      basic_url: config.dev_url,
      list:[],
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      selData: [],
      isshift: false,
      isctrl: false,
      fullHeight: document.documentElement.clientHeight - 210 + 'px',
      loading: false,
      loadSign: true
    }
  },
  methods:{
    tableSortChange(column){
      this.page.currentPage = 1;
      var searchObj = this.searchList;
      for(var key in searchObj){
        if(key.indexOf('_orders')){
           delete searchObj[key];
        }
      }
      if (column.order === 'descending') {
        this.searchList[column.prop + '_orders'] = 'desc';
      } else {
        this.searchList[column.prop + '_orders'] = 'asc';
      }
      this.requestData();
    },
    selChange(val) {
      this.selData = val;
      this.$emit('getSelData',val)
    },
    singleTable(row){
      if(this.isctrl){
        this.$refs.table.toggleRowSelection(row);
        console.log(row);
      }else if(this.isshift){
        var selData = this.selData;
        var list = this.list;
        var minIndex = 0;
        var maxIndex = 0;
        var clickIndex = 0;
        var selIndex = [];
        var dataProp = (this.appName=='report'||this.appName=='reportFile'||this.appName=='flow' )?'id':'ID';
        for(var i=0; i<selData.length; i++){
          list.forEach(function(item, index){
            if(item[dataProp] == selData[i][dataProp]){
              selIndex.push(index);
              if(i==0){
                minIndex = index;
                maxIndex = index;
              }else{
                minIndex = index<minIndex ? index:minIndex; 
                maxIndex = index>maxIndex ? index:maxIndex; 
              }
            }
            if(item[dataProp] == row[dataProp]){
              clickIndex = index;
            }
          }); 
        }
        var min = 0;
        var max = 0;
        if(clickIndex < minIndex){
          min = clickIndex;
          max = maxIndex;
        }else if(clickIndex > maxIndex){
          min = minIndex;
          max = clickIndex;
        }else{
          min = minIndex;
          max = clickIndex;
        }
        selIndex.forEach((item)=>{
          this.$refs.table.toggleRowSelection(list[item]);
        });
        for(var m=min; m<=max; m++){
          this.$refs.table.toggleRowSelection(list[m]);
        }
      }else{
        this.$refs.table.clearSelection();
        this.$refs.table.toggleRowSelection(row);
      }
    },
    sizeChange(val) {
      this.page.pageSize = val;
      if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
        $('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
        sessionStorage.setItem('toBtm','true');
      }else{
        sessionStorage.setItem('toBtm','false');
      }
      this.requestData();
    },
    currentChange(val) {
      this.page.currentPage = val;
      if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
        $('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
        sessionStorage.setItem('toBtm','true');
      }else{
        sessionStorage.setItem('toBtm','false');
      }
      this.requestData();
    },
    requestData(opt){
      		
      if(this.appName == 'asset'){
        this.list = [{ 
          param1: '120114010001',
          param2: '010101010001',
          param3: '涡街流量计水表',
          param4: 'LSU-99A-T',
          param5: '145694',
          param6: '',
          param7: '百口泉采油厂-百21采油作业区-2号采油站-1050A水井',
          param8: '杨鑫',
          param9: '',
          param10: '',
          param11: '丁晓娟',
          param12: '2017-02-07',
          param13: '启用' 
        },{
          param1: '022500000053',
          param2: '双容积计量分离装',
          param3: 'XDY-1.6-25-50-Z-F',
          param4: '',
          param5: '',
          param6: '风城-乌尔禾-33#区',
          param7: '王凯',
          param8: '浙江金龙自控设备有限公司',
          param9: '',
          param10: '',
          param11: '',
          param12: '2016-12-19',
          param13: '停用' 
        },{
          param1: '022500000052',
          param2: '双容积计量分离装置',
          param3: 'XT6-LES16-0.8-IIB',
          param4: '',
          param5: '',
          param6: '风城-乌尔禾-36#区',
          param7: '王凯',
          param8: '新疆石油勘察设计研究院（有限公司）',
          param9: '',
          param10: '',
          param11: '',
          param12: '2016-12-19',
          param13: '活动' 
        }];
        this.page.totalCount = 3;
      }

      if(this.appName == 'instruments'){
        this.list = [{ 
          param1: '1019',
          param2: '222',
          param3: '0.00',
          param4: '育生',
          param5: '等待批准',
        },{
          param1: '1020',
          param2: '55',
          param3: '5.00',
          param4: '丁晓娟',
          param5: '等待批准',
        }];
        this.page.totalCount = 2;
      }

      if(this.appName == 'workOrder'){
        this.list = [{ 
          param1: 'WO20180129001',
          param2: '010101010008',
          param3: '测试资产',
          param4: '',
          param5: '',
          param6: '',
          param7: '',
          param8: '故障维修' 
        },{
          param1: 'WO20170904001',
          param2: 'Z14060306000000001',
          param3: '测试',
          param4: '',
          param5: '',
          param6: '',
          param7: '',
          param8: '预防性维护' 
        }];
        this.page.totalCount = 2;
      }
    },
    // loadMore(){
    //   let up2down = sessionStorage.getItem('up2down');
    //   if(this.loadSign) {					
    //     if(up2down=='down'){
    //       this.page.currentPage++;
    //       if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
    //         this.page.currentPage = Math.ceil(this.page.totalCount / this.page.pageSize)
    //         return false;
    //       }
    //       let append_height = window.innerHeight - this.$refs.table.$el.offsetTop - 50;
    //       if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
    //         $('.el-table__body-wrapper table').append('<div class="filing" style="height: '+append_height+'px;width: 100%;"></div>');
    //         sessionStorage.setItem('toBtm','true');
    //       }
    //     }else{
    //       sessionStorage.setItem('toBtm','false');
    //       this.page.currentPage--;
    //       if(this.page.currentPage < 1) {
    //         this.page.currentPage=1;
    //         return false;
    //       }
    //     }
    //     this.loadSign = false;
    //     setTimeout(() => {
    //       this.loadSign = true;
    //     }, 1000)
    //     this.requestData();
    //   }
    // },
    eventBind(){
      var that = this;
      document.onkeydown = function(e) { //按下键盘      
      switch (e.keyCode) {        
        case 16:           
          that.isshift = true;     
          break;         
        case 17:          
          that.isctrl = true;        
          break;     
        }     
      };    
      document.onkeyup = function(e) { //放弃键盘   
        switch (e.keyCode) {      
          case 16:           
            that.isshift = false;      
            break;        
          case 17:         
            that.isctrl = false;     
            break;       
        }  
      }   
    }
  },
  mounted(){
    this.requestData();
    this.eventBind();
  }
}
</script>
<style scope>
  .fixed-table-toolbar .columns{
    width: 120px;
  }
</style>

