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
						<el-form inline-message :model="searchList" label-width="120px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="报告模板名称" prop="DECRIPTION">
										<el-input v-model="searchList.DECRIPTION" @keyup.enter.native="searchinfo"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="报告模板类型" prop="RE_TYPE">
										<el-select clearable v-model="searchList.RE_TYPE" filterable allow-create default-first-option placeholder="请选择" @keyup.enter.native="searchinfo">
										    <el-option v-for="(data,index) in selectData" :key="index" :value="data.code" :label="data.name"></el-option>
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
								<el-table-column label="编码" width="155" sortable prop="RE_NUM" v-if="this.checkedName.indexOf('编码')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.RE_NUM}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="报告模板名称" sortable prop="DECRIPTION" v-if="this.checkedName.indexOf('报告模板名称')!=-1">
								</el-table-column>
								<el-table-column label="报告模板类型" sortable prop="RE_TYPEDesc" width="160" v-if="this.checkedName.indexOf('报告模板类型')!=-1">
								</el-table-column>
								<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<!-- <el-table-column label="机构" width="185" sortable prop="DEPTIDDesc" v-if="this.checkedName.indexOf('机构')!=-1" >
								</el-table-column> -->
							</v-table>
							<!-- 表格 End-->
						</el-col>
					</el-row>
				</div>
			</div>
			<!--右侧内容显示 End-->
			<categorymask :CATEGORY="CATEGORY" ref="categorymask" @request="requestData" @reset="reset" v-bind:page=page></categorymask>
		<!--报表-->
			<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_tabs from '../common/nav_tabs.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import categorymask from '../maindataDetails/report_moduleMask.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import reportmask from'../reportDetails/reportMask.vue'
	import vTable from '../plugin/table/table.vue'
	export default {
		name: 'customer_management',
		components: {
			'vheader': vheader,
			'navs_left': navs_left,
			'navs_tabs': navs_tabs,
			'categorymask': categorymask,
			'tableControle': tableControle,
			'reportmask': reportmask,
			'v-table': vTable
		},
		data() {
			return {
				appName: 'inspectionRepTem',
				btn:'',
				reportData:{},//报表的数据
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				fileList:[],//文件上传的接收数据
				commentArr: {},
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				
				checkedName: [
					'编码',
					'报告模板名称',
					'报告模板类型',
					'录入时间',
					'机构'
				],
				tableHeader: [{
						label: '编码',
						prop: 'RE_NUM'
					},
					{
						label: '报告模板名称',
						prop: 'DECRIPTION'
					},
					{
						label: '报告模板类型',
						prop: 'RE_TYPE'
					},
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
						label: '机构',
						prop: 'DEPTIDDesc'
					}
				],
				selMenu: [],
				categoryList: [],
				search: false,
				show: false,
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					TYPE: '',
					RE_TYPE: '',
					// PHONE: '',
					// CONTACT_ADDRESS: '',
					// STATUS: ''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					categorymaskren: "subDepts",
					label: "simplename"
				},
				page: { //分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				CATEGORY: {},//修改子组件时传递数据
				selectData: [],
				buttons:[],
			}
		},
		methods: {
			setSelData(val){
				this.selMenu = val;
			},
			//报告模板类型
			getReportType() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=RE_TYPE';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data;
				}).catch(error => {
						console.log('请求失败');
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
					TYPE: '',
					RE_TYPE: '',
				};
				this.requestData('init','this.searchList');
			},
			searchinfo(index) {
				this.requestData('init');
			},
			//清空
			reset() {
				this.CATEGORY = {
					ID: '',
					RE_NUM: '',
					RE_TYPE: '1',//给子表赋值，1代表检验类型2代表检验类型
					TYPE: '',
					STATUS: '活动',
					VERSION: '1',
					DEPARTMENT: '',
					ENTERBY: '',
					ENTERDATE: '',
					CHANGEBY: '',
					CHANGEDATE: ''
				};
				if(this.$refs['CATEGORY'] !== undefined) {
					this.$refs['CATEGORY'].resetFields();
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
				this.$refs.categorymask.open(); // 方法1
				this.$refs.categorymask.visible();
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
					this.CATEGORY = this.selMenu[0];
					this.$refs.categorymask.detail();
				}
			},
			//查看
			 view(data) {
			 	this.CATEGORY =data;
				this.$refs.categorymask.view();
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
					var url = this.basic_url + '/api-apps/app/inspectionRepTem/deletes';
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
					var url = this.basic_url + '/api-apps/app/inspectionRepTem/physicsDel';
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
			// 导入文件上传
			uploadUrl(){
					var url = this.basic_url +'/api-apps/app/inspectionRepTem/importExc?access_token='+sessionStorage.getItem('access_token');
					return url;
			},
          	
			// 导入
			download() {
				var url = this.basic_url + '/api-apps/app/inspectionRepTem/importExcTemplete?access_token='+sessionStorage.getItem('access_token');
				var xhr = new XMLHttpRequest();
					xhr.open('POST', url, true);
					xhr.responseType = "blob";
					xhr.setRequestHeader("client_type", "DESKTOP_WEB");
					xhr.onload = function() {
						if (this.status == 200) {
							var filename = "inspectionRepTem.xls";
							var blob = this.response;
							var objecturl = URL.createObjectURL(blob);
							var link = document.createElement('a');
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
						var url = this.basic_url + '/api-apps/app/inspectionRepTem/exportExc/'+ids+'?access_token='+sessionStorage.getItem('access_token');
						var xhr = new XMLHttpRequest();
						xhr.open('POST', url, true);
						xhr.responseType = "blob";
						xhr.setRequestHeader("client_type", "DESKTOP_WEB");
						xhr.onload = function() {
							if (this.status == 200) {
								var filename = "inspectionRepTem.xls";
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
				this.reportData.app=this.productType;
				this.$refs.reportChild.visible();
			},

			judge(data) {
				data.STATUS = data.STATUS == "1" ? '活动' : '不活动'
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
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
					
					var resData = res.data;
					var uploadIndex = 0;
					var uploadBtn = resData.filter((item,index)=>{
						if(item.name == '导入'){
							uploadIndex  = index;
							return item;
						}
					});
					if(uploadBtn.length > 0){
						this.isUploadBtn = true;
						resData.splice(uploadIndex, 1);
					}
					this.buttons = resData;
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
			this.getReportType();
			this.getdept();
		},
	}
</script>

<style scoped>

</style>