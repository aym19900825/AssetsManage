<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_tabs ref="navsTabs"></navs_tabs>
		</div>
		<div class="contentbg">
			<!--左侧菜单内容显示 Begin-->
			<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
			<!--左侧菜单内容显示 End-->
			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<!--按钮操作行 Begin-->
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button v-for="item in buttons" :key='item.id' :class="'btn mr5 '+ item.style" @click="getbtn(item)">
									<i :class="item.icon"></i>{{item.name}}
								</button>
								<!--导入上传 Begin-->
								<el-dropdown size="small">
									<button class="btn mr5 btn-primarys">
										<i class="icon-inventory-line-callin"></i> 导入<i class="el-icon-arrow-down el-icon--right"></i>
									</button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>
											<div @click="download"><i class="icon-download-cloud"></i>下载模版</div>
										</el-dropdown-item>
										
										<el-dropdown-item>
											<el-upload
											ref="upload"
											class="upload"
											:action="uploadUrl()"
											:on-success="fileSuccess"
											:limit=1
											multiple
											method:="post"
											:file-list="fileList">
												<i class="icon-upload-cloud"></i> 上传
											</el-upload>
										</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
								<!--导入上传 End-->
							</div>
						</div>
						<div class="columns columns-right btn-group pull-right">
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh" @click="this.commonNew.winReload">
								<i class="icon-refresh"></i>
							</div>
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName" @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!--按钮操作行 End-->

					<!-- 高级查询划出 Begin-->
					<div v-show="search">
						<el-form inline-message :model="searchList" label-width="70px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="文件名称" prop="DESCRIPTION">
										<el-input v-model="searchList.DESCRIPTION" @keyup.enter.native="searchinfo"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="版本" prop="VERSION">
										<el-input v-model="searchList.VERSION" @keyup.enter.native="searchinfo"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="机构" prop="DEPTID" label-width="50px">
										<el-select clearable v-model="searchList.DEPTID" filterable allow-create default-first-option placeholder="请选择" @keyup.enter.native="searchinfo">
										    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
									<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px; margin-left: 2px">重置</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->
					<el-row :gutter="0">
						<el-col :span="24">
							<!-- 表格 Begin-->
							<v-table ref="table" :appName="appName" :searchList="searchList" @getSelData="setSelData">
								<!-- <el-table-column label="编码" width="155" sortable prop="NUM" v-if="this.checkedName.indexOf('编码')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.NUM}}</p>
									</template>
								</el-table-column> -->
								<el-table-column label="分发号" sortable prop="WI_NUM" v-if="this.checkedName.indexOf('分发号')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.WI_NUM}}</p>
									</template>
								</el-table-column>
								<el-table-column label="文件名称" sortable prop="DESCRIPTION" v-if="this.checkedName.indexOf('文件名称')!=-1">
								</el-table-column>
								<el-table-column label="版本" width="100" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1" align="right">
								</el-table-column>
								<!-- <el-table-column label="状态" width="185" sortable prop="DEPARTMENT" v-if="this.checkedName.indexOf('状态')!=-1">
								</el-table-column> -->
								<el-table-column label="机构" width="120" prop="DEPTIDDesc" sortable v-if="this.checkedName.indexOf('机构')!=-1">
								</el-table-column>
								<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<el-table-column label="修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
								</el-table-column>
							</v-table>
							<!-- 表格 End-->
						</el-col>
					</el-row>
				</div>
			</div>
			<!--右侧内容显示 End-->
			<instructionmask :WORK_INSTRUCTION="WORK_INSTRUCTION" ref="instructionmask" @request="requestData" @reset="reset" v-bind:page=page></instructionmask>
		</div>
		<!--报表-->
			<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_tabs from '../common/nav_tabs.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import instructionmask from '../maindataDetails/work_instructionMask.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import reportmask from'../reportDetails/reportMask.vue'
	import vTable from '../plugin/table/table.vue'
	export default {
		name: 'customer_management',
		components: {
			vheader,
			navs_left,
		  navs_tabs,
			instructionmask,
			tableControle,
			reportmask,
		  vTable
		},
		data() {
			return {
				appName: 'workIns',
				btn:'',
				reportData:{},//报表的数据
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				fileList:[],//文件上传的接收数据
				commentArr: {},
				value: '',
				checkedName: [
					// '编码',
					'分发号',
					'文件名称',
					'版本',
					// '状态',
					'录入时间',
					'修改时间',
					'机构'
				],
				tableHeader: [
					// {
					// 	label: '编码',
					// 	prop: 'NUM',
					// },
					{
						label: '分发号',
						prop: 'WI_NUM'
					},
					{
						label: '文件名称',
						prop: 'DESCRIPTION'
					},
					{
						label: '版本',
						prop: 'VERSION'
					},
					// {
					// 	label: '状态',
					// 	prop: 'DEPARTMENT'
					// },
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
						label: '修改时间',
						prop: 'CHANGEDATE'
					},
					{
						label: '机构',
						prop: 'DEPTIDDesc'
					}
				],
				selMenu: [],
				WORK_INSTRUCTIONList: [],
				search: false,
				show: false,
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					DESCRIPTION:'',
					VERSION:'',
					DEPTID:''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					instructionmaskren: "subDepts",
					label: "simplename"
				},
				page: { //分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				WORK_INSTRUCTION: {},//修改子组件时传递数据
				selectData: [],
				buttons:[],
				workIns:'workIns'//appname
			}
		},
		methods: {
			setSelData(val){
				this.selMenu = val;
			},
			//机构值
			getCompany() {
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.selectData = res.data;
				});
			},
			tableControle(data) {
				this.checkedName = data;
			},
			fileSuccess(){//上传成功后返回数据
				this.page.currentPage = 1;
				this.requestData('init');
			},
			handleSuccess(response, file, fileList){//上传文件列表
				console.log(response);
				console.log(file);
				console.log(fileList);
			},
			resetbtn(){
				this.searchList =  { //点击高级搜索后显示的内容
					DESCRIPTION:'',
					VERSION:'',
					DEPTID:''
				};
				this.requestData('init','this.searchList');
			},
			searchinfo() {
				this.requestData('init');
			},
			//清空
			reset() {
				this.WORK_INSTRUCTION = {
					ID: '',
					NUM: '',
					WI_NUM: '',
					DESCRIPTION: '',
					STATUS: '活动',
					VERSION: '1',
					DEPARTMENT: '',
					ENTERBY: '',
					ENTERDATE: '',
					CHANGEBY: '',
					CHANGEDATE: ''
				};
				if(this.$refs['WORK_INSTRUCTION'] !== undefined) {
					this.$refs['WORK_INSTRUCTION'].resetFields();
				}

			},
			//请求点击
		    getbtn(item){
		    	var isshowbtn=this.btn;
		    	if(item.name=="添加"){
					if(isshowbtn=='0'){
                       this.$message({
						message: '您没有添加的权限',
						type: 'warning'
					});
					}else{
           this.openAddMgr();
					}
		    	}else if(item.name=="修改"){
					if(isshowbtn=='0'){
						this.$message({
							message: '您没有修改的权限',
							type: 'warning'
						});
					}else{
				    this.modify();
					}
		    	}else if(item.name=="彻底删除"){
					if(isshowbtn=='0'){
            this.$message({
						message: '您没有彻底删除的权限',
						type: 'warning'
					});
					}else{
      					this.physicsDel();
					}
				}else if(item.name=="删除"){
					if(isshowbtn=='0'){
					this.$message({
						message: '您没有删除的权限',
						type: 'warning'
					});
				}else{
					this.deluserinfo();
					}
		    	}else if(item.name=="高级查询"){
		    	 this.modestsearch();
		    	}else if(item.name=="导入"){
		    	 this.download();
		    	}else if(item.name=="导出"){
				this.exportData();
		    	}else if(item.name=="报表"){
			     this.reportdata();
				}else if(item.name=="打印"){
				 this.Printing();
				}
		    },
			//添加类别
			openAddMgr() {
				this.reset();
				this.$refs.instructionmask.open(); // 方法1
				this.$refs.instructionmask.visible();
			},
			//修改类别
			modify() {
				if(this.selMenu.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selMenu.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					this.WORK_INSTRUCTION = this.selMenu[0];
					this.$refs.instructionmask.detail();
				}
			},
			//查看
			 view(data) {
			 	this.WORK_INSTRUCTION =data;
				this.$refs.instructionmask.view();
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
			},
			// 删除
			deluserinfo() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/workIns/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].ID);
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
			// 彻底删除
			physicsDel() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/workIns/physicsDel';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].ID);
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
							// console.log(res.data.resp_code);
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
			// 导入文件上传
			uploadUrl(){
					var url = this.basic_url +'/api-apps/app/workIns/importExc?access_token='+sessionStorage.getItem('access_token');
					return url;
			},
          	
			// 导入
			download() {
				var url = this.basic_url + '/api-apps/app/workIns/importExcTemplete?access_token='+sessionStorage.getItem('access_token');
				var xhr = new XMLHttpRequest();
					xhr.open('POST', url, true);
					xhr.responseType = "blob";
					xhr.setRequestHeader("client_type", "DESKTOP_WEB");
					xhr.onload = function() {
						if (this.status == 200) {
								var filename = "workIns.xls";
								var blob = this.response;
								var link = document.createElement('a');
								var objecturl = URL.createObjectURL(blob);
									link.href = objecturl;
									link.download = filename;
									link.click();
								// window.location.href = objecturl;
						}
					}
					xhr.send();
			},

			// 导出
			exportData() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请选择您要导出的数据',
						type: 'warning'
					});
					return;
				} else {
					var exportid = [];
					var ids;
					for (var i = 0; i < selData.length; i++) {
						exportid.push(selData[i].ID);
					}
						//ids为exportid数组用逗号拼接的字符串
						ids = exportid.toString(',');
           		var url = this.basic_url + '/api-apps/app/workIns/exportExc/'+ids+'?access_token='+sessionStorage.getItem('access_token');
          		var xhr = new XMLHttpRequest();
            	xhr.open('POST', url, true);
            	xhr.responseType = "blob";
            	xhr.setRequestHeader("client_type", "DESKTOP_WEB");
            	xhr.onload = function() {
								if (this.status == 200) {
									var filename = "workIns.xls";
									var blob = this.response;
									var link = document.createElement('a');
									var objecturl = URL.createObjectURL(blob);
									link.href = objecturl;
									link.download = filename;
									link.click();
								}
							}
						xhr.send();
				}
			},
			// 打印
			Printing() {

			},
			// 报表
			reportdata(){
				this.reportData.app=this.workIns;
				this.$refs.reportChild.visible();
			},

			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			//Table默认加载数据
			requestData(opt,val) {
				this.$refs.table.requestData(opt,val);
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
				this.$refs.navsTabs.showClick(childValue);
				this.getbutton(childValue);
			  },
			    //请求页面的button接口
		    getbutton(childByValue){
		    	// console.log(childByValue);
		    	var data = {
					menuId: childByValue.id,
					roleId: this.$store.state.roleid,
				};
				var url = this.basic_url + '/api-user/permissions/getPermissionByRoleIdAndSecondMenu';
				this.$axios.get(url, {params: data}).then((res) => {
					// 
					this.buttons = res.data;
					
				}).catch((wrong) => {
				})

			},
			getdept(){
				var url = this.basic_url + '/api-user/users/findDeptAttr';
				this.$axios.get(url, {}).then((res) => {
					this.btn=res.data;
				}).catch((wrong) => {
				})
			}
		},
		mounted() {
			this.getCompany();
			this.getdept();
		},
	}
</script>

<style scoped>

</style>