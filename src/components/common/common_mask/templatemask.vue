<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="原始数据模版" :visible.sync="dialogtemplate" width="80%">
				<el-table :header-cell-style="rowClass" :data="categoryList" border stripe height="400px" style="width: 100%;" :default-sort="{prop:'categoryList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore" >
					<el-table-column type="selection" fixed width="55" align="center">
					</el-table-column>
					<el-table-column label="编码" width="155" sortable prop="NUM">
					</el-table-column>
					<el-table-column label="模板描述" sortable prop="DECRIPTION">
					</el-table-column>							             
					<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat">
					</el-table-column>
					<el-table-column label="机构" width="185" sortable prop="DEPTIDDesc">
					</el-table-column>
				</el-table>
				<el-pagination background class="pull-right pt10"@size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<div slot="footer" class="dialog-footer">
			       <el-button type="primary" @click="determine">确 定</el-button>
			       <el-button @click="close">取 消</el-button>
			   </div>
			</el-dialog>
	</div>
</template>

<script>
	import Config from '../../../config.js';
	export default {
//	props:["approvingData"],//第一种方式
  name: 'product',
  
  data() {
    return {
		basic_url: Config.dev_url,
		categoryList: [],
		dialogtemplate: false,
		loadSign:true,//加载
		commentArr:{},
		selUser: [],//接勾选的值
		page: {
			currentPage: 1,
			pageSize: 20,
			totalCount: 0
			},
		DEPTID:'',//当前选择的机构值
    }
  },

  methods: {
  	dateFormat(row, column) {
		var date = row[column.property];
		if(date == undefined) {
			return "";
		}
		return this.$moment(date).format("YYYY-MM-DD");
	},
  	//表头居中
	rowClass({ row, rowIndex}) {
	    return 'text-align:center'
	},
	SelChange(val) {
		this.selUser = val;
	},
  	sizeChange(val) {
		this.page.pageSize = val;
		this.requestData();
	},
	currentChange(val) {
		this.page.currentPage = val;
		this.requestData();
	},
  	//点击关闭按钮
	close() {
		this.dialogtemplate = false;
	},
  	visible() {
		this.dialogtemplate = true;
  	},
  	loadMore () {
	   if (this.loadSign) {
	     this.loadSign = false
	     this.page.currentPage++
	     if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
	       return
	     }
	     setTimeout(() => {
	       this.loadSign = true
	     }, 1000)
	     this.requestData();
	   }
	},
	requestData(){
		var data = {
			page: this.page.currentPage,
			limit: this.page.pageSize,
		}
		var url = this.basic_url + '/api-apps/app/rawDataTem';
		this.$axios.get(url, {}).then((res) => {
			this.page.totalCount = res.data.count;
			//总的页数
			let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize);
			if(this.page.currentPage >= totalPage) {
				this.loadSign = false;
			} else {
				this.loadSign = true;
			}
			this.commentArr[this.page.currentPage] = res.data.data
			let newarr = [];
			for(var i = 1; i <= totalPage; i++) {

				if(typeof(this.commentArr[i]) != 'undefined' && this.commentArr[i].length > 0) {

					for(var j = 0; j < this.commentArr[i].length; j++) {
						newarr.push(this.commentArr[i][j])
					}
				}
			}
			console.log(this.categoryList);
			this.categoryList = newarr;
		}).catch((wrong) => {
			this.$message({
					message: '网络错误，请重试',
					type: 'error'
				});
		})
	},
	determine(){
		if(this.selUser.length == 0){
			this.$message({
				message: '请选择数据',
				type: 'warning'
			});
		}else if(this.selUser.length > 1){
			this.$message({
				message: '不可同时选择多条数据',
				type: 'warning'
			});
		}else{
			this.dialogtemplate = false;
			var num=this.selUser[0].NUM;
			var des=this.selUser[0].DECRIPTION;
			this.$emit('appendnum',num);
			this.$emit('appenddes',des);
			this.requestData();
		}
	},
  },
  mounted() {
		this.requestData();
	},
}
</script>

<style>
</style>