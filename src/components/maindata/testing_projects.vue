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
							<button v-for="item in buttons" class="btn mr5" :class="item.style" @click="getbtn(item)">
									<i :class="item.icon"></i>{{item.name}}
							</button>
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
						</div>
					</div>
					<div class="columns columns-right btn-group pull-right">
						<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
						<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
					</div>
				</div>
				<!--按钮操作行 End-->

				<!-- 高级查询划出 Begin-->
				<div v-show="search">
						<el-form :model="searchList" label-width="45px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="编码" prop="P_NUM">
										<el-input v-model="searchList.P_NUM">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="名称" prop="P_NAME">
										<el-input v-model="searchList.P_NAME">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="版本" prop="VERSION">
										<el-input v-model="searchList.VERSION">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="机构" prop="DEPTID">
										<el-select clearable v-model="searchList.DEPTID" filterable allow-create default-first-option placeholder="请选择">
									    	<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<!-- <el-col :span="3">
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

				<el-row :gutter="0">
					<el-col :span="24">
						<!-- 表格 Begin-->
						<el-table ref="table" :header-cell-style="rowClass" 
								  :data="projectList" 
								  border stripe 
								  :height="fullHeight" 
								  style="width: 100%;" 
								  :default-sort="{prop:'projectList', order: 'descending'}" 
								  @selection-change="SelChange" 
								  v-loadmore="loadMore"
								  v-loading="loading"  
								  element-loading-text="加载中…"
    							  element-loading-spinner="el-icon-loading"
    							  element-loading-background="rgba(255, 255, 255, 0.9)">
							<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
							</el-table-column>
							<el-table-column label="编码" width="150" sortable prop="P_NUM" v-if="this.checkedName.indexOf('编码')!=-1">
								<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row.ID)>{{scope.row.P_NUM}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="名称" width="220" sortable prop="P_NAME" v-if="this.checkedName.indexOf('名称')!=-1">
							</el-table-column>
							<el-table-column label="单价(元)" width="120" align="right" sortable prop="UNITCOST" v-if="this.checkedName.indexOf('单价')!=-1">
							</el-table-column>
							<!-- <el-table-column label="人员资质" width="180" sortable prop="QUALIFICATION" v-if="this.checkedName.indexOf('人员资质')!=-1">
							</el-table-column> -->
							<!--<el-table-column label="信息状态" width="100" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('信息状态')!=-1">
							</el-table-column>-->
							<!--<el-table-column label="文件" width="120" sortable prop="DOCLINKP_NAME" v-if="this.checkedName.indexOf('文件')!=-1">-->
							<el-table-column label="领域" width="120" sortable prop="FIELD" v-if="this.checkedName.indexOf('领域')!=-1">
							</el-table-column>
							<el-table-column label="子领域" width="120" sortable prop="CHILD_FIELD" v-if="this.checkedName.indexOf('子领域')!=-1">
							</el-table-column>
							<el-table-column label="版本" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1" align="right">
							</el-table-column>
							<el-table-column label="机构" width="160" sortable prop="DEPTIDDesc" v-if="this.checkedName.indexOf('机构')!=-1">
							</el-table-column>
							<!-- <el-table-column label="录入人" width="120" prop="ENTERBY" sortable  v-if="this.checkedName.indexOf('录入人')!=-1"> -->
							</el-table-column>
							<el-table-column label="录入时间" width="100" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
							</el-table-column>
							<!-- <el-table-column label="修改人" width="120" prop="CHANGEBY" sortable  v-if="this.checkedName.indexOf('修改人')!=-1">
							</el-table-column> -->
							<el-table-column label="修改时间" width="100" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
							</el-table-column>
						</el-table>
						<el-pagination background class="text-right pt10" v-if="this.checkedName.length>0"
				            @size-change="sizeChange"
				            @current-change="currentChange"
				            :current-page="page.currentPage"
				            :page-sizes="[10, 20, 30, 40,100]"
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
		<projectmask ref="child" @request="requestData" @reset="reset" v-bind:page=page ></projectmask>
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
	import projectmask from '../maindataDetails/testing_projectMask.vue'
	import reportmask from'../reportDetails/reportMask.vue'
	export default {
		name: 'testing_projects',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			projectmask,
			reportmask
		},
		data() {
			return {
				reportData:{},//报表的数据
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				commentArr:{},
				checkedName: [
					'编码',
					'名称',
					'单价',
					// '人员资质',
					// '信息状态',
					'领域',
					'子领域',
					'版本',
					'机构',
					// '录入人',
					'录入时间',
					// '修改人',
					'修改时间'
				],
				tableHeader: [
					{
						label: '编码',
						prop: 'P_NUM'
					},
					{
						label: '名称',
						prop: 'P_NAME'
					},
					{
						label: '单价',
						prop: 'UNITCOST'
					},
					// {
					// 	label: '人员资质',
					// 	prop: 'QUALIFICATION'
					// },
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// },
					{
						label: '领域',
						prop: 'FIELD'
					},
					{
						label: '子领域',
						prop: 'CHILD_FIELD'
					},
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
				selMenu: [],
				'活动': true,
				'不活动': false,
				projectList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					P_NUM: '',
					P_NAME: '',
					VERSION: '',
					DEPTID:'',
					// STATUS:'',
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				page: {//分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				testing_projectForm: {},//修改子组件时传递数据
				selectData: [],
				buttons:[],
				inspectionPro:'inspectionPro'//appname
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
			tableControle(data){//控制表格列显示隐藏
				this.checkedName = data;
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
	    	resetbtn(){
				this.searchList =  { //点击高级搜索后显示的内容
					P_NUM: '',
					P_NAME: '',
					VERSION: '',
					DEPTID:'',
				};
				this.requestData();
			},
			searchinfo(index) {//高级查询
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			//清空
			reset(){
				this.testing_projectForm = { //数据库列表
					VERSION: '1',
					STATUS: '活动',
					P_NUM: '',
					P_NAME: '',
					QUANTITY: '',
					QUALIFICATION: '',
					FIELD: '',
					CHILD_FIELD: '',
					DOCLINKS_NUM: '',
					DEPT: '',
					ENTERBY:'',
					ENTERDATE: '',
					CHANGEBY: '',
					CHANGEDATE:'',	
				};
				if (this.$refs['testing_projectForm']!==undefined) {
     				this.$refs['testing_projectForm'].resetFields();	
 				}
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
				}else if(item.name=="导出"){
				 this.exportData();
				}else if(item.name=="删除"){
		    	 this.deluserinfo();
		    	}else if(item.name=="物理删除"){
		    	 this.physicsDel();
		    	}else if(item.name=="报表"){
			     this.reportdata();
				}else if(item.name=="打印"){
				 this.Printing();
				}
		    },
			//添加检验/检测项目
			openAddMgr() {
				this.reset();
				this.$refs.child.open();
				this.$refs.child.visible();
			},
			//修改检验/检测项目
			modify() {
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
					console.log('===='+this.selMenu[0].ID);
					this.testing_projectForm = this.selMenu[0]; 
					this.$refs.child.detail(this.selMenu[0].ID); 
				}
			},
			//查看
			 view(dataid) {
			 	// this.testing_projectForm = data; 
				this.$refs.child.view(dataid);
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
					var url = this.basic_url + '/api-apps/app/inspectionPro/deletes';
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
					var url = this.basic_url + '/api-apps/app/inspectionPro/deletes/physicsDel';
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
			uploadUrl(){
                var url = this.basic_url +'/api-apps/app/productType/importExc?access_token='+sessionStorage.getItem('access_token');
                return url;
            },
          	
			// 导入
			download() {
				var url = this.basic_url + '/api-apps/app/productType/importExcTemplete?access_token='+sessionStorage.getItem('access_token');
				var xhr = new XMLHttpRequest();
					xhr.open('POST', url, true);
					xhr.responseType = "blob";
					xhr.setRequestHeader("client_type", "DESKTOP_WEB");
					xhr.onload = function() {
						if (this.status == 200) {
							var blob = this.response;
							var objecturl = URL.createObjectURL(blob);
							window.location.href = objecturl;
						}
					}
					xhr.send();
			},
			// 导出
			exportData() {
           		var url = this.basic_url + '/api-apps/app/inspectionPro/exportExc?access_token='+sessionStorage.getItem('access_token');
          		 var xhr = new XMLHttpRequest();
            	xhr.open('POST', url, true);
            	xhr.responseType = "blob";
            	xhr.setRequestHeader("client_type", "DESKTOP_WEB");
            	xhr.onload = function() {
                	if (this.status == 200) {
						var filename = "inspectionPro.xls";
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
				this.reportData.app=this.inspectionPro;
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
			
			SelChange(val) {
				this.selMenu = val;
			},
			requestData(index) {
				this.loading = true;//加载动画打开
				var data = {//高级查询数据显示
					page: this.page.currentPage,
					limit: this.page.pageSize,
					P_NUM: this.searchList.P_NUM,
					P_NAME: this.searchList.P_NAME,
					VERSION: this.searchList.VERSION,
					DEPTID: this.searchList.DEPTID,
					// STATUS: this.searchList.STATUS,
				}
				var url = this.basic_url + '/api-apps/app/inspectionPro';
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
					this.projectList = res.data.data;
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
				this.$refs.navsheader.showClick(childValue);
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
					// console.log(res);
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
			this.getCompany();
		},
	}
</script>

<style scoped>

</style>