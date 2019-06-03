<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加编号设置</div>
					<div class="mask_title" v-show="modifytitle">修改编号设置</div>
					<div class="mask_title" v-show="viewtitle">查看编号设置</div>
					<div class="mask_anniu">
						<span class="mask_span mask_max" @click="toggle">
							<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						</span>
						<span class="mask_span" @click="close">
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content">
					<el-form inline-message :model="numbsetForm" :rules="rules" ref="numbsetForm">
						<div class="content-accordion">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="基础信息" name="1">
                                    <el-row>
                                        <el-col :span="8">
											<el-form-item label="自定义设置" prop="isCustomUse" label-width="120px">
												<el-select v-model="numbsetForm.isCustomUse" :disabled="edit" placeholder="请选择" style="width:100%;">
                                                    <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="使用多流水号" prop="isMultiple" label-width="120px">
												<!-- <el-input v-model="numbsetForm.isMultiple" :disabled="noedit"></el-input> -->
                                                <el-select v-model="numbsetForm.isMultiple" :disabled="noedit" placeholder="请选择" style="width:100%;">
                                                    <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
											</el-form-item>
										</el-col>
                                       <el-col :span="8" v-show='numbsetForm.isMultiple!="1"'>
											<el-form-item label="序列号" prop="serialnum" label-width="120px">
												<el-input v-model="numbsetForm.serialnum" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
                                    </el-row>
                                    <el-row v-show='numbsetForm.isCustomUse=="1"'>
                                       <el-col :span="8">
											<el-form-item label="标识一" prop="markx" label-width="120px">
												<el-input v-model="numbsetForm.markx" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="标识二" prop="marky" label-width="120px">
												<el-input v-model="numbsetForm.marky" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="标识三" prop="markz" label-width="120px">
												<el-input v-model="numbsetForm.markz" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col> 
                                    </el-row>
                                    <el-row v-show='numbsetForm.isCustomUse!="1"'>
                                       <el-col :span="8">
											<el-form-item label="应用" prop="markx" label-width="120px">
												<el-input v-model="numbsetForm.markx" :disabled="edit" width="100%">
													<el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="getapp()">
													</el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
                                            <el-form-item label="表" prop="marky" label-width="120px">
												<el-input v-model="numbsetForm.marky" :disabled="edit">
													<el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="getdata()">
													</el-button>
												</el-input>
											</el-form-item>
										</el-col>
										<!-- <el-col :span="8">
											<el-form-item label="标识三" prop="markz" label-width="110px">
												<el-input v-model="numbsetForm.markz" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>  -->
                                    </el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="初始化日期" prop="isInitbydate" label-width="120px">
                                                <el-select v-model="numbsetForm.isInitbydate" :disabled="noedit" placeholder="请选择" style="width:100%;">
                                                    <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="初始化日期格式"  prop="initformat" label-width="120px"   :rules="numbsetForm.isInitbydate == '1'?rules.initformat:[{ required: false, message: '请选择任务启动时间', trigger: 'blur' }]"> 
												<!-- <el-input v-model="numbsetForm.initformat" :disabled="noedit"></el-input> -->
												<el-select v-model="numbsetForm.initformat" :disabled="noedit" placeholder="请选择" style="width:100%;">
                                                    <el-option
                                                        v-for="item in initDateFormatoption"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.code">
                                                    </el-option>
                                                </el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8" v-show='numbsetForm.isInitbydate=="1"||numbsetForm.isMultiple=="1"'>
											<el-form-item label="初始化起始数" prop="initnum" label-width="120px">
												<el-input v-model="numbsetForm.initnum" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<!-- <el-col :span="8">
											<el-form-item label="前缀" prop="prefix" label-width="110px">
												<el-input v-model="numbsetForm.prefix" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col> -->
									</el-row>
									<el-row>
										
										<el-col :span="8">
											<el-form-item label="保留位数" prop="retain" label-width="120px">
												<el-input v-model="numbsetForm.retain" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="增加量" prop="increase" label-width="120px">
												<el-input v-model="numbsetForm.increase" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>

                                <div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
                                    <el-tabs v-model="activeName" ref="tabs" >
                                        <el-tab-pane label="编号的段落设置" name="first">
                                        <div class="table-func table-funcb">
                                            <el-button type="success" size="mini" :disabled="noedit" round @click="add" v-show="!viewtitle">
										    <i class="icon-add"></i>
                                            <font>新建</font>
                                            </el-button>
                                        </div>
                                        <el-table
                                            :data="numbsetForm.numberPrefixList"
                                            row-key="ID"
                                            border
                                            stripe
                                            :fit="true"
                                            highlight-current-row="highlight-current-row"
                                            style="width: 100%;"
                                            :default-sort="{prop:'numbsetForm.numberPrefixList', order: 'descending'}"
                                        >
                                            <el-table-column prop="prefix" label="前缀" width="150px">
                                            <template slot-scope="scope">
                                                <el-form-item
                                                :prop="'numberPrefixList.'+scope.$index + '.prefix'"

                                                >
                                                <el-input
                                                    size="small"
                                                    v-model="scope.row.prefix"
                                                    placeholder="请输入"
                                                >
                                                </el-input>
                                                </el-form-item>
                                            </template>
                                            </el-table-column>

                                            <el-table-column prop="suffix" label="后缀" width="150px">
                                            <template slot-scope="scope">
                                                <el-form-item
                                                :prop="'numberPrefixList.'+scope.$index + '.suffix'"
                                                >
                                                <el-input
                                                    size="small"
                                                    v-model="scope.row.suffix"
                                                    placeholder="请输入"
                                                >
                                                </el-input>
                                                </el-form-item>
                                            </template>
                                            </el-table-column>
                                             
											<el-table-column prop="category" label="类型" width="300px">
                                                <template slot-scope="scope">
                                                    <el-form-item :prop="'numberPrefixList.'+scope.$index + '.category'" :rules="[{required: true, message: '请输入', trigger: 'blur'}]" >
														<el-select v-model="scope.row.category" filterable allow-create default-first-option placeholder="请选择">
                                                            <el-option v-for="item in numPrefixTypeoption" :key="item.id" :label="item.name" :value="item.code"></el-option>
														</el-select>
													</el-form-item>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="value" label="值" >
                                            <template slot-scope="scope">
                                                <el-form-item
                                                :prop="'numberPrefixList.'+scope.$index + '.value'"
                                                >
                                                <!-- 当类型是自定义的时候 -->
												<el-input size="small" v-model="scope.row.value" placeholder="请输入"  :disabled="noedit" v-show="scope.row.category=='4'"></el-input>
                                                <!-- 当类型是日期 -->
												<el-select v-model="scope.row.value" placeholder="请选择" v-show="scope.row.category=='2'">
													<el-option v-for="item in dateFormatoption" :key="item.id" :label="item.name" :value="item.code"></el-option>
												</el-select>
												<!-- 机构 -->
												<el-input v-model="scope.row.valueDesc" :disabled="edit" v-show="scope.row.category=='3'">
													<el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="getdept(scope.$index)">
													</el-button>
												</el-input>
												<!-- 业务字段 -->
												<el-input v-model="scope.row.value" :disabled="edit" v-show="scope.row.category=='1'">
													<el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="getdata(scope.$index)">
													</el-button>
												</el-input>
												</el-form-item>
                                            </template>
                                            </el-table-column>

                                            

                                            <el-table-column fixed="right" label="操作" width="120px">
                                                <el-button
                                                @click.native.prevent="deleteRow(scope.$index,scope.row,'numberPrefixList')"
                                                type="text"
                                                size="small"
                                                v-if="!viewtitle"
                                                >
                                                <i class="icon-trash red"></i>
                                                </el-button>
                                            </el-table-column>
                                        </el-table>
                                        </el-tab-pane>
                                        
                                    </el-tabs>
                                </div>
								<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion  v-show='numbsetForm.isMultiple=="1"'>
                                    <el-tabs v-model="activeName1" ref="tab" >
                                        <el-tab-pane label="流水号/序号" name="first">
                                        <el-table
                                            :data="numbsetForm.numberSerialnoList"
                                            row-key="ID"
                                            border
                                            stripe
                                            :fit="true"
                                            highlight-current-row
                                            style="width: 100%;"
                                            @cell-click="iconOperation"
                                            :default-sort="{prop:'dataInfo.numberSerialnoList', order: 'descending'}"
                                        >

                                            <el-table-column prop="numberPrefix" label="编号前缀">
                                            <template slot-scope="scope">
                                                <el-form-item
                                                :prop="'numberSerialnoList.'+scope.$index + '.numberPrefix'"
                                                >
												 <span>{{scope.row.numberPrefix}}</span>
                                                </el-form-item>
                                            </template>
                                            </el-table-column>

                                            <el-table-column prop="serialnum" label="序号" sortable width="420px">
                                            <template slot-scope="scope">
                                                <el-form-item
                                                :prop="'numberSerialnoList.'+scope.$index + '.serialnum'"
                                                >
                                                <el-input
                                                    size="small"
                                                    v-model="scope.row.serialnum"
                                                    placeholder="请输入"
                                                ></el-input>
                                                </el-form-item>
                                            </template>
                                            </el-table-column>
                                            <el-table-column fixed="right" label="操作" width="120">
                                            <template slot-scope="scope">
                                                <el-button
                                                @click.native.prevent="deleteRow(scope.$index,scope.row,'numberSerialnoList')"
                                                type="text"
                                                size="small"
                                                v-if="!viewtitle"
                                                >
                                                <i class="icon-trash red"></i>
                                                </el-button>
                                            </template>
                                            </el-table-column>
                                        </el-table>
                                        </el-tab-pane>
                                    </el-tabs>
								</div>			
								<el-collapse-item title="其他" name="2"  v-show="views">
									<el-row>
										<el-col :span="8">
											<el-form-item label="录入人"  label-width="110px">
												<el-input v-model="numbsetForm.createuserDesc" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" label-width="80px">
												<el-input v-model="numbsetForm.createTime" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="机构" prop="deptidDesc" label-width="100px">
												<el-input v-model="numbsetForm.deptidDesc" placeholder="当前录入人机构" :disabled="edit">
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
										<el-form-item label="变更人" label-width="110px">
												<el-input v-model="numbsetForm.updateUser" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="变更时间"  label-width="80px">
												<el-input v-model="numbsetForm.updateTime" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</div>

						<div class="content-footer" v-show="noviews">
							<el-button type="primary" @click="submitForm">保存</el-button>
							<el-button @click="cancelForm">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
			<!-- 弹出 -->
            <appmask ref="appchild" @appdata='appdata'></appmask>
            <datamask ref="datachild" @appdata='data'></datamask>
			<deptmask ref="deptchild" @deptdata='deptdata'></deptmask>
            <!-- <deptmask ref="deptchild" @deptdata = "deptdata"></deptmask> -->
		</div>
	</div>
</template>

<script>
    import Config from '../../config.js'
    import appmask from '../common/common_mask/applicationmask.vue'//应用管理
	import datamask from '../common/common_mask/datamask.vue'//数据管理
	import deptmask from '../common/common_mask/deptmask.vue'//机构管理
	export default {
        name: 'masks',
        components: {
            appmask,
			datamask,
			deptmask,
		},
		data() {
			return {
                options: [{
                    value: '1',
                    label: '是'
                    }, {
                    value: '0',
                    label: '否'
				}],
				
                value: '',
				basic_url: Config.dev_url,
				modify:false,//修订、修改人、修改时间
				selMenu:[],
				dialogVisible: false, //对话框
				edit: true, //禁填
                activeNames: ['1','2','3'], //手风琴数量
				activeName: "first", //tabs
				activeName1:"first",
				show: false,
				isok1: true,
                isok2: false,
                numbsetForm:{},
				numPrefixTypeoption:[],//类型
				dateFormatoption:[],
				initDateFormatoption:[],
				rules:{
          			markx:[{ required: true, message: '必填',}],
                    marky:[{ required: true, message: '必填',}],
                    retain:[{ required: true, message: '必填',}],
                    increase:[{ required: true, message: '必填',}],
                    initnum:[{ required: true, message: '必填',}],
                    initformat:[{ required: true, message: '必填',}]
          			// S_NUM:[
					// 	{ required: true, message: '必填', trigger: 'blur'},
					// 	{ validator: this.Validators.isInteger, trigger: 'blur'}
					// ],
          		
	          	},
	          	addtitle:true,
				modifytitle:false,
				viewtitle:false,
				noedit:false,//可编辑
				views:false,//录入修改人信息
				noviews:true,//按钮
				modify:false,//修订
				numbsetForm:{
					isCustomUse:'0',
					isMultiple:'0',
					isInitbydate:'0',
					markx:'',
					marky:'',
					markz:'',
					initformat:'',
					initnum:'',
					increase:'',
					issplicingdate:'',
					splicingformat:'',
					serialnum:'',
					retain:'',
					createuser:'',
					createuserDesc:'',
					updateuser:'',
                    updateuserDesc:'',
                    numberPrefixList:[],
				}
			};
		},
		methods: {
            add(){
                var obj = {
                    category:'',
                    value:'',
                    suffix:'',
                    prefix:'',

                };
                this.numbsetForm.numberPrefixList.push(obj);
            },
            iconOperation(row, column, cell, event) {
                if (column.property === "iconOperation") {
                    row.isEditing = !row.isEditing;
                }
            },
            
			//form表单内容清空
			resetNew(){
                this.numbsetForm = {
					isCustomUse:'0',
					isMultiple:'0',
					isInitbydate:'0',
					markx:'',
					marky:'',
					markz:'',
					initformat:'',
					initnum:'',
					increase:'',
					issplicingdate:'',
					splicingformat:'',
					serialnum:'',
					retain:'',
					createuser:'',
					createuserDesc:'',
					updateuser:'',
                    updateuserDesc:'',
                    numberPrefixList:[],
				}
            },
            getapp(){
                this.$refs.appchild.requestData('cus');
            },
            appdata(val){
                this.numbsetForm.markx=val;
            },
            getdata(){
                this.$refs.datachild.visible();
            },
            data(val){
                this.numbsetForm.marky=val;
			},
			//子表机构
			getdept(index){
				this.index=index;
                this.$refs.deptchild.visible();
			},
			//机构赋值
            deptdata(val){
				this.numbsetForm.numberPrefixList[this.index].valueDesc=val[1];
				this.numbsetForm.numberPrefixList[this.index].value=val[4];
            },
            adddata() {
            	this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.numbsetForm.createuser=res.data.id;
					this.numbsetForm.createuserDesc=res.data.nickname;
					var date=new Date();
					this.numbsetForm.createtime = this.$moment(date).format("YYYY-MM-DD  HH:mm:ss");
				}).catch((err)=>{
				})
				this.resetNew();
            	this.addtitle = true;
				this.modifytitle = false;
				this.viewtitle = false;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.modify = false;//修订
				this.show=true;
			},
			data(id){
				var url=this.basic_url + '/api-user/number/'+id;
                this.$axios.get(url,{}).then((res)=>{
					this.numbsetForm=res.data;
					this.show = true;
				}).catch((err)=>{
				})
			},
			detail(id) {//修改内容时从父组件带过来的
			this.data(id);
            	this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
					this.numbsetForm.updateuser=res.data.id;
					this.numbsetForm.updateuserDesc=res.data.nickname;
					var date=new Date();
					this.numbsetForm.updatetime = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err)=>{
                });
            	this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle = false;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				this.modify = true;//修订
            	
            },
            //这是查看
			view(id) {
				this.data(id);
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮			
			},
			//刪除新建行
			deleteRow(index, row, listName){
				var TableName = '';
				if(listName =='numberPrefixList'){
					TableName = 'numberPrefixList';
				}else{
					TableName = 'numberSerialnoList';
				}
				if(row.ID){
					var url = this.basic_url + '/api-apps/number/' + TableName +'/' + row.id;
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {}).then((res) => {
							if(res.data.resp_code == 0){
								this.numbsetForm[TableName].splice(index,1);
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
					this.numbsetForm[TableName].splice(index,1);
				}
			},
			//点击关闭按钮
			close() {
				this.show = false;
			},
			cancelForm(){
				this.show = false;
				this.resetNew();
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
			//保存
			submitForm() {
				this.$refs.numbsetForm.validate((valid) => {
		          if (valid) {
					var url = this.basic_url + '/api-user/number/saveOrUpdateCus';
					this.$axios.post(url, this.numbsetForm).then((res) => {
						//resp_code == 0是后台返回的请求成功的信息
						if(res.data.resp_code == 0) {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							//重新加载数据
							this.$emit('request');
							this.$refs.numbsetForm.resetFields();
							this.show = false;
						}else{
                          this.$message({
								message: res.data.resp_msg,
								type: 'warning'
							});  
                        }
					}).catch((err) => {
					});
		          }else {
						this.show = true;
						this.$message({
							message: '未填写完整，请填写',
							type: 'warning'
						});
					}
		        });
				
			},
			handleClose(done) {//大弹出框确定关闭按钮
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {
				console.log('取消关闭');
				$('.v-modal').hide();
			});
            },
            //编号的段落设置类型
            numPrefixType(){
                var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=numPrefixType';
                this.$axios.get(url, {}).then((res) => {
                	this.numPrefixTypeoption = res.data;
				}).catch((wrong) => {
				})	
			},
			//编号的段落设置类型中的日期
            dateFormat(){
                var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=dateFormat';
                this.$axios.get(url, {}).then((res) => {
                	this.dateFormatoption = res.data;
				}).catch((wrong) => {
				})	
			},
			//初始化日期格式
            initDateFormat(){
                var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=initDateFormat';
                this.$axios.get(url, {}).then((res) => {
                	this.initDateFormatoption = res.data;
				}).catch((wrong) => {
				})	
            },
        },
        mounted(){
			this.numPrefixType();
			this.dateFormat();
        }
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>