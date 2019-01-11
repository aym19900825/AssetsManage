<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
				<navs_header  ref="navsheader"></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单内容显示 Begin-->
			<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
			<!--左侧菜单内容显示 End-->
			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<!--<navs_button></navs_button>-->
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button type="button" class="btn btn-green" @click="openAddMgr" id="">
                                	<i class="icon-add"></i>添加
                      			 </button>
								<button type="button" class="btn btn-blue button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" @click="del">
								    <i class="icon-trash"></i>删除
								</button>
								<!-- <button type="button" class="btn btn-primarys button-margin" @click="importData">
								    <i class="icon-upload-cloud"></i>导入
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="exportData">
								    <i class="icon-download-cloud"></i>导出
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="Printing">
								    <i class="icon-print"></i>打印
								</button> -->
								<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
						    		<i class="icon-search"></i>高级查询
						    		<i class="icon-arrow1-down" v-show="down"></i>
						    		<i class="icon-arrow1-up" v-show="up"></i>
								</button>
							</div>
						</div>
						<div class="columns columns-right btn-group pull-right">
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName" @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!-- 高级查询划出 Begin-->
					<div v-show="search" class="pb10">
						<el-form :model="searchList" label-width="70px">
							<el-row :gutter="30" class="pb5">
								<el-col :span="7">
									<el-input v-model="searchList.categoryidDesc">
										<template slot="prepend">类别</template>
									</el-input>
								</el-col>
								<el-col :span="7">
									<el-input v-model="searchList.keywordname">
										<template slot="prepend">关键字</template>
									</el-input>
								</el-col>
								<el-col :span="3">
									<el-button type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->

					<el-row :gutter="0">
						<el-col class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="samplesList" border :height="fullHeight" style="width: 100%;" :default-sort="{prop:'samplesList', order: 'descending'}" @selection-change="selChange">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="分类" sortable prop="categoryidDesc" v-if="this.checkedName.indexOf('分类')!=-1">
								</el-table-column>
								<el-table-column label="关键字" sortable prop="keywordname" v-if="this.checkedName.indexOf('关键字')!=-1">
								</el-table-column>
								<el-table-column label="用户名称" sortable prop="username" v-if="this.checkedName.indexOf('用户名称')!=-1">
								</el-table-column>
								<el-table-column label="用户部门" sortable prop="deptfullname" v-if="this.checkedName.indexOf('用户部门')!=-1">
								</el-table-column>
								<el-table-column label="创建时间" sortable prop="createtime" v-if="this.checkedName.indexOf('创建时间')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0"
								 @size-change="sizeChange" 
								 @current-change="currentChange" 
								 :current-page="page.currentPage" 
								 :page-sizes="[10, 20, 30, 40]" 
								 :page-size="page.pageSize" 
								 layout="total, sizes, prev, pager, next" 
								 :total="page.totalCount">
							</el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<catmask  ref="child" @request="requestData" :detailData="selMenu[0]"></catmask>
		<!--右侧内容显示 End-->
	</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import catmask from'./cat_mask.vue'
	export default {
		name: 'samples',//接样
		components: {
			vheader,
			navs_header,
			navs_left,
			tableControle,
			catmask,
		},
		data() {
			return {
				basic_url: Config.dev_url,
				ismin: true,

				//选择显示数据
				checkedName: [
					'关键字',
					'分类',
					'用户名称',
					'用户部门',
					'创建时间',
				],
				tableHeader: [{
						label: '关键字',
						prop: 'keywordname'
					},
					{
						label: '分类',
						prop: 'categoryidDesc'
					},
					{
						label: '用户名称',
						prop: 'username'
					},
					{
						label: '用户部门',
						prop: 'deptfullname'
					},
					{
						label: '创建时间',
						prop: 'createtime'
					}
				],
				samplesList: [],
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				search: false,
				show: false,
				down: true,
				up: false,
				searchList: {
					'categoryidDesc': '',
					'keywordname': ''
				},
				
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				samplesForm: {}, //修改子组件时传递数据
				// 选中的数据
				selMenu: [],
			}
		},
		methods: {
			tableControle(data) {//控制表格列显示隐藏
				this.checkedName = data;
			},
			//分页
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			//高级查询
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加样品管理
			openAddMgr() {
				this.$refs.child.visible();
			},
			//修改用戶
			modify() {
				if(this.selMenu.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selMenu.length > 1) {
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
			getKeyWords(catId){
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					categoryid: catId ,
				}
				var url = this.basic_url + '/api-apps/app/tbKeyword2';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					return res.data.count;
				}).catch((wrong) => {})
			},
			// 删除
			del() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				}else if(selData.length > 1){
					this.$message({
						message: '不可同时删除多条数据',
						type: 'error'
					});
					return;
				}else {
					var sonLength = this.getKeyWords(selData[0].id);
					if(sonLength>0){
						this.$message({
							message: '请先删除此类别下的关键字后再删除此数据',
							type: 'error'
						});
						return;
					}
					var url = this.basic_url + '/api-apps/app/tbKeyword2/deletes';
					var changeMenu = selData;
					var deleteid = [];
					for (var i = 0; i < changeMenu.length; i++) {
						deleteid.push(changeMenu[i].id);
					}
                    var data = {
						ids: deleteid.toString(',')
					}
					this.$confirm('确定删除数据吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        this.$axios.delete(url, {params: data}).then((res) => {//.delete 传数据方法
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
                    }).catch(() => {});
				}
			},
			selChange(val) {
				this.selMenu = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					categoryidDesc: this.searchList.categoryidDesc,
					keywordname: this.searchList.keywordname
				};
				var url = this.basic_url + '/api-apps/app/tbKeyword2';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;
					this.samplesList = res.data.data;
				}).catch((wrong) => {});
			},
			min3max() { //左侧菜单正常和变小切换
				if($(".lefttree").hasClass("el-col-5")) {
					$(".lefttree").removeClass("el-col-5");
					$(".lefttree").addClass("el-col-1");
					$(".leftcont").removeClass("el-col-19");
					$(".leftcont").addClass("el-col-23");
					$(".icon-doubleok").removeClass("icon-double-angle-left");
					$(".icon-doubleok").addClass("icon-double-angle-right");
				} else {
					$(".lefttree").removeClass("el-col-1");
					$(".lefttree").addClass("el-col-5");
					$(".leftcont").removeClass("el-col-23");
					$(".leftcont").addClass("el-col-19");
					$(".icon-doubleok").removeClass("icon-double-angle-right");
					$(".icon-doubleok").addClass("icon-double-angle-left");
				}
				this.ismin = !this.ismin;
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
      		},
		},
		mounted() {
			this.requestData();
		},
	}
</script>

<style scope>
.p15 {padding:10px 15px;}
</style>