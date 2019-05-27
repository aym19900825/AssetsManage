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
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh" @click="this.commonNew.winReload">
								<i class="icon-refresh"></i>
							</div>
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName" @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!--按钮操作行 End-->

					<!-- 高级查询划出 Begin-->
					<div v-show="search">
						<el-form inline-message :model="searchList">
							<el-row :gutter="10">
								<el-col :span="7">
									<el-form-item label="报告编号" prop="REPORT_NUM" label-width="80px">
										<el-input v-model="searchList.REPORT_NUM" @keyup.enter.native="searchinfo"></el-input>
									</el-form-item>
								</el-col>
								 <el-col :span="7">
									<el-form-item label="委托单位名称" prop="V_NAME" label-width="100px">
										<el-select clearable 
											v-model="searchList.V_NAME" 
											filterable 
											default-first-option 
											placeholder="请选择" style="width:100%;">
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
							<v-table ref="table" :appName="appName" :searchList="searchList" @getSelData="setSelData">
                                <!-- <el-table-column label="报告编号" width="200" sortable prop="REPORT_NUM" v-if="checkedName.indexOf('报告编号')!=-1">
								</el-table-column> -->
								<el-table-column label="报告编号" width="220" sortable prop="REPORT_NUM" v-if="checkedName.indexOf('报告编号')!=-1">
									<template slot-scope="scope">
									<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.REPORT_NUM}}</p>
									</template>
								</el-table-column>
								<el-table-column label="委托单位名称" width="285" sortable prop="V_NAME" v-if="checkedName.indexOf('委托单位名称')!=-1">
								</el-table-column>
								<el-table-column label="委托书编号" width="140" sortable prop="PROXYNUM" v-if="checkedName.indexOf('委托书编号')!=-1">
								</el-table-column>
								<el-table-column label="委托书版本" width="100" prop="VERSION" v-if="checkedName.indexOf('委托书版本')!=-1">
								</el-table-column>
								<el-table-column label="检测类型" width="140" sortable prop="PROXY_TYPEDesc" v-if="checkedName.indexOf('检测类型')!=-1">
								</el-table-column>
								<el-table-column label="流程状态" sortable prop="STATEDesc" width="140px" v-if="checkedName.indexOf('流程状态')!=-1">
								</el-table-column>
								<el-table-column label="承检单位" width="140" sortable prop="CJDWDesc" v-if="checkedName.indexOf('承检单位')!=-1">
								</el-table-column>
								<el-table-column label="主检负责人" width="120" sortable prop="LEADERDesc" v-if="checkedName.indexOf('主检负责人')!=-1">
								</el-table-column>
								<el-table-column label="完成日期" width="160" sortable prop="COMPDATE" v-if="checkedName.indexOf('完成日期')!=-1" :formatter="dateFormat">
								</el-table-column>
								<el-table-column label="完成方式" width="120" sortable prop="COMPMODE" v-if="checkedName.indexOf('完成方式')!=-1">
								</el-table-column>
							</v-table>
							<!-- 表格 End-->
						</el-col>
					</el-row>
				</div>
			</div>
			<el-dialog title="报告寄出" width="60%" :visible.sync="passdialog" :before-close="resetNewpwd">
				<el-form inline-message :model="userpassword" :rules="rules" ref="newPwdForm">
					<el-form-item label="新密码" prop="Password" label-width="100px">
						<el-input  type="password" v-model="userpassword.Password"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码" prop="newPassword" label-width="100px">
						<el-input type="password" v-model="userpassword.newPassword"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="sendReport">确 定</el-button>
					<el-button @click="resetNewpwd">取 消</el-button>
				</span>
			</el-dialog>
			<!--右侧内容显示 End-->
			<reportsendmask ref="reportsend" @request="requestData" v-bind:page=page></reportsendmask>
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
	import reportsendmask from '../testworkcheckDetails/reportsend_mask.vue'
    import tableControle from '../plugin/table-controle/controle.vue'
	import reportmask from'../reportDetails/reportMask.vue'
	import vTable from '../plugin/table/table.vue'
	export default {
		name: 'reportachiving',
		components: {
			'vheader': vheader,
			'navs_left': navs_left,
			'navs_tabs': navs_tabs,
			'reportsendmask': reportsendmask,
			'tableControle': tableControle,
			'reportmask': reportmask,
			'v-table': vTable
		},
		data() {
			return {
				//报告寄出数据
				userpassword:{
					newPassword: '',
					Password:''
				},
				passdialog:false,//报告寄出弹出框
				rules:{
					newpassword: [
						{required: true, trigger: 'blur', message: '必填', validator: this.Validators.isValidatePass},
					],
					Password: [
						{required: true, trigger: 'blur', message: '必填', validator: this.Validators.isValidatePass},
					]
				},
				appName: 'reportSend',
				reportData:{},//报表的数据
				basic_url: Config.dev_url,
				commentArr: {},
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				selectData: [],//委托单位名称
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
					'委托单位名称',
                    '委托书编号',
					'委托书版本',
					'检测类型',
					'流程状态',
					'承检单位',
					'主检负责人',
					'完成日期',
					'完成方式',
				],
				tableHeader: [{
						label: '报告编号',
						prop: 'REPORT_NUM'
					},{
						label: '委托单位名称',
						prop: 'V_NAME'
					},{
						label: '委托书编号',
						prop: 'PROXYNUM'
					},{
						label: '委托书版本',
						prop: 'VERSION'
					},{
						label: '检测类型',
						prop: 'PROXY_TYPEDesc'
					},{
						label: '流程状态',
						prop: 'STATEDesc'
					},{
						label: '承检单位',
						prop: 'CJDWDesc'
					},{
						label: '主检负责人',
						prop: 'LEADERDesc'
					},{
						label: '完成日期',
						prop: 'COMPDATE'
					},{
						label: '完成方式',
						prop: 'COMPMODE'
					},
				],
				selUser: [],
				USESEAL: [],
				search: false,
				show: false,
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
                searchList: { //点击高级搜索后显示的内容
					REPORT_NUM:'',
					V_NAME:'',
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
			//关闭报告寄出弹出框
			resetNewpwd(){
				this.passdialog = false;
				this.requestData('init');
				this.$refs['newPwdForm'].resetFields();
			},
			//委托单位名称
			getSelPromise(){
				var arr1 = [];
				var resFun = new Promise((resolve,reject)=>{
					this.$axios.get(this.basic_url + '/api-user/depts/findFirstSecond', {}).then((res) => {
						this.selectData = res.data;
						resolve(arr1);
					}).catch((wrong) => {})
				})
				return resFun;
			},
			getSelectData(){
				this.getSelPromise().then(()=>{
					this.$axios.get(this.basic_url + '/api-apps/app/customer', {}).then((res) => {
						var resData = res.data.data;
						for (let i = 0; i < resData.length; i++) {
							this.selectData.push({
								id: resData[i].ID,
								fullname:  resData[i].NAME
							})
						}
					}).catch((wrong) => {})
				})
				.catch(function(err){
					console.log(err);
				})
			},
			//选择数据
			setSelData(val){
				this.selUser = val;
			},
			tableControle(data) {
				this.checkedName = data;
			},
			//重置
			resetbtn(){
				this.searchList = {
					REPORT_NUM:'',
					V_NAME:'',
				};
				this.requestData('init');
			},
			//搜索
			searchinfo() {
				this.requestData('init');
			},
			//请求点击
		    getbtn(item){
		    	if(item.name=="添加"){
                 this.openAddMgr();
                }else if(item.name=="修改"){
		    	 this.modify();
		    	}else if(item.name=="彻底删除"){
		    	 this.physicsDel();
		    	}else if(item.name=="确认报告寄出"){
		    	 this.sendReport();
		    	}else if(item.name=="高级查询"){
		    	 this.modestsearch();
		    	}else if(item.name=="导入"){
		    	 this.download();
		    	}else if(item.name=="删除"){
		    	 this.deluserinfo();
		    	}else if(item.name=="生成子任务单"){
		    	 this.tasklist();
		    	}else if(item.name=="报表"){
			     this.reportdata();
				}
		    },
			//添加类别
			openAddMgr() {
				this.$refs.reportsend.visible();
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
					if(this.selUser[0].STATE == 3 || this.selUser[0].STATE == 2) {
						this.$message({
							message: '已启动的流程，不允许修改数据，只可以查看。',
							type: 'warning'
						});
						this.$refs.reportsend.view(this.selUser[0]);
					}
					//驳回
					else if(this.selUser[0].STATE == 0) {
						var url = this.basic_url + '/api-apps/app/workorder/flow/isExecute/' + this.selUser[0].ID;
						this.$axios.get(url, {}).then((res) => {
							if(res.data.resp_code == 0) {
								var url = this.basic_url + '/api-apps/app/reportOnhole/flow/isPromoterNode/' + this.selMenu[0].ID;
								this.$axios.get(url, {}).then((res) => {
									if(res.data.resp_code == 0) {
										this.$refs.child.detail(this.selMenu[0]);
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
						this.$refs.reportsend.detail(this.selUser[0]);	
					}
				}
			},
			//查看
			view(data) {
				console.log(data);
				this.$refs.reportsend.view(data);
			},
			//确认报告寄出
			sendReport(){
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请选择您要寄出的报告',
						type: 'warning'
					});
					return;
				} else {
					//changeUser为勾选的数据
					var changeUser = selData;
					//cancelid为id的数组
					var cancelid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						cancelid.push(changeUser[i].ID);
					}
					//ids为cancelid数组用逗号拼接的字符串
					ids = cancelid.toString(',');
					var url = this.basic_url + '/api-apps/app/reportSend/operate/confirmReportSend?ids='+ids;
					this.$axios.get(url, {}).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '确认成功',
								type: 'success'
							});
							//重新加载数据
							this.$emit('requests');
						}else {
							this.$message({
								message: res.data.resp_msg,
								type: 'warning'
							});
						}
					}).catch((err) => {
					});
				}
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
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
					var url = this.basic_url + '/api-apps/app/reportSend/deletes';
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
					var url = this.basic_url + '/api-apps/app/reportSend/physicsDel';
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
			//Table默认加载数据
			requestData(opt) {
				this.$refs.table.requestData(opt);
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
				this.$refs.navsTabs.showClick(childValue);
				this.getbutton(childValue);
			},
			  //请求页面的button接口
		    getbutton(childByValue){
		    	var data = {
					menuId: childByValue.id,
					roleId: this.$store.state.roleid,
				};
				var url = this.basic_url + '/api-user/permissions/getPermissionByRoleIdAndSecondMenu';
				this.$axios.get(url, {params: data}).then((res) => {
					this.buttons = res.data;
				}).catch((wrong) => {
				})
			},
			//首页待办任务跳转
			getRouterData() {
      			// 只是改了query，其他都不变
				this.id = this.$route.query.bizId;
				this.$refs.reportapprove.view(this.id);
			},
		},
		mounted() {
			if(this.$route.query.bizId != undefined) {
				this.getRouterData();
			}
			this.getSelectData();//委托单位名称
		},
	}
</script>