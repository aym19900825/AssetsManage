webpackJsonp([45],{"+rUx":function(t,e){},"9OLP":function(t,e){},HXOz:function(t,e,a){"use strict";(function(t){var s=a("QmSG");e.a={name:"masks",data:function(){return{falg:!1,basic_url:s.a.dev_url,dataInfo:{status:"1",code:"",file:"",name:"",type:"",remarks:"",u_type:"",params:[]},edit:!0,noedit:!1,col_but1:!0,col_but2:!0,show:!1,isok1:!0,isok2:!1,down:!0,up:!1,datainfo:{},addtitle:!0,modifytitle:!1,viewtitle:!1,views:!1,noviews:!0,modify:!1,activeName:"first",activeNames:["1","2","3"],labelPositions:"right",rules:{},dataid:"",selectData:[],options:[{value:"1",label:"是"},{value:"0",label:"否"}]}},methods:{rowClass:function(t){t.row,t.rowIndex;return"text-align:center"},dateFormat:function(t,e){var a=t[e.property];return void 0==a?"":this.$moment(a).format("YYYY-MM-DD")},reset:function(){this.dataInfo={status:"1",code:"",file:"",name:"",type:"",remarks:"",u_type:"",params:[]}},handleClick:function(t,e){},iconOperation:function(t,e,a,s){"iconOperation"===e.property&&(t.isEditing=!t.isEditing)},sizeChange:function(t){this.page.pageSize=t,this.requestData()},currentChange:function(t){this.page.currentPage=t,this.requestData()},addcheckProCont:function(){this.dataInfo.params.push({param:"",label:"",defaultVal:"",required:"",type:"",status:"1",isEditing:!0})},deleteRow:function(t,e){e.splice(t,1)},visible:function(){var t=this;this.$axios.get(this.basic_url+"/api-user/users/currentMap",{}).then(function(e){console.log(e),t.dataInfo.DEPTID=e.data.deptId,t.dataInfo.ENTERBY=e.data.id,t.username=e.data.username;var a=new Date;t.dataInfo.ENTERDATE=t.$moment(a).format("YYYY-MM-DD"),t.show=!0}).catch(function(e){t.$message({message:"网络错误，请重试",type:"error"})}),this.addtitle=!0,this.modifytitle=!1,this.viewtitle=!1,this.views=!1,this.noviews=!0,this.edit=!0,this.noedit=!1},detailgetData:function(){var t=this,e=this.basic_url+"/api-report/report/"+this.dataid;this.$axios.get(e,{}).then(function(e){for(var a=0;a<e.data.params.length;a++)e.data.params[a].isEditing=!1;t.dataInfo=e.data,t.show=!0}).catch(function(e){t.$message({message:"网络错误，请重试",type:"error"})})},detail:function(t){var e=this;this.dataid=t;var a=this.basic_url+"/api-user/users/currentMap";this.$axios.get(a,{}).then(function(t){e.dataInfo.DEPTID=t.data.deptId,e.dataInfo.CHANGEBY=t.data.id;var a=new Date;e.dataInfo.CHANGEDATE=e.$moment(a).format("yyyy-MM-dd")}).catch(function(t){e.$message({message:"网络错误，请重试",type:"error"})}),this.detailgetData(),this.modifytitle=!0,this.addtitle=!1,this.viewtitle=!1,this.noviews=!0,this.views=!1,this.edit=!0,this.noedit=!1},view:function(t){this.dataid=t,this.modifytitle=!1,this.addtitle=!1,this.viewtitle=!0,this.views=!0,this.noviews=!1,this.edit=!0,this.noedit=!0,this.isEditing=!1,this.detailgetData()},close:function(){this.show=!1,this.$emit("request")},open:function(){this.show=!0},toggle:function(t){1==this.isok1?this.maxDialog():this.rebackDialog()},maxDialog:function(e){this.isok1=!1,this.isok2=!0,t(".mask_div").width(document.body.clientWidth),t(".mask_div").height(document.body.clientHeight-60),t(".mask_div").css("top","60px")},rebackDialog:function(){this.isok1=!0,this.isok2=!1,t(".mask_div").css("width","80%"),t(".mask_div").css("height","80%"),t(".mask_div").css("top","100px")},save:function(){var t=this;this.$refs.dataInfo.validate(function(e){if(e){console.log(t.dataInfo);var a=t.basic_url+"/api-report/report/saveOrUpdate";t.$axios.post(a,t.dataInfo).then(function(e){console.log(t.dataInfo),console.log(e),0==e.data.resp_code&&(t.$message({message:"保存成功",type:"success"}),t.$emit("request"))}).catch(function(e){t.$message({message:"网络错误，请重试",type:"error"})}),t.falg=!0}else t.show=!0,t.$message({message:"未填写完整，请填写",type:"warning"}),t.falg=!1})},saveAndUpdate:function(){this.save(),this.falg&&(this.show=!1)},saveAndSubmit:function(){this.save(),this.show=!0},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})},requestData:function(){var t=this,e={page:this.page.currentPage,limit:this.page.pageSize},a=this.basic_url+"/api-apps/app/customer/CUSTOMER/"+this.customid;this.$axios.get(a,{params:e}).then(function(e){t.CUSTOMER_PERSONList=e.data.CUSTOMER_PERSONList}),this.dialogVisibleuser=!0},getType:function(){var t=this,e=this.basic_url+"/api-user/dicts/findChildsByCode?code=report_param_type";this.$axios.get(e,{}).then(function(e){console.log(111),console.log(e),t.selectData=e.data}).catch(function(t){console.log("请求失败")})}},mounted:function(){this.getType()}}}).call(e,a("7t+N"))},QATC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("QmSG"),i=a("GkRW"),n=a("hbvp"),o=a("h7vj"),l=a("VEhc"),r=a("HXOz"),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.show?a("div",{staticClass:"mask"}):t._e(),t._v(" "),t.show?a("div",{staticClass:"mask_divbg"},[a("div",{staticClass:"mask_div"},[a("div",{staticClass:"mask_title_div clearfix"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.addtitle,expression:"addtitle"}],staticClass:"mask_title"},[t._v("添加报表配置")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.modifytitle,expression:"modifytitle"}],staticClass:"mask_title"},[t._v("修改报表配置")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.viewtitle,expression:"viewtitle"}],staticClass:"mask_title"},[t._v("查看报表配置")]),t._v(" "),a("div",{staticClass:"mask_anniu"},[a("span",{staticClass:"mask_span mask_max",on:{click:t.toggle}},[a("i",{class:{"icon-maximization":t.isok1,"icon-restore":t.isok2}})]),t._v(" "),a("span",{staticClass:"mask_span",on:{click:t.close}},[a("i",{staticClass:"icon-close1"})])])]),t._v(" "),a("div",{staticClass:"mask_content"},[a("el-form",{ref:"dataInfo",staticClass:"demo-ruleForm",attrs:{model:t.dataInfo,"label-position":t.labelPositions,rules:t.rules,"inline-message":""}},[a("div",{staticClass:"accordion"},[a("el-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[a("el-collapse-item",{attrs:{title:"基本信息",name:"1"}},[a("el-row",{staticClass:"pb10",attrs:{gutter:5}},[a("el-col",{staticClass:"pull-right",attrs:{span:5}},[a("el-input",{attrs:{disabled:t.edit},model:{value:t.dataInfo.status,callback:function(e){t.$set(t.dataInfo,"status",e)},expression:"dataInfo.status"}},[a("template",{slot:"prepend"},[t._v("状态")])],2)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"代码",prop:"code","label-width":"110px"}},[a("el-input",{attrs:{disabled:t.noedit},model:{value:t.dataInfo.code,callback:function(e){t.$set(t.dataInfo,"code",e)},expression:"dataInfo.code"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"文件",prop:"file","label-width":"110px"}},[a("el-input",{attrs:{disabled:t.noedit},model:{value:t.dataInfo.file,callback:function(e){t.$set(t.dataInfo,"file",e)},expression:"dataInfo.file"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"文件名称",prop:"name","label-width":"110px"}},[a("el-input",{attrs:{disabled:t.noedit},model:{value:t.dataInfo.name,callback:function(e){t.$set(t.dataInfo,"name",e)},expression:"dataInfo.name"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"备注",prop:"remarks","label-width":"110px"}},[a("el-input",{attrs:{disabled:t.noedit},model:{value:t.dataInfo.remarks,callback:function(e){t.$set(t.dataInfo,"remarks",e)},expression:"dataInfo.remarks"}})],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"el-collapse-item pt10 pr20 pb20",attrs:{"aria-expanded":"true",accordion:""}},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"子表",name:"first"}},[a("div",{staticClass:"table-func table-funcb"},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.viewtitle,expression:"!viewtitle"}],attrs:{type:"success",size:"mini",round:""},on:{click:t.addcheckProCont}},[a("i",{staticClass:"icon-add"}),t._v(" "),a("font",[t._v("新建行")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataInfo.params,"row-key":"ID",border:"",stripe:"",fit:!0,"highlight-current-row":"highlight-current-row","default-sort":{prop:"dataInfo.params",order:"descending"}},on:{"cell-click":t.iconOperation}},[t.viewtitle?t._e():a("el-table-column",{attrs:{prop:"iconOperation",fixed:"",label:"",width:"50px"},scopedSlots:t._u([{key:"default",fn:function(t){return[t.row.isEditing?a("i",{staticClass:"el-icon-check"}):a("i",{staticClass:"el-icon-edit"})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"param",label:"参数",sortable:"",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form-item",{attrs:{prop:"params."+e.$index+".param"}},[e.row.isEditing?a("el-input",{attrs:{size:"small",disabled:t.noedit},model:{value:e.row.param,callback:function(a){t.$set(e.row,"param",a)},expression:"scope.row.param"}}):a("span",[t._v(t._s(e.row.param))])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"label",label:"参数名称",sortable:"",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form-item",{attrs:{prop:"params."+e.$index+".label",rules:[{required:!0,message:"请输入",trigger:"blur"}]}},[e.row.isEditing?a("el-input",{attrs:{size:"small",placeholder:"请输入参数名称"},model:{value:e.row.label,callback:function(a){t.$set(e.row,"label",a)},expression:"scope.row.label"}}):a("span",[t._v(t._s(e.row.label))])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"required",label:"必填",sortable:"",width:"180px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form-item",{attrs:{prop:"params."+e.$index+".required",rules:[{required:!0,message:"请输入",trigger:"blur"}]}},[e.row.isEditing?a("el-select",{attrs:{filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择"},model:{value:e.row.required,callback:function(a){t.$set(e.row,"required",a)},expression:"scope.row.required"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{value:t.value,label:t.label}})})):a("span",[t._v(t._s(e.row.requiredDesc))])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"type",label:"类型",sortable:"",width:"220px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form-item",{attrs:{prop:"params."+e.$index+".type",rules:[{required:!0,message:"请输入",trigger:"blur"}]}},[e.row.isEditing?a("el-select",{attrs:{filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择"},model:{value:e.row.type,callback:function(a){t.$set(e.row,"type",a)},expression:"scope.row.type"}},t._l(t.selectData,function(t,e){return a("el-option",{key:e,attrs:{value:t.code,label:t.name}})})):a("span",[t._v(t._s(e.row.typeDesc))])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.viewtitle?t._e():a("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(a){a.preventDefault(),t.deleteRow(e.$index,t.dataInfo.params)}}},[a("i",{staticClass:"icon-trash red"})])]}}])})],1)],1)],1)],1),t._v(" "),a("el-collapse-item",{directives:[{name:"show",rawName:"v-show",value:t.views,expression:"views"}],attrs:{title:"其他",name:"3"}},[a("div",{staticClass:"accordion-body tab-content"},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"录入人",prop:"ENTERBYDesc","label-width":"110px"}},[a("el-input",{attrs:{disabled:t.edit},model:{value:t.dataInfo.ENTERBYDesc,callback:function(e){t.$set(t.dataInfo,"ENTERBYDesc",e)},expression:"dataInfo.ENTERBYDesc"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"录入时间",prop:"ENTERDATE","label-width":"110px"}},[a("el-input",{attrs:{disabled:t.edit},model:{value:t.dataInfo.ENTERDATE,callback:function(e){t.$set(t.dataInfo,"ENTERDATE",e)},expression:"dataInfo.ENTERDATE"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"机构",prop:"DEPTIDDesc","label-width":"110px"}},[a("el-input",{attrs:{disabled:t.edit},model:{value:t.dataInfo.DEPTIDDesc,callback:function(e){t.$set(t.dataInfo,"DEPTIDDesc",e)},expression:"dataInfo.DEPTIDDesc"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"修改人",prop:"CHANGEBYDesc","label-width":"110px"}},[a("el-input",{attrs:{disabled:t.edit},model:{value:t.dataInfo.CHANGEBYDesc,callback:function(e){t.$set(t.dataInfo,"CHANGEBYDesc",e)},expression:"dataInfo.CHANGEBYDesc"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"修改时间",prop:"CHANGEDATE","label-width":"110px"}},[a("el-input",{attrs:{disabled:t.edit},model:{value:t.dataInfo.CHANGEDATE,callback:function(e){t.$set(t.dataInfo,"CHANGEDATE",e)},expression:"dataInfo.CHANGEDATE"}})],1)],1)],1)],1)])],1)],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.noviews,expression:"noviews"}],staticClass:"el-dialog__footer"},[a("el-button",{attrs:{type:"primary"},on:{click:t.saveAndUpdate}},[t._v("保存")]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.addtitle,expression:"addtitle"}],attrs:{type:"success"},on:{click:t.saveAndSubmit}},[t._v("保存并继续")]),t._v(" "),a("el-button",{on:{click:t.close}},[t._v("取消")])],1)])],1)])]):t._e()])},staticRenderFns:[]};var d=function(t){a("+rUx")},p=a("VU/8")(r.a,c,!1,d,null,null).exports,u={name:"report",components:{vheader:i.a,navs_left:n.a,navs_header:o.a,tableControle:l.a,reportmask:p},data:function(){return{loading:!1,basic_url:s.a.dev_url,checkedName:["代码","报表名称","id","报表文件","备注","类型","录入人","录入时间","修改人","修改日期"],tableHeader:[{label:"代码",prop:"username"},{label:"报表名称",prop:"nickname"},{label:"id",prop:"id"},{label:"报表文件",prop:"deptName"},{label:"备注",prop:"remarks"},{label:"类型",prop:"type"},{label:"录入人",prop:"createby"},{label:"录入时间",prop:"createdate"},{label:"修改人",prop:"updateby"},{label:"修改日期",prop:"updatedate"}],selUser:[],reportsList:[],search:!1,show:!1,down:!0,up:!1,isShow:!1,ismin:!0,fullHeight:document.documentElement.clientHeight-210+"px",searchList:{nickname:"",enabled:"",createTime:""},page:{currentPage:1,pageSize:20,totalCount:0}}},methods:{tableControle:function(t){this.checkedName=t},sizeChange:function(t){this.page.pageSize=t,this.requestData()},currentChange:function(t){this.page.currentPage=t,this.requestData()},resetbtn:function(){this.searchList={typename:""},this.requestData()},searchinfo:function(){this.page.currentPage=1,this.page.pageSize=20,this.requestData()},openAddMgr:function(){this.$refs.child.visible()},modify:function(){0!=this.selUser.length?this.selUser.length>1?this.$message({message:"不可同时修改多个用户",type:"warning"}):this.$refs.child.detail(this.selUser[0].id):this.$message({message:"请您选择要修改的用户",type:"warning"})},modestsearch:function(){this.search=!this.search,this.down=!this.down,this.up=!this.up},deluserinfo:function(){var t=this,e=this.selUser;if(0!=e.length)if(e.length>1)this.$message({message:"不可同时删除多个用户",type:"warning"});else{var a=e[0].id,s=this.basic_url+"/api-report/report/"+a;this.$confirm("确定删除此数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){e.value;t.$axios.delete(s,{}).then(function(e){0==e.data.resp_code&&(t.$message({message:"删除成功",type:"success"}),t.requestData())}).catch(function(e){t.$message({message:"网络错误，请重试",type:"error"})})}).catch(function(){})}else this.$message({message:"请您选择要删除的用户",type:"warning"})},importData:function(){},exportData:function(){},Printing:function(){},dateFormat:function(t,e){var a=t[e.property];return void 0==a?"":this.$moment(a).format("YYYY-MM-DD")},insert:function(){this.users.push(this.user)},remove:function(t){this.users.splice(t,1)},SelChange:function(t){this.selUser=t},requestData:function(){var t=this;this.loading=!0;var e={page:this.page.currentPage,limit:this.page.pageSize},a=this.basic_url+"/api-report/report";this.$axios.get(a,{params:e}).then(function(e){t.page.totalCount=e.data.count;var a=Math.ceil(t.page.totalCount/t.page.pageSize);t.page.currentPage>=a?t.loadSign=!1:t.loadSign=!0,t.reportsList=e.data.data,t.loading=!1}).catch(function(e){t.$message({message:"网络错误，请重试",type:"error"})})},loadMore:function(){var t=this,e=sessionStorage.getItem("up2down");if(this.loadSign){if("down"==e){if(this.page.currentPage++,this.page.currentPage>Math.ceil(this.page.totalCount/this.page.pageSize))return this.page.currentPage=Math.ceil(this.page.totalCount/this.page.pageSize),!1}else if(this.page.currentPage--,this.page.currentPage<1)return this.page.currentPage=1,!1;this.loadSign=!1,setTimeout(function(){t.loadSign=!0},1e3),this.requestData()}},handleNodeClick:function(t){},formatter:function(t,e){return t.enabled},childByValue:function(t){console.log(t),this.$refs.navsheader.showClick(t)}},mounted:function(){this.requestData()}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"headerbg"},[a("vheader"),t._v(" "),a("navs_header",{ref:"navsheader"})],1),t._v(" "),a("div",{staticClass:"contentbg"},[a("navs_left",{ref:"navleft",on:{childByValue:t.childByValue}}),t._v(" "),a("div",{staticClass:"wrapper wrapper-content"},[a("div",{staticClass:"ibox-content"},[a("div",{staticClass:"fixed-table-toolbar clearfix"},[a("div",{staticClass:"bs-bars pull-left"},[a("div",{staticClass:"hidden-xs",attrs:{id:"roleTableToolbar",role:"group"}},[a("button",{staticClass:"btn btn-green",attrs:{type:"button"},on:{click:t.openAddMgr}},[a("i",{staticClass:"icon-add"}),t._v("添加\r\n\t              \t\t\t ")]),t._v(" "),a("button",{staticClass:"btn btn-blue button-margin",attrs:{type:"button"},on:{click:t.modify}},[a("i",{staticClass:"icon-edit"}),t._v("修改\r\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-red button-margin",attrs:{type:"button"},on:{click:t.deluserinfo}},[a("i",{staticClass:"icon-trash"}),t._v("删除\r\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.importData}},[a("i",{staticClass:"icon-upload-cloud"}),t._v("导入\r\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.exportData}},[a("i",{staticClass:"icon-download-cloud"}),t._v("导出\r\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.Printing}},[a("i",{staticClass:"icon-print"}),t._v("打印\r\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.modestsearch}},[a("i",{staticClass:"icon-search"}),t._v("高级查询\r\n\t\t\t\t\t    \t\t"),a("i",{directives:[{name:"show",rawName:"v-show",value:t.down,expression:"down"}],staticClass:"icon-arrow1-down"}),t._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:t.up,expression:"up"}],staticClass:"icon-arrow1-up"})])])]),t._v(" "),a("div",{staticClass:"columns columns-right btn-group pull-right"},[t._m(0),t._v(" "),a("tableControle",{ref:"tableControle",attrs:{tableHeader:t.tableHeader,checkedName:t.checkedName},on:{tableControle:t.tableControle}})],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.search,expression:"search"}],staticClass:"pb10"},[a("el-form",{attrs:{model:t.searchList,"label-width":"70px"}},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:5}},[a("el-input",{model:{value:t.searchList.typename,callback:function(e){t.$set(t.searchList,"typename",e)},expression:"searchList.typename"}},[a("template",{slot:"prepend"},[t._v("类型名称")])],2)],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-button",{staticStyle:{margin:"4px"},attrs:{type:"primary",size:"small"},on:{click:t.searchinfo}},[t._v("搜索")]),t._v(" "),a("el-button",{staticStyle:{"margin-top":"2px","margin-left":"2px"},attrs:{type:"primary",size:"small"},on:{click:t.resetbtn}},[t._v("重置")])],1)],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:0}},[a("el-col",{attrs:{span:24}},[a("el-table",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.loadMore,expression:"loadMore"},{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.reportsList,border:"",stripe:"",height:t.fullHeight,"default-sort":{prop:"reportsList",order:"descending"},"element-loading-text":"加载中…","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.9)"},on:{"selection-change":t.SelChange}},[this.checkedName.length>0?a("el-table-column",{attrs:{type:"selection",width:"55"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("代码")?a("el-table-column",{attrs:{label:"代码",width:"200",sortable:"",prop:"code"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("报表名称")?a("el-table-column",{attrs:{label:"报表名称",width:"200",sortable:"",prop:"name"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("id")?a("el-table-column",{attrs:{label:"id",sortable:"",prop:"id"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("报表文件")?a("el-table-column",{attrs:{label:"报表文件",sortable:"",prop:"file"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("备注")?a("el-table-column",{attrs:{label:"备注",sortable:"",prop:"remarks"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("类型")?a("el-table-column",{attrs:{label:"类型",sortable:"",prop:"type"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("录入人")?a("el-table-column",{attrs:{label:"录入人",sortable:"",prop:"createby"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("录入时间")?a("el-table-column",{attrs:{label:"录入时间",sortable:"",prop:"createdate"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("修改人")?a("el-table-column",{attrs:{label:"修改人",sortable:"",prop:"updateby"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("修改日期")?a("el-table-column",{attrs:{label:"修改日期",sortable:"",prop:"updatedate"}}):t._e(),t._v(" "),this.checkedName.length>0?a("el-pagination",{staticClass:"text-right pt10",attrs:{background:"","current-page":t.page.currentPage,"page-sizes":[10,20,30,40],"page-size":t.page.pageSize,layout:"total, sizes, prev, pager, next",total:t.page.totalCount},on:{"size-change":t.sizeChange,"current-change":t.currentChange}}):t._e()],1)],1)],1)],1)]),t._v(" "),a("reportmask",{ref:"child",on:{request:t.requestData}})],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"btn btn-default btn-refresh",attrs:{id:"refresh",title:"刷新"}},[e("i",{staticClass:"icon-refresh"})])}]};var m=a("VU/8")(u,h,!1,function(t){a("9OLP")},"data-v-98e00070",null);e.default=m.exports}});
//# sourceMappingURL=45.653946b3d4919d4974fc.js.map