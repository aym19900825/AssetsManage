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
					<div id="information" style="height: inherit;">
						<div class="ibox-content">
							<!--按钮操作行 Begin-->
							<div class="fixed-table-toolbar clearfix">
								<div class="bs-bars pull-left">
									<div class="hidden-xs" id="roleTableToolbar" role="group">
										<button type="button" class="btn btn-green" @click="openAddMgr">
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
									<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
								</div>
							</div>
							<!--按钮操作行 End-->

							<!-- 高级查询划出 Begin-->
							<div v-show="search" class="pb10">
									<el-form status-icon :model="searchList" label-width="70px">
										<el-row :gutter="10">
											<el-col :span="5">
												<el-input v-model="searchList.P_NUM">
													<template slot="prepend">项目编号</template>
												</el-input>
											</el-col>
											<el-col :span="5">
												<el-input v-model="searchList.DEPARTMENT">
													<template slot="prepend">认证机构</template>
												</el-input>
											</el-col>
											<el-col :span="5">
												<el-input v-model="searchList.P_NAME">
													<template slot="prepend">项目名称</template>
												</el-input>
											</el-col>
											<el-col :span="4">
												<el-input v-model="searchList.VERSION">
													<template slot="prepend">版本</template>
												</el-input>
											</el-col>
											<el-col :span="3" class="pt5">
												<el-select v-model="searchList.STATUS" placeholder="请选择状态">
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
									<el-table :data="projectList" border stripe height="400" style="width: 100%;" :default-sort="{prop:'projectList', order: 'descending'}" @selection-change="SelChange">
										<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
										</el-table-column>
										<el-table-column label="检验/检测项编号" width="150" sortable prop="P_NUM" v-if="this.checkedName.indexOf('检验/检测项编号')!=-1">
										</el-table-column>
										<el-table-column label="项目名称" width="220" sortable prop="P_NAME" v-if="this.checkedName.indexOf('项目名称')!=-1">
										</el-table-column>
										<el-table-column label="人员资质" width="180" sortable prop="QUALIFICATION" v-if="this.checkedName.indexOf('人员资质')!=-1">
										</el-table-column>
										<el-table-column label="状态" width="100" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('状态')!=-1">
										</el-table-column>
										<!--<el-table-column label="文档" width="120" sortable prop="DOCLINKP_NAME" v-if="this.checkedName.indexOf('文档')!=-1">-->
										</el-table-column>
										<el-table-column label="领域" width="120" sortable prop="STARTETIME" v-if="this.checkedName.indexOf('领域')!=-1">
										</el-table-column>
										<el-table-column label="子领域" width="120" sortable prop="STARTETIME" v-if="this.checkedName.indexOf('子领域')!=-1">
										</el-table-column>
										<el-table-column label="版本" width="100" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1">
										</el-table-column>
										<el-table-column label="机构" width="180" sortable prop="DEPARTMENT" v-if="this.checkedName.indexOf('机构')!=-1">
										</el-table-column>
										<el-table-column label="录入人" width="120" prop="ENTERBY" sortable  v-if="this.checkedName.indexOf('录入人')!=-1">
										</el-table-column>
										<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
										</el-table-column>
										<el-table-column label="修改人" width="120" prop="CHANGEBY" sortable  v-if="this.checkedName.indexOf('修改人')!=-1">
										</el-table-column>
										<el-table-column label="修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
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
		<projectmask :dataInfo="aaaData[0]" @request="requestData" ref="child" v-bind:page=page ></projectmask>
	
	</div>
</div>
</template>
<script>
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left2.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import projectmask from '../maindataDetails/testing_projectMask.vue'
	export default {
		name: 'testing_projects',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			projectmask
		},
		data() {
			return {
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				
				checkedName: [
					'检验/检测项编号',
					'项目名称',
					'人员资质',
					'状态',
					'领域',
					'子领域',
					'版本',
					'机构',
					'录入人',
					'录入时间',
					'修改人',
					'修改时间'
				],
				tableHeader: [
					{
						label: '检验/检测项编号',
						prop: 'P_NUM'
					},
					{
						label: '项目名称',
						prop: 'P_NAME'
					},
					
					{
						label: '人员资质',
						prop: 'QUALIFICATION'
					},
					{
						label: '状态',
						prop: 'STATUS'
					},
					{
						label: '领域',
						prop: 'FIELD'
					},
					{
						label: '子领域',
						prop: 'CHILD_FIELD'
					},
					{
						label: '版本',
						prop: 'VERSION'
					},
					{
						label: '机构',
						prop: 'DEPARTMENT'
					},
					{
						label: '录入人',
						prop: 'ENTERBY'
					},
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
						label: '修改人',
						prop: 'CHANGEBY'
					},
					{
						label: '修改时间',
						prop: 'CHANGEDATE'
					}
				],
				
				companyId: '',
				deptId: '',
				selUser: [],
				'活动': true,
				'不活动': false,
				projectList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				clientHeight:'',//获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					P_NUM: '',
					DEPARTMENT:'',
					P_NAME: '',
					VERSION: '',
					STATUS:'',
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				userData:[],
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
			tableControle(data){
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
				this.$refs.child.resetNew();
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
					var id = changeUser.ID;
					var url = '/api/api-apps/app/inspectionPro/' + id;
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
			judge(data) {
				return data.STATUS=="1" ? '活动' : '不活动'
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
					P_NUM: this.searchList.P_NUM,
					DEPARTMENT: this.searchList.DEPARTMENT,
					P_NAME: this.searchList.P_NAME,
					VERSION: this.searchList.VERSION,
					STATUS: this.searchList.STATUS,
				}
				var url = '/api/api-apps/app/inspectionPro';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.projectList = res.data.data;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
			},
			handleNodeClick(data) {
			},
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