<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加仪器和计量器具</div>
				<div class="mask_title" v-show="modifytitle">修改仪器和计量器具</div>
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
				<el-form status-icon :model="dataInfo" :label-position="labelPosition"  ref="dataInfo" label-width="100px" class="demo-user">
					<div class="accordion">
						<el-collapse v-model="activeNames" @change="handleChange">
							
							<el-collapse-item title="设备基本信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.ASSETNUM" :disabled="true">
											<template slot="prepend">设备编号</template>
										</el-input>
									</el-col>
									<el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
								</el-row>
								<!-- 第一行 -->
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="设备价值" prop="A_PRICE">
											<el-input v-model="dataInfo.A_PRICE"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="设备名称" prop="A_NAME">
											<el-input v-model="dataInfo.A_NAME"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="接收日期" prop="ACCEPT_DATE">
											<el-date-picker v-model="dataInfo.ACCEPT_DATE" value-format="yyyy-MM-dd">
											</el-date-picker>
											
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="设备型号" prop="MODEL">
											<el-input type="password" v-model="dataInfo.MODEL"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="配置单位" prop="CONFIG_UNIT">
											<el-input v-model="dataInfo.CONFIG_UNIT"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="使用日期" prop="USEDATE">
											<el-date-picker v-model="dataInfo.USEDATE" value-format="yyyy-MM-dd">
											</el-date-picker>
										</el-form-item>
									</el-col>
									
									
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="技术指标" prop="ASSET_KPI">
											<el-input type="textarea" v-model="dataInfo.ASSET_KPI"></el-input>

										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="配套设备" prop="SUPPORT_ASSET">
											<el-input type="textarea" v-model="dataInfo.SUPPORT_ASSET"></el-input>

										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="制造单位" prop="VENDOR">
											<el-input v-model="dataInfo.VENDOR"></el-input>
										</el-form-item>
									</el-col>
									
									<el-col :span="8">
										<el-form-item label="出厂编号" prop="FACTOR_NUM">
											<el-input v-model="dataInfo.FACTOR_NUM"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="供货单位" prop="SUPPLIER">
											<el-input v-model="dataInfo.SUPPLIER"></el-input>
										</el-form-item>
									</el-col>
									

								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="验收单号" prop="ACCEPT_NUM">
											<el-input v-model="dataInfo.ACCEPT_NUM"></el-input>
										</el-form-item>
									</el-col>
									
									<el-col :span="8">
										<el-form-item label="安装地点" prop="INS_SITE">
											<el-input v-model="dataInfo.INS_SITE"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										
										<el-form-item label="是否计量器具" prop="ISMETER">
											 <el-radio-group v-model="dataInfo.ISMETER">
    											<el-radio label="是"></el-radio>
    											<el-radio label="否"></el-radio>
  											</el-radio-group>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									
									<el-col :span="8">
										<el-form-item label="是否需要溯源" prop="ISPM">
											<el-radio-group v-model="dataInfo.ISPM">
												<el-radio label="是"></el-radio>
												<el-radio label="否"></el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :span="10">
										<el-form-item label="接收状态" prop="A_STATUS">
											<el-radio-group v-model="dataInfo.A_STATUS">
    											<el-radio label="全新"></el-radio>
    											<el-radio label="已使用过"></el-radio>
    											<el-radio label="改装过"></el-radio>
    											<el-radio label="大修过"></el-radio>
  											</el-radio-group>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									
									<el-col :span="8">
										<el-form-item label="维护方式" prop="MODE">
											<el-radio-group v-model="dataInfo.MODE">
												<el-radio label="外委"></el-radio>
												<el-radio label="自维"></el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="检定/验证方式" prop="MODE1">
											<el-radio-group v-model="dataInfo.MODE1">
    											<el-radio label="送检"></el-radio>
    											<el-radio label="自检"></el-radio>
  											</el-radio-group>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="技术资料" prop="SUPPORT_ASSET">
											<el-input type="textarea" v-model="dataInfo.SUPPORT_ASSET"></el-input>

										</el-form-item>
									</el-col>
								</el-row>
								
							</el-collapse-item>
							
							<el-collapse-item title="设备基本信息" name="2">
								
								<!-- 第一行 -->
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="设备保管人" prop="KEEPER">
											<el-input v-model="dataInfo.KEEPER"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="16">
											<el-form-item label="设备动态" prop="MEMO">
												<el-input type="textarea" v-model="dataInfo.MEMO"></el-input>
											</el-form-item>
									</el-col>
								</el-row>
								
								
							</el-collapse-item>

						<el-collapse-item title="设备溯源信息状态" name="3">
								<!-- 资质信息 Begin-->
								<!--<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield1">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>-->

								<el-table :data="dataInfo.pmRecord" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'dataInfo.pmRecord', order: 'descending'}">

									<el-table-column prop="iconOperation" fixed label="" width="50px">
										<template slot-scope="scope">
											<i class="el-icon-check" v-if="scope.row.isEditing"></i>
											<i class="el-icon-edit" v-else="v-else"></i>
										</template>
									</el-table-column>
						            
						            <!--<el-table-column prop="step" label="序号" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'qualifications.'+scope.$index + '.step'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.step" placeholder="请输入要求">		
											</el-input>
											<span v-else="v-else">{{scope.row.step}}</span>
											</el-form-item>
										</template>
									</el-table-column>-->
						            
									<el-table-column prop="RECORDNUM" label="溯源记录编号" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'pmRecord.'+scope.$index + '.RECORDNUM'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.RECORDNUM" placeholder="请输入委托方名称">
											</el-input>
											<span v-else="v-else">{{scope.row.RECORDNUM}}</span>
											</el-form-item>
										</template>
									</el-table-column>

									<el-table-column prop="PM_DATE" label="溯源日期" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'pmRecord.'+scope.$index + '.PM_DATE'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PM_DATE" placeholder="请输入委托方名称">
											</el-input>
											<span v-else="v-else">{{scope.row.PM_DATE}}</span>
											</el-form-item>
										</template>
									</el-table-column>

									<el-table-column prop="R_DESC" label="溯源确认内容" sortable >
										<template slot-scope="scope">
											<el-form-item :prop="'pmRecord.'+scope.$index + '.R_DESC'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-date-picker v-if="scope.row.isEditing" size="small" v-model="scope.row.R_DESC" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
											<span v-else="v-else">{{scope.row.R_DESC}}</span>
											</el-form-item>
										</template>
									</el-table-column>
									<el-table-column prop="R_CONCLUSION" label="溯源确认结论" sortable width="200px">
										<template slot-scope="scope">
											<el-form-item :prop="'pmRecord.'+scope.$index + '.R_CONCLUSION'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.R_CONCLUSION" placeholder="请输入要求">
											</el-input>
											<span v-else="v-else">{{scope.row.R_CONCLUSION}}</span>
											</el-form-item>
										</template>
									</el-table-column>

									<el-table-column prop="STATUS" label="溯源信息状态" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'pmRecord.'+scope.$index + '.STATUS'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入要求">
											</el-input>
											<span v-else="v-else">{{scope.row.STATUS}}</span>
										</el-form-item>
										</template>
									</el-table-column>

								<!--占时没有-->
									<!--<el-table-column fixed="right" label="操作" width="120">
										<template slot-scope="scope">
											<el-button @click.native.prevent="deleteRow(scope.$index,user.qualifications)" type="text" size="small">
												移除
											</el-button>
										</template>
									</el-table-column>-->

								</el-table>
							</el-collapse-item>
							
							
							
							<el-collapse-item title="其他" name="4">
								
								<!-- 第一行 -->
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="录入人" prop="ENTERBY">
											<el-input v-model="dataInfo.ENTERBYName" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE">
											<el-input v-model="dataInfo.ENTERDATE" :disabled="edit">
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入机构" prop="DEPARTMENT">
											<el-input v-model="dataInfo.DEPARTMENT" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="修改人" prop="CHANGEBY">
											<el-input v-model="dataInfo.CHANGEBY" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改时间" prop="CHANGEDATE">
											<el-input v-model="dataInfo.CHANGEDATE" :disabled="edit">
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>							
							</el-collapse-item>
						</el-collapse>
					</div>

					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click='submitForm()'>提交</el-button>
					</div>
				</el-form>
			</div>
			<!--底部-->
		</div>

		
	</div>
</template>

<script>
	export default {
		name: 'masks',
		props: {
			page: Object,
		},
		//		props: ['user','page'],

		data() {
			
			return {
//				user{},
				dataInfo: {
					status: '活动',
					pmRecord: [],
					
				},
				edit: true, //禁填	
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1', '2','3','4'], //手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				addtitle: true, //添加弹出框titile
				modifytitle: false, //修改弹出框titile
//				rules: {
//					deptName: [{ required: true, message: '必填', trigger: 'blur' }],//名称
//					education:[{required: true, message: '必填', trigger: 'blur'}],
//					roleId: [{required: true,trigger: 'blur',message: '必填',}],
//					username: [{required: true,trigger: 'blur',message: '必填',}],
//					password: [{required: true,trigger: 'blur',message: '必填',}],
//					sex:[{required: true,trigger: 'blur',message: '必填'}],
//					ispermit_authorization:[{required: true,trigger: 'change',message: '必填'}],//授权
//					islogin:[{required: true,trigger: 'change',message: '必填'}],//登陆
//					mac_address:[{required: true,trigger: 'blur',message: '必填',}],
//					ip_address:[{required: true,trigger: 'blur',message: '必填',}],
//					idnumber:[{required: true,trigger: 'blur',validator: validateIdnumber}],
//					phone: [{required: true,trigger: 'blur',validator: validatePhone}],
//					email: [{required: true,trigger: 'blur',validator: validateEmail,}],
//				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				selectData: [], //
				getCheckboxData: {},
			};
		},
		methods: {
			handleChange(val) { //手风琴开关效果调用
			},
			//
			handleCheckChange(data, checked, indeterminate) {
				this.getCheckboxData = data;
			},
			//
			handleNodeClick(data) { //获取勾选树菜单节点
				console.log(data);
			},


			//点击按钮显示弹窗
			visible() {
				this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
//					this.dataInfo.ENTERBY=res.data.id;
//					this.dataInfo.ENTERBYName=res.data.nickname;
//					var date=new Date();
//					this.dataInfo.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.addtitle = true;
				this.modifytitle = false;
				this.modify=false;
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				var usersUrl = '/api/api-user/users/currentMap';
				this.$axios.get(usersUrl, {}).then((res) => {
					this.user.changeby = res.data.nickname;
					var date = new Date();
					this.user.changedate = this.$moment(date).format("yyyy-MM-dd hh:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				
				var url = '/api/api-user/asset/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					console.log(res.data);
					this.user = res.data;

					this.user.sex=this.user.sex?'男':'女';
					this.user.roleId = [];
					var roles = this.user.roles;
					for(var i = 0; i < roles.length; i++) {
						this.user.roleId.push(roles[i].id);
					}
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
			toggle(e) { //大弹出框大小切换
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			maxDialog(e) { //定义大弹出框一个默认大小
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);
				$(".mask_div").css("margin", "0%");
				$(".mask_div").css("top", "60px");
			},

			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("margin", "7% 10%");
				$(".mask_div").css("top", "0");
			},
			getCheckedNodes() { //获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},

//			保存users/saveOrUpdate
			submitForm() {
				var _this = this;
				this.$refs.user.validate((valid) => {
					if(valid) {
						
						var url = '/api/api-user/asset/saveOrUpdate';
						this.$axios.post(url, this.dataInfo).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success',
								});
								this.show = false;
						
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
				})
			},
			
			


			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}

		},
		mounted() {
			
		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>