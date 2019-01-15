<template>
	<div>
		<el-dialog :modal-append-to-body="false" title="数据范围" :visible.sync="dialogVisible" width="30%">
			<el-select v-model="value" placeholder="请选择" @change="valueChange">
    		<el-option v-for="item in options":key="item.value":label="item.label" :value="item.value"></el-option>
  			</el-select>
			<el-tree class="tree" ref="tree" :data="depetData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @check-change="handleCheckChange" @click="getCheckedKeys"  default-expand-all>
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
	import Validators from '../../core/util/validators.js'
	export default {
		 props:["roleIds"],//第一种方式
		name: 'masks',
		data() {
			return {
				options: [{
          			value: '1',
         		    label: '仅本人'
        			}, {
          			value: '2',
          			label: '按明细设置'
        			}],
        		value: '',
				roId: 1,
				basic_url: Config.dev_url,
				depetData: [], //数组，我这里是通过接口获取数据，
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
			visible() {
				this.dialogVisible = true;
			},
			handleCheckChange(data, checked, indeterminate) {
				this.cccData = data;
			},
			getCheckedKeys() {
				console.log(this.$refs.tree.getCheckedKeys());
			},
			valueChange(){
				console.log(this.roleIds);
				if(this.value==2){
				    this.depet(this.roleIds);
					$('.tree').show();
				}else{
					$('.tree').hide();
				}
			},
			
			depet(id) {
				console.log(id);
				this.roId = id;
				var arr = [];
				var url = this.basic_url + '/api-user/depts/getTreeMapByRoleId/'+id;
				this.$axios.get(url, {}).then((res) => {
					console.log(res.data);
					this.depetData = res.data;
					var depetData = res.data
					for(var a = 0; a < depetData.length; a++) {
						if(depetData[a].checked) {
							arr.push(depetData[a].id);
							if(depetData[a].children.length > 0) {
								arr.pop(depetData[a].id)
								for(var b = 0; b < depetData[a].children.length; b++) {
									if(depetData[a].children[b].checked) {
										arr.push(depetData[a].children[b].id);
										if(depetData[a].children[b].children!=null&&depetData[a].children[b].children.length > 0) {
											arr.pop(depetData[a].children[b].id)
											console.log(depetData[a].children[b].children.length);
											for(var c = 0; c < depetData[a].children[b].children.length; c++) {
												if(depetData[a].children[b].children[c].checked) {
													arr.push(depetData[a].children[b].children[c].id);
													if(depetData[a].children[b].children[c].children!=null&&depetData[a].children[b].children[c].children.length > 0) {
														arr.pop(depetData[a].children[b].children[c].id)
														for(var d = 0; d < depetData[a].children[b].children[c].children.length; d++) {
													        if(depetData[a].children[b].children[c].children[d].id) {
															arr.push(depetData[a].children[b].children[c].children[d].id);
													        }
														}
												}
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
			//显示勾选
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
				console.log(deptIds);
				var data = {
					deptids: deptIds,
//					roleid: this.roId,
				}
				var url = this.basic_url + '/api-user/roles/'+this.roId+'/'+this.value;
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
			getdetail(id){
				console.log(id)
				var url = this.basic_url + '/api-user/roles/' + id;
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.value=res.data.datascope;
					if(res.data.datascope==2){
						this.depet(id);
						$('.tree').show();
				}else{
					$('.tree').hide();
				}
				this.dialogVisible = true;
				});
			}
		},
		mounted() {
			console.log(123);
			this.getdetail();
			
		},
	
	}
</script>

<style>

</style>