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
						<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
					</div>
				</div>
				<!-- 高级查询划出 Begin-->
				<div v-show="search" class="pb10">
					<el-form status-icon :model="searchList" label-width="70px">
						<el-row :gutter="10">
							<el-col :span="5">
								<el-input v-model="searchList.NAME">
									<template slot="prepend">单位名称</template>
								</el-input>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.CODE">
									<template slot="prepend">组织机构代码</template>
								</el-input>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.PHONE">
									<template slot="prepend">联系电话</template>
								</el-input>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.CONTACT_ADDRESS">
									<template slot="prepend">联系地址</template>
								</el-input>
							</el-col>
							<el-col :span="2" style="padding-top: 3px">
								<el-select v-model="searchList.STATUS" placeholder="状态">
							      <el-option label="活动" value="1">	
							      </el-option>
							      <el-option label="不活动" value="0">
							      </el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
								<el-button class="pull-right" type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 高级查询划出 End-->
				<el-row :gutter="0">
					<el-col :span="24">
						<!-- 表格 Begin-->
						<el-table :data="userList" border stripe height="400" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
							<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
							</el-table-column>
							<el-table-column label="组织机构代码" width="200" sortable prop="CODE" v-if="this.checkedName.indexOf('组织机构代码')!=-1">
							</el-table-column>
							<el-table-column label="单位名称" width="300" sortable prop="NAME" v-if="this.checkedName.indexOf('单位名称')!=-1">
							</el-table-column>
							<el-table-column label="联系地址" sortable width="300" prop="CONTACT_ADDRESS" v-if="this.checkedName.indexOf('联系地址')!=-1">
							</el-table-column>
							<el-table-column label="联系电话" sortable width="200" prop="PHONE" v-if="this.checkedName.indexOf('联系电话')!=-1">
							</el-table-column>	
							<el-table-column label="状态" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('状态')!=-1">
							</el-table-column>
						</el-table>
						<el-pagination background class="pull-right pt10 pb10" v-if="this.checkedName.length>0"
				            @size-change="sizeChange"
				            @current-change="currentChange"
				            :current-page="page.currentPage"
				            :page-sizes="[10, 20, 30, 40]"
				            :page-size="page.pageSize"
				            layout="total, sizes, prev, pager, next"
				            :total="page.totalCount">
				        </el-pagination>
						<!-- 表格 End-->
					</el-col>
				</el-row>
			</div>
		</div>
		<!--右侧内容显示 End-->
		<customermask ref="child" @request="requestData" v-bind:page=page></customermask>
	</div>
</div>
</template>
<script>
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left2.vue'
	import navs_header from '../common/nav_tabs.vue'
	import customermask from '../maindataDetails/customer_mask.vue'
	import table from '../plugin/table/table-normal.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	export default {
		name: 'user_management',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			customermask,
			table
		},
		data() {
			return {
				searchData: {
			        page: 1,
			        limit: 10,//分页显示数
			        nickname: '',
			        enabled: '',
			        searchKey: '',
			        searchValue: '',
			        companyId: '',
			        deptId: ''
		        },
				checkedName: [
					'组织机构代码',
					'单位名称',
					'性别',
					'联系地址',
					'联系电话',
					'状态'
				],
				tableHeader: [
					{
						label: '组织机构代码',
						prop: 'CODE'
					},
					{
						label: '单位名称',
						prop: 'NAME'
					},
					{
						label: '联系地址',
						prop: 'CONTACT_ADDRESS'
					},
					{
						label: '联系电话',
						prop: 'PHONE'
					},
					{
						label: '状态',
						prop: 'STATUS'
					}
				],
				leftNavs: [//leftNavs左侧菜单数据
					{
						navicon: 'icon-user',
						navtitle: '用户管理',
						navherf: '/personinfo'
					}, {
						navicon: 'icon-edit',
						navtitle: '机构管理',
						navherf: '/dept_management'
					}, {
						navicon: 'icon-role-site',
						navtitle: '角色管理',
						navherf: '/role_management'
					}, {
						navicon: 'icon-file-text',
						navtitle: '客户管理',
						navherf: '/customer_management'
					}, {
						navicon: 'icon-file-text',
						navtitle: '产品类别',
						navherf: '/products_category'
					}, {
						navicon: 'icon-file-text',
						navtitle: '产品',
						navherf: '/products'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测标准',
						navherf: '/testing_standard'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测项目',
						navherf: '/testing_projects'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测方法',
						navherf: '/testing_methods'
					}, {
						navicon: 'icon-file-text',
						navtitle: '自动编号设置',
						navherf: '/number_settings'
					}
				],
				companyId: '',
				deptId: '',
				selUser: [],
				'启用': true,
				'冻结': false,
				userList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				clientHeight:'',//获取浏览器高度
				searchList: {
					NAME: '',
					CODE: '',
					PHONE: '',
					CONTACT_ADDRESS: '',
					STATUS: ''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				userData:[],
				page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				aaaData:[],
			}
		},

		mounted(){
			// 获取浏览器可视区域高度
			var _this = this;
			var clientHeight = $(window).height() - 100;    //document.body.clientWidth;
			_this.$refs.homePagess.style.height = clientHeight + 'px';
			window.onresize = function() {
				var clientHeight = $(window).height() - 100;
				_this.$refs.homePagess.style.height = clientHeight + 'px';
			};

			
		},
		methods: {
			tableControle(data){
				this.checkedName = data;
			},
			//获取pageSize
			sizeChange(val) {
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    //获取currentPage
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
				this.$refs.child.resetNew();
				this.$refs.child.visible();
			},
			//修改用戶
			modify() {
				this.aaaData = this.selUser;
				if(this.aaaData.length == 0) {
					this.$message({
						message: '请您选择要修改的客户',
						type: 'warning'
					});
					return;
				} else if(this.aaaData.length > 1) {
					this.$message({
						message: '不可同时修改多个客户',
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
						message: '请您选择要删除的客户',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时删除多个客户',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.ID;
					var url = '/api/api-apps/app/customer/' + id;
					this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
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
				return data.STATUS=="1" ? '活动' : '不活动'
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
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					NAME: this.searchList.NAME,
					CODE: this.searchList.CODE,
					PHONE: this.searchList.PHONE,
					CONTACT_ADDRESS: this.searchList.CONTACT_ADDRESS,
					STATUS: this.searchList.STATUS
					// nickname: this.searchList.nickname,
					// enabled: this.searchList.enabled,
					// searchKey: 'createTime',
					// searchValue: this.searchList.createTime,
					// companyId: this.companyId,
					// deptId: this.deptId
				}
				var url = '/api/api-apps/app/customer';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					console.log(res);
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
			loadMore () {
			   if (this.loadSign) {
			     this.loadSign = false
			     this.page++
			     if (this.page > 10) {
			       return
			     }
			     setTimeout(() => {
			       this.loadSign = true
			     }, 1000)
			     console.log('到底了', this.page)
			   }
			 },
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			},
		},
		mounted(){
             // 注册scroll事件并监听  
             let self = this;
              $(".div-table").scroll(function(){
                self.loadMore();
            })
        },


		mounted() {
			this.requestData();
		},
	}
</script>

<style scoped>

</style>