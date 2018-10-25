<template>
	<div class="row content-tabs">
		<button class="roll-nav roll-left J_tabLeft"><i class="icon-skip-back"></i>
            </button>
		<div class="page-tabs J_menuTabs">
			<div class="page-tabs-content">
				<a href="javascript:;" class="active J_menuTab" data-id="/blackboard">首页</a>
			</div>
		</div>
		<button class="roll-nav roll-right J_tabRight"><i class="icon-skip-forward"></i>
            </button>
		<div class="btn-group roll-nav roll-right">
			<button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span>

                </button>
			<!--<ul role="menu" class="dropdown-menu dropdown-menu-right">
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
			</ul>-->
		</div>
		<a href="./login.html" class="roll-nav roll-right J_tabExit"><i class="icon-back"></i>返回</a>
	</div>
</template>

<script>
</script>

<style scoped>	
.content-tabs {
    position: relative;
    height: 42px;
    background: #fafafa;
    line-height: 40px;
    margin-left: -12px;
    margin-right: 2px;
    margin-bottom: -2px;
}
.content-tabs .roll-left {
    left: 0;
    border-right: solid 1px #eee;
}

.content-tabs .roll-nav, .page-tabs-list {
    position: absolute;
    width: 40px;
    height: 40px;
    text-align: center;
    color: #999;
    z-index: 2;
    top: 0;
    margin-left: 10px;
}
..roll-right.btn-group button {
    width: 80px;
}
.content-tabs button {
    background: #fff;
    border: 0;
    height: 40px;
   /* width: 40px;*/
    outline: none;
}

.page-tabs {
    position: absolute;
    margin-left: 50px;
    height: 40px;
    overflow: hidden;
    background: #F5F8FB;
}
.roll-right.J_tabRight {
    right: 140px;
}
.content-tabs .roll-right {
    right: 0;
    border-left: solid 1px #eee;
}
.content-tabs .roll-nav, .page-tabs-list {
    position:absolute;
    width: 40px;
    height: 40px;
    text-align: center;
    color: #999;
    z-index: 2;
    top: 0;
    margin-left: 10px;
}
.roll-right.btn-group {
    right: 60px;
    width: 80px;
    padding: 0;
}
.roll-right.J_tabExit {
    background: #fff;
    height: 40px;
    width: 60px;
    outline: none;
}
.roll-right.J_tabRight {
    right: 140px;
}
.page-tabs a.active {
    background: linear-gradient(360deg,rgba(232,236,240,1) 0%,rgba(255,255,255,1) 100%);
    color: #6585DF;
    margin-top: 6px;
    border-radius: 5px 5px;
    margin-left: 17px;
    box-shadow: 0px -2px 3px 0px rgba(176,192,237,0.2);
}
.page-tabs a {
    display: block;
    float: left;
    border: solid 1px #DFE5EA;
    padding: 0 15px;
}
.content-tabs button {
    background: #fff;
    border: 0;
    height: 40px;
    width: 80px;
    outline: none;
}
</style>