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
						<span class="mask_span mask_max" @click="toggle">
							<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						</span>
						<span class="mask_span" @click="close">
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content">
					<el-form inline-message :model="USESEAL" :rules="rules" ref="USESEAL" label-width="110px" class="demo-adduserForm">
						<!-- <div class="text-center" v-show="viewtitle">
							<span v-if="this.USESEAL.STATE!=3">
							<el-button class="start" type="success" round plain size="mini" @click="startup" v-show="start" ><i class="icon-start"></i> 启动流程</el-button>
							<el-button class="approval" type="warning" round plain size="mini" @click="approvals" v-show="approval"><i class="icon-edit-3"></i> 审批</el-button>
							</span>
							<el-button type="primary" round plain size="mini" @click="flowmap" ><i class="icon-git-pull-request"></i> 流程地图</el-button>
							<el-button type="primary" round plain size="mini" @click="flowhistory"><i class="icon-plan"></i> 流程历史</el-button>
							<el-button type="primary" round plain size="mini" @click="viewpepole"><i class="icon-user"></i> 当前责任人</el-button>
						</div> -->
						<div class="content-accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="用印信息" name="1">
									<el-row class="pb10">
										<el-col :span="5" class="pull-right pr10">
											<el-input v-model="USESEAL.STATEDesc" :disabled="edit">
												<template slot="prepend">流程状态</template>
											</el-input>
										</el-col>
										<el-col :span="5" class="pull-right pr10">
											<el-input v-model="USESEAL.PROXY_TYPEDesc" :disabled="edit">
												<template slot="prepend">检测类型</template>
											</el-input>
										</el-col>
										<el-col :span="7" class="pull-right pr10">
											<el-input v-model="USESEAL.REPORT_NUM" :disabled="edit">
												<template slot="prepend">报告编号</template>
											</el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8">
											<el-form-item label="委托单位名称" prop="V_NAME">
												<el-input v-model="USESEAL.V_NAME" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="委托书编号" prop="PROXYNUM">
												<el-input v-model="USESEAL.PROXYNUM" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="委托书版本" prop="VERSION">
												<el-input v-model="USESEAL.VERSION" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									
									<el-row>
										<el-col :span="8">
											<el-form-item label="完成日期" prop="COMPDATE">
												<el-input v-model="USESEAL.COMPDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="完成方式" prop="COMPMODE">
												<el-input v-model="USESEAL.COMPMODE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="报告份数" prop="REPORT_QUALITY">
												<el-input v-model="USESEAL.REPORT_QUALITY" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

                                    <el-row>
                                         <el-col :span="8">
											<el-form-item label="用印人" prop="USERDesc">
												<el-autocomplete v-model="USESEAL.USERDesc" placeholder="请输入内容" :fetch-suggestions="querySearchAsync" @select="handleSelect" style="width: 100%;">
                                                    <el-button slot="append" icon="el-icon-search" @click="addperson('use')"></el-button>
                                                </el-autocomplete>
											</el-form-item>
										</el-col>
										<el-col :span="8">
                                            <el-form-item label="用印人机构" prop="SEAL_DEPARTMENTDesc">
												<!-- <el-input v-model="USESEAL.SEAL_DEPARTMENTDesc" :disabled="edit"></el-input> -->
                                                <el-select clearable v-model="USESEAL.SEAL_DEPARTMENTDesc" :disabled="edit" filterable allow-create default-first-option placeholder="请选择" style="width: 100%;">
                                                    <el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
                                                </el-select>
                                            </el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="用印时间" prop="USETIME">
                                                <el-date-picker v-model="USESEAL.USETIME" type="date" placeholder="请选择" value-format="yyyy-MM-dd" style="width: 100%;">
												</el-date-picker>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row>
										<el-col :span="8">
											<el-form-item label="签发人" prop="ENTERBYDesc">
												<el-input v-model="USESEAL.ENTERBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
                                        <el-col :span="8">
											<el-form-item label="签发日期" prop="ENTERDATE">
												<el-input v-model="USESEAL.ENTERDATE" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="用印管理员" prop="ENTERBYDesc">
												<el-input v-model="USESEAL.ENTERBYDesc" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

                                    <!-- <el-row>
                                        <el-col :span="8">
											<el-form-item label="归还时间" prop="GHTIME">
												<el-date-picker v-model="USESEAL.GHTIME" type="date" placeholder="请选择" value-format="yyyy-MM-dd" style="width: 100%;">
												</el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="归还接收人" prop="GHUSERDesc">
												<el-input v-model="USESEAL.GHUSERDesc" :disabled="edit">
                                                    <el-button slot="append" icon="el-icon-search" @click="addperson('back')"></el-button>
                                                </el-input>
											</el-form-item>
										</el-col>
									</el-row> -->
								</el-collapse-item>
								<!-- <el-collapse-item title="其他" name="2" v-show="views">
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
								</el-collapse-item> -->
							</el-collapse>
						</div>
						<div class="content-footer" v-show="!addtitle">
							<el-button type="success" v-show="USESEAL.STATE=='9'" @click="submited">确认盖章</el-button>
							<el-button type="primary" @click="readAuth">查看报告文件</el-button>
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
			</div>
            <!-- 人员 -->
			<el-dialog :modal-append-to-body="false" :visible.sync="dialogPerson" width="60%"  title="用户信息">
				<!--查询-->
				<el-form inline-message :model="searchList">
					<el-row :gutter="10">
						<el-col :span="5">
							<el-form-item label="用户名" prop="username" label-width="55px">
								<el-input v-model="searchList.username">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="姓名" prop="nickname" label-width="45px">
								<el-input v-model="searchList.nickname">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
							<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px; margin-left: 2px">重置</el-button>
						</el-col>
					</el-row>
				</el-form>
				<v-table ref="tablePlugin" :appName="appName" :selectWay="selectWay" :newHeight="newHeight" :searchList="searchList" @getSelData="setSelData">
					<el-table-column label="用户名" sortable width="200px" prop="username">
					</el-table-column>
					<el-table-column label="姓名" sortable prop="nickname">
					</el-table-column>
					<el-table-column label="机构" sortable width="200px" prop="deptName">
					</el-table-column>
				</v-table>
					<!-- <el-table :header-cell-style="rowClass" :data="gridDataList" line-center border stripe height="350px" style="width: 100%;"
					:default-sort="{prop:'gridDataList', order: 'descending'}"
					@selection-change="SelChange"
						v-loading="loading"
						element-loading-text="加载中…"
						element-loading-spinner="el-icon-loading"
						element-loading-background="rgba(255, 255, 255, 0.9)">
						<el-table-column type="selection" width="55" fixed></el-table-column>
						<el-table-column type="index" label="序号" width="50">
							<template slot-scope="scope">
							<span> {{(page.currentPage-1)*page.pageSize+scope.$index+1}} </span>
							</template>
						</el-table-column>
						<el-table-column label="用户名" sortable width="200px" prop="username">
						</el-table-column>
						<el-table-column label="姓名" sortable prop="nickname">
						</el-table-column>
						<el-table-column label="机构" sortable width="200px" prop="deptName">
						</el-table-column>
					</el-table>
					<el-pagination
						background
						class="text-right pt10"
						@size-change="sizeChange"
						@current-change="currentChange"
						:current-page="page.currentPage"
						:page-sizes="[10, 20, 30, 40]"
						:page-size="page.pageSize"
						layout="total, sizes, prev, pager, next"
						:total="page.totalCount">
					</el-pagination> -->
				<span slot="footer" class="dialog-footer">
	    			<el-button type="primary" @click="confirmPerson">确 定</el-button>
	    			<el-button @click="DialogClose">取 消</el-button>
	  			</span>
			</el-dialog>
            <!-- 工作任务单  -->
			<workordermask ref="workorderchild" @appendwork="appendwork"></workordermask>
            <!-- 委托书编号  -->
			<inspectmask ref="inspectchild" @appendpro="appendpro" @appendver="appendver"></inspectmask>
			<!--审批页面-->
			<approvalmask :approvingData="approvingData" ref="approvalChild" @detail="detailgetData"  ></approvalmask>
			<!--流程历史-->
			<flowhistorymask :approvingData="approvingData"  ref="flowhistoryChild" ></flowhistorymask>
			<!--流程地图-->
			<flowmapmask :approvingData="approvingData" ref="flowmapChild" ></flowmapmask>
			<!--当前责任人-->
			<vewPoplemask :approvingData="approvingData"  ref="vewPopleChild" ></vewPoplemask>
		</div>
	</div>
</template>

<script>
    import Config from '../../config.js'
    import workordermask from '../common/common_mask/workordersmask.vue'//工作任务单
	import inspectmask from '../common/common_mask/inspectmask.vue'//委托书编号
	import approvalmask from '../workflow/approving.vue'
	import flowhistorymask from '../workflow/flowhistory.vue'
	import flowmapmask from '../workflow/flowmap.vue'
	import vewPoplemask from '../workflow/vewPople.vue'
	import vTable from '../plugin/table/table.vue'
	export default {
        name: 'masks',
        components: {
            workordermask,
			inspectmask,
			approvalmask,
			flowhistorymask,
			flowmapmask,
			vewPoplemask,
			'v-table': vTable
		},
		data() {
			return {
				appName: 'api-user',//用印人
				newHeight: '300',//传给弹出框表格高度
				selectWay: 'radio',//table选择方式
				approvingData:{},//流程数据
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				po_url:Config.po_url,//pageoffice 服务路径
				loading: false,
				loadSign: true,//加载
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
					USERDesc:[
						{required: true, message: '请选择'}
					],
					USETIME:[
						{required: true, message: '请选择'}
					],
					SEAL_DEPARTMENTDesc:[
						{required: true, message: '请选择'}
					],
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据
				addtitle:true,
				modifytitle:false,
				viewtitle:false,
				dept:false,
				noedit:false,//可编辑
				views:false,//录入修改人信息
				noviews:true,//按钮
				modify:false,//修订
				hintshow:false,
				statusshow1:true,
				statusshow2:false,
				approval:false,
				start:false,
                USESEAL:{
                    ID:'',
                    WONUM:'',
                    PROXYNUM:'',
                    VERSION:'',
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
					STATE:'',//流程状态
                    STATEDesc:'',
                },
                dialogPerson:false,//人员信息弹出框
                pertips:'',//选择人员参数
                gridDataList: [], //人员彈出框的數據
                searchList:{
					username:'',
                    nickname:''
                },
                page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				sealUse:'sealUse',//appname
				dataid:'',
				username:'',
				userName: [], //用于存用印人
			};
		},
		methods: {
			//获取用印人
			getUsers(){
				var data = {
					page: this.page.currentPage,
                    limit: this.page.pageSize,
					username: this.searchList.username,
                    nickname: this.searchList.nickname,
				}
                var url = this.basic_url + '/api-user/users';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					let datas=res.data.data;
					this.page.totalCount = res.data.count;
					this.gridDataList = res.data.data;
					for(let i=0;i<datas.length;i++){
            			this.userName.push(datas[i].nickname);
					}
					console.log(this.gridDataList);
				});
			},
			//用印人-文本框直接搜索数据
			querySearchAsync(queryString, callback) {
				var list = [{}];
				let param = {
					pageNum: 1,
					pageSize: 9999,
					key: queryString
				} 
				this.userName.forEach(function(item,i){
					if(item.indexOf(queryString) != -1){
						list.push({"value":item});   
					}
				})
				if(!queryString){
					list = list.splice(0,20);
				}
				callback(list);
			},
			//用印人-输入数据点击选中触发赋值
   			handleSelect(item){
				this.accountSearch = item.value;
				for(let i=0;i<this.gridDataList.length;i++){
					if(item.value==this.gridDataList[i].nickname){
						this.USESEAL.USER = this.gridDataList[i].id;//用户ID
						this.USESEAL.USERDesc = this.gridDataList[i].nickname;//用户姓名
						this.USESEAL.SEAL_DEPARTMENT = this.gridDataList[i].deptId;//用户机构ID
						this.USESEAL.SEAL_DEPARTMENTDesc = this.gridDataList[i].deptName;//用户机构名称
					}
				}

			},
			
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
			setSelData(val) {
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
			//点击重置-用印人
            resetbtn(){
				this.searchList =  { //点击高级搜索后显示的内容
					username:'',
                    nickname:''
				};
				this.addperson();
            },
			//添加显示弹窗
			visible() {
                this.USESEAL.GHUSER = '1';//添加好放大镜后去掉
                this.USESEAL.USER = '2';//添加好放大镜后去掉
				this.$axios.get(this.basic_url + '/api-user/users/currentMap', {}).then((res) => {
					this.USESEAL.DEPTID = res.data.deptId;
					this.USESEAL.ENTERBY = res.data.id;
					var date = new Date();
					this.USESEAL.ENTERDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
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
			detailgetData(){
				var url = this.basic_url +'/api-apps/app/sealUse/' +this.dataid;
				this.$axios.get(url, {}).then((res) => {
					this.USESEAL = res.data;
					 for(var j=0;j<this.selectData.length;j++){
                    	if(this.USESEAL.SEAL_DEPARTMENT==this.selectData[j].id){
                        	this.USESEAL.SEAL_DEPARTMENT=this.selectData[j].fullname
                    	}
               		 }
					this.show = true;
					this.clearValidate();//清空表单验证
				}).catch((err) => {
				});
			},
			// 这里是修改
			detail(id) {
				this.dataid=id;
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
					this.USESEAL.CHANGEDATE = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
				}).catch((err) => {
                });
                // for(var j=0;j<this.selectData.length;j++){
                //     if(this.USESEAL.SEAL_DEPARTMENT==this.selectData[j].id){
                //         this.USESEAL.SEAL_DEPARTMENT=this.selectData[j].fullname
                //     }
                // }
                // console.log(this.USESEAL);
				// // this.show = true;
				this.detailgetData();
			},
			//这是查看
			view(id) {		
				this.dataid=id;
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.show = true;	
				//判断启动流程和审批的按钮是否显示
				this.detailgetData();
				var url = this.basic_url + '/api-apps/app/sealUse/flow/isStart/'+this.dataid;
				this.$axios.get(url, {}).then((res) => {
					if(res.data.resp_code==1){
						this.start=true;
						this.approval=false;
					}else{
						var url = this.basic_url + '/api-apps/app/sealUse/flow/Executors/'+this.dataid;
						console.log(url);
						this.$axios.get(url, {}).then((res) => {
							// console.log(res.data.datas);
							res.data.CJDW = Number(res.data.CJDW);
							var resullt=res.data.datas;
							var users='';

							for(var i=0;i<resullt.length;i++){
								users = users + resullt[i].username+",";
								// console.log("users----"+users);
							}
							console.log(this.username);
							if(users.indexOf(this.username) != -1){
								this.approval=true;
								this.start=false;
							}else{
								this.approval=false;
								this.start=false;
							}
						});
					}
				});			
			},
			loadMore () {//滚动加载数据
			   if (this.loadSign) {
			     this.loadSign = false
			     this.page.currentPage++
			     if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			       return
			     }
			     setTimeout(() => {
			       this.loadSign = true
			     }, 1000)
			     this.addperson();//用户列表数据
			   }
			},
			//分页
            sizeChange(val) {
				this.page.pageSize = val;
				this.addperson();//用户列表数据
			},
			//当前页
			currentChange(val) {
				this.page.currentPage = val;
				this.addperson();//用户列表数据
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
				this.USESEAL.VERSION = value;
			},
			//点击搜索-用印人
            searchinfo() {
				this.addperson();
			},
			//选择用印人
			addperson(pertips){
            	if(!this.$refs.tablePlugin){
					setTimeout(()=>{
						this.$refs.tablePlugin.requestData();//requestData子组件中接收数据的方法名
					}, 0);
				}else{
					this.$refs.tablePlugin.requestData();
				}
				this.dialogPerson = true;	
                this.pertips = pertips;
			},
            // addperson(pertips){
            // 	this.loading = true;
            //     var data = {
			// 		page: this.page.currentPage,
            //         limit: this.page.pageSize,
			// 		username: this.searchList.username,
            //         nickname: this.searchList.nickname,
			// 	}
            //     var url = this.basic_url + '/api-user/users';
			// 	this.$axios.get(url, {
			// 		params: data
			// 	}).then((res) => {
			// 		this.page.totalCount = res.data.count;
			// 		this.gridDataList = res.data.data;
			// 		this.loading = false;
			// 	});
			// 	this.dialogPerson = true;	
            //     this.pertips = pertips;
			// },
			//选择用印人-确定按钮
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
                    this.resetBasisInfo();//调用resetBasisInfo函数
                    if(this.pertips == 'use'){
                        this.USESEAL.USER = this.selUser[0].id;
						this.USESEAL.USERDesc = this.selUser[0].nickname;
						this.USESEAL.SEAL_DEPARTMENT = this.selUser[0].deptId;
						this.USESEAL.SEAL_DEPARTMENTDesc = this.selUser[0].deptName;
                        // this.dialogPerson = false;
                    }else if(this.pertips == 'back'){
                        this.USESEAL.GHUSER = this.selUser[0].id;//归还人
                        this.USESEAL.GHUSERDesc = this.selUser[0].nickname;//归还时间
                        // this.dialogPerson = false;
                    }
                }
            },
            DialogClose(){//点击取消按钮
				this.resetBasisInfo();//调用resetBasisInfo函数
			},
			resetBasisInfo(){//点击确定或取消按钮时重置数据20190303
				this.dialogPerson = false;//关闭弹出框
				this.gridDataList = [];//列表数据置空
				this.page.currentPage = 1;//页码重新传值
				this.page.pageSize = 10;//页码重新传值
			},
            //清空
			reset() {
				this.USESEAL = {
					ID:'',
                    WONUM:'',
                    PROXYNUM:'',
                    VERSION:'',
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
					STATE:'1',
					STATEDesc:'草稿',
				};
				// if(this.$refs['USESEAL'] !== undefined) {
				// 	this.$refs['USESEAL'].resetFields();
				// }
			},
			//点击关闭按钮
			close() {
				this.show = false;
				this.$emit('request');
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
			//启动流程
			startup(){
				var url = this.basic_url + '/api-apps/app/sealUse/flow/'+this.dataid;
				this.$axios.get(url, {}).then((res) => {
					
					if(res.data.resp_code == 1) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
				    }else{
				    	this.$message({
								message:res.data.resp_msg,
								type: 'success'
							});
							this.detailgetData();
							var url = this.basic_url + '/api-apps/app/sealUse/flow/Executors/'+this.dataid;
							this.$axios.get(url, {}).then((res) => {
								var resullt=res.data.datas;
								var users='';
								for(var i=0;i<resullt.length;i++){
									users = users + resullt[i].username+",";
								}
								console.log(this.username);
								if(users.indexOf(this.username) != -1){
									this.approval=true;
									this.start=false;
								}else{
									this.approval=false;
									this.start=false;
								}
							});
				    }
				});
			},	
			//审批流程
			approvals(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.sealUse;
				 var url = this.basic_url + '/api-apps/app/sealUse/flow/isEnd/'+this.dataid;
		    		this.$axios.get(url, {}).then((res) => {
		    			if(res.data.resp_code == 0) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
		    			}else{
		    				var url = this.basic_url + '/api-apps/app/sealUse/flow/isExecute/'+this.dataid;
		    				this.$axios.get(url, {}).then((res) => {
				    			if(res.data.resp_code == 1) {
										this.$message({
											message:res.data.resp_msg,
											type: 'warning'
										});
								}else{
									var url = this.basic_url + '/api-apps/app/sealUse/flow/customFlowValidate/'+this.dataid;
								this.$axios.get(url, {}).then((res) => {
				    				if(res.data.resp_code == 1) {
										this.$message({
											message:res.data.resp_msg,
											type: 'warning'
										});
									}else{
									 	this.$refs.approvalChild.visible();
									}
								})
								}
		    				});
		    			}
					});
			},
			//流程历史
			flowhistory(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.sealUse;
//				this.$refs.flowhistoryChild.open();
				this.$refs.flowhistoryChild.getdata(this.dataid);
			},
			//流程地图
			flowmap(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.sealUse;
				this.$refs.flowmapChild.getimage();
			},
			//当前责任人
			viewpepole(){
				this.approvingData.id =this.dataid;
				this.approvingData.app=this.sealUse;
				this.$refs.vewPopleChild.getvewPople(this.dataid);
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
			
			//确认盖章
			submited(){
				this.$refs.USESEAL.validate((valid) => {
					if(valid) {
						var data = {
							USER: this.USESEAL.USER,
							USETIME: this.USESEAL.USETIME,
							SEAL_DEPARTMENT: this.USESEAL.SEAL_DEPARTMENT,
						};
						var url = this.basic_url + '/api-apps/app/sealUse/operate/createReportData?id='+this.dataid;
						this.$axios.get(url, {params: data}).then((res) => {
							// console.log(repotFileId);
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '确认成功',
									type: 'success'
								});
								//重新加载数据
								this.detailgetData();
							}else {
								this.$message({
									message: res.data.resp_msg,
									type: 'warning'
								});
							}
						}).catch((err) => {
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
			//查看报告文件
			readAuth(){
				this.detailgetData();
            	var url = this.po_url+"/show?fileid=" +this.USESEAL.FILEID
					+ '&userid=' +  this.userid
					+ '&username=' + this.username
					+ '&deptid=' + this.deptid
					+ '&deptfullname=' + this.deptfullname
            	window.open(url); 
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
			//获取当前用户
			getUser(){//获取当前用户信息
	            var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url, {}).then((res) => {//获取当前用户信息
					this.userid = res.data.id;
					this.username = res.data.username;
					this.deptid = res.data.deptId;
					this.deptfullname = res.data.deptName;
	            }).catch((err) => {
	            });
			},
			//清空表单验证
			clearValidate() {
				// this.$refs[formName].clearValidate();
				if (this.$refs['USESEAL'] != undefined) {
					this.$refs['USESEAL'].resetFields();
					// this.$refs[formName].clearValidate();
				}
			},
		},
		mounted() {
			this.getCompany();
			this.getUser();//获取当前用户
			this.getUsers();//获取用印人
			// this.clearValidate('USESEAL')//清空表单验证
		},
		
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>