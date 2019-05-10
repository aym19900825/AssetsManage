<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title">流程配置</div>
					<div class="mask_anniu">
						<span class="mask_span" @click="close">
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content pt10 pl10 pr10 pb10">
					<div class="content-accordion">
					<el-collapse v-model="activeNames">
						 <el-collapse-item title="流程节点" name="1">
							<el-tabs v-model="activeName" >
								<el-tab-pane v-for="(title,index) in bigtitle" :key="index" :label="bigtitle[index].nodeName" :name="bigtitle[index].name" >
									<el-form inline-message :model="bigtitle[index]" ref="dataInfo" label-width="110px">
										<el-row>
											<el-col :span="5">
												<el-select v-model="bigtitle[index].type" placeholder="请选择">
													<el-option
													v-for="item in options"
													:key="item.code"
													:label="item.name"
													:value="item.code">
													</el-option>
												</el-select>
											</el-col>
											<el-col :span="5">
												<el-input v-model="bigtitle[index].executer" v-show="bigtitle[index].type=='0'" :disabled="true">
													<el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="requestData(item)"></el-button>
												</el-input>
												<!--  -->
												<el-input v-model="bigtitle[index].group" v-show="bigtitle[index].type=='1'" :disabled="true">
													<el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="requestData(item)"></el-button>
												</el-input>

												<el-input v-model="bigtitle[index].group" v-show="bigtitle[index].type=='2'" :disabled="true">
													<el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="requestData(item)"></el-button>
												</el-input>
											</el-col>
										</el-row>
									</el-form>
									 <el-table
									:data="bigtitle[index].actionList"
									style="width: 100%;margin-bottom: 20px;"
									border
									row-key="id">
									<el-table-column
										prop="bigtitle[index].actionLis.flag"
										label="事件"
										sortable
										width="180">
									</el-table-column>
									<el-table-column
										prop="bigtitle[index].actionLis.type"
										label="类型变更"
										sortable
										width="180">
									</el-table-column>
									<el-table-column
										prop="address"
										label="地址">
									</el-table-column>
									</el-table>
									<!-- <el-table
									:data="bigtitle[index].actionList"
									row-key="ID"
									border
									stripe
									:fit="true"
									highlight-current-row="highlight-current-row"
									style="width: 100%;"
									:default-sort="{prop:'bigtitle[index].actionList', order: 'descending'}"
								>
									<el-table-column prop="bigtitle[index].actionLis.flag" label="事件"  width="150px">
									<template slot-scope="scope">
										<el-form-item
										:prop="'bigtitle[index].actionLis.'+scope.$index + '.flag'"
										:rules="[{required: true, message: '请输入', trigger: 'blur'}]"
										>
										<el-input
											size="small"
											v-model="scope.row.flag"
											placeholder="请输入"
										>
											<el-button slot="append" icon="el-icon-search"></el-button>
										</el-input>
										</el-form-item>
									</template>
									</el-table-column>

									<el-table-column prop="bigtitle[index].actionLis.type" label="类型变更"  width="150px">
									<template slot-scope="scope">
										<el-form-item
										:prop="'bigtitle[index].actionLis.'+scope.$index + '.type'"
										:rules="[{required: true, message: '请输入', trigger: 'blur'}]"
										>
										<el-input
											size="small"
											v-model="scope.row.type"
											placeholder="请输入"
										>
											<el-button slot="append" icon="el-icon-search"></el-button>
										</el-input>
										</el-form-item>
									</template>
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="120px">
									<template slot-scope="scope">
										<el-button
										
										type="text"
										size="small"
										>
										<i class="icon-trash red"></i>
										</el-button>
									</template>
									</el-table-column>
								</el-table> -->
								</el-tab-pane>  
							</el-tabs>
                            
							

						</el-collapse-item>	
					</el-collapse>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import iframemask from '../flowDetails/ifram.vue'
	export default {
		name: 'masks',
		components: {
			iframemask
		},
		data() {
			return {
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				show:false,
                selUser: [],
				bigtitle:[],//保存节点数据
				dataInfo:{},//
				options:[],//流程节点类型
				edit: true, //禁填
				noedit:false,
				show: false,
				isok1: true,
				isok2: false,
                modelId:'',
				activeName: 'tab0',//节点
				activeNames: ['1'],//手风琴
			};
		},
		methods: {
			//流程节点类型
			cadidate_type(){
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=cadidate_type';
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
          			this.options = res.data;
				}).catch((wrong) => {
				})	
      		},
			//添加显示弹窗
			visible(id) {
                this.show = true;
                var url = this.basic_url + '/api-flow/flow/process/'+id;
                    this.$axios.get(url, {}).then((res) => {
						console.log(res);
                        for(var i=0;i<res.data.candidateList.length;i++){
                             res.data.candidateList[i].name='tab'+i;   
						}
                        this.bigtitle=res.data.candidateList;
                        console.log(this.bigtitle);
                    }).catch((err) => {
                    });
			},
			//点击关闭按钮
			close() {
				this.show = false;
				this.$emit('request');
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
				$(".mask_divbg").css("top", "0px");
			},
			//还原按钮
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "90%");
				$(".mask_div").css("top", "0px");
				$(".mask_divbg").css("top", "100px");
			},
			// 保存users/saveOrUpdate
			save() {
				this.$refs.modelflow.validate((valid) => {
					if (valid) {
					   var url = this.basic_url + '/api-flow/flow/model/create';
						this.$axios.get(url, {}).then((res) => {
							this.modelId=res.data.modelId;
							
							if(res.status ==200) {
     						this.$refs.child.visible();
							}
						}).catch((err) => {
						});
					} else {
						this.show = false;
						return false;
					}
				});
			},
			
			//保存
			saveAndUpdate() {
				this.save();
//				if(this.falg){
//					this.show = false;
//				}
			},
			//保存并继续
			saveAndSubmit() {
				this.save();
				this.show = true;
			},
			
		},
		mounted() {
			this.cadidate_type();	
		},
		
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
</style>