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
		<div class="wrapper wrapper-content">
			<div class="ibox-content">
				<div class="fixed-table-toolbar clearfix">
					<div class="bs-bars pull-left">
						<div class="hidden-xs" id="roleTableToolbar" role="group">
							<button v-for="item in buttons" class="btn mr5" :class="item.style" @click="getbtn(item)">
									<i :class="item.icon"></i>{{item.name}}
							</button>
							<!-- <button type="button" class="btn btn-green" @click="openAddMgr">
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
							</button> -->
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
							<el-col :span="4">
								<el-button type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
								<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;margin-left: 2px">重置</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 高级查询划出 End-->
				<el-row :gutter="0">
					<el-col :span="24">
						<!-- 表格 Begin-->
						<el-table ref="table" :data="reportsList" 
							      border 
								  stripe 
								  :height="fullHeight" 
								  style="width: 100%;" 
								  :default-sort="{prop:'reportsList', order: 'descending'}" 
								  @selection-change="SelChange" 
								  v-loadmore="loadMore"
								  v-loading="loading"  
								  element-loading-text="加载中…"
								  element-loading-spinner="el-icon-loading"
								  element-loading-background="rgba(255, 255, 255, 0.9)">
							<el-table-column type="selection" width="55" v-if="this.checkedName.length>0">
							</el-table-column>
							<el-table-column label="序号" sortable prop="id" v-if="this.checkedName.indexOf('序号')!=-1">
								<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row.id)>{{scope.row.id}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="报表名称" width="200" sortable prop="code" v-if="this.checkedName.indexOf('报表名称')!=-1">
							</el-table-column>
							<el-table-column label="报表文件" width="220" sortable prop="name" v-if="this.checkedName.indexOf('报表文件')!=-1">
							</el-table-column>
							<!-- <el-table-column label="报表文件" width="230" sortable prop="file" v-if="this.checkedName.indexOf('报表文件')!=-1">
							</el-table-column> -->
							<el-table-column label="备注" width="200" sortable prop="remarks" v-if="this.checkedName.indexOf('备注')!=-1">
							</el-table-column>
							<el-table-column label="类型" sortable width="140" prop="type" v-if="this.checkedName.indexOf('类型')!=-1">
							</el-table-column>						
							<!-- <el-table-column label="录入人" sortable width="120" prop="createby" v-if="this.checkedName.indexOf('录入人')!=-1">
							</el-table-column>	 -->
							<el-table-column label="录入时间" width="160" sortable prop="createdate" v-if="this.checkedName.indexOf('录入时间')!=-1">
							</el-table-column>	
							<!-- <el-table-column label="修改人" width="120" sortable prop="updateby" v-if="this.checkedName.indexOf('修改人')!=-1">
							</el-table-column> -->
							<el-table-column label="修改日期" width="160" sortable prop="updatedate" v-if="this.checkedName.indexOf('修改日期')!=-1">
							</el-table-column>
						</el-table>
						<!-- 表格 End-->
						<el-pagination background class="text-right pt10" v-if="this.checkedName.length>0"
				            @size-change="sizeChange"
				            @current-change="currentChange"
				            :current-page="page.currentPage"
				            :page-sizes="[10, 20, 30, 40]"
				            :page-size="page.pageSize"
				            layout="total, sizes, prev, pager, next"
				            :total="page.totalCount">
				        </el-pagination>
					</el-col>
				</el-row>
			</div>
		</div>
		<!--右侧内容显示 End-->
		<reportmask ref="child" @request="requestData"></reportmask>
	</div>
</div>
</template>
<script>
	import Config from '../../config.js';
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_tabs from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import reportmask from '../reportDetails/reportConfigurationMask.vue'
	export default {
		name: 'report',
		components: {
			vheader,
			navs_left,
			navs_tabs,
			tableControle,
			reportmask
		},
		data() {
			return {
				dataInfo:{},
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				checkedName: [
					'序号',
					'报表名称',
					// 'id',
					'报表文件',
					'备注',
					'类型',
					// '录入人',
					'录入时间',
					// '修改人',
					'修改日期'
				],
				tableHeader: [
					{
						label: '序号',
						prop: 'id'
					},
					{
						label: '报表名称',
						prop: 'code'
					},
					{
						label: '报表文件',
						prop: 'name'
					},
					{
						label: '备注',
						prop: 'remarks'
					},
					{
						label: '类型',
						prop: 'type'
					},
					// {
					// 	label: '录入人',
					// 	prop: 'createby'
					// },
					{
						label: '录入时间',
						prop: 'createdate'
					},
					// {
					// 	label: '修改人',
					// 	prop: 'updateby'
					// },
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
				buttons:[],
			}
		},
		methods: {
			//请求点击
		    getbtn(item){
		    	if(item.name=="添加"){
		         this.openAddMgr();
		    	}else if(item.name=="修改"){
		    	 this.modify();
		    	}else if(item.name=="彻底删除"){
		    	 this.physicsDel();
		    	}else if(item.name=="高级查询"){
		    	 this.modestsearch();
		    	}else if(item.name=="导入"){
		    	 this.download();
		    	}else if(item.name=="删除"){
		    	 this.del();
		    	}else if(item.name=="报表"){
			     this.reportdata();
				}else if(item.name=="打印"){
				   this.Printing();
				}
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
		    resetbtn(){
				this.searchList = { //点击高级搜索后显示的内容
					typename: '',
				};
				this.requestData();
			},
			searchinfo() {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
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
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					console.log(this.selUser[0]);
					this.$refs.child.detail(this.selUser[0].id);
				}
			},
			//查看
			 view(dataid) {
				console.log(dataid);
			 	// this.reportsList =data;
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
				} else {
					var url = this.basic_url + '/api-report/report/deletes';
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
				}
				var url = this.basic_url + '/api-report/report';
				this.$axios.get(url, {params: data}).then((res) => {
					this.page.totalCount = res.data.count;
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false
					} else {
						this.loadSign = true
					}
					this.reportsList = res.data.data;
					this.loading = false;//加载动画关闭
					if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
						$('.el-table__body-wrapper table').find('.filing').remove();
					}//滚动加载数据判断filing
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				})
			},
			formatter(row, column) {
				return row.enabled;
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
				this.$refs.navsTabs.showClick(childValue);
				this.getbutton(childValue);
			},
			//请求页面的button接口
		    getbutton(childByValue){
		    	// console.log(childByValue);
		    	var data = {
					menuId: childByValue.id,
					roleId: this.$store.state.roleid,
				};
				var url = this.basic_url + '/api-user/permissions/getPermissionByRoleIdAndSecondMenu';
				this.$axios.get(url, {params: data}).then((res) => {
					this.buttons = res.data;
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				})
		    },
		},
		mounted() {
			this.requestData();
		},
	}
</script>

<style scoped>

</style>