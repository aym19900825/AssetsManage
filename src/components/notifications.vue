<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header ref="navsheader"></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单内容显示 Begin-->
			<div style="display:none;">
				<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
			</div>
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
								<button type="button" class="btn btn-blue button-margin" @click="modify">
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
					<div v-show="search">
						<el-form :model="searchList">
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="工作任务通知书编号" prop="N_CODE" label-width="140px">
										<el-input v-model="searchList.N_CODE"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="受检产品名称" prop="ITEM_NAME" label-width="110px">
										<el-input v-model="searchList.ITEM_NAME"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="承检单位" prop="CJDW" label-width="75px">
										<el-select clearable v-model="searchList.CJDW" filterable allow-create default-first-option placeholder="请选择">
											<el-option v-for="(data,index) in selectDept" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="类型" prop="TYPE" label-width="45px">
										<el-select clearable v-model="searchList.TYPE" placeholder="请选择类别" style="width: 100%;">
											<el-option v-for="(data,index) in selectData" :key="index" :value="data.code" :label="data.name"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="下达日期" prop="XD_DATE" label-width="140px">
										<el-date-picker v-model="searchList.XD_DATE" type="date" placeholder="下达日期" value-format="yyyy-MM-dd" style="width: 100%">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="完成日期" prop="COMPDATE" label-width="110px">
										<el-date-picker v-model="searchList.COMPDATE" type="date" placeholder="完成日期" value-format="yyyy-MM-dd" style="width: 100%">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<!-- <el-col :span="3" class="pt5">
									<el-select v-model="searchList.value" placeholder="请选择信息状态">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col> -->
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
									<div class="pull-left pr20" v-if="ismin">类型</div>
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
							<el-table :data="nitificationsList" :header-cell-style="rowClass" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'nitificationsList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="工作任务通知书编号" width="180" sortable prop="N_CODE" v-if="this.checkedName.indexOf('工作任务通知书编号')!=-1">

									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row.ID)>{{scope.row.N_CODE}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="类型" width="100" sortable prop="TYPEDesc" v-if="this.checkedName.indexOf('类型')!=-1">
								</el-table-column>
								<el-table-column label="下达日期" width="130" sortable prop="XD_DATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('下达日期')!=-1">
								</el-table-column>
								<el-table-column label="受检产品名称" width="150" sortable prop="ITEM_NAME" v-if="this.checkedName.indexOf('受检产品名称')!=-1">
								</el-table-column>
								<el-table-column label="受检产品型号" width="120" sortable prop="ITEM_MODEL" v-if="this.checkedName.indexOf('受检产品型号')!=-1">
								</el-table-column>
								<el-table-column label="受检企业" width="150" sortable prop="V_NAME" v-if="this.checkedName.indexOf('受检企业')!=-1">
								</el-table-column>
								<el-table-column label="承检单位" width="150" sortable prop="CJDWDesc" v-if="this.checkedName.indexOf('承检单位')!=-1">
								</el-table-column>
								<el-table-column label="任务号" width="120" prop="TASKNUM" sortable v-if="this.checkedName.indexOf('任务号')!=-1">
								</el-table-column>
								<el-table-column label="抽样方案" width="120" prop="SOLUTION" sortable v-if="this.checkedName.indexOf('抽样方案')!=-1">
								</el-table-column>
								<el-table-column label="完成日期" width="130" prop="COMPDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('完成日期')!=-1">
								</el-table-column>
								<!-- <el-table-column label="信息状态" width="120" prop="STATUS" sortable v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column> -->
								<!--<el-table-column label="录入人" width="120" prop="ENTERBY" sortable v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column>-->
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
			<notificationsmask @request="requestData" ref="child" v-bind:page=page></notificationsmask>
		</div>
	</div>
</template>
<script>
	import Config from '../config.js'
	import vheader from './common/vheader.vue'
	import navs_header from './common/nav_tabs.vue'
	import navs_left from './common/left_navs/nav_left5.vue'
	import tableControle from './plugin/table-controle/controle.vue'
	import notificationsmask from './common/notification_mask.vue'

	export default {
		name: 'notifications',
		components: {
			vheader,
			navs_header,
			navs_left,
			tableControle,
			notificationsmask,

		},
		data() {
			return {
				basic_url: Config.dev_url,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
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
				selectData: [], //获取检验/检测方法类别
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
					//					'录入人',
					//					'录入时间'
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
						prop: 'V_NAME'
					},
					{
						label: '承检单位',
						prop: 'CJDWDesc'
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
					//					{
					//						label: '录入人',
					//						prop: 'ENTERBY'
					//					},
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
				resourceData: [{
						label: '监督抽查'
					},
					{
						label: '监督抽查复查'
					},
					{
						label: '质量抽查'
					},
					{
						label: '质量抽查复查'
					},
					{
						label: '生产许可证'
					},
					{
						label: '认定检验检测'
					},
					{
						label: '鉴定试验'
					},
					{
						label: '委托检验检测'
					},
					{
						label: '专项抽查'
					},
					{
						label: '专项抽查复查'
					},
					{
						label: '其它'
					},
				], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					label: "label"
				},
				page: { //分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				treeData: [],
				selectDept: [],
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
			//检验/检测方法类别
			getType() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=type';
				this.$axios.get(url, {}).then((res) => {
					console.log(res.data);
					this.selectData = res.data;
					console.log(2333333);
					console.log(this.selectData);
				}).catch(error => {
					console.log('请求失败');
				})
			},
			//表头居中
			rowClass({
				row,
				rowIndex
			}) {
				// console.log(rowIndex) //表头行标号为0
				return 'text-align:center'
			},
			//机构值
			getCompany() {
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					console.log(res.data);
					this.selectDept = res.data;
				});
			},
			//滚动加载
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
				resetbtn(){
				this.searchList =  { //点击高级搜索后显示的内容
					N_CODE: '',
					ITEM_NAME: '',
					CJDW: '',
					TYPE: '',
					XD_DATE: '',
					COMPDATE: '',
					STATUS: ''
				};
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加用戶
			openAddMgr() {
				this.$refs.child.visible();
				this.$refs.child.open();
			},
			//修改用戶
			modify() {
				console.log(this.selUser);
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
						var url = this.basic_url + '/api-apps/app/workNot/flow/isExecute/' + this.selUser[0].ID;
						this.$axios.get(url, {}).then((res) => {
							console.log(res);
							if(res.data.resp_code == 0) {
								var url = this.basic_url + '/api-apps/app/workNot/flow/isPromoterNode/' + this.selUser[0].ID;
								this.$axios.get(url, {}).then((res) => {
									console.log(res);
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
				console.log(id);
				this.$refs.child.view(id);
			},
			//代办跳转
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
			//			getKey() {
			//				let that = this;
			//				var url = this.basic_url + '/api-user/depts/tree';
			//				this.$axios.get(url, {}).then((res) => {
			//					this.resourceData = res.data;
			//					this.treeData = this.transformTree(this.resourceData);
			//				});
			//			},

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
				for(var i = 0; i < this.selectData.length; i++) {
					if(data.label == this.selectData[i].name) {
						this.searchList.TYPE = this.selectData[i].code;
					}
				}
				this.requestData();
			},
			//			树节点的内容区的渲染 Function
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
			formatter(row, column) {
				return row.enabled;
			},
			childByValue: function(childValue) {
				// childValue就是子组件传过来的值
				this.$refs.navsheader.showClick(childValue);
			},

		},
		beforeMount() {
			// 在页面挂载前就发起请求
			this.requestData();
			//			this.getKey();
			this.getType();
			this.getCompany();
		},
		mounted() {
			console.log(this.$route.query.bizId);
			if(this.$route.query.bizId != undefined) {
				this.getRouterData();
			}
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