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
			<div class="ibox-content" :style="{height: fullHeight}">
				<el-form status-icon ref="personinfo" :model="personinfo" :rules="rules" label-width="80px" :label-position="labelPosition">
					<el-collapse v-model="activeNames">
						<el-collapse-item title="账号设置" name="1">
							<el-row :gutter="30">
								<el-col :span="8">
						 			<el-form-item label="登录名称">
						 				<el-input v-model="personinfo.username" disabled></el-input>
						 			</el-form-item>

						 			<el-form-item label="人员姓名" prop="nickname">
										<el-input v-model="personinfo.nickname"></el-input>
									</el-form-item>

									<el-form-item label="工号" prop="laborcode">
								    	<el-input v-model="personinfo.laborcode"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="登录口令">
					                      <el-input type="password" v-model="personinfo.password" disabled>
					                     		<el-button slot="append" icon="icon-edit" @click="editpassword"></el-button>
					                      </el-input>
					                </el-form-item>

					                <el-form-item label="职务" prop="post">
										<el-input v-model="personinfo.post"></el-input>
									</el-form-item>

									<el-form-item label="入职日期">
										<el-date-picker v-model="personinfo.workdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%">
										</el-date-picker>
					                </el-form-item>
								</el-col>

								<el-col :span="8" class="pt30">
									<el-upload class="avatar-uploader"
									action="https://jsonplaceholder.typicode.com/posts/"
									:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" title="上传头像">
									  <img v-if="headImgUrl" :src="headImgUrl" class="avatar">
									  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</el-col>
							</el-row>
							
						 	<!-- 第三行 -->
						 	<el-row :gutter="30">
								<el-col :span="8">
									<el-form-item label="所属机构" prop="deptID" v-if="personinfo.username === 'admin'">
										<el-input v-model="personinfo.deptID" disabled>
										<el-button slot="append" icon="icon-search" @click="getDept"></el-button>
										</el-input>
									</el-form-item>
									<el-form-item label="所属机构" prop="deptID" v-else>
										<el-input v-model="personinfo.deptID" disabled>
										</el-input>
									</el-form-item>
								</el-col>

								<el-col :span="8">
						 			 <el-form-item label="角色">
						 				<el-input v-model="personinfo.roles" disabled></el-input>
										</el-switch>
						 			</el-form-item>	
						 		</el-col>

						 		<el-col :span="8">
						 			 <el-form-item label="最高学历">
						 				<el-input v-model="personinfo.education" disabled></el-input>
										</el-switch>
						 			</el-form-item>	
						 		</el-col>
						 		
						 	</el-row>
						 	<!-- 第四行 -->
						 	<el-row :gutter="30">
						 		<el-col :span="9">
						 			 <el-form-item label="配置信息状态" v-model="personinfo.enabledName">
						 			 	<el-radio-group v-model="personinfo.enabledName">
									    	<el-radio label="启用" ></el-radio>
												<el-radio label="冻结" ></el-radio>
											</el-radio-group>
								  </el-form-item>	
						 		</el-col>
						 		<el-col :span="9">
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
						 	<el-row :gutter="30">
						 		<el-col :span="8">
						 			<el-form-item label="身份证号" prop="idnumber">
									    <el-input v-model="personinfo.idnumber"></el-input>
									  </el-form-item>
						 		</el-col>
						 		<el-col :span="8">
						 			<el-form-item label="性别">
						 			 	<el-radio-group v-model="personinfo.sex">
							 				<el-radio label="男"></el-radio>
							 				<el-radio label="女"></el-radio>
							 			</el-radio-group>
						 			</el-form-item>
						 		</el-col>
						 		<el-col :span="8">
						 			<el-form-item label="手机号" prop="phone">
										<el-input v-model="personinfo.phone"></el-input>
									</el-form-item>	
						 		</el-col>
						 	</el-row>
						 	<!-- 第二行 -->
						 	<el-row :gutter="30">
						 		<el-col :span="8">
						 			<el-form-item label="出生日期">
										<el-date-picker v-model="personinfo.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%">
									    </el-date-picker>
					                </el-form-item>
						 		</el-col>
						 		<el-col :span="8">
						 			<el-form-item label="联系电话" prop="telephone">
										<el-input v-model="personinfo.telephone"></el-input>
									</el-form-item>	
						 		</el-col>
						 		<el-col :span="8">
						 			<el-form-item label="电子邮箱" prop="email">
									    <el-input v-model="personinfo.email"></el-input>
									  </el-form-item>
						 		</el-col>
						 	</el-row>
						 	<!-- 第三行 -->
						 	<el-row :gutter="30">
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
						 	<!-- 第四行 -->
						 	<el-row :gutter="30">
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
	<!--右侧内容显示 End-->
  	<!--弹出框内容显示 Begin-->
	<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
		<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" check-strictly="true">
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

		    var checklaborcode = (rule, value, callback) => {//验证工号
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
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				headImgUrl: '',//头像上传
	            labelPosition: 'top',
	            dialogVisible: false, //对话框
	            personinfo:{
	          		laborcode:'',//工号
	          		companyId: '',//所属组织ID
	          		companyName: '',//所属组织
	          		deptId: '',//所属机构ID
	          		deptID: '',//所属机构
	          		nickname:'',//人员姓名
	          		username:'',//登录名称
	          		enabled:'',//配置信息状态
	          		enabledName:'',//配置信息状态名称
	          		password:'',//登录口令
	          		birthday:'',//出生日期
	          		sex:'',//性别
	          		sex:'',//性别名称
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
					label: "fullname"
				},
	          rules:{
		        nickname: [//required: true,必填标题加红*
		            { required: true, validator: checknickname, trigger: 'blur' }
		          ],
	          	laborcode: [
		            { required: true, validator: checklaborcode, trigger: 'blur' }
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
			this.getData();
		},
		
		methods: {  
			getData(){//获取当前用户信息
	    		var url = '/api/api-user/users/currentMap';
	    		this.$axios.get(url, {}).then((res) => {
	    			//console.log(res.data);
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
			
			getCompany() {//所属组织
				this.editSearch = 'company';
				var url = '/api/api-user/depts/type';
				this.$axios.get(url, {
				}).then((res) => {
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
					this.personinfo.companyName = this.checkedNodes[0].fullname;
				} else {
					this.personinfo.deptId = this.checkedNodes[0].id;
					this.personinfo.deptID = this.checkedNodes[0].fullname;
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
			            personinfo.sex = personinfo.sex == '男' ? 1 : 0;
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

