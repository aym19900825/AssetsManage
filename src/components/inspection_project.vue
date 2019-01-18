<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header ref="navsheader"></navs_header>
	</div>
	<div class="contentbg">
		<!--左侧菜单调用 Begin-->
			<!-- <navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>  -->
		<!--左侧菜单调用 End-->
		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content wrapperall" :style="{height: fullHeight}">
			<div class="ibox-content">
				<!--部门名称 Begin-->
				<el-row :gutter="0">
					<el-col :span="24" class="text-center">
						<div class="clearfix">
							<div class="table-func pull-left">
								<el-button type="success" size="mini" round @click="addfield_productType2" class="pull-right mt5">
									<i class="icon-add"></i>
									<font>新建</font>
								</el-button>
							</div>
						<el-form :inline="true" :model="formInline">
							<el-form-item label="部门名称" prop="DEPTID">
								<el-select v-model="formInline.DEPTID" placeholder="请选择部门" @change="requestData_productType2">
									<el-option v-for="(data,index) in Select_DEPTID" :key="index" :value="data.id" :label="data.fullname"></el-option>
								</el-select>

								<!-- <el-select v-model="formInline.DEPTID" placeholder="请选择部门" v-else disabled @change="requestData_productType2">
									<el-option v-for="(data,index) in Select_DEPTID" :key="index" :value="data.id" :label="data.fullname"></el-option>
								</el-select> -->
							</el-form-item>
						</el-form>
						</div>
					</el-col>
				</el-row>
				<!--部门名称 End-->
				<el-row :gutter="10">
					<el-col :span="6">
						<el-card class="box-card" :body-style="{ padding: '10px' }">
							<div slot="header" class="title clearfix">
								<span>产品类别</span>
								<!--搜索框 Begin-->
								<div class="columns pull-right" style="width: 160px;">
									<el-input placeholder="请输入产品类别名称" v-model="search">
									</el-input>
								</div>
								<!--搜索框 End-->
							</div>
							<div class="text item">
								<el-form :model="productType2Form" status-icon inline-message ref="productType2Form" class="el-radio__table">
								  <el-table ref="singleTable" :data="productType2Form.inspectionList.filter(data => !search || data.TYPE.toLowerCase().includes(search.toLowerCase()))" row-key="ID" border stripe height="250" highlight-current-row style="width: 100%;" :default-sort="{prop:'productType2Form.inspectionList', order: 'descending'}" v-loadmore="loadMore">

								  	<el-table-column label="类别编号" sortable width="100" prop="NUM" class="pl30">
								      <template slot-scope="scope">
								        <el-form-item :prop="'inspectionList.'+scope.$index + '.NUM'">
								        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.NUM" placeholder="自动生成" :disabled="true"></el-input><span class="blue" @click="viewchildRow(scope.row.ID,scope.row.NUM)" v-else="v-else">{{scope.row.NUM}}</span>
										</el-form-item>
								      </template>
								    </el-table-column>

								    <el-table-column label="类别名称" sortable prop="TYPE">
								      <template slot-scope="scope">
								        <el-form-item :prop="'inspectionList.'+scope.$index + '.TYPE'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
								        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.TYPE" placeholder="请选择" :disabled="true">
								        		<el-button slot="append" icon="icon-search" @click="addprobtn(scope.row)"></el-button>
								        	</el-input><span v-else="v-else">{{scope.row.TYPE}}</span>
										</el-form-item>
								      </template>
								    </el-table-column>

								    <el-table-column prop="iconOperation" fixed="right" label="操作" width="50">
								      <template slot-scope="scope">
								        <el-button type="text" id="Edit" size="medium" @click="saveRow(scope.row)" v-if="scope.row.isEditing">
								        	<i class="icon-check" title="保存"></i>
										</el-button>
										<!-- <el-button type="text" size="medium" @click="modifyversion(scope.row)">
								        	<i class="icon-edit" title="修改"></i>
										</el-button> -->
								        <el-button @click="deleteRow(scope.row)" type="text" size="medium" title="删除" v-else="v-else">
								          <i class="icon-trash red"></i>
								        </el-button>

									 	<!-- <el-button type="text" size="medium" @click="addchildRow(scope.row)">
								          <i class="icon-add" title="添加子项"></i>
								        </el-button> -->
								      </template>
								    </el-table-column>

								  </el-table>
								</el-form>
								<!-- 表格 Begin-->
								<!-- <el-pagination background class="pull-right pt10 pb10"
						            @size-change="sizeChange"
						            @current-change="currentChange"
						            :current-page="page.currentPage"
						            :page-sizes="[10, 20, 30, 40]"
						            :page-size="page.pageSize"
						            layout="total, sizes, prev, pager, next"
						            :total="page.totalCount">
						        </el-pagination> -->
								<!-- 表格 End-->
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="v-resize"><product2child @parentMsd_product2="childMsd_product2" ref="product2child"></product2child></el-col>
					<el-col :span="6" class="v-resize"><inspectionSta2child @parentMsd_inspectionSta2="childMsd_inspectionSta2" ref="inspectionSta2child"></inspectionSta2child></el-col>
					<el-col :span="6" class="v-resize"><inspectionPro2child @parentMsd_inspectionPro2="childMsd_inspectionPro2" ref="inspectionPro2child"></inspectionPro2child></el-col>
				</el-row>
				<div class="el-collapse-item mt10 pt10 pb10" aria-expanded="true" accordion>
					<el-row :gutter="0">
						<el-col :span="24">
							<el-tabs>
						    	<el-tab-pane label="专业组"><professionGrochild ref="professionGrochild" :parentIds="formInline.DEPTID"></professionGrochild></el-tab-pane>
						    	<el-tab-pane label="检验/检测方法"><inspectionMet2child ref="inspectionMet2child"></inspectionMet2child></el-tab-pane>
						    	<el-tab-pane label="原始数据模板"><rawDataTem2child ref="rawDataTem2child"></rawDataTem2child></el-tab-pane>
						    	<el-tab-pane label="检验/检测报告模板"><inspectionRepTem2child ref="inspectionRepTem2child"></inspectionRepTem2child></el-tab-pane>
						    	<el-tab-pane label="检测仪器"><rawDataAssetchild ref="rawDataAssetchild"></rawDataAssetchild></el-tab-pane>
						    </el-tabs>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
	<!--右侧内容显示 End-->
	</div>
	<!-- 产品类别 Begin -->
		<el-dialog :modal-append-to-body="false" title="选择基础数据——产品类别" height="300px" :visible.sync="dialogVisible3" width="80%" :before-close="handleClose">
			<!-- 第二层弹出的表格 Begin-->
			<el-table :header-cell-style="rowClass" :data="categoryList" border stripe height="300px" style="width: 100%;" :default-sort="{prop:'categoryList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
				<el-table-column type="selection" fixed width="55" align="center">
				</el-table-column>
				<el-table-column label="编码" width="155" sortable prop="NUM">
				</el-table-column>
				<el-table-column label="名称" sortable prop="TYPE">
				</el-table-column>
				<el-table-column label="版本" width="100" sortable prop="VERSION" align="right">
				</el-table-column>
				<el-table-column label="机构" width="185" sortable prop="DEPTIDDesc">
				</el-table-column>
				<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat">
				</el-table-column>
				<el-table-column label="修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat">
				</el-table-column>
			</el-table>
			
			<!-- 表格 End-->
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible3 = false">取 消</el-button>
		       <el-button type="primary" @click="addproclass">确 定</el-button>
		    </span>
		</el-dialog>
		<!-- 产品类别 End -->
</div>
</template>
<script>
	import Config from '../config.js'
	import vheader from './common/vheader.vue'
	import navs_header from './common/nav_tabs.vue'
	import navs_left from './common/left_navs/nav_left5.vue'
	import product2child from './inspection_project/product2.vue'//产品名称
	import inspectionSta2child from './inspection_project/inspectionSta2.vue'//检验/检测标准
	import inspectionPro2child from './inspection_project/inspectionPro2.vue'//检验/检测项目

	import professionGrochild from './inspection_project/professionGro.vue'//专业组
	import inspectionMet2child from './inspection_project/inspectionMet2.vue'//检验/检测方法
	import rawDataTem2child from './inspection_project/rawDataTem2.vue'//原始数据模板
	import inspectionRepTem2child from './inspection_project/inspectionRepTem2.vue'//检验/检测报告模板
	import rawDataAssetchild from './inspection_project/rawDataAsset.vue'//仪器和计量器具
	export default {
		name: 'inspection_project',
		components: {
			vheader,
			navs_left,
			navs_header,
			product2child,//产品名称
			inspectionSta2child,//检验/检测标准
			inspectionPro2child,//检验/检测项目

			professionGrochild,//专业组
			inspectionMet2child,//检验/检测方法
			rawDataTem2child,//原始数据模板
			inspectionRepTem2child,//检验/检测报告模板
			rawDataAssetchild,//仪器和计量器具
		},
		data() {
			return {
				basic_url: Config.dev_url,
      			Select_DEPTID:[],//获取机构部门
      			fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				formInline: {//选择站点显示数据
					DEPTID: '',//this.currentDept,
				},
				productType2Form:{//产品类别数据组
					inspectionList: []
				},
				departmentId: '',//当前用户机构号
				categoryList:[],//获取产品类型数据
				catedata:'',//获取产品类别一条数据放到table行中
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
					pageSize: 10,
					totalCount: 0
				},
				product2Id: 0,//获取子表产品ID
				inspectionSta2Id: 0,//获取子表检验/检测标准ID
				inspectionPro2Id: 0,//获取子表检验/检测项目ID
				dialogVisible3: false, //对话框
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			childMsd_product2(data){//赋值给子表产品ID
				this.$refs.inspectionSta2child.viewfield_inspectionSta2(data.id,data.num);
			},
			childMsd_inspectionSta2(data){//赋值给子表检验/检测标准ID
				this.inspectionSta2Id = data;
				this.$refs.inspectionPro2child.viewfield_inspectionPro2(data.id,data.num);
			},
			childMsd_inspectionPro2(data){//赋值给子表检验/检测标准ID
				this.inspectionPro2Id = data;
				this.$refs.professionGrochild.viewfield_professionGro(data.id,data.num);
				this.$refs.inspectionMet2child.viewfield_inspectionMet2(data.id,data.num);
				this.$refs.rawDataTem2child.viewfield_rawDataTem2(data.id,data.num);
				this.$refs.inspectionRepTem2child.viewfield_inspectionRepTem2(data.id,data.num);
				this.$refs.rawDataAssetchild.viewfield_rawDataAsset(data.id,data.num);
			},
			
			iconOperation(row, column, cell, event){//切换Table-操作列中的修改、保存
				if(column.property ==="iconOperation"){
					row.isEditing = !row.isEditing
				}
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selData = val;
			},
			
			
			// modifyversion (row) {//点击修改后给当前修改人和修改时间赋值				
			// 	row.isEditing = !row.isEditing				
			// 	 this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
			// 		row.CHANGEBY=res.data.nickname;
			// 		var date=new Date();
			// 		row.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
			// 		//console.log(row);
					
			// 	}).catch((err)=>{
			// 		this.$message({
			// 			message:'网络错误，请重试',
			// 			type:'error'
			// 		})
			// 	})
			// },

			loadMore () {//表格滚动加载
			   // if (this.loadSign) {
			   //   this.loadSign = false
			   //   this.page.currentPage++
			   //   if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			   //     return
			   //   }
			   //   setTimeout(() => {
			   //     this.loadSign = true
			   //   }, 1000)
			   //   this.requestData_productType2()
			   // }
			 },

			 addprobtn(row){//查找基础数据中的类别名称
			 	this.catedata = row;//弹出框中选中的数据赋值给到table行中
				this.dialogVisible3 = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				};
				this.$axios.get(this.basic_url + '/api-apps/app/productType?DEPTID=' + this.departmentId, {
					params: data
				}).then((res) => {
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
				return this.$moment(date).format("YYYY-MM-DD");
			},
			indexMethod(index) {
				return index + 1;
			},
			getDEPTID() {//获取机构部门数据
				var url = this.basic_url + '/api-user/users/currentMap';
	            this.$axios.get(url, {}).then((res) => {//获取当前用户信息
                	this.departmentId = res.data.deptId;
                	var departName = res.data.deptName;
					var currenturl = this.basic_url + '/api-user/depts/findByPid/' + this.departmentId;
					this.$axios.get(currenturl, {}).then((res) => {
						console.log(res.data);
						this.Select_DEPTID = res.data;
						if (this.departmentId == 128) {
							this.formInline.DEPTID = res.data[0].id;
						} else {
							this.Select_DEPTID.push({
								id: this.departmentId,
								fullname: departName
							});
							this.formInline.DEPTID = this.departmentId;
						}
						this.requestData_productType2();
					}).catch(error => {
						console.log('请求失败');
					})

				 }).catch((err) => {
	                this.$message({
	                    message: '网络错误，请重试',
	                    type: 'error'
	                });
	            });
			},

			// getData(){//获取当前用户信息
	  //           var url = this.basic_url + '/api-user/users/currentMap';
	  //           this.$axios.get(url, {}).then((res) => {//获取当前用户信息
   //                  this.departmentIds = res.data.deptId;
                    	
   //                  	var depturl = this.basic_url + '/api-user/depts/'+ this.departmentIds;
			//             this.$axios.get(depturl, {}).then((res) => {//根据当前用户信息查询它的组织机构
		 //                    // this.formInline.DEPTID = res.data.id;
		 //                    // console.log(this.departmentId);
			//             }).catch((err) => {
			//                 this.$message({
			//                     message: '网络错误，请重试',
			//                     type: 'error'
			//                 });
			//             });


	  //           }).catch((err) => {
	  //               this.$message({
	  //                   message: '网络错误，请重试',
	  //                   type: 'error'
	  //               });
	  //           });

	            
	  //       },
			requestData_productType2(val) {//加载数据
				var _this = this;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					DEPTID: this.formInline.DEPTID,//点击部门名称下拉菜单显示数据
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
					
					this.productType2Form.inspectionList = newarr;//滚动加载更多

					//默认主表第一条数据
					if(this.productType2Form.inspectionList.length > 0){
						this.viewchildRow(this.productType2Form.inspectionList[0].ID,this.productType2Form.inspectionList[0].NUM);
					}else{
						this.viewchildRow('null');
					}
					

					this.$refs.singleTable.setCurrentRow(this.productType2Form.inspectionList[0]);//默认选中第一条数据
				}).catch((wrong) => {})
			},
			
			handleClose(done) {//关闭选择产品类别弹出框
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			formatter(row, column) {//禁止产品类别行编辑
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
                		// console.log(res);
                		var currentUser, currentDate, currentDept;
						this.currentUser=res.data.nickname;
						this.currentDept=res.data.deptid;
						var date=new Date();
						this.currentDate = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
						var obj = {
							"TYPE": '',
							"STATUS": 1,
							"NUM": '',
							"VERSION": '',
							"DEPTID": this.currentDept,
						    "ENTERBY": this.currentUser,
						    "ENTERDATE": this.currentDate,
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
					    "DEPTID": row.DEPTID,
						"STATUS": row.STATUS,
					    "ENTERBY": row.ENTERBY,
					    "ENTERDATE": row.ENTERDATE,
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
			addproclass() { //小弹出框确认按钮事件
				this.dialogVisible3 = false;
				this.catedata.NUM = this.selData[0].ID;
				this.catedata.TYPE = this.selData[0].TYPE;
				this.catedata.VERSION = this.selData[0].VERSION;
				this.$emit('request');
			},
			viewchildRow(id,num) {//查看子项数据
				this.$refs.product2child.viewfield_product2(id,num);
			},
			// childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		// this.$refs.navsheader.showClick(childValue);
      		// },
		},
		
		mounted() {
			this.getDEPTID();
			// this.getData();
			// this.requestData_productType2();
		},
	}
</script>

<style scoped>
.input { position: relative; z-index: 25; }
.el-input__suffix-inner {display: none;}
.el-form-item { margin-bottom: 0px;}
.el-collapse-item {
	padding-left: 15px;
	padding-right: 15px;
}

.el-table td {
    padding-top: 0px;
    padding-bottom: 0px;
}
.table-func {
	position:relative;
	top: 0px;
    right: 0px;
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
.ml60 {margin-left: 60px;}
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