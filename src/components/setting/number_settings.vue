<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_tabs></navs_tabs>
	</div>
	<div class="contentbg">
		<!--左侧菜单内容显示 Begin-->
		<navs_left ref="navleft" v-on:childByValue="childvalue"></navs_left>
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
					<el-form inline-message :model="searchList" label-width="70px">
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
						<el-table ref="table" :data="numberList" 
							  border 
							  stripe 
							  :header-cell-style="rowClass" 
							  :height="fullHeight" 
							  style="width: 100%;" 
							  :default-sort="{prop:'numberList', order: 'descending'}" 
							  @selection-change="SelChange"  
							  v-loadmore="loadMore"
							  v-loading="loading"  
							  element-loading-text="加载中…"
							  element-loading-spinner="el-icon-loading"
							  element-loading-background="rgba(255, 255, 255, 0.9)">
							<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
							</el-table-column>
							<el-table-column label="序列号" width="100" sortable prop="serialnum" v-if="this.checkedName.indexOf('序列号')!=-1">
								<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.serialnum}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="应用名" width="100" sortable prop="markx" v-if="this.checkedName.indexOf('前缀')!=-1">
							</el-table-column>
							<el-table-column label="表名" width="100" sortable prop="marky" v-if="this.checkedName.indexOf('表名')!=-1">
							</el-table-column>
							<el-table-column label="描述" width="100" sortable prop="remarks" v-if="this.checkedName.indexOf('描述')!=-1">
							</el-table-column>
							<el-table-column label="前缀" width="100" sortable prop="prefix" v-if="this.checkedName.indexOf('前缀')!=-1">
							</el-table-column>
							<el-table-column label="初始化起始数" width="180" sortable align="right" prop="initnum" v-if="this.checkedName.indexOf('初始化起始数')!=-1">
							</el-table-column>
							<el-table-column label="是否初始化" width="140" sortable align="center" prop="isinitbydateDesc" v-if="this.checkedName.indexOf('是否初始化')!=-1">
							</el-table-column>
							<el-table-column label="初始化日期格式" width="140" sortable align="center" prop="initformat" v-if="this.checkedName.indexOf('初始化日期格式')!=-1">
							</el-table-column>
							<el-table-column label="增加量" width="100" sortable align="right" prop="increase" v-if="this.checkedName.indexOf('增加量')!=-1">
							</el-table-column>
							<el-table-column label="是否拼接日期" width="120" sortable align="center" prop="issplicingdateDesc" v-if="this.checkedName.indexOf('是否拼接日期')!=-1">
							</el-table-column>
							<el-table-column label="拼接日期格式" width="180" sortable align="center" prop="splicingformat" v-if="this.checkedName.indexOf('拼接日期格式')!=-1">
							</el-table-column>
							<el-table-column label="保留位数" sortable align="right" prop="retain" v-if="this.checkedName.indexOf('保留位数')!=-1">
							</el-table-column>
						</el-table>
						<el-pagination background class="text-right pt10" v-if="this.checkedName.length>0"
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
	import navs_tabs from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import numbsetmask from '../settingDetails/number_settingMask.vue'
	export default {
		name: 'number_settings',
		components: {
			vheader,
			navs_left,
			navs_tabs,
			tableControle,
			numbsetmask,
		},
		data() {
			return {
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				checkedName: [//控制Table-列显示和隐藏
					'是否初始化',
					'初始化日期格式',
					'应用名',
					'表名',
					'描述',
					'前缀',
					'初始化起始数',
					'增加量',
					'是否拼接日期',
					'拼接日期格式',
					'序列号',
					'保留位数',
				],
				tableHeader: [//控制Table-列头标题名称
					{
						label: '是否初始化',
						prop: 'isinitbydate'
					},
					{
						label: '初始化日期格式',
						prop: 'initformat'
					},
					{
						label: '应用名',
						prop: 'markx'
					},
					{
						label: 'marky',
						prop: 'prefix'
					},
					{
						label: '描述',
						prop: 'remarks'
					},
					{
						label: '前缀',
						prop: 'prefix'
					},
					{
						label: '初始化起始数',
						prop: 'initnum'
					},
					{
						label: '增加量',
						prop: 'increase'
					},
					{
						label: '是否拼接日期',
						prop: 'issplicingdate'
					},
					{
						label: '拼接日期格式',
						prop: 'splicingformat'
					},
					{
						label: '序列号',
						prop: 'serialnum'
					},
					{
						label: '保留位数',
						prop: 'retain'
					}
				],
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
			tableControle(data){//控制表格列显示隐藏
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
			searchinfo(index) {//高级查询
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
			resetbtn(){
				this.searchList = {
					AUTOKEY: '',
				};
				this.requestData();
			},
			openAddMgr() {//添加自动编号设置数据
				this.numbsetForm = {
					isinitbydate:'',
					initformat:'',
					prefix:'',
					initnum:'',
					increase:'',
					issplicingdate:'',
					splicingformat:'',
					serialnum:'',
					retain:'',
					createuser:'',
					createuserDesc:'',
					updateuser:'',
					updateuserDesc:''
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
					var url = this.basic_url + '/api-user/serialnum/'+this.selMenu[0].id;
					this.$confirm('确定删除此数据吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
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
			SelChange(val) {//选中值后赋值给一个自定义的数组：selMenu
				this.selMenu = val;
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
			//Table默认加载数据
			requestData() {//高级查询字段
				this.loading = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = this.basic_url + '/api-user/serialnum';
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
					this.numberList = res.data.data;
					this.loading = false;//加载动画关闭
					if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
						$('.el-table__body-wrapper table').find('.filing').remove();
					}//滚动加载数据判断filing
				}).catch((wrong) => {
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