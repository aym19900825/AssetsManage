<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="" :visible.sync="dialogProduct" width="80%" :before-close="handleClose">
		<div class="el-collapse-item pt10 pr20 pb20" aria-expanded="true" accordion>
            <el-row :gutter="20">
                <el-col :span="7" class="pull-right">
                    <el-input v-model="workorderForm.WONUM" :disabled="true">
                            <template slot="prepend">子任务单编号</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-table ref="table" :data="workorderForm.WORKORDERList" row-key="ID" border height="260" stripe :fit="true" style="width: 100%;" :default-sort="{prop:'workorderForm.WORKORDERList', order: 'descending'}">
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
        </div>
		<div class="content-footer">
			<el-button @click='close'>关闭</el-button>
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
            WONUM:'',
            WORKORDERList:[]
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
		this.requestData(dataid);
	},
	requestData(dataid){
        console.log(dataid);
		var url = this.basic_url + '/api-apps/app/workorder/operate/queryWorkorder?ID='+dataid;
        this.$axios.get(url,{}).then((res) => {
            if(res.data.resp_code == 0) {
                this.dialogProduct = true;
            }else if(res.data.resp_code == 1){
                this.$message({
                    message: res.data.resp_msg,
                    type: 'warning'
                });
                this.dialogProduct = false;
            }
            console.log(res);
        }).catch((err) => {
            this.$message({
                message: '网络错误，请重试',
                type: 'error'
            });
        });
	},
  },
  mounted() {
  	
	},
}
</script>

<style>
</style>