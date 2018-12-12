<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
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
							<el-collapse-item name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.ASSETNUM" :disabled="true">
											<template slot="prepend">设备编号</template>
										</el-input>
									</el-col>
									<el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.STATUS" :disabled="true">
											<template slot="prepend">状态</template>
										</el-input>
									</el-col>
								</el-row>
								<el-form-item v-for="item in basicInfo" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" label-width="160px">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'" style="width: 220px;"></el-input>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'"></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'">
									</el-date-picker>
									<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'">
										<el-radio :label="it.label" v-for="it in item.opts"></el-radio>
									</el-radio-group>
								</el-form-item>
							</el-collapse-item>

							<el-collapse-item title="溯源后确认记录信息" name="2">
								<el-table :data="dataInfo.pmRecord" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'dataInfo.pmRecord', order: 'descending'}">
									<el-table-column prop="iconOperation" fixed label="" width="50px">
										<template slot-scope="scope">
											<i class="el-icon-check" v-if="scope.row.isEditing"></i>
											<i class="el-icon-edit" v-else="v-else"></i>
										</template>
									</el-table-column>
									 <el-table-column type="index" sortable label="序号" width="50">
                                    </el-table-column>
									<el-table-column prop="RECORDNUM" label="溯源确认记录编号" sortable width="120px">
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
								</el-table>
							</el-collapse-item>
							
							<!-- 其他信息 -->
							<el-collapse-item title="其他" name="3">
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
		props: ['detailData'],
		data() {
			var checkNum = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入设备价值'));
				}
				setTimeout(() => {
					if (!/^[0-9]*$/.test(value)) {
						callback(new Error('请输入数字值'));
					} else {
						callback();
					}
				}, 1000);
			};
			return {
				basicInfo: [
					{
						label: '计划描述',
						prop: 'DESCRIPTION',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						//无对应数据字段
						label: '出厂编号',
						prop: 'DESCRIPTION',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '设备名称',
						prop: 'A_NAME',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '规格型号',
						prop: 'MODEL',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '制造商',
						prop: 'VENDOR',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '溯源方式',
						prop: 'TRACEABILITY',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '溯源周期',
						prop: 'FREQUENCY',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '溯源机构',
						prop: 'PM_MECHANISM',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '前次溯源起始时间',
						prop: 'PM_START_END',
						width: '50%',
						type: 'date',
						displayType: 'inline-block'
					},
					{
						label: '前次溯源完成时间',
						prop: 'COMP_DATE',
						width: '50%',
						type: 'date',
						displayType: 'inline-block'
					},
					{
						label: '本次溯源计划时间',
						prop: 'PM_PLANDATE',
						width: '50%',
						type: 'date',
						displayType: 'inline-block'
					},
					{
						label: '溯源完成日期',
						prop: 'COMP_DATE',
						width: '50%',
						type: 'date',
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
						label: '录入机构',
						prop: 'DEPARTMENT',
						width: '30%',
						type: 'input',
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
					'STATE': '0',    //设备状态，必填但页面没有字段
					'OPTION_STATUS': '0',   //设备使用状态，必填但页面没有字段
					'TYPE': '仪器', //设备分类，必填但页面没有字段
					'ACCEPT_NUM': '',
					'ISMETER': '',
					'ISPM': '',
					'STATUSDATE': '',
					'KEEPER': '',
					'ACCEPT_DATE': '',
					'S_DATE': '2017-01-12',    //启用日期，必填但页面没有字段
					'C_ADDRESS': 'aaaaaaaaaaa',   //配置地址，必填但页面没有字段
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
				this.show = true;
				this.dataInfo = this.detailData;
			},
			//点击关闭按钮
			close() {
				this.resetForm();
			},
			resetForm(){
				this.dataInfo =  {
					'ID': '',  //主键ID，必填但页面没有字段
					'ASSETNUM': '1111',
					'DESCRIPTION': '',
					'CONFIG_UNIT': '',
					'INS_SITE': '',
					'SUPPORT_ASSET': '',
					'VENDOR': '',
					'SUPPLIER': '',	
					'MODEL': '',
					'FACTOR_NUM': '',
					'ASSET_KPI': '',
					'STATE': '0',    //设备状态，必填但页面没有字段
					'OPTION_STATUS': '0',   //设备使用状态，必填但页面没有字段
					'TYPE': '仪器', //设备分类，必填但页面没有字段
					'ACCEPT_NUM': '',
					'ISMETER': '',
					'ISPM': '',
					'STATUSDATE': '',
					'KEEPER': '',
					'ACCEPT_DATE': '',
					'S_DATE': '2017-01-12',    //启用日期，必填但页面没有字段
					'C_ADDRESS': 'aaaaaaaaaaa',   //配置地址，必填但页面没有字段
					'A_STATUS': '',
					'A_PRICE': 0,
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
				};
				this.$refs['dataInfo'].resetFields();
				this.show = false;
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
								this.resetForm();
								this.$emit('request');
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
		},
		mounted() {
			
		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>