webpackJsonp([66],{CnJI:function(e,t){},selx:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("QmSG"),n=a("GkRW"),r=a("hbvp"),i=a("h7vj"),o={name:"task",components:{vheader:n.a,navs_header:i.a,navs_left:r.a},data:function(){return{loading:!1,basic_url:l.a.dev_url,fullHeight:document.documentElement.clientHeight-210+"px",search:!1,flowmodelList:[],commentArr:{},checkedName:["流程定义ID","类型","流程标识","流程名称","部署id","流程图资源","版本","资源名称"],tableHeader:[{label:"流程定义ID",prop:"id"},{label:"类型",prop:"category"},{label:"流程标识",prop:"key"},{label:"流程名称",prop:"name"},{label:"部署id",prop:"deploymentId"},{label:"流程图资源",prop:"diagramResourceName"},{label:"版本",prop:"version"},{label:"资源名称",prop:"resourceName"}],searchList:{createTime:""},page:{currentPage:1,pageSize:10,totalCount:0}}},methods:{rowClass:function(e){e.row,e.rowIndex;return"text-align:center"},SelChange:function(e){this.selUser=e},sizeChange:function(e){this.page.pageSize=e,this.requestData()},currentChange:function(e){this.page.currentPage=e,this.requestData()},loadMore:function(){var e=this;if(this.loadSign){if(this.loadSign=!1,this.page.currentPage++,this.page.currentPage>Math.ceil(this.page.totalCount/this.page.pageSize))return;setTimeout(function(){e.loadSign=!0},1e3),this.requestData()}},requestData:function(){var e=this;this.loading=!0;var t=this.basic_url+"/api-flow/flow/process";this.$axios.get(t,{}).then(function(t){console.log(t.data),e.page.totalCount=t.data.count;var a=Math.ceil(e.page.totalCount/e.page.pageSize);e.page.currentPage>=a?e.loadSign=!1:e.loadSign=!0,e.commentArr[e.page.currentPage]=t.data.data;for(var l=[],n=1;n<=a;n++)if(void 0!==e.commentArr[n]&&e.commentArr[n].length>0)for(var r=0;r<e.commentArr[n].length;r++)l.push(e.commentArr[n][r]);e.flowmodelList=l,e.loading=!1}).catch(function(e){})},childByValue:function(e){this.$refs.navsheader.showClick(e)}},mounted:function(){this.requestData()}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"headerbg"},[a("vheader"),e._v(" "),a("navs_header",{ref:"navsheader"})],1),e._v(" "),a("div",{staticClass:"contentbg"},[a("navs_left",{ref:"navleft",on:{childByValue:e.childByValue}}),e._v(" "),a("div",{staticClass:"wrapper",attrs:{id:"wrapper-content"}},[a("div",{staticClass:"ibox-content"},[a("div",{staticClass:"fixed-table-toolbar clearfix"},[a("div",{staticClass:"bs-bars pull-left"}),e._v(" "),a("div",{staticClass:"columns columns-right btn-group pull-right"},[e._m(0),e._v(" "),a("div",{staticClass:"keep-open btn-group",attrs:{title:"列"}},[a("el-dropdown",{staticClass:"pl10 btn btn-default btn-outline",attrs:{"hide-on-click":!1}},[a("span",{staticClass:"el-dropdown-link"},[a("font",{staticClass:"J_tabClose"},[a("i",{staticClass:"icon-menu3"})]),e._v(" "),a("i",{staticClass:"el-icon-arrow-down icon-arrow2-down"})],1),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-checkbox-group",{model:{value:e.checkedName,callback:function(t){e.checkedName=t},expression:"checkedName"}},e._l(e.tableHeader,function(e,t){return a("el-dropdown-item",{key:t},[a("el-checkbox",{attrs:{label:e.label,name:"type"}})],1)}))],1)],1)],1)])]),e._v(" "),a("el-row",{attrs:{gutter:10}},[a("el-col",{staticClass:"leftcont v-resize",attrs:{span:24}},[a("el-table",{directives:[{name:"loadmore",rawName:"v-loadmore",value:e.loadMore,expression:"loadMore"},{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.flowmodelList,"header-cell-style":e.rowClass,border:"",stripe:"",height:e.fullHeight,"default-sort":{prop:"inspectList",order:"descending"},"element-loading-text":"加载中…","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.9)"},on:{"selection-change":e.SelChange}},[this.checkedName.length>0?a("el-table-column",{attrs:{type:"selection",width:"55",fixed:"",align:"center"}}):e._e(),e._v(" "),-1!=this.checkedName.indexOf("流程定义ID")?a("el-table-column",{attrs:{label:"流程定义ID",sortable:"",width:"130px",prop:"id"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",{staticClass:"blue",attrs:{title:"点击查看详情"},on:{click:function(a){e.view(t.row.ID)}}},[e._v(e._s(t.row.id)+"\r\n\t\t\t\t\t\t\t\t\t\t")])]}}])}):e._e(),e._v(" "),-1!=this.checkedName.indexOf("类型")?a("el-table-column",{attrs:{label:"类型",sortable:"",width:"140px",prop:"category"}}):e._e(),e._v(" "),-1!=this.checkedName.indexOf("流程标识")?a("el-table-column",{attrs:{label:"流程标识",sortable:"",width:"140px",prop:"key"}}):e._e(),e._v(" "),-1!=this.checkedName.indexOf("流程名称")?a("el-table-column",{attrs:{label:"流程名称",sortable:"",width:"140px",prop:"name"}}):e._e(),e._v(" "),-1!=this.checkedName.indexOf("部署id")?a("el-table-column",{attrs:{label:"部署id",sortable:"",width:"100px",prop:"deploymentId"}}):e._e(),e._v(" "),-1!=this.checkedName.indexOf("流程图资源")?a("el-table-column",{attrs:{label:"流程图资源",width:"200px",prop:"diagramResourceName",sortable:""}}):e._e(),e._v(" "),-1!=this.checkedName.indexOf("版本")?a("el-table-column",{attrs:{label:"版本",width:"100px",prop:"version",sortable:""}}):e._e(),e._v(" "),-1!=this.checkedName.indexOf("资源名称")?a("el-table-column",{attrs:{label:"资源名称",sortable:"",width:"140px",prop:"resourceName"}}):e._e()],1),e._v(" "),this.checkedName.length>0?a("el-pagination",{staticClass:"pull-right pt10",attrs:{background:"","current-page":e.page.currentPage,"page-sizes":[10,20,30,40],"page-size":e.page.pageSize,layout:"total, sizes, prev, pager, next",total:e.page.totalCount},on:{"size-change":e.sizeChange,"current-change":e.currentChange}}):e._e()],1)],1)],1)])],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"btn btn-default btn-refresh",attrs:{id:"refresh",title:"刷新"}},[t("i",{staticClass:"icon-refresh"})])}]};var c=a("VU/8")(o,s,!1,function(e){a("CnJI")},null,null);t.default=c.exports}});
//# sourceMappingURL=66.e99ab2b3f30b07b35c75.js.map