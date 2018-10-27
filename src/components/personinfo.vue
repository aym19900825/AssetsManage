<template>
	<div>
		<div class="headerbg">
      		<vheader></vheader>
  			<navs_header></navs_header>
    	</div>

    <div class="contentbg">
		<div id="aaa" class="navbar-default navbar-static-side" >
		<div id="sidebar-collapse">
			<div class="navbarbg">
				<a class="navbar-minimalize minimalize-styl-2" @click="minmax"><i class="icon-menu1"></i> </a>
			</div>
			<ul class="navs" id="side-menu" v-show="!isShow" >

				<li>
					<a class="J_menuItem" href="/notice/hello" name="tabMenuItem">
						<i class="icon-role-site"></i>
						<span class="nav-label">账号设置</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="/swagger-ui.html" name="tabMenuItem">
						<i class="icon-user"></i>
						<span class="nav-label">个人资料</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-edit"></i>
						<span class="nav-label">修改密码</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
		<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<div class="fixed-table-toolbar clearfix">
					
					</div>

				</div>

				<div class="row">

				</div>
			</div>
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
		name: 'user_management',
		components: {
			vheader,
			navs_header,
			navs,
//			navs_button,

			tablediv,
			usermask,
			tablediv
		},
    data(){
      return{
          userList: [],
          isShow:false,
      }
    },
		methods: {

		},
		data() {
			return {
				show:false,
			}
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
.headerbg { width:100%; height:100px; position: fixed; z-index: 999;}
.contentbg { padding-top: 100px; height: 100%; }
	.wrapper {
		width: 100%;
    height: 100%;
    padding-left: 220px;
    position: relative;
	}
	
	.ibox-content {
		background-color: #F5F8FB;
		color: inherit;
		padding: 0px 20px 20px 10px;
		border-color: #e7eaec;
		-webkit-border-image: none;
		-o-border-image: none;
		border-image: none;
		border-style: solid solid none;
		border-width: 1px 0px;
	}
	
	[class*=" btn-"],[class^="btn-"] {
	color: #FFFFFF;
	font-size: 14px;
}
[class*=" btn-"] i,[class^="btn-"] i {margin-right:5px;}

.btn-green {
    background-color: #25b99e;
    border-color: #25b99e;
}
.btn-bule {
    background-color: #2fa5e5;
    border-color: #2fa5e5;
}
.btn-red {
    background-color: #e3517c;
    border-color: #e3517c;
}
.btn-primarys {
    background-color: #5d7fde;
    border-color: #5d7fde;
}
.btn-default {
    background-color: #ffffff;
    color: #5B6371;
    border: 1px solid #dfe5ea;
}
.btn-default:hover { color: #576FAE; }


.fixed-table-toolbar{
	position: relative;
    padding-top: 10px;
    padding-bottom: 12px;
    height: 55px;
    line-height: 30px;
}


.fixed-table-toolbar .columns {
	position: relative;
	height: 30px;
}

.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.fixed-table-toolbar .btn-group>.btn-group {
    display: inline-block;
    margin-left: -1px!important;
}
.btn-group>.btn-group,.btn-group>.btn {
    float: left;
}
.btn-group, .btn-group-vertical {
    position: relative;
    display: inline-block;
    vertical-align: middle;
}
.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.fixed-table-toolbar .btn-group>.btn-group:last-child>.btn {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
</style>