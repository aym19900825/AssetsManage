<template>
	<div>
		<div class="headerbg">
      		<vheader></vheader>
  			<navs_header></navs_header>
    	</div>

    <div class="contentbg">
		<div id="aaa" class="navbar-default navbar-static-side" >
		<div id="sidebar-collapse">
			<div class="navbarbg">
				<a class="navbar-minimalize minimalize-styl-2"><i class="icon-menu1"></i> </a>
			</div>
			<ul class="navs" id="side-menu" v-show="!isShow" >

				<li>
					<a class="J_menuItem" href="/notice/hello" name="tabMenuItem">
						<i class="icon-role-site"></i>
						<span class="nav-label">账号设置</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="/swagger-ui.html" name="tabMenuItem">
						<i class="icon-user"></i>
						<span class="nav-label">个人资料</span>
					</a>
				</li>
				<li>
					<a class="J_menuItem" href="./system/code/code.html" name="tabMenuItem">
						<i class="icon-edit"></i>
						<span class="nav-label">修改密码</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
		<div class="wrapper wrapper-content">
				<div class="ibox-content">
				<div class="accordion" id="information">
				<div class="mask_tab-block">
					<div class="mask_tab-head clearfix">
						<div class="accordion_title">
							<span class="accordion-toggle">基本资料</span>
						</div>
						<div class="col_but">
							<i class="icon-arrow1-down"></i>
						</div>
					</div>
					 <el-form status-icon ref="personinfo" :model="personinfo" :rules="rules" label-width="80px" :label-position="labelPosition" style="margin-left: 15px;margin-right: 15px;">
					 	<!-- 第一行 -->
					 	<el-row :gutter="70">
					 		<el-col :span="8">
					 			 <el-form-item label="用户称谓" prop="name">
								    <el-input v-model="personinfo.name"></el-input>
								  </el-form-item>	
					 		</el-col>
					 		<el-col :span="8">
					 			 <el-form-item label="出生日期">
				                      <el-date-picker
								      v-model="personinfo.birthdate"
								      type="date"
							      placeholder="选择日期" value-format="yyyy-MM-dd">
								    </el-date-picker>
				                </el-form-item>		
					 		</el-col>
					 		<el-col :span="8">
					 			<el-form-item label="性别">
					 				<el-radio v-model="personinfo.sex" label="男">男
					 				</el-radio>
	  								<el-radio v-model="personinfo.sex" label="女">女
	  								</el-radio>
					 			</el-form-item>
					 		</el-col>
					 	</el-row>
					 	<!-- 第二行 -->
					 	<el-row :gutter="70">
					 		<el-col :span="8">
					 			 <el-form-item label="工号">
							    <el-input v-model="personinfo.id"></el-input>
							  </el-form-item>	
					 		</el-col>
					 		<el-col :span="8">
					 			 <el-form-item label="入职日期">
				                      <el-date-picker
								      v-model="personinfo.workdate"
								      type="date"
							      placeholder="选择日期" value-format="yyyy-MM-dd">
								    </el-date-picker>
				                </el-form-item>		
					 		</el-col>
					 		<el-col :span="8">
					 			<el-form-item label="身份证号">
								    <el-input v-model="personinfo.digital"></el-input>
								  </el-form-item>
					 		</el-col>
					 	</el-row>
					 	<!-- 第三行 -->
					 	<el-row :gutter="70">
					 		<el-col :span="8">
					 			 <el-form-item label="默认身份">
					 				<el-switch v-model="personinfo.defdigital" active-color="#13ce66" inactive-color="#ff4949">
									</el-switch>
					 			</el-form-item>	
					 		</el-col>
					 		<el-col :span="8">
					 			 <el-form-item label="参加工作时间">
				                      <el-date-picker
								      v-model="personinfo.joindate"
								      type="date"
							      placeholder="选择日期" value-format="yyyy-MM-dd">
								    </el-date-picker>
				                </el-form-item>		
					 		</el-col>
					 		<el-col :span="8">
					 			<el-form-item label="电子邮箱">
								    <el-input v-model="personinfo.email"></el-input>
								  </el-form-item>
					 		</el-col>
					 	</el-row>
					 	<!-- 第四行 -->
					 	<el-row :gutter="70">
					 		<el-col :span="8">
					 			 <el-form-item label="联系电话">
							    <el-input v-model="personinfo.tele"></el-input>
							  </el-form-item>	
					 		</el-col>
					 		<el-col :span="8">
					 			 <el-form-item label="手机号">
							    <el-input v-model="personinfo.phone"></el-input>
							  </el-form-item>	
					 		</el-col>
					 		<el-col :span="8">
					 			<el-form-item label="传真号">
								    <el-input v-model="personinfo.rex"></el-input>
								  </el-form-item>
					 		</el-col>
					 	</el-row>
					 	<!-- 第五行 -->
					 	<el-row :gutter="70">
					 		<el-col :span="16">
					 			 <el-form-item label="地址">
							    <el-input v-model="personinfo.address"></el-input>
							  </el-form-item>	
					 		</el-col>
					 		<el-col :span="8">
					 			<el-form-item label="邮编">
								    <el-input v-model="personinfo.code"></el-input>
								  </el-form-item>
					 		</el-col>
					 	</el-row>
					 	<!-- 第六行 -->
					 	<el-row :gutter="70">
					 		<el-col :span="24">
					 			 <el-form-item label="备注">
							    <el-input  type="textarea" :rows="3" v-model="personinfo.note"></el-input>
							  </el-form-item>	
					 		</el-col>
					 	</el-row>
					 </el-form>						
						<!-- 第六行 -->
						<!-- <el-row>
						  <el-col :span="24"><div class="grid-content bg-purple">
						  	<el-form ref="form" label-width="80px" :label-position="labelPosition">
							  <el-form-item label="备注">
							    <el-input type="textarea"></el-input>
							  </el-form-item>
							</el-form>
						  </div>
						  </el-col>
						</el-row> -->
					<!-- </div> -->
				</div>
				<div class="content-footer">
				<button class="btn btn-default btn-large">取消</button>
				<button class="btn btn-primarys btn-large" @click="saveinfo">保存</button>
			</div>
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
			saveinfo(){
				console.log(this.personinfo);
			}
		},
		data() {
			var validatePass1 = (rule, value, callback) => {
                // var regName =/^[\u4e00-\u9fa5]{2,4}$/; 
                console.log(value);
                if (value === '') {
                    callback(new Error('必填'));}
                // } else if (!name.test(this.personinfo.name)) {
                //     callback(new Error('真实姓名填写有误'));
                // } 
                else {
                    callback();
                }
            };
			return {
			  show:false,
		      userList: [],
	          isShow: false,
	          radio: '1',
	          value3: '',
	          value4: '',
	          value5: '',
	          value1:true,
	          value2: true,
	          labelPosition: 'top',
	          personinfo:
	          	{
	          		name:'pangsq',
	          		birthdate:'2018-10-28',
	          		sex:'女',
	          		id:'2018011865',
	          		workdate:'2018-10-29',
	          		digital:'130181178712341234',
	          		defdigital:'',
	          		joindate:'2018-11-01',
	          		email:'765676543@qq.com',
	          		tele:'010-2345746',
	          		phone:'13634567890',
	          		rex:'2134567',
	          		address:'北京市海淀区',
	          		code:'050000',
	          		note:'这是备注的描述',
	          	},
	          rules:{
	          	name:[
	          		{
	          			required: true,
	                    validator: validatePass1,
	                    trigger: 'blur'
	          		}
	          	]
	          }
	          
			}
		}
	}
</script>

<style scoped>
@import '../assets/css/mask-modules.css';
.navbar-static-side{
	float: left;
    width: 220px;
    height: 100%;
    position: fixed;
    background: linear-gradient(360deg,rgba(160, 120, 240, 1) 0%,rgba(65, 105, 218, 1) 100%);
}

.slimScrollDiv{
	position: relative;
    width: auto;
    height: 92%;
}

.navbarbg, .navbarbg a {
    color: #FFF;
}

.navbarbg {
    height: 40px;
    text-align: right;
    padding-right: 20px;
}
.navs>li {
    margin: 0px 10px;
}
.navs > li > a {
    color: #fff;
    display: block;
    padding: 14px 15px 14px 15px;
    border-radius:5px;
}

.navs > li > a:hover,.navs > li > a.current{background:rgba(97,131,226,.7);}

.navs > li > a i[class*=icon-] {
    font-size: 16px;
}
.navs > li > a i {
    margin-right: 6px;
}
.minimalize-styl-2 {
    font-size: 14px;
    color: #FFFFFF;
    line-height: 40px;
}
.nav>li {
    margin: 0px 10px;
}
.nav > li > a i[class*=icon-] {
    font-size: 16px;
}

.nav > li > a i {
    margin-right: 6px;
}
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