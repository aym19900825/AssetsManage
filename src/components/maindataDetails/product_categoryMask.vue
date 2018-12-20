<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加产品类别</div>
				<div class="mask_title" v-show="modifytitle">修改产品类别</div>
				<div class="mask_title" v-show="viewtitle">查看产品类别</div>
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
							<el-collapse-item title="产品类别" name="1">
								<el-row class="pb10">
									<el-col :span="3" class="pull-right">
										<el-input v-model="CATEGORY.VERSION" :disabled="true">
											<template slot="prepend">版本</template>
										</el-input>
									</el-col>
									<!--<el-col :span="5" class="pull-right" v-if="modify">
										<el-input v-model="CATEGORY.STATUS=='1'?'活动':'不活动'" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>
									<el-col :span="5" class="pull-right" v-else>
										<el-input v-model="CATEGORY.STATUS" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input>
									</el-col>-->
									<!--<template slot-scope="scope">
											<label>信息状态</label>
 									       <!--  <span v-text="scope.STATUS=='1'?'活动':'不活动'"></span>-->
									<!--<span>{{scope.STATUS}}</span>
 									       	
 									       </span>
 								        </template>-->

									<!-- <el-select v-model="CATEGORY.STATUS" placeholder="请选择信息状态">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select> -->
									</el-col>
								</el-row>

								<el-row>
									<!-- <el-col :span="8">
										<el-form-item label="类别编号" prop="NUM">
											<el-input v-model="CATEGORY.NUM" :disabled="edit" placeholder="自动生成"></el-input>
										</el-form-item>
									</el-col> -->
									<el-col :span="8">
										<el-form-item label="编码" prop="NUM">
											<el-input v-model="CATEGORY.NUM" @focus="hint" @input="hinthide"></el-input>
											<span v-if="hintshow" style="color:rgb(103,194,58);font-size: 12px">可填写，若不填写系统将自动生成</span>
										</el-form-item>
									</el-col>
									<el-col :span="16">
										<el-form-item label="名称" prop="TYPE">
											<el-input v-model="CATEGORY.TYPE"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8" v-if="modifytitle">
										<el-form-item label="机构" prop="DEPARTMENT">
											<el-input v-model="CATEGORY.DEPARTMENT" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
							<el-collapse-item title="其它" name="2" v-show="views">
								<el-row>
									<el-col :span="8">
										<el-form-item label="录入人" prop="FAX">
											<el-input v-model="CATEGORY.ENTERBY" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE">
											<el-input v-model="CATEGORY.ENTERDATE" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改人" prop="CHANGEBY">
											<el-input v-model="CATEGORY.CHANGEBY" placeholder="当前修改人" :disabled="edit"></el-input>
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
					<div class="el-dialog__footer">
						<el-button type="primary" @click="saveAndUpdate('CATEGORY')">保存</el-button>
						<el-button type="success" @click="saveAndSubmit('CATEGORY')" v-show="addtitle">保存并添加</el-button>
						<el-button v-if="modify" type="primary" class="btn-primarys" @click="modifyversion('CATEGORY')">修订</el-button>
						<el-button @click="close">取消</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		props: {
			CATEGORY: {
				type: Object,
				default: function() {
					return {
						ID: '',
						NUM: '',
						TYPE: '',
						STATUS: '',
						VERSION: '',
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
			// var validateNum = (rule, value, callback) => {
			// 	if(value === '') {
			// 		callback(new Error('可填写，若不填写系统将自动生成'));
					
			// 	} else {
			// 		callback();
			// 	}
			// 	callback();
			// 	// if(value){
			// 	// 	if (value==='') {
			// 	// 		callback();
			// 	// 	}else{
		 //  //            	callback(new Error('可填写，若不填写系统将自动生成'));
			// 	// 	}
		 //  //       }else{
		 //  //            callback();
		 //  //       }
			// };
			var validateType = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请填写产品类别名称'));
				} else {
					callback();
				}
			};
			return {
				basic_url: Config.dev_url,
				// personinfo: false,

				modify: false, //修订、修改人、修改时间
				statusshow1: true,
				statusshow2: false,
				selUser: [],
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				addtitle: true,
				modifytitle: false,
				activeNames: ['1','2'], //手风琴数量
				//				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				selectData: [],
				rules: {
					// NUM: [{
					// 	trigger: 'blur',
					// 	validator: validateNum,
					// }],
					TYPE: [{
						required: true,
						trigger: 'blur',
						validator: validateType,
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				category:{},
				hintshow:false,
				personinfo:false,
				views:false,
				noviews: true,
			};
		},
		methods: {
			//编码提示
			hint(){
				this.hintshow = true;
			},
			hinthide(){
				this.hintshow = false;
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//生成随机数函数
			rand(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
			},
			//点击按钮显示弹窗
			visible() {
				//				this.CATEGORY.NUM =  this.rand(1000,9999);
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.CATEGORY.DEPARTMENT = res.data.deptName;
					this.CATEGORY.ENTERBY = res.data.nickname;
					var date = new Date();
					this.CATEGORY.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.hintshow = false;
				this.statusshow1 = true;
				this.statusshow2 = false;
				this.addtitle = true;
				this.modifytitle = false;
				this.modify = false;
//				this.show = true;
			},
			// 这里是修改
			detail() {
				this.hintshow = false;
				this.modify = true;
				this.addtitle = false;
				this.modifytitle = true;
				this.statusshow1 = false;
				this.statusshow2 = true;
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.CATEGORY.DEPARTMENT = res.data.deptName;
					this.CATEGORY.CHANGEBY = res.data.nickname;
					var date = new Date();
					this.CATEGORY.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
					console.log(this.CATEGORY);
					//深拷贝数据
					let _obj = JSON.stringify(this.CATEGORY);
        			this.category = JSON.parse(_obj);
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				this.show = true;
			},
			//这是查看
			view(dataid) {
				this.addtitle = false;
				this.viewtitle = true;
				this.views = true; //
				this.noviews = false;
				this.edit = true;
				this.noedit = true;
				var url = this.basic_url + '/api-apps/app/workNot/' + dataid;
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
			//点击修订按钮
			modifyversion(CATEGORY) {
				this.$refs[CATEGORY].validate((valid) => {
					if(valid) {
						var category=JSON.stringify(this.category); 
	 					var CATEGORY=JSON.stringify(this.CATEGORY);
					 	if(category==CATEGORY){
					  	this.$message({
								message: '没有修改不能修改',
								type: 'warning'
							});
							return false;
					    }else{
							var url = this.basic_url + '/api-apps/app/productType/operate/upgraded';
							this.$axios.post(url, this.CATEGORY).then((res) => {
								//resp_code == 0是后台返回的请求成功的信息
								if(res.data.resp_code == 0) {
									this.$message({
										message: '修订成功',
										type: 'success'
									});
									//重新加载数据
									this.$emit('request');
									this.show = false;
								}		
							}).catch((err) => {
								this.$message({
									message: '网络错误，请重试',
									type: 'error'
								});
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
			save(CATEGORY) {
				this.$refs[CATEGORY].validate((valid) => {
					if(valid) {
						this.CATEGORY.STATUS = ((this.CATEGORY.STATUS == "1" || this.CATEGORY.STATUS == '活动') ? '1' : '0');
						var url = this.basic_url + '/api-apps/app/productType/saveOrUpdate';
						this.$axios.post(url, this.CATEGORY).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//重新加载数据
								this.$emit('request');
								this.$emit('reset');
								this.visible();
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
					} else {
						this.show = true;
						// this.$message({
						// 	message: '未填写完整，请填写',
						// 	type: 'warning'
						// });
						return false;
					}
				});
			},
			
			//保存
			saveAndUpdate(CATEGORY) {
				this.save(CATEGORY);
				this.show = false;
			},
			//保存并添加
			saveAndSubmit(CATEGORY) {
				this.save(CATEGORY);
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