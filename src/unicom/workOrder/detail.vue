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
								<el-collapse-item title="基本信息" name="1">
									<el-form-item v-for="item in basicInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'"></el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='inputSelect'" disabled>
											<el-button slot="append" icon="el-icon-search"></el-button>
										</el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'"></el-input>
										<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'">
										</el-date-picker>
										<el-select clearable v-model="dataInfo[item.prop]"  v-if="item.type=='select'" filterable allow-create default-first-option placeholder="请选择">
											<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-collapse-item>

								 <el-collapse-item title="其他" name="5">
									<el-tabs tab-position="top"  @tab-click="tabClick">
                                        <el-tab-pane label="计划">
                                            <plan ref="plan"></plan>
                                        </el-tab-pane>
                                        <el-tab-pane label="任务分配">
                                            <taskAssign ref="taskAssign"></taskAssign>
                                        </el-tab-pane>
                                        <el-tab-pane label="实际情况">
                                           <actual ref="actual"></actual>
                                        </el-tab-pane>
                                        <el-tab-pane label="日志">
                                            <log ref="log"></log>
                                        </el-tab-pane>
                                        <el-tab-pane label="故障分析">
                                            <analysis ref="analysis"></analysis>
                                        </el-tab-pane>
                                    </el-tabs>
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
	import plan from './plan.vue'
	import taskAssign from './taskAssign.vue'
	import actual from './plan.vue'
	import log from './log.vue'
	import analysis from './analysis.vue'
	export default {
		name: 'masks',
		props: ['detailData'],
		components: {
			plan,
			taskAssign,
			actual,
			log,
            analysis
		},
		data() {
			return {
                //页面渲染字段
				basicInfo: [
					{
                        label: '工单编号',
                        prop: 'param1',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
                    },
                    {
                        label: '工单描述',
                        prop: 'param2',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '工单类型',
                        prop: 'param3',
                        width: '30%',
                        type: 'select',
                        displayType: 'inline-block'
                    },
                    {
                        label: '资产编码',
                        prop: 'param4',
                        width: '30%',
                        type: 'inputSelect',
                        displayType: 'inline-block'
                    },
                    {
                        label: '资产名称',
                        prop: 'param5',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '位置',
                        prop: 'param6',
                        width: '30%',
                        type: 'inputSelect',
                        displayType: 'inline-block'
                    },
                    {
                        label: '组织',
                        prop: 'param7',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '地点',
                        prop: 'param8',
                        width: '30%',
                        type: 'inputSelect',
                        displayType: 'inline-block'
                    },
                    {
                        label: '资产分类',
                        prop: 'param9',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
					{
						label: '备注',
						prop: 'param10',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '作业计划',
						prop: 'param11',
						width: '30%',
						type: 'inputSelect',
						displayType: 'inline-block'
					},
					{
						label: 'PM',
						prop: 'param12',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '优先级',
						prop: 'param13',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '优先级理由',
						prop: 'param14',
						width: '70%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '计划开始时间',
						prop: 'param15',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
					{
						label: '实际开始时间',
						prop: 'param16',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
					{
						label: '计划完成时间',
						prop: 'param17',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
					{
						label: '实际完成时间',
						prop: 'param18',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
					{
						label: '持续时间(小时)',
						prop: 'param19',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '剩余时间(小时)',
						prop: 'param20',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '代表',
						prop: 'param21',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '主管人',
						prop: 'param22',
						width: '30%',
						type: 'inputSelect',
						displayType: 'inline-block'
					},
					{
						label: '供应商',
						prop: 'param23',
						width: '30%',
						type: 'inputSelect',
						displayType: 'inline-block'
					},
					{
						label: '电话',
						prop: 'param24',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '负责人',
						prop: 'param25',
						width: '30%',
						type: 'inputSelect',
						displayType: 'inline-block'
					},
				],
				keeperInfo: [
					{
						label: '设备保管人',
						prop: 'KEEPERDesc',
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
					param1: '',
					param2: '',
					param3: '',
					param4: '',
					param5: '',
					param6: '',
					param7: '',
					param8: '',
					param9: '',
					param10: '',
					param11: '',
					param12: '',
					param13: '',
					param14: '',
					param15: '',
					param16: '',
					param17: '',
					param18: '',
					param19: '',
					param20: '',
					param21: '',
					param22: '',
					param23: '',
					param24: '',
					param25: ''
				},
				pagemode: 'new',
				selectData: [],
			};
		},
		methods: {
			tabClick(tab, event) {
			},
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