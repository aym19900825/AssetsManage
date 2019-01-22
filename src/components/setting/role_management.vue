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
				
								<!--<button v-for="item in buttons" class="btn mr5" :class="item.style" @click="getbtn(item)">
									<i :class="item.icon"></i>{{item.name}}
								</button>-->
								 <button type="button" class="btn btn-green" @click="openAddMgr" id="">
                                	<i class="icon-add"></i>添加
                      			</button>
								<button type="button" class="btn btn-blue button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" @click="delroleinfo">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="menu">
								    <i class="icon-key"></i>权限配置
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="datalimit">
								    <i class="icon-data"></i>数据范围
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
						<el-form :model="searchList">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="角色名称" prop="name" label-width="70px">
										<el-input v-model="searchList.name">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="3">
									<el-form-item label="是否停用" prop="inactive" label-width="70px">
										<el-select clearable v-model="searchList.inactive" placeholder="" style="width: 100%;">
											<el-option v-for="(data,index) in stopoptions" :key="index" :label="data.label" :value="data.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="2">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 -->
					<div class="row">
						<div class="col-sm-12">
							<!-- 表格begin -->
							<el-table :data="roleList" border stripe :header-cell-style="rowClass" :height="fullHeight" style="width: 100%;" :default-sort="{prop:'roleList', order: 'descending'}" @selection-change="SelChange">
								<el-table-column type="selection" fixed width="55" v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="角色编码" sortable prop="code" v-if="this.checkedName.indexOf('角色编码')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.code}}</p>
									</template>
								</el-table-column>
								<el-table-column label="角色名称" sortable prop="name" v-if="this.checkedName.indexOf('角色名称')!=-1">
								</el-table-column>
								<el-table-column label="是否停用" sortable prop="inactive" :formatter="judge" v-if="this.checkedName.indexOf('是否停用')!=-1">
								</el-table-column>
								<el-table-column label="备注" sortable prop="tips"  v-if="this.checkedName.indexOf('备注')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0"
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
			<datalimitmask ref="limit" :roleIds="roleIds"></datalimitmask>
			<rolemeunmask ref="role"></rolemeunmask>
			<!--右侧内容显示 End-->
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import rolemask from '../settingDetails/role_mask.vue'
	import rolemeunmask from '../settingDetails/rolemenu_mask.vue'
	import datalimitmask from '../settingDetails/datalimit_mask.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	export default {
		name: 'user_management',
		components: {//引用组件标签命名
			'vheader': vheader,
			'navs_header': navs_header,
			'navs_left': navs_left,
			'rolemask': rolemask,
			'rolemeunmask': rolemeunmask,
			'datalimitmask': datalimitmask,
			'tableControle': tableControle,
		},
		data() {
			return {
				basic_url: Config.dev_url,
				value:'',
				stopoptions: [{
					value: "1",
					label: '是'
				}, {
					value: "2",
					label: '否'
				}],
				selUser: [],
				checkedName: [//控制表格列的显示隐藏相关数据
					'角色编码',
					'角色名称',
					'是否停用',
					'备注',
				],
				tableHeader: [//控制表格列的显示隐藏相关数据
					{
						label: '角色编码',
						prop: 'code'
					},
					{
						label: '角色名称',
						prop: 'name'
					},
					{
						label: '是否停用',
						prop: 'inactive'
					},
					{
						label: '备注',
						prop: 'tips'
					}
				],
				buttons: [],//请求回的按钮
				roleList: [],//表格数据
				search: false,
				down: true,
				up: false,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {//高级查询数据
					name: '',
					inactive:''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				treeData: [],//树
				page: {//页码
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				selData:[],
				roleIds:{},
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    // console.log(rowIndex) //表头行标号为0
			    return 'text-align:center'
			},
			//控制列的显示隐藏调用函数
			tableControle(data){
				this.checkedName = data;
			},
			//获取pageSize
			sizeChange(val) {
		      this.page.pageSize = val;
//		      this.requestData();
		    },
		    //获取currentPage
		    currentChange(val) {
		      this.page.currentPage = val;
//		      this.requestData();
		    },
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
//				this.requestData();
			},
			judge(data) {//是否停用
				return data.inactive=="1" ? '是' : '否'
			},
//			//请求页面的button接口
//		    getbutton(childByValue){
//		    	console.log(childByValue);
//		    	var data = {
//					menuId: childByValue.id,
//					roleId: this.$store.state.roleid,
//				};
//				var url = this.basic_url + '/api-user/permissions/getPermissionByRoleIdAndSecondMenu';
//				this.$axios.get(url, {params: data}).then((res) => {
//					console.log(111)
//					console.log(res);
//					this.buttons = res.data;
//				}).catch((wrong) => {})
//
//		    },
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
		    	}
		    },
			//添加用戶
			openAddMgr() {
				this.$refs.child.resetNew();
				this.$refs.child.visible();
				this.$refs.child.open();
			},
			//数据限制
			datalimit() {
				this.selData = this.selUser;
				if(this.selData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selData.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					this.roleIds=this.selData[0].id//传到数据范围
//					this.$refs.limit.visible();					
					this.$refs.limit.getdetail(this.selData[0].id);
				}
			},
			//修改
			modify() {
				this.selData = this.selUser;
				if(this.selData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selData.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail(this.selData[0].id);
				}
			},
			//数据库配置
			menu(){
				this.selData = this.selUser;
				if(this.selData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selData.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.role.menu(this.selData[0].id);
				}
			},
			//查看用戶
			 view(item) {
				this.$refs.child.view(item);
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
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-user/roles/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					console.log(changeUser[0]);
					for(var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].id);
						console.log(deleteid);
					}
					//ids为deleteid数组用逗号拼接的字符串
					ids = deleteid.toString(',');
					var data = {
						ids: ids,
					}
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {
							params: data
						}).then((res) => { //.delete 传数据方法
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '删除成功',
									type: 'success'
								});
//								this.requestData();
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
					}).catch(() => {

					});
				}
			},
			
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD"); 
			},
			//表格勾选获取的一行的值
			SelChange(val) {
				this.selUser = val;
			},
			//页面加载数据
			requestData() {
				console.log(this.searchList.inactive);
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					name: this.searchList.name,
					inactive: this.searchList.inactive
				}
				var url = this.basic_url + '/api-user/roles';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					console.log(res.data);
					this.roleList = res.data.data;
					this.page.totalCount = res.data.count;
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
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		console.log(childValue);
        		// this.$refs.navsheader.showClick(childValue);
        		this.getbutton(childValue);
      		},
		},
		mounted() {
			this.requestData();
			this.getKey();
			this.getbutton();
		},
	}
</script>

<style scoped>

</style>