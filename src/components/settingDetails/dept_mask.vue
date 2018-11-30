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
				<el-form status-icon inline-message :model="adddeptForm" :label-position="labelPosition" :rules="rules" ref="adddeptForm" label-width="100px" class="demo-adduserForm">
					<div class="accordion">
						<div class="mask_tab-block">
							<div class="mask_tab-head clearfix">
								<div class="accordion_title">
									<span class="accordion-toggle">机构信息</span>
								</div>
								<div class="col_but" @click="col_but('col_but1')">
									<i class="icon-arrow1-down"></i>
								</div>
							</div>
							<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
								<el-row :gutter="30">
									<el-col :span="4" class="pull-right">
										<el-input v-model="adddeptForm.version" :disabled="edit">
											<template slot="prepend">版本</template>
										</el-input>
									</el-col>
									<el-col :span="4" class="pull-right">
											<el-input v-model="adddeptForm.status" :disabled="edit" :formatter="judge">
												<template slot="prepend">信息状态</template>
											</el-input>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="机构序号" prop="step">
											<el-input v-model="adddeptForm.step">
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="机构编码" prop="code">
											<el-input v-model="adddeptForm.code">
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="机构名称" prop="name">
											<el-input v-model="adddeptForm.name">
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="上级机构" prop="parent">
											<el-input v-model="adddeptForm.parent" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getDept"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="机构类型" prop="org_range">
											<el-select v-model="adddeptForm.org_range" placeholder="请选择" style="width: 100%">
												<el-option v-for="item in typeoptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="机构属性" prop="type">
											<el-select v-model="adddeptForm.type" placeholder="请选择" style="width: 100%">
												<el-option v-for="item in attroptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="是否停用" prop="inactive">
											<el-input v-if="stopcontent" v-model="adddeptForm.inactive" :disabled="edit"></el-input>
											<el-select v-if="stopselect" v-model="adddeptForm.inactive" placeholder="请选择" style="width: 100%">
												<el-option v-for="item in stopoptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="联系地址" prop="address">
											<el-input v-model="adddeptForm.address"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="邮政编码" prop="zipcode">
											<el-input v-model="adddeptForm.zipcode">
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="负责人" prop="leader">
											<el-input v-model="adddeptForm.leader"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="电话" prop="telephone">
											<el-input v-model="adddeptForm.telephone"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="传真" prop="fax">
											<el-input v-model="adddeptForm.fax">
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="邮箱" prop="email">
											<el-input v-model="adddeptForm.email"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="备注" prop="tips">
											<el-input :rows="3" type="textarea" v-model="adddeptForm.tips" placeholder="请输入"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="录入人" prop="enterby">
											<el-input v-model="adddeptForm.enterby" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="enterdate">
											<el-input v-model="adddeptForm.enterdate" :disabled="edit">
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改人" prop="changeby">
											<el-input v-model="adddeptForm.changeby" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改时间" prop="changedate">
											<el-input v-model="adddeptForm.changedate" :disabled="edit">
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</div>
					</div>
					<div class="el-dialog__footer">
						<el-form-item>
							<!-- <el-button @click="cancelForm">取消</el-button> -->
							<el-button type="primary" class="btn-primarys" @click="submitForm('adddeptForm')">提交</el-button>
							<el-button v-if="modify" type="primary" class="btn-primarys" @click="modifyversion">修订</el-button>
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
						version:'1',
						status:'活动',
						step:'',
						code:'',
						name:'',
						parent:'',
						org_range:'',
						type:'',
						inactive:'否',
						address:'',
						zipcode:'',
						leader:'',
						telephone:'',
						fax:'',
						email:'',
						tips:'',
						pid:'',
						enterby:'',
						enterdate:'',
						changeby:'',
						changedate:''
					}
				}
			}
		},
		data() {
			// var validatename1 = (rule, value, callback) => {
   //              if (value === '') {
   //                  callback(new Error('请填写单位简称'));
   //              }else {
   //                  callback();
   //              }
   //          };

			return {
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				typeoptions: [{
					value: '外部机构',
					label: '外部机构'
				}, {
					value: '内部机构',
					label: '内部机构'
				}],
				attroptions: [{
					value: '业务部',
					label: '业务部'
				}, {
					value: '检验部',
					label: '检验部'
				}, {
					value: '外部机构',
					label: '外部机构'
				}],
				stopoptions: [{
					value: '是',
					label: '是'
				}, {
					value: '否',
					label: '否'
				}],
				showcode:true,
				dialogVisible: false, //对话框
				edit: true, //禁填
				value11:true,
				editSearch: '',
				col_but1: true,
				col_but2: true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				show: false,
				isok1: true,
				isok2: false,
				labelPosition: 'top',
				addtitle:true,
				modifytitle:false,
				modify:false,
				stopcontent:false,
				stopselect:false,
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
					step: [ 
   						 { required: true, message: '请输入机构序号', trigger: 'blur' } 
   					],
		          	code: [ 
   						 { required: true, message: '请输入机构编码', trigger: 'blur' }, { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
   					name: [ { required: true, message: '请输入机构名称', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' } ],
          			org_range:[ { required: true, message: '请选择机构类型', trigger: 'blur' }],
   					type:[ { required: true, message: '请选择机构属性', trigger: 'blur' }],
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
			//点击修订按钮
			modifyversion(){
				this.adddeptForm.version = this.adddeptForm.version + 1;
			},
			//form表单内容清空
			// resetNew(){
   //              this.adddeptForm = {
			// 		version:'1',
			// 		status:'活动',
			// 		step:'',
			// 		code:'',
			// 		name:'',
			// 		parent:'',
			// 		org_range:'',
			// 		type:'',
			// 		inactive:'',
			// 		address:'',
			// 		zipcode:'',
			// 		leader:'',
			// 		telephone:'',
			// 		fax:'',
			// 		email:'',
			// 		tips:''
			// 	}
   //              // this.$refs["adddeptForm"].resetFields();
   //          },
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
				console.log(this.checkedNodes[0]);

				this.adddeptForm.parent = this.checkedNodes[0].fullname;

				
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
				this.addtitle = true;
				this.modifytitle = false;
				this.modify = false;
				this.stopcontent = true;
				this.stopselect = false;
				this.showcode = false;
				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
	     			this.adddeptForm.enterby = res.data.nickname;
	     			console.log(this.adddeptForm.enterby);
	     			var date=new Date();
					this.adddeptForm.enterdate = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				 }).catch((err) => {
				 	this.$message({
				 		message: '网络错误，请重试',
				 		type: 'error'
				 	});
				});			
				this.show = !this.show;
			},
			//修改
			detail() {
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.stopcontent = false;
				this.stopselect = true;
				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
	    			this.adddeptForm.changeby = res.data.nickname;
	    			console.log(this.adddeptForm.changeby);
	    			var date=new Date();
					this.adddeptForm.changedate = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");

				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
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
			judge(data) {
				return data.STATUS=="1" ? '活动' : '不活动'
			},
			//保存
			submitForm(adddeptForm) {
				this.$refs[adddeptForm].validate((valid) => {
		          if (valid) {
					var url = '/api/api-user/depts/saveOrUpdate';
					this.adddeptFormtest = {
						// "id":this.adddeptForm.id,
						// "pid":this.adddeptForm.pid,
						// "fullname":this.adddeptForm.fullname,
					    // "simplename":this.adddeptForm.simplename,
					    "type":this.adddeptForm.type,
					    "code":this.adddeptForm.code,
					    // "teltphone":this.adddeptForm.teltphone,
					    // "tips":this.adddeptForm.tips
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
			
		}
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
	/*.el-form-item__error {
		top: 18%;
	    left: 5px;
	    background: #FFF;
	    padding: 5px 10px;
	}*/
</style>