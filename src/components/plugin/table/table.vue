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
      v-loading="loading"
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
    <el-pagination
        style="float: right;"
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
      }else if(this.isshift){
        var selData = this.selData;
        var list = this.list;
        var minIndex = 0;
        var maxIndex = 0;
        var clickIndex = 0;
        var selIndex = [];
        for(var i=0; i<selData.length; i++){
          list.forEach(function(item, index){
            if(item.ID == selData[i].ID){
              selIndex.push(index);
              if(i==0){
                minIndex = index;
                maxIndex = index;
              }else{
                minIndex = index<minIndex ? index:minIndex; 
                maxIndex = index>maxIndex ? index:maxIndex; 
              }
            }
            if(item.ID == row.ID){
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
      // if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
      //   $('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
      //   sessionStorage.setItem('toBtm','true');
      // }else{
      //   sessionStorage.setItem('toBtm','false');
      // }
      this.requestData();
    },
    currentChange(val) {
      this.page.currentPage = val;
      // if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
      //   $('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
      //   sessionStorage.setItem('toBtm','true');
      // }else{
      //   sessionStorage.setItem('toBtm','false');
      // }
      this.requestData();
    },
    requestData(opt){
      var data = this.searchList;
      if(opt == 'init'){
        this.page.currentPage = 1;
      }
      data.page = this.page.currentPage;
      data.limit = this.page.pageSize;
      var url = this.basic_url + '/api-apps/app/' + this.appName;
      this.$axios.get(url, {
        params: data
      }).then((res) => {
        this.list = res.data.data;
        this.page.totalCount = res.data.count;
      }).catch((wrong) => {})
    },
    loadMore(){
      let up2down = sessionStorage.getItem('up2down');
      if(this.loadSign) {					
        if(up2down=='down'){
          this.page.currentPage++;
          if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
            this.page.currentPage = Math.ceil(this.page.totalCount / this.page.pageSize)
            return false;
          }
          let append_height = window.innerHeight - this.$refs.table.$el.offsetTop - 50;
          if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
            $('.el-table__body-wrapper table').append('<div class="filing" style="height: '+append_height+'px;width: 100%;"></div>');
            sessionStorage.setItem('toBtm','true');
          }
        }else{
          sessionStorage.setItem('toBtm','false');
          this.page.currentPage--;
          if(this.page.currentPage < 1) {
            this.page.currentPage=1;
            return false;
          }
        }
        this.loadSign = false;
        setTimeout(() => {
          this.loadSign = true;
        }, 1000)
        this.requestData();
      }
    },
    eventBind(){
      var that = this;
      document.onkeydown = function(e) {        //按下键盘      
      switch (e.keyCode) {        
        case 16:           
          that.isshift = true;     
          break;         
        case 17:          
          that.isctrl = true;        
          break;     
        }     
      };    
      document.onkeyup = function(e) {        //放弃键盘   
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

