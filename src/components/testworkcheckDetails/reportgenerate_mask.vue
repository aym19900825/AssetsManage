<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title">报告生成与编辑</div>
					<div class="mask_anniu">
						<span class="mask_span mask_max" @click="toggle">
							<i v-bind:class="{'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						</span>
						<span class="mask_span" @click="close">
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content">
					<div class="content-accordion" id="information">
						<el-row>
							<el-col :span="20">
								<el-form inline-message :model="reportTemplate" ref="reportTemplate" :rules="rules" label-position="right">
									<el-form-item label="报告模板" prop="RE_TYPE" label-width="160px">
										<el-select clearable v-model="reportTemplate.RE_TYPE" placeholder="请选择" @change="requestData" :disabled="noedit" style="width:500px;">
											<el-option v-for="(data,index) in selectData" :key="index" :value="data.RE_NUM" :label="data.DECRIPTION"></el-option>
										</el-select>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="4" class="text-right">
								<!-- <el-button type="success" round size="medium"><i class="icon-eye"></i> 预览报告</el-button> -->
							</el-col>
						</el-row>

						<el-form inline-message :model="inputData" ref="reportGenerateForm" :rules="rules" label-position="right" lable-width="120px">
							<el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
								<!-- 报告生成与编辑 Begin-->
								<el-tab-pane v-for="(reportData,index) in selectReportData" :key="index" :label="reportData.name" :name="reportData.typeid">
									<el-row v-if="reportData.name=='封面'||reportData.name=='首页'||reportData.name=='封底'">
										<el-col :span="8" v-for="(item,index) in selectReportData[index].List" :key="index">
											<el-form-item v-if="item.required == 0" :label="item.title" :prop="item.param" label-width="150px" v-show="(item.title!='检测结论'||show01)&&(item.title!='检测结果'||!show01)">
												<el-input v-model="inputData[item.param]" :type="item.type" v-if="item.type=='input'" :disabled="false" :placeholder="item.name">{{item.title}}</el-input>

												<el-input v-model="inputData[item.param]" :type="item.type" v-if="item.type=='text'" :disabled="true" :placeholder="item.name">{{item.title}}</el-input>

												<el-input v-model="inputData[item.param]" :type="item.type" rows="2" v-if="item.type=='textarea'&&item.isdatabase==1" :disabled="true" :placeholder="item.name">{{item.title}}</el-input>
 
												<el-input v-model="inputData[item.param]" :type="item.type" rows="2" v-if="item.type=='textarea'&&item.isdatabase==0" :disabled="false" :placeholder="item.name">{{item.title}}</el-input>
												
												<!-- <el-input v-model="inputData[item.param]" :type="item.type" rows="2" v-if="item.type=='textarea'&&item.isdatabase==0&&item.title=='检测结论'" :disabled="true" :placeholder="item.name">{{item.title}}</el-input> -->
												
												<el-date-picker v-model="inputData[item.param]" :type="item.type" v-if="item.type=='date'" value-format="yyyy-MM-dd" :disabled="false" :placeholder="item.name" style="width:100%;">
												</el-date-picker>

												<div class="fdtext" v-if="item.type=='matters'" v-html="item.value">{{item.title}}</div>

												<!--item.name == '检测结果'-->
												<el-radio-group v-model="inputData[item.param]" v-if="item.type=='radio'" :disabled="false">
													<el-radio v-for="(its,index) in optsData" :key="index" :label="its.name"></el-radio>
												</el-radio-group>

												<!--item.name == '检测结论'-->
												<el-select v-model="inputData[item.param]" filterable :placeholder="item.name" v-show="true" v-if="item.type == 'select'" @change="selSelChange(item)" :disabled="false" style="width:100%;">
													<el-option v-for="(itemchild,index) in reportResultType" :key="index" :value="itemchild.code" :label="itemchild.name"></el-option>
												</el-select>
											</el-form-item>

											<el-form-item v-else :label="item.title" :prop="item.param" label-width="150px" :rules="{required: true, message: '请填写', trigger: 'change'}" v-show="(item.title!='检测结论'||show01)&&(item.title!='检测结果'||!show01)">
												<el-input v-model="inputData[item.param]" :type="item.type" v-if="item.type=='input'" :disabled="false" :placeholder="item.name">{{item.title}}</el-input>

												<el-input v-model="inputData[item.param]" :type="item.type" v-if="item.type=='text'" :disabled="true" :placeholder="item.name">{{item.title}}</el-input>

												<el-input v-model="inputData[item.param]" :type="item.type" rows="2" v-if="item.type=='textarea'&&item.isdatabase==1" :disabled="true" :placeholder="item.name">{{item.title}}</el-input>
 
												<el-input v-model="inputData[item.param]" :type="item.type" rows="2" v-if="item.type=='textarea'&&item.isdatabase==0" :disabled="false" :placeholder="item.name">{{item.title}}</el-input>
												
												<el-input v-model="inputData[item.param]" :type="item.type" rows="2" v-if="item.type=='textarea'&&item.isdatabase==0&&item.title=='检测结论'" :disabled="false" :placeholder="item.name">{{item.title}}</el-input>

												<el-date-picker v-model="inputData[item.param]" :type="item.type" v-if="item.type=='date'" value-format="yyyy-MM-dd" :disabled="false" :placeholder="item.name" style="width:100%;">
												</el-date-picker>

												<!--item.name == '注意事项'-->
												<div class="fdtext clearfix" v-if="item.type=='matters'" v-html="item.value">{{item.title}}</div>

												<!--item.name == '检测结果'-->
												<el-radio-group v-model="inputData[item.param]" v-if="item.type=='radio'" :disabled="false">
													<el-radio v-for="(it,index) in optsData" :key="index" :label="it.name"></el-radio>
												</el-radio-group>

												<!--item.name == '检测结论'-->
												<el-select v-model="inputData[item.param]" filterable :placeholder="item.name" v-if="item.type == 'select'" @change="selSelChange(item)" :disabled="false" style="width:100%;">
													<el-option v-for="(itemchild,index) in reportResultType" :key="index" :value="itemchild.code" :label="itemchild.name"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<div class="clearfix"></div>
										<div class="clearfix">
											<div class="pt20 pb20" v-show="reportData.name=='首页'&&reportTemplate.RE_TYPE==1006||reportTemplate.RE_TYPE==1011||reportTemplate.RE_TYPE==1010">
												注：下结论时，如需下检测结论请选择【检测结论】，无需下结论时，请选择【检测结果】。
											</div>
										</div>
										
									</el-row>
									
									<!-- <el-row v-else-if="reportData.name=='封底'">
										<el-col :span="24" v-for="(itemfd,index) in selectReportData[index].List" :key="index">
											<div class="fdtext" v-if="itemfd.type=='matters'" v-html="itemfd.value">{{itemfd.title}}</div>
										</el-col>
									</el-row> -->

									<el-row v-else-if="reportData.name=='产品质量检测报告'">
										<el-col :span="24">
											<el-table :data="reportData.List" 
												border 
												stripe 
												:fit="true" 
												max-height="460"
												key="table1"
												style="width: 100%;" 
												:default-sort="{prop:'reportData.List', order: 'descending'}">

												<!-- <el-table-column type="selection" fixed width="55" align="center"></el-table-column> -->

												<el-table-column type="index" label="序号" width="50">
													<template slot-scope="scope">
														<span> {{(page.currentPage-1)*page.pageSize+scope.$index+1}} </span>
													</template>
												</el-table-column>
												
												<el-table-column label="项目名称" sortable prop="P_DESC">
												</el-table-column>

												<el-table-column label="不合格类别" sortable prop="ISQUALIFIEDDesc">
												</el-table-column>

												<el-table-column label="技术要求" sortable prop="TECHNICAL_REQUIRE">
												</el-table-column>
												<el-table-column label="计量单位" width="100px" prop="UNIT">
												</el-table-column>

												<el-table-column label="检测结果" width="200px">
													<template slot-scope="scope">
														<el-table :data="scope.row.workorder_project_itemList" key="table3" row-key="ID" style="width: 100%;">
															<el-table-column label="样品序号" prop="ITEM_STEP"></el-table-column>
															<el-table-column label="样品描述" prop="MEMO"></el-table-column>
														</el-table>
													</template>
												</el-table-column>
											
												<el-table-column label="单项判定" width="200px" sortable prop="SYNTHETICAL">
													<template slot-scope="scope">
														<el-radio-group v-model="scope.row.SYNTHETICAL" :disabled="noedit">
															<el-radio v-for="(datasy,index) in SelectIsSynthetical" :key="index" :label="datasy.code">{{datasy.name}}</el-radio>
														</el-radio-group>
													</template>
												</el-table-column>
											</el-table>

									</el-col>
								</el-row>
									
								<!--成果文件-->
								<el-row v-else>
									<el-col :span="24">
										<el-table :data="reportData.List" 
											border 
											stripe
											highlight-current-row
											default-expand-all
											@selection-change="selChange"
											style="width: 100%;"
											v-loading="loading"
											element-loading-text="报告生成中，请勿关闭此窗口…"
											element-loading-spinner="el-icon-loading"
											element-loading-background="rgba(255, 255, 255, 0.9)">
											<el-table-column type="expand">
												<template slot-scope="props">
													<el-table ref="table2" :data="props.row.workorder_data_templateList" 
														border 
														stripe 
														row-key="ID"
														:fit="true" 
														max-height="260" 
														style="width: 100%;" 
														highlight-current-row
														@current-change="singleTable"
														@selection-change="selChange">
														<el-table-column type="selection" fixed width="55" align="center"></el-table-column>

														<el-table-column type="index" label="序号" width="50">
															<template slot-scope="scope2">
																<span> {{(page.currentPage-1)*page.pageSize+scope2.$index+1}} </span>
															</template>
														</el-table-column>

														<el-table-column label="检验责任人" width="120px" sortable prop="LIABLE_PERSONDesc">
														</el-table-column>

														<el-table-column label="成果文件ID" width="130px" prop="FILEID">
														</el-table-column>

														<el-table-column label="成果文件名称" prop="FILENAME">
														</el-table-column>

														<el-table-column label="审核人" width="100px" prop="CHECKER">
														</el-table-column>

														<el-table-column label="审核时间" width="120px" prop="CHECK_DATE">
														</el-table-column>

														<el-table-column label="文件大小" width="120px" prop="FILESIZE">
														</el-table-column>

														<el-table-column label="排序" width="130px" prop="SORT">
															<template slot-scope="scope2">
																<el-button size="mini" :disabled="scope2.$index===0" @click="moveUp(scope2.$index,scope2.row, props.row.workorder_data_templateList)" title="上移"><i class="el-icon-arrow-up"></i></el-button>
																<el-button size="mini" :disabled="scope2.$index===(reportData.List.length-1)" @click="moveDown(scope2.$index,scope2.row,props.row.workorder_data_templateList)" title="下移"><i class="el-icon-arrow-down"></i></el-button>
															</template>
														</el-table-column>

														<el-table-column label="操作" width="80px">
															<template slot-scope="scope2">
																<el-button title="预览" @click="readFile(scope2.row)" type="text" size="small"> 
																	<i class="icon-eye"></i>
																	预览
																</el-button>
																<!-- <el-button title="编辑" @click="editFile(scope2.row)" type="text" size="small"> 
																	<i class="icon-edit"></i>
																	编辑
																</el-button> -->
																<!-- <el-button class="orange" title="回退" type="text" size="small" @click="sendback(scope2.row)">
																	<i class="icon-back orange"></i>
																	回退
																</el-button> -->
															</template>
														</el-table-column>
													</el-table>
													
													<el-table class="mt30" ref="table11" :data="props.row.SonWorkorderList" 
														border 
														stripe
														highlight-current-row
														default-expand-all
														@selection-change="selChange"
														style="width: 100%;">

															<el-table-column type="expand">
																<template slot-scope="props2">
																	<el-table ref="table12" :data="props2.row.SonWorkorder_data_templateList" 
																		border 
																		stripe 
																		row-key="ID"
																		:fit="true" 
																		max-height="260" 
																		style="width: 100%;" 
																		highlight-current-row
																		@current-change="singleTable"
																		@selection-change="selChange">
																		<el-table-column type="selection" fixed width="55" align="center"></el-table-column>

																		<el-table-column type="index" label="序号" width="50">
																			<template slot-scope="scope3">
																				<span> {{(page.currentPage-1)*page.pageSize+scope3.$index+1}} </span>
																			</template>
																		</el-table-column>

																		<el-table-column label="检验责任人" width="120px" sortable prop="LIABLE_PERSONDesc">
																		</el-table-column>

																		<el-table-column label="成果文件ID" width="130px" prop="FILEID">
																		</el-table-column>

																		<el-table-column label="成果文件名称" prop="FILENAME">
																		</el-table-column>

																		<el-table-column label="审核人" width="100px" prop="CHECKER">
																		</el-table-column>

																		<el-table-column label="审核时间" width="120px" prop="CHECK_DATE">
																		</el-table-column>

																		<el-table-column label="文件大小" width="120px" prop="FILESIZE">
																		</el-table-column>

																		<el-table-column label="排序" width="130px" prop="SORT">
																			<template slot-scope="scope4">
																				<el-button size="mini" :disabled="scope4.$index===0" @click="moveUp(scope4.$index,scope4.row, props2.row.SonWorkorder_data_templateList)" title="上移"><i class="el-icon-arrow-up"></i></el-button>
																				<el-button size="mini" :disabled="scope4.$index===(reportData.List.length-1)" @click="moveDown(scope4.$index,scope4.row,props2.row.SonWorkorder_data_templateList)" title="下移"><i class="el-icon-arrow-down"></i></el-button>
																			</template>
																		</el-table-column>

																		<el-table-column label="操作" align="center" width="80px">
																			<template slot-scope="scope4">
																				<el-button title="预览" @click="readFile(scope4.row)" type="text" size="small"> 
																					<i class="icon-eye"></i>
																					预览
																				</el-button>
																			</template>
																		</el-table-column>
																	</el-table>
																</template>
															</el-table-column>

															<el-table-column type="index" label="序号" width="55">
															</el-table-column>

															<el-table-column label="工作任务单编号" prop="WONUM" sortable>
															</el-table-column>

															<el-table-column label="样品名称" prop="PRODUCT" sortable>
															</el-table-column>

															<el-table-column label="是否为主任务单" prop="IS_MAIN">
															</el-table-column>

															<el-table-column label="完成方式" prop="COMPLETE_MODE">
															</el-table-column>

															<el-table-column label="完成日期" prop="COMPLETE_DATE" sortable>
															</el-table-column>

															<el-table-column label="责任人" prop="MASTER_INSPECTOR" sortable>
															</el-table-column>

															<el-table-column label="操作" align="center" width="100px">
																<template slot-scope="scope3">
																	<el-button type="warning" size="small" @click="sendback(scope3.row)">回退</el-button>
																</template>
															</el-table-column>
													</el-table>

												</template>
											</el-table-column>

											<!-- <el-table-column type="selection" width="55">
											</el-table-column> -->

											<el-table-column type="index" label="序号" width="55">
											</el-table-column>

											<el-table-column label="工作任务单编号" prop="WONUM" sortable>
											</el-table-column>

											<el-table-column label="样品名称" prop="PRODUCT" sortable>
											</el-table-column>

											<el-table-column label="是否为主任务单" prop="IS_MAIN">
											</el-table-column>

											<el-table-column label="完成方式" prop="COMPLETE_MODE">
											</el-table-column>

											<el-table-column label="完成日期" prop="COMPLETE_DATE" sortable>
											</el-table-column>

											<el-table-column label="责任人" prop="MASTER_INSPECTOR" sortable>
											</el-table-column>
											<!-- <el-table-column label="操作" align="center" width="100px">
												<template slot-scope="scope">
													<el-button type="warning" size="small" @click="sendback(scope.row)">回退</el-button>
												</template>
											</el-table-column> -->
										</el-table>
									</el-col>
								</el-row>
									
								</el-tab-pane>
								<!-- 报告生成与编辑 End-->

								<el-tab-pane label="已生成的报告文件" name="6">
									<!--生成的报告列表 Begin-->
									<el-row>
										<el-col :span="24">
											<!-- <el-form inline-message :model="workorderForm" :label-position="labelPosition" :rules="rules" ref="workorderForm" label-width="110px"> -->
												<el-table :data="reportGenerateForm.WORKORDER_REPORTList" 
													border 
													stripe 
													:fit="true" 
													max-height="260" 
													key="table4"
													style="width: 100%;" 
													@selection-change="selChange"
													:default-sort="{prop:'reportGenerateForm.WORKORDER_REPORTList', order: 'descending'}">
													<el-table-column type="selection" fixed width="55" align="center"></el-table-column>

													<el-table-column type="index" label="序号" width="50">
														<template slot-scope="scope">
															<span> {{(page.currentPage-1)*page.pageSize+scope.$index+1}} </span>
														</template>
													</el-table-column>

													<!-- <el-table-column label="报告文件ID" prop="FILEID">
													</el-table-column> -->

													<el-table-column label="报告文件编号" prop="REPORTNUM">
													</el-table-column>

													<el-table-column label="文件名称" prop="REPORTNAME">
													</el-table-column>

													<el-table-column label="报告文件大小" width="100px" prop="FILESIZE">
													</el-table-column>
													
													<el-table-column label="报告生成时间" width="160px" prop="ENTERDATE">
													</el-table-column>

													<el-table-column label="是否提交审核" width="100px" prop="ISCREATEDDesc">
													</el-table-column>

													<el-table-column label="操作" width="180px">
														<template slot-scope="scope">
															<el-button type="text" title="预览" @click="readReportFile(scope.row)" size="mini"> 
																<i class="icon-eye"></i>
																预览
															</el-button>
															<el-button type="text" title="编辑" @click="editReportFile(scope.row)" size="mini"> 
																<i class="icon-edit"></i>
																编辑
															</el-button>
															<el-button class="red" type="text" title="删除" @click="delKey(scope.$index,scope.row)" size="mini"> 
																<i class="icon-trash red"></i>
																删除
															</el-button>
														</template>
													</el-table-column>
												</el-table>
											<!-- </el-form> -->
										</el-col>
									</el-row>
									<!--生成的报告列表 End-->
								</el-tab-pane>
							</el-tabs>
						</el-form>
					</div>

					<div class="content-footer" v-show="firstBtn">
						<!--首页按钮事件-->
						<!--检验检测项目清单按钮事件-->
						<el-button type="primary" v-show="secondBtn" @click="submitForm">保存</el-button>
						<!--内容页按钮事件-->
						<!-- <el-button type="warning" v-show="thirdBtn" @click="sendback">回退</el-button> -->
						<el-button type="primary" v-show="thirdBtn" @click="getreport">生成检验/检测报告</el-button>
						<!--已生成报告按钮事件-->
						<el-button type="success" v-show="fifthBtn" @click="submitVerify">提交审核</el-button>
						<!--封底按钮事件-->
						<el-button @click="close">取消</el-button>
					</div>
					
				</div>
			</div>
		</div>
		<!-- 生成报告弹出显示数据  -->
		<reportdata ref="reportdata" @reportdatavalue = "reportdatavalue"></reportdata>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import reportdata from './reportdata.vue'//生成报告弹出显示数据
	export default {
		name: 'masks',
		components: {
			reportdata,//生成报告弹出显示数据
		},
		data() {
			return {
				loading: false,//加载动画
				file_url: Config.file_url,//文件URL
				po_url: Config.po_url,//PageOffice-URL
				inputData: {},
				basic_url: Config.dev_url,
				selectData: [],//报告模板类型
				reportResultType: [],//获取报告结果类型
				optsData: [],//检验结果
				selectReportData: [],//获取报告数据
				SelectIsQualified:[],//不合格类别
				SelectIsSynthetical:[],//获取单项判定合格不合格
				reportFileDate:[],//成果文件上移下移获取数据
				selData: [],//点击table行选中Checkbox
				isshift: false,//点击table行选中Checkbox
				isctrl: false,//点击table行选中Checkbox
				templateNum:0,//模板编码
				// reptemDetailNum:'',//模板编码默认加载的时候
				reportTemplate:{
					RE_TYPE: '',
				},
				reportGenerateForm:{
					WORKORDER_REPORTList:[],//查看生成的报告列表
				},
				date: new Date(), //绑定的时候 直接绑定的当前时间 就好了
				options: [{
					value: '检测结论',
					label: '检测结论'
				}, {
					value: '检测结果',
					label: '检测结果'
				}],
				loadSign:true,//加载
				firstBtn:false,
				secondBtn:false,
				thirdBtn:false,
				fourthBtn:false,
				fifthBtn:false,
				btnShow:true,
				btnClose:false,
				show: false,
				isok1: true,
				isok2: false,
				up: false,
				noedit:false,
				selUser:[],
				docParm: {},//成果文件和生成报告文件
				reportname:'',//生成报告名称
				reportvalue:{},//储存生成报告数据
				showcreatereoprt:false,//生成报告按钮
				currentuserinfo:{},//储存当前用户信息
				activeName: '0', //tabs
				activeNames: ['1','2','3','4','5'],//手风琴数量
				labelPosition: 'right', //表格
				isEditing: true,
				page: {//分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				rules: {
					RE_TYPE: [{ required: true, message: '请选择', trigger: 'change' }],//选择报告模板类型
				},
				moduleFileList: [],
				show01: false
			};
		},
		methods: {
			selSelChange(item){
				if(item.title == '检测结论/检测结果'){
					if(this.inputData[item.param] == '1'){
						this.show01=true;
						// this.show02=false;
					}
					if(this.inputData[item.param] == '2'){
						// this.show02=true;
						this.show01=false;
					}
				}
			},
			//选择数据带值
			selChange(val) {
				this.selData = val;
			},
			//TAbs页切换事件判断按钮显示
			handleClick(tab, event) {
				var activeName = event.target.getAttribute('id');//获取当前tabID名
				if(activeName=='tab-0') {//判断按钮显示问题，封面显示保存和取消
					this.firstBtn = true;
					this.secondBtn = true;
					this.thirdBtn = false;
					this.fourthBtn = false;
					this.fifthBtn = false;
				}else if(activeName=='tab-1') {//判断按钮显示问题，首页显示保存和取消
					this.firstBtn = true;
					this.secondBtn = true;
					this.thirdBtn = false;
					this.fourthBtn = false;
					this.fifthBtn = false;
					this.getReportResultType();//报告结果类型，检验结论、检验结果
					this.getOptsData();//检验结果
				}else if(activeName=='tab-2') {//判断按钮显示问题，检查清单显示保存和取消
					this.firstBtn = true;
					this.secondBtn = true;
					this.thirdBtn = false;
					this.fourthBtn = false;
					this.fifthBtn = false;
				}else if(activeName=='tab-3') {//判断按钮显示问题，内容页显示生成内容页文档和取消
					this.firstBtn = true;
					this.secondBtn = false;
					this.thirdBtn = true;
					this.fourthBtn = false;
					this.fifthBtn = false;
					for(var i=0; i<this.selectReportData.length;i++){//遍历成果文件数据上移下移
						if(this.selectReportData[i].name=='成果文件'){
							this.reportFileDate=this.selectReportData[i].List
						}
					}
				}else if(activeName=='tab-4') {//判断按钮显示问题，封底显示生成生成检验/检测报告和取消
					this.firstBtn = true;
					this.secondBtn = true;
					this.thirdBtn = false;
					this.fourthBtn = false;
					this.fifthBtn = false;
				}else if(activeName=='tab-6') {//判断按钮显示问题，已生成的报告文件
					this.firstBtn = true;
					this.secondBtn = false;
					this.thirdBtn = false;
					this.fourthBtn = false;
					this.fifthBtn = true;
					this.detailgetData();//请求生成报告列表
				}
			},
			//向上移动
			moveUp(index,row,listData) {
				var that = this;
				if (index > 0) {
						let upDate = listData[index];
						listData.splice(index, 1);
						listData.splice(index-1,0, upDate);
				} else {
					alert('已经是第一条，不可上移');
				}
			},
			//向下移动
			moveDown(index,row,listData){
				var that = this;
				if ((index + 1) === listData.length){
					alert('已经是最后一条，不可下移');
				} else {
					let downDate = listData[index];
					listData.splice(index, 1);
					listData.splice(index+1,0, downDate);
				}
			},
			//获取报告结果类型
			getReportResultType(){
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=report_result_type';
				this.$axios.get(url, {}).then((res) => {
					this.reportResultType = res.data;
					// console.log(res.data);
				}).catch((wrong) => {
				})	
			},
			//获取检验结果
			getOptsData(){
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=isSynthetical';
				this.$axios.get(url, {}).then((res) => {
					this.optsData = res.data;
					console.log(res.data);
				}).catch((wrong) => {
				})	
			},
			
			//报告模板类型
			getReportType() {
				// var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=RE_TYPE';
				var url = this.basic_url + '/api-apps/appSelection/inspectionRepTem/page';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data.data;
					this.reptemDetailId=res.data.data[0].ID;
					if (this.datanum==undefined){
						this.templateNum=res.data.data[0].RE_NUM;
						this.reportTemplate.RE_TYPE=res.data.data[0].RE_NUM;
					}else {
						this.reportTemplate.RE_TYPE=this.datanum;
					};
					// console.log(res.data.data[0].ID);
					// this.reptemDetailNum=res.data.data[0].RE_NUM
					
					// this.reportTemplate.RE_TYPE = res.data.data[0].RE_NUM;
					// this.templatefileid = res.data.data[0].RE_NUM;
					// this.templatefileid = 1010;
					// this.templatefileid = res.data.data[0].ID;
				});
			},
			//报告模板整体数据列表
			requestData(){
				this.selectData.filter((item)=>{
					if(item.RE_NUM ==  this.reportTemplate.RE_TYPE){
						this.reptemDetailId = item.ID;
						// console.log(this.reptemDetailId);
					}
				});
				// console.log(this.reportTemplate.RE_TYPE);
				var url = this.basic_url + '/api-merge/templateConfig/findDataByIds/'+ this.reportTemplate.RE_TYPE +'/'+this.dataid;
				this.$axios.get(url, {}).then((res) => {
					this.selectReportData = res.data;//报告首页
					// console.log(res.data);
					// console.log(this.reportTemplate.RE_TYPE);
					// console.log(this.dataid);
					// this.reportGenerateForm.inspect_date = this.getToday();
					this.dealData(res.data);
				}).catch((wrong) => {});
			},
			//表格单选选值
			singleTable(row) {
				this.selData.push(row);
				// this.$refs.table2.clearSelection();
				// this.$refs.table2.toggleRowSelection(row);
				this.currentRow = row;
				// console.log(row);
			},
			//获取不合格类别
			getIsQualified() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=isqualified';
				this.$axios.get(url, {}).then((res) => {
					this.SelectIsQualified = res.data;
				}).catch(error => {
				})
			},
			//单项判定合格不合格
			getIsSynthetical() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=isSynthetical';
				this.$axios.get(url, {}).then((res) => {
					this.SelectIsSynthetical = res.data;
				}).catch(error => {
				})
			},
			//From表单中的数据通过param找到Value值
			dealData(data,opt){
				var res = {};
				data.forEach((item,listIndex)=>{
					var list = item.List;
					var itemType = item.typeid;
					var totalIndex = 0;
					list.forEach((val,index)=>{
						// console.log(listIndex);
						// console.log(data[listIndex]);
						var param = '';
						if(listIndex == 0){
							param = 'param'+ itemType + index;
						}else if(listIndex == 1){
							param = 'param'+ itemType + (data[listIndex].List.length + index);
						}else{
							param = 'param'+ itemType + (data[listIndex].List.length + data[listIndex-1].List.length + index);
						}
						res[param] = val.value;
						val.param = param;
					});
				});
				this.inputData = res;
			},
			//清空表单
			reset(){
				this.reportGenerateForm = {
					WORKORDER_REPORTList:[],//生成的报告文件
				};
				
			},
			//获取当前时间
			getToday(){
				var date = new Date();
				var month = date.getMonth();
				month++;
				var str = date.getFullYear() + '-' + month + '-'+ date.getDate() + ' ' +  date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds() ;
				var rate = this.$moment(str).format("YYYY-MM-DD HH:mm:ss")
				return rate;
			},
		
			//预览生成报告文件
			readReportFile(row){
				var url = this.po_url+"/show?filename=" +row.filename
					+ '&fileid=' +  row.FILEID
					+ '&userid=' +  this.docParm.userid
					+ '&username=' + this.docParm.username
					+ '&deptid=' + this.docParm.deptid
					+ '&deptfullname=' + this.docParm.deptfullname
					+ '&recordid=' + this.dataid
					+ '&appname=工作任务单&appid=38fileedit=0&fileprint=0&fileread=1&fileduplicate=0';
				// var url = this.po_url+"/show?filename=&fileid=234&appname=工作任务单&appid=38&fileedit=0&fileprint=0&fileread=1&fileduplicate=0";
				 window.open(url); 
			},

			//编辑生成报告文件
			editReportFile(row){
				var url = this.po_url+"/show?filename=" +row.filename
					+ '&fileid=' +  row.FILEID
					+ '&userid=' +  this.docParm.userid
					+ '&username=' + this.docParm.username
					+ '&deptid=' + this.docParm.deptid
					+ '&deptfullname=' + this.docParm.deptfullname
					+ '&recordid=' + this.dataid
					+ '&appname=工作任务单&appid=38&fileedit=1&fileprint=0&fileread=1&fileduplicate=0';
				 window.open(url); 
			},

			//删除生成报告文件
			delKey(index,row){
				if(row.ISCREATED==1){
					this.$message({
						message: '此文档已提交审核，不允许删除',
						type: 'warning'
					});
				}else{
					if(row.ID!=''){
						var url = this.basic_url + '/api-apps/app/workorder/WORKORDER_REPORT/' + row.ID;
						this.$confirm('确定删除此数据吗？', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
						}).then(({
							value
						}) => {
						this.$axios.delete(url, {}).then((res) => {
							if(res.data.resp_code == 0){
								this.$message({
									message: '删除成功',
									type: 'success'
								});
								this.detailgetData();//重新加载报告生成列表数据
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
						this.detailgetData();//重新加载报告生成列表数据
					}
				}
			},

			//加载生成报告的文件
			detailgetData() {
				var url = this.basic_url +'/api-merge/merge/workorder/findByWorkorderId/'+ this.dataid;
				this.$axios.get(url, {}).then((res) => {
					this.reportGenerateForm.WORKORDER_REPORTList=res.data.datas;
					console.log(res);
					// console.log(this.dataid);
				}).catch((err) => {
				});
			},	
			//查看报告
			lookoverreport(item){
				var url = this.po_url+"/show?fileid=" +item.FILEID
				+ '&userid=' + this.currentuserinfo.id
				+ '&username=' + this.currentuserinfo.username
				+ '&deptid=' + this.currentuserinfo.deptId
				+ '&deptfullname=' + this.currentuserinfo.deptName
				window.open(url); 
			},
			reportdatavalue(value){
				this.reportvalue = value;//储存生成报告数据
				this.workorderreportid = value.id;
					var obj = {
						ID:value.ID,
						REPORTNUM:value.reportnum,
						REPORTNAME:value.reportname,
						FILEID:value.fileid,
						VERSION:value.version,
				}
				this.reportGenerateForm.WORKORDER_REPORTList.push(obj);
			},
			//编辑成果文件
			editFile(row){
				var url = this.po_url+"/show?filename=" +row.filename
					+ '&fileid=' +  row.FILEID
					+ '&userid=' +  this.docParm.userid
					+ '&username=' + this.docParm.username
					+ '&deptid=' + this.docParm.deptid
					+ '&deptfullname=' + this.docParm.deptfullname
					+ '&recordid=' + this.dataid
					+ '&appname=工作任务单_关联原始数据模板&appid=39&fileedit=1&fileprint=0&fileread=1&fileduplicate=0';
				 window.open(url); 
			},
			//预览成果文件
			readFile(row){
				var url = this.po_url+"/show?filename=" +row.filename
					+ '&fileid=' +  row.FILEID
					+ '&userid=' +  this.docParm.userid
					+ '&username=' + this.docParm.username
					+ '&deptid=' + this.docParm.deptid
					+ '&deptfullname=' + this.docParm.deptfullname
					+ '&recordid=' + this.dataid
					+ '&appname=工作任务单_关联原始数据模板&appid=39&fileedit=0&fileprint=0&fileread=1&fileduplicate=0';
				 window.open(url); 
			},
			//回退成果文件
			sendback(row){
				console.log();
				// /app/workorder/operate/reback?WORKORDERID=当前主表IDreback
				var Url = this.basic_url + '/api-apps/app/workorder/operate/reback?WORKORDERID='+this.dataid;
				this.$axios.get(Url, {}).then((res) => {
					if(res.data.resp_code == 0) {
						this.show=false;
						this.$emit('request');
						this.$message({
							message: '回退工作任务单成功',
							type: 'success'
						});
					}else{
						this.$message({
						message: res.data.resp_msg,
						type: 'warning'
					});
					}
				}).catch((err) => {
				});
			},
			//获取当前用户信息
			getUser(){
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url, {}).then((res) => {//获取当前用户信息
					this.currentuserinfo = res.data;
					this.userid = res.data.id;
					this.username = res.data.username;
					this.deptid = res.data.deptId;
					this.deptfullname = res.data.deptName;
					this.docParm = {
						userid: res.data.id,
						username: res.data.username,
						deptid: res.data.deptId,
						deptfullname: res.data.deptName,
						appname: '工作任务单_关联原始数据模板',
						appid: '39'
					};
				}).catch((err) => { });
			},
			//提交审核
			submitVerify(){
				if(this.selData.length == 0){
					this.$message({
						message: '请选择要审核的报告文件',
						type: 'warning'
					});
				}else if(this.selData.length > 1){
					this.$message({
						message: '不可同时选择多条报告文件',
						type: 'warning'
					});
				}else{
					var repotFileId=this.selData[0].ID;
					var url = this.basic_url + '/api-apps/app/workorder/operate/createReportApprove?ID='+ repotFileId;
						this.$axios.get(url, {}).then((res) => {
							// console.log(repotFileId);
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								//重新加载数据
								this.close();
								this.requestData();
							}else {
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
								});
							}
						}).catch((err) => {
						});
				}
			},
			//生成报告
			getreport(){
				this.$refs.reportGenerateForm.validate((valid) => {
					if (valid) {
						var paramData = this.selectReportData;
						for(let i=0; i<paramData.length; i++){
							var list = paramData[i].List;
							for(let j=0; j<list.length; j++){
								var tranData = list[j];
								tranData.value = this.inputData[tranData.param];
							}
						}
						var url = this.basic_url + '/api-merge/templateConfig/saveOrUpdateData/'+this.dataid+'/'+ this.reportTemplate.RE_TYPE;
						this.$axios.post(url,this.selectReportData).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								//默认保存成功后执行生成报告
								if(this.selData.length == 0){
									this.$message({
										message: '请选择要生成报告的成果文件',
										type: 'warning'
									});
								}else{
									this.thirdBtn = false;//生成报告按钮不显示
									var url = this.file_url + '/file/fileList?page=0&size=10';
									this.$axios.post(url,{
										'appname': '检验检测项目_检验/检测报告模板',
										'recordid': this.reptemDetailId,
									}).then((res) => {
										this.moduleFileList = res.data.fileList;
										var Url1 = this.basic_url + '/api-merge/merge/workorder/MergeWord';
										var path = [];
										for(let j=0; j<this.selData.length;j++){
											path.push(this.selData[j].FILEPATH);
										}
										var postData = {
											proxynum: '',
											templatecode: this.reportTemplate.RE_TYPE,
											workorderid: this.dataid,//工作任务单ID
											deptfullname: this.deptfullname,//部门名称
											filePath: path.length>0?path.join(','):'',//文件路径
											fileName: '',//文件名称
											app: 'workorder',//应用名称
											moduleList: this.moduleFileList
										};
										this.loading = true;
										this.$axios.post(Url1, {
											params: postData
										}).then((res) => {
											if(res.data.resp_code == 0) {
												this.show=true;//弹出框不开关闭
												// this.activeName=6;//跳转到tabs6已生成的报告文件
												this.$message({
													message: '报告生成成功，请上【已生成的报告文件】中查看',
													type: 'success'
												});
												this.thirdBtn = true;//生成报告按钮显示
												this.detailgetData();//重新加载报告生成列表数据
												this.loading = false;
											}else{
												this.$message({
													message: res.data.resp_msg,
													type: 'warning'
												});
											}
										}).catch((err) => {
										});

									}).catch((err) => {
									});
								}
								//重新加载数据
								this.requestData();
							}
						}).catch((err) => {
						});
					} else {
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
						return false;
					}
				});
			},
			
			//列出所有成果文件
			showModule(data){
				// this.modulenum.D_NUM = data.num;
				// this.modulenum.D_DESC = data.desc;
				var url = this.file_url + '/file/fileList?page=0&size=10';
				this.$axios.post(url,{
					'appname': '检验检测项目_检验/检测报告模板',
					'recordid': this.reptemDetailId,
				}).then((res) => {
					this.moduleFileList = res.data.fileList;
					// this.modulenum.FILESIZE_ORG = res.data.fileList[0].filesize;
					// this.modulenum.FILEPATH_ORG = res.data.fileList[0].filepath;
					// this.modulenum.FILEID_ORG = res.data.fileList[0].fileid;
				}).catch((err) => {
				});
			},
			//获取导入表格勾选信息
			// SelChange(val) {
			// 	this.selUser = val;
			// },
			iconOperation(row, column, cell, event) {
				// if(column.property === "iconOperation") {
					row.isEditing = !row.isEditing;
				// }
			},
			//打开弹出框页面
			showDialog(id,teplateNum){
				this.show = true;
				this.dataid = id;
				this.datanum = teplateNum;//从工作任务单过来的模板编码
				this.firstBtn = true;//显示取消按钮
				this.secondBtn = true;//显示保存按钮
				//判断当前模板编号，如果从父组件传过来值则用传过来的，如果没有则用选的值this.reportTemplate.RE_TYPE;
				// this.reportTemplate.RE_TYPE=this.datanum;
				this.requestData();//加载数据
				
				console.log(this.templateNum);
				console.log(this.reportTemplate.RE_TYPE);
			},

			sizeChange(val) {//分页，总页数
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    currentChange(val) {//分页，当前页
		      this.page.currentPage = val;
		      this.requestData();
			},
			
			
			// 首页按钮事件保存users/saveOrUpdate
			submitForm() {
				this.$refs.reportGenerateForm.validate((valid) => {
					if (valid) {
						var paramData = this.selectReportData;
						for(let i=0; i<paramData.length; i++){
							var list = paramData[i].List;
							for(let j=0; j<list.length; j++){
								var tranData = list[j];
								tranData.value = this.inputData[tranData.param];
							}
						}
						var url = this.basic_url + '/api-merge/templateConfig/saveOrUpdateData/'+this.dataid+'/'+ this.reportTemplate.RE_TYPE;
						this.$axios.post(url,this.selectReportData).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//重新加载数据
								this.$emit('requests');
								this.requestData();
							}
						}).catch((err) => {
						});
					} else {
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
						return false;
					}
				});
			},
			//检验检测项目清单按钮事件
			testListSubmit(){

			},
			//内容页按钮事件
			filesSubmit(){

			},
			//封底按钮事件
			reportSubmit(){

			},
			//点击关闭按钮
			close() {
				this.show = false;
				this.$emit('request');
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
				$(".mask_divbg").css("top", "0px");
			},
			//还原按钮
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "90%");
				$(".mask_div").css("top", "0px");
				$(".mask_divbg").css("top", "100px");
			},
			
		},
		
		mounted() {
			this.getReportType();//报告模板类型
			this.getIsQualified();//不合格类别
			this.getIsSynthetical();//单项判定合格不合格
			this.getUser();//当前用户
		},
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';

	/* .el-tabs__content { min-height: 680px;} */
</style>
