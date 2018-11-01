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
										<span class="accordion-toggle">修改密码</span>
									</div>
									<div class="col_but">
										<i class="icon-arrow1-down"></i>
									</div>
								</div>


								 <el-form status-icon ref="passwordedit" :model="passwordedit" :rules="rules" label-width="80px" :label-position="labelPosition">
								 	<!-- 第一行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="24">
								 			 <el-form-item label="原始密码" prop="oldpassword">
											    <el-input v-model="passwordedit.oldpassword" type="password"></el-input>
											  </el-form-item>	
								 		</el-col>
								 	</el-row>
								 	<!-- 第二行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="24">
								 			 <el-form-item label="新密码" prop="newpassword">
										    <el-input v-model="passwordedit.newpassword" type="password"></el-input>
										  </el-form-item>	
								 		</el-col>
								 	</el-row>
								 	<!-- 第三行 -->
								 	<el-row :gutter="70">
								 		<el-col :span="24">
								 			 <el-form-item label="新密码确认" prop="checkPass">
								 				<el-input v-model="passwordedit.checknewpassword" type="password"></el-input>
								 			</el-form-item>	
								 		</el-col>
								 	</el-row>

								 </el-form>	
							</div>

							<div class="content-footer">
								<button class="btn btn-default btn-large" @click="resetForm('ckeditpassword')">重置</button>
								<button type="primary" class="btn btn-primarys btn-large" @click="ckeditpassword">保存</button>
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
		name: 'passwordedit',
		components: {
			vheader,
			navs_header,
			navs,
			tablediv,
			usermask,
			tablediv
		},
		data() {
			
			var validatePass1 = (rule, value, callback) => {
                // var regName =/^[\u4e00-\u9fa5]{2,4}$/; 
                console.log(value);
                if (value === '') {
                    callback(new Error('必填'));}
                // } else if (!name.test(this.passwordedit.name)) {
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
	          labelPosition: 'top',

	          passwordedit:
	          	{
	          		password:'admin',
	          		newpassword:'',
	          		checknewpassword:'',
	          	},
	          rules:{
	          	newpassword: [
		            { validator: validatePass, trigger: 'blur' }
		          ],
		          checknewpassword: [
		            { validator: validatePass2, trigger: 'blur' }
		          ],
		          password: [
		            { validator: oldpassword, trigger: 'blur' }
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
			ckeditpassword() {
			var changePassword = selData[0];
					var url = '/api/api-user/users/password';
					this.$axios.put(url, {}).then((res) => {//.put 传数据方法
						//resp_code == 0是后台返回的请求成功的信息
						if(valid) {
							this.$message({
								message: '修改成功',
								type: 'success'
							});
							this.requestData();
						}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
			},
			min2max(){//左侧菜单伸缩效果
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
		    maxDialog(e) {//缩小效果
		    	$(".navbar-static-side").css("width", "40px");
				$(".wrapper").css("padding-left", "40px");
				$(".navs>li").css("margin", "0");
			},
			rebackDialog() {//还原正常大小
				$(".navbar-static-side").css("width", "220px");
				$(".wrapper").css("padding-left", "220px");
				$(".navs>li").css("margin", "0px 10px");
			},
			saveinfo(){
				console.log(this.passwordedit);
			}
		},
	}
</script>

<style scoped>
@import '../assets/css/mask-modules.css';



</style>

