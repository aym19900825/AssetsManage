<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="addtitle">添加产品类别</div>
				<div class="mask_title" v-show="modifytitle">修改产品类别</div>
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
								<el-row :gutter="20" class="pb10">
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

								<el-row :gutter="30">
									<el-col :span="8">
										<el-form-item label="类别编号" prop="NUM">
											<el-input v-model="CATEGORY.NUM" :disabled="edit" placeholder="自动生成"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="16">
										<el-form-item label="类别名称" prop="TYPE">
											<el-input v-model="CATEGORY.TYPE"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30" v-show="personinfo">
									<el-col :span="8">
										<el-form-item label="录入人机构" prop="DEPARTMENT">
											<el-input v-model="CATEGORY.DEPARTMENT" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入人" prop="FAX">
											<el-input v-model="CATEGORY.ENTERBY" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入时间" prop="ENTERDATE">
											<el-input v-model="CATEGORY.ENTERDATE"  :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30" v-show="personinfo">
									<el-col :span="8">
										<el-form-item label="修改人" prop="CHANGEBY" v-if="modify">
											<el-input v-model="CATEGORY.CHANGEBY" placeholder="当前修改人" :disabled="edit" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改时间" prop="CHANGEDATE" v-if="modify">
											<el-input v-model="CATEGORY.CHANGEDATE" placeholder="当前修改时间" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="el-dialog__footer">
							<el-button type="primary" @click="saveAndUpdate('CATEGORY')">保存</el-button>
							<el-button type="success" @click="saveAndSubmit('CATEGORY')">保存并添加</el-button>
							<el-button @click="close">取消</el-button>
							<el-button v-if="modify" type="primary" class="btn-primarys" @click="modifyversion">修订</el-button>
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
				default: function(){
					return {
						ID:'',
						NUM:'',
						TYPE:'',
						STATUS:'',
						VERSION:'',
						DEPARTMENT:'',
						ENTERBY:'',
						ENTERDATE:'',
						CHANGEBY:'',
						CHANGEDATE:''
					}
				}
			},
			page: Object ,
		},
		data() {
			var validateType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写产品类别名称'));
                }else {
                    callback();
                }
            };
			return {
				basic_url: Config.dev_url,
				personinfo:false,
				
				modify:false,//修订、修改人、修改时间
				statusshow1:true,
				statusshow2:false,
				selUser:[],
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				addtitle:true,
				modifytitle:false,
				activeNames: ['1'],//手风琴数量
//				labelPosition: 'top', //表格
				dialogVisible: false, //对话框
				selectData:[],
				rules: {
					TYPE:[{
						required: true,
						trigger: 'blur',
						validator: validateType,
					}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
			};
		},
		methods: {
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//生成随机数函数
			rand(min,max) {
		        return Math.floor(Math.random()*(max-min))+min;
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
//				this.$refs["CATEGORY"].resetFields();//清空表单验证
				if (this.$refs["CATEGORY"] !== undefined) {
                    this.$refs["CATEGORY"].resetFields();
               	}
				this.statusshow1 = true;
				this.statusshow2 = false;
				this.addtitle = true;
				this.modifytitle = false;
				this.modify = false;
				this.show = true;
			},
			// 这里是修改
			detail() {
				console.log(this.CATEGORY.STATUS);
				this.modify = true;
				this.addtitle = false;
				this.modifytitle = true;
				this.statusshow1 = false;
				this.statusshow2 = true;
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
	    			this.CATEGORY.CHANGEBY = res.data.nickname;
	    			var date=new Date();
					this.CATEGORY.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
				
				this.show = true;
			},
			//点击修订按钮
			modifyversion(){
				this.CATEGORY.VERSION = this.CATEGORY.VERSION + 1;
			},
			//点击关闭按钮
			close() {
				this.show = false;
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
		          if (valid) {
		          	//console.log(this.CATEGORY.STATUS);
		          	this.CATEGORY.STATUS=((this.CATEGORY.STATUS=="1"||this.CATEGORY.STATUS=='活动') ? '1' : '0');
		          	//console.log(this.CATEGORY);
					var url = this.basic_url + '/api-apps/app/productType/saveOrUpdate';		
					this.$axios.post(url,this.CATEGORY).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						console.log(this.CATEGORY);
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
					} else {
		            return false;
		          }
		        });
			},
			//保存
			saveAndUpdate(CATEGORY){
				this.save(CATEGORY);
				this.show = false;
				
			},
			//保存并添加
			saveAndSubmit(CATEGORY){
				this.save(CATEGORY);
				this.$emit('reset');
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
			}
		}
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>