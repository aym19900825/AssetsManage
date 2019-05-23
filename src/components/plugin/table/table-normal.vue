<!--region 封装的分页 table-->
<template>
 <div class="table">
 <el-table id="iTable" v-loading.iTable="options.loading" :data="list" :stripe="options.stripe"
    ref="mutipleTable"
    @selection-change="handleSelectionChange">
  <!--region 选择框-->
  <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;">
  </el-table-column>
  <!--endregion-->
  <!--region 数据列-->
  <template v-for="(column, index) in columns">
  <el-table-column :prop="column.prop"
       :key='column.label'
       :label="column.label"
       :width="column.width">
   <template slot-scope="scope">
   <template v-if="!column.render">
    <template v-if="column.formatter">
    <span v-html="column.formatter(scope.row, column)"></span>
    </template>
    <template v-else>
    <span>{{scope.row[column.prop]}}</span>
    </template>
   </template>
   <template v-else>
    <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index"></expand-dom>
   </template>
   </template>
  </el-table-column>
  </template>
  <!--endregion-->
 </el-table>
 <div class="pt10 text-right">
      <el-pagination
          @size-change="sizeChange"
          background
          @current-change="currentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="page.totalCount">
      </el-pagination>
    </div>
 </div>
</template>
<!--endregion-->
<script>
 export default {
 props: {
    list: {
      type: Array,
      default: []
      }, // 数据列表
    columns: {
      type: Array,
      default: []
      }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    options: {
      type: Object,
      default: {
       stripe: false, // 是否为斑马纹 table
       highlightCurrentRow: false // 是否要高亮当前行
      },
    } // table 表格的控制参数
 },
//组件
 components: {
  expandDom: {
    functional: true,
    props: {
     row: Object,
     render: Function,
     index: Number,
     column: {
       type: Object,
       default: null
       }
      },
    render: (h, ctx) => {
       const params = {
       row: ctx.props.row,
       index: ctx.props.index
      }
     if (ctx.props.column) params.column = ctx.props.column
      return ctx.props.render(h, params)
    }
  }
 },
// 数据
 data () {
  return {
    pageIndex: 1,
    multipleSelection: [] // 多行选中
  }
 },
 mounted () {
 },
 computed: {
 },
 methods: {
 
  // 多行选中
  handleSelectionChange (val) {
    this.multipleSelection = val
    this.$emit('handleSelectionChange', val)
  },
 }
 }
</script>
<style lang="scss" >
 
</style>