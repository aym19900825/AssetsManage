<template>
<!-- 使用/维护保养记录 -->
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
							<!-- <button type="button" class="btn btn-red button-margin" @click="deluserinfo">
							    <i class="icon-trash"></i>删除
							</button> -->
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
				<div v-show="search">
					<el-form status-icon :model="searchList" label-width="70px">
						<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="设备编号" prop="ASSETNUM">
										<el-input v-model="searchList.ASSETNUM"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="设备名称" prop="DESCRIPTION">
										<el-input v-model="searchList.DESCRIPTION"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="规格型号" prop="MODEL">
										<el-input v-model="searchList.MODEL"></el-input>
									</el-form-item>
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
						<el-table :header-cell-style="rowClass" :data="userList" border stripe height="550" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
							<el-table-column type="selection" width="55" v-if="this.checkedName.length>0">
							</el-table-column>
							<el-table-column label="设备编号" width="200" sortable prop="ASSETNUM" v-if="this.checkedName.indexOf('设备编号')!=-1">
								<template slot-scope="scope">
									<p @click=view(scope.row.ID)>{{scope.row.ASSETNUM}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="设备名称" width="200" sortable prop="DESCRIPTION" v-if="this.checkedName.indexOf('设备名称')!=-1">
							</el-table-column>
							<el-table-column label="规格型号" width="300" sortable prop="MODEL" v-if="this.checkedName.indexOf('规格型号')!=-1">
							</el-table-column>
							<!-- <el-table-column label="设备状态" sortable prop="STATUS"  v-if="this.checkedName.indexOf('设备状态')!=-1">
								<template slot-scope="scope">
									<span v-text="scope.row.STATUS=='1'?'活动':'不活动'"></span>
								</template>
							</el-table-column> -->						
							<el-table-column label="保管人" sortable prop="KEEPER" v-if="this.checkedName.indexOf('保管人')!=-1">
							</el-table-column>
						</el-table>
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
					</el-col>
				</el-row>
			</div>
		</div>
		<!--右侧内容显示 End-->
		<detailPage :detailData="aaaData[0]" ref="child" @request="requestData"></detailPage>
	</div>
</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left4.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import detailPage from '../equipmentsDetails/usag_records_mask.vue'
	export default {
		name: 'user_management',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			detailPage
		},
		data() {
			return {
				basic_url: Config.dev_url,
				dataUrl: '/api/api-user/users',
				searchData: {
			        page: 1,
			        limit: 10,//分页显示数
		        },
				checkedName: [
					'设备编号',
					'设备名称',
					'规格型号',
					'保管人',
					
				],
				tableHeader: [
					{
						label: '设备编号',
						prop: 'ASSETNUM'
					},
					{
						label: '设备名称',
						prop: 'DESCRIPTION'
					},
					{
						label: '规格型号',
						prop: 'MODEL'
					},
					// {
					// 	label: '设备状态',
					// 	prop: 'STATUS'
					// },
					{
						label: '保管人',
						prop: 'KEEPER'
					}
				],
				
			
				selUser: [],
				
				userList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					ASSETNUM: '',
					DESCRIPTION: '',
					MODEL: ''
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
				aaaData:[]
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
				return 'text-align:center'
			},
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
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加用戶
			openAddMgr() {
				this.$refs.child.visible();
			},
			//修改用戶
			modify() {
				this.aaaData = this.selUser;
				if(this.aaaData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.aaaData.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail();
				}
			},
			//查看
			 view(dataid) {
			 	// console.log(data);
			 	// this.dataInfo = data;
				this.$refs.child.view(dataid);
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
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时删除多个数据',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.ID;
					var url = this.basic_url + '/api-apps/app/asset/' + id;
					this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.requestData();
						}else{
							this.$message({
								message: res.data.resp_msg,
								type: 'error'
							});
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
				//taxStatus 布尔值
				return data.enabled ? '启用' : '冻结'
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
			
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					ASSETNUM: this.searchList.ASSETNUM,
					DESCRIPTION: this.searchList.DESCRIPTION,
					MODEL: this.searchList.MODEL
				}
				var url = this.basic_url + '/api-apps/app/asset';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.userList = res.data.data;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
				
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