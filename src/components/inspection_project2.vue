<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_header></navs_header>
	</div>
	<div class="contentbg">
		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content wrapperall">
			<el-card class="box-card">
				<div slot="header" class="title clearfix">
					<span>产品类型</span>
					<!--按钮操作行 Begin-->
					<div class="columns pull-right">
						<el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</div>
					<!--按钮操作行 End-->
				</div>
				<div class="text item">
					<el-row :gutter="0">
						

  <el-table :data="inspectionList" row-key="ID" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'inspectionList', order: 'descending'}" v-loadmore="loadMore">

    <el-table-column prop="iconOperation" fixed label="" width="50px">
      <template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
    </el-table-column>

    <el-table-column label="产品类型" sortable width="150px" prop="PRO_NAME" v-if="this.checkedName.indexOf('产品类型')!=-1">
      <template slot-scope="scope">
        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PRO_NAME" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.PRO_NAME}}</span>
      </template>
    </el-table-column>

	<el-table-column prop="STATUS" label="状态" sortable width="120px" :formatter="judge" v-if="this.checkedName.indexOf('状态')!=-1">
      <template slot-scope="scope">
        <el-select v-if="scope.row.isEditing" v-model="scope.row.STATUS" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
        </el-select><span v-else="v-else">{{scope.row.STATUS}}</span>
      </template>
    </el-table-column>

    <el-table-column prop="CHANGEBY" label="状态修改人" sortable width="120px" v-if="this.checkedName.indexOf('状态修改人')!=-1">
      <template slot-scope="scope">
        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEBY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.CHANGEBY}}</span>
      </template>
    </el-table-column>

     <el-table-column prop="CHANGEDATE" label="状态修改时间" sortable width="160px" :formatter="dateFormat" v-if="this.checkedName.indexOf('状态修改时间')!=-1">
      <template slot-scope="scope">
        <el-date-picker v-if="scope.row.isEditing" type="date" placeholder="选择日期" v-model="scope.row.CHANGEDATE" value-format="yyyy-MM-dd"></el-date-picker><span v-else="v-else">{{scope.row.CHANGEDATE}}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="deleteRow(scope.$index, inspectionList)" type="text" size="small">
          移除
        </el-button>
      </template>
    </el-table-column>

  </el-table>
							<!-- 表格 Begin-->
							<el-pagination background class="pull-right pt10 pb10" v-if="this.checkedName.length>0"
					            @size-change="sizeChange"
					            @current-change="currentChange"
					            :current-page="page.currentPage"
					            :page-sizes="[10, 20, 30, 40]"
					            :page-size="page.pageSize"
					            layout="total, sizes, prev, pager, next"
					            :total="page.totalCount">
					        </el-pagination>
							<!-- 表格 End-->
						</el-col>
					</el-row>
				</div>
			</el-card>
		</div>
	<!--右侧内容显示 End-->
	</div>
</div>
</template>
<script>
	import vheader from './common/vheader.vue'
	import navs_header from './common/nav_tabs.vue'
	import table from './plugin/table/table-normal.vue'
	import tableControle from './plugin/table-controle/controle.vue'
	export default {
		name: 'customer_management',
		components: {
			vheader,
			navs_header,
			tableControle,
			table,
		},
		data() {
			return {
				loadSign:true,//加载
				commentArr:{},//下拉加载
				value: '',
				options: [{
					value: '1',
					label: '活动'
				}, {
					value: '0',
					label: '不活动'
				}],
				searchData: {
			        page: 1,
			        limit: 10,//分页显示数
			        enabled: '',//状态
		        },
				checkedName: [
					'产品类型',
					'状态',
					'状态修改人',
					'状态修改时间'
				],
				tableHeader: [
					{
						label: '产品类型',
						prop: 'M_NUM'
					},
					{
						label: '状态',
						prop: 'STATUS'
					},
					{
						label: '状态修改人',
						prop: 'CHANGEBY'
					},
					{
						label: '状态修改时间',
						prop: 'CHANGEDATE'
					}
				],
				selMenu: [],
				'活动': true,
				'不活动': false,
				inspectionList: [],
				search: false,
				show: false,
				down: true,
				up: false,
				isShow: false,
				ismin:true,
				fullHeight:{//给浏览器高度赋值
					height: '',
				},
				searchList: {//点击高级搜索后显示的内容
					PRO_NUM: '',
					STATUS: '',
					DEPARTMENT: '',
					PRO_NAME:'',
					VERSION:''
				},
				page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				aaaData:[],
			}
		},
		methods: {
			iconOperation(row, column, cell, event){
				console.log(column.property);
			        if(column.property ==="iconOperation"){
			          row.isEditing = !row.isEditing
			        }
			    },
			deleteRow(index, rows) {//删除行
				rows.splice(index, 1);
			},
			loadMore () {//表格滚动加载
			   if (this.loadSign) {
			     this.loadSign = false
			     this.page.currentPage++
			     if (this.page.currentPage > Math.ceil(this.page.totalCount/this.page.pageSize)) {
			       return
			     }
			     setTimeout(() => {
			       this.loadSign = true
			     }, 1000)
			     this.requestData()
			   }
			 },
			tableControle(data){//显示隐藏Table列
				this.checkedName = data;
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD HH:mm:ss"); 
			},
			sizeChange(val) {
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    currentChange(val) {
		      this.page.currentPage = val;
		      this.requestData();
		    },
			searchinfo(index) {
				this.page.currentPage = 1;
				this.page.pageSize = 10;
				this.requestData();
			},
			//添加数据内容
			openAddMgr() {
				this.aaaData = {
					PRO_NUM:'',
					PRO_NAME:'',
					STATUS:'活动',
					VERSION:'1',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:''
				};
				this.$refs.child.visible();
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
					this.up = !this.up
			},
			
			judge(data) {
				//taxStatus 状态布尔值
				return data.enabled ? '活动' : '不活动'
			},
			
			insert() {
				this.inspections.push(this.inspection)
			},
			remove(index) {
				this.inspections.splice(index, 1)
			},
			SelChange(val) {
				this.selMenu = val;
			},
			requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,

					PRO_NUM: this.searchList.PRO_NUM,
					STATUS: this.searchList.STATUS,
					DEPARTMENT: this.searchList.DEPARTMENT,
					PRO_NAME: this.searchList.PRO_NAME,
					VERSION: this.searchList.VERSION,
				}
				var url = '/api/api-apps/app/product';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;	
					//总的页数
					let totalPage=Math.ceil(this.page.totalCount/this.page.pageSize)
					if(this.page.currentPage >= totalPage){
						 this.loadSign = false
					}else{
						this.loadSign=true
					}
					this.commentArr[this.page.currentPage]=res.data.data
					let newarr=[]
					for(var i = 1; i <= totalPage; i++){
					
						if(typeof(this.commentArr[i])!='undefined' && this.commentArr[i].length>0){
							
							for(var j = 0; j < this.commentArr[i].length; j++){
								this.commentArr[i][j].isEditing = false;
								newarr.push(this.commentArr[i][j])
							}
						}
					}
					
					this.inspectionList = newarr;
				}).catch((wrong) => {})
			},
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			},
		},
		mounted() {
			this.requestData();
			// 获取浏览器可视区域高度
			window.onresize = () => {//获取浏览器可视区域高度
		 	return (() => {
		 		this.fullHeight.height = document.documentElement.clientHeight - 100+'px';
		 	})()
		 };
		},

	}
</script>

<style scoped>
.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.box-card {
	width: 480px;
}

.el-table .cell {
    width: 100%;
    display: inline-block;
	cursor: pointer;
}
</style>