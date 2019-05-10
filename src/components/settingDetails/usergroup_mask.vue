<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title" v-show="addtitle">添加用户组</div>
					<div class="mask_title" v-show="modifytitle">修改用户组</div>
					<div class="mask_title" v-show="viewtitle">查看用户组</div>
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
					<el-form inline-message :model="dataInfo" :rules="rules" ref="dataInfo" >
						<div class="content-accordion" id="information">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="基本信息" name="1">
									<el-row>
										<el-col :span="6">
											<el-form-item label="编号" prop="num" label-width="100px">
												<el-input v-model="dataInfo.num" placeholder="自动生成" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<!-- <el-col :span="6">
											<el-form-item label="所属机构" label-width="100px">
												<el-input v-model="dataInfo.deptName" :disabled="edit"></el-input>
											</el-form-item>
										</el-col> -->
										<el-col :span="12">
											<el-form-item label="组名" prop="name" label-width="100px">
												<el-input v-model="dataInfo.name" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="24">
											<el-form-item label="描述" prop="memo" label-width="100px">
												<el-input v-model="dataInfo.memo" :disabled="noedit"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-collapse-item>

								<el-collapse-item title="用户列表" name="2">
									<div class="table-func" v-if="!viewtitle">
										<el-button type="primary" size="mini" round @click="chooseUser">
											<i class="icon-search"></i>
											<font>选择</font>
										</el-button>
									</div>
									<el-table :data="dataInfo.membershipList" border stripe :fit="true" highlight-current-row style="width: 100% ;" max-height="260" :default-sort="{prop:'dataInfo.membershipList', order: 'descending'}">
										<el-table-column type="index" label="序号" width="50">
											<template slot-scope="scope">
												<span> {{scope.$index+1}} </span>
											</template>
										</el-table-column>
										<el-table-column label="用户名" prop="useridDesc" sortable>
										</el-table-column>
										<el-table-column label="机构" prop="superviseIdsDesc" sortable>
											<template slot-scope="scope">
												<el-input v-model="scope.row.superviseIdsDesc" :disabled="edit" placeholder="请选择">
													<el-button slot="append" icon="el-icon-search" @click="adddeptbtn(scope.$index)" :disabled="noedit"></el-button>
												</el-input>
										    </template>
										</el-table-column>
										<el-table-column label="录入人" prop="createbyName" sortable>
										</el-table-column>
										<el-table-column label="录入时间" prop="createtime" sortable>
										</el-table-column>
										<el-table-column label="录入人机构" prop="deptName" sortable>
										</el-table-column>
										<el-table-column label="修改人" prop="updateby" sortable>
										</el-table-column>
										<el-table-column label="修改时间" prop="updatetime" sortable>
										</el-table-column>
										
										<!-- <el-table-column label="用户姓名" prop="nickname" sortable>
										</el-table-column> -->
										<!-- <el-table-column label="所属机构" prop="deptName" sortable>
										</el-table-column> -->
										
										<!-- <el-table-column label="手机号" prop="phone" sortable>
										</el-table-column> -->
										<el-table-column fixed="right" width="120" label="操作">
											<template slot-scope="scope">
												<el-button type="text" size="small" @click="delKey(scope.$index,scope.row)">
													<i class="icon-trash red"></i>
												</el-button>
											</template>
										</el-table-column>
									</el-table>
								</el-collapse-item>

								<el-collapse-item title="其他" name="3" v-show="views">
									<!-- 第一行 -->
									<el-row :gutter="30">
										<el-col :span="8">
											<el-form-item label="录入人" prop="createby" label-width="100px">
												<el-input v-model="dataInfo.createName" placeholder="当前录入人" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="录入时间" prop="createdate" label-width="100px">
												<el-input v-model="dataInfo.createdate" placeholder="当前录入时间" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<!-- <el-col :span="8">
											<el-form-item label="机构" prop="deptName" label-width="100px">
												<el-input v-model="dataInfo.deptName" placeholder="当前录入人机构" :disabled="edit"></el-input>
											</el-form-item>
										</el-col> -->
										<!-- <el-col :span="8">
											<el-form-item label="修改人" prop="updateby" label-width="100px">
												<el-input v-model="dataInfo.updateName" placeholder="当前修改人" :disabled="edit"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="修改时间" prop="updatedate" label-width="100px">
												<el-input v-model="dataInfo.updatedate" placeholder="当前修改时间" :disabled="edit"></el-input>
											</el-form-item>
										</el-col> -->
									</el-row>
								</el-collapse-item>

							</el-collapse>
						</div>
						<div class="content-footer" v-show="noviews">
							<el-button type="primary" @click="save('Update')">保存</el-button>
							<el-button type="success" @click="save('Submit')" v-show="addtitle">保存并继续</el-button>
							<el-button @click="close">取消</el-button>
						</div>
					</el-form>
				</div>
				<!--底部-->
			</div>
		</div>
		<vchoose ref="choose" :chooseParam = "chooseParam" @tranFormData = 'getChoose'></vchoose>
		<usermask ref="usermask" @getSelData="getUserData" :dialogTit="dialogTit"></usermask>
		<el-dialog :modal-append-to-body="false" title="机构范围" :visible.sync="deptdialogVisible" width="30%">
			<div class="scrollbar" style="max-height: 400px;">
				<el-tree class="tree" ref="tree" :data="depetData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" default-expand-all>
				</el-tree>
			</div>
			<div slot="footer">
				<el-button type="primary" @click="determine" >确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import vchoose from '../common/dataChoose.vue'
	import usermask from'../common/common_mask/currentUserMask.vue'
	export default {
		name: 'masks',
		components: {
			vchoose,
			usermask
		},
		data() {
			return {
				basic_url: Config.dev_url,
				dialogTit: '用户列表',
				rules: {
					//组名
					name: [
						{ required: true, message: '请输入', trigger: 'blur' },
						{validator: this.Validators.isSpecificKey, trigger: 'blur'},
					],
					nickname: [
						{ required: true, message: '请选择', trigger: 'blur' },
					]
				},
				show: false,
				isok1: true,
				isok2: false,
				edit: true, //禁填
				noedit:false,//可编辑
				views:false,//录入修改人信息
				noviews:true,//按钮
				down: true,
				up: false,
				index:'',//子表的索引
				id:'',//修改时用的id
				activeNames: ['1', '2','3','4'], //手风琴数量
				dialogVisible: false, //对话框
				deptdialogVisible: false, //机构对话框
				addtitle: true, //添加弹出框titile
				modifytitle: false, //修改弹出框titile
				modify:false,
				depetData: [], //数组，我这里是通过接口获取数据
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "children",
					label: "fullname"
				},
				dataInfo: {
					"id":'',
					"name":'',
					"num":'',
					"deptid":this.$store.state.currentcjdw[0].id,
					"deptName":this.$store.state.currentcjdw[0].fullname,
					"createby":'',
					"createtime":'',
					"updateby":'',
					"updatedate":'',
					"del_flag":0,
					'membershipList': []
				},
				chooseParam: {},
				editUserIndex: 1
			};
		},
		methods: {
			//选择多条用户数据插入到行列表中
			
			getUserData(val){
				console.log(val);
				console.log()
				for(var i=0;i<val.length;i++){
					var membershipList={}
					membershipList={
						userid:val[i].id,
						useridDesc:val[i].nickname,
						username:val[i].username,
						deptName:val[i].deptName,
						deptid:'',
						createby:'',
						createbyName:val[i].nickname,
						createtime:this.getToday(),
						updatetime:'',
						updateby:'',
						updatebyName:'',
						superviseIds:'',
						superviseIdsDesc:'',
						// phone:val[i].phone,
						// isEditing: true,
					};
					console.log(membershipList);
					this.dataInfo.membershipList.push(membershipList);
					
				}
			},
			//选择用户带回来值
			chooseUser(){
			    var arr=[];
				for(var i=0;i<this.dataInfo.membershipList.length; i++){
                     arr.push(this.dataInfo.membershipList[i].userid);
				}
				arr=arr.join(',');
				this.$refs.usermask.requestData('groups',arr);
			},
			//获取用户
			getChoose(data){
				var selData = data.data;
				this.dataInfo.id = selData[0].id;
				this.dataInfo.categoryname = selData[0].categoryname;
				// this.getData(this.dataInfo.id);
			},
			//删除用户
			delKey(index,row){
				if(row.id!=''){
					var url = this.basic_url + '/api-flow/flow/group/delMembership/' + row.id;
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
					this.$axios.delete(url, {}).then((res) => {
						if(res.data.resp_code == 0){
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.dataInfo.membershipList.splice(index,1);
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
					this.dataInfo.membershipList.splice(index,1);
				}
			},
			//获取当前用户信息
			getUser(opt){
				var url = this.basic_url + '/api-user/users/currentMap';
				this.$axios.get(url,{}).then((res) => {
					if(opt == 'new'){
						this.dataInfo.createby = res.data.id;
						this.dataInfo.createtime =this.getToday();
					}else{
						this.dataInfo.updateby = res.data.id;
						this.dataInfo.updatedate = this.getToday();
					}
				}).catch((err) => {
				});
			},

			//获取当前时间
			getToday(){
				var date = new Date();
				var month = date.getMonth();
				month++;
				var str = date.getFullYear() + '-' + month + '-'+ date.getDate() + ' ' +  date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds() ;
				var rate = this.$moment(str).format("YYYY-MM-DD HH:mm:ss")
				return rate;
			},
			//添加显示弹窗
			visible() {
				this.addtitle = true;
				this.modifytitle = false;
				this.viewtitle = false;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
				
				// this.show = true;
				this.getUser('new');
			},
			request(id){
				var url = this.basic_url + '/api-flow/flow/group/' + id;
				this.$axios.get(url, {
				}).then((res) => {
					this.dataInfo = res.data;
					console.log(res.data);
					this.show = true;
				}).catch((wrong) => {})
			},
			//这里是修改
			detail(id) {
				this.id=id;//修改时用的id
				this.addtitle = false;
				this.modifytitle = true;
				this.viewtitle = false;
				this.noedit = false;//表单内容
				this.views = false;//录入修改人信息
				this.noviews = true;//按钮
                this.request(id);
				this.getUser('');
			},

			//这是查看
			view(id) {
				this.addtitle = false;
				this.modifytitle = false;
				this.viewtitle = true;
				this.dept = true;
				this.noedit = true;//表单内容
				this.views = true;//录入修改人信息
				this.noviews = false;//按钮
				this.request(id);
				this.getUser('');
			},
			//点击关闭按钮
			close() {
				this.show=false;
				this.resetForm();
				this.$emit('request');
			},
			resetForm(){
				this.dataInfo = {
					"id":'',
					"name":'',
					"num":'',
					"memo":'',
					"deptid":this.$store.state.currentcjdw[0].id,
					"deptName":this.$store.state.currentcjdw[0].fullname,
					"createby":'',
					"createdate":'',
					"updateby":'',
					"updatedate":'',
					"del_flag":'',
					"membershipList": []
				};
				// this.show = false;
			},
			open(){
				this.show = true;
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
				$(".mask_div").css("top", "60px");
				$(".mask_divbg").css("top", "0px");
			},

			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "90%");
				$(".mask_div").css("top", "0px");
				$(".mask_divbg").css("top", "100px");
			},
			//提交保存
			save(parameter) {
				var _this = this;
				var url = this.basic_url + '/api-flow/flow/group/saveOrUpdate';
				this.$refs.dataInfo.validate((valid) => {
					if (valid) {
						this.$axios.post(url, this.dataInfo).then((res) => {
							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success',
								});
								if(parameter=="Update"){
									this.show = false;
									this.$emit('request');
								}else{
									this.show=true;
									this.resetForm();
								}
							}else{
								this.show = true;
								this.$message({
									message: res.data.resp_msg,
									type: 'error',
								});
							}
						}).catch((err) => {
						});
					} else {
						return false;
					}
				});
			},
			//确定
			determine() { 
				var index=this.index;
				var permissionIds = [];
				var deptIds = [];
				var deptnames=[];
				var permission = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
				for(var i = 0; i < permission.length; i++) {
					deptIds.push(permission[i].id);
					deptnames.push(permission[i].fullname);
				}
				deptIds= deptIds.join(','); 
				deptnames= deptnames.join(','); 
				this.dataInfo.membershipList[index].superviseIds=deptIds;
				this.dataInfo.membershipList[index].superviseIdsDesc=deptnames;
				this.deptdialogVisible = false;
			},
			//取消
			cancel(){
				this.deptdialogVisible = false;
				this.$emit('request');
			},
			adddeptbtn(index){
				this.index=index;
				this.depet();
			},
			depet() {
				var arr = [];
				var url = this.basic_url + '/api-user/depts/treeMap';
				this.$axios.get(url, {}).then((res) => {
					this.depetData = res.data;
					if(!!this.dataInfo.id){
						var membershipList=this.dataInfo.membershipList;
						if(!!membershipList[this.index].superviseDepts){
							for(var m=0;m<membershipList[this.index].superviseDepts.length;m++){
								arr.push(membershipList[this.index].superviseDepts[m].id);
							}
						}
							
						this.$nextTick(function() {
							this.$refs.tree.setCheckedKeys(arr)
						})
					 	this.deptdialogVisible = true;
					}else{
	                    this.$nextTick(function() {
							this.$refs.tree.setCheckedKeys([]);
						})
						this.deptdialogVisible = true;
					}
				}).catch((err) => {
				});
			},
		},
		mouted(){
           this.depet();
		},
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>