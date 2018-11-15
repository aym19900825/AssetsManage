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
			<div class="mask_content">
				<el-form status-icon :model="user" :label-position="labelPosition" :rules="rules" ref="user" label-width="100px" class="demo-user">
					<div class="accordion">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基础信息" name="1">
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
										<el-form-item label="所属机构" prop="deptName">
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
							</el-collapse-item>

							<el-collapse-item title="用户基本资料" name="2">
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
										<el-form-item label="角色">
											<el-select v-model="user.roleId" multiple>
												<el-option v-for="data in selectData" :key="data.id" :value="data.id" :label="data.name"></el-option>
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
							</el-collapse-item>
						</el-collapse>
					</div>

					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click='submitForm()'>提交</el-button>
					</div>
				</el-form>
			</div>
			<!--底部-->
		</div>

		//弹出
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @node-click="handleNodeClick"  @check-change="handleCheckChange">
			</el-tree>

			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="dailogconfirm();" >确 定</el-button>
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
						roleId: [],
						roles: [],//角色
						id: '',
					}
				}
			},
			page: Object ,
		},
//		props: ['user','page'],
		
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
//			var validatePass6 = (rule, value, callback) => {
//              var regidnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
//              if (!regidnumber.test(this.user.idnumber)) {
//                 callback(new Error('身份证号填写有误'));
//              } else {
//                  callback();
//              }
//          };
            var validatePass6 = (rule, value, callback) => {//验证身份证号
				if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
  				    callback(new Error('身份证号码不符合规范'))
  				} else {
  				    callback()
  				}
		    };
            var validatePass7 = (rule, value, callback) => {
               if (value === '') {
		          return callback(new Error('手机号不能为空'));
		        } else {
		          		if (value !== '') {
		            		var reg=/^1[3456789]\d{9}$/;
				            if(!reg.test(value)){
				            	callback(new Error('请输入有效的手机号码'));
				            }
		            		callback();
		        		}
		        	}
            };
            var validatePass8 = (rule, value, callback) => {
                if (value && (!(/^[0-9]{6}$/).test(value))) {
  				    callback(new Error('邮政编码不符合规范'))
  				} else {
  				    callback()
  				}
            };
			return {
				editSearch: '',
				edit: true, //禁填
				'男': true,
				'女': false,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				useritem: [],
				activeNames: ['1', '2'], //手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框

				rules: {
					companyName: [{
						required: true,//必填标题加红*
						//trigger: 'change',
						validator: validatePass1,
					}],
					deptName: [{
						required: true,//必填标题加红*
						//trigger: 'change',
						validator: validatePass2,
					}],
					roleId: [{
						required: true,
						trigger: 'blur',//触发事件，blur是鼠标移除是触发，change是值变动时触发。
						validator: validatePass3,
					}],
					username: [{
						required: true,
						trigger: 'blur',//触发事件，blur是鼠标移除是触发，change是值变动时触发。
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
						required: true,
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
				getCheckboxData:{},
//				aaaData:[]
			};
		},
		methods: {
			handleChange(val) { //手风琴开关效果调用
			},
			//
			handleCheckChange(data, checked, indeterminate) {
		        console.log(data, checked, indeterminate);
		        this.getCheckboxData=data;
		    },
		    //
		   	handleNodeClick(data) {//获取勾选树菜单节点
             	console.log(data);
            },
			
			
			//form表单内容清空
			resetNew(){
                this.user = {
					companyName:'',
					deptName:'',
					username:'',
					password:'',
					nickname:'',
					birthday:'',
					sexName:'',
					idnumber:'',
					entrytime:'',
					roleId:[],
					roles: [],
					worknumber:'',
					phone:'',
					email:'',
					address:'',
					tips:''
				}
                this.$refs["user"].resetFields();
            },
			//点击按钮显示弹窗
			visible() {
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
			toggle(e) {//大弹出框大小切换
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			maxDialog(e) {//定义大弹出框一个默认大小
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);
				$(".mask_div").css("margin", "0%");
				$(".mask_div").css("top", "60px");
			},
			
			rebackDialog() {//大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("margin", "7% 10%");
				$(".mask_div").css("top", "0");
			},
			getCheckedNodes() {//获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},

			//保存users/saveOrUpdate
			submitForm() {
				var _this = this;
				this.$refs.user.validate((valid) => {
					if(valid) {
						var user = this.user;
						user.sex = user.sexName == '男' ? 1 : 0;
						if(user.roleId.length>0){
							var arr = [];
							user.roleId.forEach(function(item){
								var roles = _this.selectData;
								for(var j = 0; j < roles.length; j++){
									if(roles[j].id == item){
										arr.push(roles[j]);
									}
								}
							});
							user.roleId = user.roleId.join(',');
							user.roles = arr;
						}else{
							user.roleId = '';
							user.roles = [];
						}
						console.log(this.user);
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
				var url = '/api/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data;
					this.dialogVisible = true;
				});

			},

			//所属机构
			getDept() {
				this.editSearch = 'dept';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = 2;
				var url = '/api/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data;
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
					}).catch(error =>{
				    console.log('请求失败');
				})
			},
			dailogconfirm() {//小弹出框确认按钮事件
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.user.companyId = this.getCheckboxData.id;
					this.user.companyName = this.getCheckboxData.simplename;
				} else {
					this.user.deptId = this.getCheckboxData.id;
					this.user.deptName = this.getCheckboxData.simplename;
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