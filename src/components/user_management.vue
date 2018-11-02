<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header></navs_header>
		</div>
		<div class="contentbg">
			<navs></navs>
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
							<button class="btn btn-default btn-outline" type="button" name="refresh" aria-label="refresh" title="刷新">
								<i class="icon-refresh"></i>
							</button>
							<div class="keep-open btn-group" title="列">
								<button type="button" aria-label="columns" class="btn btn-default btn-outline dropdown-toggle" data-toggle="dropdown">
									<i class="icon-menu3"></i> 
									<i class="icon-arrow2-down"></i>
                				</button>

								<ul class="dropdown-menu" role="menu">
									<li role="menuitem">
										<label>
											<input type="checkbox" data-field="id" value="1"> id
										</label>
									</li>
									<li role="menuitem" class="checkbox-group">
										<span>
											<input type="checkbox" data-field="name" value="2" checked="checked">
											<label>名称</label>
										</span>
									</li>
									<li role="menuitem" class="checkbox-group">
										<span>
                							<input type="checkbox" data-field="pName" value="3" checked="checked">
                							<label>上级角色</label>
                						</span>
									</li>
									<li role="menuitem" class="checkbox-group">
										<span>
                							<input type="checkbox" data-field="deptName" value="4" checked="checked">
                							<label>所在部门</label>
                						</span>
									</li>
									<li role="menuitem" class="checkbox-group">
										<span>
                							<input type="checkbox" data-field="companyName" value="5" checked="checked">
                							<label>所在公司</label>
                						</span>
									</li>
									<li role="menuitem" class="checkbox-group">
										<span>
                							<input type="checkbox" data-field="tips" value="6" checked="checked">
                							<label>名</label>
                						</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<!-- 高级查询划出 -->
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
					<!-- 高级查询划出 -->
					<div class="row">
						<div class="col-sm-3">
							<v-assetsTree  :listData="treeData" v-on:getTreeId="getTreeId"></v-assetsTree>
						</div>
						<div class="col-sm-9">
							<!-- <tablediv ref="tableList"></tablediv> -->
							<!-- 表格 -->
							<el-table :data="userList" style="width: 96%;margin: 0 auto;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange">
								<el-table-column type="selection" width="55">
								</el-table-column>
								<el-table-column label="账号" sortable width="80" prop="username">
								</el-table-column>
								<el-table-column label="姓名" sortable width="100" prop="nickname">
								</el-table-column>
								<el-table-column label="性别" sortable width="80" prop="sex" :formatter="sexName">
								</el-table-column>
								</el-table-column>
								<el-table-column label="部门" sortable width="100" prop="deptName">
								</el-table-column>
								<el-table-column label="公司" sortable width="100" prop="companyName">
								</el-table-column>
								<el-table-column label="状态" sortable width="100" prop="enabled" :formatter="judge">
								</el-table-column>
								<el-table-column label="创建时间" width="180" prop="createTime" sortable :formatter="dateFormat">
								</el-table-column>
							</el-table>
							<!-- <span class="demonstration">显示总数</span>" -->
							<!-- <el-pagination background layout="prev, pager, next" :total="2" style="float:right;margin-top:10px;"> -->
							<!-- </el-pagination style="float:right;margin-top:10px;"> -->
							<el-pagination
					            @size-change="sizeChange"
					            @current-change="currentChange"
					            :current-page="page.currentPage"
					            :page-sizes="[10, 20, 30, 40]"
					            :page-size="page.pageSize"
					            layout="total, sizes, prev, pager, next"
					            :total="page.totalCount">
					        </el-pagination>
							<!-- 表格 -->
						</div>
					</div>
				</div>
			</div>
			<usermask ref="child" @request="requestData" @requestTree="getKey"></usermask>
		</div>
	</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs from './common/left_navs/nav_left.vue'
	import navs_header from './common/nav_tabs.vue'
	import assetsTree from './plugin/vue-tree/tree.vue'
	//import navs_button from './common/func_btn.vue'
	//	import ztree from './common/ztree.vue'
	// import tablediv from './common/tablelist.vue'
	import usermask from './common/user_mask.vue'
	export default {
		name: 'user_management',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs': navs,
			'usermask': usermask,
			'v-assetsTree': assetsTree
		},
		data() {
			return {
				selUser: [],
				'启用': true,
				'冻结': false,
				'男': true,
				'女': false,
				userList: [],
				//				deptTree: [], //树
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
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				}
			}
		},
		methods: {
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
				// var data = {
				// 	params: {
				// 		page: 1,
				// 		limit: 10,
				// 		nickname: this.searchList.nickname,
				// 		enabled: this.searchList.enabled,
				// 		searchKey: 'createTime',
				// 		searchValue: this.searchList.createTime
				// 	}
				// };
				// var url = '/api/api-user/users';
				// this.$axios.get(url, data).then((res) => {
				// 	this.userList = res.data.data;
				// }).catch((wrong) => {})
			},
			//添加用戶
			openAddMgr() {
				this.$refs.child.visible();
			},
			//修改用戶
			modify() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要修改的用户',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时修改多个用户',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail(selData[0].id);
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
					return;
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
				return this.$moment(date).format("YYYY-MM-DD");
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
				// var data = {
				// 	params: {
				// 		page: 1,
				// 		limit: 10,
				// 	}
				// }
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					nickname: this.searchList.nickname,
					enabled: this.searchList.enabled,
					searchKey: 'createTime',
					searchValue: this.searchList.createTime
				}
				console.log(data);
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
			//机构树
			getKey() {
				let that = this;
				var url = '/api/api-user/depts/tree';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data;
					this.treeData = this.transformTree(this.resourceData);
				});
			},
			transformTree(data){
				for(var i=0; i<data.length; i++){
					data[i].name = data[i].fullname;
					if(!data[i].pid || $.isArray(data[i].subDepts)){
						data[i].iconClass = 'icon-file-normal';
					}else{
						data[i].iconClass = 'icon-file-text';
					}
					if($.isArray(data[i].subDepts)){
						data[i].children = this.transformTree(data[i].subDepts);
					}
				}
				return data;
			},
			getTreeId(data){
				console.log("============="+data);
			},
			handleNodeClick(data) {
			},
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
	.headerbg {
		width: 100%;
		height: 100px;
		position: fixed;
		z-index: 999;
	}
	
	.contentbg {
		padding-top: 100px;
		height: 100%;
	}
	
	.wrapper {
		width: 100%;
		height: 100%;
		padding-left: 220px;
		position: relative;
	}
	
	.ibox-content {
		background-color: #F5F8FB;
		color: inherit;
		padding: 0px 20px 20px 10px;
		border-color: #e7eaec;
		-webkit-border-image: none;
		-o-border-image: none;
		border-image: none;
		border-style: solid solid none;
		border-width: 1px 0px;
	}
	
	[class*=" btn-"],
	[class^="btn-"] {
		color: #FFFFFF;
		font-size: 14px;
	}
	
	[class*=" btn-"] i,
	[class^="btn-"] i {
		margin-right: 5px;
	}
	
	.btn-green {
		background-color: #25b99e;
		border-color: #25b99e;
	}
	
	.btn-bule {
		background-color: #2fa5e5;
		border-color: #2fa5e5;
	}
	
	.btn-red {
		background-color: #e3517c;
		border-color: #e3517c;
	}
	
	.btn-primarys {
		background-color: #5d7fde;
		border-color: #5d7fde;
	}
	
	.btn-default {
		background-color: #ffffff;
		color: #5B6371;
		border: 1px solid #dfe5ea;
	}
	
	.btn-default:hover {
		color: #576FAE;
	}
	
	.fixed-table-toolbar {
		position: relative;
		padding-top: 10px;
		padding-bottom: 12px;
		height: 55px;
		line-height: 30px;
	}
	
	.fixed-table-toolbar .columns {
		position: relative;
		height: 30px;
	}
	
	.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	
	.fixed-table-toolbar .btn-group>.btn-group {
		display: inline-block;
		margin-left: -1px!important;
	}
	
	.btn-group>.btn-group,
	.btn-group>.btn {
		float: left;
	}
	
	.btn-group,
	.btn-group-vertical {
		position: relative;
		display: inline-block;
		vertical-align: middle;
	}
	
	.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	
	.fixed-table-toolbar .btn-group>.btn-group:last-child>.btn {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
</style>