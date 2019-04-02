<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title">生成分包协议</div>
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
					<el-form inline-message :model="workorderForm" :label-position="labelPosition" ref="workorderForm" label-width="110px">
						<div class="content-accordion" id="information">
							<el-collapse v-model="activeNames">
								<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
									<el-tabs v-model="activeName">
										<el-tab-pane label="分包方及项目" name="first">
											<!-- 生成分包协议列表 Begin-->
											<el-table :data="tableData" border stripe
											highlight-current-row
											@selection-change="SelChange"
											style="width: 100%;">
												<el-table-column type="expand">
													<template slot-scope="props">
														<!--明细表格 Begin-->
														<el-table :data="WORKORDER_CONTRACTList" row-key="ID" border stripe highlight-current-row @selection-change="SelChange" style="width: 100%;">
															<el-table-column prop="BASIS" label="检验检测技术依据" sortable width="150px">
																{{props.row.BASIS}}
															</el-table-column>
															<el-table-column prop="P_REMARKS" label="检验项目内容" sortable width="200px">
																{{props.row.P_REMARKS}}
															</el-table-column>
															<el-table-column prop="REQUIRES" label="对环境和操作人员要求" sortable>
																{{props.row.REQUIRES}}
															</el-table-column>
															<el-table-column prop="Q_TYPE" label="对分包报告/证书的要求" sortable>
																{{props.row.Q_TYPE}}
															</el-table-column>
															<el-table-column prop="CHECKCOST" label="检验费用" sortable width="120px">
																{{props.row.CHECKCOST}}
															</el-table-column>
														</el-table>
														<!--明细表格 End-->
													</template>
												</el-table-column>

												 <el-table-column type="selection" width="55">
												 </el-table-column>

												 <el-table-column type="index" label="序号" width="55">
												 </el-table-column>

												<el-table-column label="统一信用代码" prop="PRODUCT_UNIT" sortable>
												</el-table-column>

												<el-table-column label="分包方名称" prop="VENDORDesc" sortable>
												</el-table-column>

												<el-table-column label="描述" prop="PROJ_NUM" sortable>
												</el-table-column>
											</el-table>
											<!-- 生成分包协议列表 End-->
									    </el-tab-pane>
									</el-tabs>
								</div>
							</el-collapse>
						</div>
						<div class="content-footer" v-show="!pageDisable">
							<!-- <el-button type="primary" @click="submitForm">保存</el-button> -->
							<el-button type="success" @click="proagree">
								<i class="icon-send"></i>
								生成协议
							</el-button>
							<el-button @click='close'>取消</el-button>
						</div>
					</el-form>
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
				dialogVisible2:false,
				tableData: [{
					PRODUCT_UNIT: '12987122',
					VENDORDesc: '好滋好味鸡蛋仔',
					PROJ_NUM: '10333'
					}, {
					PRODUCT_UNIT: '12987123',
					VENDORDesc: '江浙小吃、小吃零食',
					PROJ_NUM: '10333'
					}, {
					PRODUCT_UNIT: '12987125',
					VENDORDesc: '荷兰优质淡奶，奶香浓而不腻',
					PROJ_NUM: '10333'
					}, {
					PRODUCT_UNIT: '12987126',
					VENDORDesc: '王小虎夫妻店',
					PROJ_NUM: '10333'
				}],
				WORKORDER_CONTRACTList:[],//分包项目
				basic_url: Config.dev_url,
				loadSign:true,//加载
				show: false,
				isok1: true,
				isok2: false,
				up: false,
				noedit:false,
				selMenu:[],
				activeName: 'first', //tabs
				activeNames: ['1','2'],//手风琴数量
				labelPosition: 'right', //表格
				isEditing: true,
				showcreateagree:true,//生成分包协议按钮
				pageDisable: false,
				
			};
		},
		methods: {
			reset(){
            	this.workorderForm = {
										
				};
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selMenu = val;
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
			requestData(){
				var url = this.basic_url + '/api-apps/app/workorder/operate/taskdeal?WORKORDERID='+this.detailId;
				this.$axios.get(url, {}).then((res) => {
					this.workorderForm = res.data.datas;
					if(res.data.datas.STATE == '1'||res.data.datas.STATE == '2'){
						this.pageDisable = false;
					}else{
						if(res.data.datas.STATE == '0'){
							var url2 = this.basic_url +  '/api-apps/app/workorder/flow/Executors/25';
							this.$axios.get(url2, {}).then((res) => {
								if(res.data.resp_code == 0){
									var resData =res.data.datas;
									var userid = this.userid;
									for (var i = 0; i < resData.length; i++) {
										if(userid == resData[i].id){
											this.pageDisable = false;
										}else{
											this.pageDisable = true;
										}
									}
								}
								
							}).catch((wrong) => {});
						}else{
							this.pageDisable = true;
						}
					}
				}).catch((wrong) => {});
			},
			//生成分包协议
			proagree(){
				if(this.selMenu.length == 0) {
					this.$message({
						message: '请选择要生成的分包协议',
						type: 'warning'
					});
					return;
				} else{
					var data = {
						"WORKORDER_CONTRACTID":val.ID,
					};
					var selMenuId=this.selMenu[0].ID;
					var url = this.basic_url +"/api-apps/app/workorder/operate/subproject";
					this.$axios.post(url,data).then((res) => {
						
						if(res.data.resp_code == 0) {
							this.$message({
								message: '生成成功',
								type: 'success'
							});
							this.showcreateagree = false;
						}
					}).catch((err) => {
					});
				}
			},
			// 保存users/saveOrUpdate
			submitForm() {
				this.$refs.workorderForm.validate((valid) => {
		          if (valid) {
					var url = this.basic_url + '/api-apps/app/workorder/saveOrUpdate';
					this.$axios.post(url,this.workorderForm).then((res) => {
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

		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';

	.demo-table-expand span {
		line-height: 40px;
	}
	.demo-table-expand {
		font-size: 0;
	}
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	.el-table__expanded-cell[class*=cell] {
		padding: 10px 0px;
	};
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 100%;
	}
</style>
