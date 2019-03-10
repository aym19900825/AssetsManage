<template>
<div>
	<div class="text item">
		<div class="clearfix relative">
			<!-- <div class="columns pull-left"><el-button type="primary" size="small">关联父级</el-button></div> -->
			<div class="columns pull-left">
				<el-input placeholder="请输入原始数据模板描述" v-model="search" class="input-with-select">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
			<div class="table-func pull-right">
				<el-button type="success" size="mini" round @click="addfield_rawDataTem2" class="pull-right">
					<i class="icon-add"></i>
					<font>新建</font>
				</el-button>
			</div>
		</div>
		<el-form :model="rawDataTem2Form" ref="rawDataTem2Form">
		  <el-table :data="rawDataTem2Form.inspectionList.filter(data => !search || data.DECRIPTION.toLowerCase().includes(search.toLowerCase()))" row-key="ID" border stripe height="280" highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'rawDataTem2Form.inspectionList', order: 'descending'}" v-loadmore="loadMore">
		  	<el-table-column label="所属项目编号" width="120" prop="P_NUM">
		      <template slot-scope="scope">
		        <el-form-item :prop="'inspectionList.'+scope.$index + '.P_NUM'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
		        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_NUM" placeholder="自动生成" disabled></el-input><span v-else="v-else">{{scope.row.P_NUM}}</span>
				</el-form-item>
		      </template>
		    </el-table-column>

		  	<el-table-column label="原始数据编号" width="160" prop="NUM">
		      <template slot-scope="scope">
		        <el-form-item :prop="'inspectionList.'+scope.$index + '.NUM'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
		        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.NUM" placeholder="自动生成" disabled></el-input><span v-else="v-else">{{scope.row.NUM}}</span>
				</el-form-item>
		      </template>
		    </el-table-column>

		    <el-table-column label="原始数据模板描述" sortable prop="DECRIPTION">
		      <template slot-scope="scope">
		        <el-form-item :prop="'inspectionList.'+scope.$index + '.DECRIPTION'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
		        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DECRIPTION" placeholder="请选择" disabled>
		        		<el-button slot="append" icon="icon-search" @click="addprobtn(scope.row)"></el-button>
		        	</el-input><span v-else="v-else">{{scope.row.DECRIPTION}}</span>
				</el-form-item>
		      </template>
		    </el-table-column>

			<!-- <el-table-column prop="STATUS" label="信息状态" sortable width="100" :formatter="judge">
		      <template slot-scope="scope">
		         <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" disabled></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
		      </template>
		    </el-table-column> -->
			
			<!-- <el-table-column prop="VERSION" label="版本" sortable width="120">
		      <template slot-scope="scope">
		       	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" disabled></el-input><span v-else="v-else">#r{{scope.row.VERSION}}</span>
		      </template>
		    </el-table-column> -->

		    <!-- <el-table-column prop="CHANGEBY" label="修改人" sortable width="120">
		      <template slot-scope="scope">
		        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEBY" placeholder="请输入内容" disabled></el-input><span v-else="v-else">{{scope.row.CHANGEBY}}</span>
		      </template>
		    </el-table-column>

		     <el-table-column prop="CHANGEDATE" label="修改时间" sortable width="160" :formatter="dateFormat">
		      <template slot-scope="scope">
		      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEDATE" disabled></el-input><span v-else="v-else">{{scope.row.CHANGEDATE}}</span>
		      </template>
		    </el-table-column> -->

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
				<!-- <el-button type="text" size="medium" @click.native.prevent="modifyversion(scope.row)">
		        	<i class="icon-edit" title="修改"></i>
				</el-button> -->
			 <el-table-column prop="iconOperation" fixed="right" label="操作" width="80">
		      <template slot-scope="scope">
		        <el-button type="text" id="Edit" size="medium" @click.native.prevent="saveRow(scope.row)" v-if="scope.row.isEditing">
		        	<i class="icon-check" title="保存"></i>
				</el-button>

		        <el-button @click="deleteRow(scope.row)" type="text" size="medium" title="删除" v-else="v-else">
		          <i class="icon-trash red"></i>
		        </el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		</el-form>
		<!-- 表格 Begin-->
		<el-pagination background class="text-right pt10 pb10"
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
	<!-- 原始数据模板 Begin -->
		<el-dialog :modal-append-to-body="false" title="选择基础数据——原始数据模板" height="300px" :visible.sync="dialogVisible3" width="80%">
			<!--搜索框 Begin-->
			<div class="columns pull-right child-search">
				<el-input placeholder="请输入原始数据描述" v-model="search">
				</el-input>
			</div>
			<!--搜索框 End-->
			<!-- 第二层弹出的表格 Begin-->
			<el-table ref="table" :header-cell-style="rowClass" :data="categoryList.filter(data => !search || data.DECRIPTION.toLowerCase().includes(search.toLowerCase()))" border stripe height="300px" style="width: 100%;" :default-sort="{prop:'categoryList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
				<el-table-column type="selection" fixed width="55" align="center">
				</el-table-column>
				<el-table-column label="原始数据编号" width="125" sortable prop="NUM">
				</el-table-column>
				<el-table-column label="原始数据描述" sortable prop="DECRIPTION">
				</el-table-column>
				<el-table-column label="版本" width="100" sortable prop="VERSION" align="right">
				</el-table-column>
				<el-table-column label="创建时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat">
				</el-table-column>
				<el-table-column label="修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat">
				</el-table-column>
			</el-table>
			
			<!-- 表格 End-->
			<span slot="footer" class="dialog-footer">
		       <el-button type="primary" @click="addproclass">确 定</el-button>
		       <el-button @click="dialogVisible3 = false">取 消</el-button>
		    </span>
		</el-dialog>
		<!-- 原始数据模板 End -->
</div>
</template>
<script>
	import Config from '../../config.js'
	export default {
		name: 'rawDataTem2',
		components: {
			
		},
		props: ['parentIds'],
		data() {
			return {
				basic_url: Config.dev_url,
				rawDataTem2Form:{
					inspectionList: []
				},
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
					departmentId: '',//当前用户机构号
					categoryList:[],//获取产品数据
					catedata:'',//获取产品类别一条数据放到table行中
					dialogVisible3: false, //对话框
					selData:[],
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
					pageSize: 20,
					totalCount: 0
				},
				parentId: 1
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
			     this.viewfield_rawDataTem2(this.selParentId,this.parentId);
			   }
			 },
			 addprobtn(row){//查找基础数据中的检验/检测项目
				this.catedata = row;//弹出框中选中的数据赋值给到table行中
				this.dialogVisible3 = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				};
				this.$axios.get(this.basic_url + '/api-apps/app/rawDataTem?DEPTID=' + this.parentIds, {
					params: data
				}).then((res) => {
					// console.log(this.parentIds);
					// console.log(res.data);
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
			sizeChange(val) {//页数
		      this.page.pageSize = val;
		      this.viewfield_rawDataTem2(this.selParentId,this.parentId);
		    },
		    currentChange(val) {//当前页
		      this.page.currentPage = val;
		      this.viewfield_rawDataTem2(this.selParentId,this.parentId);
		    },
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.viewfield_rawDataTem2(this.selParentId,this.parentId);
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
				return this.$moment(date).format("YYYY-MM-DD");
			},
			indexMethod(index) {
				return index + 1;
			},
			viewfield_rawDataTem2(id,num){//点击父级筛选出子级数据
				if(id=='null'){
					this.rawDataTem2Form.inspectionList = []; 
					return false;
					//todo  相关数据设置
				}
				this.parentId = num;
				this.selParentId = id;
				var url = this.basic_url + '/api-apps/app/rawDataTem2/INSPECTION_PROJECT2/' + id;
				this.$axios.get(url, {}).then((res) => {
					//console.log(res);
					this.page.totalCount = res.data.count;	
					//总的页数
					let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
					if(this.page.currentPage >= totalPage){
						 this.loadSign = false
					}else{
						this.loadSign=true
					}
					this.rawDataTem2Form.inspectionList=res.data.RAW_DATA_TEMPATE2List;

					for(var j = 0; j < this.rawDataTem2Form.inspectionList.length; j++){
						this.rawDataTem2Form.inspectionList[j].isEditing = false;
					}

					this.$refs.singleTable.setCurrentRow(this.rawDataTem2Form.inspectionList[0]);//默认选中第一条数据

				}).catch((wrong) => {})
			},
			requestData_rawDataTem2(index) {//加载数据
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = this.basic_url + '/api-apps/app/rawDataTem2';
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
					
					this.rawDataTem2Form.inspectionList = newarr;
				}).catch((wrong) => {})
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selData = val;
			},
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			handleClose(done) {//关闭选择产品类别弹出框
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {
				console.log('取消关闭');
				$('.v-modal').hide();
			});
			},
			formatter(row, column) {
				return row.enabled;
			},
			addfield_rawDataTem2(P_NUM) { //插入行到原始数据模板Table中
				if (this.parentId == 1) {
					this.$message({
						message:'请选择所属检验/检测项目',
						type:'warning'
					})
				} else {
					var isEditingflag=false;
					for(var i=0;i<this.rawDataTem2Form.inspectionList.length; i++){
						if (this.rawDataTem2Form.inspectionList[i].isEditing==false){
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
							var obj = {
								"P_NUM": this.parentId,
								"NUM": '',
								"DECRIPTION": '',
								"STATUS": '',
								"VERSION": '',
								"DEPTID": '',
								"CHANGEBY": this.currentUser,
								"CHANGEDATE": this.currentDate,
								"isEditing": true,
							};
							this.rawDataTem2Form.inspectionList.unshift(obj);//在列表前新建行unshift，在列表后新建行push
						}).catch((err)=>{
							this.$message({
								message:'网络错误，请重试',
								type:'error'
							})
						})
		            } else {
		                this.$message.warning("请先保存当前编辑项");
					}
				}
			},
			saveRow (row) {//Table-操作列中的保存行
				this.$refs['rawDataTem2Form'].validate((valid) => {
					row.VERSION = row.VERSION + 1;//修改保存后版本号+1
		          if (valid) {
					var url = this.basic_url + '/api-apps/app/rawDataTem2/saveOrUpdate';
					var submitData = {
						"ID":row.ID,
						"P_NUM": row.P_NUM,
					    "NUM": row.NUM,
						"DECRIPTION": row.DECRIPTION,
						"STATUS": row.STATUS,
					    "VERSION": row.VERSION,
					    "DEPTID": row.DEPTID,
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
							// this.requestData_rawDataTem2();
							this.viewfield_rawDataTem2(this.selParentId,this.parentId);//重新加载父级选中的数据下所有子数据
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
                	var url = this.basic_url + '/api-apps/app/rawDataTem2/' + row.ID;
                    this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
					//resp_code == 0 是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.viewfield_rawDataTem2(this.selParentId,this.parentId);
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
			addproclass() { //小弹出框确认按钮事件
				this.dialogVisible3 = false
				this.catedata.NUM = this.selData[0].NUM;
				this.catedata.DECRIPTION = this.selData[0].DECRIPTION;
				this.catedata.DEPTID = this.selData[0].DEPTID;
				this.catedata.VERSION = this.selData[0].VERSION;
				this.$emit('request');
			},
			// addchildRow(row) {
			// 	this.$refs.rawDataAssetchild.addfield_rawDataAsset(row.NUM);
			// 	//console.log();
			// },
		},
		
		// mounted() {
		// 	this.requestData_rawDataTem2();
		// },
		

	}
</script>

<style scoped>
.el-form-item__error {
	top: 18%;
    left: 5px;
    background: #FFF;
    padding: 5px 10px;
}

.table-func {
	position: absolute;
	top: -50px;
    right: 0px;
    z-index: 888;
}
.columns{
	width:220px;
	position: absolute;
    right: 100px;
    bottom: -40px;
    z-index: 88;
}
</style>