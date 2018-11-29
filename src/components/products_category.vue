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
						<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
					</div>
				</div>
				<!--按钮操作行 End-->

				<!-- 高级查询划出 Begin-->
				<div v-show="search" class="pb10">
					<el-form status-icon :model="searchList" label-width="70px">
						<el-row :gutter="10">
							<el-col :span="5">
								<el-input v-model="searchList.TYPE">
									<template slot="prepend">类别名称</template>
								</el-input>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.NAME">
									<template slot="prepend">单位名称</template>
								</el-input>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.PHONE">
									<template slot="prepend">联系电话</template>
								</el-input>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.CONTACT_ADDRESS">
									<template slot="prepend">联系地址</template>
								</el-input>
							</el-col>
							<el-col :span="2" style="padding-top: 3px">
								<el-select v-model="searchList.STATUS" placeholder="状态">
								      <el-option label="活动" value="1">	
								      </el-option>
								      <el-option label="不活动" value="0">
								      </el-option>
								    </el-select>
							</el-col>
							<el-col :span="2">
								<el-button class="pull-right" type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 高级查询划出 End-->
				<el-row>
					<el-col :span="24">
						<!-- 表格 Begin-->
						<el-table :data="userList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange">
							<el-table-column type="selection" fixed width="55" v-if="this.checkedName.length>0">
							</el-table-column>
							<el-table-column label="产品类别编号" width="155" sortable prop="NUM" v-if="this.checkedName.indexOf('产品类别编号')!=-1">
							</el-table-column>
							<el-table-column label="产品类别名称" width="155" sortable prop="TYPE" v-if="this.checkedName.indexOf('产品类别名称')!=-1">
							</el-table-column>
							</el-table-column>
							<el-table-column label="状态" width="155" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('状态')!=-1">
							</el-table-column>
							<el-table-column label="版本" width="155" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1">
							</el-table-column>
							<el-table-column label="机构" width="155" sortable prop="DEPARTMENT" v-if="this.checkedName.indexOf('机构')!=-1">
							</el-table-column>
							<el-table-column label="录入人" width="155" prop="ENTERBY" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入人')!=-1">
							</el-table-column>
							<el-table-column label="录入时间" width="155" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
							</el-table-column>
							<el-table-column label="修改人" width="155" prop="CHANGEBY" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改人')!=-1">
							</el-table-column>
							<el-table-column label="修改时间" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
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
						<!-- 表格 End-->
					</el-col>
				</el-row>
							
			</div>
		</div>
		<!--右侧内容显示 End-->
		<categorymask ref="child" @request="requestData" v-bind:page=page></categorymask>
	</div>
</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs_left from './common/left_navs/nav_left2.vue'
	import navs_header from './common/nav_tabs.vue'
	import categorymask from './common/category_mask.vue'
	import table from './plugin/table/table-normal.vue'
	import tableControle from './plugin/table-controle/controle.vue'
	export default {
		name: 'customer_management',
		components: {
			vheader,
			navs_left,
			navs_header,
			categorymask,
			tableControle,
			table,
		},
		data() {
			return {
				searchData: {
			        page: 1,
			        limit: 10,//分页显示数
			        nickname: '',
			        enabled: '',
			        searchKey: '',
			        searchValue: '',
			        companyId: '',
			        deptId: ''
		        },
				checkedName: [
					'产品类别编号',
					'产品类别名称',
					'机构',
					'状态',
					'版本',
					'录入人',
					'录入时间',
					'修改人',
					'修改时间'
				],
				tableHeader: [
					{
						label: '产品类别编号',
						prop: 'NUM'
					},
					{
						label: '产品类别名称',
						prop: 'TYPE'
					},
					{
						label: '机构',
						prop: 'DEPARTMENT'
					},
					{
						label: '状态',
						prop: 'STATUS'
					},
					{
						label: '版本',
						prop: 'VERSION'
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
				leftNavs: [//leftNavs左侧菜单数据
					{
						navicon: 'icon-user',
						navtitle: '用户管理',
						navherf: '/personinfo'
					}, {
						navicon: 'icon-edit',
						navtitle: '机构管理',
						navherf: '/dept_management'
					}, {
						navicon: 'icon-role-site',
						navtitle: '角色管理',
						navherf: '/role_management'
					}, {
						navicon: 'icon-file-text',
						navtitle: '客户管理',
						navherf: '/customer_management'
					}, {
						navicon: 'icon-file-text',
						navtitle: '产品类别',
						navherf: '/products_category'
					}, {
						navicon: 'icon-file-text',
						navtitle: '产品',
						navherf: '/products'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测标准',
						navherf: '/testing_standard'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测项目',
						navherf: '/testing_projects'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测方法',
						navherf: '/testing_methods'
					}, {
						navicon: 'icon-file-text',
						navtitle: '自动编号设置',
						navherf: '/number_settings'
					}
				],
				companyId: '',
				deptId: '',
				selUser: [],
				'启用': true,
				'冻结': false,
				userList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {//点击高级搜索后显示的内容
					TYPE: '',
					NAME: '',
					PHONE: '',
					CONTACT_ADDRESS:'',
					STATUS:''
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
				//taxStatus 布尔值
				return data.enabled ? '启用' : '冻结'
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				// return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");  
			},
			insert() {
				this.users.push(this.user)
			},
			remove(index) {
				this.users.splice(index, 1)
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
					this.userList = res.data.data;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
				this.userList.forEach((item, index) => {
					var id = item.id;
					this.$axios.get('/users/' + id + '/roles', data).then((res) => {
						this.userList.role = res.data.roles[0].name;
					}).catch((wrong) => {})
				})
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