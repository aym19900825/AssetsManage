<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header ref="navsheader"></navs_header>
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
							<el-dropdown size="small" split-button type="primary" style="margin-top:1px;">
    								导入
								<el-dropdown-menu slot="dropdown">
    								<el-dropdown-item>
    									<div @click="download">下载模版</div>
    								</el-dropdown-item>
    								
    								<el-dropdown-item>
									<el-upload
							          ref="upload"
							          class="upload"
							          :action="uploadUrl()"
							          :on-success="handleSuccess"
							          :limit=1
							          multiple
							          method:="post"
									  :file-list="fileList">
									          <div>上传</div>
									</el-upload>
    								</el-dropdown-item>
						  		</el-dropdown-menu>
							</el-dropdown>
					
							<button type="button" class="btn btn-primarys button-margin" @click="exportData">
							    <i class="icon-download-cloud"></i>导出
							</button>
							<button type="button" class="btn btn-primarys button-margin" @click="Printing">
							    <i class="icon-print"></i>打印
							</button>
							<button type="button" class="btn btn-primarys button-margin" @click="reportdata">
							    <i class="icon-clipboard"></i>报表
							</button>
							<button type="button" class="btn btn-primarys button-margin" @click="Configuration">
							    <i class="icon-cpu"></i>配置关系
							</button>
								<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
					    		<i class="icon-search"></i>高级查询
					    		<i class="icon-arrow1-down" v-show="down"></i>
					    		<i class="icon-arrow1-up" v-show="up"></i>
							</button>
							</div>
						</div>
						<div class="columns columns-right btn-group pull-right">
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh">
								<i class="icon-refresh"></i>
							</div>
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName" @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!--按钮操作行 End-->

					<!-- 高级查询划出 Begin-->
					<div v-show="search">
						<el-form :model="searchList" label-width="45px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="编码" prop="NUM">
										<el-input v-model="searchList.NUM"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="名称" prop="TYPE">
										<el-input v-model="searchList.TYPE"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="版本" prop="VERSION">
										<el-input v-model="searchList.VERSION"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="机构" prop="DEPTID">
										<el-select clearable v-model="searchList.DEPTID" filterable allow-create default-first-option placeholder="请选择">
										    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
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

							<el-table :header-cell-style="rowClass" :data="categoryList" v-loading="loading"  element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'categoryList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" fixed width="55" v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="编码" width="155" sortable prop="NUM" v-if="this.checkedName.indexOf('编码')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.NUM}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="名称" sortable prop="TYPE" v-if="this.checkedName.indexOf('名称')!=-1">
								</el-table-column>
								<!--<el-table-column label="信息状态" width="155" sortable v-if="this.checkedName.indexOf('信息状态')!=-1">
 								<template slot-scope="scope" >
 									<span v-text="scope.row.STATUS=='1'?'活动':'不活动'"></span>
 								</template>
							</el-table-column>-->
								<el-table-column label="版本" width="100" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1" align="right">
								</el-table-column>
								<el-table-column label="机构" width="185" sortable prop="DEPTIDDesc" v-if="this.checkedName.indexOf('机构')!=-1">
								</el-table-column>
								<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<el-table-column label="修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
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
			<categorymask :CATEGORY="CATEGORY" ref="categorymask" @request="requestData" @reset="reset" v-bind:page=page></categorymask>
			<!--报表-->
			<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_header from '../common/nav_tabs.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import categorymask from '../maindataDetails/product_categoryMask.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import reportmask from'../reportDetails/reportMask.vue'
	export default {
		name: 'customer_management',
		components: {
			vheader,
			navs_left,
			navs_header,
			categorymask,
			tableControle,
			reportmask,
		},
		data() {
			return {
				reportData:{},//报表的数据
				scroll_old:0,
				// up2down:'down',
				reportData:{},//报表的数据
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				commentArr: {},
				loading: false,//默认加载数据时显示loading动画
				fileList:[],
				value: '',
				productType:'productType',//appname
				searchData: {
					page: 1,
					limit: 20, //分页显示数
					nickname: '',
					enabled: '',
					searchKey: '',
					searchValue: '',
					companyId: '',
					deptId: ''
				},
				checkedName: [
					'编码',
					'名称',
					'版本',
					'机构',
					// '信息状态',
					'录入时间',
					'修改时间'
				],
				tableHeader: [{
						label: '编码',
						prop: 'NUM'
					},
					{
						label: '名称',
						prop: 'TYPE'
					},
					{
						label: '版本',
						prop: 'VERSION'
					},
					{
						label: '机构',
						prop: 'DEPARTMENTDesc'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// },
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
						label: '修改时间',
						prop: 'CHANGEDATE'
					}
				],
				selUser: [],
				categoryList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					NUM:'',
					TYPE: '',
					VERSION:'',
					DEPTID: '',
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
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
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
						if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
							$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
							sessionStorage.setItem('toBtm','true');
						}
					}else{
						sessionStorage.setItem('toBtm','false');
						this.page.currentPage--;
						if($('.el-table__body-wrapper table').find('.filing').length>0){
							$('.el-table__body-wrapper table').find('.filing').remove();
						}
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
			},
			tableControle(data) {
				this.checkedName = data;
			},
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
			//重置
			resetbtn(){
				this.searchList = {
					NUM:'',
					TYPE: '',
					VERSION:'',
					DEPTID: '',
				};
				this.requestData();
			},
			//搜索
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			//清空
			reset() {
				this.CATEGORY = {
					ID: '',
					NUM: '',
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
			//添加类别
			openAddMgr() {
				this.reset();
				this.$refs.categorymask.open(); // 方法1
				this.$refs.categorymask.visible();
				
			},
			//修改类别
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
					this.CATEGORY = this.selUser[0];
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
					var url = this.basic_url + '/api-apps/app/productType/deletes';
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
			//物理删除
			physicsDel(){
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/productType/physicsDel';
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
			handleSuccess(response, file, fileList){
				console.log(response);
				console.log(file);
				console.log(fileList);
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
           		var url = this.basic_url + '/api-apps/app/productType/exportExc?access_token='+sessionStorage.getItem('access_token');
          		 var xhr = new XMLHttpRequest();
            	xhr.open('POST', url, true);
            	xhr.responseType = "blob";
            	xhr.setRequestHeader("client_type", "DESKTOP_WEB");
            	xhr.onload = function() {
                	if (this.status == 200) {
						var filename = "productType.xls";
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
			// 配置关系
			Configuration() {
				this.$router.push({
					path: '/inspection_project'
				});
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
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				this.loading = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					NUM:this.searchList.NUM,
					TYPE: this.searchList.TYPE,
					VERSION:this.searchList.VERSION,
					DEPTID: this.searchList.DEPTID,
				}
				var url = this.basic_url + '/api-apps/app/productType';
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
					this.categoryList = res.data.data;
					this.loading = false;
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试1',
						type: 'error'
					});
				})
			},
			handleNodeClick(data) {},
			formatter(row, column) {
				return row.enabled;
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
      		}
		},
		mounted() {
			this.requestData();
			this.getCompany();			
//			const selectWrap = document.querySelector('.el-table__body-wrapper')
//			var that=this
//			selectWrap.addEventListener('scroll', function(e){
//				//	console.log(e);
//				console.log(this.scrollHeight);// 滚动区域
//				console.log(this.scrollTop);// div 到头部的距离
//				console.log(this.clientHeight);//屏幕高度
//				let scrollHeight = this.scrollHeight.scrollHeight; // 滚动条的总高度
//				console.log(document.documentElement.clientHeight);// 滚动条的总高度
//			    var scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
//			    let sign = 1;
//				console.log(scrollDistance);
//		      	if(scrollDistance <= sign){
//		      		that.loadMore('down')
//		      		this.scrollTop = 2;
//		      	}else if(this.scrollTop < 1){
//		      		that.loadMore('up')
//		      		this.scrollTop = 2
//		      	}else{
//		      		return false;
//		      	}
//
//			}, true);
			
		 	
		}
	}
</script>

<style scoped>

</style>