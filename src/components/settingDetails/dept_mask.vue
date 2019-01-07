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
				<el-form status-icon :model="adddeptForm"  :rules="rules" ref="adddeptForm" label-width="100px" id="demo-adduserForm">
					<div class="accordion">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="机构信息" name="1">
								<el-row :gutter="30">
									<el-col :span="4" class="pull-right pb10" >
										<el-input v-model="adddeptForm.version" :disabled="edit">
											<template slot="prepend">版本</template>
										</el-input>
									</el-col>
									<el-col :span="4" class="pull-right" v-if="modify" style="display: none;">
											<el-input v-model="adddeptForm.status==1?'活动':'不活动'" :disabled="edit" >
												<template slot="prepend">信息状态</template>
											</el-input>
									</el-col>
									<el-col :span="4" class="pull-right" v-else style="display: none;">
											<el-input v-model="adddeptForm.status" :disabled="edit" >
												<template slot="prepend">信息状态</template>
											</el-input>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="机构序号" prop="step">
											<el-input  v-model="adddeptForm.step">
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
										<el-form-item label="机构名称" prop="fullname">
											<el-input v-model="adddeptForm.fullname">
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
												<el-option v-for="(data,index) in Selectsys_depttype" :key="index" :value="data.code" :label="data.name"></el-option>
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="机构属性" prop="type">
											<el-select v-model="adddeptForm.type" placeholder="请选择" style="width: 100%">
												<el-option v-for="(data,index) in SelectDEPT_TYPE" :key="index" :value="data.code" :label="data.name"></el-option>
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
										<el-form-item label="联系地址">
											<el-input v-model="adddeptForm.address"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="邮政编码">
											<el-input v-model="adddeptForm.zipcode">
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="负责人">
											<el-input v-model="adddeptForm.leaderDesc" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getPerson"></el-button>
											</el-input>
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
										<el-form-item label="备注">
											<el-input :rows="3" type="textarea" v-model="adddeptForm.tips" placeholder="请输入"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30" v-show="personinfo">
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
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						    
						    <el-button type="primary" @click="saveAndUpdate('adddeptForm')">保存</el-button>
						    <el-button type="success" @click="saveAndSubmit('adddeptForm')" v-show="addtitle">保存并添加</el-button>
						<!--	<el-button type="primary" class="btn-primarys" @click="submitForm('adddeptForm')">提交</el-button>-->
							<el-button v-if="modify" type="primary" class="btn-primarys" @click="modifyversion">修订</el-button>
							<el-button @click="close">取消</el-button> 
					</div>
				</el-form>
			</div>
		</div>
		<!-- 弹出 -->
		<el-dialog title="机构" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" default-expand-all>
			</el-tree>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="queding();" >确 定</el-button>
		    </span>
		</el-dialog>

		<!--负责人 Begin-->
		<el-dialog title="选择负责人" :visible.sync="dialogLeader" width="80%" :before-close="handleClose">
			<div class="accordion" id="information">
				<div class="mask_tab-block">
					<!-- <div class="mask_tab-head clearfix">
						<div class="accordion_title">
							<span class="accordion-toggle">选择负责人</span>
						</div>
					</div> -->
					<!-- 第二层弹出的表格 -->
						<el-table :data="userList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed>
								</el-table-column>
								<el-table-column label="账号" sortable width="140px" prop="username">
								</el-table-column>
								<el-table-column label="姓名" sortable width="200px" prop="nickname">
								</el-table-column>
								<el-table-column label="机构" sortable width="150px" prop="deptName">
								</el-table-column>
								<el-table-column label="公司" sortable width="200px" prop="companyName">
								</el-table-column>
								<el-table-column label="信息状态" sortable width="200px" prop="enabled" :formatter="judge">
								</el-table-column>
								<el-table-column label="创建时间" width="200px" prop="createTime" sortable :formatter="dateFormat">
								</el-table-column>
							</el-table>
							<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
						<!-- 表格 -->
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogLeader = false">取 消</el-button>
		       <el-button type="primary" @click="addleader">确 定</el-button>
		    </span>
		</el-dialog>
		<!--负责人 End-->
	</div>
</template>

<script>
	import Config from '../../config.js'
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
						version:'',
						status:'',
						step:'',
						code:'',
						fullname:'',
						parent:'',
						org_range:'',
						type:'',
						inactive:'',
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

			//验证机构序号
			var validateStep = (rule, value, callback) => {
				 if (value === '') {
			          return callback(new Error('机构序号不能为空'));
			    } else {
					var targ = /^[A-Za-z0-9]+$/;
					if( !targ.test(value)){
	                    callback(new Error('序号只支持英文、数字'));
	                }
					callback();
				}
			};

			//验证机构名称
			var validateFullname = (rule, value, callback) => {
				if (value === '') {
		          return callback(new Error('机构名称不能为空'));
		        }
		         callback();
			};
			//验证机构类型
			var validateOrgrange = (rule, value, callback) => {
				if (value === '') {
		          return callback(new Error('请选择机构类型'));
		        }
		         callback();
			};
			//验证机构属性
			var validateType = (rule, value, callback) => {
				if (value === '') {
		          return callback(new Error('请选择机构属性'));
		        }
		         callback();
			};

			//验证电话号码
			var validatePhone = (rule, value, callback) => {
				if (value && (!(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/).test(value))) {
  				    callback(new Error('请输入有效的电话号码'))
  				} else {
  				    callback()
  				}
			};

			//验证传真
			var validateFax = (rule, value, callback) => {
				if (value && (!(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/).test(value))) {
  				    callback(new Error('请输入有效的传真，格式为：0000-0000000'))
  				} else {
  				    callback()
  				}
			};

			//验证邮箱
			var validateEmail = (rule, value, callback) => {
				if (value && (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(value))) {
  				    callback(new Error('请输入有效的邮箱'))
  				} else {
  				    callback()
  				}
			};

			return {
				basic_url: Config.dev_url,
				value: '',
				loadSign: true, //加载
				commentArr: {},
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '2',
					label: '不活动'
				}],

				stopoptions: [{
					value: '1',
					label: '是'
				}, {
					value: '2',
					label: '否'
				}],
				personinfo:false,
				showcode:true,
				selMenu:[],
				selUser: [],
				SelectDEPT_TYPE:[],//获取机构属性
				Selectsys_depttype:[],//获取机构类型
				activeNames: ['1'], //手风琴数量
				userList: [],
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				dialogVisible: false, //对话框
				edit: true, //禁填
				editSearch: '',
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				show: false,
				isok1: true,
				isok2: false,
//				labelPosition: 'top',
				addtitle:true,
				modifytitle:false,
				modify:false,
				dialogLeader:false,
				stopcontent:false,
				stopselect:false,
	          	//tree树菜单
				resourceData: [], //数组，我这里是通过接口获取数据
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "children",
					label: "fullname"
				},
				rules:{
   					step: [{//机构序号
   						required:true,
						trigger: 'blur',
						validator: validateStep,
					}],
					fullname: [{//机构名称
   						required:true,
						trigger: 'blur',
						validator: validateFullname,
					}],
					org_range: [{//选择机构类型
   						required:true,
						trigger: 'change',
						validator: validateOrgrange,
					}],
   					type: [{//选择机构属性
   						required:true,
						trigger: 'change',
						validator: validateType,
					}],
   					telephone: [{//电话
   						required:false,
						trigger: 'blur',
						validator: validatePhone,
					}],
					fax: [{//传真
   						required:false,
						trigger: 'blur',
						validator: validateFax,
					}],
					email: [{//邮箱
   						required:false,
						trigger: 'blur',
						validator: validateEmail,
					}],
					
	          	},
			};
		},
		methods: {
			//获取负责人数据
			getPerson(){
				this.requestData();
				this.dialogLeader = true;
			},
			SelChange(val) {
				this.selUser = val;
			},
			loadMore() {
				if(this.loadSign) {
					this.loadSign = false
					this.page.currentPage++
						if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
							return
						}
					setTimeout(() => {
						this.loadSign = true
					}, 1000)
					this.requestData()
					//console.log('到底了', this.page.currentPage)
				}
			},
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			judge(data) {
				//taxStatus 布尔值
				return data.enabled ? '活动' : '不活动'
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD"); 
			},
			addleader(){
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择数据',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
					return;
				} else {
					this.adddeptForm.leader = selData[0].id;
					this.adddeptForm.leaderDesc = selData[0].nickname;
					this.dialogLeader = false;
				}
			},
			//点击修订按钮
			modifyversion(){
				this.adddeptForm.version = this.adddeptForm.version + 1;
			},

			//所属上级
			getDept() {
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var url = this.basic_url + '/api-user/depts/treeMap';
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
				this.adddeptForm.parent = this.checkedNodes[0].fullname;
				
			},
			getCheckedNodes() {
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},
			
			//生成随机数函数
			rand(min,max) {
		        return Math.floor(Math.random()*(max-min))+min;
		    },
			getDEPT_TYPE() {//获取机构属性
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=DEPT_TYPE';
				this.$axios.get(url, {}).then((res) => {
					this.SelectDEPT_TYPE = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},
			getsys_depttype() {//获取机构类型
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=sys_depttype';
				this.$axios.get(url, {}).then((res) => {
					this.Selectsys_depttype = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},
			

			visible() {//点击父组件按钮显示弹窗
				this.$axios.get(this.basic_url +'/api-user/users/currentMap', {}).then((res) => {
	     			this.adddeptForm.enterby = res.data.nickname;
	     			var date=new Date();
					this.adddeptForm.enterdate = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				 }).catch((err) => {
				 	this.$message({
				 		message: '网络错误，请重试',
				 		type: 'error'
				 	});
				});	
				// this.$refs["adddeptForm"].resetFields();//清空表单验证
				this.show = !this.show;
				this.addtitle = true;
				this.modifytitle = false;
				this.modify = false;
				this.stopcontent = true;
				this.stopselect = false;
				this.showcode = false;
			},
			//修改
			detail() {
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
	    			this.adddeptForm.changeby = res.data.nickname;
	    			var date=new Date();
					this.adddeptForm.changedate = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");

				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});

				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.stopcontent = false;
				this.stopselect = true;
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
			//获取负责人数据
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					// deptName: this.searchList.deptName,
					// nickname: this.searchList.nickname,
					// username: this.searchList.username,
					companyId: this.companyId,
					deptId: this.deptId
				}
				var url = this.basic_url + '/api-user/users';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false
					} else {
						this.loadSign = true
					}
					this.commentArr[this.page.currentPage] = res.data.data
					let newarr = []
					for(var i = 1; i <= totalPage; i++) {

						if(typeof(this.commentArr[i]) != 'undefined' && this.commentArr[i].length > 0) {

							for(var j = 0; j < this.commentArr[i].length; j++) {
								newarr.push(this.commentArr[i][j])
							}
						}
					}

					this.userList = newarr;
				}).catch((wrong) => {})
			},
			//保存
			save(adddeptForm) {
				// console.log(this.adddeptForm);
				this.$refs[adddeptForm].validate((valid) => {
		          if (valid) {
		          	this.adddeptForm.status=((this.adddeptForm.status=="1"||this.adddeptForm.status=='活动') ? '1' : '0');
					var url = this.basic_url + '/api-user/depts/saveOrUpdate';
//					this.adddeptForm = {
//						 "id":this.adddeptForm.id,
//						 "pid":this.adddeptForm.pid,
//						 "fullname":this.adddeptForm.fullname,
//					     "simplename":this.adddeptForm.simplename,
//					    "type":this.adddeptForm.type,
//					    "code":this.adddeptForm.code,
//					     "teltphone":this.adddeptForm.teltphone,
//					     "tips":this.adddeptForm.tips
//					}
					// console.log(this.adddeptForm);
					this.$axios.post(url, this.adddeptForm).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
//							//重新加载数据
							this.$emit('request');
							// this.$refs["adddeptForm"].resetFields();//清空验证
						}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
					this.falg=true;
		          } else {
						this.show = true;
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
						this.falg = false;
					}
		        });
				
			},
			saveAndUpdate(adddeptForm){
				this.save(adddeptForm);
				if(this.falg){
					this.show = false;
				}
				this.$emit('request');
			},
			saveAndSubmit(adddeptForm){
				this.save(adddeptForm);
				this.$emit('reset');
				this.$emit('request');
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
			this.getDEPT_TYPE();//页面打开加载-机构属性
			this.getsys_depttype();//页面打开加载-机构类型
			this.requestData();
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