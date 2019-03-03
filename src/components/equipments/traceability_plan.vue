<template>
<!-- 溯源计划 -->
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header ref='navsheader'></navs_header>
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
								<el-form-item label="计划编号" prop="PMNUM">
									<el-input v-model="searchList.PMNUM"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="计划描述" prop="DESCRIPTION">
									<el-input v-model="searchList.DESCRIPTION"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="设备编号" prop="ASSETNUM" label-width="100px">
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
								<el-form-item label="溯源周期" prop="FREQUENCY">
									<el-input v-model="searchList.FREQUENCY"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="溯源机构" prop="PM_MECHANISM">
									<el-select clearable v-model="searchList.PM_MECHANISM" filterable allow-create default-first-option placeholder="请选择">
										    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="溯源完成日期" prop="COMP_DATE" label-width="100px">
									<div class="block">
									    <el-date-picker
									      v-model="searchList.COMP_DATE"
									      type="date"
									      placeholder="请选择" style="width: 100%"  value-format="yyyy-MM-dd">
									    </el-date-picker>
								  	</div>
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
						<el-table :header-cell-style="rowClass" 
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
							<el-table-column label="溯源计划编号" width="200" sortable prop="PMNUM" v-if="this.checkedName.indexOf('溯源计划编号')!=-1">
								<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.PMNUM}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="计划描述" width="200" sortable prop="DESCRIPTION" v-if="this.checkedName.indexOf('计划描述')!=-1">
							</el-table-column>
							<el-table-column label="设备编号" width="120" sortable prop="ASSETNUM" v-if="this.checkedName.indexOf('设备编号')!=-1">
							</el-table-column>
							<el-table-column label="设备名称" width="120" sortable prop="A_NAME" v-if="this.checkedName.indexOf('设备名称')!=-1">
							</el-table-column>						
							<el-table-column label="规格型号" width="120" sortable prop="MODEL" v-if="this.checkedName.indexOf('规格型号')!=-1">
							</el-table-column>
							<el-table-column label="制造商" width="160" sortable prop="VENDOR" v-if="this.checkedName.indexOf('制造商')!=-1">
							</el-table-column>
							<el-table-column label="溯源方式" width="110" sortable prop="TRACEABILITY" v-if="this.checkedName.indexOf('溯源方式')!=-1">
							</el-table-column>
							<el-table-column label="溯源周期" width="100" sortable prop="FREQUENCY" v-if="this.checkedName.indexOf('溯源周期')!=-1">
							</el-table-column>
							<el-table-column label="单位" width="60" sortable prop="FREQUENCYUNIT" v-if="this.checkedName.indexOf('单位')!=-1">
							</el-table-column>
							<el-table-column label="溯源机构" width="100" sortable prop="PM_MECHANISMDesc" v-if="this.checkedName.indexOf('溯源机构')!=-1">
							</el-table-column>
							<el-table-column label="前次溯源起止时间" width="180" sortable prop="PM_START_END" :formatter="dateFormat" v-if="this.checkedName.indexOf('前次溯源起止时间')!=-1">
							</el-table-column>
							<el-table-column label="本次溯源计划时间" width="180" sortable prop="PM_PLANDATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('本次溯源计划时间')!=-1">
							</el-table-column>
							<el-table-column label="溯源完成日期" width="130" sortable prop="COMP_DATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('溯源完成日期')!=-1">
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
			<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
	</div>
</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import detailPage from '../equipmentsDetails/trancePlan_mask.vue'
	import reportmask from'../reportDetails/reportMask.vue'
	export default {
		name: 'user_management',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			detailPage,
			reportmask
		},
		data() {
			return {
				reportData:{},//报表的数据
				loading: false,
				basic_url: Config.dev_url,
				dataUrl: '/api/api-user/users',
				searchData: {
			        page: 1,
			        limit: 10,//分页显示数
			        nickname: '',
			        enabled: '',
			        searchKey: '',
			        searchValue: '',
			        companyId: '',
			        deptId: ''
		        },
				checkedName: [
					'溯源计划编号',
					'计划描述',	
					'设备编号',	
					'设备名称',	
					'规格型号',
					'制造商',
					'溯源方式',
					'溯源周期',
					'单位',
					'溯源机构',	
					'前次溯源起止时间',
					'本次溯源计划时间',
					'溯源完成日期'
				],
				tableHeader: [
					{
						label: '溯源计划编号',
						prop: 'PMNUM'
					},
					{
						label: '计划描述',
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
						label: '制造商',
						prop: 'VENDOR'
					},
					{
						label: '溯源方式',
						prop: 'TRACEABILITY'
					},
					{
						label: '溯源周期',
						prop: 'FREQUENCY'
					},
					{
						label: '单位',
						prop: 'FREQUENCYUNIT'
					},
					{
						label: '溯源机构',
						prop: 'PM_MECHANISMDesc'
					},
					{
						label: '前次溯源起止时间',
						prop: 'PM_START_END'
					},
					{
						label: '本次溯源计划时间',
						prop: 'PM_PLANDATE'
					},
					{
						label: '溯源完成日期',
						prop: 'COMP_DATE'
					}
				],
				
				companyId: '',
				deptId: '',
				selUser: [],
				'启用': true,
				'冻结': false,
				userList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					'A_NAME': '',
					'PMNUM': '',
					'ASSETNUM': '',
					'PM_MECHANISM': '',
					'DESCRIPTION': '',
					'COMP_DATE': '',
					'FREQUENCY': ''
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
				selectData:[]
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
				this.page.pageSize = 20;
				this.requestData();
			},
			resetbtn(){
				this.searchList = { //点击高级搜索后显示的内容
					A_NAME: '',
					PMNUM: '',
					ASSETNUM: '',
					PM_MECHANISM: '',
					DESCRIPTION: '',
					COMP_DATE: '',
					FREQUENCY: ''
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
			//添加用戶
			openAddMgr() {
//				this.$refs.child.resetNew();
				this.$refs.child.visible();
			},
			//修改用戶
			modify() {
				this.aaaData = this.selUser;
				if(this.aaaData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.aaaData.length > 1) {
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
					var url = this.basic_url + '/api-apps/app/pmPlan/deletes';
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
					var url = this.basic_url + '/api-apps/app/pmPlan/deletes/physicsDel';
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
           		var url = this.basic_url + '/api-apps/app/pmPlan/exportExc?access_token='+sessionStorage.getItem('access_token');
          		 var xhr = new XMLHttpRequest();
            	xhr.open('POST', url, true);
            	xhr.responseType = "blob";
            	xhr.setRequestHeader("client_type", "DESKTOP_WEB");
            	xhr.onload = function() {
                	if (this.status == 200) {
						var filename = "pmPlan.xls";
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
			//报表
			reportdata(){
				this.reportData.app=this.productType;
				this.$refs.reportChild.visible();
			},
			judge(data) {
				//taxStatus 布尔值
				return data.enabled ? '启用' : '冻结'
			},
			//时间格式化  
			// dateFormat(row, column) {
			// 	var date = row[column.property];
			// 	if(date == undefined) {
			// 		return "";
			// 	}
			// 	return this.$moment(date).format("YYYY-MM-DD");
			// 	// return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");  
			// },
			insert() {
				this.users.push(this.user)
			},
			remove(index) {
				this.users.splice(index, 1)
			},
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				this.loading = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					A_NAME:  this.searchList.A_NAME,
					PMNUM: this.searchList.PMNUM,
					ASSETNUM: this.searchList.ASSETNUM,
					PM_MECHANISM: this.searchList.PM_MECHANISM,
					DESCRIPTION: this.searchList.DESCRIPTION,
					COMP_DATE: this.searchList.COMP_DATE,
					FREQUENCY: this.searchList.FREQUENCY,
				}
				var url = this.basic_url + '/api-apps/app/pmPlan';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false
					} else {
						this.loadSign = true
					}
					this.userList =  res.data.data;
					this.loading = false;
					// this.userList = res.data.data;
					// this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
				
			},
			loadMore () {
				let up2down = sessionStorage.getItem('up2down');
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
					setTimeout(() => {
						this.loadSign = true
					}, 1000)
					this.requestData()
				}
			   // if (this.loadSign) {
			   //   this.loadSign = false
			   //   this.page++
			   //   if (this.page > 10) {
			   //     return
			   //   }
			   //   setTimeout(() => {
			   //     this.loadSign = true
			   //   }, 1000)
			   //   console.log('到底了', this.page)
			   // }
			 },
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
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
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		console.log(childValue);
        		this.$refs.navsheader.showClick(childValue);
      		},
		},
		mounted(){
			this.requestData();
			this.getCompany();
             // 注册scroll事件并监听  
             let self = this;
              $(".div-table").scroll(function(){
                self.loadMore();
            })
        },
	}
</script>

<style scoped>

</style>