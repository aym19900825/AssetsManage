<template>
	<div>
	<el-dialog :modal-append-to-body="false" title="报表" :visible.sync="innerVisible" width="60%">
		<div class="">
			<button type="button" class="btn btn-green" @click="runReport">
        		<i class="icon-add"></i>运行报表
			</button>	
		</div>
  		<el-table :data="reportsList" border stripe height="550" style="width: 100%;" :default-sort="{prop:'reportsList', order: 'descending'}" @selection-change="SelChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="代码" width="200" sortable prop="code">
			</el-table-column>
			<el-table-column label="报表名称" width="200" sortable prop="name">
			</el-table-column>
			<el-table-column label="id" sortable prop="id">
			</el-table-column>
			<el-table-column label="报表文件" sortable prop="file">
			</el-table-column>
			</el-table-column>
			<el-table-column label="备注" sortable prop="remarks">
			</el-table-column>
			<el-table-column label="类型" sortable prop="type">
			</el-table-column>						
			<el-table-column label="录入人" sortable prop="createby">
			</el-table-column>	
			<el-table-column label="录入时间" sortable prop="createdate">
			</el-table-column>	
			<el-table-column label="修改人" sortable prop="updateby">
			</el-table-column>	
		
			<el-table-column label="修改日期" sortable prop="updatedate">
			</el-table-column>	
		
		<!-- 表格 End-->
		</el-table>
  </el-dialog>
  <!--没有报表-->
			<reportiframe ref="reportchild"></reportiframe>
  <!--有报表-->
			<reportpramiframe ref="reportpramchild" :pramList="pramList"></reportpramiframe>
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
		  		if(this.selreport.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selreport.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					var id=this.selreport[0].id;
					this.appname=this.reportData.app;	
					var url = this.basic_url + '/api-apps/app/'+this.appname+'/reportParams/'+id;
					this.$axios.get(url, {}).then((res) => {
						if(res.data.datas==null){
							console.log(id);
							 this.$refs.reportchild.visible(id);
							 this.close();
						}else{
							this.$refs.reportpramchild.visible(res.data.datas);
//							this.close();
						}
					}).catch((wrong) => {
						this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
					})
				}
		  		
		  	},
			requestData() {
				this.appname=this.reportData.app;
				var url = this.basic_url + '/api-apps/app/'+this.appname+'/report';
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.reportsList = res.data.datas;
					this.innerVisible = true;
				}).catch((wrong) => {
					this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
				})
				
			},
	   },
	    mounted() {
			
		},
	}
</script>

<style>
</style>