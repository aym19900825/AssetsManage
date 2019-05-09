<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_divbg" v-if="show">
			<div class="mask_div">
				<div class="mask_title_div clearfix">
					<div class="mask_title">流程配置</div>
					<div class="mask_anniu">
						<span class="mask_span" @click="close">
							<i class="icon-close1"></i>
						</span>
					</div>
				</div>
				<div class="mask_content pt10 pl10 pr10 pb10">
					<el-tabs v-model="activeName" >
                        <el-tab-pane v-for="(title,index) in bigtitle" :key="index" :label="bigtitle[index].nodeName" name="first">
                        </el-tab-pane>  
                    </el-tabs>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Config from '../../config.js'
	import iframemask from '../flowDetails/ifram.vue'
	export default {
		name: 'masks',
		components: {
			iframemask
		},
		data() {
			return {
				falg:false,//保存验证需要的
				basic_url: Config.dev_url,
				show:false,
                selUser: [],
                bigtitle:[],//保存节点数据
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
                modelId:'',
                activeName: 'first'
			};
		},
		methods: {
			//添加显示弹窗
			visible(id) {
                this.show = true;
                var url = this.basic_url + '/api-flow/flow/process/'+id;
                    this.$axios.get(url, {}).then((res) => {
                        for(var i=0;i<res.data.candidateList.length;i++){
                             res.data.candidateList[i].name=i;   
                        }
                        this.bigtitle=res.data.candidateList;
                        console.log(this.bigtitle);
                    }).catch((err) => {
                    });
			},
			//点击关闭按钮
			close() {
				this.show = false;
				this.$emit('request');
			},
			open(){
				this.show = true;
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
			// 保存users/saveOrUpdate
			save() {
				this.$refs.modelflow.validate((valid) => {
					if (valid) {
					   var url = this.basic_url + '/api-flow/flow/model/create';
						this.$axios.get(url, {}).then((res) => {
							this.modelId=res.data.modelId;
							
							if(res.status ==200) {
     						this.$refs.child.visible();
							}
						}).catch((err) => {
						});
					} else {
						this.show = false;
						return false;
					}
				});
			},
			
			//保存
			saveAndUpdate() {
				this.save();
//				if(this.falg){
//					this.show = false;
//				}
			},
			//保存并继续
			saveAndSubmit() {
				this.save();
				this.show = true;
			},
			
		},
		mounted() {
			
		},
		
	}
</script>

<style>
	@import '../../assets/css/mask-modules.css';
</style>