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
			<el-form :model="user" :label-position="labelPosition" :rules="rules" ref="user" label-width="100px" class="demo-user">

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
										<el-input v-model="user.companyName" :disabled="edit">
											<el-button slot="append" icon="el-icon-search" @click="getCompany"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">
								<el-col :span="24">
									<el-form-item label="所属部门" prop="deptName">
										<el-input v-model="user.deptName" :disabled="edit">
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
										<el-input type="password" v-model="user.password"></el-input>
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
										<el-radio-group v-model="user.sexName">
											<el-radio label="男"></el-radio>
											<el-radio label="女"></el-radio>
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
										<el-select v-model="user.roleId" multiple @change="changeRole">
											<el-option v-for="data in selectData" :key="data.name" :value="data.id" :label="data.name"></el-option>
											
										</el-select>
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
					<el-button @click='close'>取消</el-button>
					<el-button type="primary" @click='submitForm()'>提交</el-button>
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
		props: {
			user: {
				type: Object,
				default: function(){
					return {
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
						companyName:'',
						roleId: '',//角色
//						roles: [],//角色
						id: '',
					}
				}
			},
			page: Object ,
		},
		
		data() {
			var validatePass1 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			var validatePass3 = (rule, value, callback) => {
				console.log(value)
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			var validatePass4 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			var validatePass5 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			var validatePass6 = (rule, value, callback) => {
                var regidnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
                if (!regidnumber.test(this.user.idnumber)) {
                   callback(new Error('身份证号填写有误'));
                } else {
                    callback();
                }
            };
            var validatePass7 = (rule, value, callback) => {
                var regphone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/; 
                 if(!regphone.test(this.user.phone)){
                   callback(new Error('手机格式不正确'));
                }else{
                    callback();
                }
            };
            var validatePass8 = (rule, value, callback) => {
                  var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                 if(!regEmail.test(this.user.email)){
                   callback(new Error('邮箱格式不正确'));
                }else{
                    callback();
                }
            };
			return {
				editSearch: '',
				edit: true, //禁填
				'男': true,
				'女': false,
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
//				user:{
//					companyId: '',
//					deptId: '',
//					password: '',
//					sex: '',
//					email: '',
//					phone: '',
//					enabled: 1,
//					birthday: '',
//					worknumber: '',
//					nickname: '',
//					idnumber: '',
//					entrytime: '',
//					address: '',
//					tips: '',
//					username: '',
//					companyName:'',
//					roleId: '',//角色
//					roles: [],//角色
//					id: '',
//				},
				rules: {
					companyName: [{
						required: true,
						//						trigger: 'change',
						validator: validatePass1,
					}],
					deptName: [{
						required: true,
						//						trigger: 'change',
						validator: validatePass2,
					}],
					roleId: [{
						
						required: true,
						trigger: 'blur',
						validator: validatePass3,
					}],
					username: [{
						required: true,
						trigger: 'blur',
						validator: validatePass4,
					}],
					password: [{
						required: true,
						trigger: 'blur',
						validator: validatePass5,
					}],
					idnumber: [{
//						required: true,
						trigger: 'blur',
						validator: validatePass6,
					}],
					phone: [{
//						required: true,
						trigger: 'blur',
						validator: validatePass7,
					}],
					email: [{
//						required: true,
						trigger: 'blur',
						validator: validatePass8,
					}]
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				selectData: [],//
//				aaaData:[]
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
			detail() {
				this.show = true;
				console.log(this.user);
				var url = '/api/api-user/users/' + userid;
				this.$axios.get(url, {}).then((res) => {
					this.user = res.data;
					this.show = true;
					console.log(this.user);
					console.log(this.user.roles);
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
				this.$refs.user.validate((valid) => {
					if(valid) {
						var user = this.user;
						user.sex = user.sexName == '男' ? 1 : 0;
						user.roleId = user.roleId.join(',');
// 						user.roleId = JSON.stringify(user.roleId);	
						var url = '/api/api-user/users/saveOrUpdate';
								 console.log(this.user);
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
					} else {
						return false;
					}
				})
			},
			//所属组织
			getCompany() {
				this.editSearch = 'company';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = 1;
				var url = '/api/api-user/depts/type';
				this.$axios.get(url, {
					params: {
						page: page,
						limit: limit,
						type: type
					},
				}).then((res) => {
					console.log(res.data.data);
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});

			},

			//所属部门
			getDept() {
				this.editSearch = 'dept';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = 2;
				var url = '/api/api-user/depts/type';
				this.$axios.get(url, {
					params: {
						page: page,
						limit: limit,
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});
			},
			//角色
			getRole() {
				this.editSearch = 'role';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var url = '/api/api-user/roles';
				this.$axios.get(url, {
					params: {
						page: page,
						limit: limit,
					},
				}).then((res) => {
					this.selectData = res.data.data;
					console.log(res.data.data);
					console.log(this.selectData);
//					for(var item in this.selectData){
//						//建立空的对象，建立自定义的属性，将其push在options中
//						var select = {};
//						select.value = this.selectData[item].name;
//						this.options.push(select);
//						console.log(select);
//					}
					}).catch(error =>{
				    console.log('请求失败');
				})
			},
		  	changeRole(event){
		  		console.log(event);
		  		console.log(111);
		  	 	this.user.roleId=[]
		  	 	for (var i=0;i<event.length;i++){	
		  	 		this.user.roleId.push(event[i])
		  	 	}
		  	 	
		  	 	console.log(this.user.roleId);
//			  	for (var i=0;i<this.selectData.length;i++){	
//			  		
//						console.log(this.selectData[i].name);
//					if(this.selectData[i].name==parseInt(val)){
//						console.log(222);
//						console.log(this.selectData[i].id);
//	                	this.user.roleId.push(this.selectData[i].id);
//	                	console.log(this.user.roleId);
//	              	}							
//				}


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
		mounted() {
			this.getRole();
		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>