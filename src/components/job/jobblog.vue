<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单调用 Begin-->
			<navs_left></navs_left>
			<!--左侧菜单调用 End-->

			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content">
				<el-row :gutter="10">
					<el-col :span="24">
						<iframe src="http://192.168.1.169:8888/joblog" id="flowIframe" width="100%" :height="fullHeight"  frameborder="0" scrolling="no" >
				   		</iframe>
				   	</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	export default {
		name: 'jobblog',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs_left': navs_left,
		},
		data() {
			return{
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	
</style>