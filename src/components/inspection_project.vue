<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header></navs_header>
	</div>
	<div class="contentbg">
		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content wrapperall">
			<!--部门名称 Begin-->
			<el-row :gutter="70">
				<el-col :span="24" class="text-center">
					<el-form :inline="true" :model="formInline">
						<el-form-item label="部门名称">
							<el-select v-model="formInline.station" placeholder="请选择部门">
								<el-option v-for="item in stations" :key="item.value" :label="item.label" :value="item.value">
								<span style="float: left">{{ item.label }}</span>
								<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<!--部门名称 End-->

			<el-card class="box-card" :style="fullHeight">
				<div slot="header" class="title clearfix">
					<span>产品类型</span>
					<!--按钮操作行 Begin-->
					<div class="table-func pull-right">
						<el-button type="success" size="mini" round @click="addfield" class="pull-right">
							<i class="icon-add"></i>
							<font>新建</font>
						</el-button>
					</div>
					<!--按钮操作行 End-->
				</div>
				<div class="text item">
					<div class="pb10 clearfix">
						<div class="columns pull-right">
							<el-input placeholder="请输入内容" v-model="search" class="input-with-select">
								<el-button slot="append" icon="el-icon-search"></el-button>
							</el-input>
						</div>
					</div>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
					  <el-table :data="ruleForm.inspectionList.filter(data => !search || data.TYPE.toLowerCase().includes(search.toLowerCase()))" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'ruleForm.inspectionList', order: 'descending'}" v-loadmore="loadMore">

					  	<el-table-column label="产品编号" sortable width="150" prop="NUM">
					      <template slot-scope="scope">
					        <el-form-item :prop="'inspectionList.'+scope.$index + '.NUM'" :rules="{required: true, message: '产品编号不能为空', trigger: 'blur'}">
					        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.NUM" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.NUM}}</span>
							</el-form-item>
					      </template>
					    </el-table-column>

					    <el-table-column label="产品类型" sortable width="150" prop="TYPE">
					      <template slot-scope="scope">
					        <el-form-item :prop="'inspectionList.'+scope.$index + '.TYPE'" :rules="{required: true, message: '产品类型不能为空', trigger: 'blur'}">
					        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.TYPE" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.TYPE}}</span>
							</el-form-item>
					      </template>
					    </el-table-column>

						<el-table-column prop="STATUS" label="状态" sortable width="120" :formatter="judge">
					      <template slot-scope="scope">
					        <el-select v-if="scope.row.isEditing" v-model="scope.row.STATUS" placeholder="请选择">
					          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
					        </el-select><span v-else="v-else">{{scope.row.STATUS}}</span>
					      </template>
					    </el-table-column>

					    <el-table-column prop="CHANGEBY" label="状态修改人" sortable width="120">
					      <template slot-scope="scope">
					        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEBY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.CHANGEBY}}</span>
					      </template>
					    </el-table-column>

					     <el-table-column prop="CHANGEDATE" label="状态修改时间" sortable width="160" :formatter="dateFormat">
					      <template slot-scope="scope">
					        <el-date-picker v-if="scope.row.isEditing" type="date" placeholder="选择日期" v-model="scope.row.CHANGEDATE" value-format="yyyy-MM-dd"></el-date-picker><span v-else="v-else">{{scope.row.CHANGEDATE}}</span>
					      </template>
					    </el-table-column>

					    <el-table-column prop="iconOperation" fixed="right" label="操作" width="80">
					      <template slot-scope="scope">
					        <el-button type="text" size="medium" @click.native.prevent="saveRow(scope.row)" v-if="scope.row.isEditing">
					        	<i class="icon-check" title="保存"></i>
							</el-button>
							<el-button type="text" size="medium" v-else="v-else">
					        	<i class="icon-edit" title="修改"></i>
							</el-button>

					        <el-button @click="deleteRow(scope.row)" type="text" size="medium" title="删除" >
					          <i class="icon-trash red"></i>
					        </el-button>
					      </template>
					    </el-table-column>
					  </el-table>
					</el-form>
							<!-- 表格 Begin-->
							<el-pagination background class="pull-right pt10 pb10"
					            @size-change="sizeChange"
					            @current-change="currentChange"
					            :current-page="page.currentPage"
					            :page-sizes="[10, 20, 30, 40]"
					            :page-size="page.pageSize"
					            layout="total, sizes, prev, pager, next"
					            :total="page.totalCount">
					        </el-pagination>
							<!-- 表格 End-->
						</el-col>
					</el-row>
				</div>
			</el-card>
		</div>
	<!--右侧内容显示 End-->
	</div>
</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs_header from './common/nav_tabs.vue'
	import tableControle from './plugin/table-controle/controle.vue'
	export default {
		name: 'customer_management',
		components: {
			vheader,
			navs_header,
			tableControle,
		},
		data() {
			var validateTYPE = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写产品类型'));
                }else {
                    callback();
                }
            };
			return {
				
				formInline: {
					station: ''
				},
				stations: [{
					value: 'Jinhua',
					label: '金化站'
					}, {
					value: 'Yunbao',
					label: '运包站'
					}, {
					value: 'Tonghao',
					label: '通号站'
					}, {
					value: 'Jiliang',
					label: '机辆站'
					}, {
					value: 'Jiechuwang',
					label: '接触网站'
					}],
				station: '',
      
				ruleForm:{
					inspectionList: []
				},
				rules: {
                    TYPE:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                },
				isEditing: '',
				loadSign:true,//加载
				commentArr:{},//下拉加载
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				searchData: {
			        page: 1,
			        limit: 10,//分页显示数
			        enabled: '',//状态
		        },
				selMenu: [],
				search: '',//搜索
				fullHeight:{//给浏览器高度赋值
					height: '',
				},
				page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
			}
		},
		methods: {
			iconOperation(row, column, cell, event){//切换Table-操作列中的修改、保存
				if(column.property ==="iconOperation"){
					row.isEditing = !row.isEditing
				}
			},
			saveRow (row) {//Table-操作列中的保存行
				this.$refs['ruleForm'].validate((valid) => {
		          if (valid) {
					var url = '/api/api-apps/app/productType2/saveOrUpdate';
					var submitData = {
						"ID":'',
						"TYPE":row.TYPE,
						"STATUS":row.STATUS,
						"CHANGEBY":row.CHANGEBY,
					    "CHANGEDATE":row.CHANGEDATE,
					    "NUM": row.NUM,
					    "VERSION": 1
					}
					this.$axios.post(url, submitData).then((res) => {
						// if(res.data.resp_code == 0) {
						// 	this.$message({
						// 		message: '保存成功',
						// 		type: 'success'
						// 	});
						// 	//重新加载数据
						// 	this.requestData();
						// }
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
		          } else {
		            return false;
		          }
		        });
			},
			deleteRow(row) {//Table-操作列中的删除行
				this.$confirm('确定删除此产品类别吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                	var url = '/api/api-apps/app/productType2/delete/' + row.ID;
                    this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
					// //resp_code == 0是后台返回的请求成功的信息
					// 	if(res.data.resp_code == 0) {
					// 		this.$message({
					// 			message: '删除成功',
					// 			type: 'success'
					// 		});
					// 		this.requestData();
					// 	}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
                }).catch(() => {

            	});
			},
			loadMore () {//表格滚动加载
			   if (this.loadSign) {
			     this.loadSign = false
			     this.page.currentPage++
			     if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			       return
			     }
			     setTimeout(() => {
			       this.loadSign = true
			     }, 1000)
			     this.requestData()
			   }
			 },
			
			dateFormat(row, column) {//时间格式化
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD HH:mm:ss"); 
			},
			sizeChange(val) {//页数
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    currentChange(val) {//当前页
		      this.page.currentPage = val;
		      this.requestData();
		    },
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			judge(data) {//taxStatus 状态布尔值
				return data.enabled ? '活动' : '不活动'
			},
			SelChange(val) {//数据组
				this.selMenu = val;
			},
			requestData(index) {//加载数据
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = '/api/api-apps/app/productType2';
				this.$axios.get(url, {
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
								this.commentArr[i][j].isEditing = false;
								newarr.push(this.commentArr[i][j])
							}
						}
					}
					
					this.ruleForm.inspectionList = newarr;
				}).catch((wrong) => {})
			},
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			},
			addfield() { //插入行到Table中
				var isEditingflag=false;
				for(var i=0;i<this.ruleForm.inspectionList.length; i++){
					console.log(this.inspectionList);
					if (this.ruleForm.inspectionList[i].isEditing==false){
						isEditingflag=false;
					}else{
                        isEditingflag=true;
                        break;
					}
	               
				}
				if (isEditingflag==false){
	                	var obj = {
							TYPE: '',
							STATUS: '活动',
							CHANGEBY: '',
							CHANGEDATE: '',
							isEditing:true,
						};
						this.ruleForm.inspectionList.unshift(obj);//在列表前新建行unshift，在列表后新建行push
	            } else {
		                this.$message.warning("请先保存当前编辑项");
				}
			},
		},
		
		mounted() {
			this.requestData();
			
			window.onresize = () => {//获取浏览器可视区域高度
			 	return (() => {
			 		this.fullHeight.height = document.documentElement.clientHeight - 180+'px';
			 	})()
			 }
		},
		

	}
</script>

<style scoped>
.el-card__header {
	padding-top: 10px;
	padding-bottom: 10px;
}
.item {
	font-size: 14px;
	margin-bottom: 18px;
}
.table-func {
	position:relative;
	top: 0px;
    right: 0px;
}
.box-card {
	width: 480px;
}

.el-table .cell {
    width: 100%;
    display: inline-block;
	cursor: pointer;
}
</style>