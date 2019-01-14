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
								<form method="post" id="file" action="" enctype="multipart/form-data" style="float: left;">
									<button style="margin-right: 4px;" type="button" class="btn btn-green a-upload">
										<i class="icon-add"></i>上传
										<input id="excelFile" type="file" name="uploadFile" @change="upload"/>
									</button>
								</form>
								<button type="button" class="btn btn-green" @click="showDir" id="">
                                	<i class="icon-add"></i>新建文件夹
                      			 </button>
								<!-- <button type="button" class="btn btn-blue button-margin" @click="modify">
								    <i class="icon-edit"></i>修改文件夹
								</button> -->
								<button type="button" class="btn btn-red button-margin" @click="delDir">
								    <i class="icon-trash"></i>删除文件夹
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
						<el-form :model="searchList" label-width="70px">
							<el-row :gutter="30" class="pb5">
								<el-col :span="7">
									<el-input v-model="searchList.appname">
										<template slot="prepend">应用名称</template>
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
									<div class="pull-left pr20" v-if="ismin">文件树</div>
									<span class="pull-right navbar-minimalize minimalize-styl-2">
										<i class="icon-doubleok icon-double-angle-left blue"></i>
									</span>
								</div>
								<div class="left_treebg" :style="{height: fullHeight}">
									<div class="p15" v-if="ismin">
										<el-tree ref="tree" 
										 :render-content="renderContent" 
										 :load="loadNode"
										 node-key="id"
										 lazy
										 :props="props"
										 @node-click="handleNodeClick">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="19" class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="fileList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'fileList', order: 'descending'}" @selection-change="SelChange">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="名称" sortable prop="filename" v-if="this.checkedName.indexOf('名称')!=-1">
								</el-table-column>
								<el-table-column label="应用" sortable prop="appname" v-if="this.checkedName.indexOf('应用')!=-1">
								</el-table-column>
								<el-table-column label="状态" sortable width="200px" prop="filestatus" v-if="this.checkedName.indexOf('状态')!=-1">
								</el-table-column>
								<el-table-column label="大小" sortable  width="140px" prop="filesize" v-if="this.checkedName.indexOf('大小')!=-1">
									<template slot-scope="scope">
										<span v-text="scope.row.filesize+'M'"></span>
									</template>
								</el-table-column>
								<el-table-column
									fixed="right"
									label="操作"
									width="200">
									<template slot-scope="scope">
										<el-button @click="showAuth(scope.row)" type="text" size="small">关键字</el-button>
										<el-button @click="delFile(scope.$index,scope.row,)" type="text" size="small">删除</el-button>
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
		<!-- <samplesmask  ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></samplesmask> -->
		<!--右侧内容显示 End-->
		<el-dialog title="文件夹" :visible.sync="dirDialog">
			<el-form :model="dir" label-width="80px">
				<el-form-item label="名称">
					<el-input v-model="dir.dirName"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetDir">取 消</el-button>
				<el-button type="primary" @click="addDir">确 定</el-button>
			</div>
		</el-dialog>
		<vkeyword ref="keyword" :param="param"></vkeyword>
		<vchoose ref="choose" :chooseParam = "chooseParam" @tranFormData = 'getChoose'></vchoose>
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
	import vkeyword from '../common/keyword.vue'
	import vchoose from '../common/dataChoose.vue'
	export default {
		name: 'samples',//接样
		components: {
			vheader,
			navs_header,
			navs_left,
			tableControle,
			samplesmask,
			vueDropzone,
			vkeyword,
			vchoose
		},
		data() {
			return {
				chooseParam: {
					selShow: false,
					visible: false,
					title: "用户列表",
					listName: 'user',
					selMax: 1,
					tableHeader: [
						{
							propName: 'username',
							labelName: '用户姓名'
						},
						{
							propName: 'deptName',
							labelName: '组织机构'
						}

					],
					search: [
						{
							name: 'deptId',
							val: ''
						}
					],
					url: '/api-user/users'
				},
				param: {
					visible: false,
				},
				resolve: function(){},
				node: {},
				parentNode: {},
				dirDialog: false,
				dir: {
					'dirName': ''
				},
				defaultKey: [],
				props: {
					label: 'name',
					children: 'zones',
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
					'名称', 
					'状态',
					'大小',
					'应用'
				],
				tableHeader: [{
						label: '名称',
						prop: 'filename'
					},
					{
						label: '状态',
						prop: 'filestatus'
					},
					{
						label: '大小',
						prop: 'filesize'
					},
					{
						label: '应用',
						prop: 'appname'
					}
				],
				companyId: '',
				selMenu: [],
				fileList: [],
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				search: false,
				show: false,
				down: true,
				up: false,
				searchList: {
					'appname': ''
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
				deptId: 0,
				docId: 0,
				docParm: {
					'userid': '',
					'username': '',
					'deptid': '',
					'deptfullname': '',
				},
				samplesForm: {}//修改子组件时传递数据
			}
		},
		methods: {
			delFile(index,row){
				var url = this.file_url + '/file/deleteFile/' + row.fileid;
                this.$axios.delete(url,{}).then((res) => {
                    if(res.data.code == 1){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
						});
						this.fileList.splice(index, 1);
                    }else{
                        this.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    this.$message({
                        message: '网络错误，请重试',
                        type: 'error'
                    });
                });
			},
			showAuth(row){
				this.chooseParam = {
					title: "关键字列表",
					selShow: true,
					listName: 'keywordList',
					selMax: 1000,
					tableHeader: [
						{
							propName: 'categoryidDesc',
							labelName: '类别'
						},
						{
							propName: 'keywordname',
							labelName: '关键字'
						}
					],
					search: [],
					url: '/api-apps/app/tbKeyword2'
				};
				this.$refs.choose.getData('new',this.chooseParam);
				// this.param.fileid = row.fileid;
				// this.$refs.keyword.requestData();
			},
			getChoose(){

			},
			resetDir(){
				this.dir.dirName = '';
				this.dirDialog = false;
			},
			showDir(){
				this.dirDialog = true;
			},
			addDir(){
				var url = this.file_url + '/file/createPath';
				this.$axios.post(url, {
					"parentid": this.docId,
					"foldername": this.dir.dirName,
					"deptid": this.docParm.deptid
				}).then((res)=>{
					this.resetDir();
					if(res.data.code == 0){
						this.$message({
							message: res.data.message,
							type: 'error'
						});
					}else{
						this.$message({
							message: '新建成功',
							type: 'success'
						});
						this.loadThisNode();
					}
				})
			},
			loadThisNode(){
				var url = this.file_url + '/file/pathList';
				this.$axios.post(url, {
					'pathid': this.docId,
					'deptid': this.docParm.deptid
				}).then((res) => {
					this.fileList = res.data.fileList.fileList;
					var pathList = res.data.pathList;
					for(var i=0; i<pathList.length; i++){
						pathList[i].name = pathList[i].foldername;
					}
					this.loadNode(this.node, this.resolve, 'loadThisNode' , pathList);
				});
			},
			upload(e){
				var formData = new FormData();
				formData.append('files', document.getElementById('excelFile').files[0]);
				var config = {
					//添加请求头
					headers: { "Content-Type": "multipart/form-data" },
					//添加上传进度监听事件
					onUploadProgress: e => {
						var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
						this.progress = completeProgress;
					}
				};
				var url = this.file_url + '/file/uploadfile?userid=' 
						+ this.docParm.userid 
						+ '&username=' + this.docParm.username
						+ '&deptid=' + this.docParm.deptid
						+ '&deptfullname=' + this.docParm.deptfullname
						+ '&pathid=' + this.docId
				this.$axios.post(url, formData, config
				).then((res)=>{
					if(res.data.code == 0){
						this.$message({
							message: res.data.message,
							type: 'error'
						});
					}else{
						this.$message({
							message: '文档已成功上传至服务器',
							type: 'success'
						});
						this.getFileList();
					}
				})
			},
			renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
				return (<span><i class={data.iconClass}></i><span>{node.label}</span></span>)
			},
			handleNodeClick(data){
				this.page.currentPage = 1;
				this.docId = data.id;
				this.node = data;
				this.parentNode = data.parent;
				this.getFileList();
			},
			getFileList(){
				var url = this.file_url + '/file/pathList';
				this.$axios.post(url, {
					'pathid': this.docId,
					'deptid': this.docParm.deptid,
					'page': this.page.currentPage - 1,
					'size': this.page.pageSize,
					'appname': this.searchList.appname
				}).then((res) => {
					this.fileList = res.data.fileList.fileList;
					this.page.totalCount = res.data.fileList.total;
				});
			},
			getUser(){//获取当前用户信息
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url, {}).then((res) => {//获取当前用户信息
					this.docParm.userid = res.data.id;
					this.docParm.username = res.data.username;
					this.docParm.deptid = res.data.deptId;
					this.docParm.deptfullname = res.data.deptName;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			loadNode(node, resolve, opt, param) {
				if(opt == 'loadThisNode'){
					var pathList = param;
					return this.resolve(pathList);
				}
				this.resolve = resolve;
				this.node = node;
				let that = this;
				var url = that.file_url + '/file/pathList';
				var pathid = 2;
				console.log(node);
				if(node.level === 0){
					pathid = 0;
				}else{
					pathid = node.data.id || node.id;
				}
				if(that.deptId == 0){
					setTimeout(function(){
						that.$axios.post(url, {
							'pathid': pathid,
							'deptid': that.docParm.deptid
						}).then((res) => {
							that.fileList = res.data.fileList.fileList;
							that.page.totalCount = res.data.fileList.total;
							var pathList = res.data.pathList;
							for(let i=0; i<pathList.length; i++){
								pathList[i].id =  pathList[i].pathid;
								pathList[i].name = pathList[i].foldername;
							}
							return resolve(pathList);
						});
					}, 1000);
				}else{
					that.$axios.post(url, {
						'pathid': pathid,
						'deptid': that.deptId.deptid
					}).then((res) => {
						that.fileList = res.data.fileList.fileList;
						var pathList = res.data.pathList;
						for(var i=0; i<pathList.length; i++){
							pathList[i].name = pathList[i].foldername;
							pathList[i].id =  pathList[i].pathid;
						}
						return resolve(pathList);
					});
				}
				
			},
			nodeClick(m) {
				if(m.iconClass != 'icon-file-text') {
					if(m.iconClass == 'icon-file-normal') {
						m.iconClass = 'icon-file-open';
					} else {
						m.iconClass = 'icon-file-normal';
					}
				}
				// this.handleNodeClick();
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
			tableControle(data) {//控制表格列显示隐藏
				this.checkedName = data;
			},
			sizeChange(val) {//分页，总页数
				this.page.pageSize = val;
				this.getFileList();
			},
			currentChange(val) {//分页，当前页
				this.page.currentPage = val;
				this.getFileList();
			},
			searchinfo(index) {//高级查询
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.getFileList();
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
			delDir() {
				var url = this.file_url + '/file/deletePath/' + this.docId;
				this.$confirm('确定删除此文件夹吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({ value }) => {
					this.$axios.delete(url, {}).then((res) => {
						if(res.data.code == 1) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.loadNode(this.parentNode,this.resolve);
						}else{
							this.$message({
								message: res.data.message,
								type: 'error'
							});
						}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
				}).catch(() => {});
			},
			SelChange(val) {//选中值后赋值给一个自定义的数组：selMenu
				this.selMenu = val;
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
        		this.$refs.navsheader.showClick(childValue);
      		},
		},
		created() {// 在页面挂载前就发起请求
			this.getUser();
		},
	}
</script>

<style scope>
.p15 {padding:10px 15px;}
.a-upload input{
	position: absolute;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    width: 65px;
    left: 0px;
    height: 40px;
}
.upload-btn{
    color: #fff;
    background-color: #286090;
    border-radius: 4px;
    padding: 4px 10px;
    width: 85px;
    height: 34px;
    line-height: 28px;
    border: none;
}
</style>