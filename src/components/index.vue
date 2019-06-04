<template>
<div>
	<div class="headerbg">
		<vheader @clickfun='getroId' ref="vheader"></vheader>
		<navs_tabs ref='navsTabs'></navs_tabs>
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
								<span><i :class="item.css"></i></span>
								<font>{{item.name}}</font>
							</div>
						</el-col>
						<!--APPList End-->
					</el-row>
					<!--我的应用 End-->

					<!--工作统计 Begin-->
					<div class="clearfix pt30">
						<h3>工作统计</h3>
					</div>
					<el-row :gutter="20" class="applist">
						<!--APPList Begin-->
						<el-col :span="18">
							<el-tabs type="border-card">
								<el-tab-pane label="待办任务">
									<div id="todoLists" style="width:100%; height:220px;">
											<!-- 表格 -->
										<el-table ref="table" :data="todoList" :header-cell-style="rowClass" border stripe height="180" style="width: 100%;" :default-sort="{prop:'todoList', order: 'descending'}"
											v-loading="loading"
											element-loading-text="加载中…"
											element-loading-spinner="el-icon-loading"
											element-loading-background="rgba(255, 255, 255, 0.9)">
											<el-table-column label="单据号" sortable width="160px" prop="bizNum">
												<template slot-scope="scope">
													<p class="blue" title="点击查看详情" @click=audit(scope.row)>{{scope.row.bizNum}}
													</p>
												</template>
											</el-table-column>
											<el-table-column label="任务类型" sortable width="160px" prop="appDesc">
											</el-table-column>
											<el-table-column label="当前环节" sortable prop="name">
											</el-table-column>
											<el-table-column label="状态" sortable prop="bizDesc">
											</el-table-column>
											<el-table-column label="意见说明" sortable prop="description">
											</el-table-column>
											<el-table-column label="接收时间" sortable width="160px" prop="createTime">
											</el-table-column>
										</el-table>
										<el-pagination background class="text-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
										</el-pagination>
											<!-- 表格 -->
									</div>
								</el-tab-pane>
								<el-tab-pane label="已办任务">
									<div id="todoLists" style="width:100%; height:220px;">
											<!-- 表格 -->
										<el-table ref="table" :data="completeList" :header-cell-style="rowClass" border stripe height="180" style="width: 100%;" :default-sort="{prop:'completeList', order: 'descending'}"
											v-loading="loading"
											element-loading-text="加载中…"
											element-loading-spinner="el-icon-loading"
											element-loading-background="rgba(255, 255, 255, 0.9)">
											<el-table-column label="单据号" sortable width="160px" prop="bizNum">
												<template slot-scope="scope">
													<p class="blue" title="点击查看详情" @click=audit(scope.row)>{{scope.row.bizNum}}
													</p>
												</template>
											</el-table-column>
											<el-table-column label="任务类型" sortable width="160px" prop="appDesc">
											</el-table-column>
											<el-table-column label="当前环节" sortable prop="name">
											</el-table-column>
											<el-table-column label="状态" sortable prop="bizDesc">
											</el-table-column>
											<el-table-column label="意见说明" sortable prop="description">
											</el-table-column>
											<el-table-column label="完成时间" sortable width="160px" prop="createTime">
											</el-table-column>
										</el-table>
										<el-pagination background class="text-right pt10" @size-change="sizeChanges" @current-change="currentChanges" :current-page="page.currentPages" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSizes" layout="total, sizes, prev, pager, next" :total="page.totalCounts">
										</el-pagination>
											<!-- 表格 -->
									</div>
								</el-tab-pane>
							</el-tabs>
						</el-col>
						<el-col :span="6">
							<div class="statisticsbg" style="height: 290px">
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
										<p class="big_numb">{{this.toDoNumber +this.toDoFinish}}</p>
										<p class="small_font">工作总计</p>
										<div class="pt40">
											<p class="middle_font pt10">
												<span class="red">待办工作: {{this.toDoNumber}}</span>
												<span class="textblue">已办工作: {{this.toDoFinish}}</span>
											</p>
										</div>
									</div>
									<div class="pull-right" style=" padding-top: 30px;">
										<!-- <el-progress type="circle" :percentage="toDoNum/(toDoNum + toDoDing)*100" color="#9399F3"></el-progress> -->
											<el-progress type="circle" :percentage="this.ItemRate" color="#9399F3"></el-progress>
											<div class="wracircle" data-anim="base wracircle">
												<div class="circle" data-anim="base left" style=""></div>
												<div class="circle_font text-center">
													<p>工作完成率</p>
												</div>
										</div>
									</div>
								</div>
							</div>
						</el-col>
						<!-- <el-col :span="6">
							<div class="statisticsbg">
								<div class="echart_title clearfix">
									<div class="pull-left">
										<h6>工作总计处理量</h6>
									</div>
									<el-dropdown class="pull-right font13 blue">
										<span class="el-dropdown-link">
											近一年<i class="el-icon-arrow-down el-icon--right"></i>
										</span>
										<el-dropdown-menu slot="dropdown" class="pull-right">
											<el-dropdown-item>昨天</el-dropdown-item>
											<el-dropdown-item>近一周</el-dropdown-item>
											<el-dropdown-item>近一月</el-dropdown-item>
											<el-dropdown-item>近一年</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</div>
								<div id="main" style="width: 100%; height: 260px;"></div>
							</div>
						</el-col> -->
						<!-- <el-col :span="6">
							<div class="statisticsbg">
								<div class="echart_title clearfix">
									<div class="pull-left">
										<h6>注册用户人数 <font class="red">(1000)</font></h6>
									</div>
									<div class="pull-right font13 blue">
										<router-link :to="{path:'/user_management'}">更多<i class="el-icon-arrow-right el-icon--right"></i></router-link>
									</div>
								</div>
							</div>
						</el-col> -->
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
import navs_tabs from './common/nav_tabs.vue'
// import  'echarts/theme/macarons.js'

export default {
	name: 'index',
		components: {
			vheader,
			navs_tabs,
		},

    data() {
      return {
				toDoNumber: 0,//待办工作
				total: 0,//总计
				toDoFinish: 0,//已办任务
				ItemRate:0,//完成率
      	roleid:1,
      	basic_url: Config.dev_url,
      	loadSign: true, //鼠标滚动加载数据
      	loading: false,//默认加载数据时显示loading动画
        show: false,
				fullHeight: document.documentElement.clientHeight - 100+'px',//获取浏览器高度
				applistdata: [],
				todoList:[],
				completeList:[],
				searchList: {
					createTime:'',	
				},
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				url: window.location.href,//地址

				}
    },
		methods: {
			getTodoNumber() {//获取当前用户待办任务数
            var url = this.basic_url + '/api-apps/app/flow/flow/todoCounts';
            this.$axios.get(url, {}).then((res) => {
                this.toDoNumber = res.data.datas;
            }).catch(error => {
						});
						
			},
			getTodoFinish() {//获取当前用户已完成
					var url = this.basic_url + '/api-apps/app/flow/flow/completedItemCounts';
            this.$axios.get(url, {}).then((res) => {
                this.toDoFinish = res.data.datas;
            }).catch(error => {
            });
			},
			//完成率
			CompletedItemRate(){
				var url = this.basic_url + '/api-apps/app/flow/flow/findCompletedItemRate';
					this.$axios.get(url, {}).then((res) => {
							this.ItemRate = res.data.datas;
					}).catch(error => {
					});
			}	,
			//表头居中
			rowClass({ row, rowIndex}) {
					return 'text-align:center'
			},
			//审核	
			audit(item){
				this.$router.push({path:item.bizMenuUrl ,query: { bizId: item.bizId,}});
				this.$store.dispatch('setMenuIdAct',item.bizFirstMenuId);

			},
			//Table默认加载数据
			requestData() {
				//已办任务
				this.loading = true;//加载动画打开
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = this.basic_url + '/api-apps/app/flow/flow/todo';
				this.$axios.get(url, {params: data}).then((res) => {
					this.page.totalCount = res.data.count;
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize);
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false
					} else {
						this.loadSign = true
					}
					this.todoList = res.data.data;
					this.loading = false;//加载动画关闭
					
				}).catch((wrong) => {
					
					
				})
						
			},
			requestData1(){
					this.loading = true;//加载动画打开
					var datas = {
						page: this.page.currentPages,
						limit: this.page.pageSize,
					}
					var url = this.basic_url + '/api-apps/app/flow/flow/completedItems';
					this.$axios.get(url, {params: datas}).then((res) => {
						this.page.totalCounts = res.data.count;
						//总的页数
						let totalPage = Math.ceil(this.page.totalCounts / this.page.pageSizes);
						this.completeList = res.data.data;
						this.loading = false;//加载动画关闭
					}).catch((wrong) => {
						
						
					})
			},
        //已办任务
		
		
			//代办改变页数
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			//已办改变页数
			sizeChanges(val) {
				this.page.pageSizes = val;
				this.requestData1();
			},
			//当前页数
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			//已办当前页数
			currentChanges(val) {
				this.page.currentPages = val;
				this.requestData1();
			},
			goto(item){
				this.$store.dispatch('setMenuIdAct',item.id);
				var _this = this;
						var data = {
					menuId: item.id,
					roleId: _this.$store.state.roleid,
				};
				var url = _this.basic_url + '/api-user/menus/findSecondByRoleIdAndFisrtMenu';
				_this.$axios.get(url, {params: data}).then((res) => {
					if(res.data!="undefined"&&res.data.length>0){
						item = res.data[0];
					}
					
					_this.$store.dispatch('setSelectedNavAct',item);
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
						setTimeout(function(){
							var left = $('.page-tabs').offset().left; 
							//tabs总宽度
							var tabW = $('.page-tabs-content').width();
							//总区域内容宽度
							var contentW = $('.content-tabs').width()-240;
							if(tabW>contentW){
								var poor=tabW-contentW;
								$('.page-tabs').offset({
											left: -poor
									});
							}
						},0);
					}
				}).catch((wrong) => {
				});
					_this.$store.dispatch('setNavIdAct',item.id);
					var data = {
					menuId: this.$store.state.menuid,
					roleId: this.$store.state.roleid,
				};
				var url = this.basic_url + '/api-user/menus/findSecondByRoleIdAndFisrtMenu';
				this.$axios.get(url, {params: data}).then((res) => {
					if(res.data.length>0&&res.data!='undefined'){
						var leftnav=res.data;
						this.$router.push({path:leftnav[0].url});
						this.$emit('childByValue',this.$store.state.selectedNav);
					}else {
						this.$router.push({path:item.url});
						this.$emit('childByValue',this.$store.state.selectedNav);
					}
				}).catch((wrong) => {
				});
			},
			//引入饼状图图表
			initEchart(){
				var myChart = this.$echarts.init(document.getElementById('main'),'macarons');
						// 指定图表的配置项和数据
						var option = {
								xAxis: {
								type: 'category',
								boundaryGap: false,
								data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
						},
						yAxis: {
								type: 'value'
						},
						series: [{
								data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290],
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
					var roleid=this.$store.state.roleid;
					var url = this.basic_url + '/api-user/menus/findFirstByRoleId/' + roleid;
					this.$axios.get(url, {}).then((res) => {
							this.applistdata = res.data;
					}).catch(error => {
					})
				},
				//获取全局承建单位
			getcjdw(){
				var url = this.basic_url + '/api-user/users/findUsersDeptofSta';
					this.$axios.get(url, {}).then((res) => {
						this.$store.dispatch('setcurrentcjdwNavAct',res.data);
					}).catch(error => {
					});
			},
			getUser(){//获取当前用户信息
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url, {}).then((res) => {//获取当前用户信息
					this.$store.dispatch('setcurrentuserNavAct',res.data);
						}).catch((err) => {
						});
			},
		},

		mounted(){
			//获取全局的承检单位
			this.getcjdw();
			this.getUser();
			//加载待办任务
			this.requestData();
			this.requestData1();
      // this.timer = setInterval(this.requestData(), 1000);//定时调用代办和已办的列表
			//一级菜单
			// this.initEchart();//调用饼状图图表函数名称
			this.getTodoNumber();//打开页面就执行getTodoNum待办任务数函数
			this.getTodoFinish();//打开页面就执行getTodoDing待办任务数函数
			this.CompletedItemRate();
			// this.getTodoFinish();//打开页面就执行getTodoFinish待办任务数函数
			this.$refs.navsTabs.showClick({
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
						})
			}else{
				var roleid=this.$store.state.roleid;
						var url = this.basic_url + '/api-user/menus/findFirstByRoleId/' + roleid;
						
						this.$axios.get(url, {}).then((res) => {
								this.applistdata = res.data;
						}).catch(error => {
						})
			};
		},
		watch: {
			completeList(){
				this.timer = setTimeout(function(){
						this.requestData()
					},30000);//定时调用代办和已办的列表
			}	 
    },
		beforeDestroy() {
      clearInterval(this.timer);
    }
	
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
.big_numb { color: #333333; font-size: 36px; line-height:45px;}
.small_font { color: #999999; font-size:13px; line-height:18px;}
.middle_font { color: #121958; font-size: 14px;  line-height:28px;}
.middle_font span {display: block;}
.el-tabs--border-card {
		-webkit-box-shadow: 0px 1px 15px 1px rgba(176,192,237,0.42);
    box-shadow: 0px 1px 15px 1px rgba(176,192,237,0.42);
    border-radius: 6px;
		border:none;
}
.el-tabs--border-card>.el-tabs__header {background-color: #f2f5fb; border-bottom: 1px solid #d9e0ee; border-top-right-radius: 6px; border-top-left-radius: 6px;}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
	border-right-color: #d9e0ee;
	border-top-color: #d9e0ee;
	border-left-color: #d9e0ee;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child,.el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child.is-active{
	 border-top-left-radius: 6px;
}
</style>

