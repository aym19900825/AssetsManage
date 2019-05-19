<template>
	<div>
        <el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible" width="60%" title="用户信息">
            <el-form inline-message :model="searchList">
                <el-row :gutter="10">
                    <el-col :span="5">
                        <el-form-item label="用户名" prop="username" label-width="55px">
                            <el-input v-model="searchList.username">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="姓名" prop="nickname" label-width="45px">
                            <el-input v-model="searchList.nickname">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px" >搜索</el-button>
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
                <el-table-column label="编号" width="250" sortable prop="num" >
                </el-table-column>
                <el-table-column label="组名" sortable prop="name"  >
				</el-table-column>
                <el-table-column label="描述" sortable prop="memo" >
				</el-table-column>

				<el-table-column label="所属机构" align="center" sortable prop="deptName" >
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
					pageSize: 20,
					totalCount: 0
				},
				searchList: {
					nickname: '',
					username: '',
				},
			};
		},
		methods: {
            //添加显示弹窗
            searchinfo() {
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.visible();
			},
			visible() {
                var params = {
                    page: this.page.currentPage,
                    limit: this.page.pageSize,
                    deptId: this.searchList.deptId,
                    nickname: this.searchList.nickname,
                    username: this.searchList.username,
                }
                var url = this.basic_url + '/api-flow/flow/group';
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
			},
			currentChange(val) {
				this.page.currentPage = val;
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
					this.$emit('group',this.selUser[0].num);
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
