<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加客户</div>
				<div class="mask_title" v-show="modifytitle">修改客户</div>
				<div class="mask_title" v-show="viewtitle">查看客户</div>
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
				<el-form inline-message ref="CUSTOMER" :model="CUSTOMER" :rules="rules" class="demo-adduserForm" :label-position="labelPosition">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="基本信息" name="1">
								<el-row :gutter="20" class="pb10" style='display:none;'>
									<el-col :span="5" class="pull-right">
										<!-- <el-input v-model="CUSTOMER.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input> -->
										<!-- <el-select v-model="CUSTOMER.STATUS" placeholder="请选择状态">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select> -->
									</el-col>
								</el-row>
                              <!-- <el-form label-width="100px"> -->
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="组织机构代码" prop="CODE">
											<el-input v-model="CUSTOMER.CODE" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="单位名称" prop="NAME" >
											<el-input v-model="CUSTOMER.NAME" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="类型" prop="TYPE">
											<el-select v-model="CUSTOMER.TYPE" placeholder="请选择" style="width: 100%" :disabled="noedit">
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
										<el-form-item label="邮箱" prop="EMAIL">
											<el-input v-model="CUSTOMER.EMAIL" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="联系地址" prop="CONTACT_ADDRESS">
											<el-input v-model="CUSTOMER.CONTACT_ADDRESS" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="邮政编码" prop="ZIPCODE">
											<el-input v-model="CUSTOMER.ZIPCODE" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="传真" prop="FAX">
											<el-input v-model="CUSTOMER.FAX" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="备注" prop="MEMO">
											<el-input v-model="CUSTOMER.MEMO" type="textarea" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							<!-- </el-form> -->
							</el-collapse-item>
							<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
								<el-tabs v-model="activeName" @tab-click="handleClick">
									<el-tab-pane label="资质信息" name="first">
										<div class="table-func table-funcb">
									<el-button type="success" size="mini" round @click="addfield">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<!-- <el-form :label-position="labelPosition" :rules="rules"> -->
									<el-table :header-cell-style="rowClass" :fit="true" :data="CUSTOMER.CUSTOMER_QUALIFICATIONList" row-key="ID" border stripe max-height="260" highlight-current-row style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'CUSTOMER.CUSTOMER_QUALIFICATIONList', order: 'descending'}">
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
									      	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.CERTIFICATE_NUM" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.CERTIFICATE_NUM}}</span>
									      </template>
									    </el-table-column>

										<el-table-column prop="CERTIFICATE_NAME" label="证书名称" sortable>
									      <template slot-scope="scope">
									         <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.CERTIFICATE_NAME" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.CERTIFICATE_NAME}}</span>
									      </template>
									    </el-table-column>

									    <el-table-column prop="ACTIVE_DATE" label="资质有效期" sortable width="160">
									      <template slot-scope="scope">
									      	<el-form-item :prop="'CUSTOMER_QUALIFICATIONList.'+scope.$index + '.ACTIVE_DATE'" >
									         <el-date-picker style="width: 90%" v-show="scope.row.isEditing" v-model="scope.row.ACTIVE_DATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
									        <span v-show="!scope.row.isEditing" >{{scope.row.ACTIVE_DATE}}</span>
									    </el-form-item>
									      </template>
									    </el-table-column>
									    <!-- <el-table-column prop="STATUS" label="信息状态" sortable width="120px">
									      <template slot-scope="scope">
									        <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.STATUS}}</span>
									      </template>
									    </el-table-column> -->
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
								  <!-- </el-form> -->
									</el-tab-pane>
									<el-tab-pane label="客户联系人" name="second">
										<div class="table-func table-funcb">
											<el-button type="success" size="mini" round @click="addrela">
												<i class="icon-add"></i>
												<font>新建行</font>
											</el-button>
										</div>
										<!-- <el-form :label-position="labelPosition" :rules="rules"> -->
											<el-table :header-cell-style="rowClass" :fit="true" :data="CUSTOMER.CUSTOMER_PERSONList" row-key="ID" border stripe max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'CUSTOMER.CUSTOMER_PERSONList', order: 'descending'}">
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
											      	<el-form-item :prop="'CUSTOMER_PERSONList.'+scope.$index + '.STEP'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
												      	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.STEP" disabled></el-input>
												      	<span v-show="!scope.row.isEditing" >{{scope.row.STEP}}</span>
												      </el-form-item>
											      </template>
											    </el-table-column>

											    <el-table-column label="联系人" sortable width="150px" prop="PERSON">
											      <template slot-scope="scope">
											      	<el-form-item :prop="'CUSTOMER_PERSONList.'+scope.$index + '.PERSON'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
												      	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.PERSON" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.PERSON}}</span>
												      </el-form-item>
											      </template>
											    </el-table-column>

												<el-table-column prop="PHONE" label="联系电话" sortable width="150px">
											      <template slot-scope="scope">
											      	<el-form-item :prop="'CUSTOMER_PERSONList.'+scope.$index + '.PHONE'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
												         <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.PHONE" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.PHONE}}</span>
												     </el-form-item>
											      </template>
											    </el-table-column>

											    <el-table-column prop="FAX" label="传真" sortable width="150px">
											       <template slot-scope="scope">
											         <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.FAX" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.FAX}}</span>
											      </template>
											    </el-table-column>
											    <el-table-column prop="EMAIL" label="邮箱" sortable>
											      <template slot-scope="scope">
											      	<el-form-item :prop="'CUSTOMER_PERSONList.'+scope.$index + '.EMAIL'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
												    	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.EMAIL" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.EMAIL}}</span>
												    </el-form-item>
											      </template>
											    </el-table-column>
											    <el-table-column fixed="right" label="操作" width="120">
											      <template slot-scope="scope">
											        <el-button @click = "deleteRow(scope.$index, CUSTOMER.CUSTOMER_PERSONList)" type="text" size="small">
											          移除
											        </el-button>
											      </template>
											    </el-table-column>
											  </el-table>
								  		<!-- </el-form> -->
									</el-tab-pane>
								</el-tabs>
							</div>
							<el-collapse-item title="其它" name="3"  v-show="views">
								<!-- <el-form label-width="100px"> -->
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
								<!-- </el-form> -->
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer" v-show="noviews">
						<el-button type="primary" @click="saveAndUpdate('CUSTOMER')">保存</el-button>
						<el-button type="success" @click="saveAndSubmit('CUSTOMER')" v-show="addtitle">保存并继续</el-button>
						<el-button @click='close'>取消</el-button>
						<!--<el-button type="primary" class="btn-primarys" @click="submitForm('CUSTOMER')">提交</el-button>-->
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import Validators from '../../core/util/validators.js'
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
				basic_url: Config.dev_url,
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
				// col_but1: true,
				// col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				addtitle:true,//添加弹出框titile
				modifytitle:false,//修改弹出框titile
				activeName: 'first', //tabs
				activeNames: ['1','2','3'],//手风琴数量
				labelPosition: 'right', //表单文本左对齐
				dialogVisible: false, //对话框
				selectData:[],
				fileList: [],
				CUSTOMER:{
					CUSTOMER_QUALIFICATIONList:[],
					CUSTOMER_PERSONList:[]
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
				index:0,
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
			//表头居中
			rowClass({ row, rowIndex}) {
			    // console.log(rowIndex) //表头行标号为0
			    return 'text-align:center'
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
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
				this.index = this.index + 1;
				var obj = {
                    STEP:this.index,
                    CERTIFICATE_NUM:'',
					CERTIFICATE_NAME:'',
					ACTIVE_DATE:'',
					STATUS:'',
					MEMO:'',
					isEditing: true
                };
                this.CUSTOMER.CUSTOMER_QUALIFICATIONList.push(obj);
			},
			//新建行
			addrela(){
				this.index = this.index + 1;
				var obj = {
					STEP:this.index,
					ID:'',
                    CODE:'',
                    PERSON:'',
                    PHONE:'',
                    FAX:'',
                    EMAIL:'',
                    STATUS:'',
                    MEMO:'',
                    ENTERBY:'',
                    ENTERDATE:'',
                    CHANGEBY:'',
                    CHANGEDATE:'',
					isEditing: true
                };
                this.CUSTOMER.CUSTOMER_PERSONList.push(obj);
			},
			//删除行
			deleteRow(index, rows) {//Table-操作列中的删除行
				rows.splice(index, 1);
			},
		
			//生成随机数函数
			rand(min,max) {
		        return Math.floor(Math.random()*(max-min))+min;
		    },
		    //清空
            reset(){
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
					CUSTOMER_PERSONList:[]
				};
            },
			//点击添加，修改按钮显示弹窗
			visible() {
				this.reset();
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
				var date = new Date();
				this.CUSTOMER.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
	    			this.CUSTOMER.ENTERBY = res.data.nickname;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				// this.show = true;
			},
			getsys_depttype() {//获取机构类型
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=CUST_TYPE';
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
				this.viewtitle = false;
				this.dept = true;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.hintshow = false;
				this.modify = true;//修订
				this.statusshow1 = false;
				this.statusshow2 = true;
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
	    			this.CUSTOMER.CHANGEBY = res.data.nickname;
	    			var date = new Date();
					this.CUSTOMER.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd hh:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.$axios.get(this.basic_url + '/api-apps/app/customer/' + dataid, {}).then((res) => {
					console.log(res.data);
					this.CUSTOMER = res.data;
					//console.log(this.CUSTOMER.STATUS==1);
					this.CUSTOMER.STATUS=this.CUSTOMER.STATUS=="1"? '活动' : '不活动';
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			//这是查看
			view(dataid) {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.$axios.get(this.basic_url + '/api-apps/app/customer/' + dataid, {}).then((res) => {
					this.CUSTOMER = res.data;
					//console.log(this.CUSTOMER.STATUS==1);
					this.CUSTOMER.STATUS=this.CUSTOMER.STATUS=="1"? '活动' : '不活动';
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.show = true;				
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
			open(){
				this.show = true;
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
			save() {
				this.$refs.CUSTOMER.validate((valid) => {
		          if (valid) {
		          	this.CUSTOMER.STATUS=this.CUSTOMER.STATUS=="活动" ? '1' : '0';
					var url = this.basic_url + '/api-apps/app/customer/saveOrUpdate';
					this.$axios.post(url, this.CUSTOMER).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							//重新加载数据
							this.$emit('request');
							// this.$refs["CUSTOMER"].resetFields();
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
			saveAndUpdate(){
				this.save();
				if(this.falg){
					this.show = false;
				}
				this.$emit('request');
			},
			saveAndSubmit(){
				this.save();
				this.reset();
				this.show = true;
				this.$emit('request');
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