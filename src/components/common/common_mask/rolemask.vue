<template>
	<div>
        <el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible" width="60%" title="用户信息">
            <el-form inline-message :model="searchList">
                <el-row :gutter="10">
                    <el-col :span="5">
                        <el-form-item label="角色名称" prop="name" label-width="70px">
                            <el-input v-model="searchList.name" @keyup.enter.native="searchinfo">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="是否停用" prop="inactive" label-width="70px">
                            <el-select clearable v-model="searchList.inactive" placeholder="" style="width: 100%;">
                                <el-option v-for="(data,index) in stopoptions" :key="index" :label="data.label" :value="data.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
                        <el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;margin-left: 2px">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>

            <el-table :header-cell-style="rowClass" ref="singleTable"
            :data="userList" line-center border stripe height="360px"
                style="width: 100%;" :default-sort="{prop:'userList', order: 'descending'}"
                @selection-change="SelChange"
                @current-change="setSel"
            v-loading="loading"  
            element-loading-text="加载中…"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.9)">
                <el-table-column type="selection" align="center" width="55" fixed>
                </el-table-column>
                <el-table-column label="角色名称" sortable prop="name">
                    <template slot-scope="scope">
                        <p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.name}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="是否停用" width="100" sortable prop="inactive" :formatter="judge">
                </el-table-column>
                <el-table-column label="备注" sortable prop="tips">
                </el-table-column>
                <el-table-column label="机构" width="150" sortable prop="deptName">
                </el-table-column>
                <el-table-column label="录入人" width="100" sortable prop="createbyName">
                </el-table-column>
                <el-table-column label="录入时间" width="100" sortable prop="createTime" :formatter="dateFormat">
                </el-table-column>
                <el-table-column label="修改时间" width="100" sortable prop="updateTime" :formatter="dateFormat">
                </el-table-column>
            </el-table>

            <el-pagination background class="text-right pt10" @size-change="sizeChange" @current-change="currentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next" :total="page.totalCount">
            </el-pagination>

            <div slot="footer">
                <el-button type="primary" @click="dailogconfirm" >确 定</el-button>
                <el-button @click="resetBasisInfo">取 消</el-button>
        </div>
        </el-dialog>    
    </div>
</template>
<script>
	import Config from '../../../config.js'
	export default {
		name: 'masks',
		data() {
			return {
				basic_url: Config.dev_url,
                dialogVisible:false,
                userList:[],//用户列表
                loading: false,
                page: {
					currentPage: 1,
					pageSize: 10,
					totalCount: 0
				},
				searchList: {
					name: '',
					inactive: '',
                },
                stopoptions: [{
					value: "1",
					label: '是'
				}, {
					value: "2",
					label: '否'
				}],
			};
		},
		methods: {
            //添加显示弹窗
            searchinfo() {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.visible();
            },
            judge(data) {//是否停用
              return data.inactive=="1" ? '是' : '否'
            },
			visible() {
                var params = {
                    page: this.page.currentPage,
                    limit: this.page.pageSize,
                    deptId: this.searchList.deptId,
                    nickname: this.searchList.nickname,
                    username: this.searchList.username,
                }
                var url = this.basic_url + '/api-user/roles';
                    this.$axios.get(url, {params: params}).then((res) => {
					this.page.totalCount = res.data.count;//页码赋值	
                    this.userList = res.data.data;
                    this.dialogVisible=true;
                    }).catch((err) => {
                    });
			},
			SelChange(val) {
				this.selUser = val;
			},
            resetBasisInfo(){//点击确定或取消按钮时重置数据20190303
				this.dialogVisible = false;//关闭弹出框
				this.userList = [];//列表数据置空
				this.page.currentPage = 1;//页码重新传值
				this.page.pageSize = 10;//页码重新传值
            },
            sizeChange(val) {
				this.page.pageSize = val;
				this.visible();
			},
			currentChange(val) {
				this.page.currentPage = val;
				this.visible();
            },
            //表头居中
			rowClass({ row, rowIndex}) {
			    return 'text-align:center'
			},
            dailogconfirm() { //选择人员确定按钮
				if(this.selUser.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'warning'
					});
				}else if(this.selUser.length > 1){
					this.$message({
						message: '不可同时选择多条数据',
						type: 'warning'
					});
				}else{
					// this.dialogVisible = false;
					this.resetBasisInfo();//调用resetBasisInfo函数
					this.$emit('role',this.selUser[0].name);
				}
            },
            setSel(row) {
                this.selUser = [];
                this.selUser.push(row);
                this.$refs.singleTable.clearSelection();
                this.$refs.singleTable.toggleRowSelection(row);
            },
			//点击关闭按钮
			close() {
				this.dialogVisible = false;
			},
			toggle(e) {
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			maxDialog(e) { //定义大弹出框一个默认大小
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);
				$(".mask_div").css("top", "60px");
				$(".mask_divbg").css("top", "0px");
			},
			//还原按钮
			rebackDialog() { //大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "90%");
				$(".mask_div").css("top", "0px");
				$(".mask_divbg").css("top", "100px");
			},
			
			
		},
		mounted() {

		},
		
	}
</script>
