<template>
    <div>
        <div class="content-tabs">
            <button class="roll-nav roll-left J_tabLeft"><i class="icon-previous"></i></button>
            <div class="page-tabs J_menuTabs">
                <div class="page-tabs-content">
                    <router-link to="/index" class="J_menuTab">首页 <i class="icon-close2"></i></router-link>
                    <router-link to="/user_management" class="J_menuTab active" >用户管理 <i class="icon-close2"></i></router-link>
                </div>
            </div>
            <button class="roll-nav roll-right J_tabRight"><i class="icon-next"></i></button>
            <button class="btn-group roll-nav roll-right">
                <el-dropdown placement="top" trigger="click">
                  <span class="el-dropdown-link">
                    <font class="pr10 J_tabClose">关闭操作</font>
                    <i class="el-icon-arrow-down icon-arrow2-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="divider">定位当前选项卡</el-dropdown-item>
                    <el-dropdown-item class="J_tabCloseAll border-lineb">关闭全部选项卡</el-dropdown-item>
                    <el-dropdown-item class="J_tabCloseOther">关闭其他选项卡</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </button>
            <a href="/" class="roll-nav roll-right J_tabExit"><i class="icon-back"></i>返回</a>
        </div>
    </div>
</template>

<script>
    
</script>

<style scoped>  
.content-tabs {
    position: relative;
    height: 40px;
    background: #eaedf1;
    line-height: 40px;
    border-bottom: 1px solid #DFE5EA;
    box-shadow:0px 2px 24px 0px rgba(0,0,0,0.04);
}
.content-tabs button {border-radius: 0px;}
.content-tabs .roll-left {
    left: 0;
    border-right: solid 1px #d1d8de;
}
.content-tabs .roll-nav, .page-tabs-list {
    position: absolute;
    width: 40px;
    height: 39px;
    text-align: center;
    color: #999;
    z-index: 2;
    top: 0;
    margin-left: 10px;
}
.content-tabs button,.roll-right.J_tabExit {
    border: 0;
    height: 37px;
    background:linear-gradient(360deg,rgba(232,236,240,1) 0%,rgba(255,255,255,1) 100%);
}
.page-tabs {
    position: absolute;
    margin-left: 40px;
    height: 39px;
    overflow: hidden;
}
.roll-right.J_tabRight {
    right: 140px;
}
.content-tabs .roll-right {
    right: 0;
    border-left: solid 1px #d1d8de;
}
.content-tabs .roll-nav, .page-tabs-list {
    position: absolute;
    width: 40px;
    height: 39px;
    text-align: center;
    z-index: 2;
    top: 0;
    margin-left: 0px;
}
.content-tabs .roll-nav, .page-tabs-list,.roll-right.btn-group button{
    color: #5B6371;
    font-size: 14px;
}
.roll-right.btn-group {
    right: 60px;
    width: 100px;
    padding: 0;
}
.roll-right.btn-group button {
    width: 100px;
}
.roll-right.J_tabExit {
    height: 39px;
    width: 60px;
    
}
.roll-right.J_tabRight {
    right: 160px;
}
.page-tabs a.active {
    color: #6585DF;
    margin-top: 5px;
    background:linear-gradient(360deg,rgba(234,239,243,1) 0%,rgba(255,255,255,1) 100%);
    box-shadow:0px -2px 5px 0px rgba(176,192,237,0.5);

}
.page-tabs a {
    display: block;
    float: left;
    background-color: #eaedf1;
    border: solid 1px #d1d8de;
    padding: 0 15px;
    height: 35px;
    margin-top: 8px;
    margin-left: 5px;
    line-height: 35px;
    position: relative;
}
.page-tabs a .icon-close2 {
    color: #97A3B4;
}
.page-tabs a.active .icon-close2 {
    color: #E97A9B;
}
.page-tabs a:hover {background-color: #F5F8FB;}
.page-tabs a:hover .icon-close2,.page-tabs a:hover.active .icon-close2{
    color: #9153f1;
}



.page-tabs .J_menuTab{
    border-radius: 4px 4px 0px 0px;
}
</style>