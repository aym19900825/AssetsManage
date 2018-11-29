<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">年度计划</div>
				<div class="mask_title" v-show="modifytitle">年度计划</div>
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
				<el-form status-icon :model="WORKPLAN" :label-position="labelPosition" :rules="rules" ref="WORKPLAN" label-width="100px">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">

							<el-collapse-item title="基本信息" name="1">
								<el-row :gutter="20">
									<el-col :span="5" class="pull-right">
										<el-input placeholder="草稿" v-model="WORKPLAN.STATUS" :disabled="true">
												<template slot="prepend">状态</template>
										</el-input>
									</el-col>
									<el-col :span="5" class="pull-right">
										<el-select v-model="WORKPLAN.TYPE" placeholder="类别">
									    	<el-option label="监督抽查" value="1"></el-option>
									    	<el-option label="质量抽查" value="0"></el-option>
										</el-select>
									</el-col>
									<el-col :span="5" class="pull-right">
										<el-input v-model="WORKPLAN.WP_NUM" :disabled="true">
												<template slot="prepend">计划编号</template>
										</el-input>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="6">
										<el-form-item label="提出单位" prop="PROP_UNIT">
											<el-select v-model="WORKPLAN.PROP_UNIT" placeholder="请选择">
										    	<el-option label="金化站" value="1"></el-option>
										    	<el-option label="运包站" value="0"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="产品类别" prop="ITEMTYPE">
											<el-input v-model="WORKPLAN.ITEMTYPE" >
												<el-button slot="append" icon="el-icon-search"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="计划描述" prop="DESCRIPTION">
											<el-input v-model="WORKPLAN.DESCRIPTION"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
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
									<el-col :span="6">
										<el-form-item label="提报日期" prop="REPORTDATE">
										<div class="block">
										    <el-date-picker
										      v-model="WORKPLAN.REPORTDATE"
										      type="date"
										      placeholder="选择日期" value-format="yyyy-MM-dd">
										    </el-date-picker>
										  </div>
										 </el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :span="6">
										<el-form-item label="年度" prop="YEAR">
											<div class="block">
											    <el-date-picker
											      v-model="WORKPLAN.YEAR"
											      type="year"
											      placeholder="选择年度" value-format="yyyy">
											    </el-date-picker>
											</div>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="信息状态" prop="MESSSTATUS">
											<el-input v-model="WORKPLAN.MESSSTATUS"></el-input>
										</el-form-item>
									</el-col>
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

								<el-table :data="WORKPLAN.WORLPLANLINEList" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'WORKPLAN.WORLPLANLINEList', order: 'descending'}" v-loadmore="loadMore">

								    <el-table-column prop="iconOperation" fixed label="" width="50px">
								      <template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
								    </el-table-column>

								    <el-table-column label="所属计划编号" sortable width="120px" prop="WP_NUM">
								      <template slot-scope="scope">
								      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WP_NUM" disabled></el-input><span v-else="v-else">{{scope.row.WP_NUM}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column label="产品排序号" sortable width="120px" prop="WP_LINENUM">
								      <template slot-scope="scope">
								      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WP_LINENUM" disabled></el-input><span v-else="v-else">{{scope.row.WP_LINENUM}}</span>
								      </template>
								    </el-table-column>

									<el-table-column prop="ITEM_NAME" label="产品名称" sortable width="120px" :formatter="judge">
								      <template slot-scope="scope">
								         <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ITEM_NAME" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.ITEM_NAME}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="MODEL" label="规格型号" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MODEL" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.MODEL}}</span>
								      </template>
								    </el-table-column>

<<<<<<< HEAD
    <el-table-column prop="MEMO" label="近三年监督抽查情况" sortable width="260px">
      <template slot-scope="scope">
        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MODEL" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.MODEL}}</span>
      </template>
    </el-table-column>
=======
								    <el-table-column prop="V_NAME" label="生产企业名称" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.V_NAME" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.V_NAME}}</span>
								      </template>
								    </el-table-column>
>>>>>>> 9c532c7776174749c8532b631a08cf0378bd1a70

								    <el-table-column prop="CHECKCOST" label="检测费用" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHECKCOST" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.CHECKCOST}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="REASION" label="项目提出理由" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REASION" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.REASION}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="MEMO" label="近三年监督抽查情况" sortable width="160px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MODEL" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.MODEL}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column fixed="right" label="操作" width="120">
								      <template slot-scope="scope">
								        <el-button @click.native.prevent="deleteRow(scope.$index, WORKPLAN.WORLPLANLINEList)" type="text" size="small">
								          移除
								        </el-button>
								      </template>
								    </el-table-column>
								  </el-table>
							</el-collapse-item>
							<!-- 年度计划列表 End -->

							<!-- 检测依据 Begin-->
							<el-collapse-item title="检测依据" name="3" class="ml60">
								<div class="table-func">
									<el-button type="primary" size="mini" round @click="basisleadbtn">
										<i class="icon-search"></i>
										<font>选择</font>
									</el-button>
								</div>
				            	<el-table :data="inspectionList_child.WORLPLANLINE_BASISList" border stripe height="200" style="width: 100%;" :default-sort="{prop:'inspectionList_child.WORLPLANLINE_BASISList', order: 'descending'}">
				            		<el-table-column prop="NUMBER" label="所属计划编号" width="120">
				            			<template slot-scope="scope">
								        	<span>{{scope.$index + 1}}</span>
								      	</template>
				            		</el-table-column>

				            		<el-table-column prop="WP_LINENUM" label="所属计划行号" width="120"></el-table-column>

				            		<el-table-column prop="S_NUM" label="标准编号" width="250"></el-table-column>

				            		<el-table-column prop="S_NAME" label="标准内容" width="250"></el-table-column>
				            		<el-table-column prop="VERSION" label="版本" width="300"></el-table-column>
				            		<el-table-column fixed="right" label="操作" width="80">
								      <template slot-scope="scope">
								        <el-button
								          @click.native.prevent="deleteRow(scope.$index, inspectionList_child.WORLPLANLINE_BASISList)"
								          type="text"
								          size="small">
								          	<i class="icon-trash red"></i>
								        </el-button>
								      </template>
								    </el-table-column>
				            	</el-table>
							</el-collapse-item>
							<!-- 检测依据 End -->

							<!-- 检测项目与要求 begin -->
							<el-collapse-item title="检测项目与要求" name="4" class="ml60">
								<!-- 资质信息 Begin-->
								<div class="table-func">
									<el-button type="primary" size="mini" round @click="basisleadbtn2">
										<i class="icon-search"></i>
										<font>选择</font>
									</el-button>
								</div>
				            	<el-table :data="inspectionList_child.WORLPLANLINE_PROJECTList" border stripe height="200" style="width: 100%;" :default-sort="{prop:'inspectionList_child.WORLPLANLINE_PROJECTList', order: 'descending'}">
				            		<el-table-column prop="WP_NUM" label="所属计划编号" width="80">
				            			<template slot-scope="scope">
								        	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WP_NUM" disabled></el-input><span v-else="v-else">{{scope.row.WP_NUM}}</span>
								      	</template>
				            		</el-table-column>
				            		<el-table-column label="产品排序号" sortable width="120px" prop="WP_LINENUM">
								      <template slot-scope="scope">
								      	<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.WP_LINENUM" disabled></el-input><span v-else="v-else">{{scope.row.WP_LINENUM}}</span>
								      </template>
								    </el-table-column>
				            		<el-table-column prop="P_NUM" label="检验项目编号" width="170"></el-table-column>
				            		<el-table-column prop="P_DESC" label="检验项目描述" width="250"></el-table-column>
				            		<el-table-column prop="REMARKS" label="要求" width="200"></el-table-column>
				            		<el-table-column prop="VERSION" label="版本" width="200"></el-table-column>
				            		<el-table-column fixed="right" label="操作" width="80">
								      <template slot-scope="scope">
								        <el-button
								          @click.native.prevent="deleteRow(scope.$index, inspectionList_child.WORLPLANLINE_PROJECTList)"
								          type="text"
								          size="small">
								          	<i class="icon-trash red"></i>
								        </el-button>
								      </template>
								    </el-table-column>
				            	</el-table>
							</el-collapse-item>
							<!-- 检测项目与要求 End -->

							<!-- 文档编号列表 Begin-->
							<el-collapse-item title="文档编号列表" name="5">
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
					                            <el-form-item label="文档编号"></el-form-item>
					                        </el-col>
					                        <el-col :span="6">
					                            <el-form-item label="文档描述"></el-form-item>
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
					                            <el-input type="text"  placeholder="文档编号"></el-input>
					                        </el-col>
					                        <el-col :span="6">
					                        	<el-input type="text"  placeholder="文档描述"></el-input>
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
							</el-collapse-item>
							<!-- 文档编号列表 End -->

							<!-- 录入人信息 Begin-->
							<el-collapse-item title="录入人信息" name="6">
								<el-row :gutter="30">
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
								</el-row>
								<el-row :gutter="30" v-if="modify">
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
							</el-collapse-item>
							<!-- 录入人信息 End -->
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-form-item>
							<el-button @click='close'>取消</el-button>
							<el-button type="primary" class="btn-primarys" @click="submitForm('WORKPLAN')">提交</el-button>
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
												<el-select style="width: 120%" v-model="searchList.STATUS" placeholder="请选择状态">
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
					<!-- 第二层弹出的表格 -->
						<el-table :data="standardList" border stripe height="400" style="width: 100%;" :default-sort="{prop:'standardList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
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
						<!-- 表格 -->
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false" style="margin-left: 37%;">取 消</el-button>
		       <el-button type="primary" @click="addbasis">确 定</el-button>
		    </span>
		</el-dialog>
		<!-- 检测依据弹出框end -->

		<!-- 检测项目与要求弹出框begin -->
		<el-dialog title="检测项目与要求" :visible.sync="dialogVisible2" width="80%" :before-close="handleClose">
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
												<el-select v-model="searchList.STATUS" placeholder="请选择状态">
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
					<!-- 第二层弹出的表格 -->
						<!-- 表格 Begin-->
									<el-table :data="projectList" border stripe height="400" style="width: 100%;" :default-sort="{prop:'projectList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
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
		<!-- 检测项目与要求end -->
	</div>
</template>

<script>
	export default {
		name: 'masks',
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
			return {
				
				showEdit: [], //显示编辑框
		        showBtn: [],
		        showBtnOrdinary: true,

				value: '',
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
				activeNames: ['1','2','3','4','5','6','7'],//手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				dialogVisible2: false, //对话框
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
					ID:'',
					WP_NUM:'10001',
					DESCRIPTION:'',
					STATUS:'1',
					YEAR:'',
					TYPE:'',
					LEADER_STATUS:'',
					STATUSDATE:'',
					ITEMTYPE:'',
					PROP_UNIT:'',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:'',
					COMPACTOR:'',
					C_PERSON:'1',
					APPRPERSON:'',
					REPORTDATE:'',
					MEMO:'',
					MESSSTATUS:'1',
					WORLPLANLINEList: []
				},
				inspectionList_child: {
					// ID:'',
					// WP_NUM:'',
					// WP_LINENUM:'',
					// ITEM_NAME:'',
					// MODEL:'',
					// VENDOR:'',
					// V_NAME:'',
					// SJ_NAME:'',
					// CHECKCOST:'',
					// REASION:'',
					// MEMO:'',
					// STATUS:'',
					 WORLPLANLINE_BASISList:[],
					 WORLPLANLINE_PROJECTList:[]
				},
				
				rules: {
					CODE: [{
						required: true,
						trigger: 'blur',
						validator: validateCode,
					}],
					NAME:[{
						required: true,
						trigger: 'blur',
						validator: validateName,
					}],
					CONTACT_ADDRESS:[{
						required: true,
						trigger: 'blur',
						validator: validateAddress,
					}],
					PHONE:[{
						required: true,
						trigger: 'blur',
						validator: validatePhone,
					}],
					EMAIL:[{
						required: true,
						trigger: 'blur',
						validator: validateEmail,
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
			};
		},
		methods: {
   			
   			//年度计划表格函数
   			iconOperation(row, column, cell, event){

		        if(column.property ==="iconOperation"){
		        	console.log(row.isEditing);
		            row.isEditing = !row.isEditing;
		            console.log(row.isEditing);
		        }
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
            	console.log(selData);
				if(selData.length == 0) {
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
					return;
				} else {
					//循环push页面正常显示
					for(var i = 0;i<selData.length;i++){
						this.inspectionList_child.WORLPLANLINE_BASISList.push(selData[i]);
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
            	console.log(selData);
				if(selData.length == 0) {
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
					return;
				} else {
					//循环push页面正常显示
					for(var i = 0;i<selData.length;i++){
						console.log(this.WORKPLAN.WORLPLANLINEList[0].WP_LINENUM);
						//var WP_LINENUMS = this.WORKPLAN.WORLPLANLINE[0].WP_LINENUM;
						this.inspectionList_child.WORLPLANLINE_PROJECTList.push(selData[i]);
						this.inspectionList_child.WORLPLANLINE_PROJECTList[i].P_DESC = selData[i].P_NAME;
						this.inspectionList_child.WORLPLANLINE_PROJECTList[i].WP_NUM = this.WORKPLAN.WP_NUM;
						this.inspectionList_child.WORLPLANLINE_PROJECTList[i].WP_LINENUM = this.WORKPLAN.WORLPLANLINEList[0].WP_LINENUM;
						
					}
					this.dialogVisible2 = false;
					this.$message({
						message: '添加成功',
						type: 'success'
					});
					return;
				}
            },
            deleteRow(index, rows) {//Table-操作列中的删除行
				rows.splice(index, 1);
			},
            //检测依据弹出框
            basisleadbtn(){
				this.dialogVisible = true;
			},
			basisleadbtn2(){
				this.dialogVisible2 = true;
			},
			handleChange(val) {//手风琴开关效果调用
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			
			addfield1(){//年度计划列表新建行
				var isEditingflag=false;
				for(var i=0;i<this.WORKPLAN.WORLPLANLINEList.length; i++){
					if (this.WORKPLAN.WORLPLANLINEList[i].isEditing==false){
						isEditingflag=false;
					}else{
                        isEditingflag=true;
                        break;
					}
				}
				if (isEditingflag==false){
                	this.$axios.get('/api/api-user/users/currentMap',{}).then((res)=>{
						var date=new Date();
						this.currentDate = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
						var index=this.$moment(date).format("YYYYMMDDHHmmss");
						var obj = {
							WP_NUM:10001,
							WP_LINENUM:index,
							ITEM_NAME:'',
							MODEL:'',
							V_NAME:'',
							BASIS:'',
							P_NAME:'',
							CHECKCOST:'',
							REASION:'',
							MEMO:'',
							"isEditing": true,
							// WORLPLANLINE_BASISList:[],
							// WORLPLANLINE_PROJECTList:[]
						};
						this.WORKPLAN.WORLPLANLINEList.unshift(obj);//在列表前新建行unshift，在列表后新建行push
					}).catch((err)=>{
						this.$message({
							message:'网络错误，请重试',
							type:'error'
						})
					})
	            } else {
	                this.$message.warning("请先保存当前编辑项");
				}

				// var obj = {
    //                 WP_NUM:'',
				// 	ITEM_NAME:'',
				// 	MODEL:'',
				// 	V_NAME:'',
				// 	BASIS:'',
				// 	P_NAME:'',
				// 	CHECKCOST:'',
				// 	REASION:'',
				// 	MEMO:'',
				// 	isEditing:true
    //             };
                // this.WORKPLAN.WORLPLANLINE.push(obj);
			},
			addfield2(){//文档编号列表新建行
				var obj2 = {
                    STEP:'',
					CERTIFICATE_NUM:'',
					CERTIFICATE_NAME:'',
					ACTIVE_DATE:'',
					STATUS:'',
					MEMO:''
                };
                // this.WORKPLAN.WORLPLANLINE.push(obj2);
			},
			// addfield3(){
			// 	var obj3 = {
   //                  NUMBER:'',
			// 		S_NUM:'',
			// 		S_NAME:'',
			// 		VERSION:''
   //              };
   //              this.WORKPLAN.WORLPLANLINE_BASISList.push(obj3);
			// },
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
			//点击添加，修改按钮显示弹窗
			visible() {
				//年度计划子表数据置空
				// this.WORKPLAN.WORLPLANLINE = [];
				//将检验检测数据置空
				// this.WORKPLAN.WORLPLANLINE[0].WORLPLANLINE_BASISList = [];
				//将检测项目与要求数据置空
				// this.WORKPLAN.WORLPLANLINE[0].WORLPLANLINE_PROJECTList = [];
				console.log(this.WORKPLAN.WORLPLANLINEList);
				var date = new Date();
				this.WORKPLAN.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
	    			this.WORKPLAN.ENTERBY = res.data.nickname;
	    			
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.modify = false;
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				this.modify = true;

				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
	    			this.WORKPLAN.CHANGEBY = res.data.nickname;
	    			var date = new Date();
					this.WORKPLAN.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});

				this.$axios.get('/api/api-apps/app/workplan/' + dataid, {}).then((res) => {
					console.log(res.data);
					this.WORKPLAN = res.data;
					for(var i = 0;i<this.WORKPLAN.WORLPLANLINEList.length;i++){
						this.inspectionList_child.WORLPLANLINE_BASISList = this.WORKPLAN.WORLPLANLINEList[i].WORLPLANLINE_BASISList;
						this.inspectionList_child.WORLPLANLINE_PROJECTList = this.WORKPLAN.WORLPLANLINEList[i].WORLPLANLINE_PROJECTList;
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
			// 保存users/saveOrUpdate
			submitForm(WORKPLAN) {
				// this.$refs[WORKPLAN].validate((valid) => {
		  //         if (valid) {
		  			this.WORKPLAN.WORLPLANLINEList[0].WORLPLANLINE_BASISList = this.inspectionList_child.WORLPLANLINE_BASISList;
		  			this.WORKPLAN.WORLPLANLINEList[0].WORLPLANLINE_PROJECTList = this.inspectionList_child.WORLPLANLINE_PROJECTList;
		  			// console.log(this.inspectionList_child);
		  			// this.WORKPLAN.WORLPLANLINE.push(this.inspectionList_child);
		  			console.log(this.WORKPLAN);
					var url = '/api/apps-center/app/workplan/saveOrUpdate';
					this.$axios.post(url, this.WORKPLAN).then((res) => {
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
			        //   } else {
			        //     return false;
			        //   }
			        // });
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
				}

				// this.$axios.get('/api/api-apps/app/product', {
				// 	params: data
				// }).then((res) => {
				// 	this.page.totalCount = res.data.count;	
				// 	//总的页数
				// 	let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
				// 	if(this.page.currentPage >= totalPage){
				// 		 this.loadSign = false
				// 	}else{
				// 		this.loadSign=true
				// 	}
				// 	this.commentArr[this.page.currentPage]=res.data.data
				// 	let newarr=[]
				// 	for(var i = 1; i <= totalPage; i++){
					
				// 		if(typeof(this.commentArr[i])!='undefined' && this.commentArr[i].length>0){
							
				// 			for(var j = 0; j < this.commentArr[i].length; j++){
				// 				newarr.push(this.commentArr[i][j])
				// 			}
				// 		}
				// 	}
					
				// 	this.inspectionList = newarr;
				// }).catch((wrong) => {})

				var url = '/api/api-apps/app/inspectionSta';
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
					console.log(this.standardList);
					this.standardList = newarr;
				}).catch((wrong) => {})


				this.$axios.get('/api/api-apps/app/inspectionPro', {
					params: data
				}).then((res) => {
					console.log(res)
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
		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';

	.ml60 {margin-left: 60px;}
</style>



