<template>
	<div>
		<div class="headerbg">
			<vheader ref="vheader"  ></vheader>
			<navs_tabs ref="navsTabs"></navs_tabs>
		</div>
		<div class="contentbg">
			<!--左侧菜单内容显示 Begin-->
			<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
			<!--左侧菜单内容显示 End-->
			<!--右侧内容显示 Begin-->
			<div id="wrapper-content" class="wrapper">
				<div class="ibox-content">
					<!--<navs_button></navs_button>-->
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button v-for="item in buttons" :key='item.id' :class="'btn mr5 '+ item.style" @click="getbtn(item)">
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
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh" @click="this.commonNew.winReload"><i class="icon-refresh"></i></div>
							<div class="keep-open btn-group" title="列">
								<el-dropdown :hide-on-click="false" class="pl10 btn btn-default btn-outline">
									<span class="el-dropdown-link">
										<font class="J_tabClose"><i class="icon-menu3"></i></font>
										<i class="el-icon-arrow-down icon-arrow2-down"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-checkbox-group v-model="checkedName">
											<el-dropdown-item v-for="(item,index) in tableHeader" :key="index">
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
						<el-form inline-message :model="searchList">
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="委托方名称" prop="V_NAME"  label-width="100px">
										<!-- <el-input v-model="searchList.V_NAME"  @keyup.enter.native="searchinfo"></el-input> -->
										<el-select clearable 
											   v-model="searchList.V_NAME" 
											   filterable 
											   default-first-option 
											   placeholder="请选择">
											<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="样品名称" prop="ITEM_NAME" label-width="70px">
										<el-input v-model="searchList.ITEM_NAME" @keyup.enter.native="searchinfo"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="检测报告编号" prop="REPORT_NUM" label-width="100px">
										<el-input v-model="searchList.REPORT_NUM" @keyup.enter.native="searchinfo"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="检测委托书编号" prop="PROXYNUM" label-width="110px">
										<el-input v-model="searchList.PROXYNUM" @keyup.enter.native="searchinfo"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="完成日期（开始）" prop="COMPDATE" label-width="130px">
										<el-date-picker v-model="searchList.COMPDATE_where_date_from" type="date" placeholder="完成日期" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%" @keyup.enter.native="searchinfo">
									</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="完成日期（结束）" prop="COMPDATE" label-width="130px">
										<el-date-picker v-model="searchList.COMPDATE_where_date_to" type="date" placeholder="完成日期" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%" @keyup.enter.native="searchinfo">
									</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="状态" prop="STATE" label-width="70px">
										<el-select clearable v-model="searchList.STATE_wheres" placeholder="选择状态" style="width: 100%">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
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

					<el-row class="relative" id="pageDiv">
						<el-col :span="5" class="lefttree" id="left">
							<div class="lefttreebg">
								<div class="left_tree_title clearfix" >
									<div class="pull-left pr20" v-if="ismin">组织机构</div>
								</div>
								<div class="left_treebg" :style="{height: fullHeight}">
									<div class="p15" v-if="ismin">
										<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all :indent="22" :render-content="renderContent"  :props="resourceProps" @node-click="handleNodeClick" empty-text="暂无数据权限，如需请联系上级管理员在系统设置-角色管理-数据配置中配置。">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
						<div id="middle"></div>
						<el-col :span="19" class="leftcont" id="right">
							<!-- 表格 -->
							<v-table ref="table" :appName="appName" :searchList="searchList" @getSelData="setSelData">
								<el-table-column label="检测委托书编号" sortable width="160px" prop="PROXYNUM" v-if="this.checkedName.indexOf('检验委托书编号')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row.ID)>{{scope.row.PROXYNUM}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="委托方名称名称" sortable width="260px" prop="V_NAMEDesc" v-if="this.checkedName.indexOf('委托方名称名称')!=-1">
								</el-table-column>
								<el-table-column label="状态" sortable width="140px" prop="STATEDesc" v-if="this.checkedName.indexOf('状态')!=-1">
								</el-table-column>
								<el-table-column label="执行状态" sortable width="140px" prop="LEADER_STATUSDesc" v-if="this.checkedName.indexOf('执行状态')!=-1">
								</el-table-column>
								<el-table-column label="样品名称" sortable width="140px" prop="ITEM_NAME" v-if="this.checkedName.indexOf('样品名称')!=-1">
								</el-table-column>
								<el-table-column label="样品型号" sortable width="140px" prop="ITEM_MODEL" v-if="this.checkedName.indexOf('样品型号')!=-1">
								</el-table-column>
								<!-- <el-table-column label="样品信息状态" sortable width="200px" prop="ITEM_STATE" v-if="this.checkedName.indexOf('样品信息状态')!=-1">
								</el-table-column> -->
								<el-table-column label="检测依据" width="200px" prop="REMARKS" sortable  v-if="this.checkedName.indexOf('检测依据')!=-1">
								</el-table-column>
								<el-table-column label="完成方式" width="100px" prop="COMPMODE" class="newred" sortable v-if="this.checkedName.indexOf('完成方式')!=-1">
								</el-table-column>
								<el-table-column label="完成日期" width="140px" prop="COMPDATE" sortable  :formatter="dateFormat" data-type = ""  v-if="this.checkedName.indexOf('完成日期')!=-1">
								</el-table-column>
								<el-table-column label="检测报告编号" width="140px" prop="REPORT_NUM" sortable  v-if="this.checkedName.indexOf('检测报告编号')!=-1">
								</el-table-column>
								<el-table-column label="主检组" width="140px" prop="MAINGROUPDesc" sortable  v-if="this.checkedName.indexOf('主检组')!=-1">
								</el-table-column>
								<!--<el-table-column label="信息状态" width="200px" prop="STATE" sortable v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column>-->
								<!--<el-table-column label="录入人" width="200px" prop="ENTERBY" sortable  v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column>-->
								<el-table-column label="录入时间" width="140px" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<el-table-column label="版本" width="80" prop="VERSION" sortable  v-if="this.checkedName.indexOf('版本')!=-1">
								</el-table-column>
							</v-table>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<inspectmask  ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page @realtime="realtime"></inspectmask>
		<checkassignmask  ref="assingn" @request="requestData" @requestTree="getKey" v-bind:page=page></checkassignmask>
		<!--右侧内容显示 End-->
					<!--报表-->
		<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_tabs from '../common/nav_tabs.vue'
	import inspectmask from '../proxiesDetails/check_proxyMask.vue'
	import reportmask from'../reportDetails/reportMask.vue'
	import vTable from '../plugin/table/table.vue'
	import checkassignmask from '../proxiesDetails/checkassignmask.vue'//下达任务的弹出
	
	export default {
		name: 'inspectPro2',
		components: {
			vheader,
		  	navs_left,
		  	navs_tabs,
		 	inspectmask,
			reportmask,
			checkassignmask,
			vTable,
		},
		data() {
			return {
				appName: 'inspectPro2',
				reportData:{},//报表的数据
				loadSign: true, //鼠标滚动加载数据
				loading: false, //默认加载数据时显示loading动画
				basic_url: Config.dev_url,
				value: '',
				options: [{
					value: '1',
					label: '编制'
				}, {
					value: '2',
					label: '审批中'
				},{
					value: '3',
					label: '待分配'
				},
				{
					value: '4',
					label: '中止'
				},
				 {
					value: '5',
					label: '已分配'
				},
				{
					value: '15',
					label: '已回退'
				},
				{
					value: '0',
					label: '驳回'
				}
				],
				isShow: false,
				ismin: true,
				commentArr: {},
				checkedName: [
					'检验委托书编号',
					'委托方名称名称',
					'生产单位名称',
					'样品名称',
					'样品型号',
					'状态',
					'执行状态',
					// '样品信息状态',
					'检测依据',
					'完成日期',
					'完成方式',
					'检测报告编号',
					'主检组',
					// '信息状态',
					'录入人',
					'录入时间',
					'版本'
				],
				tableHeader: [{
						label: '检测委托书编号',
						prop: 'PROXYNUM'
					},
					{
						label: '委托方名称名称',
						prop: 'V_NAMEDesc'
					},
					{
						label: '状态',
						prop: 'STATEDesc'
					},
					{
						label: '执行状态',
						prop: 'LEADER_STATUS'
					},
					{
						label: '生产单位名称',
						prop: 'P_NAME'
					},
					{
						label: '样品名称',
						prop: 'ITEM_NAME'
					},
					{
						label: '样品型号',
						prop: 'ITEM_MODEL'
					},
					// {
					// 	label: '样品信息状态',
					// 	prop: 'ITEM_STATE'
					// },
					{
						label: '检测依据',
						prop: 'REMARKS'
					},
					{
						label: '完成日期',
						prop: 'COMPDATE'
					},
					{
						label: '完成方式',
						prop: 'COMPMODE'
					},
					{
						label: '检测报告编号',
						prop: 'REPORT_NUM'
					},
					{
						label: '主检组',
						prop: 'MAINGROUP'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATE'
					// },
					{
						label: '录入人',
						prop: 'ENTERBY'
					},
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
						label: '版本',
						prop: 'VERSION'
					},
				],

				companyId: '',
				deptId: '',
				selUser: [],
				inspectList: [],
				fileList:[],//文件上传的接收数据
				search: false,
				show: false,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					V_NAMEDesc:'',
					ITEM_NAME: '',
					REPORT_NUM: '',
					PROXYNUM: '',
					COMPDATE: '',
					ENTERBY: '',
					STATEDesc: '',
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "fullname"
				},
				treeData: [],
				page: { //分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				buttons:[],
				selectData: [],
			  inspectPro2:'inspectPro2'//appname
			}
		},
		methods: {
			
			setSelData(val){
				this.selUser = val;
			},
			fileSuccess(){
				this.page.currentPage = 1;
				this.requestData();
			},
			renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
				return (<span><i class={data.iconClass}></i><span  title={data.lable}>{data.lable}</span></span>)
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
			resetbtn(){
				this.searchList =  { //点击高级搜索后显示的内容
					V_NAMEDesc:'',
					ITEM_NAME: '',
					REPORT_NUM: '',
					PROXYNUM: '',
					COMPDATE: '',
					ENTERBY: '',
					STATEDesc: '',
				};
				this.requestData('init');
			},
			searchinfo() {
				this.requestData('init');
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
		    	 this.delinfo();
		    	}else if(item.name=="中止"){
		    	 this.breakoff();
		    	}else if(item.name=="报表"){
			     this.reportdata();
					}else if(item.name=="打印"){
						this.Printing();
					}else if(item.name=="下达任务"){
						this.build();
				}
		    },
			//添加
			openAddMgr() {
				this.$refs.child.reset();
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
					if(this.selUser[0].STATE == 3 || this.selUser[0].STATE == 2) {
						this.$message({
							message: '已启动的流程，不允许修改数据，只可以查看。',
							type: 'warning'
						});
						this.$refs.child.view(this.selUser[0].ID);
					}
					//驳回
					else if(this.selUser[0].STATE == 0) {
						var url = this.basic_url + '/api-apps/app/inspectPro/flow/isExecute/' + this.selUser[0].ID;
						this.$axios.get(url, {}).then((res) => {
							if(res.data.resp_code == 0) {
								var url = this.basic_url + '/api-apps/app/inspectPro/flow/isPromoterNode/' + this.selUser[0].ID;
								this.$axios.get(url, {}).then((res) => {
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
				this.$refs.child.view(id);
			},
				//下达任务
			build(){
				if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择要下达任务的数据',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时下达任务多个数据',
						type: 'warning'
					});
					return;
				}else if(this.selUser[0].ISRECEIVE==''||this.selUser[0].ISRECEIVE==null||this.selUser[0].ISRECEIVE==undefined||this.selUser[0].ISRECEIVE==0){
					this.$message({
						message: '此委托书暂不能下达任务，请查看是否接样!',
						type: 'warning'
					});
					return;
				}else if(this.selUser[0].STATE !=3&&this.selUser[0].STATE !=15) {
					this.$message({
						message: '此委托书暂不能下达任务，请查看【状态】!',
						type: 'warning'
					});
					return;
				}else if(this.selUser[0].ISCREATED==1){
					this.$message({
						message: '已经生成任务单，无需再次生成',
						type: 'warning'
					});
					return;
				}else if((this.selUser[0].STATE == 3 || this.selUser[0].STATE == 15)&&this.selUser.ISRECEIVE!=1){
					this.$refs.assingn.view(this.selUser[0].ID);	
				}
			},
			//中止
			breakoff(){
				if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择要中止的数据',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时中止多个数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/inspectPro2/operate/stop?ID='+this.selUser[0].ID;
					this.$axios.get(url, {

					}).then((res) => {
						if(res.data.resp_code == 0) {
							this.$message({
								message: '操作成功',
								type: 'success'
							});
						} else {
							this.$message({
								message: res.data.resp_msg,
								type: 'warning'
							});
						}
					}).catch((wrong) => {
					})
				}
			},
			//打印
			Printing(){
				if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择要打印的数据',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时打印多个数据',
						type: 'warning'
					});
					return;
				}else{
					var url=this.basic_url;
					var token = sessionStorage.getItem('access_token');
					var pos = url.lastIndexOf(':');
					url = url.substring(0,pos+1); 
					this.url=url+"5300";
					var url = this.url+"/ureport/preview?_u=mysql:inspectproxyjianyan_table.ureport.xml&access_token="+ token+"&id="+this.selUser[0].ID;
					window.open(url);
				}
			},
			handleSuccess(response, file, fileList){
			},
				// 导入文件上传
			uploadUrl(){
					var url = this.basic_url +'/api-apps/app/inspectPro2/importExc?access_token='+sessionStorage.getItem('access_token');
					return url;
			},
			// 导入
			download() {
				var url = this.basic_url + '/api-apps/app/inspectPro2/importExcTemplete?access_token='+sessionStorage.getItem('access_token');
				var xhr = new XMLHttpRequest();
					xhr.open('POST', url, true);
					xhr.responseType = "blob";
					xhr.setRequestHeader("client_type", "DESKTOP_WEB");
					xhr.onload = function() {
						if (this.status == 200) {
							var filename = "inspectPro2.xls";
							var blob = this.response;
							var link = document.createElement('a');
							var objecturl = URL.createObjectURL(blob);
							// window.location.href = objecturl;
							link.href = objecturl;
							link.download = filename;
							link.click();
						}
					}
					xhr.send();
			},
		
			// 导出
			exportData() {
				var selData = this.selUser;
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
						var url = this.basic_url + '/api-apps/app/inspectPro2/exportExc/'+ids+'?access_token='+sessionStorage.getItem('access_token');
						var xhr = new XMLHttpRequest();
						xhr.open('POST', url, true);
						xhr.responseType = "blob";
						xhr.setRequestHeader("client_type", "DESKTOP_WEB");
						xhr.onload = function() {
							if (this.status == 200) {
								var filename = "inspectPro2.xls";
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
			getRouterData() {
      		// 只是改了query，其他都不变
				  this.id = this.$route.query.bizId;
				  this.$refs.child.view(this.id);
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
			},
			//报表
			reportdata(){
				// this.reportData.app=this.inspectPro2;
				// this.$refs.reportChild.visible();
				// this.reportData.app=this.inspectPro;
				// this.$refs.reportChild.visible();
					if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择数据',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时选择数据',
						type: 'warning'
					});
					return;
				}else{
					let routeData = this.$router.resolve({
					path: "/report",
					query: {
					appname: this.inspectPro2,
					id:this.selUser[0].ID
					}
					});
					window.open(routeData.href, '_blank');
					// this.$router.push({path: '/report' ,query: {appname: this.inspectPro2,id:this.selUser[0].ID}});
				}
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
					var url = this.basic_url + '/api-apps/app/inspectPro2/deletes';
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
					this.$confirm('确定删除吗？', '提示', {
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
					var url = this.basic_url + '/api-apps/app/inspectPro2/physicsDel';
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
					this.$confirm('确定删除吗？', '提示', {
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

			//机构树
			getKey() {
				let that = this;
				var url = this.basic_url + '/api-apps/appCustom/proxyTree/2';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data.datas;
					if(this.resourceData!=null){
						 this.treeData = this.transformTree(this.resourceData);
					}
				}).catch((wrong) => {
				});
			},
			transformTree(data) {
				for(var i = 0; i < data.length; i++) {
					data[i].name = data[i].fullname || data[i].PROXY_TYPE || data[i].pName || data[i].PRO_NAME;
					data[i].lable = data[i].fullname || data[i].PROXY_TYPE || data[i].pName || data[i].PRO_NAME;
					if($.isArray(data[i].children)) {
						data[i].iconClass = 'icon-file-normal';
					} else {
						data[i].iconClass = 'icon-file-text';
					}
					if($.isArray(data[i].children)) {
						data[i].subDepts = this.transformTree(data[i].children);
					}
				}
				return data;
			},
			handleNodeClick(data) {
				if(data.type=='dept') {
					this.searchList.P_NUM = '';
					this.searchList.DEPTID = data.deptid;
					this.page.currentPage = 1;
				}else if(data.type=='product'){
					this.searchList.PRODUCT=data.fullname;
					this.searchList.P_NUM = '';
					this.searchList.DEPTID = data.deptid;
					this.page.currentPage = 1;
				}else if(data.type=='producttype'){
					this.searchList.DEPTID = data.deptid;
					this.searchList.PRODUCT='';
					this.searchList.PRODUCT_TYPE=data.fullname;
					this.page.currentPage = 1;
				}else{
					this.searchList.P_NUM = '';
					this.searchList.PRO_NUM = '';
					this.searchList.PRODUCT='';
					this.searchList.PRODUCT_TYPE='';
					this.searchList.DEPTID = '';
					this.page.currentPage = 1;
				}
				this.requestData();
			},

			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
				this.$refs.navsTabs.showClick(childValue);
				this.getbutton(childValue);
			},
			  //请求页面的button接口
		    getbutton(childByValue){
		    	var data = {
					menuId: childByValue.id,
					roleId: this.$store.state.roleid,
				};
				var url = this.basic_url + '/api-user/permissions/getPermissionByRoleIdAndSecondMenu';
				this.$axios.get(url, {params: data}).then((res) => {
					this.buttons = res.data;
				}).catch((wrong) => {
				})
			},
			//树和表单之间拖拽改变宽度
			treeDrag(){
				var middleWidth=5,
				left = document.getElementById("left"),
				right =  document.getElementById("right"), 
				middle =  document.getElementById("middle"); 
				middle.style.left = left.clientWidth + 'px';
				right.style.left = left.clientWidth + 5 + 'px';
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
						right.style.width = maxT - iT -middleWidth -230 + "px"; 
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
			},
			getSelPromise(){
				var arr1 = [];
				var resFun = new Promise((resolve,reject)=>{
					this.$axios.get(this.basic_url + '/api-user/depts/findFirstSecond', {}).then((res) => {
						this.selectData = res.data;
						resolve(arr1);
					}).catch((wrong) => {})
				})
				return resFun;
			},
			getSelectData(){
				this.getSelPromise().then(()=>{
					this.$axios.get(this.basic_url + '/api-apps/app/customer', {}).then((res) => {
						var resData = res.data.data;
						for (let i = 0; i < resData.length; i++) {
							this.selectData.push({
								id: resData[i].ID,
								fullname:  resData[i].NAME
							})
						}
					}).catch((wrong) => {})
				})
				.catch(function(err){
					console.log(err);
				})
			},
			//触发header中的方法
			realtime(){
				console.log(1);
				 this.$refs.vheader.getTodoNumber();
			},
		},
		beforeMount() {
			this.getKey();
		},
		mounted() {
			console.log(123);
			if(this.$route.query.bizId!=undefined){
				this.getRouterData();
			}
			this.getSelectData();
			this.treeDrag();//调用树和表单之间拖拽改变宽度
		},
	}
</script>

<style >
 span.el-tree__empty-text {
	width:200px;
	top:100%;
	color: #909399;
}
</style>