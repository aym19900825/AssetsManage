<template>
<!-- 仪器和器量依据页面 -->
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header ref='navsheader'></navs_header>
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
				<div v-show="search">
						<el-form status-icon :model="searchList" label-width="70px">
							<el-row :gutter="10">
								<el-col :span="5">
									
								</el-col>
								<el-col :span="5">
									<el-form-item label="设备名称" prop="DESCRIPTION">
										<el-input v-model="searchList.DESCRIPTION"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="制造商" prop="VENDOR">
										<el-input v-model="searchList.VENDOR"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="保管人" prop="KEEPER">
										<el-input v-model="searchList.KEEPER"></el-input>
									</el-form-item>
								</el-col>
								<!-- <el-col :span="5">
									<el-input v-model="searchList.STATE">
										<template slot="prepend">设备状态</template>
									</el-input>
									<el-select v-model="searchList.STATE" placeholder="请选择">
										<el-option
										v-for="item in status"
										:key="item.value"
										:label="item.label"
										:value="item.value">
										</el-option>
										<template slot="prepend">设备状态</template>
									</el-select>
								</el-col>
								<el-col :span="4">
									<el-input v-model="searchList.OPTION_STATUS">
										<template slot="prepend">设备使用状态</template>
									</el-input>
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
						<el-table :header-cell-style="rowClass" :data="assetList" border stripe height="550" style="width: 100%;" :default-sort="{prop:'assetList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
							<el-table-column type="selection" width="55" v-if="this.checkedName.length>0">
							</el-table-column>
							<el-table-column label="设备编号" width="130" sortable prop="ASSETNUM" v-if="this.checkedName.indexOf('设备编号')!=-1">
								<template slot-scope="scope">
									<p @click=view(scope.row)>{{scope.row.ASSETNUM}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="设备名称" width="200" sortable prop="DESCRIPTION" v-if="this.checkedName.indexOf('设备名称')!=-1">
							</el-table-column>
							<el-table-column label="型号" sortable prop="MODEL" v-if="this.checkedName.indexOf('型号')!=-1">
							</el-table-column>
							<el-table-column label="技术指标" sortable prop="ASSET_KPI" v-if="this.checkedName.indexOf('技术指标')!=-1">
							</el-table-column>						
							<el-table-column label="制造商" sortable prop="VENDOR" v-if="this.checkedName.indexOf('制造商')!=-1">
							</el-table-column>
							<el-table-column label="出厂编号" width="200" sortable prop="FACTOR_NUM" v-if="this.checkedName.indexOf('出厂编号')!=-1">
							</el-table-column>
							<el-table-column label="价格(万元)" width="200" sortable prop="A_PRICE" v-if="this.checkedName.indexOf('价格(万元)')!=-1">
							</el-table-column>
							<el-table-column label="接受日期" width="100" sortable prop="ACCEPT_DATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('接受日期')!=-1">
							</el-table-column>
							<el-table-column label="启用日期" width="100" sortable prop="S_DATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('启用日期')!=-1">
							</el-table-column>						
							<el-table-column label="配置地址" sortable prop="C_ADDRESS" v-if="this.checkedName.indexOf('配置地址')!=-1">
							</el-table-column>
							<el-table-column label="接收状态" sortable prop="A_STATUS" v-if="this.checkedName.indexOf('接收状态')!=-1">
							</el-table-column>
							<el-table-column label="保管人" sortable prop="KEEPER" v-if="this.checkedName.indexOf('保管人')!=-1">
							</el-table-column>						
							<el-table-column label="备注" sortable prop="MEMO" v-if="this.checkedName.indexOf('备注')!=-1">
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
		<instrumentsmask :detailData="aaaData[0]" ref="child" @request="requestData"></instrumentsmask>
	</div>
</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left4.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import instrumentsmask from '../equipmentsDetails/instrument_mask.vue'
	export default {
		name: 'instruments',
		components: {
			vheader,
			navs_left,
			navs_header,
			instrumentsmask,
			tableControle,
		},
		data() {
			return {
				status: [
					{
						label: '启用',
						value: 1
					},
					{
						label: '封存',
						value: 2
					},
					{
						label: '报废',
						value: 3
					}
				],
				basic_url: Config.dev_url,
				dataUrl: '/api/api-user/users',
				searchData: {
			        page: 1,
			        limit: 10,//分页显示数
			        A_NAME: '',
			        VENDOR: '',
			        KEEPER: '',
			        STATE: '',
			        OPTION_STATUS: ''
		        },
				checkedName: [
					'设备编号',
					'设备名称',
					'型号',
					'技术指标',
					'制造商',
					'出厂编号',
					'价格（万元）',
					'接受日期',
					'启用日期',
					'配置地址',
					'接收状态',
					'保管人',
					'备注',
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
						label: '型号',
						prop: 'MODEL'
					},
					{
						label: '技术指标',
						prop: 'ASSET_KPI'
					},
					{
						label: '制造商',
						prop: 'VENDOR'
					},
					{
						label: '出厂编号',
						prop: 'FACTOR_NUM'
					},
					{
						label: '价格（万元）',
						prop: 'A_PRICE'
					},
					{
						label: '接受日期',
						prop: 'ACCEPT_DATE'
					},
					{
						label: '启用日期',
						prop: 'S_DATE'
					},
					{
						label: '配置地址',
						prop: 'C_ADDRESS'
					},
					{
						label: '接收状态',
						prop: 'A_STATUS'
					},
					{
						label: '保管人',
						prop: 'KEEPER'
					},
					{
						label: '备注',
						prop: 'MEMO'
					}
				],
				
				companyId: '',
				deptId: '',
				selUser: [],
				
				assetList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					DESCRIPTION: '',
			        VENDOR: '',
			        KEEPER: '',
			        STATE: '',
			        OPTION_STATUS: ''
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
			//添加
			openAddMgr() {
				this.$refs.child.visible();
			},
			//修改
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
						message: '不可同时修改多条数据',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail();
				}
			},
			//查看
			 view(data) {
			 	console.log(data);
			 	// this.dataInfo = data;
				this.$refs.child.view(data);
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
					this.$confirm('确定要删除此数据吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
						}).then(() => {
							var changeUser = selData[0];
							var id = changeUser.ID;
							var url = this.basic_url + '/api-apps/app/asset/' + id;
							this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
								if(res.data.resp_code == 0) {
									this.$message({
										message: '删除成功',
										type: 'success'
									});
									this.requestData();
								}else{
									this.$message({
										message: res.data.resp_msg,
										type: 'success'
									});
								}
							}).catch((err) => {
								this.$message({
									message: '网络错误，请重试',
									type: 'error'
								});
							});
						}).catch(() => {});    
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
			
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					DESCRIPTION: this.searchList.DESCRIPTION,
					VENDOR: this.searchList.VENDOR,
					KEEPER: this.searchList.KEEPER,
					STATE: this.searchList.STATE,
					OPTION_STATUS:  this.searchList.OPTION_STATUS,
				}
				var url = this.basic_url + '/api-apps/app/asset';
				
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.assetList = res.data.data;
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
			this.requestData();
             // 注册scroll事件并监听  
             let self = this;
              $(".div-table").scroll(function(){
                self.loadMore();
            })
              this.$refs.navsheader.sessionGet();
        },
	}
</script>

<style scoped>

</style>