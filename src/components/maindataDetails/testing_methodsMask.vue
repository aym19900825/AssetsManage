<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加检验/检测方法</div>
				<div class="mask_title" v-show="modifytitle">修改检验/检测方法</div>
				<div class="mask_title" v-show="viewtitle">查看检验/检测方法</div>
				<div class="mask_anniu">
					<span class="mask_span mask_max" @click='toggle'>
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
					</span>
					<span class="mask_span" @click='close'>
						<i class="icon-close1"></i>
					</span>
				</div>
			</div>
			<div class="mask_content">
				<el-form :model="testingForm" inline-message :rules="rules" ref="testingForm" label-width="100px" status-icon>
					<div class="accordion">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="基础信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="3" class="pull-right">
										<el-input  v-model="testingForm.VERSION" :disabled="true">
											<template slot="prepend">版本</template>
										</el-input>
									</el-col>
									<!--<el-col :span="4" class="pull-right" v-if="modify">
										<el-input v-model="testingForm.STATUS=='1'?'活动':'不活动'" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
									<el-col :span="4" class="pull-right" v-else>
										<el-input v-model="testingForm.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>-->
									<el-col :span="5" class="pull-right">
										<el-input v-model="testingForm.M_NUM" @focus="hint" @input="hinthide" :disabled="noedit">
											<template slot="prepend">编码</template>
										</el-input>
										<span v-if="hintshow" style="color:rgb(103,194,58);font-size: 12px">可填写，若不填写系统将自动生成</span>
									</el-col>
								</el-row>

								<el-row>
									<el-col :span="8">
										<el-form-item label="中文名称" prop="M_NAME" >
											<el-input v-model="testingForm.M_NAME" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="英文名称" prop="M_ENAME" >
											<el-input v-model="testingForm.M_ENAME" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="类别" prop="M_TYPE">
											<!-- <el-select v-model="testingForm.M_TYPE" placeholder="请选择类别" style="width: 100%;">
												<el-option v-for="(data,index) in selectData" :key="index" :value="data.code" :label="data.name"></el-option>
											</el-select> -->
											<el-input v-model="testingForm.M_TYPE" placeholder="请输入类别" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8" v-if="dept">
										<el-form-item label="机构">
											<el-input v-model="testingForm.DEPARTMENT" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
							<el-collapse-item title="文件" name="2">
								<!-- 字段列表 Begin-->
								<div class="table-func">
									<el-button type="primary" size="mini" round>
										<i class="icon-upload-cloud"></i>
										<font>上传</font>
									</el-button>
									<el-button type="success" size="mini" round @click="addfield_doclinks">
										<i class="icon-add"></i>
										<font>新建</font>
									</el-button>
								</div>
								<!-- 字段列表 End -->

								<!-- 文件Table-List Begin-->
								<el-form :model="testing_filesForm" status-icon inline-message ref="testing_filesForm">
									  <el-table :data="testing_filesForm.inspectionList" row-key="ID" border stripe max-height="260" fit="true"highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'testing_filesForm.inspectionList', order: 'descending'}" v-loadmore="loadMore">
										<el-table-column prop="iconOperation" fixed="left" label="操作" width="80">
									      <template slot-scope="scope">
									        <el-button type="text" id="Edit" size="medium" @click="saveRow(scope.row)" v-if="scope.row.isEditing">
									        	<i class="icon-check" title="保存"></i>
											</el-button>
											<el-button type="text" size="medium" @click="modifyversion(scope.row)" v-else="v-else">
									        	<i class="icon-edit" title="修改"></i>
											</el-button>
									        <el-button @click="deleteRow(scope.row)" type="text" size="medium" title="删除" >
									          <i class="icon-trash red"></i>
									        </el-button>
									      </template>
									    </el-table-column>
									  	<el-table-column label="文件编号" sortable width="140" prop="DOCLINKS">
									      <template slot-scope="scope">
									        <el-form-item :prop="'inspectionList.'+scope.$index + '.DOCLINKS'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
									        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DOCLINKS" disabled></el-input><span class="blue" @click="viewchildRow(scope.row.ID)" v-else="v-else">{{scope.row.DOCLINKS}}</span>
											</el-form-item>
									      </template>
									    </el-table-column>
									    <el-table-column label="文件描述" sortable width="300" prop="DESCRIPTION">
									      <template slot-scope="scope">
									        <el-form-item :prop="'inspectionList.'+scope.$index + '.DESCRIPTION'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
									        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DESCRIPTION" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.DESCRIPTION}}</span>
											</el-form-item>
									      </template>
									    </el-table-column>		
										<el-table-column prop="DOC_SIZE" label="文件大小" sortable width="120">
									      <template slot-scope="scope">
									        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DOC_SIZE" placeholder="自动获取" disabled></el-input><span v-else="v-else">{{scope.row.DOC_SIZE}}</span>
									      </template>
									    </el-table-column>
									    <el-table-column prop="ENTERBY" label="上传人" sortable width="120">
									      <template slot-scope="scope">
									        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ENTERBY" placeholder="自动获取" disabled></el-input><span v-else="v-else">{{scope.row.ENTERBY}}</span>
									      </template>
									    </el-table-column>
									     <el-table-column prop="ENTERDATE" label="上传时间" sortable width="160" :formatter="dateFormat">
									      <template slot-scope="scope">
									      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ENTERDATE" placeholder="自动获取" disabled></el-input><span v-else="v-else">{{scope.row.ENTERDATE}}</span>
									      </template>
									    </el-table-column>
										<el-table-column prop="ROUTE" label="预览" sortable>
									      <template slot-scope="scope">
									        <el-button size="small" type="primary" v-if="scope.row.isEditing">点击上传</el-button>
									        <router-link :to="scope.row.ROUTE" target="_blank" class="blue font20" v-else="v-else">
												<i class="icon-word"></i>
											</router-link>
									      </template>
									    </el-table-column>
									  </el-table>
									</el-form>
									<!-- 表格 Begin-->
									<el-pagination v-if="modify" background class="pull-right pt10 pb10"
							            @size-change="sizeChange"
							            @current-change="currentChange"
							            :current-page="page.currentPage"
							            :page-sizes="[10, 20, 30, 40]"
							            :page-size="page.pageSize"
							            layout="total, sizes, prev, pager, next"
							            :total="page.totalCount">
							        </el-pagination>
								<!-- 文件Table-List End -->
							</el-collapse-item>
							<el-collapse-item title="其它" name="3" v-show="views">
								<el-row>
									<el-col :span="8">
										<el-form-item label="录入人">
											<el-input v-model="testingForm.ENTERBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间">
											<el-input v-model="testingForm.ENTERDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改人">
											<el-input v-model="testingForm.CHANGEBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改日期">
											<el-input v-model="testingForm.CHANGEDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="content-footer" v-show="noviews">
						<el-button type="primary" @click="saveAndUpdate('testingForm')">保存</el-button>
						<el-button type="success" @click="saveAndSubmit('testingForm')" v-show="addtitle">保存并添加</el-button>
						<el-button v-if="modify" type="primary" class="btn-primarys" @click="modifyversion('testingForm')">修订</el-button>
						<el-button @click="close">取消</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'testing_mask',
		props: {
			page: {
				type: Object,
			},
			testingForm: { //接收主表单中填写的数据信息
				type: Object,
				default: function() {
					return {
						VERSION: '',
						STATUS: '',
						M_NUM: '',
						M_NAME: '',
						M_ENAME: '',
						M_TYPE: '',
						DEPARTMENT: '',
						ENTERBY: '',
						ENTERDATE: '',
						CHANGEBY: '',
						CHANGEDATE: '',
					}
				}
			}
		},
		data() {
			return {
				basic_url: Config.dev_url,
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				selectData: [], //获取检验/检测方法类别
				selMenu:[],
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				dialogVisible: false, //对话框
				edit: true, //禁填
				activeNames: ['1', '2', '3'], //手风琴数量
//				labelPosition: 'top', //表单标题在上方
				addtitle: true,
				modifytitle: false,
				testing_filesForm:{//文件文档数据组
					inspectionList: []
				},
				TESTINGFORM:{},//
				isEditing: '',
				commentArr:{},//下拉加载
				rules: { //定义需要校验数据的名称
					M_NAME: [
						{ required: true, message: '请填写中文名称', trigger: 'blur' },
						{ min: 5, max: 35, message: '长度在 5 到 35 个字符', trigger: 'blur' }
					],
					M_ENAME: [
						{ required: true, message: '请填写英文名称', trigger: 'blur' },
						{ min: 5, max: 50, message: '长度在 5 到 15 个字符', trigger: 'blur' }
					],
					M_TYPE: [
						{ required: true, message: '请选择类别', trigger: 'change' }
					]
				},
				hintshow:false,
				personinfo:false,
				addtitle:true,
				modifytitle:false,
				viewtitle:false,
				dept:false,
				noedit:false,//表单内容
				views:false,//录入修改人信息
				noviews:true,//按钮
				modify:false,//修订
				hintshow:false,
				statusshow1:true,
				statusshow2:false,
			};
		},
		methods: {
			//编码提示
			hint(){
				this.hintshow = true;
			},
			hinthide(){
				this.hintshow = false;
			},
			visible() {//添加内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.testingForm.DEPARTMENT=res.data.deptName;
					this.testingForm.ENTERBY=res.data.nickname;
					var date=new Date();
					this.testingForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
            	this.addtitle = true;
				this.modifytitle = false;
				this.viewtitle = false;
				this.dept = false;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.modify = false;//修订
				this.hintshow = false;
				this.statusshow1 = true;
				this.statusshow2 = false;
            	// this.show = true;
			},
			detail() { //修改内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.testingForm.DEPARTMENT=res.data.deptName;
					this.testingForm.CHANGEBY=res.data.nickname;
					var date=new Date();
					this.testingForm.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
					//深拷贝数据
					let _obj = JSON.stringify(this.testingForm);
        			this.TESTINGFORM = JSON.parse(_obj);
        			
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle = false;
				this.dept = true;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.hintshow = false;
				this.modify = true;//修订
				this.statusshow1 = false;
				this.statusshow2 = true;
//				this.testingForm.STATUS=this.testingForm.STATUS=="1"?'活动':'不活动';
				this.show = true;
			},

			iconOperation(row, column, cell, event){//切换Table-操作列中的修改、保存
				if(column.property ==="iconOperation"){
					row.isEditing = !row.isEditing
				}
			},
			//这是查看
			view() {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.show = true;				
			},
			modifyversion (testingForm) {//点击修改后给当前创建人和创建日期赋值
				this.$refs[testingForm].validate((valid) => {
			        if (valid) {
			          	var TESTINGFORM=JSON.stringify(this.TESTINGFORM); //接过来的数据
			          	// console.log(TESTINGFORM);
	 					var testingForm=JSON.stringify(this.testingForm); //获取新新的数据
	 					// console.log(testingForm);
					 	if(testingForm==TESTINGFORM){
					  		this.$message({
								message: '没有修改不能修改',
								type: 'warning'
							});
							return false;
						}else{
							var url = this.basic_url + '/api-apps/app/inspectionMet/operate/upgraded';
							this.$axios.post(url,this.testingForm).then((res) => {
								//resp_code == 0是后台返回的请求成功的信息
								if(res.data.resp_code == 0) {
									this.$message({
										message: '保存成功',
										type: 'success'
									});
									//重新加载数据
									this.show = false;
									this.$emit('request');
									this.$emit('reset');
								}
							}).catch((err) => {
								this.$message({
									message: '网络错误，请重试',
									type: 'error'
								});
							});
						}
		          	} else {
			            this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
		          	}
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
			     	this.requestData_doclinks()
			    }
			},
			sizeChange(val) {//页数
		        this.page.pageSize = val;
		      	this.requestData_doclinks();
		    },
		    currentChange(val) {//当前页
		      	this.page.currentPage = val;
		      	this.requestData_doclinks();
		    },
			searchinfo(index) {//查询展示出第1页数据
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData_doclinks();
			},

			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},

			//检验/检测方法类别
			getType() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=type';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data;
				}).catch(error => {
					// console.log('请求失败');
				})
			},

			addfield_doclinks() { //插入行到文件文档Table中
				var isEditingflag=false;
				for(var i=0;i<this.testing_filesForm.inspectionList.length; i++){
					if (this.testing_filesForm.inspectionList[i].isEditing==false){
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
							"DOCLINKS": 'FLS' + index,
							"DESCRIPTION": '',
							"DOC_SIZE": '',
							"ROUTE": '',
							"ENTERBY": this.currentUser,
							"ENTERDATE": this.currentDate,
							"isEditing": true,
						};
						this.testing_filesForm.inspectionList.unshift(obj);//在列表前新建行unshift，在列表后新建行push
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
				this.$refs['testing_filesForm'].validate((valid) => {
		          	if (valid) {
						var url = this.basic_url + '/api-apps/app/doclinks/saveOrUpdate';
	//					var submitData = {
//						"ID":row.ID,
//					    "DOCLINKS": row.DOCLINKS,
//						"DESCRIPTION": row.DESCRIPTION,
//					    "DOC_SIZE": row.DOC_SIZE,
//						"ROUTE": row.ROUTE,
//						"ENTERBY": row.ENTERBY,
//					    "ENTERDATE": row.ENTERDATE,
//					}
						this.$axios.post(url, this.submitData).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//重新加载数据
								this.requestData_doclinks();
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
				this.$confirm('确定删除此文件文档吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                	var url = this.basic_url + '/api-apps/app/doclinks/' + row.ID;
                    this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
					//resp_code == 0 是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.requestData_doclinks();
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
			
			//点击关闭按钮
			close() {
				this.show = false;
				this.$emit('request');//关闭弹框去掉勾选
			},
			open(){
				this.show = true;
			},
			toggle(e) {
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			maxDialog(e) { //大弹出框距离头部少60px
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);
				$(".mask_div").css("margin", "0%");
				$(".mask_div").css("top", "60px");
			},
			//还原按钮
			rebackDialog() {
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("margin", "7% 10%");
				$(".mask_div").css("top", "0");
			},
			//执行保存
			save(testingForm) {
				var _this = this;
				this.$refs[testingForm].validate((valid) => {
					if (valid) {
					    _this.testingForm.STATUS=_this.testingForm.STATUS=="活动" ? '1' : '0';
						var url = this.basic_url + '/api-apps/app/inspectionMet/saveOrUpdate';
						this.$axios.post(url,_this.testingForm).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								
								this.$emit('reset');
								//重新加载数据
								this.$emit('request');
								this.visible();	
							}else{
								this.show = true;
								if(res.data.resp_code == 1) {
									//res.data.resp_msg!=''后台返回提示信息
									if( res.data.resp_msg!=''){
									 	this.$message({
											message: res.data.resp_msg,
											type: 'warning'
									 	});
									}else{
										this.$message({
											message:'相同数据不可重复添加！',
											type: 'warning'
										});
									}
								}
							}
						}).catch((err) => {
							this.show = true;
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
					} else {
						this.show = true;
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
					}
				});
			},
			//保存
			saveAndUpdate(testingForm){
				this.save(testingForm);
				this.show = false;
			},
			//保存并添加
			saveAndSubmit(testingForm){
				this.save(testingForm);
				this.show = true;
			},
			handleClose(done) { //大弹出框确定关闭按钮
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		},
		mounted() {
			this.getType();
		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>