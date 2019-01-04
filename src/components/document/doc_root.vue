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
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button type="button" class="btn btn-green" @click="openAddMgr" id="">
                                	<i class="icon-add"></i>新建文件夹
                      			 </button>
								<button type="button" class="btn btn-green" id="">
                                	<i class="icon-add"></i>上传
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
					<!-- <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone> -->
					<!-- 高级查询划出 Begin-->
					<div v-show="search" class="pb10">
						<el-form status-icon :model="searchList" label-width="70px">
							<el-row :gutter="30" class="pb5">
								<el-col :span="7">
									<el-input v-model="searchList.V_NAME">
										<template slot="prepend">分类名称</template>
									</el-input>
								</el-col>
								<el-col :span="7">
									<el-input v-model="searchList.DESCRIPTION">
										<template slot="prepend">信息状态</template>
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
									<div class="pull-left pr20" v-if="ismin">文档树</div>
									<span class="pull-right navbar-minimalize minimalize-styl-2">
										<i class="icon-doubleok icon-double-angle-left blue"></i>
									</span>
								</div>
								<div class="left_treebg" :style="{height: fullHeight}">
									<div class="p15" v-if="ismin">
										<el-tree ref="tree" 
										 :render-content="renderContent" 
										 :load="loadNode"
										 lazy
										 :props="props"
										 class="filter-tree"  
										 node-key="id" 
										 default-expand-all 
										 @node-click="handleNodeClick">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="19" class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="samplesList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'samplesList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="文档目录编号" sortable width="140px" prop="DIRECTORY_NUM" v-if="this.checkedName.indexOf('样品编号')!=-1">
								</el-table-column>
								<el-table-column label="目录名称" sortable width="200px" prop="DIRECTORY_DESCRIPTION" v-if="this.checkedName.indexOf('样品类别')!=-1">
								</el-table-column>
								<el-table-column label="父级目录" sortable prop="PARENT" v-if="this.checkedName.indexOf('委托单位')!=-1">
								</el-table-column>
								<el-table-column label="信息状态" sortable prop="STATUS" v-if="this.checkedName.indexOf('生产单位')!=-1">
								</el-table-column>
								<el-table-column label="同步时间" sortable prop="SYNCHRONIZATION_TIME" v-if="this.checkedName.indexOf('样品名称')!=-1">
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
		<!-- <samplesmask  ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></samplesmask> -->
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
	import samplesmask from'../samplesDetails/samples_mask.vue'
	import vueDropzone from 'vue2-dropzone'
	import 'vue2-dropzone/dist/vue2Dropzone.min.css'
	export default {
		name: 'samples',//接样
		components: {
			vheader,
			navs_header,
			navs_left,
			tableControle,
			samplesmask,
			vueDropzone
		},
		data() {
			return {
				props: {
					label: 'name',
					children: 'zones'
				},
				//上传初始化参数
				dropzoneOptions: {
					url: 'https://httpbin.org/post',
					thumbnailWidth: 150,
					maxFilesize: 0.5,
					addRemoveLinks: true,
					headers: { "My-Awesome-Header": "header value" },
					dictDefaultMessage: "<i class='el-icon-upload'></i>点击上传"
				},
				file_url: Config.file_url,
				basic_url: Config.dev_url,
				isShow: false,
				ismin: true,
				loadSign: true, //加载
				commentArr: {},
				checkedName: [
					'CLASSFICATION',
					'样品类别',
					'委托单位',
					'生产单位',
					'样品名称',
					'型号',
					'数量',
					'收样人',
					'收样日期',
					'接样人',
					'接样日期',
					'状态',
					'信息状态',
				],
				tableHeader: [{
						label: '样品编号',
						prop: 'ITEMNUM'
					},
					{
						label: '样品类别',
						prop: 'TYPE'
					},
					{
						label: '委托单位',
						prop: 'P_NAME'
					},
					{
						label: '生产单位',
						prop: 'P_NAME'
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
						prop: 'QUATITY'
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
				samplesList: [],
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				search: false,
				show: false,
				down: true,
				up: false,
				searchList: {
					'CLASSFICATION': '',
					'STATUS': ''
				},
				//tree树菜单
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {//树菜单数据
					children: "subDepts",
					label: "fullname"
				},
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
				return(
					<span>
		              <i class={data.iconClass}></i>
		              <span>{node.label}</span>
		            </span>
				);
			},
			//生产单位树
			loadNode(node, resolve) {
				// let that = this;
				// var url = this.file_url + '/file/pathList';
				// this.$axios.post(url, {
				// 	'pathid': 0
				// }).then((res) => {
				// 	var pathList = res.data.pathList;
				// 	for(var i=0; i<pathList.length; i++){
				// 		pathList[i].label = pathList[i].foldername;
				// 	}
				// 	return resolve(pathList);
				// });
				if (node.level === 0) {
					return resolve([{ name: 'region1' }, { name: 'region2' }]);
				}
				if (node.level > 3) return resolve([]);
				var hasChild;
				if (node.data.name === 'region1') {
					hasChild = true;
				} else if (node.data.name === 'region2') {
					hasChild = false;
				} else {
					hasChild = Math.random() > 0.5;
				}

				setTimeout(() => {
					var data;
					if (hasChild) {
						data = [{
							name: 'zone' + this.count++
						}, {
							name: 'zone' + this.count++
						}];
					} else {
						data = [];
					}

					resolve(data);
				}, 500);
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
					this.$refs.child.detail(this.selMenu[0].ID);
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
					var url = this.basic_url + '/api-apps/app/item/deletes';
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
			SelChange(val) {//选中值后赋值给一个自定义的数组：selMenu
				this.selMenu = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					CLASSFICATION: this.searchList.CLASSFICATION,//委托单位名称
					STATUS: this.searchList.STATUS,//样品名称
				}
				var url = this.basic_url + '/api-apps/app/item';
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
			//生产单位树
			getKey() {
				let that = this;
				var url = this.file_url + '/file/pathList';
				this.$axios.post(url, {
					'pathid': 0
				}).then((res) => {
					this.resourceData = res.data;
				});
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
			// this.upload();
		},
	}
</script>

<style scope>
.p15 {padding:10px 15px;}
</style>