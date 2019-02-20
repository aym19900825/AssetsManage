<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title">报表参数</div>
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
							<el-collapse>
								<el-form-item v-for="item in pramList" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input' && item.prop !='A_PRICE' " :disabled="noedit"></el-input>
									<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'" :disabled="noedit"></el-input>
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" :disabled="noedit">
									</el-date-picker>
								</el-form-item>
							</el-collapse>
						</div>
						<div class="el-dialog__footer">
							<el-button type="primary" @click="saveAndUpdate('dataInfo')">保存</el-button>
							<el-button @click='close'>取消</el-button>
						</div>
					</el-form>
				</div>
				<!--底部-->
			</div>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		props: ['pramList'],
		data() {
			return {
				basicInfo: [
//					{
//						label: '设备价值',
//						prop: 'A_PRICE',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//					{
//						label: '设备名称',
//						prop: 'DESCRIPTION',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//					{
//						label: '接收日期',
//						prop: 'ACCEPT_DATE',
//						width: '30%',
//						type: 'date',
//						displayType: 'inline-block'
//					},
//                  {
//						label: '设备型号',
//						prop: 'MODEL',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//                  {
//						label: '配置单位',
//						prop: 'CONFIG_UNIT',
//						width: '30%',
//						type: 'select',
//						displayType: 'inline-block'
//					},
//                  {
//						label: '使用日期',
//						prop: 'USEDATE',
//						width: '30%',
//						type: 'date',
//						displayType: 'inline-block'
//					},
//                  {
//						label: '技术指标',
//						prop: 'ASSET_KPI',
//						width: '100%',
//						type: 'textarea',
//						displayType: 'inline-block'
//					},
//                  {
//						label: '配套设备',
//						prop: 'SUPPORT_ASSET',
//						width: '100%',
//						type: 'textarea',
//						displayType: 'inline-block'
//					},
//                  {
//						label: '制造单位',
//						prop: 'VENDOR',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//                  {
//						label: '出厂编号',
//						prop: 'FACTOR_NUM',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//                  {
//						label: '供货单位',
//						prop: 'SUPPLIER',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//                  {
//						label: '验收单号',
//						prop: 'ACCEPT_NUM',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//					{
//						label: '使用状态',
//						prop: 'OPTION_STATUS',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block',
//					},
//                  {
//						label: '计量器具',
//						prop: 'ISMETER',
//						width: '30%',
//						type: 'radio',
//						displayType: 'inline-block',
//                      opts: [
//                          {
//								label: '是',
//								val: '是'
//                          },
//                          {
//								label: '否',
//								val: '否'
//                          }
//                      ]
//					},
//                  {
//						label: '需要溯源',
//						prop: 'ISPM',
//						width: '30%',
//						type: 'radio',
//						displayType: 'inline-block',
//                      opts: [
//                          {
//								label: '是',
//								val: '是'
//                          },
//                          {
//								label: '否',
//								val: '否'
//                          }
//                      ]
//					},
//                  {
//						label: '维护方式',
//						prop: 'MODE',
//						width: '30%',
//						type: 'radio',
//						displayType: 'inline-block',
//                      opts: [
//                          {
//								label: '外委',
//								val: '外委'
//                          },
//                          {
//								label: '自维',
//								val: '自维'
//                          }
//                      ]
//					},
//					{
//						label: '检定/验证',
//						prop: 'MODE1',
//						width: '30%',
//						type: 'radio',
//						displayType: 'inline-block',
//                      opts: [
//                          {
//								label: '送检',
//								val: '送检'
//                          },
//                          {
//								label: '自检',
//								val: '自检'
//                          }
//                      ]
//					},
//                  {
//						label: '接收状态',
//						prop: 'A_STATUS',
//						width: '70%',
//						type: 'radio',
//						displayType: 'inline-block',
//                      opts: [
//                          {
//								label: '全新',
//								val: '全新'
//                          },
//                          {
//								label: '已使用过',
//								val: '已使用过'
//                          },
//                          {
//								label: '改装过',
//								val: '改装过'
//                          },
//                          {
//								label: '大修过',
//								val: '大修过'
//                          }
//                      ]
//					},
//					{
//						label: '设备状态',
//						prop: 'STATE',
//						width: '70%',
//						type: 'radio',
//						 opts: [
//                          {
//								label: '启用',
//								val: '1'
//                          },
//                          {
//								label: '封存',
//								val: '2'
//                          },
//                          {
//								label: '报废',
//								val: '3'
//                          }
//                      ],
//						displayType: 'inline-block',
//					},
//					{
//						label: '配置地址',
//						prop: 'C_ADDRESS',
//						width: '100%',
//						type: 'textarea',
//						displayType: 'inline-block'
//					},
//					{
//						label: '设备分类',
//						prop: 'TYPE',
//						width: '30%',
//						type: 'radio',
//						 opts: [
//                          {
//								label: '仪器',
//								val: '仪器'
//                          },
//                          {
//								label: '量具',
//								val: '量具'
//                          }
//                      ],
//						displayType: 'inline-block'
//					},
//					{
//						label: '安装地点',
//						prop: 'INS_SITE',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//					{
//						label: '启用日期',
//						prop: 'S_DATE',
//						width: '30%',
//						type: 'date',
//						displayType: 'inline-block'
//					},
//                  {
//						label: '技术资料',
//						prop: 'TECHNICAL_DATA',
//						width: '100%',
//						type: 'textarea',
//						displayType: 'inline-block'
//					},
//				],
//				keeperInfo: [
//					{
//						label: '设备保管人',
//						prop: 'KEEPER',
//						width: '50%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//					{
//						label: '备注',
//						prop: 'MEMO',
//						width: '50%',
//						type: 'input',
//						displayType: 'inline-block'
//					}
//				],
//				otherInfo: [
//					{
//						label: '录入人',
//						prop: 'ENTERBYDesc',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//					{
//						label: '录入时间',
//						prop: 'ENTERDATE',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//					{
//						label: '机构',
//						prop: 'DEPTIDDesc',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//					{
//						label: '修改人',
//						prop: 'CHANGEBYDesc',
//						width: '30%',
//						type: 'input',
//						displayType: 'inline-block'
//					},
//					{
//						label: '修改时间',
//						prop: 'CHANGEDATE',
//						width: '30%',
//						type: 'date',
//						displayType: 'inline-block'
//					}
				],

				basic_url: Config.dev_url,
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				
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
				
			};
		},
		methods: {
			//点击按钮显示弹窗
			visible(pramList) {	
				console.log(11111);
				console.log(pramList);
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
					} else {
						this.show = true;
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
	
					}
				});
			},
			saveAndUpdate(dataInfo) {
				this.save(dataInfo);
				
			},
			saveAndSubmit(dataInfo) {
				this.save(dataInfo);
				this.show = true;
			},
			
		},
		mounted() {
		},

	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
</style>