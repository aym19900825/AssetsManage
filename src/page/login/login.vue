<template>
<div id="login">
    <div class="centerDiv">
        <div class="contmain">
            <div class="left-img"></div> 
            <div class="middle-box loginscreen">
                <div class="logo"></div>
                <div class="login_box">
                    <font>用户登录</font>
                    <form class="login_form" ref="loginForm" :model="userinfo" :role="rules" method="post">
                        <div class="input-group">
                            <label for="username">用户名</label>
                            <input type="text" id="username" v-model="userinfo.username" @blur="blur1()">
                            <div class="bottom-line"></div>
                            <span class="wrong">{{ername}}</span>
                        </div>

                        <div class="input-group">
                            <label for="password">密码</label>
                            <input type="password" id="password" v-model="userinfo.password" @blur="blur2()">
                            <div class="bottom-line"></div>
                            <span class="correct">{{erpass}}</span>
                        </div>
                        
                        <div class="input-group check-box">
                            <span class="mind">
                              <input type="checkbox" name="rememberpassword" id="rembpas">
                               <label for="rembpas">记住密码</label>
                            </span>
                               <span class="forget"><label>忘记密码？</label></span>
                        </div>
                        
                        <div class="input-group">
                            <button type="button" class="btn-login" @click="login">登 录</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="hiddenDiv"></div>

    <div class="footer-content">Copyright &#169 北京恒信启华信息技术股份有限公司 All Rights Reserved.</div>
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
                  

              }).catch((wrong) => {
                  
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
                }).catch((wrong) => {
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
                }else if(this.userinfo.username == 'admin'){
                    this.erclass = "c";
                    this.ername = "正确";
                }else{
                    this.ername = "用户名错误";
                }

             }, 
             blur2(){
                if (this.userinfo.password == '') {
                    // alert("2");
                    this.erpass = "必填信息";
                }else if(this.userinfo.password == 'admin'){
                    this.erpass = "正确";
                }else{
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
</style>
