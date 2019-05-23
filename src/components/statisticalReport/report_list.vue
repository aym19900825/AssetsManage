<template>
	<div>
		<div class="headerbg">
			<vheader></vheader>
			<navs_tabs></navs_tabs>
		</div>
		<div class="contentbg">
			<!--左侧菜单调用 Begin-->
			<navs_left></navs_left>
			<!--左侧菜单调用 End-->

			<!--右侧内容显示 Begin-->
			<div class="wrapper wrapper-content">
				<el-row :gutter="10">
					<el-col :span="24">
						<el-form inline-message :model="dataInfo" ref="dataInfo" label-width="110px" v-if="formshow">
                        <!-- 报表信息 -->
                        <el-row>
                          <el-col :span="9" v-for="(item,index) in pramList" :key="index" v-show="item.label!=''" >
                            <!--必填情况-->
                            <el-form-item :label="item.label" :prop="item.param" v-if="item.required==1" :rules="{required: true, message: '请填写', trigger: 'blur'}">
                              <el-input v-model="dataInfo[item.param]" v-show="item.type!='1'&&item.type!='4'&&item.type!='3'"></el-input>

                              <el-date-picker v-model="dataInfo[item.param]" v-show="item.type=='1'" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>

                              <el-date-picker v-model="dataInfo[item.param]" v-show="item.type=='7'" type="year" placeholder="选择年"></el-date-picker>

                              <el-input v-model="dataInfo[item.param]" v-show="item.type=='3'" :disabled="true">
                                <el-button slot="append" :disabled="noedit" icon="el-icon-search"  @click="requestData(item)"></el-button>
                              </el-input>
                              
                              <el-input v-model="dataInfo[item.param]" v-show="item.type=='4'&&item.add=='1'" :disabled="true">
                                <el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="getDept(item)"></el-button>
                              </el-input>

                              

                              <el-select v-model="dataInfo[item.param]" placeholder="请选择">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>

                            </el-form-item>
                            <!--非必填情况-->
                            <el-form-item :label="item.label" :prop="item.param" v-else>
                              <el-input v-model="dataInfo[item.param]" v-show="item.type!='1'&&item.type!='4'&&item.type!='3'&&item.type!='7'&&item.type!='6'&&item.type!='9'&&item.type!='8'&&item.type!='10'&&item.type!='11'"></el-input> 

                              <el-date-picker v-model="dataInfo[item.param]" v-show="item.type=='1'" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>

                              <el-date-picker v-model="dataInfo[item.param]" v-show="item.type=='7'" type="year" placeholder="选择年" style="width:100%;"></el-date-picker>

                              <el-input v-model="dataInfo[item.param]" v-show="item.type=='3'" :disabled="true">
                                <el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="requestData(item)"></el-button>
                              </el-input>

                              <el-input v-model="dataInfo[item.param]" v-show="item.type=='4'&&item.add=='1'" :disabled="true">
                                <el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="getDept(item)"></el-button>
                              </el-input>

                              <el-input v-model="dataInfo[item.param]" v-show="item.type=='10'" :disabled="true">
                                <el-button slot="append" :disabled="noedit" icon="el-icon-search" @click="addAsset(item)"></el-button>
                              </el-input>

                              <el-select v-model="dataInfo[item.param]" v-show="item.type=='6'" placeholder="请选择" style="width:100%;">
                                <el-option
                                  v-for="item in options"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.code">
                                </el-option>
                              </el-select>

                              <el-select v-model="dataInfo[item.param]" v-show="item.type=='9'" placeholder="请选择" style="width:100%;">
                                <el-option
                                  v-for="item in pm_typeoption"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.code">
                                </el-option>
                              </el-select>

                              <el-select v-model="dataInfo[item.param]" v-show="item.type=='8'" placeholder="请选择" style="width:100%;">
                                <el-option
                                  v-for="item in Execution_status"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.code">
                                </el-option>
                              </el-select>
                              <!-- 设备状态 -->
                              <el-select v-model="dataInfo[item.param]" v-show="item.type=='11'" placeholder="请选择" style="width:100%;">
                                <el-option
                                  v-for="item in stateoptions"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.code">
                                </el-option>
                              </el-select>

                            </el-form-item>
                          </el-col>
                          <el-col :span="3" class="text-center">
                            <el-button type="primary" size="small" @click="determine">搜索</el-button>
                            <el-button type="primary" @click="reportreset" size="small" style="margin-top:2px; margin-left: 2px">重置</el-button>
                          </el-col>
                        </el-row>

                      </el-form>
						<iframe :src="url" id="flowIframe" width="100%" :height="fullHeight"  frameborder="0" scrolling="no" >
				   		</iframe>
				   	</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import vheader from '../common/vheader.vue'
	import navs_left from '../common/left_navs/nav_left5.vue'
	import navs_tabs from '../common/nav_tabs.vue'
	export default {
		name: 'dept_management',
		components: {
			'vheader': vheader,
			'navs_tabs': navs_tabs,
			'navs_left': navs_left,
		},
		data() {
			return {
				loading: false,
				basic_url: Config.dev_url,
				companyId: '',
				deptId: '',
				selDept: [],
				page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				total:0,
				deptList: [],
				selMenu:[],
				search: false,
				show: false,
				down: true,
				up: false,
				fullHeight: document.documentElement.clientHeight - 210+'px',//获取浏览器高度
				searchDept: {//高级查询
					simplename:'',
					fullname:''
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				treeData: [],
				selData: [],
				adddeptForm: {},//修改子组件时传递数据
				url:'',
			}
		},
		methods: {
			//表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
			//清空
			reset(){
				this.adddeptForm = {
						"version":'1',
						"status":'活动',
						"step":'',
						"code":'',
						"fullname":'',
						"parent":'',
						"org_range":'2',
						"type":'',
						"inactive":'否',
						"address":'',
						"zipcode":'',
						"leader":'',
						"telephone":'',
						"fax":'',
						"email":'',
						"tips":'',
						"pid":'',
						"enterby":'',
						"enterdate":'',
						"changeby":'',
						"changedate":''
					};
			},
			changeCheckedName(value){
				this.checkedName=value
				let str=value.toString()
				for(let i=0;i<this.columns.length;i++){
					if(str.indexOf(this.columns[i].text) != -1){
						this.columns[i].isShow=true
					}else{
						this.columns[i].isShow=false
					}
				}
			},
			//表格传过来
			childByValue: function (childValue) {
		        // childValue就是子组件传过来的
		        this.selMenu = childValue
		    },
			tableControle(data){//控制表格列显示隐藏
			  this.checkedName = data;
			},
			sizeChange(val) {//分页，总页数
		      this.page.pageSize = val;
		      this.requestData();
		    },
		    currentChange(val) {//分页，当前页
		      this.page.currentPage = val;
		      this.requestData();
		    },
			currentTree(val){
			},
			//分页功能
			aTable(val){ 
				this.page = val; 
				this.requestData();
			}, 
			searchinfo(index) {//高级查询
				var data = {
					params: {
						page: 1,
						limit: 10,
						simplename: this.searchDept.simplename,
						fullname: this.searchDept.fullname
					}
				};
				var url = this.basic_url + '/api-user/depts';
				this.$axios.get(url, data).then((res) => {
					this.deptList = res.data.data;
				}).catch((wrong) => {

				})
			},
			resetbtn(){
				this.searchDept = {//高级查询
					simplename:'',
					fullname:''
				};
				this.requestData();
			},
			//添加
			openAddMgr() {
				this.reset();
				this.$refs.child.visible();
			},
			//修改
			modify() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要修改的机构',
						type: 'warning'
					});
					return;
				} else if(selData.length > 1) {
					this.$message({
						message: '不可同时修改多个机构',
						type: 'warning'
					});
					return;
				} else {
					this.adddeptForm = this.selMenu[0]; 
					console.log(this.adddeptForm);
					this.$refs.child.detail();
				}
			},
			//高级查询
			modestsearch() {
				this.search = !this.search;
				this.down = !this.down,
				this.up = !this.up
			},
			// 删除
			deluserinfo() {
				var selData = this.selMenu;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的机构',
						type: 'warning'
					});
					return;
				} else {
					var changeMenu = selData[0];
					if(changeMenu.children!=null && typeof(changeMenu.children)!='undefined' && changeMenu.children.length>0){
						this.$message({
							message: '先删除子机构',
							type: 'error'
						});
					}else {
					var url = this.basic_url + '/api-user/depts/deletes';
					var deleteid = [];
					var ids;
					for(var i = 0; i < selData.length; i++) {
						deleteid.push(selData[i].id);
					}
					//ids为deleteid数组用逗号拼接的字符串
					ids = deleteid.toString(',');
					var data = {
						ids: ids,
					}
					this.$confirm('确定删除此数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						this.$axios.delete(url, {
							params: data
						}).then((res) => { //.delete 传数据方法
							//resp_code == 0是后台返回的请求成功的信息
							if(res.data.resp_code == 0) {
								this.$message({
									message: '删除成功',
									type: 'success'
								});
								this.requestData();
							}
						}).catch((err) => {
						});
					}).catch(() => {

					});
					}
				}
			},
			
			//时间格式化  
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			SelChange(val) {
				this.selDept = val;
			},

			requestData() {//高级查询字段
				this.loading = true;
				var url = this.basic_url + '/api-user/depts/treeMap';
				this.$axios.get(url, {}).then((res) => {
					
					let result=res.data
					for(let i=0;i<result.length;i++){
						if(typeof(result[i].subDepts)!="undefined"&&result[i].subDepts.length>0){
							let subDepts=result[i].subDepts;
							result[i].children=subDepts;
						}	
					}
					this.deptList = result;
					this.loading = false;
//					this.page.totalCount = res.data.count;
				}).catch((wrong) => {})
			},
			//机构树
			getKey() {
				let that = this;
				var url = this.basic_url + '/api-user/depts/tree';
				this.$axios.get(url, {}).then((res) => {
					this.resourceData = res.data;
					this.treeData = this.transformTree(this.resourceData);
				});
			},
			transformTree(data){//给树菜单添加图标
				for(var i=0; i<data.length; i++){
					data[i].name = data[i].fullname;
					if(!data[i].pid || $.isArray(data[i].subDepts)){
						data[i].iconClass = 'icon-file-normal';
					}else{
						data[i].iconClass = 'icon-file-text';
					}
					if($.isArray(data[i].subDepts)){
						data[i].children = this.transformTree(data[i].subDepts);
					}
				}
				return data;
			},
			getTreeId(data){
				if(data.type == '1'){
					this.companyId = data.id;
					this.deptId = '';
				}else{
					this.deptId = data.id;
					this.companyId = '';
				}
				this.requestData();
			},
			handleNodeClick(data) {
			},
			formatter(row, column) {
				return row.enabled;
			}
		},
		mounted() {
			this.$nextTick(function(){
				var url=this.basic_url;
				url = url.substring(0,21);
				var pos = url.lastIndexOf(':');
				url=url.substring(0,pos+1); 
				this.url=url+"8800/jobinfo";
			})
		},
		created(){
		   	
}
	}
</script>

<style scoped>
	
</style>