<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加用户</div>
				<div class="mask_anniu">
					<span class="mask_span">
						<i class="icon-minimize"></i>
					</span>
					<!--icon-maximization,icon-restore-->
					<span class="mask_span mask_max" @click='toggle'>
						 <!--v-bind:class="{ active: isActive, 'text-danger': hasError }">-->
						 
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
						<!--<i v-if="ok2" class="icon-restore"></i>-->
					</span>
					<span class="mask_span" @click='close'>
						<i class="icon-close1"></i>
					</span>
				</div>
			</div>
			<div class="accordion" id="information">
				<div class="mask_tab-block">
					<div class="mask_tab-head clearfix">
						<div class="accordion_title">
							<span class="accordion-toggle">基本信息</span>
						</div>
						<div class="col_but">
							<i class="icon-arrow1-down"></i>
						</div>
					</div>
					<div class="accordion-body tab-content " id="tab-content2">
						<div class="row control-label">
							<div class="col-sm-12">
								<label for="">所属组织</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>
						</div>
						<div class="row control-label">
							<div class="col-sm-6">
								<label for="">人员姓名</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>

							<div class="col-sm-6">
								<label for="">排序号</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>
						</div>
						<div class="row control-label">
							<div class="col-sm-6">
								<label for="">人员姓名</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>
							<div class="col-sm-6">
								<label for="">排序号</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>
						</div>
						<div class="row control-label">
							<div class="col-sm-6">
								<label for="">登录名称</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>
							<div class="col-sm-6">
								<label for=""><font color="red">*</font>登录口令</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>
						</div>
						<div class="row control-label">
							<div class="col-sm-6 editor-radio-group">
								<label for="">配置状态</label>

								<!--<span>
									<input id="pzzt01" name="pzzt" type="radio" value="否">
									<label for="pzzt01">否</label>
								</span>
							<span>
									<input id="pzzt02" name="pzzt" type="radio" value="是">
									<label for="pzzt02">是</label>
								</span>-->

							</div>
							<div class="col-sm-6 editor-radio-group">
								<label for="">登录方式</label>
								<!--<span>
									<input id="" name="" type="checkbox" value="">
									<label for="">口令登录</label>
								</span>
								<span>
									<input id="" name="" type="checkbox" value="">
									<label for="">Ukey</label>
								</span>
								<span>
									<input id="" name="" type="checkbox" value="">
									<label for="">数字登录</label>
								</span>-->
							</div>

						</div>

					</div>
				</div>
			</div>

			<div class="accordion" id="information">
				<div class="mask_tab-block">
					<div class="mask_tab-head clearfix">
						<div class="accordion_title">
							<span class="accordion-toggle">用户基本资料</span>
						</div>
						<div class="col_but">
							<i class="icon-arrow1-down"></i>
						</div>
					</div>
					<div class="accordion-body in collapse tab-content " id="tab-content2">

						<div class="row control-label">
							<div class="col-sm-4">
								<label for="">用户称谓</label>
								<input id="" class="col-sm-12" name="" maxlength="200" type="text" value="">
							</div>

							<div class="col-sm-4">
								<label for="">出生日期</label>
				<input id="test1" class="col-sm-12" name="" maxlength="200" type="text" value="">

							</div>

							<div class="col-sm-4">
								<label for="">排序号</label>
								<input id="" class="col-sm-12" name="" maxlength="200" type="text" value="">
							</div>
						</div>

						<div class="row control-label">
							<div class="col-sm-4">
								<label for="">工号</label>
								<input id="" class="col-sm-12" name="" maxlength="200" type="text" value="">
							</div>

							<div class="col-sm-4">
								<label for="">入职日期</label>
								<input id="test1" class="col-sm-12" name="" maxlength="200" type="text" value="">

							</div>

							<div class="col-sm-4">
								<label for="">身份证号</label>
								<input id="" class="col-sm-12" name="" maxlength="200" type="text" value="">
							</div>
						</div>

						<div class="row control-label">
							<div class="col-sm-4">
								<label for="">默认身份</label>
								<input id="" class="col-sm-12" name="" maxlength="200" type="text" value="">
							</div>

							<div class="col-sm-4">
								<label for="">参加工作时间</label>
								<input id="test1" class="col-sm-12" maxlength="200" type="text" name="" value="">

							</div>

							<div class="col-sm-4">
								<label for="">电子邮箱</label>
								<input id="" class="col-sm-12" name="" maxlength="200" type="text" value="">
							</div>
						</div>

						<div class="row control-label">
							<div class="col-sm-4">
								<label for="">联系电话</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>

							<div class="col-sm-4">
								<label for="">手机号</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>

							<div class="col-sm-4">
								<label for="">传真号</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>
						</div>

						<div class="row control-label">
							<div class="col-sm-8">
								<label for="">地址</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>

							<div class="col-sm-4">
								<label for=""><font color="red">*</font>邮编</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>
						</div>
						<div class="row control-label">
							<div class="col-sm-12">
								<label for="">备注</label>
								<input id="" name="" maxlength="200" class="col-sm-12" type="text" value="">
							</div>
						</div>

					</div>

				</div>
			</div>
			<!--底部-->
			<div class="content-footer">
				<button class="btn btn-default btn-large">取消</button>
				<button class="btn btn-primarys btn-large">提交</button>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'masks',
		data() {
			return {
				show: false,
				isok1:true,
				isok2:false
			}
		},
		methods: {
			//点击按钮显示弹窗
			childMethods() {
				this.show = !this.show;
			},
			//点击关闭按钮
			close() {
				this.show = false;
			},
			toggle(e) {
			    if(this.isok1==true){
			    	this.maxDialog();
			    	console.log(111);
			    }else{
			    	console.log(1122);
				this.rebackDialog();
				}
			},
		    maxDialog(e) {
		    	this.isok1=false;
				this.isok2=true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);
				$(".mask_div").css("margin", "0%");
				$(".mask_div").css("top", "60px");

				
			},
			//还原按钮
			rebackDialog() {
				this.isok1=true;
				this.isok2=false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("margin", "7% 10%");
				$(".mask_div").css("top", "0");
				

			}
			
		}

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>