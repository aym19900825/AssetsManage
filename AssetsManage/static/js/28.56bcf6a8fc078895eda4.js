webpackJsonp([28],{"0L2o":function(t,e,a){"use strict";var s=a("K5d4"),i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.show?a("div",{staticClass:"mask"}):t._e(),t._v(" "),t.show?a("div",{staticClass:"mask_divbg"},[a("div",{staticClass:"mask_div"},[a("div",{staticClass:"mask_title_div clearfix"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.modify,expression:"!modify"}],staticClass:"mask_title"},[t._v("添加关键字类别/关键字")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.modify,expression:"modify"}],staticClass:"mask_title"},[t._v("修改关键字类别/关键字")]),t._v(" "),a("div",{staticClass:"mask_anniu"},[a("span",{staticClass:"mask_span mask_max",on:{click:t.toggle}},[a("i",{class:{"icon-maximization":t.isok1,"icon-restore":t.isok2}})]),t._v(" "),a("span",{staticClass:"mask_span",on:{click:t.close}},[a("i",{staticClass:"icon-close1"})])])]),t._v(" "),a("div",{staticClass:"mask_content"},[a("el-form",{ref:"dataInfo",attrs:{model:t.dataInfo,"label-width":"100px"}},[a("div",{staticClass:"accordion"},[a("div",{staticClass:"accordion",attrs:{id:"information"}},[a("el-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[a("el-collapse-item",{attrs:{title:"基本信息",name:"1"}},[a("el-row",{staticClass:"pt10",attrs:{gutter:5}},[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"类别名称",prop:"dataInfo.categoryname"}},[a("el-input",{model:{value:t.dataInfo.categoryname,callback:function(e){t.$set(t.dataInfo,"categoryname",e)},expression:"dataInfo.categoryname"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.chooseCat},slot:"append"})],1)],1)],1)],1)],1),t._v(" "),a("el-collapse-item",{staticClass:"ml30",attrs:{title:"关键字列表",name:"2"}},[a("div",{staticClass:"table-func"},[a("el-button",{attrs:{type:"success",size:"mini",round:""},on:{click:t.addKWord}},[a("i",{staticClass:"icon-add"}),t._v(" "),a("font",[t._v("新建行")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataInfo.tb_keyword2List,border:"",stripe:"",fit:!0,"highlight-current-row":"highlight-current-row"}},[a("el-table-column",{attrs:{prop:"iconOperation",fixed:"",width:"50px"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isEditing?a("i",{staticClass:"el-icon-check",on:{click:function(a){t.changeState(e.row)}}}):t._e(),t._v(" "),e.row.isEditing?t._e():a("i",{staticClass:"el-icon-edit",on:{click:function(a){t.changeState(e.row)}}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"名称",sortable:"",prop:"keywordname"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isEditing?a("el-input",{attrs:{size:"small"},model:{value:e.row.keywordname,callback:function(a){t.$set(e.row,"keywordname",a)},expression:"scope.row.keywordname"}}):t._e(),t._v(" "),e.row.isEditing?t._e():a("span",[t._v(t._s(e.row.keywordname))])]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.delKey(e.$index,e.row)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t移除\n\t\t\t\t\t\t\t\t\t\t\t\t")])]}}])})],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"el-dialog__footer"},[a("el-button",{on:{click:t.close}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("保存")])],1)])])],1)])]):t._e(),t._v(" "),a("vchoose",{ref:"choose",attrs:{chooseParam:t.chooseParam},on:{tranFormData:t.getChoose}})],1)},staticRenderFns:[]};var o=function(t){a("8Z7+")},n=a("VU/8")(s.a,i,!1,o,"data-v-152fd454",null);e.a=n.exports},"1TC4":function(t,e){},"8Z7+":function(t,e){},K5d4:function(t,e,a){"use strict";(function(t){var s=a("QmSG"),i=a("KDSJ");e.a={name:"masks",props:["detailData"],components:{vchoose:i.a},data:function(){return{rules:{},basic_url:s.a.dev_url,show:!1,isok1:!0,isok2:!1,down:!0,up:!1,activeNames:["1","2","3","4"],dialogVisible:!1,modify:!1,resourceData:[],resourceDialogisShow:!1,resourceCheckedKey:[],resourceProps:{children:"subDepts",label:"simplename"},selectData:[],getCheckboxData:{},dataInfo:{id:"",categoryname:"",userid:0,username:"",createtime:"",deptid:0,deptfullname:"",tb_keyword2List:[]},chooseParam:{}}},methods:{chooseCat:function(){this.chooseParam={title:"关键字类别列表",listName:"keywordCat",selMax:1,tableHeader:[{propName:"categoryname",labelName:"关键字类别"},{propName:"createtime",labelName:"创建时间"}],search:[],url:"/api-apps/app/tbCategory2"},this.$refs.choose.getData("new",this.chooseParam)},getChoose:function(t){var e=t.data;this.dataInfo.id=e[0].id,this.dataInfo.categoryname=e[0].categoryname,this.getData(this.dataInfo.id)},delKey:function(t,e){var a=this;if(""!=e.id){var s=this.basic_url+"/api-apps/app/tbCategory2/tb_keyword2/"+e.id;this.$axios.delete(s,{}).then(function(e){0==e.data.resp_code?a.dataInfo.tb_keyword2List.splice(t,1):a.$message({message:e.data.resp_msg,type:"error"})}).catch(function(t){a.$message({message:"网络错误，请重试",type:"error"})})}else this.dataInfo.tb_keyword2List.splice(t,1)},changeState:function(t){t.isEditing=!t.isEditing},addKWord:function(){this.dataInfo.tb_keyword2List.push({keywordname:"",createtime:this.dataInfo.createtime,deptid:this.dataInfo.deptid,deptfullname:this.dataInfo.deptfullname,id:"",userid:this.dataInfo.userid,username:this.dataInfo.username,isEditing:!0,categoryid:this.dataInfo.id})},getUser:function(t){var e=this,a=this.basic_url+"/api-user/users/currentMap";this.$axios.get(a,{}).then(function(a){"new"==t?(e.dataInfo.userid=a.data.id,e.dataInfo.username=a.data.username,e.dataInfo.createtime=e.getToday(),e.dataInfo.deptid=a.data.deptId,e.dataInfo.deptfullname=a.data.deptName):(e.dataInfo.userid=a.data.id,e.dataInfo.username=a.data.username,e.dataInfo.deptid=a.data.deptId,e.dataInfo.deptfullname=a.data.deptName)}).catch(function(t){e.$message({message:"网络错误，请重试",type:"error"})})},getToday:function(){var t=new Date,e=t.getMonth();return e++,t.getFullYear()+"-"+e+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()},visible:function(){this.modify=!1,this.show=!0,this.getUser("new")},detail:function(){this.dataInfo=this.detailData;var t=this.detailData.categoryid;this.getData(t),this.modify=!0,this.show=!0,this.getUser()},getData:function(t){var e=this,a=this.basic_url+"/api-apps/app/tbCategory2/"+t;this.$axios.get(a,{}).then(function(t){e.dataInfo=t.data}).catch(function(t){})},close:function(){this.resetForm(),this.$emit("request")},resetForm:function(){this.dataInfo={id:"",categoryname:"",userid:"",username:"",createtime:"",deptid:"",deptfullname:"",tb_keyword2List:[]},this.show=!1},toggle:function(t){this.isok1?this.maxDialog():this.rebackDialog()},maxDialog:function(e){this.isok1=!1,this.isok2=!0,t(".mask_div").width(document.body.clientWidth),t(".mask_div").height(document.body.clientHeight-60),t(".mask_div").css("top","60px")},rebackDialog:function(){this.isok1=!0,this.isok2=!1,t(".mask_div").css("width","80%"),t(".mask_div").css("height","80%"),t(".mask_div").css("top","100px")},submitForm:function(){var t=this,e=this,a=this.basic_url+"/api-apps/app/tbCategory2/saveOrUpdate";this.$refs.dataInfo.validate(function(s){if(!s)return console.log("error submit!!"),!1;t.modify||(t.dataInfo.createtime=t.getToday()),t.$axios.post(a,e.dataInfo).then(function(e){0==e.data.resp_code?(t.$message({message:"保存成功",type:"success"}),t.resetForm(),t.$emit("request")):t.$message({message:e.data.resp_msg,type:"error"})}).catch(function(e){t.$message({message:"网络错误，请重试",type:"error"})})})}}}}).call(e,a("7t+N"))},YhN6:function(t,e,a){"use strict";(function(t){var s=a("QmSG"),i=a("GkRW"),o=a("hbvp"),n=a("h7vj"),r=a("VEhc"),l=a("0L2o"),c=a("jk2w");e.a={name:"samples",components:{vheader:i.a,navs_header:n.a,navs_left:o.a,tableControle:r.a,catmask:l.a,reportmask:c.a},data:function(){return{reportData:{},loading:!1,basic_url:s.a.dev_url,ismin:!0,checkedName:["关键字","类别","用户名称","用户部门","创建时间"],tableHeader:[{label:"关键字",prop:"keywordname"},{label:"类别",prop:"categoryidDesc"},{label:"用户名称",prop:"username"},{label:"用户部门",prop:"deptfullname"},{label:"创建时间",prop:"createtime"}],samplesList:[],fullHeight:document.documentElement.clientHeight-210+"px",search:!1,show:!1,down:!0,up:!1,searchList:{categoryidDesc:"",keywordname:""},page:{currentPage:1,pageSize:10,totalCount:0},samplesForm:{},selMenu:[]}},methods:{tableControle:function(t){this.checkedName=t},sizeChange:function(t){this.page.pageSize=t,this.requestData()},currentChange:function(t){this.page.currentPage=t,this.requestData()},resetbtn:function(){this.searchList={keywordname:"",categoryidDesc:""},this.requestData()},reportdata:function(){this.reportData.app=this.productType,this.$refs.reportChild.visible()},searchinfo:function(t){this.page.currentPage=1,this.page.pageSize=10,this.requestData()},openAddMgr:function(){this.$refs.child.visible()},modify:function(){0!=this.selMenu.length?this.selMenu.length>1?this.$message({message:"不可同时修改多条数据",type:"warning"}):this.$refs.child.detail():this.$message({message:"请您选择要修改的数据",type:"warning"})},modestsearch:function(){this.search=!this.search,this.down=!this.down,this.up=!this.up},getKeyWords:function(t){var e={page:this.page.currentPage,limit:this.page.pageSize,categoryid:t},a=this.basic_url+"/api-apps/app/tbKeyword2";this.$axios.get(a,{params:e}).then(function(t){return t.data.count}).catch(function(t){})},del:function(){var t=this,e=this.selMenu;if(0!=e.length)if(e.length>1)this.$message({message:"不可同时删除多条数据",type:"error"});else if(this.getKeyWords(e[0].id)>0)this.$message({message:"请先删除此类别下的关键字后再删除此数据",type:"error"});else{for(var a=this.basic_url+"/api-apps/app/tbKeyword2/deletes",s=e,i=[],o=0;o<s.length;o++)i.push(s[o].id);var n={ids:i.toString(",")};this.$confirm("确定删除数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){e.value;t.$axios.delete(a,{params:n}).then(function(e){0==e.data.resp_code&&(t.$message({message:"删除成功",type:"success"}),t.requestData())}).catch(function(e){t.$message({message:"网络错误，请重试",type:"error"})})}).catch(function(){})}else this.$message({message:"请您选择要删除的数据",type:"warning"})},physicsDel:function(){var t=this,e=this.selMenu;if(0!=e.length)if(e.length>1)this.$message({message:"不可同时删除多条数据",type:"error"});else if(this.getKeyWords(e[0].id)>0)this.$message({message:"请先删除此类别下的关键字后再删除此数据",type:"error"});else{for(var a=this.basic_url+"/api-apps/app/tbKeyword2/deletes/physicsDel",s=e,i=[],o=0;o<s.length;o++)i.push(s[o].id);var n={ids:i.toString(",")};this.$confirm("确定删除数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){e.value;t.$axios.delete(a,{params:n}).then(function(e){0==e.data.resp_code&&(t.$message({message:"删除成功",type:"success"}),t.requestData())}).catch(function(e){t.$message({message:"网络错误，请重试",type:"error"})})}).catch(function(){})}else this.$message({message:"请您选择要删除的数据",type:"warning"})},exportData:function(){var t=this.basic_url+"/api-apps/app/tbKeyword2/exportExc?access_token="+sessionStorage.getItem("access_token"),e=new XMLHttpRequest;e.open("POST",t,!0),e.responseType="blob",e.setRequestHeader("client_type","DESKTOP_WEB"),e.onload=function(){if(200==this.status){var t=this.response,e=document.createElement("a"),a=URL.createObjectURL(t);e.href=a,e.download="tbKeyword2.xls",e.click()}},e.send()},selChange:function(t){this.selMenu=t},requestData:function(t){var e=this;this.loading=!0;var a={page:this.page.currentPage,limit:this.page.pageSize,categoryidDesc:this.searchList.categoryidDesc,keywordname:this.searchList.keywordname},s=this.basic_url+"/api-apps/app/tbKeyword2";this.$axios.get(s,{params:a}).then(function(t){e.page.totalCount=t.data.count,e.samplesList=t.data.data,e.loading=!1}).catch(function(t){})},min3max:function(){t(".lefttree").hasClass("el-col-5")?(t(".lefttree").removeClass("el-col-5"),t(".lefttree").addClass("el-col-1"),t(".leftcont").removeClass("el-col-19"),t(".leftcont").addClass("el-col-23"),t(".icon-doubleok").removeClass("icon-double-angle-left"),t(".icon-doubleok").addClass("icon-double-angle-right")):(t(".lefttree").removeClass("el-col-1"),t(".lefttree").addClass("el-col-5"),t(".leftcont").removeClass("el-col-23"),t(".leftcont").addClass("el-col-19"),t(".icon-doubleok").removeClass("icon-double-angle-right"),t(".icon-doubleok").addClass("icon-double-angle-left")),this.ismin=!this.ismin},childByValue:function(t){this.$refs.navsheader.showClick(t)}},mounted:function(){this.requestData()}}}).call(e,a("7t+N"))},"wT+0":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("YhN6"),i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"headerbg"},[a("vheader"),t._v(" "),a("navs_header",{ref:"navsheader"})],1),t._v(" "),a("div",{staticClass:"contentbg"},[a("navs_left",{ref:"navleft",on:{childByValue:t.childByValue}}),t._v(" "),a("div",{staticClass:"wrapper wrapper-content"},[a("div",{staticClass:"ibox-content"},[a("div",{staticClass:"fixed-table-toolbar clearfix"},[a("div",{staticClass:"bs-bars pull-left"},[a("div",{staticClass:"hidden-xs",attrs:{id:"roleTableToolbar",role:"group"}},[a("button",{staticClass:"btn btn-green",attrs:{type:"button",id:""},on:{click:t.openAddMgr}},[a("i",{staticClass:"icon-add"}),t._v("添加\n                      \t\t\t ")]),t._v(" "),a("button",{staticClass:"btn btn-blue button-margin",attrs:{type:"button"},on:{click:t.modify}},[a("i",{staticClass:"icon-edit"}),t._v("修改\n\t\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-red button-margin",attrs:{type:"button"},on:{click:t.del}},[a("i",{staticClass:"icon-trash"}),t._v("删除\n\t\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-red button-margin",attrs:{type:"button"},on:{click:t.physicsDel}},[a("i",{staticClass:"icon-trash"}),t._v("物理删除\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.exportData}},[a("i",{staticClass:"icon-download-cloud"}),t._v("导出\n\t\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.reportdata}},[a("i",{staticClass:"icon-clipboard"}),t._v("报表\n\t\t\t\t\t\t\t")]),t._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button"},on:{click:t.modestsearch}},[a("i",{staticClass:"icon-search"}),t._v("高级查询\n\t\t\t\t\t\t    \t\t"),a("i",{directives:[{name:"show",rawName:"v-show",value:t.down,expression:"down"}],staticClass:"icon-arrow1-down"}),t._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:t.up,expression:"up"}],staticClass:"icon-arrow1-up"})])])]),t._v(" "),a("div",{staticClass:"columns columns-right btn-group pull-right"},[t._m(0),t._v(" "),a("tableControle",{ref:"tableControle",attrs:{tableHeader:t.tableHeader,checkedName:t.checkedName},on:{tableControle:t.tableControle}})],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.search,expression:"search"}],staticClass:"pb10"},[a("el-form",{attrs:{model:t.searchList,"label-width":"70px"}},[a("el-row",{staticClass:"pb5",attrs:{gutter:30}},[a("el-col",{attrs:{span:7}},[a("el-input",{model:{value:t.searchList.categoryidDesc,callback:function(e){t.$set(t.searchList,"categoryidDesc",e)},expression:"searchList.categoryidDesc"}},[a("template",{slot:"prepend"},[t._v("类别")])],2)],1),t._v(" "),a("el-col",{attrs:{span:7}},[a("el-input",{model:{value:t.searchList.keywordname,callback:function(e){t.$set(t.searchList,"keywordname",e)},expression:"searchList.keywordname"}},[a("template",{slot:"prepend"},[t._v("关键字")])],2)],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-button",{staticStyle:{margin:"4px"},attrs:{type:"primary",size:"small"},on:{click:t.searchinfo}},[t._v("搜索")]),t._v(" "),a("el-button",{staticStyle:{"margin-top":"2px","margin-left":"2px"},attrs:{type:"primary",size:"small"},on:{click:t.resetbtn}},[t._v("重置")])],1)],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:0}},[a("el-col",{staticClass:"leftcont v-resize"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.samplesList,border:"",height:t.fullHeight,"default-sort":{prop:"samplesList",order:"descending"},"element-loading-text":"加载中…","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.9)"},on:{"selection-change":t.selChange}},[this.checkedName.length>0?a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("类别")?a("el-table-column",{attrs:{label:"类别",sortable:"",prop:"categoryidDesc"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("关键字")?a("el-table-column",{attrs:{label:"关键字",sortable:"",prop:"keywordname"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("用户名称")?a("el-table-column",{attrs:{label:"用户名称",sortable:"",prop:"username"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("用户部门")?a("el-table-column",{attrs:{label:"用户部门",sortable:"",prop:"deptfullname"}}):t._e(),t._v(" "),-1!=this.checkedName.indexOf("创建时间")?a("el-table-column",{attrs:{label:"创建时间",sortable:"",prop:"createtime"}}):t._e()],1),t._v(" "),this.checkedName.length>0?a("el-pagination",{staticClass:"pull-right pt10",attrs:{background:"","current-page":t.page.currentPage,"page-sizes":[10,20,30,40],"page-size":t.page.pageSize,layout:"total, sizes, prev, pager, next",total:t.page.totalCount},on:{"size-change":t.sizeChange,"current-change":t.currentChange}}):t._e()],1)],1)],1)])],1),t._v(" "),a("catmask",{ref:"child",attrs:{detailData:t.selMenu[0]},on:{request:t.requestData}}),t._v(" "),a("reportmask",{ref:"reportChild",attrs:{reportData:t.reportData}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"btn btn-default btn-refresh",attrs:{id:"refresh",title:"刷新"}},[e("i",{staticClass:"icon-refresh"})])}]};var o=function(t){a("1TC4")},n=a("VU/8")(s.a,i,!1,o,null,null);e.default=n.exports}});
//# sourceMappingURL=28.56bcf6a8fc078895eda4.js.map