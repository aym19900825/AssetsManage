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
							<div class="mask_tab-block">
								<div class="mask_tab-head clearfix">
									<div class="accordion_title">
										<span class="accordion-toggle">账号设置</span>
									</div>
									<div class="col_but">
										<i class="icon-arrow1-down"></i>
									</div>
								</div>

								 <el-form status-icon ref="accuntsetting" :model="accuntsetting" :rules="rules" label-width="80px" :label-position="labelPosition">
								 	<el-row :gutter="70">
										<el-col :span="12">
										 	<el-row :gutter="70">
										 		<el-col :span="24">
										 			 <el-form-item label="人员姓名">
												    <el-input v-model="accuntsetting.personname"></el-input>
												  </el-form-item>	
										 		</el-col>
										 	</el-row>
										 	<el-row :gutter="70">
										 		<el-col :span="24">
										 			<el-form-item label="排序号">
													    <el-input v-model="accuntsetting.orders" placeholder="数字越大越在前"></el-input>
													  </el-form-item>
										 		</el-col>
										 	</el-row>
										</el-col>
										<el-col :span="12" class="pt20">
											<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
	  :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" title="上传头像">
											  <img v-if="imageUrl" :src="imageUrl" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											</el-upload>
										</el-col>
									</el-row>

								 	<el-row :gutter="70">
										<el-col :span="24">
											<el-form-item label="所属组织" prop="companyId">
												<el-input v-model="accuntsetting.companyId" disabled>
													<el-button slot="append" icon="el-icon-search" @click='companyLookup'></el-button>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>
								 	<!-- 第三行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="12">
								 			 <el-form-item label="登录名称">
								 				<el-input v-model="accuntsetting.username" disabled></el-input>
								 			</el-form-item>	
								 		</el-col>
								 		<el-col :span="12">
								 			 <el-form-item label="登录口令">
							                      <el-input type="password" v-model="accuntsetting.password" disabled></el-input>
							                </el-form-item>		
								 		</el-col>
								 	</el-row>
								 	<!-- 第四行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="12">
								 			 <el-form-item label="配置状态">
										    	<el-radio disabled v-model="accuntsetting.configstate" label="1">启用</el-radio>
  												<el-radio disabled v-model="accuntsetting.configstate" label="2">冻结</el-radio>
										  </el-form-item>	
								 		</el-col>
								 		<el-col :span="12">
								 			 <el-form-item label="登录方式">
											    <el-checkbox-group v-model="accuntsetting.logintype">
										      <el-checkbox label="口令登录" name="type"></el-checkbox>
										      <el-checkbox label="uKey" name="type"></el-checkbox>
										      <el-checkbox label="数字证书" name="type"></el-checkbox>
										    </el-checkbox-group>
										  </el-form-item>	
								 		</el-col>
								 	</el-row>


								 </el-form>	
							</div>

							<div class="content-footer">
								<button class="btn btn-default btn-large" @click="resetForm('accuntsetting')">重置</button>
							    <button class="btn btn-primarys btn-large" @click="submitForm('accuntsetting')">保存</button>
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
	import usermask from './common/user_mask.vue'

	export default {
		name: 'accuntsetting',
		components: {
			vheader,
			navs_header,
			navs,
//			navs_button,
			usermask
		},
		data() {
			var validatePass1 = (rule, value, callback) => {
                // var regName =/^[\u4e00-\u9fa5]{2,4}$/; 
                console.log(value);
                if (value === '') {
                    callback(new Error('必填'));}
                // } else if (!name.test(this.accuntsetting.name)) {
                //     callback(new Error('真实姓名填写有误'));
                // } 
                else {
                    callback();
                }
            };
			return {
			  show:false,			  
		      userList: [],
	          isShow: false,
	          ismin:true,
	          clientHeight:'',//获取浏览器高度
	          imageUrl: '',//头像上传
	          radio: '1',
	          value3: '',
	          value4: '',
	          value5: '',
	          value1:true,
	          value2: true,
	          labelPosition: 'top',
	          accuntsetting:
	          	{
	          		companyId: '北京恒信启华信息技术股份有限公司',
	          		personname:'超级管理员',
	          		orders:'10',
	          		username:'admin',
	          		configstate:'1',
	          		password:'admin',
	          		logintype: [],
	          	},
	          rules:{
	          	name:[
	          		{
	          			required: true,
	                    validator: validatePass1,
	                    trigger: 'blur'
	          		}
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
	    },
		
		methods: {  
			handleAvatarSuccess(res, file) {//上传头像
		        this.imageUrl = URL.createObjectURL(file.raw);
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
				console.log(this.accuntsetting);
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

