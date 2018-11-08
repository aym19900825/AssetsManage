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
								<button type="button" class="btn btn-bule button-margin" @click="modify" id="">
						    		<i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" id="" @click="deluserinfo">
						    		<i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="modestsearch" id="">
						    		<i class="icon-search"></i>高级查询<i class="icon-arrow1-down" v-show="down"></i><i class="icon-arrow1-up" v-show="up"></i>
								</button>
							</div>
						</div>
						<div class="columns columns-right btn-group pull-right">
							<button class="btn btn-default btn-outline btn-refresh" type="button" name="refresh" aria-label="refresh" title="刷新"><i class="icon-refresh"></i></button>
							<!-- <div class="keep-open btn-group" title="列">
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
							</div> -->
							<v-table-controle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></v-table-controle>
						</div>
					</div>
					<!-- 高级查询划出 -->
					<div v-show="search">
						<el-form status-icon :model="searchDept" label-width="70px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="部门名称">
										<el-input v-model="searchDept.simplename"></el-input>
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
							<!-- 表格 -->
							<el-table :data="deptList" style="width: 96%;margin: 0 auto;" :default-sort="{prop: 'deptList', order: 'descending'}" @selection-change="SelChange">
								<el-table-column type="selection" width="55" v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="ID" sortable prop="id" v-if="this.checkedName.indexOf('ID')!=-1">
								</el-table-column>
								<el-table-column label="部门简称" sortable prop="simplename" v-if="this.checkedName.indexOf('部门简称')!=-1">
								</el-table-column>
								<el-table-column label="类型" sortable prop="type" v-if="this.checkedName.indexOf('类型')!=-1">
								</el-table-column>
								<el-table-column label="备注" sortable prop="tips" v-if="this.checkedName.indexOf('备注')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination v-if="this.checkedName.length>0"
							   class="pull-right" 
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
			<deptmask ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></deptmask>
		</div>
	</div>
</template>

<script>
	import vheader from './common/vheader.vue'
	import navs from './common/left_navs/nav_left.vue'
	import navs_header from './common/nav_tabs.vue'
	import assetsTree from './plugin/vue-tree/tree.vue'
	import tableControle from './plugin/table-controle/controle.vue'
	import deptmask from './common/dept_mask.vue'

	export default {
		name: 'dept_management',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs': navs,
			'deptmask': deptmask,
			'v-assetsTree': assetsTree,
			'v-table-controle':tableControle
		},
		data() {
			return {
				checkedName: [
					'ID',
					'部门简称',
					'类型',
					'备注',
				],
				tableHeader: [
					{
						label: 'ID',
						prop: 'id'
					},
					{
						label: '部门简称',
						prop: 'simplename'
					},
					{
						label: '类型',
						prop: 'type'
					},
					{
						label: '备注',
						prop: 'tips'
					}
				],

				companyId: '',
				deptId: '',

				selDept: [],

				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
	
				total:0,
				'启用': true,
				'冻结': false,
				deptList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				searchDept: {
					simplename: ''
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
			currentTree(val){
				console.log(val);
			},
			//分页功能
			aTable(val){ 
				this.page = val; 
				this.requestData();
			}, 
			searchinfo(index) {
				var data = {
					params: {
						page: 1,
						limit: 10,
						simplename: this.searchDept.simplename
					}
				};
				var url = '/api/api-user/depts';
				this.$axios.get(url, data).then((res) => {
					this.deptList = res.data.data;
					console.log(res.data.data);
				}).catch((wrong) => {

				})
			},
			//添加
			openAddMgr() {
				this.$refs.child.resetNew();
				this.$refs.child.childMethods(); 
			},
			//修改
			modify() {
				var selData = this.selDept;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要修改的信息',
						type: 'warning'
					});
					return;
				}else if(selData.length > 1) {
					this.$message({
						message: '不可同时修改多条信息',
						type: 'warning'
					});
					return;
				}else{
					console.log(selData[0]);
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
				var selData = this.selDept;
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
					var changeDept = selData[0];
					var id = changeDept.id;
					var url = '/api/api-user/depts/' + id;
					this.$axios.delete(url, {}).then((res) => {
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
				this.selDept = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					simplename: this.searchDept.simplename,
					companyId: this.companyId,
					deptId: this.deptId
				}
				var url = '/api/api-user/depts';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.deptList = res.data.data;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {

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
				if(data.type == '1'){
					this.companyId = data.id;
					this.deptId = '';
				}else{
					this.deptId = data.id;
					this.companyId = '';
				}
				this.requestData();
			},
			handleNodeClick(data) {
				console.log(data);
			},
			formatter(row, column) {
				return row.enabled;
			}
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