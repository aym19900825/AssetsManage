<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header></navs_header>
		</div>
		<div class="contentbg">
			<navs_left></navs_left>
			<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button type="button" class="btn btn-green" @click="openAddMgr" id="">
                                	<i class="icon-add"></i>添加
                      			</button>
								<button type="button" class="btn btn-bule button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" @click="delroleinfo">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-primarys button-margin">
								    <i class="icon-key"></i>权限配置
								</button>
								<button type="button" class="btn btn-primarys button-margin">
								    <i class="icon-data"></i>数据范围
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="datalimit">
								    <i class="icon-date-limit"></i>数据限制
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
					<!-- 高级查询划出 -->
					<div v-show="search">
						<el-form status-icon :model="searchList" label-width="70px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="角色名称">
										<el-input v-model="searchList.name"></el-input>
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
							<!-- 表格begin -->
							<el-table :data="roleList" height="400" border stripe style="width: 100%; margin: 0 auto;" :default-sort="{prop:'roleList', order: 'descending'}" @selection-change="SelChange">
								<el-table-column type="selection" fixed width="55" v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="角色名称" sortable width="290" prop="name" v-if="this.checkedName.indexOf('角色名称')!=-1">
								</el-table-column>
								<el-table-column label="所在机构" sortable width="290" prop="deptName" v-if="this.checkedName.indexOf('所在机构')!=-1">
								</el-table-column>
								<el-table-column label="别名" sortable  width="290" prop="code" v-if="this.checkedName.indexOf('别名')!=-1">
								</el-table-column>
								<el-table-column label="备注" sortable  width="290" prop="tips" v-if="this.checkedName.indexOf('备注')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination class="pull-right" v-if="this.checkedName.length>0"
					            @size-change="sizeChange"
					            @current-change="currentChange"
					            :current-page="page.currentPage"
					            :page-sizes="[10, 20, 30, 40]"
					            :page-size="page.pageSize"
					            layout="total, sizes, prev, pager, next"
					            :total="page.totalCount">
					        </el-pagination>
							<!-- 表格end -->
						</div>
					</div>
				</div>
			</div>
			<rolemask ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></rolemask>
			<datalimitmask ref="aaa" v-bind:page=page></datalimitmask>
		</div>
	</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs_left from './common/left_navs/nav_left.vue'
	import navs_header from './common/nav_tabs.vue'
	import rolemask from './common/role_mask.vue'
	import datalimitmask from './common/datalimit_mask.vue'
	import tableControle from './plugin/table-controle/controle.vue'
	export default {
		name: 'user_management',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs_left': navs_left,
			'rolemask': rolemask,
			'datalimitmask': datalimitmask,
			'tableControle': tableControle,
		},
		data() {
			return {
				selUser: [],
				'启用': true,
				'冻结': false,
				'男': true,
				'女': false,
				checkedName: [
					'角色名称',
					'所在机构',
					'别名',
					'备注'
				],
				tableHeader: [
					{
						label: '角色名称',
						prop: 'name'
					},
					{
						label: '所在机构',
						prop: 'deptName'
					},
					{
						label: '别名',
						prop: 'code'
					},
					{
						label: '备注',
						prop: 'tips'
					},
				],
				roleList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				searchList: {
					name: ''
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
				userData:[],
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				selData:[],
			}
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
			//数据限制
			datalimit() {
				this.$refs.aaa.showdatalimit();
			},
			//修改用戶
			modify() {
				this.selData = this.selUser;
				if(this.selData.length == 0) {
					this.$message({
						message: '请您选择要修改的用户',
						type: 'warning'
					});
					return;
				} else if(this.selData.length > 1) {
					this.$message({
						message: '不可同时修改多个用户',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail(this.selData[0].id);
				}
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
				this.up = !this.up
			},
			// 删除
			delroleinfo() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的角色',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时删除多个角色',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.id;
					var url = '/api/api-user/roles/' + id;
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
			},
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					name: this.searchList.name
				}
				var url = '/api/api-user/roles';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.roleList = res.data.data;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
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

</style>