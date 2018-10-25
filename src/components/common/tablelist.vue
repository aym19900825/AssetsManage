<template>
	 <table class="table table-bordered table-striped text-center">
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
                      <!--<td>{{user.age}}</td>
                      <td>{{user.school}}</td>
                      <td><button v-on:click="remove(index)">remove</button></td>-->
                    </tr>
                    <tr>
                      <!--<td></td>
                      <td><input type="text"  id="name" v-model="user.name"/></td>
                      <td><input type="text" id="age"v-model="user.age"/></td>
                      <td><input type="text" id="school"v-model="user.school"/></td>
                      <td><button @click="insert">insert</button></td>-->
                    </tr>
                </tbody>
     </table>
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