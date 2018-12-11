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
				<el-form status-icon :model="dataInfo" :rules="rules"   ref="dataInfo" label-width="100px" class="demo-user">
					<div class="accordion">

						<!-- 设备基本信息 -->
						<el-collapse v-model="activeNames">
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
								<el-form-item v-for="item in basicInfo" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'"></el-input>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'"></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'">
									</el-date-picker>
									<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'">
										<el-radio :label="it.label" v-for="it in item.opts"></el-radio>
									</el-radio-group>
								</el-form-item>
							</el-collapse-item>

							<!-- 设备保管人员情况 -->
							<el-collapse-item title="设备保管人员情况" name="2">
								<el-form-item v-for="item in keeperInfo" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'"></el-input>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'"></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'">
									</el-date-picker>
									<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'">
										<el-radio :label="it.label" v-for="it in item.opts"></el-radio>
									</el-radio-group>
								</el-form-item>
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
							
							<!-- 其他信息 -->
							<el-collapse-item title="其他" name="4">
								<el-form-item v-for="item in otherInfo" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'" disabled></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" disabled>
									</el-date-picker>
								</el-form-item>		
							</el-collapse-item>
						</el-collapse>
					</div>

					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click='submitForm'>提交</el-button>
					</div>
				</el-form>
			</div>
			<!--底部-->
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		props: {
			page: Object,
		},

		data() {
			return {
				rules: {
					ASSETNUM: [
						{ required: true, message: '请输入设备编号', trigger: 'blur' },
					],
					DESCRIPTION: [
						{ required: true, message: '请输入设备名称', trigger: 'blur' },
					],
					CONFIG_UNIT: [
						{ required: true, message: '请输入配置单位', trigger: 'blur' },
					],
					INS_SITE: [
						{ required: true, message: '请输入安装地点', trigger: 'blur' },
					],
					VENDOR: [
						{ required: true, message: '请输入制造商', trigger: 'blur' },
					],
					MODEL: [
						{ required: true, message: '请输入规格型号', trigger: 'blur' },
					],
					ASSET_KPI: [
						{ required: true, message: '请输入设备状态', trigger: 'blur' },
					],
					OPTION_STATUS: [
						{ required: true, message: '请输入设备使用状态', trigger: 'blur' },
					],
					ISMETER: [
						{ required: true, message: '请选择是否计量器具', trigger: 'blur' },
					],
					ISPM: [
						{ required: true, message: '请选择是否需要溯源', trigger: 'blur' },
					],
					KEEPER: [
						{ required: true, message: '请输入保管人', trigger: 'blur' },
					],
					ACCEPT_DATE: [
						{ required: true, message: '请输入接收日期', trigger: 'blur' },
					],
					S_DATE: [
						{ required: true, message: '请输入启用日期', trigger: 'blur' },
					],
					C_ADDRESS: [
						{ required: true, message: '请输入配置地址', trigger: 'blur' },
					],
					A_STATU: [
						{ required: true, message: '请输入接收状态', trigger: 'blur' },
					],
					MODE1: [
						{ required: true, message: '请选择鉴定/校准/验证方式', trigger: 'blur' },
					],
					STATUS: [
						{ required: true, message: '请输入信息状态', trigger: 'blur' },
					],

				},
				basicInfo: [
					{
						label: '设备价值',
						prop: 'A_PRICE',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '设备名称',
						prop: 'A_NAME',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '接收日期',
						prop: 'ACCEPT_DATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
                    {
						label: '设备型号',
						prop: 'MODEL',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '配置单位',
						prop: 'CONFIG_UNIT',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '使用日期',
						prop: 'USEDATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
                    {
						label: '技术指标',
						prop: 'ASSET_KPI',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
                    {
						label: '配套设备',
						prop: 'SUPPORT_ASSET',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
                    {
						label: '制造单位',
						prop: 'VENDOR',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '出厂编号',
						prop: 'FACTOR_NUM',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '供货单位',
						prop: 'SUPPLIER',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '验收单号',
						prop: 'ACCEPT_NUM',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '安装地点',
						prop: 'INS_SITE',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '计量器具',
						prop: 'INS_SITE',
						width: '30%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
                                label: '是'
                            },
                            {
                                label: '否'
                            }
                        ]
					},
                    {
						label: '需要溯源',
						prop: 'ISPM',
						width: '30%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
                                label: '是'
                            },
                            {
                                label: '否'
                            }
                        ]
					},
                    {
						label: '维护方式',
						prop: 'MODE',
						width: '30%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
                                label: '外委'
                            },
                            {
                                label: '自维'
                            }
                        ]
					},
					{
						label: '检定/验证方式',
						prop: 'MODE1',
						width: '30%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
                                label: '送检'
                            },
                            {
                                label: '自检'
                            }
                        ]
					},
                    {
						label: '接收状态',
						prop: 'A_STATUS',
						width: '70%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
                                label: '全新'
                            },
                            {
                                label: '已使用过'
                            },
                            {
                                label: '改装过'
                            },
                            {
                                label: '大修过'
                            }
                        ]
					},
                    {
						label: '技术资料',
						prop: 'SUPPORT_ASSET',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
				],
				keeperInfo: [
					{
						label: '设备保管人',
						prop: 'KEEPER',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '设备动态',
						prop: 'MEMO',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					}
				],
				otherInfo: [
					{
						label: '录入人',
						prop: 'ENTERBYName',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '录入时间',
						prop: 'ENTERDATE',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '录入机构',
						prop: 'DEPARTMENT',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '修改人',
						prop: 'CHANGEBY',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '修改时间',
						prop: 'CHANGEDATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					}
				],

				basic_url: Config.dev_url,

				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1', '2','3','4'], //手风琴数量
//				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				addtitle: true, //添加弹出框titile
				modifytitle: false, //修改弹出框titile
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				selectData: [], //
				getCheckboxData: {},

				dataInfo: {
					'ID': '',
					'ASSETNUM': '',
					'DESCRIPTION': '',
					'CONFIG_UNIT': '',
					'INS_SITE': '',
					'SUPPORT_ASSET': '',
					'VENDOR': '',
					'SUPPLIER': '',	
					'MODEL': '',
					'FACTOR_NUM': '',
					'ASSET_KPI': '',
					'STATE': '',
					'OPTION_STATUS': '',
					'TYPE': '',
					'ACCEPT_NUM': '',
					'ISMETER': '',
					'ISPM': '',
					'STATUSDATE': '',
					'KEEPER': '',
					'ACCEPT_DATE': '',
					'S_DATE': '',
					'C_ADDRESS': '',
					'A_STATUS': '',
					'A_PRICE': '',
					'MODE': '',
					'MODE1': '',
					'CHANGEBY': '',	
					'CHANGEDATE': '',	
					'ENTERBY': '',
					'ENTERDATE': '',	
					'DEPARTMENT': '',	
					'MEMO': '',	
					'STATUS': '',
					'SYNCHRONIZATION_TIME': '',
				}
			};
		},
		methods: {
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
				var usersUrl = this.basic_url + '/api-user/users/currentMap';
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
				
				var url = this.basic_url + '/api-user/asset/' + dataid;
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
				var url = this.basic_url + '/api-apps/app/asset/saveOrUpdate';
				this.$refs['dataInfo'].validate((valid) => {
					if (valid) {
						this.$axios.post(url, _this.dataInfo).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success',
								});
								this.show = false;
						
								// this.$emit('request')
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
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