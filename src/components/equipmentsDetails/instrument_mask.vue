<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加仪器和计量器具</div>
					<div class="mask_title" v-show="modifytitle">修改仪器和计量器具</div>
					<div class="mask_title" v-show="viewtitle">查看仪器和计量器具</div>
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
								<el-collapse-item title="设备基本信息" name="1">
									<el-row :gutter="20" class="pb10">
										<el-col :span="5" class="pull-right">
											<el-input v-model="dataInfo.ASSETNUM" :disabled="true">
												<template slot="prepend">设备编号</template>
											</el-input>
										</el-col>
										<!-- <el-col :span="5" class="pull-right">
											<el-input v-model="dataInfo.STATUS==1?'活动':'不活动'" :disabled="true">
												<template slot="prepend">信息状态</template>
											</el-input>
										</el-col> -->
									</el-row>
									<el-form-item v-for="item in basicInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && item.prop !='A_PRICE' " :disabled="noedit"></el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'" :disabled="noedit"></el-input>
										<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" :disabled="noedit">
										</el-date-picker>
										<el-radio-group v-model="dataInfo[item.prop]" v-if="item.type=='radio'" :disabled="noedit">
											<el-radio :label="it.label" v-for="it in item.opts" :key="it.id"></el-radio>
										</el-radio-group>
										<el-select clearable v-model="dataInfo[item.prop]"  v-if="item.type=='select'" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit">
											<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
										</el-select>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && item.prop =='A_PRICE' " @blur="handlePrice" :disabled="noedit" id="cost"></el-input>
									</el-form-item>
								</el-collapse-item>

								<!-- 设备保管人员情况 -->
								<el-collapse-item title="设备保管人员情况" name="2">
									<el-form-item v-for="item in keeperInfo" :label="item.label" :key="item.id" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
										<el-input v-model="dataInfo[item.prop]" v-if="item.type=='input'&&item.prop =='KEEPER'" :type="item.type"  :disabled="true">
											<el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="addPeople"></el-button>
										</el-input>
										<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'&&item.prop!='KEEPER'" :disabled="noedit"></el-input>
									</el-form-item>
								</el-collapse-item>

							    <el-collapse-item title="设备溯源信息状态" name="3" v-show="modify">
									<el-table :header-cell-style="rowClass" :fit="true" :data="pmRecordList" row-key="ID" border stripe max-height="260" highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'pmRecordList', order: 'descending'}">
										<el-table-column type="index" sortable label="序号" width="50">
	                                    </el-table-column>
										<el-table-column prop="RECORDNUM" label="溯源记录编号" sortable width="120px">
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
								<el-collapse-item title="文件" name="4">
									<doc-table ref="docTable" :docParm = "docParm"  @saveParent = "save"></doc-table>
								</el-collapse-item>
								
								<!-- 其他信息 -->
								<el-collapse-item title="其他" name="5" v-show="!addtitle">
									<el-form-item v-for="item in otherInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" v-if="item.prop=='DEPARTMENT'" v-show="dept">
										<el-input v-model="dataInfo[item.prop]" :type="item.type" disabled v-if="item.prop=='DEPARTMENT'"></el-input>
									</el-form-item>
									<el-form-item   v-for="item in otherInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}" v-show="views">
										<el-input v-model="dataInfo[item.prop]" :type="item.type" disabled ></el-input>
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
			<!--设备保管人 Begin-->
			<el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
				<el-table :data="userList" border stripe :header-cell-style="rowClass" height="400px" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" v-loadmore="loadMore">
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
				<span slot="footer" class="dialog-footer" v-if="noviews">
	    			<el-button @click="dialogVisible = false">取 消</el-button>
	    			<el-button type="primary" @click="addpeoname()">确 定</el-button>
	  			</span>
			</el-dialog>
			<!--设备保管人 End-->
		</div>
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
				}else{
					callback();
				}
			};
			var validateKeeper = (rule, value, callback) => {//类别
                if (this.dataInfo.KEEPER === undefined || this.dataInfo.KEEPER === '' || this.dataInfo.KEEPER === null) {
                    callback(new Error('必填'));
                }else {
                    callback();
                }
            };
			return {
				loadSign:true,//加载
				commentArr:{},
				docParm: {
					'model': 'new',
					'appname': '',
					'recordid': 1,
					'userid': 1,
					'username': '',
					'deptid': 1,
					'deptfullname': '',
					'appid': 1
				},
				rules: {
					ASSETNUM: [
						{ required: true, message: '请输入设备编号', trigger: 'blur' },
					],
					DESCRIPTION: [
						{ required: true, message: '请输入设备名称', trigger: 'blur' },
					],
					CONFIG_UNIT: [
						{ required: true, message: '请输入配置单位', trigger: 'blur' },
					],
					INS_SITE: [
						{ required: true, message: '请输入安装地点', trigger: 'blur' },
					],
					VENDOR: [
						{ required: true, message: '请输入制造商', trigger: 'blur' },
					],
					MODEL: [
						{ required: true, message: '请输入规格型号', trigger: 'blur' },
					],
					ASSET_KPI: [
						{ required: true, message: '请输入设备状态', trigger: 'blur' },
					],
					OPTION_STATUS: [
						{ required: true, message: '请输入设备使用状态', trigger: 'blur' },
					],
					ISMETER: [
						{ required: true, message: '请选择是否计量器具', trigger: 'blur' },
					],
					ISPM: [
						{ required: true, message: '请选择是否需要溯源', trigger: 'blur' },
					],
					KEEPER: [
						{ required: true,validator: validateKeeper},//设备保管人
					],
					ACCEPT_DATE: [
						{ required: true, message: '请输入接收日期', trigger: 'blur' },
					],
					S_DATE: [
						{ required: true, message: '请输入启用日期', trigger: 'blur' },
					],
					C_ADDRESS: [
						{ required: true, message: '请输入配置地址', trigger: 'blur' },
					],
					A_STATU: [
						{ required: true, message: '请输入接收状态', trigger: 'blur' },
					],
					MODE1: [
						{ required: true, message: '请选择鉴定/校准/验证方式', trigger: 'blur' },
					],
					STATUS: [
						{ required: true, message: '请输入信息状态', trigger: 'blur' },
					],
					A_STATUS: [
						{ required: true, message: '请输入接收状态', trigger: 'blur' },
					],
					A_PRICE: [
						{ validator: checkNum, trigger: 'blur' },
					],
				},
				basicInfo: [
					{
						label: '设备价值',
						prop: 'A_PRICE',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '设备名称',
						prop: 'DESCRIPTION',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '接收日期',
						prop: 'ACCEPT_DATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
                    {
						label: '设备型号',
						prop: 'MODEL',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '配置单位',
						prop: 'CONFIG_UNIT',
						width: '30%',
						type: 'select',
						displayType: 'inline-block'
					},
                    {
						label: '使用日期',
						prop: 'USEDATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
                    {
						label: '技术指标',
						prop: 'ASSET_KPI',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
                    {
						label: '配套设备',
						prop: 'SUPPORT_ASSET',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
                    {
						label: '制造单位',
						prop: 'VENDOR',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '出厂编号',
						prop: 'FACTOR_NUM',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '供货单位',
						prop: 'SUPPLIER',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
                    {
						label: '验收单号',
						prop: 'ACCEPT_NUM',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '使用状态',
						prop: 'OPTION_STATUS',
						width: '30%',
						type: 'input',
						displayType: 'inline-block',
					},
                    {
						label: '计量器具',
						prop: 'ISMETER',
						width: '30%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
								label: '是',
								val: '是'
                            },
                            {
								label: '否',
								val: '否'
                            }
                        ]
					},
                    {
						label: '需要溯源',
						prop: 'ISPM',
						width: '30%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
								label: '是',
								val: '是'
                            },
                            {
								label: '否',
								val: '否'
                            }
                        ]
					},
                    {
						label: '维护方式',
						prop: 'MODE',
						width: '30%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
								label: '外委',
								val: '外委'
                            },
                            {
								label: '自维',
								val: '自维'
                            }
                        ]
					},
					{
						label: '检定/验证',
						prop: 'MODE1',
						width: '30%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
								label: '送检',
								val: '送检'
                            },
                            {
								label: '自检',
								val: '自检'
                            }
                        ]
					},
                    {
						label: '接收状态',
						prop: 'A_STATUS',
						width: '70%',
						type: 'radio',
						displayType: 'inline-block',
                        opts: [
                            {
								label: '全新',
								val: '全新'
                            },
                            {
								label: '已使用过',
								val: '已使用过'
                            },
                            {
								label: '改装过',
								val: '改装过'
                            },
                            {
								label: '大修过',
								val: '大修过'
                            }
                        ]
					},
					{
						label: '设备状态',
						prop: 'STATE',
						width: '70%',
						type: 'radio',
						 opts: [
                            {
								label: '启用',
								val: '1'
                            },
                            {
								label: '封存',
								val: '2'
                            },
                            {
								label: '报废',
								val: '3'
                            }
                        ],
						displayType: 'inline-block',
					},
					{
						label: '配置地址',
						prop: 'C_ADDRESS',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
					{
						label: '设备分类',
						prop: 'TYPE',
						width: '30%',
						type: 'radio',
						 opts: [
                            {
								label: '仪器',
								val: '仪器'
                            },
                            {
								label: '量具',
								val: '量具'
                            }
                        ],
						displayType: 'inline-block'
					},
					{
						label: '安装地点',
						prop: 'INS_SITE',
						width: '30%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '启用日期',
						prop: 'S_DATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block'
					},
                    {
						label: '技术资料',
						prop: 'TECHNICAL_DATA',
						width: '100%',
						type: 'textarea',
						displayType: 'inline-block'
					},
				],
				keeperInfo: [
					{
						label: '设备保管人',
						prop: 'KEEPER',
						width: '50%',
						type: 'input',
						displayType: 'inline-block'
					},
					{
						label: '备注',
						prop: 'MEMO',
						width: '50%',
						type: 'input',
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
				activeNames: ['1', '2','3','4'], //手风琴数量
				// dialogVisible: false, //对话框
				modify: false,
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
					'ID': '',  //主键ID，必填但页面没有字段
					'ASSETNUM': '',
					'DESCRIPTION': '',
					'CONFIG_UNIT': '',
					'INS_SITE': '',
					'SUPPORT_ASSET': '',
					'VENDOR': '',
					'SUPPLIER': '',	
					'MODEL': '',
					'FACTOR_NUM': '',
					'ASSET_KPI': '',
					'STATE': '',    //设备状态，必填但页面没有字段
					'OPTION_STATUS': '',   
					'TYPE': '', 
					'ACCEPT_NUM': '',
					'ISMETER': '',
					'ISPM': '',
					'STATUSDATE': '',
					'KEEPER': '',
					'ACCEPT_DATE': '',
					'S_DATE': '',   
					'C_ADDRESS': '',  
					'A_STATUS': '',
					'A_PRICE': '',
					'MODE': '',
					'MODE1': '',
					'CHANGEBY': '',	
					'CHANGEDATE': '',	
					'ENTERBY': '',
					'ENTERDATE': '',	
					'DEPTID': '',	
					'MEMO': '',	
					'STATUS': '1',
					'SYNCHRONIZATION_TIME': '',
				},
				pmRecordList: [],
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
				falg:false,
				dialogVisible:false,//设备管理人
				userList:[],
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				selectData:[]
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			handlePrice(){
				this.dataInfo.A_PRICE = parseFloat(this.dataInfo.A_PRICE).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				console.log(this.dataInfo.A_PRICE);
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
			addPeople(){
				console.log(123);
				this.$emit('request');
				this.dialogVisible = true;
			},
			addpeoname(){
				if(this.selUser.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selUser.length > 1){
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
				}else{
					this.dataInfo.KEEPER = this.selUser[0].nickname;
					this.dialogVisible = false;
				}
				this.$emit('request');
			},
			SelChange(val) {
				this.selUser = val;
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
				//				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				//				this.requestData();
			},
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			getUser(opt){
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url,{}).then((res) => {
					if(opt == 'new'){
                        // this.dataInfo.CHANGEBY = res.data.username;
						// this.dataInfo.CHANGEDATE = this.getToday();
						this.dataInfo.DEPTID = res.data.deptId;
						this.dataInfo.ENTERBY = res.data.id;
				        this.dataInfo.ENTERDATE = this.getToday();
						// this.dataInfo.DEPARTMENT = res.data.deptName;
					}else{
						this.dataInfo.DEPTID = res.data.deptId;//传给后台机构id
						this.dataInfo.CHANGEBY = res.data.id;
						this.dataInfo.CHANGEDATE = this.getToday();
					}

					this.docParm.userid = res.data.id;
					this.docParm.username = res.data.username;
					this.docParm.deptid = res.data.deptId;
					this.docParm.deptfullname = res.data.deptName;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			getToday(){
				var date = new Date();
				var str = date.getFullYear() + '-' + date.getMonth() + '-'+ date.getDate();
				return str;
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
						message: '网络错误，请重试',
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
				this.show = true;

				this.docParm = {
					'model': 'new',
					'appname': '仪器和计量器具',
					'recordid': 1,
					'appid': 47
				};
				this.getUser('new');
			},
			// 这里是修改
			detail(dataid) {
				this.dataInfo = this.detailData;
				this.handlePrice();
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
				
				this.getUser();
				var _this = this;
				setTimeout(function(){
					_this.docParm.model = 'edit';
					_this.docParm.appname = '仪器和计量器具';
					_this.docParm.recordid = _this.dataInfo.ID;
					_this.docParm.appid = 47;
					_this.$refs.docTable.getData();
				},100);

				this.show = true;
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
				this.mview = true;
				this.noviews = false;//按钮
				this.dataInfo = data;
				this.show = true;				
			},
			//点击关闭按钮
			close() {
				this.reset();
				this.$emit('request');
				this.show = false;
			},
			reset(){
				this.dataInfo =  {
					'ID': '', 
					'ASSETNUM': '',
					'DESCRIPTION': '',
					'CONFIG_UNIT': '',
					'INS_SITE': '',
					'SUPPORT_ASSET': '',
					'VENDOR': '',
					'SUPPLIER': '',	
					'MODEL': '',
					'FACTOR_NUM': '',
					'ASSET_KPI': '',
					'STATE': '',   
					'OPTION_STATUS': '',   
					'TYPE': '', 
					'ACCEPT_NUM': '',
					'ISMETER': '',
					'ISPM': '',
					'STATUSDATE': '',
					'KEEPER': '',
					'ACCEPT_DATE': '',
					'S_DATE': '',   
					'C_ADDRESS': '',  
					'A_STATUS': '',
					'A_PRICE': '',
					'MODE': '',
					'MODE1': '',
					'CHANGEBY': '',	
					'CHANGEDATE': '',	
					'ENTERBY': '',
					'ENTERDATE': '',	
					'DEPARTMENT': '',	
					'MEMO': '',	
					'STATUS': '1',
					'SYNCHRONIZATION_TIME': '',
				};
				//this.$refs['dataInfo'].resetFields();
				// this.show = false;
			},
			toggle(e) { //大弹出框大小切换
				if(this.isok1) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			maxDialog(e) { //定义大弹出框一个默认大小
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);
				$(".mask_div").css("top", "60px");
			},

			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("top", "100px");
			},

			save(opt) {
				var _this = this;
				var url = this.basic_url + '/api-apps/app/asset/saveOrUpdate';
				this.$refs['dataInfo'].validate((valid) => {
					if(!valid && opt == 'docUpload'){
						this.$message({
							message: '请先正确填写信息，再进行文档上传',
							type: 'warning'
						});
					}
					if (valid) {
						this.$axios.post(url, _this.dataInfo).then((res) => {
							if(res.data.resp_code == 0) {
								if(opt == 'docUpload'){
									this.docParm.recordid = res.data.datas.id;
									this.docParm.model = 'edit';
									this.$refs.docTable.autoLoad();
									this.dataInfo.ID = res.data.datas.id;
								}else{
									this.$message({
										message: '保存成功',
										type: 'success',
									});
									this.$emit('request');
									this.reset();
								}
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试',
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
			requestData(index) {//高级查询字段
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
				};
				this.$axios.get(this.basic_url + '/api-user/users', {
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

					this.userList = newarr;
				}).catch((wrong) => {})
				
			},
		},
		mounted() {
			this.requestData();
			this.getCompany();
		},

	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
	#cost{
		text-align: right !important;
	}
</style>