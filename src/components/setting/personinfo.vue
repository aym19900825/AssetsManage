<template>
<div>
	<div class="headerbg">
  		<vheader></vheader>
		<navs_tabs></navs_tabs>
	</div>
    <div class="contentbg" v-loading="loading">
    	<!--左侧菜单内容显示 Begin-->
		<div class="navbar-default navbar-static-side">
			<div id="sidebar-collapse">
				<div class="navbarbg">
					<span class="navbar-minimalize minimalize-styl-2" @click="min2max()">
						<i class="icon-menu1"></i> 
					</span>
				</div>
				<ul class="navs" id="side-menu" v-show="!isShow" >
					<li v-for="(item,index) in leftNavs" :key="index">
						<router-link :to="item.navherf">
							<i :class="item.navicon"></i>
							<span class="nav-label" v-show="ismin">{{item.navtitle}}</span>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<!--左侧菜单内容显示 End-->
		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content">
			<div class="ibox-content" :style="{height: fullHeight}">
				<el-form ref="personinfo" inline-message :model="personinfo" :rules="rules" :label-position="labelPosition">
					<el-collapse v-model="activeNames">
						<el-collapse-item title="账号设置" name="1">
							<!-- 第一、二行 -->
							<el-row :gutter="30">
								<el-col :span="8">
						 			<el-form-item label="用户名" label-width="100px">
						 				<el-input v-model="personinfo.username" :disabled="true"></el-input>
						 			</el-form-item>

						 			<el-form-item label="姓名" prop="nickname" label-width="100px">
						 				<el-input v-if="personinfo.username == 'admin'" v-model="personinfo.nickname" :disabled="true"></el-input>
										<el-input v-else v-model="personinfo.nickname" :disabled="false"></el-input>
									</el-form-item>

									<el-form-item label="工号" prop="worknumber" label-width="100px">
								    	<el-input v-model="personinfo.worknumber"></el-input>
									</el-form-item>

									<el-form-item label="身份证号" prop="idnumber" label-width="100px">
										<el-input v-model="personinfo.idnumber"></el-input>
									</el-form-item>
								</el-col>

								<el-col :span="8">
									<el-form-item label="密码" label-width="100px">
												<el-input type="password" v-model="personinfo.password" disabled>
													<el-button slot="append" icon="icon-edit" @click="editpassword"></el-button>
												</el-input>
									</el-form-item>

									<el-form-item label="职务" prop="post" label-width="100px">
										<el-input v-model="personinfo.post"></el-input>
									</el-form-item>

						 			<el-form-item label="性别" label-width="100px">
						 			 	<el-radio-group v-model="personinfo.sex">
							 				<el-radio :label="1">男</el-radio>
							 				<el-radio :label="0">女</el-radio>
							 			</el-radio-group>
						 			</el-form-item>

						 			<!-- <el-form-item label="出生日期" label-width="100px">
										<el-date-picker v-model="personinfo.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%">
									    </el-date-picker>
					                </el-form-item> -->

								</el-col>
								<el-col :span="8">
									<form method="post" id="file2" action="" enctype="multipart/form-data" style="width: 100%; position: relative; height: 160px;">
										<el-button type="warn" round class="a-upload" style="width: 100%; position: relative;">
											<img v-if="headImgUrl" :src="headImgUrl" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
											<input id="excelFile" type="file" name="uploadFile" @change="upload"/>
										</el-button>
									</form>
								</el-col>
							</el-row>
							<!-- 第二行 -->
							<el-row :gutter="30">
						 		<el-col :span="8">
						 			<el-form-item label="手机号" prop="phone" label-width="100px">
										<el-input v-model="personinfo.phone"></el-input>
									</el-form-item>	
						 		</el-col>
						 		<el-col :span="8">
						 			<el-form-item label="联系电话" prop="telephone" label-width="100px">
										<el-input v-model="personinfo.telephone"></el-input>
									</el-form-item>	
						 		</el-col>
						 		<el-col :span="8">
						 			<el-form-item label="电子邮箱" prop="email" label-width="100px">
										<el-input v-model="personinfo.email"></el-input>
									</el-form-item>
						 		</el-col>
					 		</el-row>
							<!-- 第三行 -->
						 	<el-row :gutter="30">
								<el-col :span="8">
									<el-form-item label="用户有效期" prop="user_active_date" label-width="100px">
										<el-date-picker v-model="personinfo.user_active_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" :disabled="true" style="width: 100%;">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="允许授权" prop="ispermit" label-width="100px">
										<el-radio-group v-model="personinfo.ispermit" :disabled="true">
											<el-radio label="1">是</el-radio>
											<el-radio label="2">否</el-radio>
										</el-radio-group>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="允许登录" prop="islogin" label-width="100px">
										<el-radio-group v-model="personinfo.islogin" :disabled="true">
											<el-radio label="1">是</el-radio>
											<el-radio label="2">否</el-radio>
										</el-radio-group>
									</el-form-item>
									<!-- <el-form-item label="入职日期" label-width="100px">
										<el-date-picker v-model="personinfo.workdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%">
										</el-date-picker>
									</el-form-item> -->
								</el-col>
							</el-row>
						 	<!-- 第四行 -->
						 	<el-row :gutter="30">
								<el-col :span="8">
									<el-form-item label="所属机构" prop="deptName" label-width="100px">
										<el-input v-model="personinfo.deptName" :disabled="true">
											<el-button slot="append" icon="icon-search" @click="getDept" :disabled="true"></el-button>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
					 				<el-form-item label="角色" prop="roleId" label-width="100px">
					 					<el-select v-model="personinfo.roleId" multiple placeholder="请选择" :disabled="true" style="width: 100%" value-key="item.id">
											<el-option v-for="(item,index) in selectData" :key="index" :value="item.id" :label="item.name"></el-option>
										</el-select>
									</el-form-item>
						 		</el-col>
						 		<el-col :span="8">
						 			 <el-form-item label="最高学历" label-width="100px">
						 				<el-input v-model="personinfo.education" :disabled="true"></el-input>
						 			</el-form-item>	
						 		</el-col>
						 	</el-row>
						 	<!-- 第五行 -->
						 	<!-- <el-row :gutter="30">
						 		<el-col :span="16">
						 			 <el-form-item label="地址" prop="address" label-width="100px">
								    <el-input v-model="personinfo.address"></el-input>
								  </el-form-item>	
						 		</el-col>
						 		<el-col :span="8">
						 			<el-form-item label="邮编" prop="zipcode" label-width="100px">
									    <el-input v-model="personinfo.zipcode"></el-input>
									  </el-form-item>
						 		</el-col>
						 	</el-row> -->
						 	<!-- 第六行 -->
						 	<el-row :gutter="30">
								<el-col :span="8">
									<el-form-item label="MAC地址" prop="macaddress" label-width="100px">
										<el-input v-model="personinfo.macaddress" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="ERP机构" prop="erp_orgname" label-width="100px">
										<el-input v-model="personinfo.erp_orgname" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<!-- 第七行 -->
						 	<el-row :gutter="30">
						 		<el-col :span="24">
						 			<el-form-item label="备注" prop="tips" label-width="100px">
								    	<el-input type="textarea" rows="3" v-model="personinfo.tips"></el-input>
									</el-form-item>	
						 		</el-col>
						 	</el-row>
						</el-collapse-item>

						<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
							<el-tabs v-model="activeName">
								<el-tab-pane label="资质信息" name="first">
									<div class="table-func table-funcb">
										<el-button type="success" size="mini" round @click="addfield1">
											<i class="icon-add"></i>
											<font>新建行</font>
										</el-button>
										<form method="post" id="file" action="" enctype="multipart/form-data" style="float:right; position:relative; margin-left: 10px;">
											<el-button type="primary" size="mini" round class="a-upload">
												<i class="el-icon-upload2"></i>
												<font>上传</font>
												<input id="excelFile1" type="file" name="uploadFile" @change="upload2" />
											</el-button>
										</form>
									</div>
										<el-table ref="table" :header-cell-style="rowClass" :fig="true" :data="personinfo.qualifications" row-key="ID" border stripe max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'personinfo.qualifications', order: 'descending'}">
											<el-table-column prop="iconOperation" fixed width="50px">
												<template slot-scope="scope">
													<i class="el-icon-check" v-if="scope.row.isEditing"></i>
													<i class="el-icon-edit" v-else></i>
												</template>
											</el-table-column>
											<el-table-column prop="step" label="序号" sortable width="120px" type="index">
											</el-table-column>
											<el-table-column prop="c_num" label="证书编号" sortable width="180px">
												<template slot-scope="scope">
													<el-form-item :prop="'qualifications.'+scope.$index + '.c_num'" :rules="[{required:true, message:'不能为空', trigger:'blur'},{ trigger:'blur', validator:Validators.isSpecificKey}]">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.c_num" placeholder="请输入">
														</el-input>
														<span v-else>{{scope.row.c_num}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											<el-table-column prop="c_name" label="证书名称" sortable>
												<template slot-scope="scope">
													<el-form-item :prop="'qualifications.'+scope.$index + '.c_name'" :rules="[{required:true, message:'不能为空', trigger:'blur'},{ trigger:'blur', validator:Validators.isSpecificKey}]">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.c_name" placeholder="请输入">
														</el-input>
														<span v-else>{{scope.row.c_name}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											<el-table-column prop="FILESIZE" label="附件大小" sortable width="120px">
												<template slot-scope="scope">
													<span v-if="!!scope.row.FILESIZE">{{scope.row.FILESIZE+'M'}}</span>
												</template>
											</el-table-column>
											<el-table-column prop="c_date" label="资质有效期" sortable width="200px">
												<template slot-scope="scope">
													<el-form-item :prop="'qualifications.'+scope.$index + '.c_date'" :rules="[{required:true, message:'请选择日期', trigger:'change'}]">
														<el-date-picker v-if="scope.row.isEditing" size="small" v-model="scope.row.c_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
														</el-date-picker>
														<span v-else>{{scope.row.c_date}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											
											<el-table-column fixed="right" label="操作" width="120">
												<template slot-scope="scope">
													<el-button @click="deleteRow(scope.$index,scope.row,'tableList')" type="text" size="small">
														<i class="icon-trash red"></i>
													</el-button>
												</template>
											</el-table-column>
										</el-table>
								</el-tab-pane>
								<el-tab-pane label="培训" name="second">
									<div class="table-func table-funcb">
										<el-button type="success" size="mini" round @click="addfield2">
											<i class="icon-add"></i>
											<font>新建行</font>
										</el-button>
									</div>
										<el-table ref="table" :header-cell-style="rowClass" :fit="true" :data="personinfo.traings" row-key="ID" border stripe max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'personinfo.traings', order: 'descending'}">
											<el-table-column prop="iconOperation" fixed label="" width="50px">
												<template slot-scope="scope">
													<i class="el-icon-check" v-if="scope.row.isEditing"></i>
													<i class="el-icon-edit" v-else></i>
												</template>
											</el-table-column>
											<el-table-column label="序号" sortable width="120px" type="index">
											</el-table-column>
											<el-table-column prop="t_date" label="培训时间" sortable width="240px">
												<template slot-scope="scope">
													<el-form-item :prop="'traings.'+scope.$index + '.t_date'" :rules="[{type:'date', required:true, message:'请选择日期', trigger:'change'}]">
														<el-date-picker v-if="scope.row.isEditing" size="small" v-model="scope.row.t_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd hh:mm:ss">
														</el-date-picker>
														<span v-else>{{scope.row.t_date}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											<el-table-column prop="t_description" label="培训内容" sortable>
												<template slot-scope="scope">
													<el-form-item :prop="'traings.'+scope.$index + '.t_description'" :rules="[{required:true, message:'不能为空', trigger:'blur'},{ trigger:'blur', validator:Validators.isSpecificKey}]">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.t_description" placeholder="请输入">
														</el-input>
														<span v-else>{{scope.row.t_description}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											<el-table-column fixed="right" label="操作" width="120">
												<template slot-scope="scope">
													<el-button @click="deleteRow(scope.$index,scope.row,'traingList')" type="text" size="small">
														<i class="icon-trash red"></i>
													</el-button>
												</template>
											</el-table-column>
										</el-table>
								</el-tab-pane>

								<el-tab-pane label="IP地址管理" name="third">
									<div class="table-func table-funcb">
										<el-button type="success" size="mini" round @click="addfield3">
											<i class="icon-add"></i>
											<font>新建行</font>
										</el-button>
									</div>
										<el-table ref="table" :header-cell-style="rowClass" :fit="true" :data="personinfo.ips" row-key="ID" border stripe max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'personinfo.ips', order: 'descending'}">
											<el-table-column prop="iconOperation" fixed label="" width="50px">
												<template slot-scope="scope">
													<i class="el-icon-check" v-if="scope.row.isEditing"></i>
													<i class="el-icon-edit" v-else></i>
												</template>
											</el-table-column>

											<el-table-column label="序号" sortable width="120px" prop="step">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.$index + 1" disabled></el-input>
													<span v-show="!scope.row.isEditing" >{{scope.row.step}}</span>
												</template>
											</el-table-column>
											<el-table-column prop="ip_begin" label="起始IP地址" sortable>
												<template slot-scope="scope">
													<el-form-item :prop="'ips.'+scope.$index + '.ip_begin'" :rules="[{required:true, message:'不能为空', trigger:'blur'},{ trigger:'blur', validator:Validators.isIpaddress}]">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ip_begin" placeholder="请输入起始IP地址">
														</el-input>
														<span v-else>{{scope.row.ip_begin}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											
											<el-table-column prop="ip_end" label="结束IP地址" sortable>
												<template slot-scope="scope">
													<el-form-item :prop="'ips.'+scope.$index + '.ip_end'" :rules="[{required:true, message:'不能为空', trigger:'blur'},{ trigger:'blur', validator:Validators.isIpaddress}]">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ip_end" placeholder="请输入结束IP地址">
														</el-input>
														<span v-else>{{scope.row.ip_end}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											
											<el-table-column fixed="right" label="操作" width="120">
												<template slot-scope="scope">
													<el-button @click="deleteRow(scope.$index,scope.row,'ipaddressList')" type="text" size="small">
														<i class="icon-trash red"></i>
													</el-button>
												</template>
											</el-table-column>
										</el-table>
								</el-tab-pane>
							</el-tabs>
						</div>
					</el-collapse>
				</el-form>
				<div class="text-center pt20 pb20">
					<el-button type="primary" @click="submitForm('personinfo')">保存</el-button>
					<el-button @click="resetForm('personinfo')">重置</el-button>
				</div>
			</div>
		</div>
	</div>
	<!--右侧内容显示 End-->
  	<!--弹出框内容显示 Begin-->
	<el-dialog :modal-append-to-body="false" title="机构" :visible.sync="dialogVisible" width="30%">
		<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" default-expand-all :default-checked-keys="resourceCheckedKey" :props="resourceProps" @node-click="handleNodeClick" @check-change="handleClicks" check-strictly="true">
		</el-tree>
		<div slot="footer">
			<el-button type="primary" @click="dailogconfirm" >确 定</el-button>
			<el-button @click="dialogVisible = false">取 消</el-button>
		</div>
	</el-dialog>
	<!--弹出框内容显示 End-->
</div>
</template>

<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_tabs from '../common/nav_tabs.vue'
	import { Loading } from 'element-ui'
	export default {
		name: 'personinfo',
		components: {
			vheader,
			navs_tabs,
		},
		data() {
			return {
				loading: false,
				activeName: 'first', //tabs
				docParm:{},
				basic_url: Config.dev_url,
				file_url: Config.file_url,
				editSearch: '',
				'启用': 1,
				'冻结': 0,
				'男': 1,
				'女': 0,
				activeNames: ['1','2'],//手风琴数量
				show:false,
				userList: [],
				selectData: [], //
				isShow: false,
				ismin:true,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				headImgUrl: '',//头像上传
				fileid: 1,
				index:0,
				labelPosition: 'right',
				dialogVisible: false, //对话框
				personinfo:{
					worknumber:'',//工号
					username:'',//用户名
					password:'',//密码
					nickname:'',//人员姓名
					user_active_date: '',//用户有效期
					islogin: '',//是否允许登录
					ispermit: '',//是否允许授权
					deptId: '',//所属组织ID
					deptName: '',//所属组织名称
					companyName: '',//所属组织
					enabled:'',//配置信息状态
					enabledName:'',//配置信息状态名称
					birthday:'',//出生日期
					sex:'',//性别
					idnumber:'',//身份证号
					roleId: [],//角色ID
					roles: [],//角色
					traings: [],
					qualifications: [],
					ips: [],
					entrytime:'',//入职日
					email:'',//邮箱
					phone:'',//手机
					address:'',//地址
					tips:'',//备注
					telephone:'',//联系电话
					zipcode:'',//邮编
					ipaddress:'',//IP地址
					macaddress:'',//MAC地址
					erp_orgname:'',//ERP机构
					education:'',//最高学历
					//logintype: [],//登录方式
					//rex:'',//传真号
					//orders:'',//排序号
					//workdate:'',//参加工作时间
				},
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "fullname"
				},
			rules: {//required: true,必填标题加红*
	    	roleId: [{required: true,trigger: 'blur',message: '必填',}],
		    nickname: [{required: true,trigger: 'blur',validator: this.Validators.isNickname}],
	      worknumber: [
					{required: true,trigger: 'blur',message: '必填'},
					{validator: this.Validators.isWorknumber, trigger: 'blur'},//引用 isWorknumber
				],
		    email: [
					{required: true,trigger: 'blur',message: '必填'},
					{validator:this.Validators.isEmail, trigger: 'blur'},
				],
				telephone: [{required: false,trigger: 'blur',validator: this.Validators.isTelephone}],
				phone:  [
					{required: true,trigger: 'blur',message: '必填'},
					{validator: this.Validators.isPhone, trigger: 'blur'},
				],
				idnumber: [{required: false,trigger: 'blur', validator: this.Validators.isIdnumber}],
				address: [{required: false,trigger: 'blur', validator: this.Validators.isSpecificKey}],
				zipcode: [{required: false,trigger: 'blur', validator: this.Validators.isZipcode}],
				ipaddress: [{required: false,trigger: 'blur', validator: this.Validators.isIpaddress}],
				macaddress: [{required: false,trigger: 'blur', validator: this.Validators.isMacaddress}],
				post: [{required: false,trigger: 'blur', validator: this.Validators.isSpecificKey}],
				tips: [{required: false,trigger: 'blur', validator: this.Validators.isSpecificKey}],
			},
			leftNavs: [//leftNavs左侧菜单数据
					{
							navicon: 'icon-user',
							navtitle: '个人资料',
							navherf: '/personinfo'
					}, {
							navicon: 'icon-edit',
							navtitle: '修改密码',
							navherf: '/passwordedit'
					}
				]
			}
		},
		
		methods: {  
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					row.isEditing = !row.isEditing;
				}
			},
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			addfield1() {
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					var currentUser, currentDate;
					this.currentUser = res.data.nickname;
					this.enterby = res.data.id
					var date = new Date();
					this.currentDate = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
					var obj = {
						step: 1,
						c_num: '',
						c_name: '',
						c_date: '',
						status: '',
						enterdate: this.currentDate,
						enterbyName: this.currentUser,
						enterby: this.enterby,
						//少附件
						isEditing: true
					};
					this.personinfo.qualifications.push(obj);
				}).catch((err) => {
				})

			},
			addfield2() {
				var obj = {
					step: 1,
					t_date: '',
					t_description: '',
					status: '',
					isEditing: true
				};
				this.personinfo.traings.push(obj);
			},

			addfield3() {
				var obj = {
					STEP: 1,
					IP_BEGIN: '',
					IP_END: '',
					isEditing: true
				};
				this.personinfo.ips.push(obj);
			},
			upload(e){
				var formData = new FormData();
				this.loading = true;
				this.$emit('showLoading');
				formData.append('files', document.getElementById('excelFile').files[0]);
				var config = {
					//添加请求头
					headers: { "Content-Type": "multipart/form-data" },
					//添加上传进度监听事件
					onUploadProgress: e => {
						var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
						this.progress = completeProgress;
					}
				};
				var url = this.file_url + '/file/uploadIcon?userid=' + this.docParm.userid 
						+ '&username=' + this.docParm.username
						+ '&deptid=' + this.docParm.deptid
						+ '&deptfullname=' + this.docParm.deptfullname
						+ '&recordid=1&appname=icon&appid=99&pathid=5';
				if(this.headImgUrl!=''){
					url += '&fileid=' + this.fileid;
				}
				this.$axios.post(url, formData, config
				).then((res)=>{
					this.loading = false;
					if(res.data.code == 0){
						this.$message({
							message: res.data.message,
							type: 'error'
						});
					}else{
						this.$message({
							message: '文件已成功上传至服务器',
							type: 'success'
						});
						this.headImgUrl = res.data.icon;
					}
				})
			},
			getData(){//获取当前用户信息
	    		var url = this.basic_url + '/api-user/users/currentMap';
	    		this.$axios.get(url, {}).then((res) => { 
	    			this.personinfo=res.data;
					var roles =res.data.roles;
					this.docParm.userid = res.data.id;
					this.docParm.username = res.data.username;
					this.docParm.deptid = res.data.deptId;
					this.docParm.deptfullname = res.data.deptName;
	    			this.personinfo.roleId = this.personinfo.roleId.split(',');
					var arr = [];
					var roleId = this.personinfo.roleId;
					for(var i=0; i< roleId.length; i++){
						roleId[i] =  parseInt(roleId[i]);
					}
	    			this.getImgUrl();
				}).catch((err) => {
				});
			},
			getImgUrl(){//用户头像
				var url = this.file_url + '/file/icon?appname=icon&userid=' + this.docParm.userid;
				this.$axios.get(url, {}).then((res) => {
					if(res.data.code==1){
						this.headImgUrl = res.data.icon;
						this.fileid = res.data.fileid;
					}else{
						this.headImgUrl = '';
						this.fileid = 0;
					}
				});
			},
	    	handleNodeClick(data) { //获取勾选树菜单节点
				
			},
			handleClicks(data,checked, indeterminate) {//获取机构勾选树菜单节点
				this.getCheckboxData = data;
           		 this.i++;
            		if(this.i%2==0){
                	if(checked){
                    	this.$refs.tree.setCheckedNodes([]);
                    	this.$refs.tree.setCheckedNodes([data]);
                    	//交叉点击节点
               		 }else{
                     this.$refs.tree.setCheckedNodes([]);
                    	//点击已经选中的节点，置空
                	 }
            		}
        	},
			// getCompany() {//所属组织
			// 	this.editSearch = 'company';
			// 	var url = this.basic_url + '/api-user/depts/type';
			// 	this.$axios.get(url, {}).then((res) => {
			// 		this.resourceData = res.data.data;
			// 		this.dialogVisible = true;
			// 	});
			// },
			getDept() {//所属机构
				this.editSearch = 'dept';
				var url = this.basic_url + '/api-user/depts/treeMap';
				this.$axios.get(url, {}).then((res) => {
					// 
					this.resourceData = res.data.data;
					this.dialogVisible = true;
				});
			},

			//角色
			getRole() {
				var url = this.basic_url + '/api-user/roles';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data.data;
				}).catch(error => {
				})
			},
			getCheckedNodes() {//获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},
			dailogconfirm() {//弹出框确定按钮调用数据
				this.getCheckedNodes();
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.personinfo.companyId = this.checkedNodes[0].id;
					this.personinfo.companyName = this.checkedNodes[0].fullname;
				} else {
					this.personinfo.deptId = this.checkedNodes[0].id;
					this.personinfo.deptName = this.checkedNodes[0].fullname;
				}

			},
			handleClose(done) {//确认框关闭
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {
				console.log('取消关闭');
				$('.v-modal').hide();
			});
			},
	    	submitForm(formName) {//修改当前用户信息
		        this.$refs[formName].validate((valid) => {
					if (valid) {
							var url = this.basic_url + '/api-user/users/me';
							var personinfo=this.personinfo;
							var _this=this
							personinfo.sex = personinfo.sex == '男' ? 1 : 0;
						var roleId = "";
						if(typeof(personinfo.roleId) != 'undefind' && personinfo.roleId.length > 0) {
							var arr = [];
							personinfo.roleId.forEach(function(item) {
								var roles = _this.selectData;
								for(var j = 0; j < roles.length; j++) {
									if(roles[j].id == item) {
										arr.push(roles[j]);
										roleId = roleId + roles[j].id + ",";
									}
								}
							});
							personinfo.roleId = roleId;
							personinfo.roles = arr;
						} else {
							personinfo.roleId = '';
							personinfo.roles = [];
						}
							this.$axios.put(url, this.personinfo).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
							} 
						}).catch((err) => {
						});

					} else {
						return false;
					}
		        });
			},

			resetForm(formName) {//重置按钮调用
				this.personinfo = {
					companyId: '',//所属组织ID
					companyName: '',//所属组织
					deptId: '',//所属机构ID
					deptName: '',//所属机构
					nickname:'',//人员姓名
					username:'',//用户名
					enabled:'',//配置信息状态
					enabledName:'',//配置信息状态名称
					birthday:'',//出生日期
					sex:'',//性别
					entrytime:'',//入职日
					email:'',//邮箱
					phone:'',//手机
					address:'',//地址
					tips:'',//备注
					telephone:'',//联系电话
					zipcode:'',//邮编
					ipaddress:'',//IP地址
					macaddress:'',//MAC地址
					roleId: [],
					roles: [],
					traings: [],
					qualifications: [],
					ips: [],
				};
				this.$refs[formName].resetFields();//
			},

			handleAvatarSuccess(res, file) {//上传头像
		        this.headImgUrl = URL.createObjectURL(file.raw);
		    },
		    beforeAvatarUpload(file) {//上传头像图片格式和大小验证
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		    },
		    editpassword(){//点击修改密码按钮跳转到修改密码页面
		      	this.$router.push({path: '/passwordedit'})
		    },
			min2max(){//左侧菜单正常和变小切换
	        	if($(".navbar-static-side").width()=="220"){
			    	$(".wrapper").css("padding-left", "220px");
			    	$(".navs>li").css("margin", "0px 10px");
			    	this.maxDialog();
			    }else if($(".navbar-static-side").width()=="40"){
					$(".wrapper").css("padding-left", "40px");
					$(".navs>li").css("margin", "0");
					this.rebackDialog();
				}
			    this.ismin=!this.ismin;
	   		},
		    maxDialog(e) {//右侧内容跟着左侧菜单正常和变小切换
		    	$(".navbar-static-side").css("width", "40px");
				$(".wrapper").css("padding-left", "40px");
				$(".navs>li").css("margin", "0");
			},
			rebackDialog() {//左侧菜单正常
				$(".navbar-static-side").css("width", "220px");
				$(".wrapper").css("padding-left", "220px");
				$(".navs>li").css("margin", "0px 10px");
			},
			upload2(e){
				var list = this.personinfo.qualifications || [];
				var editList = [];
				for(let i=0; i<list.length; i++){
					if(list[i].isEditing){
						editList.push(i);
					}
				}
				if(editList.length > 1){
					this.$message({
						message: '不可同时编辑多条数据',
						type: 'error'
					});
					return;
				}
				if(editList.length == 0){
					this.$message({
						message: '请选择要上传文件的数据',
						type: 'error'
					});
					return;
				}
				var formData = new FormData();
				var loading;
				loading = Loading.service({
					fullscreen: true,
					text: '拼命上传中...',
					background: 'rgba(F,F, F, 0.8)'
				});
				// this.$emit('showLoading');
				formData.append('files', document.getElementById('excelFile1').files[0]);
				var config = {
					//添加请求头
					headers: { "Content-Type": "multipart/form-data" },
					//添加上传进度监听事件
					onUploadProgress: e => {
						var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
						this.progress = completeProgress;
					}
				};
				var url = this.file_url + '/file/uploadfile?userid=' + this.docParm.userid 
						+ '&username=' + this.docParm.username
						+ '&deptid=' + this.docParm.deptid
						+ '&deptfullname=' + this.docParm.deptfullname
						+ '&recordid=1&appname=客户管理&appid=2';
				this.$axios.post(url, formData, config
				).then((res)=>{
					loading.close();
					if(res.data.code == 0){
						this.$message({
							message: res.data.message,
							type: 'error'
						});
					}else{
						this.$message({
							message: '文件已成功上传至服务器',
							type: 'success'
						});
						var index = editList[0];
						this.personinfo.qualifications[index].FILEID = res.data.fileid;
						this.personinfo.qualifications[index].FILESIZE = res.data.filesize;
						this.personinfo.qualifications[index].FILEPATH = res.data.webUrl;
						this.$set(this.personinfo.qualifications,index,this.personinfo.qualifications[index]);
					}
				})
			},
			deleteRow(index, row, listName){
				var TableName = '';
				if(listName =='tableList'){
					TableName = 'qualifications';
				}else if(listName =='traingList'){
					TableName = 'traings';
				}else{
					TableName = 'ips';
				}
				if(row.id){
					var url = this.basic_url + '/api-user/users/' + TableName +'/' + row.id;
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {}).then((res) => {
							if(res.data.resp_code == 0){
								this.personinfo[TableName].splice(index,1);
								this.$message({
									message: '删除成功',
									type: 'success'
								});
							}else{
								this.$message({
									message: res.data.resp_msg,
									type: 'error'
								});
							}
						}).catch((err) => {
						});
					}).catch(() => {

					});
				}else{
					this.personinfo[TableName].splice(index,1);
				}
			},
		},
		mounted() {
			this.getRole();
			this.getData();
		},
	}
</script>

<style scoped>
@import '../../assets/css/mask-modules.css';

.avatar-uploader {
    border: 1px dashed #d9d9d9;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .avatar {
    width: 140px;
    height: 140px;
    display: block;
    margin:0px auto; 
  }
 .avatar i {font-size: 50px; line-height:130px; color: #c0c4cc;}

 .a-upload input{
	position: absolute;
		font-size: 20px \9;
    font-size: 0px;
    opacity: 0;
    filter: alpha(opacity=0);
    width: 100%;
    cursor: pointer;
		height: 160px;
		left: 0px;
		top: 0px;
 }
 .a-upload img{
	/*position: absolute;*/
	border-radius: 12px;
	height: 140px;
    /*top: 10px;*/
 }
 .a-upload span{
	display: block;
	position: relative;
 }

</style>

