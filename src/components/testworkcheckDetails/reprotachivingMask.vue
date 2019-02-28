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
								<el-collapse-item title="报告归档" name="1">
									<!-- <el-row class="pb10">
										<el-col :span="3" class="pull-right">
											<el-input v-model="report.VERSION" :disabled="true">
												<template slot="prepend">版本</template>
											</el-input>
										</el-col>
									</el-row> -->

									<el-row>
										<el-col :span="8">
											<el-form-item label="报告编号" prop="REPORTNUM">
												<el-input v-model="report.REPORTNUM" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="报告名称" prop="REPORTNAME">
												<el-input v-model="report.REPORTNAME" :disabled="noedit"></el-input>
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
											<el-form-item label="归档人" prop="ONHOLEPERSON">
												<el-input v-model="report.ONHOLEPERSON" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="归档时间" prop="ONHOLTIME">
												<el-date-picker v-model="report.ONHOLTIME" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
												</el-date-picker>
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
								<el-collapse-item title="文件" name="2">
									<doc-table ref="docTable" :docParm = "docParm" @saveParent = "save" @showLoading = "showLoading" @closeLoading = "closeLoading"></doc-table>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="el-dialog__footer" v-show="noviews">
							<el-button type="primary" @click="saveAndUpdate()">保存</el-button>
							<el-button type="success" @click="saveAndSubmit()" v-show="addtitle">保存并继续</el-button>
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
		components: {docTable},
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
                report:{
                    id:'',	//报告ID
                    REPORTNUM:'',	//报告编号
                    REPORTNAME:'',	//报告名称
                    PROXYNUM:'',	//委托书编号
                    ONHOLEPERSON:'',	//归档人
                    ONHOLTIME:'',	//归档时间
                    CHANGEBY:'',	//修改人
                    CHANGEDATE:'',	//修改时间
                    DEPTID:'',	//机构ID
                    DEPARTMENT:'',	//机构
                }
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
			SelChange(val) {
				this.selUser = val;
			},
			//点击按钮显示弹窗
			visible() {
				this.reset();
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.report.DEPTID = res.data.deptId;
					this.report.ENTERBY = res.data.id;
					// this.CATEGORY.ENTERBYDesc = res.data.nickname;
					var date = new Date();
					this.report.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
					
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
			// 这里是修改
			detail(dataid) {
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
					this.report.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD");

					this.docParm.userid = res.data.id;
					this.docParm.username = res.data.username;
					this.docParm.deptid = res.data.deptId;
					this.docParm.deptfullname = res.data.deptName;
					var _this = this;
					setTimeout(function(){
						_this.docParm.model = 'edit';
						_this.docParm.appname = '报告归档/检测标准';
						_this.docParm.recordid = _this.report.id;
						_this.docParm.appid = 91;
						_this.$refs.docTable.getData();
					},100);
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
                });
                var url = this.basic_url +'/api-apps/app/reportOnhole/' + dataid;
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
			//这是查看
			view(data) {
				this.report = data;
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.show = true;				
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
			save(opt) {
				this.$refs.report.validate((valid) => {
					if(!valid && opt == 'docUpload'){
						this.$message({
							message: '请先正确填写信息，再进行文档上传',
							type: 'warning'
						});
					}
					if(valid) {
						var url = this.basic_url + '/api-apps/app/reportOnhole/saveOrUpdate';
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
				this.reset();
			},
			reset(){
				this.report = {
                    ID:'',	//报告ID
                    REPORTNUM:'',	//报告编号
                    REPORTNAME:'',	//报告名称
                    PROXYNUM:'',	//委托书编号
                    ONHOLEPERSON:'',	//归档人
                    ONHOLTIME:'',	//归档时间
                    CHANGEBY:'',	//修改人
                    CHANGEDATE:'',	//修改时间
                    DEPTID:'',	//机构ID
                    DEPARTMENT:'',	//机构
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