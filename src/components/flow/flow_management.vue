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
			<div id="wrapper-content" class="wrapper">
				<div class="ibox-content">
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button type="button" class="btn btn-green" @click="openAddMgr">
                                	<i class="icon-add"></i>添加
                      			 </button>
								<button type="button" class="btn btn-blue button-margin" @click="editor">
								    <i class="icon-edit"></i>编辑
								</button>
								<button type="button" class="btn btn-red button-margin" @click="delinfo">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="release">
							    	<i class="icon-upload-cloud"></i>发布
								</button>
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-download-cloud"></i>导出
								</button>
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-print"></i>打印
								</button>
								<!--<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
						    		<i class="icon-search"></i>高级查询
								</button>-->
							</div>
						</div>
						<div class="columns columns-right btn-group pull-right">
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
							<div class="keep-open btn-group" title="列">
								<el-dropdown :hide-on-click="false" class="pl10 btn btn-default btn-outline">
									<span class="el-dropdown-link">
										<font class="J_tabClose"><i class="icon-menu3"></i></font>
										<i class="el-icon-arrow-down icon-arrow2-down"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-checkbox-group v-model="checkedName">
											<el-dropdown-item v-for="(item,index) in tableHeader" :key="index">
												<el-checkbox :label="item.label" name="type"></el-checkbox>
											</el-dropdown-item>
										</el-checkbox-group>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
					<!-- 高级查询划出 Begin-->
					<!--<div v-show="search">
						<el-form :model="searchList">
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="委托单位名称" prop="V_NAME"  label-width="100px">
										<el-input v-model="searchList.V_NAME"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="样品名称" prop="ITEM_NAME" label-width="70px">
										<el-input v-model="searchList.ITEM_NAME"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="检测报告编号" prop="REPORT_NUM" label-width="100px">
										<el-input v-model="searchList.REPORT_NUM"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="检测委托书编号" prop="PROXYNUM" label-width="110px">
										<el-input v-model="searchList.PROXYNUM"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="完成日期" prop="COMPDATE" label-width="100px">
										<el-date-picker v-model="searchList.COMPDATE" type="date" placeholder="完成日期" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%">
									</el-date-picker>
									</el-form-item>
								</el-col>
								
								<el-col :span="5">
									<el-form-item label="状态" prop="STATUS" label-width="70px">
										<el-select clearable v-model="searchList.STATUS" placeholder="选择状态" style="width: 100%">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="2">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>-->
					<!-- 高级查询划出 End-->

					<el-row :gutter="10">
						<el-col :span="24" class="leftcont v-resize">
							<!-- 表格 -->
							<el-table :data="flowmodelList" 
							          :header-cell-style="rowClass" 
									  border 
									  stripe 
									  :height="fullHeight" 
									  style="width: 100%;" 
									  :default-sort="{prop:'inspectList', order: 'descending'}" 
									  @selection-change="SelChange" 
									  v-loadmore="loadMore"
									  v-loading="loading"  
									  element-loading-text="加载中…"
    								  element-loading-spinner="el-icon-loading"
    								  element-loading-background="rgba(255, 255, 255, 0.9)">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="编号" sortable width="130px" prop="id" v-if="this.checkedName.indexOf('编号')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row.ID)>{{scope.row.id}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="类型" sortable width="140px" prop="category" v-if="this.checkedName.indexOf('类型')!=-1">
								</el-table-column>
								<el-table-column label="模型标识" sortable width="140px" prop="key" v-if="this.checkedName.indexOf('模型标识')!=-1">
								</el-table-column>
								<el-table-column label="模型名称" sortable width="140px" prop="name" v-if="this.checkedName.indexOf('模型名称')!=-1">
								</el-table-column>
								<el-table-column label="模型版本" sortable width="140px" prop="version" v-if="this.checkedName.indexOf('模型版本')!=-1">
								</el-table-column>
								<el-table-column label="创建时间" width="200px" prop="createTime" sortable  v-if="this.checkedName.indexOf('创建时间')!=-1">
								</el-table-column>
							</el-table>
							
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<flowmanmask  ref="child" @request="requestData" ></flowmanmask>
		<iframemask  ref="childIframe" ></iframemask>
	</div>		
</div>	
</template>

<script>
import Config from '../../config.js'
import vheader from '../common/vheader.vue'
import navs_left from '../common/left_navs/nav_left5.vue'
import navs_header from '../common/nav_tabs.vue'
import flowmanmask from '../flowDetails/flow_manMask.vue'
import iframemask from '../flowDetails/ifram.vue'
export default {
	name: 'task',
		components: {
			vheader,
			navs_header,
			navs_left,
			flowmanmask,
			iframemask
		},

    data() {
      return {
		loading: false,
      	basic_url: Config.dev_url,
      	fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
      	search: false,
      	flowmodelList:[],
      	commentArr: {},
      	checkedName: [
					'编号',
					'类型',
					'模型标识',
					'模型名称',
					'模型版本',
					'创建时间'
					],
		tableHeader: [{
			label: '编号',
			prop: 'id'
		},
		{
			label: '类型',
			prop: 'category'
		},
		{
			label: '模型标识',
			prop: 'key'
		},
		{
			label: '模型名称',
			prop: 'name'
		},
		{
			label: '模型版本',
			prop: 'version'
		},
		{
			label: '创建时间',
			prop: 'createTime'
		}
		],
		searchList: {
					createTime:'',	
				},
		page: {
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
		//点击的数据
		SelChange(val) {
				this.selUser = val;
	    },
	    sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
		},
		currentChange(val) {
			this.page.currentPage = val;
			this.requestData();
		},
		//滚动加载更多
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
				this.requestData();
			}
		},
		//添加
		openAddMgr() {
//		    this.$refs.child.resetNew();
			this.$refs.child.visible();
			
		},
		requestData() {
//				var data = {
//					page: this.page.currentPage,
//					limit: this.page.pageSize,
//					PRO_NUM: this.searchList.PRO_NUM,
//					PRO_NAME: this.searchList.PRO_NAME,
//					VERSION: this.searchList.VERSION,
//					DEPTID: this.searchList.DEPTID,
//					// STATUS: this.searchList.STATUS,
//				}
				this.loading = true;
				var url = this.basic_url + '/api-flow/flow/model';
				this.$axios.get(url, {}).then((res) => {
					this.page.totalCount = res.data.count;
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize);
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
					this.flowmodelList = newarr;
					this.loading = false;
				}).catch((wrong) => {
					
					
				})
		},
		//修改（编辑）
		editor(){
			if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择要修改的流程',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时修改多个流程',
						type: 'warning'
					});
					return;
				} else {
					console.log(this.selUser[0]);
					this.$refs.childIframe.visible(this.selUser[0].id);
				}
		},
		//删除
		delinfo(){
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
					var changeMenu = selData[0];
					var id=changeMenu.id
					console.log(id);
						var url = this.basic_url + '/api-flow/flow/model/'+id;
						this.$axios.delete(url, {}).then((res) => { //.delete 传数据方法
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
		//发布
		release(){
			if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择要修改的流程',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时修改多个流程',
						type: 'warning'
					});
					return;
				} else {
					console.log(this.selUser[0]);
					console.log(this.selUser[0].deploymentId);
					var id=this.selUser[0].id;
					var url = this.basic_url + '/api-flow/flow/model/'+id+'/deploy';
					console.log(url);
					this.$axios.get(url, {}).then((res) => {
						console.log(res);
							if(res.data.resp_code == 0) {
								this.$message({
									message: 'res.data.resp_msg',
									type: 'success'
								});
								this.requestData();
							}else{
								this.$message({
									message: 'res.data.resp_msg',
									type: 'warning'
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

		childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
      	},
},
	  mounted(){
	  	this.requestData();
	},
}
</script>

<style>
</style>