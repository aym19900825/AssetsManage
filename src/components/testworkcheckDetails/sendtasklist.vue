<template>
	<div>
		<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
			<el-tabs v-model="activeName" @tab-click="handleClick">						
                <el-tab-pane label="检测项目与要求" name="second">
                    <el-table :data="workorderForm.WORKORDER_PROJECTList" border stripe :fit="true" max-height="260" style="width: 100%;" :default-sort="{prop:'workorderbasisList', order: 'descending'}">

                        <el-table-column prop="P_NUM" label="检测项目编号" sortable>
                            <template slot-scope="scope">
                                <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_NUM" placeholder="请输入">	
                                </el-input>
                                <span v-else="v-else">{{scope.row.P_NUM}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="P_DESC" label="检测项目名称" sortable>
                            <template slot-scope="scope">
                                <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_DESC" placeholder="请输入">	
                                </el-input>
                                <span v-else="v-else">{{scope.row.P_DESC}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="REMARKS" label="要求" sortable>
                            <template slot-scope="scope">
                                <el-input size="small" v-model="scope.row.REMARKS" placeholder="请输入">	
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="VERSION" label="版本" sortable>
                            <template slot-scope="scope">
                                <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入">	
                                </el-input>
                                <span v-else="v-else">{{scope.row.VERSION}}</span>
                            </template>
                        </el-table-column>
                            <el-table-column fixed="right" label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button title="删除" @click.native.prevent="deleteRow(scope.$index,scope.row,'projectList')" type="text" size="small">
                                <i class="icon-trash red"></i>
                            </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="分包项目" name="seventh">
                    <el-table :data="workorderForm.WORKORDER_CONTRACTList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'workorderForm.WORKORDER_CONTRACTList', order: 'descending'}">
                        <el-table-column prop="WONUM" label="工作任务单编号" sortable width="150px">
                            <template slot-scope="scope">
                                <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WONUM">
                                </el-input>
                                <span v-else="v-else">{{scope.row.WONUM}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="PROXY_CONTRACT_NUM" label="分包协议编号" sortable width="120px">
                            <template slot-scope="scope">
                                <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXY_CONTRACT_NUM">
                                </el-input>
                                <span v-else="v-else">{{scope.row.PROXY_CONTRACT_NUM}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="PROXYNUM" label="委托书编号" sortable width="120px">
                            <template slot-scope="scope">
                                <el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXYNUM" placeholder="请输入委托方名称">
                                </el-input>
                                <span v-else="v-else">{{scope.row.PROXYNUM}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="INSPECT_GROUP" label="专业组" sortable width="120px">
                            <template slot-scope="scope">
                                <el-select clearable v-model="scope.row.INSPECT_GROUP" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit" @change="getmaingroup($event)" @visible-change="visablemaingroup($event)" >
                                    <el-option v-for="data in maingroup" :key="data.id" :value="data.id" :label="data.fullname"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="VENDORDesc" label="分包方名称" sortable width="120px">
                            <template slot-scope="scope">
                                <el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.VENDORDesc" placeholder="请输入分包方名称">
                                    <el-button slot="append" icon="el-icon-search" @click="getDept(scope.row)">
                                    </el-button>
                                </el-input>
                                <span v-else="v-else">{{scope.row.VENDORDesc}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="P_REMARKS" label="检验项目内容" sortable width="200px">
                            <template slot-scope="scope">
                                <el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.P_REMARKS'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
                                    <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_REMARKS" placeholder="请输入">
                                        <el-button slot="append" icon="el-icon-search" @click="basisleadbtn2(scope.row)">
                                        </el-button>
                                    </el-input>
                                <span v-else="v-else">{{scope.row.P_REMARKS}}</span>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="REQUIRES" label="对环境和操作人员要求" sortable width="220px">
                            <template slot-scope="scope">
                                <el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.REQUIRES'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
                                <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REQUIRES" placeholder="请输入内容"></el-input>
                                <span v-else="v-else">{{scope.row.REQUIRES}}</span>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Q_TYPE" label="对分包报告/证书的要求" sortable width="220px">
                            <template slot-scope="scope">
                                <el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.Q_TYPE'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
                                <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.Q_TYPE" placeholder="请输入内容"></el-input>
                                <span v-else="v-else">{{scope.row.Q_TYPE}}</span>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="CHECKCOST" label="检验费用" sortable width="120px">
                            <template slot-scope="scope">
                                <el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.CHECKCOST'" :rules="[{required: true, message: '请输入数字', trigger: 'blur'}]" >
                                <el-input v-if="scope.row.isEditing" id="testprice" @blur="testPrice(scope.row)" size="small" v-model="scope.row.CHECKCOST" placeholder="请输入内容"></el-input>
                                <span v-else="v-else">{{scope.row.CHECKCOST}}</span>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button title="生成分包协议" type="text" size="small">
                                        <i class="icon-send red"></i>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
	</div>
</template>

<script>
	import Config from '../../config.js';
	export default {
//	props:["approvingData"],//第一种方式
  name: 'product',
  
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
		DEPTID:'',//当前选择的机构值
        NUM:'',//类别编号
        activeName: 'first', //tabs
        workorderForm:{
            WORKORDER_PROJECTList:'',
            WORKORDER_CONTRACTList:''
        }
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
    handleClick(tab, event) {
//		        console.log(tab, event);
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
	addprobtn(){
		this.dialogVisible3 = true;
		this.requestnum = '1';
		this.requesCategory();
	},
	//产品类别数据
			requesCategory(){
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
  	visible(NUM) {
		this.NUM = NUM;
		this.dialogProduct = true;
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
		var url = this.basic_url + '/api-apps/app/product2?NUM_wheres='+this.NUM;
		this.$axios.get(url, {
			
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
			var proarr = [];
			proarr.push(this.selUser[0].PRO_NUM);
			proarr.push(this.selUser[0].PRO_NAME);
			proarr.push(this.selUser[0].VERSION);
			this.$emit('appenddata',proarr);
			this.requestData();
		}
	},
  },
  mounted() {
		// this.requestData();
	},
}
</script>

<style>
</style>