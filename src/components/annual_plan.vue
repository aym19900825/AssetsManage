<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header ref="navsheader"></navs_header>
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
								<!-- <button type="button" class="btn btn-primarys button-margin">
								    <i class="icon-edit"></i>编辑
								</button> -->
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
					<el-row :gutter="10">
						<el-col :span="5" class="lefttree">
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
						<el-col :span="19" class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :header-cell-style="rowClass" :data="userList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange">
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
								</el-table-column>
								<!-- <el-table-column label="录入人" sortable width="210px" prop="ENTERBY" v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column> -->
								<el-table-column label="录入时间" sortable width="100px" prop="ENTERDATE" v-if="this.checkedName.indexOf('录入时间')!=-1" :formatter="dateFormat">
								</el-table-column>
								<el-table-column label="修改时间" sortable width="100px" prop="ENTERDATE" v-if="this.checkedName.indexOf('修改时间')!=-1" :formatter="dateFormat">
								</el-table-column>
								<el-table-column label="编辑状态" sortable width="100px" prop="STATUSDesc" v-if="this.checkedName.indexOf('编辑状态')!=-1">
								</el-table-column>
								<el-table-column label="执行状态" sortable  width="120px" prop="LEADER_STATUSDesc" v-if="this.checkedName.indexOf('执行状态')!=-1">
								</el-table-column>
								<el-table-column label="类型" sortable  width="100px" prop="TYPE" v-if="this.checkedName.indexOf('类型')!=-1">
								</el-table-column>
								<el-table-column label="提报日期" sortable prop="REPORTDATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('提报日期')!=-1">
								</el-table-column>
								<!-- <el-table-column label="信息状态" sortable  width="380px" prop="STATUS" v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column> -->
							</el-table>
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0"
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
		</div>
	</div>
</template>
<script>
	import Config from '../config.js'
	import vheader from './common/vheader.vue'
	import navs_left from './common/left_navs/nav_left5.vue'
	import navs_header from './common/nav_tabs.vue'
	import annualmask from './common/annual_mask.vue'
	import assetsTree from './plugin/vue-tree/tree.vue'
	export default {
		name: 'annual_plan',
		components: {
			'vheader': vheader,
			'navs_header': navs_header,
			'navs_left': navs_left,
			'v-assetsTree': assetsTree,
			'annualmask': annualmask
		},
		data() {
			return {
				basic_url: Config.dev_url,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				checkedName: [
					'编号',
					'描述',
					'年度',
					// '录入人',
					'录入时间',
					// '信息状态'
					'修改时间',
					'编辑状态',
					'执行状态',
					'类型',
					'提报日期',

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
					// {
					// 	label: '录入人',
					// 	prop: 'ENTERBY'
					// },
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
						label: '修改时间',
						prop: 'CHANGEDATE'
					},
					{
						label: '编辑状态',
						prop: 'STATUSDesc'
					},
					{
						label: '执行状态',
						prop: 'LEADER_STATUSDesc'
					},
					{
						label: '类型',
						prop: 'TYPE'
					},
					{
						label: '提报日期',
						prop: 'REPORTDATE'
					}
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
				//tree
				resourceData: [
					{label: '监督抽查'},
					{label: '质量抽查'}
				], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					label: "label"
				},
				treeData: [],
				userData:[],
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
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
					WP_NUM: '',
					DESCRIPTION: '',
					TYPE: '',
					YEAR: '',
					ENTERDATE:'',
					ENTERBY:'',
					STATUS:'',
					LEADER_STATUS:''
				};
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加用戶
			openAddMgr() {
				// this.$refs.child.resetNew();
				this.$refs.child.visible();
			},
			//修改用戶
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
                        	console.log(res.data);
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
				console.log(this.searchList.STATUS);
				console.log(this.searchList.ENTERDATE);
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
					console.log(res.data);
					for(var i=0;i<res.data.data.length;i++){
						if(res.data.data[i].TYPE  == '1'){
							res.data.data[i].TYPE  = '监督抽查';
						}else if(res.data.data[i].TYPE  == '3'){
							res.data.data[i].TYPE  = '质量抽查';
						}
					}
					this.userList = res.data.data;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})

				// this.userList.forEach((item, index) => {
				// 	var id = item.id;
				// 	this.$axios.get('/users/' + id + '/roles', data).then((res) => {
				// 		this.userList.role = res.data.roles[0].name;
				// 	}).catch((wrong) => {})
				// })
			},
			//机构树
			// getKey() {
			// 	let that = this;
			// 	var url = this.basic_url + '/api-user/depts/tree';
			// 	this.$axios.get(url, {}).then((res) => {
			// 		this.resourceData = res.data;
			// 		this.treeData = this.transformTree(this.resourceData);
			// 	});
			// },
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
				console.log(data);
				console.log(data.label);
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
        		this.$refs.navsheader.showClick(childValue);
      		},
		},
		mounted() {
			this.requestData();	
		},
	}
</script>

<style scoped>

</style>