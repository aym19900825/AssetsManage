<template>
	<div id="aaa" class="navbar-default navbar-static-side">
		<EasyScrollbar>
			<div ref="homePagess2" style="height: 600px;">
				<div id="information" style="height: inherit;">
					<div class="navbarbg" @click="min2max()">
						<span class="navbar-minimalize minimalize-styl-2">
							<i class="icon-menu1"></i> 
						</span>
					</div>
					<ul class="navs" id="side-menu" v-show="!isShow" >
						<li v-for="item in leftNavs" @click="addClickNav(item)">
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
			fullHeight:{//给浏览器高度赋值
					height: '',
				},
			leftNavs: [//leftNavs左侧菜单数据
				{
					navicon: 'icon-distribution',
					navtitle: '客户管理',
					navherf: '/customer_management'
				}, {
					navicon: 'icon-file-text',
					navtitle: '产品类别',
					navherf: '/products_category'
				}, {
					navicon: 'icon-file-text',
					navtitle: '产品名称',
					navherf: '/products'
				}, {
					navicon: 'icon-file-text',
					navtitle: '检验/检测标准',
					navherf: '/testing_standard'
				}, {
					navicon: 'icon-file-text',
					navtitle: '检验/检测项目',
					navherf: '/testing_projects'
				}, {
					navicon: 'icon-file-text',
					navtitle: '检验/检测方法',
					navherf: '/testing_methods'
				}, {
					navicon: 'icon-file-text',
					navtitle: '自动编号设置',
					navherf: '/number_settings'
				}
			],
        selectedNav: {}
		}
	},
	
	methods: {
		addClickNav(item){
			if(!sessionStorage.getItem('clickedNav')){
				sessionStorage.setItem('clickedNav',JSON.stringify({arr:[]}));
			}
			var clickedNav = JSON.parse(sessionStorage.getItem('clickedNav')).arr;
			var flag = true;
			for(var i = 0; i < clickedNav.length; i++){
				if(item.navtitle == clickedNav[i].navtitle){
					flag = false;
				}
			}
			if(flag){
				clickedNav.push(item);
			}

			if(!sessionStorage.getItem('selectedNav')){
				sessionStorage.setItem('selectedNav',JSON.stringify({}));
			}
			var selectedNav = JSON.parse(sessionStorage.getItem('selectedNav'));
			
			selectedNav = item;
			sessionStorage.setItem('selectedNav',JSON.stringify(selectedNav));
			sessionStorage.setItem('clickedNav',JSON.stringify({arr:clickedNav}));
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