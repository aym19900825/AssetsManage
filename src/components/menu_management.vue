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
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>

							<div class="keep-open btn-group" title="列">
								<el-dropdown :hide-on-click="false" class="pl10 btn btn-default btn-outline">
									<span class="el-dropdown-link">
										<font class="J_tabClose"><i class="icon-menu3"></i></font>
										<i class="el-icon-arrow-down icon-arrow2-down"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-checkbox-group v-model="checkedName" @change="changeCheckedName">
											<el-dropdown-item  v-for="item in columns">
												<el-checkbox :label="item.text" name="type"></el-checkbox>
											</el-dropdown-item>
										</el-checkbox-group>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
					<el-row :gutter="10">
						<el-col :span="24">
							 <tree_grid :columns="columns" :tree-structure="true" :data-source="menuList" v-on:childByValue="childByValue"></tree_grid>
							 
							<el-pagination class="pull-right" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							
						</el-col>
					</el-row>
				</div>
			</div>
			<menumask :menu="selMenu[0]" ref="child" @request="requestData" v-bind:page=page></menumask>
		</div>
	</div>
</template>
<script>
	import tree_grid from './common/TreeGrid.vue'//树表格
	import vheader from './common/vheader.vue'
	import navs_left from './common/left_navs/nav_left.vue'
	import navs_header from './common/nav_tabs.vue'
	import assetsTree from './plugin/vue-tree/tree.vue'
	import menumask from './common/menu_mask.vue'//弹出框
	export default {
		name: 'user_management',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs_left': navs_left,
			'menumask': menumask,
			'v-assetsTree': assetsTree,
			'tree_grid':tree_grid,
		},
		data() {
			return {
		    checkedName: [
					'菜单名称',
					'菜单url',
					'样式',
					'排序',
					'类型'
				],
			columns: [{
	            text: '菜单名称',
	            dataIndex: 'name',
	            isShow:true,
	          },
	          {
	            text: '菜单url',
	            dataIndex: 'url',
	            isShow:true,
	          },
	          {
	            text: '样式',
	            dataIndex: 'css',
	            isShow:true,
	          },
	          {
	          	text: '排序',
	          	dataIndex: 'sort',
	          	isShow:true,
	          },
	          {
	            text: '类型',
	            dataIndex: 'isMenu',
	            isShow:true,
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
			changeCheckedName(value){
				console.log(value);
				this.checkedName=value
				let str=value.toString()
				for(let i=0;i<this.columns.length;i++){
					if(str.indexOf(this.columns[i].text) != -1){
						this.columns[i].isShow=true
					}else{
						this.columns[i].isShow=false
					}
				}
			},
			childByValue: function (childValue) {
		        // childValue就是子组件传过来的
		        this.selMenu = childValue
		       
		        this.selMenu[0].hidden ? '1' : '0'
		        
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
				this.selData = [
					{
					parentId:'',
					name:'',
					url:'',
					sort:'',
					hidden:'',
					css:''
					}
				];
				this.$refs.child.detail();
//				this.$refs.child.resetNew();
//				this.$refs.child.visible();
			},
			//修改
			modify() {
				console.log(this.selMenu)
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
					this.$refs.child.detail();
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
					console.log(changeMenu);
					if(typeof(changeMenu.children)!='undefined' && changeMenu.children.length>0){
						this.$message({
							message: '先删除子菜单',
							type: 'error'
						});
					}else {
							console.log(changeMenu);
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

			SelChange(val) {
				console.log(val)
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

					let result=res.data
//					for(let i=0;i<result.length;i++){
//						if(result[i].parentId == "-1" || result[i].parentId == "null") {
//							result[i].isMenu = "目录"
//						} else {
//							result[i].isMenu = "菜单"
//						}						
//						if(result[i].subMenus.length>0){
//							let subMenus=result[i].subMenus
//							for(let j=0;j<subMenus.length;j++){
//								if(subMenus[j].parentId == "-1" || subMenus[j].parentId == "null") {
//									subMenus[j].isMenu = "目录"
//								} else {
//									subMenus[j].isMenu = "菜单"
//								}						
////								if(subMenus[j].subMenus.length>0){
////									subMenus[j].children=subMenus[j].subMenus
////								}
//							}
//							result[i].children=subMenus
//						}
//					}
					this.menuList = result;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
			},

			handleNodeClick(data) {},

		},
		mounted() {
			this.requestData();
//			this.getKey();
		},
	}
</script>

<style scoped>

</style>