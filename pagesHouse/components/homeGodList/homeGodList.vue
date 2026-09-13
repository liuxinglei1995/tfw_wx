<template>
	<view class="conent-item" hover-class="none">
		<view v-if="titShow" v-for="(item, index) in homeFeuer" :key="index" class="data01">
			<view class="d1">{{item.title01}}</view>
			<view @tap="gotoLeiBo" class="d2">{{item.title02}}
				<image :src="item.img" style="width:20rpx;height:20rpx"></image>
			</view>
		</view>
		<view class="item-list" hover-class="none" :hover-stop-propagation="false">
			<!--一次限制3条数据展示-->
			<block v-if="newHouseListItem=='' && homeFeuer[0].type != 4">
				<!-- <view class="list-foot">无房源信息</view>
				<button class="dz-btn">我要定制找房</button>
				<view class="list-foot">点击我要定制找房，服务顾问将为您快速找房</view> -->
				<tm-skeleton v-for="(item,index) in 3" :key="index" class="my-20" model='listAvatr'></tm-skeleton>
			</block>
			<block v-if="newHouseListItem=='' && homeFeuer[0].type == 4">
				<tm-skeleton v-for="(item,index) in 3" :key="index" class="my-20" model='listAvatr'></tm-skeleton>
			</block>
			<block v-for="(item, index) in newHouseListItem" :key="index">
				<view @click="detail" :id="item.id" :class="'item-lsti-conent ' + ( index==2 ? 'sw1':'')">
					<view class="data02-tupian">
						<view :class="'ysex01 ' + (item.zd=='1'?'':'hidden')"><text>正在热销</text></view>
						<image class="data02-img" :src="'https://static.tianfucd.com/'+item.coverfile" alt></image>
					</view>
					<view class="data02-title">
						<view class="s1">{{item.title}}</view>
						<view class="s2">{{item.areaName?item.areaName:"--"}} {{item.zoneCode?item.zoneCode:""}}</view>
						<view class="s3" style="display: flex;">
							<view v-for="(a,b) in item.featuredTags.split(',')" :key="b">
								<dict-tag :options="dict.type.tfw_featured_tags" :value="a" :classshow="num1" />
							</view>
						</view>
						<view class="s4">
							<text style="color:red;font-weight:800;">{{item.refPrice}}元/㎡</text>
						</view>
					</view>
					<view class="xs1">
						<view class="xs2">
							<dict-tag :options="dict.type.tfw_property_status" :value="item.status" />
						</view>
					</view>
				</view>
			</block>
			<view class="li01">
				<block v-if="homeFeuer[0]['isMore']=='1'">
					<button @tap="gotoLeiBo" type="primary" class="list-gods">查看更多房源</button>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import tmSkeleton from '@/pagesHouse/tm-vuetify/components/tm-skeleton/tm-skeleton.vue';
	var app = getApp();
	export default {
		dicts: ['tfw_featured_tags', 'tfw_property_status'],
		data() {
			return {
				num1: "num1"
			};
		},
		components: {
			tmSkeleton
		},
		props: {
			newHouseListItem: {
				type: Array,
				default: () => []
			},
			homeFeuer: {
				type: Array,
				default: () => []
			},
			titShow: {
				type: Boolean,
				default: () => true
			}
		},
		onShow() {
			console.log(newHouseListItem, "5413");
		},
		methods: {
			detail(e) {
				console.log(this.homeFeuer, e, "kkkkkkkkkkk");
				uni.navigateTo({
					url: "/pagesHouse/houseid/community_detailss?id=" + e.currentTarget.id,
					success: res => {

					},
					fail: res => {
						console.log(res)
					},
					complete: () => {}
				})
			},

			gotoLeiBo: function(e) {
				console.log(e, "kkkkkkkkkkkkk");
				const that = this;
				uni.navigateTo({
					url: that.homeFeuer[0]['more']
				});
			}
		},
	};
</script>
<style>
	page {
		width: 100vw;
	}

	.data01 {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.d1 {
		margin-left: 20px;
		letter-spacing: 2px;
		font-size: 44rpx;
		color: #101d36;
		font-weight: 700;
	}

	.d2 {
		margin-right: 20px;
		padding: 20rpx 10rpx;
		letter-spacing: 2rpx;
		color: #7a8190;
		font-size: 13px;
	}

	.item-list {
		display: flex;
		margin-top: 13px;
		width: 90%;
		flex-direction: column;
		margin: auto;
	}

	.item-lsti-conent {
		border-bottom: 2px solid whitesmoke;
		display: flex;
		width: 90vw;
		padding: 15px 0;
		padding-left: 0px;
		margin: 5px 0;
	}

	.data02-img {
		position: relative;
		width: 216rpx;
		height: 164rpx;
		flex-shrink: 0;
		background-size: cover;
		border-radius: 4rpx;
		box-sizing: border-box;
	}

	.xs1 {
		width: 30px;
		height: 30px;
		position: absolute;
		right: 18px;
	}

	.xs4 {
		background: red !important;
	}

	.xs2,
	.xs4 {
		width: 40px;
		height: 22px;
		text-align: center;
		line-height: 22px;
		background: #3fbaa6;
		letter-spacing: 1px;
		border: none;
		font-size: 12px;
		color: whitesmoke;
	}

	.data02-title {
		display: flex;
		flex-direction: column;
		width: 100vw;
		letter-spacing: 1px;
		padding-left: 30rpx;
		color: #05070ade;
		font-size: 12px;
		font-weight: 500;
	}

	.sw1 {
		border: none !important;
	}

	.s3 {
		margin: 8px 0;
		padding: 1px 0;
	}

	.s4 image {
		vertical-align: middle;
		margin: 0 3px;
		border-radius: 50%;
	}

	.s4 text {
		color: #101d37;
		font-size: 27rpx;
		padding: 5px 0;
		vertical-align: middle;
	}

	.data02-title .s1 {
		width: 100%;
		font-size: 32rpx;
		font-weight: 700;
		color: #101d36;
		line-height: 42rpx;
		margin-bottom: 12rpx;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-top: -4rpx;
		/* letter-spacing: 1px;
    font-size: 28rpx;
    font-weight: 900;
    color: #101d36;
    margin-bottom: 12rpx; */
	}

	.data02-title image {
		border-radius: 50%;
		border: none;
	}

	.li01 {
		width: 70vw;
		margin: auto;
		text-align: center;
	}

	.list-gods {
		width: 70vw !important;
		height: 32px !important;
		font-size: 12px !important;
		text-align: center !important;
		background: #3fbaa6 !important;
	}

	.ysex01 {
		width: 100%;
		height: 20px;
		bottom: -2px;
		background: #ff2929;
		color: whitesmoke;
		text-align: center;
		letter-spacing: 1px;
		position: absolute;
		z-index: 9;
		font-size: 13px;
	}

	.q1,
	.q2 {
		border-radius: 4px;
		background: #dff4f2;
		margin-right: 5px;
		padding: 2px 5px;
		color: #3fbaa6 !important;
		letter-spacing: 1px;
		height: 13px;
		text-align: center;
		line-height: 13px;
		/* font-size: 12px;
    text-align: center;
    letter-spacing: 2px;
    margin-right: 4px;
    color: #3fbaa6 !important;
    background: #dde9e7; */
	}

	.shterg {
		width: 100vw;
		margin: auto;
		display: flex;
		align-items: center;
	}

	.vLine {
		margin: 0 8rpx;
		border-left: solid 2rpx #ccc;
		height: 20rpx;
		vertical-align: middle;
		display: inline-block
	}

	.hidden {
		display: none;
	}

	.data02-tupian {
		height: 160rpx;
	}

	.list-foot {
		color: #cacaca;
		font-size: 12px !important;
		margin-top: 20px;
		margin-bottom: 30px;
	}

	.list-foot::after {
		content: '';
		display: block;
		width: 80px;
		height: 1px;
		background: #f5f5f5;
		position: absolute;
		top: 8px;
		left: -35px;
	}

	.list-foot::before {
		content: '';
		display: block;
		width: 80px;
		height: 1px;
		background: #f5f5f5;
		position: absolute;
		top: 8px;
		left: 215px;
	}
</style>