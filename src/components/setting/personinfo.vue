<template>
<div>
	<div class="headerbg">
  		<vheader></vheader>
		<navs_header></navs_header>
	</div>
    <div class="contentbg">
    	<!--左侧菜单内容显示 Begin-->
		<div class="navbar-default navbar-static-side">
			<div id="sidebar-collapse">
				<div class="navbarbg">
					<span class="navbar-minimalize minimalize-styl-2" @click="min2max()">
						<i class="icon-menu1"></i> 
					</span>
				</div>
				<ul class="navs" id="side-menu" v-show="!isShow" >
					<li v-for="(item,index) in leftNavs" :key="index">
						<router-link :to="item.navherf">
							<i :class="item.navicon"></i>
							<span class="nav-label" v-show="ismin">{{item.navtitle}}</span>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<!--左侧菜单内容显示 End-->
		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content">
			<EasyScrollbar>
				<div id="wrapper" ref="homePagess" style="height: 600px;">
					<div id="information" style="height: 1200px;">
						<div class="ibox-content">
							<el-form status-icon ref="personinfo" :model="personinfo" :rules="rules" label-width="80px" :label-position="labelPosition">
							<el-collapse v-model="activeNames" @change="handleChange">
								<el-collapse-item title="账号设置" name="1">
									<el-row :gutter="70">
									<el-col :span="12">
									 	<el-row :gutter="70">
									 		<el-col :span="24">
									 			<el-form-item label="人员姓名" prop="nickname">
											    <el-input v-model="personinfo.nickname"></el-input>
											  </el-form-item>	
									 		</el-col>
									 	</el-row>
									 	<el-row :gutter="70">
									 		<el-col :span="24">
									 			<el-form-item label="工号" prop="worknumber">
											    	<el-input v-model="personinfo.worknumber"></el-input>
												</el-form-item>	
									 		</el-col>
									 	</el-row>
									</el-col>
									<el-col :span="12" class="pt20">
										<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
	:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" title="上传头像">
										  <img v-if="headImgUrl" :src="headImgUrl" class="avatar">
										  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
									</el-col>
								</el-row>

								<el-row :gutter="70">
									<el-col :span="12" >
										<el-form-item label="所属组织" prop="companyName" v-if="personinfo.username === 'admin'">
											<el-input v-model="personinfo.companyName" disabled>
											<el-button slot="append" icon="icon-search" @click="getCompany"></el-button>
											</el-input>
										</el-form-item>
										<el-form-item label="所属组织" prop="companyName" v-else>
											<el-input v-model="personinfo.companyName" disabled></el-input>
										</el-form-item>
									</el-col>

									<el-col :span="12">
										<el-form-item label="所属机构" prop="deptName" v-if="personinfo.username === 'admin'">
											<el-input v-model="personinfo.deptName" disabled>
											<el-button slot="append" icon="icon-search" @click="getDept"></el-button>
											</el-input>
										</el-form-item>
										<el-form-item label="所属机构" prop="deptName" v-else>
											<el-input v-model="personinfo.deptName" disabled>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
							 	<!-- 第三行 -->
							 	<el-row :gutter="70">
							 		<el-col :span="12">
							 			 <el-form-item label="登录名称">
							 				<el-input v-model="personinfo.username" disabled></el-input>
							 			</el-form-item>	
							 		</el-col>
							 		<el-col :span="12">
							 			 <el-form-item label="登录口令">
						                      <el-input type="password" v-model="personinfo.password" disabled>
						                      <el-button slot="append" icon="icon-edit" @click="editpassword"></el-button>
						                      </el-input>

						                </el-form-item>		
							 		</el-col>
							 	</el-row>
							 	<!-- 第四行 -->
							 	<el-row :gutter="70">
							 		<el-col :span="12">
							 			 <el-form-item label="配置状态" v-model="personinfo.enabledName">
							 			 	<el-radio-group v-model="personinfo.enabledName">
										    	<el-radio label="启用" ></el-radio>
													<el-radio label="冻结" ></el-radio>
												</el-radio-group>
									  </el-form-item>	
							 		</el-col>
							 		<el-col :span="12">
							 			 <el-form-item label="登录方式">
										    <el-checkbox-group v-model="personinfo.logintype">
												<el-checkbox label="口令登录" name="type" checked disabled></el-checkbox>
												<el-checkbox label="uKey" name="type" disabled></el-checkbox>
												<el-checkbox label="数字证书" name="type" disabled></el-checkbox>
									    	</el-checkbox-group>
									  </el-form-item>	
							 		</el-col>
							 	</el-row>
								</el-collapse-item>
								
								<el-collapse-item title="基本资料" name="2">
									<!-- 第一行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="8">
								 			 <el-form-item label="出生日期">
							                      <el-date-picker
											      v-model="personinfo.birthday"
											      type="date"
										      placeholder="选择日期" value-format="yyyy-MM-dd">
											    </el-date-picker>
							                </el-form-item>
								 		</el-col>
								 		<el-col :span="8">
								 			 <el-form-item label="角色">
								 				<el-input v-model="personinfo.roles" disabled></el-input>
												</el-switch>
								 			</el-form-item>	
								 		</el-col>
								 		<el-col :span="8">
								 			<el-form-item label="电子邮箱" prop="email">
											    <el-input v-model="personinfo.email"></el-input>
											  </el-form-item>
								 		</el-col>
								 	</el-row>
								 	<!-- 第二行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="8">
								 			<el-form-item label="身份证号" prop="idnumber">
											    <el-input v-model="personinfo.idnumber"></el-input>
											  </el-form-item>
								 		</el-col>
								 		<el-col :span="8">
								 			 <el-form-item label="性别">
								 			 	<el-radio-group v-model="personinfo.sexName">
									 				<el-radio label="男"></el-radio>
									 				<el-radio label="女"></el-radio>
									 			</el-radio-group>
								 			</el-form-item>
								 		</el-col>
								 		
								 		<el-col :span="8">
								 			 <el-form-item label="入职日期">
							                      <el-date-picker v-model="personinfo.workdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											    </el-date-picker>
							                </el-form-item>		
								 		</el-col>
								 	</el-row>
								 	<!-- 第三行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="8">
								 			 <el-form-item label="联系电话" prop="telephone">
										    <el-input v-model="personinfo.telephone"></el-input>
										  </el-form-item>	
								 		</el-col>
								 		<el-col :span="8">
								 			 <el-form-item label="手机号" prop="phone">
										    <el-input v-model="personinfo.phone"></el-input>
										  </el-form-item>	
								 		</el-col>
								 		
								 	</el-row>
								 	<!-- 第四行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="16">
								 			 <el-form-item label="地址">
										    <el-input v-model="personinfo.address"></el-input>
										  </el-form-item>	
								 		</el-col>
								 		<el-col :span="8">
								 			<el-form-item label="邮编" prop="zipcode">
											    <el-input v-model="personinfo.zipcode"></el-input>
											  </el-form-item>
								 		</el-col>
								 	</el-row>
								 	<!-- 第五行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="24">
								 			 <el-form-item label="备注">
										    <el-input  type="textarea" :rows="3" v-model="personinfo.tips"></el-input>
										  </el-form-item>	
								 		</el-col>
								 	</el-row>
								</el-collapse-item>
							</el-collapse>
						
						</el-form>
						<div class="content-footer">
							<button class="btn btn-default btn-large" @click="resetForm('personinfo')">重置</button>
							<button class="btn btn-primarys btn-large" @click="submitForm('personinfo')">保存</button>
						</div>
						</div>
					</div>
				</div>
			</EasyScrollbar>
		</div>
		<usermask ref="child"></usermask>
	</div>
	<!--右侧内容显示 End-->
  	<!--弹出框内容显示 Begin-->
	<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
		<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps">
		</el-tree>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="confirms();" >确 定</el-button>
	    </span>
	</el-dialog>
	<!--弹出框内容显示 End-->
</div>
</template>

<script>
	import vheader from '../common/vheader.vue'
	import navs_header from '../common/nav_tabs.vue'

	export default {
		name: 'personinfo',
		components: {
			vheader,
			navs_header,
		},
		data() {
		    var checknickname= (rule, value, callback) => {//验证人员姓名
		        if (value === '') {
		          return callback(new Error('人员姓名不能为空'));
		        }
		         callback();
		    };

		    var checkworknumber = (rule, value, callback) => {//验证工号
			    if (value === '') {
			          return callback(new Error('工号不能为空'));
			    } else {
					var targ = /^[A-Za-z0-9]+$/;
					if( !targ.test(value)){
	                    callback(new Error('工号只支持英文、数字'));
	                }
					callback();
				}	        
			};

		    var checkemail = (rule, value, callback) => {//验证电子邮箱
		        if (value === '') {
		            callback(new Error('电子邮箱不能为空'));
		        } else {
			        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			        if(!reg.test(value)){
			            callback(new Error('请输入有效的邮箱'));
			        }else{
			        	callback();
			        }
		        }
		    };
	    	var checktelephone = (rule, value, callback) => {//验证电话号码
	        	var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
	        	if (!reg.test(value)) {
			    	console.log(reg)
			    	callback(new Error('请输入有效的电话号码，格式为：0000-0000000'));
			    } else {
			    	callback();
			    }
		      };

		    var checkphone = (rule, value, callback) => {//验证手机号
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

			var checkidnumber = (rule, value, callback) => {//验证身份证号
				if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
  				    callback(new Error('身份证号码不符合规范'))
  				} else {
  				    callback()
  				}
		    };
		    var checkzipcode = (rule, value, callback) => {//验证邮政编码
		        if (value && (!(/^[0-9]{6}$/).test(value))) {
  				    callback(new Error('邮政编码不符合规范'))
  				} else {
  				    callback()
  				}
		    };

			return {
				editSearch: '',
				'启用': 1,
				'冻结': 0,
				'男': 1,
				'女': 0,
				activeNames: ['1','2'],//手风琴数量
				show:false,			  
				userList: [],
				isShow: false,
				ismin:true,
				clientHeight:'',//获取浏览器高度
				headImgUrl: '',//头像上传
	            labelPosition: 'top',
	            dialogVisible: false, //对话框
	            personinfo:{
	          		worknumber:'',//工号
	          		companyId: '',//所属组织ID
	          		companyName: '',//所属组织
	          		deptId: '',//所属机构ID
	          		deptName: '',//所属机构
	          		nickname:'',//人员姓名
	          		username:'',//登录名称
	          		enabled:'',//配置状态
	          		enabledName:'',//配置状态名称
	          		password:'',//登录口令
	          		birthday:'',//出生日期
	          		sex:'',//性别
	          		sexName:'',//性别名称
	          		idnumber:'',//身份证号
	          		roles:'',//角色
	          		entrytime:'',//入职日
	          		email:'',//邮箱
	          		phone:'',//手机
	          		address:'',//地址
	          		tips:'',//备注
	          		telephone:'',//联系电话
	          		zipcode:'',//邮编
	          		//logintype: [],//登录方式
	          		//rex:'',//传真号
	          		//orders:'',//排序号
	          		//workdate:'',//参加工作时间
	          	},
	          	resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
	          rules:{
		        nickname: [//required: true,必填标题加红*
		            { required: true, validator: checknickname, trigger: 'blur' }
		          ],
	          	worknumber: [
		            { required: true, validator: checkworknumber, trigger: 'blur' }
		          ],
		        email: [
		            { required: true, validator: checkemail, trigger: 'blur' }
		          ],
		        telephone: [
		            { validator: checktelephone, trigger: 'blur' }
		          ],
		        phone: [
		            { required: true, validator: checkphone, trigger: 'blur' }
		          ],
		        idnumber: [
		            { validator: checkidnumber, trigger: 'blur' }
		          ],
		        zipcode: [
		            { validator: checkzipcode, trigger: 'blur' }
		          ]
	          },
	          leftNavs: [//leftNavs左侧菜单数据
					{
			            navicon: 'icon-user',
			            navtitle: '个人资料',
			            navherf: '/personinfo'
			        }, {
			            navicon: 'icon-edit',
			            navtitle: '修改密码',
			            navherf: '/passwordedit'
			        }
		        ]
			}
		
		},
		mounted(){
			// 获取浏览器可视区域高度
			var _this = this;
			var clientHeight = $(window).height() - 100;    //document.body.clientWidth;
			_this.$refs.homePagess.style.height = clientHeight + 'px';
			window.onresize = function() {
				var clientHeight = $(window).height() - 100;
				_this.$refs.homePagess.style.height = clientHeight + 'px';
			};
			this.getData();
		},
		
		methods: {  
			getData(){//获取当前用户信息
	    		var url = '/api/api-user/users/currentMap';
	    		this.$axios.get(url, {}).then((res) => {
	    			console.log(res.data);
	    			//res.data.enabled ? '启用' : '冻结';
	    			//res.data.sex ? '男' : '女';
	    			this.personinfo=res.data;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
	    	},
			handleChange(val) {//手风琴开关效果调用
				console.log(val);
			},
			getCompany() {//所属组织
				this.editSearch = 'company';
				var url = '/api/api-user/depts/type';
				this.$axios.get(url, {
				}).then((res) => {
					console.log(res.data.data);
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});

			},
			getDept() {//所属机构
				this.editSearch = 'dept';
				var url = '/api/api-user/depts/type';
				this.$axios.get(url, {
				}).then((res) => {
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});
			},
			getRole() {//角色
				this.editSearch = 'roles';
				var url = '/api/api-user/roles';
				this.$axios.get(url, {
				}).then((res) => {
					console.log(res);
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});
			},
			getCheckedNodes() {//获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},
			confirms() {//弹出框确定按钮调用数据
				this.getCheckedNodes();
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.personinfo.companyId = this.checkedNodes[0].id;
					this.personinfo.companyName = this.checkedNodes[0].simplename;
				} else {
					this.personinfo.deptId = this.checkedNodes[0].id;
					this.personinfo.deptName = this.checkedNodes[0].simplename;
				}

			},
			handleClose(done) {//确认框关闭
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
	    	submitForm(formName) {//修改当前用户信息
		        this.$refs[formName].validate((valid) => {
					if (valid) {
			            var url = '/api/api-user/users/me';
			            var personinfo=this.personinfo;
			            personinfo.sex = personinfo.sexName == '男' ? 1 : 0;
			            personinfo.enabled = personinfo.enabledName == '启用' ? 1 : 0;
			            console.log(this.personinfo)
			            this.$axios.put(url, this.personinfo).then((res) => {
							console.log(res.data.resp_code);
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//this.$emit('request')//重新加载数据
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

			resetForm(formName) {//重置按钮调用
				this.$refs[formName].resetFields();
			},

			handleAvatarSuccess(res, file) {//上传头像
		        this.headImgUrl = URL.createObjectURL(file.raw);
		    },
		    beforeAvatarUpload(file) {//上传头像图片格式和大小验证
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		    },
		    editpassword(){//点击修改密码按钮跳转到修改密码页面
		      	this.$router.push({path: '/passwordedit'})
		    },
			min2max(){//左侧菜单正常和变小切换
	        	if($(".navbar-static-side").width()=="220"){
			    	$(".wrapper").css("padding-left", "220px");
			    	$(".navs>li").css("margin", "0px 10px");
			    	this.maxDialog();
			    }else if($(".navbar-static-side").width()=="40"){
					$(".wrapper").css("padding-left", "40px");
					$(".navs>li").css("margin", "0");
					this.rebackDialog();
				}
			    this.ismin=!this.ismin;
	   		},
		    maxDialog(e) {//右侧内容跟着左侧菜单正常和变小切换
		    	$(".navbar-static-side").css("width", "40px");
				$(".wrapper").css("padding-left", "40px");
				$(".navs>li").css("margin", "0");
			},
			rebackDialog() {//左侧菜单正常
				$(".navbar-static-side").css("width", "220px");
				$(".wrapper").css("padding-left", "220px");
				$(".navs>li").css("margin", "0px 10px");
			}
		},
	}
</script>

<style scoped>
@import '../../assets/css/mask-modules.css';

.avatar-uploader {
    border: 1px dashed #d9d9d9;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .avatar {
    width: 140px;
    height: 140px;
    display: block;
  }
 .avatar i {font-size: 50px; line-height:130px; color: #c0c4cc;}


</style>

