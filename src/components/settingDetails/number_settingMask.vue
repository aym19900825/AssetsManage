<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加自动编号设置</div>
				<div class="mask_title" v-show="modifytitle">修改自动编号设置</div>
				<div class="mask_title" v-show="viewtitle">查看自动编号设置</div>
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
				<el-form :model="numbsetForm"  :rules="rules" ref="numbsetForm" label-width="100px" status-icon>
					<div class="accordion">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="基础信息" name="1">
								<el-row :gutter="20">
									<!-- <el-col :span="4" class="pull-right" v-if="modify">
										<el-input v-model="numbsetForm.STATUS==1?'活动':'不活动'" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col> -->
									<!-- <el-col :span="4" class="pull-right" v-else>
										<el-input v-model="numbsetForm.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col> -->
										<!-- <el-select v-model="numbsetForm.STATUS" placeholder="请选择信息状态">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select> -->
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<el-form-item label="自动编号名称" prop="AUTOKEY" label-width="110px">
											<el-input v-model="numbsetForm.AUTOKEY" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="前缀">
											<el-input v-model="numbsetForm.PREFIX" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="起始数" prop="S_NUM">
											<el-input v-model="numbsetForm.S_NUM" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8" v-if="dept">
											<el-form-item label="机构" label-width="110px">
												<el-input v-model="numbsetForm.DEPARTMENT" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="备注" label-width="110px">
											<el-input type="textarea" v-model="numbsetForm.MEMO" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
							<el-collapse-item title="其它" name="2"  v-show="views">
								<el-row>
									<el-col :span="8">
										<el-form-item label="录入人"  label-width="110px">
											<el-input v-model="numbsetForm.ENTERBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" label-width="80px">
											<el-input v-model="numbsetForm.ENTERDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
									<el-form-item label="修改人" label-width="80px">
											<el-input v-model="numbsetForm.CHANGEBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<el-form-item label="修改时间"  label-width="110px">
											<el-input v-model="numbsetForm.CHANGEDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="content-footer"v-show="noviews">
						<el-form-item>
							<button @click="cancelForm" class="btn btn-default btn-large">取消</button>
							<button type="primary" class="btn btn-primarys btn-large" @click="submitForm('numbsetForm')">提交</button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
		<!-- 弹出 -->
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		props: {
			page: {
				type: Object,
			},
			numbsetForm: {
				type: Object,
				default: function(){
					return {
						ID:'',
						STATUS:'',
						AUTOKEY:'',
						PREFIX:'',
						S_NUM:'',
						MEMO:'',
						DEPARTMENT:'',
						ENTERBY:'',
						ENTERDATE:'',
						CHANGEBY:'',
						CHANGEDATE:'',
					}
				}
			}
		},
		data() {
			var validateAUTOKEY = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写自动编号名称'));
                }else {
                    callback();
                }
            };
            var validateS_NUM = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写起始数'));
                }else {
                	var targ=/^([0-9]*|[0-9]{1}\d*\.\d{1}?\d*)$/;
                	if (!targ.test(value)) {
                		callback(new Error('起始数须为数字'));
                	}
                    callback();
                }
            };
           
			return {
				basic_url: Config.dev_url,
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				modify:false,//修订、修改人、修改时间
				selMenu:[],
				dialogVisible: false, //对话框
				edit: true, //禁填
				activeNames: ['1','2'], //手风琴数量
				show: false,
				isok1: true,
				isok2: false,
//				labelPosition: 'top',//标题在上方显示
				addtitle:true,
				modifytitle:false,
				rules:{
          			AUTOKEY: [{ 
   						required: true,
   						validator: validateAUTOKEY,
   						trigger: 'blur' 
   					}],
          			S_NUM:[{ 
   						required: true,
   						validator: validateS_NUM,
   						trigger: 'blur' 
   					}]
          		
	          	},
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
			};
		},
		methods: {
			
			//form表单内容清空
			resetNew(){
                this.numbsetForm = {
					STATUS:'活动',//添加时默认显示信息状态
					AUTOKEY:'',
					PREFIX:'',
					S_NUM:'',
					MEMO:'',
					DEPARTMENT:'',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:''
				}
            },
            childMethods() {//添加内容时从父组件带过来的
            	console.log(this.numbsetForm);
            	this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.numbsetForm.DEPARTMENT=res.data.deptName;
					this.numbsetForm.ENTERBY=res.data.nickname;
					var date=new Date();
					this.numbsetForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
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
            	// this.show = !this.show;
            },
            detail() {//修改内容时从父组件带过来的
            	this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.numbsetForm.CHANGEBY=res.data.nickname;
					var date=new Date();
					this.numbsetForm.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
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
            	this.show = true;
            },
            //这是查看
			view(item) {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				// this.numbsetForm = item;
				console.log(this.numbsetForm);
				this.show = true;				
			},
			//点击关闭按钮
			close() {
				this.show = false;
			},
			open(){
				this.show = true;
			},
			cancelForm(){
				this.show = false;
				this.reset();
			},
			reset() {
				this.show = false;
			},
			toggle(e) {
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			maxDialog(e) {
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);
				$(".mask_div").css("margin", "0%");
				$(".mask_div").css("top", "60px");

			},
			//还原按钮
			rebackDialog() {
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("margin", "7% 10%");
				$(".mask_div").css("top", "0");

			},
			//保存
			submitForm(numbsetForm) {
				this.$refs[numbsetForm].validate((valid) => {
		          if (valid) {
		          	this.numbsetForm.STATUS=((this.numbsetForm.STATUS=="1"||this.numbsetForm.STATUS=='活动') ? '1' : '0');
					var url = this.basic_url + '/api-apps/app/autokey/saveOrUpdate';
					this.$axios.post(url, this.numbsetForm).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							//重新加载数据
							this.$emit('request');
							this.$refs["numbsetForm"].resetFields();
						}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
		          } else {
		            return false;
		          }
		        });
				
			},
			handleClose(done) {//大弹出框确定关闭按钮
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>