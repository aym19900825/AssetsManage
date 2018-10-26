<template>
   <!-- <table class="table table-bordered table-striped text-center">
                <thead>
                    <tr>
                        <th>全选</th>
                        <th>账号</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>角色</th>
                        <th>部门</th>
                        <th>状态</th>
                        <th>创建时间</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr v-for ="(user,index) in userList">
                      <td>{{user.value}}</td>
                      <td>{{user.account}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.sex}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.department}}</td>
                      <td>{{user.state}}</td>
                      <td>{{user.great_time}}</td>
                    </tr>
                    <tr>
                    </tr>
                </tbody>
     </table> -->
<div>
    
  

  <el-table :data="userList" style="width: 96%;margin: 0 auto;" :default-sort = "{prop: 

'userList', order: 'descending'}">
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
                <el-table-column label="状态" sortable width="100" prop="enabled">
                </el-table-column>
                <el-table-column label="创建时间" width="180" prop="createTime" sortable>
                </el-table-column>
            </el-table>
    <span class="demonstration">显示总数</span>
    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
     </div>        

</template>

<script>
export default {
  name: 'tablediv',
  data () {
    return {
      user: {'checkbox': '', 'account': 

'','name':'','sex':'','role':'','department':'','state':'', 'great_time': ''},
      userList: []
    }
  },
  methods: {
    insert: function () {
      this.users.push(this.user)
    },
    remove: function (index) {
      this.users.splice(index, 1)
    },
    requestData: function (index) {
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
  }
}
</script>

<style>

</style>