<template>
	<div>
		<el-dialog :modal-append-to-body="false" 
				   title="检验检测设备" 
				   :visible.sync="dialogVisible" 
				   width="80%"
				   :before-close="reset">
			<div>
				<el-form inline-message :model="searchList" label-width="70px">
					<el-row :gutter="5">
						<el-col :span="16">
							<el-form-item label="检测项目" prop="project" label-width="140px">
								<el-select v-model="searchList.project" 
									multiple 
									@change="getProject">
									<el-option
										v-for="item in projectList"
										:key="item.P_NUM"
										:label="item.P_DESC"
										:value="item.P_NUM">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
							<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px; margin-left: 2px">重置</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-table ref="singleTable" 
				:data="list" 
				line-center 
				border 
				stripe 
				highlight-current-row
				@current-change="selChange"
				@selection-change="setSel"
				height="360px" 
				style="width: 100%;" 
				:row-class-name="tableRowClassName"
				:default-sort="{prop:'productList', order: 'descending'}"
			
				v-loading="loading"  
				element-loading-text="加载中…"
				element-loading-spinner="el-icon-loading"
				element-loading-background="rgba(255, 255, 255, 0.9)">
				<el-table-column type="selection" fixed width="55" align="center">
				</el-table-column>
				<el-table-column label="设备编号" width="155" sortable prop="ASSETNUM">
				</el-table-column>
				<el-table-column label="设备描述" v-show="searchList.project.length==0" sortable prop="DESCRIPTION">
				</el-table-column>
				<el-table-column label="设备描述" v-show="searchList.project.length>0" sortable prop="DECRIPTION">
				</el-table-column>
				<el-table-column label="溯源日期" sortable prop="TRACE_TIME">
				</el-table-column>
			</el-table>
			<el-pagination background 
				class="text-right pt10" 
				@size-change="sizeChange" 
				@current-change="currentChange" 
				:current-page="page.currentPage" 
				:page-sizes="[10, 20, 30, 40,100]" 
				layout="total, sizes, prev, pager, next" 
				:total="page.totalCount">
			</el-pagination>
			<div slot="footer">
				<el-button type="primary" @click="submit">确 定</el-button>
				<el-button @click="reset">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Config from '../../../config.js';
	export default {
//	props:["approvingData"],//第一种方式
		name: 'product',
		props: ['projectList','pro_num','num'],
  		data() {
			return {
				searchList: {
					project: []
				},
				dialogVisible: false,
				basic_url: Config.dev_url,
				file_url: Config.file_url,
				loading: false,
				loadSign:true,//加载
				list: [],
				dialogProduct: false,
				commentArr:{},
				selUser: [],//接勾选的值
				page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				allDepts: '',
				DEPTID:'',//当前选择的机构值
				CJDW:'',//机构编号
				NUM:'',//产品类别编号
				appname:'',//appname
				NUM:'',//产品类别的编号
				docParm: {}
			}
  		},

  methods: {
	tableRowClassName({row, rowIndex}) {
		var now = (new Date()).getTime();
		var tranceTime = (new Date(row.TRACE_TIME)).getTime();
		if (!!row.TRACE_TIME && (tranceTime-now<=0)) {
			return 'warning-row';
		}
		if(!!row.TRACE_TIME && (tranceTime-now<=2*30*24*60*60)){
			return 'yellow-row';
		}
    },
	resetbtn(){
		this.searchList = {
			project: []
		};
	},
	searchinfo(){
		this.page.currentPage = 1;
		this.requestData();
	},
	getProject(){
		
	},
	selChange(row) {
		this.selUser = [];
		this.selUser.push(row);
		this.$refs.singleTable.clearSelection();
        this.$refs.singleTable.toggleRowSelection(row);
	},
	setSel(val) {
      	this.selUser = val;
    },
	getDocParm(){
		this.$axios.get(this.basic_url + '/api-user/users/currentMap',{}).then((res)=>{
			this.docParm.userid = res.data.id;
			this.docParm.username = res.data.username;
			this.docParm.deptid = res.data.deptId;
			this.docParm.deptfullname = res.data.deptName;
		}).catch((err)=>{});
	},
	downLoad(row){
		var url = this.file_url + '/file/fileList?page=0&size=10';
		this.$axios.post(url,{
			'appname': '检验检测项目_原始数据模板',
			'recordid': row.ID,
		}).then((res) => {
			var resData = res.data.fileList;
			var data = resData.length > 0 ? resData[0] : {};
			var url = data.filepath 
				+ '&userid=' + this.docParm.userid
				+ '&username=' + this.docParm.username
				+ '&deptid=' + this.docParm.deptid
				+ '&deptfullname=' + this.docParm.deptfullname;
			window.open(url);
		}).catch((err) => {});
	},
  	sizeChange(val) {
		this.page.pageSize = val;
		this.requestData();
	},
	currentChange(val) {
		this.page.currentPage = val;
		this.requestData();
	},
	showData(id){
		this.dialogVisible = true;
		this.deptId = id;
		this.requestData();
	},
  // 	loadMore () {
	//    if (this.loadSign) {
	//      this.loadSign = false
	//      this.page.currentPage++
	//      if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
	//        return
	//      }
	//      setTimeout(() => {
	//        this.loadSign = true
	//      }, 1000)
	//      this.requestData();
	//    }
	// },
	requestData(){
		this.loading = true;
		var data = {};
		var url = '';
		if(this.searchList.project.length>0){
			url = this.basic_url + '/api-apps/app/rawDataAsset';
			var project = this.searchList.project;
			var projectList = this.projectList;
			// var sNum = [];
			var pNum = [];
			for (let i = 0; i < project.length; i++) {
				for(let j=0; j<projectList.length; j++){
					if(project[i] == projectList[j].P_NUM){
						// sNum.push(projectList[j].S_NUM)
						pNum.push(projectList[j].P_NUM);
					}
				}
			}
			data = {
				// PRO_NUM_wheres: this.pro_num,
				// NUM_wheres: this.num,
				// S_NUM_wheres: sNum.join(','),
				P_NUM_where_in: pNum.join(',')
			}
		}else{
			data = {
				page: this.page.currentPage,
				limit: this.page.pageSize,
				ISPM: '是'
			};
			url = this.basic_url + '/api-apps/app/asset';
		}
		this.$axios.get(url, {
			params: data
		}).then((res) => {
			this.page.totalCount = res.data.count;
			//总的页数
			let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
			if(this.page.currentPage >= totalPage) {
				this.loadSign = false
			} else {
				this.loadSign = true
			}
			this.list = res.data.data;
			this.loading = false;
		}).catch((wrong) => {})
	},
	submit(){
		if(this.selUser.length == 0){
			this.$message({
				message: '请选择数据',
				type: 'warning'
			});
		}else if(this.selUser.length > 1){
			this.$message({
				message: '不可同时选择多条数据',
				type: 'warning'
			});
		}else{
			this.$emit('setData',this.selUser[0]);
			this.reset();
		}
	},
	
    reset(){//点击确定或取消按钮时重置数据20190303
        this.dialogVisible = false;//关闭弹出框
        this.list = [];//列表数据置空
        this.page.currentPage = 1;//页码重新传值
		this.page.pageSize = 20;//页码重新传值
		this.searchList.project = [];
    },
  }
}
</script>
<style scoped>
.el-table .warning-row .cell {
	color: #cb4040;
}
.el-table .yellow-row .cell {
	color: #FF8000;
}
</style>
