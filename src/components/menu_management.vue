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
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button type="button" class="btn btn-green" @click="openAddMenu" id="">
                                	<i class="icon-add"></i>添加
                      			 </button>
								<button type="button" class="btn btn-bule button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" @click="delmenu">
								    <i class="icon-trash"></i>删除
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
					<div class="row">

						<div class="col-sm-12">
							 <tree_grid :columns="columns" :tree-structure="true" :data-source="menuList" v-on:childByValue="childByValue"></tree_grid>
							 
							
							<el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							
						</div>
					</div>
				</div>
			</div>
			<menumask :menu="selMenu[0]" ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></menumask>
		</div>
	</div>
</template>
<script>
	import tree_grid from './common/TreeGrid.vue'//树表格
	import vheader from './common/vheader.vue'
	import navs from './common/left_navs/nav_left.vue'
	import navs_header from './common/nav_tabs.vue'
	import assetsTree from './plugin/vue-tree/tree.vue'
	import menumask from './common/menu_mask.vue'//弹出框
	export default {
		name: 'user_management',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs': navs,
			'menumask': menumask,
			'v-assetsTree': assetsTree,
			'tree_grid':tree_grid,
		},
		data() {
			return {
			columns: [{
	            text: '菜单名称',
	            dataIndex: 'name'
	          },
	          {
	            text: '菜单url',
	            dataIndex: 'url'
	          },
	          {
	            text: '样式',
	            dataIndex: 'css'
	          },
	          {
	          	text: '排序',
	          	dataIndex: 'sort'
	          },
	          {
	            text: '类型',
	            dataIndex: 'isMenu'
	          },
	        ],
				selMenu: [],
				'启用': true,
				'冻结': false,
				'男': true,
				'女': false,
				menuList: [],
				//deptTree: [], //树
				search: false,
				show: false,
				down: true,
				up: false,
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
				aaaData: [],
			}
		},
		methods: {
			childByValue: function (childValue) {
		        // childValue就是子组件传过来的
		        this.selMenu = childValue
		    },
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			
			//添加菜单
			openAddMenu() {
				this.$refs.child.resetNew();
				this.$refs.child.visible();
			},
			//修改
			modify() {
				var selData = this.selMenu;
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

			// 删除
			delmenu() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的菜单',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时删除多个菜单',
						type: 'warning'
					});
					return;
				} else {
					var changeMenu = selData[0];
					if(changeMenu.children.length>0){
						this.$message({
							message: '先删除子菜单',
							type: 'error'
						});
					}else{
					var id = changeMenu.id;
					var url = '/api/api-user/menus/' + id;
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
				}
			},

//			显示目录
//			judge(data) {
//				if(data.parentId == "-1" || data.parentId == "null") {
//					return data.isMenu = "目录"
//				} else {
//					return data.isMenu = "菜单"
//				}
//			},
			//机构树
			getKey() {
				let that = this;
				var url = '/api/api-user/depts/tree';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data;
					this.treeData = this.transformTree(this.resourceData);
				});
			},
			SelChange(val) {
				this.selMenu = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = '/api/api-user/menus/findTreeAlls';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					let result=res.data.data
					for(let i=0;i<result.length;i++){
						if(result[i].subMenus.length>0){
							result[i].children=result[i].subMenus
						}
					}
					this.menuList = result;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
			},

			handleNodeClick(data) {},

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