<template>
	<view>
		<tm-menubars title="指导价" iconColor="white" :transparent="true"></tm-menubars>
		<view style="height: 100%;">
			<map id="maps" class="tui-maps" ref="maps" :longitude="longitude" :markers="markers" :latitude="latitude" :scale="16" show-location  @regionchange="regionchange" :style="{'width':windowWidth+'px','height':windowHeight+'rpx'}">
			</map>
			<view class="gps-body" v-if="poiss.length != []">
				<scroll-view scroll-y="true" :scroll-top="scrollTop" scroll-with-animation="true" style="height:500rpx;">
					<block v-for="(item,index) in poiss">
						<view class="gps-lists">
							<text class="gps-title">{{item.xq}}</text>
							<view class="gps-flex">
								<view class="gps-view">{{item.pianqu}}-{{item.quhao}}</view>
								<view :style="(item.zfzdj==0?' ':'color:red;')+'margin-top:-18rpx;width: 25%;text-align: right;margin-right: 5%;'">
									{{item.zfzdj==0?'暂无':'￥ '+item.zfzdj}}
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
			<view class="pt-30" v-else>
				<tm-empty label="暂无附近房源数据"></tm-empty>
			</view>
		</view>
	</view>
</template>

<script>
	import tmEmpty from '@/pagesTools/tm-vuetify/components/tm-empty/tm-empty.vue'
	let QQMapWS = require("../../../js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	
	
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});
	let mapContext;
	export default {
		components:{tmEmpty},
		data() {
			return {
				longitude: null,
				latitude: null,
				windowWidth: 0,
				windowHeight: 0,
				poiss: [],
				scrollTop: 0,
				address:{},
				markers:[],
			}
		},
		//第一次初始化用户位置信息
		onLoad() {
			mapContext = uni.createMapContext("maps", this)
			try {
				var th_is = this;
				const res = uni.getSystemInfoSync();
				th_is.windowWidth = res.windowWidth;
				th_is.windowHeight = res.screenHeight * (750 / res.windowWidth) - 520;
				uni.showLoading({
					title: '正在获取定位中',
				});
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (res) => {
						th_is.longitude = res.longitude;
						th_is.latitude = res.latitude;
						uni.hideLoading();
						th_is.getAddress();
						th_is.popupShow = true;
					}
				})
				//th_is.getAddress(22.53332, 113.93041);
			} catch (e) {
				// error
			}
		},
		methods: {
			//每移动一次获取周围地址
			regionchange(e) {
				var th_is = this;
				if (e.type == "end") {
					th_is.getAddress();
				}
			},
			//获取范围内小区
			async getAddress() {
				var th_is = this;
				mapContext.getRegion({
					success: res => {
						th_is.$apis.coordinatesWithinRange({
							'northeast_lat' : res.northeast.latitude,
							'northeast_lng' : res.northeast.longitude,
							'southwest_lat' : res.southwest.latitude,
							'southwest_lng' : res.southwest.longitude
						}).then(r => {
							var mks = []
							for (var i = 0; i < r.length; i++) {
								let zdj = r[i].zfzdj == 0 ? '暂无指导价':'指导价：'+r[i].zfzdj
								mks.push({ // 获取返回结果，放到mks数组中
									callout: {
										'content': '小区：'+r[i].xq+'\n\n'+zdj,
										'display': 'ALWAYS',
										'borderRadius':'4',
										'bgColor':'#ffffff',
										'color':'#383838',
										'padding':'8',
										'fontSize':'10',
										'textAlign':'left'
									},
									id: r[i].id,
									latitude: r[i].lat,
									longitude: r[i].lng,
									iconPath:"https://cdn.tianfucd.com/images/applet/dingwei.png",
									width: 25,
									height: 25
								})
							}
							th_is.setData({
								poiss:r,
								markers:mks
							})
						})
					}
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.cover-image {
		width: 100rpx;
		height: 100rpx;
		margin: 0px auto;
		position: relative;
		top: 50%;
		margin-top: -100rpx;
	}

	.tui-current__img {
		width: 100rpx;
		height: 45rpx;
	}
	.gps-body {
		width: 100%;
		height: 500rpx;
		padding-top: 20rpx;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0rpx;
		font-size: 26rpx;

		.gps-lists {
			width: 98%;
			height: 100rpx;
			margin: 0px auto;
			border: 1px solid #f9f9f9;
			.gps-flex {
				display: flex;
				justify-content: space-between;
			}
			.gps-flex .uni-radio-input {
				width: 40rpx;
				height: 40rpx;
			}
			.gps-title {
				padding-left: 10rpx;
				display: block;
				padding-top: 15rpx;
			}
			.gps-view {
				width: 70%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding-left: 10rpx;
				color: #b6b6b6;
				font-size: 25rpx;
				margin-top: 15rpx;
			}
		}
	}

	.left-confirm {
		width: 100rpx;
		height: 55rpx;
		font-size: 26rpx;
		line-height: 55rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 8px;
		background-color: #007aff;
		position: fixed;
		right: 20rpx;
		top: 20rpx;
	}
	
	.right-confirm{
		width: 100rpx;
		height: 55rpx;
		font-size: 26rpx;
		line-height: 55rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 8px;
		background-color: rgba(0,0,0,0.2);
		position: fixed;
		left: 20rpx;
		top: 20rpx;
		view{
			font-size:45rpx;
		}
	}
</style>
