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
				<EasyScrollbar>
					<div id="wrapper" ref="homePagess" style="height: 600px;">
						<div id="information" style="height: inherit;">
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
										<el-row :gutter="20">
											<el-col :span="5">
												<el-date-picker v-model="searchList.XD_DATE" type="date" placeholder="下达日期" value-format="yyyy-MM-dd">
												</el-date-picker>
											</el-col>
											<el-col :span="5">
												<el-date-picker v-model="searchList.COMPDATE" type="date" placeholder="完成日期" value-format="yyyy-MM-dd">
												</el-date-picker>
											</el-col>
											<el-col :span="3" class="pt5">
												<el-select v-model="searchList.value" placeholder="请选择状态">
													<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
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
										<el-table :data="nitificationsList" border stripe height="400" style="width: 100%;" :default-sort="{prop:'nitificationsList', order: 'descending'}" @selection-change="SelChange">
											<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
											</el-table-column>
											<el-table-column label="工作任务通知书编号" width="200" sortable prop="N_CODE" v-if="this.checkedName.indexOf('工作任务通知书编号')!=-1">
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
											<el-table-column label="任务号" width="120" prop="SOLUTION" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('任务号')!=-1">
											</el-table-column>
											<el-table-column label="抽样方案" width="120" prop="SOLUTION" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('抽样方案')!=-1">
											</el-table-column>
											<el-table-column label="完成日期" width="120" prop="COMPDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('完成日期')!=-1">
											</el-table-column>
											<el-table-column label="状态" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('状态')!=-1">
											</el-table-column>
											<el-table-column label="录入人" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入人')!=-1">
											</el-table-column>
										</el-table>
										<el-pagination background class="pull-right pt10 pb10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
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
		</div>
	</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs_header from './common/nav_tabs.vue'
	import tableControle from './plugin/table-controle/controle.vue'
	export default {
		name: 'notifications',
		components: {
			vheader,
			navs_header,
			tableControle
		},
		data() {
			return {
				dataUrl: '/api/api-user/users',
				searchData: {
					page: 1,
					limit: 10, //分页显示数
					nickname: '',
					enabled: '',
					searchKey: '',
					searchValue: '',
					companyId: '',
					deptId: ''
				},
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
					'状态',
					'录入人'
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
						prop: 'SOLUTION'
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
						label: '状态',
						prop: 'STATUS'
					},
					{
						label: '录入人',
						prop: 'ENTERBY'
					}
				],

				selUser: [],
				nitificationsList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin: true,
				clientHeight: '', //获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					nickname: '',
					enabled: '',
					createTime: ''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				userData: [],
				page: { //分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				aaaData: [],
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
						message: '请您选择要修改的用户',
						type: 'warning'
					});
					return;
				} else if(this.aaaData.length > 1) {
					this.$message({
						message: '不可同时修改多个用户',
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
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的用户',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时删除多个用户',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.id;
					var url = '/api/api-user/users/' + id;
					this.$axios.delete(url, {}).then((res) => { //.delete 传数据方法
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
			judge(data) {
				//taxStatus 布尔值
				return data.enabled ? '活动' : '不活动'
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
					nickname: this.searchList.nickname,
					enabled: this.searchList.enabled,
					searchKey: 'createTime',
					searchValue: this.searchList.createTime,
					companyId: this.companyId,
					deptId: this.deptId
				}
				var url = '/api/api-user/users';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.nitificationsList = res.data.data;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
				this.nitificationsList.forEach((item, index) => {
					var id = item.id;
					this.$axios.get('/users/' + id + '/roles', data).then((res) => {
						this.nitificationsList.role = res.data.roles[0].name;
					}).catch((wrong) => {})
				})
			},
			handleNodeClick(data) {},
			formatter(row, column) {
				return row.enabled;
			},
		},
		mounted() {
			this.requestData();
		},
	}
</script>

<style scoped>

</style>