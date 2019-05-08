<template>
  <div class="content-accordion">
    <div class="el-collapse-item pt10 pl10 pr10 pb10">
        <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane v-for="(title,index) in bigtitle" :key="index" :label="bigtitle[index].title" name="first" v-if="bigtitle[index].title=='单据类'">
                <el-tabs :tab-position="tabPosition" @tab-click="handleClick1" :style="styleHeight">
                    <el-tab-pane v-for="item in bigtitle[index].list" :key='item.id' :label='item.code'>
                      <div class="pull-left" style="width:86%;">
                        <iframe :src="url" width="100%" :height="fullHeight" frameborder="0" scrolling="auto"></iframe>
                      </div>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <!-- <el-tab-pane label="统计报表" name="second"> -->
              <el-tab-pane v-for="(title,index) in bigtitle" :key="index" :label="bigtitle[index].title" name="second" v-if="bigtitle[index].title!='单据类'">
                <el-tabs :tab-position="tabPosition" @tab-click="handleClick1" :style="styleHeight">
                  <el-tab-pane v-for="(itemlist,index) in bigtitle[index].list" :key='index' :label='itemlist.code'>
                    <div class="pull-left" style="width:82%;">
                      <el-form inline-message :model="dataInfo" ref="dataInfo" label-width="110px" v-if="xianshi">
                        <!-- 报表信息 -->
                        <el-row>
                          <el-col :span="5" v-for="(item,index) in pramList" :key="index" v-show="item.label!=''" >
                            <!--必填情况-->
                            <el-form-item :label="item.label" :prop="item.param" v-if="item.required==1" :rules="{required: true, message: '请填写', trigger: 'blur'}">
                              <el-input v-model="dataInfo[item.param]" v-show="item.type!='1'&&item.type!='4'&&item.type!='3'"></el-input>

                              <el-date-picker v-model="dataInfo[item.param]" v-show="item.type=='1'" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>

                              <el-input v-model="dataInfo[item.param]" v-show="item.type=='3'" :disabled="true">
                                <el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="requestData(item)"></el-button>
                              </el-input>
                            
                              <el-input v-model="dataInfo[item.param]" v-show="item.type=='4'&&item.add=='1'" :disabled="true">
                                <el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="getDept(item)"></el-button>
                              </el-input>
                            </el-form-item>
                            <!--非必填情况-->
                            <el-form-item :label="item.label" :prop="item.param" v-else>
                              <el-input v-model="dataInfo[item.param]" v-show="item.type!='1'&&item.type!='4'&&item.type!='3'"></el-input> 

                              <el-date-picker v-model="dataInfo[item.param]" v-show="item.type=='1'" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>

                              <el-input v-model="dataInfo[item.param]" v-show="item.type=='3'" :disabled="true">
                                <el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="requestData(item)"></el-button>
                              </el-input>

                              <el-input v-model="dataInfo[item.param]" v-show="item.type=='4'&&item.add=='1'" :disabled="true">
                                <el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="getDept(item)"></el-button>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="3" class="text-center">
                            <el-button type="primary" size="small" @click="determine">搜索</el-button>
                          </el-col>
                        </el-row>

                      </el-form>
                      <iframe :src="src" width="100%" :height="fullHeight" frameborder="0" scrolling="auto" style="overflow-x:scroll"></iframe>
                    </div>
              </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
      </el-tabs>
        <el-dialog :modal-append-to-body="false" title="用户" :visible.sync="dialogVisibleuser" width="80%" >
          <el-table :data="userList" border stripe :header-cell-style="rowClass" style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}" @selection-change="SelChange" >
          <el-table-column type="selection" width="55" fixed align="center">
          </el-table-column>
          <el-table-column label="用户名" sortable width="140px" prop="username">
          </el-table-column>
          <el-table-column label="姓名" sortable width="200px" prop="nickname" >
          </el-table-column>
          <el-table-column label="性别" sortable width="100px" prop="sexName" >
          </el-table-column>
          <el-table-column label="机构" sortable width="150px" prop="deptName" >
          </el-table-column>
          <el-table-column label="手机号" sortable width="150px" prop="phone" >
          </el-table-column>
          <el-table-column label="员工号" sortable width="150px" prop="worknumber">
          </el-table-column>
          <el-table-column label="用户有效期" prop="user_active_date" width="150px" sortable :formatter="dateFormat">
          </el-table-column>
        </el-table>
            <el-pagination background class="text-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
            </el-pagination>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addcusname">确 定</el-button>
              <el-button @click="dialogVisibleuser = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog :modal-append-to-body="false" title="机构" :visible.sync="dialogVisible" width="30%" >
        <el-tree ref="tree" :data="resourceData" show-checkbox  node-key="id" default-expand-all :default-checked-keys="resourceCheckedKey" :props="resourceProps" @node-click="handleNodeClick" @check-change="handleClicks" check-strictly>
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dailogconfirm" >确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Config from '../../../config.js';
  export default {
    props:["reportData"],//第一种方式
    data() {
      return {
        basic_url: Config.dev_url,
        reportsList:[],//统计类
        reportList:[],//单据类
        pramList:[],
        dataInfo:{},
        userList:[],//人名
        options:[],//检验检测类型
        bigtitle:[],//统计类&&单据类
        activeName: '',
        tabPosition: 'left',
        noedit:false,//可编辑
        xianshi:false,
        appname:'',
        url:'',//单据
        src:'',//统计
        file:'',//统计报表事用的
        dialogVisible:false,//机构
        dialogVisibleuser:false,//用户
        page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
        },
        //获取浏览器高度
        fullHeight: document.documentElement.clientHeight - 110 + 'px',
        //样式高度
        styleHeight: {
          height: document.documentElement.clientHeight - 110 + 'px',
        },
				//tree树菜单
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "children",
					label: "fullname"
				},
      };
    },
    methods: {
      //表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			SelChange(val) {
				this.selval = val;
			},
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData();
			},
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD"); 
      },
      handleNodeClick(data) { //获取勾选树菜单节点
			},
			handleClicks(data,checked, indeterminate) {
				this.getCheckboxData = data;
          this.i++;
          if(this.i%2==0){
            if(checked){
                this.$refs.tree.setCheckedNodes([]);
                this.$refs.tree.setCheckedNodes([data]);
                //交叉点击节点
              }else{
                this.$refs.tree.setCheckedNodes([]);
                //点击已经选中的节点，置空
              }
          }
    	},
      dailogconfirm() { //小弹出框确认按钮事件
          var value1 = sessionStorage.getItem("prop");
          var value2 = sessionStorage.getItem("str");
          this.dataInfo[value1]=this.getCheckboxData.fullname;
          this.dataInfo[value2]=this.getCheckboxData.id+"";
					// this.user.deptId = this.getCheckboxData.id;
					// this.user.deptName = this.getCheckboxData.fullname;
					this.dialogVisible = false;
					
      },
      getDept(item) {
				var url = this.basic_url + '/api-user/depts/treeMap';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data;
          this.dialogVisible = true;
          sessionStorage.setItem("prop", item.param);//名称
          var str=item.param.slice(0,-4);
          sessionStorage.setItem("str", str);
				}).catch((wrong) => {
				});
      },
      addPeople(item){
				if(item.type==4){
					this.getDept(item.param);
				}else{
					this.requestData(item.param);
				}
      },
      //单据和统计的切换
      handleClick(){
       
      },
      handleClick1(tab,event) {
        this.src="";
        // this.pramList="";//清空form表
        for(var i=0;i<this.reportsList.length;i++){
          if(this.reportsList[i].code==tab.label){
             var id=this.reportsList[i].id;
             this.file=this.reportsList[i].file
          }
        }

        this.appname=this.$route.query.appname; 
         var url = this.basic_url + '/api-apps/app/'+this.appname+'/reportParams/'+id;
            this.$axios.get(url, {}).then((res) => {
              var list = res.data.datas;
              if(!!list){
                  this.xianshi = true;
              }else{
                  this.xianshi = fale;
              }
              var plistsize = res.data.datas.length;
              for(var i=0;i<plistsize;i++){
                if(list[i].type=='4'){
                 
                  var param =list[i];
                  var newparam = {};
                     newparam.label=param.label;
                     newparam.param=param.param+"Desc";
                     newparam.required=param.required;
                     newparam.type=param.type;
                     newparam.status=param.status;
                     newparam.add=1;
                     list.push(newparam);
                     list[i].label='';
                }
              }
            this.pramList = list;
            console.log(this.pramList);
          }).catch((wrong) => {
				  })
      },
    //统计报表
        Statistics() {
             this.appname=this.$route.query.appname;
             var id=this.$route.query.id;
            //单据报表
            var url = this.basic_url + '/api-apps/app/'+this.appname+'/report?type=统计类';
            this.$axios.get(url, {}).then((res) => { 
              this.reportsList = res.data.datas;  
                	}).catch((wrong) => {
				       });
            var url = this.basic_url + '/api-apps/app/'+this.appname+'/reportParams/'+id;
            this.$axios.get(url, {}).then((res) => {
            this.pramList = res.data.datas;
          }).catch((wrong) => {
				  })
        },
        //单据
        single(){
          // work-task.ureport.xml
          this.appname=this.$route.query.appname;
           var url = this.basic_url + '/api-apps/app/'+this.appname+'/report?type=单据类';
            this.$axios.get(url, {}).then((res) => {
              this.reportList = res.data.datas; 
              var file=this.reportList[0].file;
              var token = sessionStorage.getItem('access_token');
              // this.appname=this.$route.query.appname;
              // var file=this.$route.query.file;
              var id=this.$route.query.id;
              var url=this.basic_url;
              var pos = url.lastIndexOf(':');
              url=url.substring(0,pos+1); 
              this.url=url+"5300";
              this.url = this.url+"/ureport/preview?_u=mysql:" +file+'&id='+ id+'&access_token='+token;
                	}).catch((wrong) => {
               });
        },
        //单据的运行
        singlerun(){
              var file=this.reportList[0].file;
              var token = sessionStorage.getItem('access_token');
              var id=this.$route.query.id;
              var url=this.basic_url;
              var pos = url.lastIndexOf(':');
              url=url.substring(0,pos+1); 
              this.url=url+"5300";
              this.url = this.url+"/ureport/preview?_u=mysql:" +file+'&id='+ id+'&access_token='+token;
        },
        //运行统计报表确定
        determine(){
				var token = sessionStorage.getItem('access_token');
           var str=JSON.stringify(this.dataInfo);
         //var str=this.dataInfo; 
				for(var j=0;j<str.length;j++){
          str=str.replace("\":\"",'=');
          str=str.replace("\"","");
					str=str.replace("\{","");
					str=str.replace("\}","");
					str=str.replace("\",\"","&");
				}
				this.str="&"+str;
        this.file=this.file+this.str;
		  		var src=this.basic_url;
					var pos = src.lastIndexOf(':');
					src=src.substring(0,pos+1); 
					this.src=src+"5300";
          this.src = this.src+"/ureport/preview?_u=mysql:"+this.file+'&access_token='+token;
      },
      requestData(){
				var data = {
						page: 1,
						limit: 10,
					}
				var url = this.basic_url + '/api-user/users';
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.page.totalCount = res.data.count;
					this.userList = res.data.data;
					this.dialogVisibleuser = true;
				}).catch((wrong) => {
				});
			},
      //人员的确定
			addcusname(){
				if(this.selval.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selval.length > 1){
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
				}else{
					var value = sessionStorage.getItem("user");
				  this.dataInfo[value]=this.selval[0].username;
					this.dialogVisibleuser = false;
				}
      },
      //检验检测类型
      inspectproType(){
				var url = this.basic_url + '/api-user/dicts/findChildsByCode?code=BOOK_TYPE';
				this.$axios.get(url, {}).then((res) => {
          this.options = res.data;
				}).catch((wrong) => {
				})	
      },
      //默认加载/api-apps/app/inspectPro/reportList
       singleAndStatistics(){
        // var url = this.basic_url + '/api-apps/app/inspectPro/reportList';
        var url = this.basic_url + '/api-apps/app/'+this.appname+'/reportList';
				this.$axios.get(url, {}).then((res) => {
          this.bigtitle=res.data.datas;
          var bigtitle=this.bigtitle
          if(bigtitle[0].title!="单据类"){
             this.activeName="second"
            }else{
             this.activeName="first"
            }  
        for(let m=0;m<bigtitle.length;m++){
           if(bigtitle[m].title=="统计类"){
              var list=bigtitle[m].list;
              
            for(var i=0;i<list.length;i++){
              var id=list[0].id;
              var files=list[0].file;
            } 
            var url = this.basic_url + '/api-apps/app/'+this.appname+'/reportParams/'+id;
              console.log(url);
            this.$axios.get(url, {}).then((res) => {
              console.log(res);
              var list = res.data.datas;
              if(!!list){
                this.xianshi = true;
                  var plistsize = res.data.datas.length;
              for(var i=0;i<plistsize;i++){
                if(list[i].type=='4'){
                  var param =list[i];
                  var newparam = {};
                     newparam.label=param.label;
                     newparam.param=param.param+"Desc";
                     newparam.required=param.required;
                     newparam.type=param.type;
                     newparam.status=param.status;
                     newparam.add=1;
                     list.push(newparam);
                     list[i].label='';
                }
              }
            this.pramList = list;
              console.log(this.pramList);
              }else{
                this.xianshi = false;
                var token = sessionStorage.getItem('access_token');
                var url=this.basic_url;
								var pos = url.lastIndexOf(':');
								url=url.substring(0,pos+1); 
                this.src = url+"5300/ureport/preview?_u=mysql:" +files+'&access_token='+token;
              }
          }).catch((wrong) => {
				  })
          }
        }
				}).catch((wrong) => {
				})	
      },
    },
    mounted(){
        this.single();
        this.Statistics();
        this.inspectproType();
        this.singleAndStatistics();
        // this.singleRun();
    }
    
  };
</script>

<style scoped>
  .content-accordion{
    margin: 15px;
  }
</style>