<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加用户</div>
				<div class="mask_anniu">
					<!--<span class="mask_span">
						<i class="icon-minimize"></i>
					</span>-->
					<!--icon-maximization,icon-restore-->
					<span class="mask_span mask_max" @click='toggle'>
						 
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
					</span>
					<span class="mask_span" @click='close'>
						<i class="icon-close1"></i>
					</span>
				</div>
			</div>
			<el-form v-model="user" :label-position="labelPosition" :rules="rules" ref="user" label-width="100px" class="demo-user">

				<div class="accordion" id="information">
					<div class="mask_tab-block">
						<div class="mask_tab-head clearfix">
							<div class="accordion_title">
								<span class="accordion-toggle">基本信息</span>
							</div>
							<div class="col_but" @click="col_but('col_but1')">
								<i class="icon-arrow1-down" v-show="down"></i><i class="icon-arrow1-up" v-show="up"></i>
							</div>
						</div>
						<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
							<el-row :gutter="70">
								<el-col :span="24">
									<el-form-item label="所属组织" prop="companyName">
										<el-input v-show="down" v-model="user.companyName">
											<el-button slot="append" icon="el-icon-search" @click="getCompany"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">
								<el-col :span="24">
									<el-form-item label="所属部门" prop="deptName">
										<el-input v-model="user.deptName">
											<el-button slot="append" icon="el-icon-search" @click="getDept"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="70">
								<el-col :span="12">
									<el-form-item label="登录名称" prop="username">
										<el-input v-model="user.username"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="登录口令" prop="password">
										<el-input v-model="user.password"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>

				<div class="accordion" id="information">
					<div class="mask_tab-block">
						<div class="mask_tab-head clearfix">
							<div class="accordion_title">
								<span class="accordion-toggle">用户基本资料</span>
							</div>
							<div class="col_but" @click="col_but('col_but2')">
								<i class="icon-arrow1-down"></i>
							</div>
						</div>
						<div class="accordion-body tab-content" v-show="col_but2" id="tab-content2">

							<!-- 第一行 -->
							<el-row :gutter="70">
								<el-col :span="8">
									<el-form-item label="姓名" prop="nickname">
										<el-input v-model="user.nickname"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="出生日期" prop="birthday">
										<el-date-picker v-model="user.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="性別" prop="sex">
										<el-radio-group v-model="user.sex">
											<el-radio label="0"></el-radio>
											<el-radio label="1"></el-radio>
										</el-radio-group>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">

								<el-col :span="8">
									<el-form-item label="身份证号" prop="idnumber">
										<el-input v-model="user.idnumber"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="入职时间" prop="entrytime">
										<el-date-picker v-model="user.entrytime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="角色" prop="roleId">
										<el-input v-model="user.roleId"></el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="70">
								<el-col :span="8">
									<el-form-item label="工号" prop="worknumber">
										<el-input v-model="user.worknumber"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="手机号" prop="phone">
										<el-input v-model="user.phone"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="电子邮箱" prop="email">
										<el-input v-model="user.email"></el-input>
									</el-form-item>
								</el-col>

							</el-row>
							<el-row :gutter="70">
								<el-col :span="16">
									<el-form-item label="地址" prop="address">
										<el-input v-model="user.address"></el-input>
									</el-form-item>
								</el-col>

							</el-row>

							<el-row :gutter="70">
								<el-col :span="24">
									<el-form-item label="备注" prop="tips">
										<el-input type="textarea" v-model="user.tips"></el-input>

									</el-form-item>
								</el-col>
							</el-row>

						</div>
					</div>
				</div>

				<div class="el-dialog__footer">
					<!-- <span slot="footer" class="dialog-footer">-->
					<el-button @click='close'>取消</el-button>
					<el-button type="primary" @click='submitForm()'>提交</el-button>
					<!-- </span>-->
				</div>
			</el-form>

			<!--底部-->
			<!--<div class="content-footer">
				<button class="btn btn-default btn-large">取消</button>
				<button class="btn btn-primarys btn-large">提交</button>
			</div>-->

		</div>

		//弹出
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps">
			</el-tree>

			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="queding();" >确 定</el-button>
		    </span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'masks',
		data() {
			return {
				editSearch: '',
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				useritem: [],
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				user: {
					companyId: '',
					deptId: '',
					password: '',
					sex: '',
					email: '',
					phone: '',
					enabled: 1,
					birthday: '',
					worknumber: '',
					nickname: '',
					idnumber: '',
					entrytime: '',
					address: '',
					tips: '',
					username: '',
					roleId: '',
					id: ''
				},
				rules: {
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},

				depts: [],
				companys: []
			};
		},
		methods: {
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
			//点击按钮显示弹窗
			visible() {
				this.show = true;
			},
			// 这里是修改
			detail(userid) {
				var url = '/api/api-user/users/' + userid;
				this.$axios.get(url, {}).then((res) => {
					this.user = res.data;
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
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
			getCheckedNodes() {
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},

			//保存users/saveOrUpdate
			submitForm() {
				var url = '/api/api-user/users/saveOrUpdate';
				console.log( this.user);
				this.$axios.post(url, this.user).then((res) => {
					if(res.data.resp_code == 0) {
						this.$message({
							message: '保存成功',
							type: 'success',
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
			},
			//所属组织
			getCompany() {
				this.editSearch = 'company';
				var data = {
					params: {
						page: 1,
						limit: 10,
					}
				}
				let that = this;
				var url = '/api/api-user/depts/company';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});

			},

			//所属部门
			getDept() {
				this.editSearch = 'dept';
				var data = {
					params: {
						page: 1,
						limit: 10,
					}
				}
				let that = this;
				var url = '/api/api-user/depts/dept';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});
			},

			queding() {
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.user.companyId = this.checkedNodes[0].id;
					this.user.companyName = this.checkedNodes[0].simplename;
				} else {
					this.user.deptId = this.checkedNodes[0].id;
					this.user.deptName = this.checkedNodes[0].simplename;
				}

			},

			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}

		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>