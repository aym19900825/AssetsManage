<template>
<div>
	<el-row :gutter="70">
		<el-col :span="24" style="">
		<div class="daily-list" ref="list" @scroll="handleScroll">
			<el-table class="div-table" :data="tableData" style="width: 100%">
			    <el-table-column
			      type="index"
			      :index="indexMethod">
			    </el-table-column>
			    <el-table-column
			      prop="date"
			      label="日期"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="姓名"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="地址">
			    </el-table-column>
			  </el-table>
			</div>
		</el-col>
	</el-row>
</div>
</template>
<script>
 export default {
    data() {
      return {
         recommendList:[], //存放滚动区域要显示的数据
            isLoading:false,  //默认没有在加载数据

        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '公司'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '公司'
        }],
      }
    },
    methods:{
             indexMethod(index) {
		        return index * 1;
		      },

         //获取数据
       getRecommendList(){
                //表示正在加载数据
            this.isLoading=true;
            $.ajax.get('news/before/'+preDay).then(res=>{
                this.recommendList.push(res);
                //数据请求完成
                this.isLoading=false;
            })
        },
       handleScroll(){
            const $list=this.$refs.list;
                //如果数据有在加载中则这次请求退出
            if(this.isLoading) return; 
            //已经滚动的距离加页面的高度等于整个内容区高度时,视为接触到底部 
            //scrollTop 获取到顶部的滚动距离
            // clientHeight 表示页面视口高度
            // scrollHeight 页面内容的高度 
         if($list.scrollTop+document.body.clientHeight>=$list.scrollHeight){
  				this.getRecommendList();
	  		}
        }
    },
    mounted(){
        this.getRecommendList()
    }

  };
       
 
</script>
<style scoped>
.daily-list {
	width: 300px;
    position: fixed;
    top:0;
    left: 150px;
    overflow: auto;
}
</style>