webpackJsonp([13],{"1OHf":function(e,t){},"1l00":function(e,t){},NbQq:function(e,t,a){"use strict";var s=a("xXcQ"),i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.show?a("div",{staticClass:"mask"}):e._e(),e._v(" "),e.show?a("div",{staticClass:"mask_divbg"},[a("div",{staticClass:"mask_div"},[a("div",{staticClass:"mask_title_div clearfix"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.addtitle,expression:"addtitle"}],staticClass:"mask_title"},[e._v("添加机构")]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.modifytitle,expression:"modifytitle"}],staticClass:"mask_title"},[e._v("修改机构")]),e._v(" "),a("div",{staticClass:"mask_anniu"},[a("span",{staticClass:"mask_span mask_max",on:{click:e.toggle}},[a("i",{class:{"icon-maximization":e.isok1,"icon-restore":e.isok2}})]),e._v(" "),a("span",{staticClass:"mask_span",on:{click:e.close}},[a("i",{staticClass:"icon-close1"})])])]),e._v(" "),a("div",{staticClass:"mask_content"},[a("el-form",{ref:"adddeptForm",attrs:{model:e.adddeptForm,rules:e.rules,"label-width":"100px",id:"demo-adduserForm"}},[a("div",{staticClass:"accordion"},[a("el-collapse",{model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[a("el-collapse-item",{attrs:{title:"机构信息",name:"1"}},[a("el-row",{attrs:{gutter:30}},[a("el-col",{staticClass:"pull-right pb10",attrs:{span:4}},[a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.version,callback:function(t){e.$set(e.adddeptForm,"version",t)},expression:"adddeptForm.version"}},[a("template",{slot:"prepend"},[e._v("版本")])],2)],1),e._v(" "),e.modify?a("el-col",{staticClass:"pull-right",staticStyle:{display:"none"},attrs:{span:4}},[a("el-input",{attrs:{disabled:e.edit},model:{value:1==e.adddeptForm.status?"活动":"不活动",callback:function(t){e.$set(e.adddeptForm,"status==1?'活动':'不活动'",t)},expression:"adddeptForm.status==1?'活动':'不活动'"}},[a("template",{slot:"prepend"},[e._v("信息状态")])],2)],1):a("el-col",{staticClass:"pull-right",staticStyle:{display:"none"},attrs:{span:4}},[a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.status,callback:function(t){e.$set(e.adddeptForm,"status",t)},expression:"adddeptForm.status"}},[a("template",{slot:"prepend"},[e._v("信息状态")])],2)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:30}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"机构序号",prop:"step"}},[a("el-input",{model:{value:e.adddeptForm.step,callback:function(t){e.$set(e.adddeptForm,"step",t)},expression:"adddeptForm.step"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"机构编码",prop:"code"}},[a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.code,callback:function(t){e.$set(e.adddeptForm,"code",t)},expression:"adddeptForm.code"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"机构名称",prop:"fullname"}},[a("el-input",{model:{value:e.adddeptForm.fullname,callback:function(t){e.$set(e.adddeptForm,"fullname",t)},expression:"adddeptForm.fullname"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:30}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"上级机构",prop:"parent"}},[a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.parent,callback:function(t){e.$set(e.adddeptForm,"parent",t)},expression:"adddeptForm.parent"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getDept},slot:"append"})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"机构类型",prop:"depttype"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.adddeptForm.depttype,callback:function(t){e.$set(e.adddeptForm,"depttype",t)},expression:"adddeptForm.depttype"}},e._l(e.Selectsys_depttype,function(e,t){return a("el-option",{key:t,attrs:{value:e.code,label:e.name}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"机构属性",prop:"type"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.adddeptForm.type,callback:function(t){e.$set(e.adddeptForm,"type",t)},expression:"adddeptForm.type"}},e._l(e.SelectDEPT_TYPE,function(e,t){return a("el-option",{key:t,attrs:{value:e.code,label:e.name}})}))],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:30}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"是否停用",prop:"inactive"}},[e.stopcontent?a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.inactive,callback:function(t){e.$set(e.adddeptForm,"inactive",t)},expression:"adddeptForm.inactive"}}):e._e(),e._v(" "),e.stopselect?a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.adddeptForm.inactive,callback:function(t){e.$set(e.adddeptForm,"inactive",t)},expression:"adddeptForm.inactive"}},e._l(e.stopoptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})):e._e()],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系地址"}},[a("el-input",{model:{value:e.adddeptForm.address,callback:function(t){e.$set(e.adddeptForm,"address",t)},expression:"adddeptForm.address"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"邮政编码"}},[a("el-input",{model:{value:e.adddeptForm.zipcode,callback:function(t){e.$set(e.adddeptForm,"zipcode",t)},expression:"adddeptForm.zipcode"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:30}},[a("el-col",{directives:[{name:"show",rawName:"v-show",value:!e.addtitle,expression:"!addtitle"}],attrs:{span:8}},[a("el-form-item",{attrs:{label:"负责人"}},[a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.leaderName,callback:function(t){e.$set(e.adddeptForm,"leaderName",t)},expression:"adddeptForm.leaderName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getPerson},slot:"append"})],1)],1)],1),e._v(" "),a("el-col",{directives:[{name:"show",rawName:"v-show",value:e.addtitle,expression:"addtitle"}],attrs:{span:8}},[a("el-form-item",{attrs:{label:"负责人"}},[a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.leader,callback:function(t){e.$set(e.adddeptForm,"leader",t)},expression:"adddeptForm.leader"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getPerson},slot:"append"})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"电话",prop:"telephone"}},[a("el-input",{model:{value:e.adddeptForm.telephone,callback:function(t){e.$set(e.adddeptForm,"telephone",t)},expression:"adddeptForm.telephone"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"传真",prop:"fax"}},[a("el-input",{model:{value:e.adddeptForm.fax,callback:function(t){e.$set(e.adddeptForm,"fax",t)},expression:"adddeptForm.fax"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:30}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:e.adddeptForm.email,callback:function(t){e.$set(e.adddeptForm,"email",t)},expression:"adddeptForm.email"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:30}},[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"备注",prop:"tips"}},[a("el-input",{attrs:{rows:3,type:"textarea",placeholder:"请输入"},model:{value:e.adddeptForm.tips,callback:function(t){e.$set(e.adddeptForm,"tips",t)},expression:"adddeptForm.tips"}})],1)],1)],1),e._v(" "),a("el-row",{directives:[{name:"show",rawName:"v-show",value:e.personinfo,expression:"personinfo"}],attrs:{gutter:30}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"录入人",prop:"enterby"}},[a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.enterby,callback:function(t){e.$set(e.adddeptForm,"enterby",t)},expression:"adddeptForm.enterby"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"录入时间",prop:"enterdate"}},[a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.enterdate,callback:function(t){e.$set(e.adddeptForm,"enterdate",t)},expression:"adddeptForm.enterdate"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"修改人",prop:"changeby"}},[a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.changeby,callback:function(t){e.$set(e.adddeptForm,"changeby",t)},expression:"adddeptForm.changeby"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"修改时间",prop:"changedate"}},[a("el-input",{attrs:{disabled:e.edit},model:{value:e.adddeptForm.changedate,callback:function(t){e.$set(e.adddeptForm,"changedate",t)},expression:"adddeptForm.changedate"}})],1)],1)],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"el-dialog__footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.saveAndUpdate}},[e._v("保存")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.addtitle,expression:"addtitle"}],attrs:{type:"success"},on:{click:e.saveAndSubmit}},[e._v("保存并继续")]),e._v(" "),e.modify?a("el-button",{staticClass:"btn-primarys",attrs:{type:"primary"},on:{click:e.modifyversion}},[e._v("修订")]):e._e(),e._v(" "),a("el-button",{on:{click:e.close}},[e._v("取消")])],1)])],1)]),e._v(" "),a("el-dialog",{attrs:{"modal-append-to-body":!1,title:"机构",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-tree",{ref:"tree",attrs:{data:e.resourceData,"show-checkbox":"","node-key":"id","default-checked-keys":e.resourceCheckedKey,props:e.resourceProps,"default-expand-all":"","check-strictly":""},on:{"node-click":e.handleNodeClick,"check-change":e.handleClicks}}),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.queding()}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{"modal-append-to-body":!1,title:"选择负责人",visible:e.dialogLeader,width:"80%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogLeader=t}}},[a("div",{staticClass:"accordion",attrs:{id:"information"}},[a("div",{staticClass:"mask_tab-block"},[a("el-table",{directives:[{name:"loadmore",rawName:"v-loadmore",value:e.loadMore,expression:"loadMore"}],staticStyle:{width:"100%"},attrs:{data:e.userList,border:"",stripe:"",height:e.fullHeight,"default-sort":{prop:"userList",order:"descending"}},on:{"selection-change":e.SelChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{label:"账号",sortable:"",width:"140px",prop:"username"}}),e._v(" "),a("el-table-column",{attrs:{label:"姓名",sortable:"",width:"200px",prop:"nickname"}}),e._v(" "),a("el-table-column",{attrs:{label:"机构",sortable:"",width:"150px",prop:"deptName"}}),e._v(" "),a("el-table-column",{attrs:{label:"公司",sortable:"",width:"200px",prop:"companyName"}}),e._v(" "),a("el-table-column",{attrs:{label:"信息状态",sortable:"",width:"200px",prop:"enabled",formatter:e.judge}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",width:"200px",prop:"createTime",sortable:"",formatter:e.dateFormat}})],1),e._v(" "),a("el-pagination",{staticClass:"pull-right pt10",attrs:{background:"","current-page":e.page.currentPage,"page-sizes":[10,20,30,40],"page-size":e.page.pageSize,layout:"total, sizes, prev, pager, next",total:e.page.totalCount},on:{"size-change":e.sizeChange,"current-change":e.currentChange}})],1)]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogLeader=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addleader}},[e._v("确 定")])],1)])],1):e._e()])},staticRenderFns:[]};var r=function(e){a("1OHf")},o=a("VU/8")(s.a,i,!1,r,null,null);t.a=o.exports},dH6F:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("mykn"),i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"headerbg"},[a("vheader"),e._v(" "),a("navs_header")],1),e._v(" "),a("div",{staticClass:"contentbg"},[a("navs_left",{ref:"navleft",on:{childByValue:e.childvalue}}),e._v(" "),a("div",{staticClass:"wrapper wrapper-content"},[a("div",{staticClass:"ibox-content"},[a("div",{staticClass:"fixed-table-toolbar clearfix"},[a("div",{staticClass:"bs-bars pull-left"},[a("div",{staticClass:"hidden-xs",attrs:{id:"roleTableToolbar",role:"group"}},[a("button",{staticClass:"btn btn-green",attrs:{type:"button",id:""},on:{click:e.openAddMgr}},[a("i",{staticClass:"icon-add"}),e._v("添加\n                       \t\t\t")]),e._v(" "),a("button",{staticClass:"btn btn-blue button-margin",attrs:{type:"button",id:""},on:{click:e.modify}},[a("i",{staticClass:"icon-edit"}),e._v("修改\n\t\t\t\t\t\t\t\t")]),e._v(" "),a("button",{staticClass:"btn btn-red button-margin",attrs:{type:"button",id:""},on:{click:e.deluserinfo}},[a("i",{staticClass:"icon-trash"}),e._v("删除\n\t\t\t\t\t\t\t\t")]),e._v(" "),a("button",{staticClass:"btn btn-red button-margin",attrs:{type:"button"},on:{click:e.physicsDel}},[a("i",{staticClass:"icon-trash"}),e._v("物理删除\n\t\t\t\t\t\t\t")]),e._v(" "),a("button",{staticClass:"btn btn-primarys button-margin",attrs:{type:"button",id:""},on:{click:e.modestsearch}},[a("i",{staticClass:"icon-search"}),e._v("高级查询"),a("i",{directives:[{name:"show",rawName:"v-show",value:e.down,expression:"down"}],staticClass:"icon-arrow1-down"}),a("i",{directives:[{name:"show",rawName:"v-show",value:e.up,expression:"up"}],staticClass:"icon-arrow1-up"})])])]),e._v(" "),a("div",{staticClass:"columns columns-right btn-group pull-right"},[e._m(0),e._v(" "),a("div",{staticClass:"keep-open btn-group",attrs:{title:"列"}},[a("el-dropdown",{staticClass:"pl10 btn btn-default btn-outline",attrs:{"hide-on-click":!1}},[a("span",{staticClass:"el-dropdown-link"},[a("font",{staticClass:"J_tabClose"},[a("i",{staticClass:"icon-menu3"})]),e._v(" "),a("i",{staticClass:"el-icon-arrow-down icon-arrow2-down"})],1),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-checkbox-group",{on:{change:e.changeCheckedName},model:{value:e.checkedName,callback:function(t){e.checkedName=t},expression:"checkedName"}},e._l(e.columns,function(e,t){return a("el-dropdown-item",{key:t},[a("el-checkbox",{attrs:{label:e.text,name:"type"}})],1)}))],1)],1)],1)])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.search,expression:"search"}]},[a("el-form",{attrs:{model:e.searchDept,"label-width":"70px"}},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"机构名称",prop:"fullname","label-width":"70px"}},[a("el-input",{model:{value:e.searchDept.fullname,callback:function(t){e.$set(e.searchDept,"fullname",t)},expression:"searchDept.fullname"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-button",{staticStyle:{"margin-top":"2px"},attrs:{type:"primary",size:"small"},on:{click:e.searchinfo}},[e._v("搜索")]),e._v(" "),a("el-button",{staticStyle:{"margin-top":"2px","margin-left":"2px"},attrs:{type:"primary",size:"small"},on:{click:e.resetbtn}},[e._v("重置")])],1)],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:24}},[a("tree_grid",{attrs:{columns:e.columns,loading:e.loading,"tree-structure":!0,"data-source":e.deptList},on:{childByValue:e.childByValue}}),e._v(" "),this.checkedName.length>0?a("el-pagination",{staticClass:"pull-right pt10",attrs:{background:"","current-page":e.page.currentPage,"page-sizes":[10,20,30,40],"page-size":e.page.pageSize,layout:"total, sizes, prev, pager, next",total:e.page.totalCount},on:{"size-change":e.sizeChange,"current-change":e.currentChange}}):e._e()],1)],1)],1)])],1),e._v(" "),a("deptmask",{ref:"child",attrs:{adddeptForm:e.adddeptForm,page:e.page},on:{request:e.requestData,reset:e.reset,requestTree:e.getKey}})],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"btn btn-default btn-refresh",attrs:{id:"refresh",title:"刷新"}},[t("i",{staticClass:"icon-refresh"})])}]};var r=function(e){a("1l00")},o=a("VU/8")(s.a,i,!1,r,"data-v-3a68db72",null);t.default=o.exports},mykn:function(e,t,a){"use strict";(function(e){var s=a("QmSG"),i=a("l8dp"),r=a("GkRW"),o=a("hbvp"),n=a("h7vj"),l=a("NbQq");t.a={name:"dept_management",components:{vheader:r.a,navs_header:n.a,navs_left:o.a,deptmask:l.a,tree_grid:i.a},data:function(){return{loading:!1,basic_url:s.a.dev_url,checkedName:["机构名称","机构编码","上级机构","机构属性","负责人","版本","备注"],columns:[{text:"机构名称",dataIndex:"fullname",isShow:!0},{text:"机构编码",dataIndex:"code",isShow:!0},{text:"上级机构",dataIndex:"parent",isShow:!0},{text:"机构属性",dataIndex:"depttypeName",isShow:!0},{text:"负责人",dataIndex:"leader",isShow:!0},{text:"版本",dataIndex:"version",isShow:!0},{text:"备注",dataIndex:"tips",isShow:!0}],companyId:"",deptId:"",selDept:[],page:{currentPage:1,pageSize:10,totalCount:0},total:0,deptList:[],selMenu:[],search:!1,show:!1,down:!0,up:!1,fullHeight:document.documentElement.clientHeight-210+"px",searchDept:{simplename:"",fullname:""},resourceData:[],resourceDialogisShow:!1,resourceCheckedKey:[],resourceProps:{children:"subDepts",label:"simplename"},treeData:[],selData:[],adddeptForm:{}}},methods:{rowClass:function(e){e.row,e.rowIndex;return"text-align:center"},reset:function(){this.adddeptForm={version:"1",status:"活动",step:"",code:"",fullname:"",parent:"",org_range:"2",type:"",inactive:"否",address:"",zipcode:"",leader:"",telephone:"",fax:"",email:"",tips:"",pid:"",enterby:"",enterdate:"",changeby:"",changedate:""}},getbutton:function(e){var t=this;console.log(e);var a={menuId:e.id,roleId:this.$store.state.roleid},s=this.basic_url+"/api-user/permissions/getPermissionByRoleIdAndSecondMenu";this.$axios.get(s,{params:a}).then(function(e){console.log(e),t.buttons=e.data}).catch(function(e){})},changeCheckedName:function(e){this.checkedName=e;for(var t=e.toString(),a=0;a<this.columns.length;a++)-1!=t.indexOf(this.columns[a].text)?this.columns[a].isShow=!0:this.columns[a].isShow=!1},childByValue:function(e){this.selMenu=e},childvalue:function(e){this.getbutton(e)},tableControle:function(e){this.checkedName=e},sizeChange:function(e){this.page.pageSize=e,this.requestData()},currentChange:function(e){this.page.currentPage=e,this.requestData()},currentTree:function(e){},aTable:function(e){this.page=e,this.requestData()},searchinfo:function(e){var t=this,a={params:{page:1,limit:10,simplename:this.searchDept.simplename,fullname:this.searchDept.fullname}},s=this.basic_url+"/api-user/depts";this.$axios.get(s,a).then(function(e){t.deptList=e.data.data}).catch(function(e){})},resetbtn:function(){this.searchDept={simplename:"",fullname:""},this.requestData()},openAddMgr:function(){this.reset(),this.$refs.child.visible()},modify:function(){var e=this.selMenu;0!=e.length?e.length>1?this.$message({message:"不可同时修改多个机构",type:"warning"}):(this.adddeptForm=this.selMenu[0],console.log(this.adddeptForm),this.$refs.child.detail()):this.$message({message:"请您选择要修改的机构",type:"warning"})},modestsearch:function(){this.search=!this.search,this.down=!this.down,this.up=!this.up},deluserinfo:function(){var e=this,t=this.selMenu;if(0!=t.length){var a=t[0];if(null!=a.children&&void 0!==a.children&&a.children.length>0)this.$message({message:"先删除子机构",type:"error"});else{var s=this.basic_url+"/api-user/depts/deletes",i=[];console.log(t);for(var r=0;r<t.length;r++)i.push(t[r].id);var o={ids:i.toString(",")};console.log(o),this.$confirm("确定删除此数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){t.value;e.$axios.delete(s,{params:o}).then(function(t){0==t.data.resp_code&&(e.$message({message:"删除成功",type:"success"}),e.requestData())}).catch(function(t){e.$message({message:"网络错误，请重试",type:"error"})})}).catch(function(){})}}else this.$message({message:"请您选择要删除的机构",type:"warning"})},physicsDel:function(){var e=this,t=this.selMenu;if(0!=t.length){var a=t[0];if(null!=a.children&&void 0!==a.children&&a.children.length>0)this.$message({message:"先删除子机构",type:"error"});else{var s=this.basic_url+"/api-user/depts/deletes/physicsDel",i=[];console.log(t);for(var r=0;r<t.length;r++)i.push(t[r].id);var o={ids:i.toString(",")};console.log(o),this.$confirm("确定删除此数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){t.value;e.$axios.delete(s,{params:o}).then(function(t){0==t.data.resp_code&&(e.$message({message:"删除成功",type:"success"}),e.requestData())}).catch(function(t){e.$message({message:"网络错误，请重试",type:"error"})})}).catch(function(){})}}else this.$message({message:"请您选择要删除的机构",type:"warning"})},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":this.$moment(a).format("YYYY-MM-DD")},SelChange:function(e){this.selDept=e},requestData:function(){var e=this;this.loading=!0;var t=this.basic_url+"/api-user/depts/treeMap";this.$axios.get(t,{}).then(function(t){console.log(t);for(var a=t.data,s=0;s<a.length;s++)if(void 0!==a[s].subDepts&&a[s].subDepts.length>0){var i=a[s].subDepts;a[s].children=i}e.deptList=a,e.loading=!1}).catch(function(e){})},getKey:function(){var e=this,t=this.basic_url+"/api-user/depts/tree";this.$axios.get(t,{}).then(function(t){e.resourceData=t.data,e.treeData=e.transformTree(e.resourceData)})},transformTree:function(t){for(var a=0;a<t.length;a++)t[a].name=t[a].fullname,!t[a].pid||e.isArray(t[a].subDepts)?t[a].iconClass="icon-file-normal":t[a].iconClass="icon-file-text",e.isArray(t[a].subDepts)&&(t[a].children=this.transformTree(t[a].subDepts));return t},getTreeId:function(e){"1"==e.type?(this.companyId=e.id,this.deptId=""):(this.deptId=e.id,this.companyId=""),this.requestData()},handleNodeClick:function(e){},formatter:function(e,t){return e.enabled}},mounted:function(){this.requestData(),this.getKey()}}}).call(t,a("7t+N"))},xXcQ:function(e,t,a){"use strict";(function(e){var s=a("mvHQ"),i=a.n(s),r=a("bOdI"),o=a.n(r),n=a("QmSG");t.a={name:"masks",props:{adddeptForm:{type:Object,default:function(){return{version:"",status:"",step:"",code:"",fullname:"",parent:"",depttype:"",type:"",inactive:"",address:"",zipcode:"",leader:"",telephone:"",fax:"",email:"",tips:"",pid:"",enterby:"",enterdate:"",changeby:"",changedate:""}}}},data:function(){var e;return{basic_url:n.a.dev_url,value:"",loadSign:!0,commentArr:{},options:[{value:"1",label:"活动"},{value:"2",label:"不活动"}],stopoptions:[{value:"1",label:"是"},{value:"2",label:"否"}],personinfo:!1,showcode:!0,selMenu:[],selUser:[],selData:[],SelectDEPT_TYPE:[],Selectsys_depttype:[],activeNames:["1"],userList:[],page:{currentPage:1,pageSize:10,totalCount:0},dialogVisible:!1,edit:!0,editSearch:"",fullHeight:document.documentElement.clientHeight-210+"px",show:!1,isok1:!0,isok2:!1,addtitle:!0,modifytitle:!1,modify:!1,dialogLeader:!1,stopcontent:!1,stopselect:!1,resourceData:[],resourceDialogisShow:!1,resourceCheckedKey:[],resourceProps:{children:"children",label:"fullname"},rules:(e={step:[{required:!0,trigger:"blur",validator:this.Validators.isWorknumber}],fullname:[{required:!0,trigger:"blur",message:"必填"},{validator:this.Validators.isNickname,trigger:"blur"}],depttype:[{required:!0,trigger:"change",message:"请选择机构类型"}],type:[{required:!0,trigger:"change",message:"请选择机构属性"}],telephone:[{required:!1,trigger:"blur",validator:this.Validators.isTelephone}],fax:[{required:!1,trigger:"blur",validator:this.Validators.isTelephone}],email:[{required:!1,trigger:"blur",validator:this.Validators.isEmail}],code:[{required:!1,trigger:"blur",validator:this.Validators.isWorknumber}],address:[{required:!1,trigger:"blur",validator:this.Validators.isSpecificKey}],zipcode:[{required:!1,trigger:"blur",validator:this.Validators.isSpecificKey}]},o()(e,"telephone",[{required:!1,trigger:"blur",validator:this.Validators.isTelephone}]),o()(e,"fax",[{required:!1,trigger:"blur",validator:this.Validators.isTelephone}]),o()(e,"email",[{required:!1,trigger:"blur",validator:this.Validators.isEmail}]),o()(e,"tips",[{required:!1,trigger:"blur",validator:this.Validators.isSpecificKey}]),e)}},methods:{handleNodeClick:function(e){},handleClicks:function(e,t,a){this.getCheckboxData=e,this.i++,this.i%2==0&&(t?(this.$refs.tree.setCheckedNodes([]),this.$refs.tree.setCheckedNodes([e])):this.$refs.tree.setCheckedNodes([]))},visible:function(){var e=this;this.$axios.get(this.basic_url+"/api-user/users/currentMap",{}).then(function(t){e.adddeptForm.enterby=t.data.nickname;var a=new Date;e.adddeptForm.enterdate=e.$moment(a).format("YYYY-MM-DD HH:mm:ss")}).catch(function(t){e.$message({message:"网络错误，请重试",type:"error"})}),this.show=!0,this.addtitle=!0,this.modifytitle=!1,this.modify=!1,this.stopcontent=!0,this.stopselect=!1,this.showcode=!1},detail:function(){var e=this;this.addtitle=!1,this.modifytitle=!0,this.viewtitle=!1,this.modify=!0,this.stopcontent=!1,this.stopselect=!0,this.$axios.get(this.basic_url+"/api-user/users/currentMap",{}).then(function(t){e.adddeptForm.changeby=t.data.nickname;var a=new Date;for(var s in e.adddeptForm.changedate=e.$moment(a).format("YYYY-MM-DD HH:mm:ss"),console.log(e.adddeptForm),e.adddeptForm)e.adddeptForm.hasOwnProperty("_expanded"),e.adddeptForm.hasOwnProperty("_level"),e.adddeptForm.hasOwnProperty("_parent"),e.adddeptForm.hasOwnProperty("_show"),delete e.adddeptForm._expanded,delete e.adddeptForm._level,delete e.adddeptForm._parent,delete e.adddeptForm._show;console.log(111),console.log(e.adddeptForm);var r=i()(e.adddeptForm);console.log(r),e.ADDDEPTFORM=JSON.parse(r)}).catch(function(t){e.$message({message:"网络错误，请重试1",type:"error"})}),this.show=!0},getPerson:function(){this.requestData(),this.dialogLeader=!0},SelChange:function(e){this.selUser=e,console.log(e)},loadMore:function(){var e=this;if(this.loadSign){if(this.loadSign=!1,this.page.currentPage++,this.page.currentPage>Math.ceil(this.page.totalCount/this.page.pageSize))return;setTimeout(function(){e.loadSign=!0},1e3),this.requestData()}},sizeChange:function(e){this.page.pageSize=e,this.requestData()},currentChange:function(e){this.page.currentPage=e,this.requestData()},judge:function(e){return e.enabled?"活动":"不活动"},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":this.$moment(a).format("YYYY-MM-DD")},addleader:function(){var e=this.selUser;0!=e.length?e.length>1?this.$message({message:"不可同时选择多条数据",type:"warning"}):(this.adddeptForm.leader=e[0].id,this.adddeptForm.leaderName=e[0].nickname,this.dialogLeader=!1):this.$message({message:"请您选择数据",type:"warning"})},modifyversion:function(){var e=this;this.$refs.adddeptForm.validate(function(t){if(t){var a=i()(e.ADDDEPTFORM);if(i()(e.adddeptForm)==a)return e.$message({message:"没有修改内容，不允许修订！",type:"warning"}),!1;var s=e.basic_url+"/api-user/depts/upgraded";e.$axios.post(s,e.adddeptForm).then(function(t){0==t.data.resp_code?(e.$message({message:"修订成功",type:"success"}),e.$emit("request"),e.show=!1):(e.show=!0,1==t.data.resp_code&&(""!=t.data.resp_msg?e.$message({message:t.data.resp_msg,type:"warning"}):e.$message({message:"相同数据不可重复修订！",type:"warning"})))}).catch(function(t){e.$message({message:"网络错误，请重试1",type:"error"})})}else e.$message({message:"未填写完整，请填写",type:"warning"})})},getDept:function(){var e=this,t=(this.page.currentPage,this.page.pageSize,this.basic_url+"/api-user/depts/treeMap");this.$axios.get(t,{}).then(function(t){e.resourceData=t.data,e.dialogVisible=!0})},queding:function(){console.log(this.checkedNodes),this.getCheckedNodes(),void 0==this.checkedNodes?this.$message({message:"请选择数据",type:"warning"}):(this.placetext=!1,this.dialogVisible=!1,this.adddeptForm.pid=this.checkedNodes[0].id,this.adddeptForm.parent=this.checkedNodes[0].fullname)},getCheckedNodes:function(){this.checkedNodes=this.$refs.tree.getCheckedNodes()},rand:function(e,t){return Math.floor(Math.random()*(t-e))+e},getDEPT_TYPE:function(){var e=this,t=this.basic_url+"/api-user/dicts/findChildsByCode?code=DEPT_TYPE";this.$axios.get(t,{}).then(function(t){e.SelectDEPT_TYPE=t.data}).catch(function(e){console.log("请求失败")})},getsys_depttype:function(){var e=this,t=this.basic_url+"/api-user/dicts/findChildsByCode?code=sys_depttype";this.$axios.get(t,{}).then(function(t){e.Selectsys_depttype=t.data}).catch(function(e){console.log("请求失败")})},close:function(){this.show=!1,this.$emit("request")},toggle:function(e){1==this.isok1?this.maxDialog():this.rebackDialog()},maxDialog:function(t){this.isok1=!1,this.isok2=!0,e(".mask_div").width(document.body.clientWidth),e(".mask_div").height(document.body.clientHeight-60),e(".mask_div").css("top","60px")},rebackDialog:function(){this.isok1=!0,this.isok2=!1,e(".mask_div").css("width","80%"),e(".mask_div").css("height","80%"),e(".mask_div").css("top","100px")},requestData:function(e){var t=this,a={page:this.page.currentPage,limit:this.page.pageSize,companyId:this.companyId,deptId:this.deptId},s=this.basic_url+"/api-user/users";this.$axios.get(s,{params:a}).then(function(e){t.page.totalCount=e.data.count;var a=Math.ceil(t.page.totalCount/t.page.pageSize);t.page.currentPage>=a?t.loadSign=!1:t.loadSign=!0,t.commentArr[t.page.currentPage]=e.data.data;for(var s=[],i=1;i<=a;i++)if(void 0!==t.commentArr[i]&&t.commentArr[i].length>0)for(var r=0;r<t.commentArr[i].length;r++)s.push(t.commentArr[i][r]);t.userList=s}).catch(function(e){})},save:function(){var e=this,t=this;this.$refs.adddeptForm.validate(function(a){if(a){t.adddeptForm.status="1"==t.adddeptForm.status||"活动"==t.adddeptForm.status?"1":"0";var s=t.basic_url+"/api-user/depts/saveOrUpdate";console.log(t.adddeptForm),e.$axios.post(s,t.adddeptForm).then(function(t){0==t.data.resp_code&&(e.$message({message:"保存成功",type:"success"}),e.$emit("request"))}).catch(function(t){e.$message({message:"网络错误，请重试",type:"error"})}),e.falg=!0}else e.show=!0,e.$message({message:"未填写完整，请填写",type:"warning"}),e.falg=!1})},saveAndUpdate:function(){this.save(),this.falg&&(this.show=!1),this.$emit("request")},saveAndSubmit:function(){this.save(),this.$emit("reset"),this.$emit("request")},handleClose:function(e){this.$confirm("确认关闭？").then(function(t){e()}).catch(function(e){})}},mounted:function(){this.getDEPT_TYPE(),this.getsys_depttype(),this.requestData()}}}).call(t,a("7t+N"))}});
//# sourceMappingURL=13.04ec675d7e70ad7b8faf.js.map