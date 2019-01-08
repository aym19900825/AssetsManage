<template>
<div class="stepComponent">
	<el-dialog title="流程地图" :visible.sync="innerVisible" width="45%">
	    <div class="processing_content text-center">
	      <div id="image" style="width:100%;height:100%;overflow: auto;">
            <div class="layui-form-item">
                <image id="showImages1" style="display: none;"></image>
                <image id="showImages2"></image>
            </div>
           </div>
	    </div>
    </el-dialog>
</div>
</template>
<script>
 
export default {
   components: {
  },
  props: ['data', 'defaultActive'],
  data() {
    return {
       
    };
  },


  methods: {

  }
};
</script>
<style scoped>
  .stepComponent{
      padding: 10px 10px 10px 10px;
  }
  .stepsTitle{
      margin: 10px 0px  10px  0px ;
  }

  .processing_content{
    font-size: 14px;
    line-height:2em;
    background-color: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
  }
</style>