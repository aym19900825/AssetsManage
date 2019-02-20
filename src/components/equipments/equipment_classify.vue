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
			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<!--按钮操作行 Begin-->
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
							<div class="keep-open btn-group" title="列">
								<el-dropdown :hide-on-click="false" class="pl10 btn btn-default btn-outline">
									<span class="el-dropdown-link">
										<font class="J_tabClose"><i class="icon-menu3"></i></font>
										<i class="el-icon-arrow-down icon-arrow2-down"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-checkbox-group v-model="checkedName" @change="changeCheckedName">
											<el-dropdown-item  v-for="(item,index) in columns" :key="index">
												<el-checkbox :label="item.text" name="type"></el-checkbox>
											</el-dropdown-item>
										</el-checkbox-group>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
					<!--按钮操作行 End-->

					<!-- 高级查询划出 Begin-->
					<div v-show="search">
						<el-form :model="searchList" label-width="45px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="编码" prop="CLASSIFY_NUM">
										<el-input v-model="searchList.CLASSIFY_NUM"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="分类描述" prop="CLASSIFY_DESCRIPTION" label-width="80px">
										<el-input v-model="searchList.CLASSIFY_DESCRIPTION"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="父级分类" prop="PARENTDesc" label-width="80px">
										<el-input v-model="searchList.PARENTDesc"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
									<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;margin-left: 2px">重置</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->
					<el-row :gutter="0">
						<el-col :span="24">
							 <tree_grid :columns="columns" :tree-structure="true" :loading="loading" :data-source="categoryList" v-on:childByValue="classByValue"></tree_grid>

							<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
						</el-col>
					</el-row>
				</div>
			</div>
			<!--右侧内容显示 End-->
			<categorymask :CATEGORY="CATEGORY" ref="categorymask" @request="requestData" @reset="reset" v-bind:page=page></categorymask>
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_header from '../common/nav_tabs.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import categorymask from '../equipmentsDetails/equipmentClassify_mask.vue'
    import tree_grid from '../common/TreeGrid.vue'//树表格
	export default {
		name: 'customer_management',
		components: {
			vheader,
			navs_left,
			navs_header,
			categorymask,
			tree_grid,
		},
		data() {
			return {
				basic_url: Config.dev_url,
				loading: false,//默认加载数据时显示loading动画
				searchData: {
					page: 1,
					limit: 10, //分页显示数
					nickname: '',
					enabled: '',
					searchKey: '',
					searchValue: '',
					companyId: '',
					deptId: ''
				},
				checkedName: [
					'编码',
                    '分类描述',
                    '父级分类',
					// '信息状态',
					'录入时间',
					'修改时间'
				],
				columns: [{
			            text: '编码',
			            dataIndex: 'CLASSIFY_NUM',
			            isShow:true,
			          },
			          {
			            text: '分类描述',
			            dataIndex: 'CLASSIFY_DESCRIPTION',
			            isShow:true,
			          },
			          {
			            text: '父级分类',
			            dataIndex: 'PARENTDesc',
			            isShow:true,
			          },
			          {
			          	text: '录入时间',
			          	dataIndex: 'ENTERDATE',
			          	isShow:true,
			          },
			          {
			            text: '修改时间',
			            dataIndex: 'CHANGEDATE',
			            isShow:true,
			          },
			        ],
				selUser: [],
				categoryList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					CLASSIFY_NUM:'',
					CLASSIFY_DESCRIPTION: '',
					PARENT:'',
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				page: { //分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				CATEGORY: {},//修改子组件时传递数据
				selectData: [],
				resourceProps: {
					children: "children",
					label: "CLASSIFY_DESCRIPTION"
				},
			}
		},
		methods: {
			changeCheckedName(value){
				this.checkedName=value
				let str=value.toString()
				for(let i=0;i<this.columns.length;i++){
					if(str.indexOf(this.columns[i].text) != -1){
						this.columns[i].isShow=true
					}else{
						this.columns[i].isShow=false
					}
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
			searchinfo() {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			resetbtn(){
				this.searchList = { //点击高级搜索后显示的内容
					CLASSIFY_NUM:'',
					CLASSIFY_DESCRIPTION: '',
					PARENT:'',
				};
			},
			//清空
			reset() {
				this.CATEGORY = {
					ID: '',
					STATUS: '1',
                    CLASSIFY_NUM:'',
                    CLASSIFY_DESCRIPTION:'',
                    PARENT:'',
                    ENTERBY:'',
                    NTERDATE:'',
                    CHANGEBY:'',
                    CHANGEDATE:''
				};
				if(this.$refs['CATEGORY'] !== undefined) {
					this.$refs['CATEGORY'].resetFields();
				}

			},
			classByValue: function (childValue) {
		        // childValue就是子组件传过来的
		        this.selUser = childValue
//		        this.selMenu[0].hidden ? '1' : '0'
		        
		    },
			//添加类别
			openAddMgr() {
				this.reset();
				this.$refs.categorymask.open(); // 方法1
				this.$refs.categorymask.visible();
				
			},
			//修改类别
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
					this.CATEGORY = this.selUser[0];
					this.$refs.categorymask.detail(this.selUser[0]);
				}
			},
			//查看
			 view(data) {
			 	this.CATEGORY = data;
				this.$refs.categorymask.view();
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
					var url = this.basic_url + '/api-apps/app/assetClass/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
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
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {
							params: data
						}).then((res) => { //.delete 传数据方法
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
								message: '网络错误，请重试1',
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
			// 配置关系
			Configuration() {
				this.$router.push({
					path: '/inspection_project'
				});
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			SelChange(val) {
				this.selUser = val;
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
			handleNodeClick(data) {
				this.searchList.CLASSIFY_DESCRIPTION = data.CLASSIFY_DESCRIPTION;
				this.requestData();
			},
			requestData() {
				this.loading = true;
				var data = {
					CLASSIFY_NUM:this.searchList.CLASSIFY_NUM,
					CLASSIFY_DESCRIPTION: this.searchList.CLASSIFY_DESCRIPTION,
					PARENT:this.searchList.PARENT,
				}
				console.log('=============');
				console.log(this.searchList);
				var url = this.basic_url + '/api-apps/app/assetClass/tree?tree_id=CLASSIFY_NUM&tree_pid=PARENT';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.categoryList = res.data.datas;
					this.loading = false;
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试2',
						type: 'error'
					})
				})
			},
			// handleNodeClick(data) {},
			formatter(row, column) {
				return row.enabled;
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