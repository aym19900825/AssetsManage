<template>
	<div id="aaa" class="navbar-default navbar-static-side">
		<EasyScrollbar>
			<div ref="homePagess2" style="height: 600px;">
				<div id="information" style="height: inherit;">
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
		</EasyScrollbar>
	</div>
</template>

<script>
export default {
	name: 'navs',
	data(){
		return{
			isShow:false,
			ismin:true,
			clientHeight2:'',//获取浏览器高度
			leftNavs: [//leftNavs左侧菜单数据
				{
		            navicon: 'icon-user',
		            navtitle: '用户管理',
		            navherf: '/user_management'
				}, {
		            navicon: 'icon-role-site',
		            navtitle: '角色管理',
		            navherf: '#2'
				}, {
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
				}, {
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
	mounted() {
		// 获取浏览器可视区域高度
		var _this = this;
		var clientHeight2 = $(window).height() - 100;    //document.body.clientWidth;
		_this.$refs.homePagess2.style.height = clientHeight2 + 'px';
		window.onresize = function() {
			var clientHeight2 = $(window).height() - 100;
			_this.$refs.homePagess2.style.height = clientHeight2 + 'px';
		};
	}
}
</script>

<style scoped>

</style>