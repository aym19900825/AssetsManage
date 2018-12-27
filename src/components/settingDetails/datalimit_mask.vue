<template>
	<div>
		<el-dialog title="数据范围" :visible.sync="dialogVisible" width="30%">
			<el-tree ref="tree" :data="depetData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @check-change="handleCheckChange" @click="getCheckedKeys">
			</el-tree>
			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="determine();" >确 定</el-button>
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
					label: "fullname"
				},
			}

		},
		methods: {
			//			handleCheckChange(data, checked, indeterminate) {
			//				this.cccData = data;
			//			},
			getCheckedKeys() {
				console.log(this.$refs.tree.getCheckedKeys());
			},
			depet(id) {
				this.roId = id;
				var arr = [];
				var url = this.basic_url + '/api-user/depts/treeMap';
				this.$axios.get(url, {}).then((res) => {
					console.log(res.data);
					this.depetData = res.data;
					var depetData = res.data
					for(var a = 0; a < depetData.length; a++) {
						if(depetData[a].checked) {
							//							arr.push(menuData[a].id);
							if(depetData[a].children.length > 0) {
								var depetDataChild = depetData[a].children //2
								for(var b = 0; b < depetData[a].children.length; b++) {
									console.log(depetData[a].children.length);
									if(depetData[a].children[b].checked) {
										arr.push(depetData[a].children[b].id);
										if(depetData[a].children[b].children.length > 0) {
											for(var c = 0; c < depetData[a].children[b].children.length; c++) {
												if(depetData[a].children[b].children[c].checked) {
													arr.push(depetData[a].children[b].children[c].id);
												}
											}
										}
									}
								}
							}
						}
					}
					this.$nextTick(() => {
						this.setChecked(arr);
					});
					this.dialogVisible = true;
				}).catch((err) => {
					this.$message({
						message: '网络错误，请重试',
						type: 'error'
					});
				});
			},
			setChecked(arr) {
				this.$refs.tree.setCheckedKeys(arr);
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
			determine() { //确定
				var permissionIds = [];
				var deptIds = [];
				var permission = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
				var menu = this.$refs.tree.getHalfCheckedNodes();
				console.log(menu); //父的
				console.log(permission); //勾選的子
				for(var j = 0; j < menu.length; j++) {
					deptIds.push(menu[j].id);
				}
				for(var i = 0; i < permission.length; i++) {
					deptIds.push(permission[i].id);
				}
				var data = {
					deptIds: deptIds,
					roleid: this.roId,
				}
				var url = this.basic_url + '/api-user/depts/dataScopeSave'
				this.$axios.post(url, data).then((res) => {
					console.log(res);
					if(res.data.resp_code == 0) {
						this.$message({
							message: '操作成功',
							type: 'success'
						});
					}
					this.dialogVisible = false;
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