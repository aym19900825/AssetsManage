<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title">报告生成与编辑</div>
					<div class="mask_anniu">
						<span class="mask_span mask_max" @click='toggle'>
							<i v-bind:class="{'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						</span>
						<span class="mask_span" @click='close'>
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content">
					<div class="content-accordion" id="information">
						<el-row>
							<el-col :span="20">
								<el-form inline-message :model="reportTemplate" ref="reportTemplate" :rules="rules" label-position="right">
									<el-form-item label="请先选择报告模板" prop="RE_TYPE" label-width="160px">
										<el-select clearable v-model="reportTemplate.RE_TYPE" placeholder="请选择" :disabled="noedit" style="width:500px;">
											<el-option v-for="(data,index) in selectData" :key="index" :value="data.RE_NUM" :label="data.DECRIPTION"></el-option>
										</el-select>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="4" class="text-right">
								<!-- <el-button type="success" round size="medium"><i class="icon-eye"></i> 预览报告</el-button> -->
							</el-col>
						</el-row>

						<el-form inline-message :model="reportGenerateForm" ref="reportGenerateForm" :rules="rules" label-position="right">
							<el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
								<!-- 封面 Begin-->
								
								<el-tab-pane label="封面" name="first">
									<el-row>
										<el-col :span="8">封面</el-col>
									</el-row>
								</el-tab-pane>
								<!-- 封面 End-->

								<!-- 首页 Begin-->
								<el-tab-pane label="首页" name="second">
									<el-row>
										<el-col :span="8">首页</el-col>
									</el-row>
								</el-tab-pane>
								<!-- 首页 End-->

								<!-- 检验检测项目清单 Begin-->
								<el-tab-pane label="检验检测项目清单" name="third">
									<el-table :data="reportGenerateForm.WORKORDER_ITEMSLIST" 
											border 
											stripe 
											:fit="true" 
											max-height="460" 
											style="width: 100%;" 
											:default-sort="{prop:'WORKORDER_ITEMSLIST', order: 'descending'}">
										<el-table-column type="selection" fixed width="55" align="center">
										</el-table-column>

										<el-table-column type="index" label="序号" width="50">
											<template slot-scope="scope">
												<span> {{(page.currentPage-1)*page.pageSize+scope.$index+1}} </span>
											</template>
										</el-table-column>
										<el-table-column label="检验检测项目名称" sortable prop="LIABLE_PERSONDesc">
										</el-table-column>
										<el-table-column label="不合格类别" prop="FILESIZE_ORG">
										</el-table-column>
										<el-table-column label="技术要求" prop="FILESIZE">
										</el-table-column>
										<el-table-column label="计量单位" prop="FILESIZE">
										</el-table-column>
										<el-table-column label="检测结果" prop="FILESIZE">
										</el-table-column>
										<el-table-column label="单项判定" prop="FILESIZE">
										</el-table-column>
									</el-table>
									<div class="pt10 text-right">
										<el-pagination
											@size-change="sizeChange"
											background
											@current-change="currentChange"
											:current-page="page.currentPage"
											:page-sizes="[10, 20, 30, 40]"
											:page-size="page.pageSize"
											layout="total, sizes, prev, pager, next"
											:total="page.totalCount">
										</el-pagination>
									</div>
								</el-tab-pane>
								<!-- 检验检测项目清单 End-->

								<!-- 检验检测成果文件 Begin-->
								<el-tab-pane label="检验检测成果文件" name="fourth">
									<el-table :data="reportGenerateForm.WORKORDER_DATA_TEMPLATEList" 
											border 
											stripe 
											:fit="true" 
											max-height="460" 
											style="width: 100%;" 
											:default-sort="{prop:'WORKORDER_DATA_TEMPLATEList', order: 'descending'}">
										<el-table-column type="selection" fixed width="55" align="center">
										</el-table-column>

										<el-table-column type="index" label="序号" width="50">
											<template slot-scope="scope">
												<span> {{(page.currentPage-1)*page.pageSize+scope.$index+1}} </span>
											</template>
										</el-table-column>

										<el-table-column label="检验责任人" sortable prop="LIABLE_PERSONDesc">

										</el-table-column>

										<el-table-column label="文件名称" prop="FILESIZE_ORG">
										</el-table-column>

										<el-table-column label="文件大小" prop="FILESIZE">
										</el-table-column>

										<el-table-column label="操作">
											<template slot-scope="scope">
												<el-button title="预览" type="primary" round size="mini" @click="readFile(scope.row)"> 
													<i class="icon-eye"></i> 预览
												</el-button>
												<el-button title="回退" type="warning" round size="mini" @click="editFile(scope.row)">
													<i class="icon-back"></i> 回退
												</el-button>
											</template>
										</el-table-column>
									</el-table>
									<div class="pt10 text-right">
										<el-pagination
											@size-change="sizeChange"
											background
											@current-change="currentChange"
											:current-page="page.currentPage"
											:page-sizes="[10, 20, 30, 40]"
											:page-size="page.pageSize"
											layout="total, sizes, prev, pager, next"
											:total="page.totalCount">
										</el-pagination>
									</div>
								</el-tab-pane>
								<!-- 检验检测成果文件 End-->

								<!-- 封底 Begin-->
								<el-tab-pane label="封底" name="fifth">
									
								</el-tab-pane>
								<!-- 封底 End-->
							</el-tabs>
						</el-form>
					</div>
					<div class="content-footer" v-show="firstBtn">
						<!--首页按钮事件-->
						<el-button type="primary" v-show="secondBtn" @click="submitForm">保存</el-button>
						<!--检验检测项目清单按钮事件-->
						<el-button type="primary" v-show="thirdBtn" @click="testListSubmit">保存</el-button>
						<!--内容页按钮事件-->
						<el-button type="primary" v-show="fourthBtn" @click="filesSubmit">生成内容页文档</el-button>
						<!--封底按钮事件-->
						<el-button type="primary" v-show="fifthBtn" @click="reportSubmit">生成检验/检测报告</el-button>
						<el-button @click='close'>取消</el-button>
					</div>
					
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		components: {

		},
		data() {
			return {
				basic_url: Config.dev_url,
				selectData: [],
				reportTemplate:{
					RE_TYPE: '1027',
				},
				reportGenerateForm:{
					INSPECT_RESULT: '',
					WORKORDER_PROJECTList:[],//检测项目
					WORKORDER_ITEMSLIST:[],//检验检测项目清单
					WORKORDER_DATA_TEMPLATEList:[],//检验检测成果文件
				},
				options: [{
					value: '检测结论',
					label: '检测结论'
				}, {
					value: '检测结果',
					label: '检测结果'
				}],
				loadSign:true,//加载
				firstBtn:false,
				secondBtn:false,
				thirdBtn:false,
				fourthBtn:false,
				fifthBtn:false,
				btnShow:true,
				btnClose:false,
				show: false,
				isok1: true,
				isok2: false,
				up: false,
				noedit:false,
				selUser:[],
				activeName: 'first', //tabs
				activeNames: ['1','2','3','4','5'],//手风琴数量
				labelPosition: 'right', //表格
				isEditing: true,
				pageDisable: false,
				page: {//分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				rules: {
					RE_TYPE: [{ required: true, message: '请选择', trigger: 'change' }],//选择报告模板类型
				},
			};
		},
		methods: {
			//TAbs页切换事件判断按钮显示
			handleClick(tab, event) {
				var activeName = event.target.getAttribute('id');//获取当前tabID名
				if(activeName=='tab-first') {//判断按钮显示问题，封面都不显示
					this.firstBtn = false;
				}else if(activeName=='tab-second') {//判断按钮显示问题，首页显示保存和取消
					this.firstBtn = true;
					this.secondBtn = true;
					this.thirdBtn = false;
					this.fourthBtn = false;
					this.fifthBtn = false;
				}else if(activeName=='tab-third') {//判断按钮显示问题，检查清单显示保存和取消
					this.firstBtn = true;
					this.secondBtn = false;
					this.thirdBtn = true;
					this.fourthBtn = false;
					this.fifthBtn = false;
				}else if(activeName=='tab-fourth') {//判断按钮显示问题，内容页显示生成内容页文档和取消
					this.firstBtn = true;
					this.secondBtn = false;
					this.thirdBtn = false;
					this.fourthBtn = true;
					this.fifthBtn = false;
				}else if(activeName=='tab-fifth') {//判断按钮显示问题，封底显示生成生成检验/检测报告和取消
					this.firstBtn = true;
					this.secondBtn = false;
					this.thirdBtn = false;
					this.fourthBtn = false;
					this.fifthBtn = true;
				}
			},
			//报告模板类型
			getReportType() {
				// var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=RE_TYPE';
				var url = this.basic_url + '/api-apps/appSelection/inspectionRepTem/page';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data.data;
					console.log(res.data.data);
					// this.templatefileid = res.data.data[0].ID;
					this.templatefileid = 4;
				});
			},
			//清空表单
			reset(){
					this.reportGenerateForm = {
										
				};
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					row.isEditing = !row.isEditing;
				}
			},
			showDialog(id){
				this.show = true;
				this.detailId = id;
				this.requestData();
			},
			sizeChange(val) {//分页，总页数
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    currentChange(val) {//分页，当前页
		      this.page.currentPage = val;
		      this.requestData();
		    },
			requestData(){
				var url = this.basic_url + '/api-merge/templateConfig/findDataByIds/'+ this.templatefileid +'/'+this.detailId;
				this.$axios.get(url, {}).then((res) => {
					this.reportGenerateForm = res.data;//报告首页
					console.log(res.data);
				}).catch((wrong) => {});
			},
			
			// 首页按钮事件保存users/saveOrUpdate
			submitForm() {
				this.$refs.reportGenerateForm.validate((valid) => {
				if (valid) {
					var url = this.basic_url + '/api-apps/app/workorder/saveOrUpdate';
					this.$axios.post(url,this.reportGenerateForm).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							this.show = false;
							//重新加载数据
							this.$emit('requests');
						}
					}).catch((err) => {
					});
						} else {
							return false;
						}
					});
			},
			//检验检测项目清单按钮事件
			testListSubmit(){

			},
			//内容页按钮事件
			filesSubmit(){

			},
			//封底按钮事件
			reportSubmit(){

			},
			//点击关闭按钮
			close() {
				this.show = false;
				this.$emit('request');
			},
			toggle(e) {
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			maxDialog(e) { //大弹出框距离头部少60px
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 70);
				$(".mask_div").css("top", "-40px");
			},
			//还原按钮
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "90%");
				$(".mask_div").css("top", "0px");
			},
			
		},
		
		mounted() {
			this.getReportType();
		},
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';

	/* .el-tabs__content { min-height: 680px;} */
</style>
