<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_tabs></navs_tabs>
		</div>
		<div class="contentbg">
			<!--左侧菜单调用 Begin-->
				<navs_left ref="navleft" v-on:childByValue="childvalue"></navs_left>
			<!--左侧菜单调用 End-->

			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button v-for="item in buttons" :key='item.id' :class="'btn mr5 '+ item.style" @click="getbtn(item)">
									<i :class="item.icon"></i>{{item.name}}
								</button>
							</div>
						</div>
						<div class="columns columns-right btn-group pull-right">
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh" @click="this.commonNew.winReload"><i class="icon-refresh"></i></div>
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!-- 高级查询划出 -->
					<div v-show="search">
						<el-form inline-message :model="searchList">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="角色名称" prop="name" label-width="70px">
										<el-input v-model="searchList.name" @keyup.enter.native="searchinfo">
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
								<el-col :span="4">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
									<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;margin-left: 2px">重置</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 -->
					<div class="row">
						<div class="col-sm-12">
							<!-- 表格begin -->
							<v-table ref="table" :appName="appName" :searchList="searchList" @getSelData="setSelData">
								<!-- <el-table-column label="角色编码" sortable prop="code" v-if="this.checkedName.indexOf('角色编码')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.code}}</p>
									</template>
								</el-table-column> -->
								<el-table-column label="角色名称" sortable prop="name" v-if="this.checkedName.indexOf('角色名称')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.name}}</p>
									</template>
								</el-table-column>
								<el-table-column label="是否停用" width="100" sortable prop="inactive" :formatter="judge" v-if="this.checkedName.indexOf('是否停用')!=-1">
								</el-table-column>
								<el-table-column label="备注" sortable prop="tips"  v-if="this.checkedName.indexOf('备注')!=-1">
								</el-table-column>
								<el-table-column label="机构" width="150" sortable prop="deptName"  v-if="this.checkedName.indexOf('机构')!=-1">
								</el-table-column>
								<el-table-column label="录入人" width="100" sortable prop="createbyName"  v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column>
								<el-table-column label="录入时间" width="100" sortable prop="createTime" :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<el-table-column label="修改时间" width="100" sortable prop="updateTime" :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
								</el-table-column>
							</v-table>
							<!-- 表格end -->
						</div>
					</div>
				</div>
			</div>
			<rolemask ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></rolemask>
			<datalimitmask ref="limit"  @request="requestData" :roleIds="roleIds"></datalimitmask>
			<rolemeunmask ref="role"></rolemeunmask>
			<!--右侧内容显示 End-->
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_tabs from '../common/nav_tabs.vue'
	import rolemask from '../settingDetails/role_mask.vue'
	import rolemeunmask from '../settingDetails/rolemenu_mask.vue'
	import datalimitmask from '../settingDetails/datalimit_mask.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import vTable from '../plugin/table/table.vue'
	export default {
		name: 'user_management',
		components: {//引用组件标签命名
			'vheader': vheader,
			'navs_tabs': navs_tabs,
			'navs_left': navs_left,
			'rolemask': rolemask,
			'rolemeunmask': rolemeunmask,
			'datalimitmask': datalimitmask,
			'tableControle': tableControle,
			'v-table': vTable
		},
		data() {
			return {
				appName: 'appRoles',
				basic_url: Config.dev_url,
				value:'',
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				stopoptions: [{
					value: "1",
					label: '是'
				}, {
					value: "2",
					label: '否'
				}],
				selUser: [],
				checkedName: [//控制表格列的显示隐藏相关数据
					// '角色编码',
					'角色名称',
					'是否停用',
					'备注',
					'机构',
					'录入人',
					'录入时间',
					'修改时间'
				],
				tableHeader: [//控制表格列的显示隐藏相关数据
					// {
					// 	label: '角色编码',
					// 	prop: 'code'
					// },
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
					},
					{
						label: '机构',
						prop: 'deptName'
					},
					{
						label: '录入人',
						prop: 'createbyName'
					},
					{
						label: '录入时间',
						prop: 'createTime'
					},
					{
						label: '修改时间',
						prop: 'updateTime'
					}
				],
				buttons: [],//请求回的按钮
				roleList: [],//表格数据
				search: false,
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
					pageSize: 20,
					totalCount: 0
				},
				selData:[],
				roleIds:{},
			}
		},
		methods: {
			setSelData(val){
				this.selUser = val;
			},
			//控制列的显示隐藏调用函数
			tableControle(data){
				this.checkedName = data;
			},
			
			searchinfo() {
				this.requestData('init');
			},
			resetbtn(){
				this.searchList = {//高级查询数据
					name: '',
					inactive:''
				};
				this.requestData('init');
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
		    		this.delroleinfo();
		    	}else if(item.name=="彻底删除"){
		    		this.physicsDel();
		    	}else if(item.name=="应用模块权限配置"){
		    		this.menu();
		    	}else if(item.name=="数据范围"){
		    		this.datalimit();
		    	}else if(item.name=="复制"){
					this.copyRole();
				}
			},
			copyRole(){
				this.selData = this.selUser;
				if(this.selData.length == 0) {
					this.$message({
						message: '请您选择要复制的数据',
						type: 'warning'
					});
					return;
				} else if(this.selData.length > 1) {
					this.$message({
						message: '不可同时复制多个数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-user/roles/copyRole/' + this.selData[0].id;
					this.$axios.get(url, {
					}).then((res) => {
						if(res.data.resp_code == 0) {
							this.$message({
								message: '复制成功',
								type: 'success'
							});
						this.requestData();
						}
					}).catch((err) => {});
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
					for(var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].id);
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
								this.requestData();
							}
						}).catch((err) => {
						});
					}).catch(() => {});
				}
			},
			// 彻底删除
			physicsDel() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-user/roles/physicsDel';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].id);
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
								this.requestData();
							}
						}).catch((err) => {
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
			requestData(opt) {
				this.$refs.table.requestData(opt);
			},
			judge(data) {//是否停用
        return data.inactive=="1" ? '是' : '否'
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
			//左侧菜单带过来
			childvalue:function(childvalue) {
     			this.getbutton(childvalue);
      		},
			  //请求页面的button接口
		    getbutton(childvalue){
		    	var data = {
					menuId: childvalue.id,
					roleId: this.$store.state.roleid,
				};
				var url = this.basic_url + '/api-user/permissions/getPermissionByRoleIdAndSecondMenu';
				this.$axios.get(url, {params: data}).then((res) => {
					this.buttons = res.data;
				}).catch((wrong) => {
				})

		    },
		},
		mounted() {
			this.getKey();
		},
	}
</script>

<style scoped>

</style>