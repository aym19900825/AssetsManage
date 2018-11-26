<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单调用 Begin-->
			<navs_left></navs_left>
			<!--左侧菜单调用 End-->
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
								<button type="button" class="btn btn-red button-margin" @click="deluserinfo">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="resetPwd">
								    <i class="icon-refresh"></i>重置密码
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="unfreeze">
								    <i class="icon-start"></i>启用
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="freezeAccount">
								    <i class="icon-stop"></i>冻结
								</button>
								<button type="button" class="btn btn-primarys button-margin">
								    <i class="icon-role-site"></i>角色分配
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
										<el-checkbox-group v-model="checkedName" @change="test">
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
						<el-form status-icon :model="searchList" label-width="70px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="用户名">
										<el-input v-model="searchList.nickname"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="状态">
										<el-input v-model="searchList.enabled"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="创建时间">
										<el-input v-model="searchList.createTime"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="2">
									<el-button type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
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
								<div class="left_treebg">
									<div class="p15" v-if="ismin">
										<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all :indent="22" :render-content="renderContent"  :props="resourceProps" @node-click="handleNodeClick">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="19" class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="userList" border stripe height="400" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="账号" sortable width="140px" prop="username" v-if="this.checkedName.indexOf('账号')!=-1">
								</el-table-column>
								<el-table-column label="姓名" sortable width="200px" prop="nickname" v-if="this.checkedName.indexOf('姓名')!=-1">
								</el-table-column>
								<el-table-column label="性别" sortable width="100px" prop="sex" :formatter="sexName" v-if="this.checkedName.indexOf('性别')!=-1">
								</el-table-column>
								<el-table-column label="机构" sortable width="200px" prop="deptName" v-if="this.checkedName.indexOf('机构')!=-1">
								</el-table-column>
								<el-table-column label="公司" sortable width="200px" prop="companyName" v-if="this.checkedName.indexOf('公司')!=-1">
								</el-table-column>
								<el-table-column label="状态" sortable width="200px" prop="enabled" :formatter="judge" v-if="this.checkedName.indexOf('状态')!=-1">
								</el-table-column>
								<el-table-column label="创建时间" width="200px" prop="createTime" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('创建时间')!=-1">
								</el-table-column>
							</el-table>
							<!-- <span class="demonstration">显示总数</span>" -->
							<!-- <el-pagination background layout="prev, pager, next" :total="2" style="float:right;margin-top:10px;"> -->
							<!-- </el-pagination style="float:right;margin-top:10px;"> -->
							<el-pagination background class="pull-right" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<usermask :user="aaaData[0]" ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></usermask>
		<!--右侧内容显示 End-->
	</div>
	</div>
</template>
<script>
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
//	import assetsTree from '../plugin/vue-tree/tree2.vue'
	import usermask from '../settingDetails/user_mask.vue'
	export default {
		name: 'user_management',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs_left': navs_left,
			'usermask': usermask,
//			'v-assetsTree': assetsTree
		},
		data() {
			return {
				isShow: false,
				ismin: true,
				loadSign: true, //加载
				commentArr: {},
				checkedName: [
					'账号',
					'姓名',
					'性别',
					'机构',
					'状态',
					'创建时间'
				],
				tableHeader: [{
						label: '账号',
						prop: 'username'
					},
					{
						label: '姓名',
						prop: 'nickname'
					},
					{
						label: '性别',
						prop: 'sexName'
					},
					{
						label: '机构',
						prop: 'deptName'
					},
					{
						label: '状态',
						prop: 'enabled'
					},
					{
						label: '创建时间',
						prop: 'createTime'
					}
				],

				companyId: '',
				deptId: '',
				selUser: [],
				'启用': true,
				'冻结': false,
				'男': true,
				'女': false,
				userList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				searchList: {
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
				treeData: [],
				userData: [],
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				aaaData: [],
			}
		},
		methods: {
			renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
				//console.log();
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

			filterHandler(value, row, column) {
				const property = column['property'];
				return row[property] === value;
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
					this.requestData()
					//console.log('到底了', this.page.currentPage)
				}
			},
			test() {
				console.log(this.checkedName.indexOf('账号') != -1);
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
				this.aaaData = [{
					companyName: '',
					deptName: '',
					username: '',
					password: '',
					nickname: '',
					birthday: '',
					sexName: '',
					idnumber: '',
					entrytime: '',
					roleId: [],
					roles: [],
					worknumber: '',
					phone: '',
					email: '',
					address: '',
					tips: ''
				}];
				this.$refs.child.detail();
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
					this.aaaData[0].roleId = [];
					var roles = this.aaaData[0].roles;
					for(var i = 0; i < roles.length; i++) {
						this.aaaData[0].roleId.push(roles[i].id);
					}
					//					console.log(this.aaaData[0].roleId);
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
			// 重置
			resetPwd() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要重置密码的用户',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时多个用户进行重置',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.id;
					var url = '/api/api-user/users/' + id + '/resetPassword';
					this.$axios.post(url, {}).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '重置成功',
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
			// 启用
			unfreeze() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择您要启动的用户',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时启动多个用户',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var url = '/api/api-user/users/updateEnabled?id=' + changeUser.id + '&enabled=true';
					this.$axios.get(url, {}).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '启动成功',
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
			// 冻结
			freezeAccount() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择您要冻结的用户',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时冻结多个用户',
						type: 'warning'
					});
					return
				} else {
					var changeUser = selData[0];
					var url = '/api/api-user/users/updateEnabled?id=' + changeUser.id + '&enabled=false';
					this.$axios.get(url, {}).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '冻结成功',
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
			judge(data) {
				//taxStatus 布尔值
				return data.enabled ? '启用' : '冻结'
			},
			sexName(data) {
				return data.sex ? '男' : '女'
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD HH:mm:ss"); 
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
					//					console.log(res)
					//					this.userList = res.data.data;
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

					this.userList = newarr;
				}).catch((wrong) => {})
				this.userList.forEach((item, index) => {
					var id = item.id;
					this.$axios.get('/users/' + id + '/roles', data).then((res) => {
						this.userList.role = res.data.roles[0].name;
					}).catch((wrong) => {})
				})
			},

			//机构树
			getKey() {
				let that = this;
				var url = '/api/api-user/depts/tree';
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
				//console.log(111222);
				//console.log(data);
				return data;
				
			},
			handleNodeClick(data) {
				//console.log(111);
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

		}
	}
</script>

<style scope>


/* .el-tree .el-icon-caret-right:before {图标加号
    font-family: 'hxqheam';
    content: "\e9bc";
    position: absolute;
    z-index: 22;
}
.el-tree .el-icon-caret-right:after {
  content: "";
  width: 10px;
  position: absolute;
  border-bottom: 1px dashed #C7CED6;
  top: 7px;
  right: -4px;
  z-index: 1;
}



.el-tree .el-tree-node__expand-icon.is-leaf,.el-tree .el-tree-node__expand-icon.is-leaf:before {
  border:none;
  background:transparent;
  content: "";
}


.el-tree .el-tree-node__expand-icon.expanded {图标加号点击后不旋转，原Element会旋转
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}

.el-tree .el-tree-node__expand-icon.expanded:before {图标减号
    font-family: 'hxqheam';
    content: "\e99f";
} */



/* 
[role=group].el-tree-node__children,
[role=group].el-tree-node__children [role=group].el-tree-node__children,
[role=group].el-tree-node__children .el-tree-node__content {position: relative;}

[role=group].el-tree-node__children:before,
[role=group].el-tree-node__children [role=group].el-tree-node__children:before,
[role=group].el-tree-node__children .el-tree-node__content:before{
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


[role=group].el-tree-node__children .el-tree-node__content:before{
  top:-15px;
}

.el-tree>div[role=treeitem]:nth-last-child(2)>div[role=group]:before,
.el-tree>div[role=treeitem] div[role=treeitem]:nth-last-child(1)>div[role=group]:before
{
  display: none;
} */

</style>