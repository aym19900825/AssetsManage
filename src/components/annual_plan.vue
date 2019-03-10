<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_tabs ref="navsTabs"></navs_tabs>
		</div>
		<div class="contentbg">
			<!--左侧菜单调用 Begin-->
			<div style="display:none;">
				<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
			</div>
			<!--左侧菜单调用 End-->
			<div class="wrapper wrapper-content wrapperall">
				<div class="ibox-content">
					<!--<navs_button></navs_button>-->
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
							<div class="keep-open btn-group" title="列">
								<el-dropdown :hide-on-click="false" class="pl10 btn btn-default btn-outline">
									<span class="el-dropdown-link">
										<font class="J_tabClose"><i class="icon-menu3"></i></font>
										<i class="el-icon-arrow-down icon-arrow2-down"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-checkbox-group v-model="checkedName" @change="test">
											<el-dropdown-item  v-for="(item,index) in tableHeader" :key="index">
												<el-checkbox :label="item.label" name="type"></el-checkbox>
											</el-dropdown-item>
										</el-checkbox-group>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
					<!-- 高级查询划出 Begin-->
					<div v-show="search">
						<el-form :model="searchList" label-width="70px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="编号" prop="WP_NUM">
										<el-input v-model="searchList.WP_NUM"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="描述" prop="DESCRIPTION">
										<el-input v-model="searchList.DESCRIPTION"></el-input>
									</el-form-item>
								</el-col>
								
								<el-col :span="5">
									<el-form-item label="年度" prop="YEAR" label-width="45px">
										<el-input v-model="searchList.YEAR"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="录入时间" prop="ENTERDATE">
										<div class="block">
											<el-date-picker
											v-model="searchList.ENTERDATE"
											type="date"
											placeholder="录入时间" style="width: 100%"   value-format="yyyy-MM-dd">
											</el-date-picker>
										</div>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="编辑状态" prop="STATUS">
										<el-select v-model="searchList.STATUS" placeholder="请选择" style="width: 100%" clearable>
											<el-option label="草稿" value="1"></el-option>
											<el-option label="审批中" value="2"></el-option>
											<el-option label="驳回" value="0"></el-option>
											<el-option label="已发布" value="3"></el-option>
											<el-option label="已取消" value="4"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="执行状态" prop="LEADER_STATUS">
										<el-select v-model="searchList.LEADER_STATUS" placeholder="请选择" style="width: 100%" clearable>
											<el-option label="未开始" value="1"></el-option>
											<el-option label="进行中" value="2"></el-option>
											<el-option label="已完成" value="3"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="类型" prop="TYPE" label-width="45px">
										<el-select clearable v-model="searchList.TYPE" filterable allow-create default-first-option placeholder="请选择" style="width:100%">
											<el-option label="监督抽查" value="1"></el-option>
											<el-option label="质量抽查" value="3"></el-option>
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
										<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all :indent="22" :render-content="renderContent"  :props="resourceProps" @node-click="handleNodeClick">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
						<div id="middle"></div>
						<el-col :span="19" class="leftcont" id="right">
							<!-- 表格 -->
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
								<el-table-column label="编号" sortable width="100px" prop="WP_NUM" v-if="this.checkedName.indexOf('编号')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row.ID)>{{scope.row.WP_NUM}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="描述" sortable width="200px" prop="DESCRIPTION" v-if="this.checkedName.indexOf('描述')!=-1">
								</el-table-column>
								<el-table-column label="年度" sortable width="80px" prop="YEAR" v-if="this.checkedName.indexOf('年度')!=-1">
								</el-table-column>
								<el-table-column label="类型" sortable  width="100px" prop="TYPE" v-if="this.checkedName.indexOf('类型')!=-1">
								</el-table-column>
								<el-table-column label="产品类别" sortable width="200px" prop="ITEMTYPE" v-if="this.checkedName.indexOf('产品类别')!=-1">
								</el-table-column>
								<el-table-column label="提出单位" sortable width="120px" prop="PROP_UNITDesc" v-if="this.checkedName.indexOf('提出单位')!=-1">
								</el-table-column>
								<el-table-column label="提报日期" sortable width="160px" prop="REPORTDATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('提报日期')!=-1">
								</el-table-column>
								<el-table-column label="编辑状态" sortable width="100px" prop="STATUSDesc" v-if="this.checkedName.indexOf('编辑状态')!=-1">
								</el-table-column>
								<el-table-column label="执行状态" sortable  width="120px" prop="LEADER_STATUSDesc" v-if="this.checkedName.indexOf('执行状态')!=-1">
								</el-table-column>
								<el-table-column label="录入时间" sortable width="160px" prop="ENTERDATE" v-if="this.checkedName.indexOf('录入时间')!=-1" :formatter="dateFormat">
								</el-table-column>
								<el-table-column label="修改时间" sortable width="160px" prop="ENTERDATE" v-if="this.checkedName.indexOf('修改时间')!=-1" :formatter="dateFormat">
								</el-table-column>
								<!-- <el-table-column label="信息状态" sortable  width="380px" prop="STATUS" v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column> -->
							</el-table>
							<el-pagination background class="text-right pt10" v-if="this.checkedName.length>0"
					            @size-change="sizeChange"
					            @current-change="currentChange"
					            :current-page="page.currentPage"
					            :page-sizes="[10, 20, 30, 40,100]"
					            :page-size="page.pageSize"
					            layout="total, sizes, prev, pager, next" :total="page.totalCount">
					        </el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
			<annualmask ref="child" @request="requestData" v-bind:page=page></annualmask>
			<!--报表-->
			<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
	</div>
</template>
<script>
	import Config from '../config.js'
	import vheader from './common/vheader.vue'
	import navs_left from './common/left_navs/nav_left5.vue'
	import navs_tabs from './common/nav_tabs.vue'
	import annualmask from './common/annual_mask.vue'
	import assetsTree from './plugin/vue-tree/tree.vue'
	import reportmask from'./reportDetails/reportMask.vue'
	export default {
		name: 'annual_plan',
		components: {
			'vheader': vheader,
			'navs_tabs': navs_tabs,
			'navs_left': navs_left,
			'v-assetsTree': assetsTree,
			'annualmask': annualmask,
			reportmask
		},
		data() {
			return {
				reportData:{},//报表的数据
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				basic_url: Config.dev_url,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				checkedName: [
					'编号',
					'描述',
					'年度',
					'类型',
					'产品类别',
					'提出单位',
					'提报日期',
					'编辑状态',
					'执行状态',
					'执行状态',
					'录入时间',
					// '信息状态'
					'修改时间',
				],
				tableHeader: [
					{
						label: '编号',
						prop: 'WP_NUM'
					},
					{
						label: '描述',
						prop: 'DESCRIPTION'
					},
					{
						label: '年度',
						prop: 'YEAR'
					},
					{
						label: '类型',
						prop: 'TYPE'
					},
					{
						label: '产品类别',
						prop: 'ITEMTYPE'
					},
					{
						label: '提出单位',
						prop: 'PROP_UNITEDesc'
					},
					{
						label: '提报日期',
						prop: 'REPORTDATE'
					},
					{
						label: '执行状态',
						prop: 'LEADER_STATUSDesc'
					},
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
					label: '修改时间',
						prop: 'CHANGEDATE'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// }
				],
				companyId: '',
				deptId: '',
				selUser: [],
				userList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				searchList: {
					WP_NUM: '',
					DESCRIPTION: '',
					TYPE: '',
					YEAR: '',
					ENTERDATE:'',
					ENTERBY:'',
					STATUS:'',
					LEADER_STATUS:''
				},
				workplan:'workplan',//appname
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					label: "name"
				},
				treeData: [],
				userData:[],
				page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				buttons:[],
			}
		},
	methods: {
		//表头居中
		rowClass({ row, rowIndex}) {
		    return 'text-align:center'
		},
		renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
			return(<span><i class={data.iconClass}></i><span>{node.label}</span></span>);
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
			test(){
				console.log(this.checkedName.indexOf('账号')!=-1);
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
			searchinfo(index) {//高级查询
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
		    resetbtn(){
				this.searchList =  { //点击高级搜索后显示的内容
					WP_NUM: '',
					DESCRIPTION: '',
					TYPE: '',
					YEAR: '',
					ENTERDATE:'',
					ENTERBY:'',
					STATUS:'',
					LEADER_STATUS:''
				};
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
		    	 this.deluserinfo();
		    	}else if(item.name=="取消"){
		    	 this.cancelbtn();
		    	}else if(item.name=="报表"){
			     this.reportdata();
				}else if(item.name=="发布"){
				 this.releasebtn();
				}
		    },
			//添加
			openAddMgr() {
				// this.$refs.child.resetNew();
				this.$refs.child.visible();
			},
			//修改
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
					this.$refs.child.detail(this.selUser[0].ID);
				}
			},
			//查看
			view(id) {
				this.$refs.child.view(id);
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
					var url = this.basic_url + '/api-apps/app/workplan/deletes';
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
                        this.$axios.delete(url, {params: data}).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '删除成功',
									type: 'success'
								});
								this.requestData();
							}else{
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
								});
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
			// 物理删除
			physicsDel() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/workplan/physicsDel';
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
                        this.$axios.delete(url, {params: data}).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '删除成功',
									type: 'success'
								});
								this.requestData();
							}else{
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
								});
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
			// 导出
			exportData() {
           		var url = this.basic_url + '/api-apps/app/workplan/exportExc?access_token='+sessionStorage.getItem('access_token');
          		 var xhr = new XMLHttpRequest();
            	xhr.open('POST', url, true);
            	xhr.responseType = "blob";
            	xhr.setRequestHeader("client_type", "DESKTOP_WEB");
            	xhr.onload = function() {
                	if (this.status == 200) {
						var filename = "workplan.xls";
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
			//报表
			reportdata(){
				this.reportData.app=this.workplan;
				this.$refs.reportChild.visible();
			},
			//发布
			releasebtn(){
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要发布的数据',
						type: 'warning'
					});
					return;
				} else {
					//changeUser为勾选的数据
					var changeUser = selData;
					//releaseid为id的数组
					var releaseid = [];
					var ids;
					for (var i = 0; i < changeUser.length; i++) {
						releaseid.push(changeUser[i].ID);
					}
					//ids为deleteid数组用逗号拼接的字符串
					ids = releaseid.toString(',');
                    // var data = {
					// 	ids: ids,
					// }
					var url = this.basic_url + '/api-apps/app/workplan/operate/release?ids='+ids;
					
					this.$confirm('确定发布此数据吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        this.$axios.get(url, {}).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '发布成功',
									type: 'success'
								});
								this.requestData();
							}else{
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
								});
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
			//取消
			cancelbtn(){
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要取消的数据',
						type: 'warning'
					});
					return;
				} else {
					//changeUser为勾选的数据
					var changeUser = selData;
					//cancelid为id的数组
					var cancelid = [];
					var ids;
					for (var i = 0; i < changeUser.length; i++) {
						cancelid.push(changeUser[i].ID);
					}
					//ids为cancelid数组用逗号拼接的字符串
					ids = cancelid.toString(',');
                    // var data = {
					// 	ids: ids,
					// }
					var url = this.basic_url + '/api-apps/app/workplan/operate/cancel?ids='+ids;
					
					this.$confirm('确定发布此数据吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        this.$axios.get(url, {}).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '取消成功',
									type: 'success'
								});
								this.requestData();
							}else{
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
								});
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
				// return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");  
			},
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				this.loading = true;//加载动画打开
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					WP_NUM: this.searchList.WP_NUM,
					DESCRIPTION: this.searchList.DESCRIPTION,
					TYPE: this.searchList.TYPE,
					YEAR: this.searchList.YEAR,
					ENTERDATE:this.searchList.ENTERDATE,
					ENTERBY:this.searchList.ENTERBY,
					STATUS:this.searchList.STATUS,
					LEADER_STATUS:this.searchList.LEADER_STATUS,
				}
				var url = this.basic_url + '/api-apps/app/workplan';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;//页码赋值
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize);
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false;
					} else {
						this.loadSign = true;
					}
					var list = res.data.data || [];
					for(var i=0;i<list.length;i++){
						if(list[i].TYPE  == '1'){
							list[i].TYPE  = '监督抽查';
						}else if(list[i].TYPE  == '3'){
							list[i].TYPE  = '质量抽查';
						}
					}
					this.userList = list;
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
			//树
			getKey() {
				var url = this.basic_url + '/api-user/users/findIdsByUserAndType/1';
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
			transformTree(data){
				for(var i=0; i<data.length; i++){
					data[i].name = data[i].name;
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
			getTreeId(data){
				if(data.type == '1'){
					this.companyId = data.id;
					this.deptId = '';
				}else{
					this.deptId = data.id;
					this.companyId = '';
				}
				this.requestData();
			},
			handleNodeClick(data) {
				if(data.label == '监督抽查'){
					this.searchList.TYPE =  '1';
				}else if(data.label == '质量抽查'){
					this.searchList.TYPE =  '3';
				}
				this.requestData();
			},
			formatter(row, column) {
				return row.enabled;
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
					// console.log(res);
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
		mounted() {
			this.getKey();
			this.requestData();
			this.treeDrag();//调用树和表单之间拖拽改变宽度
		},
	}
</script>

<style scoped>

</style>