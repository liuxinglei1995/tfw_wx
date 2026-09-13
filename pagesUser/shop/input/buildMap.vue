<template>
	<view>
		<view style="height: 100%;">
			<map id="maps" class="tui-maps" ref="maps" :longitude="longitude" :latitude="latitude" :scale="16" show-location @regionchange="regionchange" :style="{'width':windowWidth+'px','height':windowHeight+'rpx'}">
				<cover-view class="left-confirm" @click="next">
					<view>确认</view>
				</cover-view>
				<cover-view class="right-confirm" @click="cancel">
					<view>×</view>
				</cover-view>
			</map>
			<cover-view v-if="popupShow == true">
				<view class="gps-body">
					<view class="search my-20 flex-between">
						<input class="mx-20 round-2" placeholder="请输入地点" type="text">
						<view class="searchBtn mr-20 round-2">
							搜索
						</view>
					</view>
					<scroll-view scroll-y="true" :scroll-top="scrollTop" v-if="poiss.length > 0" scroll-with-animation="true" style="height:640rpx;">
						<block v-for="(item,index) in poiss">
							<view class="gps-lists">
								<text class="gps-title">{{item.title}}</text>
								<view class="gps-flex">
									<view class="gps-view">{{item.address}}</view>
									<view style="margin-top:-18rpx;">
										<radio-group @change="radioChange(item,index)">
											<radio :checked="current == index" />
										</radio-group>
									</view>
								</view>
							</view>
						</block>
					</scroll-view>
				</view>
			</cover-view>
		</view>
	</view>
</template>

<script>
	let QQMapWS = require("../../../js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});
	let mapContext = uni.createMapContext("maps", this)
	export default {
		data() {
			return {
				searchValue:"",
				longitude: null,
				latitude: null,
				windowWidth: 0,
				windowHeight: 0,
				popupShow: false,
				poiss: [],
				scrollTop: 0,
				current: 0,
				address:{}
			}
		},
		//第一次初始化用户位置信息
		onLoad() {
			try {
				var th_is = this;
				const res = uni.getSystemInfoSync();
				th_is.windowWidth = res.windowWidth;
				th_is.windowHeight = res.screenHeight * (750 / res.windowWidth) - 740;
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
						th_is.getAddress(th_is.latitude, th_is.longitude);
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
				console.log(e)
				var th_is = this;
				if (e.type == "end") {
					th_is.longitude = e.detail.centerLocation.longitude;
					th_is.latitude = e.detail.centerLocation.latitude;
					th_is.popupShow = true; 
					mapContext.getRegion({
						success: res => {
							console.log(res);
						}
					})
					th_is.getAddress(th_is.latitude, th_is.longitude);
				}
			},
			//获取附近位置信息
			async getAddress(longitude, latitude) {
				let location = [longitude, latitude]
				let StringLocation = location.toString();
				var th_is = this;
				
				qqmapsdk.reverseGeocoder({
					location: StringLocation,
					get_poi: 1,
					poi_options: 'policy=1;radius=3000;page_size=20',
					success: function(locaRes) {
						th_is.poiss = locaRes.result.pois;
						th_is.current = 0;
						th_is.address = locaRes.result.pois[0]
					}
				});
			},
			currentLocation(e) {
				console.log(e)
			},
			next() {
				if(JSON.stringify(this.address) == "{}"){
					uni.showToast({
						icon:"none",
						title:"请选择位置！"
					})
				}else{
					this.$apis.sheckBuild({
						'name':this.address.title
					}).then(res => {
						var pages = getCurrentPages();
						var prevPage = pages[pages.length - 2];
						prevPage.$vm.locaData = this.address;
						uni.navigateBack({//返回
							delta: 1
						})
					})
				}
			},
			cancel(){
				uni.navigateBack();
			},
			radioChange(item, evt) {
				this.current = evt;
				this.address = Object.assign(item);
			}
		}
	}
</script>

<style scoped lang="less">
	.search{
		input{
			height: 72rpx;
			border: 2rpx solid #00AAFF;
			width: 526rpx;
		}
		.searchBtn{
			height: 72rpx;
			line-height: 72rpx;
			width: 154rpx;
			background: #00AAFF;
			color: #FFF;
			text-align: center;
		}
	}
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
		height: 740rpx;
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
