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
						<!-- <div class="text-center" v-show="viewtitle">
							<span v-show="this.report.STATE==7" class="pr10">
								<el-button class="start" type="success" round plain size="mini" @click="startup" v-show="start" ><i class="icon-start"></i> 提交审核</el-button>
								<el-button class="approval" type="warning" round plain size="mini" @click="approvals" v-show="approval"><i class="icon-edit-3"></i> 报告打印</el-button>
							</span>
							<el-button type="primary" round plain size="mini" @click="flowmap" ><i class="icon-git-pull-request"></i> 流程地图</el-button>
							<el-button type="primary" round plain size="mini" @click="flowhistory"><i class="icon-plan"></i> 流程历史</el-button>
							<el-button type="primary" round plain size="mini" @click="viewpepole"><i class="icon-user"></i> 当前责任人</el-button>
						</div> -->
						<div class="content-accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="打印信息" name="1">
									<el-row :gutter="10">
										<el-col :span="4" class="pull-right">
											<el-input v-model="report.STATEDesc" :disabled="true">
												<template slot="prepend">流程状态</template>
											</el-input>
										</el-col>
										<el-col :span="5" class="pull-right">
											<el-input v-model="report.PROXY_TYPEDesc" :disabled="true">
												<template slot="prepend">检测类型</template>
											</el-input>
										</el-col>
									</el-row>
									<el-row class="pt10">
										<el-col :span="8">
											<el-form-item label="报告编号" prop="REPORT_NUM">
												<el-input v-model="report.REPORT_NUM" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
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
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="委托书版本" prop="PROXY_VERSION">
												<el-input v-model="report.PROXY_VERSION" :disabled="noedit"></el-input>
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
											<el-form-item label="是否寄出" prop="ISSEND">
												<el-radio-group v-model="report.ISSEND">
													<el-radio label="1">是</el-radio>
													<el-radio label="2">否</el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="寄出人" prop="SENDPERSONDesc">
												<el-input v-model="report.SENDPERSONDesc" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="寄出时间" prop="SENDDATE">
												<el-input v-model="report.SENDDATE" :disabled="noedit"></el-input>
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
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="实收费用" prop="ACTUALCOST">
												<el-input v-model="report.ACTUALCOST" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								
								<el-collapse-item title="其他" name="2" v-show="views">
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
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="content-footer" v-show ="!addtitle">
							<el-button type="success" @click="readAuth">打印报告</el-button>
							<el-button type="primary" @click="readAuth">查看报告文件</el-button>
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
			<!--审批页面-->
			<approvalmask :approvingData="approvingData" ref="approvalChild" @detail="detailgetData"></approvalmask>
			<!--流程历史-->
			<flowhistorymask :approvingData="approvingData"  ref="flowhistoryChild" ></flowhistorymask>
			<!--流程地图-->
			<flowmapmask :approvingData="approvingData" ref="flowmapChild" ></flowmapmask>
			<!--当前责任人-->
			<vewPoplemask :approvingData="approvingData"  ref="vewPopleChild" ></vewPoplemask>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import approvalmask from '../workflow/approving.vue'
	import flowhistorymask from '../workflow/flowhistory.vue'
	import flowmapmask from '../workflow/flowmap.vue'
	import vewPoplemask from '../workflow/vewPople.vue'
	export default {
		name: 'masks',
		components: {
			approvalmask,
			flowhistorymask,
			flowmapmask,
			vewPoplemask,
			},
		data() {
			return {
				approvingData:{},//审批的数据
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				po_url:Config.po_url,//pageoffice 服务路径
				selUser: [],
				edit: true, //禁填
				show: false,
				docParm: {
					'model': 'new',
					'recordid': 1,
					'userid': 1,
					'username': '',
					'deptid': 1,
					'deptfullname': '',
					'appname': '',
					'appid': 1
				},
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1','2'], //手风琴数量
				dialogVisible: false, //对话框
				selectData: [],
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				category:{},//从父组件接过来的值
				addtitle:true,
				modifytitle:false,
				viewtitle:false,
				dept:false,
				noedit:false,//可编辑
				views:false,//录入修改人信息
				noviews:true,//按钮
				modify:false,//修订
				hintshow:false,
				statusshow1:true,
				statusshow2:false,
				start:false,
				approval:false,
                report:{
					REPORT_NUM:'',	//报告编码
					REPORTNAME:'',	//报告文件
                    DESCRIPTION:'',	//报告描述
                    WONUMID:'',	//工作任务单ID
                    STATUS:'',	//活动/不活动
                    STATE:'',//流程状态
					STATEDesc:'',
					V_NAME:'',//委托单位
					V_NAMEDesc:'',//委托单位
					DETECTIONTYPE:'',//检测类型
					CJDW:'',//承检单位
					LEADER:'',//主检负责人
					ENTERBY:'',//提交人
					ISSEND:'1',//是否寄出
					SENDPERSON:'',//寄出人
					SENDDATE:'',//寄出时间
					COMPDATE:'',//完成日期
					COMPMODE:'',//完成方式
					ENTERBY:'',//录入人ID
					ENTERBYDesc:'',//录入人描述
					ENTERDATE:'',//录入时间
                    CHANGEBY:'',//修改人
                    CHANGEDATE:'',//修改时间
                    DEPTID:'',//机构ID
                    DEPARTMENT:'',//机构描述
				},
				dataid:'',
				reportBase:'reportBase',//appname
            }
		},
		methods: {
			showLoading(){
				this.loading = true;
			},
			closeLoading(){
				this.loading = false;
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
				this.hintshow = false;
				this.statusshow1 = true;
				this.statusshow2 = false;
				this.show = true;
			},
			//生成的报告文件列表
			detailgetData(){
				// console.log('detailgetData');
				var url = this.basic_url +'/api-apps/app/reportBase/' +this.dataid;
				this.$axios.get(url, {}).then((res) => {
					this.report = res.data;
					console.log(res);
					// this.report.WORKORDER_REPORTList = !!this.report.WORKORDER_REPORTList?this.report.WORKORDER_REPORTList:[];
					this.report.WORKORDER_REPORTList.push(res.data);
					this.show = true;
				}).catch((err) => {
				});
			},
			// 这里是修改
			detail(maindata) {
				this.dataid = maindata.ID;
				this.report.DESCRIPTION = maindata.DESCRIPTION;
				this.report.STATEDesc = maindata.STATEDesc;
				this.report.REPORT_NUM = maindata.REPORT_NUM;
				this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle = false;
				this.dept = true;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.hintshow = false;
				this.modify = true;//修订
				this.statusshow1 = false;
				this.statusshow2 = true;
				this.detailgetData();
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.report.DEPTID = res.data.deptId;//传给后台机构id
					this.report.CHANGEBY = res.data.id;
					var date = new Date();
					this.report.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
                });
                // var url = this.basic_url +'/api-apps/app/reportBase/' + dataid;
				// this.$axios.get(url, {}).then((res) => {
				// 	this.report = res.data;
				// 	this.show = true;
				// }).catch((err) => {
				// 	this.$message({
				// 		message: '网络错误，请重试',
				// 		type: 'error'
				// 	});
				// });
				// this.show = true;
			},
			//这是查看
			view(data) {
				this.dataid = data.ID;
				console.log(data.ID);
				this.report.ISSEND=='1'//是否寄出
				// this.report.DESCRIPTION = data.DESCRIPTION;
				// this.report.STATEDesc = data.STATEDesc;
				// this.report.REPORT_NUM = data.REPORT_NUM;
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.show = true;//弹出框打开
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				//判断启动流程和审批的按钮是否显示
				this.detailgetData();
				var url = this.basic_url + '/api-apps/app/reportBase/flow/isStart/'+this.dataid;
				this.$axios.get(url, {}).then((res) => {
					if(res.data.resp_code==1){
						this.start=true;
						this.approval=false;
					}else{
						var url = this.basic_url + '/api-apps/app/reportBase/flow/Executors/'+this.dataid;
						this.$axios.get(url, {}).then((res) => {
							res.data.CJDW = Number(res.data.CJDW);
							var resullt=res.data.datas;
							var users='';
							for(var i=0;i<resullt.length;i++){
								users = users + resullt[i].username+",";
							}
							if(users.indexOf(this.username) != -1){
								this.approval=true;
								this.start=false;
							}else{
								this.approval=false;
								this.start=false;
							}
						});
					}
				});				
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
			//启动流程
			startup(){
				var url = this.basic_url + '/api-apps/app/reportBase/flow/'+this.dataid;
				this.$axios.get(url, {}).then((res) => {
					if(res.data.resp_code == 1) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
				    }else{
				    	this.$message({
							message:res.data.resp_msg,
							type: 'success'
						});
						this.detailgetData();
						var url = this.basic_url + '/api-apps/app/reportBase/flow/Executors/'+this.dataid;
						this.$axios.get(url, {}).then((res) => {
							var resullt=res.data.datas;
							var users='';
							for(var i=0;i<resullt.length;i++){
								users = users + resullt[i].username+",";
							}
							if(users.indexOf(this.username) != -1){
								this.approval=true;
								this.start=false;
							}else{
								this.approval=false;
								this.start=false;
							}
						});
				    }
				});
			},	
			//审批流程
			approvals(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.reportBase;
				 var url = this.basic_url + '/api-apps/app/reportBase/flow/isEnd/'+this.dataid;
		    		this.$axios.get(url, {}).then((res) => {
		    			if(res.data.resp_code == 0) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
		    			}else{
		    				var url = this.basic_url + '/api-apps/app/reportBase/flow/isExecute/'+this.dataid;
		    				this.$axios.get(url, {}).then((res) => {
				    			if(res.data.resp_code == 1) {
										this.$message({
											message:res.data.resp_msg,
											type: 'warning'
										});
								}else{
									var url = this.basic_url + '/api-apps/app/reportBase/flow/customFlowValidate/'+this.dataid;
								this.$axios.get(url, {}).then((res) => {
				    				if(res.data.resp_code == 1) {
										this.$message({
											message:res.data.resp_msg,
											type: 'warning'
										});
									}else{
									 	this.$refs.approvalChild.visible();
									}
								})
								}
		    				});
		    			}
					});
			},
			//流程历史
			flowhistory(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.reportBase;
//				this.$refs.flowhistoryChild.open();
				this.$refs.flowhistoryChild.getdata(this.dataid);
			},
			//流程地图
			flowmap(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.reportBase;
				this.$refs.flowmapChild.getimage();
			},
			//当前责任人
			viewpepole(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.reportBase;
				this.$refs.vewPopleChild.getvewPople(this.dataid);
			},
			// 保存users/saveOrUpdate
			save(opt) {
				if(valid) {
						var url = this.basic_url + '/api-apps/app/reportBase/saveOrUpdate';
						this.$axios.post(url, this.report).then((res) => {
							if(res.data.resp_code == 0) {
								if(opt == 'docUpload'){
									this.docParm.recordid = res.data.datas.id;
									this.docParm.model = 'edit';
									this.$refs.docTable.autoLoad();
									this.report.id = res.data.datas.id;
								}else{
									this.$message({
										message: '保存成功',
										type: 'success'
									});
									this.$emit('request');
								}
							}else{
								this.show = true;
								if(res.data.resp_code == 1) {
									//res.data.resp_msg!=''后台返回提示信息
									if( res.data.resp_msg!=''){
									 	this.$message({
											message: res.data.resp_msg,
											type: 'warning'
									 	});
									}else{
										this.$message({
											message:'相同数据不可重复添加！',
											type: 'warning'
										});
									}
								}
							}
						}).catch((err) => {
						});
						this.falg = true;
					} else {
						this.show = true;
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
						this.falg = false;
					}
			},
			
			//保存
			saveAndUpdate() {
				this.save();
				if(this.falg){
					this.show = false;
				}
			},
			//保存并继续
			saveAndSubmit() {
				this.save();
				this.show = true;
				this.reset();
			},
			reset(){
				this.report = {
                    ID:'',	//报告ID
                    REPORT_NUM:'',	//编码
                    DESCRIPTION:'',	//报告描述
                    WONUMID:'',	//工作任务单ID
                    STATUS:'',	//活动/不活动
                    STATE:'',//流程状态
                    STATEDesc:'',
                }
			},
			//预览报告文件
			readAuth(){
				// this.detailgetData();
            	var url = this.po_url+"/show?fileid=" + this.report.FILEID
				+ '&userid=' +  this.userid
				+ '&username=' + this.username
				+ '&deptid=' + this.deptid
				+ '&deptfullname=' + this.deptfullname
				window.open(url); 
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
