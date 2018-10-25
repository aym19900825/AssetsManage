<template>
<div id="login">
    <div class="centerDiv">
        <div class="contmain">
            <div class="left-img"></div> 
            <div class="middle-box loginscreen">
                <div class="logo"></div>
                <div class="login_box">
                    <font>用户登录</font>
                    <form class="login_form" ref="loginForm" :model="userinfo" method="post">
                        <div class="input-group">
                            <label for="username">用户名</label>
                            <input type="text" id="username" v-model="userinfo.username" @blur="blur1()">
                            <div class="bottom-line"></div>
                            <span :class="{correct:a,wrong:b}">{{ername}}</span>
                        </div>

                        <div class="input-group">
                            <label for="password">密码</label>
                            <input type="password" id="password" v-model="userinfo.password" @blur="blur2()">
                            <div class="bottom-line"></div>
                            <span :class="{correct:c,wrong:d}">{{erpass}}</span>
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
    import qs from "qs"
    export default {
        name: 'login',
        methods: {
            login() {
                var url = '/api/api-auth/oauth/token?grant_type=password&scope=app&client_id=webApp&client_secret=webApp&username=' 
                        + this.userinfo.username   
                        + '&password=' 
                        + this.userinfo.password;

                 this.$axios({
                    method:"post",
                    url: url,
                  }).then((res)=>{
                        if(res.data.access_token){
                            sessionStorage.setItem('access_token',res.data.access_token);
                            sessionStorage.setItem('expires_in',res.data.expires_in);
                            sessionStorage.setItem('refresh_token',res.data.refresh_token);
                            this.$router.push('/user_management')
                        }

                  }).catch((wrong) => {
                      
                  })
             }, 
             blur1(){
                if (this.userinfo.username == '') {
                    this.ername = "必填信息";
                }else{
                    this.ername = "用户名错误";
                    this.a = false;
                    this.b = true;
                }
             }, 
             blur2(){
                if (this.userinfo.password == '') {
                    this.erpass = "必填信息";
                }else{
                    this.erpass = "密码错误";
                    this.c = false;
                    this.d = true;
                }
             }      
        },
        data () {
            return {
                msg: 'EAM2.0',
                ername:"",
                erpass:"",
                a:"",
                b:"",
                c:"",
                d:"",
                userinfo:{},
            }
        }
    }
</script>

<style scoped>
  @import './login.css';
</style>