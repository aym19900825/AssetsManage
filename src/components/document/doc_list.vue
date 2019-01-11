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
									<el-input v-model="searchList.filename">
										<template slot="prepend">名称</template>
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
						<el-col class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="fileList" border :height="fullHeight" style="width: 100%;" :default-sort="{prop:'fileList', order: 'descending'}">
								<!-- <el-table-column type="selection" width="55" v-if="this.checkedName.length>0">
								</el-table-column> -->
								<el-table-column label="名称" sortable prop="filename" v-if="this.checkedName.indexOf('名称')!=-1">
								</el-table-column>
								<el-table-column label="状态" sortable width="200px" prop="filestatus" v-if="this.checkedName.indexOf('状态')!=-1">
								</el-table-column>
								<el-table-column label="上传时间" sortable width="200px" prop="uploadtime" v-if="this.checkedName.indexOf('上传时间')!=-1">
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
										<el-popover
											placement="top"
											trigger="click">
											<div style="text-align: right; margin: 0">
												<el-button size="mini" type="text" :disabled="fileAuth.fileread==0">显示</el-button>
												<el-button size="mini" type="text" :disabled="fileAuth.filedownload==0" @click="download(scope.row)">下载</el-button>
												<el-button size="mini" type="text" :disabled="fileAuth.fileedit==0">编辑</el-button>
												<el-button size="mini" type="text" :disabled="fileAuth.fileprint==0">打印</el-button>
												<el-button size="mini" type="text" :disabled="fileAuth.fileduplicate==0">复制</el-button>
												<el-button size="mini" type="text" :disabled="fileAuth.filedelete==0">删除</el-button>
											</div>
											<el-button @click="showDo(scope.row)" type="text" size="small" slot="reference">文件权限</el-button>
										</el-popover>
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
	export default {
		name: 'samples',//接样
		components: {
			vheader,
			navs_header,
			navs_left,
			tableControle,
			samplesmask,
		},
		data() {
			return {
				visible2: false,
				basic_url: Config.dev_url,
				file_url: Config.file_url,
				isShow: false,
				ismin: true,
				loadSign: true, //加载
				commentArr: {},
				checkedName: [
					'名称', 
					'状态',
					'大小',
					'上传时间'
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
						label: '上传时间',
						prop: 'uploadtime'
					}
				],
				companyId: '',
				deptId: '',
				selMenu: [],
				fileList: [],
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				search: false,
				show: false,
				down: true,
				up: false,
				searchList: {
					'filename': ''
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
				userParm: {},
				fileAuth: {
					filedelete: 0,
					filedownload: 0,
					fileduplicate: 0,
					fileedit: 0,
					fileprint: 0,
					fileread: 0,
					fileupload: 0,
				},
				fileAuthShow: false,
				samplesForm: {}//修改子组件时传递数据
			}
		},
		methods: {
			download(row){
				var url = row.filepath 
                        + '&userid=' + this.userParm.userid
                        + '&username=' + this.userParm.username
                        + '&deptid=' + this.userParm.deptid
                        + '&deptfullname=' + this.userParm.deptfullname;
                window.open(url); 
			},
			showDo(row){
				var data = {
					"userid": this.userParm.userid,
					"fileid": row.fileid
				};
				var url = this.file_url + '/file/privilege';
				this.$axios.post(url, data).then((res) => {
					this.fileAuth = res.data;
					console.log(this.fileAuth.fileread==0);
				}).catch((wrong) => {})
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
					userid: this.userParm.userid,
					filename: this.searchList.filename
				}
				var url = this.file_url + '/file/baseKeywordList';
				this.$axios.post(url, data).then((res) => {
					this.page.totalCount = res.data.total;
					this.fileList = res.data.vBaseKeywordFiles;
				}).catch((wrong) => {})
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
        		this.$refs.navsheader.showClick(childValue);
      		},
		},
		mounted() {// 在页面挂载前就发起请求
			var url = this.basic_url + '/api-user/users/currentMap';
			this.$axios.get(url, {}).then((res) => {//获取当前用户信息
				this.userParm.userid = res.data.id;
				this.userParm.username = res.data.username;
				this.userParm.deptid = res.data.deptId;
				this.userParm.deptName = res.data.deptName;
				this.requestData();
			}).catch((err) => {
				this.$message({
					message: '网络错误，请重试',
					type: 'error'
				});
			});
			
		},
	}
</script>

<style scope>
.p15 {padding:10px 15px;}
</style>