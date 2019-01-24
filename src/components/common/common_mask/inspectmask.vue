<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="委托书编号" :visible.sync="dialoginspect" width="80%" >
			<el-table :data="inspectList" border stripe :header-cell-style="rowClass"  style="width: 100%;"height="400px" :default-sort="{prop:'inspectList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore('inspect')">	
				<el-table-column type="selection" width="55" fixed align="center">
				</el-table-column>
				<el-table-column label="检验委托书编号" sortable width="130px" prop="PROXYNUM">
				</el-table-column>
				<el-table-column label="委托单位名称" sortable width="140px" prop="V_NAME">
				</el-table-column>
				<el-table-column label="生产单位名称" sortable width="140px" prop="P_NAME">
				</el-table-column>
				<el-table-column label="样品名称" sortable width="140px" prop="ITEM_NAME">
				</el-table-column>
				<el-table-column label="样品型号" sortable width="140px" prop="ITEM_MODEL">
				</el-table-column>
				<el-table-column label="检测依据" width="200px" prop="REMARKS" sortable>
				</el-table-column>
				<el-table-column label="完成日期" width="140px" prop="COMPDATE" sortable  :formatter="dateFormat" data-type = "">
				</el-table-column>
				<el-table-column label="完成方式" width="100px" prop="COMPMODE" sortable>
				</el-table-column>
				<el-table-column label="检测报告编号" width="140px" prop="REPORT_NUM" sortable>
				</el-table-column>
				<el-table-column label="主检组" width="140px" prop="MAINGROUP" sortable>
				</el-table-column>
				<el-table-column label="录入时间" width="140px" prop="ENTERDATE" sortable :formatter="dateFormat">
				</el-table-column>
				<el-table-column label="版本" width="80" prop="VERSION" sortable>
				</el-table-column>
			</el-table>	
			<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
			</el-pagination>
			<span slot="footer" class="dialog-footer">
			   <el-button type="primary" @click="determine">确 定</el-button>
		       <el-button @click="close">取 消</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	import Config from '../../../config.js';
	export default {
  name: 'sample',
  
  data() {
    return {
		basic_url: Config.dev_url,
		inspectList: [],
		dialoginspect: false,
		loadSign:true,//加载
		commentArr:{},
		selval: [],//接勾选的值
		page: {
			currentPage: 1,
			pageSize: 20,
			totalCount: 0
			},
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
		this.selval = val;
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
		this.dialoginspect = false;
	},
  	visible() {
		this.dialoginspect = true;
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
			//委托书
			this.$axios.get(this.basic_url + '/api-apps/app/inspectPro', {params: data}).then((res) => {
				console.log(res);
				this.page.totalCount = res.data.count;
				//总的页数
				let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize);
				if(this.page.currentPage >= totalPage) {
					this.loadSign = false
				} else {
					this.loadSign = true
				}
				this.commentArr[this.page.currentPage] = res.data.data
				let newarr = []
				for(var i = 1; i <= totalPage; i++) {
					if(typeof(this.commentArr[i]) != 'undefined' && this.commentArr[i].length > 0) {

						for(var j = 0; j < this.commentArr[i].length; j++) {
							newarr.push(this.commentArr[i][j])
						}
					}
				}
				this.inspectList = newarr;
			}).catch((wrong) => {
				this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
			})
	},
	determine(){
		if(this.selval.length == 0){
			this.$message({
				message: '请选择数据',
				type: 'warning'
			});
		}else if(this.selval.length > 1){
			this.$message({
				message: '不可同时选择多条数据',
				type: 'warning'
			});
		}else{
			this.dialoginspect = false;
			var proxynum=this.selval[0].PROXYNUM;	
			var version=this.selval[0].VERSION;
			this.$emit('appendpro',proxynum);
			this.$emit('appendver',version);
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