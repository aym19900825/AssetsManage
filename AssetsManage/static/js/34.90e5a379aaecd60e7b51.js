webpackJsonp([34],{"+wnD":function(t,e){},B6LP:function(t,e){},T4gK:function(t,e,a){"use strict";(function(t){var n=a("mvHQ"),s=a.n(n);e.a={name:"navs",data:function(){return{isShow:!1,ismin:!0,fullHeight:document.documentElement.clientHeight-100+"px",leftNavs:[{navicon:"icon-file-text",navtitle:"产品类别",navherf:"/products_category"},{navicon:"icon-file-text",navtitle:"产品",navherf:"/products"},{navicon:"icon-file-text",navtitle:"检验/检测标准",navherf:"/testing_standard"},{navicon:"icon-file-text",navtitle:"检验/检测项目",navherf:"/testing_projects"},{navicon:"icon-file-text",navtitle:"检验/检测方法",navherf:"/testing_methods"},{navicon:"icon-file-text",navtitle:"原始数据模板",navherf:"/data_module"},{navicon:"icon-file-text",navtitle:"检验/检测报告模板",navherf:"/report_module"},{navicon:"icon-file-text",navtitle:"作业指导书",navherf:"/work_instruction"}],selectedNav:{}}},methods:{addClickNav:function(e){console.log(123),sessionStorage.getItem("clickedNav")||sessionStorage.setItem("clickedNav",s()({arr:[]}));for(var a=JSON.parse(sessionStorage.getItem("clickedNav")).arr,n=!0,i=0;i<a.length;i++)e.navtitle==a[i].navtitle&&(n=!1);n&&(a.push(e),setTimeout(function(){t(".page-tabs").offset().left;var e=t(".page-tabs-content").width(),a=t(".content-tabs").width()-240;if(e>a){var n=e-a;t(".page-tabs").offset({left:-n})}},0)),sessionStorage.getItem("selectedNav")||sessionStorage.setItem("selectedNav",s()({}));var r=JSON.parse(sessionStorage.getItem("selectedNav"));r=e,console.log(r),sessionStorage.setItem("selectedNav",s()(r)),sessionStorage.setItem("clickedNav",s()({arr:a}))},min2max:function(){"220"==t(".navbar-static-side").width()?(t(".wrapper").css("padding-left","220px"),t(".navs>li").css("margin","0px 10px"),this.maxDialog()):"40"==t(".navbar-static-side").width()&&(t(".wrapper").css("padding-left","40px"),t(".navs>li").css("margin","0"),this.rebackDialog()),this.ismin=!this.ismin},maxDialog:function(e){t(".navbar-static-side").css("width","40px"),t(".wrapper").css("padding-left","40px"),t(".navs>li").css("margin","0")},rebackDialog:function(){t(".navbar-static-side").css("width","220px"),t(".wrapper").css("padding-left","220px"),t(".navs>li").css("margin","0px 10px")}},mounted:function(){var t=this.leftNavs[0];this.addClickNav(t)}}}).call(e,a("7t+N"))},X4et:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("ZJqN"),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"headerbg"},[a("vheader"),t._v(" "),a("navs_header")],1),t._v(" "),a("div",{staticClass:"contentbg"},[a("navs_left"),t._v(" "),a("div",{staticClass:"wrapper wrapper-content"},[a("div",{staticClass:"ibox-content"},[a("div",{staticClass:"fixed-table-toolbar clearfix"},[a("div",{staticClass:"bs-bars pull-left"},[a("div",{staticClass:"hidden-xs",attrs:{id:"roleTableToolbar",role:"group"}},[a("button",{staticClass:"btn btn-green",attrs:{type:"button",id:""},on:{click:t.openAddMgr}},[a("i",{staticClass:"icon-add"}),t._v("添加\r\n\t              \t\t\t ")]),t._v(" "),a("button",{staticClass:"btn btn-blue button-margin",attrs:{type:"button"},on:{click:t.modify}},[a("i",{staticClass:"icon-edit"}),t._v("修改\r\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-red button-margin",attrs:{type:"button"},on:{click:t.deluserinfo}},[a("i",{staticClass:"icon-trash"}),t._v("删除\r\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.importData}},[a("i",{staticClass:"icon-upload-cloud"}),t._v("导入\r\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.exportData}},[a("i",{staticClass:"icon-download-cloud"}),t._v("导出\r\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.Printing}},[a("i",{staticClass:"icon-print"}),t._v("打印\r\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.modestsearch}},[a("i",{staticClass:"icon-search"}),t._v("高级查询\r\n\t\t\t\t\t    \t\t"),a("i",{directives:[{name:"show",rawName:"v-show",value:t.down,expression:"down"}],staticClass:"icon-arrow1-down"}),t._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:t.up,expression:"up"}],staticClass:"icon-arrow1-up"})])])]),t._v(" "),a("div",{staticClass:"columns columns-right btn-group pull-right"},[t._m(0),t._v(" "),a("tableControle",{ref:"tableControle",attrs:{tableHeader:t.tableHeader,checkedName:t.checkedName},on:{tableControle:t.tableControle}})],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.search,expression:"search"}],staticClass:"pb10"},[a("el-form",{attrs:{model:t.searchList,"label-width":"70px"}},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:5}},[a("el-input",{model:{value:t.searchList.typename,callback:function(e){t.$set(t.searchList,"typename",e)},expression:"searchList.typename"}},[a("template",{slot:"prepend"},[t._v("类型名称")])],2)],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("el-button",{staticStyle:{margin:"4px"},attrs:{type:"primary",size:"small"},on:{click:t.searchinfo}},[t._v("搜索")])],1)],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:0}},[a("el-col",{attrs:{span:24}},[a("el-table",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadMore,expression:"loadMore"}],staticStyle:{width:"100%"},attrs:{data:t.userList,border:"",stripe:"",height:"550","default-sort":{prop:"userList",order:"descending"}},on:{"selection-change":t.SelChange}},[this.checkedName.length>0?a("el-table-column",{attrs:{type:"selection",width:"55"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("组织机构代码")?a("el-table-column",{attrs:{label:"组织机构代码",width:"200",sortable:"",prop:"CODE"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("单位名称")?a("el-table-column",{attrs:{label:"单位名称",width:"200",sortable:"",prop:"NAME"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("联系电话")?a("el-table-column",{attrs:{label:"联系电话",sortable:"",prop:"PHONE"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("联系地址")?a("el-table-column",{attrs:{label:"联系地址",sortable:"",prop:"CONTACT_ADDRESS"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("信息状态")?a("el-table-column",{attrs:{label:"信息状态",sortable:"",prop:"STATUS",formatter:t.judge}}):t._e()],1),t._v(" "),this.checkedName.length>0?a("el-pagination",{staticClass:"pull-right pt10",attrs:{background:"","current-page":t.page.currentPage,"page-sizes":[10,20,30,40],"page-size":t.page.pageSize,layout:"total, sizes, prev, pager, next",total:t.page.totalCount},on:{"size-change":t.sizeChange,"current-change":t.currentChange}}):t._e()],1)],1)],1)])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"btn btn-default btn-refresh",attrs:{id:"refresh",title:"刷新"}},[e("i",{staticClass:"icon-refresh"})])}]};var i=function(t){a("+wnD")},r=a("VU/8")(n.a,s,!1,i,"data-v-a3d843d6",null);e.default=r.exports},ZJqN:function(t,e,a){"use strict";(function(t){var n,s=a("bOdI"),i=a.n(s),r=a("QmSG"),o=a("GkRW"),c=a("ogrI"),l=a("h7vj"),d=a("VEhc");e.a=(n={name:"user_management",components:{vheader:o.a,navs_left:c.a,navs_header:l.a,tableControle:d.a},data:function(){return{basic_url:r.a.dev_url,dataUrl:"/api/api-user/users",searchData:{page:1,limit:10,nickname:"",enabled:"",searchKey:"",searchValue:"",companyId:"",deptId:""},checkedName:["组织机构代码","单位名称","性别","联系电话","联系地址","信息状态"],tableHeader:[{label:"组织机构代码",prop:"username"},{label:"单位名称",prop:"nickname"},{label:"联系电话",prop:"telephone"},{label:"联系地址",prop:"deptName"},{label:"信息状态",prop:"enabled"}],leftNavs:[{navicon:"icon-user",navtitle:"用户管理",navherf:"/personinfo"},{navicon:"icon-edit",navtitle:"机构管理",navherf:"/dept_management"},{navicon:"icon-role-site",navtitle:"角色管理",navherf:"/role_management"},{navicon:"icon-file-text",navtitle:"客户管理",navherf:"/customer_management"},{navicon:"icon-file-text",navtitle:"产品类别",navherf:"/products_category"},{navicon:"icon-file-text",navtitle:"产品",navherf:"/products"},{navicon:"icon-file-text",navtitle:"检验/检测标准",navherf:"/testing_standard"},{navicon:"icon-file-text",navtitle:"检验/检测项目",navherf:"/testing_projects"},{navicon:"icon-file-text",navtitle:"检验/检测方法",navherf:"/testing_methods"},{navicon:"icon-file-text",navtitle:"自动编号设置",navherf:"/number_settings"}],companyId:"",deptId:"",selUser:[],"启用":!0,"冻结":!1,userList:[],search:!1,show:!1,down:!0,up:!1,isShow:!1,ismin:!0,fullHeight:document.documentElement.clientHeight-210+"px",searchList:{nickname:"",enabled:"",createTime:""},resourceData:[],resourceDialogisShow:!1,resourceCheckedKey:[],resourceProps:{children:"subDepts",label:"simplename"},userData:[],page:{currentPage:1,pageSize:10,totalCount:0},aaaData:[]}},mounted:function(){},methods:{tableControle:function(t){this.checkedName=t},sizeChange:function(t){this.page.pageSize=t,this.requestData()},currentChange:function(t){this.page.currentPage=t,this.requestData()},searchinfo:function(t){this.page.currentPage=1,this.page.pageSize=10,this.requestData()},openAddMgr:function(){this.$refs.child.visible()},modify:function(){this.aaaData=this.selUser,0!=this.aaaData.length?this.aaaData.length>1?this.$message({message:"不可同时修改多个用户",type:"warning"}):this.$refs.child.detail():this.$message({message:"请您选择要修改的用户",type:"warning"})},modestsearch:function(){this.search=!this.search,this.down=!this.down,this.up=!this.up},deluserinfo:function(){var t=this,e=this.selUser;if(0!=e.length)if(e.length>1)this.$message({message:"不可同时删除多个用户",type:"warning"});else{var a=e[0].id,n=this.basic_url+"/api-user/users/"+a;this.$axios.delete(n,{}).then(function(e){0==e.data.resp_code&&(t.$message({message:"删除成功",type:"success"}),t.requestData())}).catch(function(e){t.$message({message:"网络错误，请重试",type:"error"})})}else this.$message({message:"请您选择要删除的用户",type:"warning"})},importData:function(){},exportData:function(){},Printing:function(){},judge:function(t){return t.enabled?"启用":"冻结"},dateFormat:function(t,e){var a=t[e.property];return void 0==a?"":this.$moment(a).format("YYYY-MM-DD")},insert:function(){this.users.push(this.user)},remove:function(t){this.users.splice(t,1)},SelChange:function(t){this.selUser=t},requestData:function(t){var e=this,a={page:this.page.currentPage,limit:this.page.pageSize,nickname:this.searchList.nickname,enabled:this.searchList.enabled,searchKey:"createTime",searchValue:this.searchList.createTime,companyId:this.companyId,deptId:this.deptId},n=this.basic_url+"/api-user/users";this.$axios.get(n,{params:a}).then(function(t){e.userList=t.data.data,e.page.totalCount=t.data.count}).catch(function(t){})},loadMore:function(){var t=this;if(this.loadSign){if(this.loadSign=!1,this.page++,this.page>10)return;setTimeout(function(){t.loadSign=!0},1e3),console.log("到底了",this.page)}},handleNodeClick:function(t){},formatter:function(t,e){return t.enabled}}},i()(n,"mounted",function(){var e=this;t(".div-table").scroll(function(){e.loadMore()})}),i()(n,"mounted",function(){this.requestData()}),n)}).call(e,a("7t+N"))},ogrI:function(t,e,a){"use strict";var n=a("T4gK"),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navbar-default navbar-static-side",style:{height:t.fullHeight}},[a("div",{staticClass:"navbarbg",on:{click:function(e){t.min2max()}}},[t._m(0)]),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:!t.isShow,expression:"!isShow"}],staticClass:"navs",attrs:{id:"side-menu"}},t._l(t.leftNavs,function(e){return a("li",{on:{click:function(a){t.addClickNav(e)}}},[a("router-link",{attrs:{to:e.navherf}},[a("i",{class:e.navicon}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.ismin,expression:"ismin"}],staticClass:"nav-label"},[t._v(t._s(e.navtitle))])])],1)}))])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"navbar-minimalize minimalize-styl-2"},[e("i",{staticClass:"icon-menu1"})])}]};var i=function(t){a("B6LP")},r=a("VU/8")(n.a,s,!1,i,"data-v-1fced7c4",null);e.a=r.exports}});
//# sourceMappingURL=34.90e5a379aaecd60e7b51.js.map