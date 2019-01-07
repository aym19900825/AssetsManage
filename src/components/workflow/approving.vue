<template>
<div>
	<div class="masks_div">
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
      <el-button @click="resetForm">取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'approving',
  data() {
    return {
      approveForm: {
        opinion: '',
      },

     rules: {
        opinion: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur' }
        ],
     }

    }
  },

  methods: {
  	visible() {
			this.show=true;
  	},
    //同意
    submitForm(){
     
    },
    //驳回
    rejectForm(){
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