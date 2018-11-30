<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header></navs_header>
		</div>
		<div class="contentbg">
			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content wrapperall">
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
								    <i class="icon-upload-cloud"></i>导入
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="unfreeze">
								    <i class="icon-download-cloud"></i>导出
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="freezeAccount">
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
					<div v-show="search" class="pb10">
						<el-form status-icon :model="searchList" label-width="70px">
							<el-row :gutter="30" class="pb5">
								<el-col :span="7">
									<el-input v-model="searchList.V_NAME">
										<template slot="prepend">委托单位名称</template>
									</el-input>
								</el-col>
								
								<el-col :span="7">
									<el-input v-model="searchList.DESCRIPTION">
										<template slot="prepend">样品名称</template>
										</el-input>
								</el-col>
								<el-col :span="7">
									<el-input v-model="searchList.ACCEPT_PERSON" label-width="58px">
									<template slot="prepend">收样人</template>
										</el-input>
								</el-col>
							</el-row>
							<el-row :gutter="30">
								<el-col :span="7">				
									<el-input v-model="searchList.P_NAME">
										<template slot="prepend">生产单位名称</template>
									</el-input>
								</el-col>
								<el-col :span="7">
									<el-input v-model="searchList.TYPE">
									<template slot="prepend">样品类别</template>
										</el-input>
								</el-col>
								<el-col :span="7">
									<el-input v-model="searchList.ACCEPT_DATE" label-width="70px">
									<template slot="prepend">收样日期</template>
										</el-input>
								</el-col>
								<el-col :span="3">
									<el-button type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->

					<el-row :gutter="10">
						<!-- 左侧树菜单 Begin-->
						<el-col :span="5" class="lefttree">
							<div class="lefttreebg">
								<div class="left_tree_title clearfix" @click="min3max()">
									<div class="pull-left pr20" v-if="ismin">组织生产单位</div>
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
						<!-- 左侧树菜单 End-->
						
						<el-col :span="19" class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="userList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="样品编号" sortable width="140px" prop="ITEMNUM" v-if="this.checkedName.indexOf('样品编号')!=-1">
								</el-table-column>
								<el-table-column label="样品类别" sortable width="200px" prop="TYPE" v-if="this.checkedName.indexOf('样品类别')!=-1">
								</el-table-column>
								<el-table-column label="委托单位" sortable width="100px" prop="sex" :formatter="V_NAME" v-if="this.checkedName.indexOf('委托单位')!=-1">
								</el-table-column>
								<el-table-column label="生产单位" sortable width="200px" prop="deptName" v-if="this.checkedName.indexOf('生产单位')!=-1">
								</el-table-column>
								<el-table-column label="公司" sortable width="200px" prop="companyName" v-if="this.checkedName.indexOf('公司')!=-1">
								</el-table-column>
								<el-table-column label="样品名称" sortable width="200px" prop="DESCRIPTION" :formatter="judge" v-if="this.checkedName.indexOf('样品名称')!=-1">
								</el-table-column>
								<el-table-column label="样品型号" width="200px" prop="ITEM_MODEL" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('样品型号')!=-1">
								</el-table-column>
								<el-table-column label="收样人" sortable width="140px" prop="ITEMNUM" v-if="this.checkedName.indexOf('收样人')!=-1">
								</el-table-column>
								<el-table-column label="收样日期" sortable width="140px" prop="ITEMNUM" v-if="this.checkedName.indexOf('收样日期')!=-1">
								</el-table-column>
								<el-table-column label="状态 sortable width="140px" prop="ITEMNUM" v-if="this.checkedName.indexOf('状态')!=-1">
								</el-table-column>
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
		<samplesmask :user="aaaData[0]" ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></samplesmask>
		<!--右侧内容显示 End-->
	</div>
	</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs_header from './common/nav_tabs.vue'
//	import assetsTree from '../plugin/vue-tree/tree2.vue'
	 import samplesmask from'./common/samples_mask.vue'
	export default {
		name: 'user_management',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			 'samplesmask': samplesmask,
//			'v-assetsTree': assetsTree
		},
		data() {
			return {
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				loadSign: true, //加载
				commentArr: {},
				checkedName: [
					'样品编号',
					'样品类别',
					'委托单位',
					'生产单位',
					'样品名称',
					'样品型号',
					'收样人',
					'收样日期',
					'状态',
				],
				tableHeader: [{
						label: '样品编号',
						prop: 'ITEMNUM'
					},
					{
						label: '样品类别',
						prop: 'TYPE'
					},
					{
						label: '委托单位',
						prop: 'V_NAME'
					},
					{
						label: '生产单位',
						prop: 'P_NAME'
					},
					{
						label: '样品名称',
						prop: 'DESCRIPTION'
					},
					{
						label: '样品型号',
						prop: 'ITEM_MODEL'
					},
					{
						label: '收样人',
						prop: 'ACCEPT_PERSON'
					},
					{
						label: '收样日期',
						prop: 'ACCEPT_DATE'
					},
					{
						label: '状态',
						prop: 'STATE'
					},
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
				searchList: {
					TYPE: '',
					DESCRIPTION: '',
					ITEM_MODEL: ''
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
				console.log();
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
					//			     console.log('到底了', this.page.currentPage)
				}
			},
			test() {
				console.log(this.checkedName.indexOf('样品编号') != -1);
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
					ITEMNUM: '',
					password: '',
					TYPE: '',
					birthday: '',
					V_NAME: '',
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
					var url = '/api/api-user/users/updateDESCRIPTION?id=' + changeUser.id + '&DESCRIPTION=true';
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
					var url = '/api/api-user/users/updateDESCRIPTION?id=' + changeUser.id + '&DESCRIPTION=false';
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
				return data.DESCRIPTION ? '启用' : '冻结'
			},
			V_NAME(data) {
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
					TYPE: this.searchList.TYPE,
					DESCRIPTION: this.searchList.DESCRIPTION,
					searchKey: 'ITEM_MODEL',
					searchValue: this.searchList.ITEM_MODEL,
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

			getlist() {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					TYPE: this.searchList.TYPE,
					DESCRIPTION: this.searchList.DESCRIPTION,
					searchKey: 'ITEM_MODEL',
					searchValue: this.searchList.ITEM_MODEL,
					companyId: this.companyId,
					deptId: this.deptId
				}
				var url = '/api/api-user/users';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					userList = res.data.data;
					isLoading = false
				})
			},
			//生产单位树
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
				console.log(111222);
				console.log(data);
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
.p15 {padding:10px 15px;}
</style>