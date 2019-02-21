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
								<button type="button" class="btn btn-green" @click="openAddData" id="">
                                	<i class="icon-add"></i>添加
                      			</button>
								<button type="button" class="btn btn-blue button-margin" @click="modify">
								    <i class="icon-edit"></i>修改
								</button>
								<button type="button" class="btn btn-red button-margin" @click="deluserinfo">
								    <i class="icon-trash"></i>删除
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
				<!--按钮操作行 End-->

				<!-- 高级查询划出 Begin-->
				<div v-show="search">
					<el-form :model="searchList">
						<el-row :gutter="10">
							<el-col :span="5">
								<el-form-item label="类型编码" prop="code" label-width="70px">
									<el-input v-model="searchList.code">
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="类型名称" prop="name" label-width="70px">
									<el-input v-model="searchList.name">
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
						<el-table :data="dictionarieList" 
								  border 
								  stripe 
								  :header-cell-style="rowClass" 
								  :height="fullHeight" 
								  style="width: 100%;" 
								  :default-sort="{prop:'dictionarieList', order: 'descending'}" 
								  @selection-change="SelChange"  
								  v-loadmore="loadMore"
								  v-loading="loading"  
								  element-loading-text="加载中…"
								  element-loading-spinner="el-icon-loading"
								  element-loading-background="rgba(255, 255, 255, 0.9)">
							<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
							</el-table-column>

							<el-table-column label="类型编码" width="200" sortable prop="code" v-if="this.checkedName.indexOf('类型编码')!=-1">
								<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row.id)>{{scope.row.code}}</p>
								</template>
							</el-table-column>

							<el-table-column label="类型名称" width="220" sortable prop="name" v-if="this.checkedName.indexOf('类型名称')!=-1">
							</el-table-column>
							
							<el-table-column label="备注" sortable prop="tips" v-if="this.checkedName.indexOf('备注')!=-1">
							</el-table-column>

							<el-table-column label="排序" sortable width="160" align="center" prop="sort" v-if="this.checkedName.indexOf('排序')!=-1">
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
		<dictionariemask :dictionarieForm="dictionarieForm" ref="child" @request="requestData" v-bind:page=page></dictionariemask>
	</div>
</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import dictionariemask from '../settingDetails/dictionarie_mask.vue'
	export default {
		name: 'dictionarie_management',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			dictionariemask,
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
					'类型编码',
					'类型名称',
					'备注',
					'排序',
				],
				tableHeader: [//控制Table-列头标题名称
					{
						label: '类型编码',
						prop: 'code'
					},
					{
						label: '类型名称',
						prop: 'name'
					},
					{
						label: '备注',
						prop: 'tips'
					},
					{
						label: '排序',
						prop: 'sort'
					}
				],
				loadSign:true,//加载
				commentArr:{},
				selDictionarie: [],
				'启用': true,
				'冻结': false,
				dictionarieList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: {
					code: '',
					name: '',
				},
				page: {//分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				selData: [],
				dictionarieForm: {}//修改子组件时传递数据
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
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			resetbtn(){
				this.searchList = { //点击高级搜索后显示的内容
					code: '',
					name: '',
				};
				this.requestData();
			},
			openAddData() {//添加数据
				this.dictionarieForm = {
					code:'',
					name:'',
					tips:'',
					sort:'',//排序
					updateTime:'',
					updateUser:'',
					createTime:'',
					createUser:''
				};
				this.$refs.child.open();
				this.$refs.child.childMethods();
			},
			modify() {//修改数据
				this.selData = this.selDictionarie;
				if(this.selData.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selData.length > 1) {
					this.$message({
						message: '不可同时修改多条数据',
						type: 'warning'
					});
					return;
				} else {
					this.dictionarieForm = this.selDictionarie[0]; 
					this.$refs.child.detail(this.selDictionarie[0].id);
				}
			},
			//查看
			 view(id) {
				this.$refs.child.view(id);
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
				var selData = this.selDictionarie;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-user/dicts/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for (var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].id);
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
			
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			SelChange(val) {//选中值后赋值给一个自定义的数组：selDictionarie
				this.selDictionarie = val;
			},
			requestData(index) {//高级查询字段
				this.loading = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					code: this.searchList.code,
					name: this.searchList.name
				}
				var url = this.basic_url + '/api-user/dicts';
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
					this.dictionarieList = newarr;
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