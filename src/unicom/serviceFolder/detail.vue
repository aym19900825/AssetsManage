<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="pagemode=='add'">添加设备</div>
					<div class="mask_title" v-show="pagemode=='edit'">修改设备</div>
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
					<el-form inline-message :model="dataInfo" ref="dataInfo" label-width="120px" class="demo-user">
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
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'"></el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='inputSelect'" disabled>
											<el-button slot="append" icon="el-icon-search"></el-button>
										</el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'"></el-input>
										<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'">
										</el-date-picker>
										<!-- <el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'">
											<el-radio :label="it.label" v-for="it in item.opts" :key="it.id"></el-radio>
										</el-radio-group> -->
										<el-select clearable v-model="dataInfo[item.prop]"  v-if="item.type=='select'" filterable allow-create default-first-option placeholder="请选择">
											<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-collapse-item>

								 <el-collapse-item title="其他" name="5">
									<!-- <el-tabs tab-position="top">
                                        <el-tab-pane label="关联">
                                            <contract ref="contract"></contract>
                                        </el-tab-pane>
                                        <el-tab-pane label="台账变更历史">
                                            <changeHistory ref="changeHistory"></changeHistory>
                                        </el-tab-pane>
                                        <el-tab-pane label="维修记录">
                                            <mainHistory ref="mainHistory"></mainHistory>
                                        </el-tab-pane>
                                        <el-tab-pane label="预防性维护">
                                            <premainHistory ref="premianHistory"></premainHistory>
                                        </el-tab-pane>
                                    </el-tabs> -->
								</el-collapse-item>
							</el-collapse>
						</div>

						<div class="content-footer">
							<el-button type="primary" @click="close">保存</el-button>
							<el-button @click="close">取消</el-button>
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
	// import premainHistory from './premainHistory.vue'
	// import mainHistory from './mainHistory.vue'
	// import changeHistory from './changeHistory.vue'
	// import contract from './contract.vue'
	export default {
		name: 'masks',
		props: ['detailData'],
		components: {
			// premainHistory,
			// mainHistory,
			// changeHistory,
			// contract,
		},
		data() {
			return {
                //页面渲染字段
				basicInfo: [
					{
                        label: '作业计划',
                        prop: 'TYPE',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
                    },
                    {
                        label: '摘要',
                        prop: 'DESCRIPTION',
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
                        label: '位置',
                        prop: 'CONFIG_UNITDes',
                        width: '30%',
                        type: 'inputSelect',
                        displayType: 'inline-block'
                    },
                    {
                        label: '主管人',
                        prop: 'ACCEPT_DATE',
                        width: '30%',
                        type: 'inputSelect',
                        displayType: 'inline-block'
                    },
                    {
                        label: '组织',
                        prop: 'ASSET_KPI',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '分类',
                        prop: 'SUPPORT_ASSET',
                        width: '30%',
                        type: 'inputSelect',
                        displayType: 'inline-block'
                    },
                    {
                        label: '负责人',
                        prop: 'VENDOR',
                        width: '30%',
                        type: 'inputSelect',
                        displayType: 'inline-block'
                    },
                    {
                        label: '地点',
                        prop: 'FACTOR_NUM',
                        width: '30%',
                        type: 'inputSelect',
                        displayType: 'inline-block'
                    }
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
				activeNames: ['1', '2','3','4','5'], //手风琴数量
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
            close(){
                this.show = false;
            }
		},
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
	#cost{
		text-align: right !important;
	}
</style>