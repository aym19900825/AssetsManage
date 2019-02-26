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
			<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<!--<navs_button></navs_button>-->
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
								<button type="button" class="btn btn-primarys button-margin">
								    <i class="icon-inventory-line-callout"></i>导出
								</button>
								<button type="button" class="btn btn-primarys button-margin">
								    <i class="icon-send"></i>发布
								</button>
								<button type="button" class="btn btn-primarys button-margin">
								    <i class="icon-close1"></i>取消
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="tasklist">
								    <i class="icon-send"></i>生成子任务单
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
						<el-form inline-message :model="searchList" label-width="110px">
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="工作任务单编号" prop="WONUM">
										<el-input v-model="searchList.WONUM">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="样品名称" prop="ITEM_NAME" label-width="80px">
										<el-input v-model="searchList.ITEM_NAME">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="完成日期" prop="COMPLETE_DATE" label-width="80px">
										<div class="block">
									    	<el-date-picker v-model="searchList.COMPLETE_DATE" type="date" placeholder="请选择" style="width: 100%" value-format="yyyy-MM-dd">
									    	</el-date-picker>
								  		</div>
									</el-form-item>
								</el-col>
								
								<!-- <el-col :span="3">
									<el-select v-model="searchList.STATE" placeholder="请选择信息状态">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col> -->
							</el-row>
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="委托书编号" prop="PROXYNUM" label-width="110px">
										<el-input v-model="searchList.PROXYNUM">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="录入日期" prop="ENTERDATE" label-width="80px">
										<div class="block">
									    	<el-date-picker v-model="searchList.ENTERDATE" type="date" placeholder="请选择" style="width: 100%" value-format="yyyy-MM-dd">
									    	</el-date-picker>
								  		</div>
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
					
					<el-row :gutter="10">
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
										<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all :indent="22" :render-content="renderContent"  :props="resourceProps" @node-click="handleNodeClick">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="19" class="leftcont v-resize">
							<!-- 表格 -->
							<tree_grid :columns="columns" :loading="loading" :tree-structure="true" :data-source="userList" v-on:childByValue="childvalue"></tree_grid>
							<!-- 表格 -->
						</el-col>
					</el-row>
					</div>
				</div>
			</div>
			<workorders_mask :workorderForm="workorderForm" ref="child" @requests="requestData" @requestTree="getKey" v-bind:page=page></workorders_mask>
			<sendtasklist ref="task"  v-bind:page=page></sendtasklist>
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import tree_grid from '../common/TreeGrid.vue'//树表格
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import workorders_mask from '../testworkcheckDetails/workorders_mask.vue'
	import sendtasklist from '../testworkcheckDetails/sendtasklist.vue'
	export default {
		name: 'workorders',
		components: {
			vheader,
			tree_grid,
			navs_header,
			navs_left,
			workorders_mask,
			sendtasklist
		},
		data() {
			return {
				loading: false,
				basic_url: Config.dev_url,
				checkedName: [
				    '工作任务单编号',
					'状态',
					'样品名称',
					'样品型号',
					'样品状态',
					'抽样方案/判定依据',
					'完成日期',
					'完成方式',
					'委托书编号',
					'录入人',
					'录入时间'
				],
				columns: [
					 {
					 	text: '序号',
					 	dataIndex: 'WONUM',
					 	isShow:true,
					 },
					{
						text: '机构名称',
						dataIndex: 'STATUS',
						isShow:true,
					},
					{
						text: '机构编码',
						dataIndex: 'ITEM_NAME',
						isShow:true,
					},
					{
						text: '上级机构',
						dataIndex: 'ITEM_MODEL',
						isShow:true,
					},
					{
						text: '机构属性',
						dataIndex: 'ITEM_STATUS',
						isShow:true,
					},
					{
						text: '抽样方案/判定依据',
						dataIndex: 'CHECK_BASIS',
						isShow:true,
					},
					{
						text: '完成日期',
						dataIndex: 'COMPLETE_DATE',
						isShow:true,
					},
					{
						text: '完成方式',
						dataIndex: 'COMPLETE_MODE',
						isShow:true,
					},
					{
						text: '委托书编号',
						dataIndex: 'PROXYNUM',
						isShow:true,
					},
					{
						text: '录入人',
						dataIndex: 'ENTERBY',
						isShow:true,
					},
					{
						text: '录入时间',
						dataIndex: 'ENTERDATE',
						isShow:true,
					},
				],
				ismin: true,
				loadSign:true,//加载
				commentArr:{},
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				checkedName: [
					'工作任务单编号',
					'状态',
					'样品名称',
					'样品型号',
					'样品状态',
					'抽样方案/判定依据',
					'完成日期',
					'完成方式',
					'委托书编号',
					// '录入人',
					'录入时间',
					// '信息状态'
				],
				tableHeader: [
					{
						label: '工作任务单编号',
						prop: 'WONUM'
					},
					{
						label: '状态',
						prop: 'STATE'
					},
					{
						label: '样品名称',
						prop: 'ITEM_NAME'
					},
					{
						label: '样品型号',
						prop: 'ITEM_MODEL'
					},
					{
						label: '样品状态',
						prop: 'ITEM_STATUS'
					},
					{
						label: '抽样方案/判定依据',
						prop: 'CHECK_BASIS'
					},
					{
						label: '完成日期',
						prop: 'COMPLETE_DATE'
					},
					{
						label: '完成方式',
						prop: 'COMPLETE_MODE'
					},
					{
						label: '委托书编号',
						prop: 'PROXYNUM'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// },
					// {
					// 	label: '录入人',
					// 	prop: 'ENTERBY'
					// },
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					}
				],
				companyId: '',
				deptId: '',
				selMenu: [],
				userList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				searchList: {
					WONUM: '',//工作任务单编号
					ITEM_NAME: '',//样品名称
					PROXYNUM: '',//委托书编号
					STATE: '',//状态
					COMPLETE_DATE: '',//完成日期
					// ENTERBY: '',//录入人
					ENTERDATE: '',//录入日期
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
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				workorderForm: {}//修改子组件时传递数据
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
			loadMore() {
				if(this.loadSign) {
					this.loadSign = false
					this.page.currentPage++
						if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
							return
						}
					setTimeout(() => {
						this.loadSign = true
					}, 1000)
					this.requestData()
					//console.log('到底了', this.page.currentPage)
				}
			},
			sizeChange(val) {
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    currentChange(val) {
		      this.page.currentPage = val;
		      this.requestData();
		    },
	    	resetbtn(){
				this.searchList =  { //点击高级搜索后显示的内容
					WONUM: '',//工作任务单编号
					ITEM_NAME: '',//样品名称
					PROXYNUM: '',//委托书编号
					STATE: '',//状态
					COMPLETE_DATE: '',//完成日期
					// ENTERBY: '',//录入人
					ENTERDATE: '',//录入日期
				};
				this.requestData();
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加检验工作处理到子组件
			openAddMgr() {
				
				this.$refs.child.visible();
			},
			//修改检验工作处理到子组件
			modify() {
				console.log('this.selMenu');
				console.log(this.selMenu.length);
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
					if(this.selMenu[0].STATE == 3 || this.selMenu[0].STATE == 2) {
						this.$message({
							message: '已启动的流程，不允许修改数据，只可以查看。',
							type: 'warning'
						});
						this.$refs.child.view(this.selMenu[0].ID);
					}
					//驳回
					else if(this.selMenu[0].STATE == 0) {
						var url = this.basic_url + '/api-apps/app/workorder/flow/isExecute/' + this.selMenu[0].ID;
						this.$axios.get(url, {}).then((res) => {
							if(res.data.resp_code == 0) {
								var url = this.basic_url + '/api-apps/app/workorder/flow/isPromoterNode/' + this.selMenu[0].ID;
								this.$axios.get(url, {}).then((res) => {
									if(res.data.resp_code == 0) {
										this.$refs.child.detail(this.selMenu[0].ID);
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
						this.$refs.child.detail(this.selMenu[0].ID);	
					}
				}
			},
			//生成子任务单
			tasklist(){
				if(this.selMenu.length == 0) {
					this.$message({
						message: '请您选择要生成子任务单的数据',
						type: 'warning'
					});
					return;
				} else if(this.selMenu.length > 1) {
					this.$message({
						message: '不可同时生成多条子任务单',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.task.visible(this.selMenu[0].ID);	
				}
			},
			//查看
			view(id) {
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
			deluserinfo() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				}else {
					var url = this.basic_url + '/api-apps/app/workorder/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for (var i = 0; i < changeUser.length; i++) {
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
                    }).then(({ value }) => {
                        this.$axios.delete(url, {params: data}).then((res) => {
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
			judge(data) {
				//taxStatus 布尔值
				return data.enabled ? '活动' : '不活动'
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
				this.selMenu = val;
			},
			requestData() {
				this.loading = true;
				var data = {
					WONUM: this.searchList.WONUM,
					ITEM_NAME: this.searchList.ITEM_NAME,
					PROXYNUM: this.searchList.PROXYNUM,
					STATE: this.searchList.STATE,
					COMPLETE_DATE: this.searchList.COMPLETE_DATE,
					ENTERBY: this.searchList.ENTERBY,
					ENTERDATE: this.searchList.ENTERDATE,
				}
				var url=this.basic_url +'/api-apps/app/workorder/tree?tree_id=WONUM&tree_pid=PARENT_NUM';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					let result=res.data.datas;
					for(let i=0;i<result.length;i++){
						if(typeof(result[i].subDepts)!="undefined"&&result[i].subDepts.length>0){
							let subDepts=result[i].subDepts;
							result[i].children=subDepts;
						}	
					}
					this.userList=res.data.datas;
					this.loading = false;

				}).catch((wrong) => {})
			},
			//机构树
			getKey() {
				var url = this.basic_url + '/api-user/depts/tree';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data;
					this.treeData = this.transformTree(this.resourceData);
				});
			},
			transformTree(data){
				for(var i=0; i<data.length; i++){
					data[i].name = data[i].fullname;
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
			//表格传过来
			childvalue: function (childValue) {
		        // childValue就是子组件传过来的
		        this.selMenu = childValue;
		    },
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
				this.$refs.navsheader.showClick(childValue);
				this.selMenu = childValue
      		},
		},
		mounted() {
			this.requestData();
			this.getKey();
			if(this.$route.query.bizId != undefined) {
				this.getRouterData();
			}
			
		},
	}
</script>

<style scoped>

</style>