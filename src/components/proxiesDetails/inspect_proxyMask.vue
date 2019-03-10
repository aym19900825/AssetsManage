<template>
	<div>
<<<<<<< HEAD
		<div class="headerbg">
			<vheader></vheader>
			<navs_header ref="navsheader"></navs_header>
		</div>
		<div class="contentbg">
			<!--左侧菜单内容显示 Begin-->
			<navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
			<!--左侧菜单内容显示 End-->
			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content">
				<div class="ibox-content">
					<!--按钮操作行 Begin-->
					<div class="fixed-table-toolbar clearfix">
						<div class="bs-bars pull-left">
							<div class="hidden-xs" id="roleTableToolbar" role="group">
							<button type="button" class="btn btn-green" @click="openAddMgr" id="">
	                        	<i class="icon-add"></i>添加
	              			</button>
							<button type="button" class="btn btn-blue button-margin" @click="modify">
							    <i class="icon-edit"></i>修改
							</button>
							<button type="button" class="btn btn-red button-margin" @click="deluserinfo">
							    <i class="icon-trash"></i>删除
							</button>
							<button type="button" class="btn btn-red button-margin" @click="physicsDel">
							    <i class="icon-trash"></i>物理删除
							</button>
							<el-dropdown size="small" split-button type="primary" style="margin-top:1px;">
    								导入
								<el-dropdown-menu slot="dropdown">
    								<el-dropdown-item>
    									<div @click="download">下载模版</div>
    								</el-dropdown-item>
    								
    								<el-dropdown-item>
									<el-upload
							          ref="upload"
							          class="upload"
							          :action="uploadUrl()"
							          :on-success="handleSuccess"
							          :limit=1
							          multiple
							          method:="post"
									  :file-list="fileList">
									          <div>上传</div>
									</el-upload>
    								</el-dropdown-item>
						  		</el-dropdown-menu>
							</el-dropdown>
					
							<button type="button" class="btn btn-primarys button-margin" @click="exportData">
							    <i class="icon-download-cloud"></i>导出
							</button>
							<button type="button" class="btn btn-primarys button-margin" @click="Printing">
							    <i class="icon-print"></i>打印
							</button>
							<button type="button" class="btn btn-primarys button-margin" @click="reportdata">
							    <i class="icon-clipboard"></i>报表
							</button>
							<button type="button" class="btn btn-primarys button-margin" @click="Configuration">
							    <i class="icon-cpu"></i>配置关系
							</button>
								<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
					    		<i class="icon-search"></i>高级查询
					    		<i class="icon-arrow1-down" v-show="down"></i>
					    		<i class="icon-arrow1-up" v-show="up"></i>
							</button>
							</div>
						</div>
						<div class="columns columns-right btn-group pull-right">
							<div id="refresh" title="刷新" class="btn btn-default btn-refresh">
								<i class="icon-refresh"></i>
							</div>
							<tableControle :tableHeader="tableHeader" :checkedName="checkedName" @tableControle="tableControle" ref="tableControle"></tableControle>
						</div>
					</div>
					<!--按钮操作行 End-->

					<!-- 高级查询划出 Begin-->
					<div v-show="search">
						<el-form :model="searchList" label-width="45px">
							<el-row :gutter="10">
								<el-col :span="5">
									<el-form-item label="编码" prop="NUM">
										<el-input v-model="searchList.NUM"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="名称" prop="TYPE">
										<el-input v-model="searchList.TYPE"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="版本" prop="VERSION">
										<el-input v-model="searchList.VERSION"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="机构" prop="DEPTID">
										<el-select clearable v-model="searchList.DEPTID" filterable allow-create default-first-option placeholder="请选择">
										    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
									<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;    margin-left: 2px">重置</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<!-- 高级查询划出 End-->
					<el-row :gutter="0">
						<el-col :span="24">
							<!-- 表格 Begin-->

							<el-table ref="table" :header-cell-style="rowClass" :data="categoryList" v-loading="loading"  element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)" border stripe :height="fullHeight" style="width: 100%; overflow:scroll;" :default-sort="{prop:'categoryList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
								<el-table-column type="selection" fixed width="55" v-if="this.checkedName.length>0" align="center">
								</el-table-column>
								<el-table-column label="编码" width="155" sortable prop="NUM" v-if="this.checkedName.indexOf('编码')!=-1">
									<template slot-scope="scope">
										<p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.NUM}}
										</p>
									</template>
								</el-table-column>
								<el-table-column label="名称" sortable prop="TYPE" v-if="this.checkedName.indexOf('名称')!=-1">
								</el-table-column>
								<!--<el-table-column label="信息状态" width="155" sortable v-if="this.checkedName.indexOf('信息状态')!=-1">
 								<template slot-scope="scope" >
 									<span v-text="scope.row.STATUS=='1'?'活动':'不活动'"></span>
 								</template>
							</el-table-column>-->
								<el-table-column label="版本" width="100" sortable prop="VERSION" v-if="this.checkedName.indexOf('版本')!=-1" align="right">
								</el-table-column>
								<el-table-column label="机构" width="185" sortable prop="DEPTIDDesc" v-if="this.checkedName.indexOf('机构')!=-1">
								</el-table-column>
								<el-table-column label="录入时间" width="120" prop="ENTERDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('录入时间')!=-1">
								</el-table-column>
								<el-table-column label="修改时间" width="120" prop="CHANGEDATE" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('修改时间')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination background class="pull-right pt10" v-if="this.checkedName.length>0" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
							</el-pagination>
							<!-- 表格 End-->
						</el-col>
					</el-row>
				</div>
			</div>
			<!--右侧内容显示 End-->
			<categorymask :CATEGORY="CATEGORY" ref="categorymask" @request="requestData" @reset="reset" v-bind:page=page></categorymask>
			<!--报表-->
			<reportmask :reportData="reportData" ref="reportChild" ></reportmask>
=======
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加检验委托书</div>
					<div class="mask_title" v-show="modifytitle">修改检验委托书</div>
					<div class="mask_title" v-show="viewtitle">查看检验委托书</div>
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
					<el-form :model="dataInfo" :label-position="labelPositions" :rules="rules" ref="dataInfo"  inline-message  class="demo-ruleForm">
						<div class="text-center" v-show="viewtitle">
							<span v-if="this.dataInfo.STATUS!=3">
								<el-button id="start" type="success" round plain size="mini" @click="startup" v-show="start"><i class="icon-start"></i> 启动流程</el-button>
								<el-button id="approval" type="warning" round plain size="mini" @click="approvals" v-show="approval"><i class="icon-edit-3"></i> 审批</el-button>
							</span>
							<el-button type="primary" round plain size="mini" @click="flowmap"><i class="icon-git-pull-request"></i> 流程地图</el-button>
							<el-button type="primary" round plain size="mini" @click="flowhistory"><i class="icon-plan"></i> 流程历史</el-button>
							<el-button type="primary" round plain size="mini" @click="viewpepole"><i class="icon-user"></i> 当前责任人</el-button>
						</div>
						<div class="content-accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="委托单位" name="1">
									<el-row :gutter="5" class="pb10">
										<el-col :span="3" class="pull-right">
											<el-input v-model="dataInfo.VERSION" :disabled="edit">
												<template slot="prepend">版本</template>
											</el-input>
										</el-col>
										<el-col :span="4" class="pull-right">
											<el-input v-model="dataInfo.STATUSDesc" :disabled="edit">
												<template slot="prepend">状态</template>
											</el-input>
										</el-col>
										<el-col :span="4" class="pull-right">
											<el-input v-model="dataInfo.TYPEDesc" :disabled="edit">
												<template slot="prepend">类别</template>
											</el-input>
										</el-col>
										<el-col :span="5" class="pull-right">
											<el-input v-model="dataInfo.PROXYNUM" :disabled="edit" placeholder="自动生成">
												<template slot="prepend">编号</template>
											</el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="名称" prop="V_NAME" label-width="110px">
												<el-input v-model="dataInfo.V_NAME" :disabled="edit" width="100%">
													<el-button slot="append" icon="el-icon-search" @click="getCustomer('vname')">
													</el-button>
												</el-input>

											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="地址" prop="V_ADDRESS" label-width="110px">
												<el-input v-model="dataInfo.V_ADDRESS" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="邮编" prop="V_ZIPCODE" label-width="110px">
												<el-input v-model="dataInfo.V_ZIPCODE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row >
										<el-col :span="8">
											<el-form-item label="姓名" prop="V_PERSON" label-width="110px">
												<el-input v-model="dataInfo.V_PERSON" :disabled="edit">
													 <el-button slot="append" icon="el-icon-search" @click="addname"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="电话" prop="V_PHONE" label-width="110px">
												<el-input v-model="dataInfo.V_PHONE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="样品" name="2" >
										<el-row >
											<el-col :span="8">
												<el-form-item label="名称" prop="ITEM_NAME" label-width="110px">
													<el-input v-model="dataInfo.ITEM_NAME" :disabled="edit">
														<el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="addsample('inspect_proxy')"></el-button>
													</el-input>
												</el-form-item>
											</el-col>
										
											<el-col :span="8">
												<el-form-item label="型号" prop="ITEM_MODEL" label-width="110px">
													<el-input v-model="dataInfo.ITEM_MODEL" :disabled="edit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="数量" prop="ITEM_QUALITY" label-width="110px">
													<el-input v-model.number="dataInfo.ITEM_QUALITY" :disabled="edit">
													</el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row >
											<el-col :span="8">
												<el-form-item label="样品信息状态" prop="ITEM_STATUSDesc" label-width="110px">
													<el-input v-model="dataInfo.ITEM_STATUSDesc" :disabled="edit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="标识" prop="ITEM_ID" label-width="110px">
													<el-input v-model="dataInfo.ITEM_ID" :disabled="edit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8" >
												<el-form-item label="承检单位" prop="R_VENDORDesc"  label-width="110px">
													<el-input v-model="dataInfo.R_VENDORDesc" :disabled="edit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="保密要求" prop="ITEM_SECRECY" label-width="110px">
													<el-input v-model="dataInfo.ITEM_SECRECY" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="10">
												<el-form-item label="取样方式" prop="ITEM_METHOD" label-width="110px">
													<el-radio-group v-model="dataInfo.ITEM_METHOD" :disabled="noedit">
														<el-radio label="委托方送样"></el-radio>
														<el-radio label="抽样"></el-radio>
														<el-radio label="其他"></el-radio>
													</el-radio-group>
												</el-form-item>
											</el-col>
											<el-col :span="14">
												<el-form-item label="检后处理" prop="ITEM_DISPOSITION" label-width="110px">
													<el-radio-group v-model="dataInfo.ITEM_DISPOSITION" :disabled="noedit">
														<el-radio label="自提"></el-radio>
														<el-radio label="邮寄"></el-radio>
														<el-radio label="报废"></el-radio>
														<el-radio label="本中心处理"></el-radio>
													</el-radio-group>
												</el-form-item>
											</el-col>
										</el-row>
								</el-collapse-item>
								<el-collapse-item title="检验" name="3">
									<el-row>
									<el-col :span="8">
										<el-form-item label="完成日期" prop="COMPDATE" label-width="140px">
											<el-date-picker v-model="dataInfo.COMPDATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="完成方式" prop="COMPMODE" label-width="110px">
											<el-radio-group v-model="dataInfo.COMPMODE" :disabled="noedit">
												<el-radio label="加急" class="red"></el-radio>
												<el-radio label="正常"></el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									</el-row>
										<el-form-item label="抽样方案/判定依据" prop="REMARKS" label-width="140px">
											<el-input v-model="dataInfo.REMARKS" :disabled="noedit"></el-input>
										</el-form-item>
								</el-collapse-item>
								<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
									<el-tabs v-model="activeName" @tab-click="handleClick">
									    <el-tab-pane label="检验依据" name="first">
											<div class="table-func table-funcb">
												<el-button type="primary" size="mini" round @click="basisleadbtn('maintable')">
													<i class="icon-search"></i>
													<font>选择</font>
												</el-button>
											</div>
											<div>
												<el-row>
												    <el-col :span="8" >
														<el-form-item label="产品类别" prop="PRODUCT_TYPE"  label-width="80px">
															<el-input v-model="dataInfo.PRODUCT_TYPE" :disabled="true">
															</el-input>
														</el-form-item>
													</el-col>
													<el-col :span="8">
														<el-form-item label="产品名称" prop="PRODUCT" label-width="80px">
															<el-input v-model="dataInfo.PRODUCT" :disabled="true">
															</el-input>
														</el-form-item>
													</el-col>
												</el-row>`
											</div>
											<el-table :data="dataInfo.INSPECT_PROXY_BASISList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.INSPECT_PROXY_BASISList', order: 'descending'}">
												<el-table-column prop="S_NUM" label="标准编号" sortable width="150px">
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_BASISList.'+scope.$index + '.S_NUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.S_NUM" placeholder="请输入">
															   <el-button slot="append" icon="el-icon-search"></el-button>
														</el-input>
														<span v-else>{{scope.row.S_NUM}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<el-table-column prop="S_DESC" label="标准内容" sortable>
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_BASISList.'+scope.$index + '.S_DESC'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.S_DESC" placeholder="请输入">	
														</el-input>
														<span v-else>{{scope.row.S_DESC}}</span>
														</el-form-item>
													</template>
												</el-table-column>												
												<el-table-column prop="VERSION" label="版本" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_BASISList.'+scope.$index + '.VERSION'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入">
														</el-input>
														<span v-else>{{scope.row.VERSION}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												
												<el-table-column fixed="right" label="操作" width="120px">
													<template slot-scope="scope">
														<el-button @click.native.prevent="deleteRow(scope.$index,scope.row,'basisList')" type="text" size="small" v-if="!viewtitle">
															 <i class="icon-trash red"></i>
														</el-button>
													</template>
												</el-table-column>
											</el-table>
									    </el-tab-pane>
									    <el-tab-pane label="检验项目与要求" name="second">
											<div class="table-func table-funcb">
												<el-button type="primary" size="mini" round @click="basisleadbtn2('maintable')">
													<i class="icon-search"></i>
													<font>选择</font>
												</el-button>
											</div>
	                                        
											<el-table :data="dataInfo.INSPECT_PROXY_PROJECList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.INSPECT_PROXY_PROJECList', order: 'descending'}">									
												<el-table-column prop="P_NUM" label="检验项目编号" sortable width="120px">
													<template slot-scope="scope">
													<el-form-item :prop="'INSPECT_PROXY_PROJECList.'+scope.$index + '.P_NUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_NUM" placeholder="请输入">
															   <el-button slot="append" icon="el-icon-search"></el-button>
														</el-input>
														<span v-else>{{scope.row.P_NUM}}</span>
													</el-form-item>	
													</template>
												</el-table-column>

												<el-table-column prop="P_DESC" label="检验项目描述" sortable>
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_PROJECList.'+scope.$index + '.P_DESC'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_DESC" placeholder="请输入">
														</el-input>
														<span v-else>{{scope.row.P_DESC}}</span>
														</el-form-item>	
													</template>
												</el-table-column>

												<el-table-column prop="REMARKS" label="要求" sortable>
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_PROJECList.'+scope.$index + '.REMARKS'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-input size="small" v-model="scope.row.REMARKS" placeholder="请输入">		
															</el-input>
														</el-form-item>	
													</template>
												</el-table-column>
												<el-table-column prop="INSPECT_GROUP" label="专业组" sortable>
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_PROJECList.'+scope.$index + '.INSPECT_GROUP'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-select clearable v-model="scope.row.INSPECT_GROUP" placeholder="请选择" :disabled="noedit" @visible-change="visablemaingroup($event)" >
																<el-option v-for="data in maingroup" :key="data.id" :value="data.id" :label="data.fullname"></el-option>
															</el-select>
														</el-form-item>	
													</template>
												</el-table-column>

												<!--<el-table-column prop="STATUS" label="信息状态" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_BASISList.'+scope.$index + '.STATUS'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入要求">
														</el-input>
														<span v-else>{{scope.row.STATUS}}</span>
													</el-form-item>
													</template>
												</el-table-column>-->

												<el-table-column prop="VERSION" label="项目版本" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_PROJECList.'+scope.$index + '.VERSION'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入">
														</el-input>
														<span v-else>{{scope.row.VERSION}}</span>
														</el-form-item>	
													</template>
												</el-table-column>
												<el-table-column fixed="right" label="操作" width="120">
													<template slot-scope="scope">
														<el-button @click.native.prevent="deleteRow(scope.$index,scope.row,'projectList')" type="text" size="small" v-if="!viewtitle">
														 <i class="icon-trash red"></i>
														</el-button>
													</template>
												</el-table-column>
											</el-table>
									    </el-tab-pane>
									    <el-tab-pane label="分包要求" name="third">
									    	<div class="table-func table-funcb">
												<el-button type="success" size="mini" round @click="addcheckProCont"  v-show="!viewtitle">
													<i class="icon-add"></i>
													<font>新建行</font>
												</el-button>
											</div>

											<el-table :data="dataInfo.CHECK_PROXY_CONTRACTList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.CHECK_PROXY_CONTRACTList', order: 'descending'}">

												<el-table-column prop="iconOperation" fixed label="" width="50px" v-if="!viewtitle">
													<template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else></i></template>
												</el-table-column>


												<el-table-column prop="PROXY_CONTRACT_NUM" label="分包协议编号" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.PROXY_CONTRACT_NUM'" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXY_CONTRACT_NUM" :disabled="true" placeholder="自动生成">
														</el-input>
														<span v-else>{{scope.row.PROXY_CONTRACT_NUM}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column prop="V_NAME" label="委托单位" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.V_NAME">
														</el-input>
														<span v-else>{{scope.row.V_NAME}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="PROXYNUM" label="委托书编号" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXYNUM" placeholder="自动生成">
														</el-input>
														<span v-else>{{scope.row.PROXYNUM}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="INSPECT_GROUP" label="专业组" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.INSPECT_GROUP'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-select  clearable v-model="scope.row.INSPECT_GROUP" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit" @visible-change="visablemaingroup($event)" >
																<el-option v-for="data in maingroup" :key="data.id" :value="data.id" :label="data.fullname"></el-option>
															</el-select>
														</el-form-item>	
													</template>
												</el-table-column>
												<el-table-column prop="VENDORDesc" label="分包方名称" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.VENDORDesc">
															<el-button slot="append" icon="el-icon-search" @click="getDept(scope.row)">
															</el-button>
														</el-input>
														<span v-else>{{scope.row.VENDORDesc}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="depttypeName" label="机构属性" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.depttypeName" placeholder="">
														</el-input>
														<span v-else>{{scope.row.depttypeName}}</span>
													</template>
												</el-table-column>

												<el-table-column prop="PRODUCT_TYPE" label="产品类别" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.PRODUCT_TYPE">
															<el-button slot="append" icon="el-icon-search" @click="addcategory(scope.row)">
															</el-button>
														</el-input>
														<span v-else>{{scope.row.PRODUCT_TYPE}}</span>
													</template>
												</el-table-column>

												<el-table-column prop="PRODUCT" label="产品名称" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.PRODUCT">
															<el-button slot="append" icon="el-icon-search" @click="addproduct(scope.row)">
															</el-button>
														</el-input>
														<span v-else>{{scope.row.PRODUCT}}</span>
													</template>
												</el-table-column>

												<el-table-column prop="BASIS" label="检验检测技术依据" sortable width="150px">
													<template slot-scope="scope">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.BASIS" placeholder="请输入">
															<el-button slot="append" icon="el-icon-search" @click="basisleadbtn(scope.row)">
															</el-button>
														</el-input>
														<span v-else>{{scope.row.BASIS}}</span>
													</template>
												</el-table-column>

												<el-table-column prop="P_REMARKS" label="检验项目内容" sortable width="200px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.P_REMARKS'" :rules="[{required: true, message: '请输入', trigger: 'change'}]" >
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_REMARKS" placeholder="请输入">
																<el-button slot="append" icon="el-icon-search" @click="basisleadbtn2(scope.row)">
																</el-button>
															</el-input>
														<span v-else>{{scope.row.P_REMARKS}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column prop="REQUIRES" label="对环境和操作人员要求" sortable width="220px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.REQUIRES'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REQUIRES" placeholder="请输入内容"></el-input>
														<span v-else>{{scope.row.REQUIRES}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column prop="Q_TYPE" label="对分包报告/证书的要求" sortable width="220px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.Q_TYPE'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.Q_TYPE" placeholder="请输入内容"></el-input>
														<span v-else>{{scope.row.Q_TYPE}}</span>
														</el-form-item>
													</template>
												</el-table-column>
								
												<el-table-column prop="CHECKCOST" label="检验费用" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.CHECKCOST'" :rules="[{required: true, message: '请输入数字', trigger: 'change'}]" >
															<el-input v-if="scope.row.isEditing" id="testprice" @blur="testPrice(scope.row)" size="small" v-model="scope.row.CHECKCOST" placeholder="请输入内容"></el-input>
															<span v-else>{{scope.row.CHECKCOST}}</span>
														</el-form-item>
													</template>
												</el-table-column>
														<!--<el-table-column prop="STATUS" label="信息状态" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.STATUS'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入要求"></el-input>
														<span v-else>{{scope.row.STATUS}}</span>
														</el-form-item>
													</template>
												</el-table-column>-->

												<el-table-column fixed="right" label="操作" width="120">
													<template slot-scope="scope">
														<el-button @click.native.prevent="deleteRow(scope.$index,scope.row,'requestList')" type="text" size="small" v-if="!viewtitle">
															 <i class="icon-trash red"></i>
														</el-button>
													</template>
												</el-table-column>
											</el-table>
									    </el-tab-pane>
									</el-tabs>
								</div>
								<el-collapse-item name="7">
									<el-row>
										<el-col :span="8">
											<el-form-item label="检验报告编号" prop="REPORT_NUM" label-width="110px">
												<el-input v-model="dataInfo.REPORT_NUM" :disabled="noedit" ></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="格式" prop="REPORT_FOMAT" label-width="110px">
												<el-radio-group v-model="dataInfo.REPORT_FOMAT" :disabled="noedit">
													<el-radio label="认证中心"></el-radio>
													<el-radio label="国家中心"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="标识" prop="CNAS_OR_CMA_ID" label-width="110px">
												<el-radio-group v-model="dataInfo.CNAS_OR_CMA_ID" :disabled="noedit">
													<el-radio label="CNAS"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="交委托方份数" prop="REPORT_QUALITY" label-width="110px">
												<el-input v-model.number="dataInfo.REPORT_QUALITY" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="发送方式" prop="REPORT_MODE" label-width="110px">
												<el-radio-group v-model="dataInfo.REPORT_MODE" :disabled="noedit">
													<el-radio label="自提"></el-radio>
													<el-radio label="邮寄"></el-radio>
													<el-radio label="其他"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="付款方式" prop="PAYMENT_METHOD" label-width="110px">
												<el-select v-model="dataInfo.PAYMENT_METHOD" placeholder="请选择" style="width: 100%;" :disabled="noedit">
													<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
									    <el-col :span="16">
										<el-form-item label="生产单位名称" prop="P_NAME" label-width="110px">
											<el-input v-model="dataInfo.P_NAME" :disabled="edit" >
												<el-button slot="append" icon="el-icon-search" @click="getCustomer('pname')"></el-button>
											</el-input>
										</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="检验收费(元)" prop="CHECK_COST" label-width="110px">
												<el-input  v-model="dataInfo.CHECK_COST" id="cost" @blur="toPrice" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>	
									<el-row>
										<el-col :span="8">
											<el-form-item label="实收费用(元)" prop="ACTUALCOST" label-width="110px">
												<el-input  v-model="dataInfo.ACTUALCOST" id="actualcost"  @blur="actualPrice" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="实收比例" prop="ACTUAL_PERCENT" label-width="110px">
												<el-input v-model="dataInfo.ACTUAL_PERCENT" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="标准费用(元)" prop="CONTRACTCOST" label-width="110px">
												<el-input  v-model="dataInfo.CONTRACTCOST" id="stacost"  @blur="staPrice" disabled></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="我方经办人" prop="OURAGENT"  label-width="110px">
												<el-input v-model="dataInfo.OURAGENT" disabled></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="我方签办人" prop="OUR_SIGNATORY" label-width="110px">
												<el-input v-model="dataInfo.OUR_SIGNATORY" disabled></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="对方签办人" prop="OPPOSITE_AGENT" label-width="110px">
												<el-input v-model="dataInfo.OPPOSITE_AGENT" disabled></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<!--<el-col :span="8">
											<el-form-item label="信息状态" prop="MESSSTATUS">
												<el-input v-model="dataInfo.MESSSTATUS"></el-input>
											</el-form-item>
										</el-col>-->
										
										<!-- <el-col :span="8" style="display:none;" label-width="110px">
											<el-form-item label="生产单位编号" prop="PRODUCT_UNIT">
												<el-input v-model="dataInfo.PRODUCT_UNIT" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col> -->
										<el-col :span="8">
											<el-form-item label="合同编号" prop="CONTRACTNUM"  label-width="110px">
												<el-input v-model="dataInfo.CONTRACTNUM" disabled></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="主检组" prop="MAINGROUP"  label-width="110px">
												<el-select v-model="dataInfo.MAINGROUP" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit"  @change="getmaingroup($event)" style="width: 100%;">
													<el-option v-for="(data,index) in maingroup" :key="index" :value="data.id" :label="data.fullname"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="主检负责人" prop="LEADER" label-width="110px">
												<el-select v-model="dataInfo.LEADER" filterable allow-create default-first-option placeholder="请选择" @change="setLeader">
													<el-option v-for="(data,index) in leaderdata" :key="index" :value="data.id" :label="data.username"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>	
									<el-row>	
										<el-col :span="24">
											<el-form-item label="备注" prop="MEMO" label-width="110px">
												<el-input type="textarea" rows="5" v-model="dataInfo.MEMO" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="其他" name="8" v-show="views">
									<div class="accordion-body tab-content">
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
										<el-row >
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
									</div>
								</el-collapse-item>
								
							</el-collapse>
						</div>
						<div class="content-footer" v-show="noviews">
							<el-button type="primary" @click="save('Update')">保存</el-button>
							<el-button type="success"  v-show="addtitle" @click="save('Submit')">保存并继续</el-button>
							<el-button v-show="modifytitle" type="btn btn-primarys" @click="modifyversion">修订</el-button>
							<el-button @click='close'>取消</el-button>
						</div>
						<div class="content-footer" v-show="views">
							<el-button type="success" v-if="this.dataInfo.STATUS == 3" @click="build">生成工作任务单</el-button>
						</div>
					</el-form>
				</div>
			</div>
			<!-- 分包方名称 -->
			<el-dialog :modal-append-to-body="false" title="分包方名称" :visible.sync="dialogVisible" width="30%" :before-close="handleClose1">
				<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" default-expand-all @node-click="handleNodeClick" @check-change="handleClicks" check-strictly>
				</el-tree>
				<div slot="footer">
			       <el-button type="primary" @click="queding">确 定</el-button>
			       <el-button @click="resetBasisInfo1">取 消</el-button>
			    </div>
			</el-dialog>
			<!-- 客户联系人\姓名 Begin -->
			<el-dialog :modal-append-to-body="false" title="客户联系人" :visible.sync="dialogVisibleuser" width="80%" :before-close="handleClose2">
				<el-table :header-cell-style="rowClass" :data="CUSTOMER_PERSONList" row-key="ID" border stripe max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @selection-change="SelChange" @cell-click="iconOperation" :default-sort="{prop:'CUSTOMER_PERSONList', order: 'descending'}" v-loadmore="loadMore"
				v-loading="loading" 
				element-loading-text="加载中…"
				element-loading-spinner="el-icon-loading"
				element-loading-background="rgba(255, 255, 255, 0.9)">
					<el-table-column type="selection" width="55" fixed align="center">
					</el-table-column>
					<el-table-column label="联系人" sortable width="150px" prop="PERSON">
					</el-table-column>
					<el-table-column prop="PHONE" label="联系电话" sortable width="150px">
					</el-table-column>
					<el-table-column prop="FAX" label="传真" sortable width="150px">
					</el-table-column>
					<el-table-column prop="EMAIL" label="邮箱" sortable>
					</el-table-column>
				</el-table>
				
				<el-pagination background class="text-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>

				<div slot="footer">
			       <el-button type="primary" @click="addcusname">确 定</el-button>
			       <el-button @click="resetBasisInfo2">取 消</el-button>
			    </div>
			</el-dialog>
			<!-- 客户联系人 End -->
			<!-- 样品名称  -->
			<sampletmask ref="samplechild" @showData="showData" @appenddes="appenddes" @appendmod="appendmod" @appendqua="appendqua" @linedata="linedata"></sampletmask>
			<!--受检企业-->
			<enterprisemask ref="enterprisechild" @appendname="appendname" @appendadd="appendadd" @appendzip="appendzip" @appendnames="appendnames" @appendid="appendid"></enterprisemask>
			<!--审批页面-->
			<approvalmask :approvingData="approvingData" ref="approvalChild"  @detail="detailgetData"></approvalmask>
			<!--流程历史-->
			<flowhistorymask :approvingData="approvingData"  ref="flowhistoryChild" ></flowhistorymask>
			<!--流程地图-->
			<flowmapmask :approvingData="approvingData" ref="flowmapChild" ></flowmapmask>
			<!--当前责任人-->
			<vewPoplemask :approvingData="approvingData"  ref="vewPopleChild" ></vewPoplemask>
			<!-- 机构  -->
			<deptmask ref="deptchild" @deptdata = "deptdata"></deptmask>
			<!-- 产品类别  -->
			<categorymask ref="categorychild" @categorydata="categorydata"></categorymask>
			<!-- 产品名称  -->
			<productmask ref="productchild" @appenddata="appenddata"></productmask>
			<!-- 检验依据  -->
			<teststandardmask ref="standardchild" @testbasis="addbasis" @testbasisnum="testbasisnum" @testbasisname="testbasisname" @testbasisprover="testbasisprover"></teststandardmask>
			<!-- 检验项目  -->
			<testprojectmask ref="projectchild" @testproject="addproject" @testprojectnum="testprojectnum" @testprojectid="testprojectid" @testprojectname="testprojectname" @testprojectprover = "testprojectprover"></testprojectmask>
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
		</div>
	</div>
</template>
<script>
<<<<<<< HEAD
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_header from '../common/nav_tabs.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import categorymask from '../maindataDetails/product_categoryMask.vue'
	import tableControle from '../plugin/table-controle/controle.vue'
	import reportmask from'../reportDetails/reportMask.vue'
=======
	// import { Loading } from 'element-ui'
	import Config from '../../config.js';
	import sampletmask from '../common/common_mask/samplemask.vue'//样品名称
	import enterprisemask from '../common/common_mask/enterprisemask.vue'//企业
	import approvalmask from '../workflow/approving.vue'
	import flowhistorymask from '../workflow/flowhistory.vue'
	import flowmapmask from '../workflow/flowmap.vue'
	import vewPoplemask from '../workflow/vewPople.vue'
	import deptmask from '../common/common_mask/deptmask.vue'//机构
	import categorymask from '../common/common_mask/categorylistmask.vue'//产品类别
	import productmask from '../common/common_mask/productlistmask.vue'//产品
	import teststandardmask from '../common/common_mask/teststandardmask.vue'//检验依据
	import testprojectmask from '../common/common_mask/testprojectmask.vue'//检验依据
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
	export default {
		name: 'customer_management',
		components: {
<<<<<<< HEAD
			vheader,
			navs_left,
			navs_header,
			categorymask,
			tableControle,
			reportmask,
		},
		data() {
			return {
				reportData:{},//报表的数据
				scroll_old:0,
				// up2down:'down',
				reportData:{},//报表的数据
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				commentArr: {},
				loading: false,//默认加载数据时显示loading动画
				fileList:[],
				value: '',
				productType:'productType',//appname
				searchData: {
					page: 1,
					limit: 20, //分页显示数
					nickname: '',
					enabled: '',
					searchKey: '',
					searchValue: '',
					companyId: '',
					deptId: ''
				},
				checkedName: [
					'编码',
					'名称',
					'版本',
					'机构',
					// '信息状态',
					'录入时间',
					'修改时间'
				],
				tableHeader: [{
						label: '编码',
						prop: 'NUM'
					},
					{
						label: '名称',
						prop: 'TYPE'
					},
					{
						label: '版本',
						prop: 'VERSION'
					},
					{
						label: '机构',
						prop: 'DEPARTMENTDesc'
					},
					// {
					// 	label: '信息状态',
					// 	prop: 'STATUS'
					// },
					{
						label: '录入时间',
						prop: 'ENTERDATE'
					},
					{
						label: '修改时间',
						prop: 'CHANGEDATE'
					}
				],
				selUser: [],
				categoryList: [],
				search: false,
=======
			 approvalmask,
			 flowhistorymask,
			 flowmapmask,
			 vewPoplemask,
			 sampletmask,
			 enterprisemask,
			 deptmask,
			 categorymask,
			 productmask,
			 teststandardmask,
			 testprojectmask
		},
		data() {
			var validate = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			var validateVname = (rule, value, callback) => {//名称
                if (this.dataInfo.V_NAME === undefined || this.dataInfo.V_NAME === '' || this.dataInfo.V_NAME === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateVaddress = (rule, value, callback) => {//地址
                if (this.dataInfo.V_ADDRESS === undefined || this.dataInfo.V_ADDRESS === '' || this.dataInfo.V_ADDRESS === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateVzipcode = (rule, value, callback) => {//邮编
                if (this.dataInfo.V_ZIPCODE === undefined || this.dataInfo.V_ZIPCODE === '' || this.dataInfo.V_ZIPCODE === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateVperson = (rule, value, callback) => {//联系人姓名
                if (this.dataInfo.V_PERSON === undefined || this.dataInfo.V_PERSON === '' || this.dataInfo.V_PERSON === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateVphone = (rule, value, callback) => {//联系人电话
                if (this.dataInfo.V_PHONE === undefined || this.dataInfo.V_PHONE === '' || this.dataInfo.V_PHONE === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateItemname = (rule, value, callback) => {//样品名称
                if (this.dataInfo.ITEM_NAME === undefined || this.dataInfo.ITEM_NAME === '' || this.dataInfo.ITEM_NAME === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validatePname = (rule, value, callback) => {//生产单位名称
                if (this.dataInfo.P_NAME === undefined || this.dataInfo.P_NAME === '' || this.dataInfo.P_NAME === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
            //var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
            //金额验证
            var price=(rule, value, callback) => {//生产单位名称 
				var exp = /^(-)?\d{1,3}(,\d{3})*(.\d+)?$/;
				if(value != '' && value!=undefined){
					if(exp.test(value)==false){ 
	                    callback(new Error('请输入数字'));
	              }else{
	                    callback();
	                }
				}else {
					callback();
				}
           };
			return {
				approvingData:{},
				loading: false,
				loadSign:true,//加载
				commentArr:{},
				basic_url: Config.dev_url,
				dataInfo: {
					MAINGROUP:'',
					LEADER:'',
					STATUS: '1',
					STATUSDesc:'草稿',
					VERSION:'1',
					TYPE:'1',//检验
					TYPEDesc:'检验',
					ITEM_NAME:'',
					VENDOR:'',
					R_VENDOR:'',
					R_VENDORDesc:'',
					ITEM_NAME:'',
					ITEM_MODEL:'',
					ITEM_QUALITY:'',
					ITEM_SECRECY:'',
					ITEM_METHOD:'',
					ITEM_DISPOSITION:'',
					P_NUM:'',
					PRO_NUM:'',
					PRODUCT_TYPE:'',
					PRODUCT:'',
					COMPDATE:'',
					COMPMODE:'',
					REMARKS:'',
					V_NAME:'',
					V_ADDRESS:'',
					V_ZIPCODE:'',
					P_NAME:'',
					INSPECT_PROXY_PROJECList: [],
					INSPECT_PROXY_BASISList: [],
					CHECK_PROXY_CONTRACTList: [
						{
							INSPECT_GROUP:'',	
							VENDOR: '',//承检单位
							VENDORDesc:'',//承检单位名称
							PT_NUM:'',//产品类别编号
							PRODUCT_TYPE:'',//产品类别
							PRO_NUM:'',//产品编号
							PRODUCT:'',//产品名称
							S_NUM:'',//检测依据编号
							BASIS: '',//检测依据
							PROJ_NUM:'',//检测项目编号
							PROJECT_ID:'',//检测项目ID
							P_REMARKS: '',//检测项目
							P_VERSIONNUM:'',	//产品类别编号+版本
							PRO_VERSIONNUM:'',	//产品名称编号+版本
							S_VERSIONNUM:'',	//检验检测依据编号+版本
							PROJ_VERSIONNUM:'',	//检测项目编号+版本
						}
					],
				},
				gridDataList: [], //彈出框的數據
				page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				options: [{
					value: '现金',
					label: '现金'
				}, {
					value: '电汇',
					label: '电汇'
				}, {
					value: '支票',
					label: '支票'
				}, {
					value: '转账',
					label: '转账'
				}, {
					value: '其他',
					label: '其他'
				}],
				value: '',
				selval:[],
				edit: true, //禁填
				noedit: false,
				editSearch: '', //判斷項目負責人和接收人
				col_but1: true,
				col_but2: true,
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
				show: false,
				down: true,
				up: false,
<<<<<<< HEAD
				isShow: false,
				ismin: true,
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				searchList: { //点击高级搜索后显示的内容
					NUM:'',
					TYPE: '',
					VERSION:'',
					DEPTID: '',
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					categorymaskren: "subDepts",
					label: "simplename"
				},
				page: { //分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				CATEGORY: {},//修改子组件时传递数据
				selectData: [],
			}
=======
				type: '',
				datainfo:{},
				addtitle: true, //添加弹出框titile
				modifytitle: false, //修改弹出框titile
				viewtitle: false, //查看弹出框title
				views: false,
				noviews: true, //保存的按钮
				modify: false,
				start:false,
				approval:false,
				activeName: 'first',//tabs
				activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', ], //手风琴数量
				labelPosition: 'top', //表格
				labelPositions: 'right',
				rules: {
					V_NAME: [{ required: true, validator: validateVname}],//名称
					V_ADDRESS: [{ required: true,validator: validateVaddress}],//地址
					V_ZIPCODE: [{ required: true,validator: validateVzipcode}],//邮编
					V_PERSON: [{ required: true,validator: validateVperson}],//联系人姓名
					V_PHONE: [{ required: true,validator: validateVphone}],//联系人电话
					R_VENDOR: [{ required: true, message: '必填', trigger: 'blur' }],//责任单位
					// VENDOR: [{ required: true, message: '必填', trigger: 'blur' }],//委托单位编号
					P_NAME: [{ required: true,validator: validatePname}],//生产单位名称
					// PRODUCT_UNIT:[{required: true, message: '必填', trigger: 'blur'}],//生成单位编号
					ITEM_NAME: [{ required: true,validator: validateItemname}],//样品名称
					ITEM_ID: [{ required: true, message: '必填', trigger: 'blur' }],//标识
					ITEM_MODEL: [{ required: true, message: '必填', trigger: 'blur' }],//型号
					ITEM_QUALITY: [{ required: true, message: '必填', trigger: 'blur'},{ type: 'number', message: '请输入数字'}],//数量
//					ITEM_STATUS: [{ required: true, message: '必填', trigger: 'blur' }],//样品信息状态
					ITEM_SECRECY: [{ required: true, message: '必填', trigger: 'blur' }],//保密要求
					ITEM_METHOD: [{ required: true, message: '必填', trigger: 'change' }],//取样方式
					ITEM_DISPOSITION: [{ required: true, message: '必填', trigger: 'change' }],//检后处理
					REMARKS: [{ required: true, message: '必填', trigger: 'blur' }],//抽样方案/判定依据
					COMPDATE: [{ required: true, message: '必填', trigger: 'blur' }],//完成日期
					// PROXYNUM: [{ required: true, message: '必填', trigger: 'blur' }],//编号
					REPORT_QUALITY: [{ required: true, message: '必填', trigger: 'blur' },{ type: 'number', message: '请输入数字'}],//交委托方分数
					REPORT_MODE: [{ required: true, message: '必填', trigger: 'change' }],//发送方式
					REPORT_FOMAT: [{ required: true, message: '必填', trigger: 'change' }],//格式
					MAINGROUP: [{required: true, message: '必填', trigger: 'change' }],//主检组
					LEADER: [{required: true, message: '必填', trigger: 'change' }],//主检负责人
//					MEMO: [{ required: true, message: '必填', trigger: 'blur' }],//备注
					CHECK_COST:[{required: false,trigger: 'change',validator:price}],
					ACTUALCOST:[{trigger: 'blur',validator:price}],
					CONTRACTCOST:[{trigger: 'blur',  validator:price}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "children",
					label: "fullname"
				},
				dialogVisible: false, //对话框
				dialogVisibleuser:false,
				customid:"",
				dataid:'',//修改和查看带过的id
				inspectPro:'inspectPro',//appname
				CUSTOMER_PERSONList:[],//
				maingroup:[],//主检组
				selectData:[],//承建单位
				leaderdata:[],//主检负责人
				username:'',
				catenum:'',//产品类别作为参数传值给依据
				pronum:'',//产品作为参数传值给依据
				basisnum:'',////依据选中数据们字符串作为参数传值给项目
				deptindex:{},//分包方名称
				main:'',
				sendchilddata:[],//检测依据子表已有的值
			};
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
		},
		methods: {
			testbasis(){},
			handleNodeClick(data) { //获取勾选树菜单节点
			},
			handleClicks(data,checked, indeterminate) {
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
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
<<<<<<< HEAD
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
			//表格滚动加载
			loadMore() {
				//console.log(this.$refs.table.$el.offsetTop)
				let up2down = sessionStorage.getItem('up2down');
				if(this.loadSign) {					
					if(up2down=='down'){
						this.page.currentPage++;
						if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
							this.page.currentPage = Math.ceil(this.page.totalCount / this.page.pageSize)
							return false;
						}
						let append_height = window.innerHeight - this.$refs.table.$el.offsetTop - 50;
						if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
							$('.el-table__body-wrapper table').append('<div class="filing" style="height: '+append_height+'px;width: 100%;"></div>');
							sessionStorage.setItem('toBtm','true');
						}
					}else{
						sessionStorage.setItem('toBtm','false');
						this.page.currentPage--;
//						if($('.el-table__body-wrapper table').find('.filing').length>0){
//							$('.el-table__body-wrapper table').find('.filing').remove();
//							
//						}
						if($('.el-table__body-wrapper table').find('.filing').length>0){
							this.scrollTop = 20;
							$('.filing').height(20);
							console.log($('.filing').height());
							
						}
						if(this.page.currentPage < 1) {
							this.page.currentPage=1
							return false;
						}
					}
					this.loadSign = false;
					setTimeout(() => {
						this.loadSign = true
					}, 1000)
					this.requestData()
					
				}
			},
			tableControle(data) {
				this.checkedName = data;
=======
			},	
			toNum(str) {
				return str.replace(/\,|\￥/g, "");
			},
			//金额两位小数点千位分隔符，四舍五入
			testPrice(item){
				var money = item.CHECKCOST;
				var re = /^[0-9]+.?[0-9]*$/;
				if (!re.test(money)) {
			　　　　item.CHECKCOST = 0;
			　　　　return;
			　　}
				if(money == ''){
					return;
				}else{
					var num = parseFloat(this.toNum(money)).toFixed(2).toString().split(".");
					num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
					item.CHECKCOST = num.join(".");
				}
			},	
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			//所属上级
			getDept(item) {
				this.$refs.deptchild.visible(item);
				this.deptindex = item;
			},
			//取到分包方
			deptdata(value){
				this.deptindex.VENDOR = value[0];//id
				this.deptindex.VENDORDesc = value[1];//名称
				this.deptindex.depttype = value[2];//机构属性id
				this.deptindex.depttypeName = value[3];//机构属性名称
			},
			getCheckedNodes() {
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
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
			     this.requestData();
			   }
			 },	
			toNum(str) {
				return str.replace(/\,|\￥/g, "");
			},
			//金额两位小数点千位分隔符，四舍五入
			toPrice(){
				var money = document.getElementById("cost").value;
				// this.initcost = money;
				var num = parseFloat(this.toNum(money)).toFixed(2).toString().split(".");
				num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
				// this.dataInfo.CHECTCOST="￥" + num.join(".");
				this.dataInfo.CHECK_COST = num.join(".");
			},
			staPrice(){
				var money = document.getElementById("stacost").value;
				// this.initsta = money;
				var num = parseFloat(this.toNum(money)).toFixed(2).toString().split(".");
				num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
				// this.dataInfo.CHECTCOST="￥" + num.join(".");
				this.dataInfo.CONTRACTCOST = num.join(".");
			},
			actualPrice(){
				var money = document.getElementById("actualcost").value;
				var num = parseFloat(this.toNum(money)).toFixed(2).toString().split(".");
				num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
				this.dataInfo.ACTUALCOST = num.join(".");
			},
			reset() {					
				this.dataInfo={
					VERSION: '1',
					STATUS: '1',
					STATUSDesc:'草稿',
					ITEM_NAME:'',
					VENDOR:'',
					P_NUM:'',
					PRO_NUM:'',
					ITEM_NAME:'',
					ITEM_MODEL:'',
					ITEM_QUALITY:'',
					ITEM_SECRECY:'',
					ITEM_METHOD:'',
					ITEM_DISPOSITION:'',
					COMPDATE:'',
					COMPMODE:'',
					REMARKS:'',
					V_NAME:'',
					V_ADDRESS:'',
					V_ZIPCODE:'',
					P_NAME:'',
					LEADER:'',
					INSPECT_PROXY_PROJECList: [],
					INSPECT_PROXY_BASISList: [],
					CHECK_PROXY_CONTRACTList: [],
				};	  
				},
			handleClick(tab, event) {
		    },
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					row.isEditing = !row.isEditing;
				}
			},
			//生成工作任务单
			build(){
				var dataid = this.dataInfo.ID;
					var Url = this.basic_url + '/api-apps/app/inspectPro/operate/createWorkorder?ID='+dataid+'&fileUrl='+Config.file_url;
					this.$axios.get(Url, {}).then((res) => {
						if(res.data.resp_code == 0) {
							this.$message({
								message: '生成工作任务单成功',
								type: 'success'
							});
						}else{
							this.$message({
							message: '已经生成工作任务单，请勿重复生成',
							type: 'warning'
						});
						}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
			},
			sizeChange(val) {
				this.page.pageSize = val;
				if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
//					$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
					sessionStorage.setItem('toBtm','true');
				}else{
					sessionStorage.setItem('toBtm','false');
				}
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
//					$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
					sessionStorage.setItem('toBtm','true');
				}else{
					sessionStorage.setItem('toBtm','false');
				}
				this.requestData();
			},
			//重置
			resetbtn(){
				this.searchList = {
					NUM:'',
					TYPE: '',
					VERSION:'',
					DEPTID: '',
				};
				this.requestData();
			},
			//搜索
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.requestData();
			},
<<<<<<< HEAD
			//清空
			reset() {
				this.CATEGORY = {
					ID: '',
					NUM: '',
					TYPE: '',
					STATUS: '活动',
					VERSION: '1',
					DEPARTMENT: '',
					ENTERBY: '',
					ENTERDATE: '',
					CHANGEBY: '',
					CHANGEDATE: ''
=======
			addcheckProCont() {
				var obj = {
					PROXY_CONTRACT_NUM: '',
					PROXYNUM: '',
					V_NAME:this.dataInfo.V_NAME,
					INSPECT_GROUP:'',
					PROJECT_ID:'',
					VENDOR: '',//承检单位
					VENDORDesc:'',//承检单位名称
					depttype:'',//机构属性id
					depttypeName:'',//机构属性名称
					PT_NUM:'',//产品类别编号
					PRODUCT_TYPE:'',//产品类别
					PRO_NUM:'',//产品编号
					PRODUCT:'',//产品名称
					S_NUM:'',//检测依据编号
					BASIS: '',//检测依据
					PROJ_NUM:'',//检测项目编号
					P_REMARKS: '',//检测项目
					P_VERSIONNUM:'',	//产品类别编号+版本
					PRO_VERSIONNUM:'',	//产品名称编号+版本
					S_VERSIONNUM:'',	//检验检测依据编号+版本
					PROJ_VERSIONNUM:'',	//检测项目编号+版本
					REQUIRE: '',
					Q_TYPE: '',
					CHECKCOST: '',
					STATUS:'1',
					isEditing: true
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
				};
				if(this.$refs['CATEGORY'] !== undefined) {
					this.$refs['CATEGORY'].resetFields();
				}
			},
<<<<<<< HEAD
			//添加类别
			openAddMgr() {
				this.reset();
				this.$refs.categorymask.open(); // 方法1
				this.$refs.categorymask.visible();
				
			},
			//修改类别
			modify() {
				if(this.selUser.length == 0) {
					this.$message({
						message: '请您选择要修改的数据',
						type: 'warning'
					});
					return;
				} else if(this.selUser.length > 1) {
					this.$message({
						message: '不可同时修改多个数据',
						type: 'warning'
					});
					return;
				} else {
					this.CATEGORY = this.selUser[0];
					this.$refs.categorymask.detail();
				}
			},
			//查看
			 view(data) {
			 	this.CATEGORY =data;
				this.$refs.categorymask.view();
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
				this.up = !this.up
			},
			// 删除
			deluserinfo() {
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/productType/deletes';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].ID);
					}
					//ids为deleteid数组用逗号拼接的字符串
					ids = deleteid.toString(',');
					var data = {
						ids: ids,
					}
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {
							params: data
						}).then((res) => { //.delete 传数据方法
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
=======
			addsample(type){
				this.$refs.samplechild.visible(type);
			},
			
			//刪除新建行
			deleteRow(index, row, listName){
				var TableName = '';
				if(listName =='basisList'){
					TableName = 'INSPECT_PROXY_BASIS';
				}else if(listName =='projectList'){
					TableName = 'INSPECT_PROXY_PROJEC';
				}else{
					TableName = 'CHECK_PROXY_CONTRACT';
				}
				if(row.ID){
					var url = this.basic_url + '/api-apps/app/inspectPro/' + TableName +'/' + row.ID;
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {}).then((res) => {
							if(res.data.resp_code == 0){
								this.dataInfo[TableName+'List'].splice(index,1);
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
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
					}).catch(() => {

					});
				}else{
					this.dataInfo[TableName+'List'].splice(index,1);
				}
			},
			//点击按钮显示弹窗
			visible() {
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.dataInfo.DEPTID = res.data.deptId;
					this.dataInfo.ENTERBY = res.data.id;
					var date = new Date();
					this.dataInfo.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
					this.dataInfo.TYPE = '1';
					this.dataInfo.TYPEDesc = '检验';
					this.dataInfo.LEADER = 0;
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试21',
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
			//
			detailgetData() {
			var url = this.basic_url +'/api-apps/app/inspectPro/' + this.dataid;
				this.$axios.get(url, {}).then((res) => {
					// 依据
					for(var i = 0;i<res.data.INSPECT_PROXY_BASISList.length;i++){
						res.data.INSPECT_PROXY_BASISList[i].isEditing = false;
					}
					// 要求
					for(var m = 0;m<res.data.INSPECT_PROXY_PROJECList.length;m++){
						res.data.INSPECT_PROXY_PROJECList[m].isEditing = false;
					}
					// 分包要求
					for(var n = 0;n<res.data.CHECK_PROXY_CONTRACTList.length;n++){
						res.data.CHECK_PROXY_CONTRACTList[n].isEditing = false;
					}		
					res.data.MAINGROUP = Number(res.data.MAINGROUP);
					res.data.LEADER = Number(res.data.LEADER);
					for(var i = 0;i<res.data.INSPECT_PROXY_PROJECList.length;i++){
						res.data.INSPECT_PROXY_PROJECList[i].INSPECT_GROUP = Number(res.data.INSPECT_PROXY_PROJECList[i].INSPECT_GROUP);
					}
					for(var i = 0;i<res.data.CHECK_PROXY_CONTRACTList.length;i++){
						res.data.CHECK_PROXY_CONTRACTList[i].INSPECT_GROUP = Number(res.data.CHECK_PROXY_CONTRACTList[i].INSPECT_GROUP);
					}
					this.getmaingroup(res.data.MAINGROUP);
					this.dataInfo = res.data;
					this.RVENDORSelect();
					this.show = true;
					//深拷贝数据
					let _obj = JSON.stringify(this.dataInfo);
        			this.datainfo = JSON.parse(_obj);
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试3',
						type: 'error'
					});
				});
			},	
			
			// 这里是修改
			detail(dataid) {
				this.dataid=dataid;
				var usersUrl = this.basic_url + '/api-user/users/currentMap'
				this.$axios.get(usersUrl, {}).then((res) => {
					this.dataInfo.DEPTID = res.data.deptId;//传给后台机构id
					this.dataInfo.CHANGEBY = res.data.id;
					var date = new Date();
					this.dataInfo.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试4',
						type: 'error'
					});
				});
				this.detailgetData();
				this.modifytitle = true;
				this.addtitle = false;
				this.viewtitle = false;
				this.noviews = true;
				this.views = false; //
				this.edit = true;
				this.noedit = false;
			},
			//点击修订按钮
			modifyversion(dataInfo) {
				this.$refs[dataInfo].validate((valid) => {
					if(valid) {
						var datainfo=JSON.stringify(this.datainfo); 
	 					var dataInfo=JSON.stringify(this.dataInfo);
					 	if(datainfo==dataInfo){
					  	this.$message({
								message: '没有修改内容，不允许修订！',
								type: 'warning'
							});
							return false;
					    }else{
							var url = this.basic_url+ '/api-apps/app/inspectPro/operate/upgraded'
							this.$axios.post(url, this.dataInfo).then((res) => {
								//resp_code == 0是后台返回的请求成功的信息
								if(res.data.resp_code == 0) {
									this.$message({
										message: '修订成功',
										type: 'success'
									});
									//重新加载数据
									this.$emit('request');
									this.show = false;
								}else{
								this.show = true;
								if(res.data.resp_code == 1) {
									//res.data.resp_msg!=''后台返回提示信息
									if( res.data.resp_msg!=''){
									 	this.$message({
											message: res.data.resp_msg,
											type: 'warning'
									 	});
									}else{
										this.$message({
											message:'相同数据不可重复修订！',
											type: 'warning'
										});
									}
								}
							}		
							}).catch((err) => {
								this.$message({
									message: '网络错误，请重试5',
									type: 'error'
								});
							});
						}
					} else {
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
					}
				});
			},
			//这是查看
			view(dataid) {
				this.dataid=dataid;				
				this.modifytitle = false;
				this.addtitle = false;
				this.viewtitle = true;
				this.views = true; //
				this.noviews = false;
				this.edit = true;
				this.noedit = true;
				this.isEditing=false;
				this.detailgetData();
				//判断启动流程和审批的按钮是否显示
				var url = this.basic_url + '/api-apps/app/inspectPro/flow/isStart/'+dataid;
				this.$axios.get(url, {}).then((res) => {
					if(res.data.resp_code==1){
						this.start=true;
						this.approval=false;
					}else{
						var url = this.basic_url + '/api-apps/app/inspectPro/flow/Executors/'+dataid;
						this.$axios.get(url, {}).then((res) => {
							var resullt=res.data.datas;
							var users='';
							for(var i=0;i<resullt.length;i++){
								users = users + resullt[i].username+",";
							}
							if(users.indexOf(this.username) != -1){
								this.approval=true;
								this.start=false;
							}else{
								this.approval=false;
								this.start=false;
							}
						});
					}
				});
			},
			addcategory(val){//分包方名称
				this.deptindex = val;
				if(val == 'maintable'){
					if(this.dataInfo.R_VENDOR == null || this.dataInfo.R_VENDOR == '' || this.dataInfo.R_VENDOR == undefined){
						this.$message({
							message: '请先选择承检单位',
							type: 'warning'
						});
					}else{
						this.$refs.categorychild.visible(this.dataInfo.R_VENDOR);
						this.main = 'main';
					}
				}else{
					if(this.deptindex.VENDORDesc == null || this.deptindex.VENDORDesc == '' || this.deptindex.VENDORDesc == undefined){
						this.$message({
							message: '请先选择分包方名称',
							type: 'warning'
						});
					}else{
						this.$refs.categorychild.visible(this.deptindex.VENDOR);
						this.main = 'table';
					}
				}
					
			},
			//接到产品类别的值
			categorydata(value){
				if(this.main == 'main'){
					this.dataInfo.P_NUM = value[0];
					this.dataInfo.PRODUCT_TYPE  = value[1];
					this.dataInfo.PRODUCT = '';
					this.dataInfo.PRO_NUM = '';
					this.dataInfo.S_NUM = '';
					this.dataInfo.INSPECT_PROXY_BASISList = [];
					this.dataInfo.INSPECT_PROXY_PROJECList = [];
				}else{
					this.deptindex.PT_NUM = value[0];
					this.deptindex.PRODUCT_TYPE = value[1];
					this.deptindex.P_VERSIONNUM = value[0]+':'+value[2];//类别编号+版本
					this.deptindex.PRO_NUM ='';//产品编号
					this.deptindex.PRODUCT ='';//产品名称
					this.deptindex.S_NUM ='';//检测依据编号
					this.deptindex.BASIS = '';//检测依据
					this.deptindex.PROJ_NUM ='';//检测项目编号
					this.deptindex.PROJECT_ID ='';//检测项目ID
					this.deptindex.P_REMARKS = '';//检测项目
					this.deptindex.PRO_VERSIONNUM ='';	//产品名称编号+版本
					this.deptindex.S_VERSIONNUM ='';	//检验检测依据编号+版本
					this.deptindex.PROJ_VERSIONNUM ='';	//检测项目编号+版本
				}
			},
			addproduct(val){//受检产品名称
				this.deptindex = val;
				if(val == 'maintable'){
					if(this.dataInfo.P_NUM == null || this.dataInfo.P_NUM == '' || this.dataInfo.P_NUM == undefined){
						this.$message({
							message: '请先选择产品类别',
							type: 'warning'
						});
					}else{
						this.$refs.productchild.visible(this.dataInfo.P_NUM);
						this.main = 'main';
					}
				}else{
					if(this.deptindex.PT_NUM == null || this.deptindex.PT_NUM == '' || this.deptindex.PT_NUM == undefined){
						this.$message({
							message: '请先选择产品类别',
							type: 'warning'
						});
					}else{
						this.$refs.productchild.visible(this.deptindex.PT_NUM);
						this.main = 'table';
					}
				}
			},
			//接到产品的值
			appenddata(value){
				if(this.main == 'main'){
					this.dataInfo.PRO_NUM = value[0];
					this.dataInfo.PRODUCT = value[1];
					this.dataInfo.S_NUM = '';
					this.dataInfo.INSPECT_PROXY_BASISList = [];
					this.dataInfo.INSPECT_PROXY_PROJECList = [];
				}else{
					this.deptindex.PRO_NUM = value[0];
					this.deptindex.PRODUCT = value[1];
					this.deptindex.PRO_VERSIONNUM = value[0]+':'+value[2];//产品编号+版本
					this.deptindex.S_NUM ='';//检测依据编号
					this.deptindex.BASIS = '';//检测依据
					this.deptindex.PROJ_NUM ='';//检测项目编号
					this.deptindex.PROJECT_ID ='';//检测项目ID
					this.deptindex.P_REMARKS = '';//检测项目
					this.deptindex.S_VERSIONNUM ='';	//检验检测依据编号+版本
					this.deptindex.PROJ_VERSIONNUM ='';	//检测项目编号+版本
				}
			},
			//检验依据放大镜
			basisleadbtn(val){
				this.deptindex = val;
				if(val == 'maintable'){
					if(this.dataInfo.PRO_NUM == null || this.dataInfo.PRO_NUM == '' || this.dataInfo.PRO_NUM == undefined){
						this.$message({
							message: '请先选择产品名称',
							type: 'warning'
						});
					}else{
						this.sendchilddata.push(this.dataInfo.PRO_NUM);
						this.sendchilddata.push(this.dataInfo.INSPECT_PROXY_BASISList);
						this.$refs.standardchild.basislead(this.sendchilddata);
						this.main = 'main';
						this.sendchilddata = [];
						this.deptindex = {};
					}
				}else{
					if(this.deptindex.PRO_NUM == null || this.deptindex.PRO_NUM == '' || this.deptindex.PRO_NUM == undefined){
						this.$message({
							message: '请先选择产品名称',
							type: 'warning'
						});
					}else{
						this.sendchilddata.push(this.deptindex.PRO_NUM);
						this.$refs.standardchild.basislead(this.sendchilddata);
						this.main = 'table';
						this.sendchilddata = [];
					}
				}
			},
			 //检验依据列表
			addbasis(value){
				if(this.main == 'main'){
					this.dataInfo.S_NUM = value[0];
					for(var i = 1;i<value.length;i++){
						value[i].S_DESC = value[i].S_NAME;
						this.dataInfo.INSPECT_PROXY_BASISList.push(value[i]);
					}
					this.dataInfo.INSPECT_PROXY_PROJECList = [];
				}
			},
			//分包要求检验依据编号
			testbasisnum(value){
				this.deptindex.S_NUM = value;
				this.deptindex.PROJ_NUM ='';//检测项目编号
				this.deptindex.PROJECT_ID ='';//检测项目ID
				this.deptindex.P_REMARKS = '';//检测项目
				this.deptindex.PROJ_VERSIONNUM ='';	//检测项目编号+版本
			},
			//分包要求检验依据名称
			testbasisname(value){
				console.log('testbasisname');
				this.deptindex.BASIS = value;
			},
			//检测依据编号+版本
			testbasisprover(value){
				this.deptindex.S_VERSIONNUM = value;
			},
			//检验项目放大镜
			basisleadbtn2(val){
				this.deptindex = val;
				if(val == 'maintable'){
					if(this.dataInfo.S_NUM == null || this.dataInfo.S_NUM == '' || this.dataInfo.S_NUM == undefined){
						this.$message({
							message: '请先选择检验依据列表数据',
							type: 'warning'
						});
					}else{
						this.sendchilddata.push(this.dataInfo.S_NUM);
						this.sendchilddata.push(this.dataInfo.INSPECT_PROXY_PROJECList);
						this.$refs.projectchild.projectlead(this.sendchilddata);
						this.main = 'main';
						this.sendchilddata = [];
						// this.deptindex = {};
					}
				}else{
					if(this.deptindex.S_NUM == null || this.deptindex.S_NUM == '' || this.deptindex.S_NUM == undefined){
						this.$message({
							message: '请先选择检验依据',
							type: 'warning'
						});
					}else{
						this.sendchilddata.push(this.deptindex.S_NUM);
						this.$refs.projectchild.projectlead(this.sendchilddata);
						this.main = 'table';
						this.sendchilddata = [];
					}
				}
			},
			 //检验项目列表
			addproject(value){
				if(this.main == 'main'){
					for(var i = 0;i<value.length;i++){
						value[i].P_DESC = value[i].P_NAME;
						this.dataInfo.INSPECT_PROXY_PROJECList.push(value[i]);
					}
				}
			},
			testprojectnum(value){
				this.deptindex.PROJ_NUM = value;
			},
			testprojectname(value){
				this.deptindex.P_REMARKS = value;
			},
			testprojectid(value){
				this.deptindex.PROJECT_ID = value;
			},
			testprojectprover(value){
				this.deptindex.PROJ_VERSIONNUM = value;
			},
			//点击关闭按钮
			close() {
				this.show = false;
				this.$emit('request');
			},
			open() {
				this.show = true;
			},
			toggle(e) {
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
				$(".mask_div").css("top", "60px");
			},
			//还原按钮
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("top", "100px");
			},
			showData(data){
				this.dataInfo.ITEM_NAME = data.appenddes;//名称
				this.dataInfo.ITEM_MODEL= data.appendmod;
				this.dataInfo.ITEM_QUALITY = data.appendqua;
				this.dataInfo.ITEM_ID = data.itemId;
				this.dataInfo.ITEM_STATUS = data.status;
				this.dataInfo.ITEM_STATUSDesc = data.statusDesc;
			},
			//样品
			appenddes(value){
				this.dataInfo.ITEM_NAME = value;//名称
			},
			appendmod(value){
				this.dataInfo.ITEM_MODEL=value;
			},
			appendqua(value){
				this.dataInfo.ITEM_QUALITY=value;
			},
			linedata(value){
				this.dataInfo.R_VENDOR = value[0];
				this.dataInfo.R_VENDORDesc = value[1];
				this.dataInfo.P_NUM = value[2];
				this.dataInfo.PRODUCT_TYPE = value[3];
				this.dataInfo.PRO_NUM = value[4];
				this.dataInfo.PRODUCT = value[5];
				this.dataInfo.P_VERSION = value[6];//产品类别版本
				this.dataInfo.PRO_VERSION = value[7];//产品版本
				this.dataInfo.ITEMNUM = value[8];//样品编号
				this.dataInfo.MAINGROUP = '';
				this.dataInfo.LEADER = '';
				this.RVENDORSelect();
			},
			//委托单位
			appendname(value){		
				this.dataInfo.V_NAME = value;//名称
				if(this.dataInfo.CHECK_PROXY_CONTRACTList == null || this.dataInfo.CHECK_PROXY_CONTRACTList==undefined||this.dataInfo.CHECK_PROXY_CONTRACTList==''){

				}else{//更新子表委托单位
					for(var i = 0;i<this.dataInfo.CHECK_PROXY_CONTRACTList.length;i++){
						this.dataInfo.CHECK_PROXY_CONTRACTList[i].V_NAME = value;
					}
				}
			},
			appendadd(value){
				this.dataInfo.V_ADDRESS=value;
			},
			appendzip(value){
				this.dataInfo.V_ZIPCODE=value;
			},
			appendid(value){
				this.customid=value;
			},
			//生成单位
			appendnames(value){
				this.dataInfo.P_NAME=value;
			},
			// 保存users/saveOrUpdate
			save(parameter) {
				var projectgroup = "";
				for(var i=0;i<this.dataInfo.INSPECT_PROXY_PROJECList.length;i++){
					projectgroup = projectgroup + this.dataInfo.INSPECT_PROXY_PROJECList[i].INSPECT_GROUP+",";
				}
				//检验项目与要求中专业组至少有一条与主检组值相同
				if(projectgroup.indexOf(this.dataInfo.MAINGROUP)==-1){
					this.$message({
						message: '检验项目与要求中专业组至少有一条与主检组值相同！',
						type: 'warning'
					});
					return false;
				}
				this.$refs.dataInfo.validate((valid) => {
			        if (valid) {
						if(this.dataInfo.INSPECT_PROXY_BASISList.length<=0&&this.dataInfo.INSPECT_PROXY_PROJECList.length<=0&&this.dataInfo.CHECK_PROXY_CONTRACTList.length<=0){
							this.$message({
								message: '检验依据和检验项目与要求和分包要求是必填项，请填写！',
								type: 'warning'
							});
							return false;
			        	}else{
							var url = this.basic_url + '/api-apps/app/inspectPro/saveOrUpdate';
							this.$axios.post(url, this.dataInfo).then((res) => {
								if(res.data.resp_code == 0) {
									this.$message({
										message: '保存成功',
										type: 'success'
									});
									if(parameter=="Update"){
										this.show = false;
									}else{
										this.show = true;
									}
									//重新加载数据
									this.$emit('request');
									this.reset();
								}
							}).catch((err) => {
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
								this.$message({
									message: '删除成功',
									type: 'success'
								});
								this.requestData();
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
<<<<<<< HEAD
						});
					}).catch(() => {

					});
				}
			},
			//物理删除
			physicsDel(){
				var selData = this.selUser;
				if(selData.length == 0) {
=======
						}
			        }else{
			          	this.show = true;
			            this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
			        }
				});
			},
			handleClose1(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.resetBasisInfo1();
					})
					.catch(_ => {
				console.log('取消关闭');
					$('.v-modal').hide();
				});
			},
			handleClose2(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.resetBasisInfo2();
					})
					.catch(_ => {
				console.log('取消关闭');
					$('.v-modal').hide();
				});
			},
			visablemaingroup:function(callback){    //只有回调参数为false时才触发 ctx.getAreaListDataSearch(vc,1)这个函数;
			    if(callback){
			    	if(this.dataInfo.R_VENDOR==""||this.dataInfo.R_VENDOR==undefined){
						this.$message({
							message: '请先输入承建单位',
							type: 'error'
						});
			    	}
			    }	
			},
			visableleader:function(callback){
				 if(callback){
			    	if(this.dataInfo.MAINGROUP==""||this.dataInfo.MAINGROUP==undefined){
						this.$message({
							message: '请先输入主检组',
							type: 'error'
						});
			    	}
			    }	
			},
			//主检组
			RVENDORSelect(){
				var url = this.basic_url + '/api-user/depts/findByPid/'+this.dataInfo.R_VENDOR;
				this.$axios.get(url, {}).then((res) => {
					console.log(res.data);
					console.log(this.maingroup);
					this.maingroup = res.data;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				// this.dataInfo.PRODUCT_TYPE = '';
				// this.dataInfo.P_NUM = '';
				// this.dataInfo.PRODUCT = '';
				// this.dataInfo.PRO_NUM = '';
				// this.dataInfo.S_NUM = '';
				// this.dataInfo.INSPECT_PROXY_BASISList = [];
				// this.dataInfo.INSPECT_PROXY_PROJECList = [];
				// this.dataInfo.MAINGROUP = '';
				// this.dataInfo.LEADER = '';
			},
			//主检组带出主检负责人
			getmaingroup(maingroupid){
				if(!maingroupid){
					return;
				}
				this.dataInfo.LEADER = '';
				var url = this.basic_url + '/api-user/users/usersByDept?deptId='+maingroupid;
				this.$axios.get(url, {}).then((res) => {
					this.leaderdata = [];
					var list = res.data.data;
					for(var i=0; i<list.length; i++){
						this.leaderdata.push(list[i]);
					}
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});		
			},
			setLeader(id){
				this.$nextTick(() => {
					this.$set(this.dataInfo,'LEADER',id);
				})
			},
			//获取负责人和接收人
			getCustomer(type) {
				if(type == 'vname'){
					this.$refs.enterprisechild.visible(type , this.dataInfo.appendid);
				}else{
					this.$refs.enterprisechild.visible(type);
				}
			},
			addname(){
				var customid=this.customid;
				if(customid==""||customid=="undenfiend"){
					this.$message({
						message: '请先选委托单位名称',
						type: 'warning'
					});
				}else{
					this.requestData();	
				}
			},
			requestData(){
				this.loading = true;
				var data = {
						page: this.page.currentPage,
						limit: this.page.pageSize,
					}
					var url = this.basic_url + '/api-apps/app/customer/CUSTOMER/'+ this.customid;
					this.$axios.get(url, {
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

						this.CUSTOMER_PERSONList = res.data.CUSTOMER_PERSONList;
						this.loading = false;
					});
					this.dialogVisibleuser = true;
			},
			queding(){
				if(this.selval.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selval.length > 1){
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
				}else{
					this.resetBasisInfo1();//调用resetBasisInfo函数
				}
			},
			addcusname(){
				if(this.selval.length == 0){
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/productType/physicsDel';
					//changeUser为勾选的数据
					var changeUser = selData;
					//deleteid为id的数组
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].ID);
					}
					//ids为deleteid数组用逗号拼接的字符串
					ids = deleteid.toString(',');
					var data = {
						ids: ids,
					}
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {
							params: data
						}).then((res) => { //.delete 传数据方法
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '删除成功',
									type: 'success'
								});
								this.requestData();
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
					}).catch(() => {

					});
<<<<<<< HEAD
				}
			},
			handleSuccess(response, file, fileList){
				console.log(response);
				console.log(file);
				console.log(fileList);
			},
			uploadUrl(){
                var url = this.basic_url +'/api-apps/app/productType/importExc?access_token='+sessionStorage.getItem('access_token');
                return url;
            },
          	
			// 导入
			download() {
				var url = this.basic_url + '/api-apps/app/productType/importExcTemplete?access_token='+sessionStorage.getItem('access_token');
           var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.responseType = "blob";
            xhr.setRequestHeader("client_type", "DESKTOP_WEB");
            xhr.onload = function() {
                if (this.status == 200) {
                    var blob = this.response;
                    var objecturl = URL.createObjectURL(blob);
                    window.location.href = objecturl;
                }
            }
            xhr.send();
			},
			
			// 导出
			exportData() {
           		var url = this.basic_url + '/api-apps/app/productType/exportExc?access_token='+sessionStorage.getItem('access_token');
          		 var xhr = new XMLHttpRequest();
            	xhr.open('POST', url, true);
            	xhr.responseType = "blob";
            	xhr.setRequestHeader("client_type", "DESKTOP_WEB");
            	xhr.onload = function() {
                	if (this.status == 200) {
						var filename = "productType.xls";
						var blob = this.response;
						var link = document.createElement('a');
						var objecturl = URL.createObjectURL(blob);
						link.href = objecturl;
						link.download = filename;
						link.click();
                	}
            	}
            	xhr.send();
			},
			// 打印
			Printing() {

			},
			//报表
			reportdata(){
				this.reportData.app=this.productType;
				this.$refs.reportChild.visible();
			},
			// 配置关系
			Configuration() {
				this.$router.push({
					path: '/inspection_project'
				});
=======
				}else{
					this.dataInfo.V_PERSON = this.selval[0].PERSON;
					this.dataInfo.V_PHONE = this.selval[0].PHONE;
					// this.dialogVisibleuser = false;
					this.resetBasisInfo2();//调用resetBasisInfo函数
				}
			},
			resetBasisInfo1(){//点击确定或取消按钮时重置数据20190303
				this.dialogVisible = false;//关闭弹出框
				this.resourceData = [];//列表数据置空
				this.page.currentPage = 1;//页码重新传值
				this.page.pageSize = 10;//页码重新传值
			},
			resetBasisInfo2(){//点击确定或取消按钮时重置数据20190303
				this.dialogVisibleuser = false;//关闭弹出框
				this.CUSTOMER_PERSONList = [];//列表数据置空
				this.page.currentPage = 1;//页码重新传值
				this.page.pageSize = 10;//页码重新传值
			},
			SelChange(val) {
				this.selval = val;
			},
			//启动流程
			startup(){
				var url = this.basic_url + '/api-apps/app/inspectPro/flow/'+this.dataid;
				this.$axios.get(url, {}).then((res) => {
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
							this.detailgetData();
						var url = this.basic_url + '/api-apps/app/inspectPro/flow/Executors/'+this.dataid;
							this.$axios.get(url, {}).then((res) => {
									var resullt=res.data.datas;
									var users='';
									for(var i=0;i<resullt.length;i++){
										users = users + resullt[i].username+",";
									}
								if(users.indexOf(this.username) != -1){
									this.approval=true;
									this.start=false;
								}else{
									this.approval=false;
									this.start=false;
								}
							});
				    }
				});
			},
			//审批流程
			approvals(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.inspectPro;
				var url = this.basic_url + '/api-apps/app/inspectPro/flow/isEnd/'+this.dataid;
	    		this.$axios.get(url, {}).then((res) => {
	    			if(res.data.resp_code == 0) {
						this.$message({
							message:res.data.resp_msg,
							type: 'warning'
						});
	    			}else{
	    				var url = this.basic_url + '/api-apps/app/inspectPro/flow/isExecute/'+this.dataid;
	    				this.$axios.get(url, {}).then((res) => {
			    			if(res.data.resp_code == 1) {
								this.$message({
									message:res.data.resp_msg,
									type: 'warning'
								});
							}else{
								var url = this.basic_url + '/api-apps/app/inspectPro/flow/customFlowValidate/'+this.dataid;
								this.$axios.get(url, {}).then((res) => {
				    				if(res.data.resp_code == 1) {
										this.$message({
											message:res.data.resp_msg,
											type: 'warning'
										});
									}else{
									 	this.$refs.approvalChild.visible();
									}
								})
	    					}
						});
					}
	    		});
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
			},
			judge(data) {
				data.STATUS = data.STATUS == "1" ? '活动' : '不活动'
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			SelChange(val) {
				this.selUser = val;
			},
<<<<<<< HEAD
			requestData(index) {
				this.loading = true;
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					NUM:this.searchList.NUM,
					TYPE: this.searchList.TYPE,
					VERSION:this.searchList.VERSION,
					DEPTID: this.searchList.DEPTID,
				}
				var url = this.basic_url + '/api-apps/app/productType';
=======
			getCompany() {
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
<<<<<<< HEAD
					this.page.totalCount = res.data.count;
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false
					} else {
						this.loadSign = true
					}
					this.categoryList = res.data.data;
					this.loading = false;
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试1',
						type: 'error'
					});
				})
			},
			handleNodeClick(data) {},
			formatter(row, column) {
				return row.enabled;
			},
			childByValue:function(childValue) {
        		// childValue就是子组件传过来的值
        		this.$refs.navsheader.showClick(childValue);
      		}
		},
		mounted() {
			this.requestData();
			this.getCompany();

//			const selectWrap = document.querySelector('.el-table__body-wrapper')
//			var that=this
//			selectWrap.addEventListener('scroll', function(e){
//				//	console.log(e);
//				console.log(this.scrollHeight);// 滚动区域
//				console.log(this.scrollTop);// div 到头部的距离
//				console.log(this.clientHeight);//屏幕高度
//				let scrollHeight = this.scrollHeight.scrollHeight; // 滚动条的总高度
//				console.log(document.documentElement.clientHeight);// 滚动条的总高度
//			    var scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
//			    let sign = 1;
//				console.log(scrollDistance);
//		      	if(scrollDistance <= sign){
//		      		that.loadMore('down')
//		      		this.scrollTop = 2;
//		      	}else if(this.scrollTop < 1){
//		      		that.loadMore('up')
//		      		this.scrollTop = 2
//		      	}else{
//		      		return false;
//		      	}
//
//			}, true);
			
		 	
		}
	}
</script>

<style scoped>

=======
					this.selectData = res.data;
				});
			},
			getuser(){//获取当前用户信息
	            var url = this.basic_url + '/api-user/users/currentMap';
	            this.$axios.get(url, {}).then((res) => {//获取当前用户信息
	                    this.username = res.data.username;
	            }).catch((err) => {
	                this.$message({
	                    message: '网络错误，请重试',
	                    type: 'error'
	                });
	            });
        	},
		},
		mounted() {
			this.getCompany();
			this.getuser();
		},
	}
</script>

<style>
@import '../../assets/css/mask-modules.css';
.el-collapse-item__content {
    padding-bottom: 0px;
}
#cost{text-align: right}
#stacost{text-align: right}
#actualcost{text-align: right}
/*.el-form-item__error {
	top: 18%;
    left: 5px;
    background: #FFF;
    padding: 5px 10px;
}*/
>>>>>>> 974d5cef7eb1813102a0521c7fdbad5f790c432c
</style>