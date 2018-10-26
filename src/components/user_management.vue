<template>
	<div>
		<div class="headerbg">
      <vheader></vheader>
  		<navs_header></navs_header>
    </div>

    <div class="contentbg">
		<navs></navs>
		<div class="wrapper wrapper-content">
			<div class="ibox-content">
				<!--<navs_button></navs_button>-->
				<div class="fixed-table-toolbar clearfix">
		<div class="bs-bars pull-left">
			<div class="hidden-xs" id="roleTableToolbar" role="group">
				<button type="button" class="btn btn-green" @click="openAddMgr()" id="">
                                <i class="icon-add"></i>添加
                       </button>
				<button type="button" class="btn btn-bule button-margin" onclick="MgrUser.openChangeUser()" id="">
						    <i class="icon-edit"></i>修改
						</button>
				<button type="button" class="btn btn-red button-margin" @click="delMgrUser()" id="">
						    <i class="icon-trash"></i>删除
						</button>
				<button type="button" class="btn btn-primarys button-margin" @click="resetPwd()" id="">
						    <i class="icon-refresh"></i>重置密码
						</button>
				<button type="button" class="btn btn-primarys button-margin" @click="unfreeze()" id="">
						    <i class="icon-start"></i>启用
						</button>
				<button type="button" class="btn btn-primarys button-margin" @click="freezeAccount()" id="">
						    <i class="icon-stop"></i>冻结
						</button>

				<button type="button" class="btn btn-primarys button-margin" onclick="MgrUser.roleAssign()" id="">
						    <i class="icon-role-site"></i>角色分配
						</button>
				<button type="button" class="btn btn-primarys button-margin" onclick="MgrUser.roleAssign()" id="">
						    <i class="icon-search"></i>高级查询<i class="icon-arrow1-down"></i>
						</button>
			</div>
		</div>
		<div class="columns columns-right btn-group pull-right">
			<button class="btn btn-default btn-outline" type="button" name="refresh" aria-label="refresh" title="刷新"><i class="icon-refresh"></i></button>
			<div class="keep-open btn-group" title="列">
				<button type="button" aria-label="columns" class="btn btn-default btn-outline dropdown-toggle" data-toggle="dropdown">
					<i class="icon-menu3"></i> 
					<i class="icon-arrow2-down"></i>
                </button>

				<ul class="dropdown-menu" role="menu">
					<li role="menuitem">
						<label>
							<input type="checkbox" data-field="id" value="1"> id
						</label>
					</li>
					<li role="menuitem" class="checkbox-group">
						<span>
							<input type="checkbox" data-field="name" value="2" checked="checked"><label>名称</label>
						</span>
					</li>
					<li role="menuitem" class="checkbox-group">
						<span>
                			<input type="checkbox" data-field="pName" value="3" checked="checked"><label>上级角色</label>
                		</span>
					</li>
					<li role="menuitem" class="checkbox-group">
						<span>
                			<input type="checkbox" data-field="deptName" value="4" checked="checked"><label>所在部门</label>
                		</span>
					</li>
					<li role="menuitem" class="checkbox-group">
						<span>
                			<input type="checkbox" data-field="companyName" value="5" checked="checked"><label>所在公司</label>
                		</span>
					</li>
					<li role="menuitem" class="checkbox-group">
						<span>
                			<input type="checkbox" data-field="tips" value="6" checked="checked"><label>名</label>
                		</span>
					</li>

				</ul>
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
    data(){
      return{
          userList: []
      }
    },
		methods: {

		    openAddMgr(){	
			       	this.$refs.child.childMethods(); //
			      },
        // 删除
        delMgrUser(){

        },
        // 重置
        resetPwd(){

        }, 
        // 启用
        unfreeze(){
            // var url = '/api/api-user/users';
      // this.$axios.get('/api/api-user/users',data).then((res)=>{
      //   this.userList = res.data.data;
      //   console.log(this.userList);
      // }).catch((wrong) => {
          
      // })
      // console.log(1);
            var url = '/api/api-user/users/updateEnabled?id=16&enabled=1';
            this.$axios.get(url,{
                // id:16,
                // enabled:1
            }).then(()=>{
              
            });
        },
        // 冻结
        freezeAccount(){

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
.headerbg { width:100%; height:100px; position: fixed; z-index: 999;}
.contentbg { padding-top: 100px; height: 100%; }
	.wrapper {
		width: 100%;
    height: 100%;
    padding-left: 220px;
    position: relative;
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
	
	[class*=" btn-"],[class^="btn-"] {
	color: #FFFFFF;
	font-size: 14px;
}
[class*=" btn-"] i,[class^="btn-"] i {margin-right:5px;}

.btn-green {
    background-color: #25b99e;
    border-color: #25b99e;
}
.btn-bule {
    background-color: #2fa5e5;
    border-color: #2fa5e5;
}
.btn-red {
    background-color: #e3517c;
    border-color: #e3517c;
}
.btn-primarys {
    background-color: #5d7fde;
    border-color: #5d7fde;
}
.btn-default {
    background-color: #ffffff;
    color: #5B6371;
    border: 1px solid #dfe5ea;
}
.btn-default:hover { color: #576FAE; }


.fixed-table-toolbar{
	position: relative;
    padding-top: 10px;
    padding-bottom: 12px;
    height: 55px;
    line-height: 30px;
}


.fixed-table-toolbar .columns {
	position: relative;
	height: 30px;
}

.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.fixed-table-toolbar .btn-group>.btn-group {
    display: inline-block;
    margin-left: -1px!important;
}
.btn-group>.btn-group,.btn-group>.btn {
    float: left;
}
.btn-group, .btn-group-vertical {
    position: relative;
    display: inline-block;
    vertical-align: middle;
}
.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.fixed-table-toolbar .btn-group>.btn-group:last-child>.btn {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
</style>