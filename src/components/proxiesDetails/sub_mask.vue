<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<!-- <div class="mask_title" v-show="addtitle">添加报告归档</div> -->
					<div class="mask_title" v-show="modifytitle">修改承包方分包协议</div>
					<div class="mask_title" v-show="viewtitle">查看承包方分包协议</div>
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
					<el-form inline-message :model="report" :rules="rules" ref="report" label-width="170px" class="demo-adduserForm">
						<!-- <div class="text-center" v-show="viewtitle">
							<span v-if="this.report.STATE!=3" class="pr10">
								<el-button id="approval" type="warning" round plain size="mini" @click="approvals" v-show="approval"><i class="icon-edit-3"></i> 审批</el-button>
							</span>
							<el-button type="primary" round plain size="mini" @click="flowmap"><i class="icon-git-pull-request"></i> 流程地图</el-button>
							<el-button type="primary" round plain size="mini" @click="flowhistory"><i class="icon-plan"></i> 流程历史</el-button>
							<el-button type="primary" round plain size="mini" @click="viewpepole"><i class="icon-user"></i> 当前责任人</el-button>
						</div> -->
						<div class="content-accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="承包方分包协议" name="1">
									<el-row class="pb10">
										<el-col :span="5" class="pull-right">
											<el-input v-model="report.STATEDesc" :disabled="true">
												<template slot="prepend">状态</template>
											</el-input>
										</el-col>
										
										<el-col :span="6" class="pull-right pr10">
											<el-input v-model="report.TYPEDesc" :disabled="true">
												<template slot="prepend">委托书类型</template>
											</el-input>
										</el-col>
									</el-row>
									<el-row  :gutter="20">
										<el-col :span="8">
											<el-form-item label="委托方名称" prop="V_NAMEDesc">
												<el-input v-model="report.V_NAMEDesc " :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="分包方名称" prop="DEPTIDDesc" label-width="100px">
												<el-input v-model="report.DEPTIDDesc" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="分包性质" prop="CONTRACT_NATUREDesc" label-width="100px">
												<el-input v-model="report.CONTRACT_NATUREDesc" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="24">
											<el-form-item label="检验检测项目内容" prop="P_REMARKS">
												<el-input type="textarea" rows="3" v-model="report.P_REMARKS" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="24">
											<el-form-item label="检验检测技术依据" prop="BASIS">
												<el-input type="textarea" rows="3" v-model="report.BASIS" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="24">
											<el-form-item label="对环境和操作人员要求" prop="REQUIRES">
												<el-input type="textarea" rows="3" v-model="report.REQUIRES" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row  :gutter="20">
                                       <el-col :span="24">
											<el-form-item label="分包方资质证明及有效期" prop="ONHOLTIME">
												<el-input type="textarea" rows="3" v-model="report.ONHOLTIME" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
                                       <el-col :span="8">
											<el-form-item label="完成日期" prop="COMPDATE">
												<el-date-picker v-model="report.COMPDATE" type="date" placeholder="无" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="检验检测费用(元)" prop="CHECKCOST" label-width="130px">
												<el-input v-model="report.CHECKCOST" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

                                    <el-row :gutter="20">
										<el-col :span="24">
											<el-form-item label="对分包报告/证书的要求" prop="Q_TYPE">
												<el-input type="textarea" rows="3" v-model="report.Q_TYPE" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

                                    <el-row  :gutter="20">
										<el-col :span="8">
											<el-form-item label="样品名称" prop="ITEMNAME">
												<el-input v-model="report.ITEMNAME" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品数量" prop="ITEMQUANTITY" label-width="130px">
												<el-input v-model="report.ITEMQUANTITY" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品状态" prop="ITEM_STATUS" label-width="100px">
												<el-input v-model="report.ITEM_STATUS" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="24">
											<el-form-item label="双方的责任和义务">
												<p><b>委托方：</b>提供分包检验检测项目的有关技术资料，负担检验检测费用，拥有报告/证书的所有权；</p>
												<p><b>分包方：</b>保证检验检测质量，按时完成检验检测工作，对样品的完整性、检验检测结果的保密、安全负责，未经委托方的同意不引用分包检验检测数据和结果，对样品不进行照相、测绘，不复制样品及检验检测资料。</p>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="其他" name="2" v-show="viewtitle">
									<el-row  :gutter="20">
										<el-col :span="8">
											<el-form-item label="发出人" prop="ENTERBYDesc" label-width="100px">
												<el-input v-model="report.ENTERBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="发出时间" prop="ENTERDATE" label-width="100px">
												<el-input v-model="report.ENTERDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="发出人机构" prop="DEPTIDDesc" label-width="100px">
												<el-input v-model="report.DEPTIDDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="接收人" prop="CHANGEBYDesc" label-width="100px">
												<el-input v-model="report.CHANGEBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="接收时间" prop="CHANGEDATE" label-width="100px">
												<el-input v-model="report.CHANGEDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</div>
						<!-- <div class="content-footer" v-show="noviews">
							<el-button type="primary" @click="saveAndUpdate()">保存</el-button>
							<el-button type="success" @click="saveAndSubmit()" v-show="addtitle">保存并继续</el-button>
							<el-button @click="close">取消</el-button>
						</div> -->
                        <div class="content-footer" v-show="viewtitle">
							<el-button type="success" @click="confirmReceipt" v-show="this.report.STATE=='1'"><i class="icon-check"></i> 确认接收此分包协议</el-button>
							<el-button type="primary" @click="createInspect" v-show="this.report.STATE=='2'">生成委托书</el-button>
						</div>
					</el-form>
				</div>
			</div>
			<!--审批页面-->
			<approvalmask :approvingData="approvingData" ref="approvalChild" @detail="detailgetData"></approvalmask>
			<!--流程历史-->
			<flowhistorymask :approvingData="approvingData"  ref="flowhistoryChild" ></flowhistorymask>
			<!--流程地图-->
			<flowmapmask :approvingData="approvingData" ref="flowmapChild"></flowmapmask>
			<!--当前责任人-->
			<vewPoplemask :approvingData="approvingData"  ref="vewPopleChild"></vewPoplemask>
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
			var validateNum = (rule, value, callback) => {
				if(value != ""){
		             if((/^[0-9a-zA-Z()（）]+$/).test(value) == false){
		                 callback(new Error("请填写数字、字母或括号（编码不填写可自动生成）"));
		             }else{
		                 callback();
		             }
		         }else{
		             callback();
		         }
			};
			var validateType = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写产品类别名称'));
				} else {
					if((/^[!@#$%^&*";',.~！@#￥%……&*《》？，。?、|]+$/).test(value) == true){
		                 callback(new Error("请规范填写名称"));
		            }else{
		                callback();
		            }
				}
			};
			return {
				approvingData:{},
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				selUser: [],
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1','2'], //手风琴数量
				dialogVisible: false, //对话框
				selectData: [],
				rules: {
					NUM: [{required: false,trigger: 'change',validator: validateNum,}],
					TYPE: [{required: true,trigger: 'blur',validator: validateType,}],
				},
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
                dataid:'',
                subcontrac:'subcontrac',//appname
                report:{
					ID:'',  //分包协议ID
					PROXY_CONTRACT_NUM:'',  //分包协议编号
					PROXYNUM:'',    //委托书编号
					V_NAME:'',//委托方名称
					VENDOR:'',  //单位名称
					CONTRACT_NATURE:'',//分包性质
					STATE:'',//流程状态
					STATEDesc:'',
					ITEM_STATUS:'',//样品状态
					TYPE:'',    //分包协议类别
					ITEMNAME :'',//样品名称
					COMPDATE:'',//完成日期
					P_REMARKS:'',   //检验/检测项目内容
					BASIS:'',   //检验检测项目依据
					REQUIRES:'',    //对环境和操作人员要求
					Q_TYPE:'',  //对分包报告/证书的要求
					CHECKCOST:'',   //检验检测费用
					STATUS:'',  //信息状态
					ENTERBY:'',//   录入人
					ENTERDATE:'',   //录入时间
					CHANGEBY:'',    //修改人
					CHANGEDATE:'',  //修改时间
					
					}
            }
		},
		methods: {
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//添加显示弹窗
			visible() {
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.report.DEPTID = res.data.deptId;
					this.report.ENTERBY = res.data.id;
					// this.CATEGORY.ENTERBYDesc = res.data.nickname;
					var date = new Date();
					this.report.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
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
			detailgetData() {
				var url = this.basic_url + '/api-apps/app/subcontrac/' + this.dataid;
				this.$axios.get(url, {}).then((res) => {
					this.report = res.data;
					this.show = true;
				}).catch((err) => {
                });
                this.show = true;
			},	
			
			// 这里是修改
			detail(dataid) {
				this.dataid=dataid;
				var usersUrl = this.basic_url + '/api-user/users/currentMap'
				this.$axios.get(usersUrl, {}).then((res) => {
					this.report.DEPTID = res.data.deptId;//传给后台机构id
					this.report.CHANGEBY = res.data.id;
					var date = new Date();
					this.report.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
				});
				this.detailgetData();
				this.modifytitle = true;
				this.addtitle = false;
				this.viewtitle = false;
				this.noviews = true;
				this.views = false; //
				this.edit = true;
				this.noedit = false;
            },
            view(dataid){
                this.dataid=dataid;
				var usersUrl = this.basic_url + '/api-user/users/currentMap'
				this.$axios.get(usersUrl, {}).then((res) => {
					this.report.DEPTID = res.data.deptId;//传给后台机构id
					this.report.CHANGEBY = res.data.id;
					var date = new Date();
					this.report.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
				});
				this.detailgetData();
				this.modifytitle = false;
				this.viewtitle = true;
				this.noviews = false;
				this.views = false; //
				this.edit = true;
				this.noedit = true;
				//判断启动流程和审批的按钮是否显示
				var url = this.basic_url + '/api-apps/app/subcontrac/flow/isStart/'+dataid;
				this.$axios.get(url, {}).then((res) => {
					if(res.data.resp_code==1){
						this.start=true;
						this.approval=false;
					}else{
						var url = this.basic_url + '/api-apps/app/subcontrac/flow/Executors/'+dataid;
						this.$axios.get(url, {}).then((res) => {
							var resullt=res.data.datas;
							var users='';
							var users='';
							for(var i=0;i<resullt.length;i++){
								users = users + resullt[i].username+",";
							}
							if(users.indexOf(this.username) != -1){
								this.approval=true;
								this.start=false;
							}
						});
					}
				});
            },
            //启动流程
			startup(){
				var url = this.basic_url + '/api-apps/app/subcontrac/flow/'+this.dataid;
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
						var url = this.basic_url + '/api-apps/app/subcontrac/flow/Executors/'+this.dataid;
							this.$axios.get(url, {}).then((res) => {
									var resullt=res.data.datas;
									var users='';
									for(var i=0;i<resullt.length;i++){
										users = users + resullt[i].username+",";
									}
								if(users.indexOf(this.username) != -1){
									this.approval=true;
									this.start=false;
								}
							});
							this.detailgetData();
				    }
				});
			},
			//审批流程
			approvals(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.subcontrac;
				 var url = this.basic_url + '/api-apps/app/subcontrac/flow/isEnd/'+this.dataid;
		    		this.$axios.get(url, {}).then((res) => {
		    			if(res.data.resp_code == 0) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
		    			}else{
		    				var url = this.basic_url + '/api-apps/app/subcontrac/flow/isExecute/'+this.dataid;
		    				this.$axios.get(url, {}).then((res) => {
				    			if(res.data.resp_code == 1) {
									this.$message({
										message:res.data.resp_msg,
										type: 'warning'
									});
								}else{
									this.$refs.approvalChild.visible();
								}
		    		});
		    		}
				});
			},
			//流程历史
			flowhistory(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.subcontrac;
//				this.$refs.flowhistoryChild.open();
				this.$refs.flowhistoryChild.getdata(this.dataid);
			},
			//流程地图
			flowmap(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.subcontrac;
				this.$refs.flowmapChild.getimage();
			},
			//当前责任人
			viewpepole(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.subcontrac;
				this.$refs.vewPopleChild.getvewPople(this.dataid);
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
			save() {
				this.$refs.report.validate((valid) => {
					if(valid) {
						var url = this.basic_url + '/api-apps/app/subcontrac/saveOrUpdate';
						this.$axios.post(url, this.report).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//重新加载数据
								this.$emit('request');
								// this.$emit('reset');
							}else{
								this.show = true;
								if(res.data.resp_code == 1) {
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
			},
			//确认接收此分包协议
			confirmReceipt(){
                var dataid = this.report.ID;
                var url=this.basic_url + '/api-apps/app/subcontrac/operate/confirmReceive?id=' + dataid;
                this.$axios.get(url, {}).then((res) => {
                    if(res.data.resp_code == 0) {
                        this.$message({
                            message: '分包协议接收成功',
                            type: 'success'
						});
						this.detailgetData();
                    }else{
                        this.$message({
							message: res.data.resp_msg,
							type: 'warning'
                        });
                    }
                }).catch((err) => {
                });
			},
			//生成委托书
            createInspect(){
                var dataid = this.report.ID;
                var url=this.basic_url + '/api-apps/app/subcontrac/operate/createInspectProxy?ID=' + dataid;
                this.$axios.get(url, {}).then((res) => {
                    if(res.data.resp_code == 0) {
                        this.$message({
                            message: '生成委托书成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
							message: res.data.resp_msg,
							type: 'warning'
                        });
                    }
                }).catch((err) => {
                });
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
	            this.$axios.get(url, {}).then((res) => {//
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