<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加用户</div>
				<div class="mask_anniu">
					<span class="mask_span">
						<i class="icon-minimize"></i>
					</span>
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
								<i class="icon-arrow1-down"></i>
							</div>
						</div>
						<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
							<el-row :gutter="70">
								<el-col :span="24">
									<el-form-item label="所属组织" prop="companyId">
										<el-input v-model="user.companyId">
											<el-button slot="append" icon="el-icon-search"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">
								<el-col :span="24">
									<el-form-item label="所属部门" prop="deptId">
										<el-input v-model="user.deptId">
											<el-button slot="append" icon="el-icon-search"></el-button>
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

				<el-form-item>
					<el-button @click='close'>取消</el-button>
					<el-button type="primary" @click='submitForm()'>提交</el-button>
				</el-form-item>
			</el-form>

			<!--底部-->
			<!--<div class="content-footer">
				<button class="btn btn-default btn-large">取消</button>
				<button class="btn btn-primarys btn-large">提交</button>
			</div>-->

		</div>
	</div>
</template>

<script>
	export default {
		name: 'masks',

		data() {
			return {
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				useritem: [],
				labelPosition: 'top',
				user: {
					companyId: '',
					deptId: '',
					password: '',
					sex: '',
					email: '',
					phone: '',
					enabled: '',
					birthday: '',
					workernumber: '',
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

				}
			};

		},
		methods: {
			col_but(col_but) {
				//alert(col_but)
				if(col_but == 'col_but1') {
					this.col_but1 = !this.col_but1;
				}
				if(col_but == 'col_but2') {
					this.col_but2 = !this.col_but2;
				}
			},
			//点击按钮显示弹窗
			childMethods() {
				this.show = true;
			},
			// 这里是修改
			detail(userid) {
				var url = '/api/api-user/users/' + userid;
				this.$axios.get(url, {}).then((res) => {
					//console.log(res)
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
				} else {}
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
			requestData(index) {
				var data = {
					params: {
						page: 1,
						limit: 10,

					}
				}
				var url = '/api/api-user/users';
				this.$axios.get(url, data).then((res) => {
					this.useritem = res.data.data;
				}).catch((wrong) => {

				})
				this.useritem.forEach((item, index) => {
					var id = item.id;
					this.$axios.get('/users/' + id + '/roles', data).then((res) => {
						this.useritem.role = res.data.roles[0].name;
					}).catch((wrong) => {

					})
				})

			},
			//保存users/saveOrUpdate
			submitForm() {
				var url = '/api/api-user/users/saveOrUpdate';
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

		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>