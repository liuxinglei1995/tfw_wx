<template>
	<view>
		<tm-menubars :shadow="0" title="合同详情" fontColor="white" :back="true"></tm-menubars>
		<!-- #ifdef MP-WEIXIN -->
		<web-view :src="url"></web-view>
		<!-- #endif -->

		<!-- 其他平台的替代方案 -->
		<!-- #ifndef MP-WEIXIN -->
		<view>
			<text>请在微信小程序中查看此页面</text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import tmMenubars from "@/pagesTools/tm-vuetify/components/tm-menubars/tm-menubars.vue"
	export default {
		components: {
			tmMenubars,
		},
		data() {
			return {
				url: "https://new.tianfucd.com/ifram",
			}
		},
		onLoad: function(option) {
			this.url = "https://new.tianfucd.com/ifram?id="+option.id
			console.log(this.url)
		},
		methods: {

		}
	}
</script>

<style>

</style>