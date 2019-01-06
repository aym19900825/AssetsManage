<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_header  ref="navsheader"></navs_header>
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
								<button type="button" class="btn btn-blue button-margin" @click="modify">
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
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName" @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!--按钮操作行 End-->

					<!-- 高级查询划出 Begin-->
					<div v-show="search">
						<el-form status-icon :model="searchList" label-width="45px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="编码" prop="PRO_NUM">
										<el-input v-model="searchList.PRO_NUM">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="名称" prop="PRO_NAME">
										<el-input v-model="searchList.PRO_NAME">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="版本" prop="VERSION">
										<el-input v-model="searchList.VERSION">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
								<!-- <div >
									<span class="pull-left" style="border:1px solid #D8DEE6;border-right:none;background-color: #F3F6FA;width: 24%;height:35px;text-align: center; border-radius:3px 0 0 3px; padding-top:6px;color: #5B6371;" >
										机构
									</span>
									<div class="pull-right"> -->
									<el-form-item label="机构" prop="DEPARTMENT">
										<el-select clearable v-model="searchList.DEPARTMENT" filterable allow-create default-first-option placeholder="请选择" style="width: 90%;border-radius:none">
										    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
									<!-- </div>
								</div> -->
									
								</el-col>
								<!-- <el-col :span="2">
									<el-select v-model="searchList.STATUS" placeholder="请选择信息状态">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col> -->
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
							<el-table  :header-cell-style="rowClass" :data="productList" line-center border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'productList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" fixed width="55" v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="编码" width="155" sortable prop="PRO_NUM" v-if="this.checkedName.indexOf('编码')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.PRO_NUM}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="名称" sortable prop="PRO_NAME" v-if="this.checkedName.indexOf('名称')!=-1">
								</el-table-column>
								</el-table-column>
								<!--<el-table-column label="信息状态" width="155" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('信息状态')!=-1">
							</el-table-column>-->
								<el-table-column label="版本" width="100" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1" align="right">
								</el-table-column>
								<el-table-column label="机构" width="185" sortable prop="DEPARTMENTDesc" v-if="this.checkedName.indexOf('机构')!=-1">
								</el-table-column>
								<!-- <el-table-column label="录入人" width="155" prop="ENTERBY" sortable v-if="this.checkedName.indexOf('录入人')!=-1">
								</el-table-column> -->
								<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<!-- <el-table-column label="修改人" width="155" prop="CHANGEBY" sortablev-if="this.checkedName.indexOf('修改人')!=-1">
								</el-table-column> -->
								<el-table-column label="修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 End-->
						</el-col>
					</el-row>

				</div>
			</div>
			<!--右侧内容显示 End-->
			<productmask :PRODUCT="PRODUCT" ref="child" @request="requestData" @reset="reset" v-bind:page=page></productmask>
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
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
				basic_url: Config.dev_url,
				loadSign: true, //加载
				commentArr: {},
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
					'名称',
					'版本',
					'机构',
					// '信息状态',
					
					// '录入人',
					'录入时间',
					// '修改人',
					'修改时间'
				],
				tableHeader: [{
						label: '编码',
						prop: 'PRO_NUM'
					},
					{
						label: '名称',
						prop: 'PRO_NAME'
					},
					{
						label: '版本',
						prop: 'VERSION'
					},
					{
						label: '机构',
						prop: 'DEPARTMENTDesc'
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
					},
					// {
					// 	label: '修改人',
					// 	prop: 'CHANGEBY'
					// },
					{
						label: '修改时间',
						prop: 'CHANGEDATE'
					}
				],
				selUser: [],
				productList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					PRO_NUM: '',
					PRO_NAME: '',
					VERSION: '',
					DEPARTMENT: ''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				PRODUCT: {}, //修改子组件时传递数据
				page: { //分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
		        selectData: [],
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    // console.log(rowIndex) //表头行标号为0
			    return 'text-align:center'
			},
			//机构值
			getCompany() {
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					console.log(res.data);
					this.selectData = res.data;
				});
			},
			//表格滚动加载
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
				}
			},
			tableControle(data) {
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
			//清空
			reset() {
				this.PRODUCT = {
					PRO_NUM: '',
					PRO_NAME: '',
					STATUS: '活动',
					VERSION: '1',
					ENTERBY: '',
					ENTERDATE: '',
					CHANGEBY: '',
					CHANGEDATE: ''
				};
				if(this.$refs['PRODUCT'] !== undefined) {
					this.$refs['PRODUCT'].resetFields();
				}
			},
			//添加
			openAddMgr() {
				this.reset();
				this.$refs.child.open();
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
					this.PRODUCT = this.selUser[0];
					this.$refs.child.detail();
				}
			},
			//查看
			 view(data) {
			 	this.PRODUCT = data;
				this.$refs.child.view();
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
					var url = this.basic_url + '/api-apps/app/product/deletes';
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
								message: '网络错误，请重试',
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
			judge(data) {
				return data.STATUS == "1" ? '活动' : '不活动'
			},
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					PRO_NUM: this.searchList.PRO_NUM,
					PRO_NAME: this.searchList.PRO_NAME,
					VERSION: this.searchList.VERSION,
					DEPARTMENT: this.searchList.DEPARTMENT,
					// STATUS: this.searchList.STATUS,
				}
				var url = this.basic_url + '/api-apps/app/product';
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
					this.productList = newarr;
				}).catch((wrong) => {})
			},
			handleNodeClick(data) {},
			formatter(row, column) {
				return row.enabled;
			},
		},
		mounted() {
			this.requestData();
			this.getCompany();
		},
	}
</script>

<style>
input[type="text"], input[type="password"], textarea {
    height: 35px;
    padding: 0px 5px;
    background-color: #FFFFFF;
    border-radius: 0px;
    border-left:none;
    border: 1px solid #DFE5EA;
}
</style>