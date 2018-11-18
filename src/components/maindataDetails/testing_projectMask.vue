<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加数据库表</div>
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
				<el-form :model="dataInfo" :label-position="labelPosition" :rules="rules" ref="dataInfo" label-width="100px" class="demo-user">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基本信息" name="1">
								<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="检验检测项目编号" prop="P_NUM">
												<el-input v-model="dataInfo.P_NUM" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="项目名称" prop="P_NAME">
												<el-input v-model="dataInfo.P_NAME"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="状态" prop="STATUS">
												<el-input v-model="dataInfo.STATUS" :disabled="true"></el-input>
											</el-form-item>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
										<el-form-item label="版本" prop="VERSION">
											<el-input v-model="dataInfo.VERSION" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
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
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
										<el-form-item label="子领域" prop="CHILD_FIELD">
											<el-input v-model="dataInfo.CHILD_FIELD"></el-input>
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="8">
											<el-form-item label="文档" prop="DOCLINKS_NUM">
												<el-input v-model="dataInfo.DOCLINKS_NUM"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="机构" prop="DEPT">
												<el-input v-model="dataInfo.DEPT" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
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
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBY">
												<el-input v-model="dataInfo.CHANGEBY" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="修改时间" prop="CHANGEDATE">
												<el-input v-model="dataInfo.CHANGEDATE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click="submitForm('dataInfo')">提交</el-button>
					</div>
				</el-form>
			</div>
		</div>
		
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
					P_NUM: '',
					P_NAME: '',
					STATUS: '',
					VERSION: '',
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
				selUser: [],
				edit: true, //禁填
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1', '2'], //手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框

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
			};
		},
		methods: {
			resetNew() {
				this.dataInfo = { //数据库列表
					P_NUM: '',
					P_NAME: '',
					STATUS: '',
					VERSION: '',
					QUALIFICATION: '',
					FIELD: '',
					CHILD_FIELD: '',
					DOCLINKS_NUM: '',
					DEPT: '',
					ENTERBY:'',
					ENTERDATE: '',
					CHANGEBY: '',
					CHANGEDATE:'',
						
					},

					this.$refs["dataInfo"].resetFields();
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
			col_but(col_but) {
				//alert(col_but)
				if(col_but == 'col_but1') {
					this.col_but1 = !this.col_but1;
					this.down = !this.down,
						this.up = !this.up
				}
				if(col_but == 'col_but2') {
					this.col_but2 = !this.col_but2;
					this.down = !this.down,
						this.up = !this.up
				}
			},
			importdia() {
				this.dialogVisible = true;
			},
			//点击按钮显示弹窗
			visible() {
				this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
					console.log(res);
					this.dataInfo.ENTERBY=res.data.nickname;
					this.dataInfo.ENTERDATE=res.data.createTime;
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.show = true;
			},
			// 这里是修改
			detail() {
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
					//		          if (valid) {
						console.log(this.dataInfo);
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