<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="pageState=='new'">添加领样</div>
					<div class="mask_title" v-show="pageState=='detail'">修改领样</div>
					<div class="mask_title" v-show="pageState=='view'">查看领样</div>
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
					<el-form inline-message 
					         :model="samplesForm" 
							 :label-position="labelPosition" 
							 :rules="rules" 
							 ref="samplesForm" 
							 label-width="100px" 
							 status-icon>
						<div class="accordion">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="基础信息" name="1">
									<el-row :gutter="20" class="pb10">
										<el-col :span="4" class="pull-right">
											<el-input v-model="samplesForm.STATEDesc" :disabled="true">
												<template slot="prepend">状态</template>
											</el-input>
										</el-col>
										<el-col :span="6" class="pull-right">
											<el-form-item label="样品类型" prop="ITEM_TYPE">
												<el-select v-model="samplesForm.ITEM_TYPE" placeholder="样品类型" :disabled="sampleAutoInput || noedit">
													<el-option key="1" label="样品批次" value="1"></el-option>
													<el-option key="2" label="样品序号" value="2"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<!-- <el-col :span="6" class="pull-right">
											<el-select v-model="sampleInput" placeholder="选择输入方式" disabled>
												<el-option key="1" label="手动输入" value="1"></el-option>
												<el-option key="2" label="扫码枪输入" value="2"></el-option>
											</el-select>
										</el-col> -->
									</el-row>

									<el-row >
										<el-col :span="8">
											<el-form-item label="产品类别" prop="TYPE">
												<el-input v-model="samplesForm.TYPE" disabled></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<!-- @input="getCodeInfo" -->
											<el-form-item label="样品编号" prop="ITEMNUM">
												<el-input id="itemnumId" v-model="samplesForm.ITEMNUM" @keyup.native="showInfo($event)" :disabled="noedit"></el-input>
												<!-- <input type="text" id="itemNumInput"@keyup="getnumcode($event)" /> -->
											</el-form-item>
											<!-- <input type="text" name="fname" id="idtest"/> -->
										</el-col>
										<el-col :span="8" v-if="samplesForm.ITEM_TYPE=='2'">
											<el-form-item label="样品序号" prop="ITEM_STEPs">
												 <!-- @input="getCodeInfo" -->
												<el-select v-model="ITEM_STEPs" 
														   multiple 
														   @change="showQuality"
														   :disabled="noedit">
													<el-option
														v-for="item in sampleList"
														:key="item.item_step"
														:label="item.item_step"
														:value="item.item_step">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="样品名称" prop="DESCRIPTION">
												<el-input v-model="samplesForm.DESCRIPTION" disabled></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="型号" prop="MODEL">
												<el-input v-model="samplesForm.MODEL"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="数量" prop="QUALITY">
												<el-input-number v-model="samplesForm.QUALITY" :min="0" :max="maxNum" :disabled="noedit || samplesForm.ITEM_TYPE=='2'" v-show="isQualityNum" style="width: 100%"></el-input-number>
												<el-input v-model="samplesForm.QUALITY" :disabled="noedit || samplesForm.ITEM_TYPE=='2'" style="width: 100%" v-show="!isQualityNum"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="样品接收状态">
												<el-radio-group v-model="samplesForm.ITEM_RECEPT_STATUS" :disabled="noedit">
													<el-radio label="1">外观正常</el-radio>
													<el-radio label="2">异常</el-radio>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="领样人" prop="GRANT_PERSONDesc">
												<el-input v-model="samplesForm.GRANT_PERSONDesc" :disabled="true">
													<el-button slot="append" icon="el-icon-search" @click="getReceive" :disabled="noedit"></el-button>
												</el-input>
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
												<el-input type="textarea" rows="5" v-model="samplesForm.MEMO" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="其他" name="3" v-show="pageState=='view'">
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
											<el-form-item label="修改人" prop="CHANGEBYDesc" label-width="110px">
												<el-input v-model="samplesForm.CHANGEBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" label-width="110px">
												<el-input v-model="samplesForm.CHANGEDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="content-footer" v-if="pageState != 'view'">
							<el-button type="primary" @click="saveAndSubmit">保存</el-button>
							<el-button type="success" @click="saveAndUpdate">保存并继续</el-button>
							<el-button @click="close">取消</el-button> 
						</div>
					</el-form>
				</div>
			</div>
		</div>
		<usermask :tit="userMakeTit" @getSelData="getUserData" ref="usermask" ></usermask>
	</div>
</template>

<script>
import Config from '../../config.js'
import usermask from'../common/common_mask/currentUserMask.vue'
	export default {
		name: 'collarsample_mask',
		components: {
			'usermask': usermask
		},
		// props: {
		// 	samplesForm: { //接收主表单中填写的数据信息
		// 		type: Object,
		// 		default: function() {
		// 			return {
		// 				ITEMNUM: '',//样品子表ID
		// 				ITEM_TYPE: [],
		// 				ITEM_STEPs: [],//样品序号
		// 				TYPE: '',//样品类别
		// 				VENDOR: '',//样品编号编号
		// 				DESCRIPTION: '',//样品名称
		// 				MODEL: '',//型号
		// 				QUATITY: '',//数量
		// 				PRODUCT_CODE: '',//产品标识代码
		// 				OTHER: '',//其他资料
		// 				MEMO: '',//备注
		// 				ACCEPTDATE: '',//入库时间
		// 				ACCEPT_PERSON: '',//收样人
		// 				ACCEPT_DATE: '',//收样日期
		// 				GRANT_PERSONDesc: '',//领样人
		// 				GRANT_PERSON: '',//领样人
		// 				GRANT_DATE: '',//领样日期
		// 				STATE: '',//状态
		// 				STATUSDATE: '',//状态日期
		// 				ENTERBY: '',//录入人
		// 				ENTERDATE: '',//录入时间
		// 				CHANGEBY: '',//修改人
		// 				CHANGEDATE: '',//修改时间
		// 				STATUS: '1',//信息状态
		// 			}
		// 		}
		// 	}
		// },
		data() {
			return {
				userMakeTit: '领样人',
				maxNum: 100,
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				selectData: [], //获取检验/检测方法类别
				fullHeight: document.documentElement.clientHeight - 210 + 'px', //获取浏览器高度
				selMenu:[],
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				dialogVisible1: false, //对话框
				edit: true, //禁填
				activeNames: ['1','2'], //手风琴数量
				labelPosition: 'right', //表单标题在上方
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
					ITEM_TYPE: [//样品编号
						{ required: true, message: '必填', trigger: 'change' }
					],
					ITEMNUM: [//样品编号
						{ required: true, message: '必填', trigger: 'change' }
					],
					DESCRIPTION: [//样品名称
						{ required: true, message: '必填', trigger: 'change' }
					],
					TYPE: [//类别
						{ required: true, message: '必填', trigger: 'change' }
					],
					// MODEL: [//型号
					// 	{ required: false, message: '必填', trigger: 'change' },
					// 	{trigger: 'blur', validator: this.Validators.isSpecificKey}
					// ],
					// QUALITY: [//数量
					// 	{ required: true, message: '必填', trigger: 'blur' },
					// 	{trigger: 'blur', validator: this.Validators.isInteger}
					// ],
					// ACCEPT_PERSON: [//收样人
					// 	{ required: false, message: '必填', trigger: 'change' },
					// 	{trigger: 'blur', validator: this.Validators.isNickname}
					// ],
					ACCEPT_DATE: [
						{required: true, message: '请选择', trigger: 'change' }
					],
					GRANT_DATE: [
						{ required: true, message: '请选择', trigger: 'change' }
					],
					GRANT_PERSONDesc: [
						{ required: true, message: '必填', trigger: 'change'}
					],
					OTHER: [
						{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey}
					],
					MEMO: [
						{ required: false, trigger: 'blur', validator: this.Validators.isSpecificKey}
					],
				},
				dialogVisible3: false, //对话框
				categoryList:[],
				selUser:[],
				dialogVisible2:false,//显隐样品编号数据弹出框
				samplenumList:[],//样品序号
				page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				sampleList: [],
				samplesList:[],//样品编号
				firstItem: true,
				isQualityNum: false,
				beforeItemNum: '',
				ITEM_STEPs: [],
				lastTime: 0,
				noedit: false,
				samplesForm: {
					ITEMNUM: '',//样品子表ID
						ITEM_TYPE: '',
						ITEM_STEPs: [],//样品序号
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
						GRANT_PERSONDesc: '',//领样人
						GRANT_PERSON: '',//领样人
						GRANT_DATE: '',//领样日期
						STATE: 1,//状态
						STATUSDATE: '',//状态日期
						ENTERBY: '',//录入人
						ENTERDATE: '',//录入时间
						CHANGEBY: '',//修改人
						CHANGEDATE: '',//修改时间
						STATUS: '1',//信息状态
				},
				sampleAutoInput: false //扫描枪输入
			};
		},
		watch:{
			'samplesForm.ITEMNUM': {
				handler(val,oldVal){
					this.samplesForm.ITEMNUM = val;
				},
				deep: true
			}
		},
		methods: {
			showInfo(e){
				if(e.keyCode == '13' || e.keyCode == '86'){
					var str = this.samplesForm.ITEMNUM;
					if(str.indexOf('#')!=-1){
						this.sampleAutoInput = true;
						this.getCodeInfo();
					}else{
						this.sampleAutoInput = false;
						this.getSampleList(str);
						this.getSampleObj(str);
					}
				}
			},
			getSampleObj(itemnum){
				var url = this.basic_url + '/api-apps/app/item';
				var data = {
					ITEMNUM: itemnum
				};
				this.$axios.get(url,{
					params: data
				}).then((res) => {
					if(res.data.data.length > 0){	
						var data = res.data.data[0];
						if(data.PROXYNUM==''){
							this.$message({
								message: '此样品编号未绑定委托书，暂无可领样样品！',
								type: 'warning'
							});
							return;
						}
						this.$forceUpdate();
						if(/.*[\u4e00-\u9fa5]+.*$/.test(data.QUATITY)){
							this.isQualityNum = false;
						}else{
							this.isQualityNum = true;
						}
						if(data.ISRECEIVE == '1'){
							this.samplesForm.ITEM_TYPE = data.ITEM_TYPE;
							this.sampleAutoInput = true;
						}
						
						this.samplesForm.TYPE = data.PRODUCT_TYPE;
						this.samplesForm.PRODUCT = data.PRODUCT;

						this.samplesForm.PRO_NUM = data.PRO_NUM;
						this.samplesForm.P_NUM = data.P_NUM;

						this.samplesForm.DESCRIPTION = data.DESCRIPTION;
						this.samplesForm.ACCEPT_DATE = data.ACCEPT_DATE;
						this.samplesForm.MODEL = data.MODEL;
						
						this.samplesForm.PRO_NUM = data.PRO_NUM;
						this.samplesForm.P_NUM = data.P_NUM;

						
					}else{
						this.$message({
							message: '暂无可领样样品！',
							type: 'warning'
						});
						this.$forceUpdate();
						this.resetSamples();
					}
				}).catch((wrong) => {})
			},
			getUserData(data){
				this.$forceUpdate();
				this.samplesForm.GRANT_PERSON = data.id;
				this.samplesForm.GRANT_PERSONDesc = data.nickname;
			},
			// removeStep(){
			// 	this.samplesForm.QUALITY--;
			// },
			showQuality(){
				this.samplesForm.QUALITY = this.ITEM_STEPs.length;
			},
			getCodeInfo(){
				if(this.samplesForm.ITEMNUM !== ''){
					var sample = {};
					var str = this.samplesForm.ITEMNUM;
					if(str.indexOf('#')!=-1){
						var sampleObj = str.split('#');
							sample = {
								code: sampleObj[0],
								step: sampleObj[1]
							};
						this.sampleAutoInput = true;
					}else{
						sample.code = this.samplesForm.ITEMNUM;
						this.sampleAutoInput = false;
					}
					
					//记录第一次扫描编号
					if(this.firstItem){
						this.beforeItemNum = sample.code;
						this.firstItem = false;
					}
					//判断两次扫码编号是否一致
					if(this.beforeItemNum != sample.code){
						this.$nextTick(()=> {
							this.samplesForm.ITEMNUM = this.beforeItemNum;
						});
						this.$message({
							message: '不是同一批次！',
							type: 'warning'
						});
						return;
					}
					this.$nextTick(()=> {
						this.samplesForm.ITEMNUM = sample.code;
					});
					//判断是不是已经添加
					if(!!sample.step && !!this.ITEM_STEPs && this.ITEM_STEPs.indexOf(sample.step)!='-1'){
						this.$message({
							message: '已添加！',
							type: 'warning'
						});
						return;
					}
					var url = this.basic_url + '/api-apps/appCustom/isRelateProxy';
					var data ={
						itemNum: sample.code,
						app:'itemGrant',
						ITEM_STEP: ''
					}
					
					if(!!sample.step){
						data.ITEM_STEP = sample.step;
					}
					this.$axios.get(url,{
						params: data
					}).then((res) => {
						if(JSON.stringify(res.data)!='{}'){
							var data = res.data;
							if(data.REMAINQUALITY == 0){
								this.$message({
									message: '暂无可领样样品！',
									type: 'warning'
								});
								return;
							}
							if(/.*[\u4e00-\u9fa5]+.*$/.test(data.QUALITY)){
								this.isQualityNum = false;
							}else{
								this.isQualityNum = true;
							}
							if(data.ITEM_TYPE == '1'){
								this.samplesForm.QUALITY = 1;
								this.maxNum = data.REMAINQUALITY;
							}else{
								if(this.sampleList.length == 0){
									this.getSampleList(sample.code);
								}
								if(!!sample.step){
									this.ITEM_STEPs.push(sample.step);
									this.samplesForm.QUALITY = this.ITEM_STEPs.length;
								}
							}
							this.$forceUpdate();
							this.samplesForm.TYPE = data.PRODUCT_TYPE;
							this.samplesForm.PRODUCT = data.PRODUCT;

							this.samplesForm.PRO_NUM = data.PRO_NUM;
							this.samplesForm.P_NUM = data.P_NUM;

							this.samplesForm.DESCRIPTION = data.DESCRIPTION;
							this.samplesForm.ACCEPT_DATE = data.ACCEPT_DATE;
							this.samplesForm.MODEL = data.MODEL;
							this.samplesForm.ITEM_TYPE = data.ITEM_TYPE;
							this.samplesForm.PRO_NUM = data.PRO_NUM;
							this.samplesForm.P_NUM = data.P_NUM;
						}else{
							this.$message({
								message: '暂无可领样样品！',
								type: 'warning'
							});
							this.$forceUpdate();
							this.resetSamples();
						}
					}).catch((wrong) => {})
				}else{
					this.$forceUpdate();
					this.resetSamples();
				}
			},
			getSampleList(id){
				this.$axios.get(this.basic_url + '/api-apps/appCustom/getAddItem/' + id, {}).then((res) => {
					this.sampleList = res.data;
					if(this.pageState == 'detail'){
						for(var i=0; i<this.ITEM_STEPs.length; i++){
							this.sampleList.push({
								item_step:this.ITEM_STEPs[i]
							});
						}
					}
				}).catch((err) => {});
			},
			resetSamples(){
				this.ITEM_STEPs = [];
				this.firstItem = true;
				this.beforeItemNum = '';
				this.samplesForm = {};
				this.sampleList = [];

				this.samplesForm.TYPE = '';
				this.samplesForm.DESCRIPTION = '';
				this.samplesForm.ACCEPT_DATE = '';
				this.samplesForm.MODEL = '';
				this.samplesForm.ITEM_TYPE = '1';
				this.samplesForm.QUALITY = 0;
				
				this.maxNum = 1000;
				this.lastTime = 0;
			},
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			getCheckedNodes() { //小弹出框获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},
			//这是查看
			view(dataid) {
				this.pageState = 'view';
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.samplesForm.CHANGEBY = res.data.id;
					var date=new Date();
					this.samplesForm.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{})
				this.$axios.get(this.basic_url + '/api-apps/app/itemgrant/' + dataid, {}).then((res) => {
					this.samplesForm = res.data;
					this.$forceUpdate();
					if(this.samplesForm.ITEM_STEP!=-1){
						this.ITEM_STEPs = this.samplesForm.ITEM_STEP.split(',');
					}else{
						this.getMaxNum(this.samplesForm.ITEM_NUM,this.samplesForm.QUATITY);
					}
					this.getSampleList(this.samplesForm.ITEM_NUM);
				}).catch((err) => {});
				this.edit = true;
				this.noedit = true;
				this.show=true;
				this.ITEM_STEPs = !!this.samplesForm.ITEM_STEP?this.samplesForm.ITEM_STEP.split(','):[];
			},
			childMethods() {
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.samplesForm.DEPTID = res.data.deptId;
					this.samplesForm.ENTERBY = res.data.id;
					var date=new Date();
					this.samplesForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
					this.samplesForm.STATUSDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
					this.samplesForm.GRANT_DATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{})
				this.pageState = 'new';
            	this.show = true;
            	this.edit = true;
				this.noedit = false;
			},
			getMaxNum(itemnum,QUATITY){
				var url = this.basic_url + '/api-apps/appCustom/isRelateProxy';
				var data ={
					itemNum: itemnum,
					app:'itemGrant',
					ITEM_STEP: ''
				}
		
				this.$axios.get(url,{
					params: data
				}).then((res) => {
					if(JSON.stringify(res.data)!='{}'){
						var data = res.data;
						this.maxNum = QUATITY + data.REMAINQUALITY;
					}else{
						this.maxNum = QUATITY;
					}
				}).catch((wrong) => {})
			},
			detail(dataid) { //修改内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.samplesForm.CHANGEBY = res.data.id;
					var date=new Date();
					this.samplesForm.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{})
				this.$axios.get(this.basic_url + '/api-apps/app/itemgrant/' + dataid, {}).then((res) => {
					this.samplesForm = res.data;
					this.$forceUpdate();
					if(this.samplesForm.ITEM_STEP!=-1){
						this.ITEM_STEPs = this.samplesForm.ITEM_STEP.split(',');
					}else{
						this.getMaxNum(this.samplesForm.ITEM_NUM,this.samplesForm.QUATITY);
					}
					this.getSampleList(this.samplesForm.ITEM_NUM);
				}).catch((err) => {});
				this.pageState = 'detail';
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
			//收样人
			getReceive(){
				this.$refs.usermask.requestData(this.samplesForm.deptId);
			},
			//点击关闭按钮
			close() {
				this.show = false;
				this.resetSamples();
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
				$(".mask_div").height(document.body.clientHeight - 70);

			},
			//还原按钮
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
			},
			//点击提交按钮执行保存
			save(opt) {
				this.$refs.samplesForm.validate((valid) => {
					if (valid) {
						if(this.isQualityNum){
							if(this.samplesForm.QUALITY == 0){
								this.$message({
									message: '数量为零，不可保存！',
									type: 'warning'
								});
								return;
							}
						}
						
						if(this.samplesForm.ITEM_TYPE == '2'){
							this.samplesForm.ITEM_STEP = this.ITEM_STEPs.join(',');
						}
						var url = this.basic_url + '/api-apps/app/itemgrant/saveOrUpdate';
						this.$axios.post(url, this.samplesForm).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.falg = true;
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//重新加载数据
								if(opt == 'save'){
									this.show = false;
									this.$emit('request');
								}
								this.$emit('reset');
								this.$refs["samplesForm"].resetFields();
							}else{
								this.$message({
									message: res.data.resp_msg,
									type: 'error'
								});
							}
						}).catch((err) => {
						});
						
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
				this.save('update');
			},
			saveAndSubmit(){
				this.save('save');
			},
			getnumcode(e){
			}
		},
		mounted() {
		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>