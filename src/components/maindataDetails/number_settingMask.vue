<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加自动编号设置</div>
				<div class="mask_title" v-show="modifytitle">修改自动编号设置</div>
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
				<el-form :model="numbsetForm" :label-position="labelPosition" :rules="rules" ref="numbsetForm" label-width="100px">
					<div class="accordion">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基础信息" name="1">
								<el-row :gutter="20">
									<el-col :span="4" class="pull-right">
										<el-input v-model="numbsetForm.STATUS" :disabled="true">
											<template slot="prepend">状态</template>
										</el-input>
										<!-- <el-select v-model="numbsetForm.STATUS" placeholder="请选择状态">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select> -->
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="自动编号名称" prop="AUTOKEY">
											<el-input v-model="numbsetForm.AUTOKEY"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="前缀">
											<el-input v-model="numbsetForm.PREFIX"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="起始数" prop="S_NUM">
											<el-input v-model="numbsetForm.S_NUM"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="备注" prop="MEMO">
											<el-input type="textarea" v-model="numbsetForm.MEMO"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
										<el-col :span="8">
											<el-form-item label="录入人机构">
												<el-input v-model="numbsetForm.DEPARTMENT" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBY">
												<el-input v-model="numbsetForm.ENTERBY" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENTERDATE">
												<el-input v-model="numbsetForm.ENTERDATE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item v-if="modify" label="修改人" prop="CHANGEBY">
											<el-input v-model="numbsetForm.CHANGEBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item v-if="modify" label="修改时间" prop="CHANGEDATE">
											<el-input v-model="numbsetForm.CHANGEDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="content-footer">
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
	export default {
		name: 'masks',
		props: {
			/*page: {
				type: Object,
			},*/
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
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				modify:true,//修订、修改人、修改时间
				statusshow1:true,
				statusshow2:false,
				selMenu:[],
				showcode:true,
				dialogVisible: false, //对话框
				edit: true, //禁填
				activeNames: ['1'], //手风琴数量
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				show: false,
				isok1: true,
				isok2: false,
				labelPosition: 'top',
				addtitle:true,
				modifytitle:false,
				selectData:[],
				// numbsetForm: {
				// 	STATUS:'',
				// 	AUTOKEY:'',
				// 	PREFIX:'',
				// 	S_NUM:'',
				// 	MEMO:'',
				// 	DEPARTMENT:'',
				// 	ENTERBY:'',
				// 	ENTERDATE:'',
				// 	CHANGEBY:'',
				// 	CHANGEDATE:''
				// },
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
			};
		},
		methods: {
			handleChange(val) { //手风琴开关效果调用
			},
			//form表单内容清空
			resetNew(){
                this.numbsetForm = {
					STATUS:'活动',//添加时默认显示状态
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
                //this.$refs["numbsetForm"].resetFields();
            },
            childMethods() {//添加内容时从父组件带过来的
            	this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
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
            	this.modify=false;
            	this.show = !this.show;
            },
            detail() {//修改内容时从父组件带过来的
            	this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
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
            	this.modify=true;
            	this.show = true;
            },
			//点击关闭按钮
			close() {
				this.show = false;
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
					var url = '/api/api-apps/app/autokey/saveOrUpdate';
					this.$axios.post(url, this.numbsetForm).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							this.show = false;
							//重新加载数据
							this.$emit('request')
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
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>