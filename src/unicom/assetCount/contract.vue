<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="pagemode=='add'">添加仪器和计量器具</div>
					<div class="mask_title" v-show="pagemode=='edit'">修改仪器和计量器具</div>
					<div class="mask_anniu">
						<span class="mask_span mask_max" @click="toggle">
							<i :class="isok1?'icon-maximization':'icon-restore'"></i>
						</span>
						<span class="mask_span" @click="close">
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content">
					<el-form inline-message :model="dataInfo" :rules="rules" ref="dataInfo" label-width="120px" class="demo-user">
						<div class="content-accordion">
							<!-- 设备基本信息 -->
							<el-collapse v-model="activeNames">
								<el-collapse-item title="设备基本信息" name="1">
									<el-row :gutter="20" class="pb10">
										<el-col :span="5" class="pull-right">
											<el-input v-model="dataInfo.ASSETNUM" :disabled="true">
												<template slot="prepend">设备编号</template>
											</el-input>
										</el-col>
									</el-row>
									<el-form-item v-for="item in basicInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && item.prop !='A_PRICE' && item.prop !='TYPE' && item.prop !='ASSET_STATUS' && item.prop !='CONFIG_UNITDes' && item.prop !='ISPERIODIC'&& item.prop !='ASSET_NUMBER'" :disabled="noedit"></el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && (item.prop =='ASSET_STATUS' || item.prop =='CONFIG_UNITDes' || item.prop =='ISPERIODIC' || item.prop =='ASSET_NUMBER')" disabled></el-input>
										<!--设备分类-->
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && (item.prop =='TYPE')" :disabled="true">
											<el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="addAsset"></el-button>
										</el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'" :disabled="noedit"></el-input>
										<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" :disabled="noedit">
										</el-date-picker>
										<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'" :disabled="noedit">
											<el-radio :label="it.label" v-for="it in item.opts" :key="it.id"></el-radio>
										</el-radio-group>
										<el-select clearable v-model="dataInfo[item.prop]"  v-if="item.type=='select'" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit">
											<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && item.prop =='A_PRICE' " @blur="handlePrice" :disabled="noedit" id="cost"></el-input>
									</el-form-item>
								</el-collapse-item>

                                <el-collapse-item title="设备详细信息" name="2">
									<el-row :gutter="20" class="pb10">
										<el-col :span="5" class="pull-right">
											<el-input v-model="dataInfo.ASSETNUM" :disabled="true">
												<template slot="prepend">设备编号</template>
											</el-input>
										</el-col>
									</el-row>
									<el-form-item v-for="item in basicInfo1" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && item.prop !='A_PRICE' && item.prop !='TYPE' && item.prop !='ASSET_STATUS' && item.prop !='CONFIG_UNITDes' && item.prop !='ISPERIODIC'&& item.prop !='ASSET_NUMBER'" :disabled="noedit"></el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && (item.prop =='ASSET_STATUS' || item.prop =='CONFIG_UNITDes' || item.prop =='ISPERIODIC' || item.prop =='ASSET_NUMBER')" disabled></el-input>
										<!--设备分类-->
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && (item.prop =='TYPE')" :disabled="true">
											<el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="addAsset"></el-button>
										</el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'" :disabled="noedit"></el-input>
										<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" :disabled="noedit">
										</el-date-picker>
										<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'" :disabled="noedit">
											<el-radio :label="it.label" v-for="it in item.opts" :key="it.id"></el-radio>
										</el-radio-group>
										<el-select clearable v-model="dataInfo[item.prop]"  v-if="item.type=='select'" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit">
											<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && item.prop =='A_PRICE' " @blur="handlePrice" :disabled="noedit" id="cost"></el-input>
									</el-form-item>
								</el-collapse-item>

								<!-- 设备保管人员情况 -->
								<!-- <el-collapse-item title="设备保管人员情况" name="2">
									<el-form-item v-for="item in keeperInfo" :label="item.label" :key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
										<el-input v-model="dataInfo[item.prop]" v-if="item.type=='input'&&item.prop =='KEEPERDesc'" :type="item.type" :disabled="true">
											<el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="addPeople"></el-button>
										</el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'&&item.prop!='KEEPERDesc'" :disabled="noedit"></el-input>
									</el-form-item>
								</el-collapse-item> -->

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
								<!-- <el-collapse-item title="其他" name="5">
									<el-form-item v-for="item in otherInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" v-if="item.prop=='DEPARTMENT'" v-show="dept">
										<el-input v-model="dataInfo[item.prop]" :type="item.type" disabled v-if="item.prop=='DEPARTMENT'"></el-input>
									</el-form-item>
									<el-form-item v-for="item in otherInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" v-show="views">
										<el-input v-model="dataInfo[item.prop]" :type="item.type" disabled ></el-input>
									</el-form-item>	
								</el-collapse-item> -->
							</el-collapse>
						</div>

						<div class="content-footer">
							<el-button type="primary">保存</el-button>
							<el-button>取消</el-button>
						</div>
					</el-form>
				</div>
				<!--底部-->
			</div>

		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		props: ['detailData'],
		// components: {
		// 	docTable,
		// 	tree_grid,
		// },
		data() {
			var checkNum = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入设备价值'));
				}else{
					callback();
				}
			};
			var validateKeeper = (rule, value, callback) => {//类别
                if (this.dataInfo.KEEPERDesc === undefined || this.dataInfo.KEEPERDesc === '' || this.dataInfo.KEEPERDesc === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			return {
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				columns: [
					{
						text: '编码',
						dataIndex: 'CLASSIFY_NUM',
						isShow:true,
					},
					{
						text: '分类描述',
						dataIndex: 'CLASSIFY_DESCRIPTION',
						isShow:true,
					},
					{
						text: '父级分类',
						dataIndex: 'PARENTDesc',
						isShow:true,
					},
				],
				rules: {
					DESCRIPTION: [//设备名称
						{ required: true, message: '必填', trigger: 'blur'},
						{ trigger: 'blur', validator: this.Validators.isSpecificKey},
					],
					CONFIG_UNIT: [//配置单位
						{ required: true, message: '必填', trigger: 'blur'},
					],
					INS_SITE: [//安装地点
						{ required: true, message: '必填', trigger: 'blur' },
						{ trigger: 'blur', validator: this.Validators.isSpecificKey},
					],
					VENDOR: [//制造商
						{ required: true, message: '必填', trigger: 'blur' },
						{ trigger: 'blur', validator: this.Validators.isSpecificKey},
					],
					MODEL: [//规格型号
						{ required: true, message: '必填', trigger: 'blur' },
						{ trigger: 'blur', validator: this.Validators.isSpecificKey},
					],
					ASSET_KPI: [//技术指标
						{ required: true, message: '必填', trigger: 'blur' },
						{ trigger: 'blur', validator: this.Validators.isSpecificKey},
					],
					SUPPORT_ASSET: [//配套设备
						{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey},
					],
					OPTION_STATUS: [//设备使用状态
						{ required: true, message: '必填', trigger: 'blur' },
						{ trigger: 'blur', validator: this.Validators.isSpecificKey},
					],
					ISMETER: [//是否计量器具
						{ required: true, trigger: 'change', validator: this.Validators.isChoosedata},
					],
					ISPM: [//是否需要溯源
						{ required: true, trigger: 'change', validator: this.Validators.isChoosedata},
					],
					KEEPERDesc: [//设备保管人
						{ required: true, trigger: 'blur', validator: this.Validators.isChoosedata},
					],
					ACCEPT_DATE: [//接收日期
						{ required: true, message: '请选择日期', trigger: 'blur' },
					],
					USEDATE: [//使用日期
						{ required: true, message: '请选择日期', trigger: 'blur' },
					],
					S_DATE: [//启用日期
						{  required: true, message: '请选择日期', trigger: 'blur' },
					],
					C_ADDRESS: [//配置地址
						{ required: true, message: '必填', trigger: 'blur' },
						{ trigger: 'blur', validator: this.Validators.isSpecificKey},
					],
					MODE1: [//检定/验证
						{ required: true, trigger: 'change', validator: this.Validators.isChoosedata},
					],
					STATE: [//设备状态
						{ required: true, trigger: 'change', validator: this.Validators.isChoosedata},
					],
					MODE: [//维护方式
						{ required: true, trigger: 'change', validator: this.Validators.isChoosedata},
					],
					STATUS: [//信息状态
						{ required: true, trigger: 'blur', validator: this.Validators.isWorknumber},
					],
					A_STATUS: [//接收状态
						{ required: true, trigger: 'change', validator: this.Validators.isChoosedata},
					],
					TYPE: [//设备分类
						{ required: true, trigger: 'change', validator: this.Validators.isChoosedata},
					],
					A_PRICE: [//设备价值
						{ required: true, trigger: 'blur', message: '必填',},
					],
					FACTOR_NUM: [//出厂编号
						{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey },
					],
					SUPPLIER: [//供货单位
						{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey },
					],
					ACCEPT_NUM: [//验收单号
						{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey},
					],
					TECHNICAL_DATA: [//技术资料
						{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey },
					],
					MEMO: [//备注
						{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey },
					],
				},
				basicInfo: [
					{
                        label: '资产编码',
                        prop: 'TYPE',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
                    },
                    {
                        label: '资产名称',
                        prop: 'DESCRIPTION',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '位置',
                        prop: 'A_PRICE',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '状态',
                        prop: 'MODEL',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '组织',
                        prop: 'CONFIG_UNITDes',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '地点',
                        prop: 'ACCEPT_DATE',
                        width: '30%',
                        type: 'date',
                        displayType: 'inline-block'
                    },
                    {
                        label: '设备描述',
                        prop: 'ASSET_KPI',
                        width: '100%',
                        type: 'textarea',
                        displayType: 'inline-block'
                    },
                    {
                        label: '状态日期',
                        prop: 'SUPPORT_ASSET',
                        width: '100%',
                        type: 'textarea',
                        displayType: 'inline-block'
                    },
                    {
                        label: '分类',
                        prop: 'VENDOR',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '资产父级',
                        prop: 'FACTOR_NUM',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '类型',
                        prop: 'SUPPLIER',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '公司',
                        prop: 'ACCEPT_NUM',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '物资编码',
                        prop: 'OPTION_STATUS',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block',
                    },
                    {
                        label: '运行情况',
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
                ],
                basicInfo1: [
					{
                        label: '生产厂家',
                        prop: 'TYPE',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
                    },
                    {
                        label: '出厂序列号',
                        prop: 'DESCRIPTION',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '生产日期',
                        prop: 'A_PRICE',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '购买日期',
                        prop: 'MODEL',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '采购订单号',
                        prop: 'CONFIG_UNITDes',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '规格型号',
                        prop: 'ACCEPT_DATE',
                        width: '30%',
                        type: 'date',
                        displayType: 'inline-block'
                    },
                    {
                        label: '安装日期',
                        prop: 'ASSET_KPI',
                        width: '100%',
                        type: 'textarea',
                        displayType: 'inline-block'
                    },
                    {
                        label: '质保期',
                        prop: 'SUPPORT_ASSET',
                        width: '100%',
                        type: 'textarea',
                        displayType: 'inline-block'
                    },
                    {
                        label: '责任人',
                        prop: 'VENDOR',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '采购价格',
                        prop: 'FACTOR_NUM',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '有效期限',
                        prop: 'SUPPLIER',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '质保截止日期',
                        prop: 'ACCEPT_NUM',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '所属部门',
                        prop: 'OPTION_STATUS',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block',
                    },
                    {
                        label: '维护成本',
                        prop: 'OPTION_STATUS',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block',
                    },
                    {
                        label: '报废日期',
                        prop: 'OPTION_STATUS',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block',
                    },
                    {
                        label: '累计成本',
                        prop: 'OPTION_STATUS',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block',
                    },
                    {
                        label: '井号',
                        prop: 'OPTION_STATUS',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block',
                    },

				],
				keeperInfo: [
					{
						label: '设备保管人',
						prop: 'KEEPERDesc',
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
						prop: 'ENTERBYDesc',
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
						prop: 'DEPTIDDesc',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '修改人',
						prop: 'CHANGEBYDesc',
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

				show: false,
				isok1: true,
				activeNames: ['1', '2','3','4'], //手风琴数量
				// dialogVisible: false, //对话框
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
					'KEEPERDesc': '',
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
					'DEPTID': '',	
					'MEMO': '',	
					'STATUS': '1',
					'SYNCHRONIZATION_TIME': '',
				},
                pagemode: 'new'
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
            addPage(){
                this.show = true;
            },
            maxDialog(e) { //定义大弹出框一个默认大小
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 70);
				$(".mask_div").css("top", "-40px");
			},
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "90%");
				$(".mask_div").css("top", "0px");
            },
            toggle() { //大弹出框大小切换
				if(this.isok1) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
		},
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
	#cost{
		text-align: right !important;
	}
</style>