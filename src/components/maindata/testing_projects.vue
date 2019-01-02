<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header></navs_header>
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
							<button type="button" class="btn btn-green" @click="openAddMgr">
	                        	<i class="icon-add"></i>添加
	              			 </button>
							<button type="button" class="btn btn-bule button-margin" @click="modify">
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
				<!--按钮操作行 End-->

				<!-- 高级查询划出 Begin-->
				<div v-show="search">
						<el-form status-icon :model="searchList" label-width="45px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="编码" prop="P_NUM">
										<el-input v-model="searchList.P_NUM">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="名称" prop="P_NAME">
										<el-input v-model="searchList.P_NAME">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="版本" prop="VERSION">
										<el-input v-model="searchList.VERSION">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="机构" prop="DEPARTMENT">
										<el-select clearable v-model="searchList.DEPARTMENT" filterable allow-create default-first-option placeholder="请选择">
									    	<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<!-- <el-col :span="3">
									<el-select v-model="searchList.STATUS" placeholder="请选择信息状态">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col> -->
								<el-col :span="2">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:1px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
				<!-- 高级查询划出 End-->

				<el-row :gutter="0">
					<el-col :span="24">
						<!-- 表格 Begin-->
						<el-table :header-cell-style="rowClass" :data="projectList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'projectList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
							<el-table-column type="selection" width="55" fixed v-if="this.checkedName.length>0" align="center">
							</el-table-column>
							<el-table-column label="编码" width="150" sortable prop="P_NUM" v-if="this.checkedName.indexOf('编码')!=-1">
								<template slot-scope="scope">
									<p @click=view(scope.row)>{{scope.row.P_NUM}}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="名称" width="220" sortable prop="P_NAME" v-if="this.checkedName.indexOf('名称')!=-1">
							</el-table-column>
							<el-table-column label="单价(元)" width="120" align="right" sortable prop="QUANTITY" v-if="this.checkedName.indexOf('单价')!=-1">
							</el-table-column>
							<el-table-column label="人员资质" width="180" sortable prop="QUALIFICATION" v-if="this.checkedName.indexOf('人员资质')!=-1">
							</el-table-column>
							<!--<el-table-column label="信息状态" width="100" sortable prop="STATUS" :formatter="judge" v-if="this.checkedName.indexOf('信息状态')!=-1">
							</el-table-column>-->
							<!--<el-table-column label="文档" width="120" sortable prop="DOCLINKP_NAME" v-if="this.checkedName.indexOf('文档')!=-1">-->
							<el-table-column label="领域" width="120" sortable prop="FIELD" v-if="this.checkedName.indexOf('领域')!=-1">
							</el-table-column>
							<el-table-column label="子领域" width="120" sortable prop="CHILD_FIELD" v-if="this.checkedName.indexOf('子领域')!=-1">
							</el-table-column>
							<el-table-column label="版本" width="70" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1" align="right">
							</el-table-column>
							<el-table-column label="机构" width="180" sortable prop="DEPARTMENTDesc" v-if="this.checkedName.indexOf('机构')!=-1">
							</el-table-column>
							<!-- <el-table-column label="录入人" width="120" prop="ENTERBY" sortable  v-if="this.checkedName.indexOf('录入人')!=-1"> -->
							</el-table-column>
							<el-table-column label="录入时间" width="100" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
							</el-table-column>
							<!-- <el-table-column label="修改人" width="120" prop="CHANGEBY" sortable  v-if="this.checkedName.indexOf('修改人')!=-1">
							</el-table-column> -->
							<el-table-column label="修改时间" width="100" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
							</el-table-column>
						</el-table>
						<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0"
				            @size-change="sizeChange"
				            @current-change="currentChange"
				            :current-page="page.currentPage"
				            :page-sizes="[10, 20, 30, 40,100]"
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
		<projectmask :testing_projectForm="testing_projectForm" ref="child" @request="requestData" @reset="reset" v-bind:page=page ></projectmask>
	
	</div>
</div>
</template>
<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_header from '../common/nav_tabs.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import projectmask from '../maindataDetails/testing_projectMask.vue'
	export default {
		name: 'testing_projects',
		components: {
			vheader,
			navs_left,
			navs_header,
			tableControle,
			projectmask
		},
		data() {
			return {
				basic_url: Config.dev_url,
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				loadSign:true,//加载
				commentArr:{},
				checkedName: [
					'编码',
					'名称',
					'单价',
					'人员资质',
					// '信息状态',
					'领域',
					'子领域',
					'版本',
					'机构',
					// '录入人',
					'录入时间',
					// '修改人',
					'修改时间'
				],
				tableHeader: [
					{
						label: '编码',
						prop: 'P_NUM'
					},
					{
						label: '名称',
						prop: 'P_NAME'
					},
					{
						label: '单价',
						prop: 'QUANTITY'
					},
					{
						label: '人员资质',
						prop: 'QUALIFICATION'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// },
					{
						label: '领域',
						prop: 'FIELD'
					},
					{
						label: '子领域',
						prop: 'CHILD_FIELD'
					},
					{
						label: '版本',
						prop: 'VERSION'
					},
					{
						label: '机构',
						prop: 'DEPARTMENTDesc'
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
				selMenu: [],
				'活动': true,
				'不活动': false,
				projectList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					P_NUM: '',
					P_NAME: '',
					VERSION: '',
					DEPARTMENT:'',
					// STATUS:'',
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				testing_projectForm: {},//修改子组件时传递数据
		        selectData: [],
			}
		},

		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    // console.log(rowIndex) //表头行标号为0
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
			// toNum(str) {
			// 	return str.replace(/\,|\￥/g, "");
			// },
			// vartoThousands(){
			// 	var momeny = this.projectList.QUANTITY;
			// 	console.log(momeny);
			// 	var num = parseFloat(this.toNum(momeny)).toFixed(2).toString().split(".");
			// 	num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
			// 	// this.dataInfo.CHECTCOST="￥" + num.join(".");
			// 	this.projectList.QUANTITY = num.join(".");
			// 	console.log(num);
	  //   		// momeny = momeny.toFixed(2);//将数字转成带有2位小数的字符串
	    	
			// 	// momeny = parseFloat(momeny);//将带有2位小数的字符串转成带有小数的数字
			// 	// momeny = momeny.toLocaleString();//将带有2位小数的数字转成金额格式
			// 	// if(momeny.indexOf(".")==-1){
	  //  //          	momeny = momeny+".00";
	  //  //      	}else{
	  //  //          	momeny = momeny.split(".")[1].length<2?momeny+"0":momeny;
	  //  //      	}
			// 	return this.projectList.QUANTITY;
			// },
			//表格滚动加载
			loadMore () {
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
				this.page.pageSize = 10;
				this.requestData();
			},
			//清空
			reset(){
			this.testing_projectForm = { //数据库列表
					VERSION: '1',
					STATUS: '活动',
					P_NUM: '',
					P_NAME: '',
					QUANTITY: '',
					QUALIFICATION: '',
					FIELD: '',
					CHILD_FIELD: '',
					DOCLINKS_NUM: '',
					DEPT: '',
					ENTERBY:'',
					ENTERDATE: '',
					CHANGEBY: '',
					CHANGEDATE:'',	
				};
				if (this.$refs['testing_projectForm']!==undefined) {
     			this.$refs['testing_projectForm'].resetFields();	
 				}
			},
			//添加检验/检测项目
			openAddMgr() {
				this.reset();
				this.$refs.child.open();
				this.$refs.child.visible();
			},
			//修改检验/检测项目
			modify() {
				if(this.selMenu.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selMenu.length > 1) {
					this.$message({
						message: '不可同时修改多条数据',
						type: 'warning'
					});
					return;
				} else {
					this.testing_projectForm = this.selMenu[0]; 
					this.$refs.child.detail();
				}
			},
			//查看
			 view(data) {
			 	this.testing_projectForm = data; 
				this.$refs.child.view();
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
					var url = this.basic_url + '/api-apps/app/inspectionPro/deletes';
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
			
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			
			SelChange(val) {
				this.selMenu = val;
			},
			requestData(index) {
				var data = {//高级查询数据显示
					page: this.page.currentPage,
					limit: this.page.pageSize,

					P_NUM: this.searchList.P_NUM,
					P_NAME: this.searchList.P_NAME,
					VERSION: this.searchList.VERSION,
					DEPARTMENT: this.searchList.DEPARTMENT,
					// STATUS: this.searchList.STATUS,
				}
				var url = this.basic_url + '/api-apps/app/inspectionPro';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;
					// for(var i = 0;i<res.data.data.length;i++){
					// 	var money = res.data.data[i].QUANTITY.toString();
					// 	console.log(2333);
					// 	console.log(this.toNum(money));
					// 	var num = parseFloat(this.toNum(money)).toFixed(2).toString().split(".");
					// 	console.log(num);
					// 	num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
					// 	console.log(num.join("."));

					// 	// this.dataInfo.CHECTCOST="￥" + num.join(".");
					// 	this.projectList[i].QUANTITY = num.join(".");
					// }
					
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
					
					this.projectList = newarr;
				}).catch((wrong) => {})
			},
			handleNodeClick(data) {
			},

			formatter(row, column) {
				return row.enabled;
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
      		},
		},
		mounted() {
			this.requestData();
			this.getCompany();
		},
	}
</script>

<style scoped>

</style>