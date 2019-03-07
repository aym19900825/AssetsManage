<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="报表参数" :visible.sync="innerVisible" width="60%">
		<div >
			<el-form :model="dataInfo" ref="dataInfo" label-width="100px" >
				
					<!-- 报表信息 -->
					<el-collapse>
						<el-form-item v-for="item in pramList" :key="item.id" :label="item.label" :prop="item.param"  :style="{ width: item.width}" :id="item.label" v-if="item.required != '0'" :rules="{required: true, message: '请填写', trigger: 'blur'}">
							<el-input v-model="dataInfo[item.param]" v-if="item.type!='1'&&item.type!='4'&&item.type!='3'">
							</el-input> 
							<el-date-picker v-model="dataInfo[item.param]" value-format="yyyy-MM-dd" v-if="item.type==1" >
							</el-date-picker>
							
							<el-input v-model="dataInfo[item.param]" v-if="item.type==4||item.type==3"  :disabled="true">
									<el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="addPeople(item.type)"></el-button>
							</el-input>
						</el-form-item>
						<el-form-item v-for="item in pramList" :key="item.id" :label="item.label" :prop="item.param"  :style="{ width: item.width}" :id="item.label" v-if="item.required!='1'">
							<el-input v-model="dataInfo[item.param]" v-if="item.type!='1'&&item.type!='4'&&item.type!='3'">
							</el-input> 
							<el-date-picker v-model="dataInfo[item.param]" value-format="yyyy-MM-dd" v-if="item.type==1" >
							</el-date-picker>
							
							<el-input v-model="dataInfo[item.param]" v-if="item.type==4||item.type==3"  :disabled="true">
									<el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="addPeople(item.type)"></el-button>
							</el-input>
						</el-form-item>
					</el-collapse>
				<div class="el-dialog__footer">
					<el-button type="primary" @click="determine">确定</el-button>
					<el-button @click='closeinnerVisible'>取消</el-button>
				</div>
			</el-form>
		</div>
		<!--底部-->
		  </el-dialog>
		  <el-dialog :modal-append-to-body="false" title="用户" :visible.sync="dialogVisibleuser" width="80%" >
		  	<el-table :data="userList" border stripe :header-cell-style="rowClass"  style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" >
				<el-table-column type="selection" width="55" fixed align="center">
				</el-table-column>
				<el-table-column label="用户名" sortable width="140px" prop="username">
				</el-table-column>
				<el-table-column label="姓名" sortable width="200px" prop="nickname" >
				</el-table-column>
				<el-table-column label="性别" sortable width="100px" prop="sexName" >
				</el-table-column>
				<el-table-column label="机构" sortable width="150px" prop="deptName" >
				</el-table-column>
				<el-table-column label="手机号" sortable width="150px" prop="phone" >
				</el-table-column>
				<el-table-column label="员工号" sortable width="150px" prop="worknumber">
				</el-table-column>
				<el-table-column label="用户有效期" prop="user_active_date" width="150px" sortable :formatter="dateFormat">
				</el-table-column>
			</el-table>
					<el-pagination background class="text-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
					</el-pagination>
				<span slot="footer" class="dialog-footer">
			       <el-button type="primary" @click="addcusname">确 定</el-button>
			       <el-button @click="dialogVisibleuser = false">取 消</el-button>
			    </span>
		  </el-dialog>
		  <el-dialog :modal-append-to-body="false" title="机构" :visible.sync="dialogVisible" width="30%" >
			<el-tree ref="tree" :data="resourceData" show-checkbox  node-key="id" default-expand-all :default-checked-keys="resourceCheckedKey" :props="resourceProps" @node-click="handleNodeClick" @check-change="handleClicks" check-strictly>
			</el-tree>
			<span slot="footer" class="dialog-footer">
		       <el-button type="primary" @click="dailogconfirm();" >确 定</el-button>
		       <el-button @click="dialogVisible = false">取 消</el-button>
		    </span>
		</el-dialog>
		 <!--<el-dialog :modal-append-to-body="false" title="查看报表" :visible.sync="dialogVisiblereport" width="100%" height="100%" >
		 	product_advice.ureport.xml
		 	<iframe :src="this.url +'/ureport/preview?_u=mysql:'+this.file" id="flowIframe" width="100%" height="100%" frameborder="0" scrolling="no" >
		   </iframe>
		 </el-dialog>	-->
			</div>
		<!--</div>-->
	
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
//		props: ['pramList'],
		data() {
			return {
				innerVisible:false,
				pramList:[],
				basic_url: Config.dev_url,
				noedit:false,//表单内容
				userList:[],
				selval:[],
				dialogVisibleuser:false,//用户
				dialogVisible: false, //对话框
//				dialogVisiblereport:false,//报表
				dataInfo: {},
				page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				//tree树菜单
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "children",
					label: "fullname"
				},
				url:'',
				str:'',
				file:'',
				
				};	
			},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			SelChange(val) {
				this.selval = val;
			},
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD"); 
			},
			handleNodeClick(data) { //获取勾选树菜单节点
				//				console.log(data);
			},
			handleClicks(data,checked, indeterminate) {
				this.getCheckboxData = data;
           		 this.i++;
            		if(this.i%2==0){
                	if(checked){
                    	this.$refs.tree.setCheckedNodes([]);
                    	this.$refs.tree.setCheckedNodes([data]);
                    	//交叉点击节点
               		 }else{
                     this.$refs.tree.setCheckedNodes([]);
                    	//点击已经选中的节点，置空
                	 }
            		}
        	},

			//点击按钮显示弹窗
			visible(pramList,file) {	
				this.file=file;
				console.log(this.file);
				for(var i=0;i<pramList.length;i++){
					pramList[i].width="40%"
					
				}
			    this.pramList=pramList;
				this.innerVisible = true;
			},
			//点击关闭按钮
			close() {
				this.show = false;
			},
			closeinnerVisible(){
				this.innerVisible=false;
				this.dataInfo={};
			},
			addcusname(){
				if(this.selval.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selval.length > 1){
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
				}else{
					this.dialogVisibleuser = false;
				}
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

			
			addPeople(item){
				if(item==4){
					this.getDept();
				}else{
					this.requestData();
				}
			},
			determine(){
				console.log(this.file);
		  		var str=JSON.stringify(this.dataInfo);
				for(var j=0;j<str.length;j++){
					str=str.replace("\":\"",'=');
					str=str.replace("\{\"","");
					str=str.replace("\"}","");
					str=str.replace("\",\"","&");
				}
				this.str="&"+str;
				this.file=this.file+this.str;
		  		var url=this.basic_url;
					var pos = url.lastIndexOf(':');
					url=url.substring(0,pos+1); 
					this.url=url+"5300";
					console.log(url);
				var url = this.url+"/ureport/preview?_u=mysql:"+this.file
				console.log(url);
             window.open(url); 
			},
			getDept() {
				var url = this.basic_url + '/api-user/depts/treeMap';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data;
					this.dialogVisible = true;
				});
			},
			requestData(){
				var data = {
						page: 1,
						limit: 10,
					}
				var url = this.basic_url + '/api-user/users';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;
					this.userList = res.data.data;
					this.dialogVisibleuser = true;
				}).catch((wrong) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'warning'
					});
				});
			},
		},
		mounted() {
			
		},

	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
	
</style>