<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加工作任务通知书</div>
				<div class="mask_title" v-show="modifytitle">修改工作任务通知书</div>
				<div class="mask_title" v-show="viewtitle">查看工作任务通知书</div>
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
				<div class="accordion">
					<el-form :model="dataInfo" :label-position="labelPosition" :rules="rules" ref="dataInfo" label-width="110px" class="demo-form-inline" status-icon>
						<el-collapse v-model="activeNames">
							<el-collapse-item title="类别" name="1">
								<el-row :gutter="20" class="pb10">

									<!-- <el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.STATUS=='1'?'活动':'不活动'" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col> -->
									<el-col :span="4" class="pull-right">
										<el-input v-model="dataInfo.STATE" :disabled="edit">
											<template slot="prepend">状态</template>
										</el-input>
									</el-col>
									<el-col :span="4" class="pull-right">
										<el-input v-model="dataInfo.N_CODE" :disabled="edit" placeholder="自动生成">
											<template slot="prepend">编号</template>
										</el-input>
									</el-col>
								</el-row>
								<el-radio-group v-model="dataInfo.TYPE" :disabled="noedit">
									<el-row :gutter="20">
										<el-col :span="4">
											<el-radio label="1">监督抽查</el-radio>
										</el-col>
										<el-col :span="4">
											<el-radio label="2">监督抽查复查</el-radio>
										</el-col>
										<el-col :span="4">
											<el-radio label="3">质量抽查</el-radio>
										</el-col>
										<el-col :span="4">
											<el-radio label="4">质量抽查复查</el-radio>
										</el-col>
										<el-col :span="4">
											<el-radio label="5">生产许可证</el-radio>
										</el-col>
										<el-col :span="4">
											<el-radio label="6">认定检验检测</el-radio>
										</el-col>
										<el-col :span="4">
											<el-radio label="7">鉴定试验</el-radio>
										</el-col>
										<el-col :span="4">
											<el-radio label="8">委托检验检测</el-radio>
										</el-col>
										<el-col :span="4">
											<el-radio label="9">专项抽查</el-radio>
										</el-col>
										<el-col :span="4">
											<el-radio label="10">专项抽查复查</el-radio>
										</el-col>
										<el-col :span="4">
											<el-radio label="11">其它</el-radio>
										</el-col>
									</el-row>
								</el-radio-group>
							</el-collapse-item>
							<el-collapse-item title="基本信息" name="2">
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="计划编号" prop="WP_NUM">
											<el-input v-model="dataInfo.WP_NUM" :disabled="edit">
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="任务号" prop="TASKNUM">
											<el-input v-model="dataInfo.TASKNUM" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="承检单位" prop="CJDWDesc" :disabled="noedit">
											<el-input v-model="dataInfo.CJDWDesc" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getCompany"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="项目负责人" prop="P_LEADER">
											<el-input v-model="dataInfo.P_LEADER" :disabled="noedit">
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="受检产品名称" prop="ITEM_NAME">
											<el-input v-model="dataInfo.ITEM_NAME" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="受检产品型号" prop="ITEM_MODEL">
											<el-input v-model="dataInfo.ITEM_MODEL" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>

								</el-row>
							</el-collapse-item>
							<!-- <el-collapse-item title="依据" name="3">
								 字段列表 Begin
								
								字段列表 End 
							</el-collapse-item> -->
							<el-collapse-item title="检验检测要求" name="4" label-width="100px">
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="受检企业" prop="V_NAME">
											<el-input v-model="dataInfo.V_NAME" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>

									<el-col :span="8">
										<el-form-item label="样品数量" prop="QUALITY">
											<el-input v-model="dataInfo.QUALITY" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="接收人" prop="ACCEPT_PERSONDesc">
											<el-input v-model="dataInfo.ACCEPT_PERSONDesc" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getPeople(2)"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-form-item label="抽样方案/判定依据" prop="SOLUTION">
										<el-input v-model="dataInfo.SOLUTION" :disabled="noedit"></el-input>
									</el-form-item>
								</el-row>
							</el-collapse-item>
							<!-- <el-collapse-item title="检验检测项目" name="5">
								 字段列表 Begin
								
								字段列表 End
							</el-collapse-item> -->
							<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
								<el-tabs v-model="activeName" @tab-click="handleClick">
									<el-tab-pane label="依据" name="first">
										<div class="table-func table-funcb">
											<el-button type="success" size="mini" round @click="addfieldBasis">
												<i class="icon-add"></i>
												<font>新建</font>
											</el-button>
										</div>

										<el-table :data="dataInfo.WORK_NOTICE_CHECKBASISList" row-key="ID" border stripe fit="true" max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.WORK_NOTICE_CHECKBASISList', order: 'descending'}">

											<el-table-column prop="iconOperation" fixed width="50px">
												<template slot-scope="scope">
													<i class="el-icon-check" v-if="scope.row.isEditing">
								      	</i>
													<i class="el-icon-edit"  v-else="v-else">
								      	</i>
												</template>
											</el-table-column>
											<el-table-column label="序号" sortable width="80px" prop="NUMBER">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.NUMBER" disabled></el-input><span v-show="!scope.row.isEditing">{{scope.row.NUMBER}}</span>
												</template>
											</el-table-column>
											<el-table-column label="检验标准编号" sortable width="120px" prop="S_NUM">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_NUM" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.S_NUM}}</span>
												</template>
											</el-table-column>
											<el-table-column prop="S_DESC" label="检验标准内容" sortable width="120px">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_DESC" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.S_DESC}}</span>
												</template>
											</el-table-column>
											<el-table-column prop="S_NAME" label="检验标准名称" sortable width="150px">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_NAME" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.S_NAME}}</span>
												</template>
											</el-table-column>
											<el-table-column prop="VERSION" label="版本" sortable width="80px">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.VERSION}}</span>
												</template>
											</el-table-column>
											<el-table-column prop="STATUS" label="信息状态" sortable width="120px">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.STATUS}}</span>
												</template>
											</el-table-column>
											<el-table-column label="附件" sortable width="120px">
												<template slot-scope="scope">
													<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
														<el-button size="small" type="primary">点击上传</el-button>
													</el-upload>
												</template>
											</el-table-column>
											<el-table-column fixed="right" label="操作" width="120">
												<template slot-scope="scope">
													<el-button @click="deleteRow(scope.$index, dataInfo.WORK_NOTICE_CHECKBASISList)" type="text" size="small">
														移除
													</el-button>
												</template>
											</el-table-column>
										</el-table>
									</el-tab-pane>
									<el-tab-pane label="检验检测项目" name="second">
										<div class="table-func table-funcb">
											<el-button type="success" size="mini" round @click="addfieldProject">
												<i class="icon-add"></i>
												<font>新建</font>
											</el-button>
										</div>
										<el-table :data="dataInfo.WORK_NOTICE_CHECKPROJECTList" row-key="ID" border stripe height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.WORK_NOTICE_CHECKPROJECTList', order: 'descending'}">
											<el-table-column prop="iconOperation" fixed width="50px">
												<template slot-scope="scope">
													<i class="el-icon-check" v-show="scope.row.isEditing">
								      	</i>
													<i class="el-icon-edit" v-show="!scope.row.isEditing">
								      	</i>
												</template>
											</el-table-column>
											<el-table-column label="序号" sortable width="120px" prop="NUMBER">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.NUMBER" disabled></el-input><span v-show="!scope.row.isEditing">{{scope.row.NUMBER}}</span>
												</template>
											</el-table-column>
											<el-table-column label="检验检测项目编号" sortable width="145px" prop="P_NUM">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.P_NUM" placeholder="请输入内容"></el-input>
													<span v-show="!scope.row.isEditing">{{scope.row.P_NUM}}</span>
												</template>
											</el-table-column>
											<el-table-column prop="P_DESC" label="检验检测项目内容" sortable width="145px">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.P_DESC" placeholder="请输入内容"></el-input>
													<span v-show="!scope.row.isEditing">{{scope.row.P_DESC}}</span>
												</template>
											</el-table-column>
											<el-table-column prop="REMARKS" label="要求" sortable width="80px">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.REMARKS" placeholder="请输入内容"></el-input>
													<span v-show="!scope.row.isEditing">{{scope.row.REMARKS}}</span>
												</template>
											</el-table-column>
											<!-- <el-table-column prop="REMARKS" label="单价" sortable width="80px">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.REMARKS" placeholder="请输入内容"></el-input>
													<span v-show="!scope.row.isEditing">{{scope.row.REMARKS}}</span>
												</template>
											</el-table-column> -->
											<el-table-column prop="VERSION" label="版本" sortable width="80px">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入内容"></el-input>
													<span v-show="!scope.row.isEditing">{{scope.row.VERSION}}</span>
												</template>
											</el-table-column>
											<el-table-column prop="STATUS" label="信息状态" sortable width="120px">
												<template slot-scope="scope">
													<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入内容"></el-input>
													<span v-show="!scope.row.isEditing">{{scope.row.STATUS}}</span>
												</template>
											</el-table-column>
											<el-table-column label="附件" sortable width="120px">
												<template slot-scope="scope">
													<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
														<el-button size="small" type="primary">点击上传</el-button>
													</el-upload>
												</template>
											</el-table-column>
											<el-table-column fixed="right" label="操作" width="120">
												<template slot-scope="scope">
													<el-button @click="deleteRow(scope.$index, dataInfo.WORK_NOTICE_CHECKPROJECTList)" type="text" size="small">
														移除
													</el-button>
												</template>
											</el-table-column>
										</el-table>
									</el-tab-pane>
								</el-tabs>
							</div>
							<el-collapse-item name="6">
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="完成日期" prop="COMPDATE">
											<el-date-picker v-model="dataInfo.COMPDATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :disabled="noedit" style="width: 100%">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="检验检测费用" prop="CHECTCOST">
											<el-input v-model="dataInfo.CHECTCOST" :disabled="noedit" id="cost" @blur="toPrice"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="下达日期" prop="XD_DATE">
											<el-date-picker v-model="dataInfo.XD_DATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :disabled="noedit" style="width: 100%">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="备注" prop="MEMO">
											<el-input type="textarea" rows="5" v-model="dataInfo.MEMO" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
							<el-collapse-item title="其他" name="7" v-show="views">
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="录入人" prop="ENTERBY">
											<el-input v-model="dataInfo.ENTERBY" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE">
											<el-input v-model="dataInfo.ENTERDATE" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入人机构" prop="ORGID">
											<el-input v-model="dataInfo.ORGID" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="修改人" prop="CHANGEBY">
											<el-input v-model="dataInfo.CHANGEBY" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改时间" prop="CHANGEDATE">
											<el-input v-model="dataInfo.CHANGEDATE" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</el-form>
				</div>
				<div class="el-dialog__footer" v-show="noviews">
                    <el-button type="primary" @click='saveAndUpdate()'>保存</el-button>
					<el-button type="success" @click='saveAndSubmit()'>提交并保存</el-button>
					<el-button @click='close'>取消</el-button>
					
				</div>
			</div>
		</div>
		<el-dialog :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
			<el-table :data="gridData" @selection-change="SelChange">
				<el-table-column type="selection" width="55" fixed>
				</el-table-column>
				<el-table-column label="ID" sortable width="50px" prop="id">
				</el-table-column>
				<el-table-column label="姓名" sortable width="200px" prop="nickname">
				</el-table-column>
				<el-table-column label="机构" sortable width="200px" prop="deptName">
				</el-table-column>
				<el-table-column label="公司" sortable width="200px" prop="companyName">
				</el-table-column>
			</el-table>
			<el-pagination background class="pull-right" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
			</el-pagination>
			<span slot="footer" class="dialog-footer" v-if="noviews">
    			<el-button @click="dialogVisible = false">取 消</el-button>
    			<el-button type="primary" @click="dailogconfirm()">确 定</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="承检部门" :visible.sync="dialogVisiblecompany" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @check-change="handleCheckChange">
			</el-tree>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisiblecompany = false">取 消</el-button>
		       <el-button type="primary" @click="diaconfirmcom();" >确 定</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		//				props: {
		//					page: Object ,
		//				},
		data() {
			return {
				basic_url: Config.dev_url,
				gridData: [], //彈出框的數據
				fileList: [],
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 
				getCheckboxData: {},
				resourceProps: {
					children: "children",
					label: "fullname"
				},
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				options: [{
						value: '金化站',
						label: '金化站'
					},
					{
						value: '通号站',
						label: '通号站'
					},
					{
						value: '运包站',
						label: '运包站'
					},
					{
						value: '机报站',
						label: '机报站'
					},
					{
						value: '接触网站',
						label: '接触网站'
					},
				],
				value: '',
				selUser: [],
				edit: true, //禁填
				noedit: false,
				editSearch: '', //判斷項目負責人和接收人
				col_but1: true,
				col_but2: true,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				type: '',
				initcost: '',
				addtitle: true, //添加弹出框titile
				modifytitle: false, //修改弹出框titile
				viewtitle: false, //查看弹出框title
				modify: false,
				views: false,
				noviews: true, //保存的按钮
				activeName: 'first', //tabs
				activeNames: ['1', '2', '3', '4', '5', '6', '7'], //手风琴数量
				labelPosition: 'right', //表格
				dialogVisible: false, //对话框
				dialogVisiblecompany: false, //对话框
				editSearch: '',
				dataInfo: { //添加数据库列表信息
					N_CODE: '',
					TYPE: '',
					XD_DATE: '',
					ITEM_NAME: '',
					ITEM_MODEL: '',
					VENDOR: '',
					CJDW: '',
					P_LEADER: '',
					TASKNUM: '',
					SOLUTION: '',
					COMPDATE: '',
					STATE: '草稿',
					ENTERBY: '',
					STATUS: '',
					WORK_NOTICE_CHECKBASISList: [],
					WORK_NOTICE_CHECKPROJECTList: []
				},
				rules: {
					TYPE: [{required: true,message: '必填',trigger: 'blur'}], //名称
					// WP_NUM: [{
					// 	required: true,
					// 	message: '必填',
					// 	trigger: 'blur'
					// }], //计划编号

					CJDWDesc: [{required: true,trigger: 'blur',message: '必填',}], //承检单位
					P_LEADERDesc: [{required: true,trigger: 'blur',message: '必填',}], //项目负责人
					ITEM_NAME: [{required: true,trigger: 'blur',message: '必填',}], //受检产品名称
					ITEM_MODEL: [{required: true,trigger: 'blur',message: '必填'}], //受检产品型号
					V_NAME: [{required: true,trigger: 'blur',message: '必填'}], //受检企业
					QUALITY: [{required: true,trigger: 'change',message: '必填'}], //样品数量
					CHECTCOST: [{required: true,trigger: 'blur',message: '必填',	}], //检验检测费用
					REMARKS: [{required: true,trigger: 'blur',message: '必填',}],

					//					idnumber:[{required: true,trigger: 'blur',validator: validateIdnumber}],
					//					phone: [{required: true,trigger: 'blur',validator: validatePhone}],
					//					email: [{required: true,trigger: 'blur',validator: validateEmail,}],
					//					step:[{required: true,trigger: 'blur',message: '必填',}],
					//					t_date:[{required: true,trigger: 'blur',message: '必填',}],
					//					t_description:[{required: true,trigger: 'blur',message: '必填',}],
					//					status:[{required: true,trigger: 'blur',message: '必填',}],
					//					step:[{required: true,trigger: 'blur',message: '必填',}],
					//					c_date:[{required: true,trigger: 'blur',message: '必填',}],
					//					c_num:[{required: true,trigger: 'blur',message: '必填',}],
					//					c_name:[{required: true,trigger: 'blur',message: '必填',}],

				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
			};
		},
		methods: {
			reset() {
				this.dataInfo = {
					N_CODE: '',
					TYPE: '',
					XD_DATE: '',
					ITEM_NAME: '',
					ITEM_MODEL: '',
					VENDOR: '',
					CJDW: '',
					P_LEADER: '',
					TASKNUM: '',
					SOLUTION: '',
					COMPDATE: '',
					STATE: '草稿',
					ENTERBY: '',
					STATUS: '',
					WORK_NOTICE_CHECKBASISList: [],
					WORK_NOTICE_CHECKPROJECTList: []
				}
					this.$refs["dataInfo"].resetFields();
			},
			
			handleNodeClick(data) { //获取勾选树菜单节点
				//				console.log(data);
			},
			handleCheckChange(data, checked, indeterminate) {
				this.getCheckboxData = data;
			},
			getCheckedNodes() { //获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},
			getCompany() {
				this.editSearch = 'dept';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data;
					this.dialogVisiblecompany = true;
				});
			},
			toNum(str) {
				return str.replace(/\,|\￥/g, "");
			},
			//金额两位小数点千位分隔符，四舍五入
			toPrice() {
				var money = document.getElementById("cost").value;
				this.initcost = money;
				var num = parseFloat(this.toNum(money)).toFixed(2).toString().split(".");
				num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
				// this.dataInfo.CHECTCOST="￥" + num.join(".");
				this.dataInfo.CHECTCOST = num.join(".");
			},

			//tabs
			handleClick(tab, event) {
				console.log(tab, event);
			},
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					row.isEditing = !row.isEditing
				}
			},
			//删除行
			deleteRow(index, rows) { //Table-操作列中的删除行
				rows.splice(index, 1);
			},
			sizeChange(val) {
				this.page.pageSize = val;
				//				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				//				this.requestData();
			},
			//新建行
			addfieldBasis() {
				var obj = {
					NUMBER: '1',
					S_NUM: '',
					S_DESC: '',
					VERSION: '',
					S_NAME: '',
					S_ENGNAME: 'sss',
					STATUS: '',
					isEditing: true
				};
				this.dataInfo.WORK_NOTICE_CHECKBASISList.push(obj);
			},
			addfieldProject() {
				var obj = {
					NUMBER: '1',
					P_NUM: '',
					P_DESC: '',
					REMARKS: '',
					VERSION: '',
					STATUS: '',
					isEditing: true
				};
				this.dataInfo.WORK_NOTICE_CHECKPROJECTList.push(obj);
			},

			//刪除新建行
			delfieldBasis(item) {
				var index = this.dataInfo.WORK_NOTICE_CHECKBASISList.indexOf(item);
				if(index !== -1) {
					this.dataInfo.WORK_NOTICE_CHECKBASISList.splice(index, 1);
				}
			},
			importdia() {
				this.dialogVisible = true;
			},
			//点击按钮显示弹窗
			visible() {
				this.reset();
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {

					this.dataInfo.DEPT = res.data.deptName;
					this.dataInfo.ENTERBY = res.data.nickname;
					this.dataInfo.ORGID = res.data.deptName
					var date = new Date();
					this.dataInfo.ENTERDATE = this.$moment(date).format("YYYY-MM-DD ");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					})
				})
				
				this.addtitle = true;
				this.modifytitle = false;
				this.views = false; //
				this.noviews = true;
				this.edit = true;
				this.noedit = false;
				this.show = true;

			},
			// 这里是修改
			detail(dataid) {
				this.addtitle = false;
				this.modifytitle = true;
				this.noviews = true;
				this.views = false; //
				this.edit = true;
				this.noedit = false;

				var url = this.basic_url + '/api-apps/app/workNot/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.dataInfo = res.data;

				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.show = true;
				var usersUrl = this.basic_url + '/api-user/users/currentMap'
				this.$axios.get(usersUrl, {}).then((res) => {
					console.log(res);
					this.dataInfo.CHANGEBY = res.data.nickname;
					console.log(this.dataInfo.CHANGEBY);
					var date = new Date();
					this.dataInfo.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd hh:mm:ss");
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
				this.viewtitle = true;
				this.views = true; //
				this.noviews = false;
				this.edit = true;
				this.noedit = true;

				//				const parent = $("input").attr('disabled',true);
				//alert(parent)
				console.log(parent)
				//				var usersUrl = '/api/api-user/users/currentMap'
				//				this.$axios.get(usersUrl, {}).then((res) => {
				//					this.dataInfo.CHANGEBY = res.data.nickname;
				//					var date = new Date();
				//					this.dataInfo.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd hh:mm:ss");
				//				}).catch((err) => {
				//					this.$message({
				//						message: '网络错误，请重试',
				//						type: 'error'
				//					});
				//				});
				var url = this.basic_url + '/api-apps/app/workNot/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					this.dataInfo = res.data;
					console.log(this.dataInfo);
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
			save() {
				this.$refs.dataInfo.validate((valid) => {
		          if (valid) {
					this.dataInfo.CHECTCOST = this.initcost;
					this.dataInfo.STATE = this.dataInfo.STATE == "1" ? '草稿' : '未知';
					var url = this.basic_url + '/api-apps/app/workNot/saveOrUpdate';
					this.$axios.post(url, this.dataInfo).then((res) => {
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							// this.show = false;
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
							message: '有必填项未填写，请重新填写',
							type: 'warning',
						});
					}
				});
			},
			//保存
			saveAndUpdate() {
				this.save();
				this.show = false;
			},
			//提交并保存
			saveAndSubmit() {
				this.save();
				this.show = true;
				this.reset();
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//获取负责人和接收人
			getPeople(type) {
				// type  1 這是負責人  2 這個事接收人
				var params = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = this.basic_url + '/api-user/users';
				this.$axios.get(url, {
					params: params
				}).then((res) => {
					this.page.totalCount = res.data.count;
					this.gridData = res.data.data;
					this.dialogVisible = true;
					this.type = type;
				});
			},
			diaconfirmcom() {
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisiblecompany = false;
				console.log(this.getCheckboxData);
				//承检单位
				this.dataInfo.CJDW = this.getCheckboxData.id;
				this.dataInfo.CJDWDesc = this.getCheckboxData.fullname;
				//单位负责人
				this.dataInfo.P_LEADER = this.getCheckboxData.leader;
				console.log(this.dataInfo.P_LEADER);
				// var dataid = this.getCheckboxData.leader;
				// var url = this.basic_url + '/api-user/users/' + dataid;
				// this.$axios.get(url, {}).then((res) => {
				// 	this.dataInfo.P_LEADERDesc = res.data.nickname;
				// }).catch((err) => {
				// 	this.$message({
				// 		message: '网络错误，请重试',
				// 		type: 'error'
				// 	});
				// });
			},
			dailogconfirm(type) { //小弹出框确认按钮事件
				this.dialogVisible = false;
				if(this.type == '1') {
					console.log(12345);
					this.dataInfo.P_LEADER = this.selUser[0].id;
					console.log(this.dataInfo.P_LEADER);
					this.dataInfo.P_LEADERDesc = this.selUser[0].nickname;
				} else {
					this.dataInfo.ACCEPT_PERSON = this.selUser[0].id;
					this.dataInfo.ACCEPT_PERSONDesc = this.selUser[0].nickname;
				}
			},
			
			SelChange(val) {
				this.selUser = val;
			},
		}
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
	.el-radio-group .el-col-4 {
		padding-top: 5px;
	}
	
	#cost {
		text-align: right !important;
	}
</style>