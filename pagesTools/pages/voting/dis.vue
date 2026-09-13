<template>
	<view>
		<tm-menubars title="问卷详情" iconColor="white" theme="black" ></tm-menubars>
		
		<scroll-view class="container scroll-Y pb-n25" :style="windowHeight" :scroll-top="scrollTop" scroll-y="true">
			<view class="tit" :style="'height:'+($store.state.customBar)+'px;'"></view>
			<view class="mx-n8 my-n20 white pa-20 round-3">
				<view class="vot_user my-20">
					一、关于现有物业（亿新物业）整改结果，见下图。
				</view>
				<tm-images src="https://cdn.tianfucd.com/images/applet/bg/voting/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220620111701.jpg"></tm-images>
			</view>
			<view class="mx-n8 my-n20 white pa-20 round-3">
				<view class="vot_user my-20">
					二、关于本小区整改建议（费用来源：物业公司）
				</view>
				<view class="dis">
					<view class="">
						1、提升乒乓球场、水景区使用体验；
					</view>
					<view class="">
						2、新建一栋、三栋围墙临边空地，如新增运动场、老年活动场、儿童乐园等；
					</view>
					<view class="">
						3、修缮现有儿童乐园，新增设施或补设施等；
					</view>
					<view class="">
						4、新增草坪和修整绿化树木等；
					</view>
					<view class="">
						5、修缮游泳池同时达标使用；
					</view>
					<view class="">
						6、整改消防设施，更换消防门；
					</view>
					<view class="">
						7、修补完善小区围墙，归纳围墙上的线路；
					</view>
					<view class="">
						8、整改车辆进出口安全通道，进出口墙面和地面刷漆、地下车库修缮等；
					</view>
					<view class="">
						9、新增监控、完善监控室，防范墙砖掉落安全隐患。
					</view>
					<view class="">
						10、整改二楼反水、以及小区反水通道疏通等，监督违规违建；
					</view>
				</view>
				<view class="vot_user my-20" style="font-size: 24rpx;">
					备注：节点，必须按照业委会要求时间完善，如未完善有进度处罚，严重的直接解除合同，扣除保证金；
				</view>
			</view>
			<view class="mx-n8 my-n20 white pa-20 round-3">
				<view class="vot_user my-20">
					三、关于电梯整改、小区电路、一户一表
				</view>
				<view class="vot_user my-20" style="font-size: 24rpx;">
					待定：续聘或新聘物业后落实此项工作重点，请大家以公示为准，不信谣，不传谣；为和谐社区以及社会贡献自身应尽的观点。
				</view>
			</view>
			
			<view @tap="goVot" class="btn">
				参与投票
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import tmImages from '@/pagesTools/tm-vuetify/components/tm-images/tm-images.vue';
	export default {
		data() {
			return {
				windowHeight:null,
				scrollTop: 0,
			};
		},

		components: {tmImages},
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
			goVot:function(){
				let that = this
				uni.navigateTo({
					url: "/pagesTools/pages/voting/voting",
				});
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
