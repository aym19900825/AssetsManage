<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="权限配置" :visible.sync="dialogVisible" width="30%"  >
			<div class="scrollbar" style="max-height: 400px;">
				<el-tree ref="tree" :data="menuData" show-checkbox node-key="id"  :props="resourceProps" @check-change="handleCheckChange" @click="getCheckedKeys" default-expand-all>
				</el-tree>
				<div slot="footer" class="el-dialog__footer">
			       <el-button type="primary" @click="queding();" >确 定</el-button>
			       <el-button @click="dialogVisible = false">取 消</el-button>
			    </div>
			</div>
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
				console.log(id);
				var _this = this;
				this.roId=id;	
				var arr=[];	
				var url = this.basic_url + '/api-user/menus/' + id + '/menus';
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.menuData = res.data;
					// var menuData = res.data;//第一级
					// for(var a = 0; a < menuData.length; a++){
					// 	if(menuData[a].checked) {
					// 		arr.push(menuData[a].id);
					// 		if(menuData[a].children.length>0){
					// 			arr.pop(menuData[a].id)
					// 			var menuDataChild=menuData[a].children//2
					// 			for(var b=0;b<menuData[a].children.length;b++){
					// 				console.log(menuData[a].children.length);
					// 				if(menuData[a].children[b].checked) {
					// 					arr.push(menuData[a].children[b].id);
					// 					if(menuData[a].children[b].children.length > 0) {
					// 						arr.pop(menuData[a].children[b].id)
					// 						for(var c=0;c<menuData[a].children[b].children.length;c++){
					// 							if(menuData[a].children[b].children[c].checked) {
					// 								arr.push(menuData[a].children[b].children[c].id);
					// 							}
					// 						}
					// 					}
					// 				}
					// 			}
					// 		}
					// 	}
					// }
					
				this.recursive(res.data,arr);
				this.$nextTick(() => {
					console.log(arr);
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
			recursive(mData,arr){
				console.log(mData);
				for(var a = 0; a < mData.length; a++){
						if(mData[a].checked){
							arr.push(mData[a].id);							
						}
						if(mData[a].children!=undefined){
						this.recursive(mData[a].children,arr);
						}else{
						this.recursive(mData[a],arr);

						}
				}
			return mData;
			
			},

			setChecked(arr){
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