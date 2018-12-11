<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加检验委托书</div>
				<div class="mask_title" v-show="modifytitle">修改检验委托书</div>
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

				<el-form :model="dataInfo" :label-position="labelPosition" :rules="rules" ref="dataInfo" status-icon inline-message label-width="100px" class="demo-ruleForm">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="委托单位" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
									<el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.PROXYNUM" :disabled="true">
											<template slot="prepend">编号</template>
										</el-input>
									</el-col>

								</el-row>
								<div class="accordion-body tab-content">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="名称" prop="V_NAME">
												<el-input v-model="dataInfo.V_NAME">
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="地址" prop="V_ADDRESS">
												<el-input v-model="dataInfo.V_ADDRESS"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="邮编" prop="V_ZIPCODE">
												<el-input v-model="dataInfo.V_ZIPCODE"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="联系人姓名" prop="V_PERSON">
												<el-input v-model="dataInfo.V_PERSON" :disabled="false">
													<el-button slot="append" icon="el-icon-search" @click="getPeople()"></el-button>
												</el-input>

											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="联系人电话" prop="V_PHONE">
												<el-input v-model="dataInfo.V_PHONE"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="责任单位" prop="R_VENDOR">
												<el-input v-model="dataInfo.R_VENDOR"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="版本" prop="VERSION">
												<el-input v-model="dataInfo.VERSION"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托单位编号" prop="VENDOR">
												<el-input v-model="dataInfo.VENDOR"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="生产单位" name="2">
								<div class="accordion-body tab-content">
									<el-form-item label="生产单位名称" prop="P_NAME">
										<el-input v-model="dataInfo.P_NAME" :disabled="false">
											<el-button slot="append" icon="el-icon-search" @click=""></el-button>
										</el-input>

									</el-form-item>
								</div>
							</el-collapse-item>
							<el-collapse-item title="样品" name="3">
								<div class="accordion-body tab-content">

									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="名称" prop="ITEM_NAME">
												<el-input v-model="dataInfo.ITEM_NAME" :disabled="false">
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="标识" prop="ITEM_ID">
												<el-input v-model="dataInfo.ITEM_ID"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="型号" prop="ITEM_MODEL">
												<el-input v-model="dataInfo.ITEM_MODEL"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="数量" prop="ITEM_QUALITY">
												<el-input v-model="dataInfo.ITEM_QUALITY">
												</el-input>

											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品信息状态" prop="ITEM_STATUS">
												<el-input v-model="dataInfo.ITEM_STATUS"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="保密要求" prop="ITEM_SECRECY">
												<el-input v-model="dataInfo.ITEM_SECRECY"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="取样方式" prop="ITEM_METHOD">
												<el-radio-group v-model="dataInfo.ITEM_METHOD">
													<el-radio label="委托方送样"></el-radio>
													<el-radio label="抽样"></el-radio>
													<el-radio label="其他"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="10">
											<el-form-item label="检后处理" prop="ITEM_DISPOSITION">
												<el-radio-group v-model="dataInfo.ITEM_DISPOSITION">
													<el-radio label="自提"></el-radio>
													<el-radio label="邮寄"></el-radio>
													<el-radio label="报废"></el-radio>
													<el-radio label="本中心处理"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="检验" name="4">
								<div class="accordion-body tab-content">
									<el-form-item label="抽样方案/判定依据" prop="REMARKS">
										<el-input v-model="dataInfo.REMARKS"></el-input>
									</el-form-item>
								</div>
							</el-collapse-item>
							<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
								<el-tabs v-model="activeName" @tab-click="handleClick">
								    <el-tab-pane label="检验依据" name="first">
								    	
								    </el-tab-pane>
								    <el-tab-pane label="检验项目与要求" name="second">
								    	
								    </el-tab-pane>
								</el-tabs>
							</div>
							<!-- <el-collapse-item title="检验依据" name="5">
								 资质信息 Begin
								
							</el-collapse-item> -->

							<!-- <el-collapse-item title="检验项目与要求" name="6">
								 资质信息 Begin
								
							</el-collapse-item> -->

							<!-- <el-collapse-item title="分包要求" name="7">
								 分包要求 Begin
								

								年度计划列表 End 
							</el-collapse-item> -->

							<el-collapse-item name="8">
								<div class="accordion-body tab-content">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="完成日期" prop="COMPDATE">
												<el-date-picker v-model="dataInfo.COMPDATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="完成方式" prop="COMPMODE">
												<el-radio-group v-model="dataInfo.COMPMODE">
													<el-radio label="加急"></el-radio>
													<el-radio label="正常"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="编号" prop="REPORT_NUM">
												<el-input v-model="dataInfo.REPORT_NUM"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="交委托方分数" prop="REPORT_QUALITY">
												<el-input v-model="dataInfo.REPORT_QUALITY"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="发送方式" prop="REPORT_MODE">
												<el-radio-group v-model="dataInfo.REPORT_MODE">
													<el-radio label="自提"></el-radio>
													<el-radio label="邮寄"></el-radio>
													<el-radio label="其他"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="格式" prop="REPORT_FOMAT">
												<el-radio-group v-model="dataInfo.REPORT_FOMAT">
													<el-radio label="认证中心"></el-radio>
													<el-radio label="国家中心"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="检验收费" prop="CHECK_COST">
												<el-input v-model="dataInfo.CHECK_COST"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="合同费用" prop="CONTRACTCOST">
												<el-input v-model="dataInfo.CONTRACTCOST"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="实收费用" prop="ACTUALCOST">
												<el-input v-model="dataInfo.ACTUALCOST"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="实收比例" prop="ACTUAL_PERCENT">
												<el-input v-model="dataInfo.ACTUAL_PERCENT"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="付款方式" prop="PAYMENT_METHOD">
												<el-select v-model="dataInfo.PAYMENT_METHOD" placeholder="请选择" style="width: 100%;">
													<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="信息状态" prop="MESSSTATUS">
												<el-input v-model="dataInfo.MESSSTATUS"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="标识" prop="CNAS_OR_CMA_ID">
												<el-radio-group v-model="dataInfo.CNAS_OR_CMA_ID">
													<el-radio label="CNAS"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="主检组" prop="MAINGROUP">
												<el-select v-model="dataInfo.MAINGROUP" placeholder="请选择" style="width: 100%;">
													<el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="主检负责人" prop="LEADER">
													<el-input v-model="dataInfo.LEADER"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="生产单位编号" prop="PRODUCT_UNIT">
												<el-input v-model="dataInfo.PRODUCT_UNIT"></el-input>
											</el-form-item>
										</el-col>
				
									</el-row>
									<el-row :gutter="70">
										<el-col :span="24">
											<el-form-item label="备注" prop="MEMO">
												<el-input type="textarea" rows="5" v-model="dataInfo.MEMO"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="其他" name="9">
								<div class="accordion-body tab-content">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBY">
												<el-input v-model="dataInfo.ENTERBY" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENTERDATE">
												<el-input v-model="dataInfo.ENTERDATE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入人机构" prop="ORGID">
												<el-input v-model="dataInfo.ORGID" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="修改人" v-if="modify" prop="CHANGEBY">
												<el-input v-model="dataInfo.CHANGEBY" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" v-if="modify" prop="CHANGEDATE">
												<el-input v-model="dataInfo.CHANGEDATE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click="submitForm('dataInfo')">提交</el-button>
					</div>
				</el-form>
			</div>
		</div>

		<el-dialog :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
			<el-table :data="gridData" @selection-change="SelChange">
				<el-table-column type="selection" width="55" fixed>
				</el-table-column>
				<el-table-column label="ID" sortable width="50px" prop="id">
				</el-table-column>
				<el-table-column label="姓名" sortable width="200px" prop="nickname">
				</el-table-column>
				<el-table-column label="机构" sortable width="200px" prop="deptName">
				</el-table-column>
				<el-table-column label="公司" sortable width="200px" prop="companyName">
				</el-table-column>
			</el-table>
			<el-pagination background class="pull-right" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
			</el-pagination>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="dialogVisible = false">取 消</el-button>
    			<el-button type="primary" @click="dailogconfirm()">确 定</el-button>
  			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'masks',
		data() {
			var validate = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};

			return {
				dataInfo: {
					PROXYNUM: '1',
					STATUS: '草稿',
					INSPECT_PROXY_PROJECList: [],
					INSPECT_PROXY_BASISList: [],
					CHECK_PROXY_CONTRACTList: [],
				},
				gridData: [], //彈出框的數據
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				options: [{
					value: '现金',
					label: '现金'
				}, {
					value: '电汇',
					label: '电汇'
				}, {
					value: '支票',
					label: '支票'
				}, {
					value: '转账',
					label: '转账'
				}, {
					value: '其他',
					label: '其他'
				}],
				value: '',
				option: [{
					value: '金属组',
					label: '金属组'
				}, {
					value: '涂料组',
					label: '涂料组'
				}],
				value: '',
				selUser: [],
				//				disabled: true, //禁填
				editSearch: '', //判斷項目負責人和接收人
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				type: '',
				addtitle: true, //添加弹出框titile
				modifytitle: false, //修改弹出框titile
				modify: false,
				activeName: 'first',//tabs
				activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], //手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框

				rules: {
					V_NAME: [{ required: true, message: '必填', trigger: 'blur' }],//名称
					V_ADDRESS: [{ required: true, message: '必填', trigger: 'blur' }],//地址
					V_ZIPCODE: [{ required: true, message: '必填', trigger: 'blur' }],//邮编
					V_PERSON: [{ required: true, message: '必填', trigger: 'blur' }],//联系人姓名
					V_PHONE: [{ required: true, message: '必填', trigger: 'blur' }],//联系人电话
					R_VENDOR: [{ required: true, message: '必填', trigger: 'blur' }],//责任单位
					VERSION: [{ required: true, message: '必填', trigger: 'blur' }],//版本
					VENDOR: [{ required: true, message: '必填', trigger: 'blur' }],//委托单位编号
					P_NAME: [{ required: true, message: '必填', trigger: 'blur' }],//生产单位名称
					ITEM_NAME: [{ required: true, message: '必填', trigger: 'blur' }],//名称
					ITEM_ID: [{ required: true, message: '必填', trigger: 'blur' }],//标识
					ITEM_MODEL: [{ required: true, message: '必填', trigger: 'blur' }],//型号
					ITEM_QUALITY: [{ required: true, message: '必填', trigger: 'blur' }],//数量
					ITEM_STATUS: [{ required: true, message: '必填', trigger: 'blur' }],//样品信息状态
					ITEM_SECRECY: [{ required: true, message: '必填', trigger: 'blur' }],//保密要求
					ITEM_METHOD: [{ required: true, message: '必填', trigger: 'blur' }],//取样方式
					ITEM_DISPOSITION: [{ required: true, message: '必填', trigger: 'blur' }],//检后处理
					REMARKS: [{ required: true, message: '必填', trigger: 'blur' }],//抽样方案/判定依据
					COMPDATE: [{ required: true, message: '必填', trigger: 'blur' }],//完成日期
					PROXYNUM: [{ required: true, message: '必填', trigger: 'blur' }],//编号
					REPORT_QUALITY: [{ required: true, message: '必填', trigger: 'blur' }],//交委托方分数
					REPORT_MODE: [{ required: true, message: '必填', trigger: 'change' }],//发送方式
					REPORT_FOMAT: [{ required: true, message: '必填', trigger: 'change' }],//格式
					MAINGROUP: [{ required: true, message: '必填', trigger: 'change' }],//主检组
					LEADER: [{ required: true, message: '必填', trigger: 'blur' }],//主检负责人
					MEMO: [{ required: true, message: '必填', trigger: 'blur' }],//备注
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
			};
		},
		methods: {
//					resetNew() {
//						
//							
//						this.dataInfo.INSPECT_PROXY_PROJECList: [],
//						this.dataInfo.INSPECT_PROXY_BASISList: [],
//						this.dataInfo.CHECK_PROXY_CONTRACTList: [],
//		
////								this.$refs["dataInfo"].resetFields();
//								
//						},
			handleClick(tab, event) {
		        console.log(tab, event);
		    },
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					console.log(row.isEditing);
					row.isEditing = !row.isEditing;
					console.log(row.isEditing);
				}
			},
			
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			//新建行
			addfieldBasis() {
				var obj = {
					S_NUM: '',
					S_DESC: '',
					VERSION: '',
					STATUS: '',
					isEditing: true
				};
				this.dataInfo.INSPECT_PROXY_BASISList.push(obj);
			},
			addfieldProject() {
				var obj = {
					P_NUM: '',
					P_DESC: '',
					REMARKS: '',
					VERSION: '',
					STATUS: '',
					isEditing: true
				};
				this.dataInfo.INSPECT_PROXY_PROJECList.push(obj);
			},
			addcheckProCont() {
				var obj = {
					PROXY_CONTRACT_NUM: '',
					PROXYNUM: '',
					VENDOR: '',
					P_REMARKS: '',
					BASIS: '',
					REQUIRE: '',
					Q_TYPE: '',
					CHECKCOST: '',
					STATUS:'',
					isEditing: true
				};
				this.dataInfo.CHECK_PROXY_CONTRACTList.push(obj);
			},

			//刪除新建行
			deleteRow(index,rows) {//Table-操作列中的删除行
				rows.splice(index,1);

			},

			importdia() {
				this.dialogVisible = true;
			},
			//点击按钮显示弹窗
			visible() {
				//分包人数据置空
				//				this.datatinfo.checkProCont = [];
				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
					this.dataInfo.DEPT = res.data.deptName;
					this.dataInfo.ENTERBY = res.data.nickname;
					this.dataInfo.ORGID = res.data.deptName
					var date = new Date();
					this.dataInfo.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					})
				})
				this.statusshow1 = true;
				this.statusshow2 = false;
				this.addtitle = true;
				this.modifytitle = false;
				this.modify = false;
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				this.addtitle = false;
				this.modifytitle = true;
				this.statusshow1 = false;
				this.statusshow2 = true;
				this.modify = true;
				var usersUrl = '/api/api-user/users/currentMap'
				this.$axios.get(usersUrl, {}).then((res) => {
					this.dataInfo.CHANGEBY = res.data.nickname;
					var date = new Date();
					this.dataInfo.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd hh:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				
				var url = '/api/api-apps/app/inspectPro/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.dataInfo = res.data;
					this.show = true;
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
			submitForm(dataInfo) {
				this.$refs[dataInfo].validate((valid) => {
			        if (valid) {
					var url = '/api/api-apps/app/inspectPro/saveOrUpdate';
					console.log(this.dataInfo);
					this.$axios.post(url, this.dataInfo).then((res) => {
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
			           this.$message({
							message: '未填写完整，请填写',
							type: 'error'
						});
			          }
				});
			},

			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//获取负责人和接收人
			getPeople(type) {
				// type  1 這是負責人  2 這個事接收人
				var params = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = '/api/api-user/users';
				this.$axios.get(url, {
					params: params
				}).then((res) => {
					this.page.totalCount = res.data.count;
					this.gridData = res.data.data;
					this.dialogVisible = true;
					this.type = type;
				});
			},
			dailogconfirm(type) { //小弹出框确认按钮事件
				this.dialogVisible = false;
				if(this.type == '1') {
					this.dataInfo.P_LEADER = this.selUser[0].id;
					this.dataInfo.P_LEADERDesc = this.selUser[0].nickname;

				} else {
					this.dataInfo.ACCEPT_PERSON = this.selUser[0].id;
					this.dataInfo.ACCEPT_PERSONDesc = this.selUser[0].nickname;
				}
			},

			SelChange(val) {
				this.selUser = val;
			},
		}
	}
</script>

<style>
@import '../../assets/css/mask-modules.css';

/*.el-form-item__error {
	top: 18%;
    left: 5px;
    background: #FFF;
    padding: 5px 10px;
}*/

</style>