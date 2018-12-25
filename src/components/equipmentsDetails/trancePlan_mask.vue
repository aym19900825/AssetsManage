<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加溯源计划</div>
					<div class="mask_title" v-show="modifytitle">修改溯源计划</div>
					<div class="mask_title" v-show="viewtitle">查看溯源计划</div>
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
								</el-row>
								<el-form-item v-for="item in basicInfo" :label="item.label" :key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" label-width="160px">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'" style="width: 220px;"></el-input>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'"></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'">
									</el-date-picker>
									<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'">
										<el-radio :label="it.label" v-for="it in item.opts" :key="it.id"></el-radio>
									</el-radio-group>
									<el-select v-model="dataInfo[item.prop]" filterable placeholder="请选择" v-if="item.type == 'select'" @change="selChange">
										<el-option v-for="item in assets"
										:key="item.ID"
										:label="item.DESCRIPTION"
										:value="item.DESCRIPTION">
										</el-option>
									</el-select>
									<el-select v-model="dataInfo[item.prop]" filterable placeholder="请选择" v-if="item.type == 'sel'" style="width: 60px;">
										<el-option v-for="item in time"
										:key="item"
										:label="item"
										:value="item">
										</el-option>
									</el-select>
								</el-form-item>
							</el-collapse-item>

							<el-collapse-item title="溯源后确认记录信息" name="2">
								<el-table :header-cell-style="rowClass" :data="pmRecordList" row-key="ID" border stripe ma-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'pmRecordList', order: 'descending'}">
									 <el-table-column type="index" sortable label="序号" width="50">
                                    </el-table-column>
									<el-table-column prop="RECORDNUM" label="溯源确认记录编号" sortable width="120px">
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
							<el-collapse-item title="其他" name="3" v-show="modify">
								<el-form-item v-for="item in otherInfo" :label="item.label" :key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
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
				pmRecordList: [],
				time: [
					'年','月','日','周'
				],
				rules: {
					DESCRIPTION: [
						{ required: true, message: '请输入计划描述', trigger: 'blur' },
					],
					ASSETNUM: [
						{ required: true, message: '请输入设备编号', trigger: 'blur' },
					],
					A_NAME: [
						{ required: true, message: '请输入设备名称', trigger: 'blur' },
					],
					MODEL: [
						{ required: true, message: '请选择规格型号', trigger: 'blur' },
					],
					TRACEABILITY: [
						{ required: true, message: '请输入溯源方式', trigger: 'blur' },
					],
					FREQUENCY: [
						{ required: true, message: '请输入溯源周期', trigger: 'blur' },
					],
					FREQUENCYUNIT: [
						{ required: true, message: '请输入溯源周期单位', trigger: 'blur' },
					],
					PM_MECHANISM: [
						{ required: true, message: '请输入溯源机构', trigger: 'blur' },
					],
					PM_PLANDATE: [
						{ required: true, message: '请输入本次溯源计划时间', trigger: 'blur' },
					],
					R_DESC: [
						{ required: true, message: '请输入确认内容', trigger: 'blur' },
					],
					C_PERSON: [
						{ required: true, message: '请输入确认人', trigger: 'blur' },
					],
					C_DATE: [
						{ required: true, message: '请输入确认日期', trigger: 'blur' },
					],
					APPR_PERSON: [
						{ required: true, message: '请输入审核人', trigger: 'blur' },
					],
					APPR_DATE: [
						{ required: true, message: '请输入审核日期', trigger: 'blur' },
					],
					STATUS: [
						{ required: true, message: '请输入信息状态', trigger: 'blur' },
					],
					S_MEMO: [
						{ required: true, message: '请输入特殊情况说明', trigger: 'blur' },
					],
					DESCRIPTION: [
						{ required: true, message: '请输入记录描述', trigger: 'blur' },
					],
				},
				assets: [],
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
						prop: 'LE_FACTORYNUM',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '设备名称',
						prop: 'A_NAME',
						width: '50%',
						type: 'select',
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
						type: 'radio',
						displayType: 'inline-block',
						opts: [
                            {
                                label: '检定'
                            },
                            {
                                label: '核查'
                            }
                        ],
					},
					{
						label: '溯源机构',
						prop: 'PM_MECHANISM',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '溯源周期',
						prop: 'FREQUENCY',
						width: '20%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '',
						prop: 'FREQUENCYUNIT',
						width: '100',
						type: 'sel',
						displayType: 'inline-block'
					},
					{
						label: '前次溯源起始时间',
						prop: 'PM_START_END',
						width: '50%',
						type: 'date',
						displayType: 'inline-block'
					},
					// {
					// 	label: '前次溯源完成时间',
					// 	prop: 'COMP_DATE',
					// 	width: '50%',
					// 	type: 'date',
					// 	displayType: 'inline-block'
					// },
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
				modify: false,
				activeNames: ['1', '2','3','4'], //手风琴数量
				dialogVisible: false, //对话框
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
					'PMNUM': '', //必填页面没有
					'DESCRIPTION': '',
					'ASSETNUM': '',
					'A_NAME': '',
					'MODEL': '',
					'VENDOR': '',
					'TRACEABILITY': '',
					'FREQUENCY': '',
					'LE_FACTORYNUM': '',
					'FREQUENCYUNIT': '',
					'PM_MECHANISM': '',
					'PM_START_END': '',		
					'PM_PLANDATE': '',
					'COMP_DATE': '',	
					'STATUS': '1',
					'ENTERBY': '',
					'ENTERDATE': '',	
					'DEPARTMENT': '',
				},
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
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
				return 'text-align:center'
			},
			getUser(opt){
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url,{}).then((res) => {
					if(opt == 'new'){
				        this.dataInfo.ENTERBY = res.data.username;
				        this.dataInfo.ENTERDATE = this.getToday();
						this.dataInfo.DEPARTMENT = res.data.deptName;
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
				var str = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
				return str;
			},
			selChange(val){
				var data = this.assets;
				var selData = data.filter(function(item){
					if(item.DESCRIPTION == val){
						return item;
					}
				});
				this.dataInfo.MODEL = selData[0].MODEL;
				this.dataInfo.ASSETNUM = selData[0].ASSETNUM;
				this.dataInfo.VENDOR = selData[0].VENDOR;
				this.dataInfo.LE_FACTORYNUM = selData[0].FACTOR_NUM;
				this.getPmList();
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
				this.getUser('new');
				this.modify=false;
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				this.modify = true;
				this.show = true;
				this.dataInfo = this.detailData;
			},
			//这是查看
			view(data) {
				// var url = this.basic_url + '/api-apps/app/pmPlan/' + dataid;
				// this.$axios.get(url, {}).then((res) => {
				// 	// this.modify = true;
				// 	// this.show = true;
				// 	this.dataInfo = res.data;
				// }).catch((wrong) => {});
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = false;
				this.modify = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.dataInfo = data;
				this.show = true;				
			},
			//点击关闭按钮
			close() {
				this.resetForm();
				this.$emit('request');
			},
			resetForm(){
				this.dataInfo =  {
					'ID': '',	
					'PMNUM': '',
					'DESCRIPTION': '',
					'ASSETNUM': '',
					'A_NAME': '',
					'MODEL': '',
					'VENDOR': '',
					'TRACEABILITY': '',
					'FREQUENCY': '',
					'FREQUENCYUNIT': '',
					'PM_MECHANISM': '',
					'PM_START_END': '',		
					'PM_PLANDATE': '',
					'COMP_DATE': '',	
					'STATUS': '1'
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
				console.log(this.dataInfo);
				var _this = this;
				var url = this.basic_url + '/api-apps/app/pmPlan/saveOrUpdate';
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
			var url = this.basic_url + '/api-apps/app/asset';
			this.$axios.get(url, {
				params: {}
			}).then((res) => {
				this.assets = res.data.data;
			}).catch((wrong) => {})
		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>