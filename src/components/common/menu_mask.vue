<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加用户</div>
				<div class="mask_anniu">
					<span class="mask_span mask_max" @click='toggle'>
						 
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
					</span>
					<span class="mask_span" @click='close'>
						<i class="icon-close1"></i>
					</span>
				</div>
			</div>
			<el-form :model="menu" :label-position="labelPosition" :rules="rules" ref="menu" label-width="100px" class="demo-user">

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
									<el-form-item label="所属上级" prop="parentId">
										<el-input v-model="menu.parentId" :disabled="edit">
											<el-button slot="append" icon="el-icon-search" @click="getParentId"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="70">
								<el-col :span="8">
									<el-form-item label="菜单名称" prop="name">
										<el-input v-model="menu.name">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="链接地址" prop="url">
										<el-input v-model="menu.url">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="排序" prop="sort">
										<el-input v-model="menu.sort">
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="70">
								<!--是否影藏-->
								<el-col :span="8">
									<el-form-item label="是否显示" prop="hidden">
										<el-switch on-text="是" off-text="否" on-color="#5B7BFA" off-color="#dadde5" v-model="menu.hidden" @change=change()>
										</el-switch>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="菜单图标" prop="css">
										<el-input v-model="menu.css" :disabled="edit">
											<el-button slot="append" icon="el-icon-search" @click="getCss"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>

				<div class="el-dialog__footer">
					<el-button @click='close'>取消</el-button>
					<el-button type="primary" @click='submitForm'>提交</el-button>
				</div>
			</el-form>

		</div>

		//弹出
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps">
			</el-tree>

			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="confirm();" >确 定</el-button>
		    </span>
		</el-dialog>
		//圖標彈出
        <div class="mask" v-show="show2"></div>
		<div class="mask_div" v-show="show2">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title">应用中心图标</div>
				<div class="mask_anniu">
					<span class="mask_span mask_max" @click='toggle'>
						 
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
					</span>
					<span class="mask_span" @click='close1'>
						<i class="icon-close1"></i>
					</span>
				</div>
			</div>
           <all_icons v-on:childByValue="childByValue"></all_icons>
                
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="confirm2();" >确 定</el-button>
		    </span>
	</div>	    
	</div>
</template>

<script>
	import all_icons from './all_icons.vue'//弹出框
	export default {
		name: 'masks',
		components: {
			'all_icons':all_icons,
		},
		props: {
			menu: {
				type: Object,
				default: function() {
					return {
						parentId: '',
						name: '',
						url: '',
						sort: '',
						hidden: '',
						css: '',
					}
				}
			},

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

			return {
				hidden: true,
				edit: true, //禁填
				col_but1: true,
				col_but2: true,
				show: false,
				show2:false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				useritem: [],
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框

				rules: {
					name: [{
						required: true,
						trigger: 'change',
						validator: validatePass1,
					}],
					soft: [{
						required: true,
						trigger: 'change',
						validator: validatePass2,
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "name"
				},
				selectData: [], //
				 
			};
		},
		methods: {
		
			//清空表單
			resetNew(){
                this.adddeptForm = {
					parentId:'',
					name:'',
					url:'',
					sort:'',
					hidden:'',
					css:''
				}
                   this.$refs["menu"].resetFields();
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
			//点击按钮显示弹窗
			visible() {
				this.show = true;
			},
			
			// 这里是修改
			detail(deptid) {
				var url = '/api/api-user/menus/saveOrUpdate';
				this.$axios.post(url, {}).then((res) => {
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
				this.$refs.menu.validate((valid) => {
//					if(valid) {

						var url = '/api/api-user/menus/saveOrUpdate';
						if(typeof(this.menu._expanded )!='undefined'){
							delete this.menu._expanded
						}
						if(typeof(this.menu._level )!='undefined'){
							delete this.menu._level
						}
						if(typeof(this.menu._parent )!='undefined'){
							delete this.menu._parent
						}
						if(typeof(this.menu._show )!='undefined'){
							delete this.menu._show
						}
						console.log(this.menu);
						//return false;
						this.$axios.post(url, this.menu).then((res) => {
							console.log(res);							
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
//					} else {
//						return false;
//					}
				})
			},
			//所属上级
			getParentId() {
				var url = '/api/api-user/menus/findOnes';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});

			},
			//图标
			getCss(){
				this.show2 = true;
			},

			confirm() {
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				this.menu.parentId = this.checkedNodes[0].id;
				this.menu.pName = this.checkedNodes[0].name;

			},
			close1(){
				this.show2 = false;
			},
		
		    childByValue: function (childValue) {
		        // childValue就是子组件传过来的值
		        console.log(111);
		        console.log(childValue);
		        this.sendchildValue = childValue;
		        console.log(childValue);
		    },
			//图标的带值
			confirm2() {
				this.menu.css = this.sendchildValue;
				console.log(111);
				this.show2 = false;

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

		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>