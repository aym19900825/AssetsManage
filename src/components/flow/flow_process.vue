<template>
<div>
	<div class="headerbg">
			<vheader></vheader>
			<navs_tabs ref="navsTabs"></navs_tabs>
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
<!-- 							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button type="button" class="btn btn-green" @click="openAddMgr">
                                	<i class="icon-add"></i>添加
                      			 </button>
								<button type="button" class="btn btn-blue button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" @click="delinfo">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-upload-cloud"></i>导入
								</button>
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-download-cloud"></i>导出
								</button>
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-print"></i>打印
								</button>
								<button type="button" class="btn btn-primarys button-margin">
							    	<i class="icon-alert-triangle"></i>中止
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
						    		<i class="icon-search"></i>高级查询
						    		<i class="icon-arrow1-down" v-show="down"></i>
						    		<i class="icon-arrow1-up" v-show="up"></i>
								</button>
							</div> -->
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
						<el-col :span="24" class="leftcont">
							<!-- 表格 -->
							<el-table ref="table" :data="flowmodelList" 
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
								<el-table-column label="流程定义ID" sortable width="200px" prop="id" v-if="this.checkedName.indexOf('流程定义ID')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row.ID)>{{scope.row.id}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="流程名称" sortable width="140px" prop="name" v-if="this.checkedName.indexOf('流程名称')!=-1">
								</el-table-column>
								<el-table-column label="流程标识" sortable width="140px" prop="key" v-if="this.checkedName.indexOf('流程标识')!=-1">
								</el-table-column>
								<el-table-column label="类型" sortable width="140px" prop="category" v-if="this.checkedName.indexOf('类型')!=-1">
								</el-table-column>
								<el-table-column label="部署id" sortable width="100px" prop="deploymentId" v-if="this.checkedName.indexOf('部署id')!=-1">
								</el-table-column>
								<el-table-column label="流程图资源" width="220px" prop="diagramResourceName" sortable  v-if="this.checkedName.indexOf('流程图资源')!=-1">
								</el-table-column>
								<el-table-column label="版本" prop="version" sortable  v-if="this.checkedName.indexOf('版本')!=-1">
								</el-table-column>
								<el-table-column label="资源名称" sortable width="200px" prop="resourceName" v-if="this.checkedName.indexOf('资源名称')!=-1">
								</el-table-column>
							</el-table>
							
							<el-pagination background class="text-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 -->
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
	</div>		
</div>	
</template>

<script>
import Config from '../../config.js'
import vheader from '../common/vheader.vue'
import navs_left from '../common/left_navs/nav_left5.vue'
import navs_tabs from '../common/nav_tabs.vue'

export default {
	name: 'task',
		components: {
			vheader,
			navs_tabs,
			navs_left
		},

    data() {
      return {
      	basic_url: Config.dev_url,
      	fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
		loadSign: true, //鼠标滚动加载数据
		loading: false,//默认加载数据时显示loading动画
      	search: false,
      	flowmodelList:[],
      	commentArr: {},
      	checkedName: [
			'流程定义ID',
			'类型',
			'流程标识',
			'流程名称',
			'部署id',
			'流程图资源',
			'版本',
			'资源名称'
		],
		tableHeader: [{
			label: '流程定义ID',
			prop: 'id'
		},
		{
			label: '类型',
			prop: 'category'
		},
		{
			label: '流程标识',
			prop: 'key'
		},
		{
			label: '流程名称',
			prop: 'name'
		},
		{
			label: '部署id',
			prop: 'deploymentId'
		},
		{
			label: '流程图资源',
			prop: 'diagramResourceName'
		},
		{
			label: '版本',
			prop: 'version'
		},
		{
			label: '资源名称',
			prop: 'resourceName'
		}
		],
		searchList: {
			createTime:'',
		},
		page: {
			currentPage: 1,
			pageSize: 20,
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
		//表格滚动加载
		loadMore() {
			let up2down = sessionStorage.getItem('up2down');
			if(this.loadSign) {					
				if(up2down=='down'){
					this.page.currentPage++;
					if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
						this.page.currentPage = Math.ceil(this.page.totalCount / this.page.pageSize)
						return false;
					}
					let append_height = window.innerHeight - this.$refs.table.$el.offsetTop - 50;
					if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
						$('.el-table__body-wrapper table').append('<div class="filing" style="height: '+append_height+'px;width: 100%;"></div>');
						sessionStorage.setItem('toBtm','true');
					}
				}else{
					sessionStorage.setItem('toBtm','false');
					this.page.currentPage--;
					if(this.page.currentPage < 1) {
						this.page.currentPage=1;
						return false;
					}
				}
				this.loadSign = false;
				setTimeout(() => {
					this.loadSign = true;
				}, 1000)
				this.requestData();
			}
		},
		//改变页数
		sizeChange(val) {
			this.page.pageSize = val;
			if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
				$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
				sessionStorage.setItem('toBtm','true');
			}else{
				sessionStorage.setItem('toBtm','false');
			}
			this.requestData();
		},
		//当前页数
		currentChange(val) {
			this.page.currentPage = val;
			if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
				$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
				sessionStorage.setItem('toBtm','true');
			}else{
				sessionStorage.setItem('toBtm','false');
			}
			this.requestData();
		},
		//Table默认加载数据
		requestData() {
			this.loading = true;//加载动画打开
			var url = this.basic_url + '/api-flow/flow/process';
			this.$axios.get(url, {}).then((res) => {
				this.page.totalCount = res.data.count;//页码赋值
				//总的页数
				let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize);
				if(this.page.currentPage >= totalPage) {
					this.loadSign = false
				} else {
					this.loadSign = true
				}
				this.flowmodelList = res.data.data;
				this.loading = false;//加载动画关闭
				if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
					$('.el-table__body-wrapper table').find('.filing').remove();
				}//滚动加载数据判断filing
			}).catch((wrong) => {
				this.$message({
					message: '网络错误，请重试1',
					type: 'error'
				});
			})
		},
		childByValue:function(childValue) {
    		// childValue就是子组件传过来的值
    		this.$refs.navsTabs.showClick(childValue);
      	},
	},
	mounted(){
	  	this.requestData();
	},
}
</script>

<style>
</style>