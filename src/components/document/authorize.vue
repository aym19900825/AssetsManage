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
						<el-form :model="searchList" label-width="70px">
							<el-row :gutter="30" class="pb5">
								<el-col :span="7">
									<el-input v-model="searchList.username">
										<template slot="prepend">姓名</template>
									</el-input>
								</el-col>
								
								<!-- <el-col :span="7">
									<el-input v-model="searchList.keywordidDesc">
										<template slot="prepend">关键字</template>
										</el-input>
								</el-col> -->
								<el-col :span="3">
									<el-button type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->
						<el-col class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="samplesList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'samplesList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="姓名" sortable width="140px" prop="username" v-if="this.checkedName.indexOf('姓名')!=-1">
								</el-table-column>
								<el-table-column label="关键字" sortable prop="keywordidDesc" v-if="this.checkedName.indexOf('关键字')!=-1">
								</el-table-column>
								<el-table-column label="查看" sortable prop="fileread" v-if="this.checkedName.indexOf('查看')!=-1">
									<template slot-scope="scope">
										<i :class="scope.row.fileread==1?'el-icon-check':''"></i>
									</template>
								</el-table-column>
								<el-table-column label="编辑" sortable prop="fileedit" v-if="this.checkedName.indexOf('编辑')!=-1">
									<template slot-scope="scope">
										<i :class="scope.row.fileedit==1?'el-icon-check':''"></i>
									</template>
								</el-table-column>
								<el-table-column label="删除" sortable prop="filedelete" v-if="this.checkedName.indexOf('删除')!=-1">
									<template slot-scope="scope">
										<i :class="scope.row.filedelete==1?'el-icon-check':''"></i>
									</template>
								</el-table-column>
								<!-- <el-table-column label="上传" sortable prop="fileupload" v-if="this.checkedName.indexOf('上传')!=-1">
									<template slot-scope="scope">
										<i :class="scope.row.fileupload==1?'el-icon-check':''"></i>
									</template>
								</el-table-column> -->
								<el-table-column label="下载" sortable prop="filedownload" v-if="this.checkedName.indexOf('下载')!=-1">
									<template slot-scope="scope">
										<i :class="scope.row.filedownload==1?'el-icon-check':''"></i>
									</template>
								</el-table-column>
								<el-table-column label="打印" sortable prop="fileprint" v-if="this.checkedName.indexOf('打印')!=-1">
									<template slot-scope="scope">
										<i :class="scope.row.fileprint==1?'el-icon-check':''"></i>
									</template>
								</el-table-column>
								<el-table-column label="复制" sortable prop="fileduplicate" v-if="this.checkedName.indexOf('复制')!=-1">
									<template slot-scope="scope">
										<i :class="scope.row.fileduplicate==1?'el-icon-check':''"></i>
									</template>
								</el-table-column>
							</el-table>
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<authmask  ref="child" @request="requestData" :detailData="selMenu[0]"></authmask>
		<!--右侧内容显示 End-->
	</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import authmask from'./auth_mask.vue'
	export default {
		name: 'samples',//接样
		components: {
			vheader,
			navs_header,
			navs_left,
			tableControle,
			authmask,
		},
		data() {
			return {
				basic_url: Config.dev_url,
				isShow: false,
				ismin: true,
				loadSign: true, //加载
				commentArr: {},
				checkedName: [
					'姓名',
					'关键字',
					'查看',
					'删除',
					// '上传',
					'下载',
					'复制',
					'编辑',
					'打印',
				],
				tableHeader: [{
						label: '姓名',
						prop: 'username'
					},
					{
						label: '关键字',
						prop: 'keywordidDesc'
					},
					{
						label: '查看',
						prop: 'fileread'
					},
					{
						label: '删除',
						prop: 'filedelete'
					},
					// {
					// 	label: '上传',
					// 	prop: 'fileupload'
					// },
					{
						label: '下载',
						prop: 'filedownload'
					},
					{
						label: '复制',
						prop: 'fileduplicate'
					},
					{
						label: '编辑',
						prop: 'fileedit'
					},
					{
						label: '打印',
						prop: 'fileprint'
					}
				],
				companyId: '',
				deptId: '',
				selMenu: [],
				samplesList: [],
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				search: false,
				show: false,
				down: true,
				up: false,
				searchList: {
					keywordidDesc: '',
					username: ''
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
				samplesForm: {}//修改子组件时传递数据
			}
		},
		methods: {
			renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
				return (<span><i class={data.iconClass}></i><span>{node.label}</span></span>)
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
				this.$refs.child.visible();
			},
			//修改用戶
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
					var url = this.basic_url + '/api-apps/app/tbKeywordPrivilege2/deletes';
					//changeMenu为勾选的数据
					var changeMenu = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for (var i = 0; i < changeMenu.length; i++) {
						deleteid.push(changeMenu[i].id);
					}
					//ids为deleteid数组用逗号拼接的字符串
					ids = deleteid.toString(',');
                    var data = {
						ids: ids,
					}
					this.$confirm('确定删除这些数据吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        this.$axios.delete(url, {params: data}).then((res) => {//.delete 传数据方法
							if(res.data.resp_code == 0) {
								this.$message({
									message: '删除成功',
									type: 'success'
								});
								this.requestData();
							}else{
								this.$message({
									message: res.data.code_msg,
									type: 'success'
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
			SelChange(val) {//选中值后赋值给一个自定义的数组：selMenu
				this.selMenu = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					username: this.searchList.username,
					keywordidDesc: this.searchList.keywordidDesc
				}
				var url = this.basic_url + '/api-apps/app/tbKeywordPrivilege2';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;
					this.samplesList = res.data.data;
				}).catch((wrong) => {})
				
			},
			
			formatter(row, column) {
				return row.enabled;
			},
			//生产单位树
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
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
      		},
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