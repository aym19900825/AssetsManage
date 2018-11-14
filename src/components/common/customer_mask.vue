<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加客户</div>
				<div class="mask_title" v-show="modifytitle">修改客户</div>
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
				<el-form :model="CUSTOMER" :label-position="labelPosition" :rules="rules" ref="CUSTOMER" label-width="100px" class="demo-adduserForm">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基本信息" name="1">
								<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="组织机构代码" prop="CODE">
												<el-input v-model="CUSTOMER.CODE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="单位名称" prop="NAME">
												<el-input v-model="CUSTOMER.NAME" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="联系电话" prop="PHONE">
												<el-input v-model="CUSTOMER.PHONE"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="联系地址" prop="CONTACT_ADDRESS">
												<el-input v-model="CUSTOMER.CONTACT_ADDRESS"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="邮政编码" prop="ZIPCODE">
												<el-input v-model="CUSTOMER.ZIPCODE"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="状态" prop="STATUS">
												<!-- <el-select  multiple> -->
													<!-- <el-option v-for="data in selectData" :key="data.id" :value="data.id" :label="data.name"></el-option> -->
												<!-- </el-select> -->
												<el-input v-model="CUSTOMER.STATUS"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="传真" prop="FAX">
												<el-input v-model="CUSTOMER.FAX"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="邮箱" prop="EMAIL">
												<el-input v-model="CUSTOMER.EMAIL"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENERBY">
												<el-input v-model="CUSTOMER.ENERBY" placeholder="当前录入人" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="录入日期" prop="ENERDATE">
												<el-input v-model="CUSTOMER.ENERDATE" placeholder="当前录入日期" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBY">
												<el-input v-model="CUSTOMER.CHANGEBY" placeholder="记录当前修改人" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" prop="CHANGEDATE">
												<el-input v-model="CUSTOMER.CHANGEDATE" placeholder="自动记录当前修改时间" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="24">
											<el-form-item label="备注" prop="MEMO">
												<el-input v-model="CUSTOMER.MEMO" type="textarea"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="资质信息" name="2">
								<!-- 资质信息 Begin-->
								<div class="table-func">
									<!-- <el-button type="primary" size="mini" round  @click="importdia">
										<i class="icon-upload-cloud"></i>
										<font>导入</font>
									</el-button> -->
									<el-button type="success" size="mini" round @click="addfield">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<el-form :model="CUSTOMER.CUSTOMER_QUALIFICATION">
					                <el-form-item>
					                	<el-row :gutter="20">
					                		<el-col :span="3">
					                            <el-form-item label="序号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-form-item label="证书编号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-form-item label="证书名称" ></el-form-item>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-form-item label="资质有效期" ></el-form-item>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-form-item label="状态" ></el-form-item>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-form-item label="备注" ></el-form-item>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-form-item label="附件" ></el-form-item>
					                        </el-col>		                        
					                        <el-col :span="3">
					                            <el-form-item label="操作"></el-form-item>
					                        </el-col>
					                	</el-row>
					                    <el-row :gutter="10" v-for="(item,key) in CUSTOMER.CUSTOMER_QUALIFICATION" :key="key">
					                        <el-col :span="3">
					                            <el-input type="text"  placeholder="序号" v-model="item.STEP"></el-input>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-input type="text"  placeholder="证书编号" v-model="item.CERTIFICATE_NUM"></el-input>
					                        </el-col>
					                        <el-col :span="3">
					                        	<el-input type="text"  placeholder="证书名称" v-model="item.CERTIFICATE_NAME"></el-input>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-input type="text"  placeholder="资质有效期" v-model="item.ACTIVE_DATE"></el-input>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-input type="text"  placeholder="状态" v-model="item.STATUS"></el-input>
					                        </el-col> 
					                        <el-col :span="3">
					                            <el-input type="text"  placeholder="备注" v-model="item.MEMO"></el-input>
					                        </el-col>
					                        <el-col :span="3" v-model="item.FUJIAN">
					                            <button type="button" class="btn btn-primarys button-margin text-center">
												    <i class="icon-add"></i>
												</button>
					                        </el-col>                
					                        <el-col :span="2">
					                            <i class="el-icon-delete" @click="delfield(item)" style="color: red;text-align:center"></i>
					                        </el-col>
					                    </el-row>
					                </el-form-item>
				            	</el-form>
							<!-- 资质信息 End -->
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-form-item>
							<el-button @click='close'>取消</el-button>
							<el-button type="primary" class="btn-primarys" @click="submitForm('adddeptForm')">提交</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
		<!-- 弹出 -->
		<!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps">
			</el-tree>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="queding();" >确 定</el-button>
		    </span>
		</el-dialog> -->
	</div>
</template>

<script>
	export default {
		name: 'masks',
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
				dataList:[{
					name:'',
					description:''
				}],
				selectData:[],
				CUSTOMER:{
					CODE:'',
					NAME:'',
					CONTACT_ADDRESS:'',
					PHONE:'',
					ZIPCODE:'',
					STATUS:'',
					FAX:'',
					EMAIL:'',
					ENERBY:'',
					ENERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:'',
					MEMO:'',
					CUSTOMER_QUALIFICATION:[{
						STEP:'',
						CERTIFICATE_NUM:'',
						CERTIFICATE_NAME:'',
						ACTIVE_DATE:'',
						STATUS:'',
						MEMO:'',
						FIJIAN:''
					}]
				},
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
                this.CUSTOMER = {
					CODE:'',
					NAME:'',
					CONTACT_ADDRESS:'',
					PHONE:'',
					ZIPCODE:'',
					STATUS:'',
					FAX:'',
					EMAIL:'',
					ENERBY:'',
					ENERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:'',
					MEMO:'',
					CUSTOMER_QUALIFICATION:[{
						STEP:'',
						CERTIFICATE_NUM:'',
						CERTIFICATE_NAME:'',
						ACTIVE_DATE:'',
						STATUS:'',
						MEMO:'',
						FIJIAN:''
					}]
				},
                this.$refs["CUSTOMER"].resetFields();
            },
			handleChange(val) {//手风琴开关效果调用
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//导入添加数据按钮
			leadadddata(){
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择数据',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
					return;
				} else {
					this.dataInfo.attributes.push(selData[0]);
					this.dialogVisible = false;
				}
			},
			addfield(){
				var obj = {
                    STEP:'',
					CERTIFICATE_NUM:'',
					CERTIFICATE_NAME:'',
					ACTIVE_DATE:'',
					STATUS:'',
					MEMO:''
                };
                this.CUSTOMER.CUSTOMER_QUALIFICATION.push(obj);
			},
			delfield(item){
                var index = this.CUSTOMER.CUSTOMER_QUALIFICATION.indexOf(item);
                if (index !== -1) {
                    //this.attributes.splice(index, 1)
                    this.CUSTOMER.CUSTOMER_QUALIFICATION.splice(index, 1);
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
			//点击按钮显示弹窗
			visible() {
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
			// submitForm(dataInfo) {
			// 	this.$refs[dataInfo].validate((valid) => {
		 //          if (valid) {
			// 		var url = '/api/apps-center/objectcfg/saveOrUpdate';		
			// 		this.$axios.post(url, this.dataInfo).then((res) => {
			// 			//resp_code == 0是后台返回的请求成功的信息
			// 			if(res.data.resp_code == 0) {
			// 				this.$message({
			// 					message: '保存成功',
			// 					type: 'success'
			// 				});
			// 				this.show = false;
			// 				//重新加载数据
			// 				this.$emit('request')
			// 			}
			// 		}).catch((err) => {
			// 			this.$message({
			// 				message: '网络错误，请重试',
			// 				type: 'error'
			// 			});
			// 		});
			//           } else {
			//             return false;
			//           }
			//         });
			// },
			// 所属组织
			// getCompany() {
			// 	this.editSearch = 'company';
			// 	var page = this.page.currentPage;
			// 	var limit = this.page.pageSize;
			// 	var type = 1;
			// 	var url = '/api/api-user/depts/type';
			// 	this.$axios.get(url, {
			// 		params: {
			// 			page: page,
			// 			limit: limit,
			// 			type: type
			// 		},
			// 	}).then((res) => {
			// 		this.resourceData = res.data.data;
			// 		this.dialogVisible = true;
			// 	});

			// },
			// // 所属机构
			// getDept() {
			// 	this.editSearch = 'dept';
			// 	var page = this.page.currentPage;
			// 	var limit = this.page.pageSize;
			// 	var type = 2;
			// 	var url = '/api/api-user/depts/type';
			// 	this.$axios.get(url, {
			// 		params: {
			// 			page: page,
			// 			limit: limit,
			// 			type: type
			// 		},
			// 	}).then((res) => {
			// 		this.resourceData = res.data.data;
			// 		this.dialogVisible = true;
			// 	});
			// },
			// // 角色
			// getRole() {
			// 	this.editSearch = 'role';
			// 	var data = {
			// 		params: {
			// 			page: 1,
			// 			limit: 10,
			// 		}
			// 	}
			// 	let that = this;
			// 	var url = '/api/api-user/roles';

			// 	this.$axios.get(url, {
					
			// 	}).then((res) => {
			// 		this.resourceData = res.data.data;
			// 		this.dialogVisible = true;
			// 	});
			// },
			// queding() {
			// 	this.getCheckedNodes();
			// 	this.placetext = false;
			// 	this.dialogVisible = false;
			// 	if(this.editSearch == 'company') {
			// 		this.user.companyId = this.checkedNodes[0].id;
			// 		this.user.companyName = this.checkedNodes[0].simplename;
			// 	} else {
			// 		this.user.deptId = this.checkedNodes[0].id;
			// 		this.user.deptName = this.checkedNodes[0].simplename;
			// 	}
			// },
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