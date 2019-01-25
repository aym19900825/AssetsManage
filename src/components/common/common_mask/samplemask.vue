<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="样品名称" :visible.sync="dialogsample" width="80%">
			<el-form :model="searchList" label-width="70px">
					<el-col :span="7">
						<el-form-item label="样品编号" prop="ITEMNUM">
							<el-input v-model="searchList.ITEMNUM"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="样品类别" prop="TYPE">
							<el-input v-model="searchList.TYPE"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="委托单位" prop="V_NAME">
							<el-input v-model="searchList.V_NAME"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="样品名称" prop="DESCRIPTION">
							<el-input v-model="searchList.DESCRIPTION"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="收样人" prop="ACCEPT_PERSON">
							<el-input v-model="searchList.ACCEPT_PERSON"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="收样日期" prop="ACCEPT_DATE">
							<div class="block">
							    <el-date-picker
							      v-model="searchList.ACCEPT_DATE"
							      type="date"
							      placeholder="请选择" style="width: 100%">
							    </el-date-picker>
					  		</div>
					</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
						<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;    margin-left: 2px">重置</el-button>
					</el-col>
				</el-row>
			</el-form>
		<el-table :data="samplesList" :header-cell-style="rowClass" border stripe height="400px" style="width: 100%;" :default-sort="{prop:'samplesList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
			<el-table-column type="selection" width="55" fixed align="center">
			</el-table-column>
			<el-table-column label="样品编号" sortable width="200px" prop="ITEMNUM">
			</el-table-column>
			<el-table-column label="样品名称" sortable width="200px" prop="DESCRIPTION">
			</el-table-column>
			<el-table-column label="样品类别" sortable width="200px" prop="TYPE">
			</el-table-column>
			<el-table-column label="委托单位" sortable width="200px" prop="V_NAME">
			</el-table-column>
			<el-table-column label="生产单位" sortable width="200px" prop="P_NAME">
			</el-table-column>
			<el-table-column label="型号" width="100px" prop="MODEL" sortable>
			</el-table-column>
			<el-table-column label="数量" width="100px" prop="QUATITY" sortable>
			</el-table-column>
			<el-table-column label="收样人" sortable width="140px" prop="ACCEPT_PERSON">
			</el-table-column>
			<el-table-column label="收样日期" sortable width="140px" :formatter="dateFormat" prop="ACCEPT_DATE">
			</el-table-column>
			<el-table-column label="接样人" sortable width="140px" prop="RECIP_PERSON">
			</el-table-column>
			<el-table-column label="接样日期" sortable width="140px" :formatter="dateFormat" prop="RECIP_DATE">
			</el-table-column>
			<el-table-column label="状态" sortable width="100px" prop="STATE">
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
		samplesList: [],
		dialogsample: false,
		loadSign:true,//加载
		commentArr:{},
		selval: [],//接勾选的值
		type:'',
		page: {
			currentPage: 1,
			pageSize: 20,
			totalCount: 0
		},
		searchList: {
			ITEMNUM:'',//样品编号
			V_NAME: '',//委托单位名称
			DESCRIPTION: '',//样品名称
			ACCEPT_PERSON: '',//收样人
			TYPE: '',//样品类别
			ACCEPT_DATE: '',//收样日期
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
	searchinfo() {//高级查询
			this.page.currentPage = 1;
			this.page.pageSize = 20;
			this.requestData();
	},
	resetbtn(){
		this.searchList =  { //点击高级搜索后显示的内容
			ITEMNUM:'',
			V_NAME: '',
			DESCRIPTION: '',
			ACCEPT_PERSON: '',
			TYPE: '',
			ACCEPT_DATE:'',
		};
	},
  	//点击关闭按钮
	close() {
		this.dialogsample = false;
	},
  	visible(type) {
  		this.type=type;
		this.dialogsample = true;
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
			ITEMNUM: this.searchList.ITEMNUM,//样品编号
			V_NAME: this.searchList.V_NAME,//委托单位名称
			DESCRIPTION: this.searchList.DESCRIPTION,//样品名称
			ACCEPT_PERSON: this.searchList.ACCEPT_PERSON,//收样人
			TYPE: this.searchList.TYPE,//样品类别
			ACCEPT_DATE: this.searchList.ACCEPT_DATE//收样日期
		}
		var url = this.basic_url + '/api-apps/app/item';
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
			this.samplesList = newarr;
		}).catch((wrong) => {})
		
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
			if(this.type=="inspect_proxy"){
				var description=this.selval[0].DESCRIPTION;	
				var model=this.selval[0].MODEL;
				var quatity=this.selval[0].QUATITY;
				this.$emit('appenddes',description);
				this.$emit('appendmod',model);
				this.$emit('appendqua',quatity);
			}else{
			    var name= this.selval[0].DESCRIPTION;//样品名称
			    var model= this.selval[0].MODEL;//规格型号
				var state = this.selval[0].STATE;//样品状态
				var itemnum = this.selval[0].ITEMNUM;//样品编号	
				this.$emit('appendname',description);
				this.$emit('appendmod',model);
				this.$emit('appendsta',state);
				this.$emit('appendite',itemnum);
			}
			this.dialogsample = false;
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