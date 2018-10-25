<template>
	<div class="heder clearfix white">
        <div class="logo"></div>
        <ul class="nav-head pull-left">
                <li class="current"><router-link :to="{path:'/dashboardList'}" >应用中心</router-link></li>
                <li><router-link :to="{path:'/dashboardList'}" >程序设计器</router-link></li>
                <li><router-link :to="{path:'/dashboardList'}" >权限管理</router-link></li>
                <li>
                    <router-link :to="{path:'/dashboardList'}" >系统配置</router-link>
                </li>
        </ul>
        <div class="nav-head pull-right nav-right">
                <div class="userimg"><i class="icon-order-down"></i></div>
                <div class="userInfo">Admin,您好</div>
                <div class="lingdang">
                	<a href="#" title="待办任务">
                		<span class="tips_red" id="todotipscount">5</span>
                		<i class="icon-notice"></i>	
                    </a>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'nav',
      data(){
        return {
            
        }
    },
    methods: {
        
    },
    mounted(){

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
.tips_red{
	min-width: 12px;
    padding: 0 6px;
    height: 20px;
    border-radius: 50px;
    position: absolute;
    left: 14px;
    top: -2px;
    background: #f34949;
    line-height: 20px;
    text-align: center;
    color: #fff;
    font-size: 12px;
}
.nav-right div{float: right;}
.lingdang{
	position: relative;
    width:24px;
    height:24px!important;
    color:#fff;
    font-size:20px;
    line-height: 20px;
    padding-top:10px;
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