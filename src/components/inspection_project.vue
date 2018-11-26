<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header></navs_header>
	</div>
	<div class="contentbg">
		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content wrapperall">
			<div class="ibox-content">
				<!--部门名称 Begin-->
				<el-row :gutter="30">
					<el-col :span="24" class="text-center">
						<el-form :inline="true" :model="formInline">
							<el-form-item label="部门名称">
								<el-select v-model="formInline.station" placeholder="请选择部门">
									<el-option v-for="item in stations" :key="item.value" :label="item.label" :value="item.value">
									<span style="float: left">{{ item.label }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<!--部门名称 End-->
				<el-row style="width:2100px">
					<el-col :span="6" :style="fullHeight">
						<productType2 ref="child"></productType2>
					</el-col>
					<el-col :span="6" :style="fullHeight">
						<product2 ref="child"></product2>
					</el-col>
				</el-row>
			
			</div>
		</div>
	<!--右侧内容显示 End-->
	</div>
</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs_header from './common/nav_tabs.vue'
	import productType2 from './inspection_project/productType2.vue'
	import product2 from './inspection_project/product2.vue'
	export default {
		name: 'inspection_project',
		components: {
			vheader,
			navs_header,
			productType2,
			product2
		},
		data() {
			return {
				formInline: {
					station: '金化站'
				},
				stations: [{
					value: 'Jinhua',
					label: '金化站'
					}, {
					value: 'Yunbao',
					label: '运包站'
					}, {
					value: 'Tonghao',
					label: '通号站'
					}, {
					value: 'Jiliang',
					label: '机辆站'
					}, {
					value: 'Jiechuwang',
					label: '接触网站'
					}],
				station: '',
      			fullHeight:{//给浏览器高度赋值
					height: '',
				},
				
			}
		},
		methods: {
			
			
		},
		
		mounted() {
			window.onresize = () => {//获取浏览器可视区域高度
			 	return (() => {
			 		this.fullHeight.height = document.documentElement.clientHeight - 100+'px';
			 	})()
			 }
		},
	}
</script>

<style>

.el-card__header {
	padding-top: 10px;
	padding-bottom: 10px;
}
.item {
	font-size: 14px;
	margin-bottom: 18px;
}
.table-func {
	position:relative;
	top: 0px;
    right: 0px;
}
.box-card {
	width: 500px;
}

.el-table .cell {
    display: inline-block;
	cursor: pointer;
}
</style>