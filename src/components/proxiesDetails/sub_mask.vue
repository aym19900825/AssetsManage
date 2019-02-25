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
						<span class="mask_span mask_max" @click='toggle'>
							<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						</span>
						<span class="mask_span" @click='close'>
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content">
					<el-form :model="report" inline-message :rules="rules" ref="report" label-width="100px" class="demo-adduserForm">
						<div class="accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="承包方分包协议" name="1">
									<el-row class="pb10">
										<el-col :span="3" class="pull-right">
											<el-input v-model="report.STATEDesc" :disabled="true">
												<template slot="prepend">状态</template>
											</el-input>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="委托方名称" prop="V_NAME ">
												<el-input v-model="report.V_NAME " :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="分包方名称" prop="DEPTIDDesc">
												<el-input v-model="report.DEPTIDDesc" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="分包性质" prop="CONTRACT_NATURE">
												<el-select clearable v-model="report.CONTRACT_NATURE" filterable allow-create default-first-option placeholder="请选择" style="width:100%" :disabled="noedit">
													<el-option label="固定" value="1"></el-option>
													<el-option label="临时" value="2"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row>
										<el-col :span="8">
											<el-form-item label="样品名称" prop="ITEMNAME">
												<el-input v-model="report.ITEMNAME" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品状态" prop="ITEM_STATUS">
												<el-input v-model="report.ITEM_STATUS" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="检验检测项目内容" prop="P_REMARKS">
												<el-input v-model="report.P_REMARKS" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row>
										<el-col :span="8">
											<el-form-item label="检验检测技术依据" prop="BASIS">
												<el-input v-model="report.BASIS" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="对环境和操作人员要求" prop="REQUIRES">
												<el-input v-model="report.REQUIRES" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="分包方资质证明及有效期" prop="ONHOLTIME">
												<el-date-picker v-model="report.ONHOLTIME" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
												</el-date-picker>
											</el-form-item>
										</el-col>
									</el-row>
                                     <el-row>
										<el-col :span="8">
											<el-form-item label="完成日期" prop="COMPDATE">
												<el-date-picker v-model="report.COMPDATE" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="检验检测费用" prop="CHECKCOST">
												<el-input v-model="report.CHECKCOST" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="对分包报告/证书的要求" prop="Q_TYPE">
												<el-input v-model="report.Q_TYPE" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8" v-if="dept">
											<el-form-item label="机构" prop="DEPTIDDesc">
												<el-input v-model="report.DEPTIDDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="其它" name="2" v-show="views">
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
						<div class="el-dialog__footer" v-show="noviews">
							<el-button type="primary" @click="saveAndUpdate()">保存</el-button>
							<el-button type="success" @click="saveAndSubmit()" v-show="addtitle">保存并继续</el-button>
							<el-button @click="close">取消</el-button>
						</div>
                        <div class="el-dialog__footer" v-show="!viewtitle">
							<el-button type="primary" @click="createinspect()">生成委托书</el-button>
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
				noedit:false,//表单内容
				views:false,//录入修改人信息
				noviews:true,//按钮
				modify:false,//修订
				hintshow:false,
				statusshow1:true,
                statusshow2:false,
                dataid:'',
                report:{
                    ID:'',	//分包协议ID
                    PROXY_CONTRACT_NUM:'',	//分包协议编号
                    PROXYNUM:'',	//委托书编号
                    V_NAME:'',//委托方名称
                    VENDOR:'',	//单位名称
                    CONTRACT_NATURE:'',//分包性质
                    STATE:'1',//流程状态
                    STATEDesc:'草稿',
                    ITEM_STATUS:'',//样品状态
                    TYPE:'',	//分包协议类别
                    ITEMNAME :'',//样品名称
                    COMPDATE:'',//完成日期
                    P_REMARKS:'',	//检验/检测项目内容
                    BASIS:'',	//检验检测项目依据
                    REQUIRES:'',	//对环境和操作人员要求
                    Q_TYPE:'',	//对分包报告/证书的要求
                    CHECKCOST:'',	//检验检测费用
                    STATUS:'',	//信息状态
                    ENTERBY:'',//	录入人
                    ENTERDATE:'',	//录入时间
                    CHANGEBY:'',	//修改人
                    CHANGEDATE:'',	//修改时间

                }
            }
		},
		methods: {
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//点击按钮显示弹窗
			visible() {
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					console.log(res.data);
					this.report.DEPTID = res.data.deptId;
					this.report.ENTERBY = res.data.id;
					// this.CATEGORY.ENTERBYDesc = res.data.nickname;
					var date = new Date();
					this.report.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
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
//			var url = this.basic_url +'/api-apps/app/inspectPro/' + this.dataid;
				this.$axios.get(url, {}).then((res) => {
					this.report = res.data;
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
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
					this.report.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
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
					this.report.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.detailgetData();
				this.modifytitle = false;
				this.viewtitle = true;
				this.noviews = false;
				this.views = false; //
				this.edit = true;
				this.noedit = true;
            },
			//点击修订按钮
			// modifyversion(report) {
			// 	this.$refs[report].validate((valid) => {
			// 		if(valid) {
			// 			var category=JSON.stringify(this.category); 
	 		// 			var report=JSON.stringify(this.report);
			// 		 	if(category==report){
			// 		  	this.$message({
			// 					message: '没有修改内容，不允许修订！',
			// 					type: 'warning'
			// 				});
			// 				return false;
			// 		    }else{
			// 				var url = this.basic_url + '/api-apps/app/productType/operate/upgraded';
			// 				this.$axios.post(url, this.report).then((res) => {
			// 					//resp_code == 0是后台返回的请求成功的信息
			// 					if(res.data.resp_code == 0) {
			// 						this.$message({
			// 							message: '修订成功',
			// 							type: 'success'
			// 						});
			// 						//重新加载数据
			// 						this.$emit('request');
			// 						this.show = false;
			// 					}else{
			// 					this.show = true;
			// 					if(res.data.resp_code == 1) {
			// 						//res.data.resp_msg!=''后台返回提示信息
			// 						if( res.data.resp_msg!=''){
			// 						 	this.$message({
			// 								message: res.data.resp_msg,
			// 								type: 'warning'
			// 						 	});
			// 						}else{
			// 							this.$message({
			// 								message:'相同数据不可重复修订！',
			// 								type: 'warning'
			// 							});
			// 						}
			// 					}
			// 				}		
			// 				}).catch((err) => {
			// 					this.$message({
			// 						message: '网络错误，请重试',
			// 						type: 'error'
			// 					});
			// 				});
			// 			}
			// 		} else {
			// 			this.$message({
			// 				message: '未填写完整，请填写',
			// 				type: 'warning'
			// 			});
			// 		}
			// 	});
			// },
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
			},
			//还原按钮
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("top", "100px");
			},
			// 保存users/saveOrUpdate
			save() {
				this.$refs.report.validate((valid) => {
					if(valid) {
						var url = this.basic_url + '/api-apps/app/subcontrac/saveOrUpdate';
						this.$axios.post(url, this.report).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//重新加载数据
								this.$emit('request');
								// this.$emit('reset');
								// this.visible();
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
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
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
            createinspect(){
                // /app/subcontrac/operate/createInspectProxy
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
                        message: '已经生成委托书，请勿重复生成',
                        type: 'warning'
                        });
                    }
                }).catch((err) => {
                    this.$message({
                        message: '网络错误，请重试',
                        type: 'error'
                    });
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
					.catch(_ => {});
			},
		},
		mounted() {
			
		},
		
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>