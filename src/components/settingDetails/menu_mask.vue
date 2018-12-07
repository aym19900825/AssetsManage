<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加菜单</div>
				<div class="mask_title" v-show="modifytitle">修改菜单</div>
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
				<el-form :model="menu"  :rules="rules" ref="menu" label-width="100px" class="demo-user">
					<div class="accordion">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="基础信息" name="1">
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="所属上级" prop="pName">
											<el-input v-model="menu.pName" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getParentId"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
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

								<el-row :gutter="30">
									<!--是否影藏-->
									<el-col :span="8">
										<el-form-item label="是否显示" prop="hidden">
											<el-switch active-color="#5B7BFA" inactive-color="#dadde5" v-model="menu.hidden" @change="changeval">
											</el-switch>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="菜单图标" prop="css">
											<el-input v-model="menu.css" :disabled="edit">
												<i :class="menu.css" slot="prepend"></i>
												<el-button slot="append" icon="el-icon-search" @click="getCss"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</div>

					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click='submitForm'>提交</el-button>
					</div>
				</el-form>
			</div>
		</div>

		<!--提示弹出框 Begin-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps">
			</el-tree>
			<div slot="footer" class="dialog__footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="confirm();" >确 定</el-button>
		    </div>
		</el-dialog>
		<!--提示弹出框 End-->

		<!--图标弹出 Begin-->
        <div class="mask" v-show="show2"></div>
		<div class="mask_div" v-show="show2">
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
			<div id="FHScrollbar" :style="{height: fullHeight}">
				<all_icons v-on:childByValue="childByValue"></all_icons>
				<div slot="footer" class="el-dialog__footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="confirm2();" >确 定</el-button>
				</div>
			</div>
		</div>
		<!--图标弹出 End-->	    
	</div>
</template>

<script>
	import all_icons from '../common/all_icons.vue'//弹出框
	export default {
		name: 'masks',
		components: {
			'all_icons':all_icons,
		},
		props: {
			menu: {
				type: Object,
				default: function(){
					
					return {
						parentId:'' ,
						name: '',
						url: '',
						sort: '',
						hidden:1 ,
						css: '',
						isMenu: 0,
						roled:0,
					}
				}
			},
		},

		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			

			return {
				edit: true, //禁填
				col_but1: true,
				col_but2: true,
				show: false,
				show2:false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1'], //手风琴数量
//				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				addtitle:true,
				modifytitle:false,
				fullHeight: document.documentElement.clientHeight - 200 +'px',//获取浏览器高度
				rules: {
					name: [{required: true,trigger: 'change',validator: validatePass}],
					soft: [{required: true,trigger: 'change',validator: validatePass}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "name"
				},
			};
		},
		methods: {
			
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
				this.modifytitle=false;
				this.show = true;
			},
			
			// 这里是修改
			detail() {
					this.addtitle=false;
				    this.modifytitle=true;
					this.show = true;
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
					if(valid) {
						this.menu.hidden=this.menu.hidden?1:0
						var menu = this.menu;						
						console.log(menu)
						var url = '/api/api-user/menus/saveOrUpdate';
						this.menutest={
								"id":this.menu.id,
								"parentId":this.menu.parentId ,
								"name":this.menu.name,
								"url":this.menu.url,
								"sort":this.menu.sort,
								"hidden":this.menu.hidden,
								"css":this.menu.css,
							}
					
						//return false;
					
						this.$axios.post(url, this.menutest).then((res) => {
							
							
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
						this.$message({
								message: '有必填项未填写，请填写',
								type: 'warning'
							});
					}
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
		      
		        this.sendchildValue = childValue;
		      
		    },
			//图标的带值
			confirm2() {
				this.menu.css = this.sendchildValue;
				this.show2 = false;

			},

			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			changeval(Callbackvaule){
			
//				this.menu.hidden=Callbackvaule?1:0
			},
			toggleStatus(state){
			
			}

		},
		mounted() {

		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';

	#FHScrollbar { overflow-y: scroll;}
</style>