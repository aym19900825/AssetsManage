<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="受检企业" :visible.sync="dialogCustomer" width="80%">
			<el-form :model="searchList" label-width="70px">
				<el-row :gutter="10">
					<el-col :span="5">
						<el-form-item label="统一信用代码" prop="CODE" label-width="100px">
							<el-input v-model="searchList.CODE">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="单位名称" prop="NAME">
							<el-input v-model="searchList.NAME">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="联系地址" prop="CONTACT_ADDRESS">
							<el-input v-model="searchList.CONTACT_ADDRESS">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2">
						<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
					</el-col>
				</el-row>
			</el-form>
			<el-table ref="table" :header-cell-style="rowClass" :data="customerList" line-center border stripe height="360px" style="width: 100%;" :default-sort="{prop:'customerList', order: 'descending'}"
				v-loadmore="loadMore"
				v-loading="loading"  
				element-loading-text="加载中…"
				element-loading-spinner="el-icon-loading"
				element-loading-background="rgba(255, 255, 255, 0.9)"
				@selection-change="SelChange">
				<el-table-column type="selection" width="55" fixed align="center">
				</el-table-column>
				<el-table-column label="统一信用代码/组织机构代码" width="200" sortable prop="CODE" >
				</el-table-column>
				<el-table-column label="单位名称" sortable prop="NAME" >
				</el-table-column>
				<el-table-column label="联系地址" sortable prop="CONTACT_ADDRESS">
				</el-table-column>
				<el-table-column label="类型" sortable prop="TYPE">
				</el-table-column>
				<el-table-column label="备注" sortable prop="MEMO" >
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
	import { Loading } from 'element-ui'
	export default {
 		 name: 'customer',
  
	data() {
		return {
			basic_url: Config.dev_url,
			loading: false,
			loadSign:true,//加载
			customerList: [],
			dialogCustomer: false,
			commentArr:{},
			selUser: [],//接勾选的值
			type:'',
			searchList: {
						NAME: '',
						CODE: '',
						CONTACT_ADDRESS: '',
					},
			page: {
				currentPage: 1,
				pageSize: 20,
				totalCount: 0
			},

			selkeys: [],
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
		var _this = this;
		//处理分页时，分页记忆失去之前数据，500必须大于setSelectRow的时间
		setTimeout(function(){
			_this.changePageCoreRecordData();
		},800);
	},
  	sizeChange(val) {
		this.changePageCoreRecordData();
		this.page.pageSize = val;
		this.requestData();
	},
	currentChange(val) {
		this.changePageCoreRecordData();
		this.page.currentPage = val;
		this.requestData();
	},
	searchinfo() {
		this.page.currentPage = 1;
		this.page.pageSize = 20;
		this.requestData();
	},
  	//点击关闭按钮
	close() {
		this.dialogCustomer = false;
	},
	// this.$refs.enterprisechild.visible(type , this.dataInfo.appendid);
  	visible(type,id,CJDW) {
		this.type=type;
		this.CJDW=CJDW;
		if(!!id && type == 'vname'){
			this.selkeys.push(id);
		}
		this.requestData();
		this.dialogCustomer = true;
  	},
  	loadMore () {//滚动加载更多
	   if (this.loadSign) {
	     this.loadSign = false
	     this.page.currentPage++
	     if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
	       return
	     }
	     setTimeout(() => {
	       this.loadSign = true
		 }, 1000)
		 this.changePageCoreRecordData();
	     this.requestData();
	   }
	},
	requestData(){
		this.loading = true;
		var data = {
			page: this.page.currentPage,
			limit: this.page.pageSize,
			NAME: this.searchList.NAME,
			CODE: this.searchList.CODE,
			CONTACT_ADDRESS: this.searchList.CONTACT_ADDRESS,
		};
		var url = this.basic_url + '/api-apps/app/customer';
		url = !!this.CJDW ? url+'&DEPTID_wheres='+this.CJDW : url;
		this.$axios.get(url, {
			params: data
		}).then((res) => {
			console.log(this.CJDW);
			this.page.totalCount = res.data.count;	
			//总的页数
			let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
			if(this.page.currentPage >= totalPage){
				 this.loadSign = false
			}else{
				this.loadSign=true
			}
			this.customerList = res.data.data;
			setTimeout(()=>{
				this.setSelectRow();
			}, 200)
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
			if(this.type=="vname"){ 
				var name=this.selUser[0].NAME;//名称
				var address=this.selUser[0].CONTACT_ADDRESS;//地址 
				var	zipcode=this.selUser[0].ZIPCODE;//地址
				var id=this.selUser[0].ID;
				this.$emit('appendname',name);
				this.$emit('appendadd',address);
				this.$emit('appendzip',zipcode);
				this.$emit('appendid',id);
			}else if(this.type="pname"){
				var names=this.selUser[0].NAME;//生产单位
				this.$emit('appendnames',names);
			}else if(this.type="notivname"){
				var names=this.selUser[0].NAME;//生产单位
				this.$emit('appendnames',names);
			}
			// this.dialogCustomer = false;
			this.requestData();
			this.resetBasisInfo();//调用resetBasisInfo函数
		}
	},
    resetBasisInfo(){//点击确定或取消按钮时重置数据20190303
        this.dialogCustomer = false;//关闭弹出框
        this.customerList = [];//列表数据置空
        this.page.currentPage = 1;//页码重新传值
        this.page.pageSize = 10;//页码重新传值
	},
	//table记忆
	changePageCoreRecordData () {
		let idKey = 'ID';
		let that = this;
		if (this.selkeys.length <= 0) {
			this.selkeys = this.selUser;
			return;
		}
		let selectAllIds = [];
		this.selkeys.forEach(row=>{
			selectAllIds.push(row[idKey]);
		})
		let selectIds = [];
		this.selUser.forEach(row=>{
			selectIds.push(row[idKey]);
			if (selectAllIds.indexOf(row[idKey]) < 0) {
				that.selkeys.push(row);
			}
		})
		let noSelectIds = [];
		this.customerList.forEach(row=>{
			if (selectIds.indexOf(row[idKey]) < 0) {
				noSelectIds.push(row[idKey]);
			}
		})
		noSelectIds.forEach(id=>{
			if (selectAllIds.indexOf(id) >= 0) {
				for(let i = 0; i< that.selkeys.length; i ++) {
					if (that.selkeys[i][idKey] == id) {
						that.selkeys.splice(i, 1);
						break;
					}
				}
			}
		})
	},
	//设置选中值
	setSelectRow() {
		if (!this.selkeys || this.selkeys.length <= 0) {
			return;
		}
		let idKey = 'ID';
		let selectAllIds = [];
		let that = this;
		this.selkeys.forEach(row=>{
			selectAllIds.push(row[idKey]);
		})
		this.$refs.table.clearSelection();
		for(var i = 0; i < this.customerList.length; i++) {                    
			if (selectAllIds.indexOf(this.customerList[i][idKey]) >= 0) {
				this.$refs.table.toggleRowSelection(this.customerList[i], true);
			}
		}
	}
  },
    mounted() {
		this.requestData();
	},
}
</script>

<style>
</style>