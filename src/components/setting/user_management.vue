<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header  ref="navsheader"></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单调用 Begin-->
			<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
			<!--左侧菜单调用 End-->
			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<!--<navs_button></navs_button>-->
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button v-for="item in buttons" class="btn mr5" :class="item.style" @click="getbtn(item)">
									<i :class="item.icon"></i>{{item.name}}
								</button>
								<!--<button type="button" class="btn btn-green" @click="openAddMgr" id="">
                                	<i class="icon-add"></i>添加
                      			</button>
								<button type="button" class="btn btn-blue button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" @click="deluserinfo">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="resetPwd">
								    <i class="icon-refresh"></i>重置密码
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="unfreeze">
								    <i class="icon-start"></i>活动
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="freezeAccount">
								    <i class="icon-stop"></i>不活动
								</button>
								<button type="button" class="btn btn-primarys button-margin">
								    <i class="icon-role-site"></i>角色分配
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
						    		<i class="icon-search"></i>高级查询
						    		<i class="icon-arrow1-down" v-show="down"></i>
						    		<i class="icon-arrow1-up" v-show="up"></i>
								</button>-->
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
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="用户名" prop="username" label-width="55px">
										<el-input v-model="searchList.username">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="姓名" prop="nickname" label-width="45px">
										<el-input v-model="searchList.nickname">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="机构名称" prop="deptId" label-width="70px">
										<el-select clearable v-model="searchList.deptId" filterable allow-create default-first-option placeholder="请选择" style="width: 90%;border-radius:none">
										    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
									<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;margin-left: 2px">重置</el-button>
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
										<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all  :indent="22" :render-content="renderContent"  :props="resourceProps" @node-click="handleNodeClick">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="19" class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="userList" 
									  border 
									  stripe 
									  :header-cell-style="rowClass" 
									  :height="fullHeight" 
									  style="width: 100%;" 
									  :default-sort="{prop:'userList', order: 'descending'}" 
									  @selection-change="SelChange" 
									  v-loadmore="loadMore"
									  v-loading="loading"  
								  	  element-loading-text="拼命加载中"
								  	  element-loading-spinner="el-icon-loading"
								  	  element-loading-background="rgba(0, 0, 0, 0.6)">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="用户名" sortable width="140px" prop="username" v-if="this.checkedName.indexOf('用户名')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row.id)>{{scope.row.username}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="姓名" sortable width="200px" prop="nickname" v-if="this.checkedName.indexOf('姓名')!=-1">
								</el-table-column>
								<el-table-column label="性别" sortable width="100px" prop="sexName" v-if="this.checkedName.indexOf('性别')!=-1">
								</el-table-column>
								<el-table-column label="机构" sortable width="150px" prop="deptName" v-if="this.checkedName.indexOf('机构')!=-1">
								</el-table-column>
								<el-table-column label="手机号" sortable width="150px" prop="phone" v-if="this.checkedName.indexOf('手机号')!=-1">
								</el-table-column>
								<el-table-column label="员工号" sortable width="150px" prop="worknumber" v-if="this.checkedName.indexOf('员工号')!=-1">
								</el-table-column>
								<el-table-column label="用户有效期" prop="user_active_date" width="150px" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('用户有效期')!=-1">
								</el-table-column>
								<!-- <el-table-column label="公司" sortable prop="companyName" v-if="this.checkedName.indexOf('公司')!=-1">
								</el-table-column> -->

								<!--<el-table-column label="信息状态" sortable width="200px" prop="enabled" :formatter="judge" v-if="this.checkedName.indexOf('信息状态')!=-1">

								</el-table-column>-->
								<!-- <el-table-column label="创建时间" prop="createTime" width="100px" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('创建时间')!=-1">
								</el-table-column> -->
							</el-table>
							<!-- <span class="demonstration">显示总数</span>" -->
							<!-- <el-pagination background layout="prev, pager, next" :total="2" style="float:right;margin-top:10px;"> -->
							<!-- </el-pagination style="float:right;margin-top:10px;"> -->
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<usermask :user="user" ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></usermask>
		<!--右侧内容显示 End-->
	</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
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
				loading: false,
				basic_url: Config.dev_url,
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				loadSign: true, //加载
				commentArr: {},
				checkedName: [
					'用户名',
					'姓名',
					'性别',
					'机构',
					'手机号',
					'员工号',
					'用户有效期',
					// '公司',
					// '信息状态',
					// '创建时间'
				],
				buttons: [],//请求回的按钮
				tableHeader: [{
						label: '用户名',
						prop: 'username'
					},
					{
						label: '姓名',
						prop: 'nickname'
					},
					{
						label: '性别',
						prop: 'GENDER'
					},
					{
						label: '机构',
						prop: 'deptName'
					},
					{
						label: '手机号',
						prop: 'phone'
					},
					{
						label: '员工号',
						prop: 'worknumber'
					},
					{
						label: '用户有效期',
						prop: 'user_active_date'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'enabled'
					// },
					// {
					// 	label: '创建时间',
					// 	prop: 'createTime'
					// }
				],
				leftitem:'',//点击左侧传过来的
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
					username: '',
					deptId: ''
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
					pageSize: 20,
					totalCount: 0
				},
				user: {},//修改子组件时传递数据
				selectData: [],
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
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
					this.selectData = res.data;
				});
			},
			renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
				//console.log();
				return (<span><i class={data.iconClass}></i><span>{node.label}</span></span>)
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
				// if(this.loadSign) {
				// 	this.loadSign = false
				// 	this.page.currentPage++
				// 		if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
				// 			return
				// 		}
				// 	setTimeout(() => {
				// 		this.loadSign = true
				// 	}, 1000)
				// 	this.requestData()
				// 	//console.log('到底了', this.page.currentPage)
				// }
			},
			//获取pageSize
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			//获取currentPage
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			resetbtn(){
				this.searchList = {
					nickname: '',
					username: '',
					deptId: ''
				};
				this.requestData();
			},
			//请求页面的button接口
		    getbutton(childByValue){
		    	console.log(childByValue);
		    	var data = {
					menuId: childByValue.id,
					roleId: this.$store.state.roleid,
				};
				var url = this.basic_url + '/api-user/permissions/getPermissionByRoleIdAndSecondMenu';
				this.$axios.get(url, {params: data}).then((res) => {
					console.log(111)
					console.log(res);
					this.buttons = res.data;
					
				}).catch((wrong) => {})

		    },
		    //请求点击
		    getbtn(item){
		    	if(item.name=="添加"){
		         this.openAddMgr();
		    	}else if(item.name=="修改"){
		    	 this.modify();
		    	}else if(item.name=="高级查询"){
		    	 this.modestsearch();
		    	}else if(item.name=="活动"){
		    		this.unfreeze();
		    	}else if(item.name=="不活动"){
		    		this.freezeAccount();
		    	}else if(item.name=="删除"){
		    		this.deluserinfo();
		    	}else if(item.name=="重置密码"){
		    		this.resetPwd();
		    	}
		    },
			//添加用戶
			openAddMgr() {
				this.$refs.child.visible();
				this.$refs.child.open();
			},
			//修改用戶
			modify() {
//				this.aaaData = this.selUser;
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
//					this.aaaData[0].roleId = [];
//					var roles = this.aaaData[0].roles;
//					for(var i = 0; i < roles.length; i++) {
//						this.aaaData[0].roleId.push(roles[i].id);
//					}
//					console.log(this.aaaData[0].roleId);
					this.user = this.selUser[0]; 
					this.$refs.child.detail(this.selUser[0].id);
				}
			},
			//查看用戶
			 view(id) {
				this.$refs.child.view(id);
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down;
				this.up = !this.up;
			},
			// 删除
			deluserinfo() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时删除多个数据',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.id;
					var url = this.basic_url + '/api-user/users/' + id;
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
					var url = this.basic_url + '/api-user/users/' + id + '/resetPassword';
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
					var url = this.basic_url + '/api-user/users/updateEnabled?id=' + changeUser.id + '&enabled=true';
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
					var url = this.basic_url + '/api-user/users/updateEnabled?id=' + changeUser.id + '&enabled=false';
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
				this.loading = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					deptId: this.searchList.deptId,
					nickname: this.searchList.nickname,
					username: this.searchList.username,
//					searchKey: 'createTime',
//					searchValue: this.searchList.createTime,
					companyId: this.companyId,
					// deptId: this.deptId
				}
				var url = this.basic_url + '/api-user/users';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					console.log(res.data);
					//this.userList = res.data.data;
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
					this.loading = false;
				}).catch((wrong) => {})
//				this.userList.forEach((item, index) => {
//					var id = item.id;
//					this.$axios.get('/users/' + id + '/roles', data).then((res) => {
//						this.userList.role = res.data.roles[0].name;
//					}).catch((wrong) => {})
//				})
			},

			//机构树
			getKey() {
				let that = this;
				var url = this.basic_url + '/api-user/depts/tree';
				this.$axios.get(url, {}).then((res) => {
					console.log(2333);
					console.log(res.data);
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
					this.searchList.deptId = data.id;
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
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		console.log(childValue);
        		this.$refs.navsheader.showClick(childValue);
        		this.getbutton(childValue);
      		},
		},
		beforeMount() {
			
		},
		mounted() {	
			// 在页面挂载前就发起请求
			this.requestData();
			this.getKey();
			this.getCompany();
//			this.getbutton();
//			this.$refs.navleft.getleft();
		}
	}
</script>

<style scope>



</style>