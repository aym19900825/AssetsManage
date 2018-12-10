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
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button type="button" class="btn btn-green" @click="openAddMgr" id="">
                                	<i class="icon-add"></i>添加
                       			</button>
                       			<!-- <button type="button" class="btn btn-green" @click="openAddMgr" id="">
                                	<i class="icon-add"></i>添加部门
                       			</button> -->
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
											<el-dropdown-item  v-for="(item,index) in columns" :key="index">
												<el-checkbox :label="item.text"  name="type"></el-checkbox>
											</el-dropdown-item>
										</el-checkbox-group>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
					<!-- 高级查询划出 -->
					<div v-show="search" class="pb10">
						<el-form status-icon :model="searchDept" label-width="70px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-input v-model="searchDept.fullname">
										<template slot="prepend">机构名称</template>
									</el-input>
								</el-col>
								<el-col :span="2">
									<el-button type="primary" @click="searchinfo" size="small"  style="margin:4px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 -->
					<el-row :gutter="10">
						<el-col :span="24">
							<tree_grid :columns="columns" :tree-structure="true" :data-source="deptList" v-on:childByValue="childByValue"></tree_grid>
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0"
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
			<!--右侧内容显示 End-->
			<deptmask :adddeptForm="adddeptForm" ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></deptmask>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import tree_grid from '../common/TreeGrid.vue'//树表格
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
//	import assetsTree from '../plugin/vue-tree/tree.vue'
//	import tableControle from '../plugin/table-controle/controle.vue'
	import deptmask from '../settingDetails/dept_mask.vue'

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
				checkedName: [
					'序号',
					'机构名称',
					'机构编码',
					'版本',
					'电话号',
				],
				columns: [
					{
						text: '序号',
						dataIndex: 'step',
						isShow:true,
					},
					{
						text: '机构名称',
						dataIndex: 'fullname',
						isShow:true,
					},
					{
						text: '机构编码',
						dataIndex: 'code',
						isShow:true,
					},
					{
						text: '版本',
						dataIndex: 'version',
						isShow:true,
					},
					{
						text: '电话号',
						dataIndex: 'telephone',
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
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchDept: {//高级查询
					simplename:'',
					fullname:''
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
				selData: [],
				adddeptForm: {}//修改子组件时传递数据
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
			tableControle(data){//控制表格列显示隐藏
			  this.checkedName = data;
			},
			sizeChange(val) {//分页，总页数
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    currentChange(val) {//分页，当前页
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
			searchinfo(index) {//高级查询
				var data = {
					params: {
						page: 1,
						limit: 10,
						simplename: this.searchDept.simplename,
						fullname: this.searchDept.fullname
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
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.adddeptForm = {
						"version":'1',
						"status":'活动',
						"step":'',
						"code":'',
						"fullname":'',
						"parent":'',
						"org_range":'2',
						"type":'',
						"inactive":'否',
						"address":'',
						"zipcode":'',
						"leader":'',
						"telephone":'',
						"fax":'',
						"email":'',
						"tips":'',
						"pid":'',
						"enterby":'',
						"enterdate":'',
						"changeby":'',
						"changedate":''
					};
					this.$refs.child.childMethods();

				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
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
					this.adddeptForm = this.selMenu[0]; 
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
					if(changeMenu.children!=null && typeof(changeMenu.children)!='undefined' && changeMenu.children.length>0){
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
				return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
			},
			SelChange(val) {
				this.selDept = val;
			},

			requestData() {//高级查询字段
				var url = this.basic_url + '/api-user/depts/treeMap';
				this.$axios.get(url, {
//					params: data
				}).then((res) => {
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
			transformTree(data){//给树菜单添加图标
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
		}
	}
</script>

<style scoped>
	
</style>