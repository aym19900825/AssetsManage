<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加报告归档</div>
					<div class="mask_title" v-show="modifytitle">修改报告归档</div>
					<div class="mask_title" v-show="viewtitle">查看报告归档</div>
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
							<span v-if="this.report.STATE!=3">
							<el-button class="start" type="success" round plain size="mini" @click="startup" v-show="start" ><i class="icon-start"></i> 启动流程</el-button>
							<el-button class="approval" type="warning" round plain size="mini" @click="approvals" v-show="approval"><i class="icon-edit-3"></i> 审批</el-button>
							</span>
							<el-button type="primary" round plain size="mini" @click="flowmap" ><i class="icon-git-pull-request"></i> 流程地图</el-button>
							<el-button type="primary" round plain size="mini" @click="flowhistory"><i class="icon-plan"></i> 流程历史</el-button>
							<el-button type="primary" round plain size="mini" @click="viewpepole"><i class="icon-user"></i> 当前责任人</el-button>
							</div> -->
						<div class="content-accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="报告归档" name="1">
									<el-row :gutter="20" class="pb10">
										<el-col :span="5" class="pull-right pr10">
											<el-input  v-model="report.STATEDesc" :disabled="edit">
												<template slot="prepend">流程状态</template>
											</el-input>
										</el-col>
										<el-col :span="6" class="pull-right pr10">
											<el-input v-model="report.PROXY_TYPEDesc" :disabled="edit">
												<template slot="prepend">检测类型</template>
											</el-input>
										</el-col>
										<el-col :span="7" class="pull-right pr10">
											<el-input v-model="report.REPORT_NUM" :disabled="edit">
												<template slot="prepend">报告编号</template>
											</el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="委托单位名称" prop="V_NAME">
												<el-input v-model="report.V_NAME" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托书编号" prop="PROXYNUM">
												<el-input v-model="report.PROXYNUM" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托书版本" prop="VERSION">
												<el-input v-model="report.VERSION" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="完成日期" prop="COMPDATE">
												<el-input v-model="report.COMPDATE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="完成方式" prop="COMPMODE">
												<el-input v-model="report.COMPMODE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="报告份数" prop="REPORT_QUALITY">
												<el-input v-model="report.REPORT_QUALITY" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="承检单位" prop="CJDWDesc">
												<el-input v-model="report.CJDWDesc" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="主检负责人" prop="LEADERDesc">
												<el-input v-model="report.LEADERDesc" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="报告页数" prop="REPORT_PAGES">
												<el-input v-model="report.REPORT_PAGES"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row>
										<el-col :span="8">
											<el-form-item label="归档人" prop="ONHOLEPERSONDesc">
												<el-input v-model="report.ONHOLEPERSONDesc" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="归档时间" prop="ONHOLTIME">
												<el-date-picker v-model="report.ONHOLTIME" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" style="width: 100%;">
												</el-date-picker>
											</el-form-item>
										</el-col>
									</el-row>
									<!-- <el-row>
										<el-col :span="8" v-if="dept">
											<el-form-item label="机构" prop="DEPTIDDesc">
												<el-input v-model="report.DEPTIDDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row> -->
								</el-collapse-item>
								<!-- <el-collapse-item title="其他" name="2" v-show="views">
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
											<el-form-item label="机构" prop="DEPTIDDesc" label-width="100px">
												<el-input v-model="report.DEPTIDDesc" placeholder="当前录入人机构" :disabled="edit">
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBY">
												<el-input v-model="report.CHANGEBY" placeholder="当前修改人" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" prop="CHANGEDATE">
												<el-input v-model="report.CHANGEDATE" placeholder="当前修改时间" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item> -->
								<el-collapse-item title="文件" name="2">
									<doc-table ref="docTable" :docParm = "docParm" @saveParent = "save" @showLoading = "showLoading" @closeLoading = "closeLoading"></doc-table>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="content-footer" v-show="!addtitle">
							<!-- <el-button type="primary" @click="saveAndUpdate()">保存</el-button> -->
							<!-- <el-button type="success" @click="saveAndSubmit()" v-show="addtitle">保存并继续</el-button> -->
							<el-button type="success" v-show="this.report.STATE=='13'" @click="submitReprot">确认报告归档</el-button>
							<el-button type="primary" @click="readAuth">查看报告文件</el-button>
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import docTable from '../common/doc.vue'
	export default {
		name: 'masks',
		components: {
			docTable,
			},
		data() {
			return {
				approvingData:{},//流程传的数据
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
				// rules: {
				// 	ONHOLEPERSONDesc: [{required: true, trigger: 'change', message: '请选择'}],//归档人
				// 	ONHOLTIME: [{required: true, trigger: 'change', message: '请选择'}],//归档时间
				// },
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
				approval:false,//流程按钮
				start:false,//流程按钮
                report:{
                    ID:'',	//报告ID
                    REPORT_NUM:'',	//报告编号
                    REPORTNAME:'',	//报告名称
                    PROXYNUM:'',	//委托书编号
					ONHOLEPERSON:'',	//归档人ID
					ONHOLEPERSONDesc:'何莉萍',	//归档人描述
                    ONHOLTIME:'',	//归档时间
                    CHANGEBY:'',	//修改人
                    CHANGEDATE:'',	//修改时间
                    DEPTID:'',	//机构ID
					DEPARTMENT:'',	//机构
				},
				buttons:[],
				dataid:'',
				reportOnhole:'reportOnhole',//appname
            }
		},
		methods: {
			//确认报告归档
			submitReprot(){
                var dataid = this.report.ID;
                var url=this.basic_url + '/api-apps/app/reportOnhole/operate/confirmOnhole?id=' + dataid;
                this.$axios.get(url, {}).then((res) => {
                    if(res.data.resp_code == 0) {
                        this.$message({
                            message: '确认成功',
                            type: 'success'
						});
						this.close();
                    }else{
                        this.$message({
							message: res.data.resp_msg,
							type: 'warning'
                        });
                    }
                }).catch((err) => {
                });
			},
			//文件上传加载动画
			showLoading(){
				this.loading = true;
			},
			closeLoading(){
				this.loading = false;
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//添加显示弹窗
			visible() {
				this.reset();
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.report.DEPTID = res.data.deptId;
					this.report.ENTERBY = res.data.id;
					// this.CATEGORY.ENTERBYDesc = res.data.nickname;
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
			// 这里是修改
			detail(dataid) {
				this.dataid=dataid;
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
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.report.DEPTID = res.data.deptId;//传给后台机构id
					this.report.CHANGEBY = res.data.id;
					var date = new Date();
					this.report.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");

					this.docParm.userid = res.data.id;
					this.docParm.username = res.data.username;
					this.docParm.deptid = res.data.deptId;
					this.docParm.deptfullname = res.data.deptName;
					var _this = this;
					setTimeout(function(){
						_this.docParm.model = 'edit';
						_this.docParm.appname = '报告归档/检测标准';
						_this.docParm.recordid = dataid;
						_this.docParm.appid = 91;
						_this.$refs.docTable.getData();
					},100);
				}).catch((err) => {
                });
               this.detailgetData();
			},
			detailgetData(){
				var url = this.basic_url +'/api-apps/app/reportOnhole/' + this.dataid;
				this.$axios.get(url, {}).then((res) => {
					this.report = res.data;
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试2',
						type: 'error'
					});
				});
			},
			//这是查看
			view(id) {
				this.dataid=id;
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.report.ONHOLEPERSON = res.data.id;//归档人
					this.report.ONHOLEPERSONDesc = res.data.nickname;
					console.log(res.data.id);
					console.log(res.data.nickname);
					var date = new Date();
					this.report.ONHOLTIME = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");//归档时间
					}).catch((err) => {
				})
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.show = true;
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.docParm.userid = res.data.id;
					this.docParm.username = res.data.username;
					this.docParm.deptid = res.data.deptId;
					this.docParm.deptfullname = res.data.deptName;
					var _this = this;
					setTimeout(function(){
						_this.docParm.model = 'edit';
						_this.docParm.appname = '报告归档/检测标准';
						_this.docParm.recordid = id;
						_this.docParm.appid = 91;
						_this.$refs.docTable.getData();
					},100);
				}).catch((err) => {
                });
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
			// 保存users/saveOrUpdate
			save(opt) {
				this.$refs.report.validate((valid) => {
					if(!valid && opt == 'docUpload'){
						this.$message({
							message: '请先正确填写信息，再进行文档上传',
							type: 'warning'
						});
					}
					if(valid) {
						var len = this.$refs.docTable.getFilelen();
						if(opt != 'docUpload' && len==0){
							this.$message({
								message: '请先上传模版文件，再保存！',
								type: 'error'
							});
							return false;
						}
						var url = this.basic_url + '/api-apps/app/reportOnhole/saveOrUpdate';
						this.$axios.post(url, this.report).then((res) => {
							if(res.data.resp_code == 0) {
								if(opt == 'docUpload'){
									this.docParm.recordid = res.data.datas.id;
									this.docParm.model = 'edit';
									this.$refs.docTable.autoLoad();
									this.report.id = res.data.datas.id;
									this.report.REPORT_NUM = res.data.datas.REPORT_NUM;
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
				});
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
			//查看报告文件
			readAuth(){
				this.detailgetData();
				var url = this.po_url+"/show?fileid=" +this.report.FILEID
					+ '&userid=' +  this.userid
					+ '&username=' + this.username
					+ '&deptid=' + this.deptid
					+ '&deptfullname=' + this.deptfullname
				window.open(url);
        	},
			reset(){
				this.report = {
                    ID:'',	//报告ID
                    REPORT_NUM:'',	//报告编号
                    REPORTNAME:'',	//报告名称
                    PROXYNUM:'',	//委托书编号
                    ONHOLEPERSON:'',	//归档人
                    ONHOLTIME:'',	//归档时间
                    CHANGEBY:'',	//修改人
                    CHANGEDATE:'',	//修改时间
                    DEPTID:'',	//机构ID
					DEPARTMENT:'',	//机构
					STATEDesc:'草稿',
					STATE:'1',
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
			//获取当前用户
			getUser(){//获取当前用户信息
	            var url = this.basic_url + '/api-user/users/currentMap';
	            this.$axios.get(url, {}).then((res) => {//获取当前用户信息
	                this.username = res.data.username;
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
</style>