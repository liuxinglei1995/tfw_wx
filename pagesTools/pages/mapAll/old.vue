<template>
	<view>
		<view class="head">
			<view class="search">

				<view class="search-item">
					<image src="https://tianfu.tianfucd.com/public/wxx/img/sousuo(1).png"
						style="width:30rpx;height:30rpx;"></image>
					<input type="text" class="text" placeholder="搜索城市名称" placeholder-class="placeholder"
						@input="search">
				</view>
			</view>
		</view>
		<view v-if="issearch">
			<view v-for="(item, index) in searchList" :key="index" class="city-list" :data-index="item"
				@tap="jumpindex">
				{{item}}
			</view>
		</view>

		<view v-if="!issearch">
			<view class="list-row">
				<view class="city-item" :data-city="nowcity" @tap="selectcity">{{nowcity}}</view>
				<view class="dingwei">(当前定位城市)</view>
			</view>
			<view v-for="(letterItem, letterIndex) in cityss" :key="letterIndex">
				<view class="zimu">
					{{letterIndex}}
				</view>
				<view v-for="(item, index) in letterItem" :key="index" class="city-list" :data-id="item.id"
					:data-city="item.name1" @tap="selectcity">
					{{item.name1}}
				</view>
			</view>
			<!-- <view wx:for='{{cityss}}' wx:key='this' wx:for-item='letterItem' wx:for-index='letterIndex'>
    <view class='zimu'>
      {{letter[letterIndex]}}
    </view>
    <view class='city-list' wx:for='{{letterItem}}' data-id='{{item.id}}' data-city='{{item.fullname}}' bindtap='selectcity'>
      {{item.fullname}}
    </view>
  </view> -->
		</view>
	</view>
</template>

<script>
	// pages/selectcity/selectcity.js
	var app = getApp(); // 实例化API核心类
	let QQMapWS = require("../../../js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});

	export default {
		data() {
			return {
				letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
					"T", "U", "V", "W", "X", "Y", "Z"
				],
				cityss: [],
				issearch: false,
				nowcity: '定位中',
				searchList: [],
				letterIndex: ""
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.refreshPage3389(options);
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
			dizhinaqu: function(e) {
				var that = this;
				uni.request({
					url: app.globalData.URL + '/Ceshi/nikan',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					success: function(res) {
						console.log(res);

						if (res.data.data != null) {
							that.setData({
								cityss: res.data.data
							});
						} else {}
					}
				});
			},
			selectcity: function(e) {
				var city = e.currentTarget.dataset.city;

				if (city !== null) {} // console.log(city)


				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面

				var prevPage = pages[pages.length - 2]; //上一个页面

				prevPage.setData({
					nowcity: city
				});

				if (e.currentTarget.dataset.id != null) {
					app.globalData.city_area = e.currentTarget.dataset.id;
				}

				uni.navigateBack();
				/*currPage.onLoad();*/
			},
			jumpindex: function(e) {
				var that = this; // var city = this.data.search;

				var city = e.currentTarget.dataset['index'];
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面

				var prevPage = pages[pages.length - 2]; //上一个页面

				prevPage.setData({
					nowcity: city
				});
				uni.request({
					url: app.globalData.URL + '/Ceshi/city_area',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					data: {
						city: city
					},
					success: function(res) {
						if (res.data.id != null) {
							app.globalData.city_area = res.data.id;
						} else {}
					}
				});
				uni.navigateBack();
			},
			search: function(e) {
				var that = this;
				var cityname = e.detail.value;
				console.log('city1:' + cityname); // var citys = that.data.citys;
				// console.log(citys);

				var citylist = that.cityss;
				var cityss = new Array();

				if (cityname == "" || cityname == undefined) {
					console.log('空');
					that.setData({
						issearch: false
					});
					that.refreshPage3389({});
				} else {
					for (let index in citylist) {
						for (var i = 0; i < citylist[index].length; i++) {
							var name = citylist[index][i].name1;

							if (name.indexOf(cityname) != -1) {
								cityss.push(name);
							}
						}
					}

					;
					that.setData({
						issearch: true,
						searchList: cityss
					}); // console.log(citylist['A']);

					return;

					for (var i = 0; i < citylist.length; i++) {
						for (var is = 0; is < citylist[i].length; is++) {
							var name = citylist[i].name1;
							console.log(name);

							if (name.indexOf(cityname) != -1) {
								console.log('city2:' + name);
							}

							that.setData({
								issearch: true,
								searchList: cityss
							});
						}

						return;
						var name = citys[i].fullname;

						if (name.indexOf(cityname) != -1) {
							console.log('city2:' + name);
							cityss.push(name);
						}

						if (i == citys.length - 1) {
							that.setData({
								issearch: true,
								searchList: cityss
							});
						}
					}
				}
			},

			/**
			 * 生命周期函数--监听页面加载
			 */
			refreshPage3389: function(options) {
				var vm = this;
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						var latitude = res.latitude;
						var longitude = res
						.longitude; // console.log('当前位置:' + latitude + "," + longitude);

						qqmapsdk.reverseGeocoder({
							location: {
								latitude: latitude,
								longitude: longitude
							},
							success: function(res) {
								// console.log('位置');
								var city = res.result.ad_info.city;
								console.log(city);
								vm.setData({
									nowcity: city
								});
							},
							fail: function(res) { // console.log('weizhi');
								// console.log(res);
							}
						});
					},

					fail(res) {
						console.log(res);
					}

				});

				this.dizhinaqu();
			}
		}
	};
</script>
<style>
	.head {
		width: 100%;
		height: 90rpx;
		background-color: #F3F2F7;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.search {
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		background-color: white;
	}

	.search-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.text {
		width: 220rpx;
		margin-left: 20rpx;
	}

	.placeholder {
		font-size: 28rpx;
		color: #999999;
	}

	.city-item {
		margin-left: 50rpx;
		color: #3DA15B;
	}

	.list-row {
		font-size: 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 90rpx;
	}

	.zimu {
		width: 100%;
		height: 75rpx;
		background-color: #EFEFF7;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 50rpx;
		font-size: 30rpx;
	}

	.city-list {
		height: 90rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 50rpx;
		color: #343434;
		font-size: 30rpx;
		border-bottom: 1rpx solid #EFEFEF;
	}

	.dingwei {
		font-size: 26rpx;
		color: #ADADAD;
		margin-left: 20rpx;
	}
</style>