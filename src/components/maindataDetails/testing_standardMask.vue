<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加检验/检测标准</div>
				<div class="mask_title" v-show="modifytitle">修改检验/检测标准</div>
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
				<el-form :model="dataInfo" :rules="rules" ref="dataInfo" label-width="80px" class="demo-user">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="基本信息" name="1">
								<el-row :gutter="20" class="pb10"style="margin-right: 5px;">
									<el-col :span="3" class="pull-right">
										<el-input v-model="dataInfo.VERSION" :disabled="true">
											<template slot="prepend">版本</template>
										</el-input>
									</el-col>
									<!--<el-col :span="5" class="pull-right" v-if="modify">
										<el-input v-model="dataInfo.STATUS=='1'?'活动':'不活动'" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
									<el-col :span="5" class="pull-right" v-else>
										<el-input v-model="dataInfo.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>-->
									 <!-- <el-col :span="6" class="pull-right">
										<el-input v-model="dataInfo.S_NUM" :disabled="true">
											<template slot="prepend">产品编号</template>
										</el-input>
									</el-col> --> 
								</el-row>
								<el-row :gutter="10">
									<el-col :span="8">
										<el-form-item label="标准编号" prop="S_NUM">
											<el-input v-model="dataInfo.S_NUM"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="标准名称" prop="S_NAME">
											<el-input v-model="dataInfo.S_NAME"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="英文名称" prop="S_ENGNAME">
											<el-input v-model="dataInfo.S_ENGNAME"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="10">
									<el-col :span="8">
										<el-form-item label="发布时间" prop="RELEASETIME">
											<el-date-picker v-model="dataInfo.RELEASETIME" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width:100%">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="启用时间" prop="STARTETIME">
											<el-date-picker v-model="dataInfo.STARTETIME" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width:100%">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="发布单位" prop="RELEASE_UNIT">
											<el-input v-model="dataInfo.RELEASE_UNIT"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="10">
									<el-col :span="8" v-if="modifytitle">
										<el-form-item label="机构" prop="DEPARTMENT">
											<el-input v-model="dataInfo.DEPARTMENT" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
							<el-collapse-item title="文档" name="2">
								<!-- 字段列表 Begin-->
								<div class="table-func">
									<el-button type="primary" size="mini" round @click="importdia">
										<i class="icon-upload-cloud"></i>
										<font>导入</font>
									</el-button>
									<el-button type="success" size="mini" round @click="addfield">
										<i class="icon-add"></i>
										<font>新建</font>
									</el-button>
								</div>
								<!-- :rules="rules" ref="attributes" -->
								<el-form :model="dataInfo.attributes">
									<el-form-item>
										<el-row :gutter="20">
											<el-col :span="3">
												<el-form-item label="序号"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="文档编号"></el-form-item>
											</el-col>
											<el-col :span="6">
												<el-form-item label="文档描述"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="创建人"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="创建日期"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="附件"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="操作"></el-form-item>
											</el-col>
										</el-row>
										<el-row :gutter="20" v-for="(item,key) in dataInfo.attributes" :key="key">
											<el-col :span="3">
												<el-input type="text" placeholder="请输入序号" v-model="item.columnname"></el-input>
											</el-col>
											<el-col :span="3">
												<el-input type="text" placeholder="请输入文档编号" v-model="item.description"></el-input>
											</el-col>
											<el-col :span="6">
												<el-input type="text" placeholder="文档描述" v-model="item.description"></el-input>
											</el-col>

											<el-col :span="3">
												<el-input type="text" placeholder="创建人" v-model="item.length"></el-input>
											</el-col>
											<el-col :span="3">
												<el-input type="text" placeholder="创建日期" v-model="item.retain"></el-input>
											</el-col>
											<el-col :span="3">
												<el-input type="text" placeholder="附件" v-model="item.files"></el-input>
											</el-col>
											<el-col :span="2">
												<i class="el-icon-delete" @click="delfield(item)" style="color: red"></i>
											</el-col>
										</el-row>
									</el-form-item>
								</el-form>
								<!-- 字段列表 End -->
							</el-collapse-item>
							<el-collapse-item title="其它" name="3" v-if="modify">
								<el-row :gutter="5">
									<el-col :span="8">
										<el-form-item label="录入人" prop="ENTERBY">
											<el-input v-model="dataInfo.ENTERBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE">
											<el-input v-model="dataInfo.ENTERDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改人" prop="CHANGEBY">
											<el-input v-model="dataInfo.CHANGEBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改时间" prop="CHANGEDATE">
											<el-input v-model="dataInfo.CHANGEDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
							<el-button type="primary" @click="saveAndUpdate('dataInfo')">保存</el-button>
							<el-button type="success" @click="saveAndSubmit('dataInfo')" v-show="addtitle">保存并添加</el-button>
							<el-button v-if="modify" type="primary" @click="modifyversion('dataInfo')">修订</el-button>
							<el-button @click="close">取消</el-button>
					</div>
				</el-form>
			</div>
		</div>

	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		props: {
			dataInfo: {
				type: Object,
				default: function(){
					return {
						ID:'',
						S_NUM: '',
						S_NAME: '',
						S_ENGNAME: '',
						RELEASETIME: '',
						STARTETIME: '',
						VERSION:1,
						RELEASE_UNIT: '',
						DEPARTMENT: '',
						ENTERBY: '',
						ENTERDATE: '',
						CHANGEBY: '',
						CHANGEDATE: '',
					}
				}
			},
			page: Object ,
		},
		data() {
			var validateName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请英文填写表名'));
				} else {
					callback();
				}
			};
			var validateDecri = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写描述'));
				} else {
					callback();
				}
			};
			return {
				basic_url: Config.dev_url,
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				value: '',
				selUser: [],
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1', '2', '3'], //手风琴数量
//				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				addtitle: true,
				modifytitle: false,
				modify:false,//修订、修改人、修改时间
				leaddata: [ //导入数据的表格
					{
						columnname: 'author',
						description: '作者姓名',
						type: '字符串(string)',
						length: '6',
						retain: ''
					},
					{
						columnname: 'author',
						description: '作者姓名',
						type: '字符串(string)',
						length: '6',
						retain: ''
					},
					{
						columnname: 'author',
						description: '作者姓名',
						type: '字符串(string)',
						length: '6',
						retain: ''
					},
					{
						columnname: 'author',
						description: '作者姓名',
						type: '字符串(string)',
						length: '6',
						retain: ''
					}
				],
				rules: {
//					S_NUM: [{ required: true, message: '必填', trigger: 'blur' }],//名称
					S_NAME: [{ required: true, message: '必填', trigger: 'blur' }],//名称
//					RELEASETIME:[{required: true, message: '必填', trigger: 'change'}],
					RELEASE_UNIT: [{required: true,trigger: 'blur',message: '必填',}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				DATAINFO:{}//父组件传过来的值
			};
		},
		methods: {
			
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			
			addfield() { //添加行信息
				var obj = {
					columnname: '',
					description: '',
					type: '',
					length: '',
					retain: ''
				};
				//this.attributes.push(obj);
				this.dataInfo.attributes.push(obj);
			},
			delfield(item) {
				var index = this.dataInfo.attributes.indexOf(item);
				if(index !== -1) {
					//this.attributes.splice(index, 1)
					this.dataInfo.attributes.splice(index, 1);
				}
			},
			importdia() {
				this.dialogVisible = true;
			},
			//添加点击按钮显示弹窗
			visible() {
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					console.log(res);
//					this.dataInfo.DEPARTMENT=res.data.companyName;
				    this.dataInfo.DEPARTMENT=res.data.deptName;
					this.dataInfo.ENTERBY=res.data.nickname;
					var date=new Date();
					this.dataInfo.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					});
				});
				this.addtitle = true;
				this.modifytitle = false;
				this.modify = false;
				// this.show = true;
			},
			// 这里是修改
			detail() {
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = false;
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.dataInfo.DEPARTMENT = res.data.deptName;
					this.dataInfo.CHANGEBY = res.data.nickname;
					var date = new Date();
					this.dataInfo.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
					//深拷贝数据
					let _obj = JSON.stringify(this.dataInfo);
        			this.DATAINFO = JSON.parse(_obj);
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					});
				});
				this.show = true;
			},
			//点击关闭按钮
			close() {
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
			//修订
			modifyversion(dataInfo){
				this.$refs[dataInfo].validate((valid) => {
		          	if (valid) {
		          		var DATAINFO = JSON.stringify(this.DATAINFO); //接过来的数据
 						var dataInfo = JSON.stringify(this.dataInfo); //获取新新的数据
				 		if(dataInfo == DATAINFO){
				  		this.$message({
							message: '没有修改不能修改',
							type: 'warning'
						});
						return false;
					  	}else{
							var url = this.basic_url + '/api-apps/app/inspectionSta/operate/upgraded';
							this.$axios.post(url,this.dataInfo).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
								if(res.data.resp_code == 0) {
									this.$message({
										message: '保存成功',
										type: 'success'
									});
									//重新加载数据
									this.show = false;
									this.$emit('request');	
								}
							}).catch((err) => {
								this.$message({
									message: '网络错误，请重试',
									type: 'error'
								});
							});
						}
		          	} else {
			            this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
		          	}
			   });
			},
			// 保存users/saveOrUpdate
			save(dataInfo) {
				this.$refs[dataInfo].validate((valid) => {
					this.dataInfo.RELEASETIME =  this.$moment(this.dataInfo.RELEASETIME).format("YYYY-MM-DD HH:mm:ss");
					this.dataInfo.STARTETIME = this.$moment(this.dataInfo.STARTETIME).format("YYYY-MM-DD HH:mm:ss");
					if (valid) {
						this.dataInfo.STATUS = ((this.dataInfo.STATUS == "1"||this.dataInfo.STATUS == '活动') ? '1' : '0');
//					this.dataInfo.STATUS=this.dataInfo.STATUS=="活动" ? '1' : '0';
						var url = this.basic_url + '/api-apps/app/inspectionSta/saveOrUpdate';
						this.$axios.post(url, this.dataInfo).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//重新加载数据
								this.$emit('request');
								this.$emit('reset');
								this.$refs['dataInfo'].resetFields();
								this.visible();
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
			        } else {
			          	this.show = true;
			          	this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
			        }
				});
			},
			//保存
			saveAndUpdate(dataInfo){
				this.save(dataInfo);
				this.show = false;
				
			},
			//保存并添加
			saveAndSubmit(dataInfo){
				this.save(dataInfo);
				this.$emit('reset');
				this.show = true;
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		}
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>