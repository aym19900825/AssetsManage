<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加用户</div>
				<div class="mask_title" v-show="modifytitle">修改用户</div>
				<div class="mask_anniu">
					<!--<span class="mask_span">
						<i class="icon-minimize"></i>
					</span>-->
					<!--icon-maximization,icon-restore-->
					<span class="mask_span mask_max" @click='toggle'>
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
					</span>
					<span class="mask_span" @click='close'>
						<i class="icon-close1"></i>
					</span>
				</div>
			</div>
			<div class="mask_content">
				<el-form status-icon :model="dataInfo" :label-position="labelPosition" :rules="rules" ref="dataInfo" label-width="100px" status-icon inline-message class="demo-dataInfo">
					<div class="accordion">
						<el-collapse v-model="activeNames" @change="handleChange">
						
							<el-collapse-item title="用户基本资料" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="3" class="pull-right">
										<el-input v-model="dataInfo.status" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
									

								</el-row>
								<!-- 第一行 -->
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="姓名" prop="nickname">
											<el-input v-model="dataInfo.nickname"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="职务" prop="post">
											<el-input v-model="dataInfo.post"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="登录名称" prop="username">
											<el-input class = "usernames" v-model="dataInfo.username" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="登录口令" prop="password">
											<el-input type="password" v-model="dataInfo.password"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="身份证号" prop="idnumber">
											<el-input v-model="dataInfo.idnumber"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="工号" prop="worknumber">
											<el-input v-model="dataInfo.worknumber"></el-input>
										</el-form-item>
									</el-col>
									
									
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="IP地址" prop="ip_address">
											<el-input v-model="dataInfo.ip_address"></el-input>
										</el-form-item>
									</el-col>
									
									<el-col :span="8">
										<el-form-item label="手机号" prop="phone">
											<el-input v-model="dataInfo.phone"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="MAC地址" prop="mac_address">
											<el-input v-model="dataInfo.mac_address"></el-input>
										</el-form-item>
									</el-col>
									

								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="电子邮箱" prop="email">
											<el-input v-model="dataInfo.email"></el-input>
										</el-form-item>
									</el-col>
									
									<el-col :span="8">
										<el-form-item label="用户有效期" prop="dataInfo_active_date">
											<el-date-picker v-model="dataInfo.dataInfo_active_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										
										<el-form-item label="是否允许授权" prop="ispermit_authorization">
											 <el-radio-group v-model="dataInfo.ispermit_authorization">
    											<el-radio label="是"></el-radio>
    											<el-radio label="否"></el-radio>
  											</el-radio-group>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									
									<el-col :span="8">
										<el-form-item label="性別" prop="sex">
											<el-radio-group v-model="dataInfo.sexName">
												<el-radio label="男"></el-radio>
												<el-radio label="女"></el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="是否允许登录" prop="islogin">
											<el-radio-group v-model="dataInfo.islogin">
    											<el-radio label="是"></el-radio>
    											<el-radio label="否"></el-radio>
  											</el-radio-group>
										</el-form-item>
									</el-col>
									
								</el-row>

								<el-row :gutter="30">
									
									<el-col :span="8">
										<el-form-item label="所属机构" prop="deptName">
												<el-select v-model="dataInfo.deptName" placeholder="请选择">
													<el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="学历" prop="education">
										<el-select v-model="dataInfo.education" placeholder="硕士" >
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="角色" prop="roleId">
											<el-select v-model="dataInfo.roleId" multiple>
												<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.name"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="备注" prop="tips">
											<el-input type="textarea" v-model="dataInfo.tips"></el-input>

										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						
						<el-collapse-item title="资质信息" name="2">
								<!-- 资质信息 Begin-->
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield1">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>

								<el-table :data="dataInfo.qualifications" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.qualifications', order: 'descending'}">

									<el-table-column prop="iconOperation" fixed label="" width="50px">
										<template slot-scope="scope">
											<i class="el-icon-check" v-if="scope.row.isEditing"></i>
											<i class="el-icon-edit" v-else="v-else"></i>
										</template>
									</el-table-column>
						            
						            <el-table-column prop="step" label="序号" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'qualifications.'+scope.$index + '.step'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.step" placeholder="请输入要求">		
											</el-input>
											<span v-else="v-else">{{scope.row.step}}</span>
											</el-form-item>
										</template>
									</el-table-column>
						            
									<el-table-column prop="c_num" label="证书编号" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'qualifications.'+scope.$index + '.c_num'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.c_num" placeholder="请输入委托方名称">
											</el-input>
											<span v-else="v-else">{{scope.row.c_num}}</span>
											</el-form-item>
										</template>
									</el-table-column>

									<el-table-column prop="P_DESC" label="证书名称" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'qualifications.'+scope.$index + '.c_name'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.c_name" placeholder="请输入委托方名称">
											</el-input>
											<span v-else="v-else">{{scope.row.c_name}}</span>
											</el-form-item>
										</template>
									</el-table-column>

									<el-table-column prop="c_date" label="资质有效期" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'qualifications.'+scope.$index + '.c_date'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.c_date" placeholder="请输入要求">		
											</el-input>
											<span v-else="v-else">{{scope.row.c_date}}</span>
											</el-form-item>
										</template>
									</el-table-column>

									<el-table-column prop="status" label="信息状态" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'qualifications.'+scope.$index + '.status'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.status" placeholder="请输入要求">
											</el-input>
											<span v-else="v-else">{{scope.row.status}}</span>
										</el-form-item>
										</template>
									</el-table-column>

									<!--<el-table-column prop="VERSION" label="上传附件" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'user_qualifications.'+scope.$index + '.VERSION'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入分包方名称">
											</el-input>
											<span v-else="v-else">{{scope.row.VERSION}}</span>
											</el-form-item>
										</template>
									</el-table-column>-->
									<el-table-column fixed="right" label="操作" width="120">
										<template slot-scope="scope">
											<el-button @click.native.prevent="deleteRow(scope.$index,dataInfo.qualifications)" type="text" size="small">
												移除
											</el-button>
										</template>
									</el-table-column>

								</el-table>
							</el-collapse-item>
							<el-collapse-item title="培训" name="3">
								<!-- 资质信息 Begin-->
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield2">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>

								<el-table :data="dataInfo.traings" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.traings', order: 'descending'}">

									<el-table-column prop="iconOperation" fixed label="" width="50px">
										<template slot-scope="scope">
											<i class="el-icon-check" v-if="scope.row.isEditing"></i>
											<i class="el-icon-edit" v-else="v-else"></i>
										</template>
									</el-table-column>
						
									<el-table-column prop="step" label="序号" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'traings.'+scope.$index + '.step'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.step" placeholder="请输入要求">		
											</el-input>
											<span v-else="v-else">{{scope.row.step}}</span>
											</el-form-item>
										</template>
									</el-table-column>
						
									<el-table-column prop="t_date" label="培训时间" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'traings.'+scope.$index + '.t_date'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<!--<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.t_date" placeholder="请输入委托方名称">
											</el-input>-->
											<el-date-picker v-if="scope.row.isEditing" size="small" v-model="scope.row.t_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
											<span v-else="v-else">{{scope.row.t_date}}</span>
											</el-form-item>
										</template>
									</el-table-column>

									<el-table-column prop="t_description" label="培训内容" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'traings.'+scope.$index + '.t_description'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.t_description" placeholder="请输入委托方名称">
											</el-input>
											<span v-else="v-else">{{scope.row.t_description}}</span>
											</el-form-item>
										</template>
									</el-table-column>

									

									<el-table-column prop="status" label="信息状态" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'traings.'+scope.$index + '.status'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.status" placeholder="请输入要求">
											</el-input>
											<span v-else="v-else">{{scope.row.status}}</span>
										</el-form-item>
										</template>
									</el-table-column>

									
									<el-table-column fixed="right" label="操作" width="120">
										<template slot-scope="scope">
											<el-button @click.native.prevent="deleteRow(scope.$index,dataInfo.traings)" type="text" size="small">
												移除
											</el-button>
										</template>
									</el-table-column>

								</el-table>
							</el-collapse-item>
							</el-collapse>
					</div>

					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click='submitForm()'>提交</el-button>
					</div>
				</el-form>
			</div>
			<!--底部-->
		</div>


		<!--弹出-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @node-click="handleNodeClick" @check-change="handleCheckChange">
			</el-tree>

			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="dailogconfirm();" >确 定</el-button>
		    </span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'masks',
		props: {
//			dataInfo: {
//				type: Object,
//				default: function() {
//				return {
//				
//						companyId: '',
//						deptId: '',
//						password: '',
//						sex: '',
//						email: '',
//						phone: '',
//						enabled: 1,
//						birthday: '',
//						worknumber: '',
//						nickname: '',
//						idnumber: '',
//						entrytime: '',
//						address: '',
//						tips: '',
//						dataInfoname: '',
//						companyName: '',
//						education: '',
//						roleId: [],
//						roles: [], //角色
//						id: '',
//					}
//				}
//			},
			page: Object,
		},
		//		props: ['dataInfo','page'],

		data() {
			var validatePass6 = (rule, value, callback) => { //验证身份证号
				if(value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
					callback(new Error('身份证号码不符合规范'))
				} else {
					callback()
				}
			};
			var validatePass7 = (rule, value, callback) => {
				if(value === '') {
					return callback(new Error('手机号不能为空'));
				} else {
					if(value !== '') {
						var reg = /^1[3456789]\d{9}$/;
						if(!reg.test(value)) {
							callback(new Error('请输入有效的手机号码'));
						}
						callback();
					}
				}
			};
			        
		 var validatePass8 = (rule, value, callback) => {//验证电子邮箱
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
			return {
				dataInfo: {
					status: '活动',
					traings: [],
					qualifications: [],
				},
				options: [{
					value: '高中',
					label: '高中'
				},
				{
					value: '高中以下',
					label: '高中以下'
				},
				{
					value:'中专/技校',
					label:'中专/技校',
				},
				{
					value: '大专',
					label: '大专'
				},
				{
					value: '本科',
					label: '本科'
				},
				{
					value: '硕士',
					label: '硕士'
				},
				{
					value: '博士',
					label: '博士'
				},
				{
					value: 'MBA/EMBA',
					label: 'MBA/EMBA'
				}],
				value: '',
				option1: [{
					value: '金化站',
					label: '金化站'
				}, {
					value: '运包站',
					label: '运包站'
				}, {
					value: '接触网站',
					label: '接触网站'
				}],
				value: '',
				editSearch: '',
				edit: true, //禁填
				'男': true,
				'女': false,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				dataInfoitem: [],
				activeNames: ['1','2','3'], //手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				addtitle: true, //添加弹出框titile
				modifytitle: false, //修改弹出框titile
				modify: false,
				rules: {
					deptName: [{ required: true, message: '必填', trigger: 'blur' }],//名称
					deptName: [{ required: true, message: '必填', trigger: 'blur' }],//名称
					education:[{required: true, message: '必填', trigger: 'change'}],
					roleId: [{required: true,trigger: 'blur',message: '必填',}],
					username: [{required: true,trigger: 'blur',message: '必填',}],
					password: [{required: true,trigger: 'blur',message: '必填',}],
					idnumber: [{required: true,trigger: 'blur',message: '必填',}],
					phone: [{required: true,trigger: 'blur',validator: validatePass7}],
					email: [{required: true,trigger: 'blur',validator: validatePass8,}],
					sex:[{required: true,trigger: 'change',message: '必填'}],
					ispermit_authorization:[{required: true,trigger: 'change',message: '必填'}],//授权
					islogin:[{required: true,trigger: 'change',message: '必填'}],//登陆
					mac_address:[{required: true,trigger: 'blur',message: '必填',}],
					ip_address:[{required: true,trigger: 'blur',message: '必填',}]
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				selectData: [], //
				getCheckboxData: {},
				//				aaaData:[]
			};
		},
		methods: {
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					console.log(row.isEditing);
					row.isEditing = !row.isEditing;
					console.log(row.isEditing);
				}
			},
			//新建行
			addfield1() {
				var obj = {
					step: '',
					c_num: '',
					c_name: '',
					c_date: '',
					status:'',
					//少附件
					isEditing: true
				};
				this.dataInfo.qualifications.push(obj);
			},
			addfield2() {
				var obj = {
					step: '',
					t_date: '',
					t_description: '',
					status: '',
					isEditing: true
				};
				this.dataInfo.traings.push(obj);
			},
			//刪除新建行
			deleteRow(index,rows) {//Table-操作列中的删除行
				rows.splice(index,1);

			},
			handleChange(val) { //手风琴开关效果调用
			},
			//
			handleCheckChange(data, checked, indeterminate) {
				//console.log(data, checked, indeterminate);
				this.getCheckboxData = data;
			},
			//
			handleNodeClick(data) { //获取勾选树菜单节点
				console.log(data);
			},

			//form表单内容清空
			resetNew() {
				this.dataInfo = {
					companyName: '',
					deptName: '',
					dataInfoname: '',
					password: '',
					nickname: '',
					birthday: '',
					sexName: '',
					idnumber: '',
					entrytime: '',
					roleId: [],
					roles: [],
					worknumber: '',
					phone: '',
					email: '',
					address: '',
					tips: ''
				}
				this.$refs["dataInfo"].resetFields();
			},
			//点击按钮显示弹窗
			visible() {
				this.show = true;
			},
			// 这里是修改
//			detail() {
//				$('.usernames .el-input__inner').attr('disabled',true);
//				this.show = true;
//				
//			},
			detail(dataid) {
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				$('.usernames .el-input__inner').attr('disabled',true);
				var usersUrl = '/api/api-user/users/currentMap'
				this.$axios.get(usersUrl, {}).then((res) => {
					this.dataInfo.CHANGEBY = res.data.nickname;
					var date = new Date();
					this.dataInfo.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd hh:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				var url = '/api/api-user/users/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.dataInfo = res.data;
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
			toggle(e) { //大弹出框大小切换
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			maxDialog(e) { //定义大弹出框一个默认大小
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);
				$(".mask_div").css("margin", "0%");
				$(".mask_div").css("top", "60px");
			},

			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("margin", "7% 10%");
				$(".mask_div").css("top", "0");
			},
			getCheckedNodes() { //获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},

			//保存dataInfos/saveOrUpdate
			submitForm() {
				var _this = this;
				this.$refs.dataInfo.validate((valid) => {
					if(valid) {
						var dataInfo = this.dataInfo;
					dataInfo.sex = dataInfo.sexName == '男' ? 1 : 0;
							//console.log(111)
							//console.log(dataInfo.roleId);
						if(dataInfo.roleId.length > 0) {
							var arr = [];
							dataInfo.roleId.forEach(function(item) {
								var roles = _this.selectData;
								for(var j = 0; j < roles.length; j++) {
									if(roles[j].id == item) {
										arr.push(roles[j]);
									}
								}
								console.log(arr);
							});
							dataInfo.roleId = dataInfo.roleId.join(',');
							dataInfo.roles = arr;
						} else {
							dataInfo.roleId = '';
							dataInfo.roles = [];
						}
						console.log(this.dataInfo);
						var url = '/api/api-user/users/saveOrUpdate';
						this.$axios.post(url, this.dataInfo).then((res) => {

							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success',
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
						this.$message({
								message: '有必填项，请重新填写',
								type: 'error'
							});
					}
				})
			},
			//所属组织
//			getCompany() {
//				this.editSearch = 'company';
//				var page = this.page.currentPage;
//				var limit = this.page.pageSize;
//				var type = 1;
//				var url = '/api/api-dataInfo/depts/treeByType';
//				this.$axios.get(url, {
//					params: {
//						type: type
//					},
//				}).then((res) => {
//					this.resourceData = res.data;
//					this.dialogVisible = true;
//				});
//
//			},

			//所属机构
//			getDept() {
//				this.editSearch = 'dept';
//				var page = this.page.currentPage;
//				var limit = this.page.pageSize;
//				var type = 2;
//				var url = '/api/api-dataInfo/depts/treeByType';
//				this.$axios.get(url, {
//					params: {
//						type: type
//					},
//				}).then((res) => {
//					this.resourceData = res.data;
//					this.dialogVisible = true;
//				});
//			},
			//角色
			getRole() {
				this.editSearch = 'role';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var url = '/api/api-user/roles';
				this.$axios.get(url, {
					params: {
						page: page,
						limit: limit,
					},
				}).then((res) => {
					this.selectData = res.data.data;
					//console.log(this.selectData);
				}).catch(error => {
					console.log('请求失败');
				})
			},
			dailogconfirm() { //小弹出框确认按钮事件
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.dataInfo.companyId = this.getCheckboxData.id;
					this.dataInfo.companyName = this.getCheckboxData.simplename;
				} else {
					this.dataInfo.deptId = this.getCheckboxData.id;
					this.dataInfo.deptName = this.getCheckboxData.simplename;
				}
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
			this.getRole();
		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>