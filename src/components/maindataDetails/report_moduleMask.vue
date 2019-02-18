<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加检验/检测报告模板</div>
					<div class="mask_title" v-show="modifytitle">修改检验/检测报告模板</div>
					<div class="mask_title" v-show="viewtitle">查看检验/检测报告模板</div>
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
					<el-form :model="CATEGORY" inline-message :rules="rules" ref="CATEGORY" label-width="100px" class="demo-adduserForm">
						<div class="accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="检验/检测报告模板" name="1">
									<el-row>
										<el-col :span="8">
											<el-form-item label="编码" prop="NUM">
												<el-input v-model="CATEGORY.NUM" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="16">
											<el-form-item label="模板描述" prop="DECRIPTION">
												<el-input v-model="CATEGORY.DECRIPTION" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8" v-if="dept">
											<el-form-item label="机构" prop="DEPTIDDesc">
												<el-input v-model="CATEGORY.DEPTIDDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="文件" name="2">
									<doc-table ref="docTable" :docParm = "docParm"></doc-table>
								</el-collapse-item>
								<el-collapse-item title="其它" name="3" v-show="views">
									<el-row>
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBYDesc">
												<el-input v-model="CATEGORY.ENTERBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENTERDATE">
												<el-input v-model="CATEGORY.ENTERDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBYDesc">
												<el-input v-model="CATEGORY.CHANGEBYDesc" placeholder="当前修改人" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" prop="CHANGEDATE">
												<el-input v-model="CATEGORY.CHANGEDATE" placeholder="当前修改时间" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="el-dialog__footer" v-show="noviews">
							<el-button type="primary" @click="saveAndUpdate('CATEGORY')">保存</el-button>
							<el-button type="success" @click="saveAndSubmit('CATEGORY')" v-show="addtitle">保存并继续</el-button>
							<!-- <el-button v-if="modify" type="success" @click="update('CATEGORY')">启用</el-button> -->
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import docTable from '../common/doc.vue'
	export default {
		name: 'masks',
		components: {docTable},
		props: {
			CATEGORY: {
				type: Object,
				default: function() {
					return {
						ID: '',
						NUM: '',
						DECRIPTION: '',
						STATUS: '',
						DEPARTMENT: '',
						ENTERBY: '',
						ENTERDATE: '',
						CHANGEBY: '',
						CHANGEDATE: ''
					}
				}
			},
			page: Object,
		},
		data() {
			return {
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
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				selUser: [],
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1','2','3'], //手风琴数量
				//				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				selectData: [],
				rules: {
					NUM: [{
						required: false,
						trigger: 'blur',
						validator: this.Validators.isCodeNum,
					}],
					DECRIPTION: [
						{required: true, message: '请填写', trigger: 'blur'},
						{validator: this.Validators.isSpecificKey, trigger: 'blur'},
					],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				// category:{},//从父组件接过来的值
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
				testing_filesForm:{//文件文件数据组
					inspectionList: []
				},
			};
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//生成随机数函数
			rand(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
			},
			getUser(opt){
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.CATEGORY.DEPARTMENT = '';
					this.CATEGORY.DEPTID = res.data.deptId;
					this.CATEGORY.ENTERBY = res.data.id;

					this.docParm.userid = res.data.id;
					this.docParm.username = res.data.username;
					this.docParm.deptid = res.data.deptId;
					this.docParm.deptfullname = res.data.deptName;

					var date = new Date();
					this.CATEGORY.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
					if(opt!='new'){
						let _obj = JSON.stringify(this.CATEGORY);
						this.category = JSON.parse(_obj);
					}
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
				
				this.docParm = {
					'model': 'new',
					'appname': '检验检测项目_原始数据模板',
					'recordid': 1,
					'appid': 17
				};
				this.getUser('new');
//				this.show = true;
			},
			// 这里是修改
			detail() {
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

				this.getUser('edit');
				var _this = this;
				setTimeout(function(){
					_this.docParm.model = 'edit';
					_this.docParm.appname = '检验检测项目_原始数据模板';
					_this.docParm.recordid = _this.CATEGORY.ID;
					_this.docParm.appid = 17;
					_this.$refs.docTable.getData();
				},100);
				this.show = true;
			},
			//这是查看
			view() {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.show = true;

				var _this = this;
				setTimeout(function(){
					_this.docParm.model = 'view';
					_this.docParm.appname = '检验检测项目_原始数据模板';
					_this.docParm.recordid = _this.CATEGORY.ID;
					_this.docParm.appid = 17;
					_this.$refs.docTable.getData();
				},100);				
			},
			iconOperation(row, column, cell, event){//切换Table-操作列中的修改、保存
				if(column.property ==="iconOperation"){
					row.isEditing = !row.isEditing
				}
			},
			loadMore () {//表格滚动加载
			    if (this.loadSign) {
			        this.loadSign = false
			     	this.page.currentPage++
			     	if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			       		return
			     	}
				    setTimeout(() => {
				        this.loadSign = true
				    }, 1000)
			     	this.requestData_doclinks()
			    }
			},
			addfield_doclinks() { //插入行到文件文件Table中
				var isEditingflag=false;
				for(var i=0;i<this.testing_filesForm.inspectionList.length; i++){
					if (this.testing_filesForm.inspectionList[i].isEditing==false){
						isEditingflag=false;
					}else{
                        isEditingflag=true;
                        break;
					}
				}
				if (isEditingflag==false){
                	this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
                		var currentUser, currentDate
						this.currentUser=res.data.nickname;
						var date=new Date();
						this.currentDate = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
						var index=this.$moment(date).format("YYYYMMDDHHmmss");
						var obj = {
							"DOCLINKS": 'FLS' + index,
							"DESCRIPTION": '',
							"DOC_SIZE": '',
							"ROUTE": '',
							"ENTERBY": this.currentUser,
							"ENTERDATE": this.currentDate,
							"isEditing": true,
						};
						this.testing_filesForm.inspectionList.unshift(obj);//在列表前新建行unshift，在列表后新建行push
					}).catch((err)=>{
						this.$message({
							message:'网络错误，请重试',
							type:'error'
						})
					})
	            } else {
	                this.$message.warning("请先保存当前编辑项");
				}
			},
			saveRow (row) {//Table-操作列中的保存行
				this.$refs['testing_filesForm'].validate((valid) => {
		          	if (valid) {
						var url = this.basic_url + '/api-apps/app/doclinks/saveOrUpdate';
	//					var submitData = {
//						"ID":row.ID,
//					    "DOCLINKS": row.DOCLINKS,
//						"DESCRIPTION": row.DESCRIPTION,
//					    "DOC_SIZE": row.DOC_SIZE,
//						"ROUTE": row.ROUTE,
//						"ENTERBY": row.ENTERBY,
//					    "ENTERDATE": row.ENTERDATE,
//					}
						this.$axios.post(url, this.submitData).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//重新加载数据
								this.requestData_doclinks();
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

			deleteRow(row) {//Table-操作列中的删除行
				this.$confirm('确定删除此文件文件吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                	var url = this.basic_url + '/api-apps/app/doclinks/' + row.ID;
                    this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
					//resp_code == 0 是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.requestData_doclinks();
						}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
                }).catch(() => {

            	});
			},
			//点击更新按钮
			update(CATEGORY) {
				var data = {
					ID: this.CATEGORY.ID,
				}
				this.$axios.get(this.basic_url+ '/api-apps/app/inspectionRepTem/operate/updateRelate', {
					params: data
				}).then((res) => {
					// console.log(res);
					console.log(res.data.resp_code);
					if(res.data.resp_code == 0) {
						this.$message({
							message: '更新成功',
							type: 'success'
						});
					}else{
						return;
					}
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
			},
			//还原按钮
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("top", "100px");
			},
			// 保存users/saveOrUpdate
			save(opt) {
				this.$refs['CATEGORY'].validate((valid) => {
					console.log('CATEGORY');
					if(!valid && opt == 'docUpload'){
						console.log('message');
						this.$message({
							message: '请先正确填写信息，再进行文档上传',
							type: 'warning'
						});
					}
					if(valid) {
						this.CATEGORY.STATUS = ((this.CATEGORY.STATUS == "1" || this.CATEGORY.STATUS == '活动') ? '1' : '0');
						var url = this.basic_url + '/api-apps/app/inspectionRepTem/saveOrUpdate';
						this.$axios.post(url, this.CATEGORY).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								if(opt == 'docUpload'){
									this.docParm.recordid = res.data.datas.id;
									this.docParm.model = 'edit';
									this.$refs.docTable.autoLoad();
									this.CATEGORY.ID = res.data.datas.id;
								}else{
									this.$emit('request');
									this.$emit('reset');
									this.visible();
								}
							}else{
								this.show = true;
								if(res.data.resp_code == 1) {
									//res.data.resp_msg!=''后台返回提示信息
									if( res.data.resp_msg!=''){
									 	this.$message({
											message: res.data.resp_msg,
											type: 'warning'
									 	});
									}else{
										this.$message({
											message:'相同数据不可重复添加！',
											type: 'warning'
										});
									}
								}
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
			saveAndUpdate() {
				this.save();
				if(this.falg){
					this.show = false;
				}
			},
			//保存并继续
			saveAndSubmit() {
				this.save();
				// this.visible();
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
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
		},
		mounted() {
			
		},
		
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>