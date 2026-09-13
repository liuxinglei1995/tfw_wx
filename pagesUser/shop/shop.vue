<template>
	<view class="pb-40 home">
		<tm-menubars title="经纪人店铺" iconColor="white"></tm-menubars>
		<!-- <tm-message ref="toast"></tm-message> -->
		<u-loading-page loading-text="loading..." :loading="loading" bg-color="#e8e8e8"></u-loading-page>
		<tm-sheet class="head" :margin="[20,20]">
			<view class="flex-start">
				<tm-avatar :src="shopInfo.avatar_file" dot-pos="bottom" :size="150" dot :shadow="4">
					<template v-slot:dot>
						<view class="text-align-center orange round-10 text-size-xs py-20"
							style="margin: auto;margin-bottom: -15upx;">
							买卖经纪人
						</view>
					</template>
				</tm-avatar>
				<view class="pl-40">
					<view class="name">
						{{shopInfo.uname}}
						<tm-icons class="share" @tap="goShare(shopId)" name="icon-share" size="32"></tm-icons>
					</view>
					<view class="des">所属公司：{{shopInfo.company}}</view>
					<view class="des">电话号码：{{shopInfo.mot}}</view>
					<view class="des">入驻平台：{{shopInfo.month}} 个月</view>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :padding="[0,0]">
			<tm-grid @click-dot="iconClick" @change="toPath" color="blue" :icon-size="84" :list="menuList"></tm-grid>
		</tm-sheet>
		<view class="text-size-ln text-weight-b mx-44">经纪人热推房源</view>
		<index-house :homeFeuer="houstList" :houseid="5" :househead="2"></index-house>
		<view class="text-size-ln text-weight-b mx-44 my-20">同公司其他经纪人</view>

		<view class="flex-between mb-20 mx-44" v-for="(item,index) in brokerUserDtosData" :key="index">
			<tm-avatar :size="100" :shadow="4" :src="item.avatar_file"></tm-avatar>
			<view style="text-align: left !important;width: 330rpx;">
				<view class="mb-10" style="font-size: 32rpx;font-weight: 700;">
					{{item.uname}}
					<text class="ml-20" style="font-size: 24rpx;font-weight: 400;color: #999999;">
						{{item.company}}
					</text>
				</view>
				<view style="font-size: 32rpx;font-weight: 400;color: #666666;" v-if="item.count>0">
					上线 {{item.count}} 套房源
				</view>
				<view style="font-size: 32rpx;font-weight: 400;color: #666666;" v-else>
					无上架房源
				</view>
			</view>
			<view @click="goShop(item.id)" style="font-size: 24rpx;"
				class="flex-center green text border-green-a-1 round-3 px-36 py-12">
				进店看看
			</view>
		</view>
	</view>
</template>

<script>
	var App = getApp()
	import ULoadingPage from "@/pagesUser/uview-ui/components/u-loading-page/u-loading-page.vue";
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue'
	import tmAvatar from '@/pagesUser/tm-vuetify/components/tm-avatar/tm-avatar.vue'
	import tmIcons from '@/pagesUser/tm-vuetify/components/tm-icons/tm-icons.vue'
	import tmGrid from '@/pagesUser/tm-vuetify/components/tm-grid/tm-grid.vue'
	import indexHouse from "@/pagesUser/components/index-house/index-house.vue";
	// import homeList from "@/components/home-list/home-list.vue";
	// import tmMessage from '@/tm-vuetify/components/tm-message/tm-message.vue'
	import {
		getmydianpu
	} from '@/api/houst.js'
	export default {
		components: {
			tmSheet,
			tmAvatar,
			tmIcons,
			tmGrid,
			ULoadingPage,
			indexHouse
		},
		data() {
			return {
				menuList: [{
						text: "二手房",
						url: '/pagesHouse/eshouse/eshouse?type=0&houseType=0',
						icon: "https://cdn.tianfucd.com/images/applet/icon/esf.png",
						dot: true,
						label: '10',
						offset: [8, -4]
					},
					{
						text: "写字楼",
						url: '/pagesHouse/eshouse/business?type=2&houseType=1&house_name=写字楼',
						icon: "https://cdn.tianfucd.com/images/applet/icon/xzl.png",
						dot: true,
						label: '10',
						offset: [8, -4]
					},
					{
						text: "商铺",
						url: '/pagesHouse/eshouse/business?type=3&houseType=2&house_name=商铺',
						icon: "https://cdn.tianfucd.com/images/applet/icon/sp.png",
						dot: true,
						label: '10',
						offset: [8, -4]
					},
					{
						text: "出租",
						url: '/pagesHouse/rentHouse/rentHouse?type=4&houseType=0',
						icon: "https://cdn.tianfucd.com/images/applet/icon/zzcc.png",
						dot: true,
						label: '10',
						offset: [8, -4]
					},

				],
				menuListTow: [{
						text: "公司房源",
						url: '/pagesHouse/eshouse/companyHouse',
						icon: "https://cdn.tianfucd.com/images/applet/icon/zzcc.png",
						dot: true,
						label: '10',
						offset: [8, -4]
					},
					{
						text: "客户管理",
						url: '/pagesUser/customerMG/customerMG',
						icon: "https://cdn.tianfucd.com/images/applet/icon/khgl.png",
						dot: true,
						label: '10',
						offset: [8, -4]
					},
					{
						text: "备用房源",
						url: '/pagesUser/standby/standby',
						icon: "https://cdn.tianfucd.com/images/applet/icon/zzcc.png",
						dot: true,
						label: '10',
						offset: [8, -4]
					},
					{
						text: "浏览人员",
						url: '/pagesUser/browse/browse',
						icon: "https://cdn.tianfucd.com/images/applet/icon/khgl.png",
						dot: true,
						label: '10',
						offset: [8, -4]
					},
				],
				homeES: [{
					title01: "二手房",
					title02: "查看更多",
					more: "/pagesHouse/eshouse/eshouse",
					type: 1,
					img: "/static/assets/svg/fhui.svg"
				}],
				loading: true,
				shopInfo: [],
				assetsUrl: App.globalData.assetsUrl,
				activeIndex: 0,
				list: [],
				shopType: '二手房',
				shopId: '',
				page: 1,
				brokerUserDtosData: null,
				loadmoreShow: false,
				loadmore: true,
				houstList: [],
				homeRENT: [{
					title01: "",
					title02: "",
					more: "",
					img: ""
				}],
			}
		},
		onLoad(option) {
			console.log(option, "4444");
			if (this.hasRole(['common', 'jjr', 'guanjia', 'dianzhang', 'tfwadmin'])) {
				this.menuList = this.menuList.concat(this.menuListTow)
			}
			console.log(option.userId, "6666");
			let that = this
			if (option.userId != '' && option.userId != null) {
				that.setData({
					shopId: option.userId
				})
				this.getAgentShopInfo(this.shopId)
			}

		},
		onShow() {
			let that = this
			// this.$nextTick(()=>{
			// 	this.$refs.toast.show({model:'load',mask:true})
			// })
			// that.isLogin()
		},
		methods: {
			toPath: function(e) {
				let that = this
				let path = ""
				switch (e.index) {
					case 0:
						path = e.data.url + '&uid=' + that.shopId;
						break;
					case 1:
						path = e.data.url + '&uid=' + that.shopId;
						break;
					case 2:
						path = e.data.url + '&uid=' + that.shopId;
						break;
					case 3:
						path = e.data.url + '&uid=' + that.shopId;
						break;
					default:
						path = e.data.url;
						break;
				}
				uni.navigateTo({
					url: path
				})
			},
			/**
			 * 跳转到经纪人店铺
			 * @param {Object} id
			 */
			goShop: function(id) {
				uni.navigateTo({
					url: "/pagesUser/shop/shop?userId=" + id
				})
			},
			/**
			 * 是否登录
			 * 如果登录执行需要用户权限的接口，显示登录用户特定模块
			 * @param {Object} e
			 */
			// isLogin:function(fangid){
			// 	let that = this
			// 	that.$apis.isLogin({
			// 		token:uni.getStorageSync('userToken')
			// 	}).then(res => {
			// 		if(res.code == 1 && res.data.usertype == 2 && (that.shopId == null || that.shopId == '')){
			// 			that.shopId = res.data.id
			// 			that.getAgentShopInfo(res.data.id)
			// 		}else{
			// 			that.getAgentShopInfo(that.shopId)
			// 		}
			// 	})
			// },
			goShare: function(id) {
				uni.navigateTo({
					url: "../../pagesTools/pages/shopShare/shopShare?id=" + id
				})
			},
			getAgentShopInfo: function(id) {
				let that = this
				getmydianpu(id).then(res => {
					this.brokerUserDtosData = res.data.brokerUserDtos,
						console.log(res, "图标");
					let menuList = that.menuList
					menuList[0].label = res.data.moreDto.twocs
					menuList[1].label = res.data.moreDto.writecs
					menuList[2].label = res.data.moreDto.storecs
					menuList[3].label = res.data.moreDto.housecz
					menuList[4].label = res.data.moreDto.companyCount
					menuList[5].label = res.data.moreDto.tourists
					menuList[6].label = res.data.moreDto.byhouse
					that.setData({
						shopInfo: res.data,
						houstList: res.data.houses,
						shopId: res.data.id,
						menuList: menuList
					})
					this.loading = false
					// this.$nextTick(()=>{
					// 	this.$refs.toast.hide()
					// })
					// that.getShopHouseList()
					// that.getOtherAgent()
				})
			},
		}
	}
</script>

<style>
	.home {
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.head {
		background-color: #00AAFF !important;
		border-radius: 8rpx;
	}

	.name {
		font-size: 38rpx;
		font-weight: 700;
		text-align: left;
		color: #333333;
		letter-spacing: 0px;
	}

	.des {
		font-size: 26rpx;
		line-height: 1.5;
		font-weight: 400;
		text-align: left;
		color: #333333;
		letter-spacing: 0px;
	}

	.share {
		position: absolute;
		right: 40rpx;
		margin-top: -20rpx;
	}

	.num_tit {
		font-size: 28rpx;
		font-weight: 400;
		text-align: center;
		color: #666666;
	}

	.num_des {
		font-size: 36rpx;
		font-weight: 400;
		text-align: center;
		color: #333333;
	}
</style>