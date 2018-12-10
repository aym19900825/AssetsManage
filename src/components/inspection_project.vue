<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header></navs_header>
	</div>
	<div class="contentbg">
		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content wrapperall">
			<div class="ibox-content">
				<!--部门名称 Begin-->
				<el-row :gutter="30">
					<el-col :span="24" class="text-center pb10">
						<el-form :inline="true" :model="formInline">
							<el-form-item label="部门名称">
								<el-select v-model="formInline.DEPARTMENT" placeholder="请选择部门" @change="requestData_productType2">
									<el-option v-for="item in DEPARTMENTS" :key="item.value" :label="item.label" :value="item.value">{{ item.label }}</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<!--部门名称 End-->
					<div style="width:4200px">
						<div class="pull-left" style="width:500px">
							<el-card class="box-card" :body-style="{ padding: '10px' }">
								<div slot="header" class="title clearfix">
									<span>产品类别</span>
									<!--按钮操作行 Begin-->
									<div class="columns pull-right">
										<el-input placeholder="请输入产品类别名称" v-model="search" class="input-with-select">
											<el-button slot="append" icon="el-icon-search"></el-button>
										</el-input>
									</div>
									<!--按钮操作行 End-->
								</div>
								<div class="text item">
									<div class="pb10 clearfix">
										<div class="table-func pull-right">
											<el-button type="success" size="mini" round @click="addfield_productType2" class="pull-right">
											<i class="icon-add"></i>
											<font>新建</font>
										</el-button>
										</div>
									</div>
									<el-form :model="productType2Form" status-icon inline-message ref="productType2Form">
									  <el-table :data="productType2Form.inspectionList.filter(data => !search || data.TYPE.toLowerCase().includes(search.toLowerCase()))" row-key="ID" border stripe height="380" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'productType2Form.inspectionList', order: 'descending'}" v-loadmore="loadMore">
										<el-table-column prop="iconOperation" fixed="left" label="操作" width="50">
									      <template slot-scope="scope">
									        <!-- <el-button type="text" id="Edit" size="medium" @click.native.prevent="saveRow(scope.row)" v-if="scope.row.isEditing">
									        	<i class="icon-check" title="保存"></i>
											</el-button> -->
											<!-- <el-button type="text" size="medium" @click.native.prevent="modifyversion(scope.row)" v-else="v-else">
									        	<i class="icon-edit" title="修改"></i>
											</el-button> -->
									        <el-button @click="deleteRow(scope.row)" type="text" size="medium" title="删除" >
									          <i class="icon-trash red"></i>
									        </el-button>
									      </template>
									    </el-table-column>

									  	<el-table-column label="产品类别编号" sortable width="140" prop="NUM">
									      <template slot-scope="scope">
									        <el-form-item :prop="'inspectionList.'+scope.$index + '.NUM'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
									        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.NUM" disabled></el-input><span class="blue" @click="viewchildRow(scope.row.ID)" v-else="v-else">{{scope.row.NUM}}</span>
											</el-form-item>
									      </template>
									    </el-table-column>

									    <el-table-column label="产品类别名称" sortable width="200" prop="TYPE">
									      <template slot-scope="scope">
									        <el-form-item :prop="'inspectionList.'+scope.$index + '.TYPE'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
									        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.TYPE" placeholder="请输入内容">
									        		<el-button slot="append" icon="icon-search"></el-button>
									        	</el-input><span v-else="v-else">{{scope.row.TYPE}}</span>
											</el-form-item>
									      </template>
									    </el-table-column>

									    <el-table-column label="所属部门" sortable width="200" prop="DEPARTMENT">
									      <template slot-scope="scope">
									        <el-form-item :prop="'inspectionList.'+scope.$index + '.DEPARTMENT'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
									        	<el-select v-if="scope.row.isEditing" v-model="scope.row.DEPARTMENT" placeholder="请选择">
													<el-option v-for="item in DEPARTMENTS" :key="item.value" :label="item.label" :value="item.label"></el-option>
												</el-select><span v-else="v-else">{{scope.row.DEPARTMENT}}</span>
											</el-form-item>
									      </template>
									    </el-table-column>

										<el-table-column prop="STATUS" label="信息状态" sortable width="100" :formatter="judge">
									      <template slot-scope="scope">
									        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" disabled></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
									      </template>
									    </el-table-column>
										
										<!-- <el-table-column prop="VERSION" label="版本" sortable width="120">
									      <template slot-scope="scope">
									       	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" disabled></el-input><span v-else="v-else">{{scope.row.VERSION}}</span>
									      </template>
									    </el-table-column> -->

									    <el-table-column prop="CHANGEBY" label="修改人" sortable width="120">
									      <template slot-scope="scope">
									        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEBY" placeholder="请输入内容" disabled></el-input><span v-else="v-else">{{scope.row.CHANGEBY}}</span>
									      </template>
									    </el-table-column>

									     <el-table-column prop="CHANGEDATE" label="修改时间" sortable width="160" :formatter="dateFormat">
									      <template slot-scope="scope">
									      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEDATE" disabled></el-input><span v-else="v-else">{{scope.row.CHANGEDATE}}</span>
									      </template>
									    </el-table-column>

										 <el-table-column prop="operationChild" fixed="right" align="center" label="增加子项" width="80">
										 	<template slot-scope="scope">
											 	<el-button type="text" id="Edit" size="medium" @click.native.prevent="saveRow(scope.row)" v-if="scope.row.isEditing">
										        	<i class="icon-check" title="保存"></i>
												</el-button>

											 	<el-button type="primary" round size="mini" @click="addchildRow(scope.row)" v-else="v-else">
										          添加
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
								</div>
							</el-card>
							<!-- <productType2 ref="child"></productType2> -->
						</div>
						<div class="pull-left" style="width:3500px">
							<product2 ref="product2child"></product2>
						</div>
					</div>
			
			</div>
		</div>
	<!--右侧内容显示 End-->
	</div>
</div>
</template>
<script>
	import Config from '../config.js'
	import vheader from './common/vheader.vue'
	import navs_header from './common/nav_tabs.vue'
	import productType2 from './inspection_project/productType2.vue'
	import product2 from './inspection_project/product2.vue'
	export default {
		name: 'inspection_project',
		components: {
			vheader,
			navs_header,
			productType2,//产品类别
			product2,//产品名称
		},
		data() {
			return {
				basic_url: Config.dev_url,
				DEPARTMENTS: [{
					value: '金化站',
					label: '金化站'
					}, {
					value: '运包站',
					label: '运包站'
					}, {
					value: '通号站',
					label: '通号站'
					}, {
					value: '机辆站',
					label: '机辆站'
					}, {
					value: '接触网站',
					label: '接触网站'
				}],
      			fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				formInline: {//选择站点显示数据
					DEPARTMENT: '金化站',
				},
				productType2Form:{//产品类别数据组
					inspectionList: []
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
			        enabled: '',//信息状态
		        },
				search: '',//搜索
				page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				}
			}
		},
		methods: {
			iconOperation(row, column, cell, event){//切换Table-操作列中的修改、保存
				if(column.property ==="iconOperation"){
					row.isEditing = !row.isEditing
				}
			},
			
			modifyversion (row) {//点击修改后给当前修改人和修改时间赋值
				 this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					row.CHANGEBY=res.data.nickname;
					var date=new Date();
					row.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
					//console.log(row);
					
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
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
			     this.requestData_productType2()
			   }
			 },
			sizeChange(val) {//页数
		      this.page.pageSize = val;
		      this.requestData_productType2();
		    },
		    currentChange(val) {//当前页
		      this.page.currentPage = val;
		      this.requestData_productType2();
		    },
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData_productType2();
			},
			judge(data) {//taxStatus 信息状态布尔值
				return data.enabled ? '活动' : '不活动'
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
			},
			indexMethod(index) {
				return index + 1;
			},
			// selectVal(ID){//点击父级筛选出子级数据
			// 	var url = '/api/api-apps/app/productType2/' + ID;
			// 	this.$axios.get(url, {}).then((res) => {
			// 		console.log(res);
			// 		this.page.totalCount = res.data.count;	
			// 		//总的页数
			// 		let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
			// 		if(this.page.currentPage >= totalPage){
			// 			 this.loadSign = false
			// 		}else{
			// 			this.loadSign=true
			// 		}
			// 		this.productType2Form.inspectionList=res.data.PRODUCT_TYPE2List;

			// 		//默认主表第一条数据
			// 		if(this.productType2Form.inspectionList.length > 0){
			// 			this.productType2Form.inspectionList[0].ID;
			// 		}else{
			// 			this.productType2Form.inspectionList('null');
			// 		}
			// 		for(var j = 0; j < this.productType2Form.inspectionList.length; j++){
			// 			this.productType2Form.inspectionList[j].isEditing = false;
			// 		}
			// 	}).catch((wrong) => {})
			// },
			
			requestData_productType2(index) {//加载数据
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					DEPARTMENT: this.formInline.DEPARTMENT,//点击部门名称下拉菜单显示数据
				}
				var url = this.basic_url + '/api-apps/app/productType2';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					//console.log(res);
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
					
					this.productType2Form.inspectionList = newarr;
					this.$refs.product2child.viewfield_product2(this.productType2Form.inspectionList[0].ID);
				}).catch((wrong) => {})
			},
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			},
			addfield_productType2() { //插入行到产品类别Table中
				var isEditingflag=false;
				for(var i=0;i<this.productType2Form.inspectionList.length; i++){
					if (this.productType2Form.inspectionList[i].isEditing==false){
						isEditingflag=false;
					}else{
                        isEditingflag=true;
                        break;
					}
				}
				if (isEditingflag==false){
                	this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
                		var currentUser, currentDate
						this.currentUser=res.data.nickname;
						var date=new Date();
						this.currentDate = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
						var index=this.$moment(date).format("YYYYMMDDHHmmss");
						var obj = {
							"TYPE": '',
							"STATUS": '活动',
							"NUM": 'PT' + index,
							"VERSION": 1,
							"DEPARTMENT": '',
							"CHANGEBY": this.currentUser,
							"CHANGEDATE": this.currentDate,
							"isEditing": true,
						};
						this.productType2Form.inspectionList.unshift(obj);//在列表前新建行unshift，在列表后新建行push
					}).catch((err)=>{
						this.$message({
							message:'网络错误，请重试',
							type:'error'
						})
					})
	            } else {
	                this.$message.warning("请先保存当前编辑项");
				}
			},
			saveRow (row) {//Table-操作列中的保存行
				this.$refs['productType2Form'].validate((valid) => {
					row.VERSION = row.VERSION + 1;//修改保存后版本号+1
		          if (valid) {
					var url = this.basic_url + '/api-apps/app/productType2/saveOrUpdate';
					var submitData = {
						"ID":row.ID,
						"TYPE": row.TYPE,
					    "NUM": row.NUM,
					    "VERSION": row.VERSION,
					    "DEPARTMENT": row.DEPARTMENT,
						"STATUS": row.STATUS,
						"CHANGEBY": row.CHANGEBY,
					    "CHANGEDATE": row.CHANGEDATE,
					}
					this.$axios.post(url, submitData).then((res) => {
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							//重新加载数据
							this.requestData_productType2();
						}
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
				this.$confirm('确定删除此数据吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                	var url = this.basic_url + '/api-apps/app/productType2/' + row.ID;
                    this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
					//resp_code == 0 是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.requestData_productType2();
						}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
                }).catch(() => {

            	});
			},
			addchildRow(row) {//添加子项数据
				this.$refs.product2child.addfield_product2(row.NUM);
				//console.log();
			},
			viewchildRow(ID) {//查看子项数据
				this.$refs.product2child.viewfield_product2(ID);
			},
		},
		
		mounted() {
			this.requestData_productType2();

			

			
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
	width: 500px;
}

.el-table .cell {
    display: inline-block;
	cursor: pointer;
}
.el-card.is-never-shadow {
	background-color: #f0f2f9;
	-webkit-box-shadow: 0 2px 12px 0 rgba(39, 50, 173, 0.35);
    box-shadow: 0 2px 12px 0 rgba(39, 50, 173, 0.35);
}
/*.el-card.is-always-shadow {
	-webkit-box-shadow: 0 2px 12px 0 rgba(56, 124, 195, 0.35);
    box-shadow: 0 2px 12px 0 rgba(56, 124, 195, 0.35);
}*/
/*.el-form-item__error {
	top: 18%;
    left: 5px;
    background: #FFF;
    padding: 5px 10px;
}
*/
</style>