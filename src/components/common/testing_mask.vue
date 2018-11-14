<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加检验/检测方法</div>
				<div class="mask_title" v-show="modifytitle">修改检验/检测方法</div>
				<div class="mask_anniu">
					<span class="mask_span mask_max" @click='toggle'>
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
					</span>
					<span class="mask_span" @click='close'>
						<i class="icon-close1"></i>
					</span>
				</div>
			</div>
			<el-form :model="addnumbersettingForm" :label-position="labelPosition" :rules="rules" ref="addnumbersettingForm" label-width="100px" class="demo-adduserForm">
				<EasyScrollbar>
					<div ref="homePagess" class="accordion" id="information" style="height: 460px;">
						<div style="height: auto;">
							<div class="accordion">
								<div class="mask_tab-block">
									<div class="mask_tab-head clearfix">
										<div class="accordion_title">
											<span class="accordion-toggle">基础信息</span>
										</div>
										<div class="col_but" @click="col_but('col_but1')">
											<i class="icon-arrow1-down"></i>
										</div>
									</div>
									<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
										<el-row :gutter="70">
											<el-col :span="8">
												<el-form-item label="自动编号名称" prop="AUTOKEY">
													<el-input v-model="addnumbersettingForm.AUTOKEY"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="前缀">
													<el-input v-model="addnumbersettingForm.PREFIX"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="起始数" prop="S_NUM">
													<el-input v-model="addnumbersettingForm.S_NUM"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row :gutter="70">
											<el-col :span="24">
												<el-form-item label="备注" prop="MEMO">
													<el-input type="textarea" v-model="addnumbersettingForm.MEMO"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
									</div>
								</div>
							</div>
							<div class="content-footer">
								<el-form-item>
									<button @click="cancelForm" class="btn btn-default btn-large">取消</button>
									<button type="primary" class="btn btn-primarys btn-large" @click="submitForm('addnumbersettingForm')">提交</button>
								</el-form-item>
							</div>
						</div>
					</div>
				</EasyScrollbar>
			</el-form>
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
			addnumbersettingForm: {
				type: Object,
				default: function(){
					return {
						ID:'',
						AUTOKEY:'',
						S_NUM:'',
						PREFIX:'',
						MEMO:''
					}
				}
			}
		},
		data() {
			var validateAUTOKEY = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写自动编号名称'));
                }else {
                    callback();
                }
            };
            var validateS_NUM = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写起始数'));
                }else {
                	var targ=/^([0-9]*|[0-9]{1}\d*\.\d{1}?\d*)$/;
                	if (!targ.test(value)) {
                		callback(new Error('起始数须为数字'));
                	}
                    callback();
                }
            };
           
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
				/*addnumbersettingFormtest: {
					ID:'',
					AUTOKEY:'',
					S_NUM:'',
					PREFIX:'',
					MEMO:''
				},*/
				rules:{
          			AUTOKEY: [{ 
       						required: true,
       						validator: validateAUTOKEY,
       						trigger: 'blur' 
       					}],
          			S_NUM:[{ 
       						required: true,
       						validator: validateS_NUM,
       						trigger: 'blur' 
       					}]
          		
	          	},
	          	//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "PREFIX"
				},
			};
		},
		methods: {
			//form表单内容清空
			resetNew(){
                this.addnumbersettingForm = {
					ID:'',
					AUTOKEY:'',
					S_NUM:'',
					PREFIX:'',
					MEMO:''
				}
                // this.$refs["addnumbersettingForm"].resetFields();
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
				this.addnumbersettingForm.pid = this.checkedNodes[0].id;
				this.addnumbersettingForm.pName = this.checkedNodes[0].PREFIX;
				
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
			
			childMethods() {//
				this.addtitle = true;
				this.modifytitle = false;
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
			submitForm(addnumbersettingForm) {
				this.$refs[addnumbersettingForm].validate((valid) => {
		          if (valid) {
					var url = '/api/api-user/depts/saveOrUpdate';
					this.addnumbersettingFormtest = {
						"ID":this.addnumbersettingForm.ID,
						"pid":this.addnumbersettingForm.pid,
						"AUTOKEY":this.addnumbersettingForm.AUTOKEY,
					    "PREFIX":this.addnumbersettingForm.PREFIX,
					    "PREFIX":this.addnumbersettingForm.PREFIX,
					   
					}
					this.$axios.post(url, this.addnumbersettingFormtest).then((res) => {
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