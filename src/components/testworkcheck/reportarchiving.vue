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
					<!--按钮操作行 Begin-->
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<button v-for="item in buttons" :key='item.id' :class="'btn mr5 '+ item.style" @click="getbtn(item)">
									<i :class="item.icon"></i>{{item.name}}
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
						<el-form :model="searchList" label-width="70px">
							<el-row :gutter="10">
                                <el-col :span="7">
									<el-form-item label="报告编号" prop="REPORTNUM">
										<el-input v-model="searchList.REPORTNUM"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="7">
									<el-form-item label="报告名称" prop="REPORTNAME">
										<el-input v-model="searchList.REPORTNAME"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="7">
									<el-form-item label="委托书编号" prop="PROXYNUM" label-width="90px">
										<el-input v-model="searchList.PROXYNUM"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="7">
									<el-form-item label="归档人" prop="ONHOLEPERSON" label-width="70px">
										<el-input v-model="searchList.ONHOLEPERSON"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="7">
									<el-form-item label="归档时间" prop="ONHOLTIME">
										<el-date-picker v-model="searchList.ONHOLTIME" type="date" placeholder="请选择" value-format="yyyy-MM-dd" style="width: 100%;">
										</el-date-picker>
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
							<el-table ref="table" :header-cell-style="rowClass" 
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
								<el-table-column label="报告编号" width="155" sortable prop="REPORTNUM" v-if="this.checkedName.indexOf('报告编号')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.REPORTNUM}}
										</p>
									</template>
								</el-table-column>
                                <el-table-column label="报告名称" sortable prop="REPORTNAME" v-if="this.checkedName.indexOf('报告名称')!=-1">
								</el-table-column>
								<el-table-column label="委托书编号" sortable prop="PROXYNUM" v-if="this.checkedName.indexOf('委托书编号')!=-1">
								</el-table-column>
								<el-table-column label="归档人" width="100" sortable prop="ONHOLEPERSON" v-if="this.checkedName.indexOf('归档人')!=-1">
								</el-table-column>
								<el-table-column label="归档时间" width="185" sortable prop="ONHOLTIME" v-if="this.checkedName.indexOf('归档时间')!=-1" :formatter="dateFormat">
								</el-table-column>
                                <el-table-column label="修改时间" width="120" sortable prop="CHANGEDATE" v-if="this.checkedName.indexOf('修改时间')!=-1" :formatter="dateFormat">
								</el-table-column>
                                <el-table-column label="机构" width="100" sortable prop="DEPTIDDesc" v-if="this.checkedName.indexOf('机构')!=-1">
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
			<usesealmask  ref="usesealmask" @request="requestData" v-bind:page=page></usesealmask>
			<!--报表-->
			<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
		</div>
	</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_tabs from '../common/nav_tabs.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import usesealmask from '../testworkcheckDetails/reprotachivingMask.vue'
    import tableControle from '../plugin/table-controle/controle.vue'
    import reportmask from'../reportDetails/reportMask.vue'
	export default {
		name: 'reportachiving',
		components: {
			vheader,
			navs_left,
			navs_tabs,
			usesealmask,
            tableControle,
            reportmask
		},
		data() {
			return {
				reportData:{},//报表的数据
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				commentArr: {},
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				checkedName: [
                    '报告编号',
					'报告名称',
                    '委托书编号',
                    '归档人',
                    '归档时间',
                    '修改时间',
                    '机构',
				],
				tableHeader: [
                    {
						label: '报告编号',
						prop: 'REPORTNUM'
					},{
						label: '报告名称',
						prop: 'REPORTNAME'
					},
					{
						label: '委托书编号',
						prop: 'PROXYNUM'
					},
					{
						label: '归档人',
						prop: 'ONHOLEPERSON'
					},
					{
						label: '归档时间',
						prop: 'ONHOLTIME'
					},
					{
						label: '修改时间',
						prop: 'CHANGEDATE'
					},
					{
						label: '机构',
						prop: 'DEPTIDDesc'
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
					REPORTNAME:'',
					PROXYNUM:'',
					ONHOLEPERSON: '',
					ONHOLTIME:'',
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				page: { //分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				buttons:[],
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
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
			tableControle(data) {
				this.checkedName = data;
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
			//重置
			resetbtn(){
				this.searchList = {
					REPORTNUM:'',
					REPORTNAME:'',
					PROXYNUM:'',
					ONHOLEPERSON: '',
					ONHOLTIME:'',
				};
				this.requestData();
			},
			//搜索
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
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
		    	}else if(item.name=="删除"){
		    	 this.deluserinfo();
		    	}else if(item.name=="报表"){
			     this.reportdata();
				}
		    },
			//添加类别
			openAddMgr() {
				// this.$refs.usesealmask.open(); // 方法1
				this.$refs.usesealmask.visible();
				
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
					console.log(this.selUser[0].STATE);
					if(this.selUser[0].STATE == 3 || this.selUser[0].STATE == 2) {
						this.$message({
							message: '已启动的流程，不允许修改数据，只可以查看。',
							type: 'warning'
						});
						this.$refs.usesealmask.view(this.selUser[0].ID);
					}
					//驳回
					else if(this.selUser[0].STATE == 0) {
						var url = this.basic_url + '/api-apps/app/workorder/flow/isExecute/' + this.selUser[0].ID;
						this.$axios.get(url, {}).then((res) => {
							if(res.data.resp_code == 0) {
								var url = this.basic_url + '/api-apps/app/reportOnhole/flow/isPromoterNode/' + this.selUser[0].ID;
								this.$axios.get(url, {}).then((res) => {
									if(res.data.resp_code == 0) {
										this.$refs.usesealmask.detail(this.selUser[0].ID);
									} else {
										this.$message({
											message: res.data.resp_msg,
											type: 'warning'
										});
									}
								});
							} else {
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
									});
							}
						});
					}else{
						this.$refs.usesealmask.detail(this.selUser[0].ID);	
					}
				}
			},
			//查看
			 view(data) {
				this.$refs.usesealmask.view(data.ID);
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
					var url = this.basic_url + '/api-apps/app/reportOnhole/deletes';
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
						});
					}).catch(() => {

					});
				}
            },
            // 删除
			physicsDel() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/reportOnhole/physicsDel';
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
			//Table默认加载数据
			requestData(index) {
				this.loading = true;//加载动画打开
				var data = {
					page: this.page.currentPage,
                    limit: this.page.pageSize,
                    REPORTNUM:this.searchList.REPORTNUM,
					REPORTNAME:this.searchList.REPORTNAME,
					PROXYNUM: this.searchList.PROXYNUM,
					ONHOLEPERSON:this.searchList.ONHOLEPERSON,
					ONHOLTIME: this.searchList.ONHOLTIME,
				}
				var url = this.basic_url + '/api-apps/app/reportOnhole';
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
					// this.commentArr[this.page.currentPage] = res.data.data
					// let newarr = []
					// for(var i = 1; i <= totalPage; i++) {
					// 	if(typeof(this.commentArr[i]) != 'undefined' && this.commentArr[i].length > 0) {

					// 		for(var j = 0; j < this.commentArr[i].length; j++) {
					// 			newarr.push(this.commentArr[i][j])
					// 		}
					// 	}
					// }
					this.USESEAL = res.data.data;
					this.loading = false;//加载动画关闭
					if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
						$('.el-table__body-wrapper table').find('.filing').remove();
					}//滚动加载数据判断filing
				}).catch((wrong) => {
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
					// console.log(res);
					this.buttons = res.data;
					
				}).catch((wrong) => {
				})

			},
			//代办跳转
			getRouterData() {
				// 只是改了query，其他都不变
				this.id = this.$route.query.bizId;
				this.$refs.child.view(this.id);
			},

		},
		mounted() {
			this.requestData();
			if(this.$route.query.bizId != undefined) {
				this.getRouterData();
			}
		},
	}
</script>

<style scoped>

</style>