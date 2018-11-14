<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加机构</div>
				<div class="mask_title" v-show="modifytitle">修改机构</div>
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
				<el-form :model="adddeptForm" :label-position="labelPosition" :rules="rules" ref="adddeptForm" label-width="100px" class="demo-adduserForm">
					<div class="accordion">
						<div class="mask_tab-block">
							<div class="mask_tab-head clearfix">
								<div class="accordion_title">
									<span class="accordion-toggle">添加机构信息</span>
								</div>
								<div class="col_but" @click="col_but('col_but1')">
									<i class="icon-arrow1-down"></i>
								</div>
							</div>
							<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
								<el-row :gutter="70">
									<el-col :span="24">
										<el-form-item label="所属上级" prop="pName">
											<el-input v-model="adddeptForm.pName" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getDept"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="70">
									<el-col :span="8">
										<el-form-item label="机构名称" prop="fullname">
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
									<el-col :span="8"  v-show="showcode">
										<el-form-item label="机构编码" prop="code">
											<el-input v-model="adddeptForm.code" :disabled="edit">
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
					<div class="el-dialog__footer">
						<el-form-item>
							<el-button @click="cancelForm">取消</el-button>
							<el-button type="primary" @click="submitForm('adddeptForm')">提交</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
		<!-- 弹出 -->
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
			page: {
				type: Object,
			},
			adddeptForm: {
				type: Object,
				default: function(){
					return {
						pid:'',
						fullname:'',
						simplename:'',
						type:'',
						code:'',
						teltphone:'',
						tips:''
					}
				}
			}
		},
		data() {
			var validatename1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写单位简称'));
                }else {
                    callback();
                }
            };
            var validatename2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写机构名称'));
                }else {
                    callback();
                }
            };
            var validatetype = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写类型'));
                }else {
                    callback();
                }
            };
            // var validatecode = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请选择机构编码'));
            //     }else {
            //         callback();
            //     }
            // };

			return {
				showcode:true,
				dialogVisible: false, //对话框
				edit: true, //禁填
				value11:true,
				editSearch: '',
				col_but1: true,
				col_but2: true,
				clientHeight:'',//获取浏览器高度
				show: false,
				isok1: true,
				isok2: false,
				labelPosition: 'top',
				addtitle:true,
				modifytitle:false,
				// adddeptFormtest: {
				// 	pid:'',
				// 	fullname:'',
				// 	simplename:'',
				// 	type:'',
				// 	code:'',
				// 	teltphone:'',
				// 	tips:''
				// },
				rules:{
		          	simplename: [{ 
       						required: true,
       						validator: validatename1,
       						trigger: 'blur' 
       					}],
          			fullname: [{ 
       						required: true,
       						validator: validatename2,
       						trigger: 'blur' 
       					}],
          			type:[{ 
       						required: true,
       						validator: validatetype,
       						trigger: 'blur' 
       					}],
          		// 	code:[{ 
       					// 	required: true,
       					// 	validator: validatecode,
       					// 	trigger: 'blur' 
       					// }],
	          	},
	          	//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
			};
		},
		methods: {
			//form表单内容清空
			resetNew(){
                this.adddeptForm = {
					pName:'',
					fullname:'',
					simplename:'',
					type:'',
					code:'',
					teltphone:'',
					tips:''
				}
                // this.$refs["adddeptForm"].resetFields();
            },
			//所属上级
			getDept() {
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var url = '/api/api-user/depts/treeByType';
				this.$axios.get(url, {
					// params: {
					// 	page: page,
					// 	limit: limit,
					// 	// type: type
					// },
				}).then((res) => {
					this.resourceData = res.data;
					this.dialogVisible = true;
				});
			},
			queding() {
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;				
				this.adddeptForm.pid = this.checkedNodes[0].id;
				this.adddeptForm.pName = this.checkedNodes[0].simplename;
				
			},
			getCheckedNodes() {
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},
			col_but(col_but) {
				if(col_but == 'col_but1') {
					this.col_but1 = !this.col_but1;
				}
				if(col_but == 'col_but2') {
					this.col_but2 = !this.col_but2;
				}
			},
			//点击按钮显示弹窗
			childMethods() {
				this.showcode = false;
				this.show = !this.show;
			},
			//修改
			detail() {
				this.addtitle = false;
				this.modifytitle = true;
				this.show = true;
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
			submitForm(adddeptForm) {
				this.$refs[adddeptForm].validate((valid) => {
		          if (valid) {
					var url = '/api/api-user/depts/saveOrUpdate';
					this.adddeptFormtest = {
						"id":this.adddeptForm.id,
						"pid":this.adddeptForm.pid,
						"fullname":this.adddeptForm.fullname,
					    "simplename":this.adddeptForm.simplename,
					    "type":this.adddeptForm.type,
					    "code":this.adddeptForm.code,
					    "teltphone":this.adddeptForm.teltphone,
					    "tips":this.adddeptForm.tips
					}
					this.$axios.post(url, this.adddeptFormtest).then((res) => {
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
		          } else {
		            return false;
		          }
		        });
				
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
			// 获取浏览器可视区域高度
			var _this = this;
			var clientHeight = $(window).height() - 100;    //document.body.clientWidth;
			_this.$refs.homePagess.style.height = clientHeight + 'px';
			window.onresize = function() {
				var clientHeight = $(window).height() - 100;
				_this.$refs.homePagess.style.height = clientHeight + 'px';
			};
		}
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>