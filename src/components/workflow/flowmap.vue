<template>
<div class="stepComponent">
    <div class="stepsTitle">
        流程地图
    </div>
    <div class="processing_content text-center">
      图片占位位
    </div>
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