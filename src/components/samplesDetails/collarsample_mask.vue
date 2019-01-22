<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加领样</div>
					<div class="mask_title" v-show="modifytitle">修改领样</div>
					<div class="mask_title" v-show="viewtitle">查看领样</div>
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
					<el-form :model="samplesForm" :label-position="labelPosition" :rules="rules" ref="samplesForm" label-width="100px" status-icon inline-message>
						<div class="accordion">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="基础信息" name="1">
									<el-row :gutter="20" class="pb10">
										<!--<el-col :span="4" class="pull-right">
											<el-input v-model="samplesForm.STATUS" :disabled="true">
												<template slot="prepend">信息状态</template>
											</el-input>
										</el-col>-->
										<el-col :span="4" class="pull-right">
											<el-input v-model="samplesForm.STATE" :disabled="true">
												<template slot="prepend">状态</template>
											</el-input>
										</el-col>
										<el-col :span="6" class="pull-right">
											<el-input v-model="samplesForm.ITEM_STEP" :disabled="true">
												<template slot="prepend">样品序号</template>
												<el-button slot="append" icon="el-icon-search" @click="addsamplenum" :disabled="noedit"></el-button>
											</el-input>
										</el-col>
									</el-row>

									<el-row >
										<!-- <el-col :span="8">
											<el-form-item label="样品子表ID" prop="ITEM_LINE_ID">
												<el-input v-model="samplesForm.ITEM_LINE_ID" :disabled="true">
													<el-button slot="append" icon="el-icon-search" @click="getProxy"></el-button>
												</el-input>
											</el-form-item>
										</el-col> -->
										<el-col :span="8">
											<el-form-item label="样品编号" prop="ITEMNUM">
												<el-input v-model="samplesForm.ITEMNUM" :disabled="true">
													<el-button slot="append" icon="el-icon-search" @click="getsample" :disabled="noedit"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="样品名称" prop="DESCRIPTION">
												<el-input v-model="samplesForm.DESCRIPTION" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="类别" prop="TYPE">
												<!-- <el-select v-model="samplesForm.TYPE" placeholder="请选择类别" style="width: 100%;" :disabled="noedit">
													<el-option v-for="(data,index) in selectData" :key="index" :value="data.code" :label="data.name"></el-option>
												</el-select> -->
												<el-input v-model="samplesForm.TYPE" :disabled="true">
													<el-button slot="append" icon="el-icon-search" @click="addprobtn" :disabled="noedit"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="型号" prop="MODEL">
												<el-input v-model="samplesForm.MODEL" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="数量" prop="QUALITY">
												<el-input-number v-model="samplesForm.QUALITY" :min="1" :step="5" :max="100" label="描述文字" style="width: 100%" :disabled="noedit"></el-input-number >
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="状态日期" prop="STATUSDATE">
												<el-input v-model="samplesForm.STATUSDATE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="收样人" prop="ACCEPT_PERSON">
												<el-input v-model="samplesForm.ACCEPT_PERSON" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="收样日期" prop="ACCEPT_DATE">
												<el-date-picker v-model="samplesForm.ACCEPT_DATE" type="date" :disabled="noedit"placeholder="请选择收样日期" value-format="yyyy-MM-dd" style="width: 100%;">
												</el-date-picker>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="领样人" prop="GRANT_PERSON">
												<el-input v-model="samplesForm.GRANT_PERSON" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="领样日期" prop="GRANT_DATE">
												<el-date-picker v-model="samplesForm.GRANT_DATE" type="date" placeholder="请选择领样日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
												</el-date-picker>
											</el-form-item>
										</el-col>
										
									</el-row>

									<el-row>
										<el-col :span="24">
											<el-form-item label="其他资料" prop="OTHER">
												<el-input v-model="samplesForm.OTHER" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="24">
											<el-form-item label="备注" prop="MEMO">
												<el-input type="textarea" rows="5" v-model="samplesForm.MEMO":disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

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
											<el-form-item label="录入人机构" prop="DEPTIDDesc" label-width="110px">
												<el-input v-model="samplesForm.DEPTIDDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBYDesc">
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
						<div class="content-footer" v-if="!viewtitle">
							<el-button type="primary" @click="saveAndUpdate('samplesForm')" >保存</el-button>
							<el-button type="success" @click="saveAndSubmit('samplesForm')">保存并继续</el-button>
							<el-button @click="close">取消</el-button> 
						</div>
					</el-form>
				</div>
			</div>
			<!--点击委托书编号弹出框 Begin-->
			<el-dialog :modal-append-to-body="false" title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @check-change="handleCheckChange">
				</el-tree>
				<span slot="footer" class="dialog-footer">
			       <el-button @click="dialogVisible = false">取 消</el-button>
			       <el-button type="primary" @click="dailogconfirm();" >确 定</el-button>
			    </span>
			</el-dialog>
			<!--点击委托书编号弹出框 Begin-->
			<!-- 样品编号 Begin -->
			<el-dialog :modal-append-to-body="false" title="样品编号" height="300px" :visible.sync="dialogsample" width="80%" :before-close="handleClose">
				<!-- 第二层弹出的表格 Begin-->
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
					<el-table-column label="样品状态" sortable width="100px" prop="STATE">
					</el-table-column>
					<!--<el-table-column label="信息状态" sortable width="140px" prop="STATUS" v-if="this.checkedName.indexOf('信息状态')!=-1">
					</el-table-column>-->
				</el-table>
				<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<!-- 表格 End-->
				<span slot="footer" class="dialog-footer">
			       <el-button @click="dialogsample = false">取 消</el-button>
			       <el-button type="primary" @click="addsamplebtn">确 定</el-button>
			    </span>
			</el-dialog>
			<!-- 样品编号 End -->

			<!-- 样品序号 Begin -->
			<el-dialog :modal-append-to-body="false" title="样品序号" height="300px" :visible.sync="dialogsamplenum" width="80%" :before-close="handleClose">
				<!-- 第二层弹出的表格 Begin-->
				<el-table :data="samplenumList" :header-cell-style="rowClass" border stripe height="400px" style="width: 100%;" :default-sort="{prop:'samplesList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
					<el-table-column type="selection" width="55" fixed align="center">
					</el-table-column>
					<el-table-column label="样品编号" sortable width="200px" prop="ITEMNUM">
					</el-table-column>
					<el-table-column label="样品序号" sortable width="200px" prop="ITEM_STEP">
					</el-table-column>
					<el-table-column label="单件码" sortable width="200px" prop="SN">
					</el-table-column>
					<el-table-column label="样品状态" sortable width="200px" prop="STATE">
					</el-table-column>
					<el-table-column label="录入时间" sortable width="140px" :formatter="dateFormat" prop="ENTERDATE">
					</el-table-column>
					<el-table-column label="修改时间" sortable width="100px" prop="CHANGEDATE">
					</el-table-column>
					<!--<el-table-column label="信息状态" sortable width="140px" prop="STATUS" v-if="this.checkedName.indexOf('信息状态')!=-1">
					</el-table-column>-->
				</el-table>
				<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<!-- 表格 End-->
				<span slot="footer" class="dialog-footer">
			       <el-button @click="dialogsamplenum = false">取 消</el-button>
			       <el-button type="primary" @click="addsamplenumbtn">确 定</el-button>
			    </span>
			</el-dialog>
			<!-- 样品序号 End -->

			<!-- 产品类别 Begin -->
			<el-dialog :modal-append-to-body="false" title="产品类别" height="300px" :visible.sync="dialogVisible3" width="80%" :before-close="handleClose">
				<!-- 第二层弹出的表格 Begin-->
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
				<el-pagination background class="pull-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40,100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<!-- 表格 End-->
				<span slot="footer" class="dialog-footer">
			       <el-button @click="dialogVisible3 = false">取 消</el-button>
			       <el-button type="primary" @click="addproclass">确 定</el-button>
			    </span>
			</el-dialog>
			<!-- 产品类别 End -->
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'collarsample_mask',
		props: {
			page: {
				type: Object,
			},
			samplesForm: { //接收主表单中填写的数据信息
				type: Object,
				default: function() {
					return {
						ITEMNUM: '',//样品子表ID
						ITEM_STEP: '',//样品序号
						TYPE: '',//样品类别
						VENDOR: '',//样品编号编号
						DESCRIPTION: '',//样品名称
						MODEL: '',//型号
						QUATITY: '',//数量
						PRODUCT_CODE: '',//产品标识代码
						OTHER: '',//其他资料
						MEMO: '',//备注
						ACCEPTDATE: '',//入库时间
						ACCEPT_PERSON: '',//收样人
						ACCEPT_DATE: '',//收样日期
						GRANT_PERSON: '',//领样人
						GRANT_DATE: '',//领样日期
						STATE: '1',//状态
						STATUSDATE: '',//状态日期
						ENTERBY: '',//录入人
						ENTERDATE: '',//录入时间
						CHANGEBY: '',//修改人
						CHANGEDATE: '',//修改时间
						STATUS: '1',//信息状态
					}
				}
			}
		},
		data() {
			var validateItemid = (rule, value, callback) => {//样品编号
                if (this.samplesForm.ITEMNUM === undefined || this.samplesForm.ITEMNUM === '' || this.samplesForm.ITEMNUM === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateDescri = (rule, value, callback) => {//样品名称
                if (this.samplesForm.DESCRIPTION === undefined || this.samplesForm.DESCRIPTION === '' || this.samplesForm.DESCRIPTION === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			var validateType = (rule, value, callback) => {//类别
                if (this.samplesForm.TYPE === undefined || this.samplesForm.TYPE === '' || this.samplesForm.TYPE === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			return {
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
				selectData: [], //获取检验/检测方法类别
				modify:false,//修订、修改人、修改日期
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				selMenu:[],
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				dialogVisible: false, //对话框
				edit: true, //禁填
				activeNames: ['1','2'], //手风琴数量
				labelPosition: 'right', //表单标题在上方
				addtitle: true,
				modifytitle: false,
				viewtitle: false, //查看弹出框title
				views:false,
				samples_itemlineForm:{//样品子表数据组
					inspectionList: []
				},
				//Tree树菜单数据
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "children",
					label: "fullname"
				},
				getCheckboxData: {},
				isEditing: '',
				commentArr:{},//下拉加载
				rules: { //定义需要校验数据的名称
					ITEMNUM: [//样品编号
						{ required: true,validator: validateItemid}
					],
					DESCRIPTION: [//样品名称
						{ required: true,validator: validateDescri}
					],
					TYPE: [//类别
						{ required: true,validator: validateType}
					],
					MODEL: [
						{ required: true, message: '型号不能为空', trigger: 'blur' }
					],
					QUALITY: [
						{ required: true, message: '请填写数量', trigger: 'blur' }
					],
					ACCEPT_PERSON: [
						{ required: true, message: '请填写收样人', trigger: 'blur' }
					],
					ACCEPT_DATE: [
						{ required: true, message: '收样日期不能为空', trigger: 'blur' }
					],
					GRANT_PERSON: [
						{ required: true, message: '领样人不能为空', trigger: 'blur' }
					],
					GRANT_DATE: [
						{ required: true, message: '领样日期不能为空', trigger: 'blur' }
					],
				},
				dialogVisible3: false, //对话框
				categoryList:[],
				selUser:[],
				dialogsample:false,//显隐样品编号数据弹出框
				samplenumList:[],//样品序号
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				samplesList:[],//样品编号
				dialogsamplenum:false,//样品序号
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			//样品编号
			getsample(){
				this.requestData();
				this.dialogsample = true;
			},
			addsamplebtn(){
				if(this.selUser.length == 0){
					this.$message({
						message: '未选择数据',
						type: 'warning'
					});
				}else if(this.selUser.length > 1){
					this.$message({
						message: '不可选择多条数据',
						type: 'warning'
					});
				}else{
					this.samplesForm.ITEMNUM = this.selUser[0].ITEMNUM;//样品编号
					this.samplesForm.DESCRIPTION = this.selUser[0].DESCRIPTION;//样品名称
					this.dialogsample = false;
					this.requestData();
				}
			},
			//样品序号
			addsamplenum(){
				this.dialogsamplenum = true;
				this.$axios.get(this.basic_url + '/api-apps/app/itemline?ITEMNUM_wheres='+this.samplesForm.ITEMNUM, {

				}).then((res) => {
					this.samplenumList = res.data.data;
				}).catch((wrong) => {})
			},
			addsamplenumbtn(){
				if(this.selUser.length == 0){
					this.$message({
						message: '未选择数据',
						type: 'warning'
					});
				}else if(this.selUser.length > 1){
					this.$message({
						message: '不可选择多条数据',
						type: 'warning'
					});
				}else{
					this.samplesForm.ITEM_STEP = this.selUser[0].ITEM_STEP;
					this.dialogsamplenum = false;
				}
			},
			//获取委托书编号数据
			// getProxy() {
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
			// 		this.dialogVisible = true;
			// 	});
			// },
			//选择委托书编号节点
			handleCheckChange(data, checked, indeterminate) {
				this.getCheckboxData = data;
			},
			dailogconfirm() { //委托书编号小弹出框确认按钮事件
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.samplesForm.ITEMNUM = this.getCheckboxData.id;
					this.samplesForm.DESCRIPTION = this.getCheckboxData.fullname;
				} else {
					this.samplesForm.ITEMNUM = this.getCheckboxData.id;
					this.samplesForm.DESCRIPTION = this.getCheckboxData.fullname;
				}
			},
			SelChange(val) {
				this.selUser = val;
			},
			addprobtn(){
				this.$emit('request');
				this.dialogVisible3 = true;				
			},
			addproclass() { //小弹出框确认按钮事件
				if(this.selUser.length == 0){
					this.$message({
						message: '未选择数据',
						type: 'warning'
					});
				}else if(this.selUser.length > 1){
					this.$message({
						message: '不可选择多条数据',
						type: 'warning'
					});
				}else{
					this.dialogVisible3 = false;
					this.samplesForm.TYPE = this.selUser[0].TYPE;
					this.$emit('request');
				}
			},
			//小弹出框关闭按钮事件
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			getCheckedNodes() { //小弹出框获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},
			//这是查看
			view() {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.views = true; //
				this.noviews = false;
				this.edit = true;
				this.noedit = true;
				this.show=true;
			},
			childMethods() {//添加内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.samplesForm.DEPTID = res.data.deptId;
					this.samplesForm.ENTERBY = res.data.id;
					var date=new Date();
					this.samplesForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
					this.samplesForm.STATUSDATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.addtitle = true;
            	this.modifytitle = false;
            	this.modify=false;
            	this.show = true;
            	this.edit = true;
				this.noedit = false;
			},
			detail() { //修改内容时从父组件带过来的
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
				this.viewtitle = false;
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.show = true;
				this.edit = true;
				this.noedit = false;
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
			maxDialog(e) { //定义大弹出框一个默认大小
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);

			},
			//还原按钮
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");

			},
			//点击提交按钮执行保存
			save(samplesForm) {
				this.$refs[samplesForm].validate((valid) => {
					if (valid) {
						var url = this.basic_url + '/api-apps/app/itemgrant/saveOrUpdate';
						this.$axios.post(url, this.samplesForm).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								// this.show = false;
								//重新加载数据
								this.$emit('request');
								// this.$refs["samplesForm"].resetFields();
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
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
			saveAndUpdate(samplesForm){
				this.save(samplesForm);
				if(this.falg){
					this.show = false;
				}
				// this.$emit('request');
			},
			saveAndSubmit(samplesForm){
				this.save(samplesForm);
				// this.$emit('reset');
				// this.$emit('request');
			},
			handleClose(done) { //大弹出框确定关闭按钮
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//表格滚动加载
			loadMore() {
				if(this.loadSign) {
					this.loadSign = false
					this.page.currentPage++
						if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
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
				var url = this.basic_url + '/api-apps/app/productType';
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
					this.categoryList = newarr;
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
			handleClose(done) {
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
		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>