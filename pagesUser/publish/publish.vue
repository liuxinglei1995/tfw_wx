<template>
	<view class="content">
		<tm-menubars title="我要委托" iconColor="white" ></tm-menubars>
		<view class="bg">
			<swiper class="swiper" previous-margin="130rpx" next-margin="130rpx" :current="index" :indicator-dots="indicatorDots" @change="change" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
				<swiper-item class="swiper-item" v-for="(itt,idx) in item" :key="idx">
					<hm-cover-card :options="itt" :index="index==idx?true:false" :idx="idx"></hm-cover-card>
				</swiper-item>
			</swiper>
			<view class="goBtn" @tap="goto()">
				进入
			</view>
		</view>
	</view>
</template>

<script>

	import HmCoverCard from '../components/yang-cover-card/index.vue'
	import tmEmpty from '@/pagesUser/tm-vuetify/components/tm-empty/tm-empty.vue';
	export default {
		components:{tmEmpty,HmCoverCard},
		data() {
			return {
				item:[
					{
						id:1,
						title_en:"Buy a house",
						title: "买新房",
						backgroundColor:'#00D1B4',
						dis:['低首付','低税费','手续简单','可选度高'],
						url:"/pagesHouse/newhouse/newhouse?type=1"
					},{
						id:1,
						title_en:"Find a house",
						title: "帮我找房",
						backgroundColor:'#00AAFF',
						dis:['输入需求','留下电话','客服跑腿','坐等电话'],
						url:"/pagesUser/publish/buy/buy"
					},{
						id:1,
						title_en:"Sell my house",
						title: "我要卖房",
						backgroundColor:'#EF9C34',
						dis:['简单便捷','输入信息','一键发布'],
						url:"/pagesUser/publish/sell/sell"
					}
				],
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				circular: false,
				index:1,
			};
		},
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
			change(e){
				console.log(e)
				this.index = e.detail.current
			},

			goto() {
				uni.navigateTo({
					url: this.item[this.index].url
				});
			}
		}
	};
</script>
<style lang="less">
	.content {
		width: 100%;
		height: calc(952rpx);
		position: relative;
		.bg {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: calc(1000rpx);
			box-sizing: border-box;
			flex-direction: column;
			.swiper{
				width: 100%;height: 100%;
				.swiper-item{
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					width: 467rpx;
					height: 689rpx;
					box-sizing: border-box;
					flex-direction: column;
				}
			}
			.note {
				width: 96%;
				padding-top: 38px;
				margin-bottom: 10px;
				position: relative;
				background: url() top center no-repeat;
			}
			.note-container {
				width: 100%;
				text-indent: 2em;
				background: url() top center repeat-y;
				overflow: hidden;

				text {
					width: 60%;
					display: block;
					margin: 0 auto;
					text-align: justify;
					line-height: 60upx;
				}
			}
			.note-bottom {
				width: 100%;
				padding-bottom: 34px;
				background: url() bottom center no-repeat;
			}
			.goBtn{
				width: 234rpx;
				height: 70rpx;
				background: #00D1B4;
				border-radius: 44rpx 44rpx 44rpx 44rpx;
				opacity: 1;
				line-height: 70rpx;
				text-align: center;
				color: #FFF;
			}
		}
	}
</style>
