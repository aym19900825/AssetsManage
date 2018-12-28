<template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
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
									<el-select v-model="dataInfo[item.prop]" filterable placeholder="请选择" v-if="item.type == 'select'" @change="selChange">
										<el-option v-for="item in assets"
										:key="item.ID"
										:label="item.DESCRIPTION"
										:value="item.DESCRIPTION">
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
					CLASSFICATION: [
						{ required: true, message: '请输入分类名称', trigger: 'blur' },
					]
				},
				basicInfo: [
					{
						label: '姓名',
						prop: 'USERNAME',
						width: '50%',
						type: 'select',
						displayType: 'inline-block'
					},
					{
						label: '关键字',
						prop: 'KEYNUM',
						width: '50%',
						type: 'select',
						displayType: 'inline-block'
					},
					{
						label: '显示',
						prop: 'AUTHORITY',
						width: '100%',
						type: 'checkbox',
						displayType: 'inline-block'
					}
				],
				authorities: [
					{
						label: '显示',
						val: 'DOC_DISPLAY'
					},{
						label: '编辑',
						val: 'DOC_EDIT'
					},{
						label: '保存',
						val: 'DOC_SAVE'
					},{
						label: '打印',
						val: 'DOC_PRINT'
					},{
						label: '下载',
						val: 'DOC_DOWN'
					},{
						label: '复制',
						val: 'DOC_DUP'
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
					'ID': '',  //主键ID，必填但页面没有字段
					'AUTHORITY': [],
					'KEYNUM': '',
					'USERNAME': ''
				},
				pmRecordList: []
			};
		},
		methods: {
			//点击按钮显示弹窗
			visible() {
				this.modify=false;
				this.show = true;
			},
			// 这里是修改
			detail(dataid) {
				// this.dataInfo = this.detailData;
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
					'A_PRICE': 0,
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
				var url = this.basic_url + '/api-apps/app/asset/saveOrUpdate';
				this.$refs['dataInfo'].validate((valid) => {
					if (valid) {
						this.$axios.post(url, _this.dataInfo).then((res) => {
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
		},
		mounted() {
			
		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>