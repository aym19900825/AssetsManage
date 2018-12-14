<template>
<!-- 添加溯源记录 -->
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<div class="mask_content">
                <div class="mask_title_div clearfix">
                    <div class="mask_anniu">
                        <span class="mask_span mask_max" @click='toggle'>
                            <i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
                        </span>
                        <span class="mask_span" @click='close'>
                            <i class="icon-close1"></i>
                        </span>
                    </div>
                </div>
				<el-form status-icon :model="dataInfo" :rules="rules"   ref="dataInfo" class="demo-user">
					<div class="accordion">
						<!-- 设备header信息 -->
						<el-collapse v-model="activeNames">
                            <el-collapse-item name="1">
                                <el-form-item label-width="120px" v-for="item in basicInfo" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
									<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'" :disabled="item.disabled"></el-date-picker>
                                    <el-input v-model="dataInfo[item.prop]" :type="item.type" disabled v-if="item.type == 'input'" :disabled="item.disabled"></el-input>
                                </el-form-item>
                            </el-collapse-item>
						    <el-collapse-item title="设备期间检查计划信息" name="2">
                                <div class="table-func">
									<el-button type="warning" size="mini" round @click="addLine('tableList')">
										<i class="el-icon-upload"></i>
										<font>导入</font>
									</el-button>
									<el-button type="success" size="mini" round @click="addLine">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<el-table :data="dataInfo.tableList" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" :default-sort="{prop:'dataInfo.pmRecord', order: 'descending'}">
									<el-table-column prop="iconOperation" fixed label="" width="50px">
										<template slot-scope="scope">
											<i class="el-icon-check" v-if="scope.row.isEditing"  @click="changeEdit(scope.row)"></i>
											<i class="el-icon-edit" v-else="v-else" @click="changeEdit(scope.row)"></i>
										</template>
									</el-table-column>
                                    <el-table-column type="index" sortable label="序号" width="50">
                                    </el-table-column>
									<el-table-column prop="ASSETNUM" label="设备编号" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'tableList.'+scope.$index + '.ASSETNUM'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
												<el-select  size="small"  v-if="scope.row.isEditing" v-model="scope.row.ASSETNUM" filterable placeholder="请选择" @change="selChange($event,scope.row)">
													<el-option v-for="item in assets"
													:key="item.ID"
													:label="item.ASSETNUM"
													:value="item.ASSETNUM">
													</el-option>
												</el-select>
                                                <span v-else="v-else">{{scope.row.ASSETNUM}}</span>
											</el-form-item>
										</template>
									</el-table-column>
									<el-table-column prop="A_NAME" label="设备名称" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'tableList.'+scope.$index + '.A_NAME'">
												<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.A_NAME" placeholder="请输入设备名称">
                                                </el-input>
                                                <span v-else="v-else">{{scope.row.A_NAME}}</span>
											</el-form-item>
										</template>
									</el-table-column>
									<el-table-column prop="MODEL" label="规格型号" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'tableList.'+scope.$index + '.MODEL'">
												<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MODEL" placeholder="请输入规格型号">
                                                </el-input>
                                                <span v-else="v-else">{{scope.row.MODEL}}</span>
											</el-form-item>
										</template>
									</el-table-column>
									<el-table-column prop="PM_ZQ" label="溯源周期" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'tableList.'+scope.$index + '.PM_ZQ'">
												<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PM_ZQ" placeholder="请输入溯源周期">
                                                </el-input>
                                                <span v-else="v-else">{{scope.row.PM_ZQ}}</span>
											</el-form-item>
										</template>
									</el-table-column>
									<el-table-column prop="PM_YXQ" label="溯源有效期" sortable >
										<template slot-scope="scope">
											<el-form-item :prop="'tableList.'+scope.$index + '.PM_YXQ'">
												<el-date-picker v-if="scope.row.isEditing" size="small" v-model="scope.row.PM_YXQ" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                                                </el-date-picker>
                                                <span v-else="v-else">{{scope.row.PM_YXQ}}</span>
											</el-form-item>
										</template>
									</el-table-column>
									<el-table-column prop="C_PLAN_DATE" label="计划期间核查时间" sortable >
										<template slot-scope="scope">
											<el-form-item :prop="'tableList.'+scope.$index + '.C_PLAN_DATE'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
                                                <el-date-picker v-if="scope.row.isEditing" size="small" v-model="scope.row.C_PLAN_DATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                                                </el-date-picker>
                                                <span v-else="v-else">{{scope.row.C_PLAN_DATE}}</span>
											</el-form-item>
										</template>
									</el-table-column>
                                    <el-table-column prop="COMPDATE" label="执行时间" sortable >
										<template slot-scope="scope">
											<el-form-item :prop="'tableList.'+scope.$index + '.COMPDATE'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
                                                <el-date-picker v-if="scope.row.isEditing" size="small" v-model="scope.row.COMPDATE" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                                                </el-date-picker>
                                                <span v-else="v-else">{{scope.row.COMPDATE}}</span>
											</el-form-item>
										</template>
									</el-table-column>
                                    <el-table-column prop="CHECKMEMO" label="核查结果" sortable width="120px">
										<template slot-scope="scope">
											<el-form-item :prop="'tableList.'+scope.$index + '.CHECKMEMO'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
                                                <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHECKMEMO" placeholder="请输入核查结果">
                                                </el-input>
                                                <span v-else="v-else">{{scope.row.CHECKMEMO}}</span>
											</el-form-item>
										</template>
									</el-table-column>
									<el-table-column label="操作" sortable width="120px">
										<template slot-scope="scope">
											<el-button type="danger" size="mini" round  @click="delLine(scope.$index,scope.row)">
												<i class="el-icon-delete"></i>
											</el-button>
										</template>
									</el-table-column>
								</el-table>
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
					DESCRIPTION: [
						{ required: true, message: '请输入计划描述', trigger: 'blur' },
					]
				},
				basicInfo: [
					{
						label: '计划编号',
						prop: 'C_PLANNUM',
						width: '30%',
						type: 'input',
						displayType: 'inline-block',
						disabled: true
					},
					{
						label: '计划描述',
						prop: 'DESCRIPTION',
						width: '30%',
						type: 'input',
						displayType: 'inline-block',
						disabled: false
					},
					{
						label: '状态',
						prop: 'STATE',
						width: '30%',
						type: 'input',
						displayType: 'inline-block',
						disabled: false
					},
					{
						label: '录入人',
						prop: 'ENTERBY',
						width: '30%',
						type: 'input',
						displayType: 'inline-block',
						disabled: true
					},
					{
						label: '录入时间',
						prop: 'ENTERDATE',
						width: '30%',
						type: 'date',
						displayType: 'inline-block',
						disabled: true
					},
					{
						label: '录入人机构',
						prop: 'DEPARTMEMT',
						width: '30%',
						type: 'input',
						displayType: 'inline-block',
						disabled: true
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
				selectData: [], //
				getCheckboxData: {},

				dataInfo: {
					'ID': '',
					'C_PLANNUM': '',
					'DESCRIPTION': '',
				    'STATE': '',
					'ENTERBY': '',
					'ENTERDATE': '',
					'DEPARTMEMT': '',
					'STATUS': '1',
					'tableList': []
				},
				assets: []
			};
		},
		methods: {
			getUser(){
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url,{}).then((res) => {
					this.dataInfo.ENTERBY = res.data.username;
					this.dataInfo.ENTERDATE = this.getToday();
					this.dataInfo.DEPARTMEMT = res.data.deptName;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			getToday(){
				var date = new Date();
				var str = date.getFullYear() + '-' + date.getMonth() + '-'+ date.getDate();
				return str;
			},
			selChange(val,row){
				var data = this.assets;
				var selData = data.filter(function(item){
					if(row.ASSETNUM == val){
						return item;
					}
				});
				row.A_NAME = selData[0].A_NAME;
				row.MODEL = selData[0].MODEL;
				row.PM_ZQ = selData[0].PM_ZQ;
				row.PM_YXQ = selData[0].PM_YXQ;
			},
			changeEdit(row){
				row.isEditing = !row.isEditing;
			},
			addLine(){
				this.dataInfo.tableList.push({
					'ASS_ID': '',
					'ASSETNUM': '',
					'A_NAME': '',
					'MODEL': '',
					'PM_ZQ': 0,
					'PM_YXQ': '',
					'C_PLAN_DATE': '',
					'COMPDATE': '',
					'CHECKMEMO': '',
					'C_PLANNUM': this.dataInfo.C_PLANNUM,
					'STATUS': '1',
					'isEditing': true
				});
			},
			delLine(index, row){
				if(row.ID){
					var url = this.basic_url + '/api-apps/app/checkPlanLine/' + row.ID;
					this.$axios.delete(url, {}).then((res) => {
						if(res.data.resp_code == 0){
							this.dataInfo.tableList.splice(index,1);
						}else{
							this.$message({
								message: res.data.resp_msg,
								type: 'error'
							});
						}
					}).catch((err) => {
						this.$message({
							message: '网络错误，请重试',
							type: 'error'
						});
					});
				}else{
					this.dataInfo.tableList.splice(index,1);
				}
			},
			//点击按钮显示弹窗
			visible() {
				this.modify=false;
				this.show = true;
				this.getUser();
			},
			// 这里是修改
			detail() {
				var ID = this.detailData.ID;
				var url = this.basic_url + '/api-apps/app/checkPlan/' + ID;
				this.$axios.get(url, {}).then((res) => {
					this.modify = true;
					this.show = true;
					this.dataInfo = res.data;
					console.log(this.dataInfo);
					this.dataInfo.tableList = this.dataInfo.CHECK_PLAN_LINEList;
				}).catch((wrong) => {});
			},
			//点击关闭按钮
			close() {
				this.resetForm();
				this.$emit('request');
			},
			resetForm(){
				this.dataInfo = {
					'ID': '',
					'C_PLANNUM': '',
					'DESCRIPTION': '',
				    'STATE': '',
					'ENTERBY': '',
					'ENTERDATE': '',
					'DEPARTMEMT': '',
					'STATUS': '1',
					'tableList': []
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
				var url = this.basic_url + '/api-apps/app/checkPlan/saveOrUpdate';
				this.$refs['dataInfo'].validate((valid) => {
					if (valid) {
						this.dataInfo.CHECK_PLAN_LINEList = this.dataInfo.tableList;
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
			var url = this.basic_url + '/api-apps/app/asset';
			this.$axios.get(url, {
				params: {}
			}).then((res) => {
				this.assets = res.data.data;
			}).catch((wrong) => {})
		}
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>