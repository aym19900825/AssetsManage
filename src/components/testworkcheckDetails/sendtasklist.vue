<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="" :visible.sync="dialogProduct" width="80%" :before-close="handleClose">
		<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
			<el-tabs v-model="activeName" @tab-click="handleClick">						
                <el-tab-pane label="检测项目与要求" name="first">
                    <el-table ref="table" :data="workorderForm.WORKORDER_PROJECTList" row-key="ID" border @selection-change="proChange" height="260" stripe :fit="true" style="width: 100%;" :default-sort="{prop:'workorderForm.WORKORDER_PROJECTList', order: 'descending'}">
						<el-table-column type="selection" width="55" fixed align="center">
						</el-table-column>
                        <el-table-column prop="P_NUM" label="检测项目编号" sortable>
                        </el-table-column>
                        <el-table-column prop="P_DESC" label="检测项目名称" sortable>
                        </el-table-column>
                        <el-table-column prop="REMARKS" label="要求" sortable>
                        </el-table-column>
                        <el-table-column prop="VERSION" label="版本" sortable>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="分包项目" name="second">
                    <el-table ref="table" :data="workorderForm.WORKORDER_CONTRACTList" row-key="ID" border @selection-change="conChange" height="260" stripe :fit="true" style="width: 100%;" :default-sort="{prop:'workorderForm.WORKORDER_CONTRACTList', order: 'descending'}">
                        <el-table-column type="selection" width="55" fixed align="center">
						</el-table-column>
						<el-table-column prop="WONUM" label="工作任务单编号" sortable width="150px">
                        </el-table-column>
                        <el-table-column prop="PROXY_CONTRACT_NUM" label="分包协议编号" sortable width="120px">
                        </el-table-column>
                        <el-table-column prop="PROXYNUM" label="委托书编号" sortable width="120px">
                        </el-table-column>
                        <el-table-column prop="INSPECT_GROUP" label="专业组" sortable width="120px">
                        </el-table-column>
                        <el-table-column prop="VENDORDesc" label="分包方名称" sortable width="120px">
                        </el-table-column>
                        <el-table-column prop="P_REMARKS" label="检验项目内容" sortable width="200px">
                        </el-table-column>
                        <el-table-column prop="REQUIRES" label="对环境和操作人员要求" sortable width="220px">
                        </el-table-column>
                        <el-table-column prop="Q_TYPE" label="对分包报告/证书的要求" sortable width="220px">
                        </el-table-column>
                        <el-table-column prop="CHECKCOST" label="检验费用" sortable width="120px">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
		<div class="content-footer">
			<el-button type="primary" @click="submit">确定</el-button>
			<el-button @click='close'>取消</el-button>
		</div>
		</el-dialog>
	</div>
</template>

<script>
	import Config from '../../config.js';
	export default {
//	props:["approvingData"],//第一种方式
  name: 'product',
  
  data() {
    return {
		basic_url: Config.dev_url,
		productList: [],
		dialogProduct: false,
		loadSign: true, //鼠标滚动加载数据
		loading: false,//默认加载数据时显示loading动画
		commentArr:{},
		page: {
			currentPage: 1,
			pageSize: 20,
			totalCount: 0
		},
		DEPTID:'',//当前选择的机构值
        NUM:'',//类别编号
        activeName: 'first', //tabs
        workorderForm:{
            WORKORDER_PROJECTList:[],
            WORKORDER_CONTRACTList:[]
		},
		proMenu: [],
		conMenu: [],
		WORKORDER_PROJECTLISTID:[],
		WORKORDER_CONTRACTLISTID:[]
    }
  },

  methods: {
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
  	dateFormat(row, column) {
		var date = row[column.property];
		if(date == undefined) {
			return "";
		}
		return this.$moment(date).format("YYYY-MM-DD");
    },
    handleClick(tab, event) {
//		        console.log(tab, event);
    },
  	//表头居中
	rowClass({ row, rowIndex}) {
	    return 'text-align:center'
	},
  	//表格滚动加载
	loadMore() {
		let up2down = sessionStorage.getItem('up2down');
		if(this.loadSign) {					
			if(up2down=='down'){
				this.page.currentPage++;
				if(this.page.currentPage > Math.ceil(this.page.totalCount / this.page.pageSize)) {
					this.page.currentPage = Math.ceil(this.page.totalCount / this.page.pageSize)
					return false;
				}
				let append_height = window.innerHeight - this.$refs.table.$el.offsetTop - 50;
				if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
					$('.el-table__body-wrapper table').append('<div class="filing" style="height: '+append_height+'px;width: 100%;"></div>');
					sessionStorage.setItem('toBtm','true');
				}
			}else{
				sessionStorage.setItem('toBtm','false');
				this.page.currentPage--;
				if(this.page.currentPage < 1) {
					this.page.currentPage=1;
					return false;
				}
			}
			this.loadSign = false;
			setTimeout(() => {
				this.loadSign = true;
			}, 1000)
			this.requestData();
		}
	},
	//改变页数
	sizeChange(val) {
		this.page.pageSize = val;
		if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
			$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
			sessionStorage.setItem('toBtm','true');
		}else{
			sessionStorage.setItem('toBtm','false');
		}
		this.requestData();
	},
	//当前页数
	currentChange(val) {
		this.page.currentPage = val;
		if(this.page.currentPage == Math.ceil(this.page.totalCount / this.page.pageSize)){
			$('.el-table__body-wrapper table').append('<div class="filing" style="height: 800px;width: 100%;"></div>');
			sessionStorage.setItem('toBtm','true');
		}else{
			sessionStorage.setItem('toBtm','false');
		}
		this.requestData();
	},
  	//点击关闭按钮
	close() {
		this.dialogProduct = false;
	},
  	visible(dataid) {
		this.workorderForm.ID = dataid;
		this.requestData(dataid);
	},
	//Table默认加载数据
	requestData(dataid){
		this.loading = true;//加载动画打开
		var url = this.basic_url +'/api-apps/app/workorder/operate/subtaskList?WORKORDERID='+dataid;
		this.$axios.get(url, {}).then((res) => {
			if(res.data.resp_code == 0) {
				this.page.totalCount = res.data.count;//页码赋值
				//总的页数
				let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize);
				if(this.page.currentPage >= totalPage) {
					this.loadSign = false;
				} else {
					this.loadSign = true;
				}
				this.workorderForm.WORKORDER_PROJECTList = res.data.datas.WORKORDER_PROJECT;
				this.workorderForm.WORKORDER_CONTRACTList = res.data.datas.WORKORDER_CONTRACT;
				this.dialogProduct = true;
				this.loading = false;//加载动画关闭
				if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
					$('.el-table__body-wrapper table').find('.filing').remove();
				}//滚动加载数据判断filing
			}else if(res.data.resp_code == 1){
				this.$message({
					message: res.data.resp_msg,
					type: 'warning'
				});
				this.dialogProduct = false;
			}
		}).catch((err) => {
			this.$message({
				message: '网络错误，请重试',
				type: 'error'
			});
		});
	},
	proChange(val) {
		this.proMenu = val;
	},
	conChange(val) {
		this.conMenu = val;
	},
	submit(){
		if(this.conMenu.length == 0 && this.proMenu.length == 0) {
			this.$message({
				message: '请选择至少一条数据',
				type: 'warning'
			});
			return;
		}else {
			for(var i = 0;i<this.proMenu.length;i++){
				this.WORKORDER_PROJECTLISTID.push(this.proMenu[i].ID);
			}
			for(var i = 0;i<this.conMenu.length;i++){
				this.WORKORDER_CONTRACTLISTID.push(this.conMenu[i].ID);
			}
			var id = this.workorderForm.ID.toString();
			var projectid = this.WORKORDER_PROJECTLISTID.toString(',');
			var contractid = this.WORKORDER_CONTRACTLISTID.toString(',');
			// var url = 'http://192.168.1.115:7902/app/workorder/operate/subtask?WORKORDERID='+id+'&WORKORDER_PROJECTLISTID='+projectid+'WORKORDER_CONTRACTLISTID='+contractid;
			var url = this.basic_url +'/api-apps/app/workorder/operate/subtask?WORKORDERID='+id+'&WORKORDER_PROJECTLISTID='+projectid+'&WORKORDER_CONTRACTLISTID='+contractid;
			this.$axios.get(url,{}).then((res) => {
				if(res.data.resp_code == 0) {
					this.$message({
						message: '生成成功',
						type: 'success'
					});
				}
			}).catch((err) => {
				this.$message({
					message: '网络错误，请重试',
					type: 'error'
				});
			});
			this.selMenu = [];
			this.dialogProduct = false;
			this.$emit('request');
		}
	},	
  },
  mounted() {
  	
	},
}
</script>

<style>
</style>