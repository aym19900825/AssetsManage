<template>
	<div>
		<div class="mask" v-if="show"></div>
		<div class="mask_div" v-if="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加用户</div>
				<div class="mask_anniu">
					<span class="mask_span"><i class="icon-minimize"></i></span>
					<span class="mask_span mask_max"><i class="icon-maximization"></i></span>
					<span class="mask_span" @click='close'><i class="icon-close1"></i></span>
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
								<input id="test1" class="col-sm-12" name="" value="">
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
								<input id="test1" class="col-sm-12" name="" value="">
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
								<input id="test1" class="col-sm-12" name="" value="">
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
				<button class="btn btn-default">取消</button>
				<button class="btn btn-primarys">提交</button>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'masks',
		data() {
			return {
				show:false,
			}
		},
		methods: {
	    //点击按钮显示弹窗
         childMethods(){
         	this.show = !this.show;
         },
         //点击关闭按钮
         close(){
         	this.show = false;
         }
		}
		
	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>