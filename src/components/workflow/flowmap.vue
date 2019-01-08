<template>
<div class="stepComponent">
	<el-dialog title="流程地图" :visible.sync="innerVisible" width="70%">
	    <div class="processing_content text-center">
	      <div id="image" style="width:100%;height:100%;overflow: auto;">
            <div class="layui-form-item">
                <img id="showImages1" style="display: none;"></img>
                <img id="showImages2"></img>
            </div>
           </div>
	    </div>
    </el-dialog>
</div>
</template>
<script>
 import Config from '../../config.js'; 
export default {
   components: {
  },
  props: ['data', 'defaultActive'],
  data() {
    return {
    basic_url: Config.dev_url,  
    innerVisible: false,
    };
  },
	  methods: {
	  	open() {
					this.innerVisible = true;
				},
	  	getimage(id){
	  		var countNum = 0;
	  		var url = this.basic_url + '/api-apps/app/inspectPro/flow/image/'+id;
					this.$axios.get(url, {}).then((res) => {
						console.log(res);
						this.innerVisible = true;
						
						 var result = res.data.datas;
						 result= $.parseJSON(result).images;
	//					 result=eval('(' + result + ')');
						//result= $.parseJSON( result);
	            		var imgObj1 = document.getElementById("showImages1");
	            		var img1 = $(imgObj1);
	            		$("#showImages1").attr("src","data:image/png;base64," + result[0]);
	           			 //imgObj1.src = "data:image/png;base64," + result[0];
	            		var imgObj2 = document.getElementById("showImages2");
	            		var img2 = $(imgObj2);
	           			// imgObj2.src = "data:image/png;base64," + result[1];
				          $("#showImages2").attr("src","data:image/png;base64," + result[1]);
				//          $("#showImages1").show();
				            window.setInterval(function () {
				                //获取网页中id=myImg的图片对象元素
				//              var imgObj = document.getElementById("showImages")
				//              imgObj.src = "data:image/png;base64,"+result[countNum] ;
				                if (countNum == 0) {
				                    $("#showImages1").show();
				                    $("#showImages2").hide();
				                } else {
				                    $("#showImages1").hide();
				                    $("#showImages2").show();
				                }
				                countNum++;
				                if (countNum == 2) {
				                    countNum = 0;//回到了原点
				                }
				            }, 1000);
									
								});
	  	}
	      
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