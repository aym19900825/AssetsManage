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
								<button type="button" class="btn btn-red button-margin" @click="deldata">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-primarys button-margin">
								    <i class="icon-cpu"></i>配置关系
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
						    		<i class="icon-search"></i>高级查询
						    		<i class="icon-arrow1-down" v-show="down"></i>
						    		<i class="icon-arrow1-up" v-show="up"></i>
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="createtable">
								    <i class="icon-refresh-cw"></i>生成表
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
							<el-row :gutter="10" style="margin-left:-34px">
								<el-col :span="5">
									<el-form-item label="表名">
										<el-input v-model="searchList.objectName"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="描述">
										<el-input v-model="searchList.description"></el-input>
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
						<div class="col-sm-12">
							<!-- 表格 -->
							<el-table :data="dataList" style="width: 96%;margin: 0 auto;" :default-sort="{prop:'dataList', order: 'descending'}" @selection-change="SelChange">
								<el-table-column type="selection" width="55">
								</el-table-column>
								<el-table-column label="表名" sortable width="320" prop="objectName">
								</el-table-column>
								<el-table-column label="描述" sortable width="480" prop="description">
								</el-table-column>
								<!-- <el-table-column label="类名" sortable width="210" prop="" :formatter="className">
								</el-table-column> -->
							</el-table>
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
			<datamask ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></datamask>
		</div>
	</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs from './common/left_navs/nav_left.vue'
	import navs_header from './common/nav_tabs.vue'
	import assetsTree from './plugin/vue-tree/tree.vue'
	import datamask from './common/data_mask.vue'
	export default {
		name: 'data_management',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs': navs,
			'datamask': datamask,
			'v-assetsTree': assetsTree
		},
		data() {
			return {
				selUser: [],
				'启用': true,
				'冻结': false,
				'男': true,
				'女': false,
				search: false,
				show: false,
				down: true,
				up: false,
				searchList: {
					objectName:'',
					description:''
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
				},
				dataList:[]
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
			deldata() {
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
					var url = '/api/apps-center/objectcfg/' + id;
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
			//生成表
			createtable() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要生成表的数据',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时将多个数据生成表',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.id;
					var url = '/api/apps-center/objectcfg/create/' + id;
					this.$axios.get(url, {}).then((res) => {//.delete 传数据方法
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '生成表成功',
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
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					objectName: this.searchList.objectName,
					description: this.searchList.description,
				}
				 console.log(111);
				var url = '/api/apps-center/objectcfg';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					
					this.dataList = res.data.data;
					this.page.totalCount = res.data.count;
					console.log(this.dataList);
				}).catch((wrong) => {})
				// this.userList.forEach((item, index) => {
				// 	var id = item.id;
				// 	this.$axios.get('/users/' + id + '/roles', data).then((res) => {
				// 		this.userList.role = res.data.roles[0].name;
				// 	}).catch((wrong) => {})
				// })
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