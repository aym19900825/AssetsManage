<template>
	<div>
		
		<div class="mask" v-show="show"></div>
		<!-- <EasyScrollbar> -->
		<div class="mask_div"  v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加角色</div>
				<div class="mask_anniu">
					<span class="mask_span mask_max" @click='toggle'> 
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
					</span>
					<span class="mask_span" @click='close'>
						<i class="icon-close1"></i>
					</span>
				</div>
			</div>
			<el-form :model="roleList" :label-position="labelPosition" :rules="rules" ref="roleList" label-width="100px" class="demo-user">
				<EasyScrollbar>
					<div ref="homePagess" class="accordion" id="information" style="height: 600px;">
						<div class="mask_tab-block" style="height: auto;">
							<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
								<el-row :gutter="70">
									<el-col :span="12">
										<el-form-item label="角色名称" prop="name">
											<el-input v-model="roleList.name"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="别名" prop="code">
											<el-input v-model="roleList.code" placeholder="请填写"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="70">
									<el-col :span="24">
										<el-form-item label="所在机构" prop="deptName">
											<el-input v-model="roleList.deptName" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getDept"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="70">
									<el-col :span="24">
										<el-form-item label="备注" prop="tips">
											<el-input type="textarea" v-model="roleList.tips" placeholder="请填写"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</div>
						<div class="el-dialog__footer">
							<el-button @click='close'>取消</el-button>
							<el-button type="primary" @click='submitForm()'>保存</el-button>
						</div>
					</div>
				</EasyScrollbar>
			</el-form>
		</div>
	    <!-- 弹出 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @node-click="handleNodeClick"  @check-change="handleCheckChange">
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
			var validatePass1 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			return {
				edit: true, //禁填
				'男': true,
				'女': false,
				col_but1: true,
				col_but2: true,
				show: false,
				show1:false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				useritem: [],
				clientHeight:'',//获取浏览器高度
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				roleList:{
					name:'',
					code:'',
					deptId:'',
					tips:''
				},
				rules: {
					name: [{
						required: true,
						trigger: 'blur',
						validator: validatePass1,
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
				selectData: [],
				cccData:{}
			};
		},
		mounted() {
			// 获取浏览器可视区域高度
			var _this = this;
			var clientHeight = $(window).height() - 100;    //document.body.clientWidth;
			_this.$refs.homePagess.style.height = clientHeight + 'px';
			window.onresize = function() {
				var clientHeight = $(window).height() - 100;
				_this.$refs.homePagess.style.height = clientHeight + 'px';
			};
		},
		methods: {
			handleCheckChange(data, checked, indeterminate) {
		        this.cccData=data;
		    },
		    handleNodeClick(data) {
            },
			col_but(col_but) {
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
			//form表单内容清空
			resetNew(){
                this.roleList = {
					name:'',
					code:'',
					deptName:'',
					tips:''
				}
                this.$refs["roleList"].resetFields();
            },
			//点击按钮显示弹窗
			visible() {
				this.show = true;
			},
			// 这里是修改
			detail(id) {
				this.show = true;
				var url = '/api/api-user/roles/' + id;
				this.$axios.get(url, {}).then((res) => {
					this.roleList = res.data;

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
				this.cccData = this.$refs.tree.getCheckedNodes()
			},
			//保存users/saveOrUpdate
			submitForm() {
				this.$refs.roleList.validate((valid) => {
					// if(valid) {	
						var url = '/api/api-user/roles/saveOrUpdate';
						this.$axios.post(url, this.roleList).then((res) => {
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
					// } else {
					// 	return false;
					// }
				})
			},
			//所在机构
			getDept() {				
				// this.editSearch = 'dept';
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
			queding() {
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				this.roleList.deptId = this.cccData[0].id;
				this.roleList.deptName = this.cccData[0].simplename;
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