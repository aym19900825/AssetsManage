<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加接样</div>
				<div class="mask_title" v-show="modifytitle">修改接样</div>
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
				<el-form :model="samplesForm" :label-position="labelPosition" :rules="rules" ref="samplesForm" label-width="100px" status-icon>
					<div class="accordion">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基础信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="4" class="pull-right">
										<el-input v-model="samplesForm.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
									<el-col :span="4" class="pull-right">
										<el-input type="number" v-model.number="samplesForm.STATE" :disabled="true">
											<template slot="prepend">状态</template>
										</el-input>
									</el-col>
									<el-col :span="7" class="pull-right">
										<el-input placeholder="自动获取" v-model="samplesForm.M_NUM" :disabled="true">
											<template slot="prepend">检验/检测方法编号</template>
										</el-input>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="中文名称" prop="M_NAME">
											<el-input v-model="samplesForm.M_NAME"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="英文名称" prop="M_ENAME">
											<el-input v-model="samplesForm.M_ENAME"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="类别" prop="M_TYPE">
											<el-select v-model="samplesForm.M_TYPE" placeholder="请选择类别" style="width: 100%;">
												<el-option v-for="(data,index) in selectData" :key="index" :value="data.code" :label="data.name"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="录入人机构">
											<el-input v-model="samplesForm.DEPARTMENT" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入人">
											<el-input v-model="samplesForm.ENTERBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间">
											<el-input v-model="samplesForm.ENTERDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30" v-if="modify">
									<el-col :span="8">
										<el-form-item label="创建人">
											<el-input v-model="samplesForm.CHANGEBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="创建日期">
											<el-input v-model="samplesForm.CHANGEDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>

								</el-row>

							</el-collapse-item>
							<el-collapse-item title="样品子表" name="2">
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

								<!-- 样品子表Table-List Begin-->
								<el-form :model="samples_itemlineForm" status-icon inline-message ref="samples_itemlineForm">
									  <!-- 表格 Begin-->
									  <el-table :data="samples_itemlineForm.inspectionList" row-key="ID" border stripe height="380" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'samples_itemlineForm.inspectionList', order: 'descending'}" v-loadmore="loadMore">
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

									    <el-table-column label="样品编号" sortable width="140" prop="ITEMNUM">
									      <template slot-scope="scope">
									        <el-form-item :prop="'inspectionList.'+scope.$index + '.ITEMNUM'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
									        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ITEMNUM" placeholder="自动获取" disabled></el-input><span v-else="v-else">{{scope.row.ITEMNUM}}</span>
											</el-form-item>
									      </template>
									    </el-table-column>
										
										<el-table-column label="样品序号" prop="ITEM_STEP" sortable width="120">
									      <template slot-scope="scope">
									        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ITEM_STEP" placeholder="自动获取" disabled></el-input><span v-else="v-else">{{scope.ITEM_STEP.DOC_SIZE}}</span>
									      </template>
									    </el-table-column>

									    <el-table-column label="单件码" prop="SN" sortable width="200">
									      <template slot-scope="scope">
									        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.SN"  placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.SN}}</span>
									      </template>
									    </el-table-column>

										<el-table-column label="样品状态" prop="STATE" sortable width="140">
									      <template slot-scope="scope">
									      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATE" placeholder="自动获取" disabled></el-input><span v-else="v-else">{{scope.row.STATE}}</span>
									      </template>
									    </el-table-column>

									     <el-table-column label="录入人" prop="ENTERBY" sortable width="120">
									      <template slot-scope="scope">
									      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ENTERBY" placeholder="自动获取" disabled></el-input><span v-else="v-else">{{scope.row.ENTERBY}}</span>
									      </template>
									    </el-table-column>

									    <el-table-column label="录入时间" prop="ENTERDATE" sortable width="160">
									      <template slot-scope="scope">
									      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ENTERDATE" placeholder="自动获取" disabled></el-input><span v-else="v-else">{{scope.row.ENTERDATE}}</span>
									      </template>
									    </el-table-column>

									  </el-table>
									</el-form>
									<!-- 表格 End-->
									<el-pagination background class="pull-right pt10 pb10"
							            @size-change="sizeChange"
							            @current-change="currentChange"
							            :current-page="page.currentPage"
							            :page-sizes="[10, 20, 30, 40]"
							            :page-size="page.pageSize"
							            layout="total, sizes, prev, pager, next"
							            :total="page.totalCount">
							        </el-pagination>
								<!-- 样品子表Table-List End -->
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="content-footer">
						<el-form-item>
							<button @click="cancelForm" class="btn btn-default btn-large">取消</button>
							<button type="primary" class="btn btn-primarys btn-large" @click="submitForm('samplesForm')">提交</button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'samples_mask',
		props: {
			page: {
				type: Object,
			},
			samplesForm: { //接收主表单中填写的数据信息
				type: Object,
				default: function() {
					return {
						PROXYNUM: '',//委托书编号
						ITEMNUM: '',//样品编号
						VENDOR: '',//委托单位编号
						PRODUCT_COMPANY: '',//生产单位编号
						V_NAME: '',//委托单位名称
						P_NAME: '',//生产单位名称
						DESCRIPTION: '',//样品名称
						PRODUCT_CODE: '',//产品标识代码
						MODEL: '',//型号
						QUATITY: '',//数量
						OTHER: '',//其他资料
						MEMO: '',//备注
						ACCEPTDATE: '',//入库时间
						ACCEPT_PERSON: '',//收样人
						ACCEPT_DATE: '',//收样日期
						RECIP_PERSON: '',//接样人
						RECIP_DATE: '',//接样日期
						STATE: '',//状态
						STATUSDATE: '',//状态日期
						ENTERBY: '',//录入人
						ENTERDATE: '',//录入时间
						CHANGEBY: '',//修改人
						CHANGEDATE: '',//修改时间
						TYPE: '',//样品类别
						STATUS: '',//信息状态
					}
				}
			}
		},
		data() {
			return {
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				selectData: [], //获取检验/检测方法类别
				modify:false,//修订、创建人、创建日期
				selMenu:[],
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				dialogVisible: false, //对话框
				edit: true, //禁填
				activeNames: ['1', '2'], //手风琴数量
				labelPosition: 'top', //表单标题在上方
				addtitle: true,
				modifytitle: false,
				samples_itemlineForm:{//文件文档数据组
					inspectionList: []
				},
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
			};
		},
		methods: {
			handleChange(val) { //手风琴开关效果调用
			},
			
			childMethods() {//添加内容时从父组件带过来的
				this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
					this.samplesForm.DEPARTMENT=res.data.deptName;
					this.samplesForm.ENTERBY=res.data.nickname;
					var date=new Date();
					this.samplesForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.addtitle = true;
            	this.modifytitle = false;
            	this.modify=false;
            	this.show = !this.show;
			},
			detail() { //修改内容时从父组件带过来的
				this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
					this.samplesForm.CHANGEBY=res.data.nickname;
					var date=new Date();
					this.samplesForm.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.samplesForm.STATUS=this.samplesForm.STATUS=="1"?'活动':'不活动';
				this.show = true;
			},

			iconOperation(row, column, cell, event){//切换Table-操作列中的修改、保存
				if(column.property ==="iconOperation"){
					row.isEditing = !row.isEditing
				}
			},
			
			modifyversion (row) {//点击修改后给当前创建人和创建日期赋值
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

			//检验/检测方法类别
			getType() {
				var url = '/api/api-user/dicts/findChildsByCode?code=type';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},

			addfield_doclinks() { //插入行到文件文档Table中
				var isEditingflag=false;
				for(var i=0;i<this.samples_itemlineForm.inspectionList.length; i++){
					if (this.samples_itemlineForm.inspectionList[i].isEditing==false){
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
							"DOCLINKS": 'FLS' + index,
							"DESCRIPTION": '',
							"DOC_SIZE": '',
							"ROUTE": '',
							"ENTERBY": this.currentUser,
							"ENTERDATE": this.currentDate,
							"isEditing": true,
						};
						this.samples_itemlineForm.inspectionList.unshift(obj);//在列表前新建行unshift，在列表后新建行push
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
				this.$refs['samples_itemlineForm'].validate((valid) => {
		          if (valid) {
					var url = '/api/api-apps/app/doclinks/saveOrUpdate';
					var submitData = {
						"ID":row.ID,
					    "DOCLINKS": row.DOCLINKS,
						"DESCRIPTION": row.DESCRIPTION,
					    "DOC_SIZE": row.DOC_SIZE,
						"ROUTE": row.ROUTE,
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
                	var url = '/api/api-apps/app/doclinks/' + row.ID;
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
			},
			cancelForm() {
				this.show = false;
				this.reset();
			},
			reset() {
				this.show = false;
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
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
					    this.samplesForm.STATUS=this.samplesForm.STATUS=="活动" ? '1' : '0';
						var url = '/api/api-apps/app/inspectionMet/saveOrUpdate';
						this.samplesForm.VERSION = this.samplesForm.VERSION + 1;//修改时版本+1
						this.$axios.post(url, this.samplesForm).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								this.show = false;
								//重新加载数据
								this.$emit('request')
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