<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加检验/检测方法</div>
				<div class="mask_title" v-show="modifytitle">修改检验/检测方法</div>
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
				<el-form status-icon :model="testingForm" :label-position="labelPosition" :rules="rules" ref="testingForm" label-width="100px">
					<div class="accordion">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基础信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="3" class="pull-right">
										<el-input v-model="testingForm.VERSION" :disabled="true">
											<template slot="prepend">版本</template>
										</el-input>
									</el-col>
									<el-col :span="3" class="pull-right">
										<el-input v-model="testingForm.STATUS" :disabled="true">
											<template slot="prepend">状态</template>
										</el-input>
										<!-- <el-select v-model="testingForm.STATUS" placeholder="请选择状态">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select> -->
									</el-col>
									<!-- <el-col :span="7" class="pull-right">
										<el-input v-model="testingForm.M_NUM" :disabled="true">
											<template slot="prepend">检验/检测方法编号</template>
										</el-input>
									</el-col> -->
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="检验/检测方法编号" prop="M_NUM" required="true">
											<el-input v-model="testingForm.M_NUM"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="中文名称" prop="M_NAME" required="true">
											<el-input v-model="testingForm.M_NAME"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="英文名称" prop="M_ENAME">
											<el-input v-model="testingForm.M_ENAME"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="类别" prop="M_TYPE">
											<el-input v-model="testingForm.M_TYPE" disabled>
											<el-button slot="append" icon="icon-search"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="录入人机构" prop="DEPARTMENT">
											<el-input v-model="testingForm.DEPARTMENT" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入人" prop="ENTERBY">
											<el-input v-model="testingForm.ENTERBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE">
											<el-input v-model="testingForm.ENTERDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8" v-if="modify">
										<el-form-item label="修改人" prop="CHANGEBY">
											<el-input v-model="testingForm.CHANGEBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8" v-if="modify">
										<el-form-item label="修改时间" prop="CHANGEDATE">
											<el-input v-model="testingForm.CHANGEDATE" :disabled="true"></el-input>
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

								<el-form :model="testingForm.attributes">
									<el-form-item>
										<el-row :gutter="20">
											<el-col :span="3">
												<el-form-item label="序号"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="文档编号"></el-form-item>
											</el-col>
											<el-col :span="7">
												<el-form-item label="文档描述"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="创建人"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="创建日期"></el-form-item>
											</el-col>
											<el-col :span="4">
												<el-form-item label="附件"></el-form-item>
											</el-col>
											<el-col :span="1">
												<el-form-item label="操作"></el-form-item>
											</el-col>
										</el-row>
										<el-row :gutter="20" v-for="(item,key) in testingForm.attributes" :key="key">
											<el-col :span="3">
												<el-input type="text" placeholder="请输入序号" v-model="item.COLUMNID"></el-input>
											</el-col>
											<el-col :span="3">
												<el-input type="text" placeholder="请输入文档编号" v-model="item.FILESNUMBER"></el-input>
											</el-col>
											<el-col :span="7">
												<el-input type="text" placeholder="文档描述" v-model="item.FILSEDESC"></el-input>
											</el-col>
											<el-col :span="3">
												<el-input type="text" placeholder="创建人" v-model="item.ENTERB"></el-input>
											</el-col>
											<el-col :span="3">
												<el-input type="text" placeholder="创建日期" v-model="item.ENTERDATE"></el-input>
											</el-col>
											<el-col :span="4">
												<el-upload
													class="upload-demo"
													action="https://jsonplaceholder.typicode.com/posts/"
													:on-preview="handlePreview"
													:on-remove="handleRemove"
													:before-remove="beforeRemove"
													multiple
													:limit="3"
													:on-exceed="handleExceed"
													:file-list="fileList">
													<el-button size="small" type="primary">点击上传</el-button>
												</el-upload>
											</el-col>
											<el-col :span="1">
												<i class="el-icon-delete red" @click="delfield(item)"></i>
											</el-col>
										</el-row>
									</el-form-item>
								</el-form>
								<!-- 字段列表 End -->
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="content-footer">
						<el-form-item>
							<!-- <button @click="cancelForm" class="btn btn-default btn-large">取消</button> -->
							<button type="primary" class="btn btn-primarys btn-large" @click="submitForm('testingForm')">提交</button>
							<el-button v-if="modify" type="primary" class="btn-primarys" @click="modifyversion">修订</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'testing_mask',
		props: {
			testingForm: { //接收表单中填写的数据信息
				type: Object,
				default: function() {
					return {
						VERSION: '1',
						STATUS: '活动',
						M_NUM: 'TRO100012',
						M_NAME: '',
						M_ENAME: '',
						M_TYPE: '',
						DEPARTMENT: '',
						ENTERBY: '',
						ENTERDATE: '',
						CHANGEBY: '',
						CHANGEDATE: '',
					}
				}
			},
			page: {
				type: Object,
			},

		},
		data() {
			var validateM_NAME = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写中文名称'));
				} else {
					callback();
				}
			};
			var validateM_ENAME = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写英文名称'));
				} else {
					callback();
				}
			};
			var validateM_TYPE = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写类别'));
				} else {
					callback();
				}
			};

			return {
				options: [{
					value: '选项1',
					label: '活动'
				}, {
					value: '选项2',
					label: '活动2'
				}, {
					value: '选项3',
					label: '活动3'
				}, {
					value: '选项4',
					label: '活动4'
				}],
				value: '',
				showcode: true,
				edit: true, //禁填
				value11: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				dialogVisible: false, //对话框
				activeNames: ['1', '2'], //手风琴数量
				labelPosition: 'top', //表单标题在上方
				addtitle: true,
				modifytitle: false,
				modify:true,//修订、修改人、修改时间
				fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
				// testingForm: { //接收表单中填写的数据信息
				// 	VERSION: '',
				// 	STATUS: '',
				// 	M_NUM: '',
				// 	M_NAME: '',
				// 	M_ENAME: '',
				// 	M_TYPE: '',
				// 	DEPARTMENT: '',
				// 	ENTERBY: '',
				// 	ENTERDATE: '',
				// 	CHANGEBY: '',
				// 	CHANGEDATE: '',
				// 	attributes: [{ //行字段列表信息
				// 		COLUMNID: '',
				// 		FILESNUMBER: '',
				// 		FILSEDESC: '',
				// 		ENTERB: '',
				// 		ENTERDATE: '',
				// 		FILESURL: ''
				// 	}]
				// },
				rules: { //定义需要校验数据的名称
					M_NAME: [{
						required: true,
						trigger: 'blur',
						validator: validateM_NAME,
					}],
					M_ENAME: [{
						required: true,
						trigger: 'blur',
						validator: validateM_ENAME,
					}],
					M_TYPE: [{
						required: true,
						trigger: 'blur',
						validator: validateM_TYPE,
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
			};
		},
		methods: {
				//上传文件 Begin
				handleRemove(file, fileList) {
					console.log(file, fileList);
				},
				handlePreview(file) {
					console.log(file);
				},
				handleExceed(files, fileList) {
					this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
				},
				beforeRemove(file, fileList) {
					return this.$confirm(`确定移除 ${ file.name }？`);
				},
				//上传文件 End
			     
			importdia() {
				this.dialogVisible = true;
			},
			handleChange(val) { //手风琴开关效果调用
			},
			addfield() { //添加文档行信息
				var obj = {
					COLUMNID: '',
					FILESNUMBER: '',
					FILSEDESC: '',
					ENTERB: '',
					ENTERDATE: '',
					FILESURL: ''
				};
				//this.attributes.push(obj);
				this.testingForm.attributes.push(obj);
			},
			delfield(item) {
				var index = this.testingForm.attributes.indexOf(item);
				if(index !== -1) {
					//this.attributes.splice(index, 1)
					this.testingForm.attributes.splice(index, 1);
				}
			},
			//添加内容时从父组件带过来的
			visible() {
				this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
					this.testingForm.DEPARTMENT=res.data.deptName;
					this.testingForm.ENTERBY=res.data.nickname;
					var date=new Date();
					this.testingForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
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

			detail() { //修改内容时从父组件带过来的
				this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
					this.testingForm.CHANGEBY=res.data.nickname;
					var date=new Date();
					this.testingForm.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.show = true;
			},
			//点击修订按钮
			modifyversion(){
				this.testingForm.VERSION = this.testingForm.VERSION + 1;
			},
			//点击关闭按钮
			close() {
				this.show = false;
			},
			cancelForm() {
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
			maxDialog(e) { //大弹出框距离头部少60px
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
			submitForm(testingForm) {
				this.$refs[testingForm].validate((valid) => {
//					if(valid) {
						var url = '/api/api-apps/app/inspectionMet/saveOrUpdate';
           
						this.$axios.post(url, this.testingForm).then((res) => {
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
//					} else {
//						return false;
//					}
				});

			},
			handleClose(done) { //大弹出框确定关闭按钮
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