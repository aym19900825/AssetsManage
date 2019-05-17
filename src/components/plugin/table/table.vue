<template>
  <div id="app">
    <el-table :data="list" 
      ref="table" 
      @sort-change='tableSortChange'
      border
      :stripe="stripe"
      style="width:100%"
      :height="fullHeight"
      highlight-current-row
      @current-change="singleTable"
      @selection-change="selChange"
      @row-click = "showRow"
      v-loading="loading"
      element-loading-text="加载中…"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.9)" :row-class-name="tableRowClassName">

      <el-table-column label="单选" fixed width="55" align="center" v-if="!!this.selectWay">
        <template slot-scope="scope">
          <el-radio class="radioData" :label="scope.$index" v-model="radioData">&nbsp;</el-radio>
        </template>
      </el-table-column>

      <el-table-column type="selection" fixed width="55" align="center" v-else>
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
  props: ['appName','newHeight','searchList','selectWay'],
  data(){
    return{
      basic_url: config.dev_url,
      list:[],
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      radioData:'radio',
      selected:{},
      selData: [],
      isshift: false,
      isctrl: false,
      stripe: true,//table表格是否需要奇偶区别斑马线，true是false否
      fullHeight: document.documentElement.clientHeight - 210 + 'px',
      // fullHeight: '100',
      loading: false,
      loadSign: true
    }
  },
  methods:{
    //判断单选点击table-row选中radio
    showRow(row){
      //赋值给radio
      this.radioData = this.list.indexOf(row);
      this.selected=row;
    },
    //判断高度
    isHeight(){
      if(!!this.newHeight){
        var tableHeight = this.newHeight;
        $(".el-table").height(tableHeight);
        // this.fullHeight = this.newHeight + 'px';
      }else{
        this.fullHeight = document.documentElement.clientHeight - 210 + 'px';
      }
    },
    //判断加急table-row颜色变化
    tableRowClassName({row, rowIndex}) {
      if(this.appName == 'inspectPro2'||this.appName == 'inspectPro'){
        if (row.COMPMODE =="加急") {
          return 'warning-row';
        }
      }
      if(this.appName == 'asset'){
        var now = (new Date()).getTime();
        var tranceTime = (new Date(row.TRACE_TIME)).getTime();//设备溯源时间到期判断
        if (!!row.TRACE_TIME && (tranceTime-now<=0)) {
          return 'warning-row';
        }
        if(!!row.TRACE_TIME && (tranceTime-now<=2*30*24*60*60*1000)){
          return 'yellow-row';
        }
      }
    },
    //排序多选点击table-row选中checkbox
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
    //选中的数据
    selChange(val) {
      this.selData = val;
      this.$emit('getSelData',val)
    },
    //判断
    singleTable(row){
      if(this.isctrl){
        this.$refs.table.toggleRowSelection(row);
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
      this.isHeight();//获取高度
      this.loadding = true;
      var data = this.searchList;
      if(opt=='item' || opt =='itemgrant' || opt=='itemreturn' || opt=='itemdisposition'){
        if(!(!!this.searchList.DEPTID && this.searchList.DEPTID == 128)){
					data.DEPTID = this.searchList.DEPTID;
				};
      }
      if(opt == 'init'){
        this.page.currentPage = 1;
      }
      data.page = this.page.currentPage;
      data.limit = this.page.pageSize;
      if(this.appName == 'inspectPro2'){
        var url =  this.basic_url + '/api-apps/app/inspectPro?DETECTIONTYPE_wheres=2';
        this.stripe = false;
      }else if(this.appName == 'inspectPro'){
        var url =  this.basic_url + '/api-apps/app/inspectPro?DETECTIONTYPE_wheres=1';
        this.stripe = false;
      }else if(this.appName == 'subcontrac'){
        var url =  this.basic_url + '/api-apps/app/subcontrac?TYPE_wheres=1';
      }else if(this.appName == 'subcontrac2'){
        var url =  this.basic_url + '/api-apps/app/subcontrac?TYPE_wheres=2';
      }else if(this.appName == 'reportFile'){
        var url =  this.basic_url + '/api-report/reportFile';
      }else if(this.appName == 'report'){
        var url =  this.basic_url + '/api-report/report';
      }else if(this.appName == 'flow'){
        var url =  this.basic_url + '/api-flow/flow/model';
      }else if(this.appName == 'flowProcess'){
        var url =  this.basic_url + '/api-flow/flow/process';
      }else if(this.appName == 'appcfg'){
        var url = this.basic_url + '/api-apps/' + this.appName;
      }else if(this.appName == 'apppermissions'){
        var url = this.basic_url + '/api-user/permissions';
      }else if(this.appName == 'api-user'){
        var url = this.basic_url + '/api-user/users';
        if(!!this.searchList.deptId  && this.searchList.deptId != 128){
					data.deptId = this.searchList.deptId;
				}
      }else if(this.appName == 'dataRestrict'){
        var url = this.basic_url + '/api-user/dataRestrict';
      }else if(this.appName == 'qualifications'){//资质证书
        var url = this.basic_url + '/api-user/users/qualifications';
      }else if(this.appName == 'appRoles'){
        var url = this.basic_url + '/api-user/roles';
      }else if(this.appName == 'objectcfg'){
        var url = this.basic_url + '/apps-center/objectcfg';
      }else if(this.appName == 'dicts'){
         var url = this.basic_url + '/api-user/dicts';
      }else if(this.appName == 'serialnum'){
        var url = this.basic_url + '/api-user/serialnum';
      }else if(this.appName == 'loginlog'){
        var url = this.basic_url + '/api-log/logs/loginLog';
      }else if(this.appName == 'operlog'){
        var url = this.basic_url + '/api-log/logs/operLog';
      }else if(this.appName == 'productType'||this.appName == 'product'||this.appName == 'inspectionSta'||this.appName == 'inspectionPro'||this.appName == 'inspectionMet'||this.appName == 'rawDataTem'||this.appName == 'workIns'){//单独定义基础数据中的APPNAME数据显示本站室所有数据。
        var url = this.basic_url + '/api-apps/appSelection/' + this.appName + '/pageForStation';
      }else if(this.appName == 'inspectionRepTem') {//检验/检测报告模板
        var url = this.basic_url + '/api-apps/appSelection/' + this.appName + '/page';
      }else if(this.appName == 'group'){
        // var url = this.basic_url + '/api-user/groups';
        var url= this.basic_url + '/api-flow/flow/group';
      }else if(this.appName == 'reportApprove'){
        var url = this.basic_url + '/api-apps/app/reportApprove';
      }else if(this.appName == 'reportApprove2'){
        var url = this.basic_url + '/api-apps/app/reportApprove?STATEAPPROVAL_where_in=8,0,17';
      }else if(this.appName == 'qualitySupApp'){
        var url = this.basic_url + '/api-apps/app/qualitySupApp';
      }else if(this.appName == 'qualitySupApp2'){
        var url = this.basic_url + '/api-apps/app/qualitySupApp?STATEAPPROVAL_where_in=8,0,17';
      }else if(this.appName == 'reportOnhole'){
        var url = this.basic_url + '/api-apps/app/reportOnhole?REPORT_TYPE_where_in=1';
      }else if(this.appName == 'reportOnhole2'){
        var url = this.basic_url + '/api-apps/app/reportOnhole?REPORT_TYPE_where_in=2';
      }else{
        var url = this.basic_url + '/api-apps/app/' + this.appName;
      }
      this.$axios.get(url, {
        params: data
      }).then((res) => {
        this.page.totalCount = res.data.count;//页码赋值
        //总的页数
        let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize);
        if(this.page.currentPage >= totalPage) {
          this.loadSign = false;
        } else {
          this.loadSign = true;
        }
        this.list = res.data.data;
        this.page.totalCount = res.data.count;

        this.loading = false;//加载动画关闭
        if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
          $('.el-table__body-wrapper table').find('.filing').remove();
        }
        // this.isHeight();//获取高度
      }).catch((wrong) => {})
    },
    
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
  
</style>
