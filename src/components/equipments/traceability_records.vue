<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_tabs ref='navsTabs'></navs_tabs>
	</div>
	<div class="contentbg">
		<!--左侧菜单内容显示 Begin-->
		<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
		<!--左侧菜单内容显示 End-->

		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content">
			<div class="ibox-content">
				<div class="fixed-table-toolbar clearfix">
					<div class="bs-bars pull-left">
						<div class="hidden-xs" id="roleTableToolbar" role="group">
							<button v-for="item in buttons" class="btn mr5" :class="item.style" @click="getbtn(item)">
									<i :class="item.icon"></i>{{item.name}}
							</button>
							<!-- <button type="button" class="btn btn-green" @click="openAddMgr" id="">
	                        	<i class="icon-add"></i>添加
	              			 </button> 
							<button type="button" class="btn btn-blue button-margin" @click="modify">
							    <i class="icon-edit"></i>修改
							</button>
							<button type="button" class="btn btn-red button-margin" @click="deluserinfo">
							    <i class="icon-trash"></i>删除
							</button>
							<button type="button" class="btn btn-red button-margin" @click="physicsDel">
							    <i class="icon-trash"></i>彻底删除
							</button>			
							<button type="button" class="btn btn-primarys button-margin" @click="importData">
							    <i class="icon-upload-cloud"></i>导入
							</button>
							<button type="button" class="btn btn-primarys button-margin" @click="exportData">
							    <i class="icon-download-cloud"></i>导出
							</button>
							<button type="button" class="btn btn-primarys button-margin" @click="reportdata">
							    <i class="icon-clipboard"></i>报表
							</button>
							<button type="button" class="btn btn-primarys button-margin" @click="Printing">
							    <i class="icon-print"></i>打印
							</button>
							<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
					    		<i class="icon-search"></i>高级查询
					    		<i class="icon-arrow1-down" v-show="down"></i>
					    		<i class="icon-arrow1-up" v-show="up"></i>
							</button>
							-->
						</div>
					</div>
					<div class="columns columns-right btn-group pull-right">
						<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
						<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
					</div>
				</div>
				<!-- 高级查询划出 Begin-->
				<div v-show="search">
					<el-form :model="searchList" label-width="70px">
						<el-row :gutter="10">
							<el-col :span="5">
								<el-form-item label="溯源记录编号" prop="RECORDNUM" label-width="100px">
									<el-input v-model="searchList.RECORDNUM"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="记录描述" prop="DESCRIPTION">
									<el-input v-model="searchList.DESCRIPTION"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="设备编号" prop="ASSETNUM">
									<el-input v-model="searchList.ASSETNUM"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="设备名称" prop="A_NAME">
									<el-input v-model="searchList.A_NAME"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="10">
							<el-col :span="5">
								<el-form-item label="溯源方式" prop="PM_MODEL" label-width="100px">
									<el-input v-model="searchList.PM_MODEL"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="证书编号" prop="C_NUM">
									<el-input v-model="searchList.C_NUM"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
								<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;margin-left: 2px">重置</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 高级查询划出 End-->
				<el-row :gutter="0">
					<el-col :span="24">
						<!-- 表格 Begin-->
						<el-table ref="table" :header-cell-style="rowClass" 
								  :data="userList" 
								  border 
								  stripe 
								  :height="fullHeight" 
								  style="width: 100%;" 
								  :default-sort="{prop:'userList', order: 'descending'}"
								   @selection-change="SelChange" 
								   v-loadmore="loadMore"
								   v-loading="loading"  
								  element-loading-text="加载中…"
    							  element-loading-spinner="el-icon-loading"
    							  element-loading-background="rgba(255, 255, 255, 0.9)">
							<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
							</el-table-column>
							<el-table-column label="溯源记录编号" width="120" sortable prop="RECORDNUM" v-if="this.checkedName.indexOf('溯源记录编号')!=-1">
								<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.RECORDNUM}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="记录描述" width="200" sortable prop="DESCRIPTION" v-if="this.checkedName.indexOf('记录描述')!=-1">
							</el-table-column>
							<el-table-column label="设备编号" width="140" sortable prop="ASSETNUM" v-if="this.checkedName.indexOf('设备编号')!=-1">
							</el-table-column>
							<el-table-column label="设备名称" width="200" sortable prop="A_NAME" v-if="this.checkedName.indexOf('设备名称')!=-1">
							</el-table-column>						
							<el-table-column label="规格型号" width="120" sortable prop="MODEL"  v-if="this.checkedName.indexOf('规格型号')!=-1">
							</el-table-column>
							<el-table-column label="溯源方式" width="120" sortable prop="PM_MODEL"  v-if="this.checkedName.indexOf('溯源方式')!=-1">
							</el-table-column>
							<el-table-column label="溯源日期" width="140" sortable prop="PM_DATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('溯源日期')!=-1">
							</el-table-column>
							<el-table-column label="确认结论" width="160" sortable prop="R_CONCLUSION" v-if="this.checkedName.indexOf('确认结论')!=-1">
							</el-table-column>
							<el-table-column label="证书编号" width="140" sortable prop="C_NUM" v-if="this.checkedName.indexOf('证书编号')!=-1">
							</el-table-column>
							<el-table-column label="设备性能指标要求" width="200" sortable prop="A_KPI"  v-if="this.checkedName.indexOf('设备性能指标要求')!=-1">
							</el-table-column>
							<el-table-column label="指标确定来源" width="160" sortable prop="SORUCE" v-if="this.checkedName.indexOf('指标确定来源')!=-1">
							</el-table-column>
							<el-table-column label="确认内容" width="200" sortable prop="R_DESC" v-if="this.checkedName.indexOf('确认内容')!=-1">
							</el-table-column>
						</el-table>
						<el-pagination background class="text-right pt10" v-if="this.checkedName.length>0"
				            @size-change="sizeChange"
				            @current-change="currentChange"
				            :current-page="page.currentPage"
				            :page-sizes="[10, 20, 30, 40]"
				            :page-size="page.pageSize"
				            layout="total, sizes, prev, pager, next"
				            :total="page.totalCount">
				        </el-pagination>
						<!-- 表格 End-->
					</el-col>
				</el-row>
			</div>
		</div>
		<!--右侧内容显示 End-->
		<detailPage :detailData="selUser[0]" ref="child" @request="requestData"></detailPage>
		<!--报表-->
		<reportmask :reportData="reportData" ref="reportChild"></reportmask>
	</div>
</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_tabs from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import detailPage from '../equipmentsDetails/traceRec_mask.vue'
	import reportmask from'../reportDetails/reportMask.vue'
	export default {
		name: 'user_management',
		components: {
			vheader,
			navs_left,
			navs_tabs,
			tableControle,
			detailPage,
			reportmask
		},
		data() {
			return {
				reportData:{},//报表的数据
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				basic_url: Config.dev_url,
				dataUrl: '/api/api-user/users',
				checkedName: [
					'溯源记录编号',
					'记录描述',
					'设备编号',
					'设备名称',
					'规格型号',
					'溯源方式',
					'溯源日期',	
					'确认结论',
					'证书编号',
					'设备性能指标要求',
					'指标确定来源',
					'确认内容'
				],
				tableHeader: [
					{
						label: '溯源记录编号',
						prop: 'RECORDNUM'
					},
					{
						label: '记录描述',
						prop: 'DESCRIPTION'
					},
					{
						label: '设备编号',
						prop: 'ASSETNUM'
					},
					{
						label: '设备名称',
						prop: 'A_NAME'
					},
					{
						label: '规格型号',
						prop: 'MODEL'
					},
					{
						label: '溯源方式',
						prop: 'PM_MODEL'
					},
					{
						label: '溯源日期',
						prop: 'PM_DATE'
					},
					{
						label: '确认结论',
						prop: 'R_CONCLUSION'
					},
					{
						label: '证书编号',
						prop: 'C_NUM'
					},
					{
						label: '设备性能指标要求',
						prop: 'A_KPI'
					},
					{
						label: '指标确定来源',
						prop: 'SORUCE'
					},
					{
						label: '确认内容',
						prop: 'R_DESC'
					}
				],
				leftNavs: [//leftNavs左侧菜单数据
					{
						navicon: 'icon-user',
						navtitle: '用户管理',
						navherf: '/personinfo'
					}, {
						navicon: 'icon-edit',
						navtitle: '机构管理',
						navherf: '/dept_management'
					}, {
						navicon: 'icon-role-site',
						navtitle: '角色管理',
						navherf: '/role_management'
					}, {
						navicon: 'icon-file-text',
						navtitle: '客户管理',
						navherf: '/customer_management'
					}, {
						navicon: 'icon-file-text',
						navtitle: '产品类别',
						navherf: '/products_category'
					}, {
						navicon: 'icon-file-text',
						navtitle: '产品',
						navherf: '/products'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测标准',
						navherf: '/testing_standard'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测项目',
						navherf: '/testing_projects'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测方法',
						navherf: '/testing_methods'
					}, {
						navicon: 'icon-file-text',
						navtitle: '自动编号设置',
						navherf: '/number_settings'
					}
				],
				companyId: '',
				deptId: '',
				selUser: [],
				userList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					DESCRIPTION: '',
					ASSETNUM: '',
					A_NAME: '',
					RECORDNUM: '',
					PM_MODEL: '',
					C_NUM: '',
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				userData:[],
				page: {//分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				aaaData:[],
				buttons:[],
				pmRecord:'pmRecord'//appname
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
				return 'text-align:center'
			},
			tableControle(data){
				this.checkedName = data;
			},
			resetbtn(){
				this.searchList = { //点击高级搜索后显示的内容
					DESCRIPTION: '',
					ASSETNUM: '',
					A_NAME: '',
					RECORDNUM: '',
					PM_MODEL: '',
					C_NUM: '',
				};
				this.requestData();
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			//请求点击
		    getbtn(item){
		    	if(item.name=="添加"){
		         this.openAddMgr();
		    	}else if(item.name=="修改"){
		    	 this.modify();
		    	}else if(item.name=="彻底删除"){
		    	 this.physicsDel();
		    	}else if(item.name=="高级查询"){
		    	 this.modestsearch();
		    	}else if(item.name=="导入"){
		    	 this.download();
		    	}else if(item.name=="删除"){
		    	 this.deluserinfo();
		    	}else if(item.name=="报表"){
			     this.reportdata();
				}else if(item.name=="打印"){
				   this.Printing();
				}
		    },
			//添加用戶
			openAddMgr() {
				this.$refs.child.visible();
			},
			//修改用戶
			modify() {
				if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail();
				}
			},
			//查看
			view(data) {
			 	// console.log(data);
			 	// this.dataInfo = data;
				this.$refs.child.view(data);
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
					this.up = !this.up
			},
			// 删除
			deluserinfo() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/pmRecord/deletes';
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
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
					}).catch(() => {

					});
				}
			},
			// 删除
			physicsDel() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/pmRecord/physicsDel';
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
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
					}).catch(() => {

					});
				}
			},
			// 导入
			importData() {
				
			},
			// 导出
			exportData() {
				
			},
			// 打印
			Printing() {
				
			},
			//报表
			reportdata(){
				this.reportData.app=this.pmRecord;
				this.$refs.reportChild.visible();
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
				this.selUser = val;
			},
			//表格滚动加载
			loadMore() {
				let up2down = sessionStorage.getItem('up2down');
				if(this.loadSign) {					
					if(up2down=='down'){
						this.page.currentPage++;
						if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
							this.page.currentPage = Math.ceil(this.page.totalCount / this.page.pageSize)
							return false;
						}
						let append_height = window.innerHeight - this.$refs.table.$el.offsetTop - 50;
						if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
							$('.el-table__body-wrapper table').append('<div class="filing" style="height: '+append_height+'px;width: 100%;"></div>');
							sessionStorage.setItem('toBtm','true');
						}
					}else{
						sessionStorage.setItem('toBtm','false');
						this.page.currentPage--;
						if(this.page.currentPage < 1) {
							this.page.currentPage=1;
							return false;
						}
					}
					this.loadSign = false;
					setTimeout(() => {
						this.loadSign = true;
					}, 1000)
					this.requestData();
				}
			},
			//改变页数
			sizeChange(val) {
				this.page.pageSize = val;
				if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
					$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
					sessionStorage.setItem('toBtm','true');
				}else{
					sessionStorage.setItem('toBtm','false');
				}
				this.requestData();
			},
			//当前页数
			currentChange(val) {
				this.page.currentPage = val;
				if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
					$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
					sessionStorage.setItem('toBtm','true');
				}else{
					sessionStorage.setItem('toBtm','false');
				}
				this.requestData();
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			//Table默认加载数据
			requestData(index) {
				this.loading = true;//加载动画打开
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					DESCRIPTION: this.searchList.DESCRIPTION,
					ASSETNUM: this.searchList.ASSETNUM,
					A_NAME: this.searchList.A_NAME,
					RECORDNUM: this.searchList.RECORDNUM,
					PM_MODEL: this.searchList.PM_MODEL,
					C_NUM: this.searchList.C_NUM,
				}
				var url = this.basic_url + '/api-apps/app/pmRecord';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;//页码赋值
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false
					} else {
						this.loadSign = true
					}
					this.userList =  res.data.data;
					this.loading = false;//加载动画关闭
					if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
						$('.el-table__body-wrapper table').find('.filing').remove();
					}//滚动加载数据判断filing
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试1',
						type: 'error'
					});
				})
				
			},
			formatter(row, column) {
				return row.enabled;
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
				this.$refs.navsTabs.showClick(childValue);
				this.getbutton(childValue);
			},
			  //请求页面的button接口
		    getbutton(childByValue){
		    	console.log(childByValue);
		    	var data = {
					menuId: childByValue.id,
					roleId: this.$store.state.roleid,
				};
				var url = this.basic_url + '/api-user/permissions/getPermissionByRoleIdAndSecondMenu';
				this.$axios.get(url, {params: data}).then((res) => {
					console.log(res);
					this.buttons = res.data;
					
				}).catch((wrong) => {
					this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
				})
		    },
		},
		mounted() {
			this.requestData();
		},
	}
</script>

<style scoped>

</style>