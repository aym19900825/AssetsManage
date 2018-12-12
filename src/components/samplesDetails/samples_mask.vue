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
				<el-form :model="samplesForm" :label-position="labelPosition" :rules="rules" ref="samplesForm" label-width="110px" status-icon>
					<div class="accordion">
						<el-collapse v-model="activeNames">
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
									<el-col :span="4" class="pull-right">
										<el-input type="number" v-model.number="samplesForm.VERSION" :disabled="true">
											<template slot="prepend">版本</template>
										</el-input>
									</el-col>
									<el-col :span="7" class="pull-right">
										<el-input placeholder="自动获取" v-model="samplesForm.ITEMNUM" :disabled="true">
											<template slot="prepend">样品编号</template>
										</el-input>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="委托书编号" prop="PROXYNUM">
											<el-input v-model="samplesForm.PROXYNUM" :disabled="true">
												<el-button slot="append" icon="el-icon-search" @click="getProxy"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="委托单位编号" prop="VENDOR">
											<el-input v-model="samplesForm.VENDOR"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="委托单位名称" prop="V_NAME">
											<el-input v-model="samplesForm.V_NAME" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="生产单位编号" prop="PRODUCT_COMPANY">
											<el-input v-model="samplesForm.PRODUCT_COMPANY"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="生产单位名称" prop="P_NAME">
											<el-input v-model="samplesForm.P_NAME"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="样品名称" prop="DESCRIPTION">
											<el-input v-model="samplesForm.DESCRIPTION"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="产品标识代码" prop="PRODUCT_CODE">
											<el-input v-model="samplesForm.PRODUCT_CODE"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="型号" prop="MODEL">
											<el-input v-model="samplesForm.MODEL"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="数量" prop="QUATITY">
											<el-input-number v-model="samplesForm.QUATITY" :min="1" :step="5" :max="100" label="描述文字" style="width: 100%"></el-input-number>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="类别" prop="TYPE">
											<el-select v-model="samplesForm.TYPE" placeholder="请选择类别" style="width: 100%;">
												<el-option v-for="(data,index) in selectData" :key="index" :value="data.code" :label="data.name"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="16">
										<el-form-item label="其他资料" prop="OTHER">
											<el-input v-model="samplesForm.OTHER"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="备注" prop="MEMO">
											<el-input type="textarea" rows="5" v-model="samplesForm.MEMO"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="入库时间" prop="ACCEPTDATE">
											<el-input v-model="samplesForm.ACCEPTDATE"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="收样人" prop="ACCEPT_PERSON">
											<el-input v-model="samplesForm.ACCEPT_PERSON"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="收样日期" prop="ACCEPT_DATE">
											<el-input v-model="samplesForm.ACCEPT_DATE"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="接样人" prop="RECIP_PERSON">
											<el-input v-model="samplesForm.RECIP_PERSON"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="接样日期" prop="RECIP_DATE">
											<el-input v-model="samplesForm.RECIP_DATE"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="状态日期" prop="STATUSDATE">
											<el-input v-model="samplesForm.STATUSDATE"></el-input>
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
										<el-form-item label="修改人">
											<el-input v-model="samplesForm.CHANGEBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改日期">
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
									  <el-table :data="samples_itemlineForm.inspectionList" row-key="ID" border stripe height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'samples_itemlineForm.inspectionList', order: 'descending'}" >
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
									        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ITEM_STEP" placeholder="自动获取" disabled></el-input><span v-else="v-else">{{scope.row.ITEM_STEP}}</span>
									      </template>
									    </el-table-column>

									    <el-table-column label="单件码" prop="SN" sortable>
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
		<!--点击委托书编号弹出框 Begin-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @check-change="handleCheckChange">
			</el-tree>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="dailogconfirm();" >确 定</el-button>
		    </span>
		</el-dialog>
		<!--点击委托书编号弹出框 Begin-->
	</div>
</template>

<script>
	import Config from '../../config.js'
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
						VERSION: '',//版本
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
				modify:false,//修订、修改人、修改日期
				selMenu:[],
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				dialogVisible: false, //对话框
				edit: true, //禁填
				activeNames: ['1', '2'], //手风琴数量
				labelPosition: 'right', //表单标题在上方
				addtitle: true,
				modifytitle: false,
				
				samples_itemlineForm:{//样品子表数据组
					inspectionList: []
				},
				//Tree树菜单数据
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "children",
					label: "fullname"
				},
				getCheckboxData: {},
				isEditing: '',
				commentArr:{},//下拉加载
				rules: { //定义需要校验数据的名称
					PROXYNUM: [
						{ required: true, message: '请填写委托书编号', trigger: 'blur' }
					],
					VENDOR: [
						{ required: true, message: '请填写委托单位编号', trigger: 'blur' }
					],
					V_NAME: [
						{ required: true, message: '请填写委托单位名称', trigger: 'blur' }
					],
					PRODUCT_COMPANY: [
						{ required: true, message: '请填写生产单位编号', trigger: 'blur' }
					],
					P_NAME: [
						{ required: true, message: '请填写生产单位名称', trigger: 'blur' }
					],
					DESCRIPTION: [
						{ required: true, message: '请填写样品名称', trigger: 'blur' }
					],
					TYPE: [
						{ required: true, message: '请选择类别', trigger: 'change' }
					],
					QUATITY: [
						{ required: true, message: '请填写数量', trigger: 'blur' }
					],
					ACCEPTDATE: [
						{ required: true, message: '入库时间不能为空', trigger: 'blur' }
					],
					ACCEPT_DATE: [
						{ required: true, message: '收样日期不能为空', trigger: 'blur' }
					],
					RECIP_DATE: [
						{ required: true, message: '接样日期不能为空', trigger: 'blur' }
					],
					STATUSDATE: [
						{ required: true, message: '状态日期不能为空', trigger: 'blur' }
					],
				},
			};
		},
		methods: {
			//获取委托书编号数据
			getProxy() {
				this.editSearch = 'dept';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data;
					this.dialogVisible = true;
				});
			},
			//选择委托书编号节点
			handleCheckChange(data, checked, indeterminate) {
				this.getCheckboxData = data;
			},
			dailogconfirm() { //委托书编号小弹出框确认按钮事件
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.samplesForm.PROXYNUM = this.getCheckboxData.id;
					this.samplesForm.V_NAME = this.getCheckboxData.fullname;
				} else {
					this.samplesForm.PROXYNUM = this.getCheckboxData.id;
					this.samplesForm.V_NAME = this.getCheckboxData.fullname;
				}
			},
			//小弹出框关闭按钮事件
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			getCheckedNodes() { //小弹出框获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},
			childMethods() {//添加内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
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
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
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
			
			modifyversion (row) {//点击修改后给当前修改人和修改日期赋值
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

			//检验/检测方法类别
			getType() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=type';
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
                	this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
                		var currentUser, currentDate
						this.currentUser=res.data.nickname;
						var date=new Date();
						this.currentDate = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
						var index=this.$moment(date).format("YYYYMMDDHHmmss");
						var obj = {
							"ITEMNUM": 'ITE' + index,
							"ITEM_STEP": '',
							"SN": '',
							"STATE": '1',
							"STATUS": '1',
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
					var url = this.basic_url + '/api-apps/app/itemline/saveOrUpdate';
					var submitData = {
						"ID":row.ID,
					    "ITEMNUM": row.ITEMNUM,
						"ITEM_STEP": row.ITEM_STEP,
						"SN": row.SN,
						"STATE": row.STATE,
						"STATUS": row.STATUS,
						"ENTERBY": row.ENTERBY,
						"ENTERDATE":row.ENTERDATE,
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
                	var url = this.basic_url + '/api-apps/app/itemline/' + row.ID;
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
			//点击提交按钮执行保存
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
					    this.samplesForm.STATUS=this.samplesForm.STATUS=="活动" ? '1' : '0';
						var url = this.basic_url + '/api-apps/app/item/saveOrUpdate';
						this.samplesForm.VERSION = this.samplesForm.VERSION + 1;//修改时版本+1
						this.$axios.post(url, this.samplesForm).then((res) => {
							console.log(res);
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