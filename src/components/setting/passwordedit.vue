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
					<li v-for="item in leftNavs">
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
				<el-collapse v-model="activeNames">
					<el-collapse-item title="修改密码" name="1">
						<el-form :model="passwordedit" status-icon :rules="rules2" ref="passwordedit" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
							  <el-form-item label="当前用户" prop="username">
							    <el-input v-model.number="passwordedit.username" disabled></el-input>
							  </el-form-item>
							  <el-form-item label="原始密码" prop="oldpassword">
							    <el-input type="password" v-model.number="passwordedit.oldpassword"></el-input>
							  </el-form-item>
							  <el-form-item label="密码" prop="newpassword">
							    <el-input type="password" v-model="passwordedit.newpassword" autocomplete="off"></el-input>
							  </el-form-item>
							  <el-form-item label="确认密码" prop="checkPass">
							    <el-input type="password" v-model="passwordedit.checkPass" autocomplete="off"></el-input>
							  </el-form-item>
						</el-form>
					</el-collapse-item>
				</el-collapse>
				<div class="dialog-footer">
				    <button class="btn btn-default btn-large" @click="tips('passwordedit')">重置</button>
				    <button class="btn btn-primarys btn-large" @click="submitForm('passwordedit')">保存</button>
				</div>
			</div>
		</div>
		<!--右侧内容显示 End-->
	</div>

</div>
</template>

<script>
import Config from '../../config.js'
import vheader from '../common/vheader.vue'
import navs from '../common/left_navs/nav_left.vue'
import navs_header from '../common/nav_tabs.vue'

export default {
	name: 'passwordedit',
	components: {
		vheader,
		navs_header,
		navs
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
			} else if (value !== this.passwordedit.newpassword) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			basic_url: Config.dev_url,
			activeNames: ['1'],//手风琴数量
			show:false,			  
			userList: [],
			isShow: false,
			ismin:true,
			fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
			labelPosition: 'top',
			passwordedit: {
				username: '',
				oldpassword: '',//原始密码
				newpassword: '',//新密码
				checkPass: ''//确认新密码
			},
	        rules2: {
				oldpassword: [
					{ validator: checkOldpassword, trigger: 'blur' }
				],
				newpassword: [
					{ validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ validator: validatePass2, trigger: 'blur' }
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
		};

    },
    methods: {
    	getData(){
    		var url = this.basic_url + '/api-user/users/currentMap';
    		this.$axios.get(url, {}).then((res) => {//获取当前用户信息
				this.passwordedit.username = res.data.username;
				this.passwordedit.id = res.data.id;
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
		            var userid = this.passwordedit.id;
		            var oldpassword = this.passwordedit.oldpassword;
		            var newpassword= this.passwordedit.newpassword;
		            var url = this.basic_url + '/api-user/users/password';
		            this.$axios.put(url, {
	            		id: userid,
	            		oldPassword: oldpassword,
	            		newPassword: newpassword
					}).then((res) => {
						if(res.data.resp_code == 0) {//resp_code == 0是后台返回的请求成功的信息
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
					});
				} else {
					return false;
				}
			});
		},
		tips(formName) {//重置按钮
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
    mounted(){
		this.getData();
	},
}
</script>

<style scoped>
@import '../../assets/css/mask-modules.css';

</style>
