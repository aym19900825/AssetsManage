<template>
<div>
	<div class="headerbg">
  		<vheader></vheader>
		<navs_header></navs_header>
	</div>
    <div class="contentbg">
	<!--左侧菜单调用 Begin-->
	<navs></navs>
	<!--左侧菜单调用 End-->

	<!--右侧内容显示 Begin-->
	<div class="wrapper wrapper-content">
		<EasyScrollbar>
			<div id="wrapper" ref="homePagess" style="height: 600px;">
				<div id="information" style="height: 640px;">
					<div class="ibox-content">
						<el-form status-icon ref="safemanage" :model="safemanage" :rules="rules" label-width="80px" :label-position="labelPosition">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="安全管理" name="1">
								<el-row :gutter="70">
									<el-col :span="12">
									 	<el-row :gutter="70">
									 		<el-col :span="24">
									 			 <el-form-item label="人员姓名" prop="nickname">
											    <el-input v-model="safemanage.nickname"></el-input>
											  </el-form-item>	
									 		</el-col>
									 	</el-row>
									 	<el-row :gutter="70">
									 		<el-col :span="24">
									 			<el-form-item label="工号" prop="worknumber">
											    	<el-input v-model="safemanage.worknumber"></el-input>
												</el-form-item>	
									 		</el-col>
									 	</el-row>
									</el-col>
									<el-col :span="12">
										
									</el-col>
								</el-row>

								<el-row :gutter="70">
									<el-col :span="12" >
										<el-form-item label="所属组织" prop="companyName" v-if="safemanage.username === 'admin'">
											<el-input v-model="safemanage.companyName" disabled>
											<el-button slot="append" icon="icon-search" @click="getCompany"></el-button>
											</el-input>
										</el-form-item>
										<el-form-item label="所属组织" prop="companyName" v-else>
											<el-input v-model="safemanage.companyName" disabled></el-input>
										</el-form-item>
									</el-col>

									<el-col :span="12">
										<el-form-item label="所属部门" prop="deptName" v-if="safemanage.username === 'admin'">
											<el-input v-model="safemanage.deptName" disabled>
											<el-button slot="append" icon="icon-search" @click="getDept"></el-button>
											</el-input>
										</el-form-item>
										<el-form-item label="所属部门" prop="deptName" v-else>
											<el-input v-model="safemanage.deptName" disabled>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
							 	<!-- 第三行 -->
							 	<el-row :gutter="70">
							 		<el-col :span="12">
							 			 <el-form-item label="登录名称">
							 				<el-input v-model="safemanage.username" disabled></el-input>
							 			</el-form-item>	
							 		</el-col>
							 		<el-col :span="12">
							 			 <el-form-item label="登录口令">
						                      <el-input type="password" v-model="safemanage.password" disabled>
						                      <el-button slot="append" icon="icon-edit" @click="editpassword"></el-button>
						                      </el-input>

						                </el-form-item>		
							 		</el-col>
							 	</el-row>
							 	<!-- 第四行 -->
							 	<el-row :gutter="70">
							 		<el-col :span="12">
							 			 <el-form-item label="配置状态" v-model="safemanage.enabledName">
							 			 	<el-radio-group v-model="safemanage.enabledName">
										    	<el-radio label="启用" ></el-radio>
													<el-radio label="冻结" ></el-radio>
												</el-radio-group>
									  </el-form-item>	
							 		</el-col>
							 		<el-col :span="12">
							 			 <el-form-item label="登录方式">
										    <el-checkbox-group v-model="safemanage.logintype">
										      <el-checkbox label="口令登录" name="type" checked disabled></el-checkbox>
										      <el-checkbox label="uKey" name="type" disabled></el-checkbox>
										      <el-checkbox label="数字证书" name="type" disabled></el-checkbox>
									    </el-checkbox-group>
									  </el-form-item>	
							 		</el-col>
							 	</el-row>
							</el-collapse-item>
						</el-collapse>
					</el-form>
					<div class="content-footer">
						<button class="btn btn-default btn-large" @click="resetForm('safemanage')">重置</button>
						<button class="btn btn-primarys btn-large" @click="submitForm('safemanage')">保存</button>
					</div>
					</div>
				</div>
			</div>
		</EasyScrollbar>
	</div>
	<usermask ref="child"></usermask>
	</div>
	<!--右侧内容显示 End-->
  	
</div>
</template>

<script>
	import vheader from './common/vheader.vue'
	import navs from './common/left_navs/nav_left.vue'
	import navs_header from './common/nav_tabs.vue'

	export default {
		name: 'safemanage',
		components: {
			vheader,
			navs_header,
			navs
		},
		
		data() {
		    var checknickname= (rule, value, callback) => {//验证人员姓名
		        if (value === '') {
		          return callback(new Error('人员姓名不能为空'));
		        }
		         callback();
		    };

			return {
				activeNames: ['1'],//手风琴数量
				show:false,	
				clientHeight:'',//获取浏览器高度
	            labelPosition: 'top',
	            safemanage:{
	          		worknumber:'',//工号
	          		companyId: '',//所属组织ID
	          		companyName: '',//所属组织
	          		deptId: '',//所属部门ID
	          		deptName: '',//所属部门
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
	          	},
	          rules:{
		        nickname: [//验证用户姓名
		            { validator: checknickname, trigger: 'blur' }
		          ]
	          }
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
			getData(){//获取当前用户信息
	    		var url = '/api/api-user/users/currentMap';
	    		this.$axios.get(url, {}).then((res) => {
	    			console.log(res.data);
	    			//res.data.enabled ? '启用' : '冻结';
	    			//res.data.sex ? '男' : '女';
	    			this.safemanage=res.data;
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
	    	submitForm(formName) {//修改当前用户信息
		        this.$refs[formName].validate((valid) => {
					if (valid) {
			            var url = '/api/api-user/users/me';
			            var safemanage=this.safemanage;
			            safemanage.sex = safemanage.sexName == '男' ? 1 : 0;
			            safemanage.enabled = safemanage.enabledName == '启用' ? 1 : 0;
			            console.log(this.safemanage)
			            this.$axios.put(url, this.safemanage).then((res) => {
							console.log(res.data.resp_code);
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								this.$emit('request')//重新加载数据
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

