<template>
	<div>
		<!-- 检测依据弹出框begin -->
			<el-dialog :modal-append-to-body="false" title="检测依据" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
				<!-- 高级查询划出 Begin-->
				<div class="pb10">
					<el-form :model="searchList" label-width="70px">
						<el-row :gutter="10">
							<el-col :span="6">
								<el-form-item label="标准编号" prop="S_NUM">
									<el-input v-model="searchList.S_NUM"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="标准名称" prop="S_NAME">
									<el-input v-model="searchList.S_NAME"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="英文名称" prop="S_ENGNAME">
									<el-input v-model="searchList.S_ENGNAME"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="版本" prop="VERSION">
									<el-input v-model="searchList.VERSION"></el-input>
								</el-form-item>
							</el-col>		
						</el-row>
						<el-row :gutter="10">
							<el-col :span="6">
								<el-form-item label="机构" prop="DEPTID">
									<el-select clearable v-model="searchList.DEPTID" filterable allow-create default-first-option placeholder="请选择">
										<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="发布时间" prop="RELEASETIME">
									<el-date-picker style="width: 100%" v-model="searchList.RELEASETIME" type="date" placeholder="发布时间" value-format="yyyy-MM-dd">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="启用时间" prop="STARTETIME">
									<el-date-picker style="width: 100%" v-model="searchList.STARTETIME" type="date" placeholder="启用时间" value-format="yyyy-MM-dd">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<!-- <el-col :span="3">
								<el-select style="width: 120%" v-model="searchList.STATUS" placeholder="请选择信息状态">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col> -->
							<el-col :span="4">
								<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
								<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;    margin-left: 2px">重置</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 高级查询划出 End-->
				<!-- 第二层弹出的表格 Begin -->
				<el-table :data="standardList" height="400px" border stripe style="width: 100%;" :default-sort="{prop:'standardList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
					<el-table-column type="selection" width="55" fixed>
					</el-table-column>
					<el-table-column label="主键编号" width="120" sortable prop="ID">
					</el-table-column>
					<el-table-column label="标准编号" width="120" sortable prop="S_NUM">
					</el-table-column>
					<el-table-column label="标准名称" width="220" sortable prop="S_NAME">
					</el-table-column>
					<el-table-column label="英文名称" width="220" sortable prop="S_ENGNAME">
					</el-table-column>
					<el-table-column label="状态" width="100" sortable prop="STATUS">
					</el-table-column>
					<el-table-column label="发布时间" width="160" sortable prop="RELEASETIME">
					</el-table-column>
					<el-table-column label="启用时间" width="160" sortable prop="STARTETIME">
					</el-table-column>
					<el-table-column label="版本" width="100" sortable prop="VERSION">
					</el-table-column>
					<el-table-column label="机构" width="180" sortable prop="DEPTIDDesc">
					</el-table-column>
					<!-- <el-table-column label="录入人" width="120" prop="ENTERBY" sortable>
					</el-table-column> -->
					<el-table-column label="录入时间" width="160" prop="ENTERDATE" sortable>
					</el-table-column>
					<!-- <el-table-column label="修改人" width="120" prop="CHANGEBY" sortable>
					</el-table-column> -->
					<el-table-column label="修改时间" width="160" prop="CHANGEDATE" sortable>
					</el-table-column>
				</el-table>
				<el-pagination background class="pull-right pt10 pb10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<!-- 第二层弹出的表格 End -->
				<div slot="footer" class="dialog-footer">
			       <el-button @click="dialogVisible = false">取 消</el-button>
			       <el-button type="primary" @click="addbasis">确 定</el-button>
			    </div>
			</el-dialog>
			<!-- 检测依据弹出框 End -->
	</div>
</template>

<script>
	import Config from '../../../config.js';
	export default {
//	props:["approvingData"],//第一种方式
  name: 'standard',
  
  data() {
    return {
		basic_url: Config.dev_url,
		productList: [],
		dialogProduct: false,
		loadSign:true,//加载
		commentArr:{},
		selUser: [],//接勾选的值
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
  	//点击关闭按钮
	close() {
		this.dialogProduct = false;
	},
  	visible() {
		this.dialogProduct = true;
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
		var url = this.basic_url + '/api-apps/app/product';
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
			this.productList = newarr;
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
			this.dialogProduct = false;
			var value=this.selUser[0].PRO_NAME;
			this.$emit('appenddata',value);
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