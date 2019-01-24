<template>
	<div>
		<!-- 产品类别 Begin -->
			<el-dialog :modal-append-to-body="false" title="产品类别" height="400px" :visible.sync="dialogCategory" width="80%" :before-close="handleClose">
				<!-- 第二层弹出的表格 Begin-->
				<el-table :header-cell-style="rowClass" :data="categoryList" border stripe height="400px" style="width: 100%;" :default-sort="{prop:'categoryList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
					<el-table-column type="selection" fixed width="55" align="center">
					</el-table-column>
					<el-table-column label="编码" width="155" sortable prop="NUM">
					</el-table-column>
					<el-table-column label="名称" sortable prop="TYPE">
					</el-table-column>
					<el-table-column label="版本" width="100" sortable prop="VERSION" align="right">
					</el-table-column>
					<el-table-column label="机构" width="185" sortable prop="DEPTIDDesc">
					</el-table-column>
					<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat">
					</el-table-column>
					<el-table-column label="修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat">
					</el-table-column>
				</el-table>
				<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<!-- 表格 End-->
				<span slot="footer" class="el-dialog__footer">
			       <el-button type="primary" @click="determine">确 定</el-button>
			       <el-button @click="dialogCategory = false">取 消</el-button>
			    </span>
			</el-dialog>
			<!-- 产品类别 End -->
	</div>
</template>

<script>
	import Config from '../../../config.js';
	export default {
//	props:["approvingData"],//第一种方式
  name: 'category',
  
  data() {
    return {
		basic_url: Config.dev_url,
		productList: [],
		loadSign:true,//加载
		commentArr:{},
		selUser: [],//接勾选的值
		page: {
			currentPage: 1,
			pageSize: 20,
			totalCount: 0
		},
        DEPTID:'',//当前选择的机构值
        categoryList:[],
        dialogCategory:false
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
		this.dialogCategory = false;
	},
  	visible(DEPTID) {
		this.DEPTID = DEPTID;
		this.dialogCategory = true;
		this.requestData();
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
		};
		var url = this.basic_url + '/api-apps/app/productType2?DEPTID='+this.DEPTID;
		this.$axios.get(url, {
			params: data
		}).then((res) => {
			this.page.totalCount = res.data.count;
			//总的页数
			let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
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
			this.categoryList = newarr;
		}).catch((wrong) => {})
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
			this.dialogCategory = false;
			var proarr = [];
			proarr.push(this.selUser[0].NUM);
			proarr.push(this.selUser[0].TYPE);
			this.$emit('categorydata',proarr);
			this.requestData();
		}
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
    }
  },
  mounted() {
		// this.requestData();
	},
}
</script>

<style>
</style>