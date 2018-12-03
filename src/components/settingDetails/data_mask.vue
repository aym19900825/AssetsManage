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
									<el-row :gutter="30">
										<el-col :span="8">
											<el-form-item label="表名" prop="name">
												<el-input v-model="dataInfo.name"></el-input>
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
								<!-- :rules="rules" ref="attributes" -->
								<el-form :model="dataInfo.attributes">
				                <el-form-item>
				                	<el-row :gutter="20">
				                		<el-col :span="4">
				                            <el-form-item label="字段名" ></el-form-item>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-form-item label="字段描述" ></el-form-item>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-form-item label="字段类型" ></el-form-item>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-form-item label="长度" ></el-form-item>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-form-item label="小数点位数" ></el-form-item>
				                        </el-col>			                        
				                        <el-col :span="4">
				                            <el-form-item label="操作"></el-form-item>
				                        </el-col>
				                	</el-row>
				                    <el-row :gutter="20" v-for="(item,key) in dataInfo.attributes" :key="key">
				                        <el-col :span="4">
				                            <el-input type="text"  placeholder="请输入字段名" v-model="item.columnname"></el-input>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-input type="text"  placeholder="请输入字段描述" v-model="item.description"></el-input>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-select v-model="item.type" placeholder="选择字段类型">
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
				                            <el-input type="text"  placeholder="请输入长度" v-model="item.length"></el-input>
				                        </el-col>
				                        <el-col :span="4">
				                            <el-input type="text"  placeholder="请输入小数点位数" v-model="item.retain"></el-input>
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
							<el-table-column label="字段名称" sortable width="150" prop="columnname">
							</el-table-column>
							<el-table-column label="字段描述" sortable width="200" prop="description">
							</el-table-column>
							<el-table-column label="字段类型" sortable width="150" prop="type">
							</el-table-column>
							<el-table-column label="字段长度" sortable width="100" prop="length">
							</el-table-column>
							<el-table-column label="小数点位数" sortable width="180" prop="retain">
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
                    callback(new Error('请英文填写表名'));
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
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1','2'],//手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				dataList:[{
					name:'',
					description:''
				}],
				leaddata:[//导入数据的表格
				{
					columnname:'author',
					description:'作者姓名',
					type:'字符串(string)',
					length:'6',
					retain:''
				},
				{
					columnname:'author',
					description:'作者姓名',
					type:'字符串(string)',
					length:'6',
					retain:''
				},
				{
					columnname:'author',
					description:'作者姓名',
					type:'字符串(string)',
					length:'6',
					retain:''
				},
				{
					columnname:'author',
					description:'作者姓名',
					type:'字符串(string)',
					length:'6',
					retain:''
				}],
				dataInfo: {//添加数据库列表信息
					name:'',
					description:'',
					attributes:[{//字段列表
					columnname: '',
					description: '',
					type:'',
					length: '',
					retain: ''
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
			resetNew(){
                this.dataInfo = {//数据库列表
					name:'',
					description:'',
					attributes:[{//字段列表
					columnname: '',
					description: '',
					type:'',
					length: '',
					retain: ''
				}]
				},
                /*this.attributes = [{//字段列表
					columnname: '',
					description: '',
					type:'',
					length: '',
					retain: ''
				}],*/
                this.$refs["dataInfo"].resetFields();
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
					//this.attributes.push(selData[0]);
					this.dataInfo.attributes.push(selData[0]);
					this.dialogVisible = false;
				}
			},
			addfield(){
				var obj = {
                    columnname: '',
					description: '',
					type:'',
					length: '',
					retain: ''
                };
                //this.attributes.push(obj);
                this.dataInfo.attributes.push(obj);
			},
			delfield(item){
                var index = this.dataInfo.attributes.indexOf(item);
                if (index !== -1) {
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
			importdia(){
				this.dialogVisible = true;
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
					var url = '/api/apps-center/objectcfg/saveOrUpdate';
					//this.dataInfo.attributes=this.attributes;
	               /* $.each(this.attributes,function(i,n){
	                    this.dataInfo.attributes.push(n.columnname +" ，"+n.description+" ，"+n.type+" ，"+n.length+" ，"+n.retain+");
	                });*/	

                // var dataInfo = JSON.parse(JSON.stringify(this.dataInfo));				
					this.$axios.post(url, this.dataInfo).then((res) => {
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
			// 所属组织
			getCompany() {
				this.editSearch = 'company';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = 1;
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
			// 所属机构
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