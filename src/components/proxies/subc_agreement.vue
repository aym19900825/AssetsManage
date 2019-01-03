<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header></navs_header>
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
							<!-- <button type="button" class="btn btn-green" @click="openAddMgr" id="">
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
							</button> -->
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
						<el-row :gutter="5">
							<el-col :span="5">
								<el-form-item label="分包协议编号" prop="PROXY_CONTRACT_NUM" label-width="100px">
									<el-input v-model="searchList.PROXY_CONTRACT_NUM"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="委托书编号" prop="PROXYNUM" label-width="85px">
									<el-input v-model="searchList.PROXYNUM"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="分包单位" prop="VENDOR" label-width="70px">
									<el-input v-model="searchList.VENDOR"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								  <el-form-item label="录入时间" prop="ENTERDATE" label-width="70px">
									<div class="block">
									    <el-date-picker
									      v-model="searchList.ENTERDATE"
									      type="date" style="width: 100%;"
									      placeholder="录入时间">
									    </el-date-picker>
								  </div>
								</el-form-item>
							</el-col>
							<el-col :span="2">
								<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 高级查询划出 End-->
				<el-row :gutter="5">
					<!-- 左侧树菜单 Begin-->
					<el-col :span="5" class="lefttree">
						<div class="lefttreebg">
							<div class="left_tree_title clearfix" @click="min3max()">
								<div class="pull-left pr20" v-if="ismin">检索分类</div>
								<span class="pull-right navbar-minimalize minimalize-styl-2">
									<i class="icon-doubleok icon-double-angle-left blue"></i>
								</span>
							</div>
							<div class="left_treebg" :style="{height: fullHeight}">
								<div class="p15" v-if="ismin">
									<el-tree ref="tree" class="filter-tree" :data="resourceData" node-key="id" default-expand-all :indent="22" :render-content="renderContent" :props="resourceProps" @node-click="handleNodeClick">
									</el-tree>
								</div>
							</div>
						</div>
					</el-col>
					<!-- 左侧树菜单 End-->
					<el-col :span="19" class="leftcont v-resize">
						<!-- 表格 Begin-->
						<el-table :header-cell-style="rowClass" :data="subagree" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'subagree', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
							<el-table-column type="selection" width="55" v-if="this.checkedName.length>0" align="center">
							</el-table-column>
							<el-table-column label="分包协议编号" width="150" sortable prop="PROXY_CONTRACT_NUM" v-if="this.checkedName.indexOf('分包协议编号')!=-1">
							</el-table-column>
							<el-table-column label="委托书编号" width="150" sortable prop="PROXYNUM" v-if="this.checkedName.indexOf('委托书编号')!=-1">
							</el-table-column>
							<el-table-column label="分包单位" width="150" sortable prop="VENDOR" v-if="this.checkedName.indexOf('分包单位')!=-1">
							</el-table-column>
							<el-table-column label="检验/检测项目内容" width="150" sortable prop="P_REMARKS" v-if="this.checkedName.indexOf('检验/检测项目内容')!=-1">
							</el-table-column>						
							<el-table-column label="对环境和操作人员要求" width="180" sortable prop="REQUIRE" v-if="this.checkedName.indexOf('对环境和操作人员要求')!=-1">
							</el-table-column>
							<el-table-column label="对分包报告/证书的要求" width="180" sortable prop="Q_TYPE" v-if="this.checkedName.indexOf('对分包报告/证书的要求')!=-1">
							</el-table-column>
							<el-table-column label="检验检测费用" width="120" sortable prop="CHECKCOST" v-if="this.checkedName.indexOf('检验检测费用')!=-1">
							</el-table-column>
							<el-table-column label="信息状态" width="100" sortable prop="STATUS" v-if="this.checkedName.indexOf('信息状态')!=-1">
							</el-table-column>
							<el-table-column label="录入人" width="100" sortable prop="ENTERBY" v-if="this.checkedName.indexOf('录入人')!=-1">
							</el-table-column>
							<el-table-column label="录入时间" width="120" sortable prop="ENTERDATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
							</el-table-column>
							<el-table-column label="修改人" width="100" sortable prop="CHANGEBY" v-if="this.checkedName.indexOf('修改人')!=-1">
							</el-table-column>
							<el-table-column label="修改时间" width="120" sortable prop="CHANGEDATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
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
		<!-- <customermask @request="requestData" v-bind:page=page></customermask> -->
	</div>
</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue' 
	import table from '../plugin/table/table-normal.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	export default {
		name: 'user_management',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			table
		},
		data() {
			return {
				// dataUrl: '/api/api-user/users',
				basic_url: Config.dev_url,
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
					'分包协议编号',
					'委托书编号',
					'分包单位',
					'检验/检测项目内容',
					'检验检测项目依据',
					'对环境和操作人员要求',
					'对分包报告/证书的要求',
					'检验检测费用',
					'信息状态',
					'录入人',
					'录入时间',
					'修改人',
					'修改时间'
				],
				tableHeader: [
					{
						label: '分包协议编号',
						prop: 'PROXY_CONTRACT_NUM'
					},
					{
						label: '委托书编号',
						prop: 'PROXYNUM'
					},
					{
						label: '分包单位',
						prop: 'VENDOR'
					},
					{
						label: '检验/检测项目内容',
						prop: 'P_REMARKS'
					},
					{
						label: '检验检测项目依据',
						prop: 'BASIS'
					},
					{
						label: '对环境和操作人员要求',
						prop: 'REQUIRE'
					},
					{
						label: '对分包报告/证书的要求',
						prop: 'Q_TYPE'
					},
					{
						label: '检验检测费用',
						prop: 'CHECKCOST'
					},
					{
						label: '信息状态',
						prop: 'STATUS'
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
				companyId: '',
				deptId: '',
				selUser: [],
				// '启用': true,
				// '冻结': false,
				subagree: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					PROXY_CONTRACT_NUM: '',
					PROXYNUM: '',
					VENDOR: '',
					ENTERBY:'',
					ENTERDATE:''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "fullname"
				},
				userData:[],
				//分页显示
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				aaaData:[],
			}
		},

		mounted(){
			// 获取浏览器可视区域高度
			window.onresize = () => {//获取浏览器可视区域高度
			 	return (() => {
			 		this.fullHeight.height = document.documentElement.clientHeight - 100+'px';
			 	})()
		 	};	
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
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
				this.up = !this.up
			},
			openAddMgr(){

			},
			modify(){

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
				} else {
					var url = this.basic_url + '/api-apps/app/checkProCont2/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for (var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].ID);
					}
					//ids为deleteid数组用逗号拼接的字符串
					ids = deleteid.toString(',');
                    var data = {
						ids: ids,
					}
					this.$confirm('确定删除该条信息吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        this.$axios.delete(url, {params: data}).then((res) => {
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
			// judge(data) {
			// 	//taxStatus 布尔值
			// 	return data.enabled ? '启用' : '冻结'
			// },
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
					PROXY_CONTRACT_NUM: this.searchList.PROXY_CONTRACT_NUM,
					PROXYNUM: this.searchList.PROXYNUM,
					VENDOR: this.searchList.VENDOR,
					ENTERBY: this.searchList.ENTERBY,
					ENTERDATE: this.searchList.ENTERDATE
				}
				var url = this.basic_url + '/api-apps/app/checkProCont2';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					console.log(111);
					console.log(res);
					this.subagree = res.data.data;
					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
				// this.subagree.forEach((item, index) => {
				// 	var id = item.id;
				// 	this.$axios.get('/users/' + id + '/roles', data).then((res) => {
				// 		this.subagree.role = res.data.roles[0].name;
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
				if(data.type == '1') {
					this.companyId = data.id;
					this.deptId = '';
				} else {
					this.deptId = data.id;
					this.companyId = '';
				}
				this.requestData();
			},
			formatter(row, column) {
				return row.enabled;
			},
			renderContent(h, {node,data,store}) { //自定义Element树菜单显示图标
				console.log();
				return(
					<span>
		              <i class={data.iconClass}></i>
		              <span>{node.label}</span>
		            </span>
				);
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
			//机构树
			getKey() {
				let that = this;
				var url = this.basic_url + '/api-user/depts/tree';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data;
					this.treeData = this.transformTree(this.resourceData);
				});
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
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
			this.getKey();
		},
	}
</script>

<style scoped>

</style>