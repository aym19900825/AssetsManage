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
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName" @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!--按钮操作行 End-->

					<!-- 高级查询划出 Begin-->
					<div v-show="search" class="pb10">
						<el-form status-icon :model="searchList" label-width="70px">
							<el-row :gutter="10" class="pb10">
								<el-col :span="5">
									<el-input v-model="searchList.S_NUM">
										<template slot="prepend">标准编号</template>
									</el-input>
								</el-col>
								<el-col :span="5">
									<el-input v-model="searchList.S_NAME">
										<template slot="prepend">标准名称</template>
									</el-input>
								</el-col>
								<el-col :span="5">
									<el-input v-model="searchList.S_ENGNAME">
										<template slot="prepend">英文名称</template>
									</el-input>
								</el-col>
								<el-col :span="5">
									<el-input v-model="searchList.VERSION">
										<template slot="prepend">版本</template>
									</el-input>
								</el-col>
								<el-col :span="4">
									<el-input v-model="searchList.DEPARTMENT">
										<template slot="prepend">机构</template>
									</el-input>
								</el-col>
							</el-row>
							<el-row :gutter="20">
								<el-col :span="5">
									<el-date-picker v-model="searchList.RELEASETIME" type="date" placeholder="发布时间" value-format="yyyy-MM-dd HH:mm:ss">
									</el-date-picker>
								</el-col>
								<el-col :span="5">
									<el-date-picker v-model="searchList.STARTETIME" type="date" placeholder="启用时间" value-format="yyyy-MM-dd HH:mm:ss">
									</el-date-picker>
								</el-col>
								<!-- <el-col :span="3">
									<el-select v-model="searchList.STATUS" placeholder="请选择信息状态">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col> -->
								<el-col :span="2">
									<el-button type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->

					<el-row :gutter="0">
						<el-col :span="24">
							<!-- 表格 Begin-->
							<el-table :header-cell-style="rowClass" :data="standardList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'standardList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column  type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<!-- <el-table-column label="主键编号" width="120" sortable prop="ID" v-if="this.checkedName.indexOf('主键编号')!=-1">
								</el-table-column> -->
								<el-table-column label="标准编号" width="120" sortable prop="S_NUM" v-if="this.checkedName.indexOf('标准编号')!=-1">
								</el-table-column>
								<el-table-column label="标准名称" width="220" sortable prop="S_NAME" v-if="this.checkedName.indexOf('标准名称')!=-1">
								</el-table-column>
								<el-table-column label="英文名称" width="220" sortable prop="S_ENGNAME" v-if="this.checkedName.indexOf('英文名称')!=-1">
								</el-table-column>
								<!--<el-table-column label="信息状态" width="100" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('信息状态')!=-1">
								</el-table-column>-->
								<el-table-column label="发布时间" width="100" sortable prop="RELEASETIME" :formatter="dateFormat" v-if="this.checkedName.indexOf('发布时间')!=-1">
								</el-table-column>
								<el-table-column label="启用时间" width="100" sortable prop="STARTETIME" :formatter="dateFormat" v-if="this.checkedName.indexOf('启用时间')!=-1">
								</el-table-column>
								<el-table-column label="版本" width="70" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1">
								</el-table-column>
								<el-table-column label="机构" width="180" sortable prop="DEPARTMENT" v-if="this.checkedName.indexOf('机构')!=-1">
								</el-table-column>
								<!-- <el-table-column label="录入人" width="120" prop="ENTERBY" sortable v-if="this.checkedName.indexOf('录入人')!=-1"> -->
								<!-- </el-table-column> -->
								<el-table-column label="录入时间" width="100" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<!-- <el-table-column label="修改人" width="120" prop="CHANGEBY" sortable v-if="this.checkedName.indexOf('修改人')!=-1">
								</el-table-column> -->
								<el-table-column label="修改时间" width="100" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
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
			<standardmask :dataInfo="dataInfo" ref="child" @request="requestData" v-bind:page=page></standardmask>
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left2.vue'
	import navs_header from '../common/nav_tabs.vue'
	//	import table from '../plugin/table/table-normal.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import standardmask from '../maindataDetails/testing_standardMask.vue'
	export default {
		name: 'testing_standard',

		components: {
			vheader,
			navs_header,
			tableControle,
			//			table,
			navs_left,
			standardmask
		},
		data() {
			return {
				basic_url: Config.dev_url,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				loadSign: true, //加载
				commentArr: {},
				searchData: {
					page: 1,
					limit: 10, //分页显示数

					searchKey: '',
					searchValue: '',
					companyId: '',
					deptId: ''
				},
				checkedName: [
					// '主键编号',
					'标准编号',
					'标准名称',
					'英文名称',
					// '信息状态',
					'发布时间',
					'启用时间',
					'版本',
					'机构',
					// '录入人',
					'录入时间',
					// '修改人',
					'修改时间'
				],
				tableHeader: [
					// {
					// 	label: '主键编号',
					// 	prop: 'ID'
					// },
					{
						label: '标准编号',
						prop: 'S_NUM'
					},
					{
						label: '标准名称',
						prop: 'S_NAME'
					},
					{
						label: '英文名称',
						prop: 'S_ENGNAME'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// },
					{
						label: '发布时间',
						prop: 'RELEASETIME'
					},
					{
						label: '启用时间',
						prop: 'STARTETIME'
					},
					{
						label: '版本',
						prop: 'VERSION'
					},
					{
						label: '机构',
						prop: 'DEPARTMENT'
					},
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

				companyId: '',
				deptId: '',
				selUser: [],
				standardList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin: true,

				statusshow1: true,
				statusshow2: true,
				searchList: { //点击高级搜索后显示的内容
					S_NUM: '',
					S_NAME: '',
					VERSION: '',
					DEPARTMENT: '',
					RELEASETIME: '',
					STARTETIME: '',
					STATUS: '',
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				userData: [],
				page: { //分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				dataInfo: {}, //修改子组件时传递数据
			}
		},

		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    console.log(rowIndex) //表头行标号为0
			    return 'text-align:center'
			},
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
					//			     console.log('到底了', this.page.currentPage)
				}
			},
			tableControle(data) {
				this.checkedName = data;
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
				
				this.dataInfo = {
					// ID: '',
					VERSION: '1',
					STATUS: '活动',
					S_NUM: '',
					S_NAME: '',
					S_ENGNAME: '',
					RELEASETIME: '',
					STARTETIME: '',
					RELEASE_UNIT:'',
					DEPARTMENT: '',
					ENTERBY: '',
					ENTERDATE: '',
					CHANGEBY: '',
					CHANGEDATE: ''
				};
				if(this.$refs['dataInfo'] !== undefined) {
					this.$refs['dataInfo'].resetFields();
				}
			},
			//添加
			openAddMgr() {
				this.reset();
				this.$refs.child.open();
				this.$refs.child.visible();
			},
			//修改
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
					this.dataInfo = this.selUser[0];
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
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/inspectionSta/deletes';
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
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			SelChange(val) { //选中值后赋值给一个自定义的数组：selUser
				this.selUser = val;
			},
			requestData(index) { //高级查询字段
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					S_NUM: this.searchList.S_NUM,
					S_NAME: this.searchList.S_NAME,
					VERSION: this.searchList.VERSION,
					S_ENGNAME: this.searchList.S_ENGNAME,
					DEPARTMENT: this.searchList.DEPARTMENT,
					RELEASETIME: this.searchList.RELEASETIME,
					STARTETIME: this.searchList.STARTETIME,
					STATUS: this.searchList.STATUS,
				}
				var url = this.basic_url + '/api-apps/app/inspectionSta';
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
					this.standardList = newarr;
					//					this.standardList = res.data.data;
					//					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})

			},
			handleNodeClick(data) {},
			formatter(row, column) {
				return row.enabled;
			},
		},
		mounted() {
			this.requestData();
		},
	}
</script>

<style scoped>

</style>