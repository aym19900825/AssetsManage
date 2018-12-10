<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加检验/检测项目</div>
				<div class="mask_title" v-show="modifytitle">修改检验/检测项目</div>
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
				<el-form status-icon :model="testing_projectForm" :label-position="labelPosition" :rules="rules" ref="testing_projectForm" label-width="100px">
					<div class="accordion">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="基本信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="3" class="pull-right">
										<el-input placeholder="自动生成" v-model="testing_projectForm.VERSION" :disabled="true">
											<template slot="prepend">版本</template>
										</el-input>
									</el-col>
									<el-col :span="5" class="pull-right" v-if="modify">
										<el-input v-model="testing_projectForm.STATUS=='1'?'活动':'不活动'" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
									<el-col :span="5" class="pull-right" v-else>
										<el-input v-model="testing_projectForm.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
									<el-col :span="7" class="pull-right">
										<el-input placeholder="自动生成" v-model="testing_projectForm.P_NUM" :disabled="true">
											<template slot="prepend">检验/检测项目编号</template>
										</el-input>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="16">
										<el-form-item label="项目名称" prop="P_NAME">
											<el-input v-model="testing_projectForm.P_NAME"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="单价(元)" prop="QUANTITY">
											<el-input-number type="number" :precision="2" v-model.number="testing_projectForm.QUANTITY" :step="5" :max="100000" style="width: 100%;"></el-input-number>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="文档" prop="DOCLINKS_NUM">
											<el-input v-model="testing_projectForm.DOCLINKS_NUM">
												<el-button slot="append" icon="icon-search" @click="getCompany"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="人员资质" prop="QUALIFICATION">
											<el-input v-model="testing_projectForm.QUALIFICATION"></el-input>
										</el-form-item> 
									</el-col>
									<el-col :span="8">
										<el-form-item label="领域" prop="FIELD">
											<el-input v-model="testing_projectForm.FIELD"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="子领域" prop="CHILD_FIELD">
											<el-input v-model="testing_projectForm.CHILD_FIELD"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30" v-if="modify">
									<el-col :span="8">
										<el-form-item label="录入人机构" prop="DEPARTMENT">
											<el-input v-model="testing_projectForm.DEPARTMENT" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入人" prop="ENTERBY">
											<el-input v-model="testing_projectForm.ENTERBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE">
											<el-input v-model="testing_projectForm.ENTERDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30" v-if="modify">
									<el-col :span="8">
										<el-form-item label="修改人" prop="CHANGEBY">
											<el-input v-model="testing_projectForm.CHANGEBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改时间" prop="CHANGEDATE">
											<el-input v-model="testing_projectForm.CHANGEDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<button class="btn btn-default btn-large" @click="cancelForm">取消</button>
						<button v-if="modify" type="primary" class="btn btn-primarys btn-large" @click="submitForm('testing_projectForm')">修订</button>
						<button v-else="modify" type="primary" class="btn btn-primarys btn-large" @click="submitForm('testing_projectForm')">提交</button>
					</div>
				</el-form>
			</div>
		</div>
		<!--弹出框内容显示 Begin-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps">
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirms();" >确 定</el-button>
		    </span>
		</el-dialog>
		<!--弹出框内容显示 End-->
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		props: {
			page: {
				type: Object,
			},
			testing_projectForm: {
				type: Object,
				default: function(){
					return {
						VERSION: '',
						STATUS: '',
						P_NUM: '',
						P_NAME: '',
						QUANTITY: '',
						QUALIFICATION: '',
						FIELD: '',
						CHILD_FIELD: '',
						DOCLINKS_NUM: '',
						DEPARTMENT: '',
						ENTERBY:'',
						ENTERDATE: '',
						CHANGEBY: '',
						CHANGEDATE:'',
					}
				}
			},
		},
		data() {
			var validateP_NUM = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写检测项目编号'));
				} else {
					callback();
				}
			};
			var validateP_NAME = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写项目名称'));
				} else {
					callback();
				}
			};
			var validateQUANTITY = (rule, value, callback) => {
				if(value === undefined) {
					callback(new Error('单价不能为空'));
				}else if (value === 0.00) {
					callback(new Error('请填写单价'));
				}else{
					callback();
				}
			};
			var validateQUALIFICATION = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写人员资质'));
				} else {
					callback();
				}
			};
			var validateDOCLINKS_NUM = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请选择文档'));
				} else {
					callback();
				}
			};
			return {
				basic_url: Config.dev_url,
				editSearch: '',
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1'], //手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				addtitle: true,
				modifytitle: false,
				modify:true,
				statusshow1:true,
				statusshow2:true,
				rules: {//需要验证的字段
					P_NUM: [{
						required: true,
						trigger: 'blur',
						validator: validateP_NUM,
					}],
					P_NAME: [{
						required: true,
						trigger: 'blur',
						validator: validateP_NAME,
					}],
					QUANTITY: [{
						required: true,
						trigger: 'change',
						validator: validateQUANTITY,
					}],
					QUALIFICATION: [{
						required: true,
						trigger: 'blur',
						validator: validateQUALIFICATION,
					}],
					DOCLINKS_NUM: [{
						required: true,
						trigger: 'blur',
						validator: validateDOCLINKS_NUM,
					}],
				},
				//testing_projectForm:{},//检验/检测项目数据组
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
			};
		},
		methods: {
			getCompany() {//文档查询接口，暂无通，待修改
				this.editSearch = 'DOCLINKS';
				var url = this.basic_url + '/api-user/depts/type';//文件接口不对
				this.$axios.get(url, {
				}).then((res) => {
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});
			},
			getCheckedNodes() {//获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},
			confirms() {//弹出框确定按钮调用数据
				this.getCheckedNodes();
				this.dialogVisible = false;
				if(this.editSearch == 'DOCLINKS') {
					this.testing_projectForm.DOCLINKSId = this.checkedNodes[0].id;
					this.testing_projectForm.DOCLINKS_NUM = this.checkedNodes[0].simplename;
				}
			},
			handleClose(done) {//确认框关闭
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},

			childMethods() {//添加内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.testing_projectForm.DEPARTMENT=res.data.companyName;
					this.testing_projectForm.ENTERBY=res.data.nickname;
					var date=new Date();
					this.testing_projectForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.statusshow1 = true;
				this.statusshow2 = false;
				this.addtitle = true;
				this.modifytitle = false;
				this.modify = false;
				this.show = true;
			},
			
			detail() {//修改内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.testing_projectForm.CHANGEBY=res.data.nickname;
					var date=new Date();
					this.testing_projectForm.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.statusshow1 = false;//
				this.statusshow2 = true;
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.show = true;
				
			},
			
			//点击关闭按钮
			close() {
				this.show = false;
			},
			//点击取消按钮
			cancelForm() {
				this.show = false;
				this.reset();
			},
			reset() {
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
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.testing_projectForm.STATUS=((this.testing_projectForm.STATUS=="1"||this.testing_projectForm.STATUS=='活动') ? '1' : '0');
						var url = this.basic_url + '/api-apps/app/inspectionPro/saveOrUpdate';
						this.testing_projectForm.VERSION = this.testing_projectForm.VERSION + 1;//修改时版本+1
						this.$axios.post(url, this.testing_projectForm).then((res) => {
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
		}
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>