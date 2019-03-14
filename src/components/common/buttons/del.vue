<template>
	<button :key='delBtn.id' :class="'btn mr5 '+ delBtn.style"  @click="del">
		<i :class="delBtn.icon"></i>{{delBtn.name}}
	</button>
</template>
<script>
	import Config from '../../config.js'
	export default {
		name: 'del',
		props: {
			//是否有权限操作此按钮
			isAuth: {
                type: Boolean,
                default: false
			},
			//
			
		},
		data() {
			return {
				basic_url: Config.dev_url,
			}
		},
		methods: {
			//删除数据
			del(){

			},
			//删除多条数据
			delMore(){

			},
			//删除单条数据
			delSingle(){
				var selData = this.selUser;
				if(selData.length == 0) {
					this.$message({
						message: '请您选择要删除的数据',
						type: 'warning'
					});
					return;
				} else {
					var url = this.basic_url + '/api-apps/app/productType/deletes';
					var changeUser = selData;
					var deleteid = [];
					var ids;
					for(var i = 0; i < changeUser.length; i++) {
						deleteid.push(changeUser[i].ID);
					}
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
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
					}).catch(() => {

					});
				}
			},
		},
		mounted(){
			
		},
	}
</script>

<style scoped>

</style>