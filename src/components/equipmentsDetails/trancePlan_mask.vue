<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加溯源计划</div>
					<div class="mask_title" v-show="modifytitle">修改溯源计划</div>
					<div class="mask_title" v-show="viewtitle">查看溯源计划</div>
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
				<el-form :model="dataInfo" :rules="rules"   ref="dataInfo" label-width="100px" class="demo-user">
					<div class="accordion">

						<!-- 设备基本信息 -->
						<el-collapse v-model="activeNames">
							<el-collapse-item name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="5" class="pull-right">
										<el-input v-model="dataInfo.ASSETNUM" :disabled="true">
											<template slot="prepend">设备编号</template>
										</el-input>
									</el-col>
								</el-row>
								<el-form-item v-for="item in basicInfo" :label="item.label" :key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" label-width="160px">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'" style="width: 220px;" :disabled="noedit"></el-input>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='selname'&&item.prop=='A_NAME'" style="width: 220px;" :disabled="true">
										<el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="addinstru"></el-button>
									</el-input>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'"></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" :disabled="noedit">
									</el-date-picker>
									<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'" :disabled="noedit">
										<el-radio :label="it.label" v-for="it in item.opts" :key="it.id"></el-radio>
									</el-radio-group>
									<el-select clearable v-model="dataInfo[item.prop]" filterable placeholder="请选择" v-if="item.type == 'select'" @change="selChange" :disabled="noedit">
										<el-option v-for="item in assets"
										:key="item.ID"
										:label="item.DESCRIPTION"
										:value="item.DESCRIPTION">
										</el-option>
									</el-select>
									<el-select clearable v-model="dataInfo[item.prop]" filterable placeholder="请选择" v-if="item.type == 'seldept'" :disabled="noedit">
										<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
									</el-select>
									<el-select clearable v-model="dataInfo[item.prop]" filterable placeholder="请选择" v-if="item.type == 'sel'" style="width: 60px;" :disabled="noedit">
										<el-option v-for="item in time"
										:key="item"
										:label="item"
										:value="item">
										</el-option>
									</el-select>
								</el-form-item>
							</el-collapse-item>

							<el-collapse-item title="溯源后确认记录信息" name="2">
								<el-table :header-cell-style="rowClass" :data="pmRecordList" row-key="ID" border stripe :fit="true" max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'pmRecordList', order: 'descending'}">
									 <el-table-column type="index" sortable label="序号" width="50">
                                    </el-table-column>
									<el-table-column prop="RECORDNUM" label="溯源确认记录编号" sortable width="120px">
									</el-table-column>
									<el-table-column prop="PM_DATE" label="溯源日期" sortable width="120px">
									</el-table-column>
									<el-table-column prop="R_DESC" label="溯源确认内容" sortable >
									</el-table-column>
									<el-table-column prop="R_CONCLUSION" label="溯源确认结论" sortable width="200px">
									</el-table-column>
									<el-table-column prop="STATUS" label="溯源信息状态" sortable width="120px">
									</el-table-column>
								</el-table>
							</el-collapse-item>
							<el-collapse-item title="文件" name="3">
								<doc-table ref="docTable" :docParm = "docParm"></doc-table>
							</el-collapse-item>
							<!-- 其他信息 -->
							<el-collapse-item title="其他" name="4" v-show="!addtitle">
								<el-form-item v-for="item in otherInfo" :label="item.label" :key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" v-if="item.prop=='DEPARTMENT'" v-show="dept">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.prop=='DEPARTMENT'" disabled></el-input>
								</el-form-item>	
								<el-form-item v-for="item in otherInfo" :label="item.label" :key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" v-show="views">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'" disabled></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" disabled style="width:100%">
									</el-date-picker>
								</el-form-item>		
							</el-collapse-item>
						</el-collapse>
					</div>

					<div class="el-dialog__footer" v-show="noviews">
						<el-button type="primary" @click="saveAndUpdate('dataInfo')">保存</el-button>
						<el-button type="success" @click="saveAndSubmit('dataInfo')" v-show="addtitle">保存并继续</el-button>
						<el-button @click='close'>取消</el-button>
						<!-- <el-button type="primary" @click='submitForm'>提交</el-button> -->
					</div>
				</el-form>
			</div>
			<!--底部-->
		</div>
		<!--设备名称 Begin-->
		<el-dialog :visible.sync="dialogVisname" width="60%" :before-close="handleClose">
			<el-table :header-cell-style="rowClass" :data="assetList" border stripe height="400px" style="width: 100%;" :default-sort="{prop:'assetList', order: 'descending'}" @selection-change="SelectChange" v-loadmore="loadMore">
							<el-table-column type="selection" width="55" fixed align="center">
							</el-table-column>
							<el-table-column label="设备编号" width="130" sortable prop="ASSETNUM">
							</el-table-column>
							<el-table-column label="设备名称" width="200" sortable prop="DESCRIPTION">
							</el-table-column>
							<el-table-column label="型号" sortable prop="MODEL">
							</el-table-column>
							<el-table-column label="技术指标" width="120" sortable prop="ASSET_KPI">
							</el-table-column>						
							<el-table-column label="制造商" width="140" sortable prop="VENDOR">
							</el-table-column>
							<el-table-column label="出厂编号" width="160" sortable prop="FACTOR_NUM">
							</el-table-column>
							<el-table-column label="价格(万元)" width="140" sortable prop="A_PRICE">
							</el-table-column>
							<el-table-column label="接受日期" width="140" sortable prop="ACCEPT_DATE" :formatter="dateFormat">
							</el-table-column>
							<el-table-column label="启用日期" width="140" sortable prop="S_DATE" :formatter="dateFormat">
							</el-table-column>						
							<el-table-column label="配置地址" width="140" sortable prop="C_ADDRESS">
							</el-table-column>
							<el-table-column label="接收状态" width="120" sortable prop="A_STATUS">
							</el-table-column>
							<el-table-column label="保管人" width="200" sortable prop="KEEPER">
							</el-table-column>						
							<el-table-column label="备注" width="200" sortable prop="MEMO">
							</el-table-column>
						</el-table>
						<el-pagination background class="pull-right pt10"
				            @size-change="sizeChange"
				            @current-change="currentChange"
				            :current-page="page.currentPage"
				            :page-sizes="[10, 20, 30, 40]"
				            :page-size="page.pageSize"
				            layout="total, sizes, prev, pager, next"
				            :total="page.totalCount">
				        </el-pagination>
			<span slot="footer" class="dialog-footer" v-if="noviews">
    			<el-button @click="dialogVisname = false">取 消</el-button>
    			<el-button type="primary" @click="addinstruname">确 定</el-button>
  			</span>
		</el-dialog>
		<!--设备名称 End-->
	</div>
</template>

<script>
	import Config from '../../config.js'
	import docTable from '../common/doc.vue'
	export default {
		name: 'masks',
		props: ['detailData'],
		components: {docTable},
		data() {
			var checkNum = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入设备价值'));
				}
				setTimeout(() => {
					if (!/^[0-9]*$/.test(value)) {
						callback(new Error('请输入数字值'));
					} else {
						callback();
					}
				}, 1000);
			};
			return {
				loadSign: true, //加载
				commentArr: {},
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
				pmRecordList: [],
				time: [
					'年','月','日','周'
				],
				rules: {
					DESCRIPTION: [
						{ required: true, message: '请输入计划描述', trigger: 'blur' },
					],
					ASSETNUM: [
						{ required: true, message: '请输入设备编号', trigger: 'blur' },
					],
					A_NAME: [
						{ required: true, message: '请输入设备名称', trigger: 'blur' },
					],
					MODEL: [
						{ required: true, message: '请选择规格型号', trigger: 'blur' },
					],
					TRACEABILITY: [
						{ required: true, message: '请输入溯源方式', trigger: 'blur' },
					],
					FREQUENCY: [
						{ required: true, message: '请输入溯源周期', trigger: 'blur' },
					],
					FREQUENCYUNIT: [
						{ required: true, message: '请输入溯源周期单位', trigger: 'blur' },
					],
					PM_MECHANISM: [
						{ required: true, message: '请输入溯源机构', trigger: 'blur' },
					],
					PM_PLANDATE: [
						{ required: true, message: '请输入本次溯源计划时间', trigger: 'blur' },
					],
					R_DESC: [
						{ required: true, message: '请输入确认内容', trigger: 'blur' },
					],
					C_PERSON: [
						{ required: true, message: '请输入确认人', trigger: 'blur' },
					],
					C_DATE: [
						{ required: true, message: '请输入确认日期', trigger: 'blur' },
					],
					APPR_PERSON: [
						{ required: true, message: '请输入审核人', trigger: 'blur' },
					],
					APPR_DATE: [
						{ required: true, message: '请输入审核日期', trigger: 'blur' },
					],
					STATUS: [
						{ required: true, message: '请输入信息状态', trigger: 'blur' },
					],
					S_MEMO: [
						{ required: true, message: '请输入特殊情况说明', trigger: 'blur' },
					],
					DESCRIPTION: [
						{ required: true, message: '请输入记录描述', trigger: 'blur' },
					],
				},
				assets: [],
				basicInfo: [
					{
						label: '计划描述',
						prop: 'DESCRIPTION',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						//无对应数据字段
						label: '出厂编号',
						prop: 'LE_FACTORYNUM',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '设备名称',
						prop: 'A_NAME',
						width: '50%',
						type: 'selname',
						displayType: 'inline-block'
					},
					{
						label: '规格型号',
						prop: 'MODEL',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '制造商',
						prop: 'VENDOR',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '溯源方式',
						prop: 'TRACEABILITY',
						width: '50%',
						type: 'radio',
						displayType: 'inline-block',
						opts: [
                            {
                                label: '检定'
                            },
                            {
                                label: '核查'
                            }
                        ],
					},
					{
						label: '溯源机构',
						prop: 'PM_MECHANISM',
						width: '50%',
						type: 'seldept',
						displayType: 'inline-block'
					},
					{
						label: '溯源周期',
						prop: 'FREQUENCY',
						width: '20%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '溯源周期单位',
						prop: 'FREQUENCYUNIT',
						width: '100',
						type: 'sel',
						displayType: 'inline-block'
					},
					{
						label: '前次溯源起始时间',
						prop: 'PM_START_END',
						width: '50%',
						type: 'date',
						displayType: 'inline-block'
					},
					// {
					// 	label: '前次溯源完成时间',
					// 	prop: 'COMP_DATE',
					// 	width: '50%',
					// 	type: 'date',
					// 	displayType: 'inline-block'
					// },
					{
						label: '本次溯源计划时间',
						prop: 'PM_PLANDATE',
						width: '50%',
						type: 'date',
						displayType: 'inline-block'
					},
					{
						label: '溯源完成日期',
						prop: 'COMP_DATE',
						width: '50%',
						type: 'date',
						displayType: 'inline-block'
					}
				],
				otherInfo: [
					{
						label: '录入人',
						prop: 'ENTERBYDesc',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '录入时间',
						prop: 'ENTERDATE',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '机构',
						prop: 'DEPTIDDesc',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '修改人',
						prop: 'CHANGEBYDesc',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '修改时间',
						prop: 'CHANGEDATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					}
				],

				basic_url: Config.dev_url,

				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				modify: false,
				activeNames: ['1', '2','3','4'], //手风琴数量
				dialogVisible: false, //对话框
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				selectData: [], //
				getCheckboxData: {},

				dataInfo: {
					'ID': '',	
					'PMNUM': '', //必填页面没有
					'DESCRIPTION': '',
					'ASSETNUM': '',
					'A_NAME': '',
					'MODEL': '',
					'VENDOR': '',
					'TRACEABILITY': '',
					'FREQUENCY': '',
					'LE_FACTORYNUM': '',
					'FREQUENCYUNIT': '',
					'PM_MECHANISM': '',
					'PM_START_END': '',		
					'PM_PLANDATE': '',
					'COMP_DATE': '',	
					'STATUS': '1',
					'ENTERBY': '',
					'ENTERDATE': '',	
					'DEPTID': '',
				},
				addtitle:true,
				modifytitle:false,
				viewtitle:false,
				dept:false,
				noedit:false,//表单内容
				views:false,//录入修改人信息
				noviews:true,//按钮
				modify:false,//修订
				hintshow:false,
				statusshow1:true,
				statusshow2:false,
				dialogVisname:false,//设备名称弹出框
				assetList:[],//弹出框数据
				selName:'',//表格勾选数据
				page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
				return 'text-align:center'
			},
			SelectChange(val){
				this.selName = val;
			},
			sizeChange(val) {
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    currentChange(val) {
		      this.page.currentPage = val;
		      this.requestData();
			},
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			//设备名称放大镜按钮
			addinstru(){
				this.$emit('request');
				this.dialogVisname = true;
			},
			//设备名称弹出框确定按钮
			addinstruname(){
				if(this.selName.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selName.length > 1){
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
				}else{
					this.dataInfo.A_NAME = this.selName[0].DESCRIPTION;
					this.dialogVisname = false;
					this.$emit('request');
				}
			},
			getUser(opt){
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url,{}).then((res) => {
						console.log(res);
						if(opt == 'new'){
							this.dataInfo.DEPTID = res.data.deptId;
							this.dataInfo.ENTERBY = res.data.id;
							this.dataInfo.ENTERDATE = this.getToday();
						}else if(opt == 'edit'){
							console.log(1);
							this.dataInfo.DEPTID = res.data.deptId;//传给后台机构id
							console.log(2);
							this.dataInfo.CHANGEBY = res.data.id;
							console.log(3);
							this.dataInfo.CHANGEDATE = this.getToday();
							console.log(4);
							this.dataInfo.DEPARTMENT = res.data.deptName;
						
							this.docParm.userid = res.data.id;
							this.docParm.username = res.data.username;
							this.docParm.deptid = res.data.deptId;
							this.docParm.deptfullname = res.data.deptName;
						}
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试1',
						type: 'error'
					});
				});
			},
			//机构值
			getCompany() {
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					console.log(res.data);
					this.selectData = res.data;
				});
			},
			getToday(){
				var date = new Date();
				var str = date.getFullYear() + '-' + date.getMonth() + '-'+ date.getDate();
				var rate = this.$moment(str).format("yyyy-MM-dd")
				return rate;
			},
			selChange(val){
				var data = this.assets;
				var selData = data.filter(function(item){
					if(item.DESCRIPTION == val){
						return item;
					}
				});
				this.dataInfo.MODEL = selData[0].MODEL;
				this.dataInfo.ASSETNUM = selData[0].ASSETNUM;
				this.dataInfo.VENDOR = selData[0].VENDOR;
				this.dataInfo.LE_FACTORYNUM = selData[0].FACTOR_NUM;
				this.getPmList();
			},
			getPmList(){
				var data = {
					page: 1,
					limit: 20,
					assetnum: this.dataInfo.ASSETNUM
				};
				var url = this.basic_url + '/api-apps/app/pmRecord';
				this.$axios.get(url,{
					params: data
				}).then((res) => {
					this.pmRecordList = res.data.data;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试2',
						type: 'error'
					});
				});
					
			},
			//点击按钮显示弹窗
			visible() {
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
				this.docParm = {
					'model': 'new',
					'appname': 'PM_PLAN',
					'recordid': 1,
					'appid': 69
				};
				this.getUser('new');
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				console.log(this.dataInfo);
				this.dataInfo = this.detailData;
				this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle = false;
				this.dept = true;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.modify = true;
				this.hintshow = false;
				this.statusshow1 = true;
				this.statusshow2 = false;
				this.show = true;

				this.getUser('edit');
				var _this = this;
				setTimeout(function(){
					_this.docParm.model = 'edit';
					_this.docParm.appname = 'PM_PLAN';
					_this.docParm.recordid = _this.dataInfo.ID;
					_this.docParm.appid = 69;
					_this.$refs.docTable.getData();
				},100);
				this.getPmList();
			},
			//这是查看
			view(data) {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = false;
				this.modify = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.dataInfo = data;
				this.getPmList();
				this.show = true;				
			},
			//点击关闭按钮
			close() {
				this.resetForm();
				this.$emit('request');
				this.show = false;
			},
			resetForm(){
				this.dataInfo =  {
					'ID': '',	
					'PMNUM': '',
					'DESCRIPTION': '',
					'ASSETNUM': '',
					'A_NAME': '',
					'MODEL': '',
					'VENDOR': '',
					'TRACEABILITY': '',
					'FREQUENCY': '',
					'FREQUENCYUNIT': '',
					'PM_MECHANISM': '',
					'PM_START_END': '',		
					'PM_PLANDATE': '',
					'COMP_DATE': '',	
					'STATUS': '1'
				};
				this.$refs['dataInfo'].resetFields();
				// this.show = false;
			},
			toggle(e) { //大弹出框大小切换
				if(this.isok1) {
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
				$(".mask_div").css("margin", "0%");
				$(".mask_div").css("top", "60px");
			},

			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("margin", "7% 10%");
				$(".mask_div").css("top", "0");
			},

			save(dataInfo) {
				console.log(this.dataInfo);
				var _this = this;
				var url = this.basic_url + '/api-apps/app/pmPlan/saveOrUpdate';
				this.$refs['dataInfo'].validate((valid) => {
					if (valid) {
						this.$axios.post(url, _this.dataInfo).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success',
								});
								this.resetForm();
								this.pmRecordList = [];
								this.$emit('request');
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试3',
								type: 'error'
							});
						});
					this.falg=true;
					} else {
						this.show = true;
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
						this.falg=false;
					}
				});
			},
			saveAndUpdate(dataInfo) {
				this.save(dataInfo);
				if(this.falg){
					this.show = false;
				}
			},
			saveAndSubmit(dataInfo) {
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
					//console.log('到底了', this.page.currentPage)
				}
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				}
				var url = this.basic_url + '/api-apps/app/asset';
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
					this.assetList = newarr;
				}).catch((wrong) => {})
				
			},
		},
		mounted() {
			this.requestData();
			this.getCompany();
			var url = this.basic_url + '/api-apps/app/asset';
			this.$axios.get(url, {
				params: {}
			}).then((res) => {
				this.assets = res.data.data;
			}).catch((wrong) => {})
		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>