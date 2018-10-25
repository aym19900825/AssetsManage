<template>
	<div>
		<vheader></vheader>
		<navs_header></navs_header>
		<navs></navs>
		<div class="wrapper wrapper-content">
			<div class="ibox-content">
				<!--<navs_button></navs_button>-->
				<div class="fixed-table-toolbar clearfix">
					<div class="bs-bars pull-left">
						<div class="hidden-xs" id="roleTableToolbar" role="group">
							<button type="button" class="btn btn-green" @click="openAddMgr" id="">
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

				<div class="row">

					<div class="col-sm-3">
						<!-- <ztree></ztree> -->
					</div>
					<div class="col-sm-9">
						<tablediv></tablediv>
					</div>
				</div>
			</div>
		</div>
		<usermask ref="child"></usermask>
	</div>

</template>

<script>
	import vheader from './common/vheader.vue'
	import navs from './common/left_navs/nav_left.vue'
	import navs_header from './common/nav_tabs.vue'
	//import navs_button from './common/func_btn.vue'
	// import ztree from './common/ztree.vue'
	import tablediv from './common/tablelist.vue'
	import usermask from './common/user_mask.vue'

	export default {
		name: 'user_management',
		components: {
			vheader,
			navs_header,
			navs,
//			navs_button,

			tablediv,
			usermask,
			tablediv
		},
		methods: {
		    openAddMgr(){	
			       	this.$refs.child.childMethods(); // 方法2
			      } 
		},
		data() {
				return {
				    show:false,
						}
		}
	}
</script>

<style scoped>
	.wrapper {
		margin-left: 220px;
		background-color: #F5F8FB;
		height: 100%;
	}
	
	.ibox-content {
		background-color: #F5F8FB;
		color: inherit;
		padding: 0px 20px 20px 10px;
		border-color: #e7eaec;
		-webkit-border-image: none;
		-o-border-image: none;
		border-image: none;
		border-style: solid solid none;
		border-width: 1px 0px;
	}
</style>