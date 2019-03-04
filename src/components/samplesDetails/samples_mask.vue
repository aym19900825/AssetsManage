<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加接样</div>
					<div class="mask_title" v-show="modifytitle">修改接样</div>
					<div class="mask_title" v-show="viewtitle">查看接样</div>
					<div class="mask_anniu">
						<span class="mask_span mask_max" @click='toggle'>
							<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						</span>
						<span class="mask_span" @click='close'>
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				
				<!--详情页弹出框 Begin-->
				<div class="mask_content">
					<el-form :model="samplesForm" :label-position="labelPosition" :rules="rules" ref="samplesForm" label-width="110px" status-icon class="demo-form-inline">
						<div class="content-accordion">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="基础信息" name="1">
									<el-row :gutter="20" class="pb10">
										<!--<el-col :span="4" class="pull-right">
											<el-input v-model="samplesForm.STATUS" :disabled="true">
												<template slot="prepend">信息状态</template>
											</el-input>
										</el-col>-->
										<el-col :span="4" class="pull-right">
											<el-input  v-model="samplesForm.STATEDesc" :disabled="true">
												<template slot="prepend">状态</template>
											</el-input>
											<!-- <el-input v-for="(data,index) in Select_STATUS" :key="index" :value="data.code" :label="data.name"></el-input> -->
										</el-col>
										
										<el-col :span="7" class="pull-right">
											<el-input placeholder="自动获取" v-model="samplesForm.ITEMNUM" :disabled="edit">
												<template slot="prepend">样品编号</template>
											</el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="委托书编号" prop="PROXYNUM" label-width="110px">
												<el-input v-model="samplesForm.PROXYNUM" :disabled="edit">
													<el-button slot="append" icon="el-icon-search" @click="getProxy" :disabled="noedit"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托单位编号" prop="VENDOR" label-width="110px">
												<el-input v-model="samplesForm.VENDOR" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托单位名称" prop="V_NAME" label-width="110px">
												<el-input v-model="samplesForm.V_NAME" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										</el-row>
										<el-row>
										<el-col :span="8">
											<el-form-item label="生产单位编号" prop="PRODUCT_COMPANY" label-width="110px">
												<el-input v-model="samplesForm.PRODUCT_COMPANY" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="生产单位名称" prop="P_NAME" label-width="110px">
												<el-input v-model="samplesForm.P_NAME" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品名称" prop="DESCRIPTION" label-width="110px">
												<el-input v-model="samplesForm.DESCRIPTION" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="产品标识代码" prop="PRODUCT_CODE" label-width="110px">
												<el-input v-model="samplesForm.PRODUCT_CODE" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="型号" prop="MODEL" label-width="110px">
												<el-input v-model="samplesForm.MODEL" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品数量" prop="QUATITY" label-width="110px">
												<el-input-number v-model="samplesForm.QUATITY" :min="1" :step="1" :max="200" label="描述文字" style="width: 60%" :disabled="noedit"></el-input-number>
												
												<el-button class="table-funbc" type="success" size="mini" round @click="addfield" v-show="!viewtitle">
													<font>生成列表</font>
												</el-button>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="类别" prop="TYPE" label-width="110px">
												<el-input v-model="samplesForm.TYPE" :disabled="true">
													<el-button slot="append" icon="el-icon-search" @click="getcategory" :disabled="noedit"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="16">
											<el-form-item label="其他资料" prop="OTHER" label-width="110px">
												<el-input v-model="samplesForm.OTHER" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="入库时间" prop="ACCEPTDATE" label-width="110px">
												<div class="block">
												    <el-date-picker
												      v-model="samplesForm.ACCEPTDATE"
												      type="date"
												      placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd" :disabled="noedit">
												    </el-date-picker>
												</div>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="收样人" prop="ACCEPT_PERSON" label-width="110px">
												<el-input v-model="samplesForm.ACCEPT_PERSON" :disabled="true">
													<el-button slot="append" icon="el-icon-search" @click="getReceive" :disabled="noedit"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="收样日期" prop="ACCEPT_DATE" label-width="110px">
												<div class="block">
												    <el-date-picker
												      v-model="samplesForm.ACCEPT_DATE"
												      type="date"
												      placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd" :disabled="noedit">
												    </el-date-picker>
												</div>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="接样人" prop="RECIP_PERSON" label-width="110px">
												<el-input v-model="samplesForm.RECIP_PERSON" :disabled="true">
													<el-button slot="append" icon="el-icon-search" @click="getCatch" :disabled="noedit"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="接样日期" prop="RECIP_DATE" label-width="110px">
												<div class="block">
												    <el-date-picker
												       v-model="samplesForm.RECIP_DATE"
												      type="date"
												      placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd" :disabled="noedit">
												    </el-date-picker>
												</div>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="状态日期" prop="STATUSDATE" label-width="110px">
												<div class="block">
												    <el-date-picker
												        v-model="samplesForm.STATUSDATE"
												      type="date"
												      placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd" :disabled="noedit">
												    </el-date-picker>
												</div>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8" >
											<el-form-item label="承检单位" prop="CJDW"  label-width="110px">
												<el-select clearable v-model="samplesForm.CJDW" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit" @change="adddept">
													<el-option v-for="(data,index) in selectDept" :key="index" :value="data.id" :label="data.fullname"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8" >
											<el-form-item label="产品类别" prop="PRODUCT_TYPE"  label-width="110px">
												<el-input v-model="samplesForm.PRODUCT_TYPE" :disabled="true">
													<el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="addcategory"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="产品名称" prop="PRODUCT" label-width="110px">
												<el-input v-model="samplesForm.PRODUCT" :disabled="true">
													<el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="addproduct"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="24">
											<el-form-item label="备注" prop="MEMO" label-width="110px">
												<el-input type="textarea" rows="5" v-model="samplesForm.MEMO" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="样品" name="2">								
									<!-- <div class="table-func">
										<el-button type="success" size="mini" round @click="addfield" v-show="!viewtitle">
											<i class="icon-add"></i>
											<font>新建行</font>
										</el-button>
									</div> -->
									<el-table :fit="true" max-height="260" :header-cell-style="rowClass" :data="samplesForm.ITEM_LINEList" row-key="ID" border stripe highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'samplesForm.ITEM_LINEList', order: 'descending'}">
									    <el-table-column prop="iconOperation" fixed width="50px" v-if="!viewtitle">
									      <template slot-scope="scope">
									      	<i class="el-icon-check" v-show="scope.row.isEditing">
									      	</i>
									      	<i class="el-icon-edit" v-show="!scope.row.isEditing">
									      	</i>
									      </template>
									    </el-table-column>
		
									    <el-table-column label="样品编号" sortable width="170px" prop="ITEMNUM" >
									      <template slot-scope="scope">
									      	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.ITEMNUM" :disabled="edit" placeholder="自动获取">
									      	</el-input>
									      	<span v-show="!scope.row.isEditing" >{{scope.row.ITEMNUM}}</span>
									      </template>
									    </el-table-column>

									    <el-table-column label="样品序号" sortable width="170px" prop="ITEM_STEP">
									      <template slot-scope="scope">
									      	<el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.ITEM_STEP" :disabled="true"></el-input>
									      	<span v-show="!scope.row.isEditing">{{scope.row.ITEM_STEP}}</span>
									      </template>
									    </el-table-column>

										<el-table-column prop="SN" label="单件码" sortable width="170px" >
									      <template slot-scope="scope">
											  	<!-- <el-form-item  label-width="0px" :prop="'ITEM_LINEList.'+scope.$index + '.SN'" :rules="{required: true, message: '不能为空', trigger: 'blur'}"> -->
													<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.SN" placeholder="请填写">
													</el-input>
													<span v-else="v-else">{{scope.row.SN}}</span>
												<!-- </el-form-item> -->
									      </template>
									    </el-table-column>

										<el-table-column prop="STATEDesc" label="样品状态" sortable width="170px">
									      <template slot-scope="scope">
									        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATEDesc" placeholder="请输入内容" :disabled="true"></el-input>
									      	<span v-else="v-else">{{scope.row.STATEDesc}}</span>
										  </template>
									    </el-table-column>
									    
									   <!--  <el-table-column prop="ENTERBY" label="录入人" sortable width="120px">
									      <template slot-scope="scope">
									        <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.ENTERBY" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.ENTERBY}}</span>
									      </template>
									    </el-table-column> -->
									

									    <el-table-column prop="ENTERDATE" label="录入时间" sortable>
									      <template slot-scope="scope">
									      	<el-form-item  label-width="0px" :prop="'ITEM_LINEList.'+scope.$index + '.ENTERDATE'" >
									         <el-date-picker style="width: 90%" v-show="scope.row.isEditing" v-model="scope.row.ENTERDATE" type="date" :disabled="true" value-format="yyyy-MM-dd"></el-date-picker>
									        <span v-show="!scope.row.isEditing" >{{scope.row.ENTERDATE}}</span>
									    	</el-form-item>
									      </template>
									    </el-table-column>
									  <!--  <el-table-column prop="CHANGEBY" label="修改人" sortable width="120px">
									      <template slot-scope="scope">
									        <el-input v-show="scope.row.isEditing" size="small" v-model="scope.row.CHANGEBY" placeholder="请输入内容"></el-input><span v-show="!scope.row.isEditing">{{scope.row.CHANGEBY}}</span>
									      </template>
									    </el-table-column> -->
									    <!-- <el-table-column fixed="right" label="操作" width="100px" v-if="!viewtitle">
									      <template slot-scope="scope">
									        <el-button @click = "deleteRow(scope.$index, samplesForm.ITEM_LINEList)" type="text" size="small">
									          <i class="icon-trash red"></i>
									        </el-button>
									      </template>
									    </el-table-column> -->
									  </el-table>
									  <!-- </el-form> -->
								</el-collapse-item>
								<el-collapse-item title="其他" name="3" v-show="views">
									<el-row >
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBYDesc" label-width="110px">
												<el-input v-model="samplesForm.ENTERBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENTERDATE" label-width="110px">
												<el-input v-model="samplesForm.ENTERDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="机构" prop="DEPTIDDesc" label-width="110px">
												<el-input v-model="samplesForm.DEPTIDDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="修改人">
												<el-input v-model="samplesForm.CHANGEBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改日期">
												<el-input v-model="samplesForm.CHANGEDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="content-footer" v-show="noviews">
							<el-button type="primary" @click='saveAndUpdate()'>保存</el-button>
							<el-button type="success" v-show="addtitle" @click='saveAndSubmit()'>保存并继续</el-button>
							<!-- <el-button type="primary" v-show="modifytitle" @click='generate()'>生成委托书</el-button> -->
							<el-button @click='close'>取消</el-button>
						</div>
					</el-form>
				</div>
				<!--详情页弹出框 End-->
			</div>

			<!--委托书编号-弹出框 Begin-->
			<el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
				<el-table :data="gridData" height="400px" @selection-change="SelChange">
						<el-table-column type="selection" width="55" fixed >
						</el-table-column>
						<el-table-column label="检验委托书编号" sortable width="140px" prop="PROXYNUM" >
						</el-table-column>
						<el-table-column label="委托单位名称" sortable width="140px" prop="V_NAME">
						</el-table-column>
						<el-table-column label="生产单位名称" sortable width="140px" prop="P_NAME">
						</el-table-column>
						<el-table-column label="样品名称" sortable width="200px" prop="ITEM_NAME">
						</el-table-column>
						<el-table-column label="样品型号" sortable width="150px" prop="ITEM_MODEL">
						</el-table-column>
						<el-table-column label="样品信息状态" sortable width="200px" prop="ITEM_STATUS">
						</el-table-column>
						<el-table-column label="检测依据" width="200px" prop="REMARKS" sortable>
						</el-table-column>
						<el-table-column label="完成日期" width="200px" prop="COMPDATE" sortable :formatter="dateFormat" type="date" >
						</el-table-column>
						<el-table-column label="完成方式" width="200px" prop="COMPMODE" sortable >
						</el-table-column>
						<el-table-column label="检测报告编号" width="200px" prop="REPORT_NUM" sortable >
						</el-table-column>
						<el-table-column label="主检组" width="200px" prop="MAINGROUP" sortable >
						</el-table-column>
							<!--<el-table-column label="信息状态" width="200px" prop="STATUS" sortable v-if="this.checkedName.indexOf('信息状态')!=-1">
							</el-table-column>-->
					</el-table>	
					<el-pagination background class="text-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
					</el-pagination>
				<div slot="footer" class="el-dialog__footer">
	    			<el-button type="primary" @click="dailogconfirm()">确 定</el-button>
	    			<el-button @click="dialogVisible = false">取 消</el-button>
	  			</div>
			</el-dialog>
			<!--委托书编号-弹出框 Begin-->

			<!-- 类别-弹出框 Begin -->
			<el-dialog :modal-append-to-body="false" title="产品类别" height="300px" :visible.sync="dialogVisible3" width="80%" :before-close="handleClose">
				<el-table :header-cell-style="rowClass" :data="categoryList" border stripe height="300px" style="width: 100%;" :default-sort="{prop:'categoryList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
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
				<el-pagination background class="text-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<div slot="footer" class="el-dialog__footer">
			       <el-button type="primary" @click="addproclass">确 定</el-button>
			       <el-button @click="dialogVisible3 = false">取 消</el-button>
			    </div>
			</el-dialog>
			<!-- 类别-弹出框 End -->

			<!-- 收样人、接样人-弹出框 Begin -->
			<el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible4" height="300px" width="80%" :before-close="handleClose">
				<el-table :data="userList" border stripe :header-cell-style="rowClass" height="300px" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
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

				<el-pagination background class="text-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>

				<div slot="footer" class="el-dialog__footer">
			       <el-button type="primary" @click="addPerson">确 定</el-button>
			       <el-button @click="dialogVisible4 = false">取 消</el-button>
			    </div>
			</el-dialog>
			<!-- 收样人、接样人-弹出框 End -->

			<!-- 产品类别-弹出框子组件  -->
			<categorymask ref="categorychild" @categorydata="categorydata"></categorymask>

			<!-- 产品名称-弹出框子组件  -->
			<productmask ref="productchild" @appenddata="appenddata"></productmask>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import categorymask from '../common/common_mask/categorylistmask.vue'//产品类别
	import productmask from '../common/common_mask/productlistmask.vue'//产品
	export default {
		name: 'samples_mask',
		components: {
			categorymask,
			productmask,
		},
		data() {
			// var validateProxynum = (rule, value, callback) => {//委托书编号
   //              if (this.samplesForm.PROXYNUM === undefined || this.samplesForm.PROXYNUM === '' || this.samplesForm.PROXYNUM === null) {
   //                  callback(new Error('必填'));
   //              }else {
   //                  callback();
   //              }
   //          };
			// var validateVendor = (rule, value, callback) => {//委托单位编号
   //              if (this.samplesForm.VENDOR === undefined || this.samplesForm.VENDOR === '' || this.samplesForm.VENDOR === null) {
   //                  callback(new Error('必填'));
   //              }else {
   //                  callback();
   //              }
   //          };
			// var validateVname = (rule, value, callback) => {//委托单位名称
   //              if (this.samplesForm.V_NAME === undefined || this.samplesForm.V_NAME === '' || this.samplesForm.V_NAME === null) {
   //                  callback(new Error('必填'));
   //              }else {
   //                  callback();
   //              }
   //          };
			// var validateProcompany = (rule, value, callback) => {//生产单位编号
   //              if (this.samplesForm.PRODUCT_COMPANY === undefined || this.samplesForm.PRODUCT_COMPANY === '' || this.samplesForm.PRODUCT_COMPANY === null) {
   //                  callback(new Error('必填'));
   //              }else {
   //                  callback();
   //              }
   //          };
			// var validatePname = (rule, value, callback) => {//生产单位名称
   //              if (this.samplesForm.P_NAME === undefined || this.samplesForm.P_NAME === '' || this.samplesForm.P_NAME === null) {
   //                  callback(new Error('必填'));
   //              }else {
   //                  callback();
   //              }
   //          };
			// var validateDescri = (rule, value, callback) => {//样品名称
   //              if (this.samplesForm.DESCRIPTION === undefined || this.samplesForm.DESCRIPTION === '' || this.samplesForm.DESCRIPTION === null) {
   //                  callback(new Error('必填'));
   //              }else {
   //                  callback();
   //              }
   //          };
			// var validateProcode  = (rule, value, callback) => {//产品标识代码
   //              if (this.samplesForm.PRODUCT_CODE === undefined || this.samplesForm.PRODUCT_CODE === '' || this.samplesForm.PRODUCT_CODE === null) {
   //                  callback(new Error('必填'));
   //              }else {
   //                  callback();
   //              }
   //          };
			// var validateType = (rule, value, callback) => {//类别
   //              if (this.samplesForm.TYPE === undefined || this.samplesForm.TYPE === '' || this.samplesForm.TYPE === null) {
   //                  callback(new Error('必填'));
   //              }else {
   //                  callback();
   //              }
   //          };
			return {
				loadSign:true,//加载
				commentArr:{},
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				page: { //分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				selectData: [], //获取检验/检测方法类别
				Select_STATUS:[],//获取样品信息-样品状态-new
				modify:false,//修订、修改人、修改日期
				edit: true, //禁填
				noedit:false,
				selMenu:[],
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				fullHeight: document.documentElement.clientHeight - 210+'px',
				dialogVisible: false, //对话框
				dialogVisible3:false,//产品类别弹出框
				dialogVisible4:false,//接样人、收样人弹出框
				activeNames: ['1', '2','3'], //手风琴数量
				labelPosition: 'right', //表单标题在上方
				addtitle: true,
				modifytitle: false,
				viewtitle: false, //查看弹出框title
				noviews: true, //保存的按钮
				views: false,
				samplesForm:{
					ITEM_LINEList:[]
				},
				categoryList:[],
				userList:[],
				//Tree树菜单数据
				gridData: [], //彈出框的數據
				isEditing: false,
				commentArr:{},//下拉加载
				tips:'1',
				rules: { //定义需要校验数据的名称
					PROXYNUM: [{ required: true, trigger: 'blur', message: '必填'}],//委托书编号
					VENDOR: [{ required: true, trigger: 'blur', message: '必填'}],//委托单位编号
					V_NAME: [{ required: true, trigger: 'blur', message: '必填'}],//委托单位名称
					PRODUCT_COMPANY: [{ required: true, trigger: 'blur', message: '必填'}],//生产单位编号
					P_NAME: [{ required: true, trigger: 'blur', message: '必填'}],//生产单位名称
					DESCRIPTION: [{ required: true, trigger: 'blur', message: '必填'}],//样品名称
					PRODUCT_CODE: [
						{ required: true, trigger: 'blur', message: '必填',},
						{ trigger: 'blur', validator: this.Validators.isWorknumber},
					],//产品标识代码
					SN: [{ required: true, message: '必填', trigger: 'blur' }],
					TYPE: [{ required: true, trigger: 'blur', message: '必填'}],//类别
					QUATITY: [{ required: true, trigger: 'blur', validator: this.Validators.isInteger}],
					ACCEPTDATE: [{required: true, message: '请选择', trigger: 'change' }],
					ACCEPT_DATE: [{required: true, message: '请选择', trigger: 'change' }],
					RECIP_DATE: [{ required: true, message: '请选择', trigger: 'change' }],
					STATUSDATE: [{required: true, message: '请选择', trigger: 'change' }],
					MODEL: [{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey}],//型号
					OTHER: [{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey}],//其它资料
					MEMO: [{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey}],//备注
				},
				selectDept:[],//承检单位
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			//承检单位
			getCompany() {
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.selectDept = res.data;
				});
			},
			//确定承检单位
			adddept(){
				this.samplesForm.P_NUM = '';
				this.samplesForm.PRODUCT_TYPE  = '';
				this.samplesForm.PRODUCT = '';
				this.samplesForm.PRO_NUM = '';
			},
			addcategory(){//产品类别
				if(this.samplesForm.CJDW == null || this.samplesForm.CJDW == '' || this.samplesForm.CJDW == undefined){
					this.$message({
						message: '请先选择承检单位',
						type: 'warning'
					});
				}else{
					this.$refs.categorychild.visible(this.samplesForm.CJDW);
				}
			},
			//接到产品类别的值
			categorydata(value){
				this.samplesForm.P_NUM = value[0];
				this.samplesForm.PRODUCT_TYPE  = value[1];
				this.samplesForm.P_VERSION = value[2];//产品类别版本
				this.samplesForm.PRODUCT = '';
				this.samplesForm.PRO_NUM = '';
			},
			addproduct(){//受检产品名称
				if(this.samplesForm.P_NUM == null || this.samplesForm.P_NUM == '' || this.samplesForm.P_NUM == undefined){
					this.$message({
						message: '请先选择产品类别',
						type: 'warning'
					});
				}else{
					this.$refs.productchild.visible(this.samplesForm.P_NUM);
				}
			},
			//接到产品的值
			appenddata(value){
				console.log(value);
				this.samplesForm.PRO_NUM = value[0];
				this.samplesForm.PRODUCT = value[1];
				this.samplesForm.PRO_VERSION = value[2];//产品版本
			},
			reset(){
            	this.samplesForm = {
					PROXYNUM: '',//委托书编号
					ITEMNUM: '',//样品编号
					VENDOR: '',//委托单位编号
					PRODUCT_COMPANY: '',//生产单位编号
					V_NAME: '',//委托单位名称
					P_NAME: '',//生产单位名称
					DESCRIPTION: '',//样品名称
					PRODUCT_CODE: '',//产品标识代码
					MODEL: '',//型号
					QUATITY: '',//数量
					OTHER: '',//其他资料
					MEMO: '',//备注
					ACCEPTDATE: '',//入库时间
					ACCEPT_PERSON: '',//收样人
					ACCEPT_DATE: '',//收样日期
					RECIP_PERSON: '',//接样人
					RECIP_DATE: '',//接样日期
					STATE: '1',//状态
					STATEDesc: '待检',
					VERSION: '1',//版本
					STATUSDATE: '',//状态日期
					ENTERBY: '',//录入人
					ENTERDATE: '',//录入时间
					CHANGEBY: '',//修改人
					CHANGEDATE: '',//修改时间
					TYPE: '',//样品类别
					CJDW:'',//承检单位
					P_NUM:'',//产品类别编号
					PRODUCT_TYPE:'',//产品类别
					PRO_NUM:'',//产品编号
					PRODUCT:'',//产品
					STATUS: '1',//信息状态
					ITEM_LINEList:[]
				}
            },
			//获取委托书编号数据
			getProxy() {
				var url = this.basic_url + '/api-apps/app/inspectPro';
				this.$axios.get(url, {}).then((res) => {
					// console.log(res.data);
					this.gridData= res.data.data;
				});
				this.dialogVisible = true;
			},
			dailogconfirm(type) { //小弹出框确认按钮事件
				if(this.selval.length == 0){
					this.$message({
						message:'未选择数据',
						type:'warning'
					})
				}else if(this.selval.length == 1){
					this.samplesForm.PROXYNUM=this.selval[0].PROXYNUM;
					this.samplesForm.V_NAME=this.selval[0].V_NAME;
					this.samplesForm.VENDOR=this.selval[0].VENDOR;
					this.samplesForm.PROXYNUM=this.selval[0].PROXYNUM;
					this.samplesForm.P_NAME=this.selval[0].P_NAME;
					this.samplesForm.PRODUCT_COMPANY=this.selval[0].PRODUCT_UNIT;
					this.samplesForm.DESCRIPTION=this.selval[0].ITEM_NAME;
					this.samplesForm.PRODUCT_CODE=this.selval[0].ITEM_ID;//产品标识代码
					this.samplesForm.MODEL=this.selval[0].ITEM_MODEL;
					this.samplesForm.QUATITY=this.selval[0].ITEM_QUALITY;
					this.dialogVisible = false;
				}else if(this.selval.length > 1){
					this.$message({
						message:'不可选择多条数据',
						type:'warning'
					})
				}
			},

			SelChange(val) {
				this.selval = val;
			},
		
			//小弹出框关闭按钮事件
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			
			visible() {//添加内容时从父组件带过来的
				this.samplesForm.ACCEPT_DATE =  '2018-10-10';//收样日期
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.samplesForm.DEPTID = res.data.deptId;
					this.samplesForm.ENTERBY = res.data.id;
					var date=new Date();
					this.samplesForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.reset();
				this.addtitle = true;
				this.modifytitle = false;
				this.viewtitle = false;
				this.noviews = true;
            	this.modify=false;
				this.show = true;
				this.views = false;
            	this.edit = true;
				this.noedit = false;
			},
			detail(dataid) { //修改内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.samplesForm.DEPTID = res.data.deptId;//传给后台机构id
					this.samplesForm.CHANGEBY = res.data.id;
					var date=new Date();
					this.samplesForm.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.$axios.get(this.basic_url + '/api-apps/app/item/' + dataid, {}).then((res) => {
					console.log(res.data);
					for(var i=0;i<res.data.ITEM_LINEList.length;i++){
						res.data.ITEM_LINEList[i].isEditing = false;
					}
					res.data.CJDW = Number(res.data.CJDW);
					this.samplesForm = res.data;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.viewtitle = false;
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.views = false;
				this.noviews = true;
				this.show = true;
				this.edit = true;
				this.noedit = false;
			},
			//这是查看
			view(dataid) {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.views = true; 
				this.noviews = false;
				this.edit = true;
				this.noedit = true;
				var url = this.basic_url + '/api-apps/app/item/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					this.samplesForm = res.data;
					if(this.samplesForm.STATE == '1'){
						this.samplesForm.STATE == '待检';
					}else if(this.samplesForm.STATE == '2'){
						this.samplesForm.STATE == '在检';
					}else if(this.samplesForm.STATE == '3'){
						this.samplesForm.STATE == '已检';
					}else{
						this.samplesForm.STATE == '留存';
					}
					this.show = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			iconOperation(row, column, cell, event){//切换Table-操作列中的修改、保存
				if(column.property ==="iconOperation"){
					row.isEditing = !row.isEditing
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
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			//检验/检测方法类别
			getType() {
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=type';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},
			//
			getcategory(){
				this.dialogVisible3 = true;				
			},
			//收样人
			getReceive(){
				this.tips = '1';
				this.$emit('request');
				this.dialogVisible4 = true;
			},
			//接样人
			getCatch(){
				this.tips = '2';
				this.$emit('request');
				this.dialogVisible4 = true;
			},
			addPerson(){
				if(this.selval.length == 0){
					this.$message({
						message: '未选择数据',
						type: 'warning'
					});
				}else if(this.selval.length > 1){
					this.$message({
						message: '不可选择多条数据',
						type: 'warning'
					});
				}else{
					if (this.tips == '1') {
						this.samplesForm.ACCEPT_PERSON = this.selval[0].username; //收样人
						this.dialogVisible4 = false;
						this.$emit('request');
					}else if(this.tips == '2'){
						this.samplesForm.RECIP_PERSON = this.selval[0].username;//接样人
						this.dialogVisible4 = false;
						this.$emit('request');
					}
				}
			},
			addproclass(){
				if(this.selval.length == 0){
					this.$message({
						message: '未选择数据',
						type: 'warning'
					});
				}else if(this.selval.length > 1){
					this.$message({
						message: '不可选择多条数据',
						type: 'warning'
					});
				}else{
					this.samplesForm.TYPE = this.selval[0].TYPE;
					this.dialogVisible3 = false;
					this.$emit('request');
				}
			},
			SelChange(val) {
				this.selval = val;
			},
			addfield() { 
				//插入行到文件文件Table中
				console.log(this.samplesForm.QUATITY);
				this.samplesForm.ITEM_LINEList = [];
				var date=new Date();
				var time = this.$moment(date).format("YYYY-MM-DD");
				for(var i = 0;i<this.samplesForm.QUATITY;i++){
					var obj = {
						ITEMNUM:'',
						ITEM_STEP:i+1,
						SN:'',
						STATE:'1',
						STATEDesc:'待检',
						ENTERBY:'',
						ENTERDATE:time,
						CHANGEBY:'',
						isEditing: true
					};
					this.samplesForm.ITEM_LINEList.push(obj);
				}
			},

			// deleteRow(index, rows) {//Table-操作列中的删除行
			// 	rows.splice(index, 11);
			// },
			
			//点击关闭按钮
			close() {
				this.show = false;
				this.dialogVisible3 = false;
				this.dialogVisible4 = false;
				this.$emit('request');
			},
			// cancelForm() {
			// 	this.show = false;
			// 	this.reset();
			// },
			// reset() {
			// 	this.show = false;
			// },
			
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
			//点击提交按钮执行保存
			save() {
				this.$refs.samplesForm.validate((valid) => {
					if (valid) {
						if(this.samplesForm.ITEM_LINEList.length<=0){
			        		this.$message({
								message: '样品表格是必填项，请填写！',
								type: 'warning'
							});
							return false;
			        	}else{
							var url = this.basic_url + '/api-apps/app/item/saveOrUpdate';
							this.$axios.post(url, this.samplesForm).then((res) => {
								if(res.data.resp_code == 0) {
									this.$message({
										message: '保存成功',
										type: 'success'
									});
									//重新加载数据
									this.$emit('request');
								}
							}).catch((err) => {
								this.$message({
									message: '网络错误，请重试',
									type: 'error'
								});
							});
							this.falg = true;
						}
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
			saveAndUpdate(){
				this.save();
				if(this.falg){
					this.show = false;
				}
				this.$emit('request');
			},
			//保存并继续
			saveAndSubmit(){
				this.save();
				this.reset();
				this.$emit('request');
			},
			//生成委托书
			generate(){
				console.log(this.samplesForm);
				var dataid = this.samplesForm.ID;
				var url =this.basic_url + '/api-apps/app/item/operate/isExcProxy?ID=' +dataid;
				this.$axios.get(url,{}).then((res) => {
					console.log(res);
						if(res.data.resp_code == 0) {
							this.$message({
								message:res.data.resp_msg,
								type: 'success'
							});
						var url =this.basic_url + '/api-apps/app/item/operate/createInspectProxy?ID='+dataid;
						this.$axios.get(url, {}).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message:res.data.resp_msg,
									type: 'success'
								});
							}
						}).catch((err) => {
							this.$message({
								message: res.data.resp_msg,
								type: 'error'
							});
						});
						
						}else{
							this.$message({
								message: res.data.resp_msg,
								type: 'error'
							});
						}
					}).catch((err) => {
						this.$message({
							message: res.data.resp_msg,
							type: 'error'
						});
					});
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
			requestData(index) {//高级查询字段
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				};
				this.$axios.get(this.basic_url + '/api-apps/app/productType', {
					params: data
				}).then((res) => {
					// console.log(res.data);
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
				var url = this.basic_url + '/api-user/users';
				this.$axios.get(url, {
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
			getITEM_STATUS() {//获取样品状态
				var url =  this.basic_url + '/api-user/dicts/findChildsByCode?code=ITEM_STATUS';
				this.$axios.get(url, {}).then((res) => {
					console.log(res)
					// this.Select_STATUS = res.data;
				}).catch(error => {
					console.log('请求失败');
				})
			},
			handleClose(done) { //大弹出框确定关闭按钮
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		},
		mounted() {
			this.getType();
			this.requestData();
			this.getITEM_STATUS();
			this.getCompany();
		},
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
	.table-funbc {
		position: absolute;
		top: 3px;
		right: 2px;
	}
</style>