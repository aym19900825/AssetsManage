<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">年度计划</div>
				<div class="mask_title" v-show="modifytitle">年度计划</div>
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
				<el-form status-icon :model="WORKPLAN" :label-position="labelPosition" :rules="rules" ref="WORKPLAN" label-width="100px" class="demo-adduserForm">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基本信息" name="1">
								<el-row :gutter="20">
									<el-col :span="5" class="pull-right">
									<el-input placeholder="草稿" v-model="WORKPLAN.STATUS" :disabled="true">
											<template slot="prepend">状态</template>
									</el-input>
								</el-col>
								
								<el-col :span="5" class="pull-right">
									<el-select v-model="WORKPLAN.TYPE" placeholder="类别">
								    	<el-option label="监督抽查" value="1"></el-option>
								    	<el-option label="质量抽查" value="0"></el-option>
									</el-select>
								</el-col>
								<el-col :span="5" class="pull-right">
									<el-input placeholder="2018-1001" v-model="WORKPLAN.WP_NUM" :disabled="true">
											<template slot="prepend">计划编号</template>
									</el-input>
								</el-col>
							</el-row>
								<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
									<el-row :gutter="70">
										<el-col :span="6">
											<el-form-item label="提出单位" prop="PROP_UNIT">
												<el-select v-model="WORKPLAN.PROP_UNIT" placeholder="请选择">
											    	<el-option label="金化站" value="1"></el-option>
											    	<el-option label="运包站" value="0"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="产品类别" prop="ITEMTYPE">
												<el-input v-model="WORKPLAN.ITEMTYPE" :disabled="edit">
													<el-button slot="append" icon="el-icon-search"></el-button>
												</el-input>

											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="计划描述" prop="DESCRIPTION">
												<el-input v-model="WORKPLAN.DESCRIPTION"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="6">
											<el-form-item label="编制人" prop="COMPACTOR">
												<el-input v-model="WORKPLAN.COMPACTOR"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="审核人" prop="C_PERSON">
												<el-input v-model="WORKPLAN.C_PERSON"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="批准人" prop="APPRPERSON">
												<el-input v-model="WORKPLAN.APPRPERSON"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="提报日期" prop="REPORTDATE">
											<div class="block">
											    <el-date-picker
											      v-model="WORKPLAN.REPORTDATE"
											      type="date"
											      placeholder="选择日期">
											    </el-date-picker>
											  </div>
											 </el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="年度计划列表" name="2">
								<!-- 资质信息 Begin-->
								<div class="table-func">
									<el-button type="primary" size="mini" round>
										<i class="icon-upload-cloud"></i>
										<font>导入</font>
									</el-button>
									<el-button type="success" size="mini" round @click="addfield1">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<el-form :model="WORKPLAN.WORLPLANLINEList">
					                <el-form-item>
					                	<el-row :gutter="20">
					                		<el-col :span="2">
					                            <el-form-item label="序号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-form-item label="产品名称" ></el-form-item>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-form-item label="规格型号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-form-item label="生产企业名称" ></el-form-item>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-form-item label="检测费用" ></el-form-item>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-form-item label="项目提出理由" ></el-form-item>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-form-item label="近三年监督抽查情况" ></el-form-item>
					                        </el-col>		                        
					                        <el-col :span="2">
					                            <el-form-item label="操作"></el-form-item>
					                        </el-col>
					                	</el-row>
					                    <el-row :gutter="10" v-for="(item,key) in WORKPLAN.WORLPLANLINEList" :key="key">
					                        <el-col :span="2">
					                            <el-input type="text"  placeholder="序号" v-model="item.WP_LINENUM"></el-input>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-input type="text"  placeholder="产品名称" v-model="item.ITEM_NAME"></el-input>
					                        </el-col>
					                        <el-col :span="3">
					                        	<el-input type="text"  placeholder="规格型号" v-model="item.MODEL"></el-input>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-input type="text"  placeholder="生产企业名称" v-model="item.V_NAME"></el-input>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-input type="text"  placeholder="检测费用" v-model="item.CHECKCOST"></el-input>
					                        </el-col>
					                        <el-col :span="3">
					                            <el-input type="text"  placeholder="项目提出理由" v-model="item.REASION"></el-input>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-input type="text"  placeholder="近三年监督抽查情况" v-model="item.MEMO"></el-input>
					                        </el-col>                
					                        <el-col :span="2">
					                            <i class="el-icon-delete" @click="delfield1(item)" style="color: red;text-align:center"></i>
					                        </el-col>
					                    </el-row>
					                </el-form-item>
				            	</el-form>
							<!-- 年度计划列表 End -->
							</el-collapse-item>
							<!-- 检测依据begin -->
							<el-collapse-item title="检测依据" name="3">
								<div class="table-func">
									<el-button type="primary" size="mini" round>
										<i class="icon-search"></i>
										<font>选择</font>
									</el-button>
									<el-button type="success" size="mini" round @click="addfield3">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<el-form :model="WORKPLAN.WORLPLANLINE_BASISList">
					                <el-form-item>
					                	<el-row :gutter="20">
					                		<el-col :span="4">
					                            <el-form-item label="序号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="6">
					                            <el-form-item label="标准编号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="6">
					                            <el-form-item label="标准内容" ></el-form-item>
					                        </el-col>
					                        <el-col :span="6">
					                            <el-form-item label="版本" ></el-form-item>
					                        </el-col>             
					                        <el-col :span="2">
					                            <el-form-item label="操作"></el-form-item>
					                        </el-col>
					                	</el-row>
					                    <el-row :gutter="10" v-for="(item,key) in WORKPLAN.WORLPLANLINE_BASISList" :key="key">
					                        <el-col :span="4">
					                            <el-input type="text"  placeholder="序号" v-model="item.NUMBER"></el-input>
					                        </el-col>
					                        <el-col :span="6">
					                            <el-input type="text"  placeholder="标准编号" v-model="item.S_NUM"></el-input>
					                        </el-col>
					                        <el-col :span="6">
					                            <el-input type="text"  placeholder="标准内容" v-model="item.S_NAME"></el-input>
					                        </el-col>
					                        <el-col :span="6">
					                            <el-input type="text"  placeholder="版本" v-model="item.VERSION"></el-input>
					                        </el-col>                
					                        <el-col :span="2">
					                            <i class="el-icon-delete" @click="delfield3(item)" style="color: red;text-align:center"></i>
					                        </el-col>
					                    </el-row>
					                </el-form-item>
				            	</el-form>
							</el-collapse-item>
							<!-- 检测依据end -->
							<!-- 检测项目与要求begin -->
							<el-collapse-item title="检测项目与要求" name="4">
								<!-- 资质信息 Begin-->
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield4">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<el-form :model="WORKPLAN.WORLPLANLINE_PROJECTList">
					                <el-form-item>
					                	<el-row :gutter="20">
					                		<el-col :span="3">
					                            <el-form-item label="序号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-form-item label="检测项目编号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="5">
					                            <el-form-item label="检测项目描述" ></el-form-item>
					                        </el-col>
					                        <el-col :span="5">
					                            <el-form-item label="要求" ></el-form-item>
					                        </el-col>
					                        <el-col :span="5">
					                            <el-form-item label="版本" ></el-form-item>
					                        </el-col>              
					                        <el-col :span="2">
					                            <el-form-item label="操作"></el-form-item>
					                        </el-col>
					                	</el-row>
					                    <el-row :gutter="10" v-for="(item,key) in WORKPLAN.WORLPLANLINE_PROJECTList" :key="key">
					                        <el-col :span="3">
					                            <el-input type="text"  placeholder="序号" v-model="item.NUMBER"></el-input>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-input type="text"  placeholder="检测项目编号" v-model="item.P_NUM"></el-input>
					                        </el-col>
					                        <el-col :span="5">
					                        	<el-input type="text"  placeholder="检测项目描述" v-model="item.P_DESC"></el-input>
					                        </el-col>
					                        <el-col :span="5">
					                            <el-input type="text"  placeholder="要求" v-model="item.REMARKS"></el-input>
					                        </el-col>
					                        <el-col :span="5">
					                            <el-input type="text"  placeholder="版本" v-model="item.VERSION"></el-input>
					                        </el-col>               
					                        <el-col :span="2">
					                            <i class="el-icon-delete" @click="delfield4(item)" style="color: red;text-align:center"></i>
					                        </el-col>
					                    </el-row>
					                </el-form-item>
				            	</el-form>
							</el-collapse-item>
							<!-- 检测项目end -->
							<el-collapse-item title="文档编号列表" name="5">
								<!-- 文档编号列表 Begin-->
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield2">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<el-form :model="WORKPLAN.wendang">
					                <el-form-item>
					                	<el-row :gutter="20">
					                		<el-col :span="2">
					                            <el-form-item label="序号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-form-item label="文档编号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="6">
					                            <el-form-item label="文档描述" ></el-form-item>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-form-item label="创建人" ></el-form-item>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-form-item label="创建日期" ></el-form-item>
					                        </el-col>
					                        <el-col :span="2">
					                            <el-form-item label="上传" ></el-form-item>
					                        </el-col>		                        
					                        <el-col :span="2">
					                            <el-form-item label="操作"></el-form-item>
					                        </el-col>
					                	</el-row>
					                    <el-row :gutter="10" v-for="(item,key) in WORKPLAN.wendang" :key="key">
					                        <el-col :span="2">
					                            <el-input type="text"  placeholder="序号" v-model="item.STEP"></el-input>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-input type="text"  placeholder="文档编号" v-model="item.CERTIFICATE_NUM"></el-input>
					                        </el-col>
					                        <el-col :span="6">
					                        	<el-input type="text"  placeholder="文档描述" v-model="item.CERTIFICATE_NAME"></el-input>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-input type="text"  placeholder="创建人" v-model="item.ACTIVE_DATE"></el-input>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-input type="text"  placeholder="创建日期" v-model="item.STATUS"></el-input>
					                        </el-col>
					                        <el-col :span="2" v-model="item.FUJIAN">
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
							<!-- 文档编号列表 End -->
							</el-collapse-item>
							<el-collapse-item title="录入人信息" name="6">
								<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBY">
												<el-input v-model="WORKPLAN.ENTERBY" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入日期" prop="ENTERDATE">
												<el-input v-model="WORKPLAN.ENTERDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="修改人信息" name="7" v-if="modify">
								<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBY">
												<el-input v-model="WORKPLAN.CHANGEBY" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改日期" prop="CHANGEDATE">
												<el-input v-model="WORKPLAN.CHANGEDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-form-item>
							<el-button @click='close'>取消</el-button>
							<el-button type="primary" class="btn-primarys" @click="submitForm('WORKPLAN')">提交</el-button>
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
				modify:false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				addtitle:true,//添加弹出框titile
				modifytitle:false,//修改弹出框titile
				activeNames: ['1','2','3','4','5','6','7'],//手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				dataList:[{
					name:'',
					description:''
				}],
				selectData:[],
				WORKPLAN:{
					WP_NUM:'',
					TYPE:'',
					STATUS:'',
					PROP_UNIT:'',
					ITEMTYPE:'',
					DESCRIPTION:'',
					COMPACTOR:'',
					C_PERSON:'',
					APPRPERSON:'',
					REPORTDATE:'',
					WORLPLANLINEList:[{
						WP_LINENUM:'',
						ITEM_NAME:'',
						MODEL:'',
						V_NAME:'',
						CHECKCOST:'',
						REASION:'',
						MEMO:''
					}],
					WORLPLANLINE_BASISList:[{
						NUMBER:'',
						S_NUM:'',
						S_NAME:'',
						VERSION:''
					}],
					WORLPLANLINE_PROJECTList:[{
						NUMBER:'',
						P_NUM:'',
						P_DESC:'',
						REMARKS:'',
						VERSION:''
					}],
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:''
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
                this.WORKPLAN = {
					WP_NUM:'',
					TYPE:'',
					STATUS:'',
					PROP_UNIT:'',
					ITEMTYPE:'',
					DESCRIPTION:'',
					COMPACTOR:'',
					C_PERSON:'',
					APPRPERSON:'',
					REPORTDATE:'',
					WORLPLANLINEList:[{
						WP_LINENUM:'',
						ITEM_NAME:'',
						MODEL:'',
						V_NAME:'',
						CHECKCOST:'',
						REASION:'',
						MEMO:''
					}],
					WORLPLANLINE_BASISList:[{
						NUMBER:'',
						S_NUM:'',
						S_NAME:'',
						VERSION:''
					}],
					WORLPLANLINE_PROJECTList:[{
						NUMBER:'',
						P_NUM:'',
						P_DESC:'',
						REMARKS:'',
						VERSION:''
					}],
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:''
				}
                // this.$refs["WORKPLAN"].resetFields();
            },
			handleChange(val) {//手风琴开关效果调用
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//导入添加数据按钮
			leaddata(){
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
			addfield1(){//年度计划列表新建行
				var obj1 = {
                    WP_LINENUM:'',
					ITEM_NAME:'',
					MODEL:'',
					V_NAME:'',
					BASIS:'',
					P_NAME:'',
					CHECKCOST:'',
					REASION:'',
					MEMO:''
                };
                this.WORKPLAN.WORLPLANLINEList.push(obj1);
			},
			addfield2(){//文档编号列表新建行
				var obj2 = {
                    STEP:'',
					CERTIFICATE_NUM:'',
					CERTIFICATE_NAME:'',
					ACTIVE_DATE:'',
					STATUS:'',
					MEMO:''
                };
                // this.WORKPLAN.WORLPLANLINE.push(obj2);
			},
			addfield3(){
				var obj3 = {
                    NUMBER:'',
					S_NUM:'',
					S_NAME:'',
					VERSION:''
                };
                this.WORKPLAN.WORLPLANLINE_BASISList.push(obj3);
			},
			addfield4(){
				var obj4 = {
                    NUMBER:'',
					P_NUM:'',
					P_DESC:'',
					REMARKS:'',
					VERSION:''
                };
                this.WORKPLAN.WORLPLANLINE_PROJECTList.push(obj4);
			},
			delfield1(item){//年度计划列表删除行
                var index = this.WORKPLAN.WORLPLANLINEList.indexOf(item);
                if (index !== -1) {
                    //this.attributes.splice(index, 1)
                    this.WORKPLAN.WORLPLANLINEList.splice(index, 1);
                }
			},
			delfield3(item){//年度计划列表删除行
                var index = this.WORKPLAN.WORLPLANLINE_BASISList.indexOf(item);
                if (index !== -1) {
                    this.WORKPLAN.WORLPLANLINE_BASISList.splice(index, 1);
                }
			},
			delfield4(item){//年度计划列表删除行
				console.log(23333);
                var index = this.WORKPLAN.WORLPLANLINE_PROJECTList.indexOf(item);
                if (index !== -1) {
                    this.WORKPLAN.WORLPLANLINE_PROJECTList.splice(index, 1);
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
			//点击添加，修改按钮显示弹窗
			visible() {
				var date = new Date();
				console.log(date);
				this.WORKPLAN.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
				console.log(this.WORKPLAN.ENTERDATE);
				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
	    			this.WORKPLAN.ENTERBY = res.data.nickname;
	    			
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.modify = false;
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				this.modify = true;

				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
	    			this.WORKPLAN.CHANGEBY = res.data.nickname;
	    			var date = new Date();
					this.WORKPLAN.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});

				this.$axios.get('/api/api-apps/app/workplan/' + dataid, {}).then((res) => {
					this.WORKPLAN = res.data;
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
			submitForm(WORKPLAN) {
				// this.$refs[WORKPLAN].validate((valid) => {
		  //         if (valid) {
					var url = '/api/apps-center/app/workplan/saveOrUpdate';		
					this.$axios.post(url, this.WORKPLAN).then((res) => {
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
			        //   } else {
			        //     return false;
			        //   }
			        // });
			},
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