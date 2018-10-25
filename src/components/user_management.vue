<template>
	<div>
		<vheader></vheader>
		<navs_header></navs_header>
		<navs></navs>
		<div class="wrapper wrapper-content">
			<div class="ibox-content">
				<navs_button></navs_button>
				<div class="row">
					
					<div class="col-sm-3">
						<ztree></ztree>
					</div>
					<div class="col-sm-9">
						<tablediv></tablediv>
					</div>
				</div>
			</div>
		</div>
	    <usermask></usermask>
	</div>	
		
		
	
	
</template>

<script>
import vheader from './common/vheader.vue'
import navs from './common/left_navs/nav_left.vue'
import navs_header from './common/nav_tabs.vue'
import navs_button from './common/func_btn.vue'
import ztree from './common/ztree.vue'
import tablediv from './common/tablelist.vue'
import usermask from './common/user_mask.vue'
export default {
    name: 'user_management',
    components: {
      vheader,
      navs_header,
      navs,
      navs_button,
      ztree,
      tablediv,
      usermask
    },
    created: function () {
     
    }
  }
</script>

<style scoped>
 	
.wrapper {
   	margin-left:220px;
   	background-color: #F5F8FB;
    height: 100%;
}
.ibox-content {
    background-color: #F5F8FB;
    color: inherit;
    padding: 0px 20px 20px 10px;
    border-color: #e7eaec;
    -webkit-border-image: none;
    -o-border-image: none;
    border-image: none;
    border-style: solid solid none;
    border-width: 1px 0px;
    }
    
    
</style>