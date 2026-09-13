<template>
	<view>
		<tm-menubars :title="'快捷拨打电话'" iconColor="white"></tm-menubars>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				houseid:null,
				id:null
			}
		},
		methods: {
			
		},
		onLoad(e) {
			if (e.scene) {
				let str = decodeURIComponent(e.scene);
				let jsonStr = '{"' + str.replace(/=/g, '": "').replace(/&/g, '", "') + '"}';
				let jsonObj = JSON.parse(jsonStr);
				this.houseid = jsonObj.houseid
				uni.makePhoneCall({
					phoneNumber: '4008162019,'+jsonObj.phone,
					success: (res) => {
							this.$tab.reLaunch("/pages/index/index");
						}

				});
			}
		}
	}
</script>

<style>

</style>
