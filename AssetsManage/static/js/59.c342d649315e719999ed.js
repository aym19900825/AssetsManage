webpackJsonp([59],{"7KeE":function(e,t,s){"use strict";(function(e){var a=s("QmSG"),n=s("GkRW"),i=s("hbvp"),r=s("h7vj");t.a={name:"dept_management",components:{vheader:n.a,navs_header:r.a,navs_left:i.a},data:function(){return{loading:!1,basic_url:a.a.dev_url,companyId:"",deptId:"",selDept:[],page:{currentPage:1,pageSize:10,totalCount:0},total:0,deptList:[],selMenu:[],search:!1,show:!1,down:!0,up:!1,fullHeight:document.documentElement.clientHeight-210+"px",searchDept:{simplename:"",fullname:""},resourceData:[],resourceDialogisShow:!1,resourceCheckedKey:[],resourceProps:{children:"subDepts",label:"simplename"},treeData:[],selData:[],adddeptForm:{}}},methods:{rowClass:function(e){e.row,e.rowIndex;return"text-align:center"},reset:function(){this.adddeptForm={version:"1",status:"活动",step:"",code:"",fullname:"",parent:"",org_range:"2",type:"",inactive:"否",address:"",zipcode:"",leader:"",telephone:"",fax:"",email:"",tips:"",pid:"",enterby:"",enterdate:"",changeby:"",changedate:""}},changeCheckedName:function(e){this.checkedName=e;for(var t=e.toString(),s=0;s<this.columns.length;s++)-1!=t.indexOf(this.columns[s].text)?this.columns[s].isShow=!0:this.columns[s].isShow=!1},childByValue:function(e){this.selMenu=e},tableControle:function(e){this.checkedName=e},sizeChange:function(e){this.page.pageSize=e,this.requestData()},currentChange:function(e){this.page.currentPage=e,this.requestData()},currentTree:function(e){},aTable:function(e){this.page=e,this.requestData()},searchinfo:function(e){var t=this,s={params:{page:1,limit:10,simplename:this.searchDept.simplename,fullname:this.searchDept.fullname}},a=this.basic_url+"/api-user/depts";this.$axios.get(a,s).then(function(e){t.deptList=e.data.data}).catch(function(e){})},resetbtn:function(){this.searchDept={simplename:"",fullname:""},this.requestData()},openAddMgr:function(){this.reset(),this.$refs.child.visible()},modify:function(){var e=this.selMenu;0!=e.length?e.length>1?this.$message({message:"不可同时修改多个机构",type:"warning"}):(this.adddeptForm=this.selMenu[0],console.log(this.adddeptForm),this.$refs.child.detail()):this.$message({message:"请您选择要修改的机构",type:"warning"})},modestsearch:function(){this.search=!this.search,this.down=!this.down,this.up=!this.up},deluserinfo:function(){var e=this,t=this.selMenu;if(0!=t.length){var s=t[0];if(null!=s.children&&void 0!==s.children&&s.children.length>0)this.$message({message:"先删除子机构",type:"error"});else{var a=this.basic_url+"/api-user/depts/deletes",n=[];console.log(t);for(var i=0;i<t.length;i++)n.push(t[i].id);var r={ids:n.toString(",")};console.log(r),this.$confirm("确定删除此数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){t.value;e.$axios.delete(a,{params:r}).then(function(t){0==t.data.resp_code&&(e.$message({message:"删除成功",type:"success"}),e.requestData())}).catch(function(t){e.$message({message:"网络错误，请重试",type:"error"})})}).catch(function(){})}}else this.$message({message:"请您选择要删除的机构",type:"warning"})},dateFormat:function(e,t){var s=e[t.property];return void 0==s?"":this.$moment(s).format("YYYY-MM-DD")},SelChange:function(e){this.selDept=e},requestData:function(){var e=this;this.loading=!0;var t=this.basic_url+"/api-user/depts/treeMap";this.$axios.get(t,{}).then(function(t){console.log(t);for(var s=t.data,a=0;a<s.length;a++)if(void 0!==s[a].subDepts&&s[a].subDepts.length>0){var n=s[a].subDepts;s[a].children=n}e.deptList=s,e.loading=!1}).catch(function(e){})},getKey:function(){var e=this,t=this.basic_url+"/api-user/depts/tree";this.$axios.get(t,{}).then(function(t){e.resourceData=t.data,e.treeData=e.transformTree(e.resourceData)})},transformTree:function(t){for(var s=0;s<t.length;s++)t[s].name=t[s].fullname,!t[s].pid||e.isArray(t[s].subDepts)?t[s].iconClass="icon-file-normal":t[s].iconClass="icon-file-text",e.isArray(t[s].subDepts)&&(t[s].children=this.transformTree(t[s].subDepts));return t},getTreeId:function(e){"1"==e.type?(this.companyId=e.id,this.deptId=""):(this.deptId=e.id,this.companyId=""),this.requestData()},handleNodeClick:function(e){},formatter:function(e,t){return e.enabled}}}}).call(t,s("7t+N"))},cQDW:function(e,t){},lmqL:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("7KeE"),n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("div",{staticClass:"headerbg"},[t("vheader"),this._v(" "),t("navs_header")],1),this._v(" "),t("div",{staticClass:"contentbg"},[t("navs_left"),this._v(" "),t("div",{staticClass:"wrapper wrapper-content"},[t("el-row",{attrs:{gutter:10}},[t("el-col",{attrs:{span:24}},[t("iframe",{attrs:{src:"http://192.168.1.169:8888/jobinfo",id:"flowIframe",width:"100%",height:this.fullHeight,frameborder:"0",scrolling:"no"}})])],1)],1)],1)])},staticRenderFns:[]};var i=function(e){s("cQDW")},r=s("VU/8")(a.a,n,!1,i,"data-v-a4fe8d94",null);t.default=r.exports}});
//# sourceMappingURL=59.c342d649315e719999ed.js.map