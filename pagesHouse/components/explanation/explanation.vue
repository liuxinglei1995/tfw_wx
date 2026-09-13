<template>
	<view class="">
		<view class="round-4" style="width: 338rpx;height: 126rpx;background: #FFDFDF; position: relative;margin-left: 10rpx;">
			<image style="width: 60rpx;height: 60rpx;border-radius: 50%;position: absolute;top: 28rpx;left: 28rpx;" src="https://static.tianfucd.com/img/icon/esHouseDetail/liveToSee.png" mode="scaleToFill"></image>
			<view v-if="show" style="width: 60rpx;height: 60rpx;position: absolute;top: 0rpx;right: 0rpx;">
				<image 
					src="https://cdn.tianfucd.com/images/gif/play.gif" 
					style="height: 60rpx;width: 60rpx;"
					mode=""
				></image>
			</view>
			<view style="position: absolute;top: 18rpx;left: 94rpx;color:#333333;">
				<view style="font-size: 32rpx;margin-bottom: 10rpx;">
					{{passAudit == "0"?'房源视频':'讲解回看'}}
				</view>
				<view style="font-size: 24rpx;">
					小区专家，管家服务
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				passAudit : uni.getStorageSync('passAudit')=="0"?uni.getStorageSync('passAudit'):"1"
			};
		},
		components: {},
		props: {
			show:{
				type:Boolean,
				default:false
			}
		}
	};
</script>
