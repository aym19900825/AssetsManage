<template>
	<nav class="navbar-default navbar-static-side" role="navigation">
		<div class="sidebar-collapse">
			<div class="navbarbg">
				<a class="navbar-minimalize minimalize-styl-2" href="#"><i class="icon-menu1"></i> </a>
			</div>
			<ul class="nav" id="side-menu">

				<li>
					<a class="J_menuItem" href="/notice/hello" name="tabMenuItem">
						<i class="icon-user"></i>
						<span class="nav-label">用户管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="/swagger-ui.html" name="tabMenuItem">
						<i class="icon-role-site"></i>
						<span class="nav-label">角色管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-department"></i>
						<span class="nav-label">部门管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-menu2"></i>
						<span class="nav-label">菜单管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-book"></i>
						<span class="nav-label">字典管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-log"></i>
						<span class="nav-label">业务日志</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-login-log"></i>
						<span class="nav-label">登陆日志</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-monitor"></i>
						<span class="nav-label">监控管理</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-notice"></i>
						<span class="nav-label">通知管理</span>
					</a>
				</li>

				<li>
					<a class="J_menuItem" href="/notice/hello" name="tabMenuItem">
						<i class="icon-data"></i>
						<span class="nav-label">数据库配置</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="/swagger-ui.html" name="tabMenuItem">
						<i class="icon-time"></i>
						<span class="nav-label">定时任务</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-word"></i>
						<span class="nav-label">word测试</span>
					</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	export default {
		name: 'nav',
		data() {
			return {

			}
		},
		methods: {

		},
		mounted() {

		}
	}
</script>

<style scoped>
	@import './nav_left';
</style>