<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加原始数据模板</div>
				<div class="mask_title" v-show="modifytitle">修改原始数据模板</div>
				<div class="mask_title" v-show="viewtitle">查看原始数据模板</div>
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
				<el-form :model="CATEGORY" inline-message :rules="rules" ref="CATEGORY" label-width="100px" class="demo-adduserForm">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="原始数据模板" name="1">
								<el-row>
									<el-col :span="8">
										<el-form-item label="编码" prop="NUM">
											<el-input v-model="CATEGORY.NUM" @focus="hint" @input="hinthide" :disabled="noedit"></el-input>
											<span v-if="hintshow" style="color:rgb(103,194,58);font-size: 12px">可填写，若不填写系统将自动生成</span>
										</el-form-item>
									</el-col>
									<el-col :span="16">
										<el-form-item label="模板描述" prop="DECRIPTION">
											<el-input v-model="CATEGORY.DECRIPTION" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8" v-if="dept">
										<el-form-item label="机构" prop="DEPARTMENT">
											<el-input v-model="CATEGORY.DEPARTMENT" :disabled="edit"></el-input>
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
									  <el-table :header-cell-style="rowClass" :data="testing_filesForm.inspectionList" row-key="ID" border stripe max-height="260" :fit="true"highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'testing_filesForm.inspectionList', order: 'descending'}" v-loadmore="loadMore">
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
										<el-form-item label="录入人" prop="ENTERBY">
											<el-input v-model="CATEGORY.ENTERBY" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE">
											<el-input v-model="CATEGORY.ENTERDATE" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改人" prop="CHANGEBY">
											<el-input v-model="CATEGORY.CHANGEBY" placeholder="当前修改人" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改时间" prop="CHANGEDATE">
											<el-input v-model="CATEGORY.CHANGEDATE" placeholder="当前修改时间" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer" v-show="noviews">
						<el-button type="primary" @click="saveAndUpdate('CATEGORY')">保存</el-button>
						<el-button type="success" @click="saveAndSubmit('CATEGORY')" v-show="addtitle">保存并添加</el-button>
						<el-button v-if="modify" type="success" @click="update('CATEGORY')">启用</el-button>
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
		name: 'masks',
		props: {
			CATEGORY: {
				type: Object,
				default: function() {
					return {
						ID: '',
						NUM: '',
						DECRIPTION: '',
						STATUS: '',
						DEPARTMENT: '',
						ENTERBY: '',
						ENTERDATE: '',
						CHANGEBY: '',
						CHANGEDATE: ''
					}
				}
			},
			page: Object,
		},
		data() {
			// var validateNum = (rule, value, callback) => {
			// 	if(value === '') {
			// 		callback(new Error('可填写，若不填写系统将自动生成'));
					
			// 	} else {
			// 		callback();
			// 	}
			// 	callback();
			// 	// if(value){
			// 	// 	if (value==='') {
			// 	// 		callback();
			// 	// 	}else{
		 //  //            	callback(new Error('可填写，若不填写系统将自动生成'));
			// 	// 	}
		 //  //       }else{
		 //  //            callback();
		 //  //       }
			// };
			var validateDeci = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写产品类别名称'));
				} else {
					callback();
				}
			};
			return {
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				selUser: [],
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1','2','3'], //手风琴数量
				//				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				selectData: [],
				rules: {
					// NUM: [{
					// 	trigger: 'blur',
					// 	validator: validateNum,
					// }],
					DECRIPTION: [{
						required: true,
						trigger: 'blur',
						validator: validateDeci,
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				category:{},//从父组件接过来的值
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
				testing_filesForm:{//文件文档数据组
					inspectionList: []
				},
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			//编码提示
			hint(){
				this.hintshow = true;
			},
			hinthide(){
				this.hintshow = false;
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
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
			//生成随机数函数
			rand(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
			},
			//点击按钮显示弹窗
			visible() {
				//				this.CATEGORY.NUM =  this.rand(1000,9999);
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.CATEGORY.DEPARTMENT = res.data.deptName;
					this.CATEGORY.ENTERBY = res.data.nickname;
					var date = new Date();
					this.CATEGORY.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
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
//				this.show = true;
			},
			// 这里是修改
			detail() {
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
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.CATEGORY.DEPARTMENT = res.data.deptName;
					this.CATEGORY.CHANGEBY = res.data.nickname;
					var date = new Date();
					this.CATEGORY.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
					//深拷贝数据
					let _obj = JSON.stringify(this.CATEGORY);
        			this.category = JSON.parse(_obj);
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.show = true;
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
			//点击更新按钮
			update(CATEGORY) {
				var data = {
					ID: this.CATEGORY.ID,
				}
				this.$axios.get(this.basic_url+ '/api-apps/app/rawDataTem/operate/updateRelate', {
					params: data
				}).then((res) => {
					console.log(res);
					console.log(res.data.resp_code);
					if(res.data.resp_code == 0) {
						this.$message({
							message: '更新成功',
							type: 'success'
						});
					}else{
						return;
					}
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
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
			maxDialog(e) {
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
			// 保存users/saveOrUpdate
			save(CATEGORY) {
				this.$refs[CATEGORY].validate((valid) => {
					if(valid) {
						this.CATEGORY.STATUS = ((this.CATEGORY.STATUS == "1" || this.CATEGORY.STATUS == '活动') ? '1' : '0');
						var url = this.basic_url + '/api-apps/app/rawDataTem/saveOrUpdate';
						this.$axios.post(url, this.CATEGORY).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//重新加载数据
								this.$emit('request');
								this.$emit('reset');
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
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
						this.falg = true;
					} else {
						this.show = true;
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
						this.falg = false;
					}
				});
			},
			
			//保存
			saveAndUpdate(CATEGORY) {
				this.save(CATEGORY);
				if(this.falg){
					this.show = false;
				}
			},
			//保存并添加
			saveAndSubmit(CATEGORY) {
				this.save(CATEGORY);
				// this.visible();
				this.show = true;
			},
			iconOperation(row, column, cell, event){//切换Table-操作列中的修改、保存
				if(column.property ==="iconOperation"){
					row.isEditing = !row.isEditing
				}
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
			//时间格式化
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
		},
		mounted() {
			
		},
		
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>