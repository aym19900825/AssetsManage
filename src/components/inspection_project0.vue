<template>	
<div>
  <div class="headerbg">
		<vheader></vheader>
		<navs_header></navs_header>
	</div>

		<div class="contentbg">
		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content wrapperall">
			<el-row :gutter="0">
				<el-col :span="12"><!-- tableData -->
		  <el-table :data="inspectionList" row-key="id" border stripe height="400" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation">
		    
		    <el-table-column prop="iconOperation" fixed label="" width="50px">
		      <template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
		    </el-table-column>

		    <el-table-column prop="PRO_NAME" label="姓名" width="150px">
		      <template slot-scope="scope">
		        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.PRO_NAME" placeholder="請輸入內容"></el-input><span v-else="v-else">{{scope.row.PRO_NAME}}</span>
		      </template>
		    </el-table-column>

		    <el-table-column prop="birth" label="生日" width="180px">
		      <template slot-scope="scope">
		        <el-date-picker v-if="scope.row.isEditing" type="date" placeholder="選擇日期" v-model="scope.row.birth" value-format="yyyy-MM-dd"></el-date-picker><span v-else="v-else">{{scope.row.birth}}</span>
		      </template>
		    </el-table-column>

		    <el-table-column prop="age" label="年齡" width="140px">
		      <template slot-scope="scope">
		        <el-input-number v-if="scope.row.isEditing" v-model="scope.row.age" controls-position="right" size="small" :min="1" :max="100"></el-input-number><span v-else="v-else">{{scope.row.age}}</span>
		      </template>
		    </el-table-column>

		    <el-table-column prop="address" label="地址" width="300px">
		      <template slot-scope="scope">
		        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.address" placeholder="請輸入內容"></el-input><span v-else="v-else">{{scope.row.address}}</span>
		      </template>
		    </el-table-column>

		    <el-table-column prop="sex" label="姓別" width="80px">
		      <template slot-scope="scope">
		        <el-select v-if="scope.row.isEditing" v-model="scope.row.sex" placeholder="請選擇">
		          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
		        </el-select><span v-else="v-else">{{scope.row.sex}}</span>
		      </template>
		    </el-table-column>

		  </el-table>
		</el-col>
	</el-row>
</div>
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
			 tableData:[{
			       id: 1,
			       name: '王小明',
			       sex: '男',
			       age: 18,
			       birth:'1990-06-25',
			       address: '台北市大安區仁愛路三段',
			       isEditing: true,
			     },{
			       id: 2,
			       name: '張大花',
			       sex: '女',
			       age: 16,
			       birth:'1990-06-25',
			       address: '台北市大安區仁愛路三段',
			       isEditing: false,
			     },{
			       id:3,
			       name: '陳中天',
			       birth:'1990-06-25',
			       sex: '男',
			       age: 22,
			       address: '台北市大安區仁愛路三段',
			       isEditing: false,
			     },],
			     options:[{value:"1",label:"男"},{value:"0",label:"女"}],

			     inspectionList: [],
			     page: {//分页显示
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
			}
		},
		methods:{
			iconOperation(row, column, cell, event){
		        if(column.property ==="iconOperation"){
		          row.isEditing = !row.isEditing
		        }
		    },
		    requestData(index) {
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
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
		},
		mounted() {
			this.requestData();
		}
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