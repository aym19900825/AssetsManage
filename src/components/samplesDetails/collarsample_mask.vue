<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加领样</div>
				<div class="mask_title" v-show="modifytitle">修改领样</div>
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
				<el-form :model="samplesForm" :label-position="labelPosition" :rules="rules" ref="samplesForm" label-width="100px" status-icon>
					<div class="accordion">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="基础信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="4" class="pull-right">
										<el-input v-model="samplesForm.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
									<el-col :span="4" class="pull-right">
										<el-input type="number" v-model.number="samplesForm.STATE" :disabled="true">
											<template slot="prepend">状态</template>
										</el-input>
									</el-col>
									<el-col :span="6" class="pull-right">
										<el-input placeholder="自动获取" v-model="samplesForm.ITEMNUM" :disabled="true">
											<template slot="prepend">样品序号</template>
										</el-input>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="样品子表ID" prop="ITEM_LINE_ID">
											<el-input v-model="samplesForm.ITEM_LINE_ID" :disabled="true">
												<el-button slot="append" icon="el-icon-search" @click="getProxy"></el-button>
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
											<el-select v-model="samplesForm.TYPE" placeholder="请选择类别" style="width: 100%;">
												<el-option v-for="(data,index) in selectData" :key="index" :value="data.code" :label="data.name"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="型号" prop="MODEL">
											<el-input v-model="samplesForm.MODEL"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="数量" prop="QUALITY">
											<el-input-number v-model="samplesForm.QUALITY" :min="1" :step="5" :max="100" label="描述文字" style="width: 100%"></el-input-number>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="状态日期" prop="STATUSDATE">
											<el-input v-model="samplesForm.STATUSDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="收样人" prop="ACCEPT_PERSON">
											<el-input v-model="samplesForm.ACCEPT_PERSON"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="收样日期" prop="ACCEPT_DATE">
											<el-date-picker v-model="samplesForm.ACCEPT_DATE" type="date" placeholder="请选择收样日期" value-format="yyyy-MM-dd" style="width: 100%;">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="领样人" prop="GRANT_PERSON">
											<el-input v-model="samplesForm.GRANT_PERSON"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="领样日期" prop="GRANT_DATE">
											<el-date-picker v-model="samplesForm.GRANT_DATE" type="date" placeholder="请选择领样日期" value-format="yyyy-MM-dd" style="width: 100%;">
											</el-date-picker>
										</el-form-item>
									</el-col>
									
								</el-row>

								<el-row :gutter="30">
									<el-col :span="24">
										<el-form-item label="其他资料" prop="OTHER">
											<el-input v-model="samplesForm.OTHER"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="备注" prop="MEMO">
											<el-input type="textarea" rows="5" v-model="samplesForm.MEMO"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="录入人">
											<el-input v-model="samplesForm.ENTERBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间">
											<el-input v-model="samplesForm.ENTERDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30" v-if="modify">
									<el-col :span="8">
										<el-form-item label="修改人">
											<el-input v-model="samplesForm.CHANGEBY" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改日期">
											<el-input v-model="samplesForm.CHANGEDATE" :disabled="true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
							
						</el-collapse>
					</div>
					<div class="content-footer">
						<el-form-item>
							<button @click="cancelForm" class="btn btn-default btn-large">取消</button>
							<button type="primary" class="btn btn-primarys btn-large" @click="submitForm('samplesForm')">提交</button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
		<!--点击委托书编号弹出框 Begin-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @check-change="handleCheckChange">
			</el-tree>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="dailogconfirm();" >确 定</el-button>
		    </span>
		</el-dialog>
		<!--点击委托书编号弹出框 Begin-->
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
						ITEM_LINE_ID: '',//样品子表ID
						ITEMNUM: '',//样品编号
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
			return {
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
				selMenu:[],
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				dialogVisible: false, //对话框
				edit: true, //禁填
				activeNames: ['1'], //手风琴数量
				labelPosition: 'right', //表单标题在上方
				addtitle: true,
				modifytitle: false,
				
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
					ITEM_LINE_ID: [
						{ required: true, message: '请选择样品子表ID', trigger: 'blur' }
					],
					DESCRIPTION: [
						{ required: true, message: '请填写样品名称', trigger: 'blur' }
					],
					TYPE: [
						{ required: true, message: '请选择类别', trigger: 'change' }
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
			};
		},
		methods: {
			//获取委托书编号数据
			getProxy() {
				this.editSearch = 'dept';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data;
					this.dialogVisible = true;
				});
			},
			//选择委托书编号节点
			handleCheckChange(data, checked, indeterminate) {
				this.getCheckboxData = data;
			},
			dailogconfirm() { //委托书编号小弹出框确认按钮事件
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.samplesForm.ITEM_LINE_ID = this.getCheckboxData.id;
					this.samplesForm.DESCRIPTION = this.getCheckboxData.fullname;
				} else {
					this.samplesForm.ITEM_LINE_ID = this.getCheckboxData.id;
					this.samplesForm.DESCRIPTION = this.getCheckboxData.fullname;
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
			childMethods() {//添加内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					console.log(res);
					this.samplesForm.ENTERBY=res.data.nickname;
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
            	this.show = !this.show;
			},
			detail() { //修改内容时从父组件带过来的
				this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.samplesForm.CHANGEBY=res.data.nickname;
					var date=new Date();
					this.samplesForm.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.samplesForm.STATUS=this.samplesForm.STATUS=="1"?'活动':'不活动';
				this.show = true;
			},

			
			judge(data) {//taxStatus 信息状态布尔值
				return data.enabled ? '活动' : '不活动'
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
			},
			cancelForm() {
				this.show = false;
				this.reset();
			},
			reset() {
				this.show = false;
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
			//点击提交按钮执行保存
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
					    this.samplesForm.STATUS=this.samplesForm.STATUS=="活动" ? '1' : '0';
						var url = this.basic_url + '/api-apps/app/itemgrant/saveOrUpdate';
						this.samplesForm.VERSION = this.samplesForm.VERSION + 1;//修改时版本+1
						this.$axios.post(url, this.samplesForm).then((res) => {
							//console.log(res);
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
					} else {
						return false;
					}
				});

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
		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>