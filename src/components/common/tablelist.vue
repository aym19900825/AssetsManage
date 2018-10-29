<template>
<div>
  <el-table :data="userList" style="width: 96%;margin: 0 auto;" :default-sort = "{prop: 

    'userList', order: 'descending'}"  @selection-change="SelChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="账号" sortable width="80" prop="username">                  
                </el-table-column>
                <el-table-column label="姓名" sortable width="100" prop="nickname">                 
                </el-table-column>                
                 <el-table-column label="性别" sortable width="80" prop="sex">
                </el-table-column>
                <el-table-column label="角色" sortable width="100" prop="roleId">
                </el-table-column>
                <el-table-column label="部门" sortable width="100" prop="deptId">
                </el-table-column>
                  <el-table-column label="状态" sortable width="100" prop="enabled" :formatter="judge">
                </el-table-column>
                 <el-table-column label="创建时间" width="180" prop="createTime" sortable  :formatter="dateFormat">
                </el-table-column> 
            </el-table>
    <!-- <span class="demonstration">显示总数</span>" -->
    <el-pagination
  background
  layout="prev, pager, next"
  :total="2" style="float:right;margin-top:10px;">
</el-pagination>
     </div>        

</template>

<script>
export default {
  name: 'tablediv',
  data () {
    return {
      userList: [],
      selUser: [],
      '启用':true,
      '冻结':false,
      // {
      //   "username":"pangsq",
      //   "nickname":"庞思齐",
      //   "sex":"女",
      //   "roleId":"管理员",
      //   "deptId":"研发部",
      //   "enabled":true,
      //   "createTime":1491559642000
      // },
      // {
      //   "username":"zhangdd",
      //   "nickname":"张丹丹",
      //   "sex":"女",
      //   "roleId":"超级管理员",
      //   "deptId":"研发部",
      //   "enabled":false,
      //   "createTime":1491559642000
      // }
    }
  },
  methods: {
    judge(data){
      
        //taxStatus 布尔值
        console.log(data.enabled);
        return data.enabled ? '启用' : '冻结'

    },
     //时间格式化  
    dateFormat(row, column) {  
         var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return this.$moment(date).format("YYYY-MM-DD HH:mm:ss"); 
         // return util.formatDate.format(new Date(date), 'yyyy-MM-dd'); 
      },  
    insert() {
      console.log("aaaaaaaaaaaaaa");
      this.users.push(this.user)
    },
    remove(index) {
      this.users.splice(index, 1)
    },
    SelChange(val){
      this.selUser = val;
    },
    // deluser(){
    //   var selData = this.selUser;
    //   if(selData.length == 0){
    //     this.$message({
    //       message:'请您选择要删除的用户',
    //       type:'warning'
    //     });
    //     return;
    //   }else if(selData.length > 1){
    //       this.$message({
    //       message: '不可同时多个用户进行重置',
    //       type: 'warning'
    //     });
    //     return;
    //   }else{
    //     var changeUser = selData[0];
    //     var id = changeUser.id;
    //     var url = '/api/api-user/users/'+id+'/resetPassword';
    //     this.$axios.post(url,{
    //     }).then((res)=>{
    //         //resp_code == 0是后台返回的请求成功的信息
    //         if(res.data.resp_code == 0){
    //           this.$message({
    //             message: '重置成功',
    //             type: 'success'
    //           });
    //           this.requestData();
    //         }
    //       }).catch((err) => {
    //         this.$message({
    //           message: '网络错误，请重试',
    //           type: 'error'
    //         });
    //       });
    //     }
    // },
    resetPass(){
      var selData = this.selUser;
      if(selData.length == 0 ){
        this.$message({
          message: '请您选择要重置密码的用户',
          type: 'warning'
        });
        return;
      }else if(selData.length > 1){
        this.$message({
          message: '不可同时多个用户进行重置',
          type: 'warning'
        });
        return;
      }else{
        var changeUser = selData[0];
        var id = changeUser.id;
        var url = '/api/api-user/users/'+id+'/resetPassword';
        this.$axios.post(url,{
        }).then((res)=>{
            //resp_code == 0是后台返回的请求成功的信息
            if(res.data.resp_code == 0){
              this.$message({
                message: '重置成功',
                type: 'success'
              });
              this.requestData();
            }
          }).catch((err) => {
            this.$message({
              message: '网络错误，请重试',
              type: 'error'
            });
          });
        }
    },
    unfreezeStatus(){
      var selData = this.selUser;
      if(selData.length == 0 ){
        this.$message({
          message: '请您选择您要启动的用户',
          type: 'warning'
        });
        return;
      }else if(selData.length > 1){
        this.$message({
          message: '不可同时启动多个用户',
          type: 'warning'
        });
        return;
      }else{
        var changeUser = selData[0];
        console.log(changeUser);
        var url = '/api/api-user/users/updateEnabled?id='+changeUser.id+'&enabled=true';
        console.log(url);
        this.$axios.get(url,{
        }).then((res)=>{
            console.log(res.data);
            //resp_code == 0是后台返回的请求成功的信息
            if(res.data.resp_code == 0){
              this.$message({
                message: '启动成功',
                type: 'success'
              });
              this.requestData();
            }
          }).catch((err) => {
            this.$message({
              message: '网络错误，请重试',
              type: 'error'
            });
          });
        }
    },
    freezeStatus(){
      var selData = this.selUser;
      if(selData.length == 0 ){
        this.$message({
          message: '请您选择您要冻结的用户',
          type: 'warning'
        });
        return;
      }else if(selData.length > 1){
        this.$message({
          message: '不可同时冻结多个用户',
          type: 'warning'
        });
        return;
      }else{
        var changeUser = selData[0];
        var url = '/api/api-user/users/updateEnabled?id='+changeUser.id+'&enabled=false';
        this.$axios.get(url,{
        }).then((res)=>{
            //resp_code == 0是后台返回的请求成功的信息
            if(res.data.resp_code == 0){
              this.$message({
                message: '冻结成功',
                type: 'success'
              });
              this.requestData();
            }
          }).catch((err) => {
            this.$message({
              message: '网络错误，请重试',
              type: 'error'
            });
          });
        }
    },
    requestData(index) {
      var data = {
          params:{
            page: 1,
            limit: 2
          } 
      }
      var url = '/api/api-user/users';
      this.$axios.get(url,data).then((res)=>{
        this.userList = res.data.data;
      }).catch((wrong) => {
          
      })
    },
    formatter(row, column) {
        return row.enabled;
    }
  },
  mounted(){
    this.requestData();
  },
}
</script>

<style>

</style>