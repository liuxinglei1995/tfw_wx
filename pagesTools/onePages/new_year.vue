<template>
	<view>
		<tm-menubars title="新年大礼包" :transparent="false" iconColor="white" color="tfw"></tm-menubars>
		<tm-images :previmage="false" src="https://www.tianfucd.com/ad/1642143292ad26-99.png?t=72"></tm-images>
		<tm-flotbutton label="咨询" icon="icon-headset-fill" @click="call('17341396656')" :show-text="true" color="tfw"></tm-flotbutton>
	</view>
</template>

<script>
	import tmImages from '@/pagesTools/tm-vuetify/components/tm-images/tm-images.vue';
	import tmMenubars from '@/pagesTools/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import tmFlotbutton from '@/pagesTools/tm-vuetify/components/tm-flotbutton/tm-flotbutton.vue';
	export default {
		components: {tmImages,tmMenubars,tmFlotbutton},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
		}
	};
</script>
