<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加检验/检测委托书</div>
					<div class="mask_title" v-show="modifytitle">修改检验/检测委托书</div>
					<div class="mask_title" v-show="viewtitle">查看检验/检测委托书</div>
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
					<el-form :model="dataInfo" :label-position="labelPositions" :rules="rules" ref="dataInfo" status-icon inline-message  class="demo-ruleForm">
						<div class="text-center" v-show="viewtitle">
							<span v-if="this.dataInfo.STATUS!=3">
								<el-button id="start" type="success" round plain size="mini" @click="startup" v-show="start"><i class="icon-start"></i> 启动流程</el-button>
								<el-button id="approval" type="warning" round plain size="mini" @click="approvals" v-show="approval"><i class="icon-edit-3"></i> 审批</el-button>
							</span>
							<el-button type="primary" round plain size="mini" @click="flowmap"><i class="icon-git-pull-request"></i> 流程地图</el-button>
							<el-button type="primary" round plain size="mini" @click="flowhistory"><i class="icon-plan"></i> 流程历史</el-button>
							<el-button type="primary" round plain size="mini" @click="viewpepole"><i class="icon-user"></i> 当前责任人</el-button>
						</div>
						<div class="accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="委托单位" name="1">
									<el-row :gutter="5" class="pb10">
										<el-col :span="3" class="pull-right">
											<el-input v-model="dataInfo.VERSION" :disabled="edit">
												<template slot="prepend">版本</template>
											</el-input>
										</el-col>
										<el-col :span="5" class="pull-right">
											<el-input v-model="dataInfo.STATUSDesc" :disabled="edit">
												<template slot="prepend">状态</template>
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
												<!--<el-form-item label="名称" prop="V_NAME">
													<el-input v-model="dataInfo.V_NAME">
													</el-input>
												</el-form-item>-->
												<el-form-item label="名称" prop="V_NAME" label-width="110px">
													<el-input v-model="dataInfo.V_NAME" :disabled="edit" width="100%">
														<el-button slot="append" icon="el-icon-search" @click="getCustomer(1)">
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
											<el-col :span="8">
												<el-form-item label="责任单位" prop="R_VENDOR" label-width="110px" :disabled="noedit">
													<el-input v-model="dataInfo.R_VENDOR" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row >
											<el-col :span="8" style="display: none;">
												<el-form-item label="委托单位编号" prop="VENDOR" label-width="110px">
													<el-input v-model="dataInfo.VENDOR"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
								</el-collapse-item>
								<!--<el-collapse-item title="生产单位" name="2">
									<el-row >
										<el-col :span="8" style="display:none;">
											<el-form-item label="生产单位编号" prop="PRODUCT_UNIT">
												<el-input v-model="dataInfo.PRODUCT_UNIT"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>-->
								<el-collapse-item title="样品" name="2" >
										<el-row >
											<el-col :span="8">
												<el-form-item label="名称" prop="ITEM_NAME" label-width="110px">
													<el-input v-model="dataInfo.ITEM_NAME" :disabled="true">
														<el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="addsample"></el-button>
													</el-input>
												</el-form-item>
											</el-col>
										
											<el-col :span="8">
												<el-form-item label="型号" prop="ITEM_MODEL" label-width="110px">
													<el-input v-model="dataInfo.ITEM_MODEL" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row >
											<el-col :span="8">
												<el-form-item label="数量" prop="ITEM_QUALITY" label-width="110px">
													<el-input v-model="dataInfo.ITEM_QUALITY" :disabled="noedit">
													</el-input>

												</el-form-item>
											</el-col>
											<!--<el-col :span="8">
												<el-form-item label="样品信息状态" prop="ITEM_STATUS">
													<el-input v-model="dataInfo.ITEM_STATUS"></el-input>
												</el-form-item>
											</el-col>-->
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
												<el-form-item label="完成日期" prop="COMPDATE" label-width="110px">
													<el-date-picker v-model="dataInfo.COMPDATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
													</el-date-picker>
												</el-form-item>
									</el-col>
									<el-col :span="8">
												<el-form-item label="完成方式" prop="COMPMODE" label-width="110px">
													<el-radio-group v-model="dataInfo.COMPMODE" :disabled="noedit">
														<el-radio label="加急"></el-radio>
														<el-radio label="正常"></el-radio>
													</el-radio-group>
												</el-form-item>
									</el-col>
									</el-row>
										<el-form-item label="抽样方案/判定依据" prop="REMARKS" label-width="110px">
											<el-input v-model="dataInfo.REMARKS" :disabled="noedit"></el-input>
										</el-form-item>
										
								</el-collapse-item>
								<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
									 <!-- <el-form :label-position="labelPosition"> -->
									<el-tabs v-model="activeName" @tab-click="handleClick">
									    <el-tab-pane label="检验依据" name="first">
									    	<div class="table-func table-funcb">
												<el-button type="success" size="mini" round @click="addfieldProject">
													<i class="icon-add"></i>
													<font>新建行</font>
												</el-button>
											</div>

											<el-table :data="dataInfo.INSPECT_PROXY_BASISList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.INSPECT_PROXY_BASISList', order: 'descending'}">

												<el-table-column prop="iconOperation" fixed label="" width="50px">
													<template slot-scope="scope">
														<i class="el-icon-check" v-if="scope.row.isEditing"></i>
														<i class="el-icon-edit" v-else="v-else"></i>
													</template>
												</el-table-column>

												<el-table-column prop="S_NUM" label="标准编号" sortable width="150px">
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_BASISList.'+scope.$index + '.S_NUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.S_NUM" placeholder="请输入">
															   <el-button slot="append" icon="el-icon-search"></el-button>
														</el-input>
														<span v-else="v-else">{{scope.row.S_NUM}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<el-table-column prop="S_DESC" label="标准内容" sortable>
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_BASISList.'+scope.$index + '.S_DESC'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.S_DESC" placeholder="请输入">	
														</el-input>
														<span v-else="v-else">{{scope.row.S_DESC}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												
												<!--<el-table-column prop="STATUS" label="信息状态" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_PROJECList.'+scope.$index + '.STATUS'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入要求">
														</el-input>
														<span v-else="v-else">{{scope.row.STATUS}}</span>
														</el-form-item>
													</template>
												</el-table-column>-->
												
												<el-table-column prop="VERSION" label="版本" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_BASISList.'+scope.$index + '.VERSION'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入">
														</el-input>
														<span v-else="v-else">{{scope.row.VERSION}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												
												<el-table-column fixed="right" label="操作" width="120px">
													<template slot-scope="scope">
														<el-button @click.native.prevent="deleteRow(scope.$index,dataInfo.INSPECT_PROXY_BASISList)" type="text" size="small">
															移除
														</el-button>
													</template>
												</el-table-column>
											</el-table>
									    </el-tab-pane>
									    <el-tab-pane label="检验项目与要求" name="second">
									    	<div class="table-func table-funcb">
												<el-button type="success" size="mini" round @click="addfieldBasis">
													<i class="icon-add"></i>
													<font>新建行</font>
												</el-button>
											</div>
	                                        
											<el-table :data="dataInfo.INSPECT_PROXY_PROJECList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.INSPECT_PROXY_PROJECList', order: 'descending'}">

												<el-table-column prop="iconOperation" fixed label="" width="50px">
													<template slot-scope="scope">
														<i class="el-icon-check" v-if="scope.row.isEditing"></i>
														<i class="el-icon-edit" v-else="v-else"></i>
													</template>
												</el-table-column>
									
												<el-table-column prop="P_NUM" label="检验项目编号" sortable width="120px">
													<template slot-scope="scope">
													<el-form-item :prop="'INSPECT_PROXY_PROJECList.'+scope.$index + '.P_NUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_NUM" placeholder="请输入">
															   <el-button slot="append" icon="el-icon-search"></el-button>
														</el-input>
														<span v-else="v-else">{{scope.row.P_NUM}}</span>
													</el-form-item>	
													</template>
												</el-table-column>

												<el-table-column prop="P_DESC" label="检验项目描述" sortable>
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_PROJECList.'+scope.$index + '.P_DESC'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_DESC" placeholder="请输入">
														</el-input>
														<span v-else="v-else">{{scope.row.P_DESC}}</span>
														</el-form-item>	
													</template>
												</el-table-column>

												<el-table-column prop="REMARKS" label="内容" sortable>
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_PROJECList.'+scope.$index + '.REMARKS'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REMARKS" placeholder="请输入">		
														</el-input>
														<span v-else="v-else">{{scope.row.REMARKS}}</span>
														</el-form-item>	
													</template>
												</el-table-column>

												<!--<el-table-column prop="STATUS" label="信息状态" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_BASISList.'+scope.$index + '.STATUS'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入要求">
														</el-input>
														<span v-else="v-else">{{scope.row.STATUS}}</span>
													</el-form-item>
													</template>
												</el-table-column>-->

												<el-table-column prop="VERSION" label="项目版本" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'INSPECT_PROXY_PROJECList.'+scope.$index + '.VERSION'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入">
														</el-input>
														<span v-else="v-else">{{scope.row.VERSION}}</span>
														</el-form-item>	
													</template>
												</el-table-column>
												<el-table-column fixed="right" label="操作" width="120">
													<template slot-scope="scope">
														<el-button @click.native.prevent="deleteRow(scope.$index,dataInfo.INSPECT_PROXY_PROJECList)" type="text" size="small">
															移除
														</el-button>
													</template>
												</el-table-column>
											</el-table>
									    </el-tab-pane>
									    <el-tab-pane label="分包要求" name="third">
									    	<div class="table-func table-funcb">
												<el-button type="success" size="mini" round @click="addcheckProCont">
													<i class="icon-add"></i>
													<font>新建行</font>
												</el-button>
											</div>

											<el-table :data="dataInfo.CHECK_PROXY_CONTRACTList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.CHECK_PROXY_CONTRACTList', order: 'descending'}">

												<el-table-column prop="iconOperation" fixed label="" width="50px">
													<template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
												</el-table-column>


												<el-table-column prop="PROXY_CONTRACT_NUM" label="分包协议编号" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.PROXY_CONTRACT_NUM'" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXY_CONTRACT_NUM" placeholder="">
														</el-input>
														<span v-else="v-else">{{scope.row.PROXY_CONTRACT_NUM}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<el-table-column prop="PROXYNUM" label="委托书编号" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.PROXYNUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXYNUM" placeholder="请输入委托方名称">
														</el-input>
														<span v-else="v-else">{{scope.row.PROXYNUM}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<el-table-column prop="VENDOR" label="分包方名称" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.VENDOR'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VENDOR" placeholder="请输入分包方名称">
														</el-input>
														<span v-else="v-else">{{scope.row.VENDOR}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<el-table-column prop="P_REMARKS" label="检验检测项目内容" sortable width="280px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.P_REMARKS'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_REMARKS" placeholder="请输入">
															</el-input>
														<span v-else="v-else">{{scope.row.P_REMARKS}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<el-table-column prop="BASIS" label="检验检测技术依据" sortable width="220px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.BASIS'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.BASIS" placeholder="请输入">
														</el-input>
														<span v-else="v-else">{{scope.row.BASIS}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column prop="REQUIRES" label="对环境和操作人员要求" sortable width="220px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.REQUIRES'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REQUIRES" placeholder="请输入内容"></el-input>
														<span v-else="v-else">{{scope.row.REQUIRES}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column prop="Q_TYPE" label="对分包报告/证书的要求" sortable width="220px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.Q_TYPE'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.Q_TYPE" placeholder="请输入内容"></el-input>
														<span v-else="v-else">{{scope.row.Q_TYPE}}</span>
														</el-form-item>
													</template>
												</el-table-column>
								
												<el-table-column prop="CHECKCOST" label="检验检测费用" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.CHECKCOST'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" id="testprice" @blur="testPrice(scope.row)" size="small" v-model="scope.row.CHECKCOST" placeholder="请输入内容"></el-input>
														<span v-else="v-else">{{scope.row.CHECKCOST}}</span>
														</el-form-item>
													</template>
												</el-table-column>
														<!--<el-table-column prop="STATUS" label="信息状态" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.STATUS'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入要求"></el-input>
														<span v-else="v-else">{{scope.row.STATUS}}</span>
														</el-form-item>
													</template>
												</el-table-column>-->

												<el-table-column fixed="right" label="操作" width="120">
													<template slot-scope="scope">
														<el-button @click.native.prevent="deleteRow(scope.$index,dataInfo.CHECK_PROXY_CONTRACTList)" type="text" size="small">
															移除
														</el-button>
													</template>
												</el-table-column>

											</el-table>
									    </el-tab-pane>
									</el-tabs>
								</div>
								<el-collapse-item name="7">
											<el-col :span="8">
												<el-form-item label="检验报告编号" prop="REPORT_NUM" label-width="110px">
													<el-input v-model="dataInfo.REPORT_NUM" :disabled="noedit" ></el-input>
												</el-form-item>
											</el-col>
	                                        <el-col :span="10">
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
										
											<el-col :span="8">
												<el-form-item label="交委托方分数" prop="REPORT_QUALITY" label-width="110px">
													<el-input v-model="dataInfo.REPORT_QUALITY" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="14">
												<el-form-item label="发送方式" prop="REPORT_MODE" label-width="110px">
													<el-radio-group v-model="dataInfo.REPORT_MODE" :disabled="noedit">
														<el-radio label="自提"></el-radio>
														<el-radio label="邮寄"></el-radio>
														<el-radio label="其他"></el-radio>
													</el-radio-group>
												</el-form-item>
											</el-col>
											
									
											<el-col :span="8">
												<el-form-item label="检验收费" prop="CHECK_COST" label-width="110px">
													<el-input v-model="dataInfo.CHECK_COST" id="cost" @blur="toPrice" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="标准费用" prop="CONTRACTCOST" label-width="110px">
													<el-input v-model="dataInfo.CONTRACTCOST" id="stacost"  @blur="staPrice" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="实收费用" prop="ACTUALCOST" label-width="110px">
													<el-input v-model="dataInfo.ACTUALCOST" id="actualcost"  @blur="actualPrice" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>

											<el-col :span="8">
												<el-form-item label="实收比例" prop="ACTUAL_PERCENT" label-width="110px">
													<el-input v-model="dataInfo.ACTUAL_PERCENT" :disabled="noedit"></el-input>
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
											<!--<el-col :span="8">
												<el-form-item label="信息状态" prop="MESSSTATUS">
													<el-input v-model="dataInfo.MESSSTATUS"></el-input>
												</el-form-item>
											</el-col>-->

											<el-col :span="8">
												<el-form-item label="主检组" prop="MAINGROUP" label-width="110px">
													<el-select v-model="dataInfo.MAINGROUP" placeholder="请选择" style="width: 100%;">
														<el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="主检负责人" prop="LEADER" label-width="110px">
														<el-input v-model="dataInfo.LEADER" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8" style="display:none;" label-width="110px">
												<el-form-item label="生产单位编号" prop="PRODUCT_UNIT">
													<el-input v-model="dataInfo.PRODUCT_UNIT" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
										    <el-col :span="16">
											<el-form-item label="生产单位名称" prop="P_NAME" label-width="110px">
												<el-input v-model="dataInfo.P_NAME" :disabled="edit" >
													<el-button slot="append" icon="el-icon-search" @click="getCustomer(2)"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
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
						<div class="el-dialog__footer" v-show="noviews">
							<el-button type="primary" @click="saveAndUpdate('dataInfo')">保存</el-button>
							<el-button type="success"  v-show="addtitle" @click="saveAndSubmit('dataInfo')">保存并继续</el-button>
							<el-button v-show="modifytitle" type="btn btn-primarys" @click="modifyversion('dataInfo')">修订</el-button>
							<el-button @click='close'>取消</el-button>
						</div>
						<div class="el-dialog__footer" v-show="views">
							<el-button type="success" v-if="this.dataInfo.STATUS == 3" @click="build('dataInfo')">生成工作任务单</el-button>
						</div>
					</el-form>
				</div>
			</div>

			<el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
				<el-table :data="gridData" @selection-change="SelChange">
					<el-table-column type="selection" width="55" fixed>
					</el-table-column>
					<el-table-column label="组织机构代码" sortable width="100px" prop="CODE">
					</el-table-column>
					<el-table-column label="单位名称" sortable width="200px" prop="NAME">
					</el-table-column>
					<el-table-column label="联系人" sortable width="100px" prop="PERSON">
					</el-table-column>
					<el-table-column label="联系地址" sortable width="200px" prop="CONTACT_ADDRESS">
					</el-table-column>
					<el-table-column label="联系电话" sortable width="200px" prop="PHONE">
					</el-table-column>
				</el-table>
				<el-pagination background class="pull-right" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<span slot="footer" class="dialog-footer">
	    			<el-button @click="dialogVisible = false">取 消</el-button>
	    			<el-button type="primary" @click="dailogconfirm()">确 定</el-button>
	  			</span>
			</el-dialog>
			<!-- 样品名称 Begin -->
			<el-dialog :modal-append-to-body="false" title="样品名称" :visible.sync="dialogVisible2" width="80%" :before-close="handleClose">
				<el-table :data="samplesList" :header-cell-style="rowClass" border stripe height="300px" style="width: 100%;" :default-sort="{prop:'samplesList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
					<el-table-column type="selection" width="55" fixed align="center">
					</el-table-column>
					<el-table-column label="样品编号" sortable width="200px" prop="ITEMNUM">
					</el-table-column>
					<el-table-column label="样品名称" sortable width="200px" prop="DESCRIPTION">
					</el-table-column>
					<el-table-column label="样品类别" sortable width="200px" prop="TYPE">
					</el-table-column>
					<el-table-column label="委托单位" sortable width="200px" prop="V_NAME">
					</el-table-column>
					<el-table-column label="生产单位" sortable width="200px" prop="P_NAME">
					</el-table-column>
					<el-table-column label="型号" width="100px" prop="MODEL" sortable>
					</el-table-column>
					<el-table-column label="数量" width="100px" prop="QUATITY" sortable>
					</el-table-column>
					<el-table-column label="收样人" sortable width="140px" prop="ACCEPT_PERSON">
					</el-table-column>
					<el-table-column label="收样日期" sortable width="140px" :formatter="dateFormat" prop="ACCEPT_DATE">
					</el-table-column>
					<el-table-column label="接样人" sortable width="140px" prop="RECIP_PERSON">
					</el-table-column>
					<el-table-column label="接样日期" sortable width="140px" :formatter="dateFormat" prop="RECIP_DATE">
					</el-table-column>
					<el-table-column label="状态" sortable width="100px" prop="STATE">
					</el-table-column>
					<!--<el-table-column label="信息状态" sortable width="140px" prop="STATUS" v-if="this.checkedName.indexOf('信息状态')!=-1">
					</el-table-column>-->
				</el-table>
				
				<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<span slot="footer" class="dialog-footer">
			       <el-button @click="dialogVisible2 = false">取 消</el-button>
			       <el-button type="primary" @click="addsamplename">确 定</el-button>
			    </span>
			</el-dialog>
			<!-- 样品名称 End -->
			<!-- 客户联系人 Begin -->
			<el-dialog :modal-append-to-body="false" title="客户联系人" :visible.sync="dialogVisible3" width="80%" :before-close="handleClose">
				<el-table :header-cell-style="rowClass" :data="CUSTOMER_PERSONList" row-key="ID" border stripe max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @selection-change="SelChange" @cell-click="iconOperation" :default-sort="{prop:'CUSTOMER.CUSTOMER_PERSONList', order: 'descending'}">
					<el-table-column type="selection" width="55" fixed align="center">
					</el-table-column>
					<!-- <el-table-column label="序号" sortable width="120px" prop="STEP">
					</el-table-column> -->
					<el-table-column label="联系人" sortable width="150px" prop="PERSON">
					</el-table-column>
					<el-table-column prop="PHONE" label="联系电话" sortable width="150px">
					</el-table-column>
					<el-table-column prop="FAX" label="传真" sortable width="150px">
					</el-table-column>
					<el-table-column prop="EMAIL" label="邮箱" sortable>
					</el-table-column>
				</el-table>
				
				<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<span slot="footer" class="dialog-footer">
			       <el-button @click="dialogVisible3 = false">取 消</el-button>
			       <el-button type="primary" @click="addcusname">确 定</el-button>
			    </span>
			</el-dialog>
			<!-- 客户联系人 End -->
		<!--审批页面-->
			<approvalmask :approvingData="approvingData" ref="approvalChild"  @detail="detailgetData"></approvalmask>
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
	import Config from '../../config.js';
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
			return {
				approvingData:{},
				loadSign:true,//加载
				commentArr:{},
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				dataInfo: {
					STATUS: '草稿',
					VERSION:'1',
					INSPECT_PROXY_PROJECList: [],
					INSPECT_PROXY_BASISList: [],
					CHECK_PROXY_CONTRACTList: [],
				},
				gridData: [], //彈出框的數據
				page: {
					currentPage: 1,
					pageSize: 10,
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
				option: [{
					value: '金属组',
					label: '金属组'
				}, {
					value: '涂料组',
					label: '涂料组'
				}],
				value: '',
				selval:[],
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
				dialogVisible: false, //对话框
				rules: {
					V_NAME: [{ required: true, validator: validateVname}],//名称
					V_ADDRESS: [{ required: true,validator: validateVaddress}],//地址
					V_ZIPCODE: [{ required: true,validator: validateVzipcode}],//邮编
					V_PERSON: [{ required: true,validator: validateVperson}],//联系人姓名
					V_PHONE: [{ required: true,validator: validateVphone}],//联系人电话
					R_VENDOR: [{ required: true, message: '必填', trigger: 'blur' }],//责任单位
					VENDOR: [{ required: true, message: '必填', trigger: 'blur' }],//委托单位编号
					P_NAME: [{ required: true,validator: validatePname}],//生产单位名称
					PRODUCT_UNIT:[{required: true, message: '必填', trigger: 'blur'}],//生成单位编号
					ITEM_NAME: [{ required: true,validator: validateItemname}],//样品名称
					ITEM_ID: [{ required: true, message: '必填', trigger: 'blur' }],//标识
					ITEM_MODEL: [{ required: true, message: '必填', trigger: 'blur' }],//型号
					ITEM_QUALITY: [{ required: true, message: '必填', trigger: 'blur' }],//数量
//					ITEM_STATUS: [{ required: true, message: '必填', trigger: 'blur' }],//样品信息状态
					ITEM_SECRECY: [{ required: true, message: '必填', trigger: 'blur' }],//保密要求
					ITEM_METHOD: [{ required: true, message: '必填', trigger: 'change' }],//取样方式
					ITEM_DISPOSITION: [{ required: true, message: '必填', trigger: 'change' }],//检后处理
					REMARKS: [{ required: true, message: '必填', trigger: 'blur' }],//抽样方案/判定依据
					COMPDATE: [{ required: true, message: '必填', trigger: 'blur' }],//完成日期
					PROXYNUM: [{ required: true, message: '必填', trigger: 'blur' }],//编号
					REPORT_QUALITY: [{ required: true, message: '必填', trigger: 'blur' }],//交委托方分数
					REPORT_MODE: [{ required: true, message: '必填', trigger: 'change' }],//发送方式
					REPORT_FOMAT: [{ required: true, message: '必填', trigger: 'change' }],//格式
//					MAINGROUP: [{ required: true, message: '必填', trigger: 'change' }],//主检组
//					LEADER: [{ required: true, message: '必填', trigger: 'blur' }],//主检负责人
					MEMO: [{ required: true, message: '必填', trigger: 'blur' }],//备注
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				// initcost:'',
				// initsta:'',
				// initactual:'',
				dialogVisible2:false,
				dialogVisible3:false,
				samplesList:[],
				customid:1,
				dataid:'',//修改和查看带过的id
				inspectPro:'inspectPro',//appname
				CUSTOMER_PERSONList:[]
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},	
			toNum(str) {
				return str.replace(/\,|\￥/g, "");
			},
			//金额两位小数点千位分隔符，四舍五入
			testPrice(item){
				var money = document.getElementById("testprice").value;
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
				// this.initactual = money;
				var num = parseFloat(this.toNum(money)).toFixed(2).toString().split(".");
				num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
				// this.dataInfo.CHECTCOST="￥" + num.join(".");
				this.dataInfo.ACTUALCOST = num.join(".");
			},
			reset() {					
				this.dataInfo={
					VERSION: '1',
					STATUS: '草稿',
					V_NAME:'',
					MEMO:'',
					LEADER:'',
					MAINGROUP:'',
					INSPECT_PROXY_PROJECList: [],
					INSPECT_PROXY_BASISList: [],
					CHECK_PROXY_CONTRACTList: [],
				};	  
				},
			handleClick(tab, event) {
//		        console.log(tab, event);
		    },
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					row.isEditing = !row.isEditing;
				}
			},
			//生成委托书
			build(dataInfo){
				var dataid = this.dataInfo.ID;
					var Url = this.basic_url + '/api-apps/app/inspectPro/operate/createWorkorder?ID='+dataid;
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
			},
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			//新建行
			addfieldBasis() {
				var obj = {
					P_NUM: '',
					P_DESC: '',
					REMARKS:'',
					VERSION: '',
					STATUS: '1',
					isEditing: true
				};
				this.dataInfo.INSPECT_PROXY_PROJECList.push(obj);
			},
			addfieldProject() {
				var obj = {
					S_NUM: '',
					S_DESC: '',
					VERSION: '',
					STATUS: '1',
					isEditing: true
				};
				this.dataInfo.INSPECT_PROXY_BASISList.push(obj);
			},
			addcheckProCont() {
				var obj = {
					PROXY_CONTRACT_NUM: '',
					PROXYNUM: '',
					VENDOR: '',
					P_REMARKS: '',
					BASIS: '',
					REQUIRE: '',
					Q_TYPE: '',
					CHECKCOST: '',
					STATUS:'1',
					isEditing: true
				};
				this.dataInfo.CHECK_PROXY_CONTRACTList.push(obj);
			},
			addsample(){
				this.$emit('request');
				this.dialogVisible2 = true;
			},
			addsamplename(){
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
					this.dialogVisible2 = false;
					this.dataInfo.ITEM_NAME = this.selval[0].DESCRIPTION;
					this.$emit('request');
				}
			},
			//刪除新建行
			deleteRow(index,rows) {//Table-操作列中的删除行
				rows.splice(index,1);

			},
			//点击按钮显示弹窗
			visible() {
				this.reset();
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.dataInfo.DEPTID = res.data.deptId;
					this.dataInfo.ENTERBY = res.data.id;
					// this.dataInfo.ORGID = res.data.deptName
					var date = new Date();
					this.dataInfo.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
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
			//
			detailgetData() {
			var url = this.basic_url +'/api-apps/app/inspectPro/' + this.dataid;
				this.$axios.get(url, {}).then((res) => {
					console.log(res)
					this.dataInfo = res.data;
					this.show = true;
					//深拷贝数据
					let _obj = JSON.stringify(this.dataInfo);
        			this.datainfo = JSON.parse(_obj);
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
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
						message: '网络错误，请重试',
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
									message: '网络错误，请重试',
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
				this.detailgetData();
				//判断启动流程和审批的按钮是否显示
				var url = this.basic_url + '/api-apps/app/inspectPro/flow/isStart/'+dataid;
				this.$axios.get(url, {}).then((res) => {
					if(res.data.resp_code==1){
						this.start=true;
						this.approval=false;
					}else{
						this.start=false;
						this.approval=true;
					}
				});
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
			// 保存users/saveOrUpdate
			save(dataInfo) {
				this.$refs['dataInfo'].validate((valid) => {
			        if (valid) {
						if(this.dataInfo.INSPECT_PROXY_BASISList.length<=0&&this.dataInfo.INSPECT_PROXY_PROJECList.length<=0&&this.dataInfo.CHECK_PROXY_CONTRACTList.length<=0){
			        		this.$message({
								message: '检验依据和检验项目与要求和分包要求是必填项，请填写！',
								type: 'warning'
							});
							return false;
			        	}else{
							this.dataInfo.ITEM_STATUS=this.dataInfo.ITEM_STATUS==1;
							this.dataInfo.MESSSTATUS= this.dataInfo.MESSSTATUS==1;//信息状态
							console.log(this.dataInfo);
							var url = this.basic_url + '/api-apps/app/inspectPro/saveOrUpdate';
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
							}).catch((err) => {
								this.$message({
									message: '网络错误，请重试',
									type: 'error'
								});
							});
						}
						this.falg = true;
			        }else{
			          	this.show = true;
			            this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
			           this.falg = false;
			        }
				});
			},
			saveAndUpdate(dataInfo){
				this.save(dataInfo);
				if(this.falg){
					this.show = false;
				}
			},
			saveAndSubmit(dataInfo){
				this.save(dataInfo);
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
			getCustomer(type) {
				// type  1 這是負責人  2 這個事接收人
				var params = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = this.basic_url + '/api-apps/app/customer';
				this.$axios.get(url, {
					params: params
				}).then((res) => {
					console.log(23333);
					console.log(res.data);
					this.page.totalCount = res.data.count;
					
					this.gridData = res.data.data;
					this.dialogVisible = true;
					this.type = type;
				});
			},
			dailogconfirm(type) { //小弹出框确认按钮事件
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
					this.dialogVisible = false;
					if(this.type == '1') {
						console.log(this.selval[0].ID);
						this.customid = this.selval[0].ID;
						console.log(this.customid);
						this.dataInfo.VENDOR=this.selval[0].CODE;
						this.dataInfo.V_NAME = this.selval[0].NAME;
						this.dataInfo.V_ADDRESS = this.selval[0].CONTACT_ADDRESS;
						this.dataInfo.V_ZIPCODE = this.selval[0].ZIPCODE;
						this.dataInfo.V_PERSON = this.selval[0].PERSON;
						this.dataInfo.V_PHONE = this.selval[0].PHONE;
					} else {
						this.dataInfo.PRODUCT_UNIT= this.selval[0].CODE;
						console.log(this.dataInfo.PRODUCT_UNIT);
						this.dataInfo.P_NAME = this.selval[0].NAME;
					}
				}
			},
			addname(){
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				console.log(this.customid);
				var url = this.basic_url + '/api-apps/app/customer/CUSTOMER/'+ this.customid;
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.CUSTOMER_PERSONList = res.data.CUSTOMER_PERSONList;
				});
				this.dialogVisible3 = true;
			},
			addcusname(){
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
					this.dataInfo.V_PERSON = this.selval[0].PERSON;
					this.dataInfo.V_PHONE = this.selval[0].PHONE;
					this.dialogVisible3 = false;
				}
			},
			SelChange(val) {
				this.selval = val;
			},
			//启动流程
			startup(){
				console.log(12345);
				console.log(this.dataid);
				var url = this.basic_url + '/api-apps/app/inspectPro/flow/'+this.dataid;
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
							this.requestData();
							this.start=false;
							this.approval=true;
				    }
				});
			},
			//审批流程
			approvals(){
				console.log(this.dataid);
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.inspectPro;
				 var url = this.basic_url + '/api-apps/app/'+this.inspectPro+'/flow/isEnd/'+this.dataid;
		    		this.$axios.get(url, {}).then((res) => {
		    			if(res.data.resp_code == 0) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
		    			}else{
		    				var url = this.basic_url + '/api-apps/app/'+this.inspectPro+'/flow/isExecute/'+this.dataid;
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
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.inspectPro;
//				this.$refs.flowhistoryChild.open();
				this.$refs.flowhistoryChild.getdata(this.dataid);
			},
			//流程地图
			flowmap(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.inspectPro;
				this.$refs.flowmapChild.getimage();
			},
			//当前责任人
			viewpepole(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.inspectPro;
				this.$refs.vewPopleChild.getvewPople(this.dataid);
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = this.basic_url + '/api-apps/app/item';
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
					this.samplesList = newarr;
				}).catch((wrong) => {})
				
			},
		},
		mounted() {
			this.requestData();
			
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

</style>