<template>
<!-- 仪器和器量依据页面 -->
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
						<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
						<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
					</div>
				</div>
				<!-- 高级查询划出 Begin-->
				<div v-show="search">
						<el-form :model="searchList" label-width="70px">
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
								<el-col :span="4">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
									<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;margin-left: 2px">重置</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
				<!-- 高级查询划出 End-->
				<el-row :gutter="0">
					<el-col :span="5" class="lefttree">
							<div class="lefttreebg">
								<div class="left_tree_title clearfix" @click="min3max()">
									<div class="pull-left pr20" v-if="ismin">设备分类</div>
									<span class="pull-right navbar-minimalize minimalize-styl-2">
										<i class="icon-doubleok icon-double-angle-left blue"></i>
									</span>
								</div>
								<div class="left_treebg" :style="{height: fullHeight}">
									<div class="p15" v-if="ismin">
										<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all  :indent="22" :render-content="renderContent"  :props="resourceProps" @node-click="handleNodeClick">
										</el-tree>
									</div>
								</div>
							</div>
						</el-col>
					<el-col :span="19">
						<!-- 表格 Begin-->
						<el-table :header-cell-style="rowClass" :data="assetList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'assetList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
							<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
							</el-table-column>
							<el-table-column label="设备编号" width="130" sortable prop="ASSETNUM" v-if="this.checkedName.indexOf('设备编号')!=-1">
								<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.ASSETNUM}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="设备名称" width="200" sortable prop="DESCRIPTION" v-if="this.checkedName.indexOf('设备名称')!=-1">
							</el-table-column>
							<el-table-column label="型号" sortable prop="MODEL" v-if="this.checkedName.indexOf('型号')!=-1">
							</el-table-column>
							<el-table-column label="技术指标" width="120" sortable prop="ASSET_KPI" v-if="this.checkedName.indexOf('技术指标')!=-1">
							</el-table-column>						
							<el-table-column label="制造商" width="140" sortable prop="VENDOR" v-if="this.checkedName.indexOf('制造商')!=-1">
							</el-table-column>
							<el-table-column label="出厂编号" width="160" sortable prop="FACTOR_NUM" v-if="this.checkedName.indexOf('出厂编号')!=-1">
							</el-table-column>
							<el-table-column label="价格(万元)" width="140" sortable prop="A_PRICE" v-if="this.checkedName.indexOf('价格(万元)')!=-1">
							</el-table-column>
							<el-table-column label="接受日期" width="140" sortable prop="ACCEPT_DATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('接受日期')!=-1">
							</el-table-column>
							<el-table-column label="启用日期" width="140" sortable prop="S_DATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('启用日期')!=-1">
							</el-table-column>						
							<el-table-column label="配置地址" width="140" sortable prop="C_ADDRESS" v-if="this.checkedName.indexOf('配置地址')!=-1">
							</el-table-column>
							<el-table-column label="接收状态" width="120" sortable prop="A_STATUS" v-if="this.checkedName.indexOf('接收状态')!=-1">
							</el-table-column>
							<el-table-column label="保管人" width="200" sortable prop="KEEPER" v-if="this.checkedName.indexOf('保管人')!=-1">
							</el-table-column>						
							<el-table-column label="备注" width="200" sortable prop="MEMO" v-if="this.checkedName.indexOf('备注')!=-1">
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
		<instrumentsmask :detailData="selUser[0]" ref="child" @request="requestData"></instrumentsmask>
	</div>
</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import instrumentsmask from '../equipmentsDetails/instrument_mask.vue'
	export default {
		name: 'instruments',
		components: {
			vheader,
			navs_header,
			navs_left,
			instrumentsmask,
			tableControle,
		},
		data() {
			return {
				loadSign: true, //加载
				commentArr: {},
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
					children: "children",
					label: "CLASSIFY_DESCRIPTION"
				},
				page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				treeData: [],
			}
		},
		methods: {
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
			resetbtn(){
				this.searchList = { //点击高级搜索后显示的内容
					DESCRIPTION: '',
			        VENDOR: '',
			        KEEPER: '',
			        STATE: '',
			        OPTION_STATUS: ''
				};
			},
			//添加
			openAddMgr() {
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
				} else {						
					var url = this.basic_url + '/api-apps/app/asset/deletes';
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
					// this.assetList = res.data.data;
					// this.page.totalCount = res.data.count;
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
					this.assetList = newarr;
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				})
				
			},
			//  机构树
			getKey() {
				let that = this;
				var url = this.basic_url + '/api-apps/app/assetClass/tree?tree_id=CLASSIFY_NUM&tree_pid=PARENT';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data.datas;
					this.treeData = this.transformTree(this.resourceData);
				});
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
					//console.log('到底了', this.page.currentPage)
				}
			},
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			},
			childByValue:function(childValue) {
        		this.$refs.navsheader.showClick(childValue);
      		},
      		renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
				return (<span><i class={data.iconClass}></i><span>{node.label}</span></span>)
			},
		},
		mounted(){
			this.requestData();
            this.getKey();
        },
	}
</script>

<style scoped>

</style>