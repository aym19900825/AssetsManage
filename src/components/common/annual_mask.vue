<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加年度计划</div>
				<div class="mask_title" v-show="modifytitle">修改年度计划</div>
				<div class="mask_title" v-show="viewtitle">查看年度计划</div>
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
				<el-form status-icon inline-message :model="WORKPLAN" :label-position="labelPosition" :rules="rules" ref="WORKPLAN" label-width="85px">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="基本信息" name="1">
								<el-row :gutter="5">
									<el-col :span="5" class="pull-right">
										<el-input placeholder="草稿" v-model="WORKPLAN.STATUS" :disabled="true">
												<template slot="prepend">编辑状态</template>
										</el-input>
									</el-col>
									<!-- <el-col :span="5" class="pull-right">
										<el-select v-model="WORKPLAN.TYPE" placeholder="类别">
									    	<el-option label="监督抽查" value="1"></el-option>
									    	<el-option label="质量抽查" value="0"></el-option>
										</el-select>
									</el-col> -->
									<el-col :span="5" class="pull-right">
										<el-input v-model="WORKPLAN.WP_NUM" placeholder="自动生成" :disabled="edit">
												<template slot="prepend">编号</template>
										</el-input>
									</el-col>
								</el-row>
								<el-row :gutter="5" class="pt10">
									<el-col :span="6">
										<el-form-item label="提出单位" prop="PROP_UNIT">
											<el-select clearable v-model="WORKPLAN.PROP_UNIT" filterable allow-create default-first-option placeholder="请选择">
												<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="产品类别" prop="ITEMTYPE">
											<el-input v-model="WORKPLAN.ITEMTYPE" :disabled="true">
												<el-button slot="append" icon="el-icon-search" @click="addprobtn"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="计划描述" prop="DESCRIPTION">
											<el-input v-model="WORKPLAN.DESCRIPTION"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="5">
									<el-col :span="6">
										<el-form-item label="类别" prop="TYPE">
											<el-select v-model="WORKPLAN.TYPE" placeholder="请选择">
												<el-option label="监督抽查" value="1"></el-option>
												<el-option label="质量抽查" value="0"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="编制人" prop="COMPACTOR">
											<el-input v-model="WORKPLAN.COMPACTOR"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="审核人" prop="C_PERSON">
											<el-input v-model="WORKPLAN.C_PERSON"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="批准人" prop="APPRPERSON">
											<el-input v-model="WORKPLAN.APPRPERSON"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="5">
									<el-col :span="6">
										<el-form-item label="提报日期" prop="REPORTDATE">
										<div class="block">
										    <el-date-picker
										      v-model="WORKPLAN.REPORTDATE"
										      type="date"
										      placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%">
										    </el-date-picker>
										  </div>
										 </el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="年度" prop="YEAR">
											<div class="block">
											    <el-date-picker
											      v-model="WORKPLAN.YEAR"
											      type="year"
											      placeholder="选择年度"
											      value-format="yyyy"
											      format="yyyy"
											      :default-value="WORKPLAN.YEAR" style="width: 100%">
											    </el-date-picker>
											</div>
										</el-form-item>
									</el-col>
									<!-- <el-col :span="6">
										<el-form-item label="信息状态" prop="MESSSTATUS">
											<el-input v-model="WORKPLAN.MESSSTATUS"></el-input>
										</el-form-item>
									</el-col> -->
								</el-row>
							</el-collapse-item>
							
							<!-- 年度计划列表 Begin-->
							<el-collapse-item title="年度计划列表" name="2" class="ml30">
								<div class="table-func">
									<el-button type="primary" size="mini" round>
										<i class="icon-upload-cloud"></i>
										<font>导入</font>
									</el-button>
									<el-button type="success" size="mini" round @click="addfield1">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>

								<el-table :header-cell-style="rowClass" :data="worlplanlist" row-key="ID" border stripe :fit="true" highlight-current-row="highlight-current-row" style="width: 100% ;"  :default-sort="{prop:'worlplanlist', order: 'descending'}" v-loadmore="loadMore">
								    <el-table-column prop="iconOperation" fixed width="50px">
								      <template slot-scope="scope" >
								      	<i class="el-icon-check" v-if="scope.row.isEditing" @click="iconOperation(scope.row)">
								      	</i>
								      	<i class="el-icon-edit" v-if="!scope.row.isEditing" @click="iconOperation(scope.row)">
								      	</i>
								      </template>
								    </el-table-column>

								    <!-- <el-table-column label="所属计划编号" sortable width="120px" prop="WP_NUM">
								      <template slot-scope="scope">
								      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WP_NUM" disabled></el-input><span v-if="!scope.row.isEditing">{{scope.row.WP_NUM}}</span>
								      </template>
								    </el-table-column> -->

								    <el-table-column label="序号" sortable width="120px" prop="WP_LINENUM">
								      <template slot-scope="scope">
								      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WP_LINENUM" disabled></el-input><span v-if="!scope.row.isEditing">{{scope.row.WP_LINENUM}}</span>
								      </template>
								    </el-table-column>
									<el-table-column prop="ITEM_NAME" label="产品名称" sortable width="120px" :formatter="judge">
								      <template slot-scope="scope">
								         <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ITEM_NAME" placeholder="请输入内容" :disabled="true">
								         	<el-button slot="append" icon="el-icon-search" @click="addproduct(scope.row)"></el-button>
								         </el-input><span v-if="!scope.row.isEditing">{{scope.row.ITEM_NAME}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="MODEL" label="规格型号" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MODEL" placeholder="请输入内容"></el-input><span v-if="!scope.row.isEditing">{{scope.row.MODEL}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="MEMO" label="近三年监督抽查情况" sortable width="260px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MEMO" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.MEMO}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="CHECKCOST" label="检测费用" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHECKCOST" placeholder="请输入内容" id="cost" @blur="toPrice(scope.row)"></el-input><span v-if="!scope.row.isEditing" id="costshow">{{scope.row.CHECKCOST}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="REASION" label="项目提出理由" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REASION" placeholder="请输入内容"></el-input><span v-if="!scope.row.isEditing">{{scope.row.REASION}}</span>
								      </template>
								    </el-table-column>

								    <!-- <el-table-column prop="MEMO" label="近三年监督抽查情况" sortable width="160px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MODEL" placeholder="请输入内容"></el-input><span v-if="!scope.row.isEditing">{{scope.row.MODEL}}</span>
								      </template>
								    </el-table-column> -->

								    <el-table-column fixed="right" label="操作" width="120">
								      <template slot-scope="scope">
								        <el-button @click="delPlan(scope.$index,scope.row, 'WORLPLANLINE','worlplanlist')" type="text" size="small">
								          移除
								        </el-button>
								        <el-button @click="assign(scope.row)" type="text" size="small" v-if="assignshow">
								          下达
								        </el-button>
								      </template>
								    </el-table-column>
								</el-table>
							</el-collapse-item>
							<!-- 年度计划列表 End -->
							<!-- 检测依据、检测项目与要求 Begin-->
							<div class="el-collapse-item pt10 pr20 pb20 ml60" aria-expanded="true" accordion>
								<el-tabs v-model="activeName" @tab-click="handleClick">
								    <el-tab-pane label="检测依据" name="first">
								    	<div class="table-func table-funcb">
											<el-button type="primary" size="mini" round @click="basisleadbtn" v-show="isEditList">
												<i class="icon-search"></i>
												<font>选择</font>
											</el-button>
										</div>
										<!-- <el-form :model="basisList" :rules="rules" ref="basisList" prop="basisList"> -->
						            	<el-table :header-cell-style="rowClass" :data="basisList" border stripe :fit="true" max-length="260px" style="width: 100%;" :default-sort="{prop:'basisList', order: 'descending'}">
						            		<el-table-column prop="WP_NUM" label="所属计划编号" width="150">
						            			<!-- <template slot-scope="scope">
										        	<span>{{scope.$index + 1}}</span>
										      	</template> -->
										      	<template slot-scope="scope">
										        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WP_NUM" disabled></el-input><span v-else="v-else">{{scope.row.WP_NUM}}</span>
										      	</template>
						            		</el-table-column>
						            		<el-table-column prop="WP_LINENUM" label="所属计划行号" width="150"></el-table-column>
						            		<el-table-column prop="S_NUM" label="标准编号" width="130"></el-table-column>
						            		<el-table-column prop="S_NAME" label="标准名称" width="350"></el-table-column>
						            		<el-table-column prop="VERSION" label="版本" width="80"></el-table-column>
						            		<el-table-column fixed="right" label="操作" width="80">
										      <template slot-scope="scope">
										        <el-button
										          @click="delPlan(scope.$index,scope.row,'WORLPLANLINE_BASIS','basisList')"
										          type="text"
										          size="small">
										          	<i class="icon-trash red"></i>
										        </el-button>
										      </template>
										    </el-table-column>
						            	</el-table>
						            	<!-- </el-form> -->		
								    </el-tab-pane>
								    <el-tab-pane label="检测项目与要求" name="second">
								    	<div class="table-func table-funcb">
											<el-button type="primary" size="mini" round @click="basisleadbtn2" v-show="isEditList">
												<i class="icon-search"></i>
												<font>选择</font>
											</el-button>
										</div>
						            	<el-table :header-cell-style="rowClass" :data="proTestList" border stripe :fit="true" max-height="260" style="width: 100%;" :default-sort="{prop:'proTestList', order: 'descending'}">
						            	    <el-table-column prop="iconOperation" fixed width="50px">
										      <template slot-scope="scope" >
										      	<i class="el-icon-check" v-if="scope.row.isEditing" @click="changeEdit(scope.row)">
										      	</i>
										      	<i class="el-icon-edit" v-if="!scope.row.isEditing" @click="changeEdit(scope.row)">
										      	</i>
										      </template>
										    </el-table-column>

						            		<el-table-column prop="WP_NUM" label="所属计划编号" width="130">
						            			<template slot-scope="scope">
										        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WP_NUM" disabled></el-input><span v-else="v-else">{{scope.row.WP_NUM}}</span>
										      	</template>
						            		</el-table-column>
						            		<el-table-column label="所属计划行号" sortable width="120px" prop="WP_LINENUM">
										      <template slot-scope="scope">
										      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WP_LINENUM" disabled></el-input><span v-else="v-else">{{scope.row.WP_LINENUM}}</span>
										      </template>
										    </el-table-column>
						            		<el-table-column prop="P_NUM" label="检验项目编号" width="100"></el-table-column>
						            		<el-table-column prop="P_DESC" label="检验项目描述" width="250"></el-table-column>
						            		<el-table-column prop="REMARKS" label="要求" width="200">
						            			<template slot-scope="scope">
										        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REMARKS" placeholder="请输入内容">
										        	</el-input>
										        	<span v-if="!scope.row.isEditing">
										        		{{scope.row.REMARKS}}
										        	</span>
										      </template>
						            		</el-table-column>
						            		<el-table-column prop="VERSION" label="版本" width="80"></el-table-column>
						            		<el-table-column fixed="right" label="操作" width="80">
										      <template slot-scope="scope">
										        <el-button
										          @click="delPlan(scope.$index,scope.row,'WORLPLANLINE_PROJECT','proTestList')" 
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
							<!-- 检测依据、检测项目与要求 End-->

							<!-- todo -->
							<!-- 文件编号列表 Begin-->
							<!-- <el-collapse-item title="文件编号列表" name="5">
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield2"><i class="icon-add"></i><font>新建行</font>
									</el-button>
								</div>
								<el-form>
					                <el-form-item>
					                	<el-row :gutter="20">
					                		<el-col :span="2">
					                            <el-form-item label="计划编号" ></el-form-item>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-form-item label="文件编号"></el-form-item>
					                        </el-col>
					                        <el-col :span="6">
					                            <el-form-item label="文件描述"></el-form-item>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-form-item label="创建人" ></el-form-item>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-form-item label="创建日期"></el-form-item>
					                        </el-col>
					                        <el-col :span="2">
					                            <el-form-item label="上传"></el-form-item>
					                        </el-col>		                        
					                        <el-col :span="2">
					                            <el-form-item label="操作"></el-form-item>
					                        </el-col>
					                	</el-row>
					                    <el-row :gutter="10">
					                        <el-col :span="2">
					                            <el-input type="text"  placeholder="计划编号"></el-input>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-input type="text"  placeholder="文件编号"></el-input>
					                        </el-col>
					                        <el-col :span="6">
					                        	<el-input type="text"  placeholder="文件描述"></el-input>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-input type="text"  placeholder="创建人"></el-input>
					                        </el-col>
					                        <el-col :span="4">
					                            <el-input type="text"  placeholder="创建日期"></el-input>
					                        </el-col>
					                        <el-col :span="2">
					                            <el-upload
													class="upload-demo"
													action="https://jsonplaceholder.typicode.com/posts/"
													:on-preview="handlePreview"
													:on-remove="handleRemove"
													:before-remove="beforeRemove"
													multiple
													:limit="3"
													:on-exceed="handleExceed"
													:file-list="fileList">
													<el-button size="small" type="primary">点击上传</el-button>
												</el-upload>
					                        </el-col>                
					                        <el-col :span="2">
					                            <i class="el-icon-delete" @click="delfield(item)" style="color: red;text-align:center"></i>
					                        </el-col>
					                    </el-row>
					                </el-form-item>
				            	</el-form>
							</el-collapse-item> -->
							<!-- 文件编号列表 End -->
							<el-collapse-item title="文件" name="6">
								<doc-table ref="docTable" :docParm = "docParm"></doc-table>
							</el-collapse-item>
							<!-- 录入人信息 Begin-->
							<el-collapse-item title="其他" name="7" v-if="dept">
								<el-row :gutter="30"  v-show="views">
									<el-col :span="8">
										<el-form-item label="录入人" prop="ENTERBY">
											<el-input v-model="WORKPLAN.ENTERBY" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入日期" prop="ENTERDATE">
											<el-input v-model="WORKPLAN.ENTERDATE" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改人" prop="CHANGEBY">
											<el-input v-model="WORKPLAN.CHANGEBY" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改日期" prop="CHANGEDATE">
											<el-input v-model="WORKPLAN.CHANGEDATE" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30"  v-if="dept">
									<el-col :span="8">
										<el-form-item label="机构" prop="DEPARTMENT">
											<el-input v-model="WORKPLAN.DEPARTMENT" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
							<!-- 录入人信息 End -->
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-form-item>
							<el-button type="primary" class="btn-primarys" @click="saveAndUpdate('WORKPLAN')">保存</el-button>
							<el-button type="success" @click="saveAndSubmit('WORKPLAN')" v-show="addtitle">保存并继续</el-button>
							<el-button @click='close'>取消</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
		<!-- 检测依据弹出框begin -->
		<el-dialog title="检测依据" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
			<!-- 高级查询划出 Begin-->
			<div class="pb10">
				<el-form status-icon :model="searchList" label-width="70px">
					<el-row :gutter="10" class="pb10">
						<el-col :span="6">
							<el-input v-model="searchList.S_NUM">
								<template slot="prepend">标准编号</template>
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-input v-model="searchList.S_NAME">
								<template slot="prepend">标准名称</template>
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-input v-model="searchList.S_ENGNAME">
								<template slot="prepend">英文名称</template>
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-input v-model="searchList.VERSION">
								<template slot="prepend">版本</template>
							</el-input>
						</el-col>		
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							<el-input v-model="searchList.DEPARTMENT">
								<template slot="prepend">录入人机构</template>
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-date-picker style="width: 100%" v-model="searchList.RELEASETIME" type="date" placeholder="发布时间" value-format="yyyy-MM-dd HH:mm:ss">
							</el-date-picker>
						</el-col>
						<el-col :span="6">
							<el-date-picker style="width: 100%" v-model="searchList.STARTETIME" type="date" placeholder="启用时间" value-format="yyyy-MM-dd HH:mm:ss">
							</el-date-picker>
						</el-col>
						<el-col :span="3">
							<el-select style="width: 120%" v-model="searchList.STATUS" placeholder="请选择信息状态">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="2">
							<el-button type="primary" @click="searchinfo" size="small" style="position:absolute;right:10px;">搜索</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!-- 高级查询划出 End-->
			<!-- 第二层弹出的表格 Begin -->
			<el-table :data="standardList" height="400px" border stripe style="width: 100%;" :default-sort="{prop:'standardList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
				<el-table-column type="selection" width="55" fixed>
				</el-table-column>
				<el-table-column label="主键编号" width="120" sortable prop="ID">
				</el-table-column>
				<el-table-column label="标准编号" width="120" sortable prop="S_NUM">
				</el-table-column>
				<el-table-column label="标准名称" width="220" sortable prop="S_NAME">
				</el-table-column>
				</el-table-column>
				<el-table-column label="英文名称" width="220" sortable prop="S_ENGNAME">
				</el-table-column>
				<el-table-column label="状态" width="100" sortable prop="STATUS">
				</el-table-column>
				<el-table-column label="发布时间" width="160" sortable prop="RELEASETIME">
				</el-table-column>
				<el-table-column label="启用时间" width="160" sortable prop="STARTETIME">
				</el-table-column>
				<el-table-column label="版本" width="100" sortable prop="VERSION">
				</el-table-column>
				<el-table-column label="录入人机构" width="180" sortable prop="DEPARTMENT">
				</el-table-column>
				<el-table-column label="录入人" width="120" prop="ENTERBY" sortable>
				</el-table-column>
				<el-table-column label="录入时间" width="160" prop="ENTERDATE" sortable>
				</el-table-column>
				<el-table-column label="修改人" width="120" prop="CHANGEBY" sortable>
				</el-table-column>
				<el-table-column label="修改时间" width="160" prop="CHANGEDATE" sortable>
				</el-table-column>
			</el-table>
			<el-pagination background class="pull-right pt10 pb10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
			</el-pagination>
			<!-- 第二层弹出的表格 End -->
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false" style="margin-left: 37%;">取 消</el-button>
		       <el-button type="primary" @click="addbasis">确 定</el-button>
		    </span>
		</el-dialog>
		<!-- 检测依据弹出框 End -->

		<!-- 检测项目与要求弹出框 Begin -->
		<el-dialog title="检测项目测试与要求" :visible.sync="dialogVisible2" width="80%" :before-close="handleClose">
			<!-- 高级查询划出 Begin-->
			<div class="pb10">
				<el-form status-icon :model="searchList" label-width="70px">
					<el-row :gutter="10">
						<el-col :span="5">
							<el-input v-model="searchList.P_NUM">
								<template slot="prepend">项目编号</template>
							</el-input>
						</el-col>
						<el-col :span="5">
							<el-input v-model="searchList.DEPARTMENT">
								<template slot="prepend">录入人机构</template>
							</el-input>
						</el-col>
						<el-col :span="5">
							<el-input v-model="searchList.P_NAME">
								<template slot="prepend">项目名称</template>
							</el-input>
						</el-col>
						<el-col :span="4">
							<el-input v-model="searchList.VERSION">
								<template slot="prepend">版本</template>
							</el-input>
						</el-col>
						<el-col :span="3">
							<el-select v-model="searchList.STATUS" placeholder="请选择信息状态">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="2">
							<el-button type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!-- 高级查询划出 End-->
			<!-- 第二层弹出的表格 Begin-->
			<el-table :data="projectList" height="400px" border stripe style="width: 100%;" :default-sort="{prop:'projectList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
				<el-table-column type="selection" width="55" fixed>
				</el-table-column>
				<el-table-column label="检验/检测项编号" width="150" sortable prop="P_NUM">
				</el-table-column>
				<el-table-column label="项目名称" width="220" sortable prop="P_NAME">
				</el-table-column>
				<el-table-column label="人员资质" width="180" sortable prop="QUALIFICATION">
				</el-table-column>
				<el-table-column label="状态" width="100" sortable prop="STATUS" :formatter="judge">
				</el-table-column>
				<el-table-column label="领域" width="120" sortable prop="FIELD" >
				</el-table-column>
				<el-table-column label="子领域" width="120" sortable prop="CHILD_FIELD">
				</el-table-column>
				<el-table-column label="版本" width="100" sortable prop="VERSION">
				</el-table-column>
				<el-table-column label="录入人机构" width="180" sortable prop="DEPARTMENT">
				</el-table-column>
				<el-table-column label="录入人" width="120" prop="ENTERBY" sortable>
				</el-table-column>
				<el-table-column label="录入时间" width="160" prop="ENTERDATE" sortable :formatter="dateFormat">
				</el-table-column>
				<el-table-column label="修改人" width="120" prop="CHANGEBY" sortable>
				</el-table-column>
				<el-table-column label="修改时间" width="160" prop="CHANGEDATE" sortable :formatter="dateFormat">
				</el-table-column>
			</el-table>
			<el-pagination background class="pull-right pt10 pb10"
	            @size-change="sizeChange"
	            @current-change="currentChange"
	            :current-page="page.currentPage"
	            :page-sizes="[10, 20, 30, 40]"
	            :page-size="page.pageSize"
	            layout="total, sizes, prev, pager, next"
	            :total="page.totalCount">
	        </el-pagination>
			<!-- 表格 End-->
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible2 = false" style="margin-left: 37%;">取 消</el-button>
		       <el-button type="primary" @click="addbasis2">确 定</el-button>
		    </span>
		</el-dialog>
		<!-- 检测项目与要求 End -->
		<!-- 产品类别 Begin -->
		<el-dialog title="产品类别" height="400px" :visible.sync="dialogVisible3" width="80%" :before-close="handleClose">
			<!-- 第二层弹出的表格 Begin-->
			<el-table :header-cell-style="rowClass" :data="categoryList" border stripe :height="fullHeight" style="width: 100%;" :default-sort="{prop:'categoryList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
				<el-table-column type="selection" fixed width="55" align="center">
				</el-table-column>
				<el-table-column label="编码" width="155" sortable prop="NUM">
				</el-table-column>
				<el-table-column label="名称" sortable prop="TYPE">
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
			<!-- 表格 End-->
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible3 = false" style="margin-left: 37%;">取 消</el-button>
		       <el-button type="primary" @click="addproclass">确 定</el-button>
		    </span>
		</el-dialog>
		<!-- 产品类别 End -->
		<!-- 产品名称 Begin -->
		<el-dialog title="产品名称" :visible.sync="dialogVisible4" width="80%" :before-close="handleClose">
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
		       <el-button @click="dialogVisible4 = false" style="margin-left: 37%;">取 消</el-button>
		       <el-button type="primary" @click="addproname">确 定</el-button>
		    </span>
		</el-dialog>
		<!-- 产品名称 End -->
	</div>
</template>

<script>
	import Config from '../../config.js'
	import docTable from '../common/doc.vue'
	export default {
		name: 'masks',
		components: {docTable},
		data() {
			var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
            var validateAddress = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写联系地址'));
                }else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写联系电话'));
                }else {
                    callback();
                }
            };
            var validateEmail = (rule, value, callback) => {
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
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(''));
                }else {
                    callback();
                }
            };
            var validateUnit = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择提出单位'));
                }else {
                    callback();
                }
            };
            var validateItemtype = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写产品类别'));
                }else {
                    callback();
                }
            };
            var validateType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择计划类型'));
                }else {
                    callback();
                }
            };
            var validateBasislist = (rule, value, callback) => {
            	console.log(rule, value, callback);
                if (value === '') {
                    callback(new Error('请选择检测依据'));
                }else {
                    callback();
                }
            };
			return {
				docParm: {
					'model': 'new',
					'appname': '',
					'recordid': 1,
					'userid': 1,
					'username': '',
					'deptid': 1,
					'deptfullname': '',
					'appname': '',
					'appid': 1
				},
				basic_url: Config.dev_url,
				showEdit: [], //显示编辑框
		        showBtn: [],
		        showBtnOrdinary: true,
		        fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				value: '',
				assignshow:false,//下达任务通知书按钮
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				loadSign:true,//加载
				commentArr:{},
				selUser:[],
				productList:[],
				edit: true, //禁填
				col_but1: true,
				col_but2: true,
				show: false,
				modify:false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				addtitle:true,//添加弹出框titile
				modifytitle:false,//修改弹出框titile
				viewtitle: false, //查看弹出框title
				noviews: true, //保存的按钮
				views: false,
				activeName: 'first',//tabs
				activeNames: ['1','2','3','4','5','6','7'],//手风琴数量
				labelPosition: 'right', //表格
				dialogVisible: false, //对话框
				dialogVisible2: false, //对话框
				dialogVisible3: false, //对话框
				dialogVisible4: false, //对话框
				searchList: { //点击高级搜索后显示的内容
					S_NUM: '',
					S_NAME: '',
					VERSION: '',
					DEPARTMENT: '',
					RELEASETIME: '',
					STARTETIME: '',
					STATUS: '',
				},
				dataList:[{
					name:'',
					description:''
				}],
				search:'',
				selectData:[],
				standardList: [],//检测依据数据
				projectList: [],//检测项目与要求
				fileList:[],//上传附件数据
				page: { //分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				WORKPLAN:{
				},
				inspectionList_child: {
					 WORLPLANLINE_BASISList:[],
					 WORLPLANLINE_PROJECTList:[]
				},
				
				rules: {
					CODE: [{required: true,trigger: 'blur',validator: validateCode,}],
					NAME:[{required: true,trigger: 'blur',validator: validateName,}],
					CONTACT_ADDRESS:[{required: true,trigger: 'blur',validator: validateAddress,}],
					PHONE:[{required: true,trigger: 'blur',validator: validatePhone,}],
					EMAIL:[{required: true,trigger: 'blur',validator: validateEmail,}],
					PROP_UNIT:[{required: true,validator: validateUnit,trigger: 'change'}],//提出单位 
       				ITEMTYPE:[{required: true,validator: validateItemtype,trigger: 'change' }],//产品类别 
       				YEAR: [{type: 'string',required: true,message: '请选择年度',trigger: 'change' }],//年度
       				REPORTDATE: [{type: 'string',required: true,message: '请选择提报日期',trigger: 'change'}],//提报日期
       				//检测依据 
       				basisList:[{required: true,validator: validateBasislist,trigger: 'change'}],//产品类别 
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				worlplanlist: [], //年度计划列表
				basisList: [], //检测依据
				proTestList: [], //项目检测和要求
				isEditList: false,  //年度计划列表编辑装填
				editPlan: {},  //编辑中的内容
				frontId: 1, //前端年度计划列表的唯一主键
				index:0,
				views:true,
				dept:true,
				categoryList:[],
				proindex:0,
				falg:false
			};
		},
		methods: {
			//提出单位
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
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			toNum(str) {
				return str.replace(/\,|\￥/g, "");
			},
			//金额两位小数点千位分隔符，四舍五入
			toPrice(item){
				var money = document.getElementById("cost").value;
				var num = parseFloat(this.toNum(money)).toFixed(2).toString().split(".");
				num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
				// this.dataInfo.CHECTCOST="￥" + num.join(".");
				item.CHECKCOST = num.join(".");
			},
			//检测项目与要求修改和保存状态
			changeEdit(row){
				this.$nextTick(function(){
					row.isEditing = !row.isEditing;
				});
			},
			//删除计划列表
			delPlan(index,row,TableName,delList){
				if(row.ID){
					var url = this.basic_url +'/api-apps/app/workplan/' + TableName +'/' + row.ID;
					this.$axios.delete(url, {}).then((res) => {
						if(res.data.resp_code == 0){
							this[delList].splice(index,1);
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
				}else{
					this[delList].splice(index,1);
				}
			},
			//下达任务通知书
			assign(item){
				var dataid = item.ID;
				console.log(dataid);
				console.log(item);
				console.log(item.ISCREATED);
				if(item.ISCREATED == 1){
					this.$message({
						message: '已经下达工作任务通知书，请勿重复下达',
						type: 'warning'
					});
					return;
				}else{
					this.$axios.get(this.basic_url + '/api-apps/app/workplan/operate/createWorkNotice?ID=' + dataid, {}).then((res) => {
						if(res.data.resp_code == 0) {
							this.$message({
								message: '下达工作任务通知书成功',
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
   			//年度计划表格函数
   			iconOperation(row){
   				row.isEditing = !row.isEditing;
	            this.isEditList = row.isEditing;
	            //如果有编辑状态的数据，保存上一条处于编辑状态的数据
            	var editId = this.editPlan.frontId;
            	if(editId){
            		let worlplanlist = this.worlplanlist;
	            	for(let i=0, len=worlplanlist.length; i<len; i++){
	            		if(editId == worlplanlist[i].frontId){
	            			worlplanlist[i].WORLPLANLINE_PROJECTList = JSON.parse(JSON.stringify(this.proTestList));
	            			worlplanlist[i].WORLPLANLINE_BASISList = JSON.parse(JSON.stringify(this.basisList));
	            			worlplanlist[i].isEditing = false;
	            		}
	            	}
            	}
            	
	            if(row.isEditing){
	            	//编辑
	        		this.editPlan = row;
	        		this.proTestList = row.WORLPLANLINE_PROJECTList;
			   		this.basisList = row.WORLPLANLINE_BASISList;
	        	}else{
	        		this.editPlan = {};
	        		this.proTestList = [];
	        		this.basisList = [];
	        	}
	        },
   			//上传文件 Begin
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//上传文件 End
   			judge(data) {
				return data.STATUS=="1" ? '活动' : '不活动'
			},
   			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
			},
            addbasis(){
            	var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
					return;
				} else {
					//循环push页面正常显示
					for(var i = 0;i<selData.length;i++){
						//新选来的数据ID为空
						selData[i].ID = '';
						//产品编号  与主表关联
						selData[i].WP_NUM = this.WORKPLAN.WP_NUM;
						selData[i].WP_LINENUM = this.editPlan.WP_LINENUM;
						//产品序号
						selData[i].NUMBER = this.proTestList.length>0?this.proTestList[this.proTestList.length-1].NUMBER+i+1 :
							1;
						this.basisList.push(JSON.parse(JSON.stringify(selData[i])));
					}
					this.dialogVisible = false;
					this.$message({
						message: '添加成功',
						type: 'success'
					});
					return;
				}
            },
            addbasis2(){
            	var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
					return;
				} else {
					for(var i = 0;i<selData.length;i++){
						selData[i].P_DESC = selData[i].P_NAME;
						//可编辑状态
						selData[i].isEditing = false;
						//新选来的数据ID为空
						selData[i].ID = '';
						//产品要求
						selData[i].REMARKS = '';
						//产品编号
						selData[i].WP_NUM = this.WORKPLAN.WP_NUM;
						selData[i].WP_LINENUM = this.editPlan.WP_LINENUM;
						//产品序号
						selData[i].NUMBER = this.proTestList.length>0?this.proTestList[this.proTestList.length-1].NUMBER+i+1 :
							1;
						this.proTestList.push(JSON.parse(JSON.stringify(selData[i])));
					}
					this.dialogVisible2 = false;
					this.$message({
						message: '添加成功',
						type: 'success'
					});
					return;
				}
			},
			addproclass() { //小弹出框确认按钮事件
				this.dialogVisible3 = false;
				this.WORKPLAN.ITEMTYPE = this.selUser[0].TYPE;
				this.$emit('request');
			},
			addproduct(item){//产品名称按钮
				this.$emit('request');
				this.dialogVisible4 = true;
				this.proindex = item;
			},
			addproname(){//产品名称弹框确定选中数据
				this.dialogVisible4 = false;
				this.proindex.ITEM_NAME = this.selUser[0].PRO_NAME;
				this.$emit('request');
			},
            //tabs
			handleClick(tab, event) {
//		        console.log(tab, event);
		    },
            //检测依据弹出框
            basisleadbtn(){
            	this.$emit('request');
            	this.requestData();
				this.dialogVisible = true;
			},
			basisleadbtn2(){
				this.$emit('request');
				this.requestData();
				this.dialogVisible2 = true;
			},
			addprobtn(){
				this.dialogVisible3 = true;
				console.log(23333);
				console.log(this.WORKPLAN.PROP_UNIT);
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				};
				this.$axios.get(this.basic_url + '/api-apps/app/productType?DEPARTMENT='+this.WORKPLAN.PROP_UNIT, {
					params: data
				}).then((res) => {
					console.log(res.data);
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
					this.categoryList = newarr;
				}).catch((wrong) => {})
			},
			handleChange(val) {//手风琴开关效果调用
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			
			addfield1(){//年度计划列表新建行
				if (this.isEditList == false){
                	var date=new Date();
					this.currentDate = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
					this.index = this.index + 1;
					var obj = {
						'ID': '',
						'WP_NUM': 10001,
						'WP_LINENUM': this.index,
						'ITEM_NAME': '',
						'MODEL': '',
						'V_NAME': '',
						'BASIS': '',
						'P_NAME': '',
						//todo  默认值暂时为0
						'CHECKCOST': 0,
						'REASION': '',
						'MEMO': '',
						'isEditing': true,
						'frontId': this.frontId++,
						'STATUS': '1',
						'VENDOR':  ''
					};
					this.worlplanlist.push(obj);
					this.editPlan = this.worlplanlist[0];
					this.basisList = [];
					this.proTestList = [];
					this.isEditList = true;
	            } else {
	                this.$message.warning("请先保存当前编辑项");
				}
			},
			addfield2(){//文件编号列表新建行
				var obj2 = {
                    STEP:'',
					CERTIFICATE_NUM:'',
					CERTIFICATE_NAME:'',
					ACTIVE_DATE:'',
					STATUS:'',
					MEMO:''
                };
			},
			addfield4(){
				var obj4 = {
                    NUMBER:'',
					P_NUM:'',
					P_DESC:'',
					REMARKS:'',
					VERSION:''
                };
                this.WORKPLAN.WORLPLANLINE_PROJECTList.push(obj4);
			},
			delfield1(item){//年度计划列表删除行
                var index = this.WORKPLAN.WORLPLANLINEList.indexOf(item);
                if (index !== -1) {
                    this.WORKPLAN.WORLPLANLINEList.splice(index, 1);
                }
			},
			delfield3(item){//年度计划列表删除行
                var index = this.inspectionList_child.WORLPLANLINE_BASISList.indexOf(item);
                if (index !== -1) {
                    this.inspectionList_child.WORLPLANLINE_BASISList.splice(index, 1);
                }
			},
			delfield4(item){//年度计划列表删除行
                var index = this.inspectionList_child.WORLPLANLINE_PROJECTList.indexOf(item);
                if (index !== -1) {
                    this.inspectionList_child.WORLPLANLINE_PROJECTList.splice(index, 1);
                }
			},
			col_but(col_but) {
				if(col_but == 'col_but1') {
					this.col_but1 = !this.col_but1;
					this.down = !this.down,
					this.up = !this.up
				}
				if(col_but == 'col_but2') {
					this.col_but2 = !this.col_but2;
					this.down = !this.down,
					this.up = !this.up
				}
			},
			getUser(opt){
				this.$axios.get(this.basic_url +'/api-user/users/currentMap', {}).then((res) => {
					if(opt=='new'){
						this.WORKPLAN.ENTERBY = res.data.nickname;
	    				this.WORKPLAN.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
					}else{
						this.WORKPLAN.DEPARTMENT = res.data.deptName;
	    				this.WORKPLAN.CHANGEBY = res.data.nickname;
	    				var date = new Date();
						this.WORKPLAN.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD");

						this.docParm.userid = res.data.id;
						this.docParm.username = res.data.username;
						this.docParm.deptid = res.data.deptId;
						this.docParm.deptfullname = res.data.deptName;
					}
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			//点击添加，修改按钮显示弹窗
			visible() {
				this.assignshow = false;//下达 按钮
				var myDate = new Date();
				var date = this.$moment(date).format("YYYY-MM-DD");
				var year = myDate.getFullYear().toString();
				this.WORKPLAN = {
					'ID': '',
					'WP_NUM': '',
					'DESCRIPTION': '',
					'YEAR': year,	
					'TYPE': '',
					'STATUS': '草稿',
					'LEADER_STATUS': '未开始',
					'STATUSDATE': date,
					'ITEMTYPE': '',
					'PROP_UNIT': '',
					'ENTERBY': '当前人',
					'ENTERDATE': date,
					'CHANGEBY': '',
					'CHANGEDATE': '',
					'COMPACTOR': '',
					'C_PERSON': '',
					'APPRPERSON': '',
					'REPORTDATE': date,
					'MEMO': '',
					'MESSSTATUS': '1',
					'SYNCHRONIZATION_TIME': ''
				};
				this.worlplanlist = []; //年度计划列表
				this.basisList = []; //检测依据
				this.proTestList = []; //项目检测和要求
				this.isEditList = false;

				this.docParm = {
					'model': 'new',
					'appname': 'WORKPLAN',
					'recordid': 1,
					'appid': 39 
				};
				this.getUser('new');

				this.addtitle = true;
            	this.modifytitle = false;
            	this.modify=false;
            	this.views = false;
            	this.dept = false;
            	this.show = true;
            	this.edit = true;
				this.noedit = false;
			},
			// 这里是修改
			detail(dataid) {
				this.assignshow = true;
				this.$axios.get(this.basic_url +'/api-apps/app/workplan/' + dataid, {}).then((res) => {
					this.WORKPLAN = res.data;
					this.worlplanlist = res.data.WORLPLANLINEList;
					var worlplanlist = res.data.WORLPLANLINEList;
					for(var i=0, len=worlplanlist.length; i<len; i++){
						worlplanlist[i].isEditing = false;
						worlplanlist[i].frontId = this.frontId++;
						var cost = worlplanlist[i].CHECKCOST.toString();
						var num = parseFloat(this.toNum(cost)).toFixed(2).toString().split(".");
						num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
						worlplanlist[i].CHECKCOST = num.join(".");
					}
					this.basisList = res.data.WORLPLANLINEList.length > 0 ? res.data.WORLPLANLINEList[0].WORLPLANLINE_BASISList : [];
					this.proTestList = res.data.WORLPLANLINEList.length > 0 ? res.data.WORLPLANLINEList[0].WORLPLANLINE_PROJECTList : [];

					this.getUser('edit');
					var _this = this;
					setTimeout(function(){
						_this.docParm.model = 'edit';
						_this.docParm.appname = 'WORKPLAN';
						_this.docParm.recordid = _this.WORKPLAN.ID;
						_this.docParm.appid = 39;
						_this.$refs.docTable.getData();
					},100);
					var type = "2";
					var url = this.basic_url + '/api-user/depts/treeByType';
					this.$axios.get(url, {
						params: {
							type: type
						},
					}).then((res) => {
						this.selectData = res.data;
					});
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType?id='+this.WORKPLAN.PROP_UNIT;
				this.$axios.get(url, {
					// params: {
					// 	type: type
					// },
				}).then((res) => {
					console.log(res.data);
					this.selectData = res.data;
				});
				this.viewtitle = false;
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.views = false;
				this.dept = true;
				this.show = true;
				this.edit = true;
				this.noedit = false;
			},
			//查看
			view(dataid) {
				this.addtitle = false;
				this.viewtitle = true;
				this.views = true; //
				this.noviews = false;
				this.edit = true;
				this.noedit = true;
				var url = this.basic_url + '/api-apps/app/workplan/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					this.WORKPLAN = res.data;
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
				this.$emit('request');
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
			// rmoney(s) 
			// { 
			// 	return parseFloat(s.replace(/[^\d\.-]/g, "")); 
			// },
			// 保存users/saveOrUpdate
			save(WORKPLAN) {
				this.$refs.WORKPLAN.validate((valid) => {
					if (valid) {
						if(!this.isEditList){
							for(let i=0;i<this.worlplanlist.length;i++){
								console.log(this.worlplanlist[i].CHECKCOST);
								let b = parseFloat(this.worlplanlist[i].CHECKCOST.replace(/[^\d\.-]/g, ""));
								this.worlplanlist[i].CHECKCOST = b;
							}
							this.WORKPLAN.WORLPLANLINEList = this.worlplanlist;
							var url = this.basic_url +'/api-apps/app/workplan/saveOrUpdate';
							this.$axios.post(url, this.WORKPLAN).then((res) => {
								if(res.data.resp_code == 0) {
									this.$message({
										message: '保存成功',
										type: 'success'
									});
									//重新加载数据
										this.$emit('request');
										this.$emit('reset');
										// this.visible();
								}else{
									this.$message({
										message: res.data.message,
										type: 'error'
									});
								}
							}).catch((err) => {
								this.$message({
									message: '网络错误，请重试',
									type: 'error'
								});
							});
						}else{
							this.$message({
								message: '您还没有在编辑数据，需保存',
								type: 'warning'
							});
						}
						this.falg = true;
					} else {
						this.show = true;
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
						this.falg = false;
					}
	  			});
			},
			//保存
			saveAndUpdate(WORKPLAN) {
				this.save(WORKPLAN);
				if(this.falg){
					this.show = false;
				}
			},
			//保存并继续
			saveAndSubmit(WORKPLAN) {
				this.save(WORKPLAN);
				// this.visible();
				this.visible();
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
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			requestData(index) {//高级查询字段
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					S_NUM: this.searchList.S_NUM,
					S_NAME: this.searchList.S_NAME,
					VERSION: this.searchList.VERSION,
					DEPARTMENT: this.searchList.DEPARTMENT,
					RELEASETIME: this.searchList.RELEASETIME,
					STARTETIME: this.searchList.STARTETIME,
					STATUS: this.searchList.STATUS,
					P_NUM: this.searchList.P_NUM,
					DEPARTMENT: this.searchList.DEPARTMENT,
					P_NAME: this.searchList.P_NAME,
					VERSION: this.searchList.VERSION,
					STATUS: this.searchList.STATUS,
				};
				var url = this.basic_url +'/api-apps/app/inspectionSta';
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
					this.commentArr[this.page.currentPage]=res.data.data
					let newarr=[]
					for(var i = 1; i <= totalPage; i++){
					
						if(typeof(this.commentArr[i])!='undefined' && this.commentArr[i].length>0){
							
							for(var j = 0; j < this.commentArr[i].length; j++){
								newarr.push(this.commentArr[i][j])
							}
						}
					}
					this.standardList = newarr;
				}).catch((wrong) => {})
				this.$axios.get(this.basic_url +'/api-apps/app/inspectionPro', {
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
					
					this.projectList = newarr;
				}).catch((wrong) => {})
				// var data = {
				// 	page: this.page.currentPage,
				// 	limit: this.page.pageSize,
				// 	PRO_NUM: this.searchList.PRO_NUM,
				// 	PRO_NAME: this.searchList.PRO_NAME,
				// 	VERSION: this.searchList.VERSION,
				// 	DEPARTMENT: this.searchList.DEPARTMENT,
				// 	// STATUS: this.searchList.STATUS,
				// }
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
			this.requestData();
			this.getCompany();
		},
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
	.ml60 {margin-left: 60px;}
	#cost{text-align: right !important;}
	#costshow{float: right;}
</style>