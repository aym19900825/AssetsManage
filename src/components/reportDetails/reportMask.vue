<template>
	<div>
	<el-dialog :modal-append-to-body="false" title="报表" :visible.sync="innerVisible" width="60%">
  		<el-table :data="reportsList" border stripe height="550" style="width: 100%;" :default-sort="{prop:'reportsList', order: 'descending'}" @selection-change="SelChange">
			<el-table-column type="selection" width="55" ">
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
 </div>
</template>

<script>
	import Config from '../../config.js';
	export default {
		name: 'report',
		 props:["reportData"],//第一种方式
	    data(){
	    	return{
	    		basic_url: Config.dev_url,
	    		innerVisible: false,
	    		reportsList: [],
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
		  	loadMore () {
			   if (this.loadSign) {
			     this.loadSign = false
			     this.page++
			     if (this.page > 10) {
			       return
			     }
			     setTimeout(() => {
			       this.loadSign = true
			     }, 1000)
			     console.log('到底了', this.page)
			   }
			 },
			requestData() {
				this.appname=this.reportData.app;
				console.log(this.appname);

				var url = this.basic_url + '/api-apps/app/'+this.appname+'/report';
				console.log(url);
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.reportsList = res.data.data;
					this.innerVisible = true;
				}).catch((wrong) => {
					this.$message({
							message: '网络错误，请重试1222',
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