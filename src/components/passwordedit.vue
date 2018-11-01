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
								<el-form :model="passwordedit" status-icon :rules="rules2" ref="passwordedit" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
									<div class="mask_tab-head clearfix">
										<div class="accordion_title">
											<span class="accordion-toggle">修改密码</span>
										</div>
										<div class="col_but">
											<i class="icon-arrow1-down"></i>
										</div>
									</div>
									  <el-form-item label="原始密码" prop="oldpassword">
									    <el-input type="password" v-model.number="passwordedit.oldpassword"></el-input>
									  </el-form-item>
									  <el-form-item label="密码" prop="pass">
									    <el-input type="password" v-model="passwordedit.pass" autocomplete="off"></el-input>
									  </el-form-item>
									  <el-form-item label="确认密码" prop="checkPass">
									    <el-input type="password" v-model="passwordedit.checkPass" autocomplete="off"></el-input>
									  </el-form-item>
								</el-form>
							</div>
							<div class="content-footer">
							    <button class="btn btn-default btn-large" @click="resetForm('passwordedit')">重置</button>
							    <button class="btn btn-primarys btn-large" @click="submitForm('passwordedit')">保存</button>
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
	name: 'passwordedit',
	components: {
	vheader,
	navs_header,
	navs,
	usermask
	},
    data() {
      var checkOldpassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        setTimeout(() => {
          if (!/^.{5,16}$/g.test(value)) {
            callback(new Error('密码长度不能少于5个字符且不能大于16个字符'));
          } else {
              callback();
          }
        }, 1000);
      };

       var validatePass = (rule, value, callback) => {
        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else if (!/^.{5,16}$/g.test(value)) {
	          callback(new Error('密码长度不能少于5个字符且不能大于16个字符'));
	        } else {
	           if (this.passwordedit.checkPass !== '') {
	            this.$refs.passwordedit.validateField('checkPass');
	          }
	          callback();
	        }
        };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordedit.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
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
        passwordedit: {
          oldpassword: '',//原始密码
          pass: '',//新密码
          checkPass: ''//确认新密码
        },
        rules2: {
           oldpassword: [
            { validator: checkOldpassword, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
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
      };

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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = '/api/api-user/users/password';
            this.$axios.put(url, {}).then((res) => {
            	console.log(res);
				//resp_code == 0是后台返回的请求成功的信息
				if(res.data.resp_code == 0) {
					this.$message({
						message: '修改成功',
						type: 'success'
					});
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
    }
  }
</script>

<style scoped>
@import '../assets/css/mask-modules.css';



</style>
