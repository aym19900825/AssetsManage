<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加数据库表</div>
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
				<el-form :model="dataInfo" :label-position="labelPosition" :rules="rules" ref="dataInfo" label-width="100px" class="demo-user">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基本信息" name="1">
								<el-row :gutter="20">
									<el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.typename" :disabled="true">
											<template slot="prepend">主键编号</template>
										</el-input>
									</el-col>
									<el-col :span="5" class="pull-right pt5">
										<el-select v-model="dataInfo.value" placeholder="请选择状态">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-col>
									<el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.typename" :disabled="true">
											<template slot="prepend">版本</template>
										</el-input>
									</el-col>
								</el-row>
								<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="标准编码" prop="name">
												<el-input v-model="dataInfo.name"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="标准名称" prop="description">
												<el-input v-model="dataInfo.description"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="发布时间" prop="description">
												<el-date-picker v-model="dataInfo.description" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
										<el-form-item label="启用时间" prop="description">
											<el-date-picker v-model="dataInfo.description" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="8">
											<el-form-item label="发布单位" prop="name">
												<el-input v-model="dataInfo.name" :disabled="true"></el-input>
											</el-form-item> 
										</el-col>
										<el-col :span="8">
											<el-form-item label="机构" prop="description">
												<el-input v-model="dataInfo.description" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
										<el-form-item label="录入人" prop="description">
											<el-input v-model="dataInfo.description" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
											<el-form-item label="录入时间" prop="name">
												<el-input v-model="dataInfo.name" :disabled="true" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改人" prop="description">
												<el-input v-model="dataInfo.description" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="修改时间" prop="description">
												<el-input v-model="dataInfo.description" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
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
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click="submitForm('dataInfo')">提交</el-button>
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
				activeNames: ['1', '2'], //手风琴数量
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
				dataInfo: { //添加数据库列表信息
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
				this.dataInfo = { //数据库列表
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

					this.$refs["dataInfo"].resetFields();
			},
			handleChange(val) { //手风琴开关效果调用
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},

			addfield() {//添加行信息
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
			col_but(col_but) {
				//alert(col_but)
				if(col_but == 'col_but1') {
					this.col_but1 = !this.col_but1;
					this.down = !this.down,
						this.up = !this.up
				}
				if(col_but == 'col_but2') {
					this.col_but2 = !this.col_but2;
					this.down = !this.down,
						this.up = !this.up
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
					this.dataInfo = res.data;
					//this.attributes=this.dataInfo.attributes;
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
			submitForm(dataInfo) {
				this.$refs[dataInfo].validate((valid) => {
					//		          if (valid) {
					var url = '/api/apps-center/objectcfg/saveOrUpdate';
					this.$axios.post(url, this.dataInfo).then((res) => {
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