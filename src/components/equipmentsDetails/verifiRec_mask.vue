<template>
<!-- 期间核查记录 -->
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加期间核查记录</div>
					<div class="mask_title" v-show="modifytitle">修改期间核查记录</div>
					<div class="mask_title" v-show="viewtitle">查看期间核查记录</div>
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
										<el-input v-model="dataInfo.C_RECORDNUM" :disabled="true">
											<template slot="prepend">核查记录编号</template>
										</el-input>
									</el-col>
								</el-row>
								<el-form-item v-for="item in basicInfo" :label="item.label" :key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" label-width="160px">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'" style="width: 220px;" :disabled="noedit"></el-input>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'" :disabled="noedit"></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" :disabled="noedit">
									</el-date-picker>
									<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'" :disabled="noedit">
										<el-radio :label="it.label" v-for="it in item.opts" :key="it.id"></el-radio>
									</el-radio-group>
									<el-select v-model="dataInfo[item.prop]" filterable placeholder="请选择" v-if="item.type == 'select'" @change="selChange" :disabled="noedit">
										<el-option v-for="item in assets"
										:key="item.ID"
										:label="item.DESCRIPTION"
										:value="item.DESCRIPTION">
										</el-option>
									</el-select>
								</el-form-item>
							</el-collapse-item>
							<!-- 文档管理 -->
							<el-collapse-item title="文档" name="2">
								<doc-table ref="docTable" :docParm = "docParm"></doc-table>
							</el-collapse-item>
							<!-- 其他信息 -->
							<el-collapse-item title="其他" name="3" v-show="!addtitle">
								<el-form-item label-width="120px" v-for="item in otherInfo" :label="item.label" :key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" v-if="item.prop=='DEPARTMENT'" v-show="dept">
                                    <el-input v-model="dataInfo[item.prop]" :type="item.type" disabled v-if="item.prop=='DEPARTMENT'"></el-input>
                                </el-form-item>	
                                <el-form-item label-width="120px" v-for="item in otherInfo" :label="item.label" :key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" v-show="views">
                                    <el-input v-if="item.type=='input'" v-model="dataInfo[item.prop]" :type="item.type" disabled></el-input>
                                    <el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" disabled style="width:100%"></el-date-picker>
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
	import docTable from '../common/doc.vue'
	export default {
		name: 'masks',
		props: ['detailData'],
		components: {docTable},
		data() {
			var checkNum = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入'));
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
				rules: {
					DESCRIPTION: [
						{ required: true, message: '请输入记录描述', trigger: 'blur' },
					],
					A_NAME: [
						{ required: true, message: '请输入设备名称', trigger: 'blur' },
					],
					MODEL: [
						{ required: true, message: '请输入规格型号', trigger: 'blur' },
					],
					ASSETNUM: [
						{ required: true, message: '请输入设备编号', trigger: 'blur' },
					],
					C_DATE: [
						{ required: true, message: '请输入核查日期', trigger: 'blur' },
					],
					WD: [
						{ validator: checkNum, trigger: 'blur' }
					],
					SD: [
						{ validator: checkNum, trigger: 'blur' }
					],
					C_SITE: [
						{ required: true, message: '请输入检查地点', trigger: 'blur' },
					],
					C_SIC_BASISTE: [
						{ required: true, message: '请输入检查依据', trigger: 'blur' },
					],
					C_KPI: [
						{ required: true, message: '请输入指标要求', trigger: 'blur' },
					],
					C_RECORD: [
						{ required: true, message: '请输入检查记录', trigger: 'blur' },
					],
					C_MEMO: [
						{ required: true, message: '请输入检查结论', trigger: 'blur' },
					],
					C_PERSON: [
						{ required: true, message: '请输入核查人', trigger: 'blur' },
					],
					APPR_PERSON: [
						{ required: true, message: '请输入审核人', trigger: 'blur' },
					],
					COMP_PERSON: [
						{ required: true, message: '请输入批准人', trigger: 'blur' },
					],
					APPR_DATE: [
						{ required: true, message: '请输入批准日期', trigger: 'blur' },
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
				basicInfo: [
					{
						label: '设备名称',
						prop: 'A_NAME',
						width: '30%',
						type: 'select',
						displayType: 'inline-block'
					},
					{
						label: '规格型号',
						prop: 'MODEL',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '设备编号',
						prop: 'ASSETNUM',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '核查日期',
						prop: 'C_DATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
					{
						label: '温度',
						prop: 'WD',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '湿度',
						prop: 'SD',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '指标要求',
						prop: 'C_KPI',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
					{
						label: '检查记录',
						prop: 'C_RECORD',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
					{
						label: '检查结论',
						prop: 'C_MEMO',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
					{
						label: '记录描述',
						prop: 'DESCRIPTION',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
					{
						label: '核查人',
						prop: 'C_PERSON',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '审核人',
						prop: 'APPR_PERSON',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '批准人',
						prop: 'COMP_PERSON',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '批准日期',
						prop: 'APPR_DATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
					{
						label: '检查地点',
						prop: 'C_SITE',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '判定依据',
						prop: 'C_BASIS',
						width: '30%',
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
					'ID': '',
					'C_RECORDNUM': '',
					'DESCRIPTION': '',
					'ASSETNUM': '',
					'A_NAME': '',
					'MODEL': '',
					'C_DATE': '',
					'WD': '',
					'SD': '',
					'C_SITE': '',  //必填但是页面没有
					'C_BASIS': '',  //必填但是页面没有
					'C_KPI': '',
					'C_RECORD': '',
					'C_MEMO': '',
					'C_PERSON': '',
					'APPR_PERSON': '',
					'COMP_PERSON': '',
					'APPR_DATE': '',
					'ENTERBY': '',
					'ENTERDATE': '',
					'DEPARTMENT': '',
					'STATUS': '1'
				},
				assets: [],
				docParm: {
					'model': 'new',
					'appname': '',
					'recordid': 1,
					'userid': 1,
					'username': '',
					'deptid': 1,
					'deptfullname': '',
					'appname': '',
					'appid': 1
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
				falg:false
			};
		},
		methods: {
			getUser(){
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url,{}).then((res) => {
					if(opt == 'new'){
				        this.dataInfo.ENTERBY = res.data.username;
						this.dataInfo.ENTERDATE = this.getToday();
					}
					this.docParm.userid = res.data.id;
					this.docParm.username = res.data.username;
					this.docParm.deptid = res.data.deptId;
					this.docParm.deptfullname = res.data.deptName;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			getModiuser(){
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url,{}).then((res) => {
				        this.dataInfo.CHANGEBY = res.data.username;
				        this.dataInfo.CHANGEDATE = this.getToday();
						this.dataInfo.DEPARTMENT = res.data.deptName;	
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
				var rate = this.$moment(str).format("yyyy-MM-dd")
				return rate;
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
				this.docParm = {
					'model': 'new',
					'appname': '',
					'recordid': 1
				};
			},
			// 这里是修改
			detail() {
				this.dataInfo = this.detailData;
				this.getModiuser();
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
				this.getUser();
				this.docParm = {
					'model': 'edit',
					'appname': 'CHECK_RECORD',
					'recordid': this.detailData.ID
				};
				this.$refs.docTable.getData();
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
				this.noviews = false;//按钮
				this.dataInfo = data;
				this.show = true;				
			},
			//点击关闭按钮
			close() {
				this.resetForm();
				this.$emit('request');
				this.show = false;
			},
			resetForm(){
				this.dataInfo = {
					'ID': '',
					'C_RECORDNUM': '',
					'DESCRIPTION': '',
					'ASSETNUM': '',
					'A_NAME': '',
					'MODEL': '',
					'C_DATE': '',
					'WD': '',
					'SD': '',
					'C_SITE': '',  //必填但是页面没有
					'C_BASIS': '',  //必填但是页面没有
					'C_KPI': '',
					'C_RECORD': '',
					'C_MEMO': '',
					'C_PERSON': '',
					'APPR_PERSON': '',
					'COMP_PERSON': '',
					'APPR_DATE': '',
					'ENTERBY': '',
					'ENTERDATE': '',
					'DEPARTMENT': '',
					'STATUS': '1'
				}
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

			save(dataInfo) {
				var _this = this;
				var url = this.basic_url + '/api-apps/app/checkRecord/saveOrUpdate';
				this.$refs['dataInfo'].validate((valid) => {
					if (valid) {
						console.log(_this.dataInfo);
						this.$axios.post(url, _this.dataInfo).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success',
								});
								this.$emit('request');
								this.resetForm();
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
						this.falg = true;
					} else {
						this.show = true;
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
						this.falg = false;
					}
				});
			},
			saveAndUpdate(dataInfo) {
				this.save(dataInfo);
				console.log(this.falg);
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