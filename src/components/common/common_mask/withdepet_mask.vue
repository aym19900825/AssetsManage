
<template>
<div>
    <el-dialog :modal-append-to-body="false" title="分包" height="400px" :visible.sync="dialogcustom" width="80%">
        <el-form inline-message :model="searchList" label-width="90px">
            <el-row>
                <el-col :span="5">
                    <el-form-item label="单位" prop="dept"  label-width="85px">
                        <el-select clearable v-model="searchList.dept" placeholder="请选择" filterable allow-create default-first-option  @change="getdept($event)">
                            <el-option v-for="data in selectData" :key="data.id" :value="data.id" :label="data.fullname"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="模糊搜索" prop="searchName" label-width="140px">
                        <el-input v-model="searchList.searchName">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" class="text-center">
                    <el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
					<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px; margin-left: 2px">重置</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-table ref="table" :header-cell-style="rowClass" :data="customerList" 
		line-center border stripe height="270px" style="width: 100%;" 
		 :default-sort="{prop:'customerList', order: 'descending'}"
            v-loading="loading"  
            element-loading-text="加载中…"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.9)"
            @selection-change="SelChange"
			@current-change="setSel">
            <el-table-column type="selection" width="55" fixed align="center">
            </el-table-column>
            <el-table-column label="项目名称" width="200" sortable prop="p_name">
            </el-table-column>
			<el-table-column label="检验检测标准" sortable prop="s_name">
            </el-table-column>
            <el-table-column label="产品名称" sortable prop="pro_name">
            </el-table-column>
            <el-table-column label="产品类别名称" sortable prop="pt_name">
            </el-table-column>
        </el-table>
           <el-pagination background class="text-right pt10"
				@size-change="sizeChange"
				@current-change="currentChange"
				:current-page="page.currentPage"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="page.pageSize"
				layout="total, sizes, prev, pager, next"
				:total="page.totalCount">
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
  name: 'category',
  
  data() {
    return {
		basic_url: Config.dev_url,
		loadSign: true, //鼠标滚动加载数据
		loading: false,//默认加载数据时显示loading动画
        commentArr:{},
		selectData:[],
		selUser: [],//接勾选的值
		DEPTID:'',//当前选择的机构值
        customerList:[],
		dialogcustom:false,
		dept:'',
		deptname:'',
		defaultdept:'',//页面加载时的机构
		page: {
			currentPage: 1,
			pageSize: 20,
			totalCount: 0
		},
		searchList: {
			searchName:'',
			dept:'',
		},
    }
  },

  methods: {
	resetbtn(){
			this.searchList.searchName();
			this.requestData();
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
	SelChange(val) {
		this.selUser = val;
	},
  	setSel(row) {
	    this.selUser = [];
	    this.selUser.push(row);
	    this.$refs.table.clearSelection();
		this.$refs.table.toggleRowSelection(row);
  	},
	searchinfo() {
		this.page.currentPage = 1;
		this.page.pageSize = 20;
		this.requestData();
	},
  	//点击关闭按钮
	close() {
		this.dialogcustom = false;
		this.searchName='';
		this.dept='';
	},
  	visible() {
		this.dialogcustom= true;
		this.requestData();

  	},
	//改变页数
	sizeChange(val) {
		this.page.pageSize = val;
		this.requestData();
	},
	//当前页数
	currentChange(val) {
		this.page.currentPage = val;
		this.requestData();
	},
	//Table默认加载数据
	
	getdept(dept){
		this.dept=dept;
		this.requestData();
	},
	determine(){
		var selectData=this.selectData;
		var selData = this.selUser;
        if(selData.length == 0) {
            this.$message({
                message: '请选择数据',
                type: 'warning'
            });
            return;
        } else {
			if(!!this.dept){
				var deptname='';
				for(var i=0;i<selectData.length;i++){
					if(this.dept==selectData[i].id){
						this.deptname=selectData[i].fullname;
					}
				}
				var list = [];
				for(var i = 0;i<selData.length;i++){
					selData[i].ID = '';
					selData[i].deptname=this.deptname;
					selData[i].dept=this.dept;
					list.push(selData[i]);
				}
				this.$emit('withdepet',list);
				
				this.resetBasisInfo();
			}else{
				 this.$message({
					message: '请选择分包单位',
					type: 'warning'
            });
			}
			
        }
    },
    
    resetBasisInfo(){//点击确定或取消按钮时重置数据20190303
        this.dialogcustom = false;//关闭弹出框
        this.customerList = [];//列表数据置空
        this.page.currentPage = 1;//页码重新传值
        this.page.pageSize = 20;//页码重新传值
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
	},
	requestData(){
		var data = {
			page: this.page.currentPage,
			limit: this.page.pageSize,
		};
		var DEPTID=this.$store.state.currentcjdw[0].id;
		var url = this.basic_url + '/api-apps/app/inspectPro/operate/pdTreeSearch?deptId='+this.dept+'&searchName='+this.searchList.searchName;
		console.log(url);
		console.log(123);
		this.$axios.get(url,{}).then((res) => {
			this.page.totalCount = res.data.datas.count;
			//总的页数
			let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
			this.customerList = res.data.datas.data;
			this.loading = false;//加载动画关闭
			
		}).catch((wrong) => {
			// this.$message({
			// 	message: '网络错误，请重试1',
			// 	type: 'error'
			// });
		})	
	},
    getCompany() {
		var url=this.basic_url+'/api-user/depts/findStation/2';
        this.$axios.get(url, {}).then((res) => {
			this.selectData = res.data;
			this.searchList.dept = res.data[0].id;
			this.defaultdept= res.data[0].id;
        });
    },
  },
  mounted() {
		this.getCompany();
		this.requestData();
	},
}
</script>