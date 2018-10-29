<template>
	<div id="aaa" class="navbar-default navbar-static-side">
		<div id="sidebar-collapse">
			<div class="navbarbg">
				<span class="navbar-minimalize minimalize-styl-2" @click="min2max()">
					<i class="icon-menu1"></i> 
				</span>
			</div>
			<ul class="navs" id="side-menu" v-show="!isShow" >

				<li>
					<a class="J_menuItem" href="/notice/hello" name="tabMenuItem">
						<i class="icon-user"></i>
						<span class="nav-label" v-show="ismin">用户管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="/swagger-ui.html" name="tabMenuItem">
						<i class="icon-role-site"></i>
						<span class="nav-label" v-show="ismin">角色管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-department"></i>
						<span class="nav-label" v-show="ismin">部门管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-menu2"></i>
						<span class="nav-label" v-show="ismin">菜单管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-book"></i>
						<span class="nav-label" v-show="ismin">字典管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-log"></i>
						<span class="nav-label" v-show="ismin">业务日志</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-login-log"></i>
						<span class="nav-label" v-show="ismin">登陆日志</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-monitor"></i>
						<span class="nav-label" v-show="ismin">监控管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-notice"></i>
						<span class="nav-label" v-show="ismin">通知管理</span>
					</a>
				</li>

				<li>
					<a class="J_menuItem" href="/notice/hello" name="tabMenuItem">
						<i class="icon-data"></i>
						<span class="nav-label" v-show="ismin">数据库配置</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="/swagger-ui.html" name="tabMenuItem">
						<i class="icon-time"></i>
						<span class="nav-label" v-show="ismin">定时任务</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-word"></i>
						<span class="nav-label" v-show="ismin">word测试</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
//	import {hplus} from '../../../assets/js/hplus.js' 
	export default {
		name: 'navs',
		data(){
			return{
				isShow:false,
				ismin:true,
			}
		},
		methods: {
			min2max(){ 
	        	if($(".navbar-static-side").width()=="220"){
			    	this.maxDialog();
			    }else if($(".navbar-static-side").width()=="60"){
				this.rebackDialog();
				}
			    this.ismin=!this.ismin;
	        
	   		},
	   		
		    maxDialog(e) {
		    	$(".navbar-static-side").css("width", "60px");
				
				
			},
			//还原按钮
			rebackDialog() {
					$(".navbar-static-side").css("width", "220px");
					

			},
	   		 SmoothlyMenu:function () {
	   		 	console.log(12121);
			    if (!$('#aaa').hasClass('mini-navbar')) {
			    	console.log(1)
			    	$('#side-menu').hide();
			       
			        console.log(2);
			        setTimeout(
			            function () {
			                $('#side-menu').fadeIn(500);
			            }, 100);
			    } else if ($('#aaa').hasClass('fixed-sidebar')) {
		        $('#side-menu').hide();
// 				     isShow
			        setTimeout(
			            function () {
			                $('#side-menu').fadeIn(500);
			            }, 300);
			    } else {
			        $('#side-menu').removeAttr('style');
			    }
			}

		},
		mounted() {

		}
	}
</script>

<style scoped>
	.navbar-static-side{
	float: left;
    width: 220px;
    height: 100%;
    position: fixed;
    background: linear-gradient(360deg,rgba(160, 120, 240, 1) 0%,rgba(65, 105, 218, 1) 100%);
    z-index: 1000;
}

.slimScrollDiv{
	position: relative;
    width: auto;
    height: 92%;
}

.navbarbg, .navbarbg a {
    color: #FFF;
}

.navbarbg {
    height: 40px;
    text-align: right;
    padding-right: 20px;
}
.navs>li {
    margin: 0px 10px;
}
.navs > li > a {
    color: #fff;
    display: block;
    padding: 14px 15px 14px 15px;
    border-radius:5px;
}

.navs > li > a:hover,.navs > li > a.current{background:rgba(97,131,226,.7);}

.navs > li > a i[class*=icon-] {
    font-size: 16px;
}
.navs > li > a i {
    margin-right: 6px;
}
.minimalize-styl-2 {
    font-size: 14px;
    color: #FFFFFF;
    line-height: 40px;
    cursor: pointer;
}
.nav>li {
    margin: 0px 10px;
}
.nav > li > a i[class*=icon-] {
    font-size: 16px;
}

.nav > li > a i {
    margin-right: 6px;
}
</style>