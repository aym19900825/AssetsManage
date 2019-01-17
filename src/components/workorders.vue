<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header ref="navsheader"></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单内容显示 Begin-->
			<div style="display:none;">
			 	<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
			</div> 	
			<!--左侧菜单内容显示 End-->
			<div class="wrapper wrapper-content wrapperall">
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
								<el-col :span="3">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
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
							<el-table :header-cell-style="rowClass" :data="userList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="工作任务单编号" sortable width="140px" prop="WONUM" v-if="this.checkedName.indexOf('工作任务单编号')!=-1">
									<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row.ID)>{{scope.row.WONUM}}
										</p>
									</template>	
								</el-table-column>
								<el-table-column label="样品名称" sortable width="180px" prop="ITEM_NAME" v-if="this.checkedName.indexOf('样品名称')!=-1">
								</el-table-column>
								<el-table-column label="样品型号" sortable width="180px" prop="ITEM_MODEL" v-if="this.checkedName.indexOf('样品型号')!=-1">
								</el-table-column>
								<el-table-column label="样品状态" sortable  width="100px" prop="ITEM_STATUS" v-if="this.checkedName.indexOf('样品状态')!=-1">
								</el-table-column>
								<el-table-column label="抽样方案/判定依据" sortable width="200px" prop="CHECK_BASIS" v-if="this.checkedName.indexOf('抽样方案/判定依据')!=-1">
								</el-table-column>
								<el-table-column label="完成日期" sortable  width="100px" :formatter="dateFormat" prop="COMPLETE_DATE" v-if="this.checkedName.indexOf('完成日期')!=-1">
								</el-table-column>
								<el-table-column label="完成方式" sortable  width="100px" prop="COMPLETE_MODE" v-if="this.checkedName.indexOf('完成方式')!=-1">
								</el-table-column>
								<el-table-column label="委托书编号" sortable  width="120px" prop="PROXYNUM" v-if="this.checkedName.indexOf('委托书编号')!=-1">
								</el-table-column>
								<!-- <el-table-column label="信息状态" sortable width="100px" prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column> -->
								<!-- <el-table-column label="录入人" sortable width="210px" prop="ENTERBY" v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column> -->
								<el-table-column label="录入时间" sortable width="210px" :formatter="dateFormat" prop="ENTERDATE" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0"
					            @size-change="sizeChange"
					            @current-change="currentChange"
					            :current-page="page.currentPage"
					            :page-sizes="[10, 20, 30, 40]"
					            :page-size="page.pageSize"
					            layout="total, sizes, prev, pager, next" :total="page.totalCount">
					        </el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
					</div>
				</div>
			</div>
			<workorders_mask :workorderForm="workorderForm" ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></workorders_mask>
		</div>
	</div>
</template>
<script>
	import Config from '../config.js'
	import vheader from './common/vheader.vue'
	import navs_left from './common/left_navs/nav_left5.vue'
	import navs_header from './common/nav_tabs.vue'
	import workorders_mask from './common/workorders_mask.vue'
	export default {
		name: 'workorders',
		components: {
			vheader,
			navs_header,
			navs_left,
			workorders_mask
		},
		data() {
			return {
				basic_url: Config.dev_url,
				ismin: true,
				loadSign:true,//加载
				commentArr:{},
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				checkedName: [
					'工作任务单编号',
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
						var url = this.basic_url + '/api-apps/app/inspectPro/flow/isExecute/' + this.selMenu[0].ID;
						this.$axios.get(url, {}).then((res) => {
							if(res.data.resp_code == 0) {
								var url = this.basic_url + '/api-apps/app/inspectPro/flow/isPromoterNode/' + this.selMenu[0].ID;
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
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/workorder/deletes';
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
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,

					WONUM: this.searchList.WONUM,
					ITEM_NAME: this.searchList.ITEM_NAME,
					PROXYNUM: this.searchList.PROXYNUM,
					STATE: this.searchList.STATE,
					COMPLETE_DATE: this.searchList.COMPLETE_DATE,
					ENTERBY: this.searchList.ENTERBY,
					ENTERDATE: this.searchList.ENTERDATE,
				}
				var url = this.basic_url + '/api-apps/app/workorder';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					console.log(res)
					this.page.totalCount = res.data.count;	
					//总的页数
					this.userList=res.data.data;
					let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
					if(this.page.currentPage >= totalPage){
						 this.loadSign = false
					}else{
						this.loadSign=true
					}
					this.commentArr[this.page.currentPage]=res.data.data
					let newarr=[]
					for(var i = 1; i <= totalPage; i++){
					
						if(typeof(this.commentArr[i])!='undefined' && this.commentArr[i].length>0){
							
							for(var j = 0; j < this.commentArr[i].length; j++){
								newarr.push(this.commentArr[i][j])
							}
						}
					}
					console.log(newarr);
					this.userList = newarr;
					console.log(this.userList);
					
				}).catch((wrong) => {})
			},
			//机构树
			getKey() {
				let that = this;
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
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
      		},
		},
		mounted() {
			this.requestData();
			this.getKey();

			
		},
	}
</script>

<style scoped>

</style>