<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
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
								<el-col :span="8">
									<el-form-item label="表名" prop="tableName">
										<el-input v-model="user.tableName"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="描述" prop="decri">
										<el-input v-model="user.decri"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="类名" prop="className">
										<el-input v-model="user.className"></el-input>
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
								<span class="accordion-toggle">字段列表</span>
							</div>
							<div style="float: right">
								<el-button type="primary"><i class="icon-upload-cloud"></i>&nbsp;导入</el-button>
								<el-button type="success">+</el-button>
							</div>							
							<div class="col_but " @click="col_but('col_but2')">
								<i class="icon-arrow1-down"></i>
							</div>
						</div>
						<div class="accordion-body tab-content" v-show="col_but2" id="tab-content2">
							<!-- 表格 -->
							<el-table :data="dataList" style="width: 96%;margin: 0 auto;" :default-sort="{prop:'dataList', order: 'descending'}" @selection-change="SelChange">
								<el-table-column label="编号" sortable width="100" prop="tableName">
								</el-table-column>
								<el-table-column label="字段名" sortable width="100" prop="decri">
								</el-table-column>
								<el-table-column label="字段描述" sortable width="180" prop="className" :formatter="className">
								</el-table-column>
								<el-table-column label="字段类型" sortable width="180" prop="className" :formatter="className">
								</el-table-column>
								<el-table-column label="字段长度" sortable width="180" prop="className" :formatter="className">
								</el-table-column>
								<el-table-column label="操作" sortable width="180" prop="className" :formatter="className">
								</el-table-column>
							</el-table>
							<!-- 表格 -->
						</div>
					</div>
				</div>

				<div class="el-dialog__footer">
					<el-button @click='close'>取消</el-button>
					<el-button type="primary" @click='submitForm()'>提交</el-button>
				</div>
			</el-form>
		</div>

		//弹出
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps">
			</el-tree>

			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="queding();">确 定</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'masks',
		props: {
			page: {
				type: Object,
			}
		},
		data() {
			console.log(this.page);
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
				this.$refs.user.validate((valid) => {
					if(valid) {
						if(this.user.sexName == "男") {
							this.user.sex = flase;
						} else {
							this.user.sex = true;
						}
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
				console.log(this.page.currentPage);
				console.log(this.page.pageSize);
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
				var data = {
					params: {
						page: 1,
						limit: 10,
					}
				}
				let that = this;
				var url = '/api/api-user/roles';

				this.$axios.get(url, {
					
				}).then((res) => {
					console.log(res);
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

		}

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>