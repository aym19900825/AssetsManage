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
			<div class="mask_content"><!-- status-icon验证后小对号 -->
				<el-form status-icon :model="CUSTOMER" :label-position="labelPosition" :rules="rules" ref="CUSTOMER" label-width="100px" class="demo-adduserForm">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基本信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="3" class="pull-right">
										<el-input v-model="CUSTOMER.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
										<!-- <el-select v-model="CUSTOMER.STATUS" placeholder="请选择信息状态">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select> -->
									</el-col>
									
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="组织机构代码" prop="CODE">
											<el-input v-model="CUSTOMER.CODE"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="单位名称" prop="NAME">
											<el-input v-model="CUSTOMER.NAME"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="类型" prop="TYPE">
											<el-select style="width: 100%;" v-model="CUSTOMER.TYPE" placeholder="类型">
										      	<el-option label="委托" value="委托">	
										      	</el-option>
										      	<el-option label="分包" value="分包">
										      	</el-option>
										      	<el-option label="两者皆是" value="两者皆是">	
										      	</el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="联系人" prop="PERSON">
											<el-input v-model="CUSTOMER.PERSON"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="联系电话" prop="PHONE">
											<el-input v-model="CUSTOMER.PHONE"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="邮箱" prop="EMAIL">
											<el-input v-model="CUSTOMER.EMAIL"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
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
										<el-form-item label="传真" prop="FAX">
											<el-input v-model="CUSTOMER.FAX"></el-input>
										</el-form-item>
									</el-col>

								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="备注" prop="MEMO">
											<el-input v-model="CUSTOMER.MEMO" type="textarea"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="录入人" prop="ENTERBY">
											<el-input v-model="CUSTOMER.ENTERBY" placeholder="当前录入人" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE">
											<el-input v-model="CUSTOMER.ENTERDATE" placeholder="当前录入时间" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改人" prop="CHANGEBY" v-if="modify">
											<el-input v-model="CUSTOMER.CHANGEBY" placeholder="记录当前修改人" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改时间" prop="CHANGEDATE" v-if="modify">
											<el-input v-model="CUSTOMER.CHANGEDATE" placeholder="自动记录当前修改时间" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								
							</el-collapse-item>
							<!-- 资质信息 Begin-->
							<el-collapse-item title="资质信息" name="2">								
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>

								<!-- <el-table :data="CUSTOMER.CUSTOMER_QUALIFICATIONList" row-key="id" highlight-current-row style="width: 100%" @cell-click="iconOperation">
									<el-table-column prop="iconOperation" label="" width="50px">
										<template slot-scope="scope">
											<i class="el-icon-check" v-if="scope.row.isEditing"></i>
											<i class="el-icon-edit" v-else></i>
										</template>
									</el-table-column> 
									<el-table-column prop="iconOperation" label="" width="50px">
										<template slot-scope="scope">
											<i class="el-icon-delete" @click.native.prevent="delfield(scope.$index, CUSTOMER.CUSTOMER_QUALIFICATIONList)" style="color: red;text-align:center"></i>
										</template>
									</el-table-column>
        							<el-table-column prop="STEP" label="序号" width="150px">
        									<template slot-scope="scope">
        											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STEP" placeholder="請輸入內容">
        											</el-input>
        											<span v-else>{{scope.row.STEP}}</span>
        									</template>
        							</el-table-column>
        							<el-table-column prop="CERTIFICATE_NUM" label="证书编号" width="150px">
        									<template slot-scope="scope">
        											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CERTIFICATE_NUM" placeholder="請輸入內容">
        											</el-input>
        											<span v-else>{{scope.row.CERTIFICATE_NUM}}</span>
        									</template>
        							</el-table-column>
        							<el-table-column prop="CERTIFICATE_NAME" label="证书名称" width="150px">
        									<template slot-scope="scope">
        											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CERTIFICATE_NAME" placeholder="請輸入內容">
        											</el-input>
        											<span v-else>{{scope.row.CERTIFICATE_NAME}}</span>
        									</template>
        							</el-table-column>
        							<el-table-column prop="ACTIVE_DATE" label="资质有效期" width="150px">
        									<template slot-scope="scope">
        											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ACTIVE_DATE" placeholder="請輸入內容">
        											</el-input>
        											<span v-else>{{scope.row.ACTIVE_DATE}}</span>
        									</template>
        							</el-table-column>
        							<el-table-column prop="STATUS" label="信息状态" width="150px">
        									<template slot-scope="scope">
        											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="請輸入內容">
        											</el-input>
        											<span v-else>{{scope.row.STATUS}}</span>
        									</template>
        							</el-table-column>
        							<el-table-column prop="MEMO" label="备注" width="150px">
        									<template slot-scope="scope">
        											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MEMO" placeholder="請輸入內容">
        											</el-input>
        											<span v-else>{{scope.row.MEMO}}</span>
        									</template>
        							</el-table-column>
								</el-table> -->

								<el-form :model="CUSTOMER.CUSTOMER_QUALIFICATIONList">
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
					                            <el-form-item label="信息状态" ></el-form-item>
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
					                    <el-row :gutter="10" v-for="(item,key) in CUSTOMER.CUSTOMER_QUALIFICATIONList" :key="key">
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
					                            <el-input type="text"  placeholder="信息状态" v-model="item.STATUS"></el-input>
					                        </el-col> 
					                        <el-col :span="3">
					                            <el-input type="text"  placeholder="备注" v-model="item.MEMO"></el-input>
					                        </el-col>
					                        <el-col :span="3" >
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
					                        <el-col :span="2">
					                            <i class="el-icon-delete" @click="delfield(item)" style="color: red;text-align:center"></i>
					                        </el-col>
					                    </el-row>
					                </el-form-item>
				            	</el-form>							
							</el-collapse-item>
							<!-- 资质信息 End -->
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-form-item>
							<el-button @click='close'>取消</el-button>
							<el-button type="primary" class="btn-primarys" @click="submitForm('CUSTOMER')">提交</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'customer_masks',
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
            var validatePerson = (rule, value, callback) => {
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
            var validateZipcode = (rule, value, callback) => {
                if (value === '') {
		            callback(new Error('邮政编码不能为空'));
		        } else {
			        var reg= /^[1-9][0-9]{5}$/;
			        if(!reg.test(value)){
			            callback(new Error('请输入有效的邮政编码'));
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

				selUser:[],
				modify:false,
				statusshow1:true,
				statusshow2:false,
				edit: true, //禁填
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				addtitle:true,//添加弹出框titile
				modifytitle:false,//修改弹出框titile
				activeNames: ['1','2'],//手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				selectData:[],
				fileList: [],
				CUSTOMER:{
					ID:'',
					CODE:'',
					NAME:'',
					CONTACT_ADDRESS:'',
					PHONE:'',
					PERSON:'',
					TYPE:'',
					ZIPCODE:'',
					STATUS:'活动',
					FAX:'',
					EMAIL:'',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:'',
					MEMO:'',
					CUSTOMER_QUALIFICATIONList:[{
						STEP:'',
						CERTIFICATE_NUM:'',
						CERTIFICATE_NAME:'',
						ACTIVE_DATE:'',
						STATUS:'',
						MEMO:''
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
					PERSON:[{
						required: true,
						trigger: 'blur',
						validator: validatePerson,
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
					ZIPCODE:[{
						required: true,
						trigger: 'blur',
						validator: validateZipcode,
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
			};
		},
		methods: {
			iconOperation(row, column, cell, event){
		        if(column.property ==="iconOperation"){
		          row.isEditing = !row.isEditing
		        }
		    },
            //手风琴开关效果调用
			handleChange(val) {
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//新建行
			addfield(){
				var obj = {
                    STEP:'',
					CERTIFICATE_NUM:'',
					CERTIFICATE_NAME:'',
					ACTIVE_DATE:'',
					STATUS:'',
					MEMO:''
                };
                this.CUSTOMER.CUSTOMER_QUALIFICATIONList.push(obj);
			},
			//删除行
			delfield(item) {
			    var index = this.CUSTOMER.CUSTOMER_QUALIFICATIONList.indexOf(item);
                if (index !== -1) {
                    this.CUSTOMER.CUSTOMER_QUALIFICATIONList.splice(index, 1);
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
			resetNew(){
				this.CUSTOMER = {
					ID:'',
					CODE:'',
					NAME:'',
					CONTACT_ADDRESS:'',
					PHONE:'',
					PERSON:'',
					TYPE:'',
					ZIPCODE:'',
					STATUS:'活动',
					FAX:'',
					EMAIL:'',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:'',
					MEMO:'',
					CUSTOMER_QUALIFICATIONList:[{
						STEP:'',
						CERTIFICATE_NUM:'',
						CERTIFICATE_NAME:'',
						ACTIVE_DATE:'',
						STATUS:'',
						MEMO:''
					}]
				}
			},
			//点击添加，修改按钮显示弹窗
			visible() {
				this.addtitle = true;
				this.modifytitle = false;
				this.statusshow1 = true;
				this.statusshow2 = false;
				this.modify = false;
				var date = new Date();
				this.CUSTOMER.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
	    			this.CUSTOMER.ENTERBY = res.data.nickname;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				this.addtitle = false;
				this.modifytitle = true;
				this.statusshow1 = false;
				this.statusshow2 = true;
				this.modify = true;
				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
	    			this.CUSTOMER.CHANGEBY = res.data.nickname;
	    			var date = new Date();
					this.CUSTOMER.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd hh:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.$axios.get('/api/api-apps/app/customer/' + dataid, {}).then((res) => {
					this.CUSTOMER = res.data;
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
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
			//点击关闭
			close() {
				this.show = false;
				this.resetNew();
			},
			//弹出框放大缩小变换
			toggle(e) {
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			//放大按钮
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
			submitForm(CUSTOMER) {
				console.log(this.CUSTOMER);
				// this.$refs[CUSTOMER].validate((valid) => {
		          // if (valid) {
					var url = '/api/apps-center/app/customer/saveOrUpdate';		
					this.$axios.post(url, this.CUSTOMER).then((res) => {
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
			          // } else {
			          //   return false;
			          // }
			        // });
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