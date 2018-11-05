<template>
	<div>
	<div class="headerbg">
  		<vheader></vheader>
			<navs_header></navs_header>
	</div>
    <div class="contentbg">
		<div class="navbar-default navbar-static-side">
		<div id="sidebar-collapse">
			<div class="navbarbg">
				<span class="navbar-minimalize minimalize-styl-2" @click="min2max()">
					<i class="icon-menu1"></i> 
				</span>
			</div>
			<ul class="navs" id="side-menu" v-show="!isShow" >
				<li v-for="item in leftNavs">
					<router-link :to="item.navherf">
						<i :class="item.navicon"></i>
						<span class="nav-label" v-show="ismin">{{item.navtitle}}</span>
					</router-link>
					<!-- <a class="J_menuItem" :href="item.navherf" name="tabMenuItem" :key="index">
						<i :class="item.navicon"></i>
						<span class="nav-label" v-show="ismin">{{item.navtitle}}</span>
					</a> -->
				</li>

			</ul>
		</div>
	</div>


		<div class="wrapper wrapper-content">
			
				<EasyScrollbar>
        			<div id="wrapper" ref="homePagess" style="height: 600px;">
						<div id="information" style="height: inherit;">
							<div class="ibox-content">
								<el-form status-icon ref="personinfo" :model="personinfo" :rules="rules" label-width="80px" :label-position="labelPosition">
								<div class="mask_tab-block mb20">
									<div class="mask_tab-head clearfix">
										<div class="accordion_title">
											<span class="accordion-toggle">账号设置</span>
										</div>
										<div class="col_but">
											<i class="icon-arrow1-down"></i>
										</div>
									</div>

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
										<el-col :span="24">
											<el-form-item label="所属组织">
												<el-input v-model="personinfo.companyId" disabled>
												<el-button slot="append" icon="icon-search" @click=''></el-button>
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
							                      <el-button slot="append" icon="icon-edit" @click='editpassword'></el-button>
							                      </el-input>

							                </el-form-item>		
								 		</el-col>
								 	</el-row>
								 	<!-- 第四行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="12">
								 			 <el-form-item label="配置状态" v-model="personinfo.enabledname">
								 			 	<el-radio-group v-model="personinfo.enabledname">
											    	
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

								</div>

							<div class="mask_tab-block">
								<div class="mask_tab-head clearfix">
									<div class="accordion_title">
										<span class="accordion-toggle">基本资料</span>
									</div>
									<div class="col_but">
										<i class="icon-arrow1-down"></i>
									</div>
								</div>
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
							 	</el-row>
							 	<!-- 第二行 -->
							 	<el-row :gutter="70">
							 		<el-col :span="8">
							 			<el-form-item label="身份证号">
										    <el-input v-model="personinfo.idnumber"></el-input>
										  </el-form-item>
							 		</el-col>
							 		<el-col :span="8">
							 			 <el-form-item label="性别" prop="sex">
							 			 	<el-radio-group v-model="personinfo.sexname">
								 				<el-radio label="男"></el-radio>
								 				<el-radio label="女"></el-radio>
								 			</el-radio-group>
							 			</el-form-item>
							 		</el-col>
							 		
							 		
							 	</el-row>
							 	<!-- 第三行 -->
							 	<el-row :gutter="70">
							 		<el-col :span="8">
							 			 <el-form-item label="入职日期">
						                      <el-date-picker v-model="personinfo.workdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
										    </el-date-picker>
						                </el-form-item>		
							 		</el-col>
							 		<el-col :span="8">
							 			 <el-form-item label="参加工作时间">
						                      <el-date-picker v-model="personinfo.entrytime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
										    </el-date-picker>
						                </el-form-item>		
							 		</el-col>
							 		<el-col :span="8">
							 			<el-form-item label="电子邮箱" prop="email">
										    <el-input v-model="personinfo.email"></el-input>
										  </el-form-item>
							 		</el-col>
							 	</el-row>
							 	<!-- 第四行 -->
							 	<el-row :gutter="70">
							 		<el-col :span="8">
							 			 <el-form-item label="联系电话">
									    <el-input v-model="personinfo.tele"></el-input>
									  </el-form-item>	
							 		</el-col>
							 		<el-col :span="8">
							 			 <el-form-item label="手机号" prop="phone">
									    <el-input v-model="personinfo.phone"></el-input>
									  </el-form-item>	
							 		</el-col>
							 		<el-col :span="8">
							 			<el-form-item label="传真号">
										    <el-input v-model="personinfo.rex"></el-input>
										  </el-form-item>
							 		</el-col>
							 	</el-row>
							 	<!-- 第五行 -->
							 	<el-row :gutter="70">
							 		<el-col :span="16">
							 			 <el-form-item label="地址">
									    <el-input v-model="personinfo.address"></el-input>
									  </el-form-item>	
							 		</el-col>
							 		<el-col :span="8">
							 			<el-form-item label="邮编">
										    <el-input v-model="personinfo.code"></el-input>
										  </el-form-item>
							 		</el-col>
							 	</el-row>
							 	<!-- 第六行 -->
							 	<el-row :gutter="70">
							 		<el-col :span="24">
							 			 <el-form-item label="备注">
									    <el-input  type="textarea" :rows="3" v-model="personinfo.tips"></el-input>
									  </el-form-item>	
							 		</el-col>
							 	</el-row>
								</div>
							</el-form>
							<div class="content-footer">
								<button class="btn btn-default btn-large">取消</button>
								<button class="btn btn-primarys btn-large" @click="saveinfo">保存</button>
							</div>
							</div>
						</div>
					</div>
				</EasyScrollbar>
			
		</div>
		<usermask ref="child"></usermask>
	</div>
  
	</div>
</template>

<script>
	import vheader from './common/vheader.vue'
	import navs from './common/left_navs/nav_left.vue'
	import navs_header from './common/nav_tabs.vue'
	import tablediv from './common/tablelist.vue'
	import usermask from './common/user_mask.vue'

	export default {
		name: 'personinfo',
		components: {
			vheader,
			navs_header,
			navs,
//			navs_button,
			tablediv,
			usermask,
			tablediv
		},
		data() {
		    

		      var checknickname= (rule, value, callback) => {
		        if (value === '') {
		          return callback(new Error('人员姓名不能为空'));
		        }
		        setTimeout(() => {
		          callback();
		        }, 1000);
		      };

		      var checkworknumber = (rule, value, callback) => {
		        if (!value) {
		          return callback(new Error('工号不能为空'));
		        }
		        setTimeout(() => {
		          if (!/^.{4,18}$/g.test(value)) {
		            callback(new Error('工号长度不能少于4个字符且大于18个字符'));
		          } else {
		              callback();
		          }
		        }, 1000);
		      };

		      var checkemail = (rule, value, callback) => {
		       if (value === '') {
		          callback(new Error('电子邮箱不能为空'));
			        } else if (value !== '') {
			          var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			            if(!reg.test(value)){
			              callback(new Error('请输入有效的邮箱'));
			            }
			        } else {
			          callback();
			        }
		        };


		      var checkphone = (rule, value, callback) => {
		        if (value === '') {
		          return callback(new Error('手机号不能为空'));
		        }
		        setTimeout(() => {
		          if (value !== '') {
		            var reg=/^1[3456789]\d{9}$/;
			            if(!reg.test(value)){
			              callback(new Error('请输入有效的手机号码'));
			            }
		              callback();
		          }
		        }, 1000);
		      };
			return {
				show:false,			  
				userList: [],
				isShow: false,
				ismin:true,
				clientHeight:'',//获取浏览器高度
				headImgUrl: '',//头像上传
	          labelPosition: 'top',
	          personinfo:
	          	{
	          		worknumber:'',//当前用户ID号
	          		companyId: '',//所属组织
	          		nickname:'',//人员姓名
	          		username:'',//登录名称
	          		enabled:'',//配置状态
	          		enabledname:'',//配置状态名称
	          		password:'',//登录口令
	          		logintype: [],//登录方式
	          		birthday:'',//出生日期
	          		sex:'',//性别
	          		sexname:'',//性别名称
	          		idnumber:'',//身份证号
	          		roles:'',//角色
	          		entrytime:'',//入职日
	          		email:'',//邮箱
	          		phone:'',//手机
	          		address:'',//地址
	          		tips:'',//备注
	          		//rex:'',//传真号
	          		//orders:'',//排序号
	          		//workdate:'',//参加工作时间
	          		//tele:'',//联系电话
	          		//code:'',//邮编
	          	},
	          	
	          rules:{
		        nickname: [
		            { validator: checknickname, trigger: 'blur' }
		          ],
	          	worknumber: [
		            { validator: checkworknumber, trigger: 'blur' }
		          ],
		        email: [
		            { validator: checkemail, trigger: 'blur' }
		          ],
		        phone: [
		            { validator: checkphone, trigger: 'blur' }
		          ]
	          },
	          leftNavs: [
				{//leftNavs左侧菜单数据
		            navicon: 'icon-role-site',
		            navtitle: '账号设置',
		            navherf: '/accuntsetting'
		          }, {
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
	      this.getData();//调用getData
	      
	    },
		
		methods: {  
			getData(){
    		var url = '/api/auth-server/oauth/userinfo';
    		this.$axios.get(url, {}).then((res) => {//获取当前用户信息
    			console.log(res.data.user);
    			this.personinfo=res.data.user;
			}).catch((err) => {
				this.$message({
					message: '网络错误，请重试',
					type: 'error'
				});
			});
    	},
    	
    	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	console.log(this.personinfo);
            var userid = this.personinfo.id;
            var username = this.personinfo.username;
            var url = '/api/api-user/users/me';
            this.$axios.put(url, {
            		id: userid,
            		username: username
            }).then((res) => {
            	console.log(res);
				//resp_code == 0是后台返回的请求成功的信息
				if(res.data.resp_code == 0) {
					this.$message({
						message: '修改成功',
						type: 'success'
					});
				} else {
					if(res.data.resp_code == 1) {
						this.$message({
							message: res.data.resp_msg,
							type: 'error'
						});
					}
				}


			}).catch((err) => {
				this.$message({
					message: '网络错误，请重试',
					type: 'error'
				});
			});


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

			handleAvatarSuccess(res, file) {//上传头像
		        this.headImgUrl = URL.createObjectURL(file.raw);
		    },
		      beforeAvatarUpload(file) {
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
		      editpassword(){//点击按钮跳转到修改密码页
		      	this.$router.push({path: '/passwordedit'})
		      },
			min2max(){ 
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
	   		
		    maxDialog(e) {
		    	$(".navbar-static-side").css("width", "40px");
				$(".wrapper").css("padding-left", "40px");
				$(".navs>li").css("margin", "0");
			},
			//还原按钮
			rebackDialog() {
				$(".navbar-static-side").css("width", "220px");
				$(".wrapper").css("padding-left", "220px");
				$(".navs>li").css("margin", "0px 10px");
			},
			saveinfo(){
				console.log(this.personinfo);
			}
		},
	}
</script>

<style scoped>
@import '../assets/css/mask-modules.css';

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

