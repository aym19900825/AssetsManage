<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加按钮配置</div>
					<div class="mask_title" v-show="modifytitle">修改按钮配置</div>
					<div class="mask_title" v-show="viewtitle">查看按钮配置</div>
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
						<div class="content-accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="按钮配置" name="1">
									<el-row class="pb10">
										<el-col :span="3" class="pull-right">
											<el-input v-model="CATEGORY.VERSION" :disabled="true">
												<template slot="prepend">版本</template>
											</el-input>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="按钮名称" prop="name">
												<el-input v-model="CATEGORY.name" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="所属菜单ID" prop="menuId">
												<el-input v-model="CATEGORY.menuId" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="按钮图标" prop="icon">
												<el-input v-model="CATEGORY.icon" :disabled="edit">
													<i :class="CATEGORY.icon" slot="prepend"></i>
													<el-button slot="append" icon="el-icon-search" @click="getIcon"></el-button>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="按钮颜色" prop="style">
												<el-select v-model="CATEGORY.style" :disabled="noedit" style="width: 100%">
													<el-option v-for="item in selectData" :key="item.id" :value="item.id" :label="item.name" :class="item.name"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="排序" prop="sort">
												<el-input v-model="CATEGORY.sort" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8" v-if="dept">
											<el-form-item label="机构" prop="deptiddesc">
												<el-input v-model="CATEGORY.deptiddesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="其它" name="2" v-show="views">
									<el-row>
										<el-col :span="8">
											<el-form-item label="录入人" prop="createbydesc">
												<el-input v-model="CATEGORY.createbydesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="createTime">
												<el-input v-model="CATEGORY.createTime" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改人" prop="updatebydesc">
												<el-input v-model="CATEGORY.updatebydesc" placeholder="当前修改人" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" prop="updateTime">
												<el-input v-model="CATEGORY.updateTime" placeholder="当前修改时间" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="content-footer" v-show="noviews">
							<el-button type="primary" @click="saveAndUpdate('CATEGORY')">保存</el-button>
							<el-button type="success" @click="saveAndSubmit('CATEGORY')" v-show="addtitle">保存并继续</el-button>
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
		</div>

		<!--应用中心图标弹出 Begin-->
        <div class="mask" v-show="show2"></div>
		<div class="mask_divbg" v-show="show2">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title">应用中心图标</div>
					<div class="mask_anniu">
						<span class="mask_span mask_max" @click='toggle'>
							<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						</span>
						<span class="mask_span" @click='close2'>
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content" :style="{height: fullHeight}">
					<div class="content-accordion">
						<all_icons v-on:childByValue="childByValue"></all_icons>
					</div>
					<div class="content-footer">
						<el-button type="primary" @click="confirm2();" >确 定</el-button>
						<el-button @click='close2'>取 消</el-button>
					</div>
				</div>
			</div>
		</div>
		<!--应用中心图标弹出 End-->
	</div>
</template>

<script>
	import Config from '../../config.js'
	import all_icons from '../common/all_icons.vue'//弹出框
	export default {
		name: 'masks',
		components: {
			'all_icons':all_icons,
		},
		props: {
			CATEGORY: {
				type: Object,
				default: function() {
					return {
						ID: '',
						name: '',
						menuId: '',
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
			return {
				loading: false,
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				selUser: [],
				edit: true, //禁填
				show: false,
				show2:false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1','2'], //手风琴数量
				selectData: [],
				fullHeight: document.documentElement.clientHeight - 200 +'px',//获取浏览器高度
				rules: {
					name: [{required: true, trigger: 'change', validator: this.Validators.isSpecificKey,}],
					menuId: [{required: true, message: '请选择', trigger: 'change' }],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				category:{},//从父组件接过来的值
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
			};
		},
		methods: {
			 // 按钮图标childValue就是子组件传过来的值
			childByValue: function (childValue) {
		        this.sendchildValue = childValue;
		      
		    },
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//图标
			getIcon(){
				this.show2 = true;
			},
			//按钮图标关闭
			close2(){
				this.show2 = false;
			},
			//按钮图标确定
			confirm2() {
				this.CATEGORY.icon = this.sendchildValue;
				this.show2 = false;
			},

			//点击按钮显示弹窗
			visible() {
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					// console.log(res.data);
					this.CATEGORY.DEPTID = res.data.deptId;
					this.CATEGORY.ENTERBY = res.data.id;
					// this.CATEGORY.ENTERBYDesc = res.data.nickname;
					var date = new Date();
					this.CATEGORY.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
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
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.CATEGORY.DEPTID = res.data.deptId;//传给后台机构id
					this.CATEGORY.CHANGEBY = res.data.id;
					// this.CATEGORY.CHANGEBYDesc = res.data.nickname;
					var date = new Date();
					this.CATEGORY.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD");
					//深拷贝数据
					let _obj = JSON.stringify(this.CATEGORY);
        			this.category = JSON.parse(_obj);
				}).catch((err) => {
				});
				this.show = true;
			},
			//这是查看
			view() {
				// console.log(this.CATEGORY);
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.show = true;				
			},
			//获取按钮颜色
			getBtnColor(){
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=BTNCOLOR';
				this.$axios.get(url, {}).then((res) => {
					// console.log(res);
					this.selectData = res.data;
					
				}).catch((wrong) => {
				})	
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
			save(CATEGORY) {
				this.$refs[CATEGORY].validate((valid) => {
					if(valid) {
						this.CATEGORY.STATUS = ((this.CATEGORY.STATUS == "1" || this.CATEGORY.STATUS == '活动') ? '1' : '0');
						var url = this.basic_url + '/api-user/permissions/saveOrUpdate';
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
			saveAndUpdate(CATEGORY) {
				this.save(CATEGORY);
				if(this.falg){
					this.show = false;
				}
			},
			//保存并继续
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
					.catch(_ => {
				console.log('取消关闭');
				$('.v-modal').hide();
			});
			},
		},
		mounted() {
			this.getBtnColor();
		},
		
	}
</script>

<style scoped>
	.el-table__body-wrapper 
	{
    overflow-y:scroll;
    }
	@import '../../assets/css/mask-modules.css';
</style>