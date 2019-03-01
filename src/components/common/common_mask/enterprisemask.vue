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
			<el-table :header-cell-style="rowClass" :data="customerList" line-center border stripe height="400px" style="width: 100%;" :default-sort="{prop:'customerList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
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
			       <el-button @click="close">取 消</el-button>
			    </div>
			</el-dialog>
	</div>
</template>

<script>
	import Config from '../../../config.js';
	export default {
  name: 'customer',
  
  data() {
    return {
		basic_url: Config.dev_url,
		customerList: [],
		dialogCustomer: false,
		loadSign:true,//加载
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
	searchinfo() {
		this.page.currentPage = 1;
		this.page.pageSize = 20;
		this.requestData();
	},
  	//点击关闭按钮
	close() {
		this.dialogCustomer = false;
	},
  	visible(type) {
  		this.type=type;
		this.dialogCustomer = true;
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
			NAME: this.searchList.NAME,
			CODE: this.searchList.CODE,
			CONTACT_ADDRESS: this.searchList.CONTACT_ADDRESS,
		};
		this.$axios.get(this.basic_url + '/api-apps/app/customer', {
			params: data
		}).then((res) => {
			this.page.totalCount = res.data.count;	
			//总的页数
			let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
			if(this.page.currentPage >= totalPage){
				 this.loadSign = false
			}else{
				this.loadSign=true
			}
			this.commentArr[this.page.currentPage]=res.data.data
			let newarr=[]
			for(var i = 1; i <= totalPage; i++){
			
				if(typeof(this.commentArr[i])!='undefined' && this.commentArr[i].length>0){
					
					for(var j = 0; j < this.commentArr[i].length; j++){
						newarr.push(this.commentArr[i][j])
					}
				}
			}					
			this.customerList = newarr;
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
			this.dialogCustomer = false;
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