<template>
	<view>
		<view class="conent-item" v-if="homeFeuer.length!=0">
			<view class="conent-title" v-if="househead==1">
				<text v-if="houseid==0 && homeFeuer[0].ifNewHouse==1">新房单套</text>
				<text v-if="houseid==0 && homeFeuer[0].ifNewHouse==2">二手房</text>
				<text v-if="houseid==1">新房楼盘</text>
				<text v-if="houseid==2">精选写字楼</text>
				<text v-if="houseid==3">商铺</text>
				<text v-if="houseid==4">租房中心</text>
				<text class="title-right" @click="gopage()">查看更多 ></text>
			</view>
			<view v-for="(item,index) in homeFeuer" :key="index" @click="houstclick(item.id)">
				<view class="item-list" >
					<img :src="'https://static.tianfucd.com/'+item.coverfile" alt="" class="list-img" v-if="item.coverfile">
					<img src="@/static/img/zhanweitu.png" alt="" class="list-img" v-else>
					<!-- 有视频显示 -->
					<view v-if=" househead==2 && item.video!=null && item.video!=''"
						style="width: 60rpx;height: 60rpx;position: absolute;top: 0rpx;left:10rpx;">
						<image src="https://cdn.tianfucd.com/images/gif/play.gif" style="height: 60rpx;width: 60rpx;"
							mode="">
						</image>
					</view>
					<!-- a级房源显示 -->
					<view class="hothousered" v-if="item.grade==3 & househead==2">
						A级房源
					</view>
					<!-- 右边大盒子 -->
					<view class="list-right">
						<!-- 标题 -->
						<view class="righttitle">
							{{item.title}}
						</view>
						<!-- 房源标签 -->
						<!-- 	<view class="tags">
							<view v-for="(a,b) in item.featuredTags" :key="b">
								<dict-tag :options="dict.type.tfw_featured_tags" :value="a" :classshow="num1" />
							</view>
						</view> -->
						<!-- 小区名字 -->
						<view class="rightsecond" v-if="houseid==0||houseid==2||houseid==3||houseid==4||houseid==5">
							{{item.xqname}}
						</view>
						<!-- 租房价格 租房中心显示 -->
						<view class="redpricebox" v-if="houseid==4">
							{{item.rental}}元/月
							<text
								style="color: black;">|{{item.loupanHuxing.bedRoomNum?item.loupanHuxing.bedRoomNum:"--"}}室{{item.loupanHuxing.livingRoomNum?item.loupanHuxing.livingRoomNum:"--"}}厅</text>
							<text style="color: black;">|{{item.propertyArea}}㎡</text>
						</view>
						<!-- 经纪人小店的样式 -->
						<view class="" v-if="houseid==5">
							<view class="" v-if="item.type==1|| item.type==3">
								<view class="taghuxing">
									{{item.loupanHuxing.bedRoomNum}}室{{item.loupanHuxing.livingRoomNum}}厅|{{item.propertyArea}}㎡|
									<dict-tag :options="dict.type.tfw_decoration_situation" :value="item.decoration" />
								</view>
								<view class="rightprice">
									<text>{{item.sellingPrice}}万</text>
									<text>{{(item.sellingPrice*10000/item.propertyArea).toFixed(0)}}元/㎡</text>
								</view>
							</view>
							<view class="redpricebox" v-if="item.type==2">
								{{item.rental}}元/月
								<text
									style="color: black;">|{{item.loupanHuxing.bedRoomNum}}室{{item.loupanHuxing.livingRoomNum}}厅</text>
								<text style="color: black;">|{{item.propertyArea}}㎡</text>
				
							</view>
						</view>
						<!-- 租房中心显示的看房方式 -->
						<view class="tagszufang" v-if="houseid==4 ">
							<dict-tag :options="dict.type.tfw_fkfs" :value="item.paymentMethod" />
						</view>
						<!-- 新房楼盘显示的地址 -->
						<view class="rightsecond" v-if="houseid==1">
							{{item.zoneCode?item.zoneCode:item.address}}
						</view>
				
						<view class="redprice" v-if="houseid==1">
							{{item.refPrice}}元/㎡
						</view>
						<!-- 户型 面积  -->
						<view style="display: flex;justify-content: space-around;"
							v-if="houseid==0||houseid==2||houseid==3">
							<view>
								{{item.loupanHuxing.bedRoomNum?item.loupanHuxing.bedRoomNum:"--"}}室{{item.loupanHuxing.livingRoomNum?item.loupanHuxing.livingRoomNum:"--"}}厅&nbsp|&nbsp{{item.propertyArea?item.propertyArea:"--"}}㎡
							</view>
							<view style="margin-left:10rpx;" />
							|
							<view style="margin-left: 10rpx;">
								<dict-tag :options="dict.type.tfw_decoration_situation" :value="item.decoration" />
							</view>
						</view>
						<!-- 价格  面积 -->
						<view class="rightprice" v-if="houseid==0||houseid==2||houseid==3">
							<text v-if="item.type==2">{{item.rental}}元/月</text>
							<text v-if="item.type==1|| item.type==3">{{item.sellingPrice?item.sellingPrice:"--"}}万</text>
							<view class="" v-if="item.tfwHousePrice">
								<view v-if="item.tfwHousePrice.type==1"
									style="color: #ff0000;font-size: 24rpx;line-height: 30rpx;">
									+{{item.tfwHousePrice.reason?item.tfwHousePrice.reason:"--"}}万
									<img style="width: 16rpx;height: 30rpx;position: relative;top: 5rpx;left: 10rpx;"
										src="/static/icon/house/up.png">
								</view>
								<view style="color: #16ae12;font-size: 24rpx;line-height: 30rpx;"
									v-if="item.tfwHousePrice.type==2">
									{{item.tfwHousePrice.reason?item.tfwHousePrice.reason:"--"}}万
									<img style="width: 16rpx;height: 30rpx;position: relative;top: 5rpx;left: 10rpx;"
										src="/static/icon/house/down.png">
								</view>
							</view>
							<text
								v-if="item.type==1|| item.type==3">{{(item.sellingPrice*10000/item.propertyArea).toFixed(0)}}元/㎡</text>
						</view>
						<view
							style="display: flex; justify-content: space-around;flex-wrap: wrap; font-size: 24rpx;color:#909399"
							v-if="houseid==0||houseid==2||houseid==3">
							<view class="bottomleft" v-if="item.lift!=null">
								{{item.loupanXq.zoneCode?item.loupanXq.zoneCode:(item.loupanXq.areaName?item.loupanXq.areaName:"--")}}
							</view>
							<dict-tag :options="dict.type.tfw_elevator_situation" :value="item.lift" style="flex: 1;" />
						</view>
					</view>
				</view>
				<u-line hairline="false" v-if="index<homeFeuer.length-1" margin="20rpx 30rpx"></u-line>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		dicts: ['tfw_decoration_situation', 'tfw_userkffs', 'tfw_featured_tags', 'tfw_fkfs', 'tfw_elevator_situation'],
		props: {
			homeFeuer: {
				type: Array,
				default: function() {
					return []
				},
			},
			houseid: {
				type: Number,
				default: function() {
					return []
				},
			},
			househead: {
				type: Number,
				default: function() {
					return []
				},
			},
		},
		name: "index-houst",
		data() {
			return {
				num1: "num1"
			};
		},
		methods: {
			//查看更多
			gopage() {
				let url = ""
				if (this.houseid == 0 && this.homeFeuer[0].ifNewHouse == 1) {
					url = '/pagesHouse/eshouse/eshouse?type=0'
				} else if (this.houseid == 0 && this.homeFeuer[0].ifNewHouse == 2) {
					url = '/pagesHouse/eshouse/eshouse?type=0'
				} else if (this.houseid == 1) {
					url = '/pagesHouse/newhouse/newhouse?type=1'
				} else if (this.houseid == 2) {
					url = '/pagesHouse/eshouse/business?type=2&house_name=写字楼'
				} else if (this.houseid == 3) {
					url = '/pagesHouse/eshouse/business?type=3&house_name=商铺'
				} else if (this.houseid == 4) {
					url = '/pagesHouse/rentHouse/rentHouse?type=4'
				}
				uni.navigateTo({
					url: url
				})
			},
			// 跳转去详情页面
			houstclick(id) {
				if (this.houseid == 1) {
					uni.navigateTo({
						url: '../../pagesHouse/houseid/community_detailss?id=' + id
					})
				} else {
					uni.navigateTo({
						url: '../../pagesHouse/houseid/houseid?id=' + id + '&houseid=' + this.houseid
					})
				}

			}
		}
	}
</script>

<style scoped>
	.conent-item {
		padding: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		margin-bottom: 50rpx;
	}

	.conent-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24px;
		font-weight: 800;
		margin-bottom: 40rpx;
	}

	.title-right {
		display: flex;
		color: #686767;
		font-size: 14px;
	}

	.item-list {
		position: relative;
		display: flex;
		margin-bottom: 30rpx;
		align-items: center;
		box-sizing: border-box;
	}

	.hothousered {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 250rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: white;
		font-size: 32rpx;
		font-weight: 800;
		text-align: center;
		background-color: #ff2929;
	}

	.list-img {
		width: 250rpx;
		height: 200rpx;
		margin-right: 30rpx;
	}

	.list-right {
		display: flex;
		flex: 1;
		height: 200rpx;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}

	.righttitle {
		width: 100%;
		font-size: 36rpx;
		font-style: italic;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.bottomleft {
		margin-right: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.taghuxing {
		display: flex;
	}

	.taghuxing dict-tag {
		margin-right: 20rpx;
	}

	.rightprice {
		display: flex;
		align-items: center;
	}

	.rightprice :nth-child(1) {
		color: red;
		font-weight: 800;
		font-size: 16px;
		margin-right: 10rpx;
	}

	.tags {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
	}

	.redprice {
		color: red;
		font-weight: 800;
		font-size: 16px;
		margin-top: 10rpx;
	}

	.redpricebox {
		color: red;
		font-weight: 800;
		font-size: 12px;
	}

	.tagszufang {
		display: inline-block;
		border: 1px solid seagreen;
		color: seagreen;
		background-color: white;
		font-size: 14px;
	}
</style>