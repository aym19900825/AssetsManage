<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加部门</div>
				<div class="mask_anniu">
					<span class="mask_span">
						<i class="icon-minimize"></i>
					</span>
					<span class="mask_span mask_max" @click='toggle'>						 
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
					</span>
					<span class="mask_span" @click='close' :before-close="handleClose">
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
									<el-form-item label="所属上级" prop="pid">
										<el-input v-model="adddeptForm.pid">
											<el-button slot="append" icon="el-icon-search"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">
								<el-col :span="8">
									<el-form-item label="部门名称" prop="fullname">
										<el-input v-model="adddeptForm.fullname"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="单位简称" prop="simplename">
										<el-input v-model="adddeptForm.simplename"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="类型" prop="type">
										<el-input v-model="adddeptForm.type"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">
								<el-col :span="8">
									<el-form-item label="机构编码" prop="code">
										<el-input v-model="adddeptForm.code">
											<el-button slot="append" icon="el-icon-search"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="电话" prop="teltphone">
										<el-input v-model="adddeptForm.teltphone"></el-input>
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
					<el-button @click="cancelForm('adddeptForm')">取消</el-button>
					<el-button type="primary" @click="submitForm">提交</el-button>
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
			var validatePass1 = (rule, value, callback) => {
                // var regTele ="^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$"; 
                // console.log(value);
                if (value === '') {
                    callback(new Error('请填写数字'));}
                // else if (!teltphone.test(this.adddeptForm.teltphone)) {
                //      callback(new Error('真实姓名填写有误'));
                // } 
                else {
                    callback();
                }
            };
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
					pid:'',
					fullname:'',
					simplename:'',
					type:'',
					code:'',
					teltphone:'',
					tips:''
				},
				rules:{
		          	teltphone:[
		          		{
		          			required: true,
		                    validator: validatePass1,
		                    trigger: 'blur'
		          		}
		          	]
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
			//修改
			detail(deptid) {
				var url = '/api/api-user/depts/' +deptid;
				this.$axios.get(url, {}).then((res) => {
					//console.log(res)
					this.adddeptForm = res.data;
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
			cancelForm(){
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
			//保存
			submitForm() {
				console.log("1");
				var url = '/api/api-user/depts/saveOrUpdate';
				this.$axios.post(url, this.adddeptForm).then((res) => {
					 console.log("-------------");
					// console.log(res.data);
					//resp_code == 0是后台返回的请求成功的信息
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
			}
		}
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>