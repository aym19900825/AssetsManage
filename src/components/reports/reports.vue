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
				<div class="fixed-table-toolbar clearfix">
					<div class="bs-bars pull-left">
						<div class="hidden-xs" id="roleTableToolbar" role="group">
							<button type="button" class="btn btn-green" @click="openAddMgr">
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
						<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
						<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
					</div>
				</div>
				<!-- 高级查询划出 Begin-->
				<div v-show="search" class="pb10">
					<el-form :model="searchList" label-width="70px">
						<el-row :gutter="10">
							<el-col :span="5">
								<el-input v-model="searchList.typename">
									<template slot="prepend">类型名称</template>
								</el-input>
							</el-col>
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
						<el-table :data="reportsList" border stripe height="550" style="width: 100%;" :default-sort="{prop:'reportsList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
							<el-table-column type="selection" width="55" v-if="this.checkedName.length>0">
							</el-table-column>
							<el-table-column label="代码" width="200" sortable prop="code" v-if="this.checkedName.indexOf('代码')!=-1">
							</el-table-column>
							<el-table-column label="报表名称" width="200" sortable prop="name" v-if="this.checkedName.indexOf('报表名称')!=-1">
							</el-table-column>
							<el-table-column label="id" sortable prop="id" v-if="this.checkedName.indexOf('id')!=-1">
							</el-table-column>
							<el-table-column label="报表文件" sortable prop="file" v-if="this.checkedName.indexOf('报表文件')!=-1">
							</el-table-column>
							</el-table-column>
							<el-table-column label="备注" sortable prop="remarks"v-if="this.checkedName.indexOf('备注')!=-1">
							</el-table-column>
							<el-table-column label="类型" sortable prop="type"v-if="this.checkedName.indexOf('类型')!=-1">
							</el-table-column>						
							<el-table-column label="录入人" sortable prop="createby" v-if="this.checkedName.indexOf('录入人')!=-1">
							</el-table-column>	
							<el-table-column label="录入时间" sortable prop="createdate" v-if="this.checkedName.indexOf('录入时间')!=-1">
							</el-table-column>	
							<el-table-column label="修改人" sortable prop="updateby" v-if="this.checkedName.indexOf('修改人')!=-1">
							</el-table-column>	
						
							<el-table-column label="修改日期" sortable prop="updatedate" v-if="this.checkedName.indexOf('修改日期')!=-1">
							</el-table-column>	
						<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0"
				            @size-change="sizeChange"
				            @current-change="currentChange"
				            :current-page="page.currentPage"
				            :page-sizes="[10, 20, 30, 40]"
				            :page-size="page.pageSize"
				            layout="total, sizes, prev, pager, next"
				            :total="page.totalCount">
				        </el-pagination>
						<!-- 表格 End-->
						</el-table>
					</el-col>
				</el-row>
			</div>
		</div>
		<!--右侧内容显示 End-->
		<reportmask ref="child"  @request="requestData" ></reportmask>
	</div>
</div>
</template>
<script>
	import Config from '../../config.js';
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import reportmask from '../reportDetails/reportConfigurationMask.vue'
	export default {
		name: 'report',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			reportmask
		},
		data() {
			return {
				basic_url: Config.dev_url,
				checkedName: [
					'代码',
					'报表名称',
					'id',
					'报表文件',
					'备注',
					'类型',
					'录入人',
					'录入时间',
					'修改人',
					'修改日期'
				],
				tableHeader: [
					{
						label: '代码',
						prop: 'username'
					},
					{
						label: '报表名称',
						prop: 'nickname'
					},
					{
						label: 'id',
						prop: 'id'
					},
					{
						label: '报表文件',
						prop: 'deptName'
					},
					{
						label: '备注',
						prop: 'remarks'
					},
					{
						label: '类型',
						prop: 'type'
					},
					{
						label: '录入人',
						prop: 'createby'
					},
					{
						label: '录入时间',
						prop: 'createdate'
					},
					{
						label: '修改人',
						prop: 'updateby'
					},
					{
						label: '修改日期',
						prop: 'updatedate'
					},
					
				],
				selUser: [],
				reportsList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					nickname: '',
					enabled: '',
					createTime: ''
				},
				page: {//分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
			}
		},
		methods: {
			tableControle(data){
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
			searchinfo() {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加
			openAddMgr() {
				this.$refs.child.visible();
			},
			//修改用戶
			modify() {
				if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择要修改的用户',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时修改多个用户',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail(this.selUser[0].id);
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
					var id = selData[0].id;
					var url = this.basic_url + '/api-report/report/' + id;
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
			requestData() {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = this.basic_url + '/api-report/report';
				this.$axios.get(url, {params: data}).then((res) => {
					this.reportsList = res.data.data;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {
					this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
				})
				
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
			childByValue:function(childValue) {
    		// childValue就是子组件传过来的值
    		// childValue就是子组件传过来的值
    		console.log(childValue);
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