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
								<button type="button" class="btn btn-purple button-margin" @click="deluserinfo">
                                    <i class="icon-trash"></i>删除
                                </button>
                                <button type="button" class="btn btn-primarys button-margin" @click="reportdata">
							    <i class="icon-clipboard"></i>报表
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
						<el-form :model="searchList">
							<el-row :gutter="10">
                                <el-col :span="7">
									<el-form-item label="编码" prop="REPORTNUM" label-width="45px">
										<el-input v-model="searchList.REPORTNUM"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="7">
									<el-form-item label="报告描述" prop="DESCRIPTION"  label-width="80px">
										<el-input v-model="searchList.DESCRIPTION"></el-input>
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
							<!-- 表格 Begin-->
							<el-table :header-cell-style="rowClass" 
									  :data="USESEAL" 
									  border 
									  stripe 
									  :height="fullHeight" 
									  style="width: 100%;" 
									  :default-sort="{prop:'USESEAL', order: 'descending'}" 
									  @selection-change="SelChange" 
									  v-loadmore="loadMore"
									  v-loading="loading"  
									  element-loading-text="加载中…"
    								  element-loading-spinner="el-icon-loading"
    								  element-loading-background="rgba(255, 255, 255, 0.9)">
								<el-table-column type="selection" fixed width="55" v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="编码" width="155" sortable prop="REPORTNUM" v-if="this.checkedName.indexOf('编码')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.REPORTNUM}}
										</p>
									</template>
								</el-table-column>
                                <el-table-column label="报告描述" sortable prop="DESCRIPTION" v-if="this.checkedName.indexOf('报告描述')!=-1">
								</el-table-column>
								<el-table-column label="流程状态" sortable prop="STATE" v-if="this.checkedName.indexOf('流程状态')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination background class="text-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 End-->
						</el-col>
					</el-row>
				</div>
			</div>
			<!--右侧内容显示 End-->
			<reportapprovemask  ref="reportapprove" @request="requestData" v-bind:page=page></reportapprovemask>
			<!--报表-->
			<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_header from '../common/nav_tabs.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import reportapprovemask from '../testworkcheckDetails/reportapprove_mask.vue'
    import tableControle from '../plugin/table-controle/controle.vue'
    import reportmask from'../reportDetails/reportMask.vue'
	export default {
		name: 'reportachiving',
		components: {
			vheader,
			navs_left,
			navs_header,
			reportapprovemask,
            tableControle,
            reportmask
		},
		data() {
			return {
				reportData:{},//报表的数据
				loading: false,
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				commentArr: {},
				loading: false,//默认加载数据时显示loading动画
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				checkedName: [
                    '编码',
					'报告描述',
                    '流程状态',
				],
				tableHeader: [
                    {
						label: '编码',
						prop: 'REPORTNUM'
					},{
						label: '报告描述',
						prop: 'DESCRIPTION'
					},
					{
						label: '流程状态',
						prop: 'STATE'
					},
				],
				selUser: [],
				USESEAL: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
                searchList: { //点击高级搜索后显示的内容
					REPORTNUM:'',
					DESCRIPTION:'',
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
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
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
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			//重置
			resetbtn(){
				this.searchList = {
					REPORTNUM:'',
					DESCRIPTION:'',
				};
				this.requestData();
			},
			//搜索
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加类别
			openAddMgr() {
				this.$refs.reportapprove.visible();
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
					console.log(this.selUser[0]);
					this.$refs.reportapprove.detail(this.selUser[0].ID);
				}
			},
			//查看
			 view(data) {
				this.$refs.reportapprove.view(data);
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
				this.up = !this.up
			},
			//报表
			reportdata(){
				this.reportData.app=this.productType;
				this.$refs.reportChild.visible();
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
					var url = this.basic_url + '/api-apps/app/reportApprove/deletes';
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
			// 配置关系
			Configuration() {
				this.$router.push({
					path: '/inspection_project'
				});
			},
			judge(data) {
				data.STATUS = data.STATUS == "1" ? '活动' : '不活动'
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
				this.loading = true;
				var data = {
					page: this.page.currentPage,
                    limit: this.page.pageSize,
                    REPORTNUM:this.searchList.REPORTNUM,
					DESCRIPTION:this.searchList.DESCRIPTION,
				}
				var url = this.basic_url + '/api-apps/app/reportApprove';
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
					this.USESEAL = newarr;
					this.loading = false;
				}).catch((wrong) => {})
			},
			handleNodeClick(data) {},
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