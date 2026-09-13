<template>
	<view>
		<tm-menubars title="限购政策" iconColor="white" ></tm-menubars>
		<image :src="img" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:uni.getStorageSync('siteConfigs').assetsPath+'/ad/goufangzige/gfzc.png'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	image{
		width: 100%;
	}
</style>
