<template>
	<div class="pl20 pr20">
		<h3>应用中心图标</h3>
		<el-row :gutter="30">
			<el-col :span="6">
				<i class="icon-correct1">icon-correct1</i>
			</el-col>
			<el-col :span="6">
				<i class="icon-date-limit1">icon-date-limit1</i>
			</el-col>
			<el-col :span="6">
				<i class="icon-date-limit">icon-date-limit</i>
			</el-col>
			<el-col :span="6">
				<i class="icon-arrow2-down">icon-arrow2-down</i>
			</el-col>

			<el-col :span="6">
				<i class="icon-correct1">icon-correct1</i>
			</el-col>
			<el-col :span="6">
				<i class="icon-date-limit1">icon-date-limit1</i>
			</el-col>
			<el-col :span="6">
				<i class="icon-date-limit">icon-date-limit</i>
			</el-col>
			<el-col :span="6">
				<i class="icon-arrow2-down">icon-arrow2-down</i>
			</el-col>
		</el-row>
	</div>
</template>
<script>

	export default {
		name: 'all_icons',
		components: {

		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
	}
</script>

<style scoped>
	i[class*=" icon-"]:before,i[class^="icon-"]:before {
		margin-right: 5px;
	}

</style>