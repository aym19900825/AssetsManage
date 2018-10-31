<template>
	<div>
	<div class="headerbg">
  		<vheader></vheader>
			<navs_header></navs_header>
	</div>
    <div class="contentbg">
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
					<!-- <a class="J_menuItem" :href="item.navherf" name="tabMenuItem" :key="index">
						<i :class="item.navicon"></i>
						<span class="nav-label" v-show="ismin">{{item.navtitle}}</span>
					</a> -->
				</li>

			</ul>
		</div>
	</div>


		<div class="wrapper wrapper-content">
			
				<EasyScrollbar>
        			<div id="wrapper" ref="homePagess" style="height: 600px;">
						<div id="information" style="height: inherit;">
							<div class="ibox-content">
							<div class="mask_tab-block">
								<div class="mask_tab-head clearfix">
									<div class="accordion_title">
										<span class="accordion-toggle">修改密码</span>
									</div>
									<div class="col_but">
										<i class="icon-arrow1-down"></i>
									</div>
								</div>


								 <el-form status-icon ref="personinfo" :model="personinfo" :rules="rules" label-width="80px" :label-position="labelPosition">
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
								 	
								 </el-form>	
							</div>

							<div class="content-footer">
								<button class="btn btn-default btn-large">取消</button>
								<button class="btn btn-primarys btn-large" @click="saveinfo">保存</button>
							</div>
							</div>
						</div>
					</div>
				</EasyScrollbar>
			
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
		name: 'passwordedit',
		components: {
			vheader,
			navs_header,
			navs,
//			navs_button,
			tablediv,
			usermask,
			tablediv
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
	          ismin:true,
	          clientHeight:'',//获取浏览器高度
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
	          },
	          leftNavs: [
				{//leftNavs左侧菜单数据
		            navicon: 'icon-role-site',
		            navtitle: '账号设置',
		            navherf: '/accuntsettings'
		          }, {
		            navicon: 'icon-user',
		            navtitle: '个人资料',
		            navherf: '/personinfo'
		          }, {
		            navicon: 'icon-edit',
		            navtitle: '修改密码',
		            navherf: '/passwordedit'
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
	    },
		
		methods: {  
			min2max(){ 
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
	   		
		    maxDialog(e) {
		    	$(".navbar-static-side").css("width", "40px");
				$(".wrapper").css("padding-left", "40px");
				$(".navs>li").css("margin", "0");
			},
			//还原按钮
			rebackDialog() {
				$(".navbar-static-side").css("width", "220px");
				$(".wrapper").css("padding-left", "220px");
				$(".navs>li").css("margin", "0px 10px");
			},
			saveinfo(){
				console.log(this.personinfo);
			}
		},
	}
</script>

<style scoped>
@import '../assets/css/mask-modules.css';



</style>

