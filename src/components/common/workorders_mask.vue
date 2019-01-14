<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加工作任务单</div>
				<div class="mask_title" v-show="modifytitle">修改工作任务单</div>
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
										<el-input placeholder="自动生成" v-model="workorderForm.STATE" :disabled="true">
												<template slot="prepend">状态</template>
										</el-input>
									</el-col>
									<el-col :span="6" class="pull-right">
										<el-input placeholder="自动生成" v-model="workorderForm.WONUM" :disabled="true">
												<template slot="prepend">工作任务单编号</template>
										</el-input>
									</el-col>
								</el-row>

								<el-row class="pt10">
									<el-col :span="8">
										<el-form-item label="委托书编号" prop="PROXYNUM">
											<el-input v-model="workorderForm.PROXYNUM" :disabled="true">
												<el-button slot="append" icon="el-icon-search" @click="addworkorder"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="委托书版本" prop="PROXY_VERSION">
											<el-input v-model="workorderForm.PROXY_VERSION" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="父任务单编号" prop="PARENT_NUM">
											<el-input v-model="workorderForm.PARENT_NUM"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row >
									<el-col :span="8">
										<el-form-item label="主检员" prop="MASTER_INSPECTOR">
											<el-input v-model="workorderForm.MASTER_INSPECTOR" :disabled="true">
												<el-button slot="append" icon="el-icon-search" @click="addperson('1')"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="是否主任务单？" prop="IS_MAIN">
											<el-select clearable v-model="workorderForm.IS_MAIN" filterable allow-create default-first-option placeholder="请选择" style="width:100%">
												<el-option label="是" value="1"></el-option>
												<el-option label="否" value="0"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									
								</el-row>

								<el-row >
									<el-col :span="8">
										<el-form-item label="样品名称" prop="ITEM_NAME">
											<el-input v-model="workorderForm.ITEM_NAME" :disabled="true">
												<el-button slot="append" icon="el-icon-search" @click="addsample"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="规格型号" prop="ITEM_MODEL">
											<el-input v-model="workorderForm.ITEM_MODEL" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="样品状态" prop="ITEM_STATU">
											<el-input v-model="workorderForm.ITEM_STATU" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row >
									<el-col :span="8">
										<el-form-item label="样品编号" prop="ITEMNUM">
											<el-input v-model="workorderForm.ITEMNUM" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="商标标识" prop="ITEM_TRADEMARK">
											<el-input v-model="workorderForm.ITEM_TRADEMARK"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="抽样日期" prop="CHECK_DATE">
											<el-date-picker v-model="workorderForm.CHECK_DATE" type="date" placeholder="请选择抽样日期" value-format="yyyy-MM-dd" style="width: 100%;">
											</el-date-picker>
										</el-form-item>
									</el-col>
									
								</el-row>

								<el-row>
									<el-col :span="8">
										<el-form-item label="生产日期/批" prop="PRODUCT_DATE">
											<el-date-picker v-model="workorderForm.PRODUCT_DATE" type="date" placeholder="请选择生产日期/批" value-format="yyyy-MM-dd" style="width: 100%;">
											</el-date-picker>
										</el-form-item>
									</el-col>

									<el-col :span="8">
										<el-form-item label="到站日期" prop="ARRIVAL_DATE">
											<el-date-picker v-model="workorderForm.ARRIVAL_DATE" type="date" placeholder="请选择到站日期" value-format="yyyy-MM-dd" style="width: 100%;">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="样品来源" prop="ITEM_SOURCE">
											<el-select v-model="workorderForm.ITEM_SOURCE" style="width: 100%">
												<el-option v-for="(data,index) in Select_ITEM_SOURCE" :key="index" :value="data.code" :label="data.name"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row >
									<el-col :span="8">
										<el-form-item label="样品数量" prop="ITEM_QUALITY">
											<el-input-number type="number" v-model.number="workorderForm.ITEM_QUALITY" @change="handleChangeQuality" :min="1" :max="1000" label="描述文字" style="width: 100%"></el-input-number>
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
											<el-input type="textarea" rows="5" v-model="workorderForm.CHECK_BASIS"></el-input>
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
												<el-input placeholder="请输入内容" v-model="workorderForm.TECHNICAL_INFORMATION"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="分包项目">
												<el-input placeholder="请输入内容" v-model="workorderForm.SUB_PROJECT"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="特殊要求">
												<el-input placeholder="请输入内容" v-model="workorderForm.SPECIAL_REQUIREMENTS"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="样品接收人">
												<el-input placeholder="请输入内容" v-model="workorderForm.ITEM_RECCEPT_USER"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品接收日期">
												<el-date-picker v-model="workorderForm.ITEM_RECEPT_DATE" type="date" placeholder="请选择样品接收日期" value-format="yyyy-MM-dd" style="width: 100%;">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="完成日期" prop="COMPLETE_DATE">
												<el-date-picker v-model="workorderForm.COMPLETE_DATE" type="date" placeholder="请选择完成日期" value-format="yyyy-MM-dd" style="width: 100%;">
												</el-date-picker>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="完成方式">
												<el-radio-group v-model="workorderForm.COMPLETE_MODE">
													<el-radio v-for="(data,index) in Select_COMPLETE_MODE" :key="index" :label="data.code">{{data.name}}</el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品接收状态">
												<el-radio-group v-model="workorderForm.ITEM_RECEPT_STATUS">
													<el-radio v-for="(data,index) in Select_ITEM_RECEPT_STATUS" :key="index" :label="data.code">{{data.name}}</el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品承接人(专业组)" label-width="150px">
												<!-- <el-select v-model="workorderForm.ITEM_PROFESSIONAL_GROUP" style="width: 100%">
													<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.nickname"></el-option>
												</el-select> -->
												<el-input v-model="workorderForm.ITEM_PROFESSIONAL_GROUP" :disabled="true">
													<el-button slot="append" icon="el-icon-search" @click="addperson('2')"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="样品承接日期">
												<el-date-picker v-model="workorderForm.UNDERTAKE_DATE" type="date" placeholder="请选择完成日期" value-format="yyyy-MM-dd" style="width: 100%;">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品状态" prop="ITEM_STATUS">
												<el-select v-model="workorderForm.ITEM_STATUS" style="width: 100%">
													<el-option v-for="(data,index) in Select_ITEM_STATUS" :key="index" :value="data.code" :label="data.name"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品返回数量">
												<el-input-number type="number" v-model.number="workorderForm.ITEM_RETURN_QUALITY" @change="handleChangeQuality" :min="1" :max="1000" label="描述文字" style="width: 100%;"></el-input-number>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="样品返回接收人">
												<!-- <el-select v-model="workorderForm.RETURN_ITEM_USER" style="width: 100%">
													<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.nickname"></el-option>
												</el-select> -->
												<el-input v-model="workorderForm.RETURN_ITEM_USER" :disabled="true">
													<el-button slot="append" icon="el-icon-search" @click="addperson('3')"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品返回日期">
												<el-date-picker v-model="workorderForm.RETURN_ITEM_DATE" type="date" placeholder="请选择完成日期" value-format="yyyy-MM-dd" style="width: 100%;">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品检后状态">
												<el-radio-group v-model="workorderForm.ITEM_CHECK_STATUS">
													<el-radio v-for="(data,index) in Select_ITEM_CHECK_STATUS" :key="index" :label="data.code">{{data.name}}</el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="样品处置">
												<el-select v-model="workorderForm.ITEM_MANAGEMENT" style="width: 100%">
													<el-option v-for="(data,index) in Select_ITEM_MANAGEMENT" :key="index" :value="data.code" :label="data.name"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品承接人">
												<el-select v-model="workorderForm.ITEM_UNDERTAKE_USER" style="width: 100%">
													<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.nickname"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="专业技术/质量负责人" label-width="150px">
												<el-select v-model="workorderForm.PROFESSIONAL" style="width: 100%">
													<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.username"></el-option>
												</el-select>
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
												<el-input placeholder="请输入内容" v-model="workorderForm.P_NUM">
													 <el-button slot="append" icon="el-icon-search"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="是否寄出">
												<el-switch v-model="workorderForm.SEND"></el-switch>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="是否归档">
												<el-switch v-model="workorderForm.FILE"></el-switch>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row >
										<el-col :span="8">
											<el-form-item label="寄出时间">
												<el-date-picker v-model="workorderForm.SEND_DATE" type="date" placeholder="请选择到站日期" value-format="yyyy-MM-dd" style="width: 100%;">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="归档时间">
												<el-date-picker v-model="workorderForm.FILE_DATE" type="date" placeholder="请选择到站日期" value-format="yyyy-MM-dd" style="width: 100%;">
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
											<el-button type="primary" size="mini" round>
												<i class="icon-upload-cloud"></i>
												<font>导入</font>
											</el-button>
											<el-button type="success" size="mini" round @click="addfield1">
												<i class="icon-add"></i>
												<font>新建行</font>
											</el-button>
										</div>

										<el-table :data="WorkorderBasisList" row-key="ID" border stripe :fit="true" max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation">
										    <el-table-column prop="iconOperation" fixed width="50px">
										      <template slot-scope="scope">
										      	<i class="el-icon-check" v-show="scope.row.isEditing">
										      	</i>
										      	<i class="el-icon-edit" v-show="!scope.row.isEditing">
										      	</i>
										      </template>
										    </el-table-column>

										    <el-table-column label="标准编号" sortable width="160px" prop="S_NUM">
										      <template slot-scope="scope">
										      	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_NUM" disabled>
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

											<el-table-column prop="S_ENGNAME" label="英文名称" sortable>
										      <template slot-scope="scope">
										         <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.S_ENGNAME" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.S_ENGNAME}}</span>
										      </template>
										    </el-table-column>

										    <el-table-column prop="VERSION" label="标准版本" sortable width="120px">
										      <template slot-scope="scope">
										         <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.VERSION" :disabled="true"></el-input><span v-show="!scope.row.isEditing">{{scope.row.VERSION}}</span>
										      </template>
										    </el-table-column>

										     <!-- <el-table-column prop="STATUS" label="信息状态" sortable width="120px" :formatter="judge">
										      <template slot-scope="scope">
										         <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.STATUS" :disabled="true"></el-input><span v-show="!scope.row.isEditing">{{scope.row.STATUS}}</span>
										      </template>
										    </el-table-column> -->

										    <el-table-column fixed="right" label="操作" width="120">
										      <template slot-scope="scope">
										        <el-button @click="deleteRow(scope.$index, WorkorderBasisList)" type="text" size="small">
										          移除
										        </el-button>
										      </template>
										    </el-table-column>
										  </el-table>
									</el-tab-pane>
									<el-tab-pane label="检测项目与要求" name="second">
										<div class="table-func table-funcb">
											<el-button type="success" size="mini" round @click="addfield2">
												<i class="icon-add"></i>
												<font>新建行</font>
											</el-button>
										</div>
						            	<el-table :data="WorkorderProjectList" border stripe :fit="true" max-height="260" style="width: 100%;" :default-sort="{prop:'workorderbasisList', order: 'descending'}">
						            		<el-table-column prop="P_NUM" label="检测项目编号" sortable>
														<template slot-scope="scope">
															<el-form-item :prop="'workorderbasisList.'+scope.$index + '.P_NUM'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_NUM" placeholder="请输入">	
															</el-input>
															<span v-else="v-else">{{scope.row.P_NUM}}</span>
															</el-form-item>
														</template>
											</el-table-column>
											<el-table-column prop="P_DESC" label="检测项目名称" sortable>
														<template slot-scope="scope">
															<el-form-item :prop="'workorderbasisList.'+scope.$index + '.P_DESC'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_DESC" placeholder="请输入">	
															</el-input>
															<span v-else="v-else">{{scope.row.P_DESC}}</span>
															</el-form-item>
														</template>
											</el-table-column>
						          			<el-table-column prop="HOSTPERSON" label="主检员" sortable>
														<template slot-scope="scope">
															<el-form-item :prop="'workorderbasisList.'+scope.$index + '.HOSTPERSON'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.HOSTPERSON" placeholder="请输入">
															</el-input>
															<span v-else="v-else">{{scope.row.HOSTPERSON}}</span>
															</el-form-item>
														</template>
											</el-table-column>
											<el-table-column prop="FOLLOWPERSON" label="从检员" sortable>
														<template slot-scope="scope">
															<el-form-item :prop="'workorderbasisList.'+scope.$index + '.FOLLOWPERSON'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.FOLLOWPERSON" placeholder="请输入">	
															</el-input>
															<span v-else="v-else">{{scope.row.FOLLOWPERSON}}</span>
															</el-form-item>
														</template>
											</el-table-column>
						            		<el-table-column prop="REMARKS" label="要求" sortable>
														<template slot-scope="scope">
															<el-form-item :prop="'workorderbasisList.'+scope.$index + '.REMARKS'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REMARKS" placeholder="请输入">	
															</el-input>
															<span v-else="v-else">{{scope.row.REMARKS}}</span>
															</el-form-item>
														</template>
											</el-table-column>
						            		<el-table-column prop="VERSION" label="版本" sortable>
														<template slot-scope="scope">
															<el-form-item :prop="'workorderbasisList.'+scope.$index + '.VERSION'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入">	
															</el-input>
															<span v-else="v-else">{{scope.row.VERSION}}</span>
															</el-form-item>
														</template>
											</el-table-column>
										      <el-table-column fixed="right" label="操作" width="120">
										      <template slot-scope="scope">
										        <el-button @click.native.prevent="deleteRow(index, row)" type="text" size="small">
										          移除
										        </el-button>
										      </template>
										    </el-table-column>
						            	</el-table>
									</el-tab-pane>
									<el-tab-pane label="检验员信息" name="third">
										<div class="table-func table-funcb">
											<el-button type="success" size="mini" round><i class="icon-add"></i><font>新建行</font>
											</el-button>
										</div>
						            	<el-table :data="WorkorderPersonList" border stripe :fit="true" max-height="260" style="width: 100%;" :default-sort="{prop:'WorkorderPersonList', order: 'descending'}">
						            		<el-table-column label="人员姓名" sortable prop="NAME">
										      <template slot-scope="scope">
										      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.NAME" disabled></el-input><span v-else="v-else">{{scope.row.NAME}}</span>
										      </template>
										    </el-table-column>
										    <el-table-column label="机构" sortable prop="DEPARTMENT">
										      <template slot-scope="scope">
										      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DEPARTMENT" disabled></el-input><span v-else="v-else">{{scope.row.DEPARTMENT}}</span>
										      </template>
										    </el-table-column>
										    <el-table-column label="电话" sortable prop="TELPHONE">
										      <template slot-scope="scope">
										      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.TELPHONE" disabled></el-input><span v-else="v-else">{{scope.row.TELPHONE}}</span>
										      </template>
										    </el-table-column>
						            		<el-table-column fixed="right" label="操作" width="120">
										      <template slot-scope="scope">
										        <el-button @click.native.prevent="deleteRow(index, row)" type="text" size="small">
										          移除
										        </el-button>
										      </template>
										    </el-table-column>
						            	</el-table>
									</el-tab-pane>
									<el-tab-pane label="原始数据模板" name="fourth">
										<div class="table-func table-funcb">
											<el-button type="success" size="mini" round><i class="icon-add"></i><font>新建行</font>
											</el-button>
										</div>
										<el-table :data="SourceDataTemplateList" border stripe :fit="true" max-height="260" style="width: 100%;" :default-sort="{prop:'SourceDataTemplateList', order: 'descending'}">
											<el-table-column label="模板编号" sortable prop="D_NUM">
										      <template slot-scope="scope">
										      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.D_NUM" disabled></el-input><span v-else="v-else">{{scope.row.D_NUM}}</span>
										      </template>
										    </el-table-column>
										    <el-table-column label="模板描述" sortable prop="DESC">
										      <template slot-scope="scope">
										      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DESC" disabled></el-input><span v-else="v-else">{{scope.row.DESC}}</span>
										      </template>
										    </el-table-column>
										    <el-table-column label="模板状态" sortable prop="STATUS">
										      <template slot-scope="scope">
										      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" disabled></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
										      </template>
										    </el-table-column>
						            		<el-table-column prop="VERSION" label="预览"></el-table-column>
						            		<el-table-column fixed="right" label="操作" width="80">
										      <template slot-scope="scope">
										        <el-button
										          @click.native.prevent="deleteRow(index, row)"
										          type="text"
										          size="small">
										          	<i class="icon-trash red"></i>
										        </el-button>
										      </template>
										    </el-table-column>
						            	</el-table>
									</el-tab-pane>
								</el-tabs>
							</div>
							<!-- 录入人信息 Begin-->
							<!-- <el-collapse-item title="其他" name="7" v-show="views"> -->
							<el-collapse-item title="其他" name="7">
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
					<div class="el-dialog__footer">
							<el-button type="primary" @click="submitForm('workorderForm')">保存</el-button>
							<el-button type="success" v-show="addtitle">保存并继续</el-button>
							<el-button @click='close'>取消</el-button>
					</div>
				</el-form>
			</div>
		</div>
	<!--委托书编号 Begin-->
	<el-dialog title="委托书编号" :visible.sync="dialogVisible1" width="80%" :before-close="handleClose">
			<el-table :data="inspectList" :header-cell-style="rowClass" border stripe height="400px" style="width: 100%;" :default-sort="{prop:'inspectList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
				<el-table-column type="selection" width="55" fixed align="center">
				</el-table-column>
				<el-table-column label="检验委托书编号" sortable width="130px" prop="PROXYNUM">
				</el-table-column>
				<el-table-column label="委托单位名称" sortable width="140px" prop="V_NAME">
				</el-table-column>
				<el-table-column label="生产单位名称" sortable width="140px" prop="P_NAME">
				</el-table-column>
				<el-table-column label="样品名称" sortable width="140px" prop="ITEM_NAME">
				</el-table-column>
				<el-table-column label="样品型号" sortable width="140px" prop="ITEM_MODEL">
				</el-table-column>
				<!-- <el-table-column label="样品信息状态" sortable width="200px" prop="ITEM_STATUS" v-if="this.checkedName.indexOf('样品信息状态')!=-1">
				</el-table-column> -->
				<el-table-column label="检测依据" width="200px" prop="REMARKS" sortable>
				</el-table-column>
				<el-table-column label="完成日期" width="140px" prop="COMPDATE" sortable  :formatter="dateFormat" data-type = "">
				</el-table-column>
				<el-table-column label="完成方式" width="100px" prop="COMPMODE" sortable>
				</el-table-column>
				<el-table-column label="检测报告编号" width="140px" prop="REPORT_NUM" sortable>
				</el-table-column>
				<el-table-column label="主检组" width="140px" prop="MAINGROUP" sortable>
				</el-table-column>
				<!--<el-table-column label="信息状态" width="200px" prop="STATUS" sortable v-if="this.checkedName.indexOf('信息状态')!=-1">
				</el-table-column>-->
				<!--<el-table-column label="录入人" width="200px" prop="ENTERBY" sortable  v-if="this.checkedName.indexOf('录入人')!=-1">
				</el-table-column>-->
				<el-table-column label="录入时间" width="140px" prop="ENTERDATE" sortable :formatter="dateFormat">
				</el-table-column>
				<el-table-column label="版本" width="80" prop="VERSION" sortable>
				</el-table-column>
			</el-table>
			
			<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
			</el-pagination>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible1 = false">取 消</el-button>
		       <el-button type="primary" @click="addworkordernum">确 定</el-button>
		    </span>
		</el-dialog>
	<!--委托书编号 End-->
	<!--主检员 Begin-->
	<el-dialog title="委托书编号" :visible.sync="dialogVisible2" width="80%" :before-close="handleClose">
			<el-table :data="userList" border stripe :header-cell-style="rowClass" :height="fullHeight" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
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
			<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
			</el-pagination>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible2 = false">取 消</el-button>
		       <el-button type="primary" @click="addpersonname">确 定</el-button>
		    </span>
		</el-dialog>
	<!--主检员 End-->
	<!-- 样品名称 Begin -->
		<el-dialog title="样品名称" :visible.sync="dialogVisible3" width="80%" :before-close="handleClose">
			<el-table :data="samplesList" :header-cell-style="rowClass" border stripe height="400px" style="width: 100%;" :default-sort="{prop:'samplesList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
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
		       <el-button @click="dialogVisible3 = false">取 消</el-button>
		       <el-button type="primary" @click="addsamplename">确 定</el-button>
		    </span>
		</el-dialog>
		<!-- 样品名称 End -->
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		props: {
			page: {
				type: Object,
			}
		},
		data() {
			return {
			dialogVisible1:false,
			dialogVisible2:false,
			dialogVisible3:false,
			inspectList:[],
			workorderForm: {
					// WorkorderBasisList: [],//检测依据
					// WorkorderProjectList: [],//检测项目与要求
					// WorkorderPersonList: [],//检验员信息
					// SourceDataTemplateList: [],//原始数据模板
					// WORKORDER_REPORT_TEMPLATE:[],//报告模版
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
				dataList:[{
					name:'',
					description:''
				}],
				search:'',
				selectData:[],//获取接收人、承接人、负责人
				Select_ITEM_STATUS:[],//获取样品信息-样品状态
				Select_ITEM_SOURCE:[],//获取样品信息-样品来源
				Select_COMPLETE_MODE:[],//获取样品信息-完成方式
				Select_ITEM_RECEPT_STATUS:[],//获取样品信息-样品接收状态
				Select_ITEM_CHECK_STATUS:[],//获取样品信息-样品检后状态
				Select_ITEM_MANAGEMENT:[],//获取样品信息-样品处置
				standardList: [],//检测依据数据
				projectList: [],//检测项目与要求
				fileList:[],//上传附件数据
				

				rules: {
					PROXYNUM: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					PROXY_VERSION: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					WONUM: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					ITEM_NAME: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					ITEM_MODEL: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					ITEMNUM: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					ITEM_STATU: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					ITEM_STATUS: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					ITEM_SOURCE: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					ITEM_QUALITY: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					CHECK_BASIS: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					COMPLETE_DATE: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					COMPLETE_MODE: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					ITEM_RECEPT_STATUS: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					ITEM_PROFESSIONAL_GROUP: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					STATUS: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				WorkorderBasisList: [], //检测依据列表
				WorkorderProjectList: [], //检测项目与要求列表
				WorkorderPersonList: [], //检验员信息列表
				SourceDataTemplateList: [], //原始数据模板列表
				isEditList: false,  //年度计划列表编辑装填
				editPlan: {},  //编辑中的内容
				selval:[],
				userList:[],
				samplesList:[],
				numtips:''
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			handleClick(tab, event) {
//		        console.log(tab, event);
		    },
			// SelChange(val) {
			// 	this.selval = val;
			// },
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			addworkorder(){
				this.$emit('request');
				this.dialogVisible1 = true;
			},
			addworkordernum(){
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
					this.workorderForm.PROXYNUM = this.selMenu[0].PROXYNUM;
					this.workorderForm.PROXY_VERSION = this.selMenu[0].VERSION;
					this.dialogVisible1 = false;
					this.$emit('request');
				}
			},
			addsample(){
				this.$emit('request');
				this.dialogVisible3 = true;
			},
			addsamplename(){
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
					this.workorderForm.ITEM_NAME = this.selMenu[0].DESCRIPTION;//样品名称
					this.workorderForm.ITEM_MODEL = this.selMenu[0].MODEL;//规格型号
					this.workorderForm.ITEM_STATU = this.selMenu[0].STATE;//样品状态
					this.workorderForm.ITEMNUM = this.selMenu[0].ITEMNUM;//样品编号
					this.dialogVisible3 = false;
					this.$emit('request');
				}
			},
			addperson(num){
				this.numtips = num;
				this.$emit('request');
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
						this.workorderForm.MASTER_INSPECTOR = this.selMenu[0].username;
					}else if(this.numtips == '2'){
						this.workorderForm.ITEM_PROFESSIONAL_GROUP = this.selMenu[0].username;
					}else if(this.numtips == '3'){
						this.workorderForm.RETURN_ITEM_USER = this.selMenu[0].username;
					}
					this.dialogVisible2 = false;
					this.$emit('request');
				}
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
   			//年度计划表格函数
   			iconOperation(row, column, cell, event){
		        if(column.property ==="iconOperation"){
		            row.isEditing = !row.isEditing;
		            this.isEditList = row.isEditing;
		        	console.log(row.isEditing);
		            if(!row.isEditing){
		            	//保存
		            	var WorkorderBasisList = this.WorkorderBasisList;
		        		row.WorkorderPersonList = JSON.parse(JSON.stringify(this.WorkorderPersonList));
		        		row.WorkorderProjectList = JSON.parse(JSON.stringify(this.WorkorderProjectList));
						console.log(row);
		        	}else{
		        		//编辑
		        		this.editPlan = row;
		        		this.WorkorderPersonList = row.WorkorderPersonList;
				   		this.WorkorderProjectList = row.WorkorderProjectList;
				   		console.log(row);
		        	}
		        }
		    },

   			//上传文件 Begin
			handleRemove(file, fileList) {
			},
			handlePreview(file) {
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//信息状态 End
   			judge(data) {
				return data.STATUS ? '活动' : '不活动'
			},
   			
            deleteRow(index, rows) {//Table-操作列中的删除行
				rows.splice(index, 1);
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
						'S_NUM': 10001,
						'WP_LINENUM': index,
						'ITEM_NAME': '',
						'MODEL': '',
						'V_NAME': '',
						'BASIS': '',
						'P_NAME': '',
						'CHECKCOST': '',
						'REASION': '',
						'MEMO': '',
						'isEditing': true,
					};
					this.WorkorderBasisList.push(obj);//检验检测依据
					this.WorkorderProjectList = [];//检测项目与要求
					this.WorkorderPersonList = [];//检测员
					this.SourceDataTemplateList=[];//原始数据模板
					this.WORKORDER_REPORT_TEMPLATE=[];//检测报告模板
					this.isEditList = true;
			},
			addfield2() {
				var obj = {
					step: '',
					t_date: '',
					t_description: '',
					status: '',
					isEditing: true
				};
				this.workorderForm.WorkorderProjectList.push(obj);
			},
			addfield2(){
				var obj = {
						'WP_LINENUM':'',
						'S_NAME': '',
						'MODEL': '',
						'V_NAME': '',
						'BASIS': '',
						'P_NAME': '',
						'CHECKCOST': '',
						'REASION': '',
						'MEMO': '',
						'isEditing': true,
					};
			},
			
			//点击添加，修改按钮显示弹窗
			visible() {
				//主题信息置空
				this.workorderForm.WORKORDER_BASIS = [];
				// 检测依据表数据置空
				this.workorderForm.WORKORDER_BASIS[0].WorkorderBasisList = [];
				//检测项目与要求数据置空
				this.workorderForm.WORKORDER_BASIS[0].WorkorderProjectList = [];
				//检验员信息数据置空
				this.workorderForm.WORKORDER_BASIS[0].WorkorderPersonList = [];
				// 原始数据模板置空
				this.workorderForm.WORKORDER_BASIS[0].SourceDataTemplateList = [];
				var date = new Date();
				this.workorderForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
	    			// this.workorderForm.ENTERBY = res.data.nickname;
					// this.workorderForm.ORG_CODE = res.data.deptName;
					this.workorderForm.DEPTID = res.data.deptId;
					this.workorderForm.ENTERBY = res.data.id;
					// this.dataInfo.ORGID = res.data.deptName
					var date = new Date();
					this.workorderForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.vuews = false
				this.modify = false;
				this.show = true;
				this.addtitle = true;
				this.modifytitle = false;
			},

			// 这里是修改
			detail(dataid) {
				this.views = false;
				this.modify = true;
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
	    			this.workorderForm.DEPTID = res.data.deptId;//传给后台机构id
					this.workorderForm.CHANGEBY = res.data.id;
					var date = new Date();
					this.workorderForm.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd");
				}).catch((err) => {
					this.$message({
						
						message: '网络错误，请重试123',
						type: 'error',
					});
				});
				var url = this.basic_url + '/api-apps/app/workorder/' + dataid;
				this.$axios.get(this.basic_url + '/api-apps/app/workorder/' + dataid, {}).then((res) => {
					this.workorderForm = res.data;
					this.WorkorderBasisList = res.data.WorkorderBasisList;
					this.WorkorderBasisList = res.data.WorkorderBasisList;
					this.WorkorderPersonList = res.data.WorkorderPersonList;
					this.SourceDataTemplateList = res.data.SourceDataTemplateList;
					// this.WorkorderProjectList = res.data.WorkorderBasisList.length > 0 ? res.data.WorkorderBasisList[0].WorkorderProjectList : [];
					
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.show = true;
			},
			
			childMethods() {//添加内容时从父组件带过来的
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url,{}).then((res)=>{
					this.workorderForm.DEPTID = res.data.deptId;
					this.workorderForm.ENTERBY = res.data.id;
					var date = new Date();
					this.workorderForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.addtitle = true;
            	this.modifytitle = false;
            	this.modify=false;
            	this.show = !this.show;
			},
			
			// 保存users/saveOrUpdate
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		  			// this.workorderForm.WorkorderBasisList[0].WorkorderProjectList = this.inspectionList_child.WorkorderProjectList;
		  			// this.workorderForm.WorkorderBasisList[0].WorkorderPersonList = this.inspectionList_child.WorkorderPersonList;
		  			// console.log(this.inspectionList_child);
		  			// this.workorderForm.WORKORDER_BASIS.push(this.inspectionList_child);
					var url = this.basic_url + '/apps-center/app/workorder/saveOrUpdate';
					this.$axios.post(url, this.workorderForm).then((res) => {
						console.log(res);
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
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				this.$axios.get(this.basic_url + '/api-apps/app/inspectPro', {
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
					this.inspectList = newarr;
				}).catch((wrong) => {})

				this.$axios.get(this.basic_url + '/api-user/users', {
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

				this.$axios.get(this.basic_url + '/api-apps/app/item', {
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
			this.getITEM_STATUS();//页面打开加载-样品状态
			this.getITEM_SOURCE();//页面打开加载-样品来源
			this.getCOMPLETE_MODE();//页面打开加载-完成方式
			this.getselectData();//页面打开加载-接收人、负责人、收样人
			this.getITEM_RECEPT_STATUS();//页面打开加载-样品接收状态
			this.getITEM_CHECK_STATUS();//页面打开加载-样品检后状态
			this.getITEM_MANAGEMENT();//页面打开加载-样品处置
			this.requestData();
		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';

	.ml60 {margin-left: 60px;}
</style>



