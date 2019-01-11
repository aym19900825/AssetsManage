<template>
	<div class="heder clearfix white">
        <div class="logo"></div>
        <ul class="nav-head pull-left">
            <li class="current" @click="appCenter"><router-link :to="{path:'/index'}">应用中心</router-link></li>
            <!-- <li><router-link :to="{path:'/dashboardList'}" >程序设计器</router-link></li>
            <li><router-link :to="{path:'/dashboardList'}" >权限管理</router-link></li>
            <li>
                <router-link :to="{path:'/user_management'}" @click.native = "setTabs">系统配置</router-link>
            </li> -->
        </ul>
        <div class="nav-head pull-right nav-right">
            <el-badge :value="200" :max="99" class="item pt5 mr30">
               <router-link :to="{path:'/task'}"><i class="icon-notice"></i></router-link>
            </el-badge>
           

            <el-dropdown placement="top" trigger="click">
              <span class="el-dropdown-link white">
                <font class="roles pr10">{{username}}<br>{{GetRolesname}}</font>
                <font class="pr10">您好</font>
                <font><img class="userimg" /></font>
                <i class="el-icon-arrow-down icon-arrow2-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="scrollbar" style="max-height:300px">
                <el-dropdown-item v-for="item in GetRoles" >
                    <div @click = "clickfun($event)">
                        {{item.name}}
                    </div>
                </el-dropdown-item>
                
                <!-- <el-dropdown-item>
                    <router-link to="/personinfo">
                        <img class="userimgs" src="../../assets/img/male.png" />管理员
                    </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                    <router-link to="/personinfo">
                        <img class="userimgs" src="../../assets/img/male.png" />站长
                    </router-link>
                </el-dropdown-item> -->

                <el-dropdown-item class="border-linet pt10 mt10">
                    <router-link to="/personinfo">
                        <i class="icon-user mr10"></i>个人资料
                    </router-link>
                </el-dropdown-item>

                <el-dropdown-item class="border-lineb pb10">
                    <router-link to="/passwordedit">
                        <i class="icon-key mr10"></i>修改密码
                    </router-link>
                </el-dropdown-item>

                <el-dropdown-item>
                    <div v-on:click="cleanAll()">
                        <i class="icon-log-out mr10"></i>退出
                    </div>
                </el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
</template>

<script>
import Config from '../../config.js'
export default {
//  name: 'nav',
    data(){
        return {
            basic_url: Config.dev_url,
            username: '',
            nickname: '',
            GetRolesname:'',
            GetRoles:[],//获取当前角色
        }
    },
    methods: {
    	cleanAll(){
            this.$router.push({ path: '/',name: 'Login',});
            sessionStorage.clear();
                console.log(1234567);
//    		sessionStorage.setItem("",JSON.stringify(this.$store.state))
			this.$store.dispatch('setClickedNavAct',[{
                css: 'icon-user',
                name: '首页',
                url: '/index'}]);
            this.$store.dispatch('setSelectedNavAct',{
                css: 'icon-user',
                name: '首页',
                url: '/index'});
            this.$store.dispatch('setRoleIdAct',null);
            this.$store.dispatch('setNavIdAct',null);
            console.log(this.$store.state);
    	},
        getData(){//获取当前用户信息
            var url = this.basic_url + '/api-user/users/currentMap';
            this.$axios.get(url, {}).then((res) => {//获取当前用户信息
            	console.log(res);
                    this.username = res.data.username;
                    this.nickname = res.data.nickname;
                    this.userid = res.data.id;
            }).catch((err) => {
                this.$message({
                    message: '网络错误，请重试',
                    type: 'error'
                });
            });
        },
       getITEM_Roles() {
            var url = this.basic_url + '/api-user/roles/current';
            this.$axios.get(url, {}).then((res) => {
                this.GetRoles = res.data;
                this.GetRolesname=this.GetRoles[0].name;
            	console.log(this.GetRolesname);
                if(res.data!=null&&res.data.length>0)
                {
                    let item = res.data[0];
                    if(this.$store.state.roleid==null||typeof(this.$store.state.roleid)==undefined){
//                  	this.$store.dispatch('setRoleIdAct',item.id);
                   		console.log(item.id);
                   	}
                }
            }).catch(error => {
                console.log('请求失败');
            })
  
        },
		 clickfun(e) {
      		// e.target 是你当前点击的元素
      		// e.currentTarget 是你绑定事件的元素
      	    var content=$.trim(e.target.innerHTML)
      	    this.GetRolesname=content;
      	    var GetRoles=this.GetRoles
      	    for(let i=0;i<GetRoles.length;i++){
      	    	if(GetRoles[i].name==content){
      	    		var roId=this.GetRoles[i].id
                     this.$store.dispatch('setRoleIdAct',roId);
      	    	}
      	    }

    	   this.$emit('clickfun',roId);
      	   this.$store.dispatch('setClickedNavAct',[{
                css: 'icon-user',
                name: '首页',
                url: '/index'}]);
            this.$store.dispatch('setSelectedNavAct',{
                css: 'icon-user',
                name: '首页',
                url: '/index'});
    	},
        appCenter(){
//      	var item={
//      		css: 'icon-user',
//              name: '首页',
//              url: '/index'};
//      	if(this.$route.path!=this.$store.state.clickedNavs.url){
//				for(var i = 0; i < this.tabs.length; i++){
//					if(this.$route.path == this.tabs[i].url){
//						this.selectedTab = this.tabs[i];
//					}
//				}
//			}else{
//				this.$store.state.clickedNavs.push(item);
//				this.$store.dispatch('setSelectedNavAct',item);
//			}
        }
        
    },
    mounted(){
        this.getData();//调用getData
        this.getITEM_Roles();
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
    background-image:url(../../assets/img/logo-white.png);
    background-repeat: no-repeat;
    background-position: left center;
    width: 195px;
    min-height: 60px;
    float: left;
    position: relative;
    z-index: 998;
    margin-left: 22px;
    background-size: 75%;
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
    margin: 10px 20px;
}
.nav-right font { line-height:36px; display: inline-block; vertical-align: middle;}
font.roles { line-height:18px;}

.roles i{
    font-style: normal;;
    display: inline-block;
    padding-right: 5px;
    font-size: 12px;
}
a .userimgs {border:2px solid #DFE5EA;}
a:hover .userimgs {border:2px solid #9153f1;}
.userimgs {width:16px; height:16px; margin-right:9px; border-radius:3px;}

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
.border-linet {border-top:1px solid #DFE5EA;}
  
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
    border-radius:6px;
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