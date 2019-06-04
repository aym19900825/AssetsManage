<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加报告打印</div>
					<div class="mask_title" v-show="modifytitle">修改报告打印</div>
					<div class="mask_title" v-show="viewtitle">查看报告打印</div>
					<div class="mask_anniu">
						<span class="mask_span mask_max" @click="toggle">
							<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						</span>
						<span class="mask_span" @click="close">
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content">
					<el-form inline-message :model="report" ref="report" label-width="100px" class="demo-adduserForm">
						<div class="content-accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="报告信息" name="1">
									<el-row :gutter="10">
										<el-col :span="4" class="pull-right">
											<el-input v-model="report.STATEDesc" :disabled="true">
												<template slot="prepend">流程状态</template>
											</el-input>
										</el-col>
										<el-col :span="6" class="pull-right">
											<el-input v-model="report.PROXY_TYPEDesc" :disabled="true">
												<template slot="prepend">检测类型</template>
											</el-input>
										</el-col>
										<el-col :span="4" class="pull-right">
											<el-input v-model="report.REPORT_VERSION" :disabled="true">
												<template slot="prepend">报告版本</template>
											</el-input>
										</el-col>
										<el-col :span="7" class="pull-right">
											<el-input v-model="report.REPORT_NUM" :disabled="true">
												<template slot="prepend">报告编号</template>
											</el-input>
										</el-col>
									</el-row>
									<el-row class="pt10">
										<el-col :span="8">
											<el-form-item label="委托单位名称" prop="V_NAME">
												<el-input v-model="report.V_NAME" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托书编号" prop="PROXYNUM">
												<el-input v-model="report.PROXYNUM" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托书版本" prop="PROXY_VERSION">
												<el-input v-model="report.PROXY_VERSION" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="工作任务单" prop="WONUMID">
												<el-input v-model="report.WONUMID" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="承检单位" prop="CJDWDesc">
												<el-input v-model="report.CJDWDesc" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="主检负责人" prop="LEADERDesc">
												<el-input v-model="report.LEADERDesc" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="完成日期" prop="COMPDATE">
												<el-input v-model="report.COMPDATE" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="完成方式" prop="COMPMODE">
												<el-input v-model="report.COMPMODE" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="报告总份数" prop="REPORT_QUALITY">
												<el-input v-model="report.REPORT_QUALITY" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>

								<el-collapse-item title="打印历史" name="2">
									<div class="pt10">
										<el-table ref="qualification" :header-cell-style="rowClass" :fit="true"
										:data="report.REPORT_PRINT_LIST"
										row-key="ID"
										border
										stripe
										max-height="260"
										highlight-current-row
										style="width: 100%;"
										@cell-click="iconOperation"
										:default-sort="{prop:'report.REPORT_PRINT_LIST', order: 'descending'}">
											<el-table-column prop="iconOperation" fixed width="50px" v-if="!viewtitle">
												<template slot-scope="scope">
													<i class="el-icon-check" v-if="scope.row.isEditing"></i>
													<i class="el-icon-edit" v-else></i>
												</template>
											</el-table-column>
											<el-table-column prop="STEP" label="序号" sortable width="55px" type="index">
											</el-table-column>
											<el-table-column prop="REPORT_COUNT" label="打印份数" sortable>
												<template slot-scope="scope">
													<el-form-item :prop="'REPORT_PRINT_LIST.'+scope.$index + '.REPORT_COUNT'">
														<el-input v-if="scope.row.isEditing" v-model="scope.row.REPORT_COUNT"></el-input>
														<span v-else>{{scope.row.REPORT_COUNT}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											<el-table-column prop="PRINT_PERSON" label="打印人" sortable>
												<template slot-scope="scope">
													<el-form-item :prop="'REPORT_PRINT_LIST.'+scope.$index + '.PRINT_PERSON'">
														<el-input v-if="scope.row.isEditing" v-model="scope.row.PRINT_PERSON"></el-input>
														<span v-else>{{scope.row.PRINT_PERSON}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											<el-table-column prop="PRINT_DATE" label="打印时间" sortable>
												<template slot-scope="scope">
													<el-form-item :prop="'REPORT_PRINT_LIST.'+scope.$index + '.PRINT_DATE'">
														<el-input v-if="scope.row.isEditing" v-model="scope.row.PRINT_DATE"></el-input>
														<span v-else>{{scope.row.PRINT_DATE}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											<el-table-column prop="PRINT_COUNT" label="打印次数" sortable>
												<template slot-scope="scope">
													<el-form-item :prop="'REPORT_PRINT_LIST.'+scope.$index + '.PRINT_COUNT'">
														<el-input v-if="scope.row.isEditing" v-model="scope.row.PRINT_COUNT"></el-input>
														<span v-else>{{scope.row.PRINT_COUNT}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											<el-table-column prop="IPADDRESS" label="IP地址" sortable>
												<template slot-scope="scope">
													<el-form-item :prop="'REPORT_PRINT_LIST.'+scope.$index + '.IPADDRESS'">
														<el-input v-if="scope.row.isEditing" v-model="scope.row.IPADDRESS"></el-input>
														<span v-else>{{scope.row.IPADDRESS}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											<!-- <el-table-column fixed="right" label="操作" width="120">
												<template slot-scope="scope">
													<el-button @click.native.prevent="deleteRow(scope.$index,scope.row,'tableList')" type="text" size="small" v-show="!viewtitle">
														<i class="icon-trash red"></i>
													</el-button>
												</template>
											</el-table-column> -->
										</el-table>
									</div>
								</el-collapse-item>
								
								<!-- <el-collapse-item title="其他" name="3" v-show="views">
									<el-row>
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBYDesc">
												<el-input v-model="report.ENTERBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENTERDATE">
												<el-input v-model="report.ENTERDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="机构" prop="DEPTIDDesc">
												<el-input v-model="report.DEPTIDDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBYDesc">
												<el-input v-model="report.CHANGEBYDesc" placeholder="当前修改人" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" prop="CHANGEDATE">
												<el-input v-model="report.CHANGEDATE" placeholder="当前修改时间" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item> -->
							</el-collapse>
						</div>
						<div class="content-footer" v-show ="!addtitle">
							<el-button type="success" @click="openPrintReport">打印报告</el-button>
							<el-button type="primary" @click="readAuth">查看报告文件</el-button>
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
			<el-dialog title="打印信息" width="60%" :modal-append-to-body="false" :visible.sync="passdialog" :before-close="resetPrintReport">
				<el-form inline-message :model="reportPrintForm" ref="reportPrintForm">
					<el-row>
						<el-col :span="8">
							<el-form-item label="打印份数" prop="REPORT_COUNT" label-width="100px" :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
								<el-input-number v-model="reportPrintForm.REPORT_COUNT" :min="1" :max="this.REPORT_QUALITY" style="width:100%;" label="描述文字"></el-input-number>
							</el-form-item>
						</el-col>
						<el-col :span="8" class="red pl10" style="line-height: 36px;">最多不超过：{{this.report.REPORT_QUALITY}}份。</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="打印人" label-width="100px">
								<el-input v-model="reportPrintForm.PRINT_PERSONDesc" :disabled="edit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="打印时间" label-width="100px">
								<el-input v-model="reportPrintForm.PRINT_DATE" :disabled="edit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="打印次数" label-width="100px">
								<el-input v-model="reportPrintForm.PRINT_COUNT" :disabled="edit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<iframe :src="this.reportFileUrl" width="100%" frameborder="0" scrolling="auto" overflow-x="auto" style="display:none;"></iframe>
						</el-col>
					</el-row>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="printAuth">确定打印</el-button>
					<el-button @click="resetPrintReport">取 消</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		components: {},
		data() {
			return {
				REPORT_QUALITY:'',//份数
				reportFileUrl:'',//单据
				count:1,//打印次数
				//报告打印数据
				reportPrintForm:{
					// REPORT_COUNT: '',//报告打印份数号
					// PRINT_PERSON:'',//打印人
					// PRINT_DATE:'',//打印时间
					// PRINT_COUNT:'',//打印次数
					// IPADDRESS:'',//IP地址
					// REPORT_QUALITY:'',//报告总份数
					// DEPTID:'',//打印人机构
					// STATUS:'0'//逻辑状态
				},
				passdialog:false,//报告打印弹出框
				approvingData:{},//审批的数据
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				po_url:Config.po_url,//pageoffice 服务路径
				selUser: [],
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1','2','3'], //手风琴数量
				dialogVisible: false, //对话框
				selectData: [],
				//tree
				addtitle:true,
				modifytitle:false,
				viewtitle:false,
				dept:false,
				noedit:false,//可编辑
				views:false,//录入修改人信息
				noviews:true,//按钮
				modify:false,//修订
				start:false,
                report:{
					REPORT_PRINT_LIST: [],//报告打印记录
				},
				dataid:'',
				reportBase:'reportBase',//appname
            }
		},
		methods: {
			//打开报告打印界面
			openPrintReport(){
				this.passdialog = true;
				// this.resetForm();
				this.reportPrintForm =  {
					REPORT_COUNT: '1',  //打印份数
					PRINT_PERSON: this.$store.state.currentuser.id,//打印人ID
					PRINT_PERSONDesc:this.$store.state.currentuser.nickname,//打印人姓名
					PRINT_DATE: this.getToday(),//打印时间
					PRINT_COUNT: this.count,//打印次数
				};
			},
			//获取当前时间
			getToday(){
				var date = new Date();
				var month = date.getMonth();
				month++;
				var str = date.getFullYear() + '-' + month + '-'+ date.getDate() + ' ' +  date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds() ;
				var rate = this.$moment(str).format("YYYY-MM-DD HH:mm:ss")
				return rate;
			},
			//关闭报告寄出弹出框
			resetPrintReport(){
				this.passdialog = false;
				this.resetForm();
			},
			//清空数据
			resetForm(){
				this.reportPrintForm =  {
					'REPORT_COUNT': '',  //打印份数
					'PRINT_PERSON': '',//打印人
					'PRINT_DATE': '',//打印时间
					'PRINT_COUNT': ''//打印次数
				};
			},
			//点击【确定打印】按钮
			printReport(){
				// console.log(this.reportPrintForm.REPORT_COUNT);
				// console.log(this.REPORT_QUALITY);
				this.$refs.reportPrintForm.validate((valid) => {
					if(valid) {
						var url = this.basic_url + '/api-apps/app/reportPrint/operate/confirmReportSend?ids='+this.reportPrintForm.REPORT_COUNT;//等星星弄好接口更换
						this.$axios.get(url, {}).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '打印提交成功',
									type: 'success'
								});
								this.reportPrintForm.PRINT_COUNT= this.count++;//打印次数
								//保存打印历史记录
								var url = this.basic_url + '/api-apps/app/reportPrint/saveOrUpdate';
								this.$axios.post(url, this.reportPrintForm).then((res) => {
								}).catch((err) => {
							});
								this.resetPrintReport();//关闭弹出窗口
							}else {
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
								});
								this.passdialog = true;//打开弹出窗口
							}
						}).catch((err) => {
						});
					} else {
						this.$message({
							message: '请填写打印份数',
							type: 'warning',
						});
					}
				})
			},
		
			//刪除新建行
			deleteRow(index, row, listName){
				var TableName = '';
				if(listName =='tableList'){
					TableName = 'QUALIFICATION';
				}
				if(row.ID){
					var url = this.basic_url + '/api-apps/app/inspectionPro/' + TableName +'/' + row.ID;
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {}).then((res) => {
							if(res.data.resp_code == 0){
								this.report[TableName+'List'].splice(index,1);
								this.$message({
									message: '删除成功',
									type: 'success'
								});
							}else{
								this.$message({
									message: res.data.resp_msg,
									type: 'error'
								});
							}
						}).catch((err) => {
						});
					}).catch(() => {

					});
				}else{
					this.report[TableName+'List'].splice(index,1);
				}
			},
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					row.isEditing = !row.isEditing;
				}
			},
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			//获取导入表格勾选信息
			selChange(val) {
				this.selUser = val;
			},
			//添加显示弹窗
			visible() {
				this.reset();
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.report.DEPTID = res.data.deptId;
					this.report.ENTERBY = res.data.id;
					var date = new Date();
					this.report.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
					this.docParm = {
						'model': 'new',
						'appname': '报告归档',
						'recordid': 1,
						'appid': 91
					};
					this.docParm.userid = res.data.id;
					this.docParm.username = res.data.username;
					this.docParm.deptid = res.data.deptId;
					this.docParm.deptfullname = res.data.deptName;
				}).catch((err) => {
				});
				this.addtitle = true;
				this.modifytitle = false;
				this.viewtitle = false;
				this.dept = false;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.modify = false;//修订
				this.show = true;
			},
			//查看报告
			detailgetData(){
				var url = this.basic_url +'/api-apps/app/reportBase/' +this.dataid;
				this.$axios.get(url, {}).then((res) => {
					this.report = res.data;
					this.REPORT_QUALITY=parseInt(res.data.REPORT_QUALITY);
				}).catch((err) => {
				});
			},
			
			//这是查看
			view(data) {
				this.dataid = data.ID;
				// this.report.DESCRIPTION = data.DESCRIPTION;
				// this.report.STATEDesc = data.STATEDesc;
				// this.report.REPORT_NUM = data.REPORT_NUM;
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.show = true;//弹出框打开
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				//判断启动流程和审批的按钮是否显示
				this.detailgetData();
			},
			//点击关闭按钮
			close() {
				this.show = false;
				this.$emit('request');//关闭弹框去掉勾选
			},
			open(){
				this.show = true;
			},
			toggle(e) {
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			maxDialog(e) { //定义大弹出框一个默认大小
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);
				$(".mask_div").css("top", "60px");
				$(".mask_divbg").css("top", "0px");
			},
			//还原按钮
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "90%");
				$(".mask_div").css("top", "0px");
				$(".mask_divbg").css("top", "100px");
			},
			
			//预览报告文件
			readAuth(){
            	var url = this.po_url+"/show?fileid=" + this.report.FILEID
				+ '&userid=' +  this.userid
				+ '&username=' + this.username
				+ '&deptid=' + this.deptid
				+ '&deptfullname=' + this.deptfullname
				window.open(url); 
			},
			
			//打印报告文件
			printAuth(){
				var recounts = this.reportPrintForm.REPORT_COUNT;
				for (var i = 1; i <= recounts; i++) { 
					var url = this.po_url+"/print?fileid=" + this.report.FILEID
					+ '&userid=' +  this.userid
					+ '&username=' + this.username
					+ '&deptid=' + this.deptid
					+ '&deptfullname=' + this.deptfullname
					+ '&report_print_count=' + i
					+ '&report_quality=' + this.REPORT_QUALITY
					this.reportFileUrl= url;
					window.open(url); 
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
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {
				console.log('取消关闭');
				$('.v-modal').hide();
			});
			},
			getUser(){//获取当前用户信息
	            var url = this.basic_url + '/api-user/users/currentMap';
	            this.$axios.get(url, {}).then((res) => {//获取当前用户信息
					this.userid = res.data.id;
					this.username = res.data.username;
					this.deptid = res.data.deptId;
					this.deptfullname = res.data.deptName;
	            }).catch((err) => {
	            });
        	},
		},
		mounted() {
			this.getUser();
		},
		
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';

	.reportbg {
		margin: 20px auto;
		width: 750px;
		padding: 50px 100px;
		border: 1px solid #EEEEEE;
		background-color: #FFF;
		-webkit-box-shadow:0 10px 15px #97A3B4;  
		-moz-box-shadow:0 10px 15px #97A3B4;  
		box-shadow:0 10px 15px #97A3B4; 
	}
	.reportbg .h2,.reportbg .h3 {font-size: 22px; line-height: 40px; color: #666;}
	.reportbg .h3 {font-size: 16px;}
	.reportbg .h1 {font-size: 50px; line-height: 80px; letter-spacing:40px; font-weight: bold;}
	.reportbotmbg { margin: 0px auto; width: 400px; padding-top:120px; font-size: 16px; line-height: 30px;}
	.reportbotmbg .el-col { padding-top:10px; padding-bottom:10px;}
</style>
