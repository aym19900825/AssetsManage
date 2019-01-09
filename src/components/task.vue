<template>
<div>
		<div class="headerbg">
			<vheader ></vheader>
			<navs_header ref='navsheader'></navs_header>	
		</div>
		
</div>
</template>

<script>
import Config from '../config.js'
import vheader from './common/vheader.vue'
import navs_header from './common/nav_tabs.vue'

export default {
	name: 'task',
		components: {
			vheader,
			navs_header,
		},

    data() {
      return {
      	basic_url: Config.dev_url,
      }
    },
  
	methods: {
		requestData() {
//				var data = {
//					page: this.page.currentPage,
//					limit: this.page.pageSize,
//					PRO_NUM: this.searchList.PRO_NUM,
//					PRO_NAME: this.searchList.PRO_NAME,
//					VERSION: this.searchList.VERSION,
//					DEPTID: this.searchList.DEPTID,
//					// STATUS: this.searchList.STATUS,
//				}
				var url = this.basic_url + '/api-apps/app/flow/flow/todo';
				this.$axios.get(url, {}).then((res) => {
					console.log(res.data);
//					this.page.totalCount = res.data.count;
//					//总的页数
//					let totalPage = Math.ceil(this.page.totalCount / this.page.pageSize)
//					if(this.page.currentPage >= totalPage) {
//						this.loadSign = false
//					} else {
//						this.loadSign = true
//					}
//					this.commentArr[this.page.currentPage] = res.data.data
//					let newarr = []
//					for(var i = 1; i <= totalPage; i++) {
//						if(typeof(this.commentArr[i]) != 'undefined' && this.commentArr[i].length > 0) {
//							for(var j = 0; j < this.commentArr[i].length; j++) {
//								newarr.push(this.commentArr[i][j])
//							}
//						}
//					}
//					this.productList = newarr;
//				}).catch((wrong) => {})
	});
	},
},
	  mounted(){
	  	this.requestData();
	},
}

</script>

<style scoped>
@import '../assets/css/mask-modules.css';

/*工作统计*/
.echart_title {
	left: 15px;
	right: 15px;
	line-height:20px;
	padding-bottom: 10px;
	height: 35px;
	position: absolute;
	top: 15px;
	z-index: 80;
}
.big_numb { color: #333333; font-size: 28px; line-height:32px; }
.small_font { color: #BDBDBD; font-size:10px; line-height:15px;}
.middle_font { color: #121958; font-size: 12px;  line-height:20px;}



/*半圆统计图效果*/

.wracircle {
	width: 140px; /* Set the size of the progress bar */
	height: 140px;
	position: absolute; /* Enable clipping */
	transform:rotate(270deg);
	clip: rect(0px, 140px, 140px, 70px); /* Hide half of the progress bar */
}

/* Set the sizes of the elements that make up the progress bar */
.circle {
	width: 140px;
	height: 140px;
	border: 10px solid #9399F3;
	border-radius: 70px;
	position: absolute;
	z-index: 1;
	clip: rect(0px, 70px, 140px, 0px);
}
.wracircle:after {
	content: '';
	width: 140px;
	height: 140px;
	position: absolute;
	z-index: -1;
	border: 10px solid #EBF4F7;
	border-radius: 70px;
}
.circle_font {
	position: absolute;
	z-index: 6;
	width:100%;
	height: 55%;
	top: 30px;
	right: 0px;
	bottom: 0px;
	text-align: center; 
	transform:rotate(90deg);
}
.circle_font p {
	font-size: 12px;
}
.circle_font p.font20 {font-size: 20px;}
/* Using the data attributes for the animation selectors. */
/* Base settings for all animated elements */
div[data-anim~=base] {
  -webkit-animation-iteration-count: 1;  /* Only run once */
  -webkit-animation-fill-mode: forwards; /* Hold the last keyframe */
  -webkit-animation-timing-function:linear; /* Linear animation */
}

.wracircle[data-anim~=wracircle] {
  -webkit-animation-duration: 0.01s; /* Complete keyframes asap */
  -webkit-animation-delay: 3s; /* Wait half of the animation */
  -webkit-animation-name: close-wracircle; /* Keyframes name */
}
.circle[data-anim~=left] {
  -webkit-animation-duration: 1s; /* Full animation time */
  -webkit-animation-name: left-spin;
}
/* 改变工作完成情况数据，公式（180/100*n） */
@-webkit-keyframes left-spin {
	from {-webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(82deg);}
}

</style>

