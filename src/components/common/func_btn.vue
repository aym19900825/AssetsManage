<template>
	
	<div class="fixed-table-toolbar clearfix">
		<div class="bs-bars pull-left">
			<div class="hidden-xs" id="roleTableToolbar" role="group">
				<button type="button" class="btn btn-green" onclick="openAddMgr()" id="">
                                <i class="icon-add"></i>&nbsp;添加
                       </button>
				<button type="button" class="btn btn-bule button-margin" onclick="MgrUser.openChangeUser()" id="">
						    <i class="icon-edit"></i>&nbsp;修改
						</button>
				<button type="button" class="btn btn-red button-margin" onclick="MgrUser.delMgrUser()" id="">
						    <i class="icon-trash"></i>&nbsp;删除
						</button>
				<button type="button" class="btn btn-primarys button-margin" onclick="MgrUser.resetPwd()" id="">
						    <i class="icon-refresh"></i>&nbsp;重置密码
						</button>
				<button type="button" class="btn btn-primarys button-margin" onclick="MgrUser.unfreeze()" id="">
						    <i class="icon-start"></i>&nbsp;启用
						</button>
				<button type="button" class="btn btn-primarys button-margin" onclick="MgrUser.freezeAccount()" id="">
						    <i class="icon-stop"></i>&nbsp;冻结
						</button>

				<button type="button" class="btn btn-primarys button-margin" onclick="MgrUser.roleAssign()" id="">
						    <i class="icon-role-site"></i>&nbsp;角色分配
						</button>
				<button type="button" class="btn btn-primarys button-margin" onclick="MgrUser.roleAssign()" id="">
						    <i class="icon-search"></i>&nbsp;高级查询&nbsp;<i class="icon-arrow1-down"></i>&nbsp;
						</button>
			</div>
		</div>
		<div class="columns columns-right btn-group pull-right">
			<button class="btn btn-default btn-outline" type="button" name="refresh" aria-label="refresh" title="刷新">
                			<i class="glyphicon glyphicon-repeat"></i></button>
			<div class="keep-open btn-group" title="列">
				<button type="button" aria-label="columns" class="btn btn-default btn-outline dropdown-toggle" data-toggle="dropdown">
                					<i class="glyphicon glyphicon-list"></i> 
                					<span class="caret"></span>
                				</button>
				<!--<ul class="dropdown-menu" role="menu">
					<li role="menuitem">
						<label>
                							<input type="checkbox" data-field="id" value="1"> id
                						</label>
					</li>
					<li role="menuitem">
						<label>
                							<input type="checkbox" data-field="name" value="2" checked="checked"> 名称
                						</label>
					</li>
					<li role="menuitem">
						<label>
                							<input type="checkbox" data-field="pName" value="3" checked="checked"> 上级角色</label>
					</li>
					<li role="menuitem">
						<label>
                							<input type="checkbox" data-field="deptName" value="4" checked="checked"> 所在部门</label>
					</li>
					<li role="menuitem">
						<label>
                							<input type="checkbox" data-field="companyName" value="5" checked="checked"> 所在公司</label>
					</li>
					<li role="menuitem">
						<label>
                							<input type="checkbox" data-field="tips" value="6" checked="checked"> 名</label>
					</li>

				</ul>-->
			</div>
		</div>
	</div>

</template>

<script>
</script>

<style scoped>
.btn-green {
    background-color: #37CCB1;
    border-color: #37CCB1;
    color: #FFFFFF;
}
.btn-bule {
    background-color: #46ACE3;
    border-color: #46ACE3;
    color: #FFFFFF;
}
.btn-red {
    background-color: #E97A9B;
    border-color: #E97A9B;
    color: #fff;
}
.btn-primarys {
    background-color: #6585DF;
    border-color: #6585DF;
    color: #fff;
}
.btn-default {
    background-color: #c2c2c2;
    border-color: #c2c2c2;
    color: #FFFFFF;
}
.btn-outline {
    color: inherit;
    background-color: transparent;
    -webkit-transition: all .5s;
    transition: all .5s;
}
.fixed-table-toolbar{
	position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 34px;
}

</style>