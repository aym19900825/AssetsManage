<template>
<div>
	<div class="headerbg">
			<vheader></vheader>
		<navs_header></navs_header>
	</div>

    <div class="contentbg">
		<!--右侧内容显示 Begin-->
		<div class="wrapper-content">
			<EasyScrollbar>
				<div id="wrapper" ref="homePagess" style="height: 600px;">
					<div id="information" style="height: inherit;">
						<div class="ibox-content">
							<el-row :gutter="20" class="applist">
								<!--APP应用列表 Begin-->
								<el-col :span="4" v-for="item in applistdata">
									<div class="applistbg">
										<router-link :to="item.navherf">
											<span><i :class="item.navicon"></i></span>
											<font>{{item.navtitle}}</font></a>
										</router-link>
									</div>
								</el-col>
								<!--APP应用列表 End-->
							</el-row>
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
import vheader from './common/vheader.vue'
import navs_header from './common/nav_tabs.vue'

export default {
	name: 'index',
		components: {
			vheader,
			navs_header,
		},

    data() {
      return {
        show: false,
		clientHeight:'',//获取浏览器高度
		applistdata: [//APP应用数据
			{
				navicon: 'icon-device',
				navtitle: '设备管理',
				navherf: '/personinfo'
			}, {
				navicon: 'icon-purchase',
				navtitle: '采购管理',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-worklist',
				navtitle: '工单管理',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-inventory',
				navtitle: '库存管理',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-preventive',
				navtitle: '预防性维护',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-safe',
				navtitle: '安全管理',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-contract',
				navtitle: '合同管理',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-inspection',
				navtitle: '点巡检',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-reporting',
				navtitle: '故障提报',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-plan',
				navtitle: '作业计划',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-kpi',
				navtitle: 'KPI统计',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-distribution',
				navtitle: '派工管理',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-project',
				navtitle: '项目管理',
				navherf: '/passwordedit'
			}, {
				navicon: 'icon-map',
				navtitle: '地图',
				navherf: '/passwordedit'
			}
		]
      }
    },
    mounted(){
		// 获取浏览器可视区域高度
		var _this = this;
		var clientHeight = $(window).height() - 100;    //document.body.clientWidth;
		_this.$refs.homePagess.style.height = clientHeight + 'px';
		window.onresize = function() {
			var clientHeight = $(window).height() - 100;
			_this.$refs.homePagess.style.height = clientHeight + 'px';
		};
		this.getData();
	},
	methods: {
		
		

	}
}

</script>

<style scoped>
@import '../assets/css/mask-modules.css';


</style>

