<template>
	<view>
		<tm-menubars title="业主投票" iconColor="white" theme="black" ></tm-menubars>
		<view class="container" :style="windowHeight">
			<view  :style="'height:'+($store.state.customBar+33)+'px;'"></view>
			<view class="tit">
				<view>关于金沙愉景二期</view>
				<view class="mt-15" style="font-size: 34rpx;">“续聘”或“新聘”物业公司业主投票</view>
			</view>
			<view class="mx-n8 my-n20 white pa-20 round-3">
				<view class="vot_user my-20">
					问卷对象：全体金沙愉景二期业主
				</view>
				<view class="dis">
					<view class="">
						投票时间：2022年6月21日9点起----2022年6月27日21点止
					</view>
					<view class="">
						投票方式：现场投票、电话投票、微信投票、上门投票
					</view>
					<view class="">
						投票地点：小区大门、业委会办公室
					</view>
					<view class="">
						投 票 人：业主本人或业主书面授权人
					</view>
				</view>
				<view class="vot_user my-20" style="font-size: 24rpx;">
					注意：不管“续聘”或“新聘”，保持物业费1.3元/平米。
				</view>
			</view>
			<view class="btn" @tap="goDis">
				进入问卷
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight:null,
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let info = uni.getSystemInfoSync();
			this.windowHeight = "height:"+(info.windowHeight)+'px;'
		},

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
			goDis:function(){
				let that = this
				that.$apis.userInfo().then(res => {
					uni.setStorageSync('userInfo',res)
					uni.navigateTo({
						url: "/pagesTools/pages/voting/dis",
					});
				})
			}
		}
	};
</script>
<style>
	.container{
		width: 100%;
		background-image: url(https://cdn.tianfucd.com/images/applet/bg/voting/bg.png);
		background-size: 100% 100%;
	}
	.tit{
		text-align: center;
		font-size: 50rpx;
		font-weight: 400;
		color: #FFD324;
		text-shadow: -2rpx 2rpx 2rpx #210000;
	}
	.vot_user{
		font-size: 32rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #FF0000;
	}
	.dis{
		font-size: 24rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #222222;
		line-height: 48rpx;
	}
	.btn{
		float: right;
		margin-right: 40rpx;
		width: 270rpx;
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		font-size: 32rpx;
		color: #FFF;
		background: #FFB200;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		opacity: 1;
	}
</style>
