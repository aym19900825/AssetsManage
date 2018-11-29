<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加检验委托书</div>
				<div class="mask_title" v-show="modifytitle">修改检验委托书</div>
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

				<el-form :model="dataInfo" :label-position="labelPosition" :rules="rules" ref="dataInfo" label-width="100px" class="demo-user">
					<div class="accordion" id="information">
						<el-collapse v-model="activeNames" @change="handleChange">
							<el-collapse-item title="委托单位" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="3" class="pull-right">
										<el-input v-model="dataInfo.STATE" :disabled="true">
											<template slot="prepend">状态</template>
										</el-input>
									</el-col>
									<el-col :span="3" class="pull-right">
										<el-input v-model="dataInfo.PROXYNUM" :disabled="true">
											<template slot="prepend">编号</template>
										</el-input>
									</el-col>

								</el-row>
								<div class="accordion-body tab-content">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="名称" prop="V_NAME">
												<el-input v-model="dataInfo.V_NAME">
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="地址" prop="V_ADDRESS">
												<el-input v-model="dataInfo.V_ADDRESS"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="邮编" prop="V_ZIPCODE">
												<el-input v-model="dataInfo.V_ZIPCODE"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="联系人姓名" prop="V_PERSON">
												<el-input v-model="dataInfo.V_PERSON" :disabled="false">
													<el-button slot="append" icon="el-icon-search" @click="getPeople()"></el-button>
												</el-input>

											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="联系人电话" prop="V_PHONE">
												<el-input v-model="dataInfo.V_PHONE"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="责任单位" prop="R_VENDOR">
												<el-input v-model="dataInfo.R_VENDOR"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="版本" prop="VERSION">
												<el-input v-model="dataInfo.VERSION"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托单位编号" prop="VENDOR">
												<el-input v-model="dataInfo.VENDOR"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="生产单位" name="2">
								<div class="accordion-body tab-content">
									<el-form-item label="生产单位名称" prop="P_NAME">
										<el-input v-model="dataInfo.P_NAME" :disabled="false">
											<el-button slot="append" icon="el-icon-search" @click=""></el-button>
										</el-input>

									</el-form-item>
								</div>
							</el-collapse-item>
							<el-collapse-item title="样品" name="3">
								<div class="accordion-body tab-content">

									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="名称" prop="ITEM_NAME">
												<el-input v-model="dataInfo.ITEM_NAME" :disabled="false">
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="标识" prop="ITEM_ID">
												<el-input v-model="dataInfo.ITEM_ID"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="型号" prop="ITEM_MODEL">
												<el-input v-model="dataInfo.ITEM_MODEL"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="数量" prop="ITEM_QUALITY">
												<el-input v-model="dataInfo.ITEM_QUALITY">
												</el-input>

											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品状态" prop="ITEM_STATUS">
												<el-input v-model="dataInfo.ITEM_STATUS"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="保密要求" prop="ITEM_SECRECY">
												<el-input v-model="dataInfo.ITEM_SECRECY"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="取样方式" prop="ITEM_METHOD">
												<el-radio-group v-model="dataInfo.ITEM_METHOD">
													<el-radio label="委托方送样"></el-radio>
													<el-radio label="抽样"></el-radio>
													<el-radio label="其他"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="10">
											<el-form-item label="检后处理" prop="ITEM_DISPOSITION">
												<el-radio-group v-model="dataInfo.ITEM_DISPOSITION">
													<el-radio label="自提"></el-radio>
													<el-radio label="邮寄"></el-radio>
													<el-radio label="报废"></el-radio>
													<el-radio label="本中心处理"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="检验" name="4">
								<div class="accordion-body tab-content">
									<el-form-item label="抽样方案/判定依据" prop="REMARKS">
										<el-input v-model="dataInfo.REMARKS"></el-input>
									</el-form-item>
								</div>
							</el-collapse-item>

							<el-collapse-item title="检验依据" name="5">
								<!-- 资质信息 Begin-->
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfieldBasis">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>

								<el-table :data="dataInfo.inspectProBasList" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.inspectProBasList', order: 'descending'}">

									<el-table-column prop="iconOperation" fixed label="" width="50px">
										<template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
									</el-table-column>

									<el-table-column prop="P_NUM" label="检验项目编号" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_NUM" placeholder="请输入委托方名称"></el-input><span v-else="v-else">{{scope.row.P_NUM}}</span>
										</template>
									</el-table-column>

									<el-table-column prop="P_DESC" label="检验项目描述" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_DESC" placeholder="请输入委托方名称"></el-input><span v-else="v-else">{{scope.row.P_DESC}}</span>
										</template>
									</el-table-column>

									<el-table-column prop="REMARKS" label="内容" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REMARKS" placeholder="请输入要求"></el-input><span v-else="v-else">{{scope.row.REMARKS}}</span>
										</template>
									</el-table-column>

									<el-table-column prop="STATUS" label="信息状态" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入要求"></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
										</template>
									</el-table-column>

									<el-table-column prop="VERSION" label="项目版本" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入分包方名称"></el-input><span v-else="v-else">{{scope.row.VERSION}}</span>
										</template>
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="120">
										<template slot-scope="scope">
											<el-button @click.native.prevent="deleteRow(scope.$index,dataInfo.inspectProBasList)" type="text" size="small">
												移除
											</el-button>
										</template>
									</el-table-column>

								</el-table>
							</el-collapse-item>

							<el-collapse-item title="检验项目与要求" name="6">
								<!-- 资质信息 Begin-->
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfieldProject">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>

								<el-table :data="dataInfo.inspectProProList" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.inspectProPro', order: 'descending'}">

									<el-table-column prop="iconOperation" fixed label="" width="50px">
										<template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
									</el-table-column>

									<el-table-column prop="S_NUM" label="标准编号" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.S_NUM" placeholder="请输入委托方名称"></el-input><span v-else="v-else">{{scope.row.S_NUM}}</span>
										</template>
									</el-table-column>

									<el-table-column prop="S_DESC" label="标准内容" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.S_DESC" placeholder="请输入委托方名称"></el-input><span v-else="v-else">{{scope.row.S_DESC}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="STATUS" label="信息状态" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入要求"></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="VERSION" label="版本" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION" placeholder="请输入分包方名称"></el-input><span v-else="v-else">{{scope.row.VERSION}}</span>
										</template>
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="120">
										<template slot-scope="scope">
											<el-button @click.native.prevent="deleteRow(scope.$index,dataInfo.inspectProProList)" type="text" size="small">
												移除
											</el-button>
										</template>
									</el-table-column>

								</el-table>
							</el-collapse-item>

							<el-collapse-item title="分包要求" name="7">
								<!-- 资质信息 Begin-->
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addcheckProCont">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>

								<el-table :data="dataInfo.addcheckProContList" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'dataInfo.addcheckProContList', order: 'descending'}">

									<el-table-column prop="iconOperation" fixed label="" width="50px">
										<template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
									</el-table-column>

									<el-table-column prop="PROXY_CONTRACT_NUM" label="分包协议编号" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXY_CONTRACT_NUM" placeholder=""></el-input><span v-else="v-else">{{scope.row.PROXY_CONTRACT_NUM}}</span>
										</template>
									</el-table-column>

									<el-table-column prop="PROXYNUM" label="委托书编号" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PROXYNUM" placeholder="请输入委托方名称"></el-input><span v-else="v-else">{{scope.row.PROXYNUM}}</span>
										</template>
									</el-table-column>

									<el-table-column prop="VENDOR" label="分包方名称" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VENDOR" placeholder="请输入分包方名称"></el-input><span v-else="v-else">{{scope.row.VENDOR}}</span>
										</template>
									</el-table-column>

									<el-table-column prop="P_REMARKS" label="检验检测项目内容" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.P_REMARKS" placeholder="请输入"></el-input><span v-else="v-else">{{scope.row.P_REMARKS}}</span>
										</template>
									</el-table-column>

									<el-table-column prop="BASIS" label="检验检测技术依据" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.BASIS" placeholder="请输入"></el-input><span v-else="v-else">{{scope.row.BASIS}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="REQUIRE" label="对环境和操作人员要求" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REQUIRE" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.REQUIRE}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="Q_TYPE" label="对分包报告/证书的要求" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.Q_TYPE" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.Q_TYPE}}</span>
										</template>
									</el-table-column>
					
									<el-table-column prop="CHECKCOST" label="检验检测费用" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHECKCOST" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.CHECKCOST}}</span>
										</template>
									</el-table-column>
											<el-table-column prop="STATUS" label="信息状态" sortable width="120px">
										<template slot-scope="scope">
											<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入要求"></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
										</template>
									</el-table-column>
									

									<el-table-column fixed="right" label="操作" width="120">
										<template slot-scope="scope">
											<el-button @click.native.prevent="deleteRow(scope.$index,dataInfo.addcheckProContList)" type="text" size="small">
												移除
											</el-button>
										</template>
									</el-table-column>

								</el-table>

								<!-- 年度计划列表 End -->
							</el-collapse-item>

							<el-collapse-item name="8">
								<div class="accordion-body tab-content">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="完成日期" prop="COMPDATE">
												<el-date-picker v-model="dataInfo.COMPDATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="完成方式" prop="COMPMODE">
												<el-radio-group v-model="dataInfo.COMPMODE">
													<el-radio label="加急"></el-radio>
													<el-radio label="正常"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="编号" prop="REPORT_NUM">
												<el-input v-model="dataInfo.REPORT_NUM"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="交委托方分数" prop="REPORT_QUALITY">
												<el-input v-model="dataInfo.REPORT_QUALITY"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="发送方式" prop="REPORT_MODE">
												<el-radio-group v-model="dataInfo.REPORT_MODE">
													<el-radio label="自提"></el-radio>
													<el-radio label="邮寄"></el-radio>
													<el-radio label="其他"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="格式" prop="REPORT_FOMAT">
												<el-radio-group v-model="dataInfo.REPORT_FOMAT">
													<el-radio label="认证中心"></el-radio>
													<el-radio label="国家中心"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="检验收费" prop="CHECK_COST">
												<el-input v-model="dataInfo.CHECK_COST"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="合同费用" prop="CONTRACTCOST">
												<el-input v-model="dataInfo.CONTRACTCOST"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="实收费用" prop="ACTUALCOST">
												<el-input v-model="dataInfo.ACTUALCOST"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="实收比例" prop="ACTUAL_PERCENT">
												<el-input v-model="dataInfo.ACTUAL_PERCENT"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="付款方式" prop="PAYMENT_METHOD">
												<el-select v-model="dataInfo.PAYMENT_METHOD" placeholder="请选择">
													<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="信息状态" prop="MESSSTATUS">
													<el-input v-model="dataInfo.MESSSTATUS"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="标识" prop="CNAS_OR_CMA_ID">
												<el-radio-group v-model="dataInfo.CNAS_OR_CMA_ID">
													<el-radio label="CNAS"></el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="主检组" prop="MAINGROUP">
												<el-select v-model="dataInfo.MAINGROUP" placeholder="请选择">
													<el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="主检负责人" prop="LEADER">
													<el-input v-model="dataInfo.LEADER"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="生产单位编号" prop="PRODUCT_UNIT">
												<el-input v-model="dataInfo.PRODUCT_UNIT"></el-input>
											</el-form-item>
										</el-col>
				
									</el-row>
									<el-row :gutter="70">
										<el-col :span="24">
											<el-form-item label="备注" prop="MEMO">
												<el-input type="textarea" v-model="dataInfo.MEMO"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</el-collapse-item>
							<el-collapse-item title="其他" name="9">
								<div class="accordion-body tab-content">
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBY">
												<el-input v-model="dataInfo.ENTERBY" :disabled="false"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENTERDATE">
												<el-input v-model="dataInfo.ENTERDATE" :disabled="false"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入人机构" prop="ORGID">
												<el-input v-model="dataInfo.ORGID" :disabled="false"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="70">
										<el-col :span="8">
											<el-form-item label="修改人" v-if="modify" prop="CHANGEBY">
												<el-input v-model="dataInfo.CHANGEBY" :disabled="false"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" v-if="modify" prop="CHANGEDATE">
												<el-input v-model="dataInfo.CHANGEDATE" :disabled="false"></el-input>
											</el-form-item>
										</el-col>

									</el-row>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click="submitForm('dataInfo')">提交</el-button>
					</div>
				</el-form>
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
			<span slot="footer" class="dialog-footer">
    			<el-button @click="dialogVisible = false">取 消</el-button>
    			<el-button type="primary" @click="dailogconfirm()">确 定</el-button>
  			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'masks',
		//		props: {
		//			dataInfo: {
		//				type: Object,
		//				default: function(){
		//					return {
		//					N_CODE: '',
		//					TYPE: '',
		//					XD_DATE: '',
		//					ITEM_NAME: '',
		//					ITEM_MODEL: '',
		//					VENDOR: '',
		//					CJDW: '',
		//					TASKNUM: '',
		//					SOLUTION: '',
		//					COMPDATE:'',
		//					STATUS: '',
		//					ENTERBY: '',
		//					}
		//				}
		//			},
		//			page: Object ,
		//		},
		data() {
			var validateName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请英文填写表名'));
				} else {
					callback();
				}
			};
			var validateDecri = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写描述'));
				} else {
					callback();
				}
			};
			return {
				dataInfo: {
					PROXYNUM: '1',
					STATE: '草稿',
					inspectProProList: [],
					inspectProBasList: [],
					addcheckProContList: [],
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
				selUser: [],
				//				disabled: true, //禁填
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
				modify: false,
				activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], //手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框

				rules: {
					name: [{
						required: true,
						trigger: 'blur',
						validator: validateName,
					}],
					description: [{
						required: true,
						trigger: 'blur',
						validator: validateDecri,
					}],
					leadname: [{
						required: true,
						trigger: 'blur',
						validator: validateDecri,
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
			};
		},
		methods: {
			//			resetNew() {
			//				this.dataInfo = { //数据库列表
			//						name: '',
			//						description: '',
			//						attributes: [{ //字段列表
			//							columnname: '',
			//							description: '',
			//							type: '',
			//							length: '',
			//							retain: ''
			//						}]
			//					},
			//
			//					this.$refs["dataInfo"].resetFields();
			//			},
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					console.log(row.isEditing);
					row.isEditing = !row.isEditing;
					console.log(row.isEditing);
				}
			},
			handleChange(val) { //手风琴开关效果调用
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
					S_NUM: '',
					S_DESC: '',
					VERSION: '',
					STATUS: '',
					isEditing: true
				};
				this.dataInfo.inspectProBasList.push(obj);
			},
			addfieldProject() {
				var obj = {
					P_NUM: '',
					P_DESC: '',
					REMARKS: '',
					VERSION: '',
					STATUS: '',
					isEditing: true
				};
				this.dataInfo.inspectProProList.push(obj);
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
					STATUS:'',
					isEditing: true
				};
				this.dataInfo.addcheckProContList.push(obj);
			},

			//刪除新建行
			deleteRow(index,rows) {//Table-操作列中的删除行
				rows.splice(index,1);

			},

			importdia() {
				this.dialogVisible = true;
			},
			//点击按钮显示弹窗
			visible() {
				//分包人数据置空
				//				this.datatinfo.checkProCont = [];
				this.$axios.get('/api/api-user/users/currentMap', {}).then((res) => {
					this.dataInfo.DEPT = res.data.deptName;
					this.dataInfo.ENTERBY = res.data.nickname;
					this.dataInfo.ORGID = res.data.deptName
					var date = new Date();
					this.dataInfo.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					})
				})
				this.statusshow1 = true;
				this.statusshow2 = false;
				this.addtitle = true;
				this.modifytitle = false;
				this.modify = false;
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				
				this.addtitle = false;
				this.modifytitle = true;
				this.statusshow1 = false;
				this.statusshow2 = true;
				this.modify = true;
				var usersUrl = '/api/api-user/users/currentMap'
				this.$axios.get(usersUrl, {}).then((res) => {
					this.dataInfo.CHANGEBY = res.data.nickname;
					var date = new Date();
					this.dataInfo.CHANGEDATE = this.$moment(date).format("yyyy-MM-dd hh:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				
				var url = '/api/api-apps/app/inspectPro/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					this.dataInfo = res.data;
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
			submitForm(dataInfo) {
				this.$refs[dataInfo].validate((valid) => {
					//		          if (valid) {
					var url = '/api/api-apps/app/inspectPro/saveOrUpdate';
					console.log(this.dataInfo);
					this.$axios.post(url, this.dataInfo).then((res) => {
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
					//			          } else {
					//			            return false;
					//			          }
				});
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
				var url = '/api/api-user/users';
				this.$axios.get(url, {
					params: params
				}).then((res) => {
					this.page.totalCount = res.data.count;
					this.gridData = res.data.data;
					this.dialogVisible = true;
					this.type = type;
				});
			},
			dailogconfirm(type) { //小弹出框确认按钮事件
				this.dialogVisible = false;
				if(this.type == '1') {
					this.dataInfo.P_LEADER = this.selUser[0].id;
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

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>