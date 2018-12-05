<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加用户</div>
				<div class="mask_title" v-show="modifytitle">修改用户</div>
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
				<el-form status-icon :model="user" :label-position="labelPosition" :rules="rules" ref="user" label-width="100px" class="demo-user">
					<div class="accordion">
						<el-collapse v-model="activeNames">
							<!--<el-collapse-item title="基础信息" name="1">
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="所属组织" prop="companyName">
											<el-input v-model="user.companyName" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getCompany"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="所属机构" prop="deptName">
											<el-input v-model="user.deptName" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getDept"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="12">
										<el-form-item label="登录名称" prop="username">
											<el-input class = "usernames" v-model="user.username" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="登录口令" prop="password">
											<el-input type="password" v-model="user.password"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>-->
							<el-collapse-item title="用户基本资料" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="5" class="pull-right">
										<el-input v-model="user.enabled" :disabled="edit">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
								</el-row>
								<!-- 第一行 -->
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="登录名称" v-if="modify">
											<el-input v-model="user.username" :disabled="edit"></el-input>
										</el-form-item>
										<el-form-item label="登录名称" prop="username" v-else>
											<el-input  v-model="user.username"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="登录口令" v-if="modify">
											<el-input type="password" v-model="user.password" :disabled="edit"></el-input>
										</el-form-item>
										<el-form-item label="登录口令" prop="password" v-else>
											<el-input type="password" v-model="user.password"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="姓名" prop="nickname">
											<el-input v-model="user.nickname"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="职务" prop="post">
											<el-input v-model="user.post"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="工号" prop="worknumber">
											<el-input v-model="user.worknumber"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="性別" prop="sex">
											<el-radio-group v-model="user.sex">
												<el-radio label="男"></el-radio>
												<el-radio label="女"></el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="身份证号" prop="idnumber">
											<el-input v-model="user.idnumber"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="手机号" prop="phone">
											<el-input v-model="user.phone"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="电子邮箱" prop="email">
											<el-input v-model="user.email"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="用户有效期" prop="user_active_date">
											<el-date-picker v-model="user.user_active_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="是否允许授权" prop="ispermit">
											 <el-radio-group v-model="user.ispermit">
    											<el-radio label="是"></el-radio>
    											<el-radio label="否"></el-radio>
  											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="是否允许登录" prop="islogin">
											<el-radio-group v-model="user.islogin">
    											<el-radio label="是"></el-radio>
    											<el-radio label="否"></el-radio>
  											</el-radio-group>
										</el-form-item>
									</el-col>
									
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="所属机构" prop="deptName">
											<el-input v-model="user.deptName" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getDept"></el-button>
											</el-input>
										</el-form-item>
										<!--<el-form-item label="所属机构" prop="deptName" >
												<el-select v-model="user.deptName" placeholder="请选择">
													<el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
										</el-form-item>-->
									</el-col>
									<el-col :span="8">
										<el-form-item label="学历" prop="education">
										<el-select v-model="user.education" placeholder="硕士" >
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="角色" prop="roleId">
										<el-select v-model="user.roleId" multiple>
											<el-option v-for="item in selectData" :key="item.name" :value="item.id" :label="item.name"></el-option>
										</el-select>
									</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="IP地址" prop="ipaddress">
											<el-input v-model="user.ipaddress"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="MAC地址" prop="macaddress">
											<el-input v-model="user.macaddress"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="备注" prop="tips">
											<el-input type="textarea" v-model="user.tips"></el-input>

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

								<el-table :data="user.qualifications" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'user.qualifications', order: 'descending'}">

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
											<el-date-picker v-if="scope.row.isEditing" size="small" v-model="scope.row.c_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
											<span v-else="v-else">{{scope.row.c_date}}</span>
											</el-form-item>
										</template>
									</el-table-column>
									<el-table-column prop="enterby" label="录入人" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'qualifications.'+scope.$index + '.enterbyName'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.enterbyName" placeholder="请输入要求">
											</el-input>
											<span v-else="v-else">{{scope.row.enterbyName}}</span>
											</el-form-item>
										</template>
									</el-table-column>
									<el-table-column prop="enterdate" label="录入时间" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'qualifications.'+scope.$index + '.enterdate'" >
											<el-date-picker v-if="scope.row.isEditing" size="small" v-model="scope.row.enterdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
											<span v-else="v-else">{{scope.row.enterdate}}</span>
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
											<el-button @click.native.prevent="deleteRow(scope.$index,user.qualifications)" type="text" size="small">
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

								<el-table :data="user.traings" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'user.traings', order: 'descending'}">

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
						
									<el-table-column prop="t_date" label="培训时间" sortable width="240px">
										<template slot-scope="scope">
											<el-form-item :prop="'traings.'+scope.$index + '.t_date'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
											<!--<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.t_date" placeholder="请输入委托方名称">
											</el-input>-->
											<el-date-picker v-if="scope.row.isEditing" size="small" v-model="scope.row.t_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd hh:mm:ss">
											</el-date-picker>
											<span v-else="v-else">{{scope.row.t_date}}</span>
											</el-form-item>
										</template>
									</el-table-column>

									<el-table-column prop="t_description" label="培训内容" sortable >
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
											<el-button @click.native.prevent="deleteRow(scope.$index,user.traings)" type="text" size="small">
												移除
											</el-button>
										</template>
									</el-table-column>
								</el-table>
							</el-collapse-item>
							
							<el-collapse-item title="其他" name="4">
								
								<!-- 第一行 -->
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="录入人" prop="createby">
											<el-input v-model="user.createbyName" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="createTime">
											<el-input v-model="user.createTime" :disabled="edit">
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改人" prop="updateby">
											<el-input v-model="user.updateby" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改时间" prop="updateTime">
											<el-input v-model="user.updateTime" :disabled="edit">
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
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

		<el-dialog title="机构" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" default-expand-all :default-checked-keys="resourceCheckedKey" :props="resourceProps" @node-click="handleNodeClick" @check-change="handleCheckChange">
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
			page: Object,
		},
		//		props: ['user','page'],

		data() {
			var validateIdnumber = (rule, value, callback) => { //验证身份证号
				if(value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
					callback(new Error('身份证号码不符合规范'))
				} else {
					callback()
				}
			};
			var validatePhone = (rule, value, callback) => {
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
			var validateEmail = (rule, value, callback) => {//验证电子邮箱
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
				user: {
					status: '活动',
					roleId: [],
					roles:[],
					traings: [],
					qualifications: [],
				},
				options: [
				{
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
				},
				],

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
				activeNames: ['1', '2'], //手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				addtitle: true, //添加弹出框titile
				modifytitle: false, //修改弹出框titile
				modify:false,
//				default-expand-all:true,
				rules: {
					deptName: [{ required: true, message: '必填', trigger: 'blur' }],//名称
					education:[{required: true, message: '必填', trigger: 'blur'}],
					roleId: [{required: true,trigger: 'blur',message: '必填',}],
					username: [{required: true,trigger: 'blur',message: '必填',}],
					password: [{required: true,trigger: 'blur',message: '必填',}],
					sex:[{required: true,trigger: 'blur',message: '必填'}],
					ispermit_authorization:[{required: true,trigger: 'change',message: '必填'}],//授权
					islogin:[{required: true,trigger: 'change',message: '必填'}],//登陆
					mac_address:[{required: true,trigger: 'blur',message: '必填',}],
					ip_address:[{required: true,trigger: 'blur',message: '必填',}],
					idnumber:[{required: true,trigger: 'blur',validator: validateIdnumber}],
					phone: [{required: true,trigger: 'blur',validator: validatePhone}],
					email: [{required: true,trigger: 'blur',validator: validateEmail,}],
				},
				//tree树菜单
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "children",
					label: "fullname"
				},
				selectData: [], //
				getCheckboxData: {},
			};
		},
		methods: {
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					
					row.isEditing = !row.isEditing;
					
				}
			},
			addfield1() {
				this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
				    var currentUser, currentDate;
					this.currentUser=res.data.nickname;
					this.enterby=res.data.id
					var date=new Date();
					this.currentDate = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
					var obj = {
					step: '',
					c_num: '',
					c_name: '',
					c_date: '',
					status:'',
					enterdate:this.currentDate,
					enterbyName:this.currentUser,
					enterby:this.enterby,
					//少附件
					isEditing: true
				};
				this.user.qualifications.push(obj);
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				
			},
			addfield2() {
				var obj = {
					step: '',
					t_date: '',
					t_description: '',
					status: '',
					isEditing: true
				};
				this.user.traings.push(obj);
			},
			//刪除新建行
			deleteRow(index,rows) {//Table-操作列中的删除行
				rows.splice(index,1);

			},
			
			//
			handleCheckChange(data, checked, indeterminate) {
				this.getCheckboxData = data;
			},
			//
			handleNodeClick(data) { //获取勾选树菜单节点
//				console.log(data);
			},


			//点击按钮显示弹窗
			visible() {
				this.user={
				companyName: '',
					deptName: '',
					username: '',
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
					tips: '',
					enabled: '活动',
					traings: [],
					qualifications: [],
				}
				this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
					
					this.user.createby=res.data.id;
					this.user.createbyName=res.data.nickname;
					this.user.enterby=res.data.id
					this.user.enterbyName=res.data.nickname;
					var date=new Date();
					this.user.createTime = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
//				this.statusshow1 = true;
//				this.statusshow2 = false;
				this.addtitle = true;
				this.modifytitle = false;
				this.modify=false;
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				
//				$('.usernames .el-input__inner').attr('disabled',true);
				var usersUrl = '/api/api-user/users/currentMap';
				this.$axios.get(usersUrl, {}).then((res) => {
					this.user.changeby = res.data.nickname;
					var date = new Date();
					this.user.changedate = this.$moment(date).format("yyyy-MM-dd hh:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				var url = '/api/api-user/users/' + dataid;
				this.$axios.get(url, {}).then((res) => {
//					console.log(res.data);
					this.user = res.data;
					this.user.sex=this.user.sex?'男':'女';
					this.user.enabled =this.user.enabled? '活动' : '不活动';
					this.user.ispermit=this.user.ispermit=='1'? '是' : '否';
					this.user.islogin=this.user.islogin=='1'? '是' : '否';
					this.user.roleId = [];
					var roles = this.user.roles;
					for(var i = 0; i < roles.length; i++) {
						this.user.roleId.push(roles[i].id);
					}
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

//			保存users/saveOrUpdate
			submitForm() {
				var _this = this;
				this.$refs.user.validate((valid) => {
					if(valid) {
						this.user.enabled=this.user.enabled=='活动' ? 'true' : 'false';
						this.user.ispermit=this.user.ispermit=='是'? '1' : '2';
						this.user.islogin=this.user.islogin=='是'? '1' : '2';
						var user = this.user;
						user.sex = user.sexName == '男' ? 1 : 0;
						var roleId="";
						if(typeof(user.roleId)!='undefind' && user.roleId.length > 0) {
							var arr = [];
							user.roleId.forEach(function(item) {
								var roles = _this.selectData;
								for(var j = 0; j < roles.length; j++) {
									if(roles[j].id == item) {
										arr.push(roles[j]);
										roleId = roleId + roles[j].id+",";
									}
								}
								
							});
							user.roleId = roleId;
							user.roles = arr;
						} else {
							user.roleId = '';
							user.roles = [];
						}
					  
						var url = '/api/api-user/users/saveOrUpdate';
						this.$axios.post(url, this.user).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success',
								});
								this.show = false;
						
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
				})
			},
			//所属组织
			getCompany() {
				this.editSearch = 'company';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = '1';
				var url = '/api/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data;
					
					console.log(res.data)
					this.dialogVisible = true;
				});

			},

			//所属机构
			getDept() {
				this.editSearch = 'dept';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
//				var type = "2";
				var url = '/api/api-user/depts/treeMap';
//				var url = '/api/api-user/depts/treeByType';
				this.$axios.get(url, {
//					params: {
//						type: type
//					},
				}).then((res) => {
					this.resourceData = res.data;
					this.dialogVisible = true;
				});
			},
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
				}).catch(error => {
					console.log('请求失败');
				})
			},

			dailogconfirm() { //小弹出框确认按钮事件
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.user.companyId = this.getCheckboxData.id;
					this.user.companyName = this.getCheckboxData.fullname;
				} else {
					this.user.deptId = this.getCheckboxData.id;
					this.user.deptName = this.getCheckboxData.fullname;
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