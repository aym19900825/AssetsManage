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
				<el-form status-icon inline-message :model="CUSTOMER" :label-position="labelPosition" :rules="rules" ref="CUSTOMER" label-width="100px" class="demo-adduserForm">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="基本信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="5" class="pull-right">
										<el-input v-model="CUSTOMER.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
										<!-- <el-select v-model="CUSTOMER.STATUS" placeholder="请选择状态">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select> -->
									</el-col>
									
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="组织机构代码" prop="CODE">
											<el-input v-model="CUSTOMER.CODE" :disabled="edit" placeholder="自动生成"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="单位名称" prop="NAME">
											<el-input v-model="CUSTOMER.NAME"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="机构类型" prop="TYPE">
											<el-select v-model="CUSTOMER.TYPE" placeholder="请选择" style="width: 100%">
												<el-option v-for="(data,index) in SeleCUST_TYPE" :key="index" :value="data.code" :label="data.name"></el-option>
												</el-option>
											</el-select>
										</el-form-item>
										<!--<el-form-item label="类型" prop="TYPE">
											<el-select style="width: 100%;" v-model="CUSTOMER.TYPE" placeholder="类型">
										      	<el-option label="委托" value="委托">	
										      	</el-option>
										      	<el-option label="分包" value="分包">
										      	</el-option>
										      	<el-option label="两者皆是" value="两者皆是">	
										      	</el-option>
										    </el-select>
										</el-form-item>-->
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
								<el-row :gutter="30" v-show="personinfo">
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
								<el-table :data="CUSTOMER.CUSTOMER_QUALIFICATIONList" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'CUSTOMER.CUSTOMER_QUALIFICATIONList', order: 'descending'}">
								    <el-table-column prop="iconOperation" fixed width="50px">
								      <template slot-scope="scope">
								      	<i class="el-icon-check" v-show="scope.row.isEditing">
								      	</i>
								      	<i class="el-icon-edit" v-show="!scope.row.isEditing">
								      	</i>
								      </template>
								    </el-table-column>

								    <el-table-column label="序号" sortable width="120px" prop="STEP">
								      <template slot-scope="scope">
								      	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.STEP" disabled></el-input><span v-show="!scope.row.isEditing" >{{scope.row.STEP}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column label="证书编号" sortable width="120px" prop="CERTIFICATE_NUM">
								      <template slot-scope="scope">
								      	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.CERTIFICATE_NUM" disabled></el-input><span v-show="!scope.row.isEditing">{{scope.row.CERTIFICATE_NUM}}</span>
								      </template>
								    </el-table-column>

									<el-table-column prop="CERTIFICATE_NAME" label="证书名称" sortable width="120px">
								      <template slot-scope="scope">
								         <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.CERTIFICATE_NAME" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.CERTIFICATE_NAME}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="ACTIVE_DATE" label="资质有效期" sortable width="150px">
								      <template slot-scope="scope">
								      	<el-form-item :prop="'CUSTOMER_QUALIFICATIONList.'+scope.$index + '.ACTIVE_DATE'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
								         <el-date-picker style="width: 90%" v-show="scope.row.isEditing" v-model="scope.row.ACTIVE_DATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
								        <span v-show="!scope.row.isEditing" >{{scope.row.ACTIVE_DATE}}</span>
								    </el-form-item>
								      </template>
								    </el-table-column>
								    <el-table-column prop="STATUS" label="信息状态" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.STATUS}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="MEMO" label="备注" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.MEMO" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.MEMO}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="REASION" label="附件" sortable width="120px">
								      <template slot-scope="scope">
								        <el-upload	class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
													:on-preview="handlePreview"
													:on-remove="handleRemove"
													:before-remove="beforeRemove"
													multiple
													:limit="3"
													:on-exceed="handleExceed"
													:file-list="fileList">
													<el-button size="small" type="primary">点击上传</el-button>
										</el-upload>
								      </template>
								    </el-table-column>

								    <el-table-column fixed="right" label="操作" width="120">
								      <template slot-scope="scope">
								        <el-button @click = "deleteRow(scope.$index, CUSTOMER.CUSTOMER_QUALIFICATIONList)" type="text" size="small">
								          移除
								        </el-button>
								      </template>
								    </el-table-column>
								  </el-table>
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
		        } else {
			        var reg = /^1[34578]\d{9}$/;
			        if(!reg.test(value)){
			            callback(new Error('请输入有效的电话'));
			        }else{
			        	callback();
			        }
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
			        var reg= /^[0-9]{6}$/;
			        if(!reg.test(value)){
			            callback(new Error('请输入有效的邮政编码'));
			        }else{
			        	callback();
			        }
		        }
            };
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写单位名称'));
                }else {
                    callback();
                }
            };
			return {
				personinfo:false,
				loadSign:true,//加载
				commentArr:{},
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				Selectsys_depttype:[],//获取机构类型
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
					CUSTOMER_QUALIFICATIONList:[]
				},
				rules: {
					NAME:[{required: true,trigger: 'blur',validator: validateName}],
					CONTACT_ADDRESS:[{required: true,trigger: 'blur',validator: validateAddress}],
					PERSON:[{required: true,trigger: 'blur',validator: validatePerson}],
					PHONE:[{required: true,trigger: 'blur',validator: validatePhone}],
					EMAIL:[{required: true,trigger: 'blur',validator: validateEmail}],
					ZIPCODE:[{required: true,trigger: 'blur',validator: validateZipcode}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				index:0
			};
		},
		methods: {
			
			iconOperation(row, column, cell, event){
		        if(column.property ==="iconOperation"){
		          row.isEditing = !row.isEditing
		        }
		    },
            
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//生成随机数函数
			rand(min,max) {
		        return Math.floor(Math.random()*(max-min))+min;
		    },
			//新建行
			addfield(){
//				var randnum = this.rand(1000,9999);
				this.index = this.index + 1;
				var obj = {
                    STEP:this.index,
                    CERTIFICATE_NUM:'',
					CERTIFICATE_NAME:'',
					ACTIVE_DATE:'',
					STATUS:'',
					MEMO:'',
					isEditing: true,
                };
                this.CUSTOMER.CUSTOMER_QUALIFICATIONList.push(obj);
			},
			//删除行
			deleteRow(index, rows) {//Table-操作列中的删除行
				rows.splice(index, 1);
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
			
			//生成随机数函数
			rand(min,max) {
		        return Math.floor(Math.random()*(max-min))+min;
		    },
			//点击添加，修改按钮显示弹窗
			visible() {
				this.CUSTOMER={
					ID:'',
					CODE:'',
					NAME:'',
					CONTACT_ADDRESS:'',
					PHONE:'',
					PERSON:'',
					TYPE:'',
					ZIPCODE:'',
					STATUS:'活动',
//					STATUSDesc:'
					FAX:'',
					EMAIL:'',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:'',
					MEMO:'',
					CUSTOMER_QUALIFICATIONList:[],
				},
//				this.CUSTOMER.CODE =  this.rand(1000,9999);
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
			getsys_depttype() {//获取机构类型
				var url = '/api/api-user/dicts/findChildsByCode?code=CUST_TYPE';
				this.$axios.get(url, {}).then((res) => {
					this.SeleCUST_TYPE = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
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
//					console.log(this.CUSTOMER.STATUS==1);
					this.CUSTOMER.STATUS=this.CUSTOMER.STATUS=="1"? '活动' : '不活动';
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
				this.$refs[CUSTOMER].validate((valid) => {
		          if (valid) {
		          	this.CUSTOMER.STATUS=this.CUSTOMER.STATUS=="活动" ? '1' : '0';
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
			
			this.getsys_depttype();//页面打开加载-机构类型
		}
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>