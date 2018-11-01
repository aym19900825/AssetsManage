<template>
	<div id="aaa" class="navbar-default navbar-static-side">
		<div id="sidebar-collapse">
			<div class="navbarbg">
				<span class="navbar-minimalize minimalize-styl-2" @click="min2max()">
					<i class="icon-menu1"></i> 
				</span>
			</div>
			<ul class="navs" id="side-menu" v-show="!isShow" >
				
				<li v-for="item in leftNavs">
					<a class="J_menuItem" :href="item.navherf" name="tabMenuItem" :key="index">
						<i :class="item.navicon"></i>
						<span class="nav-label" v-show="ismin">{{item.navtitle}}</span>
					</a>
				</li>


				<!-- <li>
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
				</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
//	import {hplus} from '../../../assets/js/hplus.js' 
//	

	export default {

		name: 'navs',
		data(){
			return{
				isShow:false,
				ismin:true,

				leftNavs: [
				{//leftNavs左侧菜单数据
		            navicon: 'icon-user',
		            navtitle: '用户管理',
		            navherf: '#1'
		          }, {
		            navicon: 'icon-role-site',
		            navtitle: '角色管理',
		            navherf: '#2'
		          }, {
		            navicon: 'icon-department',
		            navtitle: '部门管理',
		            navherf: '#3'
		          }, {
		            navicon: 'icon-menu2',
		            navtitle: '菜单管理',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-book',
		            navtitle: '字典管理',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-log',
		            navtitle: '业务日志',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-menu2',
		            navtitle: '菜单管理',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-login-log',
		            navtitle: '登陆日志',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-monitor',
		            navtitle: '监控管理',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-notice',
		            navtitle: '通知管理',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-menu2',
		            navtitle: '菜单管理',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-data',
		            navtitle: '数据库配置',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-time',
		            navtitle: '定时任务',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-word',
		            navtitle: 'Word测试',
		            navherf: '#4'
		          }
		        ]

			}
		},
		methods: {
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
			//还原按钮
			rebackDialog() {
					$(".navbar-static-side").css("width", "220px");
					$(".wrapper").css("padding-left","220px");

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



</style>