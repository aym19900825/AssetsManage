<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
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
						<el-form :model="dataInfo" :label-position="labelPosition" :rules="rules" ref="dataInfo" class="demo-form-inline" inline-message>
							<div class="text-center" v-show="viewtitle">
							<el-button class="start" type="success" round plain size="mini" @click="startup"><i class="icon-start"></i> 启动流程</el-button>
							<el-button class="approval" type="warning" round plain size="mini" @click="approvals"><i class="icon-edit-3"></i> 审批</el-button>
							<el-button type="primary" round plain size="mini" @click="flowmap"><i class="icon-git-pull-request"></i> 流程地图</el-button>
							<el-button type="primary" round plain size="mini" @click="flowhistory"><i class="icon-plan"></i> 流程历史</el-button>
							<el-button type="primary" round plain size="mini" @click="viewpepole"><i class="icon-user"></i> 当前责任人</el-button>
						</div>
						   <div class="accordion">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="类型" name="1">
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
										<el-col :span="5" class="pull-right">
											<el-input v-model="dataInfo.N_CODE" :disabled="edit" placeholder="自动生成">
												<template slot="prepend">编号</template>
											</el-input>
										</el-col>
									</el-row>
									<el-form-item label="" prop="TYPE">
										<el-radio-group v-model="dataInfo.TYPE" :disabled="noedit">
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
										
										</el-radio-group>
									</el-form-item>
								</el-collapse-item>
								<el-collapse-item title="基本信息" name="2">
										<el-col :span="8">
											<el-form-item label="计划编号" prop="WP_NUM" label-width="110px">
												<el-input v-model="dataInfo.WP_NUM" :disabled="edit">
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="任务号" prop="TASKNUM" label-width="110px">
												<el-input v-model="dataInfo.TASKNUM" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="承检单位" prop="CJDW" :disabled="noedit" label-width="110px">
												<!-- <el-input v-model="dataInfo.CJDW" :disabled="edit">
													<el-button slot="append" icon="el-icon-search" @click="getCompany"></el-button>
												</el-input> -->
												<el-select clearable v-model="dataInfo.CJDW" filterable allow-create default-first-option placeholder="请选择">
													<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										
										<el-col :span="8">
											<el-form-item label="项目负责人" prop="P_LEADERDesc" label-width="110px">
												<el-input v-model="dataInfo.P_LEADERDesc" :disabled="true">
													<el-button :disabled="noedit" slot="append" icon="el-icon-search" @click="addperbtn()"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="受检产品名称" prop="ITEM_NAME" label-width="110px">
												<el-input v-model="dataInfo.ITEM_NAME" :disabled="true">
													   <el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="addproduct"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="受检产品型号" prop="ITEM_MODEL" label-width="110px">
												<el-input v-model="dataInfo.ITEM_MODEL" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
								</el-collapse-item>
								<!-- <el-collapse-item title="依据" name="3">
									 字段列表 Begin
									
									字段列表 End 
								</el-collapse-item> -->
								<el-collapse-item title="检验检测要求" name="4" label-width="100px">
										<el-row>
										<el-col :span="6">
											<el-form-item label="受检企业" prop="V_NAME" label-width="110px">
												<el-input v-model="dataInfo.V_NAME" :disabled="true">
													   <el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="addCompany"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="受检企业编号" prop="VENDOR" label-width="110px">
												<el-input v-model="dataInfo.VENDOR" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="样品数量" prop="QUALITY" label-width="110px">
												<el-input v-model="dataInfo.QUALITY" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="接收人" prop="ACCEPT_PERSONDesc" label-width="110px">
												<el-input v-model="dataInfo.ACCEPT_PERSONDesc" :disabled="edit">
													<el-button slot="append" icon="el-icon-search" @click="getPeople(2)"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-form-item label="抽样方案/判定依据" prop="SOLUTION" label-width="110px">
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

											<el-table :data="dataInfo.WORK_NOTICE_CHECKBASISList" row-key="ID" border stripe :fit="true" max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.WORK_NOTICE_CHECKBASISList', order: 'descending'}">

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
														<el-form-item :prop="'WORK_NOTICE_CHECKBASISList.' + scope.$index + '.S_NUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_NUM" placeholder="请输入内容">
															   <el-button slot="append" icon="el-icon-search"></el-button>
														</el-input>
														<span v-show="!scope.row.isEditing">{{scope.row.S_NUM}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<!-- <el-table-column prop="S_NAME" label="检验标准内容" sortable width="200px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORK_NOTICE_CHECKBASISList.' + scope.$index + '.S_NAME'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_NAME" placeholder="请输入内容"></el-input>
														<span v-show="!scope.row.isEditing">{{scope.row.S_NAME}}</span>
														</el-form-item>
													</template>
												</el-table-column> -->
												<el-table-column prop="S_NAME" label="检验标准名称" sortable width="200px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORK_NOTICE_CHECKBASISList.' + scope.$index + '.S_NAME'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_NAME" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.S_NAME}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column prop="S_ENGNAME" label="英文名称" sortable width="200px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORK_NOTICE_CHECKBASISList.' + scope.$index + '.S_ENGNAME'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_ENGNAME" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.S_ENGNAME}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column prop="VERSION" label="版本" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORK_NOTICE_CHECKBASISList.' + scope.$index + '.VERSION'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入内容"></el-input>
														<span v-show="!scope.row.isEditing">{{scope.row.VERSION}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<!-- <el-table-column prop="STATUS" label="信息状态" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORK_NOTICE_CHECKBASISList.' + scope.$index + '.STATUS'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.STATUS}}</span>
														</el-form-item>
													</template>
												</el-table-column> -->
												<el-table-column label="附件" sortable width="120px">
													<template slot-scope="scope">
														<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
															<el-button size="small" type="primary">点击上传</el-button>
														</el-upload>
													</template>
												</el-table-column>
												<el-table-column fixed="right" label="操作" width="100">
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
											<el-table :data="dataInfo.WORK_NOTICE_CHECKPROJECTList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.WORK_NOTICE_CHECKPROJECTList', order: 'descending'}">
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
														<el-form-item :prop="'WORK_NOTICE_CHECKPROJECTList.' + scope.$index + '.NUMBER'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.NUMBER" disabled></el-input><span v-show="!scope.row.isEditing">{{scope.row.NUMBER}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column label="检验检测项目编号" sortable width="145px" prop="P_NUM">
													<template slot-scope="scope">
														<el-form-item :prop="'WORK_NOTICE_CHECKPROJECTList.' + scope.$index + '.P_NUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.P_NUM" placeholder="请输入内容">
															   <el-button slot="append" icon="el-icon-search"></el-button>
														</el-input>
														<span v-show="!scope.row.isEditing">{{scope.row.P_NUM}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column prop="P_DESC" label="检验检测项目内容" sortable width="200px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORK_NOTICE_CHECKPROJECTList.' + scope.$index + '.P_DESC'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.P_DESC" placeholder="请输入内容"></el-input>
														<span v-show="!scope.row.isEditing">{{scope.row.P_DESC}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column prop="REMARKS" label="要求" sortable width="150px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORK_NOTICE_CHECKPROJECTList.' + scope.$index + '.REMARKS'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.REMARKS" placeholder="请输入内容"></el-input>
														<span v-show="!scope.row.isEditing">{{scope.row.REMARKS}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column prop="VERSION" label="版本" sortable width="80px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORK_NOTICE_CHECKPROJECTList.' + scope.$index + '.VERSION'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入内容"></el-input>
														<span v-show="!scope.row.isEditing">{{scope.row.VERSION}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<!-- <el-table-column prop="STATUS" label="信息状态" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORK_NOTICE_CHECKPROJECTList.' + scope.$index + 'STATUS'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]">
														<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入内容"></el-input>
														<span v-show="!scope.row.isEditing">{{scope.row.STATUS}}</span>
														</el-form-item>
													</template>
												</el-table-column> -->
												<el-table-column label="附件" sortable width="120px">
													<template slot-scope="scope">
														<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
															<el-button size="small" type="primary">点击上传</el-button>
														</el-upload>
													</template>
												</el-table-column>
												<el-table-column fixed="right" label="操作" width="100">
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
									<el-row >
										<el-col :span="8">
											<el-form-item label="完成日期" prop="COMPDATE" label-width="110px">
												<el-date-picker v-model="dataInfo.COMPDATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :disabled="noedit" style="width: 100%">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="检验检测费用" prop="CHECTCOST" label-width="110px">
												<el-input v-model="dataInfo.CHECTCOST" :disabled="noedit" id="cost" @blur="toPrice"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="下达日期" prop="XD_DATE" label-width="110px">
												<el-date-picker v-model="dataInfo.XD_DATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :disabled="noedit" style="width: 100%">
												</el-date-picker>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="30">
										<el-col :span="24">
											<el-form-item label="备注" prop="MEMO" label-width="110px">
												<el-input type="textarea" rows="5" v-model="dataInfo.MEMO" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="其他" name="7" v-show="views">
									<el-row >
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBYDesc" label-width="110px">
												<el-input v-model="dataInfo.ENTERBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENTERDATE" label-width="110px">
												<el-input v-model="dataInfo.ENTERDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="机构" prop="DEPTIDDesc" label-width="110px">
												<el-input v-model="dataInfo.DEPTIDDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBYDesc" label-width="110px">
												<el-input v-model="dataInfo.CHANGEBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" prop="CHANGEDATE" label-width="110px">
												<el-input v-model="dataInfo.CHANGEDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
							</div>
						</el-form>
					<div class="el-dialog__footer" v-show="noviews">
	                    <el-button type="primary" @click='saveAndUpdate()'>保存</el-button>
						<el-button type="success" v-show="addtitle" @click='saveAndSubmit()'>保存并继续</el-button>
						<el-button type="success" v-show="!addtitle" @click="build">生成委托书</el-button>
						<el-button @click='close'>取消</el-button>
					</div>
				</div>
			</div>
			<el-dialog :visible.sync="dialogVisible" width="60%" :before-close="handleClose" :modal-append-to-body='false'>
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
			<!-- <el-dialog title="承检部门" :visible.sync="dialogVisiblecompany" width="30%" :before-close="handleClose">
				<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @check-change="handleCheckChange">
				</el-tree>
				<span slot="footer" class="dialog-footer">
			       <el-button @click="dialogVisiblecompany = false">取 消</el-button>
			       <el-button type="primary" @click="diaconfirmcom();" >确 定</el-button>
			    </span>
			</el-dialog> -->
			<!-- 产品名称 Begin -->
			<el-dialog title="产品名称" :visible.sync="dialogVisible1" width="80%" :before-close="handleClose" :modal-append-to-body='false'>
				<el-table  :header-cell-style="rowClass" :data="productList" line-center border stripe height="400px" style="width: 100%;" :default-sort="{prop:'productList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
									<el-table-column type="selection" fixed width="55" align="center">
									</el-table-column>
									<el-table-column label="编码" width="155" sortable prop="PRO_NUM">
									</el-table-column>
									<el-table-column label="名称" sortable prop="PRO_NAME">
									</el-table-column>
									<el-table-column label="版本" width="100" sortable prop="VERSION" align="right">
									</el-table-column>
									<el-table-column label="机构" width="185" sortable prop="DEPARTMENTDesc">
									</el-table-column>
									<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat">
									</el-table-column>
									<el-table-column label="修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat">
									</el-table-column>
								</el-table>
								<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
								</el-pagination>
				<span slot="footer" class="dialog-footer">
			       <el-button @click="dialogVisible1 = false">取 消</el-button>
			       <el-button type="primary" @click="addproname">确 定</el-button>
			    </span>
			</el-dialog>
			<!-- 产品名称 End -->
			<!-- 受检企业 Begin -->
			<el-dialog title="受检企业" :visible.sync="dialogVisible2" width="80%" :before-close="handleClose" :modal-append-to-body='false'>
				<el-table :data="customerList" border stripe :header-cell-style="rowClass" height="400px" style="width: 100%;" :default-sort="{prop:'customerList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" width="55" fixed align="center">
								</el-table-column>
								<el-table-column label="组织机构代码" width="200" sortable prop="CODE">
								</el-table-column>
								<el-table-column label="单位名称" width="300" sortable prop="NAME">
								</el-table-column>
								<el-table-column label="联系地址" sortable prop="CONTACT_ADDRESS">
								</el-table-column>
							</el-table>
							<el-pagination background class="pull-right pt10"
					            @size-change="sizeChange"
					            @current-change="currentChange"
					            :current-page="page.currentPage"
					            :page-sizes="[10, 20, 30, 40]"
					            :page-size="page.pageSize"
					            layout="total, sizes, prev, pager, next"
					            :total="page.totalCount">
					        </el-pagination>
				<span slot="footer" class="dialog-footer">
			       <el-button @click="dialogVisible2 = false">取 消</el-button>
			       <el-button type="primary" @click="addcomname">确 定</el-button>
			    </span>
			</el-dialog>
			<!-- 产品名称 End -->
			
			<!--审批页面-->
			<approvalmask :approvingData="approvingData" ref="approvalChild" ></approvalmask>
			<!--流程历史-->
			<flowhistorymask :approvingData="approvingData"  ref="flowhistoryChild" ></flowhistorymask>
			<!--流程地图-->
			<flowmapmask :approvingData="approvingData" ref="flowmapChild" ></flowmapmask>
			<!--当前责任人-->
			<vewPoplemask :approvingData="approvingData"  ref="vewPopleChild" ></vewPoplemask>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import approvalmask from '../workflow/approving.vue'
	import flowhistorymask from '../workflow/flowhistory.vue'
	import flowmapmask from '../workflow/flowmap.vue'
	import vewPoplemask from '../workflow/vewPople.vue'
	export default {
		name: 'masks',
		components: {
			 approvalmask,
			 flowhistorymask,
			 flowmapmask,
			 vewPoplemask
		},
		//				props: {
		//					page: Object ,
		//				},
		data() {
			return {
				approvingData:{},//流程的数据
				loadSign:true,//加载
				commentArr:{},
				falg:false,//保存验证需要的
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
					V_NAME: '',
					VENDOR:'',
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
				dialogVisible1:false,
				dialogVisible2:false,
				rules: {
					// TYPE: [{required: true,message: '必填',trigger: 'blur'}], //名称
					// WP_NUM: [{
					// 	required: true,
					// 	message: '必填',
					// 	trigger: 'blur'
					// }], //计划编号
					TYPE:[{required: true,trigger: 'change',message: '必填',}],
					CJDW: [{required: true,trigger: 'change',message: '必填',}], //承检单位
					P_LEADERDesc: [{required: true,trigger: 'change',message: '必填',}], //项目负责人
					ITEM_NAME: [{required: true,trigger: 'blur',message: '必填',}], //受检产品名称
					ITEM_MODEL: [{required: true,trigger: 'blur',message: '必填'}], //受检产品型号
					V_NAME: [{required: true,trigger: 'blur',message: '必填'}], //受检企业
					VENDOR: [{required: true,trigger: 'blur',message: '必填'}], //受检企业编号
					QUALITY: [{required: true,trigger: 'change',message: '必填'}], //样品数量
					CHECTCOST: [{required: true,trigger: 'blur',message: '必填',	}], //检验检测费用
					XD_DATE: [{type: 'string',required: true,message: '请选择',trigger: 'change'}],//下达日期
					SOLUTION: [{required: true,trigger: 'blur',message: '必填',	}],//抽样方案
					// REMARKS: [{required: true,trigger: 'blur',message: '必填',}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				productList:[],
				customerList:[],
				selectData:[],
				dataid:2,//修改和查看带过的id
				workNot:'workNot',//appname
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			reset() {
				this.dataInfo = {
					N_CODE: '',
					TYPE: '',
					XD_DATE: '',
					ITEM_NAME: '',
					ITEM_MODEL: '',
					V_NAME: '',
					VENDOR:'',
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
				// this.$nextTick(() => {
				// 	this.$refs.form.resetFields();
				// });
				// this.$refs["dataInfo"].resetFields();
			},
			//机构值
			getCompany() {
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.selectData = res.data;
				});
			},
			addproduct(){//受检产品名称
				this.$emit('request');
				this.dialogVisible1 = true;
			},
			addproname(){//产品名称弹框确定选中数据
				if(this.selUser.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selUser.length > 1){
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
				}else{
					this.dialogVisible1 = false;
					this.dataInfo.ITEM_NAME = this.selUser[0].PRO_NAME;
					this.$emit('request');
				}
			},
			addCompany(){
				this.$emit('request');
				this.dialogVisible2 = true;
			},                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
			addcomname(){  
				if(this.selUser.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selUser.length > 1){
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
				}else{
					this.dialogVisible2 = false;
					this.dataInfo.V_NAME = this.selUser[0].NAME;//名称
					this.dataInfo.V_ADDRESS = this.selUser[0].CONTACT_ADDRESS;//地址
					this.dataInfo.V_ZIPCODE = this.selUser[0].ZIPCODE;//邮编
					this.$emit('request');
				}
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
			// getCompany() {
			// 	this.editSearch = 'dept';
			// 	var page = this.page.currentPage;
			// 	var limit = this.page.pageSize;
			// 	var type = "2";
			// 	var url = this.basic_url + '/api-user/depts/treeByType';
			// 	this.$axios.get(url, {
			// 		params: {
			// 			type: type
			// 		},
			// 	}).then((res) => {
			// 		this.resourceData = res.data;
			// 		this.dialogVisiblecompany = true;
			// 	});
			// },
			toNum(str) {
				return str.replace(/\,|\￥/g, "");
			},
			//金额两位小数点千位分隔符，四舍五入
			toPrice() {
				var money = document.getElementById("cost").value;
				var num = parseFloat(this.toNum(money)).toFixed(2).toString().split(".");
				num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
				// this.dataInfo.CHECTCOST="￥" + num.join(".");
				this.dataInfo.CHECTCOST = num.join(".");
			},

			//tabs
			handleClick(tab, event) {
//				console.log(tab, event);
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
					S_NAME: '',
					S_ENGNAME: '',
					VERSION: '',
					STATUS: '1',
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
					STATUS: '1',
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
					this.dataInfo.DEPTID = res.data.deptId;
					this.dataInfo.ENTERBY = res.data.id;
					// this.dataInfo.ORGID = res.data.deptName
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
				this.viewtitle = false;
				this.views = false; //
				this.noviews = true;
				this.edit = true;
				this.noedit = false;
			},
			// 这里是修改
			detail(dataid) {
				var url = this.basic_url + '/api-apps/app/workNot/' + dataid;
				this.$axios.get(url, {}).then((res) => {
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
					this.dataInfo.DEPTID = res.data.deptId;//传给后台机构id
					this.dataInfo.CHANGEBY = res.data.id;
					var date = new Date();
					this.dataInfo.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd hh:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle = false;
				this.noviews = true;
				this.views = false; //
				this.edit = true;
				this.noedit = false;

			},
			//这是查看
			view(dataid) {
				this.dataid=dataid;	
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.views = true; //
				this.noviews = false;
				this.edit = true;
				this.noedit = true;
				var url = this.basic_url + '/api-apps/app/workNot/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					this.dataInfo = res.data;
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				//判断启动流程和审批的按钮是否显示
				var url = this.basic_url + '/api-apps/app/workNot/flow/isStart/'+dataid;
				this.$axios.get(url, {}).then((res) => {
					if(res.data.resp_code==1){
						$(".approval").hide();
						$(".start").show();
					}else{
						$(".approval").show();
						$(".start").hide();
					}
				});
			},
			//上传文件 Begin
			handleRemove(file, fileList) {
//				console.log(file, fileList);
			},
			handlePreview(file) {
//				console.log(file);
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
				this.$emit('request');
			},
			open(){
				this.show = true;
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
			},
			//还原按钮
			rebackDialog() {
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
			},
			// 保存users/saveOrUpdate
			save() {
				console.log(this.dataInfo);
				this.$refs.dataInfo.validate((valid) => {
		          if (valid) {
							if(this.dataInfo.WORK_NOTICE_CHECKBASISList.length<=0&&this.dataInfo.WORK_NOTICE_CHECKPROJECTList.length<=0){
			        		this.$message({
							message: '依据和检验检测项目是必填项，请填写！',
							type: 'warning'
						});
						return false;
			        	}else{
					if( this.dataInfo.STATE == "草稿" ){
						this.dataInfo.STATE = this.dataInfo.STATE == "1"
					}
					var url = this.basic_url + '/api-apps/app/workNot/saveOrUpdate';
					this.$axios.post(url, this.dataInfo).then((res) => {
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							//重新加载数据
							this.$emit('request');
							this.reset();
						}
						this.falg=true
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
						this.falg=false
					});}
					this.falg=true
					} else {
						this.show=true;
					 	this.$message({
							message: '有必填项未填写，请重新填写',
							type: 'warning',
						});
						this.falg=false
					}
				});
			},
			//保存
			saveAndUpdate() {
				this.save();
				if(this.falg){
					this.show = false;
				}
				
			},
			//提交并保存
			saveAndSubmit() {
				this.save();
				this.show = true;
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
			// diaconfirmcom() {
			// 	this.getCheckedNodes();
			// 	this.placetext = false;
			// 	this.dialogVisiblecompany = false;
			// 	//承检单位
			// 	this.dataInfo.CJDW = this.getCheckboxData.id;
			// 	this.dataInfo.CJDWDesc = this.getCheckboxData.fullname;
			// 	//单位负责人
			// 	this.dataInfo.P_LEADER = this.getCheckboxData.leader;
			// 	// var dataid = this.getCheckboxData.leader;
			// 	// var url = this.basic_url + '/api-user/users/' + dataid;
			// 	// this.$axios.get(url, {}).then((res) => {
			// 	// 	this.dataInfo.P_LEADERDesc = res.data.nickname;
			// 	// }).catch((err) => {
			// 	// 	this.$message({
			// 	// 		message: '网络错误，请重试',
			// 	// 		type: 'error'
			// 	// 	});
			// 	// });
			// },
			dailogconfirm(type) { //选择人员确定按钮
				if(this.selUser.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selUser.length > 1){
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
				}else{
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
				}
			},
			//项目负责人放大镜
			addperbtn(){
				var params = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				console.log(this.dataInfo.CJDW);
				var url = this.basic_url + '/api-user/users/usersByDept?deptId='+this.dataInfo.CJDW;
				this.$axios.get(url, {
					params: params
				}).then((res) => {
					console.log(res.data);
					this.gridData = res.data.data;
					// this.gridData = res.data.data;
					// this.dialogVisible = true;
					this.type = '1';
				});
				this.$emit('request');
				this.dialogVisible = true;				
			},
			//生成委托书
			build(){
				console.log(this.dataInfo.ISCREATED);
				var dataid = this.dataInfo.ID;
				if(this.dataInfo.ISCREATED == 1){
					this.$message({
						message: '已经生成委托书，请勿重复生成',
						type: 'warning'
					});
					return;
				}else{
					this.$axios.get(this.basic_url + '/api-apps/app/workNot/operate/createInspectProxy?ID=' + dataid, {}).then((res) => {
						console.log(res.data);
						if(res.data.resp_code == 0) {
							this.$message({
								message: '生成委托书成功',
								type: 'success'
							});
						}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
				}
			},
			SelChange(val) {
				this.selUser = val;
			},
			loadMore () {
			   if (this.loadSign) {
			     this.loadSign = false
			     this.page.currentPage++
			     if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			       return
			     }
			     setTimeout(() => {
			       this.loadSign = true
			     }, 1000)
			     this.requestData()
			   }
			 },
			 //启动流程
			startup(){
				console.log(12345);
				console.log(this.dataid);
				var url = this.basic_url + '/api-apps/app/workNot/flow/'+this.dataid;
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					if(res.data.resp_code == 1) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
				    }else{
				    	this.$message({
								message:res.data.resp_msg,
								type: 'success'
							});
				    }
				});
			},
			//审批流程
			approvals(){
				console.log(122);
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.workNot;
				var url = this.basic_url + '/api-apps/app/'+this.workNot+'/flow/isEnd/'+this.dataid;
		    		this.$axios.get(url, {}).then((res) => {
		    			if(res.data.resp_code == 0) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
		    			}else{
		    				var url = this.basic_url + '/api-apps/app/'+this.workNot+'/flow/isExecute/'+this.dataid;
		    				this.$axios.get(url, {}).then((res) => {
				    			if(res.data.resp_code == 1) {
										this.$message({
											message:res.data.resp_msg,
											type: 'warning'
										});
								}else{
									this.$refs.approvalChild.visible();
								}
		    		});
		    		}
				});
			},
			//流程历史
			flowhistory(){
				console.log(this.dataid);
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.workNot;
//				this.$refs.flowhistoryChild.open();
				this.$refs.flowhistoryChild.getdata(this.dataid);
			},
			//流程地图
			flowmap(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.workNot;
				this.$refs.flowmapChild.getimage(this.dataid);
			},
			//当前责任人
			viewpepole(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.workNot;
				this.$refs.vewPopleChild.getvewPople(this.dataid);
			},
			requestData(index) {//高级查询字段
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				};
				
				var url = this.basic_url + '/api-apps/app/product';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false
					} else {
						this.loadSign = true
					}
					this.commentArr[this.page.currentPage] = res.data.data
					let newarr = []
					for(var i = 1; i <= totalPage; i++) {
						if(typeof(this.commentArr[i]) != 'undefined' && this.commentArr[i].length > 0) {
							for(var j = 0; j < this.commentArr[i].length; j++) {
								newarr.push(this.commentArr[i][j])
							}
						}
					}
					this.productList = newarr;
				}).catch((wrong) => {})
				//受检企业
				this.$axios.get(this.basic_url + '/api-apps/app/customer', {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;	
					//总的页数
					let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
					if(this.page.currentPage >= totalPage){
						 this.loadSign = false
					}else{
						this.loadSign=true
					}
					this.commentArr[this.page.currentPage]=res.data.data
					let newarr=[]
					for(var i = 1; i <= totalPage; i++){
					
						if(typeof(this.commentArr[i])!='undefined' && this.commentArr[i].length>0){
							
							for(var j = 0; j < this.commentArr[i].length; j++){
								newarr.push(this.commentArr[i][j])
							}
						}
					}					
					this.customerList = newarr;
				}).catch((wrong) => {})
			},
		},
		mounted() {
			this.requestData();
			this.getCompany();
		},
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