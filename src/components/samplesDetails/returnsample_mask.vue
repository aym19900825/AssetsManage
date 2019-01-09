<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加返样</div>
				<div class="mask_title" v-show="modifytitle">修改返样</div>
				<div class="mask_title" v-show="viewtitle">查看返样</div>
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
				<el-form :model="samplesForm" :label-position="labelPosition" :rules="rules" ref="samplesForm" label-width="110" status-icon inline-message>
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
										<el-input placeholder="自动获取" v-model="samplesForm.ITEMNUM" :disabled="edit">
											<template slot="prepend">样品序号</template>
										</el-input>
									</el-col>
								</el-row>

								<el-row>
									<!-- <el-col :span="8">
										<el-form-item label="样品子表ID" prop="ITEM_LINE_ID">
											<el-input v-model="samplesForm.ITEM_LINE_ID" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getProxy"></el-button>
											</el-input>
										</el-form-item>
									</el-col> -->
									<el-col :span="8">
										<el-form-item label="样品编号" prop="ITEM_LINE_ID">
											<el-input v-model="samplesForm.ITEM_LINE_ID" :disabled="edit">
												<el-button slot="append" icon="el-icon-search" @click="getProxy"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="数量" prop="QUALITY">
											<el-input-number v-model="samplesForm.QUALITY" :min="1" :step="5" :max="100" label="描述文字" style="width: 100%" :disabled="noedit"></el-input-number>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="收回入库时间" prop="ACCEPT_DATE">
											<el-input v-model="samplesForm.ACCEPT_DATE" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col :span="8">
										<el-form-item label="样品承接人" prop="ACCEPT_PERSON">
											<el-input v-model="samplesForm.ACCEPT_PERSON" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="处理批准人" prop="APPR_PERSON">
											<el-input v-model="samplesForm.APPR_PERSON" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="批准日期" prop="APPR_DATE">
											<el-date-picker v-model="samplesForm.APPR_DATE" type="date" placeholder="请选择批准日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col :span="8">
										<el-form-item label="处理人" prop="DO_PERSON">
											<el-input v-model="samplesForm.DO_PERSON" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="处理日期" prop="DO_DATE">
											<el-date-picker v-model="samplesForm.DO_DATE" type="date" placeholder="请选择处理日期" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
											</el-date-picker>
										</el-form-item>
									</el-col>
									
								</el-row>

								<el-row>
									<el-col :span="24">
										<el-form-item label="备注" prop="MEMO">
											<el-input type="textarea" rows="5" v-model="samplesForm.MEMO" :disabled="noedit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
							<el-collapse-item title="其他" name="2" v-show="views">
								<el-row >
									<el-col :span="8">
										<el-form-item label="录入人" prop="ENTERBY" label-width="110">
											<el-input v-model="samplesForm.ENTERBY" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE" label-width="110">
											<el-input v-model="samplesForm.ENTERDATE" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入人机构" prop="DEPARTMENT" label-width="110">
											<el-input v-model="samplesForm.DEPARTMENT" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
									<el-col :span="8">
										<el-form-item label="修改人">
											<el-input v-model="samplesForm.CHANGEBY" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改日期">
											<el-input v-model="samplesForm.CHANGEDATE" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="content-footer"  v-show="noviews">
						<el-button type="primary" @click="saveAndUpdate('samplesForm')">保存</el-button>
						<el-button type="success" @click="saveAndSubmit('samplesForm')">保存并继续</el-button>
						<el-button @click="close">取消</el-button>     
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
		props: ['samplesForm','page'],
//		props: {
//			page: {
//				type: Object,
//			},
			
			
//			samplesForm: { //接收主表单中填写的数据信息
//				type: Object,
//				default: function() {
//					return {
//						ITEM_LINE_ID: '',//样品子表ID
//						ITEMNUM: '',//样品序号
//						QUALITY: '',//数量
//						ACCEPT_DATE: '',//收回入库时间
//						ACCEPT_PERSON: '',//样品承接人
//						APPR_PERSON: '',//处理批准人
//						APPR_DATE: '',//批准日期
//						DO_PERSON: '',//处理人
//						DO_DATE: '',//处理日期
//						MEMO: '',//备注
//						STATE: '',//状态
//						STATUS: '',//信息状态
//						ENTERBY: '',//录入人
//						ENTERDATE: '',//录入时间
//						CHANGEBY: '',//修改人
//						CHANGEDATE: '',//修改时间
//					}
//				}
//			}
//		},
		data() {
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
				views: false,
				noviews: true, //保存的按钮
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
					// ITEM_LINE_ID: [
					// 	{ required: true, message: '请选择样品子表ID', trigger: 'blur' }
					// ],
					ACCEPT_PERSON: [
						{ required: true, message: '请填写样品承接人', trigger: 'blur' }
					],
					ACCEPT_DATE: [
						{ required: true, message: '批准日期不能为空', trigger: 'blur' }
					],
					APPR_PERSON: [
						{ required: true, message: '请填写处理批准人', trigger: 'blur' }
					],
					APPR_DATE: [
						{ required: true, message: '请选择类别', trigger: 'change' }
					],
					QUALITY: [
						{ required: true, message: '请填写数量', trigger: 'blur' }
					],
					DO_PERSON: [
						{ required: true, message: '处理人不能为空', trigger: 'blur' }
					],
					DO_DATE: [
						{ required: true, message: '处理日期不能为空', trigger: 'blur' }
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
					this.samplesForm.MEMO = this.getCheckboxData.fullname;
				} else {
					this.samplesForm.ITEM_LINE_ID = this.getCheckboxData.id;
					this.samplesForm.MEMO = this.getCheckboxData.fullname;
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
					// this.samplesForm.DEPARTMENT=res.data.deptName;
					this.samplesForm.ENTERBY=res.data.nickname;
					var date=new Date();
					this.samplesForm.ENTERDATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
					this.samplesForm.ACCEPT_DATE = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
				}).catch((err)=>{
					this.$message({
						message:'网络错误，请重试',
						type:'error'
					})
				})
				this.addtitle = true;
            	this.modifytitle = false;
            	this.viewtitle = false;
            	this.modify=false;
            	this.show = true;
            	this.edit = true;
				this.noedit = false;
				this.views=false;
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
				this.viewtitle = false;
				this.addtitle = false;
				this.modifytitle = true;
				this.modify = true;
				this.show = true;
				this.edit = true;
				this.noedit = false;
//				this.views = false; //
			},
			//这是查看
			view() {
				this.addtitle = false;
				this.viewtitle = true;
				this.modifytitle = false;
				this.views = true; //
				this.noviews = false;
				this.edit = true;
				this.noedit = true;
				this.show = true;
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
			save(samplesForm) {
				this.$refs[samplesForm].validate((valid) => {
					if (valid) {
					    this.samplesForm.STATUS=this.samplesForm.STATUS=="活动" ? '1' : '0';
						var url = this.basic_url + '/api-apps/app/itemreturn/saveOrUpdate';
						this.samplesForm.VERSION = this.samplesForm.VERSION + 1;//修改时版本+1
						this.$axios.post(url, this.samplesForm).then((res) => {
							console.log(res);
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
			//保存
			saveAndUpdate(samplesForm){
				this.save(samplesForm);
				if(this.falg){
					this.show = false;
				}
				// this.$emit('request');
			},
			//添加并保存
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