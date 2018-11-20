<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header></navs_header>
	</div>
	<div class="contentbg">
		<!--左侧菜单内容显示 Begin-->
		<navs_left></navs_left>
		<!--左侧菜单内容显示 End-->

		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content">
			<EasyScrollbar>
				<div id="wrapper" ref="homePagess" style="height: 600px;">
					<div id="information" style="height: auto;">
						<div class="ibox-content">
							<!--按钮操作行 Begin-->
								<div class="fixed-table-toolbar clearfix">
									<div class="bs-bars pull-left">
										<div class="hidden-xs" id="roleTableToolbar" role="group">
											<button type="button" class="btn btn-green" @click="openAddMgr" id="">
			                                	<i class="icon-add"></i>添加
			                      			</button>
											<button type="button" class="btn btn-bule button-margin" @click="modify">
											    <i class="icon-edit"></i>修改
											</button>
											<button type="button" class="btn btn-red button-margin" @click="deluserinfo">
											    <i class="icon-trash"></i>删除
											</button>
											<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
									    		<i class="icon-search"></i>高级查询
									    		<i class="icon-arrow1-down" v-show="down"></i>
									    		<i class="icon-arrow1-up" v-show="up"></i>
											</button>
										</div>
									</div>

									<div class="columns columns-right btn-group pull-right">
										<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
										<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
									</div>
								</div>
							<!--按钮操作行 End-->

							<!-- 高级查询划出 Begin-->
							<div v-show="search" class="pb10">
								<el-form status-icon :model="searchList" label-width="70px">
									<el-row :gutter="10">
										<el-col :span="5">
											<el-input v-model="searchList.AUTOKEY">
												<template slot="prepend">自动编号名称</template>
											</el-input>
										</el-col>
										<el-col :span="2">
											<el-button type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
										</el-col>
									</el-row>
								</el-form>
							</div>
							<!-- 高级查询划出 End-->
							
							<el-row :gutter="0">
								<el-col :span="24">
									<!-- 表格 Begin-->
									<el-table :data="numberList" border stripe height="400" style="width: 100%;" :default-sort="{prop:'numberList', order: 'descending'}" @selection-change="SelChange"  v-loadmore="loadMore">
										<el-table-column type="selection" width="55" v-if="this.checkedName.length>0">
										</el-table-column>
										<el-table-column label="自动编号名称" sortable prop="AUTOKEY" v-if="this.checkedName.indexOf('自动编号名称')!=-1">
										</el-table-column>
										<el-table-column label="起始数" sortable prop="S_NUM" v-if="this.checkedName.indexOf('起始数')!=-1">
										</el-table-column>
										<el-table-column label="前缀" sortable prop="PREFIX" v-if="this.checkedName.indexOf('前缀')!=-1">
										</el-table-column>
										<el-table-column label="备注" sortable prop="MEMO" v-if="this.checkedName.indexOf('备注')!=-1">
										</el-table-column>
									</el-table>
									<el-pagination background class="pull-right pt10 pb10" v-if="this.checkedName.length>0"
							            @size-change="sizeChange"
							            @current-change="currentChange"
							            :current-page="page.currentPage"
							            :page-sizes="[10, 20, 30, 40]"
							            :page-size="page.pageSize"
							            layout="total, sizes, prev, pager, next"
							            :total="page.totalCount">
							        </el-pagination>
									<!-- 表格 End-->
								</el-col>
							</el-row>
						</div>
					</div>
					
				</div>
			</EasyScrollbar>
		</div>
		<!--右侧内容显示 End-->
		<numbsetmask :addnumbsetForm="selMenu[0]" ref="child" @request="requestData" v-bind:page=page></numbsetmask>
	</div>
</div>
</template>
<script>
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left2.vue'
	import navs_header from '../common/nav_tabs.vue'
	// import table from '../plugin/table/table-normal.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import numbsetmask from '../maindataDetails/numbersetting_mask.vue'
	export default {
		name: 'number_settings',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			// table,
			numbsetmask,
		},
		data() {
			return {
				checkedName: [//控制Table-列显示和隐藏
					'自动编号名称',
					'起始数',
					'前缀',
					'备注',
				],
				tableHeader: [//控制Table-列头标题名称
					{
						label: '自动编号名称',
						prop: 'AUTOKEY'
					},
					{
						label: '起始数',
						prop: 'S_NUM'
					},
					{
						label: '前缀',
						prop: 'PREFIX'
					},
					{
						label: '备注',
						prop: 'MEMO'
					}
				],
				loadSign:true,//加载
				commentArr:{},
				selMenu: [],
				'启用': true,
				'冻结': false,
				numberList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				clientHeight:'',//获取浏览器高度
				searchList: {
					AUTOKEY: '',
				},
				page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				aaaData:[],
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
		},
		methods: {
			//表格滚动加载
			loadMore () {
			   if (this.loadSign) {
			     this.loadSign = false
			     this.page.currentPage++
			     if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			       return
			     }
			     setTimeout(() => {
			       this.loadSign = true
			     }, 1000)
			     this.requestData()
			   }
			 },
			tableControle(data){//控制表格列显示隐藏
				this.checkedName = data;
			},
			sizeChange(val) {//分页，总页数
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    currentChange(val) {//分页，当前页
		      this.page.currentPage = val;
		      this.requestData();
		    },
			searchinfo(index) {//高级查询
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			openAddMgr() {//添加自动编号设置
				this.$refs.child.resetNew();
				this.$refs.child.childMethods();
			},
			modify() {//修改自动编号设置
				this.aaaData = this.selMenu;
				if(this.aaaData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.aaaData.length > 1) {
					this.$message({
						message: '不可同时修改多条数据',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail();
				}
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
					this.up = !this.up
			},
			// 删除
			deluserinfo() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时删除多条数据',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.id;
					var url = '/api/api-apps/app/autokey/' + id;
					this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.requestData();
						}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
				}
			},
			// 导入
			importData() {
				
			},
			// 导出
			exportData() {
				
			},
			// 打印
			Printing() {
				
			},
			SelChange(val) {//选中值后赋值给一个自定义的数组：selMenu
				this.selMenu = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = '/api/api-apps/app/autokey';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					// console.log(res);
					// this.numberList = res.data.data;
					// this.page.totalCount = res.data.count;
					this.page.totalCount = res.data.count;	
					//总的页数
					let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
					if(this.page.currentPage >= totalPage){
						 this.loadSign = false
					}else{
						this.loadSign=true
					}
					this.commentArr[this.page.currentPage]=res.data.data
					let newarr=[]
					for(var i = 1; i <= totalPage; i++){
					
						if(typeof(this.commentArr[i])!='undefined' && this.commentArr[i].length>0){
							
							for(var j = 0; j < this.commentArr[i].length; j++){
								newarr.push(this.commentArr[i][j])
							}
						}
					}					
					this.numberList = newarr;
				}).catch((wrong) => {})
				/*this.numberList.forEach((item, index) => {
					var id = item.id;
					this.$axios.get('/users/' + id + '/roles', data).then((res) => {
						this.numberList.role = res.data.roles[0].name;
					}).catch((wrong) => {})
				})*/
			},
			
		},
		
		mounted() {
			this.requestData();
		},
	}
</script>

<style scoped>

</style>