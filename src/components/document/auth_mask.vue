<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_title_div clearfix">
				<div class="mask_title" v-show="!modify">添加关键字授权</div>
				<div class="mask_title" v-show="modify">修改关键字授权</div>
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
				<el-form status-icon :model="dataInfo" :rules="rules"   ref="dataInfo" label-width="100px" class="demo-user">
					<div class="accordion">

						<!-- 关键字授权信息 -->
						<el-collapse v-model="activeNames">
							<el-collapse-item title="关键字授权信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="5" class="pull-right">
										<!-- <el-input v-model="dataInfo.STATUS==1?'活动':'不活动'" :disabled="true">
											<template slot="prepend">信息状态</template>
										</el-input> -->
									</el-col>
								</el-row>
								<el-form-item v-for="item in basicInfo" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'"></el-input>
									<el-checkbox-group 
										v-model="dataInfo[item.prop]"
										v-if="item.type=='checkbox'" >
										<el-checkbox style="line-height: 40px;" v-for="item in authorities" :label="item.label" :key="item.val">{{item.label}}</el-checkbox>
									</el-checkbox-group>
									<el-select v-model="dataInfo[item.prop]" filterable placeholder="请选择" v-if="item.type == 'select'&&item.label=='姓名'">
										<el-option v-for="item in usernames"
										:key="item.id"
										:label="item.nickname"
										:value="item.id">
										</el-option>
									</el-select>
									<el-select v-model="dataInfo[item.prop]" filterable placeholder="请选择" v-if="item.type == 'select'&&item.label=='关键字'">
										<el-option v-for="item in keywords"
										:key="item.id"
										:label="item.keywordname"
										:value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-collapse-item>
						</el-collapse>
					</div>

					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click='submitForm'>提交</el-button>
					</div>
				</el-form>
			</div>
			<!--底部-->
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		props: ['detailData'],
		data() {
			return {
				rules: {
					userid: [
						{ required: true, message: '请选择用户', trigger: 'blur' },
					],
					keywordid: [
						{ required: true, message: '请选择关键字', trigger: 'blur' },
					],
					authority: [
						{ required: true, message: '请选择授权类型', trigger: 'blur' },
					]
				},
				basicInfo: [
					{
						label: '姓名',
						prop: 'userid',
						width: '50%',
						type: 'select',
						displayType: 'inline-block'
					},
					{
						label: '关键字',
						prop: 'keywordid',
						width: '50%',
						type: 'select',
						displayType: 'inline-block'
					},
					{
						label: '授权',
						prop: 'authority',
						width: '100%',
						type: 'checkbox',
						displayType: 'inline-block'
					}
				],
				authorities: [
					{
						label: '显示',
						val: 'fileread'
					},{
						label: '编辑',
						val: 'fileedit'
					},{
						label: '删除',
						val: 'filedelete'
					},{
						label: '打印',
						val: 'fileprint'
					},{
						label: '下载',
						val: 'filedownload'
					},{
						label: '复制',
						val: 'fileduplicate'
					},{
						label: '上传',
						val: 'fileupload'
					}
				],

				basic_url: Config.dev_url,

				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1', '2','3','4'], //手风琴数量
				dialogVisible: false, //对话框
				modify: false,
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				selectData: [], 
				getCheckboxData: {},

				dataInfo: {
					'id': '',  //主键ID，必填但页面没有字段
					'authority': [],
					'keywordid': '',
					'userid': ''
				},
				pmRecordList: [],

				usernames: [],
				keywords: []
			};
		},
		methods: {
			//点击按钮显示弹窗
			visible() {
				this.modify=false;
				this.show = true;
			},
			// 这里是修改
			detail() {
				var detailData = this.detailData;
				var labelAuth = this.authorities;
				for(var i in labelAuth){
					for(var n=0; n<labelAuth.length; n++){
						var item = labelAuth[n].val;
						if(detailData[item] == 1){
							this.dataInfo.authority.push(labelAuth[n].label);
						}
					}
				}
				this.dataInfo.keywordprivilegeid = detailData.id;
				this.dataInfo.keywordid = detailData.keywordid;
				this.dataInfo.userid = detailData.userid;

				this.modify = true;
				this.show = true;
			},
			//点击关闭按钮
			close() {
				this.resetForm();
				this.$emit('request');
			},
			resetForm(){
				this.dataInfo =  {
					'id': '',  //主键ID，必填但页面没有字段
					'authority': [],
					'keywordid': '',
					'userid': ''
				};
				this.$refs['dataInfo'].resetFields();
				this.show = false;
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

			submitForm() {
				var _this = this;
				var url = this.basic_url + '/api-apps/app/tbKeywordPrivilege2/saveOrUpdate';
				this.$refs['dataInfo'].validate((valid) => {
					var submitData = {
						'id': '',  //主键ID，必填但页面没有字段
						'keywordid': this.dataInfo.keywordid,
						'userid': this.dataInfo.userid,
						'fileread': 0,
						'fileedit': 0,
						'fileprint': 0,
						'fileupload': 0,
						'filedownload': 0,
						'fileduplicate': 0,
						'filedelete': 0,
					};
					var authorities = this.dataInfo.authority;
					var labelAuth = this.authorities;
					
					if(_this.modify){
						submitData.id = _this.detailData.id;
					}
					for(var i in authorities){
						for(var n=0; n<labelAuth.length; n++){
							if(labelAuth[n].label == authorities[i]){
								var item =  labelAuth[n].val;
								submitData[item] = 1;
							}
						}
					}

					var users = this.usernames;
					for(var j=0; j<users.length; j++){
						if(users[j].id == _this.dataInfo.userid){
							submitData.username = users[j].username;
						}
					}

					var keywords = this.keywords;
					for(var m=0; m<keywords.length; m++){
						if(keywords[m].id == _this.dataInfo.keywordid){
							submitData.categoryid = keywords[m].categoryid;
						}
					}

					if (valid) {
						this.$axios.post(url, submitData).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success',
								});
								this.resetForm();
								this.$emit('request');
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			getUsers(){
				var url = this.basic_url + '/api-user/users';
				var data = {
					page: 1,
					limit: 1000
				}
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.usernames = res.data.data;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			getKeyWords(){
				var data = {
					page: 1,
					limit: 1000
				}
				var url = this.basic_url + '/api-apps/app/tbKeyword2';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.keywords = res.data.data;
				}).catch((wrong) => {})
			}
		},
		mounted() {
			this.getUsers();
			this.getKeyWords();
		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>