<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加检验/检测项目</div>
					<div class="mask_title" v-show="modifytitle">修改检验/检测项目</div>
					<div class="mask_title" v-show="viewtitle">查看检验/检测项目</div>
					<div class="mask_anniu">
						<span class="mask_span mask_max" @click="toggle">	
							<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						</span>
						<span class="mask_span" @click="close">
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content">
					<el-form inline-message :model="testing_projectForm" :rules="rules" ref="testing_projectForm"  >
						<div class="content-accordion">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="基本信息" name="1">
									<el-row :gutter="20" class="pb10">
										<el-col :span="3" class="pull-right">
											<el-input placeholder="自动生成" v-model="testing_projectForm.VERSION" :disabled="true">
												<template slot="prepend">版本</template>
											</el-input>
										</el-col>
										<!--<el-col :span="5" class="pull-right" v-if="modify">
											<el-input v-model="testing_projectForm.STATUS=='1'?'活动':'不活动'" :disabled="true">
												<template slot="prepend">信息状态</template>
											</el-input>
										</el-col>
										<el-col :span="5" class="pull-right" v-else>
											<el-input v-model="testing_projectForm.STATUS" :disabled="true">
												<template slot="prepend">信息状态</template>
											</el-input>
										</el-col>-->
										<!-- <el-col :span="5" class="pull-right">
											<el-input v-model="testing_projectForm.P_NUM" :disabled="noedit" prop="P_NUM">
												<template slot="prepend">编码</template>
											</el-input>
										</el-col> -->
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="编码" prop="P_NUM" label-width="100px">
												<el-input v-model="testing_projectForm.P_NUM" placeholder="自动生成" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="16">
											<el-form-item label="项目名称" prop="P_NAME" label-width="100px">
												<el-input v-model="testing_projectForm.P_NAME"  onmouseover="this.title=this.value" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="单价(元)" prop="UNITCOST" label-width="100px">
												<el-input v-model="testing_projectForm.UNITCOST" id="cost" @blur="toPrice" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="计量单位" prop="UNIT" label-width="100px">
												<!-- <el-input v-model="testing_projectForm.UNIT" :disabled="noedit"></el-input> -->
												<el-select v-model="testing_projectForm.UNIT" filterable default-first-option allow-create :disabled="noedit" style="width: 100%">
													<el-option v-for="(item,index) in selectData" :key="index" :value="item.name" :label="item.name"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="作业指导书" prop="DOCLINKS_NUM" label-width="100px">
												<el-input v-model="testing_projectForm.DOCLINKS_NUM" :disabled="true">
													<el-button slot="append" icon="icon-search" @click="getwork" :disabled="noedit"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="领域" prop="FIELD" label-width="100px">
												<el-input v-model="testing_projectForm.FIELD" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="子领域" prop="CHILD_FIELD" label-width="100px">
												<el-input v-model="testing_projectForm.CHILD_FIELD" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8" v-if="dept">
											<el-form-item label="机构" prop="DEPTIDDesc" label-width="100px">
												<el-input v-model="testing_projectForm.DEPTIDDesc" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="24">
											<el-form-item label="技术要求" prop="TECHNICAL_REQUIRE" label-width="100px">
												<el-input v-model="testing_projectForm.TECHNICAL_REQUIRE" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="人员资质" name="2">
									<div class="table-func" v-show="noviews">
										<el-button type="success" size="mini" round @click="addfield">
											<i class="icon-add"></i>
											<font>新建行</font>
										</el-button>
									</div>
									<div class="pt10">
										<el-table ref="qualification" :header-cell-style="rowClass" :fit="true"
										:data="testing_projectForm.QUALIFICATIONList"
										row-key="ID"
										border
										stripe
										max-height="260"
										highlight-current-row
										style="width: 100%;"
										@cell-click="iconOperation"
										:default-sort="{prop:'testing_projectForm.QUALIFICATIONList', order: 'descending'}">
											<el-table-column prop="iconOperation" fixed width="50px" v-if="!viewtitle">
												<template slot-scope="scope">
													<i class="el-icon-check" v-if="scope.row.isEditing"></i>
													<i class="el-icon-edit" v-else></i>
												</template>
											</el-table-column>
											<el-table-column prop="STEP" label="序号" sortable width="120px" label-width="150px" type="index">
											</el-table-column>
											<el-table-column prop="C_NAME" label="证书名称" sortable>
												<template slot-scope="scope">
													<el-form-item :prop="'QUALIFICATIONList.'+scope.$index + '.C_NAME'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
														<el-input v-if="scope.row.isEditing" v-model="scope.row.C_NAME" placeholder="请输入证书名称">
															<el-button slot="append" icon="icon-search" @click="getqualication(scope.row)" :disabled="noedit"></el-button>
														</el-input>
														<span v-else>{{scope.row.C_NAME}}</span>
													</el-form-item>
												</template>
											</el-table-column>
											<el-table-column fixed="right" label="操作" width="120">
												<template slot-scope="scope">
													<el-button @click.native.prevent="deleteRow(scope.$index,scope.row,'tableList')" type="text" size="small" v-show="!viewtitle">
															<i class="icon-trash red"></i>
													</el-button>
												</template>
											</el-table-column>
										</el-table>
									</div>
								</el-collapse-item>
								<el-collapse-item title="其他" name="3" v-show="views">
									<el-row>
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBYDesc" label-width="100px">
												<el-input v-model="testing_projectForm.ENTERBYDesc" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENTERDATE" label-width="100px">
												<el-input v-model="testing_projectForm.ENTERDATE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="机构" prop="DEPTIDDesc" label-width="100px">
												<el-input v-model="testing_projectForm.DEPTIDDesc" placeholder="当前录入人机构" :disabled="edit">
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBYDesc" label-width="100px">
												<el-input v-model="testing_projectForm.CHANGEBYDesc" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" prop="CHANGEDATE" label-width="100px">
												<el-input v-model="testing_projectForm.CHANGEDATE" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="content-footer" v-show="noviews">
							<el-button type="primary" @click="save('Update')">保存</el-button>
							<el-button type="success" @click="save('Submit')" v-show="addtitle">保存并继续</el-button>
							<el-button v-if="modify" type="primary" class="btn-primarys" @click="modifyversion()">修订</el-button>
							<!-- <el-button v-if="modify" type="success" @click="update('testing_projectForm')">启用</el-button> -->
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>

			<!-- 作业指导书 Begin -->
			<el-dialog title="作业指导书" :modal-append-to-body="false" :visible.sync="dialogVisible" width="80%">
				<!-- 高级查询划出 Begin-->
				<div class="pb10">
					<el-form inline-message :model="searchList" label-width="100px">
						<el-row :gutter="10">
							<el-col :span="8">
								<el-form-item label="分发号" prop="NUM">
									<el-input v-model="searchList.NUM" @keyup.enter.native="searchinfo">
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="文件名称" prop="DESCRIPTION">
									<el-input v-model="searchList.DESCRIPTION" @keyup.enter.native="searchinfo">
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
								<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px; margin-left: 2px">重置</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 高级查询划出 End-->
				<v-table ref="tablePlugin" :appName="appName" :newHeight="newHeight" :searchList="searchList" @getSelData="setSelData">
					<el-table-column label="分发号" width="155" sortable prop="NUM">
					</el-table-column>
					<el-table-column label="文件名称" sortable prop="DESCRIPTION">
					</el-table-column>
					<el-table-column label="版本" width="100" sortable prop="VERSION" align="right">
					</el-table-column>
					<el-table-column label="录入时间" width="160" prop="ENTERDATE" sortable :formatter="dateFormat">
					</el-table-column>
					<el-table-column label="机构" width="120" prop="DEPTIDDesc" sortable>
					</el-table-column>
				</v-table>

				<span slot="footer" class="dialog-footer">
			       <el-button type="primary" @click="addwork">确 定</el-button>
				   <el-button @click="DialogClose">取 消</el-button>
			    </span>
			</el-dialog>
			<!-- 作业指导书 End -->

			<!-- 资质证书 Begin -->
			<el-dialog title="资质证书" :modal-append-to-body="false" :visible.sync="dialogVisible2" width="70%">
				<!-- 高级查询划出 Begin-->
				<div class="pb10">
					<el-form inline-message :model="searchList2" label-width="100px">
						<el-row :gutter="10">
							<el-col :span="8">
								<el-form-item label="证书名称" prop="c_name">
									<el-input v-model="searchList2.c_name" @keyup.enter.native="searchinfo2">
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="资质有效期" prop="c_date">
									<el-input v-model="searchList2.c_date" @keyup.enter.native="searchinfo2">
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-button type="primary" @click="searchinfo2" size="small" style="margin-top:2px">搜索</el-button>
								<el-button type="primary" @click="resetbtn2" size="small" style="margin-top:2px; margin-left: 2px">重置</el-button>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 高级查询划出 End-->
				<v-table ref="tableQualification" :appName="appName2" :newHeight="newHeight" :searchList="searchList2" @getSelData="setSelData">
					<el-table-column label="证书名称" sortable width="200px" prop="c_name">
					</el-table-column>
					<el-table-column label="资质有效期" sortable prop="c_date">
					</el-table-column>
				</v-table>
				<span slot="footer" class="dialog-footer">
	    			<el-button type="primary" @click="dailogconfirm">确定</el-button>
	    			<el-button @click="dialogVisible2 = false">取消</el-button>
	  			</span>
			</el-dialog>
			<!-- 资质证书 End -->
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import vTable from '../plugin/table/table.vue'
	export default {
		name: 'masks',
		components: {
			'v-table': vTable
		},
		data() {
			return {
				appName: 'workIns',//作业指导书
				appName2: 'qualifications',//资质证书
				newHeight: '300',//传给弹出框表格高度
				testing_projectForm:{
					CHANGEBY: '',
					CHILD_FIELD:'',
					DEPARTMENT:'',
					DOCLINKS_NUM: '',
					ENTERBY:'',
					ENTERDATE: '',
					FIELD: '',
					ID: '',
					P_NAME: '',
					P_NUM: '',
					UNIT: '',//计量单位
					QUALIFICATION: '',
					TECHNICAL_REQUIRE:'',//技术要求
					QUALIFICATIONList: [],
					QUANTITY: '',
					STATUS: '1',
					VERSION: 1,
					WORK_INSTRUCTIONList: []
				},
				searchList: { //点击[作业指导书]搜索
					NUM: '',
					DESCRIPTION: '',
				},
				searchList2: { //点击[资质证书]搜索
					c_name: '',
					c_date: '',
				},
				basic_url: Config.dev_url,
				editSearch: '',
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				selectData: [],//计量单位
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1','2','3'], //手风琴数量
				rules: { //需要验证的字段
					P_NUM: [{
						required: false,
						trigger: 'blur',
						validator: this.Validators.isSpecificKey,
					}],
					P_NAME: [{
						required: true,
						trigger: 'blur',
						validator: this.Validators.isSpecificKey,
					}],
					FIELD: [{
						required: false,
						trigger: 'blur',
						validator: this.Validators.isSpecificKey,
					}],
					CHILD_FIELD: [{
						required: false,
						trigger: 'blur',
						validator: this.Validators.isSpecificKey,
					}],
					UNITCOST:[{required: true, trigger: 'blur', validator:this.Validators.isPrices}],
				},
				testing_projectForm:{},//检验/检测项目数据组
				//tree
				gridDataList: [],
				selval: [],
				loadSign:true,//加载
				commentArr:{},
				resourceData: [], //数组，我这里是通过接口获取数据
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				page: { //分页显示
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				// initcost: '',
				TESTING_PROJECTFORM:{},//
				addtitle:true,
				modifytitle:false,
				viewtitle:false,
				dept:false,
				noedit:false,//可编辑
				views:false,//录入修改人信息
				noviews:true,//按钮
				modify:false,//修订
				hintshow:false,
				statusshow1:true,
				statusshow2:false,
				dialogVisible: false, //对话框
				dialogVisible2: false,//作业指导书弹出框
				WORK_INSTRUCTIONList:[],
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				isEditing: true,
				peoplegrid:'',//人员资质当前这行放大镜
			};
		},
		methods: {
			//点击重置[作业指导书]搜索
			resetbtn(){
				this.searchList =  { 
					NUM: '',
					DESCRIPTION: '',
				};
				this.workInsData();
			},
			//点击搜索[作业指导书]查询
			searchinfo() {
				this.workInsData();
			},
			//点击重置[资质证书]搜索
			resetbtn2(){
				this.searchList2 =  { 
					c_name: '',
					c_date: '',
				};
				this.qualicationData();
			},
			//点击搜索[资质证书]查询
			searchinfo2() {
				this.qualicationData();
			},
			//人员资质-新建行
			addfield() {
				var obj = {
					C_NAME: '',
					isEditing: true
				};
				this.testing_projectForm.QUALIFICATIONList.push(obj);
			},
			//刪除新建行
			deleteRow(index, row, listName){
				var TableName = '';
				if(listName =='tableList'){
					TableName = 'QUALIFICATION';
				}
				if(row.ID){
					var url = this.basic_url + '/api-apps/app/inspectionPro/' + TableName +'/' + row.ID;
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {}).then((res) => {
							if(res.data.resp_code == 0){
								this.testing_projectForm[TableName+'List'].splice(index,1);
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
						});
					}).catch(() => {

					});
				}else{
					this.testing_projectForm[TableName+'List'].splice(index,1);
				}
			},
			iconOperation(row, column, cell, event) {
				if(column.property === "iconOperation") {
					row.isEditing = !row.isEditing;
				}
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			//编码提示
			hint(){
				this.hintshow = true;
			},
			hinthide(){
				this.hintshow = false;
			},
			toNum(str) {
				return str.replace(/\,|\￥/g, "");
			},
			//金额两位小数点千位分隔符，四舍五入
			toPrice() {
				var money = document.getElementById("cost").value;
				var num = parseFloat(this.toNum(money)).toFixed(2).toString().split(".");
				num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
				this.testing_projectForm.UNITCOST = num.join(".");
			},
			getCompany() { //文件查询接口，暂无通，待修改
				this.editSearch = 'DOCLINKS';
				var url = this.basic_url + '/api-user/depts/type'; //文件接口不对
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data.data;
				});
			},
			//点击作业指导书放大镱
			getwork(){
				this.dialogVisible = true;
				this.workInsData();//作业指导书数据
			},
			//弹出框-作业指导书
			workInsData(opt) {
				if(!this.$refs.tablePlugin){
					setTimeout(()=>{
						this.$refs.tablePlugin.requestData();//requestData子组件中接收数据的方法名
					}, 2000);
				}else{
					this.$refs.tablePlugin.requestData();
				}
			},
			//人员资质证书
			getqualication(rowID){
				this.rowID = rowID;
				this.dialogVisible2 = true;
				this.qualicationData();//资质证书数据
			},
			//资质证书
			qualicationData(opt) {
				if(!this.$refs.tableQualification){
					setTimeout(()=>{
						this.$refs.tableQualification.requestData();//requestData子组件中接收数据的方法名
					}, 2000);
				}else{
					this.$refs.tableQualification.requestData();
				}
			},
			// qualicationData(item) {
			// 	var data = {
			// 		c_name: this.searchList2.c_name,
			// 		c_date: this.searchList2.c_date,
			// 		page: this.page.currentPage,
			// 		limit: this.page.pageSize,
			// 	}
			// 	this.peoplegrid = item;
			// 	var url = this.basic_url + '/api-user/users/qualifications';
			// 	this.$axios.get(url, {
			// 		params: data
			// 	}).then((res) => {
			// 		this.page.totalCount = res.data.count;
			// 		this.gridDataList = res.data.data;
			// 		this.dialogVisible2 = true;
			// 	});
			// },
			getCheckedNodes() { //获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},
			confirms() { //弹出框确定按钮调用数据
				this.getCheckedNodes();
				this.dialogVisible2 = false;
				if(this.editSearch == 'DOCLINKS') {
					this.testing_projectForm.DOCLINKSId = this.checkedNodes[0].id;
					this.testing_projectForm.DOCLINKS_NUM = this.checkedNodes[0].simplename;
				}
			},
			//获取计量单位
			getMeteUnit(){
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=mete_unit';
				this.$axios.get(url, {}).then((res) => {
					this.selectData = res.data;
					this.testing_projectForm.UNIT = res.data[0].name;
				}).catch((wrong) => {
				})	
			},
			setSelData(val) {
				this.selval = val;
			},
		
			handleClose(done) { //确认框关闭
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {
				console.log('取消关闭');
				$('.v-modal').hide();
			});
			},

			visible() { //添加内容时从父组件带过来的
				this.testing_projectForm = {
					CHANGEBY: '',
					CHILD_FIELD:'',
					DEPARTMENT:'',
					DOCLINKS_NUM: '',
					ENTERBY:'',
					ENTERDATE: '',
					FIELD: '',
					ID: '',
					P_NAME: '',
					P_NUM: '',
					QUALIFICATION: '',
					QUALIFICATIONList: [],
					QUANTITY: '',
					STATUS: '1',
					VERSION: 1,
					WORK_INSTRUCTIONList: []
				},
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.testing_projectForm.DEPARTMENT = '';
					this.testing_projectForm.DEPTID = res.data.deptId;
					this.testing_projectForm.ENTERBY = res.data.id;
					var date = new Date();
					this.testing_projectForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
				});
				this.addtitle = true;
				this.modifytitle = false;
				this.viewtitle = false;
				this.dept = false;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.modify = false;//修订
				this.hintshow = false;
				this.statusshow1 = true;
				this.statusshow2 = false;
				// this.show = true;
			},

			detail(dataid) { //修改内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.testing_projectForm.DEPARTMENT = '';
					this.testing_projectForm.CHANGEBY = res.data.id;
					var date = new Date();
					this.testing_projectForm.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
					
				}).catch((err) => {
				});
				var url = this.basic_url + '/api-apps/app/inspectionPro/' + dataid;
				this.$axios.get(url, {}).then((res) => {
					for(var i=0;i<res.data.QUALIFICATIONList.length;i++){
						res.data.QUALIFICATIONList[i].isEditing = false;
					}
					this.testing_projectForm = res.data;
					//深拷贝数据
					let _obj = JSON.stringify(this.testing_projectForm);
        	this.TESTING_PROJECTFORM = JSON.parse(_obj);
				}).catch((err) => {
				});
				this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle = false;
				this.dept = true;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.hintshow = false;
				this.modify = true;//修订
				this.statusshow1 = false;
				this.statusshow2 = true;
				this.show = true;
			},
			//这是查看
			view(dataid) {
				console.log(dataid);
				var url = this.basic_url + '/api-apps/app/inspectionPro/' + dataid.ID;
				this.$axios.get(url, {}).then((res) => {
					this.testing_projectForm = res.data;
				}).catch((err) => {
				});
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.show = true;				
			},
			//点击更新按钮
			update(testing_projectForm) {
				var data = {
					ID: this.testing_projectForm.ID,
				}
				this.$axios.get(this.basic_url+ '/api-apps/app/inspectionPro/operate/updateRelate', {
					params: data
				}).then((res) => {
					if(res.data.resp_code == 0) {
						this.$message({
							message: '更新成功',
							type: 'success'
						});
					}else{
						return;
					}
				}).catch((err) => {
				});
			},
			//修订
			modifyversion() {
				this.$refs.testing_projectForm.validate((valid) => {
					if(valid) {
					var TESTING_PROJECTFORM=JSON.stringify(this.TESTING_PROJECTFORM); //接过来的数据
					 var testing_projectForm=JSON.stringify(this.testing_projectForm); //获取新新的数据
					 	if(testing_projectForm==TESTING_PROJECTFORM){
					  		this.$message({
								message: '没有修改内容，不允许修订',
								type: 'warning'
							});
							return false;
					    }else{
							var url = this.basic_url + '/api-apps/app/inspectionPro/operate/upgraded';
							this.$axios.post(url, this.testing_projectForm).then((res) => {
								//resp_code == 0是后台返回的请求成功的信息
								if(res.data.resp_code == 0) {
									this.$message({
										message: '保存成功',
										type: 'success'
									});
									//重新加载数据
									this.show = false;
									this.$emit('request');
									this.$emit('reset');
								}else{
									this.$message({
										message: res.data.resp_msg,
										type: 'success'
									});
								}
							}).catch((err) => {
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
			//点击关闭按钮
			close() {
				this.show = false;
				this.$emit('request');//关闭弹框去掉勾选
			},
			open(){
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
			// 保存users/saveOrUpdate
			save(parameter) {
				var _this = this;
				this.$refs.testing_projectForm.validate((valid) => {
					if(valid) {
						_this.testing_projectForm.STATUS = ((_this.testing_projectForm.STATUS == "1" || _this.testing_projectForm.STATUS == '活动') ? '1' : '0');
						if(_this.testing_projectForm.ID!=null&&_this.testing_projectForm.ID!=undefined&&_this.testing_projectForm.ID!=''){
							this.$confirm('是否需要修订版本？').then(_ => {
								this.modifyversion();
							}).catch(_ => {
								var url = this.basic_url + '/api-apps/app/inspectionPro/saveOrUpdate';
								this.$axios.post(url, _this.testing_projectForm).then((res) => {
									if(res.data.resp_code == 0) {
										this.$message({
											message: '保存成功',
											type: 'success'
										});
										if(parameter='Update'){
											this.show=false;
										}else{
											this.show=true;
										}
										this.$emit('reset');
										this.$emit('request');
										this.visible();
									}else{
										this.show = true;
										if(res.data.resp_code != 0) {
											this.$message({
												message: res.data.resp_msg,
												type: 'warning'
											});
										}
									}
									//清空表单验证
									}).catch((err) => {
									});
							});	
					}else{
						var url = this.basic_url + '/api-apps/app/inspectionPro/saveOrUpdate';
						this.$axios.post(url, _this.testing_projectForm).then((res) => {
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							if(parameter='Update'){
								this.show=false;
							}else{
								this.show=true;
							}
							this.$emit('reset');
							this.$emit('request');
							this.visible();
						}else{
							this.show = true;
							if(res.data.resp_code != 0) {
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
								});
							}
						}
							//清空表单验证
							}).catch((err) => {
							});
						}
						} else {
							this.show = true;
							this.$message({
								message: '未填写完整，请填写',
								type: 'warning'
							});
						}
				});
			},
			//证书名称-小弹出框确认按钮事件
			dailogconfirm(rowID) {
				if(this.selval.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selval.length > 1){
					this.$message({
						message: ' 不可选择多条数据',
						type: 'warning'
					});
				}else{
					this.rowID.C_NAME = this.selval[0].c_name;
					this.dialogVisible2 = false;
				}
			},
			addwork() { //小弹出框确认按钮事件
				if(this.selval.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selval.length>1){
					this.$message({
						message: '不可以同时选择多条数据',
						type: 'warning'
					});
				}else{
					var changeUser = this.selval;
					var list = [];
					//basisnum为依据编号的数组
					var basisdesc = [];
					for (var i = 0; i < changeUser.length; i++) {
						basisdesc.push(changeUser[i].DESCRIPTION);
					}
					//basisnums为basisnum数组用逗号拼接的字符串el-tag__close el-icon-close
					this.testing_projectForm.DOCLINKS_NUM = basisdesc.toString(',');
					// list.push(basisnums);
					// for(var i = 0;i<this.selUser.length;i++){
					// 	this.selUser[i].ID = '';
					// 	list.push(this.selUser[i]);
					// }
					this.resetBasisInfo();//调用resetBasisInfo函数
				}
			},
			DialogClose(){//点击取消按钮
				this.resetBasisInfo();//调用resetBasisInfo函数
			},
			resetBasisInfo(){//点击确定或取消按钮时重置数据20190303
				this.dialogVisible = false;//关闭弹出框
				this.WORK_INSTRUCTIONList = [];//列表数据置空
				this.page.currentPage = 1;//页码重新传值
				this.page.pageSize = 10;//页码重新传值
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {
				console.log('取消关闭');
				$('.v-modal').hide();
			});
			},
			
			// //作业指导书
			// workInsData() {
			// 	var data = {
			// 		NUM: this.searchList.NUM,
			// 		DESCRIPTION: this.searchList.DESCRIPTION,
			// 		page: this.page.currentPage,
			// 		limit: this.page.pageSize,
			// 	}
			// 	var url = this.basic_url + '/api-apps/app/workIns';
			// 	this.$axios.get(url, {
			// 		params: data
			// 	}).then((res) => {
			// 		this.page.totalCount = res.data.count;
			// 		//总的页数
			// 		let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
			// 		if(this.page.currentPage >= totalPage) {
			// 			this.loadSign = false
			// 		} else {
			// 			this.loadSign = true
			// 		}
			// 		this.commentArr[this.page.currentPage] = res.data.data
			// 		let newarr = []
			// 		for(var i = 1; i <= totalPage; i++) {
			// 			if(typeof(this.commentArr[i]) != 'undefined' && this.commentArr[i].length > 0) {
			// 				for(var j = 0; j < this.commentArr[i].length; j++) {
			// 					newarr.push(this.commentArr[i][j])
			// 				}
			// 			}
			// 		}
			// 		this.WORK_INSTRUCTIONList = newarr;
			// 	}).catch((wrong) => {})
			// },
		},
		mounted() {
			this.getMeteUnit();//计量单位
			this.getCompany();
		},
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
	#cost {
		text-align: right !important;
		/* padding-right: 30px; */
	}
</style>