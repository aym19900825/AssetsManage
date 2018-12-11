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
					<!-- 高级查询划出 -->
					<div v-show="search">
						<el-form status-icon :model="searchDept" label-width="70px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="机构名称">
										<el-input v-model="searchDept.simplename"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="2">
									<el-button type="primary" @click="searchinfo" size="small" >搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 -->
					<el-row :gutter="10">
						<el-col :span="24">
							<tree_grid :columns="columns" :tree-structure="true" :data-source="deptList" v-on:childByValue="childByValue"></tree_grid>
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
						</el-col>
					</el-row>
					</div>
				</div>
			</div>
			<deptmask :adddeptForm="selMenu[0]" ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></deptmask>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import tree_grid from './common/TreeGrid.vue'//树表格
	import vheader from './common/vheader.vue'
	import navs_left from './common/left_navs/nav_left.vue'
	import navs_header from './common/nav_tabs.vue'
//	import assetsTree from './plugin/vue-tree/tree.vue'
//	import tableControle from './plugin/table-controle/controle.vue'
	import deptmask from './common/dept_mask.vue'

	export default {
		name: 'dept_management',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs_left': navs_left,
			'deptmask': deptmask,
			'tree_grid':tree_grid,
		},
		data() {
			return {
				basic_url: Config.dev_url,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				checkedName: [
					'ID',
					'机构简称',
					'类型',
					'备注',
				],
				columns: [
					{
						text: 'ID',
						dataIndex: 'id',
						isShow:true,
					},
					{
						text: '机构简称',
						dataIndex: 'simplename',
						isShow:true,
					},
					{
						text: '类型',
						dataIndex: 'type',
						isShow:true,
					},
					{
						text: '备注',
						dataIndex: 'tips',
						isShow:true,
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
				selMenu:[],
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
			changeCheckedName(value){
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
			//表格传过来
			childByValue: function (childValue) {
		        // childValue就是子组件传过来的
		        this.selMenu = childValue
		    },
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
				var url = this.basic_url + '/api-user/depts';
				this.$axios.get(url, data).then((res) => {
					this.deptList = res.data.data;
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
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要修改的机构',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时修改多个机构',
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
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的机构',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时删除多个机构',
						type: 'warning'
					});
					return;
				} else {
					var changeMenu = selData[0];
					if(typeof(changeMenu.children)!='undefined' && changeMenu.children.length>0){
						this.$message({
							message: '先删除子机构',
							type: 'error'
						});
					}else {
						var id = changeMenu.id;
						var url = this.basic_url + '/api-user/depts/' + id;
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
//			requestData(index) {
//				var data = {
//					page: this.page.currentPage,
//					limit: this.page.pageSize,
//					simplename: this.searchDept.simplename,
//					companyId: this.companyId,
//					deptId: this.deptId
//				}
//				var url = this.basic_url + '/api-user/depts';
//				this.$axios.get(url, {
//					params: data
//				}).then((res) => {
//					this.deptList = res.data.data;
//					this.page.totalCount = res.data.count;
//				}).catch((wrong) => {
//
//				})
//			},
			requestData() {
//				var data = {
//					
//				}
				var url = this.basic_url + '/api-user/depts/treeMap';
				this.$axios.get(url, {
//					params: data
				}).then((res) => {
					console.log(res)
					let result=res.data
					for(let i=0;i<result.length;i++){
						if(typeof(result[i].subDepts)!="undefined"&&result[i].subDepts.length>0){
							let subDepts=result[i].subDepts;
							result[i].children=subDepts;
						}	
					}
					this.deptList = result;
//					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
			},
			//机构树
			getKey() {
				let that = this;
				var url = this.basic_url + '/api-user/depts/tree';
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
			},
			formatter(row, column) {
				return row.enabled;
			}
		},
		mounted() {
			this.requestData();
			this.getKey();
			  // 获取浏览器可视区域高度
		      var _this = this;
		      var clientHeight2 = $(window).height() - 100;    //document.body.clientWidth;
		      _this.$refs.homePagess3.style.height = clientHeight2 + 'px';
		      window.onresize = function() {
		        var clientHeight2 = $(window).height() - 100;
		        _this.$refs.homePagess3.style.height = clientHeight2 + 'px';
		      };
			},
	}
</script>

<style scoped>
	
</style>