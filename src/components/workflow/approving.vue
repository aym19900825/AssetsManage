<template>
<div>
	<el-dialog title="审批" :visible.sync="innerVisible" width="60%">
  <el-form ref="approveForm" :model="approveForm" :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-row :gutter="30">
      <el-col :span="23" :offset="0">
        <el-form-item label="审批意见" prop="opinion">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="approveForm.opinion"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item size="medium" class="div-submit">
      <el-button type="primary" @click="submitForm">同意</el-button>
      <el-button type="danger" @click="rejectForm">驳回</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
 </div>
</template>

<script>
import Config from '../../config.js';
export default {
	 props:["approvingData"],//第一种方式
  name: 'approving',
  
  data() {
    return {
    basic_url: Config.dev_url,
      approveForm: {
        opinion: '',
      },
     innerVisible: false,
     rules: {
        opinion: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur' }
        ],
     }

    }
  },

  methods: {
  	//点击关闭按钮
			close() {
				this.innerVisible = false;
			},
			open() {
				this.innerVisible = true;
			},
		  	visible() {
					this.open();
		  	},
		    //同意
		    submitForm(){
		    	var flag=true;
		    	this.$refs.approveForm.validate((valid) => {	
		    	var url = this.basic_url + '/api-apps/app/inspectPro/flow/'+this.approvingData;	
				this.approveForm = {
					 		"flag": true,
							"opinion":this.approveForm.opinion,
					}
				this.$axios.post(url, {}).then((res) => {
				console.log(res);
					if(res.data.resp_code == 1) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
				    }else{
				    	this.$message({
								message:res.data.resp_msg,
								type: 'success'
							});
				    }
				});
		    });
		    },
		    //驳回
		    rejectForm(){
		    	var flag=false;
		    	this.$refs.approveForm.validate((valid) => {	
		    	var url = this.basic_url + '/api-apps/app/inspectPro/flow/'+this.approvingData;	
				this.approveForm = {
					 		"flag": false,
							"opinion":this.approveForm.opinion,
					}
				this.$axios.post(url, {}).then((res) => {
				console.log(res);
					if(res.data.resp_code == 1) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
				    }else{
				    	this.$message({
								message:res.data.resp_msg,
								type: 'success'
							});
				    }
				});
		    });
		   },
		    //取消
		    resetForm(){
		    }
  }
}

</script>

<style>
.el-form-item {
margin-bottom: 20px;
}
.demo-ruleForm{
	padding-top:0px;
}
.mask{
	width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    display: block;
    top: 0px;
    z-index: 1001;
    margin-top:60px;
}
.masks_div{
    position: absolute;
    z-index: 1002;
    width: 50%;
    margin: 20% 20%;
    background:#F3F6FA;	
    border-radius: 0px;
    height: 50%;
    top: 0px;
    bottom: 0px;
    overflow: hidden;
}
</style>