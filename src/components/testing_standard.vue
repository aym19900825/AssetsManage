<template>
<div>
	<div class="headerbg">
			<vheader></vheader>
		<navs_header></navs_header>
	</div>

    <div class="contentbg">
		<!--左侧菜单内容显示 Begin-->
		<div class="navbar-default navbar-static-side">
			<div id="sidebar-collapse">
				<div class="navbarbg">
					<span class="navbar-minimalize minimalize-styl-2" @click="min2max()">
						<i class="icon-menu1"></i> 
					</span>
				</div>
				<ul class="navs" id="side-menu" v-show="!isShow" >
					<li v-for="item in leftNavs">
						<router-link :to="item.navherf">
							<i :class="item.navicon"></i>
							<span class="nav-label" v-show="ismin">{{item.navtitle}}</span>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<!--左侧菜单内容显示 End-->

		<!--右侧内容显示 Begin-->
		<div class="wrapper wrapper-content">
			<EasyScrollbar>
				<div id="wrapper" ref="homePagess" style="height: 600px;">
					<div id="information" style="height: inherit;">
						<div class="ibox-content">
							<!--按钮操作行 Begin-->
								<div class="fixed-table-toolbar clearfix">
									<div class="bs-bars pull-left">
										<div class="hidden-xs" id="roleTableToolbar" role="group">
											<button type="button" class="btn btn-green" @click="openAddMgr" id="">
			                                	<i class="icon-add"></i>添加
			                      			 </button>
											<button type="button" class="btn btn-bule button-margin" @click="modify">
											    <i class="icon-edit"></i>修改
											</button>
											<button type="button" class="btn btn-red button-margin" @click="deluserinfo">
											    <i class="icon-trash"></i>删除
											</button>
											<button type="button" class="btn btn-primarys button-margin" @click="modestsearch">
									    		<i class="icon-search"></i>高级查询
									    		<i class="icon-arrow1-down" v-show="down"></i>
									    		<i class="icon-arrow1-up" v-show="up"></i>
											</button>
										</div>
									</div>

									<div class="columns columns-right btn-group pull-right">
										<button class="btn btn-default btn-outline btn-refresh" type="button" name="refresh" title="刷新"><i class="icon-refresh"></i></button>
										<div class="keep-open btn-group" title="列">
											<el-dropdown :hide-on-click="false" class="pl10 btn btn-default btn-outline">
												<span class="el-dropdown-link">
													<font class="J_tabClose"><i class="icon-menu3"></i></font>
													<i class="el-icon-arrow-down icon-arrow2-down"></i>
												</span>
												<el-dropdown-menu slot="dropdown">
													<el-dropdown-item>
														<el-checkbox label="名称" name="type"></el-checkbox>
													</el-dropdown-item>
													<el-dropdown-item>
														<el-checkbox label="所在部门" name="type"></el-checkbox>
													</el-dropdown-item>
													<el-dropdown-item>
														<el-checkbox label="所在公司" name="type"></el-checkbox>
													</el-dropdown-item>
													<el-dropdown-item>
														<el-checkbox label="所在部门" name="type"></el-checkbox>
													</el-dropdown-item>
												</el-dropdown-menu>
											</el-dropdown>
										</div>
									</div>
								</div>
							<!--按钮操作行 End-->

							<!-- 高级查询划出 Begin-->
							<div v-show="search">
								<el-form status-icon :model="searchList" label-width="70px">
									<el-row :gutter="10">
										<el-col :span="5">
											<el-form-item label="类型名称" class="searchlist" label-width="85px">
												<el-input v-model="searchList.typename"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="2">
											<el-button type="primary" @click="searchinfo" size="small" style="margin:4px">搜索</el-button>
										</el-col>
									</el-row>
								</el-form>
							</div>
							<!-- 高级查询划出 End-->
							<!-- 表格 Begin-->
							<el-table :data="userList" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange">

								<el-table-column type="selection" width="55" v-if="this.checkedName.length>0">
								</el-table-column>
								<el-table-column label="账号" sortable prop="username" v-if="this.checkedName.indexOf('账号')!=-1">
								</el-table-column>
								<el-table-column label="姓名" sortable prop="nickname" v-if="this.checkedName.indexOf('姓名')!=-1">
								</el-table-column>
								<el-table-column label="性别" sortable prop="sex" :formatter="sexName" v-if="this.checkedName.indexOf('性别')!=-1">
								</el-table-column>
								</el-table-column>
								<el-table-column label="部门" sortable prop="deptName" v-if="this.checkedName.indexOf('部门')!=-1">
								</el-table-column>
								<el-table-column label="公司" sortable prop="companyName" v-if="this.checkedName.indexOf('公司')!=-1">
								</el-table-column>
								<el-table-column label="状态" sortable prop="enabled" :formatter="judge" v-if="this.checkedName.indexOf('状态')!=-1">
								</el-table-column>
								<el-table-column label="创建时间" prop="createTime" sortable :formatter="dateFormat" v-if="this.checkedName.indexOf('创建时间')!=-1">
								</el-table-column>
							</el-table>
							<el-pagination v-if="this.checkedName.length>0"
					            @size-change="sizeChange"
					            @current-change="currentChange"
					            :current-page="page.currentPage"
					            :page-sizes="[10, 20, 30, 40]"
					            :page-size="page.pageSize"
					            layout="total, sizes, prev, pager, next"
					            :total="page.totalCount">
					        </el-pagination>
							<!-- 表格 End-->

						</div>
					</div>
				</div>
			</EasyScrollbar>
		</div>
	</div>
	<!--右侧内容显示 End-->
  	
</div>
</template>

<script>
import vheader from './common/vheader.vue'
import navs_header from './common/nav_tabs.vue'
import navs from './common/left_navs/nav_left.vue'

export default {
	name: 'safemanage',
		components: {
			vheader,
			navs_header,
			navs,
		},

    data() {
      return {
        show: false,
        down: true,
		up: false,
		isShow: false,
		ismin:true,
		searchList: {
			typename: ''
		},
        activeNames: ['1'],//手风琴数量
		clientHeight:'',//获取浏览器高度
        labelPosition: 'top',//表单标题在上方显示
		leftNavs: [//leftNavs左侧菜单数据
			{
				navicon: 'icon-user',
				navtitle: '用户管理',
				navherf: '/personinfo'
			}, {
				navicon: 'icon-edit',
				navtitle: '机构管理',
				navherf: '/dept_management'
			}, {
				navicon: 'icon-role-site',
				navtitle: '角色管理',
				navherf: '/role_management'
			}, {
				navicon: 'icon-file-text',
				navtitle: '客户管理',
				navherf: '/customer_management'
			}, {
				navicon: 'icon-file-text',
				navtitle: '产品类别',
				navherf: '/products_category'
			}, {
				navicon: 'icon-file-text',
				navtitle: '产品',
				navherf: '/products'
			}, {
				navicon: 'icon-file-text',
				navtitle: '检验/检测标准',
				navherf: '/testing_standard'
			}, {
				navicon: 'icon-file-text',
				navtitle: '检验/检测项目',
				navherf: '/testing_standard'
			}, {
				navicon: 'icon-file-text',
				navtitle: '检验/检测方法',
				navherf: '/test_method'
			}, {
				navicon: 'icon-file-text',
				navtitle: '自动编号设置',
				navherf: '/number_settings'
			}
		]
		
      }
    },
    mounted(){
			// 获取浏览器可视区域高度
			var _this = this;
			var clientHeight = $(window).height() - 100;    //document.body.clientWidth;
			_this.$refs.homePagess.style.height = clientHeight + 'px';
			window.onresize = function() {
				var clientHeight = $(window).height() - 100;
				_this.$refs.homePagess.style.height = clientHeight + 'px';
			};
			this.getData();
		},
	methods: {
		sizeChange(val) {
			this.page.pageSize = val;
			this.requestData();
	    },
		currentChange(val) {
			this.page.currentPage = val;
			this.requestData();
		},
		searchinfo(index) {
			this.page.currentPage = 1;
			this.page.pageSize = 10;
			this.requestData();
		},
		//添加用戶
		openAddMgr() {
			this.$refs.child.visible();
		},
		//修改用戶
		modify() {
			this.aaaData = this.selUser;
			if(this.aaaData.length == 0) {
				this.$message({
					message: '请您选择要修改的字典数据',
					type: 'warning'
				});
				return;
			} else if(this.aaaData.length > 1) {
				this.$message({
					message: '不可同时修改多个字典数据',
					type: 'warning'
				});
				return;
			} else {
				console.log(this.aaaData[0]);
				this.$refs.child.detail();
			}
		},
		//高级查询
		modestsearch() {
			this.search = !this.search;
			this.down = !this.down,
				this.up = !this.up
		},
		// 删除
		deluserinfo() {
			var selData = this.selUser;
			if(selData.length == 0) {
				this.$message({
					message: '请您选择要删除的字典数据',
					type: 'warning'
				});
				return;
			} else if(selData.length > 1) {
				this.$message({
					message: '不可同时删除多个字典数据',
					type: 'warning'
				});
				return;
			} else {
				var changeUser = selData[0];
				var id = changeUser.id;
				var url = '/api/api-user/users/' + id;
				this.$axios.delete(url, {}).then((res) => {//.delete 传数据方法
					//resp_code == 0是后台返回的请求成功的信息
					if(res.data.resp_code == 0) {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.requestData();
					}
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			}
		},
		min2max(){//左侧菜单正常和变小切换
        	if($(".navbar-static-side").width()=="220"){
		    	$(".wrapper").css("padding-left", "220px");
		    	$(".navs>li").css("margin", "0px 10px");
		    	this.maxDialog();
		    }else if($(".navbar-static-side").width()=="40"){
				$(".wrapper").css("padding-left", "40px");
				$(".navs>li").css("margin", "0");
				this.rebackDialog();
			}
		    this.ismin=!this.ismin;
   		},
	    maxDialog(e) {//右侧内容跟着左侧菜单正常和变小切换
	    	$(".navbar-static-side").css("width", "40px");
			$(".wrapper").css("padding-left", "40px");
			$(".navs>li").css("margin", "0");
		},
		rebackDialog() {//左侧菜单正常
			$(".navbar-static-side").css("width", "220px");
			$(".wrapper").css("padding-left", "220px");
			$(".navs>li").css("margin", "0px 10px");
		}
	}
}

</script>

<style scoped>
@import '../assets/css/mask-modules.css';


</style>

