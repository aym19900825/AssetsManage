<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header></navs_header>
	</div>
	<div class="contentbg">
		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content wrapperall">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>产品类型</span>
					<!--按钮操作行 Begin-->
					<div class="columns columns-right btn-group pull-right">
						<div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
						<tableControle :tableHeader="tableHeader" :checkedName="checkedName"  @tableControle="tableControle" ref="tableControle"></tableControle>
					</div>
					<!--按钮操作行 End-->
				</div>
				<div class="text item">
					<el-row :gutter="0">
						<el-col :span="24">
							<!-- 表格 Begin-->
							<el-table :data="inspectionList" border stripe height="400" style="width: 100%;" :default-sort="{prop:'inspectionList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="产品类型" width="150" sortable prop="PRO_NAME" v-if="this.checkedName.indexOf('产品类型')!=-1">
								</el-table-column>
								<el-table-column label="状态" width="100" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('状态')!=-1">
								</el-table-column>
								<el-table-column label="状态修改人" width="120" prop="CHANGEBY" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('状态修改人')!=-1">
								</el-table-column>
								<el-table-column label="状态修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('状态修改时间')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination background class="pull-right pt10 pb10" v-if="this.checkedName.length>0"
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
			</el-card>
		</div>
	<!--右侧内容显示 End-->
	</div>
</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs_header from './common/nav_tabs.vue'
	import table from './plugin/table/table-normal.vue'
	import tableControle from './plugin/table-controle/controle.vue'
	export default {
		name: 'customer_management',
		components: {
			vheader,
			navs_header,
			tableControle,
			table,
		},
		data() {
			return {
				loadSign:true,//加载
				commentArr:{},//下拉加载
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				searchData: {
			        page: 1,
			        limit: 10,//分页显示数
			        enabled: '',//状态
		        },
				checkedName: [
					'产品类型',
					'状态',
					'状态修改人',
					'状态修改时间'
				],
				tableHeader: [
					{
						label: '产品类型',
						prop: 'M_NUM'
					},
					{
						label: '状态',
						prop: 'STATUS'
					},
					{
						label: '状态修改人',
						prop: 'CHANGEBY'
					},
					{
						label: '状态修改时间',
						prop: 'CHANGEDATE'
					}
				],
				selUser: [],
				'活动': true,
				'不活动': false,
				inspectionList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				clientHeight:'',//获取浏览器高度
				searchList: {//点击高级搜索后显示的内容
					PRO_NUM: '',
					STATUS: '',
					DEPARTMENT: '',
					PRO_NAME:'',
					VERSION:''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				inspectionData:[],
				page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				aaaData:[],
			}
		},
		methods: {
			loadMore () {//表格滚动加载
			   if (this.loadSign) {
			     this.loadSign = false
			     this.page.currentPage++
			     if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			       return
			     }
			     setTimeout(() => {
			       this.loadSign = true
			     }, 1000)
			     this.requestData()
			   }
			 },
			tableControle(data){
				this.checkedName = data;
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD HH:mm:ss"); 
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
			//添加数据内容
			openAddMgr() {
				// this.$refs.child.resetNew();
				this.aaaData = {
					PRO_NUM:'',
					PRO_NAME:'',
					STATUS:'活动',
					VERSION:'1',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:''
				};
				this.$refs.child.visible();
			},
			//修改数据内容
			modify() {
				this.aaaData = this.selUser;
				if(this.aaaData.length == 0) {
					this.$message({
						message: '请您选择要修改的用户',
						type: 'warning'
					});
					return;
				} else if(this.aaaData.length > 1) {
					this.$message({
						message: '不可同时修改多个用户',
						type: 'warning'
					});
					return;
				} else {
					this.$refs.child.detail(this.aaaData[0].ID);
				}
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
					this.up = !this.up
			},
			// 删除数据内容
			delinspectioninfo() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时删除多条数据',
						type: 'warning'
					});
					return;
				} else {
					var changeUser = selData[0];
					var id = changeUser.ID;
					var url = '/api/api-apps/app/product/' + id;
					this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
						console.log(res.data.resp_code);
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
			
			judge(data) {
				//taxStatus 状态布尔值
				return data.enabled ? '活动' : '不活动'
			},
			
			insert() {
				this.inspections.push(this.inspection)
			},
			remove(index) {
				this.inspections.splice(index, 1)
			},
			SelChange(val) {
				this.selUser = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,

					PRO_NUM: this.searchList.PRO_NUM,
					STATUS: this.searchList.STATUS,
					DEPARTMENT: this.searchList.DEPARTMENT,
					PRO_NAME: this.searchList.PRO_NAME,
					VERSION: this.searchList.VERSION,
				}
				var url = '/api/api-apps/app/product';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;	
					//总的页数
					let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
					if(this.page.currentPage >= totalPage){
						 this.loadSign = false
					}else{
						this.loadSign=true
					}
					this.commentArr[this.page.currentPage]=res.data.data
					let newarr=[]
					for(var i = 1; i <= totalPage; i++){
					
						if(typeof(this.commentArr[i])!='undefined' && this.commentArr[i].length>0){
							
							for(var j = 0; j < this.commentArr[i].length; j++){
								newarr.push(this.commentArr[i][j])
							}
						}
					}
					
					this.inspectionList = newarr;
				}).catch((wrong) => {})
			},
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			},
		},
		mounted() {
			this.requestData();
			// 获取浏览器可视区域高度
			var _this = this;
			var clientHeight = $(window).height() - 100;    //document.body.clientWidth;
			_this.$refs.homePagess.style.height = clientHeight + 'px';
			window.onresize = function() {
				var clientHeight = $(window).height() - 100;
				_this.$refs.homePagess.style.height = clientHeight + 'px';
			};
		},

	}
</script>

<style scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>