<template>
	<view class="home">
		<tm-menubars title="天府网" iconColor="white" :showback="false"></tm-menubars>

		<view>
			由
		</view>
	</view>
</template>

<script>
	import {
		swiperimglist,
		listFangyuan,
		newloupan,
		wxnewlp,
		wxIndexList,
		pricerEductionHouseByAreaCode
	} from '@/api/houst.js'
	import tmDragGrid from '@/tm-vuetify/components/tm-dragGrid/tm-dragGrid.vue';
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons.vue';
	import indexHouse from "@/pages/index-house/index-house.vue";
	var app = getApp();
	let QQMapWS = require("@/js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});
	export default {
		dicts: ['tfw_decoration_situation', 'tfw_userkffs', 'tfw_featured_tags', 'tfw_fkfs', 'tfw_elevator_situation'],
		components: {
			indexHouse,
			tmDragGrid,
			tmIcons
		},
		data() {
			return {

			}
		},
		onReady() {
			uni.setStatusBarStyle({
				style: 'light',
				success: () => {
					console.log('状态栏样式设置成功');
				},
				fail: (err) => {
					console.error('状态栏样式设置失败', err);
				}
			});
		},
		methods: {

		}
	}
</script>

<style>
	.home {
			width: 100%;
			overflow-x: hidden;
			overflow-y: hidden;
		}
</style>