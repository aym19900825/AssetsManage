<template>
<div>
	<div class="headerbg">
		<vheader></vheader>
		<navs_tabs ref="navsTabs"></navs_tabs>
	</div>
	<div class="contentbg">
		<div  class="navbar-default navbar-static-side scrollbar">
            <div class="navbarbg">
                <span class="navbar-minimalize minimalize-styl-2">
                    <i class="icon-menu1"></i> 
                </span>
            </div>
            <ul class="navs" id="side-menu" v-show="!isShow" >
                <li>
                    <router-link :to="{path:'/unicom/assetCount'}">
                        <i class="icon-file-text"></i>
                        <span class="nav-label">设备台账</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/unicom/assetCount'}">
                        <i class="icon-file-text"></i>
                        <span class="nav-label">服务目录</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/unicom/assetCount'}">
                        <i class="icon-file-text"></i>
                        <span class="nav-label">工单</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div>
            <router-view></router-view>
        </div>
	</div>
</div>
</template>
<script>
    import Config from '@/config.js'
	import vheader from '@/components/common/vheader.vue'
	import navs_left from '@/components/common/left_navs/nav_left5.vue'
    import navs_tabs from '@/components/common/nav_tabs.vue'
	export default {
		name: 'nav',
		components: {
			'vheader': vheader,
			'navs_left': navs_left,
			'navs_tabs': navs_tabs,
		},
		data() {
			return {

            }
		},
		methods: {
			childByValue:function(childValue) {
                this.$refs.navsTabs.showClick(childValue);
            },
		}
	}
</script>