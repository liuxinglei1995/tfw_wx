<template>
	<view>
		<!-- 自定义导航 -->
		<tm-menubars title="A级房源" fontColor="white" :transparent="true"></tm-menubars>
		<image class="top_box" src="https://cdn.tianfucd.com/images/applet/bg/hits/top.jpg" mode="widthFix">
			<tm-quickCity @change="select_area" color="blue" :defaultValue.sync="defaultValue">
				<view class="flex-start" :style="'position: absolute;top: '+(205+5)+'rpx;right:54rpx;height:38rpx'">
					<image src="https://cdn.tianfucd.com/images/applet/icon/hits/area.png"
						style="width: 38rpx;height: 38rpx;" mode=""></image>
					<view class="ml-10" style="font-size: 28rpx;color: #fff;line-height: 38rpx;">
						{{query.params.cityDistrict?query.params.cityDistrict:""}}
					</view>
				</view>
			</tm-quickCity>
			<view class="flex-col" :style="'position: absolute;top: '+(200+30)+'rpx;left:50rpx;color:#FFF;'">
				<view style="font-size: 80rpx;margin-bottom: 16rpx;">
					捡漏优质房
					<text style="font-size: 30rpx;color: red;">（A级）</text>
				</view>
				<view style="font-size: 20rpx;">更新时间：{{ getdate() }}</view>
			</view>
			<view class="round-tl-5 round-tr-5 select_box">
				<view class="flex-between">
					<view class="select_item px-44">
						<tm-pickers :default-value="[wylx]" :list="wylxlist" @confirm="change_wylx" rang-key="name">
							<view>
								{{wylx}}
								<tm-icons size="28" color="white" class="ml-20" name="icon-angle-down"></tm-icons>
							</view>
						</tm-pickers>
					</view>
					<view class="select_item px-44">
						<tm-pickers :default-value="[money]" @confirm="change_money"
							:list="['50万以下','50-150万','150-300万','300-500万','500-800万','800万以上']">
							<view>
								{{money}}
								<tm-icons color="white" size="28" class="ml-20" name="icon-angle-down"></tm-icons>
							</view>
						</tm-pickers>
					</view>
				</view>
			</view>
		</image>

		<view class="hits_list pb-30" v-if="hits.length > 0">
			<view @tap="goHouse(item.id)" class="hits_item mx-44 mt-28 round-a-3" v-for="(item,index) in hits"
				:key="index">
				<view style="margin-bottom: 30rpx;">
					<tm-images :height="368" class="hits_images round-tl-3 round-tr-3" :previmage="false"
						:src="'https://static.tianfucd.com/'+item.coverfile"></tm-images>
					<image v-if="index < 3" class="ranking"
						:src="'https://cdn.tianfucd.com/images/applet/ranking/'+(index+1)+'.png'" mode=""></image>
				</view>
				<view class="hits_dis flex-between">
					<view class="hits_dis_left flex-col ml-28 mt-18 mb-14" style="flex: 1;">
						<view class="xq">{{item.title}}</view>
						<view class="type">
							<view style="font-weight: 700;">
								{{item.loupanXq.title?item.loupanXq.title:""}}&nbsp&nbsp
							</view>
							<view>{{item.loupanHuxing.bedRoomNum?item.loupanHuxing.bedRoomNum:"--"}}室</view>
							<view style="margin-right: 10rpx;">
								{{item.loupanHuxing.livingRoomNum?item.loupanHuxing.livingRoomNum:"--"}}厅&nbsp&nbsp
							</view>
							<view style="margin-right: 10rpx;">{{item.propertyArea?item.propertyArea:"--"}}㎡ &nbsp&nbsp
							</view>
							<dict-tag :options="dict.type.tfw_decoration_situation" :value="item.decoration" />
						</view>
						<view class="flex-start mt-5 mb-10" style="flex: 1;">
							<view v-if="item.grade == '3'" class="tag round-a-2 px-12 py-6 mr-10">
								<dict-tag :options="dict.type.tfw_ecommendation_level" :value="item.grade"
									style="flex: 1;" />
							</view>
							<!-- <view v-if="item.is_cheapest == 1" class="tag round-a-2 px-12 py-6 mr-10">
								优价房
							</view> -->
							<view v-if="item.titleDeedDate" class="tag round-a-2 px-12 py-6">
								{{getfivenear(item.titleDeedDate)}}
							</view>
						</view>
					</view>
					<view class="hits_dis_right flex-col mr-28 mt-18 mb-14">
						<view class="money">{{item.sellingPrice?item.sellingPrice:"--"}} <text class="ml-5"
								style="font-size: 16rpx;">万</text></view>
						<view class="money_s">
							{{item.propertyArea?(item.sellingPrice*10000/item.propertyArea).toFixed(0):'--'}} 元/㎡
						</view>
						<view class="gs mt-5">
							<tm-avatar size="30" :src="item.sysUser.avatar" class="mr-10"></tm-avatar>
							{{item.sysUser.nickName}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mt-n21">
			<u-loadmore :status="status" />
		</view>

	</view>
</template>

<script>
	var App = getApp();
	import tmPickers from '../tm-vuetify/components/tm-pickers/tm-pickers.vue';
	import tmIcons from '../tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmImages from '../tm-vuetify/components/tm-images/tm-images.vue';
	import tmAvatar from '../tm-vuetify/components/tm-avatar/tm-avatar.vue';
	import tmQuickCity from '../tm-vuetify/components/tm-quickCity/tm-quickCity.vue';
	import tmEmpty from '../tm-vuetify/components/tm-empty/tm-empty.vue';

	import {
		getaHhouseList
	} from '@/api/houst.js'
	export default {
		dicts: ['tfw_ecommendation_level', 'tfw_decoration_situation'],
		data() {
			return {

				defaultValue: [],
				hits: [],
				wylx: "住宅",
				money: "50-150万",

				query: {
					pageNum: 1,
					pageSize: 5,
					propertyType: 0,
					huXTitle: 0,
					params: {
						minMoney: 50,
						maxMoney: 150,
						cityDistrict: '',
					},

				},
				status: 'loadmore',
				islLogLastPage: null,
				wylxlist: [{
					name: '住宅',
					value: 0
				}, {
					name: '商铺',
					value: 4
				}, {
					name: '写字楼',
					value: 3
				}]
			}
		},
		components: {
			tmPickers,
			tmIcons,
			tmImages,
			tmAvatar,
			tmQuickCity,
			tmEmpty
		},
		onReachBottom() {
			if (this.islLogLastPage) {
				this.status = 'nomore'
			} else {
				this.query.pageNum++;
				this.status = 'loading';
				setTimeout(() => {
					this.getHitsList(this.query)
				}, 500)
			}
		},
		onLoad() {

		},
		onShow() {
			// if (uni.getStorageSync('hitsP') != null && uni.getStorageSync('hitsP') != '') {
			// 	this.defaultValue = uni.getStorageSync('hitsP')
			// 	this.cityDistrict = uni.getStorageSync("hitsP")[2]
			// 	uni.clearStorageSync('hitsP')
			// } else {
			// 	this.defaultValue = [uni.getStorageSync("province"), uni.getStorageSync('city') + '市', uni.getStorageSync(
			// 		"cityDistrict")]
			// 	this.cityDistrict = uni.getStorageSync("cityDistrict")
			// }
			var cityCode = uni.getStorageSync('cityCode')
			this.query.huXTitle = cityCode
			this.getHitsList();
		},
		methods: {
			// 计算满五
			getfivenear(date_1) {
				// 计算两个日期之间的差值
				let totalDays, diffDate
				let myDate_1 = Date.parse(date_1)
				let date_2 = new Date()
				let myDate_2 = Date.parse(date_2)
				// 将两个日期都转换为毫秒格式，然后做差
				diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值
				totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整
				let result;
				if (totalDays >= 365 * 5) {
					result = "满五";
				} else if (totalDays >= 365 * 2) {
					result = "满二";
				} else {
					result = "不满二";
				}
				return result;
			},
			/**
			 * 获取当前日期
			 */
			getdate() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + " 年 " + month + " 月 " + strDate + " 日 ";
				return currentdate;
			},
			goHouse: function(id) {
				// uni.navigateTo({
				// 	url: '/pagesHouse/esHouseDetail/esHouseDetail?id=' + id
				// });
				uni.navigateTo({
					url: '../../pagesHouse/houseid/houseid?id=' + id
				})
			},
			select_area: function(info) {
				let that = this
				console.log(info, "ssss");
				// that.setData({
				// 	cityDistrict: info[2]
				// })
				this.query.params.cityDistrict = info[2]
				this.hits = [];
				that.getHitsList()
			},
			change_money: function(info) {
				let that = this
				let infodata = info[0].data
				that.setData({
					money: infodata
				})
				console.log(info);
				infodata = infodata.substring(0, infodata.indexOf('万'))
				infodata = infodata.split('-')

				if (infodata.length < 2) {
					if (infodata[0] == '50') {
						this.query.params.minMoney = 0
						this.query.params.maxMoney = infodata[0]
					} else {
						this.query.params.minMoney = infodata[0]
						this.query.params.maxMoney = ''
					}
				} else {
					this.query.params.minMoney = infodata[0]
					this.query.params.maxMoney = infodata[1]
				}
				this.hits = [];
				this.getHitsList()
			},
			change_wylx: function(info) {
				let that = this
				that.setData({
					wylx: info[0].data.name
				})
				this.query.propertyType = info[0].data.value
				this.hits = [];
				that.getHitsList()
			},
			getHitsList: function() {
				let that = this
				console.log(this.query, "33333333333333333333333333333333");
				getaHhouseList(this.query).then(res => {
					this.islLogLastPage = res.lastPage
					this.hits = this.hits.concat(res.rows);
					if (this.islLogLastPage) {
						this.status = 'nomore'
					}

				})
			},
		}
	}
</script>

<style>
	.top_box {
		width: 100%;
		position: relative;
		top: 0px;
	}

	.select_box {
		background-color: #0059db;
		width: 100%;
		height: 76rpx;
		margin-top: -60rpx;
		position: relative;
	}

	.select_item {
		color: #fff;
		font-size: 32rpx;
		line-height: 76rpx;
	}

	.hits_item {
		border: 2rpx solid #B8B8B8;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
	}

	.hits_item .hits_images {
		height: 368rpx;
		width: 100%;
	}

	.ranking {
		width: 54rpx;
		height: 80rpx;
		position: absolute;
		margin-top: -348rpx;
		margin-left: 20rpx;
	}

	.hits_dis {
		height: 140rpx;
	}

	.xq {
		display: flex;
		flex-wrap: wrap;
		font-size: 32rpx;
		color: #333333;
		font-weight: 800;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.type {
		display: flex;
		font-size: 20rpx;
		color: #666666;
	}

	.tag {
		background-color: #CEEFFF;
		color: #00AAFF;
		font-size: 20rpx;
	}

	.hits_dis_right {
		text-align: right;
	}

	.money {
		font-size: 32rpx;
		color: #FF3939;
		font-weight: 700;
	}

	.money_s {
		font-size: 22rpx;
		color: #666666;
	}

	.gs {
		font-size: 22rpx;
		color: #666666;
		line-height: 30rpx;
	}
</style>