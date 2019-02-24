<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header  ref="navsheader"></navs_header>
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
								<button type="button" class="btn btn-green" @click="openAddMgr" id="">
		                        	<i class="icon-add"></i>添加
		              			 </button>
								<button type="button" class="btn btn-blue button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" @click="deluserinfo">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-red button-margin" @click="physicsDel">
								    <i class="icon-trash"></i>物理删除
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="importData">
								    <i class="icon-upload-cloud"></i>导入
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="exportData">
								    <i class="icon-download-cloud"></i>导出
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="reportdata">
							    <i class="icon-file-text1"></i>报表
							</button>
								<button type="button" class="btn btn-primarys button-margin" @click="Printing">
								    <i class="icon-print"></i>打印
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
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName" @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!--按钮操作行 End-->

					<!-- 高级查询划出 Begin-->
					<div v-show="search">
						<el-form :model="searchList" label-width="45px">
							<el-row>
								<el-col :span="5">
									<el-form-item label="编码" prop="M_NUM">
										<el-input v-model="searchList.M_NUM">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="中文名称" prop="M_NAME" label-width="90px">
										<el-input v-model="searchList.M_NAME">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="英文名称" prop="M_ENAME" label-width="90px">
										<el-input v-model="searchList.M_ENAME">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="类别" prop="M_TYPE" label-width="60px">
										<el-input v-model="searchList.M_TYPE">
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="5">
									<el-form-item label="版本" prop="VERSION" >
										<el-input v-model="searchList.VERSION">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="机构" prop="DEPTID" label-width="90px">
										<el-select clearable v-model="searchList.DEPTID" filterable allow-create default-first-option placeholder="请选择">
										    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<!-- <el-col :span="6">
									<el-select v-model="searchList.STATUS" placeholder="请选择信息状态">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col> -->
								<el-col :span="4">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
									<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;    margin-left: 2px">重置</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->
					
					<el-row>
						<el-col :span="24">
							<!-- 表格 Begin-->
							<el-table :header-cell-style="rowClass" 
									  :data="methodsList" 
									  border 
									  stripe 
									  :height="fullHeight" 
									  style="width: 100%;" 
									  :default-sort="{prop:'methodsList', order: 'descending'}" 
									  @selection-change="SelChange" 
									  v-loadmore="loadMore"
									  v-loading="loading"  
									  element-loading-text="加载中…"
    								  element-loading-spinner="el-icon-loading"
    								  element-loading-background="rgba(255, 255, 255, 0.9)">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="编码" width="170" sortable prop="M_NUM" v-if="this.checkedName.indexOf('编码')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.M_NUM}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="中文名称" width="220" sortable prop="M_NAME" v-if="this.checkedName.indexOf('中文名称')!=-1">
								</el-table-column>
								<el-table-column label="英文名称" width="180" sortable prop="M_ENAME" v-if="this.checkedName.indexOf('英文名称')!=-1">
								</el-table-column>
								<el-table-column label="类别" width="70" sortable prop="M_TYPE" v-if="this.checkedName.indexOf('类别')!=-1">
								</el-table-column>
								<!--<el-table-column label="信息状态" width="100" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column>-->
								<el-table-column label="版本" width="70" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1" align="right">
								</el-table-column>
								<el-table-column label="机构" sortable prop="DEPTIDDesc" v-if="this.checkedName.indexOf('机构')!=-1">
								</el-table-column>
								<!-- <el-table-column label="录入人" width="120" prop="ENTERBY" sortable v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column> -->
								<el-table-column label="录入时间" width="100" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<!-- <el-table-column label="修改人" width="120" prop="CHANGEBY" sortable v-if="this.checkedName.indexOf('修改人')!=-1">
								</el-table-column> -->
								<el-table-column label="修改时间" width="100" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 End-->
						</el-col>
					</el-row>
				</div>
			</div>
			<!--右侧内容显示 End-->
			<testingmask :testingForm="testingForm" ref="child" @request="requestData" @reset="reset" v-bind:page=page></testingmask>
		</div>
		<!--报表-->
			<reportmask :reportData="reportData" ref="reportChild" ></reportmask>

	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import testingmask from '../maindataDetails/testing_methodsMask.vue'
	import reportmask from'../reportDetails/reportMask.vue'
	export default {
		name: 'testing_methods',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			testingmask,
			reportmask
		},
		data() {
			return {
				reportData:{},//报表的数据
				loading: false,
				basic_url: Config.dev_url,
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '2',
					label: '不活动'
				}],
				loadSign:true,//加载
				commentArr:{},
				checkedName: [
					'编码',
					'中文名称',
					'英文名称',
					'类别',
					'信息状态',
					'版本',
					'机构',
					// '录入人',
					'录入时间',
					// '修改人',
					'修改时间'
				],
				tableHeader: [{
						label: '编码',
						prop: 'M_NUM'
					},
					{
						label: '中文名称',
						prop: 'M_NAME'
					},
					{
						label: '英文名称',
						prop: 'M_ENAME'
					},
					{
						label: '类别',
						prop: 'M_TYPE'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// },
					{
						label: '版本',
						prop: 'VERSION'
					},
					{
						label: '机构',
						prop: 'DEPTIDDesc'
					},
					// {
					// 	label: '录入人',
					// 	prop: 'ENTERBY'
					// },
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					// {
					// 	label: '修改人',
					// 	prop: 'CHANGEBY'
					// },
					{
						label: '修改时间',
						prop: 'CHANGEDATE'
					}
				],
				companyId: '',
				deptId: '',
				selMenu: [],
				'活动': true,
				'不活动': false,
				'男': true,
				'女': false,
				methodsList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				// isShow: false,
				// ismin: true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					nickname: '',
					enabled: '',
					createTime: '',
					DEPTID:''
				},
				page: { //分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				testingForm: {},//修改子组件时传递数据
				selectData: [],
			}
		},

		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    // console.log(rowIndex) //表头行标号为0
			    return 'text-align:center'
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
					console.log(res.data);
					this.selectData = res.data;
				});
			},
			//表格滚动加载
			loadMore() {
				let up2down = sessionStorage.getItem('up2down');
				console.log(up2down)
				console.log(this.loadSign)
				if(this.loadSign) {					
					if(up2down=='down'){
						this.page.currentPage++
						if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
							this.page.currentPage = Math.ceil(this.page.totalCount / this.page.pageSize)
							return false;
						}
					}else{
						this.page.currentPage--
						if(this.page.currentPage < 1) {
							this.page.currentPage=1
							return false;
						}
					}
					this.loadSign = false;
					console.log('this.page.currentPage',this.page.currentPage)
					setTimeout(() => {
						this.loadSign = true
					}, 1000)
					this.requestData()
				}
			},
			tableControle(data) {//控制表格列显示隐藏
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
					resetbtn(){
				this.searchList =  { //点击高级搜索后显示的内容
					DESCRIPTION:'',
					VERSION:'',
					DEPTID:''
				};
				this.requestData();
			},
			searchinfo(index) {//高级查询
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			//重置
			reset(){
				this.testingForm = {
					"VERSION": 1,
					"STATUS": '活动',
					"M_NUM": '',
					"M_NAME": '',
					"M_ENAME": '',
					"M_TYPE": '',
					"DEPARTMENT": '',
					"ENTERBY": '',
					"ENTERDATE": '',
					"CHANGEBY": '',
					"CHANGEDATE": '',
				};
				if(this.$refs['testingForm'] !== undefined) {
					this.$refs['testingForm'].resetFields();
				}
			},
			openAddMgr() {//添加检验/检测方法编号数据
				this.reset();
				this.$refs.child.open();
				this.$refs.child.visible();
			},
			modify() {//修改检验/检测方法编号数据
				if(this.selMenu.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selMenu.length > 1) {
					this.$message({
						message: '不可同时修改多条数据',
						type: 'warning'
					});
					return;
				} else {
					this.testingForm = this.selMenu[0]; 
					this.$refs.child.detail();
				}
			},
			//查看
			 view(data) {
			 	this.testingForm = data;
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
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/inspectionMet/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for (var i = 0; i < changeUser.length; i++) {
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
                    }).then(({ value }) => {
                        this.$axios.delete(url, {params: data}).then((res) => {//.delete 传数据方法
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
			//物理 删除
			physicsDel() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/inspectionMet/deletes/physicsDel';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for (var i = 0; i < changeUser.length; i++) {
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
                    }).then(({ value }) => {
                        this.$axios.delete(url, {params: data}).then((res) => {//.delete 传数据方法
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
           		var url = this.basic_url + '/api-apps/app/inspectionMet/exportExc?access_token='+sessionStorage.getItem('access_token');
          		 var xhr = new XMLHttpRequest();
            	xhr.open('POST', url, true);
            	xhr.responseType = "blob";
            	xhr.setRequestHeader("client_type", "DESKTOP_WEB");
            	xhr.onload = function() {
                	if (this.status == 200) {
						var filename = "inspectionMet.xls";
						var blob = this.response;
						var link = document.createElement('a');
						var objecturl = URL.createObjectURL(blob);
						link.href = objecturl;
						link.download = filename;
						link.click();
                	}
            	}
            	xhr.send();
			},
			// 打印
			Printing() {

			},
			// 报表
			reportdata(){
				this.reportData.app=this.productType;
				this.$refs.reportChild.visible();
			},

			judge(data) {//taxStatus 布尔值
				return data.STATUS ? '活动' : '不活动'
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			SelChange(val) {//选中值后赋值给一个自定义的数组：selMenu
				this.selMenu = val;
			},
			requestData() {//高级查询字段
				this.loading = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					M_NUM: this.searchList.M_NUM,
					M_NAME: this.searchList.M_NAME,
					VERSION: this.searchList.VERSION,
					DEPARTMENT: this.searchList.DEPARTMENT,
					M_ENAME: this.searchList.M_ENAME,
					M_TYPE: this.searchList.M_TYPE,
					DEPTID: this.searchList.DEPTID,
					STATUS: this.searchList.STATUS,
				}
				var url = this.basic_url + '/api-apps/app/inspectionMet';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;	
					//总的页数
					let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
					if(this.page.currentPage >= totalPage){
						 this.loadSign = false
					}else{
						this.loadSign=true
					}
					this.methodsList = res.data.data;
					this.loading = false;
				}).catch((wrong) => {})
			},

			formatter(row, column) {
				return row.enabled;
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
      		},
		},
		mounted() {
			this.requestData();
			this.getCompany();
		},
	}
</script>

<style scoped>

</style>