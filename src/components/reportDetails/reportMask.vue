<template>
	<div>
	<el-dialog :modal-append-to-body="false" title="报表" :visible.sync="innerVisible" width="60%">
		<div class="mask_content">
			<div class="scrollbar pb20" style="max-height:360px;">
				<el-table ref="table" :data="reportsList" border stripe 
				highlight-current-row
				style="width: 100%;"
				:default-sort="{prop:'reportsList', order: 'descending'}"
				@current-change="singleTable"
				@selection-change="SelChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="报表名称" width="180" sortable prop="code">
					</el-table-column>
					<el-table-column label="报表文件" sortable prop="name">
					</el-table-column>
					<el-table-column label="备注" width="200" sortable prop="remarks">
					</el-table-column>
					<el-table-column label="类型" width="160" sortable prop="type">
					</el-table-column>	
				<!-- 表格 End-->
				</el-table>
			</div>
			<div class="pb10 text-center">
				<el-button type="success" @click="runReport"><i class="icon-add"></i> 运行报表</el-button>
			</div>
		</div>
  </el-dialog>
  <!--没有报表-->
	<reportiframe ref="reportchild"></reportiframe>
  <!--有报表-->
	<reportpramiframe ref="reportpramchild" :pramList="pramList" @requestData=requestData></reportpramiframe>
 </div>
</template>

<script>
	import Config from '../../config.js';
	import reportiframe from'../common/report_iframe.vue';
	import reportpramiframe from'../common/report_pram_iframe.vue';
	export default {
		name: 'report',
		 props:["reportData"],//第一种方式
		components: {
			reportiframe,
			reportpramiframe
		},
	    data(){
	    	return{
	    		basic_url: Config.dev_url,
	    		innerVisible: false,
	    		reportsList: [],
	    		selreport:[],
	    		pramList:{},
	    		appname:'',	
	    	}
	    },
	    methods:{
			singleTable(row){
			if(this.isctrl){
				this.$refs.table.toggleRowSelection(row);
			}else if(this.isshift){
				var selData = this.selchange;
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
	    	SelChange(val) {
				this.selchange = val;
			},
			//点击关闭按钮
			close() {
				this.innerVisible = false;
			},
			open() {
				this.innerVisible = true;
			},
		  	visible() {
				this.open();
				this.requestData();
		  	},
		  	SelChange(val) {
				this.selreport = val;
			},
		  	runReport(){
				var token = sessionStorage.getItem('access_token');
		  		if(this.selreport.length == 0) {
					this.$message({
						message: '请您选择要运行多个报表',
						type: 'warning'
					});
					return;
				} else if(this.selreport.length > 1) {
					this.$message({
						message: '不可同时运行多个报表',
						type: 'warning'
					});
					return;
				} else {
					var id=this.selreport[0].id;
					var file=this.selreport[0].file;
					this.appname=this.reportData.app;
					var url = this.basic_url + '/api-apps/app/'+this.appname+'/reportParams/'+id;
				
					this.$axios.get(url, {}).then((res) => {
						if(res.data.datas==null){
						  		var url=this.basic_url;
								var pos = url.lastIndexOf(':');
								url=url.substring(0,pos+1); 
						  		this.url=url+"5300";
								 var url = this.url+"/ureport/preview?_u=mysql:" +file+'&access_token='+token;
             					window.open(url); 
						}else{
							
							this.$refs.reportpramchild.visible(res.data.datas,file);
						}
					}).catch((wrong) => {
					})
				}
		  		
		  	},
			requestData() {
				console.log(this.reportData.app);
				this.appname=this.reportData.app;
				var url = this.basic_url + '/api-apps/app/'+this.appname+'/report';
				this.$axios.get(url, {}).then((res) => {
					this.reportsList = res.data.datas;
					this.innerVisible = true;
				}).catch((wrong) => {
				})
				
			},
	   },
	    mounted() {
			
		},
	}
</script>

<style>
</style>