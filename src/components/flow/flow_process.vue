<template>
  <div>
    <div class="headerbg">
      <vheader></vheader>
      <navs_tabs ref="navsTabs"></navs_tabs>
    </div>
    <div class="contentbg">
      <!--左侧菜单内容显示 Begin-->
      <navs_left ref="navleft" v-on:childByValue="childByValue"></navs_left>
      <!--左侧菜单内容显示 End-->
      <!--右侧内容显示 Begin-->
      <div id="wrapper-content" class="wrapper">
        <div class="ibox-content">
          <div class="fixed-table-toolbar clearfix">
            <div class="bs-bars pull-left">
              <div class="hidden-xs" id="roleTableToolbar" role="group">
                <button
                  v-for="item in buttons"
                  :key="item.id"
                  :class="'btn mr5 '+ item.style"
                  @click="getbtn(item)"
                >
                  <i :class="item.icon"></i>
                  {{item.name}}
                </button>
              </div>
            </div>
            <div class="columns columns-right btn-group pull-right">
              <div
                id="refresh"
                title="刷新"
                class="btn btn-default btn-refresh"
                @click="this.commonNew.winReload"
              >
                <i class="icon-refresh"></i>
              </div>
              <div class="keep-open btn-group" title="列">
                <el-dropdown :hide-on-click="false" class="pl10 btn btn-default btn-outline">
                  <span class="el-dropdown-link">
                    <font class="J_tabClose">
                      <i class="icon-menu3"></i>
                    </font>
                    <i class="el-icon-arrow-down icon-arrow2-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-checkbox-group v-model="checkedName">
                      <el-dropdown-item v-for="(item,index) in tableHeader" :key="index">
                        <el-checkbox :label="item.label" name="type"></el-checkbox>
                      </el-dropdown-item>
                    </el-checkbox-group>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
          <!-- 高级查询划出 Begin-->
          <!--<div v-show="search">
						<el-form inline-message :model="searchList">
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="委托方名称名称" prop="V_NAME"  label-width="100px">
										<el-input v-model="searchList.V_NAME"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="样品名称" prop="ITEM_NAME" label-width="70px">
										<el-input v-model="searchList.ITEM_NAME"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="检测报告编号" prop="REPORT_NUM" label-width="100px">
										<el-input v-model="searchList.REPORT_NUM"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="检测委托书编号" prop="PROXYNUM" label-width="110px">
										<el-input v-model="searchList.PROXYNUM"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="5">
								<el-col :span="6">
									<el-form-item label="完成日期" prop="COMPDATE" label-width="100px">
										<el-date-picker v-model="searchList.COMPDATE" type="date" placeholder="完成日期" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%">
									</el-date-picker>
									</el-form-item>
								</el-col>
								
								<el-col :span="5">
									<el-form-item label="状态" prop="STATUS" label-width="70px">
										<el-select clearable v-model="searchList.STATUS" placeholder="选择状态" style="width: 100%">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="2">
									<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
								</el-col>
							</el-row>
						</el-form>
          </div>-->
          <!-- 高级查询划出 End-->

          <el-row :gutter="10">
            <el-col :span="24" class="leftcont">
              <!-- 表格 -->
              <v-table
                ref="table"
                :appName="appName"
                :searchList="searchList"
                @getSelData="setSelData"
              >
                <el-table-column
                  label="流程定义ID"
                  sortable
                  width="200px"
                  prop="id"
                  v-if="this.checkedName.indexOf('流程定义ID')!=-1"
                >
                  <template slot-scope="scope">
                    <p class="blue" title="点击查看详情" @click="view(scope.row.ID)">{{scope.row.id}}</p>
                  </template>
                </el-table-column>
                <el-table-column
                  label="流程名称"
                  sortable
                  width="140px"
                  prop="name"
                  v-if="this.checkedName.indexOf('流程名称')!=-1"
                ></el-table-column>
                <el-table-column
                  label="流程标识"
                  sortable
                  width="140px"
                  prop="key"
                  v-if="this.checkedName.indexOf('流程标识')!=-1"
                ></el-table-column>
                <el-table-column
                  label="类型"
                  sortable
                  width="140px"
                  prop="category"
                  v-if="this.checkedName.indexOf('类型')!=-1"
                ></el-table-column>
                <el-table-column
                  label="部署id"
                  sortable
                  width="100px"
                  prop="deploymentId"
                  v-if="this.checkedName.indexOf('部署id')!=-1"
                ></el-table-column>
                <el-table-column
                  label="流程图资源"
                  width="220px"
                  prop="diagramResourceName"
                  sortable
                  v-if="this.checkedName.indexOf('流程图资源')!=-1"
                ></el-table-column>
                <el-table-column
                  label="版本"
                  prop="version"
                  sortable
                  v-if="this.checkedName.indexOf('版本')!=-1"
                ></el-table-column>
                <el-table-column
                  label="资源名称"
                  sortable
                  width="200px"
                  prop="resourceName"
                  v-if="this.checkedName.indexOf('资源名称')!=-1"
                ></el-table-column>
              </v-table>
              <!-- 表格 -->
            </el-col>
          </el-row>
        </div>
      </div>
      <flowconfiguration ref="child" @request="requestData"></flowconfiguration>
    </div>
  </div>
</template>

<script>
import Config from "../../config.js";
import vheader from "../common/vheader.vue";
import navs_left from "../common/left_navs/nav_left5.vue";
import navs_tabs from "../common/nav_tabs.vue";
import vTable from "../plugin/table/table.vue";
import flowconfiguration from "../flowDetails/flowconfiguration.vue";

export default {
  name: "task",
  components: {
    vheader,
    navs_left,
    navs_tabs,
    vTable,
    flowconfiguration
  },

  data() {
    return {
      appName: "flowProcess",
      basic_url: Config.dev_url,
      fullHeight: document.documentElement.clientHeight - 210 + "px", //获取浏览器高度
      loadSign: true, //鼠标滚动加载数据
      loading: false, //默认加载数据时显示loading动画
      search: false,
      flowmodelList: [],
      commentArr: {},
      buttons: [],
      checkedName: [
        "流程定义ID",
        "类型",
        "流程标识",
        "流程名称",
        "部署id",
        "流程图资源",
        "版本",
        "资源名称"
      ],
      tableHeader: [
        {
          label: "流程定义ID",
          prop: "id"
        },
        {
          label: "类型",
          prop: "category"
        },
        {
          label: "流程标识",
          prop: "key"
        },
        {
          label: "流程名称",
          prop: "name"
        },
        {
          label: "部署id",
          prop: "deploymentId"
        },
        {
          label: "流程图资源",
          prop: "diagramResourceName"
        },
        {
          label: "版本",
          prop: "version"
        },
        {
          label: "资源名称",
          prop: "resourceName"
        }
      ],
      searchList: {
        // createTime:'',
      },
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      }
    };
  },

  methods: {
    setSelData(val) {
      this.selUser = val;
    },
    //请求点击
    getbtn(item) {
      if (item.name == "流程配置") {
        this.openAddMgr();
      }else if(item.name=="删除"){
        this.delinfo();
      }
    },
    //流程配置
    openAddMgr() {
			if(this.selUser.length == 0) {
				this.$message({
					message: '请您选择数据',
					type: 'warning'
				});
			} else if(this.selUser.length > 1) {
				this.$message({
					message: '不可同选择多个数据',
					type: 'warning'
				});
		  }else {
				var id=this.selUser[0].id;
				this.$refs.child.visible(id);
			}
		},
    //Table默认加载数据
    requestData(opt) {
      this.$refs.table.requestData(opt);
    },
    // 删除
    delinfo() {
      var selData = this.selUser;
      var id=this.selUser[0].deploymentId;
      if(selData.length == 0) {
        this.$message({
          message: '请您选择要删除的数据',
          type: 'warning'
        });
        return;
      } else {
        var url = this.basic_url + '/api-flow/flow/process/'+id;
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({
          value
        }) => {
          this.$axios.delete(url, {}).then((res) => { //.delete 传数据方法
            if(res.data.resp_code == 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.requestData(opt);
            }
          }).catch((err) => {
          });
        }).catch(() => {

        });
      }
    },
    childByValue: function(childValue) {
      this.$refs.navsTabs.showClick(childValue);
      this.getbutton(childValue);
    },
    //请求页面的button接口
    getbutton(childByValue) {
      var data = {
        menuId: childByValue.id,
        roleId: this.$store.state.roleid
      };
      var url =
        this.basic_url +
        "/api-user/permissions/getPermissionByRoleIdAndSecondMenu";
      this.$axios
        .get(url, { params: data })
        .then(res => {
          this.buttons = res.data;
        })
        .catch(wrong => {});
    }
  }
};
</script>

<style>
</style>