<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_tabs></navs_tabs>
		</div>
		<div class="contentbg">
			<navs_left ref="navleft" v-on:childByValue="childvalue"></navs_left>
			<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button v-for="item in buttons" class="btn mr5" :class="item.style" @click="getbtn(item)">
									<i :class="item.icon"></i>{{item.name}}
								</button>
								<!--<button type="button" class="btn btn-green" @click="openAddMgr" id="">
                                	<i class="icon-add"></i>添加
                      			 </button>
								<button type="button" class="btn btn-blue button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" @click="deldata">
								    <i class="icon-trash"></i>删除
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="setrelation">
								    <i class="icon-cpu"></i>配置关系
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
						    		<i class="icon-search"></i>高级查询
						    		<i class="icon-arrow1-down" v-show="down"></i>
						    		<i class="icon-arrow1-up" v-show="up"></i>
								</button>
								<button type="button" class="btn btn-primarys button-margin" @click="createtable">
								    <i class="icon-refresh-cw"></i>生成表
								</button>-->
							</div>
						</div>
						<div class="columns columns-right btn-group pull-right">
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!-- 高级查询划出begin -->
					<div v-show="search">
						<el-form :model="searchList" label-width="45px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="表名">
										<el-input v-model="searchList.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="描述">
										<el-input v-model="searchList.description"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
									<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;margin-left: 2px">重置</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出end -->
					<el-row :gutter="0">
						<el-col :span="24">
							<!-- 表格begin-->
							<el-table ref="table" :data="dataList" 
									  border 
									  stripe  
									  :header-cell-style="rowClass" 
									  :height="fullHeight" 
									  style="width: 100%; margin: 0 auto;" 
									  :default-sort="{prop:'dataList', order: 'descending'}" 
									  @selection-change="SelChange"
									  v-loadmore="loadMore"
									  v-loading="loading"  
								  	  element-loading-text="加载中…"
								  	  element-loading-spinner="el-icon-loading"
								  	  element-loading-background="rgba(255, 255, 255, 0.9)">
								<el-table-column fixed type="selection" width="55" align="center">
								</el-table-column>
								<el-table-column label="表名" sortable width="320" prop="name" v-if="this.checkedName.indexOf('表名')!=-1">
								</el-table-column>
								<el-table-column label="描述" sortable prop="description" v-if="this.checkedName.indexOf('描述')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination background class="text-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40, 100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格end -->
						</el-col>
					</el-row>
				</div>
			</div>
			<datamask ref="child" @request="requestData" @requestTree="getKey" v-bind:page=page></datamask>
			<relamask ref="rela" @request="requestData" v-bind:page=page></relamask>
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_tabs from '../common/nav_tabs.vue'
	import datamask from '../settingDetails/data_mask.vue'
	import relamask from '../settingDetails/rela_mask.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	export default {
		name: 'data_management',
		components: {
			'vheader': vheader,
			'navs_tabs': navs_tabs,
			'navs_left': navs_left,
			'datamask': datamask,
			'relamask': relamask,
			'tableControle':tableControle
		},
		data() {
			return {
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				selUser: [],
				'启用': true,
				'冻结': false,
				'男': true,
				'女': false,
				search: false,
				show: false,
				down: true,
				up: false,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					name:'',
					description:''
				},
				checkedName: [
					'表名',
					'描述'
				],
				tableHeader: [
					{
						label: '表名',
						prop: 'name'
					},
					{
						label: '描述',
						prop: 'description'
					}
				],
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				treeData: [],
				page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				dataList:[],
				buttons:[],
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    // console.log(rowIndex) //表头行标号为0
			    return 'text-align:center'
			},
			tableControle(data){
				this.checkedName = data;
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			resetbtn(){
				this.searchList = { //点击高级搜索后显示的内容
					name:'',
					description:''
				};
				this.requestData();
			},
			//请求点击
		    getbtn(item){
		    	if(item.name=="添加"){
		         this.openAddMgr();
		    	}else if(item.name=="修改"){
		    	 this.modify();
		    	}else if(item.name=="高级查询"){
		    	 this.modestsearch();
		    	}else if(item.name=="删除"){
		    		this.deldata();
		    	}else if(item.name=="彻底删除"){
		    		this.physicsDel();
		    	}else if(item.name=="配置关系"){
		    		this.setrelation();
		    	}else if(item.name=="生成表"){
					this.createtable();
				}
		    },
			//配置关系
			setrelation(){
				this.$refs.rela.visible();
			},
			//添加数据
			openAddMgr() {
				this.$refs.child.resetNew();
				this.$refs.child.visible();
			},
			//修改数据
			modify() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail(selData[0].id);
				}
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
					this.up = !this.up
			},
			// 删除数据
			deldata() {
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
					var id = changeUser.id;
					var url = this.basic_url + '/apps-center/objectcfg/' + id;
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
					});
				}
			},
			//生成表
			createtable() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要生成表的数据',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时将多个数据生成表',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.id;
					var url = this.basic_url + '/apps-center/objectcfg/create/' + id;
					this.$axios.get(url, {}).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '生成表成功',
								type: 'success'
							});
							this.requestData();
						}
					}).catch((err) => {
					});
				}
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
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					name: this.searchList.name,
					description: this.searchList.description
				}
				var url = this.basic_url + '/apps-center/objectcfg';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;//页码赋值
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize);
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false;
					} else {
						this.loadSign = true;
					}
					this.dataList = res.data.data;
					this.loading = false;//加载动画关闭
					if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
						$('.el-table__body-wrapper table').find('.filing').remove();
					}//滚动加载数据判断filing
				}).catch((wrong) => {})
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
			transformTree(data){
				for(var i=0; i<data.length; i++){
					data[i].name = data[i].fullname;
					if(!data[i].pid || $.isArray(data[i].subDepts)){
						data[i].iconClass = 'icon-file-normal';
					}else{
						data[i].iconClass = 'icon-file-text';
					}
					if($.isArray(data[i].subDepts)){
						data[i].children = this.transformTree(data[i].subDepts);
					}
				}
				return data;
			},
			getTreeId(data){
			},
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			},
			//左侧菜单传来
		    childvalue:function ( childvalue) {
		    	 this.getbutton( childvalue);
		    },
			//请求页面的button接口
		    getbutton(childvalue){
		    	var data = {
					menuId: childvalue.id,
					roleId: this.$store.state.roleid,
				};
				var url = this.basic_url + '/api-user/permissions/getPermissionByRoleIdAndSecondMenu';
				this.$axios.get(url, {params: data}).then((res) => {
					this.buttons = res.data;
				}).catch((wrong) => {})

		    },
		},
		mounted() {
			this.requestData();
			this.getKey();
		},
	}
</script>

<style scoped>

</style>