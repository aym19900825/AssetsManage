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
					<router-link :to="item.navherf">
						<i :class="item.navicon"></i>
						<span class="nav-label" v-show="ismin">{{item.navtitle}}</span>
					</router-link>
				</li>
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
		            navherf: '/user_management'
		          }, {
		            navicon: 'icon-role-site',
		            navtitle: '角色管理',
		            navherf: '#2'
		          },
		           {
		            navicon: 'icon-department',
		            navtitle: '部门管理',
		            navherf: '/dept_management'
		          }, {
		            navicon: 'icon-menu2',
		            navtitle: '菜单管理',
		            navherf: '/menu_management'
		          }, {
		            navicon: 'icon-wordbook',
		            navtitle: '字典管理',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-log',
		            navtitle: '业务日志',
		            navherf: '#4'
		          },  {
		            navicon: 'icon-login-log',
		            navtitle: '登录日志',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-monitor',
		            navtitle: '监控管理',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-notice',
		            navtitle: '通知管理',
		            navherf: '#4'
		          }, 
		      
		          {
		            navicon: 'icon-data',
		            navtitle: '数据库配置',
		            navherf: '/data_management'
		          }, {
		            navicon: 'icon-time',
		            navtitle: '定时任务',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-word',
		            navtitle: 'Word测试',
		            navherf: '#4'
		          }, {
		            navicon: 'icon-safe',
		            navtitle: '安全管理',
		            navherf: '/safe_management'
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