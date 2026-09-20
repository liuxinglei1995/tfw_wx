<template>
	<view class="home">
		<tm-menubars title="天府网" iconColor="white" :showback="false"></tm-menubars>
		<!-- 搜索 -->
		<view class="topsearch">
			<view class="ditu" @click="gocity">
				{{nowcity?nowcity:'地图'}}<text class="cityArrow">▾</text>
			</view>
			<view class="searchBox" @click="gosearchhouse()">
				<view class="searchIco"></view>
				<text class="searchPlaceholder">你想住哪儿？</text>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="wrap">
			<swiper class="homeSwiper" indicator-dots autoplay circular interval="3500" duration="400">
				<swiper-item v-for="(it, idx) in list" :key="idx">
					<image class="homeSwiperImg" :src="it.image" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 多功能菜单 -->
		<view>
			<!-- 	<u-grid :border="false" col="5">
				<u-grid-item v-for="(listItem,listIndex) in menu" :key="listIndex">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.icon" :size="40"></u-icon>
					<text class="grid-text">{{listItem.title}}</text>
				</u-grid-item>
			</u-grid> -->
			<tmDragGrid :list="menu" :col="5" :ani="false" :item-height="150" disabled>
				<template v-slot:default="{item}">
					<view class="flex-center flex-col" style="width:100%;" @click="ugridclick(item)">
						<tmIcons :size="80" :name="item.icon" style="margin-top: 30rpx;"></tmIcons>
						<text class="text-size-s pt-10"
							style="font-size:28rpx;color: #909399;margin-bottom: 20rpx;">{{item.title}}</text>
					</view>
				</template>
			</tmDragGrid>
		</view>
		<!-- 讲解  优质房子  我是业主 -->
		<view class="flex-around">
			<view class="mapFindRoom mapFindRoomimg1" @tap="xingognneng">
				<view class="text-size-lg">
					优质A级房
				</view>
				<view class="text-size-s">
					地图房源<text class=""></text>一目了然
				</view>
			</view>
			<view class="mapFindRoom mapFindRoomimg2" @tap="goGuidePrice">
				<view class="text-size-lg   ">
					我是业主
				</view>
				<view class="text-size-s ">
					委托租售<text class=""></text>委托找房
				</view>
			</view>
		</view>
		<!-- 热点房 -->
		<view class="scrollclass" v-if="houstlise.length!=0">
			<view class="scrollclasstitle">
				{{district?district:'--'}}降价房
			</view>
			<scroll-view class="hotScroll" scroll-x :show-scrollbar="false">
				<view class="scroll-list-h">
					<view class="scroll-list__goods-item" v-for="(item, index) in houstlise" :key="index"
						:class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']"
						@click="gotohot(item.id)">
						<image class="scroll-list__goods-item__image"
							:src="'https://static.tianfucd.com/'+item.coverfile"></image>
						<view class="xqtitle">
							{{item.loupanXq.title}}
						</view>
						<view class="scroll-firsebox">
							{{item.loupanHuxing.bedRoomNum?item.loupanHuxing.bedRoomNum:"--"}}室{{item.loupanHuxing.livingRoomNum?item.loupanHuxing.livingRoomNum:"--"}}厅|{{item.propertyArea}}㎡|精装修
						</view>
						<text class="scroll-list__goods-item__text">{{ item.sellingPrice }}万
							<text
								class="aloneprice">{{(item.sellingPrice*10000/item.propertyArea).toFixed(0)}}元/㎡</text>
						</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="" v-else>
			<view class="noHouseTip">{{ text1 }}</view>
		</view>

		<!-- 二手房 -->
		<indexHouse :homeFeuer="secondarylist" :househead="1" :houseid="0"></indexHouse>
		<!-- 新房 -->
		<indexHouse :homeFeuer="newhouselist" :househead="1" :houseid="0"></indexHouse>
		<!-- 新房楼盘 -->
		<indexHouse :homeFeuer="newrealestate" :househead="1" :houseid="1"></indexHouse>
		<!-- 写字楼 -->
		<indexHouse :homeFeuer="officelist" :househead="1" :houseid="2"></indexHouse>
		<!-- 精选商铺 -->
		<indexHouse :homeFeuer="retailoutlet" :househead="1" :houseid="3"></indexHouse>
		<!-- 租房中心 -->
		<indexHouse :homeFeuer="rentalcenter" :househead="1" :houseid="4"></indexHouse>
	</view>
</template>
<script>
	import {
		swiperimglist,
		listFangyuan,
		newloupan,
		wxnewlp,
		wxIndexList,
		pricerEductionHouseByAreaCode
	} from '@/api/houst.js'
	import tmDragGrid from '@/tm-vuetify/components/tm-dragGrid/tm-dragGrid.vue';
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons.vue';
	import indexHouse from "@/pages/index-house/index-house.vue";
	var app = getApp();
	let QQMapWS = require("@/js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	// 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});
	export default {
		dicts: ['tfw_decoration_situation', 'tfw_userkffs', 'tfw_featured_tags', 'tfw_fkfs', 'tfw_elevator_situation'],
		components: {
			indexHouse,
			tmDragGrid,
			tmIcons
		},
		data() {
			return {
				//消息提示
				text1: "暂时没有此地区房源",
				// 热点房列表
				houstlise: [],
				// 轮播图列表
				list: [],
				//功能菜单
				menu: [{
						title: "二手房",
						url: '/pagesHouse/eshouse/eshouse?type=0&houseType=0',
						icon: "https://cdn.tianfucd.com/images/applet/icon/esf.png",
						isTab: false
					},
					{
						title: "看新房",
						url: '/pagesHouse/newhouse/newhouse?type=1',
						icon: "https://cdn.tianfucd.com/images/applet/icon/kxf.png",
						isTab: false
					},
					{
						title: "住宅出租",
						url: '/pagesHouse/rentHouse/rentHouse?type=4&houseType=0',
						icon: "https://cdn.tianfucd.com/images/applet/icon/zzcc.png",
						isTab: false
					},
					{
						title: "商铺",
						url: '/pagesHouse/eshouse/business?type=3&houseType=2&house_name=商铺',
						icon: "https://cdn.tianfucd.com/images/applet/icon/sp.png",
						isTab: false
					},
					{
						title: "写字楼",
						url: '/pagesHouse/eshouse/business?type=2&houseType=1&house_name=写字楼',
						icon: "https://cdn.tianfucd.com/images/applet/icon/xzl.png",
						isTab: false
					},
					{
						title: "税费计算",
						url: '/pagesTools/pages/calculator/taxes/taxes',
						icon: "https://cdn.tianfucd.com/images/applet/icon/sf.png",
						isTab: false
					},
					{
						title: "房贷计算",
						url: '/pagesTools/pages/calculator/index/index',
						icon: "https://cdn.tianfucd.com/images/applet/icon/tffj.png",
						isTab: false
					},
					{
						title: "装修服务",
						url: '/pagesTools/pages/aboutUs/aboutUs',
						icon: "https://cdn.tianfucd.com/images/applet/icon/zx.png",
						isTab: false
					},
					{
						title: "家政服务",
						url: '/pagesTools/pages/aboutUs/homeless',
						icon: "https://cdn.tianfucd.com/images/applet/icon/yezhu.png",
						isTab: false
					},
					{
						title: "搬家服务",
						url: '/pagesTools/pages/aboutUs/movehome',
						icon: "https://cdn.tianfucd.com/images/applet/icon/xqjy.png",
						isTab: false
					}
				],
				//二手房列表
				secondarylist: [],
				queryParams: {
					ifNewHouse: 2,
					propertyType: 0,
					huXTitle: 0,
					type: 5
				},
				// 降价房源
				hothouse: {
					hits: 0,
					type: 5,
					ifNewHouse: 2,
					propertyType: 0,
					params: {
						areaCode: 0,
						cityCode: 0,
						pageSize: 10
					}
				},
				//新房
				newhouselist: [],
				newqueryParams: {
					ifNewHouse: 1,
					huXTitle: 0,
					type: 5,
				},
				//新楼盘
				newrealestate: [],
				newrealestatedata: {
					pageNum: 1,
					pageSize: 3,
					type: 1,
					cityCode: 0,
					status: 0
				},
				//楼盘写字楼
				isshowxie: 2,
				officelist: [],
				newofficelist: {
					propertyType: 3,
					huXTitle: 0,

				},
				//商铺
				retailoutlet: [],
				newretailoutlet: {
					propertyType: 4,
					huXTitle: 0,

				},
				//租房中心
				rentalcenter: [],
				newrentalcenter: {
					type: 4,
					huXTitle: 0,

				},
				//获取位置参数
				province: '',
				city: "",
				cityDistrict: '',
				nowcity: '',
				district: '',
				citynumber: "",
			}
		},
		onLoad() {
			// this.$store.dispatch('user/GetInfo').then(res => {
			// })
			this.getswiperimglist();
		},

		onReady() {
			uni.setStatusBarStyle({
				style: 'light',
				success: () => {
					console.log('状态栏样式设置成功');
				},
				fail: (err) => {
					console.error('状态栏样式设置失败', err);
				}
			});
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow() {
			this.getnowcity();
		},
		onInit() {

		},
		onShareAppMessage: function () {
		  return {
		    title: '自家店  实在',
		  };
		},
		methods: {
			// 去a级房源
			xingognneng: function(e) {
				uni.navigateTo({
					url: '/pagesEdu/hits/hits'
				});
			},
			//去热点房
			gotohot(id) {
				uni.navigateTo({
					url: '/pagesHouse/houseid/houseid?id=' + id + '&houseid=' + 0
				})
			},
			// 跳转委托
			goGuidePrice() {
				uni.navigateTo({
					url: '/pagesUser/publish/publish'
				});
			},
			//首页地址展示
			getnowcity() {
				var that = this;
				var city = uni.getStorageSync('city')
				this.district = uni.getStorageSync('district')
				var adcode = uni.getStorageSync('adcode')
				var cityCode = uni.getStorageSync('cityCode')
				if (city == null || city == '' || cityCode == null || cityCode == '') {
					that.dingwei();
				} else {
					that.setData({
						'nowcity': city,
						"citynumber": cityCode,
						cityDistrict: uni.getStorageSync("cityDistrict")
					})
					uni.getLocation({
						type: 'wgs84',
						success: function(res) {
							console.log(res, '412563')
							var latitude = res.latitude;
							var longitude = res.longitude;
							const apiKey = "21c9c2162ccb4f1eee01382ca85832c6"; // 必须与上方加载密钥一致
							const url = `https://api.tianditu.gov.cn/geocoder?postStr={'lon':${longitude},'lat':${latitude},'ver':1}&type=geocode&tk=${apiKey}`;
							uni.request({
							    url: url, //仅为示例，并非真实接口地址。
							    success: (res) => {
							        console.log(res.data,"->getnowcity");
									that.queryParams.huXTitle = that.citynumber
									that.newqueryParams.huXTitle = that.citynumber
									that.newrealestatedata.cityCode = that.citynumber
									that.newofficelist.huXTitle = that.citynumber
									that.newretailoutlet.huXTitle = that.citynumber
									that.newrentalcenter.huXTitle = that.citynumber
									that.district = res.data.result.addressComponent.city
									that.hothouse.params.areaCode = res.data.result.addressComponent.county_code.slice(-6)
									that.hothouse.params.cityCode = that.citynumber
									that.getlist();
							    },
							});
							// qqmapsdk.reverseGeocoder({
							// 	location: {
							// 		latitude: latitude,
							// 		longitude: longitude
							// 	},
							// 	success: function(res) {
							// 		console.log(res, 'code-res')
							// 		// 数据库对应的是l.citycode
							// 		that.queryParams.huXTitle = that.citynumber
							// 		that.newqueryParams.huXTitle = that.citynumber
							// 		that.newrealestatedata.cityCode = that.citynumber
							// 		that.newofficelist.huXTitle = that.citynumber
							// 		that.newretailoutlet.huXTitle = that.citynumber
							// 		that.newrentalcenter.huXTitle = that.citynumber
							// 		that.district = res.result.ad_info.district
							// 		that.hothouse.params.areaCode = res.result.ad_info.adcode
							// 		that.hothouse.params.cityCode = that.citynumber
							// 		that.getlist();
							// 	}
							// })
						},
						fail: function(res) {
							console.log(res, "gggggggggggg")
							that.setData({
								nowcity: "成都市",
								cityDistrict: "青羊区",
							});
							this.hothouse.params.areaCode = 510105
							that.dingweixinxi("成都");
							that.huoqushuju("成都");
							that.getHitsList("青羊区")
							that.getHitsListByRand("青羊区")
						}
					})

				}
			},
			async getlist() {
				await this.getsecondarylist();
				await this.getnewhouselist();
				await this.getnewrealestate();
				await this.getofficelist();
				await this.getretailoutlet();
				await this.getrentalcenter();
				await this.gethothouselist()
			},
			//轮播图获取
			async getswiperimglist() {
				await swiperimglist().then(response => {
					response.rows.forEach(function(item) {
						item.image = "https://static.tianfucd.com/" + item.image;
					});
					this.list = response.rows;
				})
			},
			// 降价房
			gethothouselist() {
				console.log(this.hothouse, "降价房");
				pricerEductionHouseByAreaCode(this.hothouse).then(response => {
					this.houstlise = response.rows;
					console.log(response, "降价房");
				})
			},
			//二手房列表
			getsecondarylist() {
				wxIndexList(this.queryParams).then(response => {
					this.secondarylist = response.rows;
					console.log(response, "首页价格变化");
				})
			},
			//新房列表
			getnewhouselist() {
				wxIndexList(this.newqueryParams).then(response => {
					this.newhouselist = response.rows;

				})
			},
			//新楼盘
			getnewrealestate() {
				wxnewlp(this.newrealestatedata).then(response => {
					this.newrealestate = response.rows;
				})
			},
			//精选写字楼
			getofficelist() {
				wxIndexList(this.newofficelist).then(response => {
					this.officelist = response.rows;
				})
			},
			//商铺
			getretailoutlet() {
				wxIndexList(this.newretailoutlet).then(response => {
					this.retailoutlet = response.rows;
				})
			},
			//租房中心
			getrentalcenter() {
				wxIndexList(this.newrentalcenter).then(response => {
					this.rentalcenter = response.rows;
				})
			},
			//
			imsgeclick(e) {
				that.$refs.previewHx.open(e);
			},
			//菜单点击事件
			ugridclick(e) {
				if (e.isTab) {
					uni.navigateToMiniProgram({
						appId: e.url
					})
				} else {
					uni.navigateTo({
						url: e.url
					});
				}
			},
			/**
			 * 获取位置信息
			 * @param {*} city
			 */
			dingwei: function() {
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						var latitude = res.latitude;
						var longitude = res.longitude;
						const apiKey = "21c9c2162ccb4f1eee01382ca85832c6"; // 必须与上方加载密钥一致
						const url = `https://api.tianditu.gov.cn/geocoder?postStr={'lon':${longitude},'lat':${latitude},'ver':1}&type=geocode&tk=${apiKey}`;
						console.log(url)
						uni.request({
						    url: url, //仅为示例，并非真实接口地址。
						    success: (res) => {
						        console.log(res.data, 'dingwei');
								var city = res.data.result.addressComponent.city;
								var cityCode = res.data.result.addressComponent.city_code.slice(-6)
								var cityDistrict = res.data.result.addressComponent.county
								var province = res.data.result.addressComponent.province
								that.setData({
									city: city,
									cityDistrict: cityDistrict,
									province: province,
								})
								var city1 = city.substring(0, city.indexOf('市'));
								uni.setStorageSync('city', city1);
								uni.setStorageSync('cityCode', cityCode);
								uni.setStorageSync('cityDistrict', cityDistrict);
								uni.setStorageSync('district', cityDistrict);
								uni.setStorageSync('province', province);
								//区
								uni.setStorageSync('adcode', res.data.result.addressComponent.county_code.slice(-6));
								that.setData({
									nowcity: city1,
									cityDistrict: cityDistrict
								});
								that.getnowcity()
						    },
							fail: function(res) {
								console.error(res, "gggggggggggg")
								that.setData({
									nowcity: "成都市",
									cityDistrict: "青羊区",
								});
								this.hothouse.params.areaCode = 510105
								that.dingweixinxi("成都");
								that.huoqushuju("成都");
								that.getHitsList("青羊区")
								that.getHitsListByRand("青羊区")
							}
						});

						// qqmapsdk.reverseGeocoder({
						// 	location: {
						// 		latitude: latitude,
						// 		longitude: longitude
						// 	},
						// 	success: function(res) {
						// 		var city = res.result.ad_info.city;
						// 		var cityCode = (res.result.ad_info.city_code).replace(res
						// 			.result.ad_info.nation_code, '')
						// 		var cityDistrict = res.result.ad_info.district
						// 		var province = res.result.ad_info.province
						// 		that.setData({
						// 			city: city,
						// 			cityDistrict: cityDistrict,
						// 			province: province,
						// 		})
						// 		var city1 = city.substring(0, city.indexOf('市'));
						// 		uni.setStorageSync('city', city1);
						// 		uni.setStorageSync('cityCode', cityCode);
						// 		uni.setStorageSync('cityDistrict', cityDistrict);
						// 		uni.setStorageSync('district', cityDistrict);
						// 		uni.setStorageSync('province', province);
						// 		//区

						// 		uni.setStorageSync('adcode', res.result.ad_info.adcode);
						// 		that.setData({
						// 			nowcity: city1,
						// 			cityDistrict: cityDistrict
						// 		});
						// 		that.getnowcity()
						// 	}
						// });

					},
					fail: function(res) {
						console.log(res, "gggggggggggg")
						that.setData({
							nowcity: "成都市",
							cityDistrict: "青羊区",
						});
						this.hothouse.params.areaCode = 510105
						// that.dingweixinxi("成都");
						// that.huoqushuju("成都");
						// that.getHitsList("青羊区")
						// that.getHitsListByRand("青羊区")
					}
				});
			},
			left() {
				console.log('left');
			},
			right() {
				console.log('right');
			},
			//跳转到地图搜索
			gocity() {
				uni.navigateTo({
					url: '/pagesTools/pages/mapAll/mapAll'
				});

			},
			//搜索
			gosearchhouse() {
				uni.navigateTo({
					url: '/pagesTools/pages/houseSearch/houseSearch'
				});
			}

		}
	}
</script>
<style lang="scss" scoped>
	.home {
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.topsearch {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-left: 40rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}

	.ditu {
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}

	.cityArrow {
		font-size: 22rpx;
		margin-left: 6rpx;
	}

	.noHouseTip {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #909399;
		text-align: center;
		background: #f8f8f8;
		padding: 8rpx 0;
	}

	.searchBox {
		flex: 1;
		height: 56rpx;
		background: #f2f3f5;
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
	}

	.searchIco {
		width: 22rpx;
		height: 22rpx;
		border: 3rpx solid #909399;
		border-radius: 50%;
		position: relative;
		margin-right: 14rpx;
		flex-shrink: 0;
	}

	.searchIco::after {
		content: '';
		position: absolute;
		width: 12rpx;
		height: 3rpx;
		background: #909399;
		border-radius: 2rpx;
		transform: rotate(45deg);
		bottom: -8rpx;
		right: -9rpx;
	}

	.searchPlaceholder {
		font-size: 26rpx;
		color: #909399;
	}

	// 讲解
	.flex-around {
		display: flex;
		justify-content: space-around;
		padding: 20rpx;
		margin-bottom: 40rpx;
		box-sizing: border-box;
	}

	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	.xqtitle {
		font-weight: 800;
	}

	.scroll-firsebox {
		font-size: 12px;
		color: #686767;
	}

	.aloneprice {
		color: #686767;
		font-size: 12px;
		font-weight: normal;
		margin-left: 2px;
	}

	.tagbottom {
		background: linear-gradient(90deg, #FFBDB5 0%, rgba(255, 183, 183, 0) 100%);
		height: 30rpx;
		font-size: 12px;
		color: #ff0e0f;
	}

	.LivePlayback {
		width: 326rpx;
		height: 326rpx;
		border-radius: 20rpx;
		color: #222222;
		background-image: url(https://static.tianfucd.com/img/backgroud/livePlayback.png);
		background-size: 100% 100%;
	}

	.mapFindRoom {
		display: flex;
		flex-direction: column;
		padding: 20rpx 30rpx 20rpx 30rpx;
		box-sizing: border-box;
		width: 326rpx;
		height: 154rpx;
		border-radius: 20rpx;
		color: #222222;
		background-size: 100% 100%;
	}

	.mapFindRoomimg1 {
		background-image: url(https://static.tianfucd.com/img/backgroud/guidePrice.png);
	}

	.mapFindRoomimg2 {
		background-image: url(https://static.tianfucd.com/img/backgroud/mapFindRoom.png);
	}

	.text-size-lg {
		font-weight: 700;
		font-size: 40rpx;
		margin-bottom: 20rpx;
	}

	// 热点房
	.scrollclass {
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.scrollclasstitle {
		font-weight: 700;
		font-size: 40rpx;
		margin-bottom: 20rpx;
	}

	.scroll-list {
		@include flex(column);

		&__goods-item {
			margin-right: 20px;

			&__image {
				width: 140px;
				height: 130px;
				border-radius: 4px;
			}

			&__text {
				color: #f56c6c;
				font-weight: 800;
				text-align: center;
				font-size: 16px;
				margin-top: 5px;
			}
		}

		&__show-more {
			background-color: #fff0f0;
			border-radius: 3px;
			padding: 3px 6px;
			@include flex(column);
			align-items: center;

			&__text {
				font-size: 16px;
				width: 12px;
				color: #f56c6c;
				line-height: 16px;
			}
		}
	}

	.scroll-list-h {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.hotScroll {
		white-space: nowrap;
	}

	.homeSwiper {
		width: 100%;
		height: 400rpx;
	}

	.homeSwiperImg {
		width: 100%;
		height: 400rpx;
	}
</style>