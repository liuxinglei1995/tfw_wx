<template>
	<view class="container">
		<tm-menubars title="日报" iconColor="white"></tm-menubars>
		<view>
			<uni-datetime-picker v-model="dateRange" type="daterange" @change="maskClick" />
			<view style="overflow-y: auto;">
				<uni-card :is-shadow="false" v-if="list.length > 0" v-for="(item, index) in list" :key="item.id"
					@click="showDaily(item)" :title="format(item.date, 'yyyy-MM-dd')+'日报'" :extra="item.user.nickName">
					<view style="display: flex;justify-content: space-between;">
						<text class="uni-body">提交时间:{{format(item.updateTime, 'yyyy-MM-dd HH:mm')}}</text>
						<uni-tag v-if="item.state === 1" text="草稿箱" type="success" />
						<uni-tag v-else text="完成" />
					</view>
				</uni-card>

				<!-- 空状态 -->
				<view v-else class="empty">
					<text>暂无数据</text>
				</view>
				<u-loadmore :status="status" />
			</view>
		</view>
		<uni-fab horizontal="right" vertical="bottom" popMenu="false" @fabClick="insertDaily"></uni-fab>
	</view>
</template>

<script>
	import {
		listStencilContentByUser,
		listDaily,
		insertDaily,
		delDaily,
		updateDaily,
		listDailyContent
	} from '@/api/system/daily.js';
	import {
		format
	} from '@/utils/util.js';
	import uniDatetimePicker from "@/pagesTools/components/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue";
	let App = getApp()
	export default {
		components: {
			uniDatetimePicker
		},
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 10,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				queryParams: {
					beginTime: null,
					endTime: null,
					pageSize: 10,
					pageNum: 1,
				},
				dateRange: [],
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getCurrentMonthRange()
			this.loadData()
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getCurrentMonthRange()
			this.loadData()
		},
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
		onReachBottom: function() {
			this.loadData()
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			format,
			async loadData() {
				if (this.status === 'noMore') return
				this.status = 'loading'
				try {
					const resData = await listDaily(this.queryParams)
					if (this.queryParams.pageNum === 1) {
						this.list = resData.rows
					} else {
						this.list = [...this.list, ...resData.rows]
					}
					this.status = resData.rows.length < this.queryParams.pageSize ? 'noMore' : 'more'
					if (resData.rows.length >= this.queryParams.pageSize) {
						this.queryParams.pageNum++
					}
				} catch (error) {
					console.error('加载失败:', error)
					this.status = 'more'
					uni.showToast({
						title: '加载失败',
						icon: 'none'
					})
				}
			},
			//获取当前月的开始时间与结束时间
			getCurrentMonthRange() {
				const now = new Date();
				// 获取当前月的第一天
				const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
				// 获取当前月的最后一天
				const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
				// 格式化日期为YYYY-MM-DD
				const formatDate = (date) => {
					const year = date.getFullYear();
					const month = String(date.getMonth() + 1).padStart(2, '0');
					const day = String(date.getDate()).padStart(2, '0');
					return `${year}-${month}-${day}`;
				};
				this.queryParams.beginTime = formatDate(startDate)
				this.queryParams.endTime = formatDate(endDate)
				this.dateRange = [
					formatDate(startDate),
					formatDate(endDate)
				];
			},
			showDaily(item) {
				console.log(item);
				uni.navigateTo({
					url: '/pagesTools/pages/daily/content/content?dailyId=' + item.id + '&state=' + item.state+ '&date=' + item.date
				})
			},
			maskClick(e) {
				console.log(e)
				this.queryParams.beginTime = this.dateRange[0]
				this.queryParams.endTime = this.dateRange[1]
				console.log(this.queryParams)
				this.status = "more"
				this.loadData();
			},
			insertDaily() {
				console.log('新增日报');
				uni.navigateTo({
					url: '/pagesTools/pages/daily/content/content'
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20rpx;
	}

	.list-item {
		padding: 20rpx;
		border-bottom: 1rpx solid #eee;
	}

	.empty {
		text-align: center;
		padding: 100rpx 0;
		color: #999;
	}

	.load-more {
		padding: 20rpx 0;
	}
</style>