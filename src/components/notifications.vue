<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单内容显示 Begin-->
			<!--<navs_left></navs_left>-->
			<!--左侧菜单内容显示 End-->

			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content wrapperall">
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
								<button type="button" class="btn btn-red button-margin" @click="delinfo">
							    <i class="icon-trash"></i>删除
							</button>
								<button type="button" class="btn btn-primarys button-margin" @click="importData">
							    <i class="icon-upload-cloud"></i>导入
							</button>
								<button type="button" class="btn btn-primarys button-margin" @click="exportData">
							    <i class="icon-download-cloud"></i>导出
							</button>
								<button type="button" class="btn btn-primarys button-margin" @click="Printing">
							    <i class="icon-print"></i>打印
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
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName" @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!--按钮操作行 End-->

					<!-- 高级查询划出 Begin-->
					<div v-show="search" class="pb10">
						<el-form status-icon :model="searchList" label-width="70px">
							<el-row :gutter="10" class="pb10">
								<el-col :span="5">
									<el-input v-model="searchList.N_CODE">
										<template slot="prepend">工作任务通知书编号</template>
									</el-input>
								</el-col>
								<el-col :span="5">
									<el-input v-model="searchList.ITEM_NAME">
										<template slot="prepend">受检产品名称</template>
									</el-input>
								</el-col>
								<el-col :span="5">
									<el-input v-model="searchList.CJDW">
										<template slot="prepend">承建单位</template>
									</el-input>
								</el-col>
								<el-col :span="4">
									<el-input v-model="searchList.TYPE">
										<template slot="prepend">类别</template>
									</el-input>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="5">
									<el-date-picker v-model="searchList.XD_DATE" type="date" placeholder="下达日期" value-format="yyyy-MM-dd" style="width: 100%">
									</el-date-picker>
								</el-col>
								<el-col :span="5">
									<el-date-picker v-model="searchList.COMPDATE" type="date" placeholder="完成日期" value-format="yyyy-MM-dd" style="width: 100%">
									</el-date-picker>
								</el-col>
								<!-- <el-col :span="3" class="pt5">
									<el-select v-model="searchList.value" placeholder="请选择信息状态">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col> -->
								<el-col :span="2">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:1px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->
					<el-row :gutter="10">
						<el-col :span="5" class="lefttree">
							<div class="lefttreebg">
								<div class="left_tree_title clearfix" @click="min3max()">
									<div class="pull-left pr20" v-if="ismin">组织机构</div>
									<span class="pull-right navbar-minimalize minimalize-styl-2">
										<i class="icon-doubleok icon-double-angle-left blue"></i>
									</span>
								</div>
								<div class="left_treebg" :style="{height: fullHeight}">
									<div class="p15" v-if="ismin">
										<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all :indent="22" :render-content="renderContent" :props="resourceProps" @node-click="handleNodeClick">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="19">
							<!-- 表格 Begin-->
							<el-table :data="nitificationsList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'nitificationsList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="工作任务通知书编号" width="200" sortable prop="N_CODE" v-if="this.checkedName.indexOf('工作任务通知书编号')!=-1">

									<template slot-scope="scope">
										<p @click=view(scope.row.ID,)>{{scope.row.N_CODE}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="类型" width="150" sortable prop="TYPE" v-if="this.checkedName.indexOf('类型')!=-1">
								</el-table-column>
								<el-table-column label="下达日期" width="180" sortable prop="XD_DATE" v-if="this.checkedName.indexOf('下达日期')!=-1">
								</el-table-column>
								<el-table-column label="受检产品名称" width="200" sortable prop="ITEM_NAME" v-if="this.checkedName.indexOf('受检产品名称')!=-1">
								</el-table-column>
								<el-table-column label="受检产品型号" width="200" sortable prop="ITEM_MODEL" :formatter="judge" v-if="this.checkedName.indexOf('受检产品型号')!=-1">
								</el-table-column>
								<el-table-column label="受检企业" width="100" sortable prop="VENDOR" v-if="this.checkedName.indexOf('受检企业')!=-1">
								</el-table-column>
								<el-table-column label="承检单位" width="180" sortable prop="CJDW" v-if="this.checkedName.indexOf('承检单位')!=-1">
								</el-table-column>
								<el-table-column label="任务号" width="120" prop="TASKNUM" sortable v-if="this.checkedName.indexOf('任务号')!=-1">
								</el-table-column>
								<el-table-column label="抽样方案" width="120" prop="SOLUTION" sortable v-if="this.checkedName.indexOf('抽样方案')!=-1">
								</el-table-column>
								<el-table-column label="完成日期" width="180" prop="COMPDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('完成日期')!=-1">
								</el-table-column>
								<el-table-column label="信息状态" width="120" prop="STATUS" sortable v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column>
								<el-table-column label="录入人" width="120" prop="ENTERBY" sortable v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column>
								<!--<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>-->
							</el-table>
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 End-->
						</el-col>
					</el-row>
				</div>
			</div>
			<!--右侧内容显示 End-->
			<notificationsmask :dataInfo="aaaData[0]" @request="requestData" ref="child" v-bind:page=page></notificationsmask>
		</div>
	</div>
</template>
<script>
	import Config from '../config.js'
	import vheader from './common/vheader.vue'
	import navs_header from './common/nav_tabs.vue'
	import tableControle from './plugin/table-controle/controle.vue'
	import notificationsmask from './common/notification_mask.vue'

	export default {
		name: 'notifications',
		components: {
			vheader,
			navs_header,
			tableControle,
			notificationsmask,

		},
		data() {
			return {
				basic_url: Config.dev_url,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				value: '',
				options: [{
					value: '选项1',
					label: '活动'
				}, {
					value: '选项2',
					label: '不活动'
				}],
				loadSign: true, //加载
				commentArr: {},

				checkedName: [
					'工作任务通知书编号',
					'类型',
					'下达日期',
					'受检产品名称',
					'受检产品型号',
					'受检企业',
					'承检单位',
					'任务号',
					'抽样方案',
					'完成日期',
					'信息状态',
					'录入人',
					'录入时间'
				],
				tableHeader: [{
						label: '工作任务通知书编号',
						prop: 'N_CODE'
					},
					{
						label: '类型',
						prop: 'TYPE'
					},
					{
						label: '下达日期',
						prop: 'XD_DATE'
					},
					{
						label: '受检产品名称',
						prop: 'ITEM_NAME'
					},
					{
						label: '受检产品型号',
						prop: 'ITEM_MODEL'
					},
					{
						label: '受检企业',
						prop: 'VENDOR'
					},
					{
						label: '承检单位',
						prop: 'CJDW'
					},
					{
						label: '任务号',
						prop: 'TASKNUM'
					},
					{
						label: '抽样方案',
						prop: 'SOLUTION'
					},
					{
						label: '完成日期',
						prop: 'COMPDATE'
					},
					{
						label: '信息状态',
						prop: 'STATUS'
					},
					{
						label: '录入人',
						prop: 'ENTERBY'
					},
					//					{
					//						label: '录入时间',
					//						prop: 'ENTERDATE'
					//					}
				],

				selUser: [],
				nitificationsList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin: true,
				searchList: { //点击高级搜索后显示的内容
					N_CODE: '',
					ITEM_NAME: '',
					CJDW: '',
					TYPE: '',
					XD_DATE: '',
					COMPDATE: '',
					STATUS: ''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "fullname"
				},
				page: { //分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				aaaData: [],
				treeData: [],
			}
		},

		mounted() {
			// 获取浏览器可视区域高度
			var _this = this;
			var clientHeight = $(window).height() - 100; //document.body.clientWidth;
			_this.$refs.homePagess.style.height = clientHeight + 'px';
			window.onresize = function() {
				var clientHeight = $(window).height() - 100;
				_this.$refs.homePagess.style.height = clientHeight + 'px';
			};

		},
		methods: {
			loadMore() {
				if(this.loadSign) {
					this.loadSign = false
					this.page.currentPage++
						if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
							return
						}
					setTimeout(() => {
						this.loadSign = true
					}, 1000)
					this.requestData()
				}
			},
			tableControle(data) {
				this.checkedName = data;
			},
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加用戶
			openAddMgr() {
				//				this.$refs.child.resetNew();
				this.$refs.child.visible();
			},
			//修改用戶
			modify() {
				this.aaaData = this.selUser;
				if(this.aaaData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.aaaData.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail(this.aaaData[0].ID);
				}
			},
			//查看用戶
			 view(id) {
				this.$refs.child.view(id);
			},
			
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
					this.up = !this.up
			},
			// 删除
			delinfo() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/workNot/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].ID);
					}
					//ids为deleteid数组用逗号拼接的字符串
					ids = deleteid.toString(',');
					var data = {
						ids: ids,
					}
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {
							params: data
						}).then((res) => { //.delete 传数据方法
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
					}).catch(() => {

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
			judge(data) {
				//taxStatus 布尔值
				return data.STATUS == "1" ? '活动' : '不活动'
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					N_CODE: this.searchList.N_CODE,
					ITEM_NAME: this.searchList.ITEM_NAME,
					CJDW: this.searchList.CJDW,
					TYPE: this.searchList.TYPE,
					XD_DATE: this.searchList.XD_DATE,
					COMPDATE: this.searchList.COMPDATE,
					STATUS: this.searchList.STATUS,
				}
				var url = this.basic_url + '/api-apps/app/workNot';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false
					} else {
						this.loadSign = true
					}
					this.commentArr[this.page.currentPage] = res.data.data
					let newarr = []
					for(var i = 1; i <= totalPage; i++) {

						if(typeof(this.commentArr[i]) != 'undefined' && this.commentArr[i].length > 0) {

							for(var j = 0; j < this.commentArr[i].length; j++) {
								newarr.push(this.commentArr[i][j])
							}
						}
					}

					this.nitificationsList = newarr;
				}).catch((wrong) => {})
			},

			//机构树
			getKey() {
				let that = this;
				var url = this.basic_url + '/api-user/depts/tree';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data;
					this.treeData = this.transformTree(this.resourceData);
				});
			},

			transformTree(data) {
				for(var i = 0; i < data.length; i++) {
					data[i].name = data[i].fullname;
					if(!data[i].pid || $.isArray(data[i].subDepts)) {
						data[i].iconClass = 'icon-file-normal';
					} else {
						data[i].iconClass = 'icon-file-text';
					}
					if($.isArray(data[i].subDepts)) {
						data[i].children = this.transformTree(data[i].subDepts);
					}
				}
				return data;
			},
			handleNodeClick(data) {
				if(data.type == '1') {
					this.companyId = data.id;
					this.deptId = '';
				} else {
					this.deptId = data.id;
					this.companyId = '';
				}
				this.requestData();
			},
			renderContent(h, {
				node,
				data,
				store
			}) { //自定义Element树菜单显示图标
				return(
					<span>
              <i class={data.iconClass}></i>
              <span>{node.label}</span>
            </span>
				);
			},
			// 点击节点
			nodeClick: function(m) {
				if(m.iconClass != 'icon-file-text') {
					if(m.iconClass == 'icon-file-normal') {
						m.iconClass = 'icon-file-open';
					} else {
						m.iconClass = 'icon-file-normal';
					}
				}
				this.handleNodeClick();
			},
			expandClick: function(m) {
				if(m.iconClass != 'icon-file-text') {
					if(m.iconClass == 'icon-file-normal') {
						m.iconClass = 'icon-file-open';
					} else {
						m.iconClass = 'icon-file-normal';
					}
				}
				m.isFolder = !m.isFolder;
			},

			getTreeId(data) {
				if(data.type == '1') {
					this.companyId = data.id;
					this.deptId = '';
				} else {
					this.deptId = data.id;
					this.companyId = '';
				}
				this.requestData();
			},
			handleNodeClick(data) {},
			formatter(row, column) {
				return row.enabled;
			},
		},
		mounted() {
			this.requestData();
			this.getKey();
		},
	}
</script>

<style scoped>
	.el-tree .el-tree-node__content>.el-tree-node__expand-icon {
		padding: 2px;
	}
	
	.el-tree .el-icon-caret-right {
		font-size: 14px;
		width: 17px;
		height: 17px;
		line-height: 12px;
		font-weight: lighter;
		color: #A2ABBF;
		border-radius: 3px;
		margin-top: -2px;
		margin-right: 5px;
		position: relative;
		z-index: 30;
	}
	
	.el-tree .el-icon-caret-right:before {
		/*图标加号*/
		font-family: 'hxqheam';
		content: "\e9bc";
		position: absolute;
		z-index: 22;
	}
	
	.el-tree .el-icon-caret-right:after {
		content: "";
		width: 10px;
		position: absolute;
		top: 7px;
		right: -4px;
		z-index: 1;
	}
	
	.el-tree .el-tree-node__expand-icon.is-leaf,
	.el-tree .el-tree-node__expand-icon.is-leaf:before {
		border: none;
		background: transparent;
		content: "";
	}
	
	.el-tree .el-tree-node__expand-icon.expanded {
		/*图标加号点击后不旋转，原Element会旋转*/
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	
	.el-tree .el-tree-node__expand-icon.expanded:before {
		/*图标减号*/
		font-family: 'hxqheam';
		content: "\e99f";
	}
	
	.el-tree .el-tree-node .icon-file-normal {
		/*文件夹合并时图标*/
		color: #6585DF;
		font-family: 'hxqheam';
		content: "\e9fa";
		font-size: 20px;
	}
	
	.el-tree .el-tree-node.is-expanded>.el-tree-node__content .icon-file-normal:before {
		/*文件夹打开时图标*/
		font-family: 'hxqheam';
		content: "\e9fb";
	}
	
	.el-tree .el-tree-node>.el-tree-node__content .icon-file-text {
		/*最后子级图标颜色*/
		color: #92BDFF;
	}
	
	.el-tree-node [class^="icon-"],
	.el-tree-node [class*=" icon-"] {
		margin-right: 5px;
	}
	
	[role=group].el-tree-node__children,
	[role=group].el-tree-node__children [role=group].el-tree-node__children,
	[role=group].el-tree-node__children .el-tree-node__content {
		position: relative;
	}
	
	[role=group].el-tree-node__children:before,
	[role=group].el-tree-node__children [role=group].el-tree-node__children:before,
	[role=group].el-tree-node__children .el-tree-node__content:before {
		content: "";
		top: 0px;
		position: absolute;
		width: 9px;
		height: 100%;
		border-right: 1px dashed #C7CED6;
	}
	
	[role=group].el-tree-node__children [role=group].el-tree-node__children:before {
		left: 22px;
	}
	
	[role=group].el-tree-node__children [role=group].el-tree-node__children [role=group].el-tree-node__children:before {
		left: 44px;
	}
	
	[role=group].el-tree-node__children [role=group].el-tree-node__children [role=group].el-tree-node__children [role=group].el-tree-node__children:before {
		left: 66px;
	}
	
	[role=group].el-tree-node__children [role=group].el-tree-node__children [role=group].el-tree-node__children [role=group].el-tree-node__children [role=group].el-tree-node__children:before {
		left: 88px;
	}
	
	[role=group].el-tree-node__children [role=group].el-tree-node__children [role=group].el-tree-node__children [role=group].el-tree-node__children [role=group].el-tree-node__children [role=group].el-tree-node__children:before {
		left: 110px;
	}
	
	[role=group].el-tree-node__children .el-tree-node__content:before {
		top: -15px;
	}
	
	.el-tree>div[role=treeitem]:nth-last-child(2)>div[role=group]:before,
	.el-tree>div[role=treeitem] div[role=treeitem]:nth-last-child(1)>div[role=group]:before {
		display: none;
	}
	
	.p15 {
		padding: 10px 15px;
	}
</style>