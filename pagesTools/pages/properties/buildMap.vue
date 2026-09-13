<template>
	<view>
		<tm-menubars title="房源分享" iconColor="white" ></tm-menubars>
		<view class="gps-body">
			<view class="search my-20 flex-between">
				<input class="mx-20 round-2" placeholder="请输入地点" type="text" v-model="searchValue">
				<view class="searchBtn mr-20 round-2" @tap="nearby_search(searchValue)">
					搜索
				</view>
			</view>
			<scroll-view scroll-y="true" :scroll-top="scrollTop" v-if="poiss.length > 0" scroll-with-animation="true" style="height:1100rpx;">
				<block v-for="(item,index) in poiss">
					<view class="gps-lists" @tap="radioChange(item,index)">
						<text class="gps-title">{{item.title}}</text>
						<view class="gps-flex">
							<view class="gps-view">{{item.address}}</view>
							<!-- <view style="margin-top:-18rpx;">
								<radio-group @change="radioChange(item,index)">
									<radio :checked="current == index" />
								</radio-group>
							</view> -->
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	let QQMapWS = require("../../../js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});
	export default {
		data() {
			return {
				customBar:this.$store.state.customBar,
				searchValue:"",
				longitude: null,
				latitude: null,
				markers:{},
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
					}
				})
				//th_is.getAddress(22.53332, 113.93041);
			} catch (e) {
				// error
			}
		},
		methods: {
			nearby_search: function(selectKey) {
				var _this = this;
				// 调用接口
				qqmapsdk.search({
					keyword: selectKey, //搜索关键词
					orderby:'---',
					page_size:20,
					success: function(res) { //搜索成功后的回调
						_this.setData({ //设置markers属性，将搜索结果显示在地图中
							longitude: res.data[0].location.lng,
							latitude: res.data[0].location.lat,
							poiss:res.data
						})
					}
				});
			},
			//获取附近位置信息
			async getAddress(longitude, latitude) {
				let location = [longitude, latitude]
				let StringLocation = location.toString();
				var th_is = this;
				
				qqmapsdk.reverseGeocoder({
					location: StringLocation,
					get_poi: 1,
					poi_options: 'policy=1;page_size=40',
					success: function(locaRes) {
						th_is.poiss = locaRes.result.pois;
						th_is.current = 0;
						th_is.address = locaRes.result.pois[0]
					}
				});
			},
			cancel(){
				uni.navigateBack();
			},
			radioChange(item, evt) {
				this.setData({ //设置markers属性，将搜索结果显示在地图中
					current : evt,
					address:Object.assign(item),
					longitude: item.location.lng,
					latitude: item.location.lat,
				})
				if(JSON.stringify(this.address) == "{}"){
					uni.showToast({
						icon:"none",
						title:"请选择位置！"
					})
				}else{
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2];
					prevPage.$vm.locaData = this.address;
					uni.navigateBack({//返回
						delta: 1
					})
				}
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
		input::-webkit-input-placeholder {
			/* placeholder颜色  */
			color: #aab2bd;
			/* placeholder字体大小  */
			font-size: 12rpx;
			/* placeholder位置  */
			text-align: right;
			margin-left: 20rpx;
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

	.tui-current__img {
		width: 100rpx;
		height: 45rpx;
	}


	.gps-body {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
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
</style>
