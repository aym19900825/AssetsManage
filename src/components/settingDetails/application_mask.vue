<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加应用管理</div>
					<div class="mask_title" v-show="modifytitle">修改应用管理</div>
					<div class="mask_title" v-show="viewtitle">查看应用管理</div>
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
					<el-form inline-message :model="dataInfo" :rules="rules" ref="dataInfo" label-width="110px" class="demo-adduserForm">
						<div class="content-accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="应用管理" name="1">
									<el-row>
										<el-col :span="8">
											<el-form-item label="应用英文名称" prop="code">
												<el-input v-model="dataInfo.code" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="应用名称" prop="name">
												<el-input v-model="dataInfo.name" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="处理类" prop="handleclass">
												<el-input v-model="dataInfo.handleclass" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="类型" prop="type">
												<el-input v-model="dataInfo.type" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="应用描述" prop="description">
												<el-input v-model="dataInfo.description" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="数据库表" prop="object_id">
												<el-input v-model="dataInfo.object_id" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="模块" prop="module">
												<el-input v-model="dataInfo.module" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="流程" prop="flowkey">
												<el-input v-model="dataInfo.flowkey" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="流程代办单据号" prop="flow_todo_num">
												<el-input v-model="dataInfo.flow_todo_num" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="流程代办描述" prop="flow_todo_desc">
												<el-input v-model="dataInfo.flow_todo_desc" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
										<!--<el-form-item label="报表类型" prop="reportId" label-width="100px">
												<el-select v-model="dataInfo.reportId" multiple :disabled="noedit"  default-first-option  >
													<el-option v-for="item in selectData" :key="item.id" :value="item.id" :label="item.name"></el-option>
												</el-select>
											</el-form-item>-->
											<el-form-item label="报表类型" prop="reportId">
												<el-select v-model="dataInfo.reportId" multiple :disabled="noedit">
													<el-option v-for="item in selectData" :key="item.id" :value="item.id" :label="item.name"></el-option>
												</el-select>
											</el-form-item>
											<!--<el-form-item label="报表类型" prop="reportId" label-width="100px">
												<el-select v-model="dataInfo.reportId" multiple :disabled="noedit"  default-first-option  >
													<el-option v-for="item in selectData" :key="item.id" :value="item.id" :label="item.name"></el-option>
												</el-select>
											</el-form-item>-->
										</el-col>
										
										<el-col :span="8">
											<el-form-item label="排序" prop="sort">
												<el-input v-model="dataInfo.sort" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<!-- <el-row>
										<el-col :span="8" v-if="dept">
											<el-form-item label="机构" prop="">
												<el-input v-model="dataInfo.flowkey" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row> -->
								</el-collapse-item>
								<el-collapse-item title="其他" name="2" v-show="views">
									<el-row>
										<el-col :span="8">
											<el-form-item label="录入人" prop="createUser">
												<el-input v-model="dataInfo.createUser" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="createTime">
												<el-input v-model="dataInfo.createTime" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="机构" prop="deptidDesc" label-width="100px">
												<el-input v-model="dataInfo.deptidDesc" placeholder="当前录入人机构" :disabled="edit">
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改人" prop="updateUser">
												<el-input v-model="dataInfo.updateUser" placeholder="当前修改人" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="变更时间" prop="updateTime">
												<el-input v-model="dataInfo.updateTime" placeholder="当前修改时间" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="content-footer" v-show="noviews">
							<el-button type="primary" @click="save('Update')">保存</el-button>
							<el-button type="success" @click="save('Submit')" v-show="addtitle">保存并继续</el-button>
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
			<reportmask  ref="reportmask" @reportid="reportid" @reports="reports"></reportmask>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import reportmask from '../common/common_mask/reportmask.vue'
	export default {
		name: 'masks',
		components: {
			reportmask	
		},
		data() {
			return {
				basic_url: Config.dev_url,
				selUser: [],
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				activeNames: ['1','2'], //手风琴数量
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
				hintshow:false,
				statusshow1:true,
				statusshow2:false,
				rules: {
					//应用英文名称
					code: [
						{required: true, message: '请填写', trigger: 'blur'},
						// {trigger: 'blur', validator: this.Validators.isEnglish}
					],
					//数据库表
					object_id: [
						{required: true, message: '请填写', trigger: 'blur'},
						// {trigger: 'blur', validator: this.Validators.isEnglish}
					],
					//应用名称
					name: [
						{required: true, message: '请填写', trigger: 'blur'},
						{trigger: 'blur', validator: this.Validators.isSpecificKey}
					],
					//处理类
					handleclass: [{required: true, message: '请填写', trigger: 'blur'}],
					//排序
					sort: [
						{required: false, trigger: 'blur', validator: this.Validators.isInteger},
					],
					//应用描述
					description: [
						{required: true, message: '请填写', trigger: 'blur',},
					],
					
				},
				dataInfo:{
					
				}
			};
		},
		methods: {
			reportid(value){
				this.dataInfo.reportId = value;
			},
			reports(value){
				this.dataInfo.report = value.toString();
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//添加显示弹窗
			visible() {
				this.addtitle = true;
				this.modifytitle = false;
				this.viewtitle = false;
				this.dept = false;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.hintshow = false;
				this.statusshow1 = true;
				this.statusshow2 = false;

				this.getUser('new');
				// this.show = true;
			},
			// 这里是修改
			detail(val) {
				this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle = false;
				this.dept = true;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.hintshow = false;
				this.statusshow1 = false;
				this.statusshow2 = true;
				
				this.detailData = val;
				var id = this.detailData.id;
				this.getData(id);
				this.show = true;
				this.getUser('');

				// this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
				//     this.dataInfo.updateUser = res.data.id;
				// 	var date = new Date();
				// 	this.dataInfo.updateTime = this.$moment(date).format("YYYY-MM-DD HH:MM:SS");
				// }).catch((err) => {
				// });
			},
			//这是查看
			view(val) {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮

				this.detailData = val;
				var id = this.detailData.id;
				this.getData(id);
				this.show = true;				
			},
			//获取当前用户信息
			getUser(opt){
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url,{}).then((res) => {
					if(opt == 'new'){
						this.dataInfo.createUser = res.data.id;
						this.dataInfo.createTime =this.getToday();
					}else{
						this.dataInfo.updateUser = res.data.id;
						this.dataInfo.updateTime = this.getToday();
					}
				}).catch((err) => {
				});
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
			//获取当前组信息
			getData(id){ 
				var url=this.basic_url + '/api-apps/appcfg/'+ id;
				this.$axios.get(url, {}).then((res) => {
					this.dataInfo=res.data;
					if(typeof(this.dataInfo.reportId) != 'undefind'&&this.dataInfo.reportId != null&&this.dataInfo.reportId.length > 0) {
							this.dataInfo.reportId=[];
							var reports = this.dataInfo.reports;
							for(var i = 0; i < reports.length; i++) {
								this.dataInfo.reportId.push(reports[i].id);
							}
					}else if(this.dataInfo.reportId==null){
						this.dataInfo.reportId = [];
						this.dataInfo.reports = [];
					}
					
				this.show = true;
				}).catch((err) => {
				});

				// var url = this.basic_url + '/api-apps/appcfg/' + id;
				// this.$axios.get(url, {
				// }).then((res) => {
				// 	this.dataInfo = res.data;
				// }).catch((wrong) => {})
			},
			//点击关闭按钮
			close() {
				this.resetForm();
				this.show = false;
				this.$emit('request');//关闭弹框去掉勾选
			},
			resetForm(){
				this.dataInfo = {
					"id":'',
					"name":'',
					"num":'',
					"deptid":this.$store.state.currentcjdw[0].id,
					"deptName":this.$store.state.currentcjdw[0].fullname,
					"createUser":'',
					"createTime":'',
					"updateUser":'',
					"updateTime":'',
					"del_flag":'',
				};
				this.show = false;
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
			save(parameter) {
				var _this = this;
				this.$refs.dataInfo.validate((valid) => {
					if(valid) {
						var dataInfo = _this.dataInfo;
						var reportId = "";
						if(typeof(dataInfo.reportId) != 'undefind' && dataInfo.reportId.length > 0) {
							var arr = [];
							dataInfo.reportId.forEach(function(item) {
								var reports = _this.selectData;
								for(var j = 0; j < reports.length; j++) {
									if(reports[j].id == item) {
										arr.push(reports[j]);
										reportId = reportId + reports[j].id + ",";
									}
								}
							});
							dataInfo.reportId = reportId.substring(0,reportId.length-1);
							dataInfo.reports = arr;
						} else {
							dataInfo.reportId = '';
							dataInfo.reports = [];
						}
						var url = this.basic_url + '/api-apps/appcfg/saveOrUpdate';
						this.$axios.post(url, this.dataInfo).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								if(parameter=="Update"){
									this.show = false;
									this.$emit('request');
								}else{
									this.show=true;
									this.$emit('reset');
								}
								this.visible();
								// this.resetForm();
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
					} else {
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
					}
				});
			},
			//报表参数类
			getreport(){
				var url = this.basic_url + '/api-report/report';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data.data;
				}).catch((wrong) => {
				})	
			},
		},
		mounted() {
			this.getreport();
		},
			
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>