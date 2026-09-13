<template>
	<view class="">
		<view class="top" :style="{'padding-top':statusBar+'px'}">
			<view class="tit">
				登记{{options.return_type == 1?'成功':'失败'}}
			</view>
			<view class="xq">
				{{options.xq}}
			</view>
		</view>
		<view class="flex-center" style="margin-bottom:60rpx;">
			<view v-if="options.return_type == 1" style="margin-top: 80rpx;">
				<img style="width: 280rpx;height: 280rpx;" src="./icon/success.png" alt="">
			</view>
		</view>
		<view :style="{
				width: '100%',
				fontSize: '50rpx',
				fontWeight: 'bold',
				color: options.return_type == 1?'green':'red',
				textAlign: 'center'
			}">
			登记{{options.type}}{{options.return_type == 1?'成功':'失败'}}
		</view>
		<view v-if="options.type == '外卖' || options.type == '中介看房' || options.type == '来客'" :style="{
				width: '100%',
				fontSize: '35rpx',
				fontWeight: 'bold',
				color: options.return_type == 1?'red':'#222222',
				textAlign: 'center',
				marginTop:'40rpx'
			}">
			{{options.return_type == 1?'备注：进入园区为 40 分钟':'请登记准确房号'}}
		</view>
		<view v-if="options.return_type == 1 && (options.type == '中介看房' || options.type == '来客')" :style="{
				width: '100%',
				fontSize: '35rpx',
				fontWeight: 'bold',
				color: 'green',
				textAlign: 'center',
				marginTop:'40rpx'
			}">
			此房屋在物业登记备案
		</view>
		<view v-if="options.type == '家政'" :style="{
				width: '100%',
				fontSize: '35rpx',
				fontWeight: 'bold',
				color: options.return_type == 1?'red':'#222222',
				textAlign: 'center',
				marginTop:'40rpx'
			}">
			{{options.return_type == 1?'进入园区早上9:00点-离开18:00点':'请登记准确房号'}}
		</view>
		<view v-if="options.type == '装修'" :style="{
				width: '100%',
				fontSize: '35rpx',
				fontWeight: 'bold',
				color: options.return_type == 1?'red':'#222222',
				textAlign: 'center',
				marginTop:'40rpx'
			}">
			{{options.return_type == 1?'装修时间：工作日9：00至18：00':'请登记准确房号'}}
		</view>
		<view v-if="options.type == '访友'" :style="{
				width: '100%',
				fontSize: '35rpx',
				fontWeight: 'bold',
				color: options.return_type == 1?'red':'#222222',
				textAlign: 'center',
				marginTop:'40rpx'
			}">
			{{options.return_type == 1?'欢迎光临':'请登记准确房号'}}
		</view>
		<view style="margin-top: 60rpx;">
			<tm-sheet v-if="options.type == '中介看房' || options.type == '来客'" color="black text">
				<view v-if="options.return_type == 1">
					1、中介看房对号看，未对号看房将被请出园区多套带看请你多次扫码登记;<br/>
					2、为了小区安全管理、以及体验，请你理解;<br/>
					3、请你自觉遵守小区管理，文明出行。
					4、进入园区安全自行负责，与物业方无责；
				</view>
				<view v-else>
					1、此套房业主未在物业登记备案 {{options.house_type}};<br/>
					2、如业主委托中介{{options.house_type}}，请业主致电物业中心确认，<text class="red text">业主确认后放行</text>;<br/>
					3、中介看房对号看，未对号看房将被请出园区;多套看请你多次扫码登记，安全自行负责;<br/>
					4、为了小区安全管理、以及体验，请你理解;<br/>
					5、请你自觉遵守小区管理，文明出行<br/>
					6、进入园区安全自行负责，与物业方无责；
				</view>
			</tm-sheet>
			<tm-sheet v-else-if="options.type == '家政' || options.type == '装修'" color="black text">
				1、进入园区安全自行负责，与物业方无责<br/>
				2、18:00后，及时离开园区;<br/>
				3、请你自觉遵守小区管理，文明出行，<br/>
				4、为了小区安全管理、以及体验，请你理解。
			</tm-sheet>
			<tm-sheet v-else color="black text">
				1、进入园区安全自行负责，与物业方无责;<br/>
				2、送完外卖后，及时离开园区;<br/>
				3、请你自觉遵守小区管理，文明出行;<br/>
				4、为了小区安全管理、以及体验，请你理解。
			</tm-sheet>
		</view>
	</view>
</template>
<script>
	let App = getApp()
	import tmSheet from '@/pagesTools/tm-vuetify/components/tm-sheet/tm-sheet';
	
	export default {
		data() {
			return {
				statusBar:this.$store.state.statusBar,
				options:{}
			};
		},
		components: {tmSheet},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.options = options
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			
		},

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
			
		}
	};
</script>
<style lang="scss">
	.top{
		height: 108rpx;
		width: 100%;
		background-color: #00AAFF;
		color: #FFF;
		text-align: center;
		.tit{
			padding-top: 15rpx;
			font-size: 36rpx;
		}
		.xq{
			font-size: 22rpx;
		}
	}
</style>