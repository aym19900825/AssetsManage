<template>
	<div>
		<el-dialog :modal-append-to-body="false" 
			:title="dialogTit" 
			:visible.sync="dialogShow" 
			height="300px" 
			width="80%" 
			:before-close="reset">
			<div>
				<el-form inline-message :model="searchList" label-width="70px">
					<el-row :gutter="10">
						<el-col :span="5">
							<el-form-item label="用户名" prop="username">
								<el-input v-model="searchList.username" @keyup.enter.native="searchinfo"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="姓名" prop="nickname">
								<el-input v-model="searchList.nickname" @keyup.enter.native="searchinfo"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="所属机构" prop="deptName">
								<el-input v-model="searchList.deptName" @keyup.enter.native="searchinfo"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-button type="primary" @click="searchinfo" size="small" style="margin-top:2px">搜索</el-button>
							<el-button type="primary" @click="resetbtn" size="small" style="margin-top:2px;margin-left: 2px">重置</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-table ref="table" :data="list" 
				border 
				stripe 
				height="300px" 
				style="width: 100%;" 
				:default-sort="{prop:'list', order: 'descending'}" 
				@selection-change="selChange"
				@current-change="setSel"
			
				v-loading="loading"
				element-loading-text="加载中…"
				element-loading-spinner="el-icon-loading"
				element-loading-background="rgba(255, 255, 255, 0.9)">

				<el-table-column type="index" label="序号" width="50">
					<template slot-scope="scope">
						<span> {{(page.currentPage-1)*page.pageSize+scope.$index+1}} </span>
					</template>
				</el-table-column>
				<el-table-column type="selection" width="55" fixed align="center">
				</el-table-column>
				<el-table-column label="用户名" sortable width="140px" prop="username">
				</el-table-column>
				<el-table-column label="姓名" sortable width="200px" prop="nickname">
				</el-table-column>
				<el-table-column label="所属机构" sortable width="150px" prop="deptName">
				</el-table-column>
				<el-table-column label="手机号" sortable prop="phone">
				</el-table-column>
				<el-table-column label="录入时间" prop="createTime" width="100px" sortable :formatter="dateFormat">
				</el-table-column>
			</el-table>
			<el-pagination background 
				class="text-right pt10" 
				@size-change="sizeChange" 
				@current-change="currentChange" 
				:current-page="page.currentPage" 
				:page-sizes="[10, 20, 30, 40]" 
				:page-size="page.pageSize" 
				layout="total, sizes, prev, pager, next" 
				:total="page.totalCount">
			</el-pagination>
			<div slot="footer">
				<el-button type="primary" @click="submit">确 定</el-button>
				<el-button @click="reset">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Config from '../../../config.js';
	export default {
		name: 'userList',
		data() {
			return {
				basic_url: Config.dev_url,
				loadSign: true, //鼠标滚动加载数据
				loading: false,//默认加载数据时显示loading动画
				selData: [],//接勾选的值
				page: {
					currentPage: 1,
					pageSize: 20,
					totalCount: 0
				},
				// searchList: {},
				list: [],
				dialogShow: false,
				urlOpt: '',
			    arr:'',
				searchList: {
					username: '',
					nickname: '',
					deptName: '',
				}
			}
		},
		props: ['dialogTit'],
		methods: {
			searchinfo(){
				this.page.currentPage = 1;
				this.requestData(this.urlOpt,this.arr);
			},
			dateFormat(row, column) {
				var date = row[column.property];
				if(date == undefined) {
					return "";
				}
				return this.$moment(date).format("YYYY-MM-DD");
			},
			selChange(val) {
				this.selData = val;
			},
			setSel(row) {
			    this.selUser = [];
			    this.selUser.push(row);
			    this.$refs.table.clearSelection();
				this.$refs.table.toggleRowSelection(row);
		   },
			
			//改变页数
			sizeChange(val) {
				this.page.pageSize = val;
				this.requestData(this.urlOpt);
			},
			//当前页数
			currentChange(val) {
				this.page.currentPage = val;
				this.requestData(this.urlOpt);
			},
			//Table默认加载数据
			requestData(opt,arr) {
				this.loading = true;//加载动画打开
				this.urlOpt = opt;
				this.arr=arr;//用户组已经选的
				var data = {
					page: this.page.currentPage,
					limit: this.page.pageSize,
					username: this.searchList.username,
					nickname: this.searchList.nickname,
					deptName: this.searchList.deptName
				}
				if(this.urlOpt == 'groups'){
					var url = this.basic_url + "/api-user/users?id_not_in="+arr;
				}else{
					var url = this.basic_url + '/api-user/users?deptid_wheres='+this.urlOpt;
				}
				this.$axios.get(url, {
					params: data
				}).then((res) => {
					this.dialogShow = true;
					this.page.totalCount = res.data.count;
					//总的页数
					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
					if(this.page.currentPage >= totalPage) {
						this.loadSign = false
					} else {
						this.loadSign = true
					}
					this.list = res.data.data;
					this.loading = false;//加载动画关闭
					if($('.el-table__body-wrapper table').find('.filing').length>0 && this.page.currentPage < totalPage){
						$('.el-table__body-wrapper table').find('.filing').remove();
					}
				}).catch((wrong) => {})
			},
			submit(){
				if(this.urlOpt == 'groups'){
					if(this.selData.length == 0){
						this.$message({
							message: '请选择数据',
							type: 'warning'
						});
					}else{
						this.dialogShow = false;
						this.$emit('getSelData',this.selData);
						this.reset();
					}
				}
				else {
					if(this.selData.length == 0){
						this.$message({
							message: '请选择数据',
							type: 'warning'
						});
					}else if(this.selData.length > 1){
						this.$message({
							message: '不可同时选择多条数据',
							type: 'warning'
						});
					}else{
						this.dialogShow = false;
						this.$emit('getSelData',this.selData[0]);
						this.reset();
					}
				}
			},
			resetbtn(){
				this.searchList = {
					username: '',
					nickname: '',
					deptName: '',
				};
				this.requestData();
			},
			reset(){//点击确定或取消按钮时重置数据20190303
				this.dialogShow = false;
				this.list = [];
				this.page.currentPage = 1;
				this.page.pageSize = 20;
				this.searchList = {
					username: '',
					nickname: '',
					deptName: '',
				};
			},
			handleClose(done) {
				this.reset();
			}
		},
	}
</script>