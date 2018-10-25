<template>
  <div id="login">
  <div class="img-bg">
    <div class="bottom-img"></div>
    <div class="left-img"></div>   
    <div class="middle-box loginscreen">
        <div class="logo-img"></div>
        
        <div class="centerDiv">
            <font>用户登录</font>
            <form class="m-t" ref="loginForm" :model="userinfo" :role="rules" method="post">
                <div class="form-group">
                    <input type="text" id="username" class="form-control" placeholder="用户名" v-model="userinfo.username" @blur="blur1()">
                    <span class="err">{{ername}}</span>
                    <span><i class="icon-alert-triangle"></i></span>
                </div>
                <div class="form-group">
                    <input type="password" id="password" class="form-control" placeholder="密码" v-model="userinfo.password" @blur="blur2()">
                    <span class="err">{{erpass}}</span>
                </div>
                
                <div class="check-box clearfix">
                    <span class="mind">
                      <input type="checkbox" name="remember">&nbsp;
                       <label>记住密码</label>
                    </span>
                       <span class="forget"><label>忘记密码？</label></span>
                </div>    
               

                <button type="button" class="btn-login block full-width m-b" @click="login">登 录</button>                
            </form>
        </div>
      <div class="hiddenDiv"></div>
    </div>
</div>
</div>
</template>

<script>
    export default {
        name: 'login',
        methods: {
            login() {
              var submitData = {"grant_type": "password","scope":  "app","client_id": "webApp","client_secret": "webApp","username": "admin","password": "admin"};
                // var url = '/api/api-auth/oauth/token';
                var url = '/api/api-auth/oauth/token?grant_type=password&scope=app&client_id=webApp&client_secret=webApp&username=admin&password=admin';
                 this.$axios({
                    method:"post",
                    url: url,
                  }).then((res)=>{
                  

              }).catch((err) => {
                  
              })
               /* this.$axios.post(url,{
                    grant_type:'password',
                    scope:'app',
                    client_id:'webApp',
                    client_secret:'webApp',
                    username: this.userinfo.username,
                    password: this.userinfo.password
                }).then((res) => {
                    console.log(1);
                }).catch((err) => {
                    this.$message({
                        type: 'error',
                        message: '网络错误，请重试',
                        showClose: true
                    })
                })*/
             }, 
             blur1(){
                if (this.userinfo.username == '') {
                    // alert("1");
                    this.ername = "必填信息";
                }
                // else if(this.userinfo.username == 'admin'){
                //     this.ername = "正确";
                // }
                else{
                    this.ername = "用户名错误";
                }

             }, 
             blur2(){
                if (this.userinfo.password == '') {
                    // alert("2");
                    this.erpass = "必填信息";
                }
                // else if(this.userinfo.password == 'admin'){
                //     this.erpass = "正确";
                // }
                else{
                    this.erpass = "密码错误";
                }
             }      
        },
        data () {
            return {

                msg: 'EAM2.0',
                ername:"",
                erpass:"",
                userinfo:{},
                // rules: {
                //     username:[
                //         {
                //             required: true,
                //             message: '必填信息',
                //             trigger: 'blur',
                //         }
                //     ],
                //     password:[
                //         {
                //             required: true,
                //             message: '必填信息',
                //             trigger: 'blur',
                //         }
                //     ]
                // }

            }
        }
    }
</script>

<style scoped>
  @import './login.css';
  .err{
    color: red;
    margin: -top;
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 2px;
  }
</style>
