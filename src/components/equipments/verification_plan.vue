<template>
<!-- 期间核查计划 -->
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header ref='navsheader'></navs_header>
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
							<el-col :span="6">
								<el-form-item label="期间核查计划编号" prop="C_PLANNUM" label-width="130px">
									<el-input v-model="searchList.C_PLANNUM"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="计划描述" prop="DESCRIPTION">
									<el-input v-model="searchList.DESCRIPTION"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="录入时间" prop="ENTERDATE">
									<div class="block">
									    <el-date-picker
									      v-model="searchList.ENTERDATE"
									      type="date"
									      placeholder="请选择" style="width: 100%"  value-format="yyyy-MM-dd">
									    </el-date-picker>
								  	</div>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item label="机构" prop="DEPTID" label-width="45px">
									<el-select clearable v-model="searchList.DEPTID" filterable allow-create default-first-option placeholder="请选择">
										    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
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
						<el-table :header-cell-style="rowClass" :data="userList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
							<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
							</el-table-column>
							<el-table-column label="期间核查计划编号" width="200" sortable prop="C_PLANNUM" v-if="this.checkedName.indexOf('期间核查计划编号')!=-1">
								<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row.ID)>{{scope.row.C_PLANNUM}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="计划描述" width="200" sortable prop="DESCRIPTION" v-if="this.checkedName.indexOf('计划描述')!=-1">
							</el-table-column>
							<!-- <el-table-column label="录入人" sortable prop="ENTERBY" v-if="this.checkedName.indexOf('录入人')!=-1">
							</el-table-column> -->
							<el-table-column label="录入时间" sortable prop="ENTERDATE" :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
							</el-table-column>						
							<el-table-column label="机构" sortable prop="DEPTIDDesc" v-if="this.checkedName.indexOf('机构')!=-1">
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
		<detailPage :detailData="selUser[0]" ref="child" @request="requestData"></detailPage>
	</div>
</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import detailPage from '../equipmentsDetails/verifiPlan_mask.vue'
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
			        nickname: '',
			        enabled: '',
			        searchKey: '',
			        searchValue: '',
			        companyId: '',
			        deptId: ''
		        },
				checkedName: [
					'期间核查计划编号',
					'计划描述',
					// '录入人',
					'录入时间',	
					'机构',
				],
				tableHeader: [
					{
						label: '期间核查计划编号',
						prop: 'C_PLANNUM'
					},
					{
						label: '计划描述',
						prop: 'DESCRIPTION'
					},
					// {
					// 	label: '录入人',
					// 	prop: 'ENTERBY'
					// },
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
						label: '机构',
						prop: 'DEPTIDDesc'
					}
				],
				leftNavs: [//leftNavs左侧菜单数据
					{
						navicon: 'icon-user',
						navtitle: '用户管理',
						navherf: '/personinfo'
					}, {
						navicon: 'icon-edit',
						navtitle: '机构管理',
						navherf: '/dept_management'
					}, {
						navicon: 'icon-role-site',
						navtitle: '角色管理',
						navherf: '/role_management'
					}, {
						navicon: 'icon-file-text',
						navtitle: '客户管理',
						navherf: '/customer_management'
					}, {
						navicon: 'icon-file-text',
						navtitle: '产品类别',
						navherf: '/products_category'
					}, {
						navicon: 'icon-file-text',
						navtitle: '产品',
						navherf: '/products'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测标准',
						navherf: '/testing_standard'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测项目',
						navherf: '/testing_projects'
					}, {
						navicon: 'icon-file-text',
						navtitle: '检验/检测方法',
						navherf: '/testing_methods'
					}, {
						navicon: 'icon-file-text',
						navtitle: '自动编号设置',
						navherf: '/number_settings'
					}
				],
				companyId: '',
				deptId: '',
				selUser: [],
				'启用': true,
				'冻结': false,
				userList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					'C_PLANNUM': '',
					'DESCRIPTION': '',
					'ENTERBY': '',
					'ENTERDATE': '',
					'DEPARTMEMT': '',
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
					pageSize: 20,
					totalCount: 0
				},
				aaaData:[],
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
					console.log(res.data);
					this.selectData = res.data;
				});
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
		    //时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			resetbtn(){
				this.searchList = { //点击高级搜索后显示的内容
					C_PLANNUM: '',
					DESCRIPTION: '',
					ENTERBY: '',
					ENTERDATE: '',
					DEPARTMEMT: '',
				};
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
			 	console.log(dataid);
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
					var url = this.basic_url + '/api-apps/app/checkPlan/deletes';
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
           		var url = this.basic_url + '/api-apps/app/checkPlan/exportExc?access_token='+sessionStorage.getItem('access_token');
          		 var xhr = new XMLHttpRequest();
            	xhr.open('POST', url, true);
            	xhr.responseType = "blob";
            	xhr.setRequestHeader("client_type", "DESKTOP_WEB");
            	xhr.onload = function() {
                	if (this.status == 200) {
						var filename = "checkPlan.xls";
						var blob = this.response;
						var link = document.createElement('a');
						var objecturl = URL.createObjectURL(blob);
						link.href = objecturl;
						link.download = filename;
						link.click();
                	}
            	}
            	xhr.send();
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
			insert() {
				this.users.push(this.user)
			},
			remove(index) {
				this.users.splice(index, 1)
			},
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					C_PLANNUM: this.searchList.C_PLANNUM,
					DESCRIPTION: this.searchList.DESCRIPTION,
					ENTERBY: this.searchList.ENTERBY,
					ENTERDATE: this.searchList.ENTERDATE,
					DEPTID: this.searchList.DEPTID,
				}
				var url = this.basic_url + '/api-apps/app/checkPlan';
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
					this.userList =  res.data.data;
/*					this.userList = res.data.data;
					this.page.totalCount = res.data.count;*/
				}).catch((wrong) => {})
				
			},
			loadMore () {
				let up2down = sessionStorage.getItem('up2down');
				if(this.loadSign) {					
					if(up2down=='down'){
						this.page.currentPage++
						if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
							this.page.currentPage = Math.ceil(this.page.totalCount / this.page.pageSize)
							return false;
						}
					}else{
						this.page.currentPage--
						if(this.page.currentPage < 1) {
							this.page.currentPage=1
							return false;
						}
					}
					this.loadSign = false;
					setTimeout(() => {
						this.loadSign = true
					}, 1000)
					this.requestData()
				}
			   // if (this.loadSign) {
			   //   this.loadSign = false
			   //   this.page++
			   //   if (this.page > 10) {
			   //     return
			   //   }
			   //   setTimeout(() => {
			   //     this.loadSign = true
			   //   }, 1000)
			   //   console.log('到底了', this.page)
			   // }
			 },
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		console.log(childValue);
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
			this.getCompany();
		},
	}
</script>

<style scoped>

</style>