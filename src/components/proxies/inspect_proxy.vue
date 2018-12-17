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
				<div class="ibox-content">
					<!--<navs_button></navs_button>-->
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
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-upload-cloud"></i>导入
								</button>
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-download-cloud"></i>导出
								</button>
								<button type="button" class="btn btn-primarys button-margin">
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
							<div class="keep-open btn-group" title="列">
								<el-dropdown :hide-on-click="false" class="pl10 btn btn-default btn-outline">
									<span class="el-dropdown-link">
										<font class="J_tabClose"><i class="icon-menu3"></i></font>
										<i class="el-icon-arrow-down icon-arrow2-down"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-checkbox-group v-model="checkedName">
											<el-dropdown-item v-for="(item,index) in tableHeader" :key="index">
												<el-checkbox :label="item.label" name="type"></el-checkbox>
											</el-dropdown-item>
										</el-checkbox-group>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
					<!-- 高级查询划出 Begin-->
					<div v-show="search" class="pb10">
						<el-form status-icon :model="searchList" label-width="70px">
							<el-row :gutter="10" class="pb5">
								<el-col :span="5">
									<el-input v-model="searchList.V_NAME">
										<template slot="prepend">委托单位名称</template>
									</el-input>
								</el-col>
								<el-col :span="5">
									<el-input v-model="searchList.ITEM_NAME">
										<template slot="prepend">样品名称</template>
									</el-input>
								</el-col>
								<!--<el-col :span="5">
									<el-input v-model="searchList.S_ENGNAME">
										<template slot="prepend">英文名称</template>
									</el-input>
								</el-col>-->
								<el-col :span="5">
									<el-input v-model="searchList.REPORT_NUM">
										<template slot="prepend">检测报告编号</template>
									</el-input>
								</el-col>
								<el-col :span="4">
									<el-input v-model="searchList.PROXYNUM">
										<template slot="prepend">检测委托书编号</template>
									</el-input>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="5">
									<el-date-picker v-model="searchList.COMPDATE" type="date" placeholder="完成日期" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%">
									</el-date-picker>
								</el-col>
								<el-col :span="5">
									<el-input v-model="searchList.ENTERBY">
										<template slot="prepend">录入人</template>
									</el-input>
								</el-col>
								<el-col :span="3">
									<el-select v-model="searchList.STATUS" placeholder="选择状态">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col>
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
										<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all :indent="22" :render-content="renderContent"  :props="resourceProps" @node-click="handleNodeClick">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="19" class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="inspectList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'inspectList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="检验委托书编号" sortable width="140px" prop="PROXYNUM" v-if="this.checkedName.indexOf('检验委托书编号')!=-1">
								</el-table-column>
								<el-table-column label="委托单位名称" sortable width="140px" prop="V_NAME" v-if="this.checkedName.indexOf('委托单位名称')!=-1">
								</el-table-column>
								<el-table-column label="生产单位名称" sortable width="140px" prop="P_NAME" v-if="this.checkedName.indexOf('生产单位名称')!=-1">
								</el-table-column>
								<el-table-column label="样品名称" sortable width="200px" prop="ITEM_NAME" v-if="this.checkedName.indexOf('样品名称')!=-1">
								</el-table-column>
								<el-table-column label="样品型号" sortable width="150px" prop="ITEM_MODEL" v-if="this.checkedName.indexOf('样品型号')!=-1">
								</el-table-column>
								<!-- <el-table-column label="样品信息状态" sortable width="200px" prop="ITEM_STATUS" v-if="this.checkedName.indexOf('样品信息状态')!=-1">
								</el-table-column> -->
								<el-table-column label="检测依据" width="200px" prop="REMARKS" sortable  v-if="this.checkedName.indexOf('检测依据')!=-1">
								</el-table-column>
								<el-table-column label="完成日期" width="200px" prop="COMPDATE" sortable  :formatter="dateFormat" data-type = ""  v-if="this.checkedName.indexOf('完成日期')!=-1">
								</el-table-column>
								<el-table-column label="完成方式" width="200px" prop="COMPMODE" sortable v-if="this.checkedName.indexOf('完成方式')!=-1">
								</el-table-column>
								<el-table-column label="检测报告编号" width="200px" prop="REPORT_NUM" sortable  v-if="this.checkedName.indexOf('检测报告编号')!=-1">
								</el-table-column>
								<el-table-column label="主检组" width="200px" prop="MAINGROUP" sortable  v-if="this.checkedName.indexOf('主检组')!=-1">
								</el-table-column>
								<!--<el-table-column label="信息状态" width="200px" prop="STATUS" sortable v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column>-->
								<el-table-column label="录入人" width="200px" prop="ENTERBY" sortable  v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column>
								<el-table-column label="录入时间" width="200px" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<el-table-column label="版本" width="50px" prop="VERSION" sortable  v-if="this.checkedName.indexOf('版本')!=-1">
								</el-table-column>
							</el-table>
							
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<inspectmask  ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></inspectmask>
		<!--右侧内容显示 End-->
	</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left3.vue'
	import navs_header from '../common/nav_tabs.vue'
	import inspectmask from '../proxiesDetails/inspect_proxyMask.vue'

	export default {
		name: 'user_management',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs_left': navs_left,
			'inspectmask': inspectmask,
		},
		data() {
			return {
				basic_url: Config.dev_url,
				value: '',
				options: [{
					value: '1',
					label: '草稿'
				}, {
					value: '2',
					label: '审批中'
				},{
					value: '3',
					label: '已发布'
				},
				{
					value: '4',
					label: '已取消'
				},
				{
					value: '0',
					label: '驳回'
				}
				
				],
				isShow: false,
				ismin: true,
				loadSign: true, //加载
				commentArr: {},
				checkedName: [
					'检验委托书编号',
					'委托单位名称',
					'生产单位名称',
					'样品名称',
					'样品型号',
					// '样品信息状态',
					'检测依据',
					'完成日期',
					'完成方式',
					'检测报告编号',
					'主检组',
					// '信息状态',
					'录入人',
					'录入时间',
					'版本'
				],
				tableHeader: [{
						label: '检验委托书编号',
						prop: 'PROXYNUM'
					},
					{
						label: '委托单位名称',
						prop: 'V_NAME'
					},
					{
						label: '生产单位名称',
						prop: 'P_NAME'
					},
					{
						label: '样品名称',
						prop: 'ITEM_NAME'
					},
					{
						label: '样品型号',
						prop: 'ITEM_MODEL'
					},
					// {
					// 	label: '样品信息状态',
					// 	prop: 'ITEM_STATUS'
					// },
					{
						label: '检测依据',
						prop: 'REMARKS'
					},
					{
						label: '完成日期',
						prop: 'COMPDATE'
					},
					{
						label: '完成方式',
						prop: 'COMPMODE'
					},
					{
						label: '检测报告编号',
						prop: 'REPORT_NUM'
					},
					{
						label: '主检组',
						prop: 'MAINGROUP'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// },
					{
						label: '录入人',
						prop: 'ENTERBY'
					},
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
						label: '版本',
						prop: 'VERSION'
					},
				],

				companyId: '',
				deptId: '',
				selUser: [],
				'启用': true,
				'冻结': false,
				'男': true,
				'女': false,
				inspectList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					ITEM_NAME: '',
					REPORT_NUM: '',
					PROXYNUM: '',
					COMPDATE: '',
					ENTERBY: '',
					STATUS: '',
					
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "fullname"
				},
				treeData: [],
				userData: [],
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
			}
		},
		mounted(){
			// 获取浏览器可视区域高度
			window.onresize = () => {//获取浏览器可视区域高度
			 	return (() => {
			 		this.fullHeight.height = document.documentElement.clientHeight - 100+'px';
			 	})()
			 };
		},
		methods: {
			renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
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
					this.requestData();
				}
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
				if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail(this.selUser[0].ID);
				}
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
					var url = this.basic_url + '/api-apps/app/inspectPro/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].ID);
					}
					console.log(deleteid);
					//ids为deleteid数组用逗号拼接的字符串
					ids = deleteid.toString(',');
					var data = {
						ids: ids,
					}
					this.$confirm('确定删除吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {
							params: data
						}).then((res) => { //.delete 传数据方法
							console.log(res);
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
					ITEM_NAME: this.searchList.ITEM_NAME,
					REPORT_NUM: this.searchList.REPORT_NUM,
					PROXYNUM: this.searchList.PROXYNUM,
					COMPDATE: this.searchList.COMPDATE,
					ENTERBY: this.searchList.ENTERBY,
					STATUS: this.searchList.STATUS
				}
				var url = this.basic_url + '/api-apps/app/inspectPro';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					//					this.inspectList = res.data.data;
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

					this.inspectList = newarr;
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
				console.log(111);
				if(data.type == '1') {
					this.companyId = data.id;
					this.deptId = '';
				} else {
					this.deptId = data.id;
					this.companyId = '';
				}
				this.requestData();
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
			}
		},
		beforeMount() {
			// 在页面挂载前就发起请求
			this.requestData();
			this.getKey();
		},
		mounted() {

		},
	}
</script>

<style scope>

</style>