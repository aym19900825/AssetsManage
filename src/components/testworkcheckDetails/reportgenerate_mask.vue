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
					<el-form inline-message :label-position="labelPosition" label-width="110px">
						<div class="content-accordion" id="information">
							<el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
								<!-- 封面 Begin-->
								<el-tab-pane label="封面" name="first">
									
								</el-tab-pane>
								<!-- 封面 End-->

								<!-- 首页 Begin-->
								<el-tab-pane label="首页" name="second">

								
								</el-tab-pane>
								<!-- 首页 End-->

								<!-- 检测清单 Begin-->
								<el-tab-pane label="检测清单" name="third">
									<div class="clearfix">
										<el-form inline-message :label-position="labelPosition" label-width="110px">
											<el-row>
												<el-col :span="8"></el-col>
											</el-row>
										</el-form>
									</div>

									
								</el-tab-pane>
								<!-- 检测清单 End-->

								<!-- 内容页 Begin-->
								<el-tab-pane label="内容页" name="fourth">
									
									
								</el-tab-pane>
								<!-- 内容页 End-->

								<!-- 封底 Begin-->
								<el-tab-pane label="封底" name="fifth">

									
								</el-tab-pane>
								<!-- 封底 End-->
								
							</el-tabs>
							
						</div>
						<div class="content-footer" v-show="firstBtn">
								<!--首页按钮事件-->
								<el-button type="primary" v-show="secondBtn" @click="submitForm">保存</el-button>
								<!--检测清单按钮事件-->
								<el-button type="primary" v-show="thirdBtn" @click="testListSubmit">保存</el-button>
								<!--内容页按钮事件-->
								<el-button type="primary" v-show="fourthBtn" @click="filesSubmit">生成内容页文档</el-button>
								<!--封底按钮事件-->
								<el-button type="primary" v-show="fifthBtn" @click="reportSubmit">生成检验/检测报告</el-button>
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
				selMenu:[],
				activeName: 'first', //tabs
				activeNames: ['1','2','3','4','5'],//手风琴数量
				labelPosition: 'right', //表格
				isEditing: true,
				showcreateagree:true,//生成分包协议按钮
				pageDisable: false,
				
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
			//清空表单
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
			// 首页按钮事件保存users/saveOrUpdate
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
			//检测清单按钮事件
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

		},
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';

	.el-tabs__content { min-height: 680px;}
</style>
