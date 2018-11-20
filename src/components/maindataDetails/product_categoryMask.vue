<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加产品类别</div>
				<div class="mask_title" v-show="modifytitle">修改产品类别</div>
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
				<el-form :model="CATEGORY" :label-position="labelPosition" :rules="rules" ref="CATEGORY" label-width="100px" class="demo-adduserForm">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="产品类别" name="1">
								<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="产品类别编号" prop="NUM">
												<el-input v-model="CATEGORY.NUM"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="产品类别名称" prop="TYPE">
												<el-input v-model="CATEGORY.TYPE"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="状态" prop="STATUS">
												<el-input v-if="statusshow1" v-model="CATEGORY.STATUS"  :disabled="edit"></el-input>
											    <el-select v-if="statusshow2" style="width: 100%;" v-model="CATEGORY.STATUS" placeholder="请选择状态">
													<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="版本" prop="VERSION">
												<el-input v-model="CATEGORY.VERSION"  :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="16">
											<el-form-item label="录入人机构" prop="DEPARTMENT">
												<el-input v-model="CATEGORY.DEPARTMENT"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="录入人" prop="FAX">
												<el-input v-model="CATEGORY.ENERBY" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENERDATE">
												<el-input v-model="CATEGORY.ENERDATE"  :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBY" v-if="modify">
												<el-input v-model="CATEGORY.CHANGEBY" placeholder="当前修改人" :disabled="edit" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="修改时间" prop="CHANGEDATE" v-if="modify">
												<el-input v-model="CATEGORY.CHANGEDATE" placeholder="当前修改时间" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-form-item>
							<el-button type="primary" class="btn-primarys" @click="submitForm('CATEGORY')">保存</el-button>
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
		name: 'masks',
		props: {
			CATEGORY: {
				type: Object,
				default: function(){
					return {
						ID:'',
						NUM:'',
						TYPE:'',
						STATUS:'活动',
						VERSION:'1',
						DEPARTMENT:'',
						ENERBY:'',
						ENERDATE:'',
						CHANGEBY:'',
						CHANGEDATE:''
					}
				}
			},
			page: Object ,
		},
		data() {
			var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
            var validateAddress = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写联系地址'));
                }else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写联系电话'));
                }else {
                    callback();
                }
            };
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
		            callback(new Error('电子邮箱不能为空'));
		        } else {
			        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			        if(!reg.test(value)){
			            callback(new Error('请输入有效的邮箱'));
			        }else{
			        	callback();
			        }
		        }
            };
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(''));
                }else {
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
				modify:false,//修订、修改人、修改时间
				statusshow1:true,
				statusshow2:false,
				selUser:[],
				edit: true, //禁填
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				addtitle:true,
				modifytitle:false,
				activeNames: ['1','2'],//手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				selectData:[],
				rules: {
					CODE: [{
						required: true,
						trigger: 'blur',
						validator: validateCode,
					}],
					NAME:[{
						required: true,
						trigger: 'blur',
						validator: validateName,
					}],
					CONTACT_ADDRESS:[{
						required: true,
						trigger: 'blur',
						validator: validateAddress,
					}],
					PHONE:[{
						required: true,
						trigger: 'blur',
						validator: validatePhone,
					}],
					EMAIL:[{
						required: true,
						trigger: 'blur',
						validator: validateEmail,
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
			};
		},
		methods: {
			resetNew(){
                this.CATEGORY = {
					NUM:'',
					TYPE:'',
					STATUS:'活动',
					VERSION:'1',
					DEPARTMENT:'',
					ENERBY:'',
					ENERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:''
				};
                // this.$refs["CUSTOMER"].resetFields();
            },
			handleChange(val) {//手风琴开关效果调用
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			col_but(col_but) {
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
			//点击按钮显示弹窗
			visible() {
				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
	    			this.CATEGORY.ENERBY = res.data.nickname;
	    			var date = new Date();
					this.CATEGORY.ENERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.statusshow1 = true;
				this.statusshow2 = false;
				this.modify = false;
				this.show = true;
			},
			// 这里是修改
			detail() {
				this.modify = true;
				this.addtitle = false;
				this.modifytitle = true;
				this.statusshow1 = false;
				this.statusshow2 = true;
				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
	    			this.CATEGORY.CHANGEBY = res.data.nickname;
	    			var date=new Date();
					this.CATEGORY.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.show = true;
			},
			//点击修订按钮
			modifyversion(){
				this.CATEGORY.VERSION = this.CATEGORY.VERSION + 1;
			},
			//点击关闭按钮
			close() {
				this.show = false;
				this.resetNew();
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
			submitForm(CATEGORY) {

				// this.$refs[CATEGORY].validate((valid) => {
		  //         if (valid) {
					var url = '/api/api-apps/app/productType/saveOrUpdate';		
					this.$axios.post(url,this.CATEGORY).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						console.log(this.CATEGORY);
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
			        //   } else {
			        //     return false;
			        //   }
			        // });
			},
			//时间格式化
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				// return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");  
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