<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加仪器和计量器具</div>
				<div class="mask_title" v-show="modifytitle">修改仪器和计量器具</div>
				<div class="mask_title" v-show="viewtitle">查看仪器和计量器具</div>
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
									<!-- <el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.STATUS==1?'活动':'不活动'" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col> -->
								</el-row>
								<el-form-item v-for="item in basicInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && item.prop !='A_PRICE' " :disabled="noedit"></el-input>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'" :disabled="noedit"></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" :disabled="noedit">
									</el-date-picker>
									<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'" :disabled="noedit">
										<el-radio :label="it.label" v-for="it in item.opts" :key="it.id"></el-radio>
									</el-radio-group>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && item.prop =='A_PRICE' " @blur="handlePrice" :disabled="noedit" id="cost"></el-input>
								</el-form-item>
							</el-collapse-item>

							<!-- 设备保管人员情况 -->
							<el-collapse-item title="设备保管人员情况" name="2">
								<el-form-item v-for="item in keeperInfo" :label="item.label":key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'" :disabled="noedit"></el-input>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'" :disabled="noedit"></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" :disabled="noedit">
									</el-date-picker>
									<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'">
										<el-radio :label="it.val" v-for="it in item.opts" :key="it.id" :disabled="noedit">{{it.label}}</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-collapse-item>

						    <el-collapse-item title="设备溯源信息状态" name="3" v-show="modify">
								<el-table :header-cell-style="rowClass" :fit="true" :data="pmRecordList" row-key="ID" border stripe max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'pmRecordList', order: 'descending'}">
									<el-table-column type="index" sortable label="序号" width="50">
                                    </el-table-column>
									<el-table-column prop="RECORDNUM" label="溯源记录编号" sortable width="120px">
									</el-table-column>
									<el-table-column prop="PM_DATE" label="溯源日期" sortable width="120px">
									</el-table-column>
									<el-table-column prop="R_DESC" label="溯源确认内容" sortable >
									</el-table-column>
									<el-table-column prop="R_CONCLUSION" label="溯源确认结论" sortable width="200px">
									</el-table-column>
									<el-table-column prop="STATUS" label="溯源信息状态" sortable width="120px">
									</el-table-column>
								</el-table>
							</el-collapse-item>
							
							<!-- 其他信息 -->
							<el-collapse-item title="其他" name="4" v-show="!addtitle">
								<el-form-item v-for="item in otherInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" v-if="item.prop=='DEPARTMENT'" v-show="dept">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" disabled v-if="item.prop=='DEPARTMENT'"></el-input>
								</el-form-item>
								<el-form-item   v-for="item in otherInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" v-show="views">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" disabled ></el-input>
								</el-form-item>	
							</el-collapse-item>
						</el-collapse>
					</div>

					<div class="el-dialog__footer" v-show="noviews">
						<el-button type="primary" @click="saveAndUpdate('dataInfo')">保存</el-button>
						<el-button type="success" @click="saveAndSubmit('dataInfo')" v-show="addtitle">保存并添加</el-button>
						<el-button @click='close'>取消</el-button>
						<!-- <el-button type="primary" @click='submitForm'>提交</el-button> -->
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
		props: ['detailData'],
		data() {
			var checkNum = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入设备价值'));
				}else{
					callback();
				}
			};
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
					A_STATUS: [
						{ required: true, message: '请输入接收状态', trigger: 'blur' },
					],
					A_PRICE: [
						{ validator: checkNum, trigger: 'blur' },
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
						prop: 'DESCRIPTION',
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
						label: '使用状态',
						prop: 'OPTION_STATUS',
						width: '30%',
						type: 'input',
						displayType: 'inline-block',
					},
                    {
						label: '计量器具',
						prop: 'ISMETER',
						width: '30%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
								label: '是',
								val: '是'
                            },
                            {
								label: '否',
								val: '否'
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
								label: '是',
								val: '是'
                            },
                            {
								label: '否',
								val: '否'
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
								label: '外委',
								val: '外委'
                            },
                            {
								label: '自维',
								val: '自维'
                            }
                        ]
					},
					{
						label: '检定/验证',
						prop: 'MODE1',
						width: '30%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
								label: '送检',
								val: '送检'
                            },
                            {
								label: '自检',
								val: '自检'
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
								label: '全新',
								val: '全新'
                            },
                            {
								label: '已使用过',
								val: '已使用过'
                            },
                            {
								label: '改装过',
								val: '改装过'
                            },
                            {
								label: '大修过',
								val: '大修过'
                            }
                        ]
					},
					{
						label: '设备状态',
						prop: 'STATE',
						width: '70%',
						type: 'radio',
						 opts: [
                            {
								label: '启用',
								val: '1'
                            },
                            {
								label: '封存',
								val: '2'
                            },
                            {
								label: '报废',
								val: '3'
                            }
                        ],
						displayType: 'inline-block',
					},
					{
						label: '配置地址',
						prop: 'C_ADDRESS',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
					{
						label: '设备分类',
						prop: 'TYPE',
						width: '30%',
						type: 'radio',
						 opts: [
                            {
								label: '仪器',
								val: '仪器'
                            },
                            {
								label: '量具',
								val: '量具'
                            }
                        ],
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
						label: '启用日期',
						prop: 'S_DATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
                    {
						label: '技术资料',
						prop: 'TECHNICAL_DATA',
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
						label: '备注',
						prop: 'MEMO',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					}
				],
				otherInfo: [
					{
						label: '录入人',
						prop: 'ENTERBY',
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
						label: '机构',
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
				dialogVisible: false, //对话框
				modify: false,
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
					'ID': '',  //主键ID，必填但页面没有字段
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
					'STATE': '',    //设备状态，必填但页面没有字段
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
					'STATUS': '1',
					'SYNCHRONIZATION_TIME': '',
				},
				pmRecordList: [],
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
				falg:false,
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			handlePrice(){
				this.dataInfo.A_PRICE = parseFloat(this.dataInfo.A_PRICE).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				console.log(this.dataInfo.A_PRICE);
			},
			getUser(opt){
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url,{}).then((res) => {
					if(opt == 'new'){
                        this.dataInfo.CHANGEBY = res.data.username;
				        this.dataInfo.CHANGEDATE = this.getToday();
				        this.dataInfo.ENTERBY = res.data.username;
				        this.dataInfo.ENTERDATE = this.getToday();
						this.dataInfo.DEPARTMENT = res.data.deptName;
					}else{
						this.dataInfo.CHANGEBY = res.data.username;
				        this.dataInfo.CHANGEDATE = this.getToday();
					}
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			getToday(){
				var date = new Date();
				var str = date.getFullYear() + '-' + date.getMonth() + '-'+ date.getDate();
				return str;
			},
			getPmList(){
				var data = {
					page: 1,
					limit: 20,
					assetnum: this.dataInfo.ASSETNUM
				};
				var url = this.basic_url + '/api-apps/app/pmRecord';
				this.$axios.get(url,{
					params: data
				}).then((res) => {
					this.pmRecordList = res.data.data;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
					
			},
			//点击按钮显示弹窗
			visible() {
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
				this.show = true;
                this.getUser('new');
			},
			// 这里是修改
			detail(dataid) {
				this.dataInfo = this.detailData;
				this.handlePrice();
				this.getUser();
				this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle = false;
				this.dept = true;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.modify = true;
				this.hintshow = false;
				this.statusshow1 = true;
				this.statusshow2 = false;
				this.show = true;
//				this.getPmList();
			},
			//这是查看
			view(data) {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = false;
				this.modify = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.mview = true;
				this.noviews = false;//按钮
				this.dataInfo = data;
				this.show = true;				
			},
			//点击关闭按钮
			close() {
				this.reset();
				this.$emit('request');
				this.show = false;
			},
			reset(){
				this.dataInfo =  {
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
					'STATUS': '1',
					'SYNCHRONIZATION_TIME': '',
				};
				this.$refs['dataInfo'].resetFields();
				// this.show = false;
			},
			toggle(e) { //大弹出框大小切换
				if(this.isok1) {
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

			save(dataInfo) {
				var _this = this;
				console.log(_this.dataInfo);
				var url = this.basic_url + '/api-apps/app/asset/saveOrUpdate';
				this.$refs['dataInfo'].validate((valid) => {
					if (valid) {
						this.$axios.post(url, _this.dataInfo).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success',
								});
								
								this.$emit('request');
								this.reset();
								// this.$emit('reset');
								// this.visible();
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
						this.falg=true;
					} else {
						this.show = true;
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
						this.falg=false;
					}
				});
			},
			saveAndUpdate(dataInfo) {
				this.save(dataInfo);
				if(this.falg){
					this.show = false;
				}
			},
			saveAndSubmit(dataInfo) {
				this.save(dataInfo);
				this.show = true;
			},
		},
		mounted() {
			
		},

	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
	#cost{
		text-align: right !important;
		padding-right: 30px;
	}
</style>