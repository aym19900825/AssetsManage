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
				<div class="mask_content">
					<el-form inline-message :model="dataInfo" ref="user">
						<div class="content-accordion">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="流程节点" name="1"> 
									<el-row>
										<el-col :span="5">
											<el-form-item label="" prop="isNotRepeat">
												<el-checkbox-group v-model="dataInfo.isNotRepeat">
    											<el-checkbox label="是否执行人可重复"></el-checkbox>
												</el-checkbox-group>
											</el-form-item>
										</el-col>	
									</el-row>
									<el-tabs v-model="activeName" >
										<el-tab-pane v-for="(title,index) in bigtitle" :key="index" :label="bigtitle[index].nodeName" :name="bigtitle[index].name" >
											<div class="pb10">
												<el-form inline-message :model="bigtitle[index]" label-width="110px">
													<el-row>
														<el-col :span="8" v-show="bigtitle[index].type=='0'">
															<el-input placeholder="请输入内容" v-model="bigtitle[index].executer" :disabled="false" class="input-with-select">
																<el-select v-model="bigtitle[index].type" slot="prepend" :disabled="false" placeholder="请选择" style="width:120px; padding-left:10px;">
																	<el-option
																	v-for="item in options"
																	:key="item.code"
																	:label="item.name"
																	:value="item.code">
																	</el-option>
																</el-select>
																<el-button slot="append" icon="el-icon-search" @click="addperson(index)"></el-button>
															</el-input>
														</el-col>
														<el-col :span="8" v-show="bigtitle[index].type=='1'||bigtitle[index].type=='2'">
															<el-input placeholder="请输入内容" v-model="bigtitle[index].group" :disabled="false" class="input-with-select">
																<el-select v-model="bigtitle[index].type" slot="prepend" :disabled="false" placeholder="请选择" style="width:120px; padding-left:10px;">
																	<el-option
																	v-for="item in options"
																	:key="item.code"
																	:label="item.name"
																	:value="item.code">
																	</el-option>
																</el-select>
																<el-button slot="append" icon="el-icon-search" @click="addusergroup(index)"></el-button>
															</el-input>
														</el-col>
														<el-col :span="8" v-show="bigtitle[index].type!='1'&&bigtitle[index].type!='2'&&bigtitle[index].type!='0'">
															<el-select v-model="bigtitle[index].type" placeholder="请选择" style="width:120px;">
																<el-option
																v-for="item in options"
																:key="item.code"
																:label="item.name"
																:value="item.code">
																</el-option>
															</el-select>
														</el-col>
													</el-row>
												</el-form>
												<div class="table-func table-funcb" style="top:0px;">
													<el-button type="success" size="mini" round @click="addfield(index)">
														<i class="icon-add"></i>
														<font>新建行</font>
													</el-button>
												</div>
											</div>

											<el-table
											:data="bigtitle[index].actionList"
											style="width: 100%;margin-bottom: 20px;"
											border
											row-key="id">
											<el-table-column
												prop="flag"
												label="操作"
												sortable
												width="180">
												<template slot-scope="scope">
													<el-select v-model="scope.row.flag" placeholder="请选择">
														<el-option
														v-for="item in flag_valoptions"
														:key="item.code"
														:label="item.name"
														:value="item.code">
														</el-option>
													</el-select>
												</template>
											</el-table-column>
											<el-table-column
												prop="type"
												label="类型变更"
												sortable
												width="180">
												<template slot-scope="scope">
														<el-select v-model="scope.row.type" placeholder="请选择">
														<el-option
														v-for="item in action_typeoptions"
														:key="item.code"
														:label="item.name"
														:value="item.code">
														</el-option>
													</el-select>
												</template>
											</el-table-column>
											<el-table-column
												prop="event"
												label="事件"
												sortable
												width="180" >
												<template slot-scope="scope">
													<el-input v-model="scope.row.event"  :disabled="scope.row.type=='0'?false:true" placeholder="请选择">
													</el-input>
												</template>
											</el-table-column>
											<el-table-column
												prop="classpath"
												label="处理类"
												sortable>
												<template slot-scope="scope">
													<el-input v-model="scope.row.classpath" :disabled="scope.row.type=='1'?false:true" placeholder="请选择">
													</el-input>
												</template>
											</el-table-column>
											<el-table-column fixed="right" label="操作" width="120" >
												<template slot-scope="scope">
													<el-button @click="deleteRow(scope.$index,scope.row,'bigtitle[index].actionList')" type="text" size="small">
														<i class="icon-trash red"></i>
													</el-button>
												</template>
											</el-table-column>
											</el-table>
										</el-tab-pane>  
									</el-tabs>
								</el-collapse-item>	
							</el-collapse>
						</div>
						<div class="content-footer">
							<el-button type="primary" @click='save'>保存</el-button>
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
			<user ref="userchild" @executer="executer"></user>
            <usergroup ref="groupchild"></usergroup>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import user from '../common/common_mask/usermask.vue'
    import usergroup from'../common/common_mask/usergroup.vue'
	export default {
		name: 'masks',
		components: {
			 user,
			 usergroup,
		},
		data() {
			return {
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				show:false,
				selUser: [],
				bigtitle:[],
				dataInfo:{
				    isNotRepeat:'',
					candidateList:[],//保存节点数据
				},//
				options:[],//流程节点类型
				action_typeoptions:[],//流程事件类型
				flag_valoptions:[],//流程执行标识
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
			//新建行
			addfield(index){
				var obj = {
					flag: '',
					type: '',
					even: '',
					status: '',
					classpath:'',
					id:'',
					nodeId:this.bigtitle[index].nodeId,
					procDefId:this.dataInfo.procDefId,
				};
				this.bigtitle[index].actionList.push(obj);
			},
			//流程节点类型
			cadidate_type(){
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=cadidate_type';
				this.$axios.get(url, {}).then((res) => {
          			this.options = res.data;
				}).catch((wrong) => {
				})	
			},
			//流程事件类型
			action_type(){
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=action_type';
				this.$axios.get(url, {}).then((res) => {
          			this.action_typeoptions = res.data;
				}).catch((wrong) => {
				})	
			},
			//流程执行标识
			flag_val(){
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=flag_val';
				this.$axios.get(url, {}).then((res) => {
          			this.flag_valoptions = res.data;
				}).catch((wrong) => {
				})	
			},
			//用户的弹出框
			addperson(index){
				this.index=index;
			   this.$refs.userchild.visible(); 
			},
			//
			addusergroup(){
				this.$refs.groupchild.visible(); 
			},
			//添加显示弹窗
			visible(id) {
                this.show = true;
                var url = this.basic_url + '/api-flow/flow/process/'+id;
                    this.$axios.get(url, {}).then((res) => {
						if(res.data.isNotRepeat=='1'){
                           res.data.isNotRepeat=true;
						}else{
							res.data.isNotRepeat=false;
						}
						for(var i=0;i<res.data.candidateList.length;i++){
                             res.data.candidateList[i].name='tab'+i;   
						}
						this.bigtitle=res.data.candidateList;
						var data=res.data;
						delete data.candidateList;
						this.dataInfo=data;//是否执行人可重复
                        
                        
                    }).catch((err) => {
                    });
			},
			executer:function(executer){
				this.bigtitle[this.index].executer=executer;
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
			//刪除新建行
			deleteRow(index, row, listName){
				if(row.id){
					var url = this.basic_url + '/api-flow/flow/process/action/' + row.id;
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {}).then((res) => {
							if(res.data.resp_code == 0){
								this.bigtitle[index].actionList.splice(index,1);
								this.$message({
									message: '删除成功',
									type: 'success'
								});
							}else{
								this.$message({
									message: res.data.resp_msg,
									type: 'error'
								});
							}
						}).catch((err) => {
						});
					}).catch(() => {

					});
				}else{
					this.user[TableName].splice(index,1);
				}
			},
			// 保存users/saveOrUpdate
			save(){
				if(this.dataInfo.isNotRepeat){
					this.dataInfo.isNotRepeat=1;
				}else{
					this.dataInfo.isNotRepeat=0;
				}
				var data={
				 id:this.dataInfo.id,
				 isNotRepeat:this.dataInfo.isNotRepeat,
				 candidateList:this.bigtitle,
				 procDefId:this.dataInfo.procDefId
				}
				var url = this.basic_url + '/api-flow/flow/process/save';
				this.$axios.post(url,data).then((res) => {
					if(res.data.resp_code==0){
					this.show = false;
					this.$emit('request');
					this.$message({
						message: res.data.resp_msg,
						type: 'success'	
					});	
					}else{
					this.$message({
						message: res.data.resp_msg,
						type: 'warning'
					});	
					}
				}).catch((err) => {
				});
			},
			
		},
		mounted() {
			this.cadidate_type();
			this.action_type();	
			this.flag_val();
		},
		
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
</style>