<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_tabs ref="navsTabs"></navs_tabs>
		</div>
		<div class="contentbg">
			<!--左侧菜单内容显示 Begin-->
			<div style="display:none;">
				<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
			</div>
			<!--左侧菜单内容显示 End-->

			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content wrapperall">
				<div class="ibox-content">
					<!--按钮操作行 Begin-->
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button v-for="item in buttons" :key='item.id' :class="'btn mr5 '+ item.style" @click="getbtn(item)">
									<i :class="item.icon"></i>{{item.name}}
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
						<el-form :model="searchList">
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="工作任务通知书编号" prop="N_CODE" label-width="140px">
										<el-input v-model="searchList.N_CODE"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="受检产品名称" prop="ITEM_NAME" label-width="110px">
										<el-input v-model="searchList.ITEM_NAME"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="承检单位" prop="CJDW" label-width="75px">
										<el-select clearable v-model="searchList.CJDW" filterable allow-create default-first-option placeholder="请选择">
											<el-option v-for="(data,index) in selectDept" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="类型" prop="TYPE" label-width="45px">
										<el-select clearable v-model="searchList.TYPE" placeholder="请选择类别" style="width: 100%;">
											<el-option v-for="(data,index) in selectData" :key="index" :value="data.code" :label="data.name"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="下达日期" prop="XD_DATE" label-width="140px">
										<el-date-picker v-model="searchList.XD_DATE" type="date" placeholder="下达日期" value-format="yyyy-MM-dd" style="width: 100%">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="完成日期" prop="COMPDATE" label-width="110px">
										<el-date-picker v-model="searchList.COMPDATE" type="date" placeholder="完成日期" value-format="yyyy-MM-dd" style="width: 100%">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<!-- <el-col :span="3" class="pt5">
									<el-select v-model="searchList.value" placeholder="请选择信息状态">
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
					<el-row class="relative" id="pageDiv">
						<el-col :span="5" class="lefttree" id="left">
							<div class="lefttreebg">
								<div class="left_tree_title clearfix" @click="min3max()">
									<div class="pull-left pr20" v-if="ismin">类型</div>
									<span class="pull-right navbar-minimalize minimalize-styl-2">
										<i class="icon-doubleok icon-double-angle-left blue"></i>
									</span>
								</div>
								<div class="left_treebg" :style="{height: fullHeight}">
									<div class="p15" v-if="ismin">
										<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all :indent="22" :render-content="renderContent" :props="resourceProps" @node-click="handleNodeClick">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
						<div id="middle"></div>
						<el-col :span="19" id="right">
							<!-- 表格 Begin-->
							<el-table ref="table" :data="nitificationsList" 
									  :header-cell-style="rowClass" 
									  border 
									  stripe 
									  :height="fullHeight" 
									  style="width: 100%;" 
									  :default-sort="{prop:'nitificationsList', order: 'descending'}" 
									  @selection-change="SelChange" 
									  v-loadmore="loadMore"
									  v-loading="loading"  
									  element-loading-text="加载中…"
    								  element-loading-spinner="el-icon-loading"
    								  element-loading-background="rgba(255, 255, 255, 0.9)">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="工作任务通知书编号" width="180" sortable prop="N_CODE" v-if="this.checkedName.indexOf('工作任务通知书编号')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row.ID)>{{scope.row.N_CODE}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="类型" width="140" sortable prop="TYPEDesc" v-if="this.checkedName.indexOf('类型')!=-1">
								</el-table-column>
								<el-table-column label="下达日期" width="130" sortable prop="XD_DATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('下达日期')!=-1">
								</el-table-column>
								<el-table-column label="任务号" width="120" prop="TASKNUM" sortable v-if="this.checkedName.indexOf('任务号')!=-1">
								</el-table-column>
								<el-table-column label="受检产品名称" width="150" sortable prop="ITEM_NAME" v-if="this.checkedName.indexOf('受检产品名称')!=-1">
								</el-table-column>
								<el-table-column label="受检产品型号" width="120" sortable prop="ITEM_MODEL" v-if="this.checkedName.indexOf('受检产品型号')!=-1">
								</el-table-column>
								<el-table-column label="受检企业" width="150" sortable prop="V_NAME" v-if="this.checkedName.indexOf('受检企业')!=-1">
								</el-table-column>
								<el-table-column label="承检单位" width="150" sortable prop="CJDWDesc" v-if="this.checkedName.indexOf('承检单位')!=-1">
								</el-table-column>
								<el-table-column label="抽样方案" width="120" prop="SOLUTION" sortable v-if="this.checkedName.indexOf('抽样方案')!=-1">
								</el-table-column>
								<el-table-column label="完成日期" width="130" prop="COMPDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('完成日期')!=-1">
								</el-table-column>
								<el-table-column label="状态" width="130" prop="STATEDesc" sortable v-if="this.checkedName.indexOf('状态')!=-1">
								</el-table-column>
								<!-- <el-table-column label="信息状态" width="120" prop="STATUS" sortable v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column> -->
								<!--<el-table-column label="录入人" width="120" prop="ENTERBY" sortable v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column>-->
								<!--<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>-->
							</el-table>
							<el-pagination background class="text-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 End-->
						</el-col>
					</el-row>
				</div>
			</div>
			<!--右侧内容显示 End-->
			<notificationsmask @request="requestData" ref="child" v-bind:page=page></notificationsmask>
			<!--报表-->
			<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
		</div>
	</div>
</template>
<script>
	import Config from '../config.js'
	import vheader from './common/vheader.vue'
	import navs_tabs from './common/nav_tabs.vue'
	import navs_left from './common/left_navs/nav_left5.vue'
	import tableControle from './plugin/table-controle/controle.vue'
	import notificationsmask from './common/notification_mask.vue'
	import reportmask from'./reportDetails/reportMask.vue'

	export default {
		name: 'notifications',
		components: {
			vheader,
			navs_tabs,
			navs_left,
			tableControle,
			notificationsmask,
			reportmask
		},
		data() {
			return {
				reportData:{},//报表的数据
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				basic_url: Config.dev_url,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				value: '',
				options: [{
					value: '选项1',
					label: '活动'
				}, {
					value: '选项2',
					label: '不活动'
				}],
				commentArr: {},
				selectData: [], //获取检验/检测方法类别
				workNot:'workNot',//appname
				checkedName: [
					'工作任务通知书编号',
					'类型',
					'下达日期',
					'受检产品名称',
					'受检产品型号',
					'受检企业',
					'承检单位',
					'任务号',
					'抽样方案',
					'完成日期',
					'状态',
					// '信息状态',
					//					'录入人',
					//					'录入时间'
				],
				tableHeader: [{
						label: '工作任务通知书编号',
						prop: 'N_CODE'
					},
					{
						label: '类型',
						prop: 'TYPE'
					},
					{
						label: '下达日期',
						prop: 'XD_DATE'
					},
					{
						label: '受检产品名称',
						prop: 'ITEM_NAME'
					},
					{
						label: '受检产品型号',
						prop: 'ITEM_MODEL'
					},
					{
						label: '受检企业',
						prop: 'V_NAME'
					},
					{
						label: '承检单位',
						prop: 'CJDWDesc'
					},
					{
						label: '任务号',
						prop: 'TASKNUM'
					},
					{
						label: '抽样方案',
						prop: 'SOLUTION'
					},
					{
						label: '完成日期',
						prop: 'COMPDATE'
					},
					{
						label: '状态',
						prop: 'STATEDesc'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// },
					//					{
					//						label: '录入人',
					//						prop: 'ENTERBY'
					//					},
					//					{
					//						label: '录入时间',
					//						prop: 'ENTERDATE'
					//					}
				],

				selUser: [],
				nitificationsList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin: true,
				searchList: { //点击高级搜索后显示的内容
					N_CODE: '',
					ITEM_NAME: '',
					CJDW: '',
					TYPE: '',
					XD_DATE: '',
					COMPDATE: '',
					STATUS: ''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "name"
				},
				page: { //分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				treeData: [],
				selectDept: [],
				buttons:[],
			}
		},

		methods: {
			//检验/检测方法类别
			getType() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=type';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},
			//表头居中
			rowClass({
				row,
				rowIndex
			}) {
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
					this.selectDept = res.data;
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
			tableControle(data) {
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
					N_CODE: '',
					ITEM_NAME: '',
					CJDW: '',
					TYPE: '',
					XD_DATE: '',
					COMPDATE: '',
					STATUS: ''
				};
				this.requestData();
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
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
		    	}else if(item.name=="导出"){
		    	 this.exportData();
		    	}else if(item.name=="删除"){
		    	 this.delinfo();
		    	}else if(item.name=="导入"){
		    	 this.importData();
		    	}else if(item.name=="报表"){
			     this.reportdata();
				}else if(item.name=="发布"){
				 this.releasebtn();
				}
		    },
			//添加用戶
			openAddMgr() {
				this.$refs.child.visible();
				this.$refs.child.open();
			},
			//修改用戶
			modify() {
				// console.log(this.selUser);
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
					if(this.selUser[0].STATE == 3 || this.selUser[0].STATE == 2) {
						this.$message({
							message: '已启动的流程，不允许修改数据，只可以查看。',
							type: 'warning'
						});
						this.$refs.child.view(this.selUser[0].ID);
					}
					//驳回
					else if(this.selUser[0].STATE == 0) {
						var url = this.basic_url + '/api-apps/app/workNot/flow/isExecute/' + this.selUser[0].ID;
						this.$axios.get(url, {}).then((res) => {
							// console.log(res);
							if(res.data.resp_code == 0) {
								var url = this.basic_url + '/api-apps/app/workNot/flow/isPromoterNode/' + this.selUser[0].ID;
								this.$axios.get(url, {}).then((res) => {
									// console.log(res);
									if(res.data.resp_code == 0) {
										this.$refs.child.detail(this.selUser[0].ID);
									} else {
										this.$message({
											message: res.data.resp_msg,
											type: 'warning'
										});
									}
								});
							} else {
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
									});
							}
						});
					}else{
						this.$refs.child.detail(this.selUser[0].ID);	
					}
				}
			},
			//查看
			view(id) {
				// console.log(id);
				this.$refs.child.view(id);
			},
			//代办跳转
			getRouterData() {
				// 只是改了query，其他都不变
				this.id = this.$route.query.bizId;
				this.$refs.child.view(this.id);
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
					this.up = !this.up
			},
			// 删除
			delinfo() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/workNot/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						if(changeUser[i].STATE!=1){
						 	this.$message({
								message: '您的数据中有已启动的流程，所以不能删除',
								type: 'error'
							});
							return;
						}else{
						deleteid.push(changeUser[i].ID);
						}
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
					var url = this.basic_url + '/api-apps/app/workNot/physicsDel';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						if(changeUser[i].STATE!=1){
						 	this.$message({
								message: '您的数据中有已启动的流程，所以能删除',
								type: 'error'
							});
							return;
						}else{
						deleteid.push(changeUser[i].ID);
						}
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
		    //报表
			reportdata(){
				this.reportData.app=this.workNot;
				this.$refs.reportChild.visible();
			},
			// 打印
			Printing() {

			},
			judge(data) {
				//taxStatus 布尔值
				return data.STATUS == "1" ? '活动' : '不活动'
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
			requestData() {
				this.loading = true;//加载动画打开
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					N_CODE: this.searchList.N_CODE,
					ITEM_NAME: this.searchList.ITEM_NAME,
					CJDW: this.searchList.CJDW,
					TYPE_wheres: this.searchList.TYPE,//精确查询类别
					XD_DATE: this.searchList.XD_DATE,
					COMPDATE: this.searchList.COMPDATE,
					STATUS: this.searchList.STATUS,
				}
				var url = this.basic_url + '/api-apps/app/workNot';
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
					this.nitificationsList = res.data.data;
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

			// 机构树
			getKey() {
				var url = this.basic_url + '/api-user/users/findIdsByUserAndType/2';
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.resourceData = res.data;
					this.treeData = this.transformTree(this.resourceData);
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},

			transformTree(data) {
				for(var i = 0; i < data.length; i++) {
					data[i].name = data[i].name;
					if(!data[i].pid || $.isArray(data[i].subDepts)) {
						data[i].iconClass = 'icon-file-normal';
					} else {
						data[i].iconClass = 'icon-file-text';
					}
					if($.isArray(data[i].subDepts)) {
						data[i].children = this.transformTree(data[i].subDepts);
					}
				}
				return data;
			},
			handleNodeClick(data) {
				for(var i = 0; i < this.selectData.length; i++) {
					if(data.label == this.selectData[i].name) {
						this.searchList.TYPE = this.selectData[i].code;
						// console.log(this.selectData[i].code);
						// console.log(this.searchList.TYPE);
					}
				}
				this.requestData();
			},
			//			树节点的内容区的渲染 Function
			renderContent(h, {
				node,
				data,
				store
			}) { //自定义Element树菜单显示图标
				return(
					<span>
              			<i class={data.iconClass}></i>
              			<span>{node.label}</span>
           			</span>
				);
			},
			// 点击节点
			nodeClick: function(m) {
				if(m.iconClass != 'icon-file-text') {
					if(m.iconClass == 'icon-file-normal') {
						m.iconClass = 'icon-file-open';
					} else {
						m.iconClass = 'icon-file-normal';
					}
				}
				this.handleNodeClick();
			},
			expandClick: function(m) {
				if(m.iconClass != 'icon-file-text') {
					if(m.iconClass == 'icon-file-normal') {
						m.iconClass = 'icon-file-open';
					} else {
						m.iconClass = 'icon-file-normal';
					}
				}
				m.isFolder = !m.isFolder;
			},
			min3max() { //左侧菜单正常和变小切换
				if($(".lefttree").hasClass("el-col-5")) {
					$(".lefttree").removeClass("el-col-5");
					$(".lefttree").addClass("el-col-1");
					$(".leftcont").removeClass("el-col-19");
					$(".leftcont").addClass("el-col-23");
					$(".icon-doubleok").removeClass("icon-double-angle-left");
					$(".icon-doubleok").addClass("icon-double-angle-right");
				} else {
					$(".lefttree").removeClass("el-col-1");
					$(".lefttree").addClass("el-col-5");
					$(".leftcont").removeClass("el-col-23");
					$(".leftcont").addClass("el-col-19");
					$(".icon-doubleok").removeClass("icon-double-angle-right");
					$(".icon-doubleok").addClass("icon-double-angle-left");
				}
				this.ismin = !this.ismin;
			},
			getTreeId(data) {
				if(data.type == '1') {
					this.companyId = data.id;
					this.deptId = '';
				} else {
					this.deptId = data.id;
					this.companyId = '';
				}
				this.requestData();
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
		    //树和表单之间拖拽改变宽度
			treeDrag(){
				var middleWidth=9,
				left = document.getElementById("left"),
				right =  document.getElementById("right"), 
				middle =  document.getElementById("middle"); 
				middle.style.left = left.clientWidth + 'px';
				right.style.left = left.clientWidth + 10 + 'px';
				middle.onmousedown = function(e) { 
					var disX = (e || event).clientX; 
					middle.left = middle.offsetLeft; 
					document.onmousemove = function(e) { 
						var iT = middle.left + ((e || event).clientX - disX); 
						var e=e||window.event,tarnameb=e.target||e.srcElement; 
						var maxT=document.body.clientWidth; 
						iT < 0 && (iT = 0); 
						iT > maxT/2 && (iT = maxT/2); 
						middle.style.left = left.style.width = iT + "px"; 
						right.style.width = maxT - iT -middleWidth -10 + "px"; 
						right.style.left = iT+middleWidth+"px"; 
						return false 
					}; 
					document.onmouseup = function() { 
						document.onmousemove = null; 
						document.onmouseup = null; 
						middle.releaseCapture && middle.releaseCapture() 
					}; 
					middle.setCapture && middle.setCapture(); 
					return false 
				}; 
			}
		},
		beforeMount() {
			// 在页面挂载前就发起请求
			this.requestData();
			this.getKey();
			this.getType();
			this.getCompany();
		},
		mounted() {
			this.treeDrag();//调用树和表单之间拖拽改变宽度
			console.log(this.$route.query.bizId);
			if(this.$route.query.bizId != undefined) {
				this.getRouterData();
			}
		},
	}
</script>

<style scoped>
	
</style>