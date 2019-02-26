<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加工作任务单</div>
					<div class="mask_title" v-show="modifytitle">修改工作任务单</div>
					<div class="mask_title" v-show="viewtitle">查看工作任务单</div>
					<div class="mask_anniu">
						<span class="mask_span mask_max" @click='toggle'>
							<i v-bind:class="{'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						</span>
						<span class="mask_span" @click='close'>
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content">
					<!-- status-icon 验证后文本框上显示对勾图标 -->
					<el-form :model="workorderForm" :label-position="labelPosition" :rules="rules" ref="workorderForm" label-width="110px">
						<div class="text-center" v-show="viewtitle">
							<span v-if="this.workorderForm.STATE!=3">
							<el-button class="start" type="success" round plain size="mini" @click="startup" v-show="start" ><i class="icon-start"></i> 启动流程</el-button>
							<el-button class="approval" type="warning" round plain size="mini" @click="approvals" v-show="approval"><i class="icon-edit-3"></i> 审批</el-button>
							</span>
							<el-button type="primary" round plain size="mini" @click="flowmap" ><i class="icon-git-pull-request"></i> 流程地图</el-button>
							<el-button type="primary" round plain size="mini" @click="flowhistory"><i class="icon-plan"></i> 流程历史</el-button>
							<el-button type="primary" round plain size="mini" @click="viewpepole"><i class="icon-user"></i> 当前责任人</el-button>
						</div>
						<div class="accordion" id="information">
							<el-collapse v-model="activeNames">
								<!-- 样品信息列表 Begin-->
								<el-collapse-item title="样品信息" name="1">
									<el-row :gutter="20">
										<!--<el-col :span="4" class="pull-right">
											<el-input placeholder="活动" v-model="workorderForm.STATUS" :disabled="true" :formatter="judge">
													<template slot="prepend">信息状态</template>
											</el-input>
										</el-col>-->
										<el-col :span="4" class="pull-right">
											<el-input  v-model="workorderForm.STATEDesc" :disabled="edit">
													<template slot="prepend">状态</template>
											</el-input>
										</el-col>
										<el-col :span="6" class="pull-right">
											<el-input placeholder="自动生成" v-model="workorderForm.WONUM" :disabled="edit">
													<template slot="prepend">工作任务单编号</template>
											</el-input>
										</el-col>
									</el-row>

									<el-row class="pt10">
										<el-col :span="8">
											<el-form-item label="委托书编号" prop="PROXYNUM">
												<el-input v-model="workorderForm.PROXYNUM" :disabled="edit">
													<el-button slot="append" icon="el-icon-search" @click="addworkorder" :disabled="noedit"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托书版本" prop="PROXY_VERSION" >
												<el-input v-model="workorderForm.PROXY_VERSION" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="父任务单编号" prop="PARENT_NUM" >
												<el-input v-model="workorderForm.PARENT_NUM" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row >
										<el-col :span="8">
											<el-form-item label="主检员" prop="MASTER_INSPECTOR" >
												<el-input v-model="workorderForm.MASTER_INSPECTOR" :disabled="true">
													<el-button slot="append" icon="el-icon-search" @click="addperson('1')" :disabled="noedit"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="是否主任务单？" prop="IS_MAIN" >
												<el-select clearable v-model="workorderForm.IS_MAIN" filterable allow-create default-first-option placeholder="请选择" style="width:100%" :disabled="noedit">
													<el-option label="是" value="1"></el-option>
													<el-option label="否" value="0"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										
									</el-row>

									<el-row >
										<el-col :span="8">
											<el-form-item label="样品名称" prop="ITEM_NAME">
												<el-input v-model="workorderForm.ITEM_NAME" :disabled="edit">
													<el-button slot="append" icon="el-icon-search" @click="addsample('workorder')" :disabled="noedit"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="规格型号" prop="ITEM_MODEL" >
												<el-input v-model="workorderForm.ITEM_MODEL" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品状态" prop="ITEM_STATUS">
												<el-input v-model="workorderForm.ITEM_STATUS" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row >
										<el-col :span="8">
											<el-form-item label="样品编号" prop="ITEMNUM">
												<el-input v-model="workorderForm.ITEMNUM" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="商标标识" prop="ITEM_TRADEMARK">
												<el-input v-model="workorderForm.ITEM_TRADEMARK" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="抽样日期" prop="CHECK_DATE">
												<el-date-picker v-model="workorderForm.CHECK_DATE" type="date" placeholder="请选择抽样日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
												</el-date-picker>
											</el-form-item>
										</el-col>
										
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="生产日期/批" prop="PRODUCT_DATE">
												<el-date-picker v-model="workorderForm.PRODUCT_DATE" type="date" placeholder="请选择生产日期/批" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
												</el-date-picker>
											</el-form-item>
										</el-col>

										<el-col :span="8">
											<el-form-item label="到站日期" prop="ARRIVAL_DATE">
												<el-date-picker v-model="workorderForm.ARRIVAL_DATE" type="date" placeholder="请选择到站日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品来源" prop="ITEM_SOURCE">
												<el-select v-model="workorderForm.ITEM_SOURCE" style="width: 100%" :disabled="noedit">
													<el-option v-for="(data,index) in Select_ITEM_SOURCE" :key="index" :value="data.code" :label="data.name"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row >
										<el-col :span="8">
											<el-form-item label="样品数量" prop="ITEM_QUALITY">
												<el-input-number type="number" v-model.number="workorderForm.ITEM_QUALITY" @change="handleChangeQuality" :min="1" :max="1000" label="描述文字" style="width: 100%" :disabled="noedit"></el-input-number>
											</el-form-item>
										</el-col>
										<el-col :span="8" >
											<el-form-item label="承检单位" prop="CJDW"  label-width="110px">
												<el-select clearable v-model="workorderForm.CJDW" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit"  @change="RVENDORSelect($event)">
													<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<!-- 样品信息列表 End-->

								<!-- 检测 Begin-->
								<el-collapse-item title="检测" name="2">
									<el-row :gutter="30">
										<el-col :span="24">
											<el-form-item label="抽样方案/判定依据" label-width="130px">
												<el-input type="textarea" rows="5" v-model="workorderForm.CHECK_BASIS" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<!-- 检测 End-->

								<!-- 检测依据 Begin-->
								<!-- <el-collapse-item title="检测依据" name="3">
									
								</el-collapse-item> -->
								<!-- 检测依据 End -->

								<!-- 检测项目与要求 Begin-->
								<el-collapse-item title="检测项目与要求" name="4">
					            	<div class="clearfix pt10">
						            	<el-row>
											<el-col :span="8">
												<el-form-item label="委托方提供技术资料" label-width="140px">
													<el-input placeholder="请输入内容" v-model="workorderForm.TECHNICAL_INFORMATION" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="分包项目">
													<el-input placeholder="请输入内容" v-model="workorderForm.SUB_PROJECT" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="特殊要求">
													<el-input placeholder="请输入内容" v-model="workorderForm.SPECIAL_REQUIREMENTS" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="8">
												<el-form-item label="样品接收人">
													<el-input placeholder="请输入内容" v-model="workorderForm.ITEM_RECCEPT_USER" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="样品接收日期">
													<el-date-picker v-model="workorderForm.ITEM_RECEPT_DATE" type="date" placeholder="请选择样品接收日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
													</el-date-picker>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="完成日期" prop="COMPLETE_DATE">
													<el-date-picker v-model="workorderForm.COMPLETE_DATE" type="date" placeholder="请选择完成日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
													</el-date-picker>
												</el-form-item>
											</el-col>
										</el-row>

										<el-row>
											<el-col :span="8">
												<el-form-item label="完成方式">
													<el-radio-group v-model="workorderForm.COMPLETE_MODE" :disabled="noedit">
														<el-radio v-for="(data,index) in Select_COMPLETE_MODE" :key="index" :label="data.code">{{data.name}}</el-radio>
													</el-radio-group>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="样品接收状态">
													<el-radio-group v-model="workorderForm.ITEM_RECEPT_STATUS":disabled="noedit">
														<el-radio v-for="(data,index) in Select_ITEM_RECEPT_STATUS" :key="index" :label="data.code">{{data.name}}</el-radio>
													</el-radio-group>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<!-- <el-form-item label="样品承接人(专业组)" label-width="150px"> -->
													<!-- <el-input v-model="workorderForm.ITEM_PROFESSIONAL_GROUP" :disabled="edit">
														<el-button slot="append" icon="el-icon-search" @click="addperson('2')" :disabled="noedit"></el-button>
													</el-input> -->
													<el-form-item label="样品承接人(专业组)" prop="ITEM_PROFESSIONAL_GROUP"  label-width="150px">
														<el-select clearable v-model="workorderForm.ITEM_PROFESSIONAL_GROUP" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit"
														>
															<el-option v-for="(data,index) in maingroup" :key="index" :value="data.id" :label="data.fullname"></el-option>
														</el-select>
													</el-form-item>
											</el-col>
										</el-row>

										<el-row>
											<el-col :span="8">
												<el-form-item label="样品承接日期">
													<el-date-picker v-model="workorderForm.UNDERTAKE_DATE" type="date" placeholder="请选择完成日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
													</el-date-picker>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="样品状态" prop="ITEM_STATU">
													<el-input v-model="workorderForm.ITEM_STATU" :disabled="noedit"></el-input>
													<!--<el-select v-model="workorderForm.ITEM_STATUS" style="width: 100%">
														<el-option v-for="(data,index) in Select_ITEM_STATUS" :key="index" :value="data.code" :label="data.name"></el-option>
													</el-select>-->
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="样品返回数量">
													<el-input-number type="number" v-model.number="workorderForm.ITEM_RETURN_QUALITY" @change="handleChangeQuality" :min="1" :max="1000" label="描述文字" style="width: 100%;" :disabled="noedit"></el-input-number>
												</el-form-item>
											</el-col>
										</el-row>

										<el-row>
											<el-col :span="8">
												<el-form-item label="样品返回接收人">
													<!-- <el-select v-model="workorderForm.RETURN_ITEM_USER" style="width: 100%">
														<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.nickname"></el-option>
													</el-select> -->
													<el-input v-model="workorderForm.RETURN_ITEM_USER" :disabled="edit">
														<el-button slot="append" icon="el-icon-search" @click="addperson('3')" :disabled="noedit"></el-button>
													</el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="样品返回日期">
													<el-date-picker v-model="workorderForm.RETURN_ITEM_DATE" type="date" placeholder="请选择完成日期" value-format="yyyy-MM-dd" style="width: 100%;":disabled="noedit">
													</el-date-picker>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="样品检后状态">
													<el-radio-group v-model="workorderForm.ITEM_CHECK_STATUS" :disabled="noedit">
														<el-radio v-for="(data,index) in Select_ITEM_CHECK_STATUS" :key="index" :label="data.code">{{data.name}}</el-radio>
													</el-radio-group>
												</el-form-item>
											</el-col>
										</el-row>

										<el-row>
											<el-col :span="8">
												<el-form-item label="样品处置">
													<el-select v-model="workorderForm.ITEM_MANAGEMENT" style="width: 100%" :disabled="noedit">
														<el-option v-for="(data,index) in Select_ITEM_MANAGEMENT" :key="index" :value="data.code" :label="data.name"></el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="样品承接人">
													<el-input v-model="workorderForm.ITEM_UNDERTAKE_USER" :disabled="edit">
														<el-button slot="append" icon="el-icon-search" @click="addperson('sampleget')" :disabled="noedit"></el-button>
													</el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="专业技术/质量负责人" label-width="150px">
													<el-input v-model="workorderForm.PROFESSIONAL" :disabled="edit">
														<el-button slot="append" icon="el-icon-search" @click="addperson('qualityperson')" :disabled="noedit"></el-button>
													</el-input>
												</el-form-item>
											</el-col>
										</el-row>
									</div>
								</el-collapse-item>
								<!-- 检测项目与要求 End -->
								<!-- 原始数据模板 Begin-->
								<el-collapse-item title="原始数据模板" name="6">	
					            	<div class="clearfix pt10">
						            	<el-row >
											<el-col :span="8">
												<el-form-item label="报告模板">
													<el-input placeholder="请输入内容" v-model="workorderForm.P_NUM" :disabled="noedit">
														 <el-button slot="append" icon="el-icon-search" :disabled="noedit"></el-button>
													</el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="是否寄出">
													<el-switch v-model="workorderForm.SEND" :disabled="noedit"></el-switch>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="是否归档">
													<el-switch v-model="workorderForm.FILE" :disabled="noedit"></el-switch>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row >
											<el-col :span="8">
												<el-form-item label="寄出时间">
													<el-date-picker v-model="workorderForm.SEND_DATE" type="date" placeholder="请选择到站日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
													</el-date-picker>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="归档时间">
													<el-date-picker v-model="workorderForm.FILE_DATE" type="date" placeholder="请选择到站日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
													</el-date-picker>
												</el-form-item>
											</el-col>
										</el-row>
									</div>
								</el-collapse-item>
								<!-- 原始数据模板 End -->
								<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
									<el-tabs v-model="activeName" @tab-click="handleClick">
										<el-tab-pane label="检测依据" name="first">
											<div class="table-func table-funcb">
												<el-button type="primary" size="mini" round v-show="!viewtitle">
													<i class="icon-upload-cloud"></i>
													<font>导入</font>
												</el-button>
												<el-button type="success" size="mini" round @click="addfield1" v-show="!viewtitle">
													<i class="icon-add"></i>
													<font>新建行</font>
												</el-button>
											</div>

											<el-table :data="workorderForm.WORKORDER_BASISList" row-key="ID" border stripe :fit="true" max-height="260" @cell-click="iconOperation" highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'workorderForm.WORKORDER_BASISList', order: 'descending'}">
											    <el-table-column prop="iconOperation" fixed width="50px" v-if="!viewtitle">
											      <template slot-scope="scope">
											      	<i class="el-icon-check" v-show="scope.row.isEditing">
											      	</i>
											      	<i class="el-icon-edit" v-show="!scope.row.isEditing">
											      	</i>
											      </template>
											    </el-table-column>

											    <el-table-column label="标准编号" sortable width="160px" prop="S_NUM">
											      <template slot-scope="scope">
											      	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_NUM" >
														  <el-button slot="append" icon="el-icon-search"></el-button>
													</el-input>
													<span v-show="!scope.row.isEditing">{{scope.row.S_NUM}}</span>
											      </template>
											    </el-table-column>

											    <el-table-column label="标准名称" sortable prop="S_NAME">
											      <template slot-scope="scope">
											      	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_NAME"></el-input><span v-show="!scope.row.isEditing">{{scope.row.S_NAME}}</span>
											      </template>
											    </el-table-column>
											    <el-table-column prop="VERSION" label="标准版本" sortable width="120px">
											      <template slot-scope="scope">
											         <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.VERSION" ></el-input><span v-show="!scope.row.isEditing">{{scope.row.VERSION}}</span>
											      </template>
											    </el-table-column>

											     <!-- <el-table-column prop="STATUS" label="信息状态" sortable width="120px" :formatter="judge">
											      <template slot-scope="scope">
											         <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.STATUS" :disabled="true"></el-input><span v-show="!scope.row.isEditing">{{scope.row.STATUS}}</span>
											      </template>
											    </el-table-column> -->

											    <el-table-column fixed="right" label="操作" width="120" v-if="!viewtitle">
											      <template slot-scope="scope">
											         <el-button @click.native.prevent="deleteRow(scope.$index,workorderForm.WORKORDER_BASISList)" type="text" size="small">
											      <i class="icon-trash red"></i>
											        </el-button>
											      </template>
											    </el-table-column>
											  </el-table>
										</el-tab-pane>
										<el-tab-pane label="检测项目与要求" name="second">
											<div class="table-func table-funcb">
												<el-button type="success" size="mini" round @click="addfield2" v-show="!viewtitle">
													<i class="icon-add"></i>
													<font>新建行</font>
												</el-button>
											</div>
							            	<el-table :data="workorderForm.WORKORDER_PROJECTList" border stripe :fit="true" max-height="260" @cell-click="iconOperation" style="width: 100%;" :default-sort="{prop:'workorderbasisList', order: 'descending'}">
							            		<el-table-column prop="iconOperation" fixed width="50px" v-if="!viewtitle">
											      <template slot-scope="scope">
											      	<i class="el-icon-check" v-show="scope.row.isEditing">
											      	</i>
											      	<i class="el-icon-edit" v-show="!scope.row.isEditing">
											      	</i>
											      </template>
											    </el-table-column>
							            		<el-table-column prop="P_NUM" label="检测项目编号" sortable>
															<template slot-scope="scope">
																
																<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_NUM" placeholder="请输入">	
																</el-input>
																<span v-else="v-else">{{scope.row.P_NUM}}</span>
															
															</template>
												</el-table-column>
												<el-table-column prop="P_DESC" label="检测项目名称" sortable>
															<template slot-scope="scope">
																<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_DESC" placeholder="请输入">	
																</el-input>
																<span v-else="v-else">{{scope.row.P_DESC}}</span>
															</template>
												</el-table-column>
							          			<el-table-column prop="HOSTPERSON" label="主检员" sortable>
															<template slot-scope="scope">
																<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.HOSTPERSON" placeholder="请输入">
																</el-input>
																<span v-else="v-else">{{scope.row.HOSTPERSON}}</span>
															</template>
												</el-table-column>
												<el-table-column prop="FOLLOWPERSON" label="从检员" sortable>
															<template slot-scope="scope">
																<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.FOLLOWPERSON" placeholder="请输入">	
																</el-input>
																<span v-else="v-else">{{scope.row.FOLLOWPERSON}}</span>
															</template>
												</el-table-column>
							            		<el-table-column prop="REMARKS" label="要求" sortable>
															<template slot-scope="scope">
																<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REMARKS" placeholder="请输入">	
																</el-input>
																<span v-else="v-else">{{scope.row.REMARKS}}</span>
															</template>
												</el-table-column>
							            		<el-table-column prop="VERSION" label="版本" sortable>
															<template slot-scope="scope">
																<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入">	
																</el-input>
																<span v-else="v-else">{{scope.row.VERSION}}</span>
															</template>
												</el-table-column>
											      <el-table-column fixed="right" label="操作" width="120" v-if="!viewtitle">
											      <template slot-scope="scope">
											         <el-button title="删除" @click.native.prevent="deleteRow(scope.$index,workorderForm.WORKORDER_PROJECTList)" type="text" size="small">
											      		<i class="icon-trash red"></i>
											        </el-button>
													<el-button title="生成子任务单" @click.native.prevent="deleteRow(scope.$index,workorderForm.WORKORDER_PROJECTList)" type="text" size="small">
											      		<i class="icon-send"></i>
											        </el-button>
											      </template>
											    </el-table-column>
							            	</el-table>
										</el-tab-pane>
										<el-tab-pane label="检验员信息" name="third">
											<div class="table-func table-funcb">
												<el-button type="success" size="mini" round @click="addfield3" v-show="!viewtitle">
													<i class="icon-add"></i><font>新建行</font>
												</el-button>
											</div>
							            	<el-table :data="workorderForm.WORKORDER_CHECKPERSONList" border stripe :fit="true" max-height="260" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'WORKORDER_CHECKPERSONList', order: 'descending'}">
							            		<el-table-column prop="iconOperation" fixed width="50px" v-if="!viewtitle">
											      <template slot-scope="scope">
											      	<i class="el-icon-check" v-show="scope.row.isEditing">
											      	</i>
											      	<i class="el-icon-edit" v-show="!scope.row.isEditing">
											      	</i>
											      </template>
											    </el-table-column>
							            		<el-table-column label="人员姓名" sortable prop="NAME">
											      <template slot-scope="scope">
											      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.NAME"></el-input><span v-else="v-else">{{scope.row.NAME}}</span>
											      </template>
											    </el-table-column>
											    <el-table-column label="用户名" sortable prop="USER">
											      <template slot-scope="scope">
											      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.USER"></el-input><span v-else="v-else">{{scope.row.USER}}</span>
											      </template>
											    </el-table-column>
											    <el-table-column label="机构" sortable prop="DEPARTMENT">
											      <template slot-scope="scope">
											      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DEPARTMENT"></el-input><span v-else="v-else">{{scope.row.DEPARTMENT}}</span>
											      </template>
											    </el-table-column>
											    <el-table-column label="电话" sortable prop="TELPHONE">
											      <template slot-scope="scope">
											      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.TELPHONE"></el-input><span v-else="v-else">{{scope.row.TELPHONE}}</span>
											      </template>
											    </el-table-column>
							            		<el-table-column fixed="right" label="操作" width="120" v-if="!viewtitle">
											      <template slot-scope="scope">
											        <el-button @click.native.prevent="deleteRow(scope.$index,workorderForm.WORKORDER_CHECKPERSONList)" type="text" size="small">
											       <i class="icon-trash red"></i>
											        </el-button>
											      </template>
											    </el-table-column>
							            	</el-table>
										</el-tab-pane>
										<el-tab-pane label="原始数据模板" name="fourth">
											<div class="table-func table-funcb">
												<el-button style="float:left;" type="success" size="mini" round @click="getreport" v-show="modifytitle">
													<i class="icon-add"></i><font>生成报告</font>
												</el-button>
												<el-button style="float:left;" type="success" size="mini" round @click="addfield4" v-show="!viewtitle">
													<i class="icon-add"></i><font>新建行</font>
												</el-button>
												<form method="post" id="file" action="" enctype="multipart/form-data" style="float: left;">
													<el-button title="上传" type="text" size="small"  class="a-upload">
														<i class="icon-arrow-up-circle"></i>
														<input id="excelFile" type="file" name="uploadFile" @change="upload"/>
													</el-button>
												</form>
												<el-button title="下载" type="text" size="small">
													<i class="icon-arrow-down-circle"></i>
												</el-button>
												<el-button title="删除" @click.native.prevent="deleteRow()" type="text" size="small">
													<i class="icon-trash red"></i>
												</el-button>
											</div>
											<el-table :data="workorderForm.WORKORDER_DATA_TEMPLATEList" 
													  border 
													  stripe 
													  :fit="true" 
													  max-height="260" 
													  style="width: 100%;" 
													  @cell-click="iconOperation" 
													  :default-sort="{prop:'WORKORDER_DATA_TEMPLATEList', order: 'descending'}">
												<el-table-column prop="iconOperation" fixed width="50px">
											      <template slot-scope="scope">
											      	<i class="el-icon-check" v-show="scope.row.isEditing">
											      	</i>
											      	<i class="el-icon-edit" v-show="!scope.row.isEditing">
											      	</i>
											      </template>
											    </el-table-column>
												<el-table-column label="模板编号" sortable prop="D_NUM">
											      <template slot-scope="scope">
											      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.D_NUM" :disabled="edit">
											      		<el-button slot="append" icon="el-icon-search" @click="templateNumber(scope.row) "></el-button>
											      	</el-input>
											      	<span v-else="v-else">{{scope.row.D_NUM}}</span>
											      </template>
											    </el-table-column>
											    <el-table-column label="模板描述" sortable prop="DESC">
											      <template slot-scope="scope">
											      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DESC" :disabled="edit"></el-input>
											      	<span v-else="v-else">{{scope.row.DESC}}</span>
											      </template>
											    </el-table-column>
							            		<el-table-column label="模板文件大小" prop="FILESIZE">
													<template slot-scope="scope">
													 	<el-checkbox  v-if="!!scope.row.FILESIZE">{{scope.row.FILESIZE+'M'}}</el-checkbox>
													</template>
												</el-table-column>
												<el-table-column label="上传文件大小" prop="FILESIZE_ORG">
													<template slot-scope="scope">
													 	<el-checkbox v-if="!!scope.row.FILESIZE_ORG">{{scope.row.FILESIZE_ORG+'M'}}</el-checkbox>
													</template>
												</el-table-column>
							            	</el-table>
										</el-tab-pane>
										<el-tab-pane label="仪器和计量器具" name="fifth">
											<div class="table-func table-funcb">
												<el-button type="primary" size="mini" round @click="basisleadbtn">
													<i class="icon-add"></i><font>新建行</font>
												</el-button>
											</div>

											<el-table :data="workorderForm.WORKORDER_ASSETList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.INSPECT_PROXY_BASISList', order: 'descending'}">
												<el-table-column prop="ASSETNUM" label="设备编号" sortable width="150px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORKORDER_ASSETList.'+scope.$index + '.ASSETNUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ASSETNUM" placeholder="请输入">
															   <el-button slot="append" icon="el-icon-search"></el-button>
														</el-input>
														<span v-else="v-else">{{scope.row.ASSETNUM}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<el-table-column prop="WONUM" label="工作任务单编号" sortable>
													<template slot-scope="scope">
														<el-form-item :prop="'WORKORDER_ASSETList.'+scope.$index + '.WONUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WONUM" placeholder="请输入">	
														</el-input>
														<span v-else="v-else">{{scope.row.WONUM}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												
												<el-table-column prop="DESCRIPTION" label="设备名称" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORKORDER_ASSETList.'+scope.$index + '.DESCRIPTION'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DESCRIPTION" placeholder="请输入">
														</el-input>
														<span v-else="v-else">{{scope.row.DESCRIPTION}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<el-table-column prop="MODEL" label="规格型号" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORKORDER_ASSETList.'+scope.$index + '.MODEL'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MODEL" placeholder="请输入">
														</el-input>
														<span v-else="v-else">{{scope.row.MODEL}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<el-table-column prop="USE_PERSON" label="使用人" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORKORDER_ASSETList.'+scope.$index + '.USE_PERSON'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.USE_PERSON" placeholder="请输入">
														</el-input>
														<span v-else="v-else">{{scope.row.USE_PERSON}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												
												<el-table-column fixed="right" label="操作" width="120px">
													<template slot-scope="scope">
													  <el-button title="删除" @click.native.prevent="deleteRow(scope.$index,scope.row,'equipList')" type="text" size="small">
														<i class="icon-trash red"></i>
													  </el-button>
													</template>
												</el-table-column>
											</el-table>
										</el-tab-pane>
										<el-tab-pane label="检验报告" name="sixth">
											<div class="table-func table-funcb">
												<el-button type="primary" size="mini" round @click="basisleadbtn">
													<i class="icon-add"></i><font>生成报告</font>
												</el-button>
											</div>

											<el-table :data="workorderForm.WORKORDER_REPORTList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.INSPECT_PROXY_BASISList', order: 'descending'}">
												<el-table-column prop="REPORTNUM" label="报告编号" sortable width="150px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORKORDER_REPORTList.'+scope.$index + '.REPORTNUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REPORTNUM" placeholder="请输入">
															   <el-button slot="append" icon="el-icon-search"></el-button>
														</el-input>
														<span v-else="v-else">{{scope.row.REPORTNUM}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<!-- <el-table-column prop="PROXYNUM" label="委托书编号" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORKORDER_REPORTList.'+scope.$index + '.PROXYNUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXYNUM" placeholder="请输入">
														</el-input>
														<span v-else="v-else">{{scope.row.PROXYNUM}}</span>
														</el-form-item>
													</template>
												</el-table-column> -->

												<el-table-column prop="REPORTNAME" label="报告名称" sortable>
													<template slot-scope="scope">
														<el-form-item :prop="'WORKORDER_REPORTList.'+scope.$index + '.REPORTNAME'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REPORTNAME" placeholder="请输入">	
														</el-input>
														<span v-else="v-else">{{scope.row.REPORTNAME}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												
												<el-table-column prop="PREVIEW" label="预览" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORKORDER_REPORTList.'+scope.$index + '.PREVIEW'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PREVIEW" placeholder="请输入">
														</el-input>
														<span v-else="v-else">{{scope.row.PREVIEW}}</span>
														</el-form-item>
													</template>
												</el-table-column>

												<el-table-column prop="VERSION" label="版本" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'WORKORDER_REPORTList.'+scope.$index + '.VERSION'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入">
														</el-input>
														<span v-else="v-else">{{scope.row.MOVERSIONDEL}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column fixed="right" label="操作" width="120px">
													<template slot-scope="scope">
														 
													  <el-button title="编辑" type="text" size="small">
														<i class="icon-edit2"></i>
													  </el-button>
													  <el-button title="打印" type="text" size="small">
														<i class="icon-print"></i>
													  </el-button>
													  <el-button title="下载" type="text" size="small">
														<i class="icon-arrow-down-circle"></i>
													  </el-button>
													</template>
												</el-table-column>
											</el-table>
									    </el-tab-pane>
										<el-tab-pane label="分包项目" name="seventh">
											<el-table :data="workorderForm.WORKORDER_CONTRACTList" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'workorderForm.WORKORDER_CONTRACTList', order: 'descending'}">
												<el-table-column prop="WONUM" label="工作任务单编号" sortable width="150px">
													<template slot-scope="scope">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WONUM">
														</el-input>
														<span v-else="v-else">{{scope.row.WONUM}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="PROXY_CONTRACT_NUM" label="分包协议编号" sortable width="120px">
													<template slot-scope="scope">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXY_CONTRACT_NUM">
														</el-input>
														<span v-else="v-else">{{scope.row.PROXY_CONTRACT_NUM}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="PROXYNUM" label="委托书编号" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXYNUM" placeholder="请输入委托方名称">
														</el-input>
														<span v-else="v-else">{{scope.row.PROXYNUM}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="V_NAMEDesc" label="委托单位" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.V_NAMEDesc" placeholder="请输入委托方名称">
														</el-input>
														<span v-else="v-else">{{scope.row.V_NAMEDesc}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="INSPECT_GROUP" label="专业组" sortable width="120px">
													<template slot-scope="scope">
														<el-select clearable v-model="scope.row.INSPECT_GROUP" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit" @change="getmaingroup($event)" @visible-change="visablemaingroup($event)" >
															<el-option v-for="data in maingroup" :key="data.id" :value="data.id" :label="data.fullname"></el-option>
														</el-select>
													</template>
												</el-table-column>
												<el-table-column prop="VENDORDesc" label="分包方名称" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.VENDORDesc" placeholder="请输入分包方名称">
															<el-button slot="append" icon="el-icon-search" @click="getDept(scope.row)">
															</el-button>
														</el-input>
														<span v-else="v-else">{{scope.row.VENDORDesc}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="depttypeName" label="机构属性" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.depttypeName" placeholder="请输入分包方名称">
														</el-input>
														<span v-else="v-else">{{scope.row.depttypeName}}</span>
													</template>
												</el-table-column>
												<!-- <el-table-column prop="PRODUCT_TYPE" label="产品类别" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.PRODUCT_TYPE" placeholder="请输入分包方名称">
															<el-button slot="append" icon="el-icon-search" @click="addcategory(scope.row)">
															</el-button>
														</el-input>
														<span v-else="v-else">{{scope.row.PRODUCT_TYPE}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="PRODUCT" label="产品名称" sortable width="120px">
													<template slot-scope="scope">
														<el-input :disabled="true" v-if="scope.row.isEditing" size="small" v-model="scope.row.PRODUCT" placeholder="请输入分包方名称">
															<el-button slot="append" icon="el-icon-search" @click="addproduct(scope.row)">
															</el-button>
														</el-input>
														<span v-else="v-else">{{scope.row.PRODUCT}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="BASIS" label="检验检测技术依据" sortable width="150px">
													<template slot-scope="scope">
														<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.BASIS" placeholder="请输入分包方名称">
															<el-button slot="append" icon="el-icon-search" @click="basisleadbtn(scope.row)">
															</el-button>
														</el-input>
														<span v-else="v-else">{{scope.row.BASIS}}</span>
													</template>
												</el-table-column> -->

												<el-table-column prop="P_REMARKS" label="检验项目内容" sortable width="200px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.P_REMARKS'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_REMARKS" placeholder="请输入">
																<el-button slot="append" icon="el-icon-search" @click="basisleadbtn2(scope.row)">
																</el-button>
															</el-input>
														<span v-else="v-else">{{scope.row.P_REMARKS}}</span>
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
												<el-table-column prop="CHECKCOST" label="检验费用" sortable width="120px">
													<template slot-scope="scope">
														<el-form-item :prop="'CHECK_PROXY_CONTRACTList.'+scope.$index + '.CHECKCOST'" :rules="[{required: true, message: '请输入数字', trigger: 'blur'}]" >
														<el-input v-if="scope.row.isEditing" id="testprice" @blur="testPrice(scope.row)" size="small" v-model="scope.row.CHECKCOST" placeholder="请输入内容"></el-input>
														<span v-else="v-else">{{scope.row.CHECKCOST}}</span>
														</el-form-item>
													</template>
												</el-table-column>
												<el-table-column fixed="right" label="操作" width="120">
													<template slot-scope="scope">
														<el-button title="生成分包协议" type="text" size="small" @click="proagree(scope.row)">
															 <i class="icon-send red"></i>
														</el-button>
													</template>
												</el-table-column>
											</el-table>
									    </el-tab-pane>
									</el-tabs>
									<div class="pt10">
										<el-row>
											<el-col :span="24">
												<el-form-item label="备注" prop="MEMO" label-width="45px">
													<el-input type="textarea" :row="3" v-model="workorderForm.MEMO" :disabled="noedit"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
									</div>
								</div>
								
								<!-- 录入人信息 Begin-->
								<el-collapse-item title="其他" name="7" v-show="views">
									<el-row >
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBYDesc">
												<el-input v-model="workorderForm.ENTERBYDesc" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入日期" prop="ENTERDATE">
												<el-input v-model="workorderForm.ENTERDATE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="机构" prop="DEPTIDDesc">
												<el-input v-model="workorderForm.DEPTIDDesc" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row >
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBYDesc">
												<el-input v-model="workorderForm.CHANGEBYDesc" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改日期" prop="CHANGEDATE">
												<el-input v-model="workorderForm.CHANGEDATE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<!-- 录入人信息 End -->
							</el-collapse>
						</div>
						<div class="el-dialog__footer" v-if="!viewtitle">
							<el-button type="primary" @click="submitForm">保存</el-button>
							<el-button type="success" v-show="addtitle">保存并继续</el-button>
							<el-button @click='close'>取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
			<!--人员信息 Begin-->
			<el-dialog :modal-append-to-body="false" title="人员信息" :visible.sync="dialogVisible2" width="80%">
				<div class="scrollbar" style="max-height: 400px;">
					<el-table :data="userList" border stripe :header-cell-style="rowClass"  style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore('user')">
						<el-table-column type="selection" width="55" fixed align="center">
						</el-table-column>
						<el-table-column label="用户名" sortable width="140px" prop="username">
						</el-table-column>
						<el-table-column label="姓名" sortable width="200px" prop="nickname">
						</el-table-column>
						<el-table-column label="机构" sortable width="150px" prop="deptName">
						</el-table-column>
						<el-table-column label="公司" sortable prop="companyName">
						</el-table-column>
						<el-table-column label="创建时间" prop="createTime" width="100px" sortable :formatter="dateFormat">
						</el-table-column>
					</el-table>
				</div> 
					<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
					</el-pagination>
					<span slot="footer" class="dialog-footer">
				       <el-button type="primary" @click="addpersonname">确 定</el-button>
				       <el-button @click="dialogVisible2 = false">取 消</el-button>
				    </span>   
				</el-dialog>
			<!--主检员 End-->
			
			<!--委托书编号-->
			<inspectmask ref="inspectchild" @appendpro="appendpro" @appendver="appendver"></inspectmask>
			<!-- 样品名称  -->
			<sampletmask ref="samplechild" @appendname="appendname" @appendmod="appendmod" @appendsta="appendsta" @appendite="appendite"  ></sampletmask>
			<!-- 原始模版  -->
			<templatemask ref="templatechild" @appendnum="appendnum" @appenddes="appenddes" @showModule ="showModule" ></templatemask>
			<!--审批页面-->
			<approvalmask :approvingData="approvingData" ref="approvalChild" @detail="detailgetData"  ></approvalmask>
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
	import inspectmask from '../common/common_mask/inspectmask.vue'//委托书
	import sampletmask from '../common/common_mask/samplemask.vue'//样品
	import templatemask from '../common/common_mask/templatemask.vue'//模版
	import approvalmask from '../workflow/approving.vue'
	import flowhistorymask from '../workflow/flowhistory.vue'
	import flowmapmask from '../workflow/flowmap.vue'
	import vewPoplemask from '../workflow/vewPople.vue'
	import { Loading } from 'element-ui'
	export default {
		name: 'masks',
		components: {
			 approvalmask,
			 flowhistorymask,
			 flowmapmask,
			 vewPoplemask,
			 inspectmask,
			 sampletmask,
			 templatemask
		},
		data() {
			var validateProxynum = (rule, value, callback) => {//委托书编号
                if (this.workorderForm.PROXYNUM === undefined || this.workorderForm.PROXYNUM === '' || this.workorderForm.PROXYNUM === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateProxyversion = (rule, value, callback) => {//委托书版本
                if (this.workorderForm.PROXY_VERSION === undefined || this.workorderForm.PROXY_VERSION === '' || this.workorderForm.PROXY_VERSION === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateItemname = (rule, value, callback) => {//样品名称
                if (this.workorderForm.ITEM_NAME === undefined || this.workorderForm.ITEM_NAME === '' || this.workorderForm.ITEM_NAME === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateItemname = (rule, value, callback) => {//规格型号
                if (this.workorderForm.ITEM_MODEL === undefined || this.workorderForm.ITEM_MODEL === '' || this.workorderForm.ITEM_MODEL === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateItemnum = (rule, value, callback) => {//样品编号
                if (this.workorderForm.ITEMNUM === undefined || this.workorderForm.ITEMNUM === '' || this.workorderForm.ITEMNUM === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			return {
				file_url: Config.file_url,
				approvingData:{},//流程传的数据
				dialogVisible2:false,
				workorderForm: {
					WORKORDER_BASISList:[],//检测依据
					WORKORDER_PROJECTList:[],//检测项目
					WORKORDER_CHECKPERSONList:[],//检验员信息
					WORKORDER_DATA_TEMPLATEList:[],//原始数据模板
					WORKORDER_REPORT_TEMPLATEList:[],//报告模板
				},
				basic_url: Config.dev_url,
				loadSign:true,//加载
				commentArr:{},
				selMenu:[],
				show: false,
				modify:false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				addtitle:true,//添加弹出框titile
				modifytitle:false,//修改弹出框titile
				viewtitle: false, //查看弹出框title
				views: false,
				edit: true, //禁填
				noedit:false,
				approval:false,
				start:false,
				activeName: 'first', //tabs
				activeNames: ['1','2','3','4','5','6','7'],//手风琴数量
				labelPosition: 'right', //表格
				// searchList: { //点击高级搜索后显示的内容
				// 	WONUM: '',//工作任务单编号
				// 	ITEM_NAME: '',//样品名称
				// 	PROXYNUM: '',//委托书编号
				// 	STATE: '',//状态
				// 	COMPLETE_DATE: '',//完成日期
				// 	ENTERBY: '',//录入人
				// 	ENTERDATE: '',//录入日期
				// },
				search:'',
				selectData:[],//承检单位
				Select_ITEM_STATUS:[],//获取样品信息-样品状态
				Select_ITEM_SOURCE:[],//获取样品信息-样品来源
				Select_COMPLETE_MODE:[],//获取样品信息-完成方式
				Select_ITEM_RECEPT_STATUS:[],//获取样品信息-样品接收状态
				Select_ITEM_CHECK_STATUS:[],//获取样品信息-样品检后状态
				Select_ITEM_MANAGEMENT:[],//获取样品信息-样品处置
				fileList:[],//上传附件数据
				rules: {
					PROXYNUM: [{ required: true, validator: validateProxynum}],//委托书编号
					PROXY_VERSION: [{ required: true, validator: validateProxyversion}],//委托书版本
					WONUM: [{ required: true, message: '不能为空', trigger: 'blur' }],
					ITEM_NAME: [{ required: true,validator: validateItemname}],//样品名称
					ITEM_MODEL: [{ required: true,validator: validateItemname}],//规格型号
					ITEMNUM: [{ required: true,validator: validateItemnum}],//样品编号
					ITEM_STATU: [{ required: true, message: '不能为空', trigger: 'blur' }],
					ITEM_STATUS: [{ required: true, message: '不能为空', trigger: 'blur' }],
					ITEM_SOURCE: [{ required: true, message: '不能为空', trigger: 'change' }],
					ITEM_QUALITY: [{ required: true, message: '不能为空', trigger: 'blur' }],
					CHECK_BASIS: [{ required: true, message: '不能为空', trigger: 'blur' }],
					COMPLETE_DATE: [{ required: true, message: '不能为空', trigger: 'blur' }],
					COMPLETE_MODE: [{ required: true, message: '不能为空', trigger: 'blur' }],
					ITEM_RECEPT_STATUS: [{ required: true, message: '不能为空', trigger: 'blur' }],
					ITEM_PROFESSIONAL_GROUP: [{ required: true, message: '不能为空', trigger: 'blur' }],
					STATUS: [{ required: true, message: '不能为空', trigger: 'blur' }],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				isEditList: false,  //年度计划列表编辑装填
				selval:[],
				userList:[],
				samplesList:[],
				categoryList:[],
				numtips:'',
				workorder:'workorder',//appname
				page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				isEditing: true,
				modulenum:'',
				username:'',
				maingroup:[],//专业组
				docParm: {}
			};
		},
		methods: {
			upload(e){
				var formData = new FormData();
				var loading;
				loading = Loading.service({
					fullscreen: true,
					text: '拼命上传中...',
					background: 'rgba(F,F, F, 0.8)'
				});
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
				var url = '';
				var url = this.file_url + '/file/uploadfile?userid=' + this.docParm.userid 
						+ '&username=' + this.docParm.username
						+ '&deptid=' + this.docParm.deptid
						+ '&deptfullname=' + this.docParm.deptfullname
						+ '&recordid=' + this.docParm.recordid
						+ '&appname=' + this.docParm.appname
						+ '&appid=' + this.docParm.appid;
				console.log(url);
				this.$axios.post(url, formData, config
				).then((res)=>{
					loading.close();
					// this.$emit('closeLoading');
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
						this.modulenum.FILEID = res.data.fileid;
						this.modulenum.FILESIZE = res.data.filesize;
					}
				})
			},
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			reset(){
            	this.workorderForm = {
					PROXYNUM: '',//委托书编号
					PROXY_VERSION: '',//委托书版本
					PARENT_NUM: '',//父任务单编号
					IS_MAIN: '',//是否主任务单？
					MASTER_INSPECTOR: '',//主检员
					CJDW:'',//承检单位
					STATE: '',//信息状态
					STATUS: '',//状态
					WONUM: '',//工作任务单编号
					ITEM_NAME: '',//样品名称
					ITEM_MODEL: '',//规格型号
					ITEM_TRADEMARK: '',//商标标识
					ITEMNUM: '',//样品编号
					CHECK_DATE: '',//抽样日期
					PRODUCT_DATE: '',//生产日期/批
					ITEM_STATU: '',//填写的样品状态
					ITEM_STATUS: '',//选择的样品状态
					ARRIVAL_DATE: '',//到站日期
					ITEM_QUALITY: '',//样品数量
					ITEM_SOURCE: '',//样品来源
					CHECK_BASIS: '',//抽样方案/判定依据
					TECHNICAL_INFORMATION: '',//委托方提供技术资料
					SUB_PROJECT: '',//分包项目
					SPECIAL_REQUIREMENTS: '',//特殊要求
					ITEM_RECCEPT_USER: '',//样品接收人
					ITEM_RECEPT_DATE: '',//样品接收日期
					COMPLETE_DATE: '',//完成日期
					COMPLETE_MODE: '',//完成方式
					ITEM_RECEPT_STATUS: '',//样品接收状态
					ITEM_PROFESSIONAL_GROUP: '',//样品承接人(专业组)
					UNDERTAKE_DATE: '',//样品承接日期
					ITEM_RETURN_QUALITY: '',//样品返回数量
					RETURN_ITEM_USER: '',//样品返回接收人
					RETURN_ITEM_DATE: '',//样品返回日期
					ITEM_CHECK_STATUS: '',//样品检后状态
					ITEM_MANAGEMENT: '',//样品处置
					ITEM_UNDERTAKE_USER: '',//样品承接人
					PROFESSIONAL: '',//专业技术/质量负责人
					CHECK_BASIS: '',//报告模板
					SEND: '',//是否寄出
					FILE: '',//是否归档
					SEND_DATE: '',//寄出时间
					FILE_DATE: '',//归档时间
					ENTERBY: '',//录入人
					ENTERDATE: '',//录入日期
					ORG_CODE: '',//录入人机构
					CHANGEBY: '',//修改人
					CHANGEDATE: '',//修改日期
					STATEDesc:'草稿',
					STATE:'1',
					WORKORDER_BASISList:[],//检测依据
					WORKORDER_PROJECTList:[],//检测项目
					WORKORDER_CHECKPERSONList:[],//检验员信息
					WORKORDER_DATA_TEMPLATEList:[],//原始数据模板
				};
			},
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					row.isEditing = !row.isEditing;
				}
			},
			handleClick(tab, event) {
//		        console.log(tab, event);
		   },
			sizeChange(val) {
				this.page.pageSize = val;
				this.getuser();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.getuser();
			},
			//委托书编号
			addworkorder(){	
				this.$refs.inspectchild.visible();
			},
			appendpro(value){
				this.workorderForm.PROXYNUM =value;
					
			},
			appendver(value){
				this.workorderForm.PROXY_VERSION =value;
			},
			//样品
			addsample(type){
				this.$refs.samplechild.visible(type);
			},
			appendname(value){
				this.workorderForm.ITEM_NAME = value;//样品名称
			},
			appendmod(value){
				this.workorderForm.ITEM_MODEL = value;//样品名称
			},
			appendsta(value){
				this.workorderForm.ITEM_STATUS = value;//样品名称
			},
			appendite(value){
				this.workorderForm.ITEMNUM = value;//样品名称
			},
			addperson(num){
				this.getuser();
				this.numtips = num;
				this.dialogVisible2 = true;
			},
			addpersonname(){
				if(this.selMenu.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selMenu.length > 1){
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
				}else{
					if(this.numtips == '1'){
						this.workorderForm.MASTER_INSPECTOR = this.selMenu[0].nickname;
					}else if(this.numtips == '2'){
						this.workorderForm.ITEM_PROFESSIONAL_GROUP = this.selMenu[0].nickname;
					}else if(this.numtips == '3'){
						this.workorderForm.RETURN_ITEM_USER = this.selMenu[0].nickname;
					}else if(this.numtips == 'sampleget'){
						this.workorderForm.ITEM_UNDERTAKE_USER = this.selMenu[0].nickname;
					}else if(this.numtips == 'qualityperson'){
						this.workorderForm.PROFESSIONAL = this.selMenu[0].nickname;
					}
					this.dialogVisible2 = false;
					this.getuser();
				}
			},
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
			//承检单位带出样品承接人(专业组)
			RVENDORSelect(RVENDORid){
				var url = this.basic_url + '/api-user/depts/findByPid/'+RVENDORid;
					this.$axios.get(url, {}).then((res) => {
						this.maingroup = res.data;
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
			},
			 //模版编号
            templateNumber(item){
            	this.modulenum = item;
            	this.$refs.templatechild.visible();

            },
            appendnum(value){
            	this.modulenum.D_NUM=value;
            },
            appenddes(value){
            	this.modulenum.DESC=value;
            },
			showModule(data){
				this.modulenum.D_NUM = data.num;
				this.modulenum.D_DESC = data.desc;
				var url = this.file_url + '/file/fileList?page=0&size=10';
				this.$axios.post(url,{
					'appname': '检验检测项目_原始数据模板',
					'recordid': data.id,
				}).then((res) => {
					this.modulenum.FILESIZE_ORG = res.data.fileList[0].filesize;
					this.modulenum.FILEPATH_ORG = res.data.fileList[0].filepath;
					this.modulenum.FILEID_ORG = res.data.fileList[0].fileid;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
   			//获取样品信息-样品状态
			getITEM_STATUS() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=ITEM_STATUS';
				this.$axios.get(url, {}).then((res) => {
					this.Select_ITEM_STATUS = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},

			//获取样品信息-样品来源
			getITEM_SOURCE() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=ITEM_SOURCE';
				this.$axios.get(url, {}).then((res) => {
					this.Select_ITEM_SOURCE = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},

			//获取样品信息-完成方式
			getCOMPLETE_MODE() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=COMPLETE_MODE';
				this.$axios.get(url, {}).then((res) => {
					this.Select_COMPLETE_MODE = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},

			//获取样品信息-样品接收状态
			getITEM_RECEPT_STATUS() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=ITEM_RECEPT_STATUS';
				this.$axios.get(url, {}).then((res) => {
					this.Select_ITEM_RECEPT_STATUS = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},

			//获取样品信息-接收人、
			getselectData() {
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=DEPT_TYPE';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},

			//获取样品信息-样品检后状态
			getITEM_CHECK_STATUS() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=ITEM_CHECK_STATUS';
				this.$axios.get(url, {}).then((res) => {
					this.Select_ITEM_CHECK_STATUS = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},

			//获取样品信息-样品处置
			getITEM_MANAGEMENT() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=ITEM_MANAGEMENT';
				this.$axios.get(url, {}).then((res) => {
					this.Select_ITEM_MANAGEMENT = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},
           
			//更改样品数量
			handleChangeQuality(value) {
				console.log(value);
			},
			//信息状态 End
   			judge(data) {
				return data.STATUS ? '活动' : '不活动'
			},
   			
            deleteRow(index, rows) {//Table-操作列中的删除行
				rows.splice(index, 1);
			},
			//启动流程
			startup(){
				var url = this.basic_url + '/api-apps/app/workorder/flow/'+this.dataid;
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
							var url = this.basic_url + '/api-apps/app/workorder/flow/Executors/'+this.dataid;
							this.$axios.get(url, {}).then((res) => {
								var resullt=res.data.datas;
								var users='';
								for(var i=0;i<resullt.length;i++){
									users = users + resullt[i].username+",";
								}
								if(users.indexOf(this.username) != -1){
									this.approval=true;
									this.start=false;
								}
							});
							this.detailgetData();
				    }
				});
			},
			//审批流程
			approvals(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.workorder;
				 var url = this.basic_url + '/api-apps/app/'+this.workorder+'/flow/isEnd/'+this.dataid;
		    		this.$axios.get(url, {}).then((res) => {
		    			if(res.data.resp_code == 0) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
		    			}else{
		    				var url = this.basic_url + '/api-apps/app/'+this.workorder+'/flow/isExecute/'+this.dataid;
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
				this.approvingData.app=this.workorder;
//				this.$refs.flowhistoryChild.open();
				this.$refs.flowhistoryChild.getdata(this.dataid);
			},
			//流程地图
			flowmap(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.workorder;
				this.$refs.flowmapChild.getimage();
			},
			//当前责任人
			viewpepole(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.workorder;
				this.$refs.vewPopleChild.getvewPople(this.dataid);
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selMenu = val;
			},
			
			addfield1(){//检测依据列表新建行
            	var date=new Date();
				this.currentDate = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
				var index=this.$moment(date).format("YYYYMMDDHHmmss");
				var obj = {
					S_NUM: '',
					WP_LINENUM: index,
					ITEM_NAME: '',
					MODEL: '',
					V_NAME: '',
					BASIS: '',
					P_NAME: '',
					CHECKCOST: '',
					REASION: '',
					MEMO: '',
					isEditing: true,
				};
				console.log(typeof(this.workorderForm.WORKORDER_BASISList));
				this.workorderForm.WORKORDER_BASISList.push(obj);//检验检测依据
			},
			addfield2() {
				var obj = {
					P_NUM: '',
					P_DESC: '',
					HOSTPERSON: '',
					FOLLOWPERSON: '',
					REMARKS:'',
					VERSION:'',
					isEditing: true,
				};
				this.workorderForm.WORKORDER_PROJECTList.push(obj);
			},
			//检验员
			addfield3(){
				var obj = {
					NAME:'',
					TELPHONE: '',
					DEPARTMENT: '',
					isEditing: true,
				};
					this.workorderForm.WORKORDER_CHECKPERSONList.push(obj);
			},
			//原始数据模版
			addfield4(){
				var obj = {
					D_NUM:'',
					D_DESC: '',
					STATUS: '1',
					isEditing: true,
					FILEID: '',
					FILEPATH: '',
					FILESIZE: '',
					FILEID_ORG: '',
					FILEPATH_ORG: '',
					FILESIZE_ORG: '',
				};
				this.workorderForm.WORKORDER_DATA_TEMPLATEList.push(obj);
				console.log(this.workorderForm.WORKORDER_DATA_TEMPLATEList);
			},
			//生成报告
			getreport(){
				var changeUser = this.workorderForm.WORKORDER_DATA_TEMPLATEList;
				//basisnum为依据编号的数组
				var id = [];
				for (var i = 0; i < changeUser.length; i++) {
					id.push(changeUser[i].ID);		
				}
				//basisnums为basisnum数组用逗号拼接的字符串
				var ids = id.toString(',');
				debugger;
				var url = "http://192.168.1.164:7880/merge/workorder/MergeWord?filePath=145,142&fileName=测试生成啊&num="+this.workorderForm.WONUM+"&deptfullname="+this.workorderForm.DEPTIDDesc+"&recordid="+this.workorderForm.ID;
				this.$axios.post(url, {}).then((res) => {
					console.log(res);
					// if(res.data.resp_code == 0) {
					// 	this.$message({
					// 		message: '生成成功',
					// 		type: 'success'
					// 	});
					// }
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			
			//点击添加，修改按钮显示弹窗
			visible() {
				var date = new Date();
				this.workorderForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.workorderForm.DEPTID = res.data.deptId;
					this.workorderForm.ENTERBY = res.data.id;
					this.username=res.data.username;
					var date = new Date();
					this.workorderForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.reset();
				this.views = false
				this.modify = false;
				this.show = true;
				this.addtitle = true;
				this.modifytitle = false;
				this.viewtitle=false;
				this.edit = true;
				this.noedit = false;
				
			},
			detailgetData() {
			var url = this.basic_url +'/api-apps/app/workorder/' + this.dataid;
				this.$axios.get(url, {}).then((res) => {
					console.log(res.data);
					//依据
					for(var i = 0;i<res.data.WORKORDER_BASISList.length;i++){
						res.data.WORKORDER_BASISList[i].isEditing = false;
					}
					//项目
					for(var i = 0;i<res.data.WORKORDER_PROJECTList.length;i++){
						res.data.WORKORDER_PROJECTList[i].isEditing = false;
					}
					//检验员
					for(var i = 0;i<res.data.WORKORDER_CHECKPERSONList.length;i++){
						res.data.WORKORDER_CHECKPERSONList[i].isEditing = false;
					}
					//原始数据
					for(var i = 0;i<res.data.WORKORDER_DATA_TEMPLATEList.length;i++){
						res.data.WORKORDER_DATA_TEMPLATEList[i].isEditing = false;
					}
					this.workorderForm = res.data;
					this.show = true;
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
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
	    			this.workorderForm.DEPTID = res.data.deptId;//传给后台机构id
					this.workorderForm.CHANGEBY = res.data.id;
					var date = new Date();
					this.workorderForm.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd");
					
					this.docParm.recordid = dataid;
					this.docParm.appname = '工作任务单_关联原始数据模板';
					this.docParm.appid = '39';

					this.docParm.userid = res.data.id;
					this.docParm.username = res.data.username;
					this.docParm.deptid = res.data.deptId;
					this.docParm.deptfullname = res.data.deptName;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error',
					});
				});
				this.detailgetData();
				this.views = false;
				this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle=false;
				this.modify = true;
				this.show = true;
				this.edit = true;
				this.noedit = false;
			},
			//这是查看
			view(dataid) {
				console.log(this.username);
				this.dataid=dataid;	
				this.modifytitle = false;
				this.addtitle = false;
				this.viewtitle = true;
				this.views = true; //
				this.noviews = false;
				this.edit = true;
				this.noedit = true;
				//判断启动流程和审批的按钮是否显示
				this.detailgetData();
				var url = this.basic_url + '/api-apps/app/workorder/flow/isStart/'+dataid;
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					if(res.data.resp_code==1){
						this.start=true;
						this.approval=false;
					}else{
						var url = this.basic_url + '/api-apps/app/workorder/flow/Executors/'+dataid;
						console.log(url);
						this.$axios.get(url, {}).then((res) => {
							console.log(res.data.datas);
							var resullt=res.data.datas;
							var users='';
							for(var i=0;i<resullt.length;i++){
								users = users + resullt[i].username+",";
							}
							if(users.indexOf(this.username) != -1){
								this.approval=true;
								this.start=false;
							}
						});
					}
				});
			},
			// 保存users/saveOrUpdate
			submitForm() {
				this.$refs.workorderForm.validate((valid) => {
		          if (valid) {
					var url = this.basic_url + '/api-apps/app/workorder/saveOrUpdate';
					console.log(this.workorderForm);
					this.$axios.post(url,this.workorderForm).then((res) => {
						console.log(res);
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							this.show = false;
							//重新加载数据
							this.$emit('requests');
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
			
			//点击关闭按钮
			close() {
				this.show = false;
				//this.resetNew();
			},
			toggle(e) {
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			maxDialog(e) { //大弹出框距离头部少60px
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

			
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			loadMore (item) {
			    if (this.loadSign) {
			      this.loadSign = false;
			      this.page.currentPage++
			      if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			        return
			    	}
					setTimeout(() => {
					this.loadSign = true;
					}, 1000)
					this.getuser();
			    }
			},	
			
			getuser(){
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				 //用户
				this.$axios.get(this.basic_url + '/api-user/users?deptId='+this.workorderForm.CJDW, {
					params: data
				}).then((res) => {
					console.log(res);
					//this.userList = res.data.data;
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
                    
					this.userList = newarr;
				}).catch((wrong) => {})	
			},
			getUser(){//获取当前用户信息
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
			this.getITEM_STATUS();//页面打开加载-样品状态
			this.getITEM_SOURCE();//页面打开加载-样品来源
			this.getCOMPLETE_MODE();//页面打开加载-完成方式
			this.getselectData();//页面打开加载-接收人、负责人、收样人
			this.getITEM_RECEPT_STATUS();//页面打开加载-样品接收状态
			this.getITEM_CHECK_STATUS();//页面打开加载-样品检后状态
			this.getITEM_MANAGEMENT();//页面打开加载-样品处置
			this.getuser();//用户
			this.getCompany();
			this.getUser();
		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';

	.ml60 {margin-left: 60px;}
	.a-upload input{
		position: absolute;
		font-size: 100px;
		right: 100px;
		top: 0;
		opacity: 0;
		filter: alpha(opacity=0);
		cursor: pointer;
		width: 80px;
		cursor: pointer;
	}
	.upload-btn{
		color: #fff;
		background-color: #286090;
		border-radius: 4px;
		padding: 4px 10px;
		width: 85px;
		height: 34px;
		line-height: 28px;
		border: none;
		cursor: pointer;
	}

</style>
