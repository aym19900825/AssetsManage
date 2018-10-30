<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加部门</div>
				<div class="mask_anniu">
					<span class="mask_span">
						<i class="icon-minimize"></i>
					</span>
					<!--icon-maximization,icon-restore-->
					<span class="mask_span mask_max" @click='toggle'>
						 <!--v-bind:class="{ active: isActive, 'text-danger': hasError }">-->
						 
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						<!--<i v-if="ok2" class="icon-restore"></i>-->
					</span>
					<span class="mask_span" @click='close'>
						<i class="icon-close1"></i>
					</span>
				</div>
			</div>
			<el-form v-model="adddeptForm" :label-position="labelPosition" :rules="rules" ref="adddeptForm" label-width="100px" class="demo-adduserForm">

				<div class="accordion" id="information">
					<div class="mask_tab-block">
						<div class="mask_tab-head clearfix">
							<div class="accordion_title">
								<span class="accordion-toggle">添加部门信息</span>
							</div>
							<div class="col_but" @click="col_but('col_but1')">
								<i class="icon-arrow1-down"></i>
							</div>
						</div>
						<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
							<el-row :gutter="70">
								<el-col :span="24">
									<el-form-item label="所属上级" prop="companyId">
										<el-input v-model="adddeptForm.companyId">
											<el-button slot="append" icon="el-icon-search"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">
								<el-col :span="8">
									<el-form-item label="部门名称" prop="username">
										<el-input v-model="adddeptForm.username"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="单位简称" prop="password">
										<el-input v-model="adddeptForm.password"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="类型">
									    <el-select v-model="formInline.region">
									      <el-option label="部门" value="shanghai"></el-option>
									      <el-option label="公司" value="beijing"></el-option>
									    </el-select>
									  </el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">
								<el-col :span="8">
									<el-form-item label="机构编码" prop="companyId">
										<el-input v-model="adddeptForm.companyId">
											<el-button slot="append" icon="el-icon-search"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="电话">
									    <el-select v-model="formInline.region">
									      <el-option label="电话一" value="shanghai"></el-option>
									      <el-option label="电话二" value="beijing"></el-option>
									    </el-select>
									  </el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="配置状态">
					 				<el-switch v-model="value11" active-color="#13ce66" inactive-color="#ff4949">
									</el-switch>
					 			</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">
								<el-col :span="8">
									<el-form-item label="电话" prop="companyId">
										<el-input v-model="adddeptForm.username" placeholder="请输入"></el-input>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">
								<el-col :span="24">
									<el-form-item label="备注" prop="tips">
										<el-input :rows="3" type="textarea" v-model="adddeptForm.tips" placeholder="请输入"></el-input>

									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
				<el-form-item>
					<el-button @click="resetForm('adddeptForm')">取消</el-button>
					<el-button type="primary" @click="submitForm('adddeptForm')">提交</el-button>
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
				value11:true,
				formInline: {
		          user: '',
		          region: ''
		        },
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				labelPosition: 'top',
				adddeptForm: {
					companyId: '',
					deptId: '',
					password: '',
					birthdate: '',
					sex: '0',
					phone: '',
					enabled: '',
					birthday: '',
					workernumber: '',
					nickname: '',
					idnumber: '',
					entrytime: '',
					address: '',
					tips: '',
					username: ''

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
				this.show = !this.show;
			},
			//点击关闭按钮
			close() {
				this.show = false;
			},
			toggle(e) {
				if(this.isok1 == true) {
					this.maxDialog();
					console.log(111);
				} else {
					console.log(1122);
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
			//保存users/saveOrUpdate
			submitForm() {
				var url = '/api/api-user/depts/saveOrUpdate';
				this.$axios.post(url, {}).then((res) => {
					//resp_code == 0是后台返回的请求成功的信息
					if(res.data.resp_code == 0) {
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						this.requestData();
					}
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});

			}

		}

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>