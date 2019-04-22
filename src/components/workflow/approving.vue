<template>
<div>
	<el-dialog :modal-append-to-body="false" :title="tit" :visible.sync="innerVisible" width="60%">
  <el-form ref="approveForm" :model="approveForm" :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-row :gutter="30">
      <el-col :span="23" :offset="0">
        <el-form-item :label="formLabel" prop="opinion">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="approveForm.opinion"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item size="medium" class="div-submit">
      <el-button type="primary" v-show="nodeState=='4'" @click="submitForm">接收</el-button>
      <el-button type="primary" v-show="nodeState!='4'" @click="submitForm">同意</el-button>
      <el-button type="danger" v-show="nodeState=='4'" @click="rejectForm">回退</el-button>
      <el-button type="danger" v-show="nodeState!='4'" @click="rejectForm">驳回</el-button>
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
    appname:'',
		id:'',
		nodeState: '',
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
		 },
		 tit: '',
		 formLabel: ''
    }
  },
  methods: {
  	//点击关闭按钮
			close() {
				this.innerVisible = false;
				this.approveForm={};
			},
			open() {
				this.innerVisible = true;
				this.approveForm={};
			},
			visible(nodeState) {
				this.nodeState = !!nodeState ? nodeState : '';
				if(this.nodeState == '2'){
					this.tit = '审核工作任务通知书';
					this.formLabel = '审核意见';
				}else if(this.nodeState == '3'){
					this.tit = '审批工作任务通知书';
					this.formLabel = '审批意见';
				}else if(this.nodeState == '4'){
					this.tit = '确认接收工作任务通知书';
					this.formLabel = '接收意见';
				}else if(this.nodeState == '5'){
					this.tit = '审批工作任务通知书';
					this.formLabel = '审批意见';
				}else{
					this.tit = '审批';
					this.formLabel = '审批意见';
				}
				this.open();
			},
		    //同意
		    submitForm(){
		    	this.id=this.approvingData.id;
		    	this.appname=this.approvingData.app;
		    	this.$refs.approveForm.validate((valid) => {	
						if (valid) {
						var url = this.basic_url + '/api-apps/app/'+this. appname+'/flow/'+this.id;	
						this.approveForm = {
								"end":false,
								"flag": true,
								"opinion":this.approveForm.opinion,
						}
					this.$axios.post(url, this.approveForm).then((res) => {
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
								this.close();
								//调用父页面的方法刷新页面
								this.$emit('detail');
							}
					});
					}else{
						return
					}
					});
		    },
		    //驳回
		    rejectForm(){
		    	this.id=this.approvingData.id;
		    	this.appname=this.approvingData.app;
		    	this.$refs.approveForm.validate((valid) => {	
		    	var url = this.basic_url + '/api-apps/app/'+this.appname+'/flow/'+this. id;	
				this.approveForm = {
							"end":false,
					 		"flag": false,
							"opinion":this.approveForm.opinion,
					}
				this.$axios.post(url, this.approveForm).then((res) => {
				
					if(res.data.resp_code == 1) {
							this.$message({
								message:res.data.resp_msg,
								type: 'warning'
							});
							this.close();
				    }else{
				    	this.$message({
								message:res.data.resp_msg,
								type: 'success'
							});
							this.close();
							//调用父页面的方法刷新页面
							this.$emit('detail');
				    }
				});
		    });
		   },
  }
}

</script>

<style>
.div-submit {
	margin-top: 20px;	
}
</style>