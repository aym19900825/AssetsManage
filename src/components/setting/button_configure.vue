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
							<button type="button" class="btn btn-red button-margin" @click="physicsDel">
							    <i class="icon-trash1"></i>彻底删除
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
						<el-form :model="searchList" label-width="45px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="所属应用ID" prop="menuId">
										<el-input v-model="searchList.menuId"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="按钮名称" prop="name">
										<el-input v-model="searchList.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="按钮样式颜色" prop="style">
										<el-select clearable v-model="searchList.style" filterable allow-create default-first-option placeholder="请选择">
										    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
									<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;    margin-left: 2px">重置</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->
					<el-row :gutter="0">
						<el-col :span="24">
							<!-- 表格 Begin-->
							<el-table ref="table" :header-cell-style="rowClass"
								:data="categoryList"
    							border
    							stripe
    							:height="fullHeight"
    							style="width: 100%;"
    							:default-sort="{prop:'categoryList', order: 'descending'}"
    							@selection-change="SelChange"
    							v-loadmore="loadMore"
								v-loading="loading"
								element-loading-text="加载中…"
    							element-loading-spinner="el-icon-loading"
						  		element-loading-background="rgba(255, 255, 255, 0.9)">
								<el-table-column type="selection" fixed width="55" v-if="this.checkedName.length>0" align="center">
								</el-table-column>

								<el-table-column label="按钮名称" width="160" sortable prop="name" v-if="this.checkedName.indexOf('按钮名称')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.name}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="所属应用ID" width="140" sortable prop="menuId" v-if="this.checkedName.indexOf('所属应用ID')!=-1" align="center">
								</el-table-column>
								<el-table-column label="按钮图标" width="125" align="right" sortable prop="icon" v-if="this.checkedName.indexOf('按钮图标')!=-1">
									<template slot-scope="scope">
										<i :class="scope.row.icon"></i> <!-- {{scope.row.icon}} -->
									</template>
								</el-table-column>
								<el-table-column label="按钮样式颜色" sortable prop="style" v-if="this.checkedName.indexOf('按钮样式颜色')!=-1">
									<template slot-scope="scope">
										<button type="button" :class="'el-button el-button--style el-button--mini '+ scope.row.style">{{scope.row.style}}</button>
									</template>
								</el-table-column>
								<el-table-column label="排序" width="100" sortable prop="sort" v-if="this.checkedName.indexOf('排序')!=-1">
								</el-table-column>
								<el-table-column label="录入时间" width="160" prop="createTime" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<el-table-column label="修改时间" width="160" prop="updateTime" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
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
			<btnconfigmask :CATEGORY="CATEGORY" ref="btnconfigmask" @request="requestData" @reset="reset" v-bind:page=page></btnconfigmask>
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
	import btnconfigmask from '../settingDetails/buttonconfigure_mask.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import reportmask from'../reportDetails/reportMask.vue'
	export default {
		name: 'customer_management',
		components: {
			vheader,
			navs_left,
			navs_header,
			btnconfigmask,
			tableControle,
			reportmask,
		},
		data() {
			return {
				reportData:{},//报表的数据
				scroll_old:0,
				// up2down:'down',
				reportData:{},//报表的数据
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				commentArr: {},
				loading: false,//默认加载数据时显示loading动画
				fileList:[],
				value: '',
				productType:'productType',//appname
				searchData: {
					page: 1,
					limit: 20, //分页显示数
					nickname: '',
					enabled: '',
					searchKey: '',
					searchValue: '',
					companyId: '',
					deptId: ''
				},
				checkedName: [
					'按钮名称',
					'所属应用ID',
					'按钮图标',
					'按钮样式颜色',
					'排序',
					'录入时间',
					'修改时间'
				],
				tableHeader: [{
						label: '按钮名称',
						prop: 'name'
					},{
						label: '所属应用ID',
						prop: 'menuId'
					},
					
					{
						label: '按钮图标',
						prop: 'icon'
					},
					{
						label: '按钮样式颜色',
						prop: 'style'
					},
					{
						label: '排序',
						prop: 'sort'
					},
					{
						label: '录入时间',
						prop: 'createTime'
					},
					{
						label: '修改时间',
						prop: 'updateTime'
					}
				],
				selUser: [],
				categoryList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					menuId:'',
					name: '',
					style:'',
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					btnconfigmaskren: "subDepts",
					label: "simplename"
				},
				page: { //分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				CATEGORY: {},//修改子组件时传递数据
				selectData: [],
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			//机构值
			getCompany() {
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.selectData = res.data;
				});
			},
			//表格滚动加载
			loadMore() {
				//console.log(this.$refs.table.$el.offsetTop)
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
							this.page.currentPage=1
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
			tableControle(data) {
				this.checkedName = data;
			},
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
			//重置
			resetbtn(){
				this.searchList = {
					name:'',
					menuId:'',
					style: '',
				};
				this.requestData();
			},
			//搜索
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			//清空
			reset() {
				this.CATEGORY = {
					id: '',
					name: '',
					menuId: '',
					icon: '',
					style: '',
					sort: '',
					createTime: '',
					updateTime: '',
				};
				if(this.$refs['CATEGORY'] !== undefined) {
					this.$refs['CATEGORY'].resetFields();
				}
			},
			//添加按钮配置
			openAddMgr() {
				this.reset();
				this.$refs.btnconfigmask.open(); // 方法1
				this.$refs.btnconfigmask.visible();
				
			},
			//修改按钮配置
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
					this.CATEGORY = this.selUser[0];
					this.$refs.btnconfigmask.detail();
				}
			},
			//查看
			 view(data) {
			 	this.CATEGORY =data;
				this.$refs.btnconfigmask.view();
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
					var url = this.basic_url + '/api-apps/app/permissions/deletes';
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
			//彻底删除
			physicsDel(){
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/productType/physicsDel';
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
			handleSuccess(response, file, fileList){
				console.log(response);
				console.log(file);
				console.log(fileList);
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
					name:this.searchList.name,
					menuId:this.searchList.menuId,
					style: this.searchList.style,
				}
				var url = this.basic_url + '/api-user/permissions';
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
					this.categoryList = res.data.data;
					this.loading = false;
					if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
						$('.el-table__body-wrapper table').find('.filing').remove();
					}
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试1',
						type: 'error'
					});
				})
			},
			handleNodeClick(data) {},
			formatter(row, column) {
				return row.enabled;
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
      		}
		},
		mounted() {
			this.requestData();
			this.getCompany();
		}
	}
</script>

<style scoped>

</style>