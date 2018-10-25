<template>
    <div>
        <div class="content-tabs">
            <button class="roll-nav roll-left J_tabLeft"><i class="icon-previous"></i></button>
            <div class="page-tabs J_menuTabs">
                <div class="page-tabs-content">
                    <a href="javascript:;" class="active J_menuTab" data-id="/blackboard">首页</a>
                </div>
            </div>
            <button class="roll-nav roll-right J_tabRight"><i class="icon-next"></i></button>
            <div class="btn-group roll-nav roll-right">
                <button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作 <i class="icon-arrow2-down"></i></button>
                <ul role="menu" class="dropdown-menu dropdown-menu-right">
                    <li class="J_tabShowActive">
                        <a>定位当前选项卡</a>
                    </li>
                    <li class="divider"></li>
                    <li class="J_tabCloseAll">
                        <a>关闭全部选项卡</a>
                    </li>
                    <li class="J_tabCloseOther">
                        <a>关闭其他选项卡</a>
                    </li>
                </ul>
            </div>
            <a href="./login.html" class="roll-nav roll-right J_tabExit"><i class="icon-back"></i>返回</a>
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
    margin-left: 10px;
    background:linear-gradient(360deg,rgba(234,239,243,1) 0%,rgba(255,255,255,1) 100%);
    box-shadow:0px -2px 3px 0px rgba(176,192,237,0.2);
}
.page-tabs a {
    display: block;
    float: left;
    background-color: #FFFFFF;
    border: solid 1px #d1d8de;
    padding: 0 15px;
    height: 35px;
    line-height: 35px;
}
.page-tabs .J_menuTab{
    border-radius: 4px 4px 0px 0px;
}
</style>