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
				<el-form status-icon :model="dataInfo" :label-position="labelPosition" :rules="rules" ref="dataInfo" label-width="100px">
					<div class="accordion">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基本信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="3" class="pull-right">
										<el-input v-model="dataInfo.VERSION" :disabled="true">
											<template slot="prepend">版本</template>
										</el-input>
									</el-col>
									<el-col :span="3" class="pull-right">
										<el-input v-model="dataInfo.STATUS" :disabled="true">
											<template slot="prepend">状态</template>
										</el-input>
										<!-- <el-select v-model="dataInfo.STATUS" placeholder="请选择状态">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select> -->
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="检验/检测项目编号" prop="P_NUM">
											<el-input v-model="dataInfo.P_NUM"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="16">
										<el-form-item label="项目名称" prop="P_NAME">
											<el-input v-model="dataInfo.P_NAME"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="文档" prop="DOCLINKS_NUM">
										<el-input v-model="dataInfo.DOCLINKS_NUM" disabled>
											<el-button slot="append" icon="icon-search" @click="getCompany"></el-button>
										</el-input>
									</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="人员资质" prop="QUALIFICATION">
											<el-input v-model="dataInfo.QUALIFICATION"></el-input>
										</el-form-item> 
									</el-col>
									<el-col :span="8">
										<el-form-item label="领域" prop="FIELD">
											<el-input v-model="dataInfo.FIELD"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="子领域" prop="CHILD_FIELD">
											<el-input v-model="dataInfo.CHILD_FIELD"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="录入人机构" prop="DEPT">
											<el-input v-model="dataInfo.DEPT" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入人" prop="ENTERBY">
											<el-input v-model="dataInfo.ENTERBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE">
											<el-input v-model="dataInfo.ENTERDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item v-if="modify" label="修改人" prop="CHANGEBY">
											<el-input v-model="dataInfo.CHANGEBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item  v-if="modify" label="修改时间" prop="CHANGEDATE">
											<el-input v-model="dataInfo.CHANGEDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-button @click='close' class="btn btn-default btn-large">取消</el-button>
						<el-button type="primary" class="btn btn-primarys btn-large" @click="submitForm('dataInfo')">提交</el-button>
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
	export default {
		name: 'masks',
		props: {
			dataInfo: {
				type: Object,
				default: function(){
					return {
					P_NUM: 'PR10001',
					P_NAME: '',
					STATUS: '活动',
					VERSION: '1',
					QUALIFICATION: '',
					FIELD: '',
					CHILD_FIELD: '',
					DOCLINKS_NUM: '',
					DEPT: '',
					ENTERBY:'',
					ENTERDATE: '',
					CHANGEBY: '',
					CHANGEDATE:'',
					}
				}
			},
			page: Object ,
		},
		data() {
			var validateName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请英文填写表名'));
				} else {
					callback();
				}
			};
			var validateDecri = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写描述'));
				} else {
					callback();
				}
			};
			return {
				editSearch: '',
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				selUser: [],
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
				rules: {
					name: [{
						required: true,
						trigger: 'blur',
						validator: validateName,
					}],
					description: [{
						required: true,
						trigger: 'blur',
						validator: validateDecri,
					}],
					leadname: [{
						required: true,
						trigger: 'blur',
						validator: validateDecri,
					}],
				},
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
				var url = '/api/api-user/depts/type';//文件接口不对
				this.$axios.get(url, {
				}).then((res) => {
					console.log(res.data.data);
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
					this.dataInfo.DOCLINKSId = this.checkedNodes[0].id;
					this.dataInfo.DOCLINKS_NUM = this.checkedNodes[0].simplename;
				}
			},
			handleClose(done) {//确认框关闭
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleChange(val) { //手风琴开关效果调用
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},

			delfield(item) {
				var index = this.dataInfo.attributes.indexOf(item);
				if(index !== -1) {
					//this.attributes.splice(index, 1)
					this.dataInfo.attributes.splice(index, 1);
				}
			},
			importdia() {
				this.dialogVisible = true;
			},
			//点击按钮显示弹窗
			visible() {
				this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
					this.dataInfo.DEPT=res.data.deptName;
					this.dataInfo.ENTERBY=res.data.nickname;
					var date=new Date();
					this.dataInfo.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
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
				this.modify=false;
				this.show = true;
			},
			// 这里是修改
			detail() {
				this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
						this.dataInfo.CHANGEBY=res.data.nickname;
						var date=new Date();
						this.dataInfo.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
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
				this.modify=true;
				this.show = true;
				
			},
			
			//点击关闭按钮
			close() {
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
			submitForm(dataInfo) {
				this.$refs[dataInfo].validate((valid) => {
					this.dataInfo.CHANGEDATE =  this.$moment(this.dataInfo.CHANGEDATE).format("YYYY-MM-DD HH:mm:ss");
					this.dataInfo.ENTERDATE = this.$moment(this.dataInfo.ENTERDATE).format("YYYY-MM-DD HH:mm:ss");
					//		          if (valid) {
					var url = '/api/api-apps/app/inspectionPro/saveOrUpdate';
					this.$axios.post(url, this.dataInfo).then((res) => {
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
					//			          } else {
					//			            return false;
					//			          }
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