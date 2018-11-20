<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title">工作任务通知书</div>
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
				<el-row :gutter="20" style="margin-right: 5px;">
					<el-col :span="5" class="pull-right">
						<el-input v-model="nitificationsInfo.typename" :disabled="true">
							<template slot="prepend">编号</template>
						</el-input>
					</el-col>
					<el-col :span="5" class="pull-right">
						<el-input v-model="nitificationsInfo.typename" :disabled="true">
							<template slot="prepend">状态</template>
						</el-input>
					</el-col>
				</el-row>
				<el-form :model="nitificationsInfo" :label-position="labelPosition" :rules="rules" ref="nitificationsInfo" label-width="100px" class="demo-user">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="类别" name="1">

								<div class="accordion-body tab-content">
									<el-radio-group v-model="TYPE">
										<el-row :gutter="70">
										<el-col :span="6">
											<el-radio v-model="radio" label="1">监督抽查</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio v-model="radio" label="2">监督抽查复查</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio v-model="radio" label="3">质量抽查</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio v-model="radio" label="4">质量抽查复查</el-radio>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="6">
											<el-radio v-model="radio" label="1">监督抽查</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio v-model="radio" label="2">监督抽查复查</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio v-model="radio" label="3">质量抽查</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio v-model="radio" label="4">质量抽查复查</el-radio>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="6">
											<el-radio label="5">生产许可证</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio label="6">认定检验检测</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio label="7">鉴定试验</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio label="8">委托检验检测</el-radio>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="6">
											<el-radio label="9">专项抽查</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio label="10">专项抽查复查</el-radio>
										</el-col>
										<el-col :span="6">
											<el-radio label="11">其它</el-radio>
										</el-col>
									</el-row>
									</el-radio-group>
								</div>
							</el-collapse-item>
							<el-collapse-item title="基本信息" name="2">
								<div class="accordion-body tab-content">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="计划编号" prop="WP_NUM">
												<el-input v-model="nitificationsInfo.WP_NUM" :disabledd="true">
												<el-button slot="append" icon="el-icon-search"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="任务号" prop="TASKNUM">
												<el-input v-model="nitificationsInfo.TASKNUM"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="承检单位" prop="CJDW">
												<el-input v-model="nitificationsInfo.CJDW"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="项目负责人" prop="P_LEADER">
												<el-input v-model="nitificationsInfo.P_LEADER" :disabledd="true">
													<el-button slot="append" icon="el-icon-search"></el-button>
												</el-input>
												
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="受检产品名称" prop="ITEM_NAME">
												<el-input v-model="nitificationsInfo.ITEM_NAME"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="受检产品型号" prop="ITEM_MODEL">
												<el-input v-model="nitificationsInfo.ITEM_MODEL"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="依据" name="3">
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
								<el-form :model="nitificationsInfo.attributes">
									<el-form-item>
										<el-row :gutter="20">
											<el-col :span="3">
												<el-form-item label="序号"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="检验标准编号"></el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="检验标准内容"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="版本"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="附件"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="操作"></el-form-item>
											</el-col>
										</el-row>
										<el-row :gutter="20" v-for="(item,key) in nitificationsInfo.attributes" :key="key">
											<el-col :span="3">
												<el-input type="text" placeholder="请输入序号" v-model="item.NUMBER"></el-input>
											</el-col>
											<el-col :span="3">
												<el-input type="text" placeholder="请输入检验标准编号" v-model="item.S_NUM"></el-input>
											</el-col>
											<el-col :span="8">
												<el-input type="text" placeholder="请输入检验标准内容" v-model="item.S_DESC"></el-input>
											</el-col>

											<el-col :span="3">
												<el-input type="text" placeholder="请输入版本" v-model="item.VERSION"></el-input>
											</el-col>
											<el-col :span="3">
												<el-input type="text" placeholder="附件" v-model="item.VERSION"></el-input>
											</el-col>
											<el-col :span="2">
												<i class="el-icon-delete" @click="delfield(item)" style="color: red"></i>
											</el-col>
										</el-row>
									</el-form-item>
								</el-form>
								<!-- 字段列表 End -->
							</el-collapse-item>
							<el-collapse-item title="检验检测要求" name="4">
								<div class="accordion-body tab-content">
									<el-row :gutter="70">
										<el-col :span="6">
											<el-form-item label="受检企业" prop="V_NAME">
												<el-input v-model="nitificationsInfo.V_NAME" disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="抽样方案" prop="SOLUTION">
												<el-input v-model="nitificationsInfo.SOLUTION" disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="样品数量" prop="QUALITY">
												<el-input v-model="nitificationsInfo.QUALITY" disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="接收人" prop="ACCEPT_PERSON">
												<el-input v-model="nitificationsInfo.ACCEPT_PERSON" disabled="true">
													<el-button slot="append" icon="el-icon-search"></el-button>
												</el-input>
												
												
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="检验检测项目" name="5">
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
								<el-form :model="nitificationsInfo.attributes">
									<el-form-item>
										<el-row :gutter="20">
											<el-col :span="3">
												<el-form-item label="序号"></el-form-item>
											</el-col>
											<el-col :span="4">
												<el-form-item label="检验检测项目编号"></el-form-item>
											</el-col>
											<el-col :span="6">
												<el-form-item label="检验检测项目内容"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="要求"></el-form-item>
											</el-col>
											<el-col :span="3">
												<el-form-item label="版本"></el-form-item>
											</el-col>
											<el-col :span="2">
												<el-form-item label="附件"></el-form-item>
											</el-col>
											<el-col :span="2">
												<el-form-item label="操作"></el-form-item>
											</el-col>
										</el-row>
										<el-row :gutter="20" v-for="(item,key) in nitificationsInfo.attributes" :key="key">
											<el-col :span="3">
												<el-input type="text" placeholder="请输入序号" v-model="item.NUMBER"></el-input>
											</el-col>
											<el-col :span="4">
												<el-input type="text" placeholder="请输入检验检测项目编号" v-model="item.P_NUM"></el-input>
											</el-col>
											<el-col :span="6">
												<el-input type="text" placeholder="请输入检验检测项目内容" v-model="item.P_NUM"></el-input>
											</el-col>

											<el-col :span="3">
												<el-input type="text" placeholder="请输入版本" v-model="item.VERSION"></el-input>
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
							<el-collapse-item name="6">
								<div class="accordion-body tab-content">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="完成日期" prop="COMPDATE">
												<el-date-picker v-model="nitificationsInfo.COMPDATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="检验检测费用" prop="CHECTCOST">
												<el-input v-model="nitificationsInfo.CHECTCOST"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="下达日期" prop="XD_DATE">
												<el-date-picker v-model="nitificationsInfo.XD_DATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="24">
											<el-form-item label="备注" prop="MEMO">
												<el-input v-model="nitificationsInfo.MEMO"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="其他" name="7">
								<div class="accordion-body tab-content">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="录入人111" prop="ENTERBY">
												<el-input v-model="nitificationsInfo.ENTERBY" disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENERDATE">
												<el-input v-model="nitificationsInfo.ENERDATE" disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入人机构" prop="ORGID">
												<el-input v-model="nitificationsInfo.ORGID" disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBY">
												<el-input v-model="nitificationsInfo.CHANGEBY" disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" prop="CHANGEDATE">
												<el-input v-model="nitificationsInfo.CHANGEDATE" disabled="true"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click="submitForm('nitificationsInfo')">提交</el-button>
					</div>
				</el-form>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'masks',
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
				selUser: [],
				edit: true, //禁填
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1', '2', '3', '4', '5', '6', '7'], //手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				dataList: [{
					name: '',
					description: ''
				}],
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
				nitificationsInfo: { //添加数据库列表信息
					name: '',
					description: '',
					attributes: [{ //字段列表
						columnname: '',
						description: '',
						type: '',
						length: '',
						retain: '',
						typename: ''
					}]
				},
				/*attributes:[{//字段列表
					columnname: '',
					description: '',
					type:'',
					length: '',
					retain: ''
				}],*/
				rules: {
					name: [{
						required: true,
						trigger: 'blur',
						validator: validateName,
					}],
					description: [{
						required: true,
						trigger: 'blur',
						validator: validateDecri,
					}],
					leadname: [{
						required: true,
						trigger: 'blur',
						validator: validateDecri,
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
			};
		},
		methods: {
			resetNew() {
				this.nitificationsInfo = { //数据库列表
						name: '',
						description: '',
						attributes: [{ //字段列表
							columnname: '',
							description: '',
							type: '',
							length: '',
							retain: ''
						}]
					},

					this.$refs["nitificationsInfo"].resetFields();
			},
			handleChange(val) { //手风琴开关效果调用
			},
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
				this.nitificationsInfo.attributes.push(obj);
			},
			delfield(item) {
				var index = this.nitificationsInfo.attributes.indexOf(item);
				if(index !== -1) {
					//this.attributes.splice(index, 1)
					this.nitificationsInfo.attributes.splice(index, 1);
				}
			},

			importdia() {
				this.dialogVisible = true;
			},
			//点击按钮显示弹窗
			visible() {
				console.log(111);
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				var url = '/api/apps-center/objectcfg/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					this.nitificationsInfo = res.data;
					//this.attributes=this.nitificationsInfo.attributes;
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			//点击关闭按钮
			close() {
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
			// 保存users/saveOrUpdate
			submitForm(nitificationsInfo) {
				this.$refs[nitificationsInfo].validate((valid) => {
					//		          if (valid) {
					var url = '/api/apps-center/objectcfg/saveOrUpdate';
					this.$axios.post(url, this.nitificationsInfo).then((res) => {
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
					//			          } else {
					//			            return false;
					//			          }
				});
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