<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="产品名称" :visible.sync="dialogProduct" width="80%">
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
				<el-table-column type="selection" width="55" fixed align="center">
				</el-table-column>
				<el-table-column label="设备编号" width="130" sortable prop="ASSETNUM">
				</el-table-column>
				<el-table-column label="设备名称" width="200" sortable prop="DESCRIPTION">
				</el-table-column>
				<el-table-column label="型号" sortable prop="MODEL">
				</el-table-column>
				<el-table-column label="技术指标" width="120" sortable prop="ASSET_KPI">
				</el-table-column>						
				<el-table-column label="制造商" width="140" sortable prop="VENDOR">
				</el-table-column>
				<el-table-column label="出厂编号" width="160" sortable prop="FACTOR_NUM">
				</el-table-column>
				<el-table-column label="价格(万元)" width="140" sortable prop="A_PRICE">
				</el-table-column>
				<el-table-column label="接受日期" width="140" sortable prop="ACCEPT_DATE" :formatter="dateFormat">
				</el-table-column>
				<el-table-column label="启用日期" width="140" sortable prop="S_DATE" :formatter="dateFormat">
				</el-table-column>						
				<el-table-column label="配置地址" width="140" sortable prop="C_ADDRESS">
				</el-table-column>
				<el-table-column label="接收状态" width="120" sortable prop="A_STATUS">
				</el-table-column>
				<el-table-column label="保管人" width="200" sortable prop="KEEPERDesc">
				</el-table-column>						
				<el-table-column label="备注" width="200" sortable prop="MEMO">
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
		this.requestData();
	},
	currentChange(val) {
		this.page.currentPage = val;
		this.requestData();
	},
  	//点击关闭按钮
	close() {
		this.dialogProduct = false;
	},
	addprobtn(){
		this.dialogVisible3 = true;
		this.requestnum = '1';
		this.requesCategory();
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
				this.requestData();
		}else{
			this.appname=NUM.appname;
			this.NUM=NUM.P_NUM;
			this.dialogProduct = true;
			this.getData();
		}
  	},

  // 	loadMore () {
	//    if (this.loadSign) {
	//      this.loadSign = false
	//      this.page.currentPage++
	//      if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
	//        return
	//      }
	//      setTimeout(() => {
	//        this.loadSign = true
	//      }, 1000)
	//      this.requestData();
	//    }
	// },
	getData(){
		var data = {
			page: this.page.currentPage,
			limit: this.page.pageSize,
		};
		if(!!this.CJDW){
				var url = this.basic_url + '/api-apps/app/product2?NUM_wheres='+this.NUM+'&DEPTID_where_in='+this.allDepts;
		}else{
			console.log(this.appname);
			if(this.appname=='inspectPro'){
				var url = this.basic_url +'/api-apps/appCustom/findProductTypebyAuthandDept/'+this.$store.state.currentcjdw[0].id+'/'+1+'/'+this.NUM;
			}else{
				var url = this.basic_url +'/api-apps/appCustom/findProductTypebyAuthandDept/'+this.$store.state.currentcjdw[0].id+'/'+2+'/'+this.NUM;
			}
		}
		this.$axios.get(url, {}).then((res) => {
			this.page.totalCount = res.data.count;
			//总的页数
			let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
			if(this.page.currentPage >= totalPage) {
				this.loadSign = false
			} else {
				this.loadSign = true
			}
			this.productList = res.data.data;
			this.loading = false;
		}).catch((wrong) => {})
	},
	requestData(){
		if(this.allDepts == '' && !this.CJDW){
			this.getAllDepts();
		}else{
			this.getData();
		}
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
			this.requestData();
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