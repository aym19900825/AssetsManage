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
			<EasyScrollbar>
				<div id="wrapper" :style="fullHeight">
					<div id="information" style="height: inherit;">
						<div class="ibox-content">
							<el-form status-icon ref="dictionaries" :model="dictionaries" :rules="rules" label-width="80px" :label-position="labelPosition">
								<el-collapse v-model="activeNames" @change="handleChange">
									<el-collapse-item title="字典管理" name="1">
										<el-row :gutter="30">
									 		<el-col :span="12">
												
									 		</el-col>
									 	
									 		<el-col :span="12">
									 			
									 		</el-col>
									 	</el-row>
									 	
										
									 	
									</el-collapse-item>
								</el-collapse>
							</el-form>
							<div class="content-footer">
								<button class="btn btn-default btn-large" @click="resetForm('dictionaries')">重置</button>
								<button class="btn btn-primarys btn-large" @click="submitForm('dictionaries')">保存</button>
							</div>
						</div>
					</div>
				</div>
			</EasyScrollbar>
		</div>
	</div>
	<!--右侧内容显示 End-->
  	
</div>
</template>

<script>
import vheader from '../common/vheader.vue'
import navs_header from '../common/nav_tabs.vue'
import navs_left from '../common/left_navs/nav_left5.vue'

export default {
	name: 'dictionaries',
		components: {
			vheader,
			navs_header,
			navs_left,
		},

    data() {
      return {
        activeNames: ['1'],//手风琴数量
		fullHeight:{//给浏览器高度赋值
					height: '',
				},
        labelPosition: 'top',//表单标题在上方显示
		
      }
    },
    mounted(){
			// 获取浏览器可视区域高度
			window.onresize = () => {//获取浏览器可视区域高度
		 	return (() => {
		 		this.fullHeight.height = document.documentElement.clientHeight - 100+'px';
		 	})()
		 };
			this.getData();
		},
  }

</script>

<style scoped>
@import '../../assets/css/mask-modules.css';


</style>

