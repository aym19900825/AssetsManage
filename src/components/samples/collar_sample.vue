<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单内容显示 Begin-->
			<navs_left></navs_left>
			<!--左侧菜单内容显示 End-->
			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<!--<navs_button></navs_button>-->
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button type="button" class="btn btn-green" @click="openAddMgr" id="">
                                	<i class="icon-add"></i>添加
                      			 </button>
								<button type="button" class="btn btn-bule button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" @click="deluserinfo">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="importData">
								    <i class="icon-upload-cloud"></i>导入
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="exportData">
								    <i class="icon-download-cloud"></i>导出
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
					<!-- 高级查询划出 Begin-->
					<div v-show="search" class="pb10">
						<el-form status-icon :model="searchList" label-width="70px">
							<el-row :gutter="30" class="pb5">
								<el-col :span="7">
									<el-input v-model="searchList.ITEMNUM">
										<template slot="prepend">样品序号</template>
									</el-input>
								</el-col>
								
								<el-col :span="7">
									<el-input v-model="searchList.DESCRIPTION">
										<template slot="prepend">样品名称</template>
										</el-input>
								</el-col>
								<el-col :span="7">
									<el-input v-model="searchList.ACCEPT_PERSON" label-width="58px">
									<template slot="prepend">收样人</template>
										</el-input>
								</el-col>
							</el-row>
							<el-row :gutter="30">
								<el-col :span="7">				
									<el-input v-model="searchList.ITEM_LINE_ID">
										<template slot="prepend">样品子表ID</template>
									</el-input>
								</el-col>
								<el-col :span="7">
									<el-input v-model="searchList.TYPE">
									<template slot="prepend">样品类别</template>
										</el-input>
								</el-col>
								<el-col :span="7">
									<el-input v-model="searchList.ACCEPT_DATE" label-width="70px">
									<template slot="prepend">收样日期</template>
										</el-input>
								</el-col>
								<el-col :span="3">
									<el-button type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->

					<el-row :gutter="0">
						<!-- 左侧树菜单 Begin-->
						<el-col :span="5" class="lefttree">
							<div class="lefttreebg">
								<div class="left_tree_title clearfix" @click="min3max()">
									<div class="pull-left pr20" v-if="ismin">检索分类</div>
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
						<!-- 左侧树菜单 End-->
						
						<el-col :span="19" class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="samplesList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'samplesList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="样品子表ID" sortable width="200px" prop="ITEM_LINE_ID" v-if="this.checkedName.indexOf('样品子表ID')!=-1">
								</el-table-column>
								<el-table-column label="样品序号" sortable width="200px" prop="ITEMNUM" v-if="this.checkedName.indexOf('样品序号')!=-1">
								</el-table-column>
								<el-table-column label="样品类别" sortable width="200px" prop="TYPE" v-if="this.checkedName.indexOf('样品类别')!=-1">
								</el-table-column>
								<el-table-column label="样品名称" sortable width="200px" prop="DESCRIPTION" v-if="this.checkedName.indexOf('样品名称')!=-1">
								</el-table-column>
								<el-table-column label="型号" width="200px" prop="MODEL" sortable v-if="this.checkedName.indexOf('型号')!=-1">
								</el-table-column>
								<el-table-column label="数量" width="200px" prop="QUALITY" sortable v-if="this.checkedName.indexOf('数量')!=-1">
								</el-table-column>
								<el-table-column label="收样人" sortable width="140px" prop="ACCEPT_PERSON" v-if="this.checkedName.indexOf('收样人')!=-1">
								</el-table-column>
								<el-table-column label="收样日期" sortable width="160px" :formatter="dateFormat" prop="ACCEPT_DATE" v-if="this.checkedName.indexOf('收样日期')!=-1">
								</el-table-column>
								<el-table-column label="领样人" sortable width="140px" prop="GRANT_PERSON" v-if="this.checkedName.indexOf('领样人')!=-1">
								</el-table-column>
								<el-table-column label="领样日期" sortable width="160px" :formatter="dateFormat" prop="GRANT_DATE" v-if="this.checkedName.indexOf('领样日期')!=-1">
								</el-table-column>
								<el-table-column label="状态" sortable width="140px" prop="STATE" v-if="this.checkedName.indexOf('状态')!=-1">
								</el-table-column>
								<!--<el-table-column label="信息状态" sortable width="140px" prop="STATUS" v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column>-->
							</el-table>
							
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<samplesmask :samplesForm="samplesForm" ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></samplesmask>
		<!--右侧内容显示 End-->
	</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left6.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import samplesmask from'../samplesDetails/collarsample_mask.vue'
	export default {
		name: 'collar_sample',//领样
		components: {
			vheader,
			navs_header,
			navs_left,
			tableControle,
			samplesmask,
		},
		data() {
			return {
				basic_url: Config.dev_url,
				isShow: false,
				ismin: true,
				loadSign: true, //加载
				commentArr: {},
				checkedName: [
					'样品子表ID',
					'样品序号',
					'样品类别',
					'样品名称',
					'型号',
					'数量',
					'收样人',
					'收样日期',
					'领样人',
					'领样日期',
					'状态',
					'信息状态',
				],
				tableHeader: [
					{
						label: '样品子表ID',
						prop: 'ITEM_LINE_ID'
					},
					{
						label: '样品序号',
						prop: 'ITEMNUM'
					},
					{
						label: '样品类别',
						prop: 'TYPE'
					},
					{
						label: '样品名称',
						prop: 'DESCRIPTION'
					},
					{
						label: '型号',
						prop: 'MODEL'
					},
					{
						label: '数量',
						prop: 'QUALITY'
					},
					{
						label: '收样人',
						prop: 'ACCEPT_PERSON'
					},
					{
						label: '收样日期',
						prop: 'ACCEPT_DATE'
					},
					{
						label: '状态',
						prop: 'STATE'
					},
					{
						label: '信息状态',
						prop: 'STATUS'
					},
				],
				companyId: '',
				deptId: '',
				selMenu: [],
				'启用': true,
				'冻结': false,
				samplesList: [],
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				search: false,
				show: false,
				down: true,
				up: false,
				searchList: {
					ITEMNUM: '',//样品序号
					DESCRIPTION: '',//样品名称
					ACCEPT_PERSON: '',//收样人
					ITEM_LINE_ID: '',//样品子表ID
					TYPE: '',//样品类别
					ACCEPT_DATE: '',//收样日期
				},
				//tree树菜单
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {//树菜单数据
					children: "subDepts",
					label: "fullname"
				},
				treeData: [],
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				aaaData: [],
				samplesForm: {}//修改子组件时传递数据
			}
		},
		methods: {
			renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
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

			
			//表格滚动加载
			loadMore () {
			   if (this.loadSign) {
			     this.loadSign = false
			     this.page.currentPage++
			     if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			       return
			     }
			     setTimeout(() => {
			       this.loadSign = true
			     }, 1000)
			     this.requestData()
//			     console.log('到底了', this.page.currentPage)
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
			searchinfo(index) {//高级查询
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加样品管理
			openAddMgr() {
				this.samplesForm = {
					ITEM_LINE_ID: '',//样品子表ID
					ITEMNUM: '',//样品序号
					TYPE: '',//样品类别
					VENDOR: '',//样品序号编号
					DESCRIPTION: '',//样品名称
					MODEL: '',//型号
					QUALITY: '',//数量
					PRODUCT_CODE: '',//产品标识代码
					OTHER: '',//其他资料
					MEMO: '',//备注
					ACCEPTDATE: '',//入库时间
					ACCEPT_PERSON: '',//收样人
					ACCEPT_DATE: '',//收样日期
					GRANT_PERSON: '',//领样人
					GRANT_DATE: '',//领样日期
					STATE: '1',//状态
					STATUSDATE: '',//状态日期
					ENTERBY: '',//录入人
					ENTERDATE: '',//录入时间
					CHANGEBY: '',//修改人
					CHANGEDATE: '',//修改时间
					STATUS: '1',//信息状态
				};
				this.$refs.child.childMethods();
			},
			//修改用戶
			modify() {
				this.aaaData = this.selMenu;
				if(this.aaaData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.aaaData.length > 1) {
					this.$message({
						message: '不可同时修改多条数据',
						type: 'warning'
					});
					return;
				} else {
					this.samplesForm = this.selMenu[0]; 
					this.$refs.child.detail();
				}
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
					var url = this.basic_url + '/api-apps/app/itemgrant/deletes';
					//changeMenu为勾选的数据
					var changeMenu = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for (var i = 0; i < changeMenu.length; i++) {
						deleteid.push(changeMenu[i].ID);
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

			},
			// 打印
			Printing() {

			},
			judge(data) {
				//taxStatus 布尔值
				return data.DESCRIPTION ? '启用' : '冻结'
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
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,

					ITEMNUM: this.searchList.ITEMNUM,//样品序号
					DESCRIPTION: this.searchList.DESCRIPTION,//样品名称
					ACCEPT_PERSON: this.searchList.ACCEPT_PERSON,//收样人
					ITEM_LINE_ID: this.searchList.ITEM_LINE_ID,//样品子表ID
					TYPE: this.searchList.TYPE,//样品类别
					ACCEPT_DATE: this.searchList.ACCEPT_DATE//收样日期
				}
				var url = this.basic_url + '/api-apps/app/itemgrant';
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
					this.commentArr[this.page.currentPage] = res.data.data
					let newarr = []
					for(var i = 1; i <= totalPage; i++) {

						if(typeof(this.commentArr[i]) != 'undefined' && this.commentArr[i].length > 0) {

							for(var j = 0; j < this.commentArr[i].length; j++) {
								newarr.push(this.commentArr[i][j])
							}
						}
					}
					this.samplesList = newarr;
				}).catch((wrong) => {})
				
			},
			
			formatter(row, column) {
				return row.enabled;
			},
			//样品序号树
			getKey() {
				let that = this;
				var url = this.basic_url + '/api-user/depts/tree';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data;
					this.treeData = this.transformTree(this.resourceData);
				});
			},
			transformTree(data) {
				for(var i = 0; i < data.length; i++) {
					data[i].name = data[i].fullname;
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
				if(data.type == '1') {
					this.companyId = data.id;
					this.deptId = '';
				} else {
					this.deptId = data.id;
					this.companyId = '';
				}
				this.requestData();
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
			}
		},
		
		mounted() {// 在页面挂载前就发起请求
			this.requestData();
			this.getKey();
		},
	}
</script>

<style scope>
.p15 {padding:10px 15px;}
</style>