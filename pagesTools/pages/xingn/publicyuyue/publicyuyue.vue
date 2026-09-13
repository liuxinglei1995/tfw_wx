<template>
	<view>
		<!--pages/xingn/publicyuyue/publicyuyue.wxml-->
		<u-navbar title="预约看房" :placeholder="true" :autoBack="true" bgColor="#00aaff"
			:titleStyle="{ color: '#FFF', fontSize: '32rpx' }" leftIconColor="white">
		</u-navbar>
		<view class="top"></view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="list">
				<view class="left">预约楼盘</view>
				<view class="right">{{title}}</view>
			</view>
			<view class="list">
				<view class="left">预约时间</view>
				<view class="right">
					<picker mode="multiSelector" @change="bindMultiPickerChange"
						@columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="picker">
							{{multiArray[0][multiIndex[0]]}} {{multiArray[1][multiIndex[1]]}}
						</view>
					</picker>
				</view>
			</view>
			<!-- 手机号码 -->
			<view class="list">
				<view style="width:30%;height:100%;float:left;text-align:center">手机号码</view>
				<!-- <view class="left" style="line-height:30rpx"></view> -->
				<!-- <view class="right"> -->
				<view style="width:70%;height:100%;float:left">
					<input style="width:100%;height:100%;" name="lianxihaoma" type="number" maxlength="11"
						placeholder="请输入联系方式">
				</view>
			</view>
			<!-- 到访人数 -->
			<view class="list">
				<view class="left">到访人数</view>
				<view class="right">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="picker">
							{{array[index]}}
						</view>
					</picker>
				</view>
			</view>
			<!-- 置业顾问 -->
			<view class="list">
				<view class="left">置业顾问</view>
				<view class="right">{{phone}}</view>
			</view>
			<button class="botton" form-type="submit">预约现场看房</button>
		</form>
		<!-- <view class="botton" bindtap='tijiao'></view> -->
	</view>
</template>

<script>
	// pages/xingn/publicyuyue/publicyuyue.js
	var app = getApp();
	import {
		addreservation
	} from '@/api/houst.js'
	export default {
		data() {
			return {
				array: ['请选择到访人数', '1人', '2人', '3人', '3人以上'],
				multiArray: [
					[],
					[]
				],
				index: 0,
				multiIndex: [0, 0],
				uid: '',
				title: '',
				phone: '',
				userid: '',
				type: "",
				thattype: "",
				userType: "1",
				data: {},
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(options);
			this.setData({
				uid: options.uid,
				title: options.title,
				phone: options.phone,
				userid: options.userid,
				type: options.type,
				thattype: option.idtype,
			});
			this.dealTime();
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
			dealTime: function() {
				// num：未来天数
				var timestamp = Date.parse(new Date());
				timestamp = timestamp / 1000;
				var date = new Date(timestamp * 1000); //加7天的时间戳：

				var zhi = [];

				for (var i = 0; i < 12; i++) {
					var before_timetamp = timestamp + 24 * 60 * 60 * i; //減7天的时间：

					var n_to = before_timetamp * 1000;
					var before_timetamp = new Date(n_to);
					var Y_before = before_timetamp.getFullYear(); //月份

					var M_before = before_timetamp.getMonth() + 1 < 10 ? '0' + (before_timetamp.getMonth() + 1) :
						before_timetamp.getMonth() + 1; //日期

					var D_before = before_timetamp.getDate() < 10 ? '0' + before_timetamp.getDate() : before_timetamp
						.getDate();
					var jieguo = Y_before + '-' + M_before + '-' + D_before;
					zhi.push(jieguo);
				}

				var shijian = [];

				for (var i = 1; i <= 24; i++) {
					shijian.push(i + ':00:00');
				}

				var suoyou = {
					multiArray: this.multiArray
				};
				suoyou.multiArray[0] = zhi;
				suoyou.multiArray[1] = shijian;
				this.setData(suoyou);
			},
			bindMultiPickerColumnChange: function(e) {
				var data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				this.setData(data);
			},
			//人数选择
			bindPickerChange: function(e) {
				this.setData({
					index: e.detail.value
				});
			},
			formSubmit: function(e) {
				var inputval = e.detail.value;

				if (inputval['lianxihaoma'].length != 11) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					});
					return;
				}

				if (this.index == 0) {
					uni.showToast({
						title: '请选择到访人数',
						icon: 'none'
					});
					return;
				}

				var daochanshijian = this.multiArray[0][this.multiIndex[0]] + ' ' + this.multiArray[1][this.multiIndex[
					1]]; //到场时间

				var renshu = this.array[this.index]; //预约人数

				var that = this;
				var user = uni.getStorageSync('uid'); //用户账号

				var fabuid = that.uid; //房源

				var successStatus = uni.getStorageSync('successStatus');

				this.data = {
					phonenmber: inputval[
						'lianxihaoma'],
					houseId: this.uid,
					time: daochanshijian,
					number: renshu,
					houseBy: this.userid,
					houseType: this.type,
				}
				
				addreservation({
					phonenmber: inputval[
						'lianxihaoma'],
					houseId: this.uid,
					time: daochanshijian,
					number: renshu,
					houseBy: this.userid,
					houseType: this.type,
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				})
			},

		}
	};
</script>
<style>
	/* pages/xingn/publicyuyue/publicyuyue.wxss */
	.top {
		width: 100%;
		height: 200rpx;
		background: #3DA15B;
		border-radius: 0 0 10px 10px;
	}

	.list {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		border-bottom: 1rpx solid #eee
	}

	.left {
		width: 30%;
		height: 100%;
		display: inline-block;
		text-align: center
	}

	.right {
		width: 70%;
		height: 100%;
		display: inline-block;
		text-align: left
	}

	.botton {
		width: 90%;
		margin: 10rpx 5%;
		height: 100rpx;
		background: #3DA15B;
		text-align: center;
		line-height: 100rpx;
		font-size: 30rpx;
		color: white;
		border-radius: 10rpx
	}
</style>