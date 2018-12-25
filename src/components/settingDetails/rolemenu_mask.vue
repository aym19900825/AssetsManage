<template>
	<div>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-tree ref="tree" :data="menuData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps"   @check-change="handleCheckChange">
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
			return{
				basic_url: Config.dev_url,
				menuData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				dialogVisible: false, //对话框
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
			}
			
		},
		methods:{
			handleCheckChange(data, checked, indeterminate) {
		        this.cccData=data;
		    },
		     
			menu(id){
				console.log(123);
				var url = this.basic_url + '/api-user/menus/'+id+'/menus';
				this.$axios.get(url, {}).then((res) => {
					console.log(res);
					this.menuData = res.data;
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
			}
		}
	}
</script>

<style>
</style>