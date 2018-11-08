<template>
	<div class="heder clearfix white">
        <div class="logo"></div>
        <ul class="nav-head pull-left">
            <li class="current"><router-link :to="{path:'/index'}">应用中心</router-link></li>
            <li><router-link :to="{path:'/dashboardList'}" >程序设计器</router-link></li>
            <li><router-link :to="{path:'/dashboardList'}" >权限管理</router-link></li>
            <li>
                <router-link :to="{path:'/user_management'}" >系统配置</router-link>
            </li>
        </ul>
        <div class="nav-head pull-right nav-right">
            <el-badge :value="200" :max="99" class="item mr30">
                <a href="#"><i class="icon-notice"></i></a>
            </el-badge>
            <el-dropdown placement="top" trigger="click">
              <span class="el-dropdown-link white">
                <font class="pr10">{{username}}，您好</font>
                <font><img class="userimg" /></font>
                <i class="el-icon-arrow-down icon-arrow2-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <router-link to="/personinfo">
                        <i class="icon-user mr10"></i>个人资料
                    </router-link>
                </el-dropdown-item>

                <el-dropdown-item class="border-lineb">
                    <router-link to="/passwordedit">
                        <i class="icon-key mr10"></i>修改密码
                    </router-link>
                </el-dropdown-item>

                <el-dropdown-item>
                    <router-link to="/">
                        <i class="icon-log-out mr10"></i>退出
                    </router-link>
                </el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
</template>

<script>
export default {
//  name: 'nav',
      data(){
        return {
         username: '',
        }
    },
    methods: {
        getData(){
            var url = '/api/api-user/users/currentMap';
            this.$axios.get(url, {}).then((res) => {//获取当前用户信息
                    this.username = res.data.username;
                    this.userid = res.data.id;
            }).catch((err) => {
                this.$message({
                    message: '网络错误，请重试',
                    type: 'error'
                });
            });
        }
    },
    mounted(){
        this.getData();//调用getData
    }
}
</script>

<style scoped>
.heder{
    width:100%;
    height:60px;
    background:linear-gradient(270deg,rgba(140,130,235,1) 0%,rgba(80,120,230,1) 100%);
    box-shadow:0px 2px 40px 1px rgba(221,229,252,0.5);
    position: relative;
    z-index: 2000;
}
.hederbg {
    height:60px;
    background: url(../../assets/img/head_rt.png) top right no-repeat;}

.logo{
    background-image: url(../../assets/img/logo-white.png);
    background-repeat: no-repeat;
    background-position: left center;
    width: 195px;
    min-height: 60px;
    float: left;
    position: relative;
    z-index: 998;
    margin-left: 25px;
}

.nav-head li{
    float: left;
    height:58px;
    font-size:15px;
    line-height:58px;
    padding-left:20px;
    padding-right:20px;
    margin: 0px 10px;
    border-top:2px solid transparent;
}
.nav-head li:hover,.nav-head .current{
    border-top:2px solid #FFF;    
    font-weight:bold;
    color:#FFFFFF;
    background-color:rgba(255,255,255,.1);
}


.nav-right{
    height:36px;
    line-height:36px;
    margin: 12px 40px;
}

.lingdang{
	position: relative;
    width:24px;
    height:24px!important;
    color:#fff;
    font-size:20px;
    line-height: 20px;
    display: inline-block;
} 
.lindang  .icon-notice{
	color:#fff;
}  
.userInfo{
    width: 84px;
    height: 20px;
    font-size: 14px;
    color: #FBFDFF;
    line-height: 37px;
    margin-left: 40px;
    margin-right: 10px;
}
.userimg{
	position: relative;
}

  
.userInfo{
    width:84px;
    height:20px;
    font-size:14px;
    font-weight:400;
    color:rgba(251,253,255,1);
    line-height: 37px;
    
}
.userimg{
    width:40px;
    height:36px;
    background-image: url(../../assets/img/female.png);
    background-size: 100%;
    background-repeat: no-repeat;
}
.icon-order-down{
	position: absolute;
    color: #fff;
    width: 10px;
    height: 6px;
    font-size: 14px;
    left: 50px;
    top: 8px;
}
</style>