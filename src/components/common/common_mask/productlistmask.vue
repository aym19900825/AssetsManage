<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="产品名称" :visible.sync="dialogProduct" width="80%">
			<el-form inline-message :model="searchList" label-width="45px">
				<el-row :gutter="10">
					<el-col :span="5">
						<el-form-item label="编码" prop="PRO_NUM">
							<el-input v-model="searchList.PRO_NUM"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="名称" prop="PRO_NAME">
							<el-input v-model="searchList.PRO_NAME"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
						<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px; margin-left: 2px">重置</el-button>
					</el-col>
				</el-row>
			</el-form>
			<el-table ref="singleTable" 
				:header-cell-style="rowClass"
				:data="productList" 

				highlight-current-row
				@current-change="SelChange"

				@selection-change="setSel"

				line-center 
				border 
				stripe 
				height="360px" 
				style="width: 100%;" 
				:default-sort="{prop:'productList', order: 'descending'}"
				v-loading="loading"  
				element-loading-text="加载中…"
				element-loading-spinner="el-icon-loading"
				element-loading-background="rgba(255, 255, 255, 0.9)">
				<el-table-column type="selection" fixed width="55" align="center">
				</el-table-column>
				<el-table-column label="编码" width="155" sortable prop="PRO_NUM">
				</el-table-column>
				<el-table-column label="名称" sortable prop="PRO_NAME">
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
				<el-pagination background class="text-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<div slot="footer">
			       <el-button type="primary" @click="determine">确 定</el-button>
			       <el-button @click="resetBasisInfo">取 消</el-button>
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
		loading: false,
		loadSign:true,//加载
		productList: [],
		dialogProduct: false,
		commentArr:{},
		selUser: [],//接勾选的值
		page: {
			currentPage: 1,
			pageSize: 20,
			totalCount: 0
		},
		searchList: {
			PRO_NUM:'',
			PRO_NAME:'',
		},
		allDepts: '',
		DEPTID:'',//当前选择的机构值
		CJDW:'',//机构编号
		NUM:'',//产品类别编号
		appname:'',//appname
		NUM:'',//产品类别的编号
    }
  },

  methods: {
	setSel(val) {
      	this.selUser = val;
	},
	searchinfo(){
		this.page.currentPage = 1;
		this.page.pageSize = 20;
		this.getData();
	},
	resetbtn(){
		this.searchList = {
			PRO_NUM:'',
			PRO_NAME:'',
		}
	},	
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
	SelChange(row) {
		this.selUser = [];
		this.selUser.push(row);
		this.$refs.singleTable.clearSelection();
        this.$refs.singleTable.toggleRowSelection(row);
	},
  sizeChange(val) {
		this.page.pageSize = val;
		this.getData();
	},
	currentChange(val) {
		this.page.currentPage = val;
		this.getData();
	},
  	//点击关闭按钮
	close() {
		this.dialogProduct = false;
	},
	//产品类别数据
	requesCategory(){
		this.loading = true;
		var data = {
			page: this.page.currentPage,
			limit: this.page.pageSize,
		};
		this.$axios.get(this.basic_url + '/api-apps/app/productType2?DEPTID='+this.WORKPLAN.PROP_UNIT, {
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
  visible(NUM,CJDW) {
			if(!!CJDW){
					this.NUM = NUM;
					this.CJDW = CJDW;
					this.dialogProduct = true;
					this.getData();
			}else{
				this.appname=NUM.appname;
				this.NUM=NUM.P_NUM;
				this.dialogProduct = true;
				this.getData();
			}
  	},

	getAllDepts(){
			var url = this.basic_url + '/api-user/depts/findSubStrsById/'+this.CJDW;
			this.$axios.get(url, {
			}).then((res) => {
				this.allDepts = res.data;
				this.getData();
			}).catch((wrong) => {})
		},
	getData(){
		var data = {
			page: this.page.currentPage,
			limit: this.page.pageSize,
			PRO_NUM:this.searchList.PRO_NUM,
			PRO_NAME: this.searchList.PRO_NAME,
		};
		if(!!this.CJDW){
				var url = this.basic_url + '/api-apps/app/product2?NUM_wheres='+this.NUM+'&DEPTID_where_in='+this.allDepts;
		}else{
			// /api-apps/appCustom/findProductTypebyAuthandDept/{deptId}/{type}/{pdtypenum}
			// var url = this.basic_url + '/api-apps/app/product2?authfrom='+this.appname+'&authfliter=true&NUM_wheres='+this.NUM;
			// var url = this.basic_url +'/api-apps/appCustom/findProductTypebyAuthandDept/'+this.$store.state.currentcjdw[0].id+'/'+1+this.NUM;
				if(this.appname=='inspectPro'){
					var url = this.basic_url +'/api-apps/appCustom/findProductbyAuthandDept/'+this.$store.state.currentcjdw[0].id+'/'+1+'/'+this.NUM;
			}else{
					var url = this.basic_url +'/api-apps/appCustom/findProductbyAuthandDept/'+this.$store.state.currentcjdw[0].id+'/'+2+'/'+this.NUM;
			}
		}
		this.$axios.get(url, {}).then((res) => {
			this.page.totalCount = res.data.count;
			this.productList = res.data.data;
			this.loading = false;
		}).catch((wrong) => {})
	},
	getproduct(val){
		var data = {
			page: this.page.currentPage,
			limit: this.page.pageSize,
			NUM:this.searchList.PRO_NUM,
			TYPE: this.searchList.PRO_NAME,
		};
			if(val.appname=='inspectPro'){
					var url = this.basic_url +'/api-apps/appCustom/findProductbyAuthandDept/'+this.$store.state.currentcjdw[0].id+'/'+1+'/'+null;
			}else{
					var url = this.basic_url +'/api-apps/appCustom/findProductbyAuthandDept/'+this.$store.state.currentcjdw[0].id+'/'+2+'/'+null;
			}
		this.$axios.get(url, {}).then((res) => {
			console.log(res);
			this.page.totalCount = res.data.count;
			this.productList = res.data.data;
			this.dialogProduct = true;
			this.loading = false;
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
			var proarr = [];
			proarr.push(this.selUser[0].PRO_NUM);
			proarr.push(this.selUser[0].PRO_NAME);
			proarr.push(this.selUser[0].VERSION);
			this.$emit('appenddata',proarr);
			this.getData();
			this.resetBasisInfo();//调用resetBasisInfo函数
		}
	},
	
	resetBasisInfo(){//点击确定或取消按钮时重置数据20190303
			this.dialogProduct = false;//关闭弹出框
			this.productList = [];//列表数据置空
			this.page.currentPage = 1;//页码重新传值
			this.page.pageSize = 20;//页码重新传值
	},
  },
}
</script>

<style>
</style>