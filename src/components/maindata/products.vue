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
				<!--按钮操作行 Begin-->
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
						<div id="refresh" title="刷新" class="btn btn-default btn-refresh">
							<i class="icon-refresh"></i>
						</div>
						<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
					</div>
				</div>
				<!--按钮操作行 End-->

				<!-- 高级查询划出 Begin-->
				<div v-show="search" class="pb10">
					<el-form status-icon :model="searchList" label-width="70px">
						<el-row :gutter="10">
							<el-col :span="5">
								<el-input v-model="searchList.PRO_NUM">
									<template slot="prepend">产品编号</template>
								</el-input>
								<el-button slot="append" icon="el-icon-search" ></el-button>
							</el-col>
							<el-col :span="2" style="padding-top: 3px">
								    <el-select v-model="searchList.STATUS" placeholder="请选择状态">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.DEPARTMENT">
									<template slot="prepend">机构</template>
								</el-input>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.PRO_NAME">
									<template slot="prepend">产品名称</template>
								</el-input>
							</el-col>
							<el-col :span="5">
								<el-input v-model="searchList.VERSION">
									<template slot="prepend">版本</template>
								</el-input>
							</el-col>
							
							<el-col :span="2">
								<el-button  class="pull-right" type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 高级查询划出 End-->
				<el-row :gutter="0">
					<el-col :span="24">
						<!-- 表格 Begin-->
						<el-table :data="productList" border stripe height="400" style="width: 100%;" :default-sort="{prop:'productList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
							<el-table-column type="selection" fixed width="55" v-if="this.checkedName.length>0">
							</el-table-column>
							<el-table-column label="产品编号" width="155" sortable prop="PRO_NUM" v-if="this.checkedName.indexOf('产品编号')!=-1">
							</el-table-column>
							<el-table-column label="产品名称" width="155" sortable prop="PRO_NAME" v-if="this.checkedName.indexOf('产品名称')!=-1">
							</el-table-column>
							</el-table-column>
							<el-table-column label="状态" width="155" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('状态')!=-1">
							</el-table-column>
							<el-table-column label="版本" width="155" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1">
							</el-table-column>
							<el-table-column label="录入人机构" width="155" sortable prop="DEPARTMENT" v-if="this.checkedName.indexOf('录入人机构')!=-1">
							</el-table-column>
							<el-table-column label="录入人" width="155" prop="ENTERBY" sortable v-if="this.checkedName.indexOf('录入人')!=-1">
							</el-table-column>
							<el-table-column label="录入时间" width="155" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
							</el-table-column>
							<el-table-column label="修改人" width="155" prop="CHANGEBY" sortablev-if="this.checkedName.indexOf('修改人')!=-1">
							</el-table-column>
							<el-table-column label="修改时间" width="155" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
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
		<productmask :PRODUCT="aaaData[0]" ref="child" @request="requestData" v-bind:page=page></productmask>
	</div>
</div>
</template>
<script>
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left2.vue'
	import navs_header from '../common/nav_tabs.vue'
	import productmask from '../maindataDetails/product_mask.vue'	
	import tableControle from '../plugin/table-controle/controle.vue'
	export default {
		name: 'customer_management',
		components: {
			vheader,
			navs_left,
			navs_header,
			productmask,
			tableControle,			
		},
		data() {
			return {
				loadSign:true,//加载
				commentArr:{},
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
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
					'产品编号',
					'产品名称',
					'录入人机构',
					'状态',
					'版本',
					'录入人',
					'录入时间',
					'修改人',
					'修改时间'
				],
				tableHeader: [
					{
						label: '产品编号',
						prop: 'PRO_NUM'
					},
					{
						label: '产品名称',
						prop: 'PRO_NAME'
					},
					{
						label: '录入人机构',
						prop: 'DEPARTMENT'
					},
					{
						label: '状态',
						prop: 'STATUS'
					},
					{
						label: '版本',
						prop: 'VERSION'
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
						label: '修改人',
						prop: 'CHANGEBY'
					},
					{
						label: '修改时间',
						prop: 'CHANGEDATE'
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
				productList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				clientHeight:'',//获取浏览器高度
				searchList: {//点击高级搜索后显示的内容
					PRO_NUM: '',
					STATUS: '',
					DEPARTMENT: '',
					PRO_NAME:'',
					VERSION:''
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
		methods: {
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
			tableControle(data){
				this.checkedName = data;
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD"); 
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
				this.aaaData = {
					PRO_NUM:'',
					PRO_NAME:'',
					STATUS:'活动',
					VERSION:'1',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:''
				};
				this.$refs.child.visible();
			},
			//修改用戶
			modify() {
				this.aaaData = this.selUser;
				if(this.aaaData.length == 0) {
					this.$message({
						message: '请您选择要修改的用户',
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
					this.$refs.child.detail(this.aaaData[0].ID);
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
						message: '请您选择要删除的用户',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时删除多个用户',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.ID;
					var url = '/api/api-apps/app/product/' + id;
					this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
						console.log(res.data.resp_code);
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
				// return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");  
			},
			insert() {
				this.users.push(this.user)
			},
			remove(index) {
				this.users.splice(index, 1)
			},
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				console.log(this.searchList.STATUS);
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					PRO_NUM: this.searchList.PRO_NUM,
					STATUS: this.searchList.STATUS,
					DEPARTMENT: this.searchList.DEPARTMENT,
					PRO_NAME: this.searchList.PRO_NAME,
					VERSION: this.searchList.VERSION,
				}
				var url = '/api/api-apps/app/product';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;	
					//总的页数
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
					
					this.productList = newarr;
				}).catch((wrong) => {})
			},
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			},
		},
		mounted() {
			this.requestData();
			// 获取浏览器可视区域高度
			var _this = this;
			var clientHeight = $(window).height() - 100;    //document.body.clientWidth;
			_this.$refs.homePagess.style.height = clientHeight + 'px';
			window.onresize = function() {
				var clientHeight = $(window).height() - 100;
				_this.$refs.homePagess.style.height = clientHeight + 'px';
			};
			
		},
	}
</script>

<style scoped>

</style>