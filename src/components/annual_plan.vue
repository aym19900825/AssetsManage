<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单调用 Begin-->
			<!-- <navs_left></navs_left> -->
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
								<button type="button" class="btn btn-bule button-margin" @click="modify">
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
				<div v-show="search" class="pb10">
					<el-form status-icon :model="searchList" label-width="70px">
						<el-row :gutter="10">
							<el-col :span="5">
								<el-input v-model="searchList.WP_NUM">
									<template slot="prepend">计划编号</template>
								</el-input>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.DESCRIPTION">
									<template slot="prepend">描述</template>
								</el-input>
							</el-col>
							<el-col :span="5">
								<el-select v-model="searchList.TYPE" placeholder="类型">
								      <el-option label="监督审查" value="1">	
								      </el-option>
								      <el-option label="质量抽查" value="0">
								      </el-option>
								    </el-select>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.YEAR">
									<template slot="prepend">年度</template>
								</el-input>
							</el-col>
						</el-row>
						<el-row :gutter="10" class="pt5">
							<el-col :span="5">
								<div class="block">
								    <el-date-picker
								      v-model="searchList.ENTERDATE"
								      type="date"
								      placeholder="录入时间">
								    </el-date-picker>
								  </div>
							</el-col>
							<el-col :span="5">
								<el-select v-model="searchList.ENERBY" placeholder="录入人">
								    <el-option label="张强" value="1"></el-option>
								    <el-option label="贾庆林" value="0"></el-option>
								    <el-option label="李国富" value="0"></el-option>
								</el-select>
							</el-col>
							<el-col :span="5" style="padding-top: 3px">
								<el-select v-model="searchList.STATUS" placeholder="信息状态">
								    <el-option label="草稿" value="1"></el-option>
								    <el-option label="审批中" value="0"></el-option>
								    <el-option label="驳回" value="0"></el-option>
								    <el-option label="已发布" value="0"></el-option>
								    <el-option label="已取消" value="0"></el-option>
								</el-select>
							</el-col>
							<el-col :span="5">
								<el-button class="pull-right" type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 高级查询划出 End-->
					
					<el-row :gutter="10">
						<el-col :span="5" class="lefttree">
							<div class="lefttreebg">
								<div class="left_tree_title clearfix" @click="min3max()">
									<div class="pull-left pr20" v-if="ismin">组织机构</div>
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
							<el-table :data="userList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="计划编号" sortable width="100px" prop="WP_NUM" v-if="this.checkedName.indexOf('计划编号')!=-1">
								</el-table-column>
								<el-table-column label="计划描述" sortable width="200px" prop="DESCRIPTION" v-if="this.checkedName.indexOf('计划描述')!=-1">
								</el-table-column>
								<el-table-column label="年度" sortable width="100px" prop="YEAR" v-if="this.checkedName.indexOf('年度')!=-1">
								</el-table-column>
								</el-table-column>
								<el-table-column label="录入人" sortable width="210px" prop="ENTERBY" v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column>
								<el-table-column label="录入时间" sortable width="210px" prop="ENTERDATE" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<el-table-column label="信息状态" sortable  width="380px" prop="STATUS" v-if="this.checkedName.indexOf('信息状态')!=-1">
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
			<annualmask ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></annualmask>
		</div>
	</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs_left from './common/left_navs/nav_left2.vue'
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
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				checkedName: [
					'计划编号',
					'计划描述',
					'年度',
					'录入人',
					'录入时间',
					'信息状态'
				],
				tableHeader: [
					{
						label: '计划编号',
						prop: 'WP_NUM'
					},
					{
						label: '计划描述',
						prop: 'DESCRIPTION'
					},
					{
						label: '年度',
						prop: 'YEAR'
					},
					{
						label: '录入人',
						prop: 'ENTERBY'
					},
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
						label: '信息状态',
						prop: 'STATUS'
					}
				],

				companyId: '',
				deptId: '',
				selUser: [],
				'启用': true,
				'冻结': false,
				'男': true,
				'女': false,
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
					STATUS:''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				treeData: [],
				userData:[],
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				aaaData:[],
			}
		},
	methods: {
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
				this.aaaData = this.selUser;
				if(this.aaaData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.aaaData.length > 1) {
					this.$message({
						message: '不可同时修改多个用户',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail(this.selUser[0].ID);
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
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = '/api/api-apps/app/workplan/deletes';
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
			
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				// return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");  
			},
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					WP_NUM: this.searchList.WP_NUM,
					DESCRIPTION: this.searchList.DESCRIPTION,
					TYPE: this.searchList.TYPE,
					YEAR: this.searchList.YEAR,
					ENTERDATE:this.searchList.ENTERDATE,
					ENTERBY:this.searchList.ENTERBY,
					STATUS:this.searchList.STATUS
				}
				var url = '/api/api-apps/app/workplan';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.userList = res.data.data;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
				this.userList.forEach((item, index) => {
					var id = item.id;
					this.$axios.get('/users/' + id + '/roles', data).then((res) => {
						this.userList.role = res.data.roles[0].name;
					}).catch((wrong) => {})
				})
			},
			//机构树
			getKey() {
				let that = this;
				var url = '/api/api-user/depts/tree';
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
			}
		},
		mounted() {
			this.requestData();
			this.getKey();

			
		},
	}
</script>

<style scoped>

</style>