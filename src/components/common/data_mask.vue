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
			<el-form :model="dataInfo" :label-position="labelPosition" :rules="rules" ref="dataInfo" label-width="100px" class="demo-user">
				<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基本信息" name="1">
								<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="表名" prop="objectName">
												<el-input v-model="dataInfo.objectName"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="描述" prop="description">
												<el-input v-model="dataInfo.description"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="字段列表" name="2">
								<!-- 字段列表 Begin-->
								<div class="table-func">
									<el-button type="primary" size="mini" round  @click="importdia">
										<i class="icon-upload-cloud"></i>
										<font>导入</font>
									</el-button>
									<el-button type="success" size="mini" round @click="addfield">
										<i class="icon-add"></i>
										<font>新建</font>
									</el-button>
								</div>
								<el-form :model="fieldList" :rules="rules" ref="fieldList">
				                <el-form-item>
				                	<el-row :gutter="20">
				                		<el-col :span="4">
				                            <el-form-item label="字段名" prop="leadname"></el-form-item>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-form-item label="字段描述" prop="leaddecri"></el-form-item>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-form-item label="字段类型" prop="leadtype"></el-form-item>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-form-item label="小数点位数"></el-form-item>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-form-item label="长度" prop="leadlength"></el-form-item>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-form-item label="操作"></el-form-item>
				                        </el-col>
				                	</el-row>
				                    <el-row :gutter="20" v-for="(item,index) in fieldList">
				                        <el-col :span="4">
				                            <el-input type="text"  placeholder="请输入人物" v-model="item.leadname"></el-input>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-input type="text"  placeholder="请输入关系" v-model="item.leaddecri"></el-input>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-select v-model="item.leadtype" placeholder="选择字段类型">
										      <el-option label="字符串(string)" value="string"></el-option>
										      <el-option label="浮点类型(float)" value="float"></el-option>
										      <el-option label="整数(int)" value="int"></el-option>
										      <el-option label="长整型(long)" value="long"></el-option>
										      <el-option label="双精度(double)" value="double"></el-option>
										      <el-option label="日期(date)" value="date"></el-option>
										      <el-option label="时间(time)" value="time"></el-option>
										    </el-select>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-input type="text"  placeholder="请输入关系" v-model="item.leadprecision"></el-input>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-input type="text"  placeholder="请输入关系" v-model="item.leadlength"></el-input>
				                        </el-col>
				                        <el-col :span="4">
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
		<!-- 弹出 -->
		<el-dialog title="添加数据库表" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
			<div class="accordion" id="information">
				<div class="mask_tab-block">
					<div class="mask_tab-head clearfix">
						<div class="accordion_title">
							<span class="accordion-toggle">导入标准字段</span>
						</div>
						<div class="col_but" @click="col_but('col_but1')">
							<i class="icon-arrow1-down" v-show="down"></i><i class="icon-arrow1-up" v-show="up"></i>
						</div>
					</div>
					<div class="accordion-body tab-content" v-show="col_but1" id="tab-content2">
					<!-- 第二层弹出的表格 -->
						<el-table :data="leaddata" style="width: 100%;margin: 0 auto;" :default-sort="{prop:'leaddata', order: 'descending'}" @selection-change="SelChange">
							<el-table-column type="selection" width="55" >
							</el-table-column>
							<el-table-column label="字段名称" sortable width="150" prop="leadname">
							</el-table-column>
							<el-table-column label="字段描述" sortable width="200" prop="leaddecri">
							</el-table-column>
							<el-table-column label="字段类型" sortable width="150" prop="leadtype">
							</el-table-column>
							<el-table-column label="小数点位数" sortable width="180" prop="leadprecision">
							</el-table-column>
							<el-table-column label="字段长度" sortable width="100" prop="leadlength">
							</el-table-column>
						</el-table>
						<!-- 表格 -->
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="leadadddata">确 定</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'masks',
		data() {
			var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写表名'));
                }else {
                    callback();
                }
            };
            var validateDecri = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写描述'));
                }else {
                    callback();
                }
            };
			return {
				selUser:[],
				edit: true, //禁填
				'男': true,
				'女': false,
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				useritem: [],
				activeNames: ['1','2'],//手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				dataList:[{
					objectName:'',
					description:''
				}],
				leaddata:[//导入数据的表格
				{
					leadname:'author',
					leaddecri:'作者姓名',
					leadtype:'字符串(string)',
					leadprecision:'',
					leadlength:'6'
				},
				{
					leadname:'author',
					leaddecri:'作者姓名',
					leadtype:'字符串(string)',
					leadprecision:'',
					leadlength:'6'
				},
				{
					leadname:'author',
					leaddecri:'作者姓名',
					leadtype:'字符串(string)',
					leadprecision:'',
					leadlength:'6'
				},
				{
					leadname:'author',
					leaddecri:'作者姓名',
					leadtype:'字符串(string)',
					leadprecision:'',
					leadlength:'6'
				}],
				dataInfo: {//添加数据库列表信息
					objectName:'',
					description:'',
					fieldList:[]
				},
				fieldList:[{//字段列表
					leadname: '',
					leaddecri: '',
					leadtype:'',
					leadprecision: '',
					leadlength: ''
				}],
				rules: {
					objectName: [{
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
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
			};
		},
		methods: {
			resetNew(){
                this.dataInfo = {//数据库列表
					objectName:'',
					description:'',
					fieldList:[]
				},
                this.fieldList = [{//字段列表
					leadname: '',
					leaddecri: '',
					leadtype:'',
					leadprecision: '',
					leadlength: ''
				}],
                this.$refs["dataInfo"].resetFields();
            },
			handleChange(val) {//手风琴开关效果调用
				console.log(val);
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
					this.fieldList.push(selData[0]);
					this.dialogVisible = false;
				}
			},
			addfield(){
				var obj = {
                    leadname: '',
					leaddecri: '',
					leadtype:'',
					leadprecision: '',
					leadlength: ''
                };
                this.fieldList.push(obj);
			},
			delfield(item){
                // this.fieldList.splice(index,1);
                var index = this.fieldList.indexOf(item);
                if (index !== -1) {
                    this.fieldList.splice(index, 1)
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
			importdia(){
				this.dialogVisible = true;
			},
			//点击按钮显示弹窗
			visible() {
				this.show = true;
			},
			// 这里是修改
			detail(userid) {
				var url = '/api/apps-center/objectcfg/' + userid;
				this.$axios.get(url, {}).then((res) => {
					this.user = res.data;
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
		          if (valid) {
					this.dataInfo.fieldList.push(this.fieldList);
					console.log(this.dataInfo);
					this.show = false;
		          }else {
		            return false;
		          }
		        });
			},
			// 所属组织
			getCompany() {
				this.editSearch = 'company';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = 1;
				console.log(this.page.currentPage);
				console.log(this.page.pageSize);
				var url = '/api/api-user/depts/type';
				this.$axios.get(url, {
					params: {
						page: page,
						limit: limit,
						type: type
					},
				}).then((res) => {
					console.log(res.data.data);
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});

			},
			// 所属部门
			getDept() {
				this.editSearch = 'dept';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = 2;
				var url = '/api/api-user/depts/type';
				this.$axios.get(url, {
					params: {
						page: page,
						limit: limit,
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});
			},
			// 角色
			getRole() {
				this.editSearch = 'role';
				var data = {
					params: {
						page: 1,
						limit: 10,
					}
				}
				let that = this;
				var url = '/api/api-user/roles';

				this.$axios.get(url, {
					
				}).then((res) => {
					console.log(res);
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});
			},
			queding() {
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.user.companyId = this.checkedNodes[0].id;
					this.user.companyName = this.checkedNodes[0].simplename;
				} else {
					this.user.deptId = this.checkedNodes[0].id;
					this.user.deptName = this.checkedNodes[0].simplename;
				}
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