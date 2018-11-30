<template>
<div>
	<el-card class="box-card" :body-style="{ padding: '10px' }" shadow="never">
		<div slot="header" class="title clearfix">
			<span>检验/检测方法</span>
			<!--按钮操作行 Begin-->
				<div class="columns pull-right">
					<el-input placeholder="请输入方法中文名称" v-model="search" class="input-with-select">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>
			<!--按钮操作行 End-->
		</div>
		<div class="text item">
			<div class="pb10 clearfix">
				<!-- <div class="columns pull-left"><el-button type="primary" size="small">关联父级</el-button></div> -->
					<!-- <div class="table-func pull-right">
					<el-button type="success" size="mini" round @click="addfield_inspectionMet2" class="pull-right">
						<i class="icon-add"></i>
						<font>新建</font>
					</el-button>
				</div> -->
			</div>
			<el-form :model="inspectionMet2Form" ref="inspectionMet2Form">
			  <el-table :data="inspectionMet2Form.inspectionList.filter(data => !search || data.M_NAME.toLowerCase().includes(search.toLowerCase()))" row-key="ID" border stripe height="410" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'inspectionMet2Form.inspectionList', order: 'descending'}" v-loadmore="loadMore">
				<el-table-column prop="iconOperation" fixed="left" label="操作" width="80">
			      <template slot-scope="scope">
			        <el-button type="text" id="Edit" size="medium" @click.native.prevent="saveRow(scope.row)" v-if="scope.row.isEditing">
			        	<i class="icon-check" title="保存"></i>
					</el-button>
					<el-button type="text" size="medium" @click.native.prevent="modifyversion(scope.row)" v-else="v-else">
			        	<i class="icon-edit" title="修改"></i>
					</el-button>

			        <el-button @click="deleteRow(scope.row)" type="text" size="medium" title="删除" >
			          <i class="icon-trash red"></i>
			        </el-button>
			      </template>
			    </el-table-column>

			  	<el-table-column label="所属项目编号" width="120" prop="P_NUM">
			      <template slot-scope="scope">
			        <el-form-item :prop="'inspectionList.'+scope.$index + '.P_NUM'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
			        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_NUM" disabled></el-input><span v-else="v-else">{{scope.row.P_NUM}}</span>
					</el-form-item>
			      </template>
			    </el-table-column>

			  	<el-table-column label="方法编号" width="140" prop="M_NUM">
			      <template slot-scope="scope">
			        <el-form-item :prop="'inspectionList.'+scope.$index + '.M_NUM'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
			        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.M_NUM" disabled></el-input><span v-else="v-else">{{scope.row.M_NUM}}</span>
					</el-form-item>
			      </template>
			    </el-table-column>

			    <el-table-column label="方法中文名称" sortable width="200" prop="M_NAME">
			      <template slot-scope="scope">
			        <el-form-item :prop="'inspectionList.'+scope.$index + '.M_NAME'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
			        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.M_NAME" placeholder="请输入内容">
			        		<el-button slot="append" icon="icon-search"></el-button>
			        	</el-input><span v-else="v-else">{{scope.row.M_NAME}}</span>
					</el-form-item>
			      </template>
			    </el-table-column>

			    <el-table-column label="方法英文名称" sortable width="200" prop="M_ENAME">
			      <template slot-scope="scope">
			        <el-form-item :prop="'inspectionList.'+scope.$index + '.M_ENAME'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
			        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.M_ENAME" placeholder="请输入内容">
			        		<el-button slot="append" icon="icon-search"></el-button>
			        	</el-input><span v-else="v-else">{{scope.row.M_ENAME}}</span>
					</el-form-item>
			      </template>
			    </el-table-column>

			    <el-table-column label="类别" sortable width="200" prop="M_TYPE">
			      <template slot-scope="scope">
			        <el-form-item :prop="'inspectionList.'+scope.$index + '.M_TYPE'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
			        	<!-- <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.M_TYPE" placeholder="请输入内容">
			        		<el-button slot="append" icon="icon-search"></el-button>
			        	</el-input> -->
			        	<el-select v-if="scope.row.isEditing" v-model="scope.row.M_TYPE" placeholder="请选择">
							<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.label"></el-option>
						</el-select><span v-else="v-else">{{scope.row.M_TYPE}}</span>
					</el-form-item>
			      </template>
			    </el-table-column>

			    <el-table-column label="内容描述" sortable width="200" prop="DESCRIPTION">
			      <template slot-scope="scope">
			        <el-form-item :prop="'inspectionList.'+scope.$index + '.DESCRIPTION'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
			        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DESCRIPTION" placeholder="请输入内容">
			        		<el-button slot="append" icon="icon-search"></el-button>
			        	</el-input><span v-else="v-else">{{scope.row.DESCRIPTION}}</span>
					</el-form-item>
			      </template>
			    </el-table-column>

				<el-table-column prop="STATUS" label="信息状态" sortable width="80" :formatter="judge">
			      <template slot-scope="scope">
			         <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" disabled></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
			      </template>
			    </el-table-column>
				
				<!-- <el-table-column prop="VERSION" label="版本" sortable width="120">
			      <template slot-scope="scope">
			       	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" disabled></el-input><span v-else="v-else">#r{{scope.row.VERSION}}</span>
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

			    <!-- <el-table-column prop="operationChild" fixed="right" align="center" label="增加子项" width="80">
				 	<template slot-scope="scope">
					 	<el-button type="text" id="Edit" size="medium" @click.native.prevent="saveRow(scope.row)" v-if="scope.row.isEditing">
				        	<i class="icon-check" title="保存"></i>
						</el-button>

					 	<el-button type="primary" round size="mini" @click="addchildRow(scope.row)" v-else="v-else">
				          添加
				        </el-button>
				    </template>
				 </el-table-column> -->
				 
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
</div>
</template>
<script>

	export default {
		name: 'inspectionMet2',
		components: {
		
		},
		data() {
			return {
				inspectionMet2Form:{
					inspectionList: []
				},
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				isEditing: '',
				loadSign:true,//加载
				commentArr:{},//下拉加载
				value: '',
				options2:[{//检验检测方法类别
					value:"检验检测方法1",
					label:"检验检测方法1"
				}, {
					value:"检验检测方法2",
					label:"检验检测方法2"
				}, {
					value:"检验检测方法3",
					label:"检验检测方法3"
				}, {
					value:"检验检测方法4",
					label:"检验检测方法4"
				}, {
					value:"检验检测方法5",
					label:"检验检测方法5"
				}],
				options: [{//信息状态
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
				},
			}
		},
		methods: {
			iconOperation(row, column, cell, event){//切换Table-操作列中的修改、保存
				if(column.property ==="iconOperation"){
					row.isEditing = !row.isEditing
				}
			},
			modifyversion (row) {//点击修改后给当前修改人和修改时间赋值
				 this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
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
			     this.requestData_inspectionMet2()
			   }
			 },
			sizeChange(val) {//页数
		      this.page.pageSize = val;
		      this.requestData_inspectionMet2();
		    },
		    currentChange(val) {//当前页
		      this.page.currentPage = val;
		      this.requestData_inspectionMet2();
		    },
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData_inspectionMet2();
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
			viewfield_inspectionMet2(ID){//点击父级筛选出子级数据
				if(ID=='null'){
					this.inspectionMet2Form.inspectionList = [];
					return false;
					//todo  相关数据设置
				}
				var url = '/api/api-apps/app/inspectionMet2/INSPECTION_PROJECT2/' + ID;
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.page.totalCount = res.data.count;	
					//总的页数
					let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
					if(this.page.currentPage >= totalPage){
						 this.loadSign = false
					}else{
						this.loadSign=true
					}
					this.inspectionMet2Form.inspectionList=res.data.INSPECTION_METHOD2List;

					for(var j = 0; j < this.inspectionMet2Form.inspectionList.length; j++){
						this.inspectionMet2Form.inspectionList[j].isEditing = false;
					}
				}).catch((wrong) => {})
			},
			requestData_inspectionMet2(index) {//加载数据
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = '/api/api-apps/app/inspectionMet2';
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
					
					this.inspectionMet2Form.inspectionList = newarr;
				}).catch((wrong) => {})
			},
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			},
			addfield_inspectionMet2(P_NUM) { //插入行到产品类型Table中
				var isEditingflag=false;
				for(var i=0;i<this.inspectionMet2Form.inspectionList.length; i++){
					if (this.inspectionMet2Form.inspectionList[i].isEditing==false){
						isEditingflag=false;
					}else{
                        isEditingflag=true;
                        break;
					}
				}
				if (isEditingflag==false){
                	this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
                		var currentUser, currentDate
						this.currentUser=res.data.nickname;
						var date=new Date();
						this.currentDate = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
						var index=this.$moment(date).format("YYYYMMDDHHmmss");
						var obj = {
							"M_NAME": '',
							"M_ENAME": '',
							"M_TYPE": '',
							"DESCRIPTION": '',
							"STATUS": '活动',
							"P_NUM": P_NUM,
							"M_NUM": 'AS' + index,
							"VERSION": 1,
							"CHANGEBY": this.currentUser,
							"CHANGEDATE": this.currentDate,
							"isEditing": true,
						};
						this.inspectionMet2Form.inspectionList.unshift(obj);//在列表前新建行unshift，在列表后新建行push
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
				this.$refs['inspectionMet2Form'].validate((valid) => {
					row.VERSION = row.VERSION + 1;//修改保存后版本号+1
		          if (valid) {
					var url = '/api/api-apps/app/inspectionMet2/saveOrUpdate';
					var submitData = {
						"ID":row.ID,
						"P_NUM": row.P_NUM,
					    "M_NUM": row.M_NUM,
						"M_NAME": row.M_NAME,
						"M_ENAME": row.M_ENAME,
						"M_TYPE": row.M_TYPE,
						"DESCRIPTION": row.DESCRIPTION,
						"STATUS": row.STATUS,
					    "VERSION": row.VERSION,
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
							this.requestData_inspectionMet2();
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
				this.$confirm('确定删除此产品类型吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                	var url = '/api/api-apps/app/inspectionMet2/' + row.ID;
                    this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
					//resp_code == 0 是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.requestData_inspectionMet2();
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
			
		},
		
		mounted() {
			this.requestData_inspectionMet2();
			
		},
		

	}
</script>

<style scoped>
.el-form-item__error {
	top: 18%;
    left: 5px;
    background: #FFF;
    padding: 5px 10px;
}
</style>