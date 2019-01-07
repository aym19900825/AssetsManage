<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加角色</div>
				<div class="mask_title" v-show="modifytitle">修改角色</div>
				<div class="mask_title" v-show="viewtitle">查看角色</div>
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
				<el-form :model="roleList" :rules="rules" ref="roleList" label-width="110px" class="demo-user">
					<div class="accordion">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="基础信息" name="1">
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="角色编码" prop="code">
											<el-input v-model="roleList.code" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="角色名称" prop="name">
											<el-input v-model="roleList.name" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="是否停用" prop="inactive">
											<!--<el-input v-if="stopshow" v-model="roleList.inactive" :disabled="edit"></el-input>-->
											<el-select  v-model="roleList.inactive" placeholder="请选择" style="width: 100%" :disabled="noedit">
												<el-option v-for="item in stopoptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="备注" prop="MEMO">
											<el-input type="textarea" v-model="roleList.MEMO" placeholder="请填写" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<!--<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="数据授权范围" prop="range">
											<el-select placeholder="请选择" v-model="roleList.range" style="width: 100%" @change="selectValue">
												<el-option v-for="item in dataoptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>-->
											<!-- 树 Begen-->
											<!--<div class="lefttreebg">-->
												<!-- <div class="left_tree_title clearfix">
													<div class="pull-left pr20">数据授权范围</div>
													<span class="pull-right navbar-minimalize minimalize-styl-2">
														<i class="icon-doubleok icon-double-angle-left blue"></i>
													</span>
												</div> -->
												<!--<div class="left_treebg" style="height: 400px;display:none;">
													<div class="p15">
														<el-tree ref="tree" class="filter-tree" :data="deptData" node-key="id" default-expand-all :indent="22" :render-content="renderContent" :props="resourceProps" @node-click="handleNodeClick">
														</el-tree>
													</div>
												</div>
											</div>-->
											<!-- 树 End-->
										<!--</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="角色授权" prop="roleright">-->
											<!-- 树 Begen-->
											<!--<div class="lefttreebg">-->
												<!-- <div class="left_tree_title clearfix">
													<div class="pull-left pr20">角色授权</div>
													<span class="pull-right navbar-minimalize minimalize-styl-2">
														<i class="icon-doubleok icon-double-angle-left blue"></i>
													</span>
												</div> -->
												<!--<div class="left_treebg" style="height: 400px">
													<div class="p15">
														<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all :indent="22" :render-content="renderContent" :props="resourceProps" @node-click="handleNodeClick">
														</el-tree>
													</div>
												</div>
											</div>-->
											<!-- 树 End-->
										<!--</el-form-item>
									</el-col>
								</el-row>-->
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer" v-show="noviews">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click='submitForm()'>保存</el-button>
					</div>
				</el-form>
			</div>
		</div>
		<!-- 弹出 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @node-click="handleNodeClick" @check-change="handleCheckChange">
			</el-tree>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="queding();" >确 定</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		data() {
			//验证name
			var validatePass1 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写角色名称'));
				} else {
					callback();
				}
			};
			return {
				basic_url: Config.dev_url,
				value: '',
				stopoptions: [{
					value: '1',
					label: '是'
				}, {
					value: '2',
					label: '否'
				}],

				dataoptions: [{
					value: '1',
					label: '所有数据'
				}, {
					value: '2',
					label: '所在公司及以下数据'
				}, {
					value: '3',
					label: '所在公司数据'
				}, {
					value: '4',
					label: '所在部门及以下数据'
				}, {
					value: '5',
					label: '所在部门数据'
				}, {
					value: '6',
					label: '仅本人数据'
				}, {
					value: '7',
					label: '按明细设置'
				}, ],
				edit: true, //禁填
				'男': true,
				'女': false,
				stopshow: false,
				stopselect: false,
				show: false, //控制弹出框显示隐藏
				isok1: true, //控制弹出框放大还原
				isok2: false, //控制弹出框放大还原
				down: true, //控制高级查询划出收起
				up: false, //控制高级查询划出收起
				activeNames: ['1'], //手风琴数量
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				//				labelPosition: 'top', //表单label位置
				dialogVisible: false, //对话框
				roleList: { //表格数据
					name: '',
					code: '',
					deptId: '',
					tips: ''
				},
				rules: { //验证表单
					name: [{
						required: true,
						trigger: 'blur',
						validator: validatePass1,
					}],
					range: [{
						required: true,
						message: '请选择机构属性',
						trigger: 'change'
					}]
					// range: [{
					// 	required: true,
					// 	trigger: 'change',
					// 	validator: validatePass2,
					// }]
				},
				//tree
				resourceData:[],
				deptData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "children",
					label: "fullname"
				},
				companyId: '',
				deptId: '',
				cccData: {},
				addtitle: true,
				modifytitle: false,
				viewtitle: false,
				dept: false,
				noedit: false, //表单内容
				views: false, //录入修改人信息
				noviews: true, //按钮
				modify: false, //修订
				hintshow: false,
				statusshow1: true,
				statusshow2: false,
			};
		},
		
		methods: {
			renderContent(h, {
				node,
				data,
				store
			}) { //自定义Element树菜单显示图标
				return(<span><i class={data.iconClass}></i><span>{node.label}</span></span>);
			},
			// 点击节点
			nodeClick: function(m) {
				if(m.iconClass != 'icon-file-text') {
					if(m.iconClass == 'icon-file-normal') {
						m.iconClass = 'icon-file-open';
					} else {
						m.iconClass = 'icon-file-normal';
					}
				}
				this.handleNodeClick();
			},

			handleCheckChange(data, checked, indeterminate) {
				this.cccData = data;
			},
			handleNodeClick(data) {
				if(data.type == '1') {
					this.companyId = data.id;
					this.deptId = '';
				} else {
					this.deptId = data.id;
					this.companyId = '';
				}
				this.requestData();
			},
			//机构树
			getKey() {
				let that = this;
				var url = this.basic_url + '/api-user/depts/tree';
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.deptData = res.data;
					this.treeData = this.transformTree(this.deptData);
				});
			},
			transformTree(data) {
				for(var i = 0; i < data.length; i++) {
					data[i].name = data[i].fullname;
					if(!data[i].pid || $.isArray(data[i].subDepts)) {
						data[i].iconClass = 'icon-file-normal';
					} else {
						data[i].iconClass = 'icon-file-text';
					}
					if($.isArray(data[i].subDepts)) {
						data[i].children = this.transformTree(data[i].subDepts);
					}
				}
				return data;
			},
			//form表单内容清空
			resetNew() {
				this.roleList = {
					name: '',
					code: '',
					deptName: '',
					tips: ''
				}
				this.$refs["roleList"].resetFields();
			},
			rand(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
			},
			//点击按钮显示弹窗
			visible() {
				var randnum = this.rand(1000, 9999);
				this.roleList.code = randnum;
				this.stopshow = true;
				this.stopselect = false;
				this.roleList.INACTIVE = '否';
				this.addtitle = true;
				this.modifytitle = false;
				this.viewtitle = false;
				this.dept = false;
				this.noedit = false; //表单内容
				this.views = false; //录入修改人信息
				this.noviews = true; //按钮
				this.modify = false; //修订
				this.hintshow = false;
				this.statusshow1 = true;
				this.statusshow2 = false;
				// this.show = true;
			},
			// 这里是修改
			detail(id) {
				this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle = false;
				this.dept = true;
				this.noedit = false; //表单内容
				this.views = false; //录入修改人信息
				this.noviews = true; //按钮
				this.hintshow = false;
				this.modify = true; //修订
				this.statusshow1 = false;
				this.statusshow2 = true;
				this.stopshow = false;
				this.stopselect = true;
				var url = this.basic_url + '/api-user/roles/' + id;
				this.$axios.get(url, {}).then((res) => {
					this.roleList = res.data;

					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.show = true;
			},
			//这是查看
			view(item) {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true; //表单内容
				this.views = true; //录入修改人信息
				this.noviews = false; //按钮
				this.roleList = item;
				this.show = true;
			},

			//点击关闭按钮
			close() {
				this.show = false;
			},
			open() {
				this.show = true;
			},
			toggle(e) {
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			//放大按钮
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
			//保存信息
			submitForm() {
				this.$refs.roleList.validate((valid) => {
					// if(valid) {	
					var url = this.basic_url + '/api-user/roles/saveOrUpdate';
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
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data;
					this.dialogVisible = true;
				});
			},
			//确定按钮
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
		},
		mounted() {
			this.getKey();
		},
		watch:{
			val(){
				
			}
		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>