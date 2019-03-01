<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header ref="navsheader"></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单内容显示 Begin-->
			<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
			<!--左侧菜单内容显示 End-->
			<!--右侧内容显示 Begin-->
			<div id="wrapper-content" class="wrapper">
				<div class="ibox-content">
					<!--<navs_button></navs_button>-->
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button type="button" class="btn btn-green" @click="openAddMgr">
                                	<i class="icon-add"></i>添加
                      			 </button>
								<button type="button" class="btn btn-blue button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin"  @click="delinfo">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-red button-margin" @click="physicsDel">
							    <i class="icon-trash"></i>彻底删除
							</button>			
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-upload-cloud"></i>导入
								</button>
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-download-cloud"></i>导出
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="reportdata">
							    <i class="icon-clipboard"></i>报表
							</button>
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-print"></i>打印
								</button>
								<button type="button" class="btn btn-orange button-margin" @click="breakoff">
							    	<i class="icon-alert-triangle"></i>中止
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
					<div v-show="search">
						<el-form :model="searchList">
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="委托单位名称" prop="V_NAME"  label-width="100px">
										<el-input v-model="searchList.V_NAME"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="样品名称" prop="ITEM_NAME" label-width="70px">
										<el-input v-model="searchList.ITEM_NAME"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="检测报告编号" prop="REPORT_NUM" label-width="100px">
										<el-input v-model="searchList.REPORT_NUM"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="检测委托书编号" prop="PROXYNUM" label-width="110px">
										<el-input v-model="searchList.PROXYNUM"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="完成日期" prop="COMPDATE" label-width="100px">
										<el-date-picker v-model="searchList.COMPDATE" type="date" placeholder="完成日期" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%">
									</el-date-picker>
									</el-form-item>
								</el-col>
								<!-- <el-col :span="5">
									<el-form-item label="录入人" prop="ENTERBY" label-width="70px">
										<el-input v-model="searchList.ENTERBY"></el-input>
									</el-form-item>
								</el-col -->
								<el-col :span="5">
									<el-form-item label="状态" prop="STATUS" label-width="70px">
										<el-select clearable v-model="searchList.STATUS" placeholder="选择状态" style="width: 100%">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
                                    <el-col :span="4">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
									<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;    margin-left: 2px">重置</el-button>
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
							<el-table :data="inspectList" 
									  :header-cell-style="rowClass" 
									  border 
									  stripe 
									  :height="fullHeight" 
									  style="width: 100%;" 
									  :default-sort="{prop:'inspectList', order: 'descending'}" 
									  @selection-change="SelChange" 
									  v-loadmore="loadMore"
									  v-loading="loading"  
									  element-loading-text="加载中…"
    								  element-loading-spinner="el-icon-loading"
    								  element-loading-background="rgba(255, 255, 255, 0.9)">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="检验委托书编号" sortable width="130px" prop="PROXYNUM" v-if="this.checkedName.indexOf('检验委托书编号')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row.ID)>{{scope.row.PROXYNUM}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="委托单位名称" sortable width="140px" prop="V_NAME" v-if="this.checkedName.indexOf('委托单位名称')!=-1">
								</el-table-column>
								<!-- <el-table-column label="生产单位名称" sortable width="140px" prop="P_NAME" v-if="this.checkedName.indexOf('生产单位名称')!=-1">
								</el-table-column> -->
								<el-table-column label="样品名称" sortable width="140px" prop="ITEM_NAME" v-if="this.checkedName.indexOf('样品名称')!=-1">
								</el-table-column>
								<el-table-column label="样品型号" sortable width="140px" prop="ITEM_MODEL" v-if="this.checkedName.indexOf('样品型号')!=-1">
								</el-table-column>
								<!-- <el-table-column label="样品信息状态" sortable width="200px" prop="ITEM_STATUS" v-if="this.checkedName.indexOf('样品信息状态')!=-1">
								</el-table-column> -->
								<el-table-column label="检测依据" width="200px" prop="REMARKS" sortable  v-if="this.checkedName.indexOf('检测依据')!=-1">
								</el-table-column>
								<el-table-column label="完成日期" width="140px" prop="COMPDATE" sortable  :formatter="dateFormat" data-type = ""  v-if="this.checkedName.indexOf('完成日期')!=-1">
								</el-table-column>
								<el-table-column label="完成方式" width="100px" prop="COMPMODE" sortable v-if="this.checkedName.indexOf('完成方式')!=-1">
								</el-table-column>
								<el-table-column label="检测报告编号" width="140px" prop="REPORT_NUM" sortable  v-if="this.checkedName.indexOf('检测报告编号')!=-1">
								</el-table-column>
								<el-table-column label="主检组" width="140px" prop="MAINGROUP" sortable  v-if="this.checkedName.indexOf('主检组')!=-1">
								</el-table-column>
								<!--<el-table-column label="信息状态" width="200px" prop="STATUS" sortable v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column>-->
								<!--<el-table-column label="录入人" width="200px" prop="ENTERBY" sortable  v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column>-->
								<el-table-column label="录入时间" width="140px" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<el-table-column label="版本" width="80" prop="VERSION" sortable  v-if="this.checkedName.indexOf('版本')!=-1">
								</el-table-column>
							</el-table>
							
							<el-pagination background class="text-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<inspectmask  ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></inspectmask>
		<!--右侧内容显示 End-->
					<!--报表-->
		<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import inspectmask from '../proxiesDetails/inspect_proxyMask.vue'
	import reportmask from'../reportDetails/reportMask.vue'

	export default {
		name: 'user_management',
		components: {
			'vheader': vheader,
			'navs_left': navs_left,
			'navs_header': navs_header,
			'inspectmask': inspectmask,
			reportmask
		},
//		created() {
//  		this.getRouterData()
//		},

		data() {
			return {
				reportData:{},//报表的数据
				loading: false,
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
				inspectList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					V_NAME:'',
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
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
				return (<span><i class={data.iconClass}></i><span  title={data.lable}>{data.lable}</span></span>)
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

			//滚动加载更多
			loadMore() {
				// if(this.loadSign) {
				// 	this.loadSign = false
				// 	this.page.currentPage++
				// 		if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
				// 			return
				// 		}
				// 	setTimeout(() => {
				// 		this.loadSign = true
				// 	}, 1000)
				// 	this.requestData();
				// }
				let up2down = sessionStorage.getItem('up2down');
				if(this.loadSign) {					
					if(up2down=='down'){
						this.page.currentPage++
						if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
							this.page.currentPage = Math.ceil(this.page.totalCount / this.page.pageSize)
							return false;
						}
					}else{
						this.page.currentPage--
						if(this.page.currentPage < 1) {
							this.page.currentPage=1
							return false;
						}
					}
					this.loadSign = false;
					setTimeout(() => {
						this.loadSign = true
					}, 1000)
					this.requestData()
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
				resetbtn(){
				this.searchList =  { //点击高级搜索后显示的内容
					V_NAME:'',
					ITEM_NAME: '',
					REPORT_NUM: '',
					PROXYNUM: '',
					COMPDATE: '',
					ENTERBY: '',
					STATUS: '',
				};
				this.requestData();
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加
			openAddMgr() {
				this.$refs.child.reset();
				this.$refs.child.visible();
				
			},
			//修改
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
					if(this.selUser[0].STATE == 3 || this.selUser[0].STATE == 2) {
						this.$message({
							message: '已启动的流程，不允许修改数据，只可以查看。',
							type: 'warning'
						});
						this.$refs.child.view(this.selUser[0].ID);
					}
					//驳回
					else if(this.selUser[0].STATE == 0) {
						var url = this.basic_url + '/api-apps/app/inspectPro/flow/isExecute/' + this.selUser[0].ID;
						this.$axios.get(url, {}).then((res) => {
							if(res.data.resp_code == 0) {
								var url = this.basic_url + '/api-apps/app/inspectPro/flow/isPromoterNode/' + this.selUser[0].ID;
								this.$axios.get(url, {}).then((res) => {
									if(res.data.resp_code == 0) {
										this.$refs.child.detail(this.selUser[0].ID);
									} else {
										this.$message({
											message: res.data.resp_msg,
											type: 'warning'
										});
									}
								});
							} else {
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
									});
							}
						});
					}else{
						this.$refs.child.detail(this.selUser[0].ID);	
					}
				}
			},
			//查看
			 view(id) {
				this.$refs.child.view(id);
			},
			//中止
			breakoff(){
				if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择要修中止的数据',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时中止多个数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/inspectPro/operate/stop?ID='+this.selUser[0].ID;
					this.$axios.get(url, {

					}).then((res) => {
						if(res.data.resp_code == 0) {
							this.$message({
								message: '操作成功',
								type: 'success'
							});
						} else {
							this.$message({
								message: res.data.resp_msg,
								type: 'warning'
							});
						}
					}).catch((wrong) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					})
				}
			},
			getRouterData() {
      		// 只是改了query，其他都不变
				  this.id = this.$route.query.bizId;
				  this.$refs.child.view(this.id);
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
					this.up = !this.up
			},
						//报表
			reportdata(){
				this.reportData.app=this.productType;
				this.$refs.reportChild.visible();
			},
//			// 删除
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
						if(changeUser[i].STATE!=1){
						 	this.$message({
								message: '您的数据中有已启动的流程，所以不能删除',
								type: 'error'
							});
							return;
						}else{
							deleteid.push(changeUser[i].ID);
						}
					}
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
					// 删除
			physicsDel() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/inspectPro/deletes/physicsDel';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						if(changeUser[i].STATE!=1){
						 	this.$message({
								message: '您的数据中有已启动的流程，所以不能删除',
								type: 'error'
							});
							return;
						}else{
							deleteid.push(changeUser[i].ID);
						}
					}
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
//			
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
				this.loading = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					V_NAME:this.searchList.V_NAME,
					ITEM_NAME: this.searchList.ITEM_NAME,
					REPORT_NUM: this.searchList.REPORT_NUM,
					PROXYNUM: this.searchList.PROXYNUM,
					COMPDATE: this.searchList.COMPDATE,
					ENTERBY: this.searchList.ENTERBY,
					STATUS: this.searchList.STATUS,
					P_NUM: this.searchList.P_NUM,
					PRO_NUM: this.searchList.PRO_NUM,
					DEPTID: this.searchList.DEPTID
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
					this.loading = false;
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				})
			},

			//机构树
			getKey() {
				let that = this;
				// var url = this.basic_url + '/api-user/depts/tree';
				var url = this.basic_url + '/api-apps/appCustom/tree';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data.datas;
					// this.resourceData = res.data;
					this.treeData = this.transformTree(this.resourceData);
					console.log(this.treeData);
				});
			},
			transformTree(data) {
				for(var i = 0; i < data.length; i++) {
					data[i].name = data[i].fullname || data[i].TYPE || data[i].pName || data[i].PRO_NAME;
					data[i].lable = data[i].fullname || data[i].TYPE || data[i].pName || data[i].PRO_NAME;
					if($.isArray(data[i].children)) {
						data[i].iconClass = 'icon-file-normal';
					} else {
						data[i].iconClass = 'icon-file-text';
					}
					if($.isArray(data[i].children)) {
						data[i].subDepts = this.transformTree(data[i].children);
					}
				}
				return data;
			},
			handleNodeClick(data) {
				if(!!data.fullname) {
					this.searchList.P_NUM = '';
					this.searchList.PRO_NUM = '';
					this.searchList.DEPTID = data.id;
					this.page.currentPage = 1;
				}else if(!!data.TYPE){
					this.searchList.P_NUM = data.NUM;
					this.searchList.PRO_NUM = '';
					this.searchList.DEPTID = data.DEPTID;
					this.page.currentPage = 1;
				}else if(!!data.PRO_NUM){
					this.searchList.P_NUM = data.NUM;
					this.searchList.PRO_NUM = data.PRO_NUM;
					this.searchList.DEPTID = data.DEPTID;
					this.page.currentPage = 1;
				}else{
					this.searchList.P_NUM = '';
					this.searchList.PRO_NUM = '';
					this.searchList.DEPTID = '';
					this.page.currentPage = 1;
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
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
      		},
		},
		beforeMount() {
			// 在页面挂载前就发起请求
			this.requestData();
			this.getKey();
		},
		mounted() {
			if(this.$route.query.bizId!=undefined){
				this.getRouterData();
			}
		},
	}
</script>

<style scope>

</style>