<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加用印管理</div>
					<div class="mask_title" v-show="modifytitle">修改用印管理</div>
					<div class="mask_title" v-show="viewtitle">查看用印管理</div>
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
					<el-form :model="USESEAL" inline-message :rules="rules" ref="USESEAL" label-width="110px" class="demo-adduserForm">
						<div class="accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="用印管理" name="1">
									<el-row>
										<el-col :span="8">
											<el-form-item label="工作任务单编号" prop="WONUM">
												<el-input v-model="USESEAL.WONUM" :disabled="true">
                                                    <el-button slot="append" icon="el-icon-search" @click="addworkorder"></el-button>
                                                </el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="委托书编号" prop="PROXYNUM">
												<el-input v-model="USESEAL.PROXYNUM" :disabled="true">
                                                    <el-button slot="append" icon="el-icon-search" @click="addinspect"></el-button>
                                                </el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托书版本" prop="PROXY_VERSION">
												<el-input v-model="USESEAL.PROXY_VERSION" :disabled="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
                                    <el-row>
                                         <el-col :span="8">
											<el-form-item label="用印人" prop="USERDesc">
												<el-input v-model="USESEAL.USERDesc" :disabled="true">
                                                    <el-button slot="append" icon="el-icon-search" @click="addperson('use')"></el-button>
                                                </el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="用印时间" prop="USETIME">
                                                <el-date-picker v-model="USESEAL.USETIME" type="date" placeholder="请选择" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
                                            <el-form-item label="用印人机构" prop="SEAL_DEPARTMENT">
                                                <el-select clearable v-model="USESEAL.SEAL_DEPARTMENT" filterable allow-create default-first-option placeholder="请选择" :disabled="noedit">
                                                    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
                                                </el-select>
                                            </el-form-item>
										</el-col>
									</el-row>
                                    <el-row>
                                        <el-col :span="8">
											<el-form-item label="归还时间" prop="GHTIME">
												<el-date-picker v-model="USESEAL.GHTIME" type="date" placeholder="请选择" value-format="yyyy-MM-dd" style="width: 100%;" :disabled="noedit">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="归还接收人" prop="GHUSERDesc">
												<el-input v-model="USESEAL.GHUSERDesc" :disabled="true">
                                                    <el-button slot="append" icon="el-icon-search" @click="addperson('back')"></el-button>
                                                </el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
								<el-collapse-item title="其它" name="2" v-show="views">
									<el-row>
										<el-col :span="8">
											<el-form-item label="录入人" prop="ENTERBYDesc">
												<el-input v-model="USESEAL.ENTERBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="ENTERDATE">
												<el-input v-model="USESEAL.ENTERDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8" v-if="dept">
											<el-form-item label="机构" prop="DEPTIDDesc">
												<el-input v-model="USESEAL.DEPTIDDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改人" prop="CHANGEBYDesc">
												<el-input v-model="USESEAL.CHANGEBYDesc" placeholder="当前修改人" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" prop="CHANGEDATE">
												<el-input v-model="USESEAL.CHANGEDATE" placeholder="当前修改时间" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="el-dialog__footer" v-show="noviews">
							<el-button type="primary" @click="saveAndUpdate()">保存</el-button>
							<el-button type="success" @click="saveAndSubmit()" v-show="addtitle">保存并继续</el-button>
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
            <!-- 人员 -->
			<el-dialog :modal-append-to-body="false" :visible.sync="dialogPerson" width="60%" :before-close="handleClose"  title="用户信息" >
				<el-form :model="searchList">
							<el-row :gutter="10">
								<!-- <el-col :span="5">
									<el-form-item label="用户名" prop="username" label-width="55px">
										<el-input v-model="searchList.username">
										</el-input>
									</el-form-item>
								</el-col> -->
								<el-col :span="5">
									<el-form-item label="姓名" prop="nickname" label-width="45px">
										<el-input v-model="searchList.nickname">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
                                    <el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
                                    <el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;    margin-left: 2px">重置</el-button>
                                </el-col>
							</el-row>
						</el-form>
				<el-table :header-cell-style="rowClass" :data="gridData" line-center border stripe height="350px" style="width: 100%;" :default-sort="{prop:'gridData', order: 'descending'}" @selection-change="SelChange">
					<el-table-column type="selection" width="55" fixed>
					</el-table-column>
					<el-table-column label="ID" sortable width="150px" prop="id">
					</el-table-column>
					<el-table-column label="姓名" sortable prop="nickname">
					</el-table-column>
					<!-- <el-table-column label="机构" sortable width="200px" prop="deptName">
					</el-table-column>
					<el-table-column label="公司" sortable width="200px" prop="companyName">
					</el-table-column> -->
				</el-table>
				<el-pagination background class="pull-right" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
				</el-pagination>
				<span slot="footer" class="dialog-footer">
	    			<el-button type="primary" @click="confirmPerson">确 定</el-button>
	    			<el-button @click="dialogPerson = false">取 消</el-button>
	  			</span>
			</el-dialog>
            <!-- 工作任务单  -->
			<workordermask ref="workorderchild" @appendwork="appendwork"></workordermask>
            <!-- 委托书编号  -->
			<inspectmask ref="inspectchild" @appendpro="appendpro" @appendver="appendver"></inspectmask>
		</div>
	</div>
</template>

<script>
    import Config from '../../config.js'
    import workordermask from '../common/common_mask/workordersmask.vue'//工作任务单
    import inspectmask from '../common/common_mask/inspectmask.vue'//委托书编号
	export default {
        name: 'masks',
        components: {
            workordermask,
            inspectmask
		},
		data() {
			// var validateNum = (rule, value, callback) => {
			// 	if(value != ""){
		    //          if((/^[0-9a-zA-Z()（）]+$/).test(value) == false){
		    //              callback(new Error("请填写数字、字母或括号（编码不填写可自动生成）"));
		    //          }else{
		    //              callback();
		    //          }
		    //      }else{
		    //          callback();
		    //      }
			// };
			// var validateType = (rule, value, callback) => {
			// 	if(value === '') {
			// 		callback(new Error('请填写产品类别名称'));
			// 	} else {
			// 		if((/^[!@#$%^&*";',.~！@#￥%……&*《》？，。?、|]+$/).test(value) == true){
		    //              callback(new Error("请规范填写名称"));
		    //         }else{
		    //             callback();
		    //         }
			// 	}
			// };
			return {
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				selUser: [],
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				activeNames: ['1','2'], //手风琴数量
				dialogVisible: false, //对话框
				selectData: [],
				rules: {
					// NUM: [{required: false,trigger: 'change',validator: validateNum,}],
					// TYPE: [{required: true,trigger: 'blur',validator: validateType,}],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
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
                USESEAL:{
                    ID:'',
                    WONUM:'',
                    PROXYNUM:'',
                    PROXY_VERSION:'',
                    USER:'',
                    USETIME:'',
                    DEPARTMENT:'',
                    GHTIME:'',
                    GHUSER:'',
                    STATUS:'1',
                    SYNCHRONIZATION_TIME:'',
                    DEPTID:'',
                    SEAL_DEPARTMENT:'',
                    ENERDATE:'',
                    ENERBY:'',
                    CHANGEBY:'',
                    CHANGEDATE:'',
                },
                dialogPerson:false,//人员信息弹出框
                pertips:'',//选择人员参数
                gridData: [], //人员彈出框的數據
                searchList:{
                    nickname:''
                },
                page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
			};
		},
		methods: {
			//编码提示
			// hint(){
			// 	this.hintshow = true;
			// },
			// hinthide(){
			// 	this.hintshow = false;
            // },
            //表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			//获取导入表格勾选信息
			SelChange(val) {
				this.selUser = val;
			},
			//生成随机数函数
			rand(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
            },
            //机构值
			getCompany() {
				var type = "2";
				var url = this.basic_url + '/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.selectData = res.data;
				});
            },
            resetbtn(){
                this.searchList =  { //点击高级搜索后显示的内容
                    nickname:''
                };
            },
			//点击按钮显示弹窗
			visible() {
                this.USESEAL.GHUSER = '1';//添加好放大镜后去掉
                this.USESEAL.USER = '2';//添加好放大镜后去掉
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.USESEAL.DEPTID = res.data.deptId;
					this.USESEAL.ENTERBY = res.data.id;
					var date = new Date();
					this.USESEAL.ENTERDATE = this.$moment(date).format("YYYY-MM-DD");
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试1',
						type: 'error'
					});
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
			detail(data) {
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
					this.USESEAL.DEPTID = res.data.deptId;//传给后台机构id
					this.USESEAL.CHANGEBY = res.data.id;
					var date = new Date();
					this.USESEAL.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD");
					//深拷贝数据
					let _obj = JSON.stringify(this.USESEAL);
        			this.USESEAL = JSON.parse(_obj);
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试2',
						type: 'error'
					});
                });
                this.USESEAL = data;
                for(var j=0;j<this.selectData.length;j++){
                    if(this.USESEAL.SEAL_DEPARTMENT==this.selectData[j].id){
                        this.USESEAL.SEAL_DEPARTMENT=this.selectData[j].fullname
                    }
                }
                console.log(this.USESEAL);
				this.show = true;
			},
			//这是查看
			view(data) {
                this.USESEAL = data;
                for(var j=0;j<this.selectData.length;j++){
                    if(this.USESEAL.SEAL_DEPARTMENT==this.selectData[j].id){
                        this.USESEAL.SEAL_DEPARTMENT=this.selectData[j].fullname
                    }
                }
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.show = true;				
            },
            sizeChange(val) {
				this.page.pageSize = val;
			},
			currentChange(val) {
				this.page.currentPage = val;
            },
            addworkorder(){//工作任务单
                this.$refs.workorderchild.visible();
            },
            appendwork(value){
                this.USESEAL.WONUM = value;	
            },
            addinspect(){//委托书编号
				this.$refs.inspectchild.visible();
            },
            appendpro(value){
                console.log(value);
				this.USESEAL.PROXYNUM = value;	
			},
			appendver(value){
                console.log(value);
				this.USESEAL.PROXY_VERSION = value;
            },
            searchinfo() {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.addperson();
			},
            addperson(pertips){
                var data = {
					page: this.page.currentPage,
                    limit: this.page.pageSize,
                    nickname: this.searchList.nickname,
					username: this.searchList.username,
				}
                var url = this.basic_url + '/api-user/users';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.gridData = res.data.data;
				});
				this.dialogPerson = true;	
                this.pertips = pertips;
            },
            confirmPerson(){
                if(this.selUser.length == 0){
                    this.$message({
                        message:'请选择数据',
                        type: 'warning'
                    });
                }else if(this.selUser.length > 1){
                    this.$message({
                        message:'不可选择多条数据',
                        type: 'warning'
                    });
                }else{
                    if(this.pertips == 'use'){
                        this.USESEAL.USER = this.selUser[0].id;
                        this.USESEAL.USERDesc = this.selUser[0].nickname;
                        this.dialogPerson = false;
                    }else if(this.pertips == 'back'){
                        this.USESEAL.GHUSER = this.selUser[0].id;
                        this.USESEAL.GHUSERDesc = this.selUser[0].nickname;
                        this.dialogPerson = false;
                    }
                }
            },
            //清空
			reset() {
				this.USESEAL = {
					ID:'',
                    WONUM:'',
                    PROXYNUM:'',
                    PROXY_VERSION:'',
                    USER:'',
                    USETIME:'',
                    DEPARTMENT:'',
                    GHTIME:'',
                    GHUSER:'',
                    STATUS:'1',
                    SYNCHRONIZATION_TIME:'',
                    DEPTID:'',
                    SEAL_DEPARTMENT:'',
                    ENERDATE:'',
                    ENERBY:'',
                    CHANGEBY:'',
                    CHANGEDATE:'',
				};
				// if(this.$refs['USESEAL'] !== undefined) {
				// 	this.$refs['USESEAL'].resetFields();
				// }
			},
			//点击关闭按钮
			close() {
				this.show = false;
				this.reset();//关闭弹框去掉勾选
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
			save() {
				this.$refs.USESEAL.validate((valid) => {
					if(valid) {
                        if(typeof(this.USESEAL.SEAL_DEPARTMENT) != 'undefined') {
                            for(var j=0;j<this.selectData.length;j++){
                                if(this.USESEAL.SEAL_DEPARTMENT==this.selectData[j].fullname){
                                    this.USESEAL.SEAL_DEPARTMENT=this.selectData[j].id
                                }
                            }		
                        }
                        var url = this.basic_url + '/api-apps/app/sealUse/saveOrUpdate';
                        console.log(this.USESEAL);
						this.$axios.post(url, this.USESEAL).then((res) => {
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								//重新加载数据
								this.$emit('request');
								// this.$emit('reset');
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
								message: '网络错误，请重试3',
								type: 'error'
							});
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
			saveAndUpdate() {
				this.save();
				if(this.falg){
					this.show = false;
				}
			},
			//保存并继续
			saveAndSubmit() {
				this.save();
				this.reset();
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
			this.getCompany();
		},
		
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>