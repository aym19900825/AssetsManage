<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header></navs_header>
	</div>
	<div class="contentbg">
		<!--左侧菜单内容显示 Begin-->
		<navs_left></navs_left>
		<!--左侧菜单内容显示 End-->

		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content">
			<div class="ibox-content">
				<!--按钮操作行 Begin-->
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
								<!-- <button type="button" class="btn btn-green" @click="openAddMgr" id="">
                                	<i class="icon-add"></i>添加
                      			</button> -->
								<button type="button" class="btn btn-blue button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<!-- <button type="button" class="btn btn-red button-margin" @click="deluserinfo">
								    <i class="icon-trash"></i>删除
								</button> -->
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
				<!--按钮操作行 End-->

				<!-- 高级查询划出 Begin-->
				<div v-show="search">
					<el-form :model="searchList" label-width="70px">
						<el-row :gutter="10">
							<el-col :span="5">
								<el-form-item label="自动编号名称" prop="AUTOKEY" label-width="100px">
									<el-input v-model="searchList.AUTOKEY">
									</el-input>
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
						<el-table :data="numberList" 
								  border 
								  stripe 
								  :header-cell-style="rowClass" 
								  :height="fullHeight" 
								  style="width: 100%;" 
								  :default-sort="{prop:'numberList', order: 'descending'}" 
								  @selection-change="SelChange"  
								  v-loadmore="loadMore"
								  v-loading="loading"  
								  element-loading-text="拼命加载中"
								  element-loading-spinner="el-icon-loading"
								  element-loading-background="rgba(0, 0, 0, 0.6)">
							<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
							</el-table-column>
							<el-table-column label="自动编号名称" width="140" sortable prop="AUTOKEY" v-if="this.checkedName.indexOf('自动编号名称')!=-1">
								<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.AUTOKEY}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="起始数" width="140" sortable prop="S_NUM" v-if="this.checkedName.indexOf('起始数')!=-1">
							</el-table-column>
							<el-table-column label="前缀" width="140" sortable prop="PREFIX" v-if="this.checkedName.indexOf('前缀')!=-1">
							</el-table-column>
							<el-table-column label="备注" width="200" sortable prop="MEMO" v-if="this.checkedName.indexOf('备注')!=-1">
							</el-table-column>
							<!--<el-table-column label="信息状态" width="100" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('信息状态')!=-1">
							</el-table-column>-->
							<el-table-column label="机构" sortable prop="DEPARTMENT" v-if="this.checkedName.indexOf('机构')!=-1">
							</el-table-column>
							<!-- <el-table-column label="录入人" width="140" sortable prop="ENTERBY" v-if="this.checkedName.indexOf('录入人')!=-1">
							</el-table-column> -->
							<el-table-column label="录入时间" width="100" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
							</el-table-column>
							<!-- <el-table-column label="修改人" width="140" prop="CHANGEBY" sortable v-if="this.checkedName.indexOf('修改人')!=-1">
							</el-table-column> -->
							<el-table-column label="修改时间" width="100" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
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
		<numbsetmask :numbsetForm="numbsetForm" ref="child" @request="requestData" v-bind:page=page></numbsetmask>
	</div>
</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import numbsetmask from '../settingDetails/number_settingMask.vue'
	export default {
		name: 'number_settings',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			numbsetmask,
		},
		data() {
			return {
				loading: false,
				basic_url: Config.dev_url,
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				checkedName: [//控制Table-列显示和隐藏
					'自动编号名称',
					'起始数',
					'前缀',
					// '信息状态',
					'备注',
					'机构',
					// '录入人',
					'录入时间',
					// '修改人',
					'修改时间',
				],
				tableHeader: [//控制Table-列头标题名称
					{
						label: '自动编号名称',
						prop: 'AUTOKEY'
					},
					{
						label: '起始数',
						prop: 'S_NUM'
					},
					{
						label: '前缀',
						prop: 'PREFIX'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// },
					{
						label: '备注',
						prop: 'MEMO'
					},
					{
						label: '机构',
						prop: 'DEPARTMENT'
					},
					// {
					// 	label: '录入人',
					// 	prop: 'ENTERBY'
					// },
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					// {
					// 	label: '修改人',
					// 	prop: 'CHANGEBY'
					// },
					{
						label: '修改时间',
						prop: 'CHANGEDATE'
					}
				],
				loadSign:true,//加载
				commentArr:{},
				selMenu: [],
				'启用': true,
				'冻结': false,
				numberList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					AUTOKEY: '',
				},
				page: {//分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				aaaData: [],
				numbsetForm: {}//修改子组件时传递数据
			}
		},

		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    // console.log(rowIndex) //表头行标号为0
			    return 'text-align:center'
			},
			//表格滚动加载
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
			   //   this.page.currentPage++
			   //   if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			   //     return
			   //   }
			   //   setTimeout(() => {
			   //     this.loadSign = true
			   //   }, 1000)
			   //   this.requestData()
			   // }
			 },
			tableControle(data){//控制表格列显示隐藏
				this.checkedName = data;
			},
			sizeChange(val) {//分页，总页数
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    currentChange(val) {//分页，当前页
		      this.page.currentPage = val;
		      this.requestData();
		    },
			searchinfo(index) {//高级查询
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			resetbtn(){
				this.searchList = {
					AUTOKEY: '',
				};
			},
			openAddMgr() {//添加自动编号设置数据
				this.numbsetForm = {
					STATUS:'活动',//添加时默认显示信息状态
					AUTOKEY:'',
					PREFIX:'',
					S_NUM:'',
					MEMO:'',
					DEPARTMENT:'',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:''
				};
				this.$refs.child.open();
				this.$refs.child.childMethods();
			},
			modify() {//修改自动编号设置数据
				this.aaaData = this.selMenu;
				if(this.aaaData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.aaaData.length > 1) {
					this.$message({
						message: '不可同时修改多条数据',
						type: 'warning'
					});
					return;
				} else {
					this.numbsetForm = this.selMenu[0]; 
					this.$refs.child.detail();
				}
			},
			//查看
			 view(item) {
			 	this.numbsetForm = item;
				this.$refs.child.view(item);
			},
			open(){
				this.show = true;
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
					this.up = !this.up
			},
			// 删除
			deluserinfo() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/autokey/deletes';
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
					this.$confirm('确定删除此数据吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        this.$axios.delete(url, {params: data}).then((res) => {//.delete 传数据方法
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
			judge(data) {
				return data.STATUS == "1" ? '活动' : '不活动'

			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			SelChange(val) {//选中值后赋值给一个自定义的数组：selMenu
				this.selMenu = val;
			},
			requestData(index) {//高级查询字段
				this.loading = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = this.basic_url + '/api-apps/app/autokey';
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
					this.numberList = newarr;
					this.loading = false;
				}).catch((wrong) => {})
			},
			
		},
		
		mounted() {
			this.requestData();
		},
	}
</script>

<style scoped>

</style>