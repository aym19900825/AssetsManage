<template>
	<div>
		<el-dialog inline-message :modal-append-to-body="false" title="产品类别" height="360px" :visible.sync="dialogCategory" width="80%" :before-close="handleClose">
			<el-form inline-message :model="searchList" label-width="45px">
				<el-row :gutter="10">
					<el-col :span="5">
						<el-form-item label="编码" prop="NUM">
							<el-input v-model="searchList.NUM"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="名称" prop="TYPE">
							<el-input v-model="searchList.TYPE"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="版本" prop="VERSION">
							<el-input v-model="searchList.VERSION"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
						<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px; margin-left: 2px">重置</el-button>
					</el-col>
				</el-row>
			</el-form>

			<el-table   ref="singleTable"
						highlight-current-row
    				@current-change="SelChange"
						@selection-change="setSel"
						:header-cell-style="rowClass" 
						:data="categoryList" 
						border 
						stripe 
						height="300px" 
						style="width: 100%;" 
						:default-sort="{prop:'categoryList', order: 'descending'}"
					    v-loading="loading"  
					    element-loading-text="加载中…"
					    element-loading-spinner="el-icon-loading"
					    element-loading-background="rgba(255, 255, 255, 0.9)"
						>
					<el-table-column type="selection" fixed width="55" align="center">
					</el-table-column>
					<el-table-column label="编码" width="155" sortable prop="NUM">
					</el-table-column>
					<el-table-column label="名称" sortable prop="TYPE">
					</el-table-column>
					<el-table-column label="版本" width="100" sortable prop="VERSION" align="right">
					</el-table-column>
					<el-table-column label="机构" width="185" sortable prop="FULLNAME">
					</el-table-column>
					<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat">
					</el-table-column>
					<el-table-column label="修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat">
					</el-table-column>
				</el-table>

				<el-pagination background class="text-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>

				<!-- 表格 End-->
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
  name: 'category',
  
  data() {
    return {
		basic_url: Config.dev_url,
		loadSign: true, //鼠标滚动加载数据
		loading: false,//默认加载数据时显示loading动画
		productList: [],
		commentArr:{},
		selUser: [],//接勾选的值
		DEPTID:'',//当前选择的机构值
		appname:'',//应用名称
		categoryList:[],
		dialogCategory:false,
		page: {
			currentPage: 1,
			pageSize: 20,
			totalCount: 0
		},
		searchList: {
			NUM:'',
			VERSION:'',
			TYPE: '',
		},
		allDepts: []
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
	SelChange(row) {
		this.selUser = [];
		this.selUser.push(row);
		this.$refs.singleTable.clearSelection();
		this.$refs.singleTable.toggleRowSelection(row);	
	},
	setSel(val) {
			this.selUser = val;
			this.categoryList.forEach(item => {
				// 排他,每次选择时把其他选项都清除
				if (item.id !== val.id) {
					item.checked = false
				}
			});
    },
  	
	searchinfo() {
		this.page.currentPage = 1;
		this.page.pageSize = 20;
		this.requestData();
	},
	resetbtn(){
		this.searchList = {
			NUM:'',
			VERSION:'',
			TYPE: '',
		}
	},
  	//点击关闭按钮
	close() {
		this.dialogCategory = false;
	},
	visible(DEPTID) {
	if(!!DEPTID.appname){
		this.appname=DEPTID.appname;
	}else{
			this.DEPTID = DEPTID;
	}
		this.dialogCategory = true;
		this.requestData();
	},
		//改变页数
		sizeChange(val) {
			this.page.pageSize = val;
			if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
				$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
				sessionStorage.setItem('toBtm','true');
			}else{
				sessionStorage.setItem('toBtm','false');
			}
			this.requestData();
		},
		//当前页数
		currentChange(val) {
			this.page.currentPage = val;
			if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
				$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
				sessionStorage.setItem('toBtm','true');
			}else{
				sessionStorage.setItem('toBtm','false');
			}
			this.requestData();
		},
	//Table默认加载数据
	getAllDepts(){
		var url = this.basic_url + '/api-user/depts/findSubStrsById/'+this.DEPTID;
		this.$axios.get(url, {
		}).then((res) => {
			this.allDepts = res.data;
		}).catch((wrong) => {})
	},
	getData(){
		this.loading = true;
		var data = {
			page: this.page.currentPage,
			limit: this.page.pageSize,
			NUM:this.searchList.NUM,
			TYPE: this.searchList.TYPE,
			VERSION:this.searchList.VERSION,
		}
		if(!!this.appname){
			if(this.appname=='inspectPro'){
					var url = this.basic_url +'/api-apps/appCustom/findProductTypebyAuthandDept/'+this.$store.state.currentcjdw[0].id+'/'+1;
			}else{
					var url = this.basic_url +'/api-apps/appCustom/findProductTypebyAuthandDept/'+this.$store.state.currentcjdw[0].id+'/'+2;
			}
			
			// var url = this.basic_url + '/api-apps/app/productType2?authfrom='+this.appname+'&authfliter=true';
		}else{
			var url = this.basic_url + '/api-apps/app/productType2?DEPTID_where_in='+this.allDepts;
		}
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
			this.categoryList = res.data.data;
			this.categoryList.forEach(item => {
          item.checked = false
        })
			this.loading = false;//加载动画关闭
			if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
				$('.el-table__body-wrapper table').find('.filing').remove();
			}
		}).catch((wrong) => {});
	},
	requestData(){
		if(this.allDepts == ''&&!this.appname){
			this.deptsFlag = false;
			var url = this.basic_url + '/api-user/depts/findSubStrsById/'+this.DEPTID;
			this.$axios.get(url, {
			}).then((res) => {
				this.allDepts = res.data;
				this.deptsFlag = true;
				this.getData();
			}).catch((wrong) => {});
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
			proarr.push(this.selUser[0].NUM);
			proarr.push(this.selUser[0].TYPE);
			proarr.push(this.selUser[0].VERSION);
			proarr.push(this.selUser[0].ID);
			this.$emit('categorydata',proarr);
			this.requestData();
			this.resetBasisInfo();//调用resetBasisInfo函数
		}
    },
    
    resetBasisInfo(){//点击确定或取消按钮时重置数据20190303
        this.dialogCategory = false;//关闭弹出框
        this.categoryList = [];//列表数据置空
        this.page.currentPage = 1;//页码重新传值
				this.page.pageSize = 20;//页码重新传值
				this.allDepts = '';
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
                this.resetBasisInfo();
            })
            .catch(_ => {
				console.log('取消关闭');
				$('.v-modal').hide();
			});
    }
  },
  mounted() {
		// this.requestData();
	},
}
</script>

<style>
</style>