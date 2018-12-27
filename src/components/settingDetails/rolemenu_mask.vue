<template>
	<div>
		<el-dialog title="权限配置" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="menuData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @check-change="handleCheckChange" @click="getCheckedKeys">
			</el-tree>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="queding();" >确 定</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'masks',
		data() {
			return {
				roId: 1,
				basic_url: Config.dev_url,
				menuData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				dialogVisible: false, //对话框
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "children",
					label: "name"
				},
			}

		},
		methods: {
			handleCheckChange(data, checked, indeterminate) {
				this.cccData = data;
			},
			getCheckedKeys() {
				console.log(this.$refs.tree.getCheckedKeys());
			},
			menu(id) {
				var _this = this;
				this.roId=id;
				var arr = [];
				var url = this.basic_url + '/api-user/menus/' + id + '/menus';
				this.$axios.get(url, {}).then((res) => {
					this.menuData = res.data;
					var menuData = res.data;
					for(var a = 0; a < menuData.length; a++) {
						if(menuData[a].checked == true) {
							arr.push(menuData[a].id);
						}
						if(menuData[a].children.length > 0) {
							for(var b = 0; b < menuData[a].children.length; b++) {
								if(menuData[a].children[b].checked == true) {
									arr.push(menuData[a].children[b].id);
									if(menuData[a].children[b].children.length > 0) {
										for(var c = 0; c < menuData[a].children[b].length; c++) {
											if(menuData[a].children[b].children[c].checked == true) {
												arr.push(menuData[a].children[b].children[c].id);
											}
										}
									}

								}
							}
						}

					}
					setTimeout(function(){
						if(arr.length>0){
							_this.$refs.tree.setCheckedKeys(arr); //获取已经设置的资源后渲染	
						}
					},0);
					this.dialogVisible = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			getCheckedAll() {

				return this.flatState.filter(function(e) {
					if(e.node.indeterminate) {
						return e.node.indeterminate
					}
					return e.node.checked
				}).map(function(e) {
					return e.node
				})
			},
			queding() {
				console.log(this.roId);
				var permissionIds = [];
				var menuIds = [];
				var permission = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
				var menu = this.$refs.tree.getHalfCheckedNodes();
				console.log(this.$refs.tree.getCheckedKeys().concat(menuIds));
				console.log(this.$refs.tree.getCheckedKeys());
				console.log(menu); //父的
				console.log(permission); //勾選的子
				for(var j = 0; j < menu.length; j++) {
					if(menu[j].type == "menu") {
						menuIds.push(menu[j].id);
					}
				}
				for(var i = 0; i < permission.length; i++) {
					if(permission[i].type == "permission") {
						permissionIds.push(permission[i].id);
					}
					if(permission[i].type == "menu") {
						menuIds.push(permission[i].id);
					}

				}
				var data = {
					menuIds: menuIds,
					permissionIds: permissionIds,
					roleId: this.roId,
				}
				var url = this.basic_url + '/api-user/menus/granted'
				this.$axios.post(url, data).then((res) => {
					if(res.data.resp_code == 0) {
					this.$message({
						message: '操作成功',
						type: 'success'
					});
				}
					this.dialogVisible = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},

		}
	}
</script>

<style>

</style>