<template>
	<view class="conent-item" hover-class="none">
		<view v-if="titShow" v-for="(item, index) in homeFeuer" :key="index" class="data01">
			<view class="d1">{{item.title01}}</view>
			<view @tap="gotoLeiBo" class="d2">{{item.title02}}
				<image :src="item.img" style="width:20rpx;height:20rpx"></image>
			</view>
		</view>
		<view class="item-list" hover-class="none" :hover-stop-propagation="false">
			<block v-if="homeListItem==''">
				<tm-skeleton v-for="(item,index) in 3" :key="index" class="my-20" model='listAvatr'></tm-skeleton>
			</block>
			<block v-for="(item, index) in homeListItem" :key="index">
				<view @tap="detail" :data-index="item.id" :class="'item-lsti-conent ' + (index==2? 'sw1':'')">
					<view class="data02-tupian">
						<!-- <view class="ysex01">
							<text>优选</text>
						</view> -->
						<image class="data02-img" :src="item.img" alt></image>
					</view>
					<view class="data02-title">
						<view class="s1">{{item.tit}}</view>
						<view class="s2">{{item.fadd}} {{item.xq}}</view>

						<view class="s3">
							<text style="color:red;font-size:32rpx;font-weight:800;">{{item.money1}}</text>
							<text style="color:red;">{{item.jgdw}}</text>
							<div class="vLine"></div>
							<span>{{item.hx1}}室{{item.hx2}}厅</span>
							<div class="vLine"></div>
							<span style="color:#384047">{{item.cqmj}}㎡</span>
						</view>

						<view class="s4">
							<view class="x1"><text>{{item.fkfs}}</text></view>
							<view class="x1" v-if="item.ditieid != ''"><text>有地铁</text></view>
							<view class="x1" v-if="item.kfang == '有钥匙'"><text>随时看房</text></view>
						</view>
					</view>
				</view>
			</block>
			<view class="li01">
				<block v-if="homeFeuer==''">
					<view class="list-foot">优选房源还在持续更新</view>
				</block>
				<block v-if="homeFeuer[0]['isMore']=='1'">
					<button @tap="gotoLeiBo" type="primary" class="list-gods">查看更多房源</button>
				</block>
			</view>
		</view>
	</view>
</template>

<script module="filters" lang="wxs" src="./filterPrice.wxs"></script>

<script>
	import tmSkeleton from '@/tm-vuetify/components/tm-skeleton/tm-skeleton.vue';
	export default {
		data() {
			return {};
		},

		components: {
			tmSkeleton
		},
		props: {
			homeListItem: {
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
		methods: {
			gotoLeiBo: function(e) {
				const that = this;
				uni.navigateTo({
					url: that.homeFeuer[0]['more']
				});
			},

			detail(e) {
				let id = e.currentTarget.dataset.index;
				uni.navigateTo({
					url: "/pagesHouse/rentDetail/rentDetail?id=" + id
				});
			}

		}
	};
</script>
<style>
	page {
		width: 100vw;
	}

	.data01 {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
	}

	.d1 {
		margin-left: 40rpx;
		letter-spacing: 4rpx;
		font-size: 44rpx;
		color: #101d36;
		font-weight: 700;
	}

	.d2 {
		margin-right: 40rpx;
		padding: 20rpx 10rpx;
		letter-spacing: 2rpx;
		color: #7a8190;
		font-size: 16rpx;
	}

	.item-list {
		display: flex;
		margin-top: 16rpx;
		width: 90%;
		flex-direction: column;
		margin: auto;
	}

	.item-lsti-conent {
		border-bottom: 4rpx solid whitesmoke;
		display: flex;
		width: 90vw;
		padding: 20rpx 0;
		padding-left: 0px;
		margin: 10rpx 0;
	}

	.data02-img {
		position: relative;
		width: 216rpx;
		height: 160rpx;
		flex-shrink: 0;
		background-size: cover;
		border-radius: 4rpx;
		box-sizing: border-box;
	}

	.data02-title {
		display: flex;
		flex-direction: column;
		width: 100vw;
		letter-spacing: 2rpx;
		padding-left: 30rpx;
		color: #05070ade;
		font-size: 24rpx;
	}

	.sw1 {
		border: none !important;
	}

	.s3 {
		padding: 6rpx 0;
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
		/* letter-spacing: 2rpx;
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

	.list-foot {
		color: #cacaca;
		font-size: 24rpx !important;
		margin-top: 40rpx;
		margin-bottom: 60rpx;
	}

	.list-gods {
		width: 70vw !important;
		height: 64rpx !important;
		font-size: 24rpx !important;
		text-align: center !important;
		background: #3fbaa6 !important;
	}

	.s4 {
		display: flex;
	}

	.x1 {
		border-radius: 8rpx;
		background: #dff4f2;
		margin-right: 10rpx;
		padding: 4rpx 10rpx;
		color: #3fbaa6 !important;
		letter-spacing: 2rpx;
		height: 26rpx;
		text-align: center;
		line-height: 26rpx;
	}

	.ysex01 {
		width: 80rpx;
		height: 40rpx;
		line-height: 40rpx;
		border: none;
		background: #3fbaa6;
		color: whitesmoke;
		text-align: center;
		letter-spacing: 2rpx;
		position: absolute;
		left: 10rpx;
		top: 10rpx;
		z-index: 9;
		font-size: 26rpx;
	}
	.ysex02 {
		width: 100%;
		height: 40rpx;
		bottom: 40rpx;
		background: #ff2929;
		color: whitesmoke;
		text-align: center;
		letter-spacing: 2rpx;
		position: absolute;
		top: 120rpx;
		z-index: 9;
		font-size: 26rpx;
	}

	/* .x1{
    height:12rpx;
    border-radius: 8rpx;
    padding: 8rpx 10rpx;
    text-align: center;
    color: #3fbaa6 !important;
    background: #dde9e7;
    margin-right: 10rpx;
    font-size: 20rpx;
    line-height: 12rpx;
} */
	.x2 {
		margin-right: 2rpx;
		font-size: 12rpx;
		color: #b4aeae !important;
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

	.list-foot::after {
		content: '';
		display: block;
		width: 200rpx;
		height: 2rpx;
		background: #f5f5f5;
		position: absolute;
		top: 16rpx;
		left: -310rpx;
	}

	.list-foot::before {
		content: '';
		display: block;
		width: 200rpx;
		height: 2rpx;
		background: #f5f5f5;
		position: absolute;
		top: 16rpx;
		left: 400rpx;
	}

	.dz-btn {
		background: #3fbaa6;
		color: #ffffff;
	}

	.hidden {
		display: none;
	}

	.data02-tupian {
		/* height: 80px; */
		position: relative;
	}
</style>
