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

  <el-table
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>
  </el-table>

</template>

<script>
export default {
  name: 'tablediv',
  data () {
    return {
      user: {'checkbox': '', 'account': '','name':'','sex':'','role':'','department':'','state':'', 'great_time': ''},
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
    }
  },
  mounted(){
    this.requestData();
  }
}
</script>

<style>
</style>