<template>
<div>
	<div class="headerbg">
		<vheader @clickfun='getroId' ></vheader>
		<navs_header ref='navsheader'></navs_header>
	</div>

    <div class="contentbg">
		<!--右侧内容显示 Begin-->
		<div class="wrapper-content">
			<div id="information" :style="{height: fullHeight}">
				<div class="ibox-content pl20 pr20">
					<!--我的应用 Begin-->
					<div class="clearfix">
						<h3 class="pull-left">我的应用</h3>
					</div>
					<el-row :gutter="20" class="applist">
						<!--APPList Begin-->
						<el-col :span="4" v-for="(item,index) in applistdata" :key="index">
							<div class="applistbg" @click="goto(item)" :data-id='applistdata.id'>
								<router-link :to="item.url">
									<span><i :class="item.css"></i></span>
									<font>{{item.name}}</font>
								</router-link>
							</div>
						</el-col>
						<!--APPList End-->
					</el-row>
					<!--我的应用 End-->

					<!--工作统计 Begin-->
					<h3 class="pt30">工作统计</h3>
					<el-row :gutter="20" class="applist">
						<!--APPList Begin-->
						<el-col :span="6">
							<div class="statisticsbg">
								<div class="echart_title clearfix">
									<div class="pull-left">
										<h6>工作完成情况</h6>
									</div>
									<el-dropdown class="pull-right font13 blue">
										<span class="el-dropdown-link">
											近一周<i class="el-icon-arrow-down el-icon--right"></i>
										</span>
										<el-dropdown-menu slot="dropdown" class="pull-right">
											<el-dropdown-item>昨天</el-dropdown-item>
											<el-dropdown-item>近一周</el-dropdown-item>
											<el-dropdown-item>近一月</el-dropdown-item>
											<el-dropdown-item>近一年</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</div>
								<div class="pt40 clearfix">
									<div class="pull-left">
										<p class="big_numb">283</p>
										<p class="small_font">工作总计</p>
										<p class="middle_font pt10">
											待办工作: 32<br />
											执行中: 41
										</p>
									</div>
									<div class="pull-right pt10" style="width: 140px;">
										<div class="wracircle" data-anim="base wracircle">
											<div class="circle" data-anim="base left" style=""></div>
											<div class="circle_font">
												<p class="font20">46%</p>
												<p>工作完成率</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="statisticsbg">
								<div class="echart_title clearfix">
									<div class="pull-left">
										<h6>设备故障提报量</h6>
									</div>
									<el-dropdown class="pull-right font13 blue">
										<span class="el-dropdown-link">
											近一年<i class="el-icon-arrow-down el-icon--right"></i>
										</span>
										<el-dropdown-menu slot="dropdown" class="pull-right">
											<el-dropdown-item>昨天</el-dropdown-item>
											<el-dropdown-item>近一周</el-dropdown-item>
											<el-dropdown-item>近一月</el-dropdown-item>
											<el-dropdown-item class="">近一年</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</div>
								<div id="main" style="width: 100%; height: 140px;"></div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="statisticsbg">
								<div class="echart_title clearfix">
									<div class="pull-left">
										<h6>注册用户人数 (1000)</h6>
									</div>
									
								</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="statisticsbg">
								
							</div>
						</el-col>
						<!--APPList End-->
					</el-row>
					<!--工作统计 End-->
				</div>
			</div>
				
		</div>
	</div>
	<!--右侧内容显示 End-->
  	
</div>
</template>

<script>
import Config from '../config.js'
import vheader from './common/vheader.vue'
import navs_header from './common/nav_tabs.vue'
import  'echarts/theme/macarons.js'

export default {
	name: 'index',
		components: {
			vheader,
			navs_header,
		},

    data() {
      return {
      	roleid:1,
      	basic_url: Config.dev_url,
        show: false,
		fullHeight: document.documentElement.clientHeight - 100+'px',//获取浏览器高度
		applistdata: []

      }
    },
  
	methods: {
		goto(item){

	        var _this = this;
	        var data = {
				menuId: item.id,
				roleId: _this.$store.state.roleid,
			};
            this.$store.dispatch('setMenuIdAct',item.id);
			var url = _this.basic_url + '/api-user/menus/findSecondByRoleIdAndFisrtMenu';
			_this.$axios.get(url, {params: data}).then((res) => {
				console.log(res);
				if(res.data!="undefined"&&res.data.length>0){
					let item = res.data[0];
					_this.$store.dispatch('setSelectedNavAct',item);
//					_this.$selectedNav=item;
					var flag="1";
					for(var i=0;i<_this.$store.state.clickedNavs.length;i++){
						if(_this.$store.state.clickedNavs.length==1){
							flag="0";
						}else{
							if(typeof(_this.$store.state.clickedNavs[i].id)!=undefined&&i!=0){
							if(_this.$store.state.clickedNavs[i].id != item.id){
								flag="0";
							}else{
								flag="1";
								break;
							}
						}
						}
						
					}
					if(flag=="0"){
						_this.$store.state.clickedNavs.push(item);
					}
				}else{
					_this.$store.dispatch('setSelectedNavAct',item);
					_this.$store.state.clickedNavs.push(item);
				}
			}).catch((wrong) => {
			});
//		    _this.$store.dispatch('setRoleIdAct',this.$store.state.roleid);
		    _this.$store.dispatch('setNavIdAct',item.id);
		},
		initEchart(){//引入饼状图图表
			var myChart = this.$echarts.init(document.getElementById('main'),'macarons');
	        // 指定图表的配置项和数据
	        var option = {
	             xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [{
			        data: [820, 932, 901, 934, 1290, 1330, 1320],
			        type: 'line',
			        areaStyle: {}
			    }]
	        };
	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
		},
		 getroId(roleid){
		 	this.getFirstMenus(roleid);
		},
        //一级菜单
        getFirstMenus(roleid) {
//      	sessionStorage.setItem('roleid',roleid);
 			var roleid=this.$store.state.roleid;
	        var url = this.basic_url + '/api-user/menus/findFirstByRoleId/' + roleid;
	        
	        this.$axios.get(url, {}).then((res) => {
	            this.applistdata = res.data;
	        }).catch(error => {
	            console.log('请求失败');
	        })
        },
	},
	mounted(){
		//一级菜单
		this.initEchart();//调用饼状图图表函数名称
		this.$refs.navsheader.showClick({
                css: 'icon-user',
                name: '首页',
                url: '/index'})
		//默认请求roid
		if(this.$store.state.roleid==null||typeof(this.$store.state.roleid)==undefined){
			var url = this.basic_url + '/api-user/roles/default';
        	this.$axios.get(url, {}).then((res) => {
        	var roleid= res.data.id;
        	this.$store.dispatch('setRoleIdAct',res.data.id);
      		this.getFirstMenus(roleid);
      		}).catch(error => {
            console.log('请求失败111');
       		})
		}else{
			var roleid=this.$store.state.roleid;
	        var url = this.basic_url + '/api-user/menus/findFirstByRoleId/' + roleid;
	        
	        this.$axios.get(url, {}).then((res) => {
	            this.applistdata = res.data;
	        }).catch(error => {
	            console.log('请求失败');
	        })
		}
      	
	},
}

</script>

<style scoped>
@import '../assets/css/mask-modules.css';

/*工作统计*/
.echart_title {
	left: 15px;
	right: 15px;
	line-height:20px;
	padding-bottom: 10px;
	height: 35px;
	position: absolute;
	top: 15px;
	z-index: 80;
}
.big_numb { color: #333333; font-size: 28px; line-height:32px; }
.small_font { color: #BDBDBD; font-size:10px; line-height:15px;}
.middle_font { color: #121958; font-size: 12px;  line-height:20px;}




/*半圆统计图效果*/

.wracircle {
	width: 140px; /* Set the size of the progress bar */
	height: 140px;
	position: absolute; /* Enable clipping */
	transform:rotate(270deg);
	clip: rect(0px, 140px, 140px, 70px); /* Hide half of the progress bar */
}

/* Set the sizes of the elements that make up the progress bar */
.circle {
	width: 140px;
	height: 140px;
	border: 10px solid #9399F3;
	border-radius: 70px;
	position: absolute;
	z-index: 1;
	clip: rect(0px, 70px, 140px, 0px);
}
.wracircle:after {
	content: '';
	width: 140px;
	height: 140px;
	position: absolute;
	z-index: -1;
	border: 10px solid #EBF4F7;
	border-radius: 70px;
}
.circle_font {
	position: absolute;
	z-index: 6;
	width:100%;
	height: 55%;
	top: 30px;
	right: 0px;
	bottom: 0px;
	text-align: center; 
	transform:rotate(90deg);
}
.circle_font p {
	font-size: 12px;
}
.circle_font p.font20 {font-size: 20px;}
/* Using the data attributes for the animation selectors. */
/* Base settings for all animated elements */
div[data-anim~=base] {
  -webkit-animation-iteration-count: 1;  /* Only run once */
  -webkit-animation-fill-mode: forwards; /* Hold the last keyframe */
  -webkit-animation-timing-function:linear; /* Linear animation */
}

.wracircle[data-anim~=wracircle] {
  -webkit-animation-duration: 0.01s; /* Complete keyframes asap */
  -webkit-animation-delay: 3s; /* Wait half of the animation */
  -webkit-animation-name: close-wracircle; /* Keyframes name */
}
.circle[data-anim~=left] {
  -webkit-animation-duration: 1s; /* Full animation time */
  -webkit-animation-name: left-spin;
}
/* 改变工作完成情况数据，公式（180/100*n） */
@-webkit-keyframes left-spin {
	from {-webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(82deg);}
}

</style>

